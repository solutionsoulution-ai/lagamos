import React, { useState, useEffect } from 'react';
import { Language, Transaction } from '../types';
import { restdbService } from '../services/restdb';
import { emailService } from '../services/email';
import { 
  Users, Search, Loader2, Check, X, 
  Clock, Settings, Sparkles, 
  CheckCircle2, AlertCircle, LayoutDashboard, Database, 
  Briefcase, MessageSquare, Mail, UploadCloud, Globe,
  FileText, TrendingUp, ShieldCheck, ExternalLink, Eye, Phone, MapPin, Wallet, Calendar, CheckSquare,
  Plus, Minus, RefreshCw, Key, CreditCard, Lock, ShieldAlert, Timer, UserPlus, Save, Info, Activity, ClipboardList, UserCheck, ChevronLeft, DatabaseZap
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'loans' | 'contacts' | 'config' | 'create_account'>('loans');
  const [loans, setLoans] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [dbStatus, setDbStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  const [amountOperation, setAmountOperation] = useState('');
  const [operationLoading, setOperationLoading] = useState(false);

  const [configDelay, setConfigDelay] = useState<string>('24');
  const [configUnit, setConfigUnit] = useState<'minutes' | 'hours' | 'days'>('hours');
  const [configBlocked, setConfigBlocked] = useState<boolean>(false);
  const [configReason, setConfigReason] = useState<string>('');
  const [configLoading, setConfigLoading] = useState(false);

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
    setDbStatus('checking');
    try {
      if (activeTab === 'loans') {
        const data = await restdbService.getAllApplications();
        const sortedData = (data || []).sort((a: any, b: any) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setLoans(sortedData);
        setDbStatus('online');
      } else if (activeTab === 'contacts') {
        const data = await restdbService.getAllContacts();
        const sortedContacts = (data || []).sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setContacts(sortedContacts);
        setDbStatus('online');
      }
    } catch (e) {
      console.error(e);
      setDbStatus('offline');
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
      
      const newTransaction: Transaction = {
        id: `ADM-${Date.now()}`,
        type: type,
        amount: amount,
        label: type === 'credit' ? "Crédit de compte (Virement reçu)" : "Débit de compte (Régularisation)",
        date: new Date().toISOString(),
        status: 'completed',
        beneficiary: 'Europcapital Management'
      };

      const updatedHistory = [newTransaction, ...(selectedLoan.transferHistory || [])];
      const updateData = { 
        balance: newBalance,
        transferHistory: updatedHistory
      };

      await restdbService.updateApplication(selectedLoan._id, updateData);
      
      // Envoi de la notification par email
      await emailService.sendBalanceUpdate(
        selectedLoan.email, 
        selectedLoan.firstName, 
        amount, 
        type, 
        newBalance
      );
      
      const updatedLoan = { ...selectedLoan, ...updateData };
      setSelectedLoan(updatedLoan);
      setLoans(loans.map(l => l._id === selectedLoan._id ? updatedLoan : l));
      setAmountOperation('');
      alert(`Opération réussie. Un email de notification a été envoyé au client.`);
    } catch (e) {
      console.error(e);
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
        const genPass = newAccount.password || 'Europcapital2026';
        const accountData = {
            ...newAccount,
            whatsapp: newAccount.phone,
            amount: 0,
            duration: 0,
            profession: 'Compte Bancaire Direct',
            loanType: 'banque',
            income: 0,
            reason: 'Ouverture Directe',
            status: 'approved',
            feesAccepted: true,
            consent: true,
            processingConsent: true,
            date: new Date().toISOString(),
            iban: generateIBAN(),
            bic: 'ERPYFRPP',
            balance: 0,
            password: genPass,
            transferDelay: 24,
            transferDelayUnit: 'hours',
            isBlocked: false,
            transferHistory: []
        };
        await restdbService.submitApplication(accountData);
        await emailService.sendWelcomeEmail(newAccount.email, `${newAccount.firstName} ${newAccount.lastName}`, genPass);
        alert("Compte créé et email de bienvenue envoyé !");
        setNewAccount({ firstName: '', lastName: '', email: '', phone: '', address: '', idCardNumber: '', password: '', country: 'FR' });
        setActiveTab('loans');
      } catch (error) {
          alert("Erreur lors de la création.");
      } finally {
          setCreateLoading(false);
      }
  };

  const totalBalance = loans.reduce((acc, l) => acc + (l.balance || 0), 0);
  const pendingCount = loans.filter(l => l.status === 'pending').length;

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-xl">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
              <p className="text-gray-500 font-medium">Gestion globale de la plateforme Europcapital</p>
            </div>
          </div>
          <div className="flex flex-wrap bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-full md:w-auto">
            {[
              { id: 'loans', label: 'Dossiers', icon: Briefcase },
              { id: 'create_account', label: 'Nouveau Compte', icon: UserPlus },
              { id: 'contacts', label: 'Messages', icon: MessageSquare },
              { id: 'config', label: 'Outils', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                  activeTab === tab.id ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Soldes Clients</p>
                <p className="text-2xl font-black text-emerald-600">{totalBalance.toLocaleString()} €</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dossiers en attente</p>
                <p className="text-2xl font-black text-orange-600">{pendingCount}</p>
            </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 animate-spin text-gray-300" /></div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'loans' && (
              <div className="grid gap-4">
                {loans.map(loan => (
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
                             <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded"><Wallet className="w-3 h-3" /> Solde: {loan.balance || 0} €</span>
                             <span className="text-[10px] text-gray-400 font-bold ml-auto">{new Date(loan.date).toLocaleDateString()}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <button onClick={() => setSelectedLoan(loan)} className="bg-gray-100 text-gray-700 p-2.5 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"><Eye className="w-5 h-5" /> Détails</button>
                       </div>
                    </div>
                  ))}
              </div>
            )}

            {activeTab === 'create_account' && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-emerald-600 p-8 text-white">
                            <h2 className="text-2xl font-black flex items-center gap-3"><UserPlus className="w-8 h-8 text-emerald-200" /> Nouveau Compte Client</h2>
                            <p className="text-emerald-100 mt-2">Créez un compte et envoyez les accès automatiquement.</p>
                        </div>
                        <div className="p-8">
                            <form onSubmit={submitNewAccount} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Prénom</label><input required name="firstName" value={newAccount.firstName} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-gray-900" /></div>
                                    <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Nom</label><input required name="lastName" value={newAccount.lastName} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-gray-900" /></div>
                                </div>
                                <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Email</label><input required type="email" name="email" value={newAccount.email} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-medium text-gray-900" /></div>
                                <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Mot de passe</label><input required name="password" value={newAccount.password} onChange={handleCreateAccountChange} className="w-full bg-gray-50 border-none rounded-xl p-3 font-bold text-gray-900" placeholder="Laissez vide pour Europcapital2026" /></div>
                                <button type="submit" disabled={createLoading} className="w-full bg-emerald-600 text-white py-4 rounded-xl font-black text-lg hover:bg-emerald-700 flex items-center justify-center gap-2">
                                    {createLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />} Créer et notifier le client
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
          </div>
        )}

        {selectedLoan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col">
              <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 p-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-4"><div className="bg-emerald-50 p-3 rounded-xl"><FileText className="w-6 h-6 text-emerald-600" /></div><h2 className="text-xl font-black">Dossier de {selectedLoan.firstName} {selectedLoan.lastName}</h2></div>
                <button onClick={() => setSelectedLoan(null)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6 text-gray-500" /></button>
              </div>

              <div className="p-6 space-y-8">
                {selectedLoan.status === 'approved' && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        <section className="bg-gray-900 rounded-2xl p-6 text-white space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400">Gestion du Solde</h3>
                            <div className="flex justify-between items-end"><p className="text-xs text-gray-400">Solde Actuel</p><p className="text-3xl font-black">{selectedLoan.balance || 0} €</p></div>
                            <div className="space-y-3">
                                <input type="number" placeholder="Montant..." className="bg-gray-800 border-none rounded-lg px-4 py-3 text-white w-full font-bold" value={amountOperation} onChange={(e) => setAmountOperation(e.target.value)} />
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => handleBalanceOperation('credit')} disabled={operationLoading} className="bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Créditer</button>
                                    <button onClick={() => handleBalanceOperation('debit')} disabled={operationLoading} className="bg-white/10 hover:bg-white/20 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2"><Minus className="w-4 h-4" /> Débiter</button>
                                </div>
                            </div>
                        </section>
                        <section className="bg-orange-50 rounded-2xl p-6 border border-orange-100 space-y-4">
                             <h3 className="text-xs font-black text-orange-900 uppercase tracking-widest">Config Délais & Sécurité</h3>
                             <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input type="number" className="w-16 rounded-lg border-none p-2 text-center font-bold bg-white" value={configDelay} onChange={e => setConfigDelay(e.target.value)} />
                                    <select className="flex-1 rounded-lg border-none p-2 font-bold bg-white" value={configUnit} onChange={e => setConfigUnit(e.target.value as any)}>
                                        <option value="minutes">Minutes</option>
                                        <option value="hours">Heures</option>
                                        <option value="days">Jours</option>
                                    </select>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm flex items-center justify-between">
                                    <label className="text-xs font-bold text-red-600 uppercase">Bloquer les retraits</label>
                                    <input type="checkbox" checked={configBlocked} onChange={e => setConfigBlocked(e.target.checked)} className="w-6 h-6 accent-red-600" />
                                </div>
                                <button onClick={handleSaveConfig} disabled={configLoading} className="w-full bg-orange-600 text-white py-3 rounded-lg font-black text-sm hover:bg-orange-700 flex items-center justify-center gap-2">
                                    {configLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Enregistrer la config
                                </button>
                             </div>
                        </section>
                    </div>
                )}
                <section className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-100">
                    <h3 className="text-lg font-black flex items-center gap-2 uppercase text-xs tracking-widest text-gray-500"><ClipboardList className="w-4 h-4" /> Données de demande</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-white p-4 rounded-xl"><strong>Prénom :</strong> {selectedLoan.firstName}</div>
                        <div className="bg-white p-4 rounded-xl"><strong>Nom :</strong> {selectedLoan.lastName}</div>
                        <div className="bg-white p-4 rounded-xl"><strong>Email :</strong> {selectedLoan.email}</div>
                        <div className="bg-white p-4 rounded-xl"><strong>Revenu :</strong> {selectedLoan.income} €</div>
                        <div className="bg-white p-4 rounded-xl col-span-2"><strong>Motif :</strong> {selectedLoan.reason}</div>
                    </div>
                </section>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end gap-3">
                    <button onClick={() => setSelectedLoan(null)} className="px-6 py-3 rounded-xl font-bold bg-white border border-gray-200 text-gray-500 hover:bg-gray-100">Retour</button>
                    {selectedLoan.status === 'pending' && (
                    <>
                        <button onClick={() => handleUpdateStatus(selectedLoan._id, 'rejected')} className="px-6 py-3 rounded-xl font-black bg-red-50 text-red-600 border border-red-100">Refuser</button>
                        <button onClick={() => handleUpdateStatus(selectedLoan._id, 'approved')} className="px-8 py-3 rounded-xl font-black text-white bg-emerald-600 hover:bg-emerald-700">Approuver</button>
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
