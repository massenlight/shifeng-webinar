import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  LoaderCircle,
  Mail,
  Phone,
  UserRound,
  X,
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type WebinarSession = {
  id: string;
  title: string;
  startsAt: string;
  durationMinutes: number;
};
type PublicTeacherResponse = {
  sessions?: WebinarSession[];
  lineBasicId?: string;
  error?: string;
};

type SubmitResponse = {
  ok?: boolean;
  lineUrl?: string;
  error?: string;
};

const API_BASE_URL = (import.meta.env.VITE_WEBINAR_API_BASE_URL || 'https://shifeng-line-webinar-test.rexlala.chatgpt.site').replace(/\/$/, '');
const LINE_URL = 'https://line.me/R/ti/p/@531cnikn';
const PUBLIC_TEACHER_CACHE_MS = 60_000;

let cachedTeacherResponse: { value: PublicTeacherResponse; expiresAt: number } | null = null;
let teacherRequest: Promise<PublicTeacherResponse> | null = null;

function loadPublicTeacher() {
  if (cachedTeacherResponse && cachedTeacherResponse.expiresAt > Date.now()) {
    return Promise.resolve(cachedTeacherResponse.value);
  }
  if (teacherRequest) return teacherRequest;

  teacherRequest = fetch(`${API_BASE_URL}/api/public/teachers/shifeng`)
    .then(async (response) => {
      const result = (await response.json().catch(() => ({}))) as PublicTeacherResponse;
      if (!response.ok || !Array.isArray(result.sessions)) {
        throw new Error(result.error || '目前無法載入說明會場次');
      }
      cachedTeacherResponse = {
        value: result,
        expiresAt: Date.now() + PUBLIC_TEACHER_CACHE_MS,
      };
      return result;
    })
    .finally(() => {
      teacherRequest = null;
    });

  return teacherRequest;
}

function formatSession(value: string) {
  return new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date(value));
}

function campaignData() {
  const params = new URLSearchParams(window.location.search);
  return {
    sourcePage: `${window.location.origin}${window.location.pathname}`,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
  };
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [sessions, setSessions] = useState<WebinarSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [lineUrl, setLineUrl] = useState(LINE_URL);
  const [form, setForm] = useState({ name: '', phone: '', email: '', consent: false, website: '' });

  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId) || null,
    [selectedSessionId, sessions],
  );

  useEffect(() => {
    let cancelled = false;
    void loadPublicTeacher()
      .then((result) => {
        if (cancelled) return;
        const availableSessions = result.sessions || [];
        setSessions(availableSessions);
        setSelectedSessionId((current) =>
          current && availableSessions.some((session) => session.id === current)
            ? current
            : availableSessions[0]?.id || '',
        );
      })
      .catch(() => {
        // Opening the modal will retry and show a user-facing error if needed.
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoadingSessions(sessions.length === 0);
    setError('');
    void loadPublicTeacher()
      .then((result) => {
        if (cancelled) return;
        const availableSessions = result.sessions || [];
        setSessions(availableSessions);
        setSelectedSessionId((current) =>
          current && availableSessions.some((session) => session.id === current)
            ? current
            : availableSessions[0]?.id || '',
        );
      })
      .catch((caught) => {
        if (!cancelled) setError(caught instanceof Error ? caught.message : '目前無法載入說明會場次');
      })
      .finally(() => {
        if (!cancelled) setLoadingSessions(false);
      });
    return () => { cancelled = true; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => window.location.assign(lineUrl), 1800);
    return () => window.clearTimeout(timer);
  }, [lineUrl, submitted]);

  if (!isOpen) return null;

  function closeModal() {
    setSubmitted(false);
    setError('');
    onClose();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!selectedSessionId) {
      setError('請先選擇一個說明會場次');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/public/webinar-registrations`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          teacherSlug: 'shifeng',
          sessionId: selectedSessionId,
          ...form,
          ...campaignData(),
        }),
      });
      const result = (await response.json().catch(() => ({}))) as SubmitResponse;
      if (response.status === 409) {
        setLineUrl(LINE_URL);
        setSubmitted(true);
        return;
      }
      if (!response.ok || !result.ok) throw new Error(result.error || '報名暫時無法完成，請稍後再試');
      setLineUrl(result.lineUrl || LINE_URL);
      setSubmitted(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : '報名暫時無法完成，請稍後再試');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="registration-title" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
      <div className="relative w-full max-w-3xl max-h-[94dvh] bg-[#090909] border border-red-900/70 rounded-lg shadow-2xl overflow-hidden flex flex-col text-white">
        <header className="px-5 py-4 sm:px-7 sm:py-5 border-b border-red-900/40 flex items-start justify-between gap-4 bg-[#0f0f0f]">
          <div>
            <p className="text-xs font-mono font-bold tracking-[0.15em] text-red-400 mb-1">免費線上說明會</p>
            <h2 id="registration-title" className="text-xl sm:text-2xl font-bold text-white font-display">選擇場次，預約 Threads 流量變現說明會</h2>
            <p className="mt-2 text-sm text-neutral-400">直播約 90 分鐘・使用手機或電腦皆可參加</p>
          </div>
          <button type="button" onClick={closeModal} aria-label="關閉報名視窗" className="min-w-11 min-h-11 grid place-items-center bg-black hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer rounded-md">
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {submitted ? (
            <div className="py-8 sm:py-12 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-green-950/70 border border-green-700 flex items-center justify-center mx-auto text-green-400 rounded-full">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="mt-6 text-2xl font-black font-display">說明會預約完成</h3>
              {selectedSession && <p className="mt-3 text-red-300 font-bold">{formatSession(selectedSession.startsAt)}・台北時間</p>}
              <p className="mt-4 text-sm leading-7 text-neutral-300">系統即將帶您加入世豐官方 LINE。請完成加好友，以便取得說明會相關通知。</p>
              <a href={lineUrl} className="mt-7 min-h-12 px-7 bg-[#06c755] hover:bg-[#05ae4a] text-white font-extrabold rounded-md inline-flex items-center justify-center gap-2 transition-colors" rel="noreferrer">
                立即前往加入 LINE <ArrowRight className="w-5 h-5" />
              </a>
              <p className="mt-3 text-xs text-neutral-500">若沒有自動開啟，請點擊上方按鈕。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              <fieldset>
                <legend className="text-sm font-bold text-white mb-3 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-red-500" />1. 選擇直播場次</legend>
                {loadingSessions ? (
                  <div className="min-h-28 border border-neutral-800 rounded-md grid place-items-center text-neutral-400" role="status"><span className="inline-flex items-center gap-2"><LoaderCircle className="w-5 h-5 animate-spin motion-reduce:animate-none" />正在讀取可報名場次…</span></div>
                ) : sessions.length === 0 ? (
                  <div className="min-h-28 border border-neutral-800 rounded-md grid place-items-center text-center px-5 text-neutral-400"><p>目前尚無開放中的場次，請稍後再回來查看。</p></div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {sessions.map((session) => {
                      const selected = selectedSessionId === session.id;
                      return (
                        <label key={session.id} className={`min-h-28 p-4 border rounded-md cursor-pointer transition-colors flex gap-3 ${selected ? 'border-red-500 bg-red-950/35' : 'border-neutral-800 bg-[#111] hover:border-neutral-600'}`}>
                          <input type="radio" name="webinar-session" value={session.id} checked={selected} onChange={() => setSelectedSessionId(session.id)} className="mt-1 w-4 h-4 accent-red-600 shrink-0" />
                          <span>
                            <strong className="block text-base text-white">{formatSession(session.startsAt)}</strong>
                            <span className="mt-2 text-xs text-neutral-400 flex items-center gap-1.5"><Clock3 className="w-4 h-4" />約 {session.durationMinutes} 分鐘・線上直播</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="text-sm font-bold text-white mb-3 flex items-center gap-2"><UserRound className="w-5 h-5 text-red-500" />2. 填寫聯絡資料</legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="grid gap-2 text-sm font-bold text-neutral-200 sm:col-span-2">姓名／稱呼<span className="relative"><UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" /><input autoComplete="name" className="w-full min-h-12 bg-[#111] border border-neutral-700 rounded-md pl-11 pr-3 text-base text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-900" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required minLength={2} maxLength={60} /></span></label>
                  <label className="grid gap-2 text-sm font-bold text-neutral-200">手機號碼<span className="relative"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" /><input type="tel" inputMode="tel" autoComplete="tel" className="w-full min-h-12 bg-[#111] border border-neutral-700 rounded-md pl-11 pr-3 text-base text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-900" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="09xxxxxxxx" required /></span></label>
                  <label className="grid gap-2 text-sm font-bold text-neutral-200">Email<span className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" /><input type="email" inputMode="email" autoComplete="email" className="w-full min-h-12 bg-[#111] border border-neutral-700 rounded-md pl-11 pr-3 text-base text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-900" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="name@example.com" required /></span></label>
                </div>
                <label className="sr-only" aria-hidden="true">網站<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></label>
                <label className="min-h-11 flex items-start gap-3 text-sm leading-6 text-neutral-300 cursor-pointer"><input type="checkbox" className="mt-1 w-4 h-4 accent-red-600 shrink-0" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} required /><span>我同意將上述資料用於本次說明會報名、聯繫與後續通知。</span></label>
              </fieldset>

              {error && <p className="p-3 bg-red-950/60 border border-red-800 rounded-md text-sm text-red-200 flex items-start gap-2" role="alert"><CircleAlert className="w-5 h-5 shrink-0" />{error}</p>}

              <button type="submit" disabled={submitting || loadingSessions || sessions.length === 0} className="w-full min-h-14 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 disabled:opacity-45 disabled:cursor-not-allowed text-white font-extrabold tracking-wider text-sm transition-colors cursor-pointer rounded-md flex items-center justify-center gap-2 shadow-xl">
                {submitting ? <><LoaderCircle className="w-5 h-5 animate-spin motion-reduce:animate-none" />正在完成報名…</> : <>確認場次並免費報名<ArrowRight className="w-5 h-5" /></>}
              </button>
              <p className="text-center text-xs leading-5 text-neutral-500">送出後會自動前往世豐官方 LINE；加入好友與填表為兩個獨立步驟。</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
