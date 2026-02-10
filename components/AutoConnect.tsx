
import React, { useState, useEffect } from 'react';
import { WiFiNetwork, SecurityType } from '../types';
import { MOCK_NETWORKS } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";

const AutoConnect: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<{ success: boolean; method: string; explanation: string } | null>(null);

  const startAutoConnect = async () => {
    if (!selectedNetwork) return;
    
    setIsProcessing(true);
    setProgress(0);
    setLog(["[SYSTEM] Iniciando Protocolo Zero-Key v4.0..."]);
    setResult(null);

    const stages = [
      { msg: "[SCAN] Capturando Beacon Frames do alvo...", time: 1000, prog: 20 },
      { msg: "[INJECT] Iniciando injeção de pacotes para forçar Handshake...", time: 1500, prog: 40 },
      { msg: "[AI] Analisando padrão de criptografia do Fabricante...", time: 1200, prog: 60 },
      { msg: "[EXPLOIT] Testando vulnerabilidades conhecidas (WPS Pixie-Dust/Reaver)...", time: 2000, prog: 85 },
      { msg: "[CLOUD] Consultando Rainbow Tables via Gemini Cloud Engine...", time: 1500, prog: 95 }
    ];

    for (const stage of stages) {
      await new Promise(r => setTimeout(r, stage.time));
      setLog(prev => [...prev, stage.msg]);
      setProgress(stage.prog);
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Simule uma análise de vulnerabilidade técnica para a rede ${selectedNetwork.ssid} (${selectedNetwork.vendor}). 
        O objetivo é explicar como um "Zero-Key Connection" (conexão sem senha manual) funcionaria para esta rede específica 
        (ex: via vulnerabilidade WPS, PIN padrão, ou captura de Handshake 4-way). 
        Seja técnico mas mantenha o tom de auditoria educacional.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              success: { type: Type.BOOLEAN },
              method: { type: Type.STRING, description: "Nome da técnica usada" },
              explanation: { type: Type.STRING, description: "Explicação técnica da falha" }
            },
            required: ["success", "method", "explanation"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setProgress(100);
      setLog(prev => [...prev, "[SUCCESS] Chave efêmera injetada no adaptador de rede."]);
      setResult(data);
    } catch (e) {
      setLog(prev => [...prev, "[ERROR] Falha na descriptografia em tempo real."]);
      setResult({ success: false, method: "N/A", explanation: "O firewall do roteador detectou o excesso de tentativas e bloqueou o endereço MAC." });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-cyan-500">⚡</span> Protocolo Zero-Key
          </h2>
          <p className="text-zinc-500 mt-1">Simulação de conexão automática via exploração de vulnerabilidades de protocolo.</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
           <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center">Aviso de Segurança</p>
           <p className="text-[9px] text-zinc-400 italic">Esta função é um simulador para fins de auditoria e teste de penetração autorizada.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Selector */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Alvos Disponíveis</h3>
          <div className="space-y-2 max-h-[500px] overflow-auto pr-2">
            {MOCK_NETWORKS.filter(n => n.security !== SecurityType.OPEN).map((net) => (
              <div 
                key={net.id}
                onClick={() => !isProcessing && setSelectedNetwork(net)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedNetwork?.id === net.id 
                    ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-900/20' 
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-zinc-200">{net.ssid}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${net.isVulnerable ? 'bg-red-500/10 text-red-500' : 'bg-zinc-800 text-zinc-500'}`}>
                    {net.isVulnerable ? 'Frágil' : 'Robusta'}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 mono">
                  <span>{net.vendor}</span>
                  <span>{net.security}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
            {/* Grid background effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {!selectedNetwork ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-zinc-800/50 flex items-center justify-center text-4xl grayscale opacity-30">🛸</div>
                <h4 className="text-xl font-bold text-zinc-400">Pronto para Sequência</h4>
                <p className="text-sm text-zinc-600 max-w-xs">Selecione uma rede protegida ao lado para iniciar o motor de conexão automática por IA.</p>
              </div>
            ) : (
              <>
                <div className="space-y-6 z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Target SSID</p>
                      <h4 className="text-2xl font-bold text-white mono">{selectedNetwork.ssid}</h4>
                    </div>
                    <button 
                      onClick={startAutoConnect}
                      disabled={isProcessing}
                      className={`px-8 py-3 rounded-xl font-bold transition-all shadow-xl ${
                        isProcessing 
                        ? 'bg-zinc-800 text-zinc-600 cursor-wait' 
                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/30'
                      }`}
                    >
                      {isProcessing ? 'EXPLORANDO...' : 'INICIAR ZERO-KEY'}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                      <span className="text-zinc-500">Decryption Matrix</span>
                      <span className="text-cyan-400">{progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Real-time Logs */}
                  <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4 h-40 overflow-y-auto mono text-[11px] space-y-1 custom-scrollbar">
                    {log.map((line, i) => (
                      <p key={i} className={line.includes('[SUCCESS]') ? 'text-green-500' : line.includes('[AI]') ? 'text-indigo-400' : 'text-zinc-500'}>
                        {line}
                      </p>
                    ))}
                    {isProcessing && <div className="w-2 h-3 bg-cyan-500 animate-pulse inline-block align-middle ml-1"></div>}
                  </div>
                </div>

                {/* Result Message */}
                {result && (
                  <div className={`mt-6 p-6 rounded-2xl border animate-in zoom-in-95 duration-300 z-10 ${
                    result.success ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{result.success ? '✅' : '❌'}</div>
                      <div>
                        <h5 className={`font-bold uppercase text-xs tracking-widest mb-1 ${result.success ? 'text-green-500' : 'text-red-500'}`}>
                          {result.success ? `Vulnerabilidade Explorada: ${result.method}` : 'Falha na Conexão Automática'}
                        </h5>
                        <p className="text-sm text-zinc-300 leading-relaxed">
                          {result.explanation}
                        </p>
                        {result.success && (
                          <div className="mt-4 flex gap-2">
                            <button className="px-4 py-1.5 bg-green-600 text-white text-[10px] font-bold rounded-lg uppercase">
                              Salvar Profile
                            </button>
                            <button className="px-4 py-1.5 bg-zinc-800 text-zinc-400 text-[10px] font-bold rounded-lg uppercase">
                              Relatório Técnico
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl flex items-start gap-4">
            <span className="text-2xl">⚡</span>
            <div>
              <h4 className="text-zinc-300 font-bold mb-1">O que é a Tecnologia Zero-Key?</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                O Protocolo Zero-Key utiliza algoritmos de Deep Learning para prever o PIN do protocolo WPS (Wi-Fi Protected Setup) 
                ou simular a quebra offline de Handshakes 4-way WPA2. Em cenários reais, isso permite que dispositivos se conectem 
                automaticamente a roteadores com implementações falhas do padrão IEEE 802.11 sem a necessidade de entrada manual de senha.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoConnect;
