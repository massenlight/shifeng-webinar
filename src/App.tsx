import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { CurriculumModules } from './components/CurriculumModules';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { ImagePlaceholderHelper } from './components/ImagePlaceholderHelper';
import { GithubDeployGuide } from './components/GithubDeployGuide';
import { RegistrationModal } from './components/RegistrationModal';
import { DEFAULT_IMAGE_SLOTS } from './data/courseData';
import { ImageSlot } from './types';
import { Sparkles, Flame, Image as ImageIcon, Github } from 'lucide-react';

export default function App() {
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>(DEFAULT_IMAGE_SLOTS);
  const [isImageHelperOpen, setIsImageHelperOpen] = useState(false);
  const [isGithubGuideOpen, setIsGithubGuideOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => {
    setIsRegisterModalOpen(true);
  };

  const handleUpdateImageSlot = (id: string, newUrl: string) => {
    setImageSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, currentUrl: newUrl } : slot))
    );
  };

  const handleResetImages = () => {
    setImageSlots(DEFAULT_IMAGE_SLOTS);
  };

  const heroImage = imageSlots.find((s) => s.id === 'hero_banner')?.currentUrl || DEFAULT_IMAGE_SLOTS[0].currentUrl;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-900 selection:text-white antialiased">
      
      {/* Top Banner Notice for GitHub & Images */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-black border-b border-red-800 text-[11px] sm:text-xs py-1.5 px-4 text-center text-red-200 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <span className="flex items-center gap-1 font-bold">
          <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span>千萬流量脆煉計畫 · 一頁式 GitHub Ready 網頁</span>
        </span>
        <div className="hidden md:flex items-center gap-3 font-mono">
          <button
            onClick={() => setIsImageHelperOpen(true)}
            className="hover:underline text-white font-semibold cursor-pointer flex items-center gap-1"
          >
            <ImageIcon className="w-3 h-3 text-red-400" />
            <span>【點擊替換示意圖照片】</span>
          </button>
          <span>|</span>
          <button
            onClick={() => setIsGithubGuideOpen(true)}
            className="hover:underline text-neutral-300 hover:text-white cursor-pointer flex items-center gap-1"
          >
            <Github className="w-3 h-3 text-neutral-400" />
            <span>【GitHub Pages 部署說明】</span>
          </button>
        </div>
      </div>

      {/* Sticky Header */}
      <Header
        onOpenGithubGuide={() => setIsGithubGuideOpen(true)}
        onOpenImageHelper={() => setIsImageHelperOpen(true)}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          heroImageUrl={heroImage}
          onOpenImageHelper={() => setIsImageHelperOpen(true)}
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
      <Footer
        onOpenGithubGuide={() => setIsGithubGuideOpen(true)}
        onOpenImageHelper={() => setIsImageHelperOpen(true)}
        onOpenRegister={handleOpenRegister}
      />

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

      {/* Modals & Helper Drawers */}
      <ImagePlaceholderHelper
        isOpen={isImageHelperOpen}
        onClose={() => setIsImageHelperOpen(false)}
        imageSlots={imageSlots}
        onUpdateImageSlot={handleUpdateImageSlot}
        onResetImages={handleResetImages}
      />

      <GithubDeployGuide
        isOpen={isGithubGuideOpen}
        onClose={() => setIsGithubGuideOpen(false)}
      />

      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

    </div>
  );
}
