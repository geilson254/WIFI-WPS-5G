
import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import SecurityAuditor from './components/SecurityAuditor';
import PasswordGenerator from './components/PasswordGenerator';
import WiFiMap from './components/WiFiMap';
import KeyExtractor from './components/KeyExtractor';
import AutoConnect from './components/AutoConnect';
import GlobalSearch from './components/GlobalSearch';
import Downloads from './components/Downloads';
import { WiFiNetwork } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);

  const handleNetworkSelect = (network: WiFiNetwork) => {
    setSelectedNetwork(network);
    setActiveTab('auditor');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onStart={() => setActiveTab('scanner')} />;
      case 'scanner':
        return <Scanner onSelect={handleNetworkSelect} />;
      case 'auditor':
        return <SecurityAuditor selectedNetwork={selectedNetwork} />;
      case 'generator':
        return <PasswordGenerator />;
      case 'extractor':
        return <KeyExtractor />;
      case 'autoconnect':
        return <AutoConnect />;
      case 'map':
        return <WiFiMap />;
      case 'search':
        return <GlobalSearch />;
      case 'downloads':
        return <Downloads />;
      default:
        return <Dashboard onStart={() => setActiveTab('scanner')} />;
    }
  };

  return (
    <LanguageProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </LanguageProvider>
  );
};

export default App;
