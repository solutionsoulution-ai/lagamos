import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { restdbService } from '../services/restdb';
import { redisService } from '../services/redis';
import { 
  Users, Search, Loader2, Check, X, 
  Clock, Settings, Sparkles, 
  CheckCircle2, AlertCircle, LayoutDashboard, Database, 
  Briefcase, MessageSquare, Mail, UploadCloud, Globe,
  FileText, TrendingUp, ShieldCheck, ExternalLink, Eye, Phone, MapPin, Wallet, Calendar, CheckSquare,
  Plus, Minus, RefreshCw, Key, CreditCard, Lock, ShieldAlert, Timer, UserPlus, Save, Info
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

// Données statiques pour injection (gardées pour référence)
const SPANISH_DATA = { /* ... */ };

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'loans' | 'contacts' | 'config' | 'create_account'>('loans');
  const [loans, setLoans] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);

  // États pour gestion financière
  const [amountOperation, setAmountOperation] = useState('');
  const [operationLoading, setOperationLoading] = useState(false);

  // États pour configuration virement
  const [configDelay, setConfigDelay] = useState<string>('24');
  const [configUnit, setConfigUnit] = useState<'minutes' | 'hours' | 'days'>('hours');
  const [configBlocked, setConfigBlocked] = useState<boolean>(false);
  const [configReason, setConfigReason] = useState<string>('');
  const [configLoading, setConfigLoading] = useState(false);

  // États pour création de compte manuel
  const [newAccount, setNewAccount] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    idCardNumber: '',
    password: '',
    country: 'FR'
  });
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Initialisation des états locaux quand un dossier est sélectionné
  useEffect(() => {
    if (selectedLoan) {
      setConfigDelay(selectedLoan.transferDelay?.toString() || '24');
      setConfigUnit(selectedLoan.transferDelayUnit || 'hours');
      setConfigBlocked(selectedLoan.isBlocked || false);
      setConfigReason(selectedLoan.blockReason || '');
    }
  }, [selectedLoan]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'loans') {
        const data = await restdbService.getAllApplications();
        setLoans(data || []);
      } else if (activeTab === 'contacts') {
        const data = await restdbService.getAllContacts();
        setContacts(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      await restdbService.updateApplication(id, { status });
      const updatedLoans = loans.map(l => l._id === id ? { ...l, status } : l);
      setLoans(updatedLoans);
      if (selectedLoan && selectedLoan._id === id) {
        setSelectedLoan({ ...selectedLoan, status });
      }
    } catch (e) {
      alert("Erreur lors de la mise à jour");
    } finally {
      setActionLoading(null);
    }
  };

  const handleBalanceOperation = async (type: 'credit' | 'debit') => {
    if (!selectedLoan || !amountOperation) return;
    const amount = parseFloat(amountOperation);
    if (isNaN(amount) || amount <= 0) return;

    setOperationLoading(true);
    try {
      const currentBalance = selectedLoan.balance || 0;
      const newBalance = type === 'credit' ? currentBalance + amount : currentBalance - amount;

      await restdbService.updateApplication(selectedLoan._id, { balance: newBalance });
      
      const updatedLoan = { ...selectedLoan, balance: newBalance };
      setSelectedLoan(updatedLoan);
      setLoans(loans.map(l => l._id === selectedLoan._id ? updatedLoan : l));
      setAmountOperation('');
      alert(`Opération réussie : ${type === 'credit' ? '+' : '-'}${amount}€`);
    } catch (e) {
      alert("Erreur lors de l'opération financière");
    } finally {
      setOperationLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!selectedLoan) return;
    setConfigLoading(true);
    try {
        const updateData = {
            transferDelay: parseInt(configDelay),
            transferDelayUnit: configUnit,
            isBlocked: configBlocked,
            blockReason: configReason
        };
        await restdbService.updateApplication(selectedLoan._id, updateData);
        
        const updatedLoan = { ...selectedLoan, ...updateData };
        setSelectedLoan(updatedLoan);
        setLoans(loans.map(l => l._id === selectedLoan._id ? updatedLoan : l));
        alert("Configuration sauvegardée !");
    } catch (e) {
        alert("Erreur sauvegarde configuration");
    } finally {
        setConfigLoading(false);
    }
  };

  const handleSeedLanguage = async (lang: string, data: any) => {
    setActionLoading(`seed-${lang}`);
    try {
      await redisService.setTranslation(lang, data);
      alert(`Langue ${lang} injectée avec succès !`);
    } catch (e) {
      alert(`Erreur injection ${lang}`);
    } finally {
      setActionLoading(null);
    }
  };

  // --- LOGIQUE CRÉATION COMPTE MANUEL ---
  const generateIBAN = () => {
    const bankCode = "30004"; 
    const branchCode = "01458"; 
    const accountNb = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
    const key = Math.floor(Math.random() * 90 + 10).toString();
    return `FR76 ${bankCode} ${branchCode} ${accountNb} ${key}`;
  };

  const handleCreateAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const submitNewAccount = async (e: React.FormEvent) => {
      e.preventDefault();
      setCreateLoading(true);

      try {
        // Préparation des données "type prêt" mais adaptées pour un compte simple
        const accountData = {
            ...newAccount,
            whatsapp: newAccount.phone, // Mapping
            amount: 0, // Pas de prêt initial
            duration: 0,
            profession: 'Non spécifié (Compte Manuel)',
            income: 0,
            reason: 'Ouverture Compte Bancaire Direct',
            status: 'approved', // Approuvé direct car créé par admin
            feesAccepted: true,
            consent: true,
            processingConsent: true,
            date: new Date().toISOString(),
            // Données bancaires
            iban: generateIBAN(),
            bic: 'ERPYFRPP',
            balance: 0,
            password: newAccount.password || 'Europfy2026', // MDP par défaut si vide
            transferDelay: 24,
            transferDelayUnit: 'hours',
            isBlocked: false
        };

        await restdbService.submitApplication(accountData);
        alert("Compte bancaire créé avec succès !");
        
        // Reset form
        setNewAccount({
            firstName: '', lastName: '', email: '', phone: '', 
            address: '', idCardNumber: '', password: '', country: 'FR'
        });
        
        // Rediriger vers la liste
        setActiveTab('loans');
      } catch (error) {
          console.error(error);
          alert("Erreur lors de la création du compte.");
      } finally {
          setCreateLoading(false);
      }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-xl">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-gray-500 font-medium">Gestion globale de la plateforme</p>
            </div>
          </div>
          <div className="flex flex-wrap bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-full md:w-auto overflow-x-auto">
            {[
              { id: 'loans', label: 'Dossiers', icon: Briefcase },
              { id: 'create_account', label: 'Nouveau Compte', icon: UserPlus },
              { id: 'contacts', label: 'Messages', icon: MessageSquare },
              { id: 'config', label: 'Outils', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 animate-spin text-gray-300" /></div>
        ) : (
          <div className="space-y-6">
            
            {/* LOANS LIST */}
            {activeTab === 'loans' && (
              <div className="grid gap-4">
                {loans.length === 0 ? (
                   <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                      <p className="text-gray-400 font-bold uppercase">Aucun dossier en cours</p>
                   </div>
                ) : (
                  loans.map(loan => (
                    <div key={loan._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:shadow-md transition-shadow">
                       <div className="space-y-1 flex-grow w-full">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                             <h3 className="text-lg font-black text-gray-900">{loan.firstName} {loan.lastName}</h3>
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                               loan.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                               loan.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                               'bg-red-100 text-red-600'
                             }`}>
                                {loan.status}
                             </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                             <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {loan.email}</span>
                             <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {loan.amount} €</span>
                             <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded"><Wallet className="w-3 h-3" /> Solde: {loan.balance || 0} €</span>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-3 w-full lg:w-auto">
                          <button 
                            onClick={() => setSelectedLoan(loan)}
                            className="flex-1 lg:flex-none justify-center bg-gray-100 text-gray-700 p-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                            title="Voir tous les détails"
                          >
                            <Eye className="w-5 h-5" /> <span className="lg:hidden text-sm font-bold">Détails</span>
                          </button>
                       </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* CREATE ACCOUNT TAB */}
            {activeTab === 'create_account' && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-emerald-600 p-8 text-white">
                            <h2 className="text-2xl font-black flex items-center gap-3">
                                <UserPlus className="w-8 h-8 text-emerald-200" /> Création Compte Bancaire
                            </h2>
                            <p className="text-emerald-100 mt-2">Ce formulaire crée un compte client direct (Type: Compte Courant) avec RIB généré automatiquement.</p>
                        </div>
                        <div className="p-8">
                            <form onSubmit={submitNewAccount} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Prénom</label>
                                        <input required name="firstName" value={newAccount.firstName} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-gray-900" placeholder="Jean" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Nom</label>
                                        <input required name="lastName" value={newAccount.lastName} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-gray-900" placeholder="Dupont" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Adresse Postale Complète</label>
                                    <input required name="address" value={newAccount.address} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-medium text-gray-900" placeholder="10 Rue de la Paix, 75000 Paris" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                                        <input required type="email" name="email" value={newAccount.email} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-medium text-gray-900" placeholder="client@mail.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Téléphone</label>
                                        <input required name="phone" value={newAccount.phone} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-medium text-gray-900" placeholder="+33 6..." />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">N° CNI / Passeport</label>
                                        <input required name="idCardNumber" value={newAccount.idCardNumber} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-medium text-gray-900" placeholder="A12345678" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Pays</label>
                                        <select name="country" value={newAccount.country} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-medium text-gray-900">
                                            <option value="FR">France</option>
                                            <option value="BE">Belgique</option>
                                            <option value="CH">Suisse</option>
                                            <option value="LU">Luxembourg</option>
                                            <option value="CA">Canada</option>
                                            <option value="MC">Monaco</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Mot de passe Compte</label>
                                    <input required name="password" value={newAccount.password} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-gray-900" placeholder="Définir un mot de passe..." />
                                </div>

                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                                    <Info className="w-5 h-5 text-blue-600 shrink-0" />
                                    <p className="text-sm text-blue-800">
                                        Ce compte sera créé avec un statut <strong>Approuvé</strong>. Le RIB sera généré instantanément. Le client pourra se connecter immédiatement avec l'email et le mot de passe définis.
                                    </p>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={createLoading}
                                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                                >
                                    {createLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                    Créer le compte maintenant
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* CONTACTS TAB */}
            {activeTab === 'contacts' && (
              <div className="grid gap-4">
                 {contacts.map(contact => (
                    <div key={contact._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                       <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                          <div>
                             <h4 className="font-bold text-gray-900">{contact.name}</h4>
                             <p className="text-sm text-gray-500">{contact.email}</p>
                          </div>
                          <span className="text-xs font-medium text-gray-400">{new Date(contact.date).toLocaleDateString()}</span>
                       </div>
                       <p className="text-gray-700 bg-gray-50 p-4 rounded-xl text-sm">{contact.message}</p>
                    </div>
                 ))}
              </div>
            )}

            {/* CONFIG TAB */}
            {activeTab === 'config' && (
              <div className="grid lg:grid-cols-2 gap-8">
                 <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl">
                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                       <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">Injection Espagnol (ES)</h3>
                    <button onClick={() => handleSeedLanguage('es', SPANISH_DATA)} disabled={!!actionLoading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      {actionLoading === 'seed-es' ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />} Injecter ES
                    </button>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* MODAL DÉTAILS DOSSIER */}
        {selectedLoan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 p-4 sm:p-6 flex justify-between items-center z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-50 p-3 rounded-xl">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-gray-900">Dossier Complet</h2>
                    <p className="text-sm text-gray-500 font-medium">Réf: {selectedLoan._id.substring(0, 8)}...</p>
                  </div>
                </div>
                <button onClick={() => setSelectedLoan(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-4 sm:p-6 space-y-8 flex-grow">
                
                {/* 1. GESTION FINANCIÈRE (Seulement si approuvé) */}
                {selectedLoan.status === 'approved' && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Crédit / Débit */}
                        <section className="bg-gray-900 rounded-2xl p-6 text-white space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-emerald-400">
                                    <Wallet className="w-4 h-4" /> Gestion Solde
                                </h3>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">Solde Actuel</p>
                                    <p className="text-3xl font-black">{selectedLoan.balance || 0} €</p>
                                </div>
                            </div>
                            
                            <div className="bg-white/10 p-4 rounded-xl space-y-4">
                                <p className="text-xs font-bold text-gray-300 uppercase">Opérations</p>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" 
                                        placeholder="Montant..." 
                                        className="bg-gray-800 border-none rounded-lg px-4 py-2 text-white w-full"
                                        value={amountOperation}
                                        onChange={(e) => setAmountOperation(e.target.value)}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => handleBalanceOperation('credit')}
                                        disabled={operationLoading}
                                        className="bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Créditer
                                    </button>
                                    <button 
                                        onClick={() => handleBalanceOperation('debit')}
                                        disabled={operationLoading}
                                        className="bg-white/10 hover:bg-white/20 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" /> Débiter
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* CONFIGURATION VIREMENT & BLOCAGE */}
                        <section className="bg-orange-50 rounded-2xl p-6 border border-orange-100 space-y-6">
                             <div className="flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-orange-600" />
                                <h3 className="text-sm font-black text-orange-900 uppercase">Sécurité & Virement</h3>
                             </div>

                             <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-orange-800 uppercase block mb-1">Durée Virement Sortant</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="number" 
                                            className="w-20 rounded-lg border-none p-2 text-center font-bold" 
                                            value={configDelay}
                                            onChange={e => setConfigDelay(e.target.value)}
                                        />
                                        <select 
                                            className="flex-1 rounded-lg border-none p-2 font-bold"
                                            value={configUnit}
                                            onChange={e => setConfigUnit(e.target.value as any)}
                                        >
                                            <option value="minutes">Minutes</option>
                                            <option value="hours">Heures</option>
                                            <option value="days">Jours</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-xl border border-orange-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-xs font-bold text-red-600 uppercase">Blocage Virement</label>
                                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                            <input 
                                                type="checkbox" 
                                                name="toggle" 
                                                id="toggle" 
                                                checked={configBlocked}
                                                onChange={e => setConfigBlocked(e.target.checked)}
                                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                                                style={{ right: configBlocked ? '0' : 'auto', left: configBlocked ? 'auto' : '0', borderColor: configBlocked ? '#DC2626' : '#E5E7EB' }}
                                            />
                                            <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${configBlocked ? 'bg-red-600' : 'bg-gray-300'}`}></label>
                                        </div>
                                    </div>
                                    {configBlocked && (
                                        <div className="animate-in fade-in">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Motif du blocage (visible client)</label>
                                            <textarea 
                                                className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm font-medium resize-none" 
                                                rows={2}
                                                value={configReason}
                                                onChange={e => setConfigReason(e.target.value)}
                                                placeholder="Ex: Contrôle de sécurité en cours..."
                                            ></textarea>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={handleSaveConfig}
                                    disabled={configLoading}
                                    className="w-full bg-orange-600 text-white py-2 rounded-lg font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all disabled:opacity-50"
                                >
                                    {configLoading ? "Sauvegarde..." : "Appliquer la configuration"}
                                </button>
                             </div>
                        </section>
                    </div>
                )}

                {/* 2. INFOS DE CONNEXION (MDP) & BANCAIRES (RIB) */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Carte Connexion */}
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 space-y-4">
                        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                            <Key className="w-4 h-4" /> Accès Client
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded-lg border border-blue-100">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Email de connexion</p>
                                <p className="font-bold text-gray-900 select-all break-all">{selectedLoan.email}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-blue-100">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">Mot de passe</p>
                                <p className="font-mono font-bold text-red-600 bg-red-50 inline-block px-2 rounded select-all break-all">{selectedLoan.password || "Non enregistré"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Carte Bancaire */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                            <CreditCard className="w-4 h-4" /> RIB Généré
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">IBAN</p>
                                <p className="font-mono font-bold text-gray-900 select-all break-all">{selectedLoan.iban || "En attente"}</p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border border-gray-200">
                                <p className="text-[10px] text-gray-400 font-bold uppercase">BIC / SWIFT</p>
                                <p className="font-mono font-bold text-gray-900 select-all">{selectedLoan.bic || "En attente"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. DÉTAILS PERSONNELS & PRO */}
                <section className="space-y-4">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Users className="w-4 h-4" /> Détails Personnels & Professionnels
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 font-bold mb-1">Nom complet</p>
                      <p className="text-gray-900 font-bold">{selectedLoan.firstName} {selectedLoan.lastName}</p>
                    </div>
                    {selectedLoan.address && (
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm col-span-2 sm:col-span-1">
                          <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Adresse</p>
                          <p className="text-gray-900 font-medium text-sm">{selectedLoan.address}</p>
                        </div>
                    )}
                    {selectedLoan.idCardNumber && (
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> CNI / Passeport</p>
                          <p className="text-gray-900 font-mono font-bold">{selectedLoan.idCardNumber}</p>
                        </div>
                    )}
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Pays</p>
                      <p className="text-gray-900 font-medium">{selectedLoan.country}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> WhatsApp</p>
                      <p className="text-gray-900 font-medium">{selectedLoan.whatsapp || 'Non renseigné'}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 font-bold mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3" /> Profession</p>
                      <p className="text-gray-900 font-medium">{selectedLoan.profession}</p>
                    </div>
                  </div>
                </section>
                
                {/* 4. MOTIF & CONFORMITÉ */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Motif du prêt / compte</p>
                        <p className="text-gray-700 italic">"{selectedLoan.reason}"</p>
                    </div>
                    
                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-3">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Conformité</p>
                        <div className="flex items-center gap-2 text-sm">
                            {selectedLoan.feesAccepted ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-red-500" />}
                            <span className={selectedLoan.feesAccepted ? "text-gray-700 font-medium" : "text-gray-400"}>Frais acceptés</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            {selectedLoan.consent ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <X className="w-4 h-4 text-red-500" />}
                            <span className={selectedLoan.consent ? "text-gray-700 font-medium" : "text-gray-400"}>RGPD / Exactitude</span>
                        </div>
                    </div>
                </div>

                {/* 5. RÉCAPITULATIF PRÊT (Si applicable) */}
                {selectedLoan.amount > 0 && (
                    <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex flex-col sm:flex-row gap-6 justify-between items-center">
                        <div className="text-center sm:text-left">
                          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Montant demandé</p>
                          <p className="text-3xl font-black text-emerald-900">{selectedLoan.amount?.toLocaleString()} €</p>
                        </div>
                        <div className="h-px w-full sm:w-px sm:h-12 bg-emerald-200"></div>
                        <div className="text-center sm:text-right">
                          <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Durée souhaitée</p>
                          <p className="text-3xl font-black text-emerald-900">{selectedLoan.duration} mois</p>
                        </div>
                    </div>
                )}

              </div>

              {/* Modal Footer Actions */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-end gap-3 z-10 shrink-0">
                {selectedLoan.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleUpdateStatus(selectedLoan._id, 'rejected')}
                      className="px-6 py-3 rounded-xl font-bold text-gray-700 bg-white border border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex justify-center items-center gap-2"
                    >
                      <X className="w-4 h-4" /> Refuser
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedLoan._id, 'approved')}
                      className="px-6 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all flex justify-center items-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Approuver
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;