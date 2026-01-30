
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Language } from '../types';
import { getLoansData } from '../constants';
import Logo from './Logo';

interface FooterProps {
  language: Language;
  onNavigate: (page: string) => void;
  onSelectLoan?: (loanId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ language, onNavigate, onSelectLoan }) => {
  const { t } = useTranslation();
  const loans = getLoansData(language);

  const handleLoanClick = (loanId: string) => {
    if (onSelectLoan) {
      onSelectLoan(loanId);
    } else {
      onNavigate('home');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Logo className="w-10 h-10" />
              <span className="text-2xl font-black tracking-tight text-white">
                Europ<span className="text-emerald-500">fy</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.desc')}
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
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t('footer.titles.loans')}</h4>
            <ul className="space-y-4 font-medium">
              {loans.map((loan) => (
                <li key={loan.id}>
                  <button onClick={() => handleLoanClick(loan.id)} className="hover:text-emerald-500 transition-colors text-left">{loan.title}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t('footer.titles.company')}</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={() => onNavigate('about')} className="hover:text-emerald-500 transition-colors">{t('footer.links.about')}</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-emerald-500 transition-colors">{t('footer.links.blog')}</button></li>
              <li><button onClick={() => onNavigate('faq')} className="hover:text-emerald-500 transition-colors">{t('footer.links.faq')}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-emerald-500 transition-colors">{t('nav.contact')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t('footer.titles.contact')}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>1 Place de la Bourse, 69002 Lyon, France</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>+33 4 72 40 58 58</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-emerald-500 shrink-0" />
                <span>contact@europfy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>{t('footer.rights')}</p>
          <div className="flex flex-wrap justify-center gap-8">
            <button onClick={() => onNavigate('legal-terms')} className="hover:text-white transition-colors">{t('footer.links.legal')}</button>
            <button onClick={() => onNavigate('legal-privacy')} className="hover:text-white transition-colors">{t('footer.links.privacy')}</button>
            <button onClick={() => onNavigate('legal-cookies')} className="hover:text-white transition-colors">{t('footer.links.cookies')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
