
import React, { useState, useEffect } from 'react';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { User as UserType } from '../types';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  user: UserType | null;
  onLogout: () => void;
  isTransparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentPage, 
  user, 
  onLogout,
  isTransparent = false
}) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t('nav.home'), id: 'home' },
    { label: t('nav.loans'), id: 'loans' },
    { label: t('nav.simulator'), id: 'simulator' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  const isActuallyTransparent = isTransparent && !isScrolled;
  const bgColor = isActuallyTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm';
  const textColor = isActuallyTransparent ? 'text-white' : 'text-gray-600';
  const activeColor = isActuallyTransparent ? 'text-emerald-400' : 'text-emerald-600';
  const logoTextColor = isActuallyTransparent ? 'text-white' : 'text-gray-900';

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
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${isActuallyTransparent ? 'text-white' : 'text-gray-900'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-bold ${currentPage === item.id ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 flex flex-col gap-4">
              <button onClick={() => { onNavigate('loan-application'); setIsMenuOpen(false); }} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black shadow-lg">
                {t('nav.cta')}
              </button>
              {!user && (
                <button onClick={() => { onNavigate('login'); setIsMenuOpen(false); }} className="w-full bg-gray-50 text-gray-900 py-4 rounded-xl font-bold">
                  {t('nav.login')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
