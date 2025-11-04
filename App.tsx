import React, { useState } from 'react';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';
import Wallet from './components/Wallet';
import Chatbot from './components/Chatbot';
import About from './components/About';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'calculator':
        return <Calculator />;
      case 'wallet':
        return <Wallet />;
      case 'chatbot':
        return <Chatbot />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <TopNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderPage()}
      </main>
    </div>
  );
};

export default App;