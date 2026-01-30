
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { restdbService } from '../services/restdb';
import { 
  Users, Landmark, CheckCircle, Search, 
  RefreshCw, Loader2, XCircle, Check, Clock
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const data = await restdbService.getAllApplications();
      // Trier par date décroissante (plus récents en premier)
      const sorted = data.sort((a: any, b: any) => {
        return new Date(b.date || b._created).getTime() - new Date(a.date || a._created).getTime();
      });
      setApplications(sorted);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'rejected') => {
    setUpdatingId(id);
    try {
      await restdbService.updateApplicationStatus(id, newStatus);
      await fetchApps(); // Recharger la liste pour voir le changement
    } catch (error) {
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setUpdatingId(null);
    }
  };

  const totalVolume = applications.reduce((sum, app) => sum + Number(app.amount || 0), 0);
  const pendingCount = applications.filter(a => a.status === 'pending').length;
  const approvedCount = applications.filter(a => a.status === 'approved').length;

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Console Europfy</h1>
            <p className="text-gray-500 font-medium italic flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Connecté à RestDB (lomo0-3d70)
            </p>
          </div>
          <button 
            onClick={fetchApps}
            className="flex items-center gap-2 bg-white text-emerald-600 border border-emerald-100 px-6 py-3 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
            <Users className="w-8 h-8 text-emerald-600 mb-5" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dossiers</p>
            <p className="text-3xl font-black text-gray-900">{applications.length}</p>
          </div>
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
            <Clock className="w-8 h-8 text-orange-500 mb-5" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">En Étude</p>
            <p className="text-3xl font-black text-gray-900">{pendingCount}</p>
          </div>
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
            <CheckCircle className="w-8 h-8 text-emerald-600 mb-5" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Acceptés</p>
            <p className="text-3xl font-black text-gray-900">{approvedCount}</p>
          </div>
          <div className="bg-teal-900 p-7 rounded-3xl text-white shadow-xl">
            <Landmark className="w-8 h-8 text-emerald-400 mb-5" />
            <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest">Encours Total</p>
            <p className="text-3xl font-black">{(totalVolume).toLocaleString()} €</p>
          </div>
        </div>

        {/* Liste des demandes */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-emerald-600 gap-4">
              <Loader2 className="w-12 h-12 animate-spin" />
              <p className="font-bold">Chargement des données...</p>
            </div>
          ) : (
            <>
              <div className="p-8 border-b border-gray-50 relative">
                <Search className="absolute left-12 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" value={filter} onChange={(e) => setFilter(e.target.value)}
                  placeholder="Rechercher un client..."
                  className="w-full bg-gray-50 border-none pl-14 pr-8 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-8 py-5">Client</th>
                      <th className="px-8 py-5">Montant</th>
                      <th className="px-8 py-5">Contact</th>
                      <th className="px-8 py-5">Statut</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {applications.filter(a => `${a.firstName} ${a.lastName}`.toLowerCase().includes(filter.toLowerCase())).map((app) => (
                      <tr key={app._id} className="hover:bg-emerald-50/30 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-900">{app.firstName} {app.lastName}</span>
                            <span className="text-[10px] text-gray-400">{new Date(app.date || app._created).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                           <p className="font-black text-emerald-600">{(app.amount || 0).toLocaleString()} €</p>
                           <p className="text-[10px] text-gray-400">{app.duration} mois</p>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-col gap-0.5">
                             <span className="text-xs font-bold text-gray-700">{app.email}</span>
                             <span className="text-[10px] text-emerald-600 font-bold">{app.whatsapp}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            app.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                            app.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {app.status === 'pending' ? 'EN ATTENTE' : app.status === 'approved' ? 'APPROUVÉ' : 'REJETÉ'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            {app.status === 'pending' && (
                              <>
                                <button 
                                  disabled={updatingId === app._id}
                                  onClick={() => handleUpdateStatus(app._id, 'approved')}
                                  title="Approuver"
                                  className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all disabled:opacity-50"
                                >
                                  {updatingId === app._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                </button>
                                <button 
                                  disabled={updatingId === app._id}
                                  onClick={() => handleUpdateStatus(app._id, 'rejected')}
                                  title="Rejeter"
                                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
                                >
                                  {updatingId === app._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && !loading && (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium">
                          Aucune demande trouvée dans la base de données.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
