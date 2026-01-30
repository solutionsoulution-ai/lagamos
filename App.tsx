
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import LoanDetail from './pages/LoanDetail';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Legal from './pages/Legal';
import LoanApplication from './pages/LoanApplication';
import Contact from './pages/Contact';
import Success from './pages/Success';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Help from './pages/Help';
import Faq from './pages/Faq';
import LoanCalculator from './components/LoanCalculator';
import { getLoansData } from './constants';
import { translations } from './translations';
import { Language, User, LoanInfo } from './types';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loans, setLoans] = useState<LoanInfo[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentLanguage: Language = 'fr';

  useEffect(() => {
    // Chargement immédiat des données locales
    setLoans(getLoansData(currentLanguage));
    setPosts(translations[currentLanguage].blog.posts || []);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage(userData.role === 'admin' ? 'admin-dashboard' : 'client-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('home');
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
    if (isLoading) {
      return (
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            <p className="text-emerald-600 font-bold animate-pulse">Chargement Europfy...</p>
          </div>
        </div>
      );
    }

    if (currentPage === 'login') {
      return <Login language={currentLanguage} onLogin={handleLogin} onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'admin-dashboard') {
      if (user?.role !== 'admin') {
        setCurrentPage('login');
        return null;
      }
      return <AdminDashboard language={currentLanguage} />;
    }

    if (currentPage === 'client-dashboard') {
      if (!user) {
        setCurrentPage('login');
        return null;
      }
      return <ClientDashboard language={currentLanguage} user={user} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'loan-detail' && selectedLoanId) {
      const loan = loans.find(l => l.id === selectedLoanId);
      if (loan) {
        return <LoanDetail loan={loan} onBack={() => handleNavigate('home')} language={currentLanguage} onApply={() => handleNavigate('loan-application')} />;
      }
    }

    if (currentPage === 'blog-detail' && selectedPostId) {
      const postFromLocal = posts.find(p => p.id === selectedPostId);
      if (postFromLocal) {
        return <BlogPostDetail postId={selectedPostId} language={currentLanguage} onBack={() => handleNavigate('blog')} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} language={currentLanguage} loans={loans} />;
      case 'about':
        return <About language={currentLanguage} onNavigate={handleNavigate} />;
      case 'blog':
        return <Blog language={currentLanguage} onSelectPost={handleSelectPost} />;
      case 'loan-application':
        return <LoanApplication language={currentLanguage} onBack={() => handleNavigate('home')} onSuccess={() => setCurrentPage('success')} onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact language={currentLanguage} onNavigate={handleNavigate} />;
      case 'faq':
        return <Faq language={currentLanguage} onBack={() => handleNavigate('home')} />;
      case 'simulator':
        return (
          <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
             <div className="text-center mb-12 space-y-4">
              <h1 className="text-5xl font-black text-gray-900">{t('calculator.title')}</h1>
              <p className="text-xl text-gray-600">{t('calculator.subtitle')}</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <LoanCalculator language={currentLanguage} onApply={() => handleNavigate('loan-application')} />
            </div>
          </div>
        );
      default:
        return <Home onSelectLoan={handleSelectLoan} onNavigate={handleNavigate} language={currentLanguage} loans={loans} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        user={user} 
        onLogout={handleLogout} 
        isTransparent={['home', 'loan-detail'].includes(currentPage)}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer language={currentLanguage} onNavigate={handleNavigate} onSelectLoan={handleSelectLoan} />
    </div>
  );
};

export default App;
