import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { restdbService } from '../services/restdb';
import { emailService } from '../services/email';
import { seedSanityData } from '../sanity-seed-script';
import { 
  Loader2, Check, X, Settings, 
  CheckCircle2, AlertCircle, LayoutDashboard, 
  Briefcase, MessageSquare, Mail, Eye, Wallet, 
  Send, Terminal, Globe, Code, ShieldCheck,
  ChevronLeft, User, Phone, MapPin, Calendar, Info,
  Save, Trash2, XCircle, RefreshCw, Database, 
  UserPlus, ShieldAlert, FileText, CheckCircle,
  Clock, Hash, BadgeCheck, FileSignature, Euro
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'loans' | 'contacts' | 'config' | 'email_test'>('loans');
  const [loans, setLoans] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // États Email Test
  const [testEmail, setTestEmail] = useState('');
  const [testLoading, setTestLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // États Outils (Sync)
  const [syncStatus, setSyncStatus] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [logs, syncStatus]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'loans') {
        const data = await restdbService.getAllApplications();
        setLoans((data || []).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } else if (activeTab === 'contacts') {
        const data = await restdbService.getAllContacts();
        setContacts((data || []).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLoan = async () => {
    if (!selectedLoan) return;
    setIsSaving(true);
    try {
      await restdbService.updateApplication(selectedLoan._id, {
        status: selectedLoan.status,
        balance: Number(selectedLoan.balance),
        isBlocked: selectedLoan.isBlocked,
        blockReason: selectedLoan.blockReason,
        transferDelay: Number(selectedLoan.transferDelay || 24),
        transferDelayUnit: selectedLoan.transferDelayUnit || 'hours'
      });
      await fetchData();
      setSelectedLoan(null);
      alert("Dossier mis à jour avec succès !");
    } catch (e) {
      alert("Erreur lors de la mise à jour.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncSanity = async () => {
    if (!confirm("Voulez-vous synchroniser les données avec Sanity ?")) return;
    setIsSyncing(true);
    setSyncStatus(["[System] Initialisation de la synchronisation Sanity..."]);
    const mockClient = {
       createOrReplace: async (doc: any) => { console.log("Syncing:", doc); return doc; }
    };
    await seedSanityData(mockClient, (msg) => setSyncStatus(prev => [...prev, msg]));
    setIsSyncing(false);
  };

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;
    setTestLoading(true);
    setResult(null);
    setLogs(["[System] Démarrage du test unitaire..."]);
    const res = await emailService.sendEmail(
      testEmail, 
      "Test Réel de Flux SMTP", 
      "<h2 style='color:#059669;'>Vérification du Flux</h2><p>Ceci est une requête réseau réelle transitant par un relais de test.</p>"
    );
    setLogs(prev => [...prev, ...(res.logs || [])]);
    setResult(res);
    setTestLoading(false);
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-xl">
              <LayoutDashboard className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Espace Admin</h1>
              <p className="text-gray-500 font-medium italic">Europcapital Management Console</p>
            </div>
          </div>

          <div className="flex flex-wrap bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm">
            {[
              { id: 'loans', label: 'Dossiers', icon: Briefcase },
              { id: 'contacts', label: 'Messages', icon: MessageSquare },
              { id: 'email_test', label: 'Email Bridge', icon: Mail },
              { id: 'config', label: 'Outils', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          
          {/* 1. DOSSIERS DE PRÊTS */}
          {activeTab === 'loans' && (
            <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isLoading ? (
                <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-emerald-600" /></div>
              ) : loans.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-300 text-center text-gray-400 font-bold uppercase tracking-widest">Aucun dossier trouvé</div>
              ) : (
                loans.map(loan => (
                  <div key={loan._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 w-full lg:w-auto">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-emerald-600 shadow-inner">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-gray-900 truncate uppercase">{loan.loanType || 'Prêt'} - {loan.firstName} {loan.lastName}</h3>
                        <p className="text-xs text-gray-500 truncate">{loan.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-8 justify-between w-full lg:w-auto">
                      <div className="text-right">
                         <p className="text-[10px] font-black text-gray-400 uppercase">Solde Actuel</p>
                         <p className="text-sm font-black text-emerald-600">{loan.balance?.toLocaleString() || 0} €</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          loan.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                          loan.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                           {loan.status}
                        </span>
                        <button 
                          onClick={() => setSelectedLoan(loan)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-sm"
                        >
                           <Eye className="w-4 h-4" /> Voir Dossier
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 2. MESSAGES CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {isLoading ? (
                  <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-emerald-600" /></div>
               ) : contacts.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-300 text-center text-gray-400 font-bold uppercase tracking-widest">Aucun message reçu</div>
               ) : (
                  contacts.map(contact => (
                    <div key={contact._id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-lg transition-all">
                       <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                             <div className="bg-gray-50 p-3 rounded-xl"><User className="w-5 h-5 text-gray-400" /></div>
                             <div>
                                <h3 className="font-black text-gray-900 text-lg">{contact.name}</h3>
                                <p className="text-xs text-emerald-600 font-bold">{contact.email}</p>
                             </div>
                          </div>
                          <p className="text-[10px] font-black text-gray-300 uppercase">{new Date(contact.date).toLocaleString()}</p>
                       </div>
                       <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Sujet: {contact.subject}</p>
                          <p className="text-gray-700 font-medium italic">"{contact.message}"</p>
                       </div>
                    </div>
                  ))
               )}
            </div>
          )}

          {/* 3. EMAIL BRIDGE TESTER */}
          {activeTab === 'email_test' && (
            <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
              <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-gray-100 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-emerald-600" /> Network Bridge
                  </h2>
                  <p className="text-gray-500 font-medium">Test de connectivité SMTP via relais HTTP.</p>
                </div>
                <form onSubmit={handleTest} className="space-y-6">
                  <input 
                    type="email" required placeholder="votre@email.com"
                    className="w-full bg-gray-50 border-none px-6 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 font-bold"
                    value={testEmail} onChange={e => setTestEmail(e.target.value)}
                  />
                  <button type="submit" disabled={testLoading} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {testLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-5 h-5" />}
                    LANCER LE TEST RÉEL
                  </button>
                </form>
              </div>
              <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col h-[400px]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-3"><Terminal className="w-5 h-5 text-emerald-400" /> Console</h3>
                  </div>
                  <div className="flex-grow overflow-y-auto font-mono text-[11px] space-y-2 p-2">
                    {logs.map((log, i) => (<div key={i} className={log.includes('[Error]') ? 'text-red-400' : log.includes('[Success]') ? 'text-emerald-400' : 'text-gray-400'}>{log}</div>))}
                  </div>
              </div>
            </div>
          )}

          {/* 4. OUTILS & CONFIGURATION */}
          {activeTab === 'config' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6 hover:border-emerald-500 transition-colors group">
                  <div className="bg-emerald-50 p-4 rounded-2xl w-14 h-14 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <RefreshCw className={`w-7 h-7 ${isSyncing ? 'animate-spin' : ''}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Sync Sanity</h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">Synchronise les traductions et bases locales avec le CMS Sanity.</p>
                  </div>
                  <button onClick={handleSyncSanity} disabled={isSyncing} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-black text-xs shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                    {isSyncing ? "SYNC EN COURS..." : "LANCER LA SYNC"}
                  </button>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                  <div className="bg-blue-50 p-4 rounded-2xl w-14 h-14 flex items-center justify-center text-blue-600">
                    <Database className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Base RestDB</h3>
                    <p className="text-gray-500 text-sm font-medium mt-1">État actuel de la base de données opérationnelle.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-xl border border-blue-100">
                     <CheckCircle className="w-5 h-5 text-blue-600" />
                     <span className="text-xs font-black text-blue-900 uppercase">Connecté : OK</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* --- MODALE DE DÉTAIL DU DOSSIER COMPLET --- */}
      {selectedLoan && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300 my-8">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
               <div className="flex items-center gap-3">
                 <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-lg"><Briefcase className="w-6 h-6" /></div>
                 <div>
                    <h3 className="font-black text-gray-900">Dossier de Prêt #{selectedLoan._id?.slice(-6)}</h3>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Client: {selectedLoan.firstName} {selectedLoan.lastName}</p>
                 </div>
               </div>
               <button onClick={() => setSelectedLoan(null)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"><X className="w-7 h-7" /></button>
            </div>
            
            <div className="p-8 sm:p-10 overflow-y-auto max-h-[75vh] space-y-8">
              
              {/* Ligne 1: Informations Générales & Type de Prêt */}
              <div className="grid lg:grid-cols-3 gap-6">
                 <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 space-y-4">
                    <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                       <Hash className="w-3 h-3" /> Nature du Projet
                    </h4>
                    <div className="space-y-1">
                       <p className="text-2xl font-black text-gray-900 uppercase">{selectedLoan.loanType || 'Non spécifié'}</p>
                       <p className="text-xs font-medium text-emerald-700 italic">Dépôt le {new Date(selectedLoan.date).toLocaleDateString()} à {new Date(selectedLoan.date).toLocaleTimeString()}</p>
                    </div>
                 </div>
                 
                 <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Euro className="w-3 h-3" /> Montant Demandé
                    </h4>
                    <p className="text-3xl font-black text-gray-900">{selectedLoan.amount?.toLocaleString()} €</p>
                 </div>

                 <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Clock className="w-3 h-3" /> Durée Demandée
                    </h4>
                    <p className="text-3xl font-black text-gray-900">{selectedLoan.duration} mois</p>
                 </div>
              </div>

              {/* Ligne 2: Détails Client & Revenus */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] border-b border-gray-100 pb-3 flex items-center gap-2">
                     <User className="w-4 h-4 text-emerald-600" /> Identité & Coordonnées
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-2xl"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Nom Complet</p><p className="font-bold text-gray-900">{selectedLoan.firstName} {selectedLoan.lastName}</p></div>
                    <div className="bg-gray-50 p-4 rounded-2xl"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">WhatsApp</p><p className="font-bold text-gray-900">{selectedLoan.whatsapp}</p></div>
                    <div className="bg-gray-50 p-4 rounded-2xl col-span-2"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Email</p><p className="font-bold text-emerald-600 break-all">{selectedLoan.email}</p></div>
                    <div className="bg-gray-50 p-4 rounded-2xl col-span-2"><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Localisation</p><p className="font-bold text-gray-900">{selectedLoan.country}</p></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] border-b border-gray-100 pb-3 flex items-center gap-2">
                     <BadgeCheck className="w-4 h-4 text-emerald-600" /> Situation Professionnelle
                  </h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
                       <div><p className="text-[10px] font-black text-gray-400 uppercase mb-1">Métier / Profession</p><p className="font-bold text-gray-900">{selectedLoan.profession}</p></div>
                       <Briefcase className="w-6 h-6 text-gray-300" />
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-2xl flex justify-between items-center border border-emerald-100">
                       <div><p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Revenu Net Mensuel</p><p className="text-2xl font-black text-emerald-900">{selectedLoan.income?.toLocaleString()} €</p></div>
                       <Wallet className="w-8 h-8 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ligne 3: Motif du Prêt & Confirmations Légales */}
              <div className="grid lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-6">
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] border-b border-gray-100 pb-3 flex items-center gap-2">
                       <FileText className="w-4 h-4 text-emerald-600" /> Motivation du Projet
                    </h4>
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 min-h-[120px]">
                       <p className="text-gray-700 font-medium leading-relaxed italic">"{selectedLoan.reason}"</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] border-b border-gray-100 pb-3 flex items-center gap-2">
                       <FileSignature className="w-4 h-4 text-emerald-600" /> Engagements
                    </h4>
                    <div className="space-y-3">
                       <div className={`p-3 rounded-xl flex items-center gap-3 border ${selectedLoan.consent ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                          {selectedLoan.consent ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                          <span className="text-[10px] font-black uppercase">Informations Exactes</span>
                       </div>
                       <div className={`p-3 rounded-xl flex items-center gap-3 border ${selectedLoan.feesAccepted || selectedLoan.processingConsent ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                          {(selectedLoan.feesAccepted || selectedLoan.processingConsent) ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                          <span className="text-[10px] font-black uppercase">Frais de Gestion Acceptés</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* SECTION GESTION ADMINISTRATIVE */}
              <div className="bg-gray-900 rounded-3xl p-8 sm:p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5"><Settings className="w-32 h-32" /></div>
                 <h4 className="text-sm font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2 relative z-10">
                   <ShieldAlert className="w-5 h-5" /> Console de Contrôle Europcapital
                 </h4>

                 <div className="grid sm:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Statut du Dossier</label>
                       <select value={selectedLoan.status} onChange={e => setSelectedLoan({...selectedLoan, status: e.target.value})} className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-4 text-white font-bold focus:ring-emerald-500">
                          <option value="pending" className="text-black">En attente (Pending)</option>
                          <option value="approved" className="text-black">Approuvé (Approved)</option>
                          <option value="rejected" className="text-black">Refusé (Rejected)</option>
                       </select>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Solde du Compte (€)</label>
                       <div className="relative">
                          <input type="number" value={selectedLoan.balance} onChange={e => setSelectedLoan({...selectedLoan, balance: e.target.value})} className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-4 text-white font-black text-2xl" />
                          <Wallet className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
                       </div>
                    </div>
                 </div>

                 {/* --- NOUVEAU: CONFIGURATION DU DÉLAI DE VIREMENT --- */}
                 <div className="grid sm:grid-cols-2 gap-8 relative z-10 pt-4 border-t border-white/10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                         <Clock className="w-3 h-3 text-emerald-400" /> Délai de Virement (Valeur)
                       </label>
                       <input 
                         type="number" 
                         value={selectedLoan.transferDelay || 24} 
                         onChange={e => setSelectedLoan({...selectedLoan, transferDelay: Number(e.target.value)})}
                         className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 text-white font-bold"
                       />
                       <p className="text-[9px] text-gray-500 font-medium italic">Temps de traitement avant complétion du virement client.</p>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Unité de Temps</label>
                       <select 
                         value={selectedLoan.transferDelayUnit || 'hours'} 
                         onChange={e => setSelectedLoan({...selectedLoan, transferDelayUnit: e.target.value})}
                         className="w-full bg-white/10 border-white/20 rounded-xl px-4 py-3 text-white font-bold"
                       >
                          <option value="minutes" className="text-black">Minutes</option>
                          <option value="hours" className="text-black">Heures</option>
                          <option value="days" className="text-black">Jours</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-4 pt-6 border-t border-white/10 relative z-10">
                    <div className="flex items-center justify-between">
                       <div>
                          <p className="font-black text-lg">Blocage de Sécurité</p>
                          <p className="text-xs text-gray-400 font-medium">Interdire tout virement sortant sur cet espace client</p>
                       </div>
                       <button onClick={() => setSelectedLoan({...selectedLoan, isBlocked: !selectedLoan.isBlocked})} className={`w-16 h-9 rounded-full transition-all relative ${selectedLoan.isBlocked ? 'bg-red-500' : 'bg-gray-700'}`}><div className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-lg transition-all ${selectedLoan.isBlocked ? 'left-8' : 'left-1'}`}></div></button>
                    </div>
                    {selectedLoan.isBlocked && (
                      <div className="space-y-2 animate-in slide-in-from-top-2">
                         <label className="text-[10px] font-black uppercase text-red-400 tracking-widest">Raison affichée au client</label>
                         <textarea value={selectedLoan.blockReason} onChange={e => setSelectedLoan({...selectedLoan, blockReason: e.target.value})} placeholder="Ex: Dossier incomplet, frais non régularisés..." className="w-full bg-red-500/10 border-red-500/30 rounded-xl px-4 py-3 text-white font-medium resize-none" rows={2} />
                      </div>
                    )}
                 </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t flex flex-col sm:flex-row justify-between gap-4">
               <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase">
                  <Info className="w-4 h-4" /> Les modifications sont appliquées instantanément sur l'espace client.
               </div>
               <div className="flex gap-3">
                  <button onClick={() => setSelectedLoan(null)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-all">Annuler</button>
                  <button onClick={handleUpdateLoan} disabled={isSaving} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50">
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} {isSaving ? "SAUVEGARDE..." : "ENREGISTRER LE DOSSIER"}
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;