import React, { useState } from 'react';
import { ImageSlot } from '../types';
import { Image as ImageIcon, X, RefreshCw, Upload, Code, Check, ExternalLink } from 'lucide-react';

interface ImagePlaceholderHelperProps {
  isOpen: boolean;
  onClose: () => void;
  imageSlots: ImageSlot[];
  onUpdateImageSlot: (id: string, newUrl: string) => void;
  onResetImages: () => void;
}

export const ImagePlaceholderHelper: React.FC<ImagePlaceholderHelperProps> = ({
  isOpen,
  onClose,
  imageSlots,
  onUpdateImageSlot,
  onResetImages,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCodeLocation = (slot: ImageSlot) => {
    const codeSnippet = `// 請在 /src/data/courseData.ts 中的 DEFAULT_IMAGE_SLOTS 修改 ${slot.id} 的 currentUrl:\n"${slot.currentUrl}"`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedId(slot.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (slotId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onUpdateImageSlot(slotId, imageUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#050505] border border-red-900/60 rounded-sm shadow-2xl overflow-hidden flex flex-col text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-red-900/40 flex items-center justify-between bg-[#0f0f0f]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black border border-red-800 flex items-center justify-center text-red-500 rounded-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">示意圖即時替換助手</h3>
              <p className="text-xs font-mono text-neutral-400">
                本頁面圖片目前為測試示意圖，您可在下方即時測試替換圖片或上傳預覽
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black hover:bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="p-4 rounded-sm bg-[#0f0f0f] border border-red-900/40 text-xs text-red-200 leading-relaxed flex items-start gap-3 font-mono">
            <span className="font-bold shrink-0 px-2 py-0.5 rounded-sm bg-red-900 text-white">提示</span>
            <span>
              您可以在這裡貼上任何圖片網址（如 Unsplash、Imgur、專屬 CDN）或直接由本地上傳。關閉彈窗後畫面會立刻套用您的新圖片！要永久修改，請替換 <code className="bg-black px-1 py-0.5 rounded-sm text-red-300">/src/data/courseData.ts</code> 內的連結。
            </span>
          </div>

          <div className="grid gap-6">
            {imageSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-4 sm:p-5 rounded-sm bg-[#0f0f0f] border border-neutral-800 space-y-4 hover:border-red-800 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-500 uppercase">
                      SLOT ID: {slot.id} ({slot.aspectRatio})
                    </span>
                    <h4 className="text-base font-bold text-white font-display">{slot.name}</h4>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">
                    建議尺寸: {slot.recommendedWidth} x {slot.recommendedHeight}px
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-36 aspect-video sm:aspect-square rounded-sm overflow-hidden bg-black border border-neutral-800 shrink-0">
                    <img
                      src={slot.currentUrl}
                      alt={slot.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  </div>

                  {/* Input and Controls */}
                  <div className="flex-1 space-y-3 w-full">
                    <p className="text-xs text-neutral-400">{slot.description}</p>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono font-medium text-neutral-300">圖片 URL 連結：</label>
                      <input
                        type="text"
                        value={slot.currentUrl}
                        onChange={(e) => onUpdateImageSlot(slot.id, e.target.value)}
                        placeholder="請貼上 https:// 開頭的圖片網址"
                        className="w-full px-3 py-2 rounded-sm bg-black border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <label className="px-3 py-1.5 rounded-sm bg-black hover:bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 cursor-pointer flex items-center gap-1.5 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-red-400" />
                        <span>上傳本地測試圖</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(slot.id, e)}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={() => handleCopyCodeLocation(slot)}
                        className="px-3 py-1.5 rounded-sm bg-black hover:bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        {copiedId === slot.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">已複製代碼位置</span>
                          </>
                        ) : (
                          <>
                            <Code className="w-3.5 h-3.5 text-red-400" />
                            <span>複製代碼位置</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#0f0f0f] flex items-center justify-between">
          <button
            onClick={onResetImages}
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>重設為預設示意圖</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-800 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
          >
            完成修改並關閉
          </button>
        </div>

      </div>
    </div>
  );
};
