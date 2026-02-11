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
import AIAdvisor from './components/AIAdvisor';
import LoanCalculator from './components/LoanCalculator';
import { buildLoansData } from './constants';
import { Language, User, LoanInfo } from './types';
import { redisService } from './services/redis';
import { translations } from './translations';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loans, setLoans] = useState<LoanInfo[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  
  const [tempAccount, setTempAccount] = useState<{email: string, password: string} | null>(null);

  useEffect(() => {
    setLoans(buildLoansData(translations.fr.loan_specifics));
    if (translations.fr.blog && translations.fr.blog.posts) {
      setPosts(translations.fr.blog.posts);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLanguageChange = async (lang: Language) => {
    if (lang === 'fr') {
      await i18n.changeLanguage('fr');
      setCurrentLanguage('fr');
      setLoans(buildLoansData(translations.fr.loan_specifics));
      if (translations.fr.blog?.posts) {
        setPosts(translations.fr.blog.posts);
      }
      return;
    }

    setIsLoading(true);
    try {
      const dbData = await redisService.getTranslation(lang);
      
      if (dbData) {
        i18n.addResourceBundle(lang, 'translation', dbData, true, true);
        await i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
        if (dbData.loan_specifics) {
          setLoans(buildLoansData(dbData.loan_specifics));
        }
        if (dbData.blog && dbData.blog.posts) {
          setPosts(dbData.blog.posts);
        }
      }
    } catch (error) {
      console.error("Erreur lors du changement de langue :", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      if (page !== 'loan-application' && page !== 'loan-detail') {
          setSelectedLoanId(null);
      }
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
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-emerald-800 font-black text-lg animate-pulse tracking-widest uppercase">Chargement...</p>
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
      return <BlogPostDetail postId={selectedPostId} language={currentLanguage} onBack={() => handleNavigate('blog')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'legal-terms' || currentPage === 'legal-privacy' || currentPage === 'legal-cookies') {
      const type = currentPage.replace('legal-', '') as 'terms' | 'privacy' | 'cookies';
      return <Legal type={type} language={currentLanguage} onBack={() => handleNavigate('home')} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onSelectLoan={handleSelectLoan} 
            onNavigate={handleNavigate} 
            language={currentLanguage} 
            loans={loans} 
            user={user}
            onLogout={handleLogout}
            onLanguageChange={handleLanguageChange}
          />
        );
      case 'about':
        return <About language={currentLanguage} onNavigate={handleNavigate} />;
      case 'blog':
        return <Blog language={currentLanguage} onSelectPost={handleSelectPost} postsData={posts} />;
      case 'loan-application':
        return (
          <LoanApplication 
            language={currentLanguage} 
            loanType={selectedLoanId || 'personnel'}
            onBack={() => handleNavigate('home')} 
            onSuccess={(creds) => {
              setTempAccount(creds);
              setCurrentPage('success');
            }} 
            onNavigate={handleNavigate} 
          />
        );
      case 'success':
        return <Success language={currentLanguage} onNavigate={handleNavigate} tempAccount={tempAccount} />;
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
      case 'help':
        return <Help language={currentLanguage} onBack={() => handleNavigate('login')} />;
      default:
        return (
          <Home 
            onSelectLoan={handleSelectLoan} 
            onNavigate={handleNavigate} 
            language={currentLanguage} 
            loans={loans} 
            user={user}
            onLogout={handleLogout}
            onLanguageChange={handleLanguageChange}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {currentPage !== 'home' && !currentPage.startsWith('legal-') && (
        <Navbar 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          user={user} 
          onLogout={handleLogout} 
          isTransparent={currentPage === 'loan-detail'}
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      )}
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Conseiller AI Global */}
      <AIAdvisor />
      
      <Footer language={currentLanguage} onNavigate={handleNavigate} onSelectLoan={handleSelectLoan} loans={loans} />
    </div>
  );
};

export default App;