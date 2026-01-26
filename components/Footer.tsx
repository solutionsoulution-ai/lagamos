
import React from 'react';
import { Landmark, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
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
              Votre partenaire de confiance pour tous vos besoins de financement. Simple, rapide et transparent avec un taux unique de 2%.
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
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Nos Prêts</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Prêt Personnel</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Prêt Immobilier</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Prêt Automobile</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Prêt Entreprise</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Rachat de Crédit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Entreprise</h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#" className="hover:text-blue-500 transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Carrières</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Presse</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Aide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest text-sm">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-500 shrink-0" />
                <span>123 Avenue des Finances, 75008 Paris, France</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-blue-500 shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-blue-500 shrink-0" />
                <span>contact@financeplus.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>© 2024 FinancePlus. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
