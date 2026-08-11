import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';
import { Cpu, Zap, Target, Rocket, Clock, CheckCircle2, ChevronDown, ChevronUp, BookOpen, Flame, ChevronRight, Sparkles, TrendingUp, XCircle } from 'lucide-react';

export const CurriculumModules: React.FC = () => {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-red-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-red-500" />;
      case 'Target': return <Target className="w-5 h-5 text-red-500" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-red-500" />;
      default: return <BookOpen className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="modules" className="py-20 md:py-28 bg-[#050505] text-white relative border-b border-red-900/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono font-bold text-red-400 uppercase tracking-[0.2em] rounded-sm">
            全面拆解Threads流量變現實戰地圖
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            誰最適合學習<br />
            《千萬流量脆煉計畫》？
          </h2>
        </div>

        {/* Modules Accordion List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {COURSE_MODULES.map((module) => {
            const isExpanded = expandedModule === module.id;
            return (
              <div
                key={module.id}
                className={`rounded-sm border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0f0f0f] border-red-800 shadow-2xl'
                    : 'bg-[#0f0f0f] border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Module Header */}
                <button
                  onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                  className="w-full p-5 sm:p-8 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 cursor-pointer"
                >
                  {/* Left Group on Desktop / Top Row + Mobile Title */}
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                    {/* Top Row for Mobile / Icon+Badge for Desktop */}
                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 sm:gap-6">
                      <div className="flex items-center gap-3 sm:gap-6">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 bg-black border border-red-900/60 flex items-center justify-center shrink-0 rounded-sm">
                          {getModuleIcon(module.icon)}
                        </div>

                        {/* Badge & Duration (Mobile only) */}
                        <div className="flex sm:hidden flex-col items-start gap-1">
                          <span className="inline-block px-2.5 py-0.5 bg-red-950 text-red-400 text-xs font-mono font-bold border border-red-900/80 rounded-sm w-fit">
                            {module.badge}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                            <Clock className="w-3.5 h-3.5 text-neutral-500" />
                            {module.duration}
                          </span>
                        </div>
                      </div>

                      {/* Chevron dropdown box on Mobile */}
                      <div className="flex sm:hidden w-9 h-9 bg-black border border-neutral-800 text-neutral-400 shrink-0 rounded-sm items-center justify-center">
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-red-400" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Desktop Metadata + Title */}
                    <div className="hidden sm:block space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="inline-block px-2.5 py-0.5 bg-red-950 text-red-400 text-xs font-mono font-bold border border-red-900/80 rounded-sm w-fit">
                          {module.badge}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono text-neutral-400">
                          <Clock className="w-3.5 h-3.5 text-neutral-500" />
                          {module.duration}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white font-display">
                        {module.title}
                      </h3>
                    </div>
                  </div>

                  {/* Mobile Title (placed on a new line below lightning icon, left-aligned) */}
                  <h3 className="block sm:hidden text-lg font-bold text-white font-display text-left pt-1">
                    {module.title}
                  </h3>

                  {/* Chevron dropdown box on Desktop */}
                  <div className="hidden sm:flex w-12 h-12 bg-black border border-neutral-800 text-neutral-400 shrink-0 rounded-sm items-center justify-center">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-red-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Module Lessons Content */}
                {isExpanded && (
                  <div className="px-6 pb-8 pt-2 sm:px-8 border-t border-neutral-800/80 space-y-6">
                    {module.imageUrl ? (
                      module.imagePosition === 'top' ? (
                        <div className="space-y-4 pt-2">
                          <div className="overflow-hidden max-w-xl">
                            <img
                              src={module.imageUrl}
                              alt={module.title}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                            {module.description}
                          </p>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-12 gap-6 items-center pt-2">
                          <div className="md:col-span-5 overflow-hidden">
                            <img
                              src={module.imageUrl}
                              alt={module.title}
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <p className="md:col-span-7 text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                            {module.description}
                          </p>
                        </div>
                      )
                    ) : (
                      <p className="text-sm sm:text-base text-neutral-300 leading-relaxed whitespace-pre-line">
                        {module.description}
                      </p>
                    )}

                    <div className="space-y-3 pt-2">
                      <div className="grid sm:grid-cols-2 gap-3">
                        {module.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-sm bg-black border border-neutral-800 flex items-start gap-3 text-xs sm:text-sm text-neutral-200"
                          >
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Q&A and Heading before Comparison Grid */}
        <div className="mt-16 max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-b from-[#180a0a] to-[#0d0d0d] border-2 border-red-600/70 rounded-sm shadow-[0_0_25px_rgba(220,38,38,0.15)] relative overflow-hidden text-center space-y-4">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

          <p className="text-sm sm:text-base font-medium text-neutral-300 leading-relaxed">
            <span className="font-bold text-red-400 mr-1.5">Q：</span>
            打幾個字、發幾張圖，這麼簡單為什麼我沒有流量？
          </p>

          <div className="pt-2 border-t border-red-900/40">
            <p className="text-xl sm:text-2xl font-black text-white leading-snug tracking-wide">
              <span className="inline-block bg-red-600 text-white px-2.5 py-0.5 rounded text-lg sm:text-xl font-black mr-2 shadow-sm align-middle">
                A
              </span>
              <span className="align-middle">
                關鍵在你沒有掌握這些<span className="text-red-500 underline decoration-red-500 decoration-2 underline-offset-4">「實戰策略」</span>
              </span>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            千萬流量脆煉計畫，你將會學到哪些？
          </h2>
        </div>

        {/* Comparison Grid: Blind Trial vs. Threads Algorithm Mastery */}
        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traditional Trial and Error */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#0f0f0f] border border-neutral-800/80 space-y-6 relative group hover:border-neutral-700 transition-all">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <div className="w-10 h-10 bg-black border border-neutral-800 flex items-center justify-center text-neutral-500">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-300 font-display">傳統摸索型創作者</h3>
                <p className="text-xs font-mono uppercase text-neutral-500">依靠靈感發文、焦慮觸及下降</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-neutral-600 mt-2 shrink-0" />
                <span>憑感覺亂寫文案，缺少吸引目光的前 3 秒黃金鉤子。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-neutral-600 mt-2 shrink-0" />
                <span>不了解轉發與演算法推播權重，讚數永遠個位數。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-neutral-600 mt-2 shrink-0" />
                <span>有流量卻無法引流私訊，不知道如何轉換為訂單收益。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-neutral-600 mt-2 shrink-0" />
                <span>每天苦惱要發什麼題材，發文變成沉重的壓力負擔。</span>
              </li>
            </ul>
          </div>

          {/* Threads Algorithm System */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#0f0f0f] border border-red-900/60 space-y-6 relative shadow-xl shadow-red-950/50 group hover:border-red-700 transition-all">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-red-800 text-[10px] font-mono font-bold text-white tracking-widest uppercase rounded-sm">
              脆煉計畫實戰系
            </div>

            <div className="flex items-center gap-3 border-b border-red-900/40 pb-4">
              <div className="w-10 h-10 bg-red-950/60 border border-red-800 flex items-center justify-center text-red-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">脆煉演算法型學員</h3>
                <p className="text-xs font-mono uppercase text-red-400">掌握底層邏輯、實現自然流變現</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-neutral-200">
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>從「空軍 × 陸軍 × 海軍」三層架構拆解品牌內容策略</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>開頭即抓住眼球！建構SOP最佳文案模板</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>掌握演算法紅利，提升曝光與轉換率</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>AI協作提升產出效率</span>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>獨門祕技——素人起號就爆紅</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Slogan section below comparison grid */}
        <div className="mt-12 text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2">
          <p className="text-[15px] sm:text-lg font-bold text-neutral-200 leading-snug sm:leading-relaxed">
            參透平台底層邏輯，
          </p>
          <p className="text-[15px] sm:text-lg font-bold text-neutral-200 leading-snug sm:leading-relaxed">
            知道哪些內容容易被放大，<br className="inline sm:hidden" />哪些內容永遠沒有流量。
          </p>
          <p className="text-[15px] sm:text-lg font-bold text-neutral-200 leading-snug sm:leading-relaxed">
            讓你的內容，不只是有人看，更有人願意分享。
          </p>
          <p className="text-[15px] sm:text-lg font-bold text-neutral-200 leading-snug sm:leading-relaxed">
            不用模仿任何人，也能建立自己的影響力。
          </p>
          <p className="text-xl sm:text-2xl font-black text-red-500 leading-relaxed pt-2">
            讓流量從一開始就幫你創造收入。
          </p>
        </div>

        {/* Social Proof Image */}
        <div id="case-studies" className="mt-12 max-w-4xl mx-auto overflow-hidden scroll-mt-24">
          <img
            src={`${import.meta.env.BASE_URL}images/DXY2B8F.webp`}
            alt="學員成果與評價"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Key takeaway sentence */}
        <div className="mt-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
            他們都做到，你一定也可以
          </h3>
        </div>

      </div>
    </section>
  );
};
