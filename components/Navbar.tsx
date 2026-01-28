
import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, LogOut, User } from 'lucide-react';
import { Language, User as UserType } from '../types';
import { translations } from '../translations';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: UserType | null;
  onLogout: () => void;
  isTransparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentPage, 
  language, 
  onLanguageChange, 
  user, 
  onLogout,
  isTransparent = false
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[language].nav;

  // Gestion du scroll pour changer l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const navItems = [
    { label: t.home, id: 'home' },
    { label: t.loans, id: 'loans' },
    { label: t.simulator, id: 'simulator' },
    { label: t.about, id: 'about' },
    { label: t.contact, id: 'contact' },
  ];

  // La navbar est réellement transparente seulement si on est en haut de la page ET que le mode transparent est activé
  const isActuallyTransparent = isTransparent && !isScrolled;

  const bgColor = isActuallyTransparent 
    ? 'bg-transparent' 
    : 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm';
  
  const textColor = isActuallyTransparent 
    ? 'text-white' 
    : 'text-gray-600';
  
  const activeColor = isActuallyTransparent 
    ? 'text-emerald-400' 
    : 'text-emerald-600';
  
  const logoTextColor = isActuallyTransparent 
    ? 'text-white' 
    : 'text-gray-900';
  
  const langBg = isActuallyTransparent 
    ? 'bg-white/10 backdrop-blur-md border-white/20 text-white' 
    : 'bg-gray-50 border-gray-100 text-gray-700';

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <Logo className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300" />
            <span className={`text-xl sm:text-2xl font-extrabold tracking-tight transition-colors ${logoTextColor}`}>
              Europ<span className="text-emerald-600">fy</span>
            </span>
          </div>

          {/* Menu Desktop */}
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

            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
                  className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-colors ${isActuallyTransparent ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                >
                  <User className="w-4 h-4" />
                  {user.role === 'admin' ? 'Admin' : t.my_space}
                </button>
                <button onClick={onLogout} className={isActuallyTransparent ? 'text-white/60 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}>
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className={`text-sm font-bold transition-colors ${textColor} hover:${activeColor}`}>
                {t.login}
              </button>
            )}

            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg border transition-colors ${langBg}`}>
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === language)?.flag}
                <ChevronDown className="w-4 h-4" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { onLanguageChange(lang.code); setIsLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-emerald-50 ${language === lang.code ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'}`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
              {t.cta}
            </button>
          </div>

          {/* Menu Mobile simplifié */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className={`text-xl p-2 rounded-lg transition-colors ${isActuallyTransparent ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-700'}`}>
                 {languages.find(l => l.code === language)?.flag}
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { onLanguageChange(lang.code); setIsLangOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-emerald-50 text-gray-600"
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-md">
              {t.cta}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
