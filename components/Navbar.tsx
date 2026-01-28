
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
    { label: t.loans, id: 'loans' },
    { label: t.simulator, id: 'simulator' },
    { label: t.about, id: 'about' },
    { label: t.contact, id: 'contact' },
  ];

  return (
    <nav className="fixed w-full z-[100] bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <Logo className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Europ<span className="text-emerald-400">fy</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={`text-sm font-semibold transition-colors ${currentPage === item.id ? 'text-emerald-400' : 'text-gray-200 hover:text-white'}`}>
                {item.label}
              </button>
            ))}

            <div className="h-6 w-px bg-white/20 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'client-dashboard')}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
                >
                  <User className="w-4 h-4" />
                  {user.role === 'admin' ? 'Admin' : t.my_space}
                </button>
                <button onClick={onLogout} className="text-gray-300 hover:text-red-400">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button onClick={() => onNavigate('login')} className="text-sm font-bold text-gray-200 hover:text-white">
                {t.login}
              </button>
            )}

            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 text-sm font-bold text-white bg-white/10 px-3 py-2 rounded-lg">
                <Globe className="w-4 h-4" />
                {languages.find(l => l.code === language)?.flag}
                <ChevronDown className="w-4 h-4" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { onLanguageChange(lang.code); setIsLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-emerald-500/20 ${language === lang.code ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-300'}`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg">
              {t.cta}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="text-xl">
               {languages.find(l => l.code === language)?.flag}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-gray-900 z-[90] overflow-y-auto p-6 flex flex-col">
          <div className="space-y-4 flex-grow">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => { onNavigate(item.id); setIsOpen(false); }} 
                className={`block w-full text-left p-4 text-xl font-bold rounded-2xl ${currentPage === item.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-200'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="space-y-4 pt-6 border-t border-white/10">
             {!user ? (
               <button onClick={() => { onNavigate('login'); setIsOpen(false); }} className="w-full text-center p-4 text-lg font-bold text-white rounded-2xl bg-white/10">
                 {t.login}
               </button>
             ) : (
               <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full text-center p-4 text-lg font-bold text-red-400 rounded-2xl bg-red-500/10">
                 {t.logout}
               </button>
             )}
             <button onClick={() => { onNavigate('loan-application'); setIsOpen(false); }} className="w-full bg-emerald-600 text-white p-5 text-xl font-black rounded-2xl shadow-xl shadow-emerald-500/20">
               {t.cta}
             </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
