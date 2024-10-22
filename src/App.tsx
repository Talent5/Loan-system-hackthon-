import React, { useState } from 'react';
import { Layout, Menu, Home, CreditCard, PieChart, Settings } from 'lucide-react';
import Dashboard from './components/Dashboard';
import LoanApplication from './components/LoanApplication';
import RiskAnalysis from './components/RiskAnalysis';
import Options from './components/Options';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'loan-application':
        return <LoanApplication />;
      case 'risk-analysis':
        return <RiskAnalysis />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">LendWise</h1>
          <p className="text-sm text-gray-600">Lending Decision Tool</p>
        </div>
        <nav className="mt-8">
          <a
            href="#"
            className={`flex items-center px-6 py-3 text-gray-700 ${
              activeTab === 'dashboard' ? 'bg-blue-100 border-r-4 border-blue-600' : ''
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </a>
          <a
            href="#"
            className={`flex items-center px-6 py-3 text-gray-700 ${
              activeTab === 'loan-application' ? 'bg-blue-100 border-r-4 border-blue-600' : ''
            }`}
            onClick={() => setActiveTab('loan-application')}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            Loan Application
          </a>
          <a
            href="#"
            className={`flex items-center px-6 py-3 text-gray-700 ${
              activeTab === 'risk-analysis' ? 'bg-blue-100 border-r-4 border-blue-600' : ''
            }`}
            onClick={() => setActiveTab('risk-analysis')}
          >
            <PieChart className="h-5 w-5 mr-3" />
            Risk Analysis
          </a>
          <a
            href="#"
            className={`flex items-center px-6 py-3 text-gray-700 ${
              activeTab === 'settings' ? 'bg-blue-100 border-r-4 border-blue-600' : ''
            }`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
            </h2>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;