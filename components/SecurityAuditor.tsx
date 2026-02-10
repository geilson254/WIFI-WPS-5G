
import React, { useState, useEffect } from 'react';
import { WiFiNetwork, SecurityReport } from '../types';
import { geminiService } from '../services/geminiService';
import { useTranslation } from '../context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SecurityAuditorProps {
  selectedNetwork: WiFiNetwork | null;
}

const SecurityAuditor: React.FC<SecurityAuditorProps> = ({ selectedNetwork }) => {
  const { language } = useTranslation();
  const [report, setReport] = useState<SecurityReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (selectedNetwork) {
      runAudit(selectedNetwork);
    }
  }, [selectedNetwork, language]); // Re-run if language changes while selected

  const runAudit = async (network: WiFiNetwork) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await geminiService.auditNetwork(network, getLanguageLabel(language));
      setReport(data);
    } catch (err) {
      setError("Falha ao processar auditoria com IA. Verifique sua conexão ou chave de API.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedNetwork) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="text-6xl grayscale opacity-50">🤖</div>
        <h3 className="text-xl font-bold text-zinc-300">Nenhuma Rede Selecionada</h3>
        <p className="text-zinc-500 max-w-xs">Selecione uma rede no Scanner para iniciar a análise de segurança via Inteligência Artificial.</p>
      </div>
    );
  }

  const scoreData = [
    { name: 'Segurança', value: report?.score || 0 },
    { name: 'Dificuldade', value: report ? 100 - (report.vulnerabilities.length * 20) : 0 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            Auditoria: <span className="text-cyan-500">{selectedNetwork.ssid}</span>
          </h2>
          <p className="text-zinc-500 text-sm">IA Engine: Gemini 3 Flash Preview ({getLanguageLabel(language)})</p>
        </div>
        <div className="flex items-center gap-2">
           <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-cyan-500'}`}></div>
           <span className="text-xs font-bold text-zinc-400 uppercase tracking-tighter">
             {isLoading ? 'Processing...' : 'Ready'}
           </span>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 bg-zinc-900/30 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <p className="text-zinc-400 animate-pulse">Consultando base de dados de vulnerabilidades...</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500">
           {error}
        </div>
      ) : report ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Métricas Técnicas</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreData} layout="vertical" margin={{ left: 50, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={12} width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                      itemStyle={{ color: '#06b6d4' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                      {scoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#06b6d4' : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">⚠️ Vulnerabilidades</h4>
                <ul className="space-y-2">
                  {report.vulnerabilities.map((v, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex gap-2">
                      <span className="text-red-500">•</span> {v}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">🛡️ Recomendações</h4>
                <ul className="space-y-2">
                  {report.recommendations.map((r, i) => (
                    <li key={i} className="text-sm text-zinc-400 flex gap-2">
                      <span className="text-green-500">✓</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 text-4xl">🔑</div>
              <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Default Passwords</h4>
              <div className="space-y-3">
                {report.likelyDefaultPasswords.map((pw, i) => (
                  <div key={i} className="bg-black/40 border border-zinc-800 p-3 rounded-lg flex items-center justify-between group/pw">
                    <span className="mono text-cyan-400 font-bold">{pw}</span>
                    <button onClick={() => navigator.clipboard.writeText(pw)} className="text-xs text-zinc-500 hover:text-white transition-colors">Copiar</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-xl shadow-black/50">
              <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Cracking Estimation</h4>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-3xl font-bold text-white mono">{report.estimatedCrackingTime}</div>
                <p className="text-xs text-zinc-500 italic">Basado en el lenguaje seleccionado.</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SecurityAuditor;
