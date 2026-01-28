
import React, { useState, useEffect } from 'react';
import { Language, LoanApplicationData } from '../types';
import { translations } from '../translations';
import { Users, Landmark, TrendingUp, CheckCircle, XCircle, Search, Filter, Eye, MoreVertical, FileCheck, MapPin, X, Phone, Mail, User, Euro, FileText } from 'lucide-react';

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
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{t.title}</h1>
            <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest">{t.subtitle}</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
             <button className="flex-1 sm:flex-none bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2">
               <Filter className="w-4 h-4" />
               FILTRES
             </button>
             <button className="flex-1 sm:flex-none bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-emerald-200">
               EXPORTER
             </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-emerald-600" /></div>
            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.stats.total}</p><p className="text-xl sm:text-2xl font-black text-gray-900">{applications.length}</p></div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center"><TrendingUp className="w-5 h-5 text-orange-600" /></div>
            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.stats.pending}</p><p className="text-xl sm:text-2xl font-black text-gray-900">{pendingCount}</p></div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center"><CheckCircle className="w-5 h-5 text-emerald-600" /></div>
            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.stats.approved}</p><p className="text-xl sm:text-2xl font-black text-gray-900">{approvedCount}</p></div>
          </div>
          <div className="bg-teal-900 p-5 rounded-2xl text-white space-y-3">
            <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center"><Landmark className="w-5 h-5 text-white" /></div>
            <div><p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">Volume</p><p className="text-xl sm:text-2xl font-black">{totalVolume.toLocaleString()} €</p></div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" value={filter} onChange={(e) => setFilter(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-white border border-gray-100 pl-12 pr-6 py-4 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.table.client}</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.table.amount}</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.table.country}</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.table.status}</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-black">
                          {app.firstName[0]}{app.lastName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">{app.firstName} {app.lastName}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-sm text-gray-900">{Number(app.amount).toLocaleString()} €</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-600">{app.country}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                        app.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                      }`}>{app.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setSelectedApp(app)} className="p-2 hover:bg-white rounded-lg"><Eye className="w-5 h-5 text-gray-400" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de détail mobile-friendly */}
        {selectedApp && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setSelectedApp(null)}></div>
            <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col animate-in slide-in-from-bottom sm:zoom-in duration-300">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-black text-gray-900">{selectedApp.firstName} {selectedApp.lastName}</h2>
                <button onClick={() => setSelectedApp(null)} className="p-2"><X className="w-6 h-6 text-gray-400" /></button>
              </div>
              <div className="p-6 overflow-y-auto space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                       <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Montant</p>
                       <p className="font-black text-emerald-600 text-lg">{selectedApp.amount.toLocaleString()} €</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                       <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Durée</p>
                       <p className="font-black text-emerald-600 text-lg">{selectedApp.duration} mois</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm"><Mail className="w-5 h-5 text-gray-400" /> <span className="font-bold">{selectedApp.email}</span></div>
                    <div className="flex items-center gap-4 text-sm"><Phone className="w-5 h-5 text-gray-400" /> <span className="font-bold">{selectedApp.whatsapp}</span></div>
                    <div className="flex items-center gap-4 text-sm"><FileText className="w-5 h-5 text-gray-400" /> <span className="font-bold italic">"{selectedApp.reason || 'Aucun motif'}"</span></div>
                 </div>
              </div>
              <div className="p-6 bg-gray-50 flex gap-3">
                 <button onClick={() => updateStatus(selectedApp.id, 'rejected')} className="flex-1 py-4 bg-white text-red-600 rounded-xl font-bold border border-red-100">Refuser</button>
                 <button onClick={() => updateStatus(selectedApp.id, 'approved')} className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg">Approuver</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
