
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoanDetail from './pages/LoanDetail';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Legal from './pages/Legal';
import LoanApplication from './pages/LoanApplication';
import Contact from './pages/Contact';
import LoanCalculator from './components/LoanCalculator';
import { getLoansData } from './constants';
import { Language } from './types';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

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
      setSelectedPostId(null);
      window.scrollTo(0, 0);
    }
  };

  const handleSelectLoan = (loanId: string) => {
    setSelectedLoanId(loanId);
    setCurrentPage('loan-detail');
    window.scrollTo(0, 0);
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentPage('blog-detail');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (currentPage === 'loan-detail' && selectedLoanId) {
      const loan = getLoansData(language).find(l => l.id === selectedLoanId);
      if (loan) {
        return <LoanDetail loan={loan} onBack={() => handleNavigate('home')} language={language} />;
      }
    }

    if (currentPage === 'blog-detail' && selectedPostId) {
      return <BlogPostDetail postId={selectedPostId} language={language} onBack={() => setCurrentPage('blog')} />;
    }

    if (currentPage === 'legal-terms') {
      return <Legal type="terms" language={language} onBack={() => handleNavigate('home')} />;
    }

    if (currentPage === 'legal-privacy') {
      return <Legal type="privacy" language={language} onBack={() => handleNavigate('home')} />;
    }

    if (currentPage === 'legal-cookies') {
      return <Legal type="cookies" language={language} onBack={() => handleNavigate('home')} />;
    }

    if (currentPage === 'loan-application') {
      return <LoanApplication language={language} onBack={() => handleNavigate('home')} />;
    }

    if (currentPage === 'contact') {
      return <Contact language={language} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} language={language} />;
      case 'blog':
        return <Blog language={language} onSelectPost={handleSelectPost} />;
      case 'simulator':
        const t = translations[language].calculator;
        return (
          <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
             <div className="text-center mb-12 space-y-4">
              <h1 className="text-5xl font-black text-gray-900">{t.title}</h1>
              <p className="text-xl text-gray-600">{t.subtitle}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <LoanCalculator language={language} onApply={() => handleNavigate('loan-application')} />
            </div>
          </div>
        );
      default:
        return <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} language={language} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} language={language} onLanguageChange={handleLanguageChange} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer language={language} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
