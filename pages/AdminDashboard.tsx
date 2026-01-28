
import React, { useState, useEffect } from 'react';
import { Language, LoanApplicationData } from '../types';
import { translations } from '../translations';
import { Users, Landmark, TrendingUp, CheckCircle, XCircle, Search, Filter, Eye, MoreVertical, FileCheck, MapPin, X, Phone, Mail, User, Briefcase, Euro, Calendar, FileText } from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ language }) => {
  const t = translations[language].admin;
  const formT = translations[language].form;
  const [applications, setApplications] = useState<LoanApplicationData[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedApp, setSelectedApp] = useState<LoanApplicationData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('loan_applications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const totalVolume = applications.reduce((sum, app) => sum + Number(app.amount), 0);
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;

  const filteredApps = applications.filter(app => 
    `${app.firstName} ${app.lastName}`.toLowerCase().includes(filter.toLowerCase()) ||
    app.email.toLowerCase().includes(filter.toLowerCase())
  );

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    setApplications(updated);
    localStorage.setItem('loan_applications', JSON.stringify(updated));
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.title}</h1>
            <p className="text-gray-500 font-medium">{t.subtitle}</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
               <Filter className="w-4 h-4" />
               Filtres
             </button>
             <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200">
               Exporter CSV
             </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.stats.total}</p>
              <p className="text-3xl font-black text-gray-900">{applications.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.stats.pending}</p>
              <p className="text-3xl font-black text-gray-900">{pendingCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.stats.approved}</p>
              <p className="text-3xl font-black text-gray-900">{approvedCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="bg-blue-900 w-12 h-12 rounded-2xl flex items-center justify-center text-white">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.stats.totalVolume}</p>
              <p className="text-3xl font-black text-gray-900">{totalVolume.toLocaleString()} €</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" value={filter} onChange={(e) => setFilter(e.target.value)}
            placeholder="Rechercher un client ou un email..."
            className="w-full bg-white border border-gray-100 pl-14 pr-6 py-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          />
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">{t.table.client}</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">{t.table.amount}</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">{t.table.income}</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">{t.table.country}</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">{t.table.status}</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">{t.table.fees}</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">{t.table.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {app.firstName[0]}{app.lastName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{app.firstName} {app.lastName}</p>
                          <p className="text-xs text-gray-400 font-medium">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-gray-900">{Number(app.amount).toLocaleString()} €</p>
                      <p className="text-xs text-gray-400 font-bold uppercase">{app.duration} mois</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-emerald-600">{Number(app.income).toLocaleString()} €</p>
                      <p className="text-xs text-gray-400 font-medium">{app.profession}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-700">{app.country}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                        app.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {app.status === 'pending' ? t.status.pending : 
                         app.status === 'approved' ? t.status.approved : t.status.rejected}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                       {app.feesAccepted ? (
                         <div className="flex items-center gap-2 text-emerald-600">
                           <FileCheck className="w-5 h-5" />
                           <span className="text-xs font-black uppercase">OUI</span>
                         </div>
                       ) : (
                         <div className="flex items-center gap-2 text-red-500">
                           <XCircle className="w-5 h-5" />
                           <span className="text-xs font-black uppercase">NON</span>
                         </div>
                       )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="p-2 hover:bg-white rounded-lg transition-all shadow-sm group/btn"
                        >
                          <Eye className="w-5 h-5 text-gray-400 group-hover/btn:text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-all shadow-sm">
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredApps.length === 0 && (
            <div className="p-20 text-center space-y-4">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">Aucune demande trouvée</p>
            </div>
          )}
        </div>

        {/* Modal Détails Demande */}
        {selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedApp(null)}></div>
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-300 flex flex-col">
              
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 p-3 rounded-2xl text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{selectedApp.firstName} {selectedApp.lastName}</h2>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Détails de la demande #{selectedApp.id}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-grow overflow-y-auto p-8 space-y-12">
                
                {/* Section 1: Information Personnelle & Contact */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Informations Client</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600"><Mail className="w-5 h-5" /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">{formT.fields.email}</p>
                          <p className="font-bold text-gray-900">{selectedApp.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-green-600"><Phone className="w-5 h-5" /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">{formT.fields.whatsapp}</p>
                          <p className="font-bold text-gray-900">{selectedApp.whatsapp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-orange-600"><MapPin className="w-5 h-5" /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">{formT.fields.country}</p>
                          <p className="font-bold text-gray-900">{selectedApp.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Situation Professionnelle</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-purple-600"><Briefcase className="w-5 h-5" /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">{formT.fields.profession}</p>
                          <p className="font-bold text-gray-900">{selectedApp.profession}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-emerald-600"><Euro className="w-5 h-5" /></div>
                        <div>
                          <p className="text-xs font-bold text-emerald-600/50 uppercase">{formT.fields.income}</p>
                          <p className="font-black text-emerald-700 text-xl">{Number(selectedApp.income).toLocaleString()} € / mois</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Détails du Financement */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Détails du Prêt</h3>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100">
                      <Euro className="w-8 h-8 mb-4 opacity-50" />
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">{formT.fields.amount}</p>
                      <p className="text-3xl font-black">{Number(selectedApp.amount).toLocaleString()} €</p>
                    </div>
                    <div className="p-6 bg-gray-900 rounded-3xl text-white">
                      <Calendar className="w-8 h-8 mb-4 opacity-50 text-blue-400" />
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">{formT.fields.duration}</p>
                      <p className="text-3xl font-black">{selectedApp.duration} mois</p>
                    </div>
                    <div className={`p-6 rounded-3xl border flex flex-col justify-center items-center text-center ${selectedApp.feesAccepted ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                      {selectedApp.feesAccepted ? <FileCheck className="w-8 h-8 text-emerald-600 mb-2" /> : <XCircle className="w-8 h-8 text-red-600 mb-2" />}
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Frais de dossier</p>
                      <p className={`text-xl font-black ${selectedApp.feesAccepted ? 'text-emerald-700' : 'text-red-700'}`}>
                        {selectedApp.feesAccepted ? 'ACCEPTÉS' : 'REFUSÉS'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Motivations */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b pb-2">Projet & Motivations</h3>
                  <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 italic text-gray-700 font-medium leading-relaxed">
                    <div className="flex gap-4">
                      <FileText className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                      <p>"{selectedApp.reason}"</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer (Actions) */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                   <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Statut Actuel:</span>
                   <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                      selectedApp.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                      selectedApp.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {selectedApp.status === 'pending' ? t.status.pending : 
                       selectedApp.status === 'approved' ? t.status.approved : t.status.rejected}
                   </span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => updateStatus(selectedApp.id, 'rejected')}
                    className="flex-1 sm:flex-none px-8 py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors"
                  >
                    Refuser
                  </button>
                  <button 
                    onClick={() => updateStatus(selectedApp.id, 'approved')}
                    className="flex-1 sm:flex-none px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-colors"
                  >
                    Approuver
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
