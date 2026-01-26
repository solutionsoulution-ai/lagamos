
import React, { useState } from 'react';
import { Menu, X, Landmark, ChevronDown, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, language, onLanguageChange }) => {
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
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Landmark className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-blue-900">
              Finance<span className="text-blue-600">Plus</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={`text-sm font-semibold transition-colors flex items-center gap-1 ${currentPage === item.id ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
                {item.label}
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 px-3 py-2 rounded-lg">
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
                      className={`w-full text-left px-4 py-2 text-sm font-medium hover:bg-blue-50 transition-colors flex items-center gap-3 ${language === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => onNavigate('loan-application')} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
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
        <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { onNavigate(item.id); setIsOpen(false); }} className="block w-full text-left px-4 py-3 text-lg font-medium rounded-xl text-gray-600 hover:bg-gray-50">
              {item.label}
            </button>
          ))}
          <button onClick={() => { onNavigate('loan-application'); setIsOpen(false); }} className="block w-full text-center bg-blue-600 text-white px-4 py-3 text-lg font-bold rounded-xl">
             {t.cta}
          </button>
          <div className="grid grid-cols-4 gap-2 py-4 px-4 border-t border-gray-100">
            {languages.map(l => (
              <button key={l.code} onClick={() => { onLanguageChange(l.code); setIsLangOpen(false); }} className={`text-2xl p-2 rounded-lg ${language === l.code ? 'bg-blue-50' : ''}`}>
                {l.flag}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
