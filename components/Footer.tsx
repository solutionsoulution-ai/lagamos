
import React from 'react';
import { Landmark, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { getLoansData } from '../constants';

interface FooterProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = translations[language].footer;
  const loans = getLoansData(language);

  return (
    <footer className="bg-gray-900 text-gray-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Landmark className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Finance<span className="text-blue-500">Plus</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t.desc}
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t.titles.loans}</h4>
            <ul className="space-y-4 font-medium">
              {loans.map((loan) => (
                <li key={loan.id}>
                  <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors text-left">{loan.title}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t.titles.company}</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">{t.links.about}</button></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-blue-500 transition-colors">{t.links.blog}</button></li>
              <li><button className="hover:text-blue-500 transition-colors opacity-50 cursor-not-allowed">{t.links.careers}</button></li>
              <li><button className="hover:text-blue-500 transition-colors opacity-50 cursor-not-allowed">{t.links.press}</button></li>
              <li><button className="hover:text-blue-500 transition-colors opacity-50 cursor-not-allowed">{t.links.help}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t.titles.contact}</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-500 shrink-0" />
                <span>1 Place de la Bourse, 69002 Lyon, France</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-500 shrink-0" />
                <span>+33 4 72 40 58 58</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-500 shrink-0" />
                <span>compliance@financeplus.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>{t.rights}</p>
          <div className="flex flex-wrap justify-center gap-8">
            <button onClick={() => onNavigate('legal-terms')} className="hover:text-white transition-colors">{t.links.legal}</button>
            <button onClick={() => onNavigate('legal-privacy')} className="hover:text-white transition-colors">{t.links.privacy}</button>
            <button onClick={() => onNavigate('legal-cookies')} className="hover:text-white transition-colors">{t.links.cookies}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
