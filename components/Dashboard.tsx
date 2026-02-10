
import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';

interface DashboardProps {
  onStart: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStart }) => {
  const { t } = useTranslation();
  const [threatLevel, setThreatLevel] = useState(64);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(prev => Math.max(10, Math.min(99, prev + (Math.random() * 4 - 2))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Redes Mapeadas', value: '42.8K+', icon: '📡', color: 'text-cyan-500' },
    { label: 'Ameaças Identificadas', value: '1.2M+', icon: '🛡️', color: 'text-red-500' },
    { label: 'Usuários Online', value: '8.4K', icon: '👥', color: 'text-green-500' },
    { label: 'Nodes Globais', value: '12', icon: '🌍', color: 'text-indigo-500' }
  ];

  const news = [
    { title: "Vulnerabilidade WPA3 detectada em roteadores Mesh", time: "2 min atrás", type: "CRITICAL" },
    { title: "Novo firmware Sagemcom corrige falha de WPS", time: "1 hora atrás", type: "UPDATE" },
    { title: "Aumento de 15% em ataques de força bruta em SP", time: "3 horas atrás", type: "SECURITY" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      {/* Hero Section Premium */}
      <div className="relative overflow-hidden rounded-[3.5rem] bg-zinc-900/40 border border-zinc-800 p-12 md:p-20 flex flex-col items-center text-center group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
          <span className="text-[12rem] rotate-12 block">📶</span>
        </div>
        
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          {t('dash.hero_badge')}
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter leading-none">
          WiFi WPS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">5G</span>
        </h1>
        
        <div className="mb-8 flex items-center gap-3">
          <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{t('dash.created_by')}</span>
          <span className="px-3 py-1 bg-white text-black text-[10px] font-black rounded-lg uppercase italic shadow-lg shadow-white/5">Geilson</span>
        </div>
        
        <p className="text-zinc-400 text-xl max-w-3xl leading-relaxed mb-12 font-medium">
          {t('dash.welcome')}
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button 
            onClick={onStart}
            className="px-12 py-5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-cyan-900/40 transition-all active:scale-95 text-lg flex items-center gap-3 group/btn"
          >
            {t('dash.cta')}
            <span className="group-hover:translate-x-1 transition-transform">➡️</span>
          </button>
          
          <div className="px-8 py-5 bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 text-zinc-300 font-bold rounded-2xl flex items-center gap-3 shadow-xl">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
            System Online
          </div>
        </div>

        {/* Compatibility Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 border-t border-zinc-800/50 pt-12 w-full max-w-2xl">
          {[
            { id: 'win', name: 'Windows', icon: '🪟', color: 'hover:text-blue-400' },
            { id: 'mac', name: 'macOS', icon: '🍎', color: 'hover:text-white' },
            { id: 'and', name: 'Android', icon: '🤖', color: 'hover:text-green-400' },
            { id: 'ios', name: 'iOS', icon: '📱', color: 'hover:text-indigo-400' }
          ].map(plat => (
            <div key={plat.id} className={`flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-all duration-500 cursor-default grayscale hover:grayscale-0 group ${plat.color}`}>
               <span className="text-3xl transform group-hover:scale-110 transition-transform">{plat.icon}</span>
               <span className="text-[9px] font-black uppercase tracking-[0.2em]">{plat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Stats Widget */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-[2.5rem] flex flex-col items-center text-center group hover:bg-zinc-900/40 transition-all">
              <span className="text-3xl mb-4 transform group-hover:-translate-y-1 transition-transform">{s.icon}</span>
              <h4 className="text-3xl font-black text-white mb-1 tracking-tighter">{s.value}</h4>
              <p className={`text-[10px] font-black uppercase tracking-widest ${s.color}`}>{s.label}</p>
            </div>
          ))}
          
          <div className="col-span-2 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Global Threat Level</p>
                <h4 className="text-4xl font-black text-white italic">{threatLevel.toFixed(1)}%</h4>
              </div>
              <div className="h-12 w-32 flex items-end gap-1">
                {Array.from({length: 12}).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-red-500/30 rounded-t"
                    style={{ height: `${Math.random() * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-1000" style={{ width: `${threatLevel}%` }}></div>
            </div>
          </div>
        </div>

        {/* Security News Ticker */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Live Security Feed</h3>
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          </div>
          
          <div className="space-y-4">
            {news.map((item, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex justify-between items-center mb-1">
                   <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${
                     item.type === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                     item.type === 'UPDATE' ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' : 
                     'bg-green-500/10 text-green-500 border-green-500/20'
                   }`}>
                     {item.type}
                   </span>
                   <span className="text-[9px] text-zinc-600 font-mono">{item.time}</span>
                </div>
                <p className="text-sm text-zinc-300 font-semibold group-hover:text-white transition-colors leading-snug">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-zinc-800">
             <button className="w-full py-3 bg-zinc-800/50 hover:bg-zinc-800 text-[10px] font-black text-zinc-400 hover:text-white rounded-xl transition-all uppercase tracking-widest">
               Ver Relatório Completo
             </button>
          </div>
        </div>
      </div>

      {/* Ethical Final Banner */}
      <div className="relative p-12 rounded-[4rem] bg-zinc-900/20 border border-zinc-800 flex flex-col md:flex-row items-center gap-10 overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center text-5xl shadow-2xl shadow-amber-900/10 group-hover:scale-110 transition-transform">⚠️</div>
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
             <h4 className="text-amber-500 font-black text-2xl tracking-tighter uppercase">Compromisso de Ética</h4>
             <span className="px-3 py-1 bg-zinc-800 text-zinc-500 text-[9px] font-black rounded-lg uppercase tracking-widest">AUTH: GEILSON_SEC_PRO</span>
          </div>
          <p className="text-zinc-500 leading-relaxed text-sm font-medium">
            O WiFi WPS 5G é uma suíte profissional. O acesso a redes sem autorização é estritamente proibido. 
            Utilize este hub para auditar suas próprias infraestruturas e aprender sobre segurança de redes.
            Software mantido e distribuído por <span className="text-white font-bold">Geilson</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
