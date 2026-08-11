import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SystemSolutionProps {
  coursePreviewImageUrl: string;
  onOpenImageHelper: () => void;
}

export const SystemSolution: React.FC<SystemSolutionProps> = ({
  coursePreviewImageUrl,
  onOpenImageHelper,
}) => {
  return (
    <section id="system" className="py-12 md:py-20 bg-[#050505] text-white relative border-b border-red-900/30 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-950/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Image Feature Preview with Editable Image Tag */}
        <div className="rounded-sm border border-red-900/40 bg-[#0f0f0f] p-4 sm:p-6 shadow-2xl relative">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-600" />
              <span className="w-2.5 h-2.5 bg-amber-600" />
              <span className="w-2.5 h-2.5 bg-emerald-600" />
              <span className="ml-3 text-xs font-mono text-neutral-400">THREADS_GROWTH_SYSTEM_INTERFACE.PNG</span>
            </div>
            
            <button
              onClick={onOpenImageHelper}
              className="flex items-center gap-1.5 px-3 py-1 bg-red-950/80 hover:bg-red-900 border border-red-800 text-xs text-red-200 cursor-pointer transition-colors rounded-sm font-mono"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>【示意圖】點擊替換此介面照片</span>
            </button>
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden bg-black">
            <img
              src={coursePreviewImageUrl}
              alt="Threads 行銷數據成長示意圖"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover filter brightness-90 contrast-120"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-sm bg-[#050505]/90 backdrop-blur-md border border-neutral-800">
              <div className="text-left space-y-1">
                <span className="text-xs text-red-500 font-mono font-semibold uppercase tracking-wider">REAL-TIME TRAFFIC ACCELERATOR</span>
                <p className="text-base sm:text-lg font-bold text-white">真實學員起號案例：首月突破 180,000+ 精準曝光與私訊詢問</p>
              </div>
              <div className="px-4 py-2 bg-red-800 text-white font-bold text-xs font-mono uppercase tracking-widest rounded-sm">
                流量加速系統運行中
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
