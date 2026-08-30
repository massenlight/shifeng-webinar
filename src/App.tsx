import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DEFAULT_IMAGE_SLOTS } from './data/courseData';
import { campaignData, ensureLandingVisit } from './lib/landingTracking';
import { Sparkles, Flame } from 'lucide-react';

const PainPoints = lazy(() => import('./components/PainPoints').then((module) => ({ default: module.PainPoints })));
const CurriculumModules = lazy(() => import('./components/CurriculumModules').then((module) => ({ default: module.CurriculumModules })));
const Pricing = lazy(() => import('./components/Pricing').then((module) => ({ default: module.Pricing })));
const Faq = lazy(() => import('./components/Faq').then((module) => ({ default: module.Faq })));
const Footer = lazy(() => import('./components/Footer').then((module) => ({ default: module.Footer })));
const RegistrationModal = lazy(() => import('./components/RegistrationModal').then((module) => ({ default: module.RegistrationModal })));
const LINE_REGISTRATION_URL = (
  import.meta.env.VITE_LINE_REGISTRATION_URL
  || 'https://liff.line.me/2011298970-dNpJY7A2/choose'
).trim();
const TRACKING_WAIT_MS = 150;

function trackingVisitWithDeadline() {
  return Promise.race([
    ensureLandingVisit(),
    new Promise<string>((resolve) => window.setTimeout(() => resolve(''), TRACKING_WAIT_MS)),
  ]);
}

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showDeferredContent, setShowDeferredContent] = useState(false);
  const deferredContentAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (LINE_REGISTRATION_URL) void ensureLandingVisit();
  }, []);

  useEffect(() => {
    const anchor = deferredContentAnchor.current;
    if (!anchor || !('IntersectionObserver' in window)) {
      setShowDeferredContent(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setShowDeferredContent(true);
      observer.disconnect();
    }, { rootMargin: '320px 0px' });
    observer.observe(anchor);
    const fallback = window.setTimeout(() => setShowDeferredContent(true), 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  async function openLineRegistration() {
    // Tracking must never hold up the registration journey. The original
    // request keeps running in the background through fetch keepalive.
    const entryVisit = await trackingVisitWithDeadline();
    const campaign = campaignData(entryVisit);
    const url = new URL(LINE_REGISTRATION_URL);
    const values: Record<string, string> = {
      entry_visit: campaign.entryVisit,
      utm_source: campaign.utmSource,
      utm_medium: campaign.utmMedium,
      utm_campaign: campaign.utmCampaign,
      utm_content: campaign.utmContent,
      utm_term: campaign.utmTerm,
    };
    for (const [key, value] of Object.entries(values)) {
      if (value) url.searchParams.set(key, value);
    }
    window.location.assign(url.toString());
  }

  const handleOpenRegister = () => {
    if (LINE_REGISTRATION_URL) {
      void openLineRegistration();
      return;
    }
    setIsRegisterModalOpen(true);
  };

  const heroImage = DEFAULT_IMAGE_SLOTS.find((slot) => slot.id === 'hero_banner')?.currentUrl || DEFAULT_IMAGE_SLOTS[0].currentUrl;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white antialiased">
      
      {/* Sticky Header */}
      <Header onOpenRegister={handleOpenRegister} />

      {/* Main Content Sections */}
      <main>
        <Hero
          heroImageUrl={heroImage}
          onOpenRegister={handleOpenRegister}
        />

        <div ref={deferredContentAnchor} className="h-px" aria-hidden="true" />
        {showDeferredContent ? (
          <Suspense fallback={<div className="min-h-[45vh] bg-black" aria-hidden="true" />}>
            <PainPoints />
            <CurriculumModules />
            <Faq />
            <Pricing onOpenRegister={handleOpenRegister} />
          </Suspense>
        ) : <div className="min-h-[30vh] bg-black" aria-hidden="true" />}
      </main>

      {/* Footer */}
      {showDeferredContent ? <Suspense fallback={null}><Footer /></Suspense> : null}

      {/* Fixed Floating Bottom Bar for Mobile & Desktop */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg p-3 rounded-2xl bg-black/95 md:bg-black/90 md:backdrop-blur-xl border border-red-800/80 shadow-2xl shadow-red-950 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center text-red-500">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">首波特惠 8.1 折</span>
          </div>
        </div>

        <button
          onClick={handleOpenRegister}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 font-bold text-xs text-white shadow-lg shadow-red-900/60 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>免費預約線上說明會</span>
        </button>
      </div>

      {!LINE_REGISTRATION_URL ? (
        <Suspense fallback={null}>
          <RegistrationModal
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
          />
        </Suspense>
      ) : null}

    </div>
  );
}
