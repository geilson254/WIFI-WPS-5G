
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { geminiService } from '../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const VirtualAssistant: React.FC = () => {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { label: 'Como baixar?', query: 'Como posso baixar o aplicativo no meu celular e computador?' },
    { label: 'Funcionalidades', query: 'O que o aplicativo WiFi WPS 5G é capaz de fazer?' },
    { label: 'Quem criou?', query: 'Quem é o desenvolvedor deste aplicativo?' },
    { label: 'É seguro?', query: 'O aplicativo é seguro para auditar minha rede WiFi?' }
  ];

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
    if (isOpen && !chatRef.current) {
      chatRef.current = geminiService.createAssistantChat(getLanguageLabel(language));
      setMessages([{ role: 'assistant', text: t('assistant.welcome') }]);
    }
  }, [isOpen, language, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customQuery?: string) => {
    const queryToSend = customQuery || input;
    if (!queryToSend.trim() || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: queryToSend }]);
    setIsTyping(true);

    try {
      if (!chatRef.current) {
        chatRef.current = geminiService.createAssistantChat(getLanguageLabel(language));
      }
      const result = await chatRef.current.sendMessage({ message: queryToSend });
      setMessages(prev => [...prev, { role: 'assistant', text: result.text || '...' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Desculpe, tive um erro de conexão. Tente novamente." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1000] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-6 w-80 sm:w-96 h-[600px] bg-[#0c0c0e]/95 backdrop-blur-2xl border border-zinc-800 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500 ring-1 ring-white/5">
          <div className="p-6 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-cyan-900/20">🤖</div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#0c0c0e] rounded-full"></div>
              </div>
              <div>
                <h4 className="text-sm font-black text-white tracking-tight">{t('assistant.title')}</h4>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Online Expert</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-zinc-800/50 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-transparent to-transparent"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-500`}
              >
                <div 
                  className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-lg ${
                    msg.role === 'user' 
                    ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none border border-white/10' 
                    : 'bg-zinc-800/50 text-zinc-200 rounded-tl-none border border-zinc-700/50 backdrop-blur-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-4 rounded-3xl rounded-tl-none flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 space-y-4">
            {/* Quick Suggestions */}
            {messages.length < 4 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q.query)}
                    className="px-3 py-1.5 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-full text-[10px] text-zinc-400 hover:text-cyan-400 transition-all font-bold uppercase tracking-tighter"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
              className="relative"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('assistant.placeholder')}
                className="w-full bg-black/50 border border-zinc-800 rounded-[1.25rem] py-4 pl-5 pr-14 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-zinc-700"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white hover:bg-cyan-500 disabled:opacity-30 disabled:grayscale transition-all shadow-lg shadow-cyan-900/20 active:scale-90"
              >
                <span className="text-lg rotate-90">▲</span>
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-2 opacity-30">
               <div className="h-px bg-zinc-800 flex-1"></div>
               <p className="text-[8px] text-zinc-600 font-black uppercase tracking-[0.3em]">
                 Created by <span className="text-zinc-500">Geilson</span>
               </p>
               <div className="h-px bg-zinc-800 flex-1"></div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button Premium */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-3xl shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 relative group ${
          isOpen 
          ? 'bg-zinc-800 text-zinc-400 border border-zinc-700' 
          : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/40'
        }`}
      >
        <div className="absolute inset-0 bg-white/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? (
          <span className="rotate-90">✕</span>
        ) : (
          <div className="relative">
             <span>💬</span>
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-cyan-500 animate-bounce"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default VirtualAssistant;
