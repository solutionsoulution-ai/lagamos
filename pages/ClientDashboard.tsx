
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, User, Transaction } from '../types';
import { restdbService } from '../services/restdb';
import { 
  User as UserIcon, Euro, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, TrendingUp, ShieldCheck, 
  Loader2, MessageCircle, Lock, Hourglass, FileBadge, CreditCard, Copy, Send, Wallet, Ban, 
  LayoutDashboard, UserCircle, History, Settings, Building, MapPin, Briefcase, Phone, Mail, Calendar, LogOut, XCircle, X, Download
} from 'lucide-react';

interface ClientDashboardProps {
  language: Language;
  user: User;
  onNavigate: (page: string) => void;
}

const DEMO_LOAN = {
  _id: 'demo-loan-123',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'demo@europcapital.com',
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
  date: '2023-10-15T10:00:00Z',
  transferHistory: [] as Transaction[]
};

const ClientDashboard: React.FC<ClientDashboardProps> = ({ language, user, onNavigate }) => {
  const { t } = useTranslation();
  
  const [loan, setLoan] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'transfer'>('overview');
  
  const [transferAmount, setTransferAmount] = useState('');
  const [transferIban, setTransferIban] = useState('');
  const [transferSwift, setTransferSwift] = useState('');
  const [transferBeneficiary, setTransferBeneficiary] = useState('');
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  
  const [activeTransfer, setActiveTransfer] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [transferBlockedError, setTransferBlockedError] = useState<string | null>(null);

  // État pour le détail d'une transaction
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const isDemo = user.email === 'demo@europcapital.com';

  const fetchData = async () => {
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
        } else {
            setActiveTransfer(null);
        }
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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

            const isBlocked = loan.isBlocked === true;
            const newHistory: Transaction = {
                id: `TX-${Date.now()}`,
                type: 'debit',
                amount: activeTransfer.amount,
                label: `Virement vers ${activeTransfer.beneficiary}`,
                date: new Date().toISOString(),
                status: isBlocked ? 'failed' : 'completed',
                beneficiary: activeTransfer.beneficiary,
                iban: activeTransfer.iban,
                swift: activeTransfer.swift
            };

            const updatedHistory = [newHistory, ...(loan.transferHistory || [])];
            let newBalance = loan.balance || 0;

            if (isBlocked) {
                setTransferBlockedError(loan.blockReason || "Virement bloqué par le service sécurité.");
                newBalance += activeTransfer.amount; // Remboursement
            }

            if (!isDemo) {
                await restdbService.updateApplication(loan._id, { 
                    balance: newBalance,
                    currentTransfer: null,
                    transferHistory: updatedHistory
                });
            }

            setLoan((prev: any) => ({ 
                ...prev, 
                balance: newBalance, 
                currentTransfer: null, 
                transferHistory: updatedHistory 
            }));
            
            setActiveTransfer(null);
            if (!isBlocked) alert("Virement exécuté avec succès !");
        } else {
            const totalDuration = end - start;
            const elapsed = now - start;
            const percent = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
            setProgress(percent);
        }
    }, 2000); 

    return () => clearInterval(interval);
  }, [activeTransfer, loan, isDemo]);

  const handleCopyRib = () => {
    if (loan && loan.iban) {
      navigator.clipboard.writeText(`IBAN: ${loan.iban}\nBIC: ${loan.bic}`);
      alert("RIB et BIC copiés !");
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
      }
      
      setLoan({ ...loan, balance: newBalance });
      setActiveTransfer(transferData);
      setTransferBlockedError(null);
      
      setTransferAmount('');
      setTransferIban('');
      setTransferSwift('');
      setTransferBeneficiary('');
      setActiveTab('overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      setTransferError("Erreur lors de l'initiation du virement.");
    } finally {
      setTransferLoading(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-emerald-600 animate-spin" /></div>;

  if (loan && loan.status === 'pending') return (
      <div className="pt-24 sm:pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12 space-y-2">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900">Bienvenue, {loan.firstName}</h1>
                <p className="text-gray-500 font-medium text-sm">Dossier en cours d'analyse</p>
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative">
                <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-start gap-3">
                    <Hourglass className="w-5 h-5 text-orange-600 animate-pulse mt-0.5" />
                    <div><h3 className="text-sm font-black text-orange-800">Action requise</h3><p className="text-orange-700 text-[11px] font-medium">L'accès complet est verrouillé en attente de vos pièces justificatives.</p></div>
                </div>
                <div className="p-6 sm:p-12 space-y-8 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"><FileBadge className="w-8 h-8 text-emerald-600" /></div>
                    <h2 className="text-xl font-black text-gray-900">Vérification d'Identité</h2>
                    <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">Veuillez envoyer une photo de votre <strong>Pièce d'Identité</strong> via notre canal sécurisé.</p>
                    <a href="https://wa.me/33754095027" target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-3 text-sm">
                        <MessageCircle className="w-5 h-5" /> Envoyer sur WhatsApp
                    </a>
                </div>
            </div>
        </div>
      </div>
  );

  return (
    <div className="pt-20 sm:pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-8">
        
        <div className="flex flex-col gap-1 sm:gap-2 mb-2 sm:mb-6">
            <p className="text-gray-400 font-black uppercase tracking-widest text-[9px] sm:text-xs">Espace Europcapital Bank</p>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 truncate">Bonjour, {loan.firstName}</h1>
        </div>

        {transferBlockedError && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 animate-in slide-in-from-top-4">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                    <h3 className="font-black text-red-900">Alerte Sécurité</h3>
                    <p className="text-red-700 mt-1">{transferBlockedError}</p>
                </div>
            </div>
        )}

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
            
            <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-1 sm:p-4 shadow-sm border border-gray-100 sticky top-20 z-20">
                    <nav className="grid grid-cols-3 lg:grid-cols-1 gap-1 sm:gap-2">
                        {[
                            { id: 'overview', label: "Accueil", icon: LayoutDashboard },
                            { id: 'transfer', label: "Virements", icon: Send },
                            { id: 'profile', label: "Profil", icon: UserCircle }
                        ].map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id as any); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-3 px-2 py-2.5 sm:py-4 rounded-xl font-black transition-all ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 lg:text-gray-500 hover:bg-gray-50'}`}
                            >
                                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="text-[9px] sm:text-sm whitespace-nowrap">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="lg:col-span-9 space-y-4 sm:space-y-8">

                {activeTab === 'overview' && (
                    <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-300">
                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                            
                            {/* CARTE SOLDE - TOUJOURS VISIBLE */}
                            <div className="bg-gray-900 rounded-[2rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[200px] sm:min-h-[280px]">
                                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-500/10 rounded-full blur-[60px] sm:blur-[80px]"></div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <p className="text-emerald-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1">Solde disponible</p>
                                        <h2 className="text-2xl sm:text-5xl font-black tracking-tight leading-none">
                                            {loan.balance?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span className="text-lg sm:text-3xl opacity-50">€</span>
                                        </h2>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md border border-white/5"><Building className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400" /></div>
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <p className="font-mono text-gray-500 text-[10px] sm:text-sm tracking-[0.2em]">**** **** **** {loan.iban?.slice(-4)}</p>
                                    <button onClick={() => setActiveTab('transfer')} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-black text-[10px] sm:text-sm shadow-xl shadow-emerald-900/50 transition-all uppercase">
                                        Effectuer un virement
                                    </button>
                                </div>
                            </div>

                            {/* CARTE COORDONNÉES - TOUJOURS VISIBLE */}
                            <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gray-50 rounded-full"></div>
                                <div className="relative z-10 space-y-5 sm:space-y-6">
                                   <div className="flex justify-between items-center">
                                      <h3 className="text-xs sm:text-base font-black text-gray-900 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" /> Vos Coordonnées
                                      </h3>
                                      <button onClick={handleCopyRib} className="p-2 bg-gray-50 rounded-lg hover:text-emerald-600 transition-colors active:scale-90"><Copy className="w-4 h-4" /></button>
                                   </div>
                                   <div className="space-y-3">
                                      <div className="bg-gray-50/50 p-3 sm:p-4 rounded-xl border border-gray-100">
                                        <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">IBAN INTERNATIONAL</p>
                                        <p className="font-mono font-bold text-emerald-800 text-[10px] sm:text-sm break-all">{loan.iban}</p>
                                      </div>
                                      <div className="flex gap-2 sm:gap-3">
                                         <div className="flex-1 bg-gray-50/50 p-2 sm:p-3 rounded-xl border border-gray-100">
                                            <p className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">BIC / SWIFT</p>
                                            <p className="font-mono font-bold text-gray-900 text-[9px] sm:text-xs truncate">{loan.bic}</p>
                                         </div>
                                         <div className="flex-1 bg-gray-50/50 p-2 sm:p-3 rounded-xl border border-gray-100">
                                            <p className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">DEVISE</p>
                                            <p className="font-bold text-gray-900 text-[9px] sm:text-xs">EUR (€)</p>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                            </div>
                        </div>

                        {/* VIREMENT EN COURS - DÉPLACÉ DANS UN BANDEAU DÉDIÉ */}
                        {activeTransfer && (
                            <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl animate-in slide-in-from-top-4 duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px]"></div>
                                <div className="relative z-10 space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-emerald-600/20 p-2 rounded-xl border border-emerald-600/30">
                                                <Clock className="w-5 h-5 text-emerald-400 animate-pulse" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-black uppercase tracking-wider">Transfert en cours</h3>
                                                <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Virement vers : {activeTransfer.beneficiary}</p>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {activeTransfer.amount.toLocaleString()} €
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                            <div className="bg-emerald-500 h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                            <span>Traitement sécurisé Europcapital</span>
                                            <span>{progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-gray-100">
                            <h3 className="text-xs sm:text-lg font-black text-gray-900 mb-6 flex items-center gap-2"><History className="w-5 h-5 text-gray-400" /> Historique des transactions</h3>
                            
                            <div className="space-y-6">
                                {(!loan.transferHistory || loan.transferHistory.length === 0) ? (
                                    <div className="py-10 text-center space-y-3">
                                        <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                                            <History className="w-6 h-6 text-gray-300" />
                                        </div>
                                        <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">Aucune transaction pour le moment</p>
                                    </div>
                                ) : (
                                    loan.transferHistory.map((tx: Transaction) => (
                                        <div 
                                          key={tx.id} 
                                          onClick={() => setSelectedTx(tx)}
                                          className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 -mx-4 px-4 py-2 rounded-2xl transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-xl shrink-0 transition-all ${tx.status === 'completed' ? 'bg-gray-50 text-gray-400 group-hover:bg-gray-900 group-hover:text-white' : 'bg-red-50 text-red-500'}`}>
                                                    {tx.status === 'completed' ? <ArrowRight className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className={`font-black text-[11px] sm:text-base truncate ${tx.status === 'failed' ? 'text-red-600 line-through opacity-60' : 'text-gray-900'}`}>{tx.label}</p>
                                                    <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(tx.date).toLocaleDateString()} • {tx.status === 'completed' ? 'Succès' : 'Échec'}</p>
                                                </div>
                                            </div>
                                            <span className={`font-black text-xs sm:text-base whitespace-nowrap ${tx.status === 'failed' ? 'text-gray-400' : 'text-gray-900'}`}>-{tx.amount.toLocaleString()} €</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="animate-in slide-in-from-right-4 duration-300">
                        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-emerald-600 p-6 sm:p-10 text-white flex items-center gap-4">
                                <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md shrink-0"><UserCircle className="w-8 h-8 sm:w-12 sm:h-12" /></div>
                                <div className="min-w-0">
                                    <h2 className="text-base sm:text-2xl font-black truncate">{loan.firstName} {loan.lastName}</h2>
                                    <p className="text-emerald-100 text-[9px] sm:text-xs font-bold uppercase tracking-widest opacity-80">Profil Vérifié Europcapital</p>
                                </div>
                            </div>
                            <div className="p-6 sm:p-10 space-y-10">
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-2">Identité & Contact</h3>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="flex items-start gap-3"><Mail className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /><div><p className="text-[9px] font-black text-gray-500 uppercase">Email</p><p className="text-[11px] sm:text-sm font-bold text-gray-900 break-all">{loan.email}</p></div></div>
                                        <div className="flex items-start gap-3"><Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /><div><p className="text-[9px] font-black text-gray-500 uppercase">WhatsApp / Tel</p><p className="text-[11px] sm:text-sm font-bold text-gray-900">{loan.whatsapp}</p></div></div>
                                        <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /><div><p className="text-[9px] font-black text-gray-500 uppercase">Pays de résidence</p><p className="text-[11px] sm:text-sm font-bold text-gray-900">{loan.country}</p></div></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-2">Situation Pro</h3>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="flex items-start gap-3"><Briefcase className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /><div><p className="text-[9px] font-black text-gray-500 uppercase">Métier</p><p className="text-[11px] sm:text-sm font-bold text-gray-900">{loan.profession}</p></div></div>
                                        <div className="flex items-start gap-3"><Euro className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /><div><p className="text-[9px] font-black text-gray-500 uppercase">Revenu déclaré</p><p className="text-[11px] sm:text-sm font-black text-gray-900">{loan.income?.toLocaleString()} € / mois</p></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'transfer' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-2xl mx-auto">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden">
                            <div className="bg-gray-900 p-6 sm:p-8 text-white">
                                <h2 className="text-base sm:text-xl font-black flex items-center gap-2"><Send className="w-5 h-5 text-emerald-400" /> Nouveau Virement</h2>
                                <p className="text-gray-400 text-[10px] sm:text-xs mt-1 uppercase font-bold tracking-widest">Zone SEPA & International autorisé</p>
                            </div>
                            <div className="p-6 sm:p-10">
                                <form onSubmit={handleTransfer} className="space-y-6">
                                    {transferError && <div className="p-3 bg-red-50 text-red-600 font-bold rounded-xl text-center text-xs animate-in shake-in">{transferError}</div>}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bénéficiaire</label>
                                        <div className="relative"><UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" /><input required value={transferBeneficiary} onChange={e => setTransferBeneficiary(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl pl-11 pr-4 py-3 sm:py-4 font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 transition-all text-xs sm:text-sm" placeholder="Nom Complet" /></div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">IBAN Destination</label><input required value={transferIban} onChange={e => setTransferIban(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 sm:py-4 font-mono text-[10px] sm:text-xs focus:ring-2 focus:ring-emerald-500" placeholder="FR76 ..." /></div>
                                        <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">BIC / SWIFT</label><input required value={transferSwift} onChange={e => setTransferSwift(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 sm:py-4 font-mono text-[10px] sm:text-xs focus:ring-2 focus:ring-emerald-500" placeholder="ABC..." /></div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Montant du virement</label>
                                        <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">€</span><input type="number" step="0.01" required value={transferAmount} onChange={e => setTransferAmount(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl pl-8 pr-4 py-4 sm:py-5 font-black text-xl sm:text-3xl text-emerald-600 focus:ring-2 focus:ring-emerald-500" placeholder="0.00" /></div>
                                    </div>
                                    <div className="bg-emerald-50 p-4 rounded-xl flex justify-between items-center text-[10px] sm:text-xs font-black text-emerald-800 uppercase tracking-widest border border-emerald-100"><span>Disponible</span><span>{loan.balance?.toLocaleString()} €</span></div>
                                    <button type="submit" disabled={transferLoading || activeTransfer !== null} className="w-full bg-emerald-600 text-white py-4 sm:py-5 rounded-2xl font-black text-sm sm:text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex justify-center items-center gap-3 disabled:opacity-50">
                                        {transferLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : activeTransfer ? "Un virement est déjà en cours" : <>Confirmer l'envoi <Send className="w-4 h-4" /></>}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>

      {/* --- MODAL DÉTAILS TRANSACTION --- */}
      {selectedTx && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-md rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="relative p-6">
              <button 
                onClick={() => setSelectedTx(null)}
                className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>

              <div className="text-center space-y-4">
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${selectedTx.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {selectedTx.type === 'credit' ? <TrendingUp className="w-7 h-7" /> : selectedTx.status === 'completed' ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
                </div>
                
                <div>
                  <h2 className="text-lg font-black text-gray-900 px-2 leading-tight">{selectedTx.label}</h2>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{selectedTx.id}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                   <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Montant</span>
                      <span className={`text-xl font-black ${selectedTx.type === 'credit' ? 'text-emerald-600' : 'text-gray-900'}`}>
                        {selectedTx.type === 'debit' ? '-' : '+'}{selectedTx.amount.toLocaleString()} €
                      </span>
                   </div>

                   <div className="space-y-3">
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Compte Concerné</span>
                        <span className="text-xs font-bold text-gray-900">{selectedTx.beneficiary}</span>
                      </div>
                      
                      {selectedTx.iban && (
                        <div className="flex flex-col items-start gap-0.5">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Coordonnées (IBAN)</span>
                          <span className="text-[9px] font-mono font-bold text-emerald-800 break-all bg-emerald-50 border border-emerald-100 px-2 py-1.5 rounded-lg w-full text-left">{selectedTx.iban}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 pt-1">
                         <div className="flex flex-col items-start gap-0.5">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Date Valeur</span>
                            <span className="text-xs font-bold text-gray-900">{new Date(selectedTx.date).toLocaleDateString()}</span>
                         </div>
                         <div className="flex flex-col items-end gap-0.5">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">État</span>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${selectedTx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {selectedTx.status === 'completed' ? 'Exécuté' : 'Échoué'}
                            </span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="pt-2">
                   <button 
                     onClick={() => setSelectedTx(null)}
                     className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all"
                   >
                     Fermer
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
