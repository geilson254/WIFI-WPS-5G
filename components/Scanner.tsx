
import React, { useState, useEffect } from 'react';
import { MOCK_NETWORKS } from '../constants';
import { WiFiNetwork, SecurityType } from '../types';

interface ScannerProps {
  onSelect: (network: WiFiNetwork) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onSelect }) => {
  const [networks, setNetworks] = useState<WiFiNetwork[]>(MOCK_NETWORKS);
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Slightly shuffle signal strengths for realism
      setNetworks(prev => prev.map(n => ({
        ...n,
        signalStrength: Math.max(-95, Math.min(-30, n.signalStrength + (Math.random() * 6 - 3)))
      })));
      setIsScanning(false);
    }, 1500);
  };

  useEffect(() => {
    const interval = setInterval(simulateScan, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSignalIcon = (strength: number) => {
    if (strength > -50) return '📶';
    if (strength > -70) return '📶';
    return '📶';
  };

  const getSignalColor = (strength: number) => {
    if (strength > -50) return 'text-green-500';
    if (strength > -70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Redes Próximas</h2>
          <p className="text-zinc-500 text-sm">Escaneando frequências 2.4/5/6GHz</p>
        </div>
        <button 
          onClick={simulateScan}
          disabled={isScanning}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            isScanning ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/20'
          }`}
        >
          {isScanning ? 'Escaneando...' : 'Forçar Scan'}
        </button>
      </div>

      <div className="grid gap-4">
        {networks.map((network) => (
          <div 
            key={network.id}
            onClick={() => onSelect(network)}
            className="group relative bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl hover:border-cyan-500/50 transition-all cursor-pointer flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center gap-4 z-10">
              <div className={`text-2xl ${getSignalColor(network.signalStrength)} bg-zinc-800 w-12 h-12 flex items-center justify-center rounded-xl border border-zinc-700`}>
                {getSignalIcon(network.signalStrength)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  {network.ssid}
                  {network.isVulnerable && (
                    <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 px-1.5 py-0.5 rounded font-bold">Vulnerável</span>
                  )}
                </h3>
                <p className="text-xs text-zinc-500 mono">{network.bssid} • {network.vendor}</p>
              </div>
            </div>

            <div className="flex items-center gap-8 z-10">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Segurança</p>
                <p className="text-sm font-medium text-zinc-300">{network.security}</p>
              </div>
              <div className="text-right w-16">
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Signal</p>
                <p className={`text-sm font-bold ${getSignalColor(network.signalStrength)}`}>{Math.round(network.signalStrength)} dBm</p>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Banda</p>
                <p className="text-sm font-medium text-zinc-300">{network.frequency}</p>
              </div>
              <button className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                ➡️
              </button>
            </div>
            
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scanner;
