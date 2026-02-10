
import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';

const Downloads: React.FC = () => {
  const { t } = useTranslation();
  const [downloadingPlatform, setDownloadingPlatform] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showQR, setShowQR] = useState<string | null>(null);

  const platforms = [
    { 
      id: 'windows', 
      name: 'Windows', 
      icon: '🪟', 
      ext: '.exe', 
      version: 'v2.4.0 Stable', 
      size: '42.5MB', 
      color: 'from-blue-600 to-cyan-600',
      hasQR: false 
    },
    { 
      id: 'mac', 
      name: 'macOS', 
      icon: '🍎', 
      ext: '.dmg', 
      version: 'v2.4.0 Silicon/Intel', 
      size: '38.2MB', 
      color: 'from-zinc-600 to-zinc-900',
      hasQR: false
    },
    { 
      id: 'android', 
      name: 'Android', 
      icon: '🤖', 
      ext: '.apk', 
      version: 'v2.3.8 Release', 
      size: '24.1MB', 
      color: 'from-green-600 to-emerald-600',
      hasQR: true
    },
    { 
      id: 'ios', 
      name: 'iOS', 
      icon: '📱', 
      ext: '.ipa', 
      version: 'v2.3.5 TestFlight', 
      size: '31.4MB', 
      color: 'from-indigo-500 to-purple-600',
      hasQR: true
    }
  ];

  const handleDownload = (platform: string) => {
    setDownloadingPlatform(platform);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadingPlatform(null), 2500);
          return 100;
        }
        return prev + Math.random() * 18;
      });
    }, 300);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'WiFi WPS 5G - Security Suite',
      text: 'Baixe agora o melhor auditor WiFi criado por Geilson!',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700 pb-20">
      {/* Landing Header */}
      <div className="text-center space-y-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
        <h2 className="text-5xl font-black text-white tracking-tight">{t('dl.title')}</h2>
        <p className="text-zinc-500 text-xl max-w-3xl mx-auto leading-relaxed">{t('dl.subtitle')}</p>
        
        <div className="flex justify-center gap-4 pt-4">
           <button 
             onClick={handleShare}
             className="px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-300 hover:text-white hover:border-zinc-700 transition-all flex items-center gap-2 group"
           >
             <span>📤</span> {t('common.share')}
           </button>
           <div className="px-6 py-3 bg-green-500/5 border border-green-500/20 rounded-2xl text-green-500 text-sm font-bold flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             {t('dl.safe')}
           </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {platforms.map((p) => (
          <div key={p.id} className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-[3rem] flex flex-col items-center text-center group hover:border-zinc-700 transition-all relative overflow-hidden backdrop-blur-sm">
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${p.color} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className="text-7xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110 drop-shadow-2xl">
              {p.icon}
            </div>
            
            <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{p.name}</h3>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-8">{p.version} • {p.size}</p>
            
            <div className="w-full space-y-3 mt-auto">
              <button
                onClick={() => handleDownload(p.id)}
                disabled={downloadingPlatform !== null}
                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl ${
                  downloadingPlatform === p.id 
                  ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                  : `bg-gradient-to-br ${p.color} text-white shadow-black/40 hover:brightness-110`
                }`}
              >
                {downloadingPlatform === p.id ? 'VERIFYING...' : t('dl.btn')}
              </button>

              {p.hasQR && (
                <button 
                  onClick={() => setShowQR(showQR === p.id ? null : p.id)}
                  className="w-full py-2 text-[10px] font-bold text-zinc-500 hover:text-cyan-400 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  📸 {t('dl.qr')}
                </button>
              )}
            </div>

            {/* QR Code Overlay (Simulated) */}
            {showQR === p.id && (
              <div className="absolute inset-0 bg-[#0a0a0b]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 animate-in zoom-in-95 duration-300 z-10">
                <div className="w-32 h-32 bg-white p-2 rounded-xl mb-4 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                   {/* Fake QR Code Grid */}
                   <div className="w-full h-full bg-black flex flex-wrap gap-[2px] p-[1px]">
                     {Array.from({length: 144}).map((_, i) => (
                       <div key={i} className={`w-[8px] h-[8px] ${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}></div>
                     ))}
                   </div>
                </div>
                <p className="text-[11px] text-white font-bold uppercase mb-4">{t('dl.qr')}</p>
                <button 
                  onClick={() => setShowQR(null)}
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  FECHAR
                </button>
              </div>
            )}

            {/* Progress Overlay */}
            {downloadingPlatform === p.id && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-10 animate-in fade-in duration-300">
                <div className="w-full space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[9px] text-cyan-500 font-black uppercase tracking-widest">Protocol Fetch</p>
                      <h5 className="text-white font-bold text-xs uppercase">{progress >= 100 ? 'SUCCESS' : 'DOWNLOADING'}</h5>
                    </div>
                    <span className="text-2xl font-black text-cyan-500 mono">{Math.floor(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-600 to-blue-400 shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center opacity-50">
                    <p className="text-[8px] text-zinc-500 font-mono truncate max-w-[120px]">CRC32: 0xFD42A8C...</p>
                    <p className="text-[8px] text-zinc-500 font-mono">SECURED BY GS</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CLI Section */}
      <div className="bg-zinc-900/20 border border-zinc-800 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 group relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-500/5 blur-[80px] pointer-events-none group-hover:bg-cyan-500/10 transition-all"></div>
        
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💻</span>
            <h4 className="text-2xl font-bold text-white tracking-tight">Terminal Installation</h4>
          </div>
          <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
            Prefere a linha de comando? Execute o instalador global diretamente no seu bash ou powershell de forma segura.
          </p>
        </div>
        
        <div className="flex-1 w-full max-w-lg z-10">
          <div className="bg-black border border-zinc-800 p-6 rounded-2xl flex items-center justify-between group/cmd hover:border-zinc-600 transition-all shadow-2xl">
            <code className="text-cyan-500 text-sm mono flex items-center gap-3">
              <span className="text-zinc-700 select-none">$</span> curl -sL wifi-wps-5g.dev/sh | bash
            </code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('curl -sL https://wifi-wps-5g.geilson.dev/install.sh | bash');
              }}
              className="p-2 bg-zinc-900 text-zinc-600 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
            >
              📋
            </button>
          </div>
        </div>
      </div>

      {/* Credits Banner */}
      <div className="text-center pt-10">
         <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.3em]">
           Official Distribution Hub • Created by <span className="text-zinc-400 font-black">Geilson</span> • 2024
         </p>
      </div>
    </div>
  );
};

export default Downloads;
