
import React, { useState, useEffect, useCallback } from 'react';
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
import AdsCreator from './pages/AdsCreator';
import LoanCalculator from './components/LoanCalculator';
import { buildLoansData } from './constants';
import { Language, User, LoanInfo } from './types';
import { translations } from './translations';
import { ptManual } from './pt';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loans, setLoans] = useState<LoanInfo[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');
  
  const [tempAccount, setTempAccount] = useState<{email: string, password: string} | null>(null);

  const syncRouteWithState = useCallback(() => {
    const hash = window.location.hash.replace(/^#\//, '');
    const segments = hash.split('/').filter(Boolean);

    if (segments.length === 0) {
      setCurrentPage('home');
    } else if (segments[0] === 'about') {
      setCurrentPage('about');
    } else if (segments[0] === 'contact') {
      setCurrentPage('contact');
    } else if (segments[0] === 'login') {
      setCurrentPage('login');
    } else if (segments[0] === 'faq') {
      setCurrentPage('faq');
    } else if (segments[0] === 'simulator') {
      setCurrentPage('simulator');
    } else if (segments[0] === 'ads-creator') {
      setCurrentPage('ads-creator');
    } else if (segments[0] === 'blog') {
      if (segments[1]) {
        setCurrentPage('blog-detail');
        setSelectedPostId(segments[1]);
      } else {
        setCurrentPage('blog');
      }
    } else if (segments[0] === 'loan' && segments[1]) {
      setCurrentPage('loan-detail');
      setSelectedLoanId(segments[1]);
    } else if (segments[0] === 'apply') {
      setCurrentPage('loan-application');
      if (segments[1]) setSelectedLoanId(segments[1]);
    } else if (segments[0] === 'success') {
      setCurrentPage('success');
    } else if (segments[0] === 'dashboard') {
      setCurrentPage('client-dashboard');
    } else if (segments[0] === 'admin') {
      setCurrentPage('admin-dashboard');
    } else if (segments[0] === 'help') {
      setCurrentPage('help');
    } else if (segments[0] === 'legal' && segments[1]) {
      setCurrentPage(`legal-${segments[1]}`);
    } else {
      setCurrentPage('home');
    }
  }, []);

  useEffect(() => {
    // Initialisation par défaut (FR)
    setLoans(buildLoansData(translations.fr.loan_specifics));
    if (translations.fr.blog && translations.fr.blog.posts) {
      setPosts(translations.fr.blog.posts);
    }
    
    syncRouteWithState();

    window.addEventListener('hashchange', syncRouteWithState);
    return () => window.removeEventListener('hashchange', syncRouteWithState);
  }, [syncRouteWithState]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleNavigate = (page: string, params?: string) => {
    let hashPath = '/';
    switch (page) {
      case 'home': hashPath = '/'; break;
      case 'about': hashPath = '/about'; break;
      case 'contact': hashPath = '/contact'; break;
      case 'login': hashPath = '/login'; break;
      case 'faq': hashPath = '/faq'; break;
      case 'simulator': hashPath = '/simulator'; break;
      case 'blog': hashPath = '/blog'; break;
      case 'blog-detail': hashPath = `/blog/${params}`; break;
      case 'loan-detail': hashPath = `/loan/${params}`; break;
      case 'loan-application': hashPath = params ? `/apply/${params}` : '/apply'; break;
      case 'success': hashPath = '/success'; break;
      case 'client-dashboard': hashPath = '/dashboard'; break;
      case 'admin-dashboard': hashPath = '/admin'; break;
      case 'help': hashPath = '/help'; break;
      case 'ads-creator': hashPath = '/ads-creator'; break;
      case 'legal-terms': hashPath = '/legal/terms'; break;
      case 'legal-privacy': hashPath = '/legal/privacy'; break;
      case 'legal-cookies': hashPath = '/legal/cookies'; break;
      case 'loans': 
        if (window.location.hash !== '#/' && window.location.hash !== '') {
           window.location.hash = '#/';
           setTimeout(() => document.getElementById('loans')?.scrollIntoView({ behavior: 'smooth' }), 100);
        } else {
           document.getElementById('loans')?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    window.location.hash = `#${hashPath}`;
    window.scrollTo(0, 0);
  };

  const handleLanguageChange = async (lang: Language) => {
    await i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    
    // Extraction des données de prêt et de blog selon la langue locale
    const data = lang === 'fr' ? translations.fr : ptManual.translation;
    
    if (data.loan_specifics) {
      setLoans(buildLoansData(data.loan_specifics));
    }
    if (data.blog?.posts) {
      setPosts(data.blog.posts);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    handleNavigate(userData.role === 'admin' ? 'admin-dashboard' : 'client-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    handleNavigate('home');
  };

  const renderContent = () => {
    if (currentPage === 'login') {
      return <Login language={currentLanguage} onLogin={handleLogin} onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'admin-dashboard') {
      if (user?.role !== 'admin') { handleNavigate('login'); return null; }
      return <AdminDashboard language={currentLanguage} />;
    }

    if (currentPage === 'client-dashboard') {
      if (!user) { handleNavigate('login'); return null; }
      return <ClientDashboard language={currentLanguage} user={user} onNavigate={handleNavigate} />;
    }

    if (currentPage === 'loan-detail' && selectedLoanId) {
      const loan = loans.find(l => l.id === selectedLoanId);
      if (loan) {
        return <LoanDetail loan={loan} onBack={() => handleNavigate('home')} language={currentLanguage} onApply={() => handleNavigate('loan-application', selectedLoanId)} />;
      }
    }

    if (currentPage === 'blog-detail' && selectedPostId) {
      return <BlogPostDetail postId={selectedPostId} language={currentLanguage} onBack={() => handleNavigate('blog')} onNavigate={handleNavigate} />;
    }

    if (currentPage.startsWith('legal-')) {
      const type = currentPage.replace('legal-', '') as 'terms' | 'privacy' | 'cookies';
      return <Legal type={type} language={currentLanguage} onBack={() => handleNavigate('home')} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onSelectLoan={(id) => handleNavigate('loan-detail', id)} 
            onNavigate={handleNavigate} 
            language={currentLanguage} 
            loans={loans} 
            user={user}
            onLogout={handleLogout}
            onLanguageChange={handleLanguageChange}
          />
        );
      case 'about': return <About language={currentLanguage} onNavigate={handleNavigate} />;
      case 'blog': return <Blog language={currentLanguage} onSelectPost={(id) => handleNavigate('blog-detail', id)} postsData={posts} />;
      case 'loan-application':
        return (
          <LoanApplication 
            language={currentLanguage} 
            loanType={selectedLoanId || 'personnel'}
            onBack={() => handleNavigate('home')} 
            onSuccess={(creds) => {
              setTempAccount(creds);
              handleNavigate('success');
            }} 
            onNavigate={handleNavigate} 
          />
        );
      case 'success': return <Success language={currentLanguage} onNavigate={handleNavigate} tempAccount={tempAccount} />;
      case 'contact': return <Contact language={currentLanguage} onNavigate={handleNavigate} />;
      case 'faq': return <Faq language={currentLanguage} onBack={() => handleNavigate('home')} />;
      case 'ads-creator': return <AdsCreator onBack={() => handleNavigate('home')} />;
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
      case 'help': return <Help language={currentLanguage} onBack={() => handleNavigate('login')} />;
      default: return <Home onSelectLoan={(id) => handleNavigate('loan-detail', id)} onNavigate={handleNavigate} language={currentLanguage} loans={loans} user={user} onLogout={handleLogout} onLanguageChange={handleLanguageChange} />;
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
      <main className="flex-grow">{renderContent()}</main>
      <Footer language={currentLanguage} onNavigate={handleNavigate} onSelectLoan={(id) => handleNavigate('loan-detail', id)} loans={loans} />
    </div>
  );
};

export default App;
