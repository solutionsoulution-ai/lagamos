
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoanDetail from './pages/LoanDetail';
import LoanCalculator from './components/LoanCalculator';
import { LOANS_DATA } from './constants';

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

  const renderContent = () => {
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
              <h1 className="text-5xl font-black text-gray-900">Simulateur de Crédit</h1>
              <p className="text-xl text-gray-600">Obtenez une réponse de principe immédiate au taux fixe de 2%.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <LoanCalculator />
            </div>
          </div>
        );
      default:
        return <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
