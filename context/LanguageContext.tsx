
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | 'it-IT';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Common
  'common.status': { 'pt-BR': 'Status', 'en-US': 'Status', 'es-ES': 'Estado', 'fr-FR': 'Statut', 'de-DE': 'Status', 'it-IT': 'Stato' },
  'common.encrypted': { 'pt-BR': 'Criptografado', 'en-US': 'Encrypted', 'es-ES': 'Cifrado', 'fr-FR': 'Chiffré', 'de-DE': 'Verschlüsselt', 'it-IT': 'Criptografato' },
  'common.share': { 'pt-BR': 'Compartilhar Link', 'en-US': 'Share Link', 'es-ES': 'Compartir Enlace', 'fr-FR': 'Partager le Lien', 'de-DE': 'Link Teilen', 'it-IT': 'Condividi Link' },
  'common.version': { 'pt-BR': 'Versão Estável', 'en-US': 'Stable Version', 'es-ES': 'Versión Estable', 'fr-FR': 'Version Stable', 'de-DE': 'Stabile Version', 'it-IT': 'Versione Stabile' },
  
  // Navigation
  'nav.home': { 'pt-BR': 'Início', 'en-US': 'Home', 'es-ES': 'Inicio', 'fr-FR': 'Accueil', 'de-DE': 'Startseite', 'it-IT': 'Inizio' },
  'nav.scanner': { 'pt-BR': 'Scanner', 'en-US': 'Scanner', 'es-ES': 'Escáner', 'fr-FR': 'Scanner', 'de-DE': 'Scanner', 'it-IT': 'Scanner' },
  'nav.auditor': { 'pt-BR': 'Auditoria IA', 'en-US': 'AI Auditor', 'es-ES': 'Auditoría IA', 'fr-FR': 'Audit IA', 'de-DE': 'KI-Auditor', 'it-IT': 'Audit IA' },
  'nav.autoconnect': { 'pt-BR': 'Zero-Key', 'en-US': 'Zero-Key', 'es-ES': 'Zero-Key', 'fr-FR': 'Zero-Key', 'de-DE': 'Zero-Key', 'it-IT': 'Zero-Key' },
  'nav.extractor': { 'pt-BR': 'Extrator', 'en-US': 'Extractor', 'es-ES': 'Extractor', 'fr-FR': 'Extracteur', 'de-DE': 'Extraktor', 'it-IT': 'Estrattore' },
  'nav.generator': { 'pt-BR': 'Gerador', 'en-US': 'Generator', 'es-ES': 'Generador', 'fr-FR': 'Générateur', 'de-DE': 'Generator', 'it-IT': 'Generatore' },
  'nav.map': { 'pt-BR': 'Mapa Local', 'en-US': 'Local Map', 'es-ES': 'Mapa Local', 'fr-FR': 'Carte Locale', 'de-DE': 'Karte', 'it-IT': 'Mappa Locale' },
  'nav.search': { 'pt-BR': 'Busca Global', 'en-US': 'Global Search', 'es-ES': 'Búsqueda Global', 'fr-FR': 'Recherche Globale', 'de-DE': 'Globale Suche', 'it-IT': 'Ricerca Globale' },
  'nav.downloads': { 'pt-BR': 'Downloads', 'en-US': 'Downloads', 'es-ES': 'Descargas', 'fr-FR': 'Téléchargements', 'de-DE': 'Downloads', 'it-IT': 'Download' },

  // Downloads
  'dl.title': { 'pt-BR': 'Instalação Multiplataforma', 'en-US': 'Multi-platform Installation', 'es-ES': 'Instalación Multiplataforma', 'fr-FR': 'Installation Multiplateforme', 'de-DE': 'Multi-Plattform Installation', 'it-IT': 'Installazione Multiplataforma' },
  'dl.subtitle': { 'pt-BR': 'Acesse o Hub Oficial e baixe o instalador verificado para o seu dispositivo.', 'en-US': 'Access the Official Hub and download the verified installer for your device.', 'es-ES': 'Accede al Hub Oficial y descarga el instalador verificado para tu dispositivo.', 'fr-FR': 'Accédez au Hub Officiel et téléchargez l\'installateur vérifié pour votre appareil.', 'de-DE': 'Besuchen Sie das offizielle Hub und laden Sie den verifizierten Installer für Ihr Gerät herunter.', 'it-IT': 'Accedi all\'Hub Ufficiale e scarica l\'installer verificato per il tuo dispositivo.' },
  'dl.btn': { 'pt-BR': 'Baixar Agora', 'en-US': 'Download Now', 'es-ES': 'Descargar Ahora', 'fr-FR': 'Télécharger Maintenant', 'de-DE': 'Jetzt Herunterladen', 'it-IT': 'Scarica Ora' },
  'dl.qr': { 'pt-BR': 'Escanear QR Code', 'en-US': 'Scan QR Code', 'es-ES': 'Escanear QR Code', 'fr-FR': 'Scanner le QR Code', 'de-DE': 'QR Code Scannen', 'it-IT': 'Scansiona QR Code' },
  'dl.safe': { 'pt-BR': 'Arquivo Verificado & Seguro', 'en-US': 'Verified & Safe File', 'es-ES': 'Archivo Verificado y Seguro', 'fr-FR': 'Fichier Vérifié et Sûr', 'de-DE': 'Verifizierte und sichere Datei', 'it-IT': 'File Verificato e Sicuro' },

  // Assistant
  'assistant.title': { 'pt-BR': 'Aurora - IA Support', 'en-US': 'Aurora - AI Support', 'es-ES': 'Aurora - Soporte IA', 'fr-FR': 'Aurora - Support IA', 'de-DE': 'Aurora - KI Support', 'it-IT': 'Aurora - Supporto IA' },
  'assistant.welcome': { 'pt-BR': 'Olá! Sou a Aurora. Como posso ajudar você com o WiFi WPS 5G hoje?', 'en-US': 'Hi! I am Aurora. How can I help you with WiFi WPS 5G today?', 'es-ES': '¡Hola! Soy Aurora. ¿Cómo puedo ayudarte con WiFi WPS 5G hoy?', 'fr-FR': 'Salut ! Je suis Aurora. Comment puis-je vous aider avec WiFi WPS 5G aujourd\'hui ?', 'de-DE': 'Hallo! Ich bin Aurora. Wie kann ich Ihnen heute mit WiFi WPS 5G helfen?', 'it-IT': 'Ciao! Sono Aurora. Come posso aiutarti con WiFi WPS 5G oggi?' },
  'assistant.placeholder': { 'pt-BR': 'Digite sua dúvida...', 'en-US': 'Type your question...', 'es-ES': 'Escribe tu duda...', 'fr-FR': 'Tapez votre question...', 'de-DE': 'Schreiben Sie Ihre Frage...', 'it-IT': 'Scrivi la tua domanda...' },

  // Dashboard
  'dash.hero_badge': { 'pt-BR': '🛡️ Auditor de Segurança WiFi', 'en-US': '🛡️ WiFi Security Auditor', 'es-ES': '🛡️ Auditor de Seguridad WiFi', 'fr-FR': '🛡️ Auditeur de Sécurité WiFi', 'de-DE': '🛡️ WLAN-Sicherheitsauditor', 'it-IT': '🛡️ Audit di Sicurezza WiFi' },
  'dash.created_by': { 'pt-BR': 'Criado por', 'en-US': 'Created by', 'es-ES': 'Creado por', 'fr-FR': 'Créé par', 'de-DE': 'Erstellt von', 'it-IT': 'Creato da' },
  'dash.welcome': { 
    'pt-BR': 'Bem-vindo à ferramenta definitiva de análise e segurança WiFi. Nossa plataforma foi desenvolvida para ajudar profissionais e entusiastas a auditar, proteger e gerenciar redes sem fio com tecnologia de ponta.',
    'en-US': 'Welcome to the ultimate WiFi analysis and security tool. Our platform was developed to help professionals and enthusiasts audit, protect, and manage wireless networks with cutting-edge technology.',
    'es-ES': 'Bienvenido a la herramienta definitiva de análisis y seguridad WiFi. Nuestra plataforma ha sido desarrollada para ayudar a profesionales y entusiastas a auditar, proteger y gestionar redes inalámbricas con tecnología de vanguardia.',
    'fr-FR': "Bienvenue dans l'outil ultime d'analyse et de sécurité WiFi. Notre plateforme a été développée pour aider les professionnels et les passionnés à auditer, protéger et gérer les réseaux sans fil avec une technologie de pointe.",
    'de-DE': 'Willkommen beim ultimativen WLAN-Analyse- und Sicherheitstool. Unsere Plattform wurde entwickelt, um Fachleuten und Enthusiasten dabei zu helfen, drahtlose Netzwerke mit modernster Technologie zu prüfen, zu schützen und zu verwalten.',
    'it-IT': 'Benvenuti nello strumento definitivo per l\'analisi e la sicurezza WiFi. La nostra piattaforma è stata sviluppata per aiutare professionisti e appassionati a controllare, proteggere e gestire le reti wireless con tecnologie all\'avanguardia.'
  },
  'dash.cta': { 'pt-BR': 'Começar Escaneamento', 'en-US': 'Start Scanning', 'es-ES': 'Iniciar Escaneo', 'fr-FR': 'Lancer le Scan', 'de-DE': 'Scan Starten', 'it-IT': 'Inizia Scansione' },

  // Search
  'search.placeholder': { 'pt-BR': 'Pergunte sobre pontos WiFi, provedores ou falhas na web...', 'en-US': 'Ask about WiFi spots, providers or web outages...', 'es-ES': 'Pregunta sobre puntos WiFi, proveedores o fallas en la web...', 'fr-FR': 'Posez des questions sur les points WiFi, les fournisseurs ou les pannes...', 'de-DE': 'Fragen Sie nach WLAN-Spots, Providern oder Netzwerkausfällen...', 'it-IT': 'Chiedi di hotspot WiFi, provider o interruzioni web...' },
  'search.sources': { 'pt-BR': 'Fontes Verificadas (Google Search)', 'en-US': 'Verified Sources (Google Search)', 'es-ES': 'Fuentes Verificadas (Google Search)', 'fr-FR': 'Sources Vérifiées (Google Search)', 'de-DE': 'Verifizierte Quellen (Google Suche)', 'it-IT': 'Fonti Verificate (Google Search)' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
