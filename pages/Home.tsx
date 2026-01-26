
import React from 'react';
import { LOANS_DATA, TESTIMONIALS } from '../constants';
import LoanCard from '../components/LoanCard';
import LoanCalculator from '../components/LoanCalculator';
import TrustWidgets from '../components/TrustWidgets';
import { ChevronRight, Play, Star, ShieldCheck, Zap } from 'lucide-react';

interface HomeProps {
  onSelectLoan: (loanId: string) => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSelectLoan, onNavigate }) => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 blur-3xl bg-blue-600 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-full opacity-10 blur-3xl bg-green-500 rounded-full -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-100">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </span>
                Taux Exceptionnel de 2% Fixe
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                Le crédit qui vous <span className="text-blue-600">respecte</span> vraiment.
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Financez vos rêves avec un taux unique, sans frais cachés et une réponse en moins de 24 heures. Plus simple, plus rapide, plus humain.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('simulator')}
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-2"
                >
                  Démarrer ma simulation
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all border border-gray-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5 text-blue-600 fill-blue-600" />
                  Voir comment ça marche
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/id/${i+40}/50/50`} className="w-12 h-12 rounded-full border-4 border-white object-cover" alt="User" />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400" />)}
                  </div>
                  <p className="text-sm font-bold text-gray-900">+10,000 avis positifs</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <LoanCalculator />
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 hidden lg:block bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sécurité</p>
                    <p className="text-sm font-bold text-gray-900">Approuvé par ACPR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Widgets Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustWidgets />
      </section>

      {/* Services Section */}
      <section id="loans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900">Nos Solutions de Financement</h2>
          <p className="text-xl text-gray-600">
            Peu importe votre projet, nous avons le prêt qui vous correspond avec un taux fixe de 2%.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOANS_DATA.map((loan) => (
            <LoanCard 
              key={loan.id} 
              loan={loan} 
              onClick={() => onSelectLoan(loan.id)} 
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-900 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-10">
          <Landmark className="w-96 h-96 -mr-20 -mt-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black leading-tight">Pourquoi choisir FinancePlus ?</h2>
              <div className="space-y-6">
                {[
                  { title: "Rapidité Digitale", desc: "Une réponse de principe en moins de 10 minutes après votre demande en ligne.", icon: Zap },
                  { title: "Transparence Totale", desc: "Zéro frais de dossier, zéro frais de remboursement anticipé. Tout est clair.", icon: ShieldCheck },
                  { title: "Flexibilité Adaptée", desc: "Ajustez vos mensualités à la hausse ou à la baisse selon vos revenus.", icon: Calendar },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="bg-blue-600/30 p-4 rounded-2xl h-fit border border-blue-500/30">
                      <feature.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                      <p className="text-blue-100/70 text-lg leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20">
              <img 
                src="https://picsum.photos/id/4/600/600" 
                className="rounded-2xl shadow-2xl mb-8 object-cover w-full h-80" 
                alt="App Interface" 
              />
              <div className="space-y-6">
                <p className="text-2xl italic font-medium leading-relaxed">
                  "L'application est incroyablement simple. J'ai fait ma demande dans le bus, et j'ai eu l'accord avant d'arriver au bureau."
                </p>
                <div className="flex items-center gap-4">
                  <img src="https://picsum.photos/id/10/50/50" className="rounded-full w-12 h-12" alt="Avatar" />
                  <div>
                    <p className="font-bold">Lucie Bernard</p>
                    <p className="text-sm text-blue-300">Utilisatrice depuis 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl font-black text-gray-900">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600">Découvrez les histoires de réussite de nos clients qui ont osé franchir le pas.</p>
          </div>
          <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">
            Voir tous les avis
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
              <div className="flex text-yellow-400">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400" />)}
              </div>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">"{t.content}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img src={t.avatar} className="w-14 h-14 rounded-full border-2 border-blue-50 object-cover" alt={t.name} />
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl lg:text-6xl font-black leading-tight">Prêt à transformer vos projets en réalité ?</h2>
            <p className="text-xl text-blue-100 font-medium">Simulez votre prêt en 2 minutes et recevez une réponse immédiate.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={() => onNavigate('simulator')}
                className="bg-white text-blue-900 px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl"
              >
                Faire une simulation gratuite
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-blue-500/30 backdrop-blur-md border border-white/30 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-blue-500/40 transition-all"
              >
                Parler à un conseiller
              </button>
            </div>
            <p className="text-blue-200 text-sm">Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

import { Landmark, Calendar } from 'lucide-react';
export default Home;
