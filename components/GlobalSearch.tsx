
import React, { useState } from 'react';
import { geminiService, SearchResult } from '../services/geminiService';
import { useTranslation } from '../context/LanguageContext';

const GlobalSearch: React.FC = () => {
  const { t, language } = useTranslation();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);

  const getLanguageLabel = (code: string) => {
    const map: Record<string, string> = {
      'pt-BR': 'Português Brasil',
      'en-US': 'English',
      'es-ES': 'Español',
      'fr-FR': 'Français',
      'de-DE': 'Deutsch',
      'it-IT': 'Italiano'
    };
    return map[code] || 'Português Brasil';
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);
    try {
      const data = await geminiService.searchGlobal(query, getLanguageLabel(language));
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-white flex items-center justify-center gap-3">
          <span className="text-cyan-500">🌐</span> {t('nav.search')}
        </h2>
        <p className="text-zinc-500 text-sm">Utilize a infraestrutura do Google para encontrar informações sobre redes, provedores e infraestrutura de internet em tempo real.</p>
      </div>

      <div className="relative group">
        <form onSubmit={handleSearch} className="relative z-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full bg-zinc-900/50 border-2 border-zinc-800 text-white p-6 pl-14 rounded-3xl text-lg focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-zinc-600"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-xl grayscale opacity-50 group-focus-within:grayscale-0 group-focus-within:opacity-100 transition-all">
            🔍
          </div>
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 rounded-2xl font-bold transition-all ${
              isLoading ? 'bg-zinc-800 text-zinc-500' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20'
            }`}
          >
            {isLoading ? '...' : 'Search'}
          </button>
        </form>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
      </div>

      {isLoading && (
        <div className="p-12 flex flex-col items-center justify-center space-y-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest animate-pulse">Acessando Grounding Matrix...</p>
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
          <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="text-8xl">📄</span>
            </div>
            <div className="prose prose-invert prose-cyan max-w-none">
              <p className="text-zinc-200 leading-relaxed text-lg whitespace-pre-wrap">
                {result.text}
              </p>
            </div>
          </div>

          {result.sources.length > 0 && (
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                🔗 {t('search.sources')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.sources.map((source, i) => (
                  <a
                    key={i}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-black/40 border border-zinc-800 rounded-xl hover:border-cyan-500/50 hover:bg-zinc-800/50 transition-all group"
                  >
                    <span className="text-xs text-zinc-400 font-medium truncate pr-4 group-hover:text-zinc-200">{source.title}</span>
                    <span className="text-cyan-500 text-[10px] font-bold">VISIT ↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!result && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "Onde encontrar WiFi grátis em São Paulo?",
            "Status da rede Starlink no Brasil hoje",
            "Vulnerabilidades conhecidas do roteador Sagemcom",
            "Mapa de hotspots Google WiFi",
            "Como testar velocidade da internet via satélite",
            "Principais provedores de fibra em Portugal"
          ].map((suggestion, i) => (
            <button
              key={i}
              onClick={() => { setQuery(suggestion); }}
              className="p-4 bg-zinc-900/20 border border-zinc-800 rounded-2xl text-left text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
