import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenRegister: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRegister,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-red-900/30 shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-8 h-8 bg-red-800 rotate-45 flex items-center justify-center shadow-lg shadow-red-950 group-hover:bg-red-600 transition-colors">
            <div className="w-4 h-4 bg-white rotate-[-45deg] flex items-center justify-center">
              <Flame className="w-3 h-3 text-red-800" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-red-400 transition-colors">
              千萬流量<span className="text-red-600 italic">脆煉計畫</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-red-500/90 uppercase font-mono font-semibold">
              VULCAN.THREADS / MASTERCLASS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium uppercase tracking-[0.18em]">
          <button
            onClick={() => scrollToSection('target-audience')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            學員見證
          </button>
          <button
            onClick={() => scrollToSection('instructor')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            老師簡介
          </button>
          <button
            onClick={() => scrollToSection('modules')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            適用對象
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            常見問題
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            我要報名
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Main Call to Action Button */}
          <button
            onClick={onOpenRegister}
            className="px-5 py-2.5 bg-white text-black font-extrabold uppercase text-xs tracking-widest hover:bg-red-700 hover:text-white transition-all duration-200 cursor-pointer shadow-md rounded-sm flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-700 hover:text-white" />
            <span>搶先報名</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-red-950/80 bg-black/95 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('target-audience')}
              className="text-left text-neutral-300 hover:text-red-400 py-1 font-medium"
            >
              學員見證
            </button>
            <button
              onClick={() => scrollToSection('instructor')}
              className="text-left text-neutral-300 hover:text-red-400 py-1 font-medium"
            >
              老師簡介
            </button>
            <button
              onClick={() => scrollToSection('modules')}
              className="text-left text-neutral-300 hover:text-red-400 py-1 font-medium"
            >
              適用對象
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-neutral-300 hover:text-red-400 py-1 font-medium"
            >
              常見問題
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left text-neutral-300 hover:text-red-400 py-1 font-medium"
            >
              我要報名
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-sm shadow-lg shadow-red-900/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>立即搶先報名</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
