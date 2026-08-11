import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, XCircle, HelpCircle, Cpu, Zap, PenTool, DollarSign, Sparkles, Eye, Share2, Users, Award, ChevronRight, Flame } from 'lucide-react';
import { PAIN_POINT_TEXT_1, PAIN_POINT_TEXT_2, TARGET_ROLES, CORE_LEARNINGS, CORE_PHILOSOPHY_QUOTE_2 } from '../data/courseData';
import { TargetRole } from '../types';

export const PainPoints: React.FC = () => {
  const [activeRole, setActiveRole] = useState<TargetRole>(TARGET_ROLES[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const roleSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    const currentRef = roleSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) return;

    const timer = setInterval(() => {
      setActiveRole((prevRole) => {
        const currentIndex = TARGET_ROLES.findIndex((role) => role.id === prevRole.id);
        const nextIndex = (currentIndex + 1) % TARGET_ROLES.length;
        return TARGET_ROLES[nextIndex];
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, isInView]);

  const getLearningIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye': return <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case 'Share2': return <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case 'Users': return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case 'Award': return <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      default: return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
    }
  };

  const pillars = [
    {
      num: "01",
      title: "Threads 演算法拆解",
      subtitle: "Algorithm Deconstruction",
      description: "掌握獨家空軍、陸軍、海軍的三大全方位心法。",
      icon: Cpu
    },
    {
      num: "02",
      title: "爆文邏輯與鉤子模組",
      subtitle: "Viral Content Formula",
      description: "套用公式開頭腳本，讓陌生人願意駐足並閱讀全文。",
      icon: Zap
    },
    {
      num: "03",
      title: "內容策略與高觸及排版",
      subtitle: "Content Strategy & Copy",
      description: "每週精準配比，讓你的文章緊緊抓住人心。",
      icon: PenTool
    },
    {
      num: "04",
      title: "私域轉換與成交模型",
      subtitle: "Conversion & Monetization",
      description: "打造人設X品牌貼合度，而不是淪為無效流量。",
      icon: DollarSign
    }
  ];
  return (
    <section id="pain-points" className="pt-8 pb-16 md:pt-12 md:pb-24 bg-[#050505] text-white relative border-b border-red-900/30 overflow-hidden">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-950/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Subtle Fine Grid Overlay (Matches Hero section) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Transcribed Quote Highlight Box */}
        <div className="relative max-w-3xl mx-auto p-6 sm:p-10 rounded-sm bg-[#0f0f0f] border border-red-900/50 shadow-2xl mb-8 text-center space-y-6">
          
          <div className="text-red-900/20 font-serif text-8xl absolute top-2 left-6 pointer-events-none select-none">
            “
          </div>

          {/* Transcribed Text Paragraph 1 */}
          <div className="space-y-2 text-lg sm:text-2xl font-bold text-neutral-100 leading-relaxed tracking-wide font-display">
            {PAIN_POINT_TEXT_1.split('\n').map((line, idx) => (
              <p key={idx} className={idx % 2 === 1 ? "text-red-500" : "text-white"}>
                {line}
              </p>
            ))}
          </div>

          <div className="w-24 h-0.5 bg-red-900/60 mx-auto" />

          {/* Transcribed Text Paragraph 2 */}
          <div className="space-y-1 text-xl sm:text-3xl font-black text-white tracking-wider font-display">
            {PAIN_POINT_TEXT_2.split('\n').map((line, idx) => (
              <p key={idx} className={idx === 1 ? "text-red-600 underline decoration-red-800 underline-offset-8" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono uppercase tracking-[0.2em] text-red-400 rounded-sm">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>現象揭密與現實落差</span>
          </div>
          <h2 className="font-display text-[22px] sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            把看似複雜的社群經營，<br />變成任何人都能立即上手的一套實戰系統。
          </h2>
        </div>

        {/* Four-Part Pie Chart: Algorithm, Viral Hooks, Content Strategy, Monetization */}
        <div className="flex justify-center my-12">
          {/* SVG Hero 4-Quarter Pie Chart */}
          <div className="relative w-80 h-80 sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
            <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-[0_0_35px_rgba(220,38,38,0.4)]">
              {/* Slice 1: Top-Right - 演算法 */}
              <path
                d="M 150 40 A 110 110 0 0 1 260 150 L 205 150 A 55 55 0 0 0 150 95 Z"
                fill="#dc2626"
                stroke="#050505"
                strokeWidth="5"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              {/* Slice 2: Bottom-Right - 爆文邏輯 */}
              <path
                d="M 260 150 A 110 110 0 0 1 150 260 L 150 205 A 55 55 0 0 0 205 150 Z"
                fill="#ef4444"
                stroke="#050505"
                strokeWidth="5"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              {/* Slice 3: Bottom-Left - 內容策略 */}
              <path
                d="M 150 260 A 110 110 0 0 1 40 150 L 95 150 A 55 55 0 0 0 150 205 Z"
                fill="#991b1b"
                stroke="#050505"
                strokeWidth="5"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
              {/* Slice 4: Top-Left - 成交模型 */}
              <path
                d="M 40 150 A 110 110 0 0 1 150 40 L 150 95 A 55 55 0 0 0 95 150 Z"
                fill="#7f1d1d"
                stroke="#050505"
                strokeWidth="5"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* On-SVG Text Labels */}
              <text x="205" y="102" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">演算法</text>
              <text x="205" y="208" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">爆文邏輯</text>
              <text x="95" y="208" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">內容策略</text>
              <text x="95" y="102" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">成交模型</text>

              {/* Center Circle Content */}
              <circle cx="150" cy="150" r="50" fill="#0a0a0a" stroke="#dc2626" strokeWidth="2.5" />
              <text x="150" y="145" fill="#ef4444" fontSize="12" fontWeight="900" textAnchor="middle">千萬流量</text>
              <text x="150" y="161" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">脆煉計畫</text>
            </svg>
          </div>
        </div>

        {/* 4 Core Pillars Grid (01~04) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto mb-10 sm:mb-16">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="p-3.5 sm:p-6 rounded-sm bg-[#0f0f0f] border border-neutral-800 hover:border-red-800 transition-all duration-300 group shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-2 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-red-900/80 group-hover:text-red-500 transition-colors font-mono">
                      {pillar.num}
                    </span>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400 group-hover:bg-red-800 group-hover:text-white transition-all rounded-sm">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] font-mono text-red-500/80 uppercase tracking-widest mt-0.5 sm:mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>

                  <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Target Audience Intro & Interactive Role Card */}
        <div id="target-audience" ref={roleSectionRef} className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mt-12 mb-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono uppercase tracking-[0.2em] text-red-400 rounded-sm font-bold">
              學員見證案例
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
              未來無論你是下列哪一種人
            </h2>
          </div>

          {/* Role Selector Tabs */}
          <div 
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 mb-8 sm:mb-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {TARGET_ROLES.map((role) => {
              const isSelected = activeRole.id === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => {
                    setActiveRole(role);
                  }}
                  className={`px-3 py-1.5 sm:px-5 sm:py-3 rounded-sm font-mono uppercase text-xs sm:text-base md:text-lg tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 sm:gap-2 font-bold ${
                    isSelected
                      ? 'bg-red-800 text-white border border-red-600 shadow-xl scale-105'
                      : 'bg-[#0f0f0f] text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <span>{role.title}</span>
                  {isSelected && <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white animate-spin" style={{ animationDuration: '3s' }} />}
                </button>
              );
            })}
          </div>

          {/* Selected Role Interactive Outcome Card */}
          <div 
            className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-sm bg-[#0f0f0f] border border-red-900/60 shadow-2xl space-y-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-red-900/30 pb-6">
              <div>
                <span className="text-xs font-mono text-red-500 uppercase tracking-widest font-bold">
                  {activeRole.subtitle}
                </span>
                <h3 className="text-[19px] sm:text-3xl font-extrabold text-white font-display">
                  【{activeRole.title}】的 Threads 突破解法
                </h3>
              </div>
              <div className="hidden sm:block px-3.5 py-1.5 bg-red-950/80 border border-red-800 text-red-300 text-xs font-mono uppercase tracking-wider rounded-sm font-bold">
                成功案例
              </div>
            </div>

            <div className="overflow-hidden rounded-sm border border-neutral-800 bg-black shadow-xl">
              <img
                src={activeRole.caseImageUrl || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80"}
                alt={`${activeRole.title} 成功案例`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[420px] object-cover hover:scale-105 transition-transform duration-500"
              />
              {activeRole.caseCaption && (
                <div className="px-4 py-3 sm:px-5 sm:py-4 border-t border-neutral-800 bg-[#0f0f0f]">
                  <p className="text-sm sm:text-base font-bold text-neutral-100 leading-relaxed flex items-start gap-2">
                    <span className="text-red-500 shrink-0">▸</span>
                    <span>{activeRole.caseCaption}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transcribed 5 Core Learnings List ("你都將知道：") */}
        <div className="max-w-4xl mx-auto mb-16 space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
              完成《千萬流量脆煉計畫》後，<br />
              你都將知道：
            </h3>
          </div>

          <div className="grid gap-4">
            {CORE_LEARNINGS.map((item, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 rounded-sm bg-[#0f0f0f] border border-neutral-800 hover:border-red-800 transition-all duration-300 flex flex-row items-center gap-3 sm:gap-4 group shadow-lg"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-sm bg-red-950/60 border border-red-800 flex items-center justify-center shrink-0 group-hover:bg-red-800 transition-all">
                  {getLearningIcon(item.icon)}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-red-500 shrink-0">0{index + 1}</span>
                    <h4 className="text-sm sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors font-display">
                      {item.question}
                    </h4>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-red-400 group-hover:translate-x-1 transition-all hidden sm:block" />
              </div>
            ))}
          </div>
        </div>

        {/* 真正的贏家 (Core Philosophy & Redesigned 3D Threads Accelerator) */}
        <div className="mt-20 max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono font-extrabold text-red-400 uppercase tracking-[0.2em] rounded-sm">
              <Flame className="w-4 h-4 text-red-600 animate-pulse" />
              <span>社群勝負的分水嶺</span>
            </div>
          </div>

          <div className="p-8 sm:p-12 rounded-sm bg-[#0f0f0f] border border-red-900/60 shadow-2xl relative text-center space-y-8">
            {/* Paragraph 1 */}
            <div className="space-y-3">
              <p className="font-display text-lg sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                真正的贏家，
                <br />
                不是最勤勞發最多篇文的人，
                <br />
                而是最懂得建立
                <span className="text-red-500 underline decoration-red-800 underline-offset-8 px-2 italic">
                  「流量加速器」
                </span>
                的人。
              </p>
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto" />

            {/* Paragraph 2 */}
            <div className="p-4 sm:p-6 rounded-sm bg-red-950/30 border border-red-900/50 text-xl sm:text-3xl font-bold text-red-400 tracking-wide font-display">
              當別人還在焦慮演算法，
              <br className="hidden sm:inline" />
              你已經開始利用演算法。
            </div>

            {/* Paragraph 3 */}
            <div className="text-neutral-300 text-base sm:text-xl font-medium leading-relaxed max-w-3xl mx-auto space-y-2">
              <p>
                未來，
                <br />
                Threads 很可能就是每一位
                <br />
                <span className="text-white font-bold px-1">創作者</span>、
                <span className="text-white font-bold px-1">品牌</span>與
                <span className="text-white font-bold px-1">企業</span>
                <br className="inline sm:hidden" />
                最重要的流量入口，
              </p>
              <p className="text-red-400 font-bold text-lg sm:text-2xl">
                關鍵在如何脆煉你專屬的流量爆發力。
              </p>
            </div>

            {/* 3D Threads Accelerator Graphic Diagram */}
            <div className="pt-6">
              <div className="p-6 sm:p-8 rounded-sm bg-black/90 border border-neutral-800 relative overflow-hidden">
                {/* Background Ambient Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/30 via-black/90 to-black pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
                  
                  {/* Left Side: Intake Badges */}
                  <div className="grid grid-cols-2 gap-3 w-full md:w-1/4">
                    <div className="px-3 py-2 rounded-sm bg-[#0f0f0f] border border-neutral-700 text-neutral-200 text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap tracking-tighter hover:border-red-500 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      品牌
                    </div>
                    <div className="px-3 py-2 rounded-sm bg-[#0f0f0f] border border-neutral-700 text-neutral-200 text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap tracking-tighter hover:border-red-500 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      企業
                    </div>
                    <div className="px-3 py-2 rounded-sm bg-[#0f0f0f] border border-neutral-700 text-neutral-200 text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap tracking-tighter hover:border-red-500 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      自媒體
                    </div>
                    <div className="px-3 py-2 rounded-sm bg-[#0f0f0f] border border-neutral-700 text-neutral-200 text-base sm:text-lg font-bold shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap tracking-tighter hover:border-red-500 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      創作者
                    </div>
                  </div>

                  {/* Suction Arrow Stream (Desktop) */}
                  <div className="hidden md:flex items-center justify-center text-red-500 animate-pulse">
                    <div className="flex items-center space-x-1">
                      <span className="w-4 h-0.5 bg-gradient-to-r from-transparent to-red-600"></span>
                      <span className="w-4 h-0.5 bg-red-600"></span>
                      <span className="w-4 h-0.5 bg-red-500"></span>
                      <ChevronRight className="w-6 h-6 text-red-500 -ml-2" />
                    </div>
                  </div>

                  {/* Center: 3D Threads Icon Accelerator Core */}
                  <div className="relative flex flex-col items-center justify-center my-2 md:my-0">
                    {/* Outer Glow Halo & Rotating Rings */}
                    <div className="absolute w-40 h-40 rounded-full bg-red-600/25 blur-2xl animate-pulse" />
                    <div className="absolute w-36 h-36 rounded-full border border-red-500/30 animate-spin" style={{ animationDuration: '10s' }} />
                    <div className="absolute w-40 h-40 rounded-full border border-dashed border-red-600/40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />

                    {/* 3D Threads Icon Image */}
                    <img
                      src={`${import.meta.env.BASE_URL}images/dsobka2.webp`}
                      alt="千萬流量脆煉計畫"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(220,38,38,0.8)]"
                    />

                    <div className="mt-3 px-3 py-1 bg-red-950 border border-red-700 text-red-300 text-[11px] font-mono font-bold tracking-widest uppercase rounded-full shadow-lg">
                      千萬流量脆煉計畫
                    </div>
                  </div>

                  {/* Explosion Arrow Stream (Desktop) */}
                  <div className="hidden md:flex items-center justify-center text-red-500 animate-pulse">
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-5 h-5 text-red-400" />
                      <span className="w-3 h-0.5 bg-red-500"></span>
                      <span className="w-4 h-0.5 bg-gradient-to-r from-red-500 to-red-400"></span>
                      <ChevronRight className="w-6 h-6 text-red-400 -ml-2" />
                    </div>
                  </div>

                  {/* Right Side: Outflow Blast Results */}
                  <div className="flex flex-col items-center md:items-start justify-center gap-2.5 w-full md:w-1/3">
                    <div className="px-4 py-3 rounded-sm bg-gradient-to-r from-red-950 via-[#1a0505] to-[#0f0f0f] border border-red-700/80 text-white text-base sm:text-lg font-black shadow-xl flex flex-col items-start gap-1 w-full">
                      <span className="flex items-center gap-2 text-red-400">
                        <Flame className="w-5 h-5 text-red-500" />
                        流量大爆發
                      </span>
                      <span className="text-red-400 font-mono font-black">1,000,000+ 觸及</span>
                    </div>

                    <div className="px-4 py-3 rounded-sm bg-[#0f0f0f] border border-red-900/50 text-neutral-200 text-base sm:text-lg font-bold flex flex-col items-start gap-1 w-full">
                      <span className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        爆款文持續擴散
                      </span>
                      <span className="text-neutral-400 text-sm">演算法推送</span>
                    </div>

                    <div className="px-4 py-3 rounded-sm bg-[#0f0f0f] border border-red-900/50 text-neutral-200 text-base sm:text-lg font-bold flex flex-col items-start gap-1 w-full">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        自動化私域引流
                      </span>
                      <span className="text-neutral-400 text-sm">高效益變現</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 老師簡介 (Instructor Introduction) */}
        <div id="instructor" className="mt-20 max-w-5xl mx-auto pt-16 border-t border-neutral-800/80 scroll-mt-28">
          <div className="space-y-8 relative">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main Instructor Info Grid */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Photo Card */}
              <div className="md:col-span-5 flex flex-col items-center">
                {/* Mobile-only badge above image */}
                <div className="md:hidden w-full max-w-xs sm:max-w-sm mb-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono font-extrabold text-red-400 uppercase tracking-[0.2em] rounded-sm">
                    <Award className="w-4 h-4 text-red-500" />
                    <span>【老師簡介】</span>
                  </div>
                </div>

                <div className="relative w-full max-w-xs sm:max-w-sm flex justify-center">
                  <img
                    src={`${import.meta.env.BASE_URL}images/5QV4lON.webp`}
                    alt="世豐老師"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[420px] object-contain"
                  />
                </div>
              </div>

              {/* Right Column: Key Qualifications & Highlights */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono font-extrabold text-red-400 uppercase tracking-[0.2em] rounded-sm mb-3">
                    <Award className="w-4 h-4 text-red-500" />
                    <span>【老師簡介】</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xs font-mono text-red-500 font-bold uppercase tracking-widest">
                      INSTRUCTOR PROFILE
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                    世豐老師
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1">
                    深耕網路行銷＋前端工程 · 數據驅動的 Threads 爆款操盤手
                  </p>
                </div>

                {/* Highlights list */}
                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-sm bg-[#0f0f0f] border border-neutral-800/90 flex items-start gap-3 hover:border-red-900/60 transition-colors">
                    <span className="text-base leading-none">🌟</span>
                    <span className="text-sm font-bold text-neutral-100">全台最早開始教學 threads 的講師</span>
                  </div>

                  <div className="p-3.5 rounded-sm bg-[#0f0f0f] border border-neutral-800/90 flex items-start gap-3 hover:border-red-900/60 transition-colors">
                    <span className="text-base leading-none">🌟</span>
                    <span className="text-sm font-bold text-neutral-100">台大理工科系畢業，深耕網路行銷＋前端工程</span>
                  </div>

                  <div className="p-3.5 rounded-sm bg-[#0f0f0f] border border-neutral-800/90 flex items-start gap-3 hover:border-red-900/60 transition-colors">
                    <span className="text-base leading-none">🌟</span>
                    <span className="text-sm font-bold text-neutral-100">單月創造破百萬流量並成功變現</span>
                  </div>

                  <div className="p-3.5 rounded-sm bg-[#0f0f0f] border border-neutral-800/90 flex items-start gap-3 hover:border-red-900/60 transition-colors">
                    <span className="text-base leading-none">🌟</span>
                    <span className="text-sm font-bold text-neutral-100">穩定持續企業合作、操盤手培訓滿兩年</span>
                  </div>

                  <div className="p-3.5 rounded-sm bg-[#0f0f0f] border border-neutral-800/90 flex items-start gap-3 hover:border-red-900/60 transition-colors">
                    <span className="text-base leading-none">🌟</span>
                    <span className="text-sm font-bold text-neutral-100">受邀 7-11 企業講座、官方認證脆講師</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Personal Quote / Instructor Message */}
            <div className="p-6 sm:p-8 rounded-sm bg-[#0f0f0f] border border-red-900/50">
              <blockquote className="text-neutral-200 text-base sm:text-lg leading-relaxed font-sans italic border-l-2 border-red-600 pl-4">
                「我是世豐，過去是工程師、也曾在金融業工作。我一直相信數據，也相信機會，當我看見 Threads 成為流量新藍海，更看見許多好品牌因不懂經營而被埋沒。從我過去接觸過各行各業的企業主，只用短短幾週的時間，就能看出驚人成果。現在我將這套獨創的【千萬流量脆煉計畫】完整公開，只要你願意一起掌握數據、掌握機會，你也能透過文字，完成你的理想的一切。」
              </blockquote>
            </div>

            {/* Lecture / Workshop Photo */}
            <div className="mt-8 overflow-hidden rounded-sm">
              <img
                src={`${import.meta.env.BASE_URL}images/50bJkTB.webp`}
                alt="世豐老師講座照片"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
