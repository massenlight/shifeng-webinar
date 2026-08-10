import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { CurriculumModules } from './components/CurriculumModules';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { DEFAULT_IMAGE_SLOTS } from './data/courseData';
import { Sparkles, Flame } from 'lucide-react';

export default function App() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => {
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

        <PainPoints />

        <CurriculumModules />

        <Faq />

        <Pricing
          onOpenRegister={handleOpenRegister}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Fixed Floating Bottom Bar for Mobile & Desktop */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg p-3 rounded-2xl bg-black/90 backdrop-blur-xl border border-red-800/80 shadow-2xl shadow-red-950 flex items-center justify-between gap-3">
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

      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

    </div>
  );
}
