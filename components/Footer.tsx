
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Smartphone, Sparkles } from 'lucide-react';
import { Language, LoanInfo } from '../types';
import Logo from './Logo';

interface FooterProps {
  language: Language;
  onNavigate: (page: string) => void;
  onSelectLoan?: (loanId: string) => void;
  loans: LoanInfo[];
}

const Footer: React.FC<FooterProps> = ({ language, onNavigate, onSelectLoan, loans }) => {
  const { t } = useTranslation();
  const footerT = t('footer', { returnObjects: true }) as any;

  const handleLoanClick = (loanId: string) => {
    if (onSelectLoan) {
      onSelectLoan(loanId);
    } else {
      onNavigate('home');
    }
  };

  if (!footerT) return null;

  return (
    <footer className="bg-gray-900 text-gray-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-black tracking-tight text-white">
                Europ<span className="text-emerald-500">capital</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {footerT.desc}
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{footerT.titles?.loans || 'Prêts'}</h4>
            <ul className="space-y-4 font-medium">
              {loans.map((loan) => (
                <li key={loan.id}>
                  <button onClick={() => handleLoanClick(loan.id)} className="hover:text-emerald-500 transition-colors text-left">{loan.title}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{footerT.titles?.company || 'Société'}</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-500 transition-colors">{footerT.links?.about}</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-emerald-500 transition-colors">{footerT.links?.blog}</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-emerald-500 transition-colors">{footerT.links?.faq}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-emerald-500 transition-colors">{t('nav.contact')}</button></li>
              
              <li className="pt-6 border-t border-gray-800 mt-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Outils Marketing</p>
                <button 
                  onClick={() => onNavigate('ads-creator')} 
                  className="group flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-xl hover:bg-emerald-600 hover:border-emerald-500 transition-all w-full"
                >
                  <div className="bg-emerald-500/20 p-1.5 rounded-lg group-hover:bg-white/20">
                    <Sparkles className="w-4 h-4 text-emerald-400 group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-xs">Ads Creator Pro</p>
                    <p className="text-[9px] text-gray-500 group-hover:text-emerald-100 font-bold">Générer vos affiches HD</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{footerT.titles?.contact || 'Contact'}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>1 Place de la Bourse, 69002 Lyon, France</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>+33 7 54 09 50 27</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>contact@europcapital.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>{footerT.rights}</p>
          <div className="flex flex-wrap justify-center gap-8">
            <button onClick={() => onNavigate('legal-terms')} className="hover:text-white transition-colors">{footerT.links?.legal}</button>
            <button onClick={() => onNavigate('legal-privacy')} className="hover:text-white transition-colors">{footerT.links?.privacy}</button>
            <button onClick={() => onNavigate('legal-cookies')} className="hover:text-white transition-colors">{footerT.links?.cookies}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
