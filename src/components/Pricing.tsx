import React from 'react';
import { PRICING_PLANS } from '../data/courseData';
import { CheckCircle2, Sparkles, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

interface PricingProps {
  onOpenRegister: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenRegister }) => {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#050505] text-white relative border-b border-red-900/30 overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-950/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono font-bold text-red-400 uppercase tracking-[0.2em] rounded-sm">
            千萬流量脆煉計畫
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            請記住——<br />
            你可以選擇繼續等待別人發現你，<br />
            也可以從今天開始，讓世界主動看見你。
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
            當別人還在觀望 Threads，你已經開始發佈爆文、將你的流量變現。
          </p>
        </div>

        {/* Pricing Cards */}
        <div className={`grid ${PRICING_PLANS.length === 1 ? 'grid-cols-1 max-w-xl' : 'md:grid-cols-2 max-w-4xl'} gap-8 mx-auto`}>
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-sm p-8 relative flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-[#0f0f0f] border-2 border-red-700 shadow-2xl'
                  : 'bg-[#0f0f0f] border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-800 text-white font-mono font-bold text-[10px] tracking-widest uppercase shadow-lg flex items-center gap-1.5 rounded-sm">
                  <Flame className="w-3.5 h-3.5" />
                  <span>千萬流量脆煉計畫</span>
                </div>
              )}

              <div className="space-y-3.5 sm:space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-red-950 text-red-400 text-xs font-mono font-bold border border-red-900/80 mb-2 sm:mb-3 rounded-sm">
                    {plan.badge}
                  </span>
                  <h3 className="text-2xl font-black text-white font-display">{plan.name}</h3>
                </div>

                {plan.price ? (
                  <div className="flex items-baseline gap-3 border-b border-neutral-800/80 pb-3 sm:pb-6">
                    <span className="text-4xl sm:text-5xl font-black text-red-500 font-mono">{plan.price}</span>
                    {plan.originalPrice && <span className="text-sm font-mono text-neutral-500 line-through">{plan.originalPrice}</span>}
                  </div>
                ) : (
                  <div className="border-b border-neutral-800/80 pb-3 sm:pb-4" />
                )}

                <ul className="space-y-2 sm:space-y-3 text-sm text-neutral-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-8 border-t border-neutral-800/80">
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className={`w-full py-4 rounded-sm font-extrabold uppercase tracking-widest text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-red-800 hover:text-white shadow-xl'
                      : 'bg-red-900/60 hover:bg-red-800 text-white border border-red-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>免費預約線上說明會</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Threads Opportunity Image Banner */}
        <div className="mt-16 max-w-3xl mx-auto overflow-hidden rounded-sm border border-neutral-800 bg-black shadow-xl">
          <img
            src={`${import.meta.env.BASE_URL}images/Wr7CXiC.webp`}
            alt="你錯過FB、IG、YouTube 的成長期，別再錯過 Threads"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
          />
          <div className="px-4 py-3 sm:px-5 sm:py-4 border-t border-neutral-800 bg-[#0f0f0f]">
            <p className="text-sm sm:text-base font-bold text-neutral-100 leading-relaxed flex items-start gap-2">
              <span className="text-red-500 shrink-0">▸</span>
              <span>你錯過FB的成長期，錯過IG、錯過YouTube … 那你絕對不能再錯過Threads</span>
            </p>
          </div>
        </div>

        {/* Security Guarantee Banner */}
        <div className="mt-8 max-w-3xl mx-auto p-5 sm:p-6 rounded-sm bg-[#0f0f0f] border border-red-900/40 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-left">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-950 border border-red-800 flex items-center justify-center text-red-500 shrink-0 rounded-sm">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="sm:hidden text-base font-bold text-white font-display">實戰承諾與學員權益保障</h4>
          </div>
          <div className="space-y-1">
            <h4 className="hidden sm:block text-base font-bold text-white font-display">實戰承諾與學員權益保障</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              所有課程均提供完整的作業檢視範本與社群討論區服務。導師親自解答，確保你在實作過程中不迷路！
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
