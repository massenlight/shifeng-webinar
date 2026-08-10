import React from 'react';
import { Flame, Mail, Phone, MapPin, Building, ShieldAlert, ExternalLink, ArrowUp, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const address = "新北市板橋區雙十路二段79號10樓之2";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <footer className="bg-[#050505] text-white pt-16 pb-12 border-t border-red-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid: Company Info & Embedded Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900/80">
          
          {/* Company & Contact Info (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-800 rotate-45 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 bg-white rotate-[-45deg] flex items-center justify-center">
                  <Flame className="w-3 h-3 text-red-800" />
                </div>
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                《千萬流量脆煉計畫》
              </span>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 font-mono leading-relaxed bg-[#0a0a0a] p-5 border border-neutral-900 rounded-sm">
              <p className="text-red-400 font-bold pb-2.5 border-b border-neutral-900 leading-relaxed">
                本課程由【眾曜智庫學院】代理銷售，課程內容皆有申請智慧財產權，嚴禁轉錄翻拍。
              </p>

              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">眾曜智庫股份有限公司</strong>｜{address}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-2 border-t border-neutral-900">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  <span>客服信箱：<a href="mailto:service@massenlighten.com" className="text-neutral-200 hover:text-red-400 underline transition-colors">service@massenlighten.com</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500 shrink-0" />
                  <span>客服電話：<a href="tel:02-8275-2299" className="text-neutral-200 hover:text-red-400 transition-colors">02-8275-2299</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-red-500 shrink-0" />
                  <span>統一編號：90699029</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold font-mono text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>學院地址地圖</span>
              </h4>
              <span className="text-[11px] font-mono text-neutral-500">雙十路二段79號10樓之2</span>
            </div>

            <div className="relative w-full h-56 sm:h-64 rounded-sm border border-red-900/50 overflow-hidden bg-black shadow-xl">
              <iframe
                title="眾曜智庫股份有限公司地圖"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'grayscale(100%) invert(92%) contrast(130%) hue-rotate(180%)',
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute inset-0 pointer-events-none border border-red-900/30 rounded-sm" />
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <p className="text-center sm:text-left flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <a
              href="https://www.massenlighten.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 underline font-bold transition-colors"
            >
              <span>隱私權政策</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="hidden sm:inline">｜</span>
            <span>© 2026 眾曜智庫 Mass Enlighten All Rights Reserved. 眾曜智庫股份有限公司</span>
          </p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wider shrink-0"
          >
            <span>回到頂部</span>
            <ArrowUp className="w-4 h-4 text-red-500" />
          </button>
        </div>

      </div>
    </footer>
  );
};
