
import React, { useState } from 'react';

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);

  const generate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
                    (includeNumbers ? "0123456789" : "") + 
                    (includeSymbols ? "!@#$%^&*()_+~`|}{[]:;?><,./-=" : "");
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Gerador Ultra-Seguro</h2>
        <p className="text-zinc-500">Crie senhas resistentes a ataques de força bruta e dicionário.</p>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-8">
        <div className="relative">
          <input 
            type="text" 
            readOnly 
            value={password}
            placeholder="Clique em Gerar"
            className="w-full bg-black/50 border-2 border-zinc-800 text-cyan-400 p-6 rounded-2xl text-2xl font-bold mono text-center focus:outline-none focus:border-cyan-500/50 transition-all"
          />
          {password && (
            <button 
              onClick={() => navigator.clipboard.writeText(password)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-xl transition-all"
            >
              📋
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Comprimento: {length}</label>
            </div>
            <input 
              type="range" 
              min="8" 
              max="64" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-cyan-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeSymbols} 
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 rounded border-zinc-800 bg-zinc-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-zinc-900"
              />
              <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">Incluir Símbolos</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 rounded border-zinc-800 bg-zinc-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-zinc-900"
              />
              <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">Incluir Números</span>
            </label>
          </div>
        </div>

        <button 
          onClick={generate}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl text-lg shadow-xl shadow-cyan-900/20 transition-all active:scale-95"
        >
          Gerar Nova Senha
        </button>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-2xl flex items-start gap-4">
        <div className="text-2xl">💡</div>
        <div>
          <h4 className="text-zinc-200 font-bold mb-1">Dica de Segurança</h4>
          <p className="text-sm text-zinc-500">Mude sua senha de WiFi a cada 90 dias e evite nomes óbvios como sua data de nascimento ou o nome do seu animal de estimação.</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
