
import React, { useState, useEffect, useRef } from 'react';
import { LogOut, User, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { User as UserType, Language } from '../types';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: UserType | null;
  onLogout: () => void;
  isTransparent?: boolean;
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
  position?: 'fixed' | 'absolute' | 'relative';
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentPage, 
  user, 
  onLogout,
  isTransparent = false,
  currentLanguage = 'fr',
  onLanguageChange,
  position = 'fixed'
}) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fermer le menu langue si on clique ailleurs
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: t('nav.home'), id: 'home' },
    { label: t('nav.loans'), id: 'loans' },
    { label: t('nav.simulator'), id: 'simulator' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  const languages: {code: Language, label: string, flag: string}[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  ];

  const isActuallyTransparent = isTransparent && !isScrolled;
  const bgColor = isActuallyTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm';
  const textColor = isActuallyTransparent ? 'text-white' : 'text-gray-600';
  const activeColor = isActuallyTransparent ? 'text-emerald-400' : 'text-emerald-600';
  const logoTextColor = isActuallyTransparent ? 'text-white' : 'text-gray-900';

  const currentFlag = languages.find(l => l.code === currentLanguage)?.flag || '🇫🇷';

  return (
    <nav className={`${position} w-full z-[100] transition-all duration-500 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <Logo className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300" />
            <span className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${logoTextColor}`}>
              Europ<span className="text-emerald-600">fy</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => onNavigate(item.id)} 
                className={`text-sm font-semibold transition-colors ${currentPage === item.id ? activeColor : `${textColor} hover:${activeColor}`}`}
              >
                {item.label}
              </button>
            ))}

            <div className={`h-6 w-px mx-2 ${isActuallyTransparent ? 'bg-white/20' : 'bg-gray-200'}`}></div>

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors ${isActuallyTransparent ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                <span className="text-xl">{currentFlag}</span>
                <span className="text-xs font-bold uppercase">{currentLanguage}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-medium hover:bg-emerald-50 transition-colors ${currentLanguage === lang.code ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
                  className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors ${isActuallyTransparent ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  <User className="w-4 h-4" />
                  {user.role === 'admin' ? 'Admin' : t('nav.my_space')}
                </button>
                <button onClick={onLogout} className={isActuallyTransparent ? 'text-white/60 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}>
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className={`text-sm font-bold transition-colors ${textColor} hover:${activeColor}`}>
                {t('nav.login')}
              </button>
            )}

            <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100/30">
              {t('nav.cta')}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-4">
             {/* Language Selector Mobile */}
             <button 
                onClick={() => {
                   const currentIndex = languages.findIndex(l => l.code === currentLanguage);
                   const nextIndex = (currentIndex + 1) % languages.length;
                   if (onLanguageChange) onLanguageChange(languages[nextIndex].code);
                }}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors ${isActuallyTransparent ? 'text-white' : 'text-gray-700'}`}
              >
                <span className="text-xl">{currentFlag}</span>
              </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textColor}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-3 rounded-lg text-base font-semibold ${currentPage === item.id ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="border-t border-gray-100 my-2 pt-2"></div>

            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'client-dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  {user.role === 'admin' ? 'Admin Dashboard' : t('nav.my_space')}
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 rounded-lg text-base font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-3 rounded-lg text-base font-semibold text-gray-900 hover:bg-gray-50"
              >
                {t('nav.login')}
              </button>
            )}

            <button
              onClick={() => {
                onNavigate('loan-application');
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 bg-emerald-600 text-white px-3 py-3 rounded-xl font-bold text-center shadow-lg shadow-emerald-100/50"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
