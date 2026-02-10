
import React, { useState } from 'react';

const KeyExtractor: React.FC = () => {
  const [platform, setPlatform] = useState<'windows' | 'mac' | 'android' | 'ios'>('windows');
  const [isExtracting, setIsExtracting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const startExtraction = () => {
    setIsExtracting(true);
    setTerminalOutput([]);
    const lines = [
      "> Initializing system deep scan...",
      "> Accessing kernel network descriptors...",
      "> Identifying saved profiles in WlanSvc...",
      "> Requesting decryption keys from TPM module...",
      "> Error: Sandbox restricted by Browser API.",
      "> Recommendation: Manual execution required for security bypass."
    ];

    let i = 0;
    const interval = setInterval(() => {
      setTerminalOutput(prev => [...prev, lines[i]]);
      i++;
      if (i >= lines.length) {
        clearInterval(interval);
        setIsExtracting(false);
      }
    }, 600);
  };

  const guides = {
    windows: {
      title: "Recuperar no Windows",
      steps: [
        "Abra o Prompt de Comando (CMD) como Administrador.",
        "Digite: netsh wlan show profile",
        "Identifique o nome da rede WiFi desejada.",
        "Digite: netsh wlan show profile name=\"NOME_DA_REDE\" key=clear",
        "A senha aparecerá em 'Conteúdo da Chave'."
      ],
      command: "netsh wlan show profile name=\"SSID\" key=clear"
    },
    mac: {
      title: "Recuperar no macOS",
      steps: [
        "Abra o 'Acesso às Chaves' (Keychain Access).",
        "No campo de busca, digite o nome do WiFi.",
        "Clique duas vezes no item da rede encontrada.",
        "Marque a caixa 'Mostrar senha'.",
        "Insira sua senha de usuário do sistema para visualizar."
      ],
      command: "security find-generic-password -ga \"SSID\" | grep \"password:\""
    },
    android: {
      title: "Recuperar no Android (10+)",
      steps: [
        "Vá em Configurações > Rede e Internet > Wi-Fi.",
        "Toque na engrenagem ao lado da rede conectada.",
        "Toque em 'Compartilhar' (ícone de QR Code).",
        "A senha pode aparecer em texto abaixo do QR Code.",
        "Se não, tire print e use um leitor de QR no Google Lens."
      ],
      command: "Nível de Sistema: Configurações -> Wi-Fi -> QR Code"
    },
    ios: {
      title: "Recuperar no iOS (16+)",
      steps: [
        "Vá em Ajustes > Wi-Fi.",
        "Toque no ícone '(i)' ao lado da rede conectada.",
        "Toque no campo 'Senha' (protegido por pontos).",
        "Use o FaceID ou TouchID para revelar o texto.",
        "Copie a senha para a área de transferência."
      ],
      command: "Ajustes -> Wi-Fi -> Senha (Revelar)"
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
           Extração de Chaves Locais
        </h2>
        <p className="text-zinc-500 mt-2">Descubra a senha da rede que você está usando no momento ou redes salvas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Terminal Simulation */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[400px]">
          <div className="bg-zinc-900 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Root Console Simulator</span>
          </div>
          <div className="flex-1 p-6 mono text-xs space-y-2 overflow-y-auto">
            {terminalOutput.map((line, i) => (
              <p key={i} className={line.startsWith('>') ? 'text-zinc-400' : line.includes('Error') ? 'text-red-500' : 'text-cyan-500'}>
                {line}
              </p>
            ))}
            {!isExtracting && terminalOutput.length === 0 && (
              <p className="text-zinc-600 italic">Console ocioso. Inicie a varredura para detectar hooks de sistema.</p>
            )}
            {isExtracting && <div className="w-2 h-4 bg-cyan-500 animate-pulse inline-block align-middle ml-1"></div>}
          </div>
          <div className="p-4 bg-zinc-900/50">
            <button 
              onClick={startExtraction}
              disabled={isExtracting}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-cyan-500 font-bold py-2 rounded-xl transition-all border border-cyan-500/10"
            >
              {isExtracting ? 'PROCESSANDO...' : 'EXECUTAR SCAN DE MEMÓRIA'}
            </button>
          </div>
        </div>

        {/* Guides Section */}
        <div className="space-y-6">
          <div className="flex bg-zinc-900/50 p-1 rounded-2xl border border-zinc-800">
            {Object.keys(guides).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p as any)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                  platform === p ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-3xl h-[330px] overflow-auto">
            <h3 className="text-lg font-bold text-zinc-100 mb-4">{guides[platform].title}</h3>
            <div className="space-y-4">
              {guides[platform].steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-zinc-400">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-black/40 rounded-xl border border-zinc-800 relative group">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1 tracking-widest">Script/Comando</p>
              <code className="text-cyan-500 text-xs break-all mono">{guides[platform].command}</code>
              <button 
                onClick={() => navigator.clipboard.writeText(guides[platform].command)}
                className="absolute right-2 top-2 text-zinc-600 hover:text-white transition-colors"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl flex items-start gap-4">
        <span className="text-2xl">💡</span>
        <div>
          <h4 className="text-amber-500 font-bold mb-1">Por que o aplicativo não extrai sozinho?</h4>
          <p className="text-sm text-zinc-400">
            Devido à arquitetura de "Sandbox" de todos os navegadores modernos, uma aplicação web **não possui permissão** para ler arquivos protegidos do seu sistema operacional. 
            Esta ferramenta fornece os comandos nativos para você realizar a auditoria local com total controle e segurança.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyExtractor;
