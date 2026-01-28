
import React, { useState } from 'react';
import { Menu, X, ChevronDown, Globe, LogIn, LogOut, User } from 'lucide-react';
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
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, language, onLanguageChange, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = translations[language].nav;

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
    { label: t.loans, id: 'loans', dropdown: true },
    { label: t.simulator, id: 'simulator' },
    { label: t.about, id: 'about' },
    { label: t.contact, id: 'contact' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-effect border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-2xl font-extrabold tracking-tight text-teal-900">
              Europ<span className="text-emerald-600">fy</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={`text-sm font-semibold transition-colors flex items-center gap-1 ${currentPage === item.id ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}>
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
                  className="flex items-center gap-2 text-sm font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200"
                >
                  <User className="w-4 h-4" />
                  {user.role === 'admin' ? 'Admin' : t.my_space}
                </button>
                <button onClick={onLogout} className="text-gray-500 hover:text-red-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-emerald-600"
              >
                <LogIn className="w-4 h-4" />
                {t.login}
              </button>
            )}

            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors bg-gray-50 px-3 py-2 rounded-lg">
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === language)?.flag}
                <ChevronDown className="w-4 h-4" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { onLanguageChange(lang.code); setIsLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-emerald-50 transition-colors flex items-center gap-3 ${language === lang.code ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700'}`}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200">
              {t.cta}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={() => setIsLangOpen(!isLangOpen)} className="text-gray-600">
                {languages.find(l => l.code === language)?.flag}
             </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { onNavigate(item.id); setIsOpen(false); }} className="block w-full text-left px-4 py-3 text-lg font-medium rounded-xl text-gray-600 hover:bg-gray-50">
              {item.label}
            </button>
          ))}
          {!user ? (
            <button onClick={() => { onNavigate('login'); setIsOpen(false); }} className="block w-full text-left px-4 py-3 text-lg font-medium rounded-xl text-gray-600 hover:bg-gray-50">
              {t.login}
            </button>
          ) : (
            <button onClick={() => { onLogout(); setIsOpen(false); }} className="block w-full text-left px-4 py-3 text-lg font-medium rounded-xl text-red-600 hover:bg-red-50">
              {t.logout}
            </button>
          )}
          <button onClick={() => { onNavigate('loan-application'); setIsOpen(false); }} className="block w-full text-center bg-emerald-600 text-white px-4 py-3 text-lg font-bold rounded-xl">
             {t.cta}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
