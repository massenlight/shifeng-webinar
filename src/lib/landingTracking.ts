type TrackingResponse = {
  ok?: boolean;
  entryVisit?: string;
};

export type CampaignData = {
  sourcePage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  entryVisit: string;
};

const API_BASE_URL = (import.meta.env.VITE_WEBINAR_API_BASE_URL || 'https://webinar-test.root2studio.com').replace(/\/$/, '');
const VISIT_KEY_PREFIX = 'shifeng-webinar-entry-visit-v1';
let landingVisitPromise: Promise<string> | null = null;
let formOpenTracked = false;

function validVisitId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function dataLayerPush(event: string, data: CampaignData) {
  const dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  dataLayer?.push({
    event,
    utm_source: data.utmSource,
    utm_medium: data.utmMedium,
    utm_campaign: data.utmCampaign,
    utm_content: data.utmContent,
  });
}

function safeReferrer() {
  if (!document.referrer) return '';
  try {
    const url = new URL(document.referrer);
    return `${url.origin}${url.pathname}`;
  } catch {
    return '';
  }
}

function storageKey(data: CampaignData) {
  const signature = [data.utmSource, data.utmMedium, data.utmCampaign, data.utmContent].join('|');
  return `${VISIT_KEY_PREFIX}:${encodeURIComponent(signature).slice(0, 500)}`;
}

function storedVisit(data: CampaignData) {
  try {
    const value = window.sessionStorage.getItem(storageKey(data)) || '';
    return validVisitId(value) ? value : '';
  } catch {
    return '';
  }
}

function rememberVisit(data: CampaignData, visitId: string) {
  try {
    window.sessionStorage.setItem(storageKey(data), visitId);
  } catch {
    // Tracking must never block the registration experience.
  }
}

export function campaignData(entryVisit = ''): CampaignData {
  const params = new URLSearchParams(window.location.search);
  const queryVisit = params.get('entry_visit') || '';
  return {
    sourcePage: `${window.location.origin}${window.location.pathname}`,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
    entryVisit: validVisitId(queryVisit) ? queryVisit : entryVisit,
  };
}

export function ensureLandingVisit() {
  if (landingVisitPromise) return landingVisitPromise;
  landingVisitPromise = (async () => {
    const initial = campaignData();
    dataLayerPush('webinar_landing_viewed', initial);
    if (initial.entryVisit) return initial.entryVisit;

    const remembered = storedVisit(initial);
    const response = await fetch(`${API_BASE_URL}/api/public/landing-events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        entryVisit: remembered,
        referrer: safeReferrer(),
        ...initial,
      }),
      keepalive: true,
    });
    const result = (await response.json().catch(() => ({}))) as TrackingResponse;
    const visitId = result.entryVisit || '';
    if (!response.ok || !validVisitId(visitId)) return remembered;
    rememberVisit(initial, visitId);
    return visitId;
  })().catch(() => '');
  return landingVisitPromise;
}

export async function trackFormOpen() {
  const visitId = await ensureLandingVisit();
  const data = campaignData(visitId);
  dataLayerPush('webinar_registration_opened', data);
  if (!visitId || formOpenTracked) return;
  formOpenTracked = true;
  void fetch(`${API_BASE_URL}/api/public/landing-events`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ event: 'form_open', entryVisit: visitId }),
    keepalive: true,
  }).catch(() => {
    formOpenTracked = false;
  });
}

export function trackRegistrationSubmitted(entryVisit: string) {
  dataLayerPush('webinar_registration_submitted', campaignData(entryVisit));
}
