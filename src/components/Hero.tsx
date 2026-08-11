import React, { useState, useEffect } from 'react';
import { COURSE_TITLE, COURSE_SUBTITLE_1, COURSE_SUBTITLE_2 } from '../data/courseData';
import { Flame, ArrowRight, Play, Sparkles, ShieldCheck, Zap, Users } from 'lucide-react';

interface HeroProps {
  heroImageUrl: string;
  onOpenRegister: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroImageUrl,
  onOpenRegister,
}) => {
  // Countdown Timer (Last week Saturday 00:00 calculation)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getLastSaturdayMidnight = (now: Date): Date => {
      const getTargetForMonth = (year: number, month: number) => {
        const d = new Date(year, month + 1, 0, 0, 0, 0, 0);
        while (d.getDay() !== 6) {
          d.setDate(d.getDate() - 1);
        }
        d.setHours(0, 0, 0, 0);
        return d;
      };

      let target = getTargetForMonth(now.getFullYear(), now.getMonth());
      if (now.getTime() >= target.getTime()) {
        target = getTargetForMonth(now.getFullYear(), now.getMonth() + 1);
      }
      return target;
    };

    const updateTimer = () => {
      const now = new Date();
      const targetDate = getLastSaturdayMidnight(now);
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-12 pb-14 md:pt-16 md:pb-20 overflow-hidden bg-[#050505] text-white border-b border-red-900/30">
      {/* Background Radial Ambient Crimson Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/15 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-red-950/40 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle Fine Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Countdown Banner Badge */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#0f0f0f] border border-red-900/40 shadow-xl rounded-sm">
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-red-200">
              限時特惠倒數
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold bg-black px-3 py-1 border border-red-900/60 text-red-400">
              <span className="text-red-300 mr-1">{timeLeft.days} 天</span>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Main Title Section with Background Image */}
        <div className="relative text-left max-w-5xl mx-auto space-y-6 p-8 sm:p-12 md:p-16 rounded-sm overflow-hidden border border-red-900/40 bg-[#0f0f0f] shadow-2xl group">
          
          {/* Background Image (img) - Full brightness / normal display without heavy dark mask */}
          <img
            src={heroImageUrl}
            alt="千萬流量脆煉計畫 - Threads 行銷實戰"
            referrerPolicy="no-referrer"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          {/* Subtle gradient overlay to keep text crisp while keeping image fully visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-6 pt-6 sm:pt-4 text-left max-w-3xl">
            <div>
              <h1 className="font-display text-[28px] sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {COURSE_TITLE}
              </h1>
            </div>

            <div className="space-y-3">
              <p className="text-[28px] font-bold text-red-500 uppercase tracking-widest font-mono">
                {COURSE_SUBTITLE_1}
              </p>
              <p className="text-sm sm:text-lg font-normal text-neutral-300 leading-relaxed">
                {COURSE_SUBTITLE_2}
              </p>
            </div>

            {/* CTA Buttons - Left Aligned */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-6">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-9 py-4 bg-red-800 hover:bg-red-700 text-white font-extrabold text-sm uppercase tracking-widest cursor-pointer transition-all duration-200 shadow-2xl rounded-sm flex items-center justify-center gap-3"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>立即加入脆煉計畫</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('target-audience');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-black/80 hover:bg-neutral-900 border border-neutral-800 hover:border-red-900/60 font-semibold text-xs uppercase tracking-widest text-neutral-300 transition-all cursor-pointer flex items-center justify-center gap-2 rounded-sm"
              >
                <Play className="w-3.5 h-3.5 text-red-500 fill-red-500/20" />
                <span>學員見證</span>
              </button>
            </div>

            {/* Floating / Bottom Stats Bar on Image Background - Left Aligned & Half Width */}
            <div className="pt-6 border-t border-red-900/30 flex flex-col sm:flex-row items-center sm:items-center justify-start gap-6 text-white max-w-lg">
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 bg-red-900/40 border border-red-800 flex items-center justify-center text-red-400 rounded-sm shrink-0">
                  <Flame className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm sm:text-base uppercase tracking-wider font-mono text-neutral-400">Threads 實戰目標</p>
                  <p className="text-base sm:text-lg font-bold text-white">單篇貼文破 1,000,000+ 觸及</p>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-5 text-xs sm:text-sm shrink-0 pt-2 sm:pt-0 sm:border-l sm:border-neutral-800 sm:pl-5 w-full sm:w-auto text-center sm:text-left">
                <div>
                  <span className="block text-red-500 font-extrabold text-2xl sm:text-3xl font-mono">0 廣告費</span>
                  <span className="text-neutral-400 text-sm sm:text-base">自然流量</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Key Value Pill Highlights - moved above social proof stats */}
        <div className="mt-8 sm:mt-14 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto text-xs uppercase tracking-wider font-mono text-neutral-300">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-black/80 border border-red-900/40 rounded-sm">
            <Zap className="w-4 h-4 text-red-600" />
            <span>演算法冷啟動機制</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-black/80 border border-red-900/40 rounded-sm">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>爆文腳本速成</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-black/80 border border-red-900/40 rounded-sm">
            <Users className="w-4 h-4 text-red-600" />
            <span>私域流量直接變現</span>
          </div>
        </div>

        {/* Social Proof Stats Bar */}
        <div className="mt-8 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3 sm:p-5 bg-[#0f0f0f] border border-red-900/30 text-center space-y-0.5 sm:space-y-1 rounded-sm">
            <div className="text-lg sm:text-3xl font-black font-mono text-red-600">1,000,000</div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">引爆累積流量觸及</div>
          </div>
          <div className="p-3 sm:p-5 bg-[#0f0f0f] border border-red-900/30 text-center space-y-0.5 sm:space-y-1 rounded-sm">
            <div className="text-lg sm:text-3xl font-black font-mono text-white">20+</div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">爆款開頭鉤子模組</div>
          </div>
          <div className="p-3 sm:p-5 bg-[#0f0f0f] border border-red-900/30 text-center space-y-0.5 sm:space-y-1 rounded-sm">
            <div className="text-lg sm:text-3xl font-black font-mono text-red-600">98.4%</div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">學員評價實用度</div>
          </div>
          <div className="p-3 sm:p-5 bg-[#0f0f0f] border border-red-900/30 text-center space-y-0.5 sm:space-y-1 rounded-sm">
            <div className="text-lg sm:text-3xl font-black font-mono text-white">100%</div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400">可複製實戰系統</div>
          </div>
        </div>

      </div>
    </section>
  );
};
