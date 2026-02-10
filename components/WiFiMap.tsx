
import React, { useEffect, useRef, useState } from 'react';
import { MOCK_NETWORKS } from '../constants';
import { WiFiNetwork, SecurityType } from '../types';
import { GoogleGenAI } from "@google/genai";

declare const L: any;

const WiFiMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const circlesRef = useRef<any[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);

  const clearLayers = () => {
    markersRef.current.forEach(m => m.remove());
    circlesRef.current.forEach(c => c.remove());
    markersRef.current = [];
    circlesRef.current = [];
  };

  const renderMarkers = (loc: [number, number]) => {
    if (!mapRef.current) return;
    clearLayers();

    // Redes filtradas
    const networksToDisplay = filterOpenOnly 
      ? MOCK_NETWORKS.filter(n => n.security === SecurityType.OPEN)
      : MOCK_NETWORKS;

    networksToDisplay.forEach((net) => {
      // Deterministic offset based on ID to keep markers consistent
      const seed = parseInt(net.id) * 123.456;
      const offsetLat = (Math.sin(seed) * 0.005);
      const offsetLng = (Math.cos(seed) * 0.005);
      const netLoc: [number, number] = [loc[0] + offsetLat, loc[1] + offsetLng];
      
      const isOpen = net.security === SecurityType.OPEN;
      const color = isOpen ? '#06b6d4' : (net.isVulnerable ? '#ef4444' : '#22c55e');
      
      const circle = L.circle(netLoc, {
        color: color,
        fillColor: color,
        fillOpacity: isOpen ? 0.2 : 0.1,
        radius: 40 + (Math.abs(net.signalStrength) / 2),
        dashArray: isOpen ? '5, 10' : undefined
      }).addTo(mapRef.current);
      circlesRef.current.push(circle);

      const marker = L.circleMarker(netLoc, {
        radius: isOpen ? 8 : 5,
        fillColor: color,
        color: isOpen ? "#fff" : "#000",
        weight: isOpen ? 2 : 1,
        opacity: 1,
        fillOpacity: 0.9,
        className: isOpen ? 'animate-pulse' : ''
      }).addTo(mapRef.current).bindPopup(`
        <div class="p-2 min-w-[150px]">
          <div class="flex items-center gap-2 mb-1">
            <b class="text-cyan-400 text-sm">${net.ssid}</b>
            ${isOpen ? '<span class="bg-cyan-500/20 text-cyan-400 text-[9px] px-1 rounded border border-cyan-500/30">LIVRE</span>' : ''}
          </div>
          <div class="text-[11px] text-zinc-400 mb-2">
            <span>Segurança: <b>${net.security}</b></span><br/>
            <span>Sinal: <b>${net.signalStrength} dBm</b></span><br/>
            <span class="mono text-zinc-500 uppercase text-[9px]">${net.vendor}</span>
          </div>
          ${isOpen ? `
            <button class="w-full bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold py-1.5 rounded transition-colors uppercase tracking-wider">
              Conectar Agora
            </button>
          ` : `
            <button class="w-full bg-zinc-800 text-zinc-500 text-[10px] font-bold py-1.5 rounded cursor-not-allowed">
              Requer Senha
            </button>
          `}
        </div>
      `);
      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const defaultLoc: [number, number] = [-23.5505, -46.6333];
    
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(defaultLoc, 15);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(loc);
          mapRef.current.setView(loc, 17);
          
          L.circleMarker(loc, {
            radius: 8,
            fillColor: "#fff",
            color: "#06b6d4",
            weight: 3,
            opacity: 1,
            fillOpacity: 1
          }).addTo(mapRef.current).bindPopup("<b>Você</b>");

          renderMarkers(loc);
        },
        () => {
          console.log("Geolocalização negada, usando padrão.");
          setUserLocation(defaultLoc);
          renderMarkers(defaultLoc);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      renderMarkers(userLocation);
    }
  }, [filterOpenOnly, userLocation]);

  const analyzeNeighborhood = async () => {
    if (!userLocation) return;
    setIsAnalysing(true);
    setAiAnalysis(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Quais são as melhores opções de WiFi público e gratuito (aberto) nesta região? Identifique estabelecimentos conhecidos por oferecer conexão estável.",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: userLocation[0],
                longitude: userLocation[1]
              }
            }
          }
        }
      });
      setAiAnalysis(response.text);
    } catch (err) {
      setAiAnalysis("Não foi possível obter recomendações detalhadas para esta área. Tente se mover para uma zona com mais estabelecimentos comerciais.");
    } finally {
      setIsAnalysing(false);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            Localizador de Redes <span className="text-cyan-500 underline decoration-cyan-500/30">Grátis</span>
          </h2>
          <p className="text-zinc-500 text-sm">Mostrando pontos de acesso sem senha e vulneráveis</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setFilterOpenOnly(!filterOpenOnly)}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all border ${
              filterOpenOnly 
                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            {filterOpenOnly ? '✨ Apenas Sem Senha' : '🌐 Todas as Redes'}
          </button>
          <button 
            onClick={analyzeNeighborhood}
            disabled={isAnalysing || !userLocation}
            className={`px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
              isAnalysing || !userLocation ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/20'
            }`}
          >
            {isAnalysing ? 'IA Consultando...' : '🔍 Buscar WiFi Grátis'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3 min-h-[500px] relative">
          <div ref={mapContainerRef} className="absolute inset-0 border border-zinc-800 shadow-2xl rounded-3xl" />
          
          <div className="absolute top-4 left-4 z-[1000] bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl border border-zinc-800 text-[10px] space-y-3 shadow-2xl">
            <h4 className="font-bold text-zinc-500 uppercase tracking-tighter mb-1">Legenda Técnica</h4>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] animate-pulse"></div>
              <span className="text-zinc-200 font-medium">WiFi Aberto (Sem Senha)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span className="text-zinc-400">Vulnerável (Auditoria Necessária)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-zinc-400">Seguro / Protegido</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl h-full overflow-auto flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">IA Advisor</h3>
              <span className="text-[10px] text-zinc-600 bg-black/40 px-2 py-0.5 rounded">Voz do Expert</span>
            </div>
            
            {!aiAnalysis && !isAnalysing && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center text-3xl mb-4 grayscale opacity-40">🤖</div>
                <p className="text-xs text-zinc-500">Clique em "Buscar WiFi Grátis" para que nossa IA localize os melhores pontos de acesso sem senha recomendados por usuários do Google Maps.</p>
              </div>
            )}

            {isAnalysing && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-200"></div>
                </div>
                <div className="h-3 bg-zinc-800 rounded animate-pulse w-full"></div>
                <div className="h-3 bg-zinc-800 rounded animate-pulse w-5/6"></div>
                <div className="h-3 bg-zinc-800 rounded animate-pulse w-4/6"></div>
              </div>
            )}

            {aiAnalysis && (
              <div className="prose prose-invert prose-sm flex-1">
                <div className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap border-l-2 border-indigo-500/30 pl-4 py-1 italic">
                  {aiAnalysis}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-4 tracking-tighter">Melhores Sinais Livres</h4>
              <div className="space-y-3">
                {MOCK_NETWORKS.filter(n => n.security === SecurityType.OPEN).slice(0, 4).map(n => (
                  <div key={n.id} className="group flex items-center justify-between text-[11px] p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl hover:border-cyan-500/30 transition-all cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-zinc-200 font-bold group-hover:text-cyan-400 transition-colors">{n.ssid}</span>
                      <span className="text-[9px] text-zinc-500 mono">{n.vendor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-cyan-500 font-mono font-bold">{Math.abs(n.signalStrength)}%</span>
                       <div className="w-1 h-4 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full" style={{ height: `${100 - (Math.abs(n.signalStrength) / 100 * 100)}%` }}></div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WiFiMap;
