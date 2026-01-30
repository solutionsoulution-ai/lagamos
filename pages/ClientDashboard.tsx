
import React, { useState, useEffect } from 'react';
import { Language, User } from '../types';
import { translations } from '../translations';
import { restdbService } from '../services/restdb';
import { 
  User as UserIcon, 
  Euro, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Loader2
} from 'lucide-react';

interface ClientDashboardProps {
  language: Language;
  user: User;
  onNavigate: (page: string) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ language, user, onNavigate }) => {
  const t = translations[language].client_dashboard;
  const adminT = translations[language].admin;
  const [loan, setLoan] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      const apps = await restdbService.getAllApplications();
      const userApp = apps.find((a: any) => a.email?.toLowerCase() === user.email?.toLowerCase());
      if (userApp) setLoan(userApp);
      setLoading(false);
    };
    fetchStatus();
  }, [user.email]);

  const steps = t.steps || ['Analyse', 'Vérification', 'Signature', 'Fonds'];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                {t.welcome}, {user.name || user.email.split('@')[0]}
              </h1>
              <p className="text-gray-500 font-medium">{t.title}</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('loan-application')}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            {t.cta_new} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {!loan ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-300">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">{t.no_loan}</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    {t.status_card}
                  </h2>
                  <span className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    loan.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                    loan.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {loan.status === 'pending' ? adminT.status.pending : 
                     loan.status === 'approved' ? adminT.status.approved : adminT.status.rejected}
                  </span>
                </div>

                <div className="relative pt-8 pb-4">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2"></div>
                  <div className="relative flex justify-between">
                    {steps.map((step: string, i: number) => {
                      const isCompleted = (loan.status === 'approved') || (i === 0 && loan.status === 'pending');
                      return (
                        <div key={i} className="flex flex-col items-center gap-4 relative z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 border-white shadow-md transition-all ${
                            isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                          </div>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            isCompleted ? 'text-emerald-600' : 'text-gray-400'
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                    <Euro className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Montant</p><p className="text-2xl font-black text-gray-900">{loan.amount.toLocaleString()} €</p></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-teal-600" />
                  </div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Durée</p><p className="text-2xl font-black text-gray-900">{loan.duration} mois</p></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Taux Fixe</p><p className="text-2xl font-black text-gray-900">2.00%</p></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-teal-900 rounded-[2.5rem] p-8 text-white space-y-8">
                <h3 className="text-xl font-black flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-emerald-400" />
                  Informations
                </h3>
                <div className="space-y-6">
                  <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/50 mb-1">Email de contact</p><p className="font-bold">{loan.email}</p></div>
                  <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/50 mb-1">Revenu déclaré</p><p className="font-bold text-emerald-400">{loan.income.toLocaleString()} € / mois</p></div>
                </div>
              </div>
              <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white">
                <h4 className="text-lg font-black mb-4">Besoin d'aide ?</h4>
                <button onClick={() => onNavigate('contact')} className="w-full bg-white text-emerald-600 py-3 rounded-xl font-black text-sm shadow-lg">Contacter un conseiller</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
