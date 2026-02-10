
import React, { useState } from 'react';
import { useTranslation, Language } from '../context/LanguageContext';
import VirtualAssistant from './VirtualAssistant';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { t, language, setLanguage } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const tabs = [
    { id: 'dashboard', name: t('nav.home'), icon: '🏠' },
    { id: 'scanner', name: t('nav.scanner'), icon: '📡' },
    { id: 'auditor', name: t('nav.auditor'), icon: '🧠' },
    { id: 'search', name: t('nav.search'), icon: '🌐' },
    { id: 'autoconnect', name: t('nav.autoconnect'), icon: '⚡' },
    { id: 'extractor', name: t('nav.extractor'), icon: '🔑' },
    { id: 'generator', name: t('nav.generator'), icon: '🔐' },
    { id: 'map', name: t('nav.map'), icon: '📍' },
    { id: 'downloads', name: t('nav.downloads'), icon: '📦' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
    { code: 'en-US', label: 'English', flag: '🇺🇸' },
    { code: 'es-ES', label: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', label: 'Français', flag: '🇫🇷' },
    { code: 'de-DE', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it-IT', label: 'Italiano', flag: '🇮🇹' },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0b] overflow-hidden text-zinc-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-[#0c0c0e] flex flex-col z-30 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
        <div className="p-8">
          <h1 className="text-xl font-black text-cyan-500 flex items-center gap-3 tracking-tighter">
            <span className="text-3xl drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">🛡️</span> WiFi WPS 5G
          </h1>
          <p className="text-[10px] text-zinc-600 mt-2 uppercase tracking-[0.2em] font-black italic">Security v2.4 Stable</p>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 relative group ${
                activeTab === tab.id
                  ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-xl shadow-black/40 border border-zinc-700/50'
                  : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'
              }`}
            >
              <span className={`text-xl transition-all duration-500 ${activeTab === tab.id ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'group-hover:scale-110'}`}>{tab.icon}</span>
              <span className="font-bold text-sm tracking-tight">{tab.name}</span>
              {activeTab === tab.id && (
                <div className="absolute left-0 w-1.5 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_15px_rgba(6,182,212,1)]"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-zinc-800/50">
          <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex flex-col items-center text-center">
            <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1 font-black">Powered by Gemini AI</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter italic">Secured by Geilson</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent relative custom-scrollbar">
        <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-10 bg-[#0c0c0e]/90 backdrop-blur-2xl sticky top-0 z-40">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
               <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">{t('common.status')}:</span>
               <span className="bg-green-500/10 text-green-500 text-[10px] px-3 py-1 rounded-full border border-green-500/20 font-black uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                 {t('common.encrypted')}
               </span>
             </div>
             <div className="h-6 w-px bg-zinc-800 hidden md:block"></div>
             <div className="hidden md:flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
               <span className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
               MASTER_NODE_ONLINE
             </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative group">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-xs font-black text-zinc-400 group-hover:text-white"
              >
                <span>{languages.find(l => l.code === language)?.flag}</span>
                <span className="hidden sm:inline uppercase tracking-widest">{languages.find(l => l.code === language)?.code.split('-')[1]}</span>
                <span className="text-[8px] opacity-30 group-hover:opacity-100 transition-opacity">▼</span>
              </button>
              
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#0c0c0e] border border-zinc-800 shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                    <p className="px-4 py-1 text-[8px] text-zinc-600 font-black uppercase tracking-widest mb-1">Select Interface Language</p>
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setShowLangMenu(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3 text-xs transition-all ${
                          language === l.code 
                          ? 'bg-cyan-500/10 text-cyan-400 font-black' 
                          : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        <span className="flex-1 text-left uppercase tracking-widest">{l.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button className="text-zinc-500 hover:text-cyan-500 transition-all duration-300 relative transform hover:scale-110">
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              <span className="text-xl">🔔</span>
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-zinc-800">
               <div className="text-right hidden sm:block">
                 <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">Geilson</p>
                 <p className="text-[9px] text-zinc-600 uppercase tracking-[0.2em] mt-1 font-black">Sys Admin</p>
               </div>
               <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-800 border border-white/10 flex items-center justify-center text-sm font-black text-white shadow-2xl shadow-cyan-900/40 transform hover:rotate-6 transition-transform">
                 GS
               </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 pb-40">
          {children}
        </div>

        <footer className="mt-auto border-t border-zinc-900 bg-[#0c0c0e] p-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="space-y-4">
              <h5 className="text-cyan-500 font-black text-lg tracking-tighter flex items-center gap-2">
                <span>🛡️</span> WiFi WPS 5G Hub
              </h5>
              <p className="text-[11px] text-zinc-600 max-w-xs leading-relaxed font-medium uppercase tracking-tight">
                A tecnologia definitiva em análise de sinal e proteção de rede para a era da inteligência artificial.
              </p>
              <div className="flex gap-4 opacity-40">
                 <span className="text-xl">🪟</span>
                 <span className="text-xl">🍎</span>
                 <span className="text-xl">🤖</span>
                 <span className="text-xl">📱</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-16">
              <div className="space-y-4">
                 <h6 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Recursos</h6>
                 <div className="flex flex-col gap-3">
                    <button className="text-[11px] text-zinc-600 hover:text-cyan-500 text-left transition-colors font-bold uppercase tracking-tighter">Scanner PRO</button>
                    <button className="text-[11px] text-zinc-600 hover:text-cyan-500 text-left transition-colors font-bold uppercase tracking-tighter">Auditoria IA</button>
                    <button className="text-[11px] text-zinc-600 hover:text-cyan-500 text-left transition-colors font-bold uppercase tracking-tighter">API Dev</button>
                 </div>
              </div>
              <div className="space-y-4">
                 <h6 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Suporte</h6>
                 <div className="flex flex-col gap-3">
                    <button className="text-[11px] text-zinc-600 hover:text-white text-left transition-colors font-bold uppercase tracking-tighter">GitHub Repo</button>
                    <button className="text-[11px] text-zinc-600 hover:text-white text-left transition-colors font-bold uppercase tracking-tighter">Discord Sec</button>
                    <button className="text-[11px] text-zinc-600 hover:text-white text-left transition-colors font-bold uppercase tracking-tighter">Manual PDF</button>
                 </div>
              </div>
            </div>

            <div className="text-center md:text-right space-y-4">
               <div className="inline-block p-4 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-left">
                  <p className="text-[9px] text-zinc-600 font-black uppercase mb-1">Official Build ID</p>
                  <code className="text-cyan-500 text-xs font-mono">0x24_GEILSON_STABLE</code>
               </div>
               <p className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                 © 2024 Global Distribution Hub
               </p>
               <p className="text-xs text-zinc-400 font-bold italic">
                 Created with Passion by <span className="text-white font-black underline decoration-cyan-500">Geilson</span>
               </p>
            </div>
          </div>
        </footer>

        <VirtualAssistant />
      </main>
    </div>
  );
};

export default Layout;
