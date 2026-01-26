
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoanDetail from './pages/LoanDetail';
import { LOANS_DATA } from './constants';
import { LoanInfo } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    if (page === 'loans') {
      const element = document.getElementById('loans');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        setCurrentPage('home');
        setTimeout(() => {
          document.getElementById('loans')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      setCurrentPage(page);
      setSelectedLoanId(null);
      window.scrollTo(0, 0);
    }
  };

  const handleSelectLoan = (loanId: string) => {
    setSelectedLoanId(loanId);
    setCurrentPage('loan-detail');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    if (currentPage === 'loan-detail' && selectedLoanId) {
      const loan = LOANS_DATA.find(l => l.id === selectedLoanId);
      if (loan) {
        return <LoanDetail loan={loan} onBack={() => handleNavigate('home')} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} />;
      case 'simulator':
        return (
          <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
             <div className="text-center mb-12 space-y-4">
              <h1 className="text-5xl font-black text-gray-900">Votre simulation personnalisée</h1>
              <p className="text-xl text-gray-600">Ajustez les curseurs pour obtenir la meilleure offre à 2%.</p>
            </div>
            {/* Direct access to calculator */}
            <div className="bg-white rounded-3xl p-2 shadow-2xl">
              <div className="bg-blue-600 rounded-2xl p-8 mb-8 text-white">
                <h2 className="text-2xl font-bold">Simulateur de Crédit Premium</h2>
                <p className="opacity-80">Notre algorithme calcule vos mensualités en temps réel.</p>
              </div>
              {/* Note: I'm reusing the calculator here directly or could create a dedicated full-page one */}
              <div className="px-8 pb-8">
                <p className="text-gray-500 mb-8 italic text-center">Utilisez le module interactif ci-dessous pour configurer votre prêt idéal.</p>
                <div className="max-w-2xl mx-auto">
                    {/* Placeholder for a more complex simulator if needed, 
                        but the existing LoanCalculator is already very robust */}
                    <div className="transform scale-105">
                      <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'loan-detail' ? (
          <LoanDetail 
            loan={LOANS_DATA.find(l => l.id === selectedLoanId)!} 
            onBack={() => handleNavigate('home')} 
          />
        ) : (
          renderPage()
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
