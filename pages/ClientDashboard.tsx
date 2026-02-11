
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, User } from '../types';
import { restdbService } from '../services/restdb';
import { 
  User as UserIcon, Euro, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, TrendingUp, ShieldCheck, 
  Loader2, MessageCircle, Lock, Hourglass, FileBadge, CreditCard, Copy, Send, Wallet, Ban, 
  LayoutDashboard, UserCircle, History, Settings, Building, MapPin, Briefcase, Phone, Mail, Calendar, LogOut
} from 'lucide-react';

interface ClientDashboardProps {
  language: Language;
  user: User;
  onNavigate: (page: string) => void;
}

// Données fictives complètes pour le mode démo
const DEMO_LOAN = {
  _id: 'demo-loan-123',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'demo@europfy.com',
  whatsapp: '+33 6 12 34 56 78',
  country: 'FR',
  profession: 'Ingénieur Informatique',
  income: 4500,
  reason: 'Achat immobilier résidence principale',
  status: 'approved',
  amount: 250000,
  duration: 240,
  balance: 258000.50,
  iban: 'FR76 3000 4014 5812 3456 7890 122',
  bic: 'ERPYFRPP',
  currency: 'EUR',
  transferDelay: 1, 
  transferDelayUnit: 'minutes',
  isBlocked: false,
  feesAccepted: true,
  consent: true,
  date: '2023-10-15T10:00:00Z'
};

const ClientDashboard: React.FC<ClientDashboardProps> = ({ language, user, onNavigate }) => {
  const { t } = useTranslation();
  const dashT = t('client_dashboard', { returnObjects: true }) as any || {};
  
  const [loan, setLoan] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'transfer'>('overview');
  
  // États pour le virement
  const [transferAmount, setTransferAmount] = useState('');
  const [transferIban, setTransferIban] = useState('');
  const [transferSwift, setTransferSwift] = useState('');
  const [transferBeneficiary, setTransferBeneficiary] = useState('');
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  
  // États pour la progression du virement
  const [activeTransfer, setActiveTransfer] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [transferBlockedError, setTransferBlockedError] = useState<string | null>(null);

  const isDemo = user.email === 'demo@europfy.com';

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      
      if (isDemo) {
        setLoan(DEMO_LOAN);
        setLoading(false);
        return;
      }

      try {
        const apps = await restdbService.getAllApplications();
        const userApp = apps.find((a: any) => a.email?.toLowerCase() === user.email?.toLowerCase());
        if (userApp) {
          setLoan(userApp);
          if (userApp.currentTransfer) {
              setActiveTransfer(userApp.currentTransfer);
          }
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchStatus();
  }, [user.email, isDemo]);

  // LOGIQUE DE PROGRESSION DU VIREMENT
  useEffect(() => {
    if (!activeTransfer) return;

    const interval = setInterval(async () => {
        const now = Date.now();
        const start = activeTransfer.startTime;
        const end = activeTransfer.endTime;
        
        if (now >= end) {
            clearInterval(interval);
            setProgress(100);

            if (loan.isBlocked) {
                setTransferBlockedError(loan.blockReason || "Virement bloqué par le service sécurité.");
                setActiveTransfer(null);
                const refundedBalance = (loan.balance || 0) + activeTransfer.amount;
                
                if (!isDemo) {
                   await restdbService.updateApplication(loan._id, { 
                       balance: refundedBalance,
                       currentTransfer: null 
                   });
                }
                setLoan((prev: any) => ({ ...prev, balance: refundedBalance }));
            } else {
                setActiveTransfer(null);
                if (!isDemo) {
                    await restdbService.updateApplication(loan._id, { currentTransfer: null });
                }
                alert("Virement exécuté avec succès !");
            }
        } else {
            const totalDuration = end - start;
            const elapsed = now - start;
            const percent = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
            setProgress(percent);
        }
    }, 1000); 

    return () => clearInterval(interval);
  }, [activeTransfer, loan, isDemo]);

  const handleCopyRib = () => {
    if (loan && loan.iban) {
      navigator.clipboard.writeText(`IBAN: ${loan.iban}\nBIC: ${loan.bic}`);
      alert("RIB et BIC copiés dans le presse-papier !");
    }
  };

  const calculateDurationMs = (val: number, unit: string) => {
    const min = 60 * 1000;
    const hour = 60 * min;
    const day = 24 * hour;
    if (unit === 'minutes') return val * min;
    if (unit === 'days') return val * day;
    return val * hour;
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError(null);

    if (!loan) return;

    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      setTransferError("Montant invalide.");
      return;
    }

    if (amount > (loan.balance || 0)) {
      setTransferError("Solde insuffisant.");
      return;
    }

    setTransferLoading(true);
    try {
      const delayVal = loan.transferDelay || 24;
      const delayUnit = loan.transferDelayUnit || 'hours';
      const durationMs = calculateDurationMs(delayVal, delayUnit);
      
      const startTime = Date.now();
      const endTime = startTime + durationMs;
      const newBalance = (loan.balance || 0) - amount;

      const transferData = {
          amount,
          beneficiary: transferBeneficiary,
          iban: transferIban,
          swift: transferSwift,
          startTime,
          endTime,
          status: 'in_progress'
      };
      
      if (!isDemo) {
          await restdbService.updateApplication(loan._id, { 
              balance: newBalance,
              currentTransfer: transferData
          });
      } else {
          await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setLoan({ ...loan, balance: newBalance });
      setActiveTransfer(transferData);
      setTransferBlockedError(null);
      
      // Reset & Switch Tab
      setTransferAmount('');
      setTransferIban('');
      setTransferSwift('');
      setTransferBeneficiary('');
      setActiveTab('overview');
      window.scrollTo(0,0);

    } catch (error) {
      setTransferError("Erreur lors de l'initiation du virement.");
    } finally {
      setTransferLoading(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-12 h-12 text-emerald-600 animate-spin" /></div>;

  if (!loan) return (
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white p-10 sm:p-20 rounded-[2.5rem] text-center border border-dashed border-gray-300 shadow-sm">
                <div className="bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6"><FileText className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" /></div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">Aucun dossier trouvé</h2>
                <button onClick={() => onNavigate('loan-application')} className="bg-emerald-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2 mx-auto mt-6 text-sm sm:text-base">Déposer une demande <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            </div>
        </div>
      </div>
  );

  // --- ÉTAT : EN ATTENTE ---
  if (loan.status === 'pending') return (
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-2"><h1 className="text-2xl sm:text-4xl font-black text-gray-900">Bienvenue, {loan.firstName}</h1><p className="text-gray-500 font-medium text-sm sm:text-base">Votre dossier <span className="font-mono bg-gray-200 px-2 py-0.5 rounded text-gray-700">#{loan._id?.substring(0,8).toUpperCase()}</span> est en cours d'analyse.</p></div>
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 relative">
                <div className="bg-orange-50 p-6 border-b border-orange-100 flex items-start gap-4"><div className="bg-orange-100 p-2 rounded-xl shrink-0"><Hourglass className="w-6 h-6 text-orange-600 animate-pulse" /></div><div><h3 className="text-base sm:text-lg font-black text-orange-800">Action requise</h3><p className="text-orange-700 text-xs sm:text-sm font-medium">L'accès complet à votre compte est verrouillé en attente de pièces justificatives.</p></div></div>
                <div className="p-6 sm:p-12 space-y-8"><div className="text-center space-y-4"><div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"><FileBadge className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" /></div><h2 className="text-xl sm:text-2xl font-black text-gray-900">Vérification d'Identité</h2><p className="text-gray-600 leading-relaxed text-sm sm:text-lg">Pour finaliser votre dossier, veuillez envoyer une photo de votre <strong>Pièce d'Identité</strong> à votre conseiller dédié.</p></div><div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-100 text-center space-y-6 relative overflow-hidden"><div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div><div><p className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Canal Sécurisé</p><p className="text-2xl sm:text-3xl font-black text-emerald-900">+33 7 54 09 50 27</p></div><a href="https://wa.me/33754095027" target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 text-white py-3 sm:py-4 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-600 transition-all flex items-center justify-center gap-3 transform hover:scale-105 text-sm sm:text-base"><MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" /> Envoyer via WhatsApp</a></div></div>
            </div>
        </div>
      </div>
  );

  // --- DASHBOARD CLIENT COMPLET ---
  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* En-tête du Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-4 sm:mb-8">
            <div className="w-full md:w-auto">
                <p className="text-gray-500 font-medium mb-1 text-xs sm:text-sm">Espace Client Sécurisé</p>
                <div className="flex justify-between items-center w-full">
                    <h1 className="text-2xl sm:text-4xl font-black text-gray-900 truncate pr-4">Bonjour, {loan.firstName} 👋</h1>
                    <div className="flex md:hidden items-center gap-2">
                         <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm">
                            <span className="block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                         </div>
                         <button onClick={() => onNavigate('contact')} className="bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                         </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
                 <div className="bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-gray-700">En ligne</span>
                 </div>
                 <button onClick={() => onNavigate('contact')} className="bg-gray-900 text-white p-3 rounded-full hover:bg-gray-700 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                 </button>
            </div>
        </div>

        {/* Alerte Virement Bloqué */}
        {transferBlockedError && (
            <div className="bg-red-50 border border-red-100 rounded-3xl p-4 sm:p-6 flex items-start gap-4 animate-in slide-in-from-top-4">
                <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                <div>
                    <h3 className="font-black text-red-900 text-sm sm:text-base">Virement refusé</h3>
                    <p className="text-red-700 text-xs sm:text-sm mt-1">{transferBlockedError}</p>
                    <p className="text-red-600 text-[10px] sm:text-xs mt-2 font-medium">Les fonds ont été recrédités.</p>
                </div>
            </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl p-2 sm:p-4 shadow-sm border border-gray-100 sticky top-20 sm:static lg:sticky lg:top-32 z-10">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0 scroll-smooth snap-x">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap snap-start shrink-0 ${activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" /> Vue d'ensemble
                        </button>
                        <button 
                            onClick={() => setActiveTab('transfer')}
                            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap snap-start shrink-0 ${activeTab === 'transfer' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" /> Virements
                        </button>
                        <button 
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap snap-start shrink-0 ${activeTab === 'profile' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <UserCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Mon Profil
                        </button>
                    </nav>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="lg:col-span-9 space-y-6">

                {/* --- TAB: OVERVIEW --- */}
                {activeTab === 'overview' && (
                    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
                        {/* Solde & Carte Bancaire */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Carte de Solde Interactive */}
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[240px] sm:min-h-[280px]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
                                
                                {activeTransfer ? (
                                    <div className="relative z-10 h-full flex flex-col justify-center py-4">
                                        <div className="flex items-center gap-3 mb-4 text-orange-400">
                                            <Clock className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                                            <span className="font-bold tracking-wider text-sm sm:text-base">VIREMENT EN COURS</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs sm:text-sm font-bold opacity-80">
                                                <span>Vers {activeTransfer.beneficiary}</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                                <div className="bg-emerald-500 h-full transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }}></div>
                                            </div>
                                        </div>
                                        <p className="mt-6 text-2xl sm:text-3xl font-black text-white/50">-{activeTransfer.amount} €</p>
                                    </div>
                                ) : (
                                    <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-gray-400 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1">Solde Disponible</p>
                                                <h2 className="text-3xl sm:text-5xl font-black tracking-tighter">{loan.balance?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</h2>
                                            </div>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6 sm:h-8 opacity-80" alt="Mastercard" />
                                        </div>
                                        <div>
                                            <div className="flex gap-4 mb-4 sm:mb-6">
                                                <p className="font-mono text-gray-400 text-xs sm:text-sm tracking-widest">**** **** **** {loan.iban ? loan.iban.slice(-4) : '0000'}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <button onClick={() => setActiveTab('transfer')} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/50 transition-all">
                                                    Nouveau Virement
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* CARTE RIB / SWIFT (DEMANDE UTILISATEUR) */}
                            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col justify-between min-h-[240px] sm:min-h-[280px] relative overflow-hidden group hover:shadow-xl transition-all">
                                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-bl-[80px] sm:rounded-bl-[100px] -z-0"></div>
                                <div className="relative z-10 space-y-4 sm:space-y-6">
                                   <div className="flex justify-between items-start">
                                      <h3 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" /> RIB & SWIFT
                                      </h3>
                                      <button onClick={handleCopyRib} className="text-gray-400 hover:text-emerald-600 transition-colors p-2 bg-gray-50 rounded-lg active:scale-95" title="Copier les coordonnées">
                                        <Copy className="w-5 h-5" />
                                      </button>
                                   </div>
                                   
                                   <div className="space-y-4">
                                      <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                                        <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">IBAN (International Bank Account Number)</p>
                                        <p className="font-mono font-bold text-emerald-800 break-all text-xs sm:text-base select-all">
                                          {loan.iban || "En attente d'attribution"}
                                        </p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                                            <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Code BIC / SWIFT</p>
                                            <p className="font-mono font-bold text-gray-900 select-all text-xs sm:text-sm">{loan.bic || "ERPYFRPP"}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-100">
                                            <p className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Banque</p>
                                            <p className="font-bold text-gray-900 text-xs sm:text-sm">Europfy Bank</p>
                                        </div>
                                      </div>
                                   </div>
                                </div>
                            </div>
                        </div>

                        {/* Historique Rapide */}
                        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-base sm:text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                                <History className="w-5 h-5 text-gray-400" /> Activité Récente
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="bg-green-50 p-2 sm:p-3 rounded-full"><TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /></div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm sm:text-base">Déblocage des fonds</p>
                                            <p className="text-[10px] sm:text-xs text-gray-400">{new Date(loan.date || Date.now()).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-green-600 text-sm sm:text-base">+{loan.amount?.toLocaleString()} €</span>
                                </div>
                                {activeTransfer && (
                                    <div className="flex items-center justify-between opacity-50">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="bg-orange-50 p-2 sm:p-3 rounded-full"><Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" /></div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-sm sm:text-base">Virement sortant (En cours)</p>
                                                <p className="text-[10px] sm:text-xs text-gray-400">Vers {activeTransfer.beneficiary}</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-gray-900 text-sm sm:text-base">-{activeTransfer.amount} €</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: PROFILE (PROFIL COMPLET) --- */}
                {activeTab === 'profile' && (
                    <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-right-4 duration-300">
                        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-emerald-600 p-6 sm:p-8 text-white flex items-center gap-4 sm:gap-6">
                                <div className="bg-white/20 p-3 sm:p-4 rounded-full backdrop-blur-sm shrink-0">
                                    <UserCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black">{loan.firstName} {loan.lastName}</h2>
                                    <p className="text-emerald-100 font-medium opacity-90 text-sm sm:text-base">Client Vérifié • Dossier #{loan._id?.substring(0,6)}</p>
                                </div>
                            </div>
                            
                            <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8">
                                {/* Section 1: Personnel */}
                                <div className="space-y-4 sm:space-y-6">
                                    <h3 className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Informations Personnelles</h3>
                                    
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5" />
                                        <div className="min-w-0">
                                            <p className="text-[10px] sm:text-xs text-gray-500 font-bold">Email</p>
                                            <p className="text-gray-900 font-medium break-all text-sm sm:text-base">{loan.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-gray-500 font-bold">Téléphone / WhatsApp</p>
                                            <p className="text-gray-900 font-medium text-sm sm:text-base">{loan.whatsapp || 'Non renseigné'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-gray-500 font-bold">Pays de résidence</p>
                                            <p className="text-gray-900 font-medium text-sm sm:text-base">{loan.country}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Professionnel */}
                                <div className="space-y-4 sm:space-y-6">
                                    <h3 className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Situation Professionnelle</h3>
                                    
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-gray-500 font-bold">Profession</p>
                                            <p className="text-gray-900 font-medium text-sm sm:text-base">{loan.profession}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <Euro className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-gray-500 font-bold">Revenus Mensuels Déclarés</p>
                                            <p className="text-gray-900 font-black text-sm sm:text-base">{loan.income?.toLocaleString()} € / mois</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-100">
                                <h3 className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-widest mb-4 sm:mb-6">Détails du Financement</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                                    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
                                        <p className="text-[10px] sm:text-xs text-gray-500 font-bold mb-1">Montant</p>
                                        <p className="text-lg sm:text-xl font-black text-emerald-600">{loan.amount?.toLocaleString()} €</p>
                                    </div>
                                    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
                                        <p className="text-[10px] sm:text-xs text-gray-500 font-bold mb-1">Durée</p>
                                        <p className="text-lg sm:text-xl font-black text-gray-900">{loan.duration} mois</p>
                                    </div>
                                    <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm col-span-2 sm:col-span-1">
                                        <p className="text-[10px] sm:text-xs text-gray-500 font-bold mb-1">Motif</p>
                                        <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">{loan.reason}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB: TRANSFER --- */}
                {activeTab === 'transfer' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden max-w-2xl mx-auto">
                            <div className="bg-gray-900 p-6 sm:p-8 text-white">
                                <h2 className="text-xl sm:text-2xl font-black flex items-center gap-3">
                                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" /> Effectuer un virement
                                </h2>
                                <p className="text-gray-400 mt-2 text-sm sm:text-base">Zone SEPA et International</p>
                            </div>

                            <div className="p-6 sm:p-12">
                                <form onSubmit={handleTransfer} className="space-y-6 sm:space-y-8">
                                    {transferError && (
                                        <div className="p-4 bg-red-50 text-red-600 font-bold rounded-xl text-center border border-red-100 text-sm">
                                            {transferError}
                                        </div>
                                    )}
                                    
                                    <div className="space-y-5 sm:space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Bénéficiaire</label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                                <input required value={transferBeneficiary} onChange={e => setTransferBeneficiary(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-3 sm:py-4 font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 transition-all text-sm sm:text-base" placeholder="Nom complet" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest ml-1">IBAN</label>
                                                <input required value={transferIban} onChange={e => setTransferIban(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 sm:py-4 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="FR76 ..." />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest ml-1">BIC / SWIFT</label>
                                                <input required value={transferSwift} onChange={e => setTransferSwift(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 sm:py-4 font-mono text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="ABC..." />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] sm:text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Montant</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-lg">€</span>
                                                <input type="number" step="0.01" required value={transferAmount} onChange={e => setTransferAmount(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-3 sm:py-4 font-black text-xl sm:text-2xl text-emerald-600 focus:ring-2 focus:ring-emerald-500 transition-all placeholder-emerald-600/30" placeholder="0.00" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-50 p-4 rounded-2xl flex justify-between items-center text-xs sm:text-sm font-bold text-emerald-800 border border-emerald-100">
                                        <span>Solde disponible :</span>
                                        <span>{loan.balance?.toLocaleString()} €</span>
                                    </div>
                                    
                                    <button type="submit" disabled={transferLoading} className="w-full bg-emerald-600 text-white py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex justify-center items-center gap-3">
                                        {transferLoading ? <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" /> : <>Valider le virement <ArrowRight className="w-5 h-5" /></>}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
