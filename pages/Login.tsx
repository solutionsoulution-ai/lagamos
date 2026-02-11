
import React, { useState } from 'react';
import { Language, User } from '../types';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, LogIn, ChevronLeft, ArrowRight, HelpCircle, Eye, Loader2 } from 'lucide-react';
import { restdbService } from '../services/restdb';

interface LoginProps {
  language: Language;
  onLogin: (user: User) => void;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ language, onLogin, onBack, onNavigate }) => {
  const { t } = useTranslation();
  const loginT = t('login', { returnObjects: true }) as any;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Vérification Admin (Hardcoded pour la sécurité de l'accès démo)
      if (email === 'admin@europcapital.com' && password === 'admin123') {
        onLogin({ email, role: 'admin', name: 'Administrateur' });
        return;
      }

      // 2. Vérification Client dans la Base de Données
      const applications = await restdbService.getAllApplications();
      const userAccount = applications.find((app: any) => 
        app.email?.toLowerCase() === email.toLowerCase() && 
        (app.password === password || (!app.password && password === 'Europcapital2026'))
      );

      if (userAccount) {
        onLogin({ 
          email: userAccount.email, 
          role: 'client', 
          name: `${userAccount.firstName} ${userAccount.lastName}` 
        });
      } else {
        setError(loginT.error || "Identifiants incorrects ou compte inexistant.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur sécurisé.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = () => {
    onLogin({ email: 'demo@europcapital.com', role: 'client', name: 'Client Démo' });
  };

  if (!loginT) return null;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-bold transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t('nav.home')}
        </button>
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>
          <div className="text-center space-y-4 mb-10">
            <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"><LogIn className="w-8 h-8 text-emerald-600" /></div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{loginT.title}</h1>
            <p className="text-gray-500 font-medium">{loginT.subtitle}</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-bold text-center animate-in shake-in">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">{loginT.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="exemple@email.com" 
                  className="w-full bg-gray-50 border-none pl-12 pr-6 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">{loginT.password}</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border-none pl-12 pr-6 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all font-medium" 
                />
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {isLoading ? 'Vérification...' : loginT.submit}
            </button>
          </form>

          <div className="mt-6">
             <button 
               onClick={handleDemoAccess}
               className="w-full bg-indigo-50 text-indigo-600 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-100 transition-all flex items-center justify-center gap-2 border border-indigo-100"
             >
                <Eye className="w-4 h-4" /> Voir le Dashboard Client (Démo)
             </button>
          </div>

          <div className="mt-8 text-center space-y-6">
            <button onClick={() => onNavigate('help')} className="text-sm text-emerald-600 font-black hover:text-emerald-800 transition-colors flex items-center justify-center gap-2 mx-auto"><HelpCircle className="w-4 h-4" />{loginT.forgot}</button>
            <div className="pt-6 border-t border-gray-100">
              <button onClick={() => onNavigate('loan-application')} className="w-full bg-gray-50 text-gray-600 py-4 px-6 rounded-2xl font-bold text-sm hover:bg-emerald-50 hover:text-emerald-600 transition-all flex items-center justify-center gap-3 group">
                <span className="text-left">{loginT.noAccount}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
