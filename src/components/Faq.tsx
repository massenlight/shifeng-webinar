import React, { useState } from 'react';
import { FAQS } from '../data/courseData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#050505] text-white relative border-b border-red-900/30 overflow-hidden scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0f0f0f] border border-red-900/40 text-xs font-mono font-bold text-red-400 uppercase tracking-[0.2em] rounded-sm">
            <HelpCircle className="w-4 h-4 text-red-600" />
            <span className="hidden sm:inline">FREQUENTLY ASKED QUESTIONS 常見問題</span>
            <span className="inline sm:hidden">FAQ 常見問題</span>
          </div>

          <h2 className="font-display text-[28px] sm:text-5xl font-black text-white tracking-tight">
            關於《千萬流量脆煉計畫》<br className="inline sm:hidden" />常見解答
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-sm border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0f0f0f] border-red-800 shadow-xl'
                    : 'bg-[#0f0f0f] border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className={`font-bold text-base sm:text-lg font-display ${faq.isHighlighted || faq.q.includes('我沒有粉絲') ? 'text-red-500' : 'text-white'}`}>
                    {faq.q}
                  </span>
                  <div className="p-1.5 bg-black border border-neutral-800 text-neutral-400 shrink-0 rounded-sm">
                    {isOpen ? <ChevronUp className="w-5 h-5 text-red-400" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 space-y-4">
                    <div className="whitespace-pre-line">{faq.a}</div>
                    {faq.imageUrl && (
                      <div className="mt-4 rounded-sm overflow-hidden max-w-xl bg-transparent">
                        <img
                          src={faq.imageUrl}
                          alt={faq.q}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-cover bg-transparent"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
