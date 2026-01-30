
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { restdbService } from '../services/restdb';
import { 
  Users, Landmark, Search, RefreshCw, Loader2, XCircle, Check, 
  Clock, Database, AlertTriangle, Settings, Wrench, Sparkles, 
  ChevronDown, ChevronUp, Copy, ExternalLink, ListChecks, CheckCircle2, Terminal, MousePointer2, Monitor, PlusCircle,
  AlertCircle, LayoutDashboard, Database as DatabaseIcon, ArrowRight, X, Phone, Globe, Briefcase, Wallet, MessageSquare, ShieldCheck,
  Mail, MessageCircle, UploadCloud
} from 'lucide-react';

interface AdminDashboardProps {
  language: Language;
}

// Données de traduction Espagnol (Hardcodées pour l'initialisation)
const SPANISH_DATA = {
  nav: {
    home: "Inicio",
    loans: "Préstamos",
    simulator: "Simulador",
    about: "Nosotros",
    contact: "Contacto",
    cta: "Solicitud en línea",
    login: "Conexión",
    my_space: "Mi Espacio"
  },
  hero: {
    badge: "Tasa Fija 2%",
    h1: "El crédito que te respeta.",
    h1_variants: ["Financiación al 2% fijo.", "Respuesta en 24h.", "Socio de confianza."],
    p: "Préstamo al 2% fijo. Simple, rápido y sin comisiones ocultas. Financie sus proyectos inmobiliarios, personales, de automóvil o profesionales con total tranquilidad.",
    cta1: "Mi simulación",
    cta2: "Saber más"
  },
  calculator: {
    title: "Simulador Exprés",
    subtitle: "Calcula tu presupuesto al instante.",
    amount: "Monto deseado",
    duration: "Duración",
    months: "meses",
    monthly: "Mensualidad",
    total: "Costo total",
    cta: "Iniciar mi solicitud"
  },
  stats: {
    badge: "Fiabilidad",
    title: "Confianza y resultados.",
    p: "Únase a miles de europeos que confían en nosotros para sus proyectos financieros.",
    clients: "Clientes",
    exp: "Experiencia",
    rating: "Nota",
    safety: "Seguridad"
  },
  loans_section: {
    h2: "Nuestras Soluciones",
    p: "Descubra nuestras ofertas con una tasa fija única del 2%."
  },
  feature_highlight: {
    badge: "Transparencia total",
    title: "Claridad para tus ambiciones",
    p: "Hemos eliminado las comisiones ocultas y las condiciones complejas.",
    items: [
      { title: "Cero sorpresas", desc: "La tasa del 2% está garantizada por contrato.", icon: "ShieldCheck" },
      { title: "Flexibilidad real", desc: "Modifica tus mensualidades sin costo.", icon: "RefreshCcw" },
      { title: "Análisis experto", desc: "Un asesor dedicado te acompaña.", icon: "UserCheck" }
    ]
  },
  about_us_section: {
    badge: "¿Quiénes somos?",
    title: "El Espíritu Europfy",
    p: "Transformamos el préstamo bancario en un servicio simple y humano.",
    items: [
      { title: "Nuestra Misión", desc: "Democratizar el acceso al crédito al 2%.", icon: "Target" },
      { title: "Nuestra Historia", desc: "Fundada en Lyon en 2018, líder del crédito ético.", icon: "History" },
      { title: "Garantías", desc: "Seguridad bancaria y transparencia total.", icon: "ShieldCheck" }
    ]
  },
  identity: {
    title: "Nuestro ADN",
    subtitle: "Más que un banco, un socio.",
    p: "Invertimos en tus sueños simplificando radicalmente el acceso a la financiación.",
    pillars: [
      { title: "Proximidad Europea", desc: "Presentes en toda la Unión Europea.", icon: "Globe" },
      { title: "Acompañamiento Humano", desc: "Cada expediente es analizado por un experto.", icon: "Heart" },
      { title: "Simplicidad Radical", desc: "Tasa del 2% fija, punto final.", icon: "Shield" }
    ]
  },
  footer: {
    desc: "Su socio de crédito al 2%. Acompañamiento transparente para todos sus proyectos.",
    titles: { loans: "Préstamos", company: "Empresa", contact: "Contacto" },
    links: { about: "Nosotros", blog: "Blog", faq: "FAQ", legal: "Avisos Legales", privacy: "Privacidad", cookies: "Cookies" },
    rights: "© 2026 Europfy. Todos los derechos reservados."
  },
  cta_footer: {
    h2: "¿Listo para lanzar tu proyecto?",
    p: "Obtén una respuesta de principio en menos de 2 minutos.",
    btn1: "Depositar mi expediente",
    btn2: "Contactarnos"
  },
  comparison: {
    h3: "Ahorre en su crédito",
    p: "Europfy ofrece una de las tasas más bajas de Europa.",
    market: "Tasa media bancaria",
    ours: "Tasa Europfy",
    saving: "Ahorro medio constatado"
  },
  partners: {
    h2: "Socios de Confianza",
    p: "Trabajamos con instituciones de renombre mundial."
  },
  security: {
    rgpd: "Conformidad RGPD",
    h24: "Vigilancia 24/7",
    orias: "Regulación Europea"
  },
  testimonials: {
    h2: "Opiniones de Clientes",
    p: "La satisfacción de nuestros prestatarios es nuestra prioridad."
  },
  form: {
    title: "Solicitud en Línea",
    subtitle: "Procedimiento rápido, simple y 100% seguro.",
    trust_title: "Confidencialidad",
    trust_text: "Sus datos están protegidos por encriptación bancaria.",
    processing_fees: {
      title: "Gastos de gestión",
      text: "Se aplican gastos de análisis técnico para el tratamiento de su expediente.",
      detail: "Estos gastos solo se deben en caso de aceptación."
    },
    fields: {
      firstName: "Nombre",
      lastName: "Apellidos",
      amount: "Monto (€)",
      duration: "Duración (meses)",
      email: "Email",
      whatsapp: "WhatsApp",
      country: "País de residencia",
      profession: "Profesión",
      income: "Ingreso neto mensual",
      reason: "Motivo del préstamo",
      processing_consent: "Acepto los gastos de gestión vinculados al expediente.",
      consent1: "Certifico la exactitud de la información.",
      submit: "Enviar mi solicitud",
      select_country: "Seleccione su país...",
      success: "¡Felicidades!"
    },
    countries: {}
  },
  faq: {
    h2: "Preguntas Frecuentes",
    p: "Todas las respuestas a sus preguntas.",
    categories: { general: "General", immobilier: "Inmobiliario", automobile: "Automóvil", entreprise: "Empresa", personnel: "Personal", rachat: "Consolidación" },
    q1: "¿Cuáles son las condiciones de elegibilidad?", a1: "Ser mayor de edad, residir en Europa y justificar ingresos estables.",
    q2: "¿Qué documentos debo proporcionar?", a2: "DNI, comprobante de domicilio y últimos extractos bancarios.",
    q3: "¿Cuál es el plazo de respuesta?", a3: "Respuesta definitiva en 24 horas laborables.",
    q4: "¿La tasa del 2% es realmente fija?", a4: "Sí, garantizada por contrato durante toda la duración."
  },
  loan_specifics: {
    personnel: {
      title: "Préstamo Personal",
      description: "Concreta tus proyectos de vida libremente.",
      longDescription: "Bodas, viajes, estudios o imprevistos, disponga de los fondos rápidamente.",
      features: ["2% Fijo", "Sin justificantes", "Transferencia exprés"],
      maxAmount: 75000,
      maxDuration: 84,
      faqs: [],
      testimonials: []
    },
    immobilier: {
      title: "Préstamo Inmobiliario",
      description: "Tasa fija del 2% para tu futuro hogar.",
      longDescription: "Financia la adquisición de tu residencia principal, secundaria o inversión.",
      features: ["2% Fijo", "Seguro flexible", "Respuesta en 24h"],
      maxAmount: 1500000,
      maxDuration: 300,
      faqs: [],
      testimonials: []
    },
    automobile: {
      title: "Préstamo Automóvil",
      description: "Financia tu movilidad al mejor precio.",
      longDescription: "Para coche nuevo, de ocasión o eléctrico.",
      features: ["2% Fijo", "Sin aporte obligatorio", "Todo tipo de vehículos"],
      maxAmount: 80000,
      maxDuration: 84,
      faqs: [],
      testimonials: []
    },
    entreprise: {
      title: "Préstamo Empresa",
      description: "Apoya el crecimiento de tu actividad.",
      longDescription: "Necesidades de tesorería, inversión material o desarrollo comercial.",
      features: ["2% Fijo", "Análisis experto", "Diferimiento de pago"],
      maxAmount: 5000000,
      maxDuration: 120,
      faqs: [],
      testimonials: []
    },
    rachat: {
      title: "Consolidación de Deuda",
      description: "Simplifica tus finanzas y reduce tus cuotas.",
      longDescription: "Agrupa todos tus créditos en uno solo para pagar una única mensualidad.",
      features: ["2% Fijo", "Una sola cuota", "Gestión simplificada"],
      maxAmount: 250000,
      maxDuration: 180,
      faqs: [],
      testimonials: []
    }
  }
};

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [activeTab, setActiveTab] = useState<'loans' | 'contacts'>('loans');
  const [applications, setApplications] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appsData, contactsData] = await Promise.all([
        restdbService.getAllApplications(),
        restdbService.getAllContacts()
      ]);

      if (Array.isArray(appsData)) {
        const filteredApps = appsData.filter((a: any) => !a.isSystem);
        setApplications(filteredApps.sort((a: any, b: any) => 
          new Date(b.date || b._created).getTime() - new Date(a.date || a._created).getTime()
        ));
      }

      if (Array.isArray(contactsData)) {
        setContacts(contactsData.sort((a: any, b: any) => 
          new Date(b.date || b._created).getTime() - new Date(a.date || a._created).getTime()
        ));
      }
      
      setLastSync(new Date());
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const seedUpstashSpanish = async () => {
    setUploading(true);
    try {
      const UPSTASH_REDIS_REST_URL = "https://current-dassie-43977.upstash.io";
      const UPSTASH_REDIS_REST_TOKEN = "AavJAAIncDJlMjlhODRmOGVjNzk0NTg2YjQxNjg4ZGM0ZWEzYWE2MHAyNDM5Nzc";

      // Envoi de la donnée 'es' vers Redis
      const response = await fetch(`${UPSTASH_REDIS_REST_URL}/set/es`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
          "Content-Type": "text/plain" // Important pour Redis REST
        },
        body: JSON.stringify(SPANISH_DATA)
      });

      if (response.ok) {
        alert("Succès ! La traduction ESPAGNOL a été envoyée vers Upstash Redis.");
      } else {
        alert("Erreur lors de l'envoi vers Upstash.");
      }
    } catch (e) {
      alert("Erreur réseau : " + e);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen font-sans relative">
      
      {/* Modal Détails Dossier Prêt */}
      {selectedApp && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-300">
            <div className="bg-emerald-600 p-6 sm:p-8 text-white flex justify-between items-center shrink-0">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl"><Users className="w-6 h-6" /></div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black">{selectedApp.firstName} {selectedApp.lastName}</h2>
                    <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest">Dossier #{selectedApp._id.substring(0,8)}</p>
                  </div>
               </div>
               <button onClick={() => setSelectedApp(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                 <X className="w-6 h-6" />
               </button>
            </div>
            <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Coordonnées & Origine
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                    <div><p className="text-[10px] text-gray-400 font-black uppercase">Email</p><p className="font-bold text-gray-900">{selectedApp.email}</p></div>
                    <div><p className="text-[10px] text-gray-400 font-black uppercase">WhatsApp</p><p className="font-bold text-emerald-600">{selectedApp.whatsapp || "Non renseigné"}</p></div>
                    <div><p className="text-[10px] text-gray-400 font-black uppercase">Pays</p><p className="font-bold text-gray-900 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> {selectedApp.country}</p></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Profil Professionnel
                  </h3>
                  <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                    <div><p className="text-[10px] text-gray-400 font-black uppercase">Profession</p><p className="font-bold text-gray-900">{selectedApp.profession || "Non renseigné"}</p></div>
                    <div><p className="text-[10px] text-gray-400 font-black uppercase">Revenu</p><p className="text-xl font-black text-emerald-700">{(selectedApp.income || 0).toLocaleString()} €</p></div>
                    <div className="pt-2 border-t border-gray-200">
                      <p className={`font-black text-xs uppercase mt-1 flex items-center gap-2 ${selectedApp.feesAccepted ? 'text-emerald-600' : 'text-red-500'}`}>
                        {selectedApp.feesAccepted ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {selectedApp.feesAccepted ? "Frais Acceptés" : "Frais Non acceptés"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                 <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Demande de Crédit
                 </h3>
                 <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl text-center"><p className="text-[10px] text-emerald-600 font-black uppercase mb-1">Montant</p><p className="text-3xl font-black">{(selectedApp.amount || 0).toLocaleString()} €</p></div>
                    <div className="bg-teal-50 border border-teal-100 p-6 rounded-3xl text-center"><p className="text-[10px] text-teal-600 font-black uppercase mb-1">Durée</p><p className="text-3xl font-black">{selectedApp.duration} mois</p></div>
                    <div className="bg-gray-900 p-6 rounded-3xl text-center text-white"><p className="text-[10px] text-gray-400 font-black uppercase mb-1">Taux Fixe</p><p className="text-3xl font-black">2%</p></div>
                 </div>
              </div>
              <div className="space-y-6">
                 <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Motif du projet
                 </h3>
                 <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 italic text-gray-700 leading-relaxed font-medium">"{selectedApp.reason || "Aucun."}"</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <button onClick={() => restdbService.updateApplicationStatus(selectedApp._id, 'approved').then(() => { fetchData(); setSelectedApp(null); })} className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all">Approuver</button>
                <button onClick={() => restdbService.updateApplicationStatus(selectedApp._id, 'rejected').then(() => { fetchData(); setSelectedApp(null); })} className="flex-1 bg-white border-2 border-red-100 text-red-600 py-4 rounded-2xl font-black text-lg hover:bg-red-50 transition-all">Refuser</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails Contact */}
      {selectedContact && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in duration-300">
            <div className="bg-blue-600 p-6 sm:p-8 text-white flex justify-between items-center shrink-0">
               <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-2xl"><Mail className="w-6 h-6" /></div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black">{selectedContact.name}</h2>
                    <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Message reçu le {new Date(selectedContact.date).toLocaleDateString()}</p>
                  </div>
               </div>
               <button onClick={() => { restdbService.markContactAsRead(selectedContact._id); setSelectedContact(null); fetchData(); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all">
                 <X className="w-6 h-6" />
               </button>
            </div>
            <div className="p-8 sm:p-12 space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                   <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Email du client</p>
                   <p className="font-bold text-blue-600 text-lg">{selectedContact.email}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl">
                   <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Objet du message</p>
                   <p className="font-black text-gray-900 text-lg">{selectedContact.subject}</p>
                </div>
              </div>
              <div className="space-y-4">
                 <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Message complet
                 </h3>
                 <div className="bg-blue-50/30 p-8 rounded-3xl border border-blue-50 text-gray-800 leading-relaxed font-medium text-lg min-h-[150px]">
                    {selectedContact.message}
                 </div>
              </div>
              <button 
                onClick={() => { restdbService.markContactAsRead(selectedContact._id); setSelectedContact(null); fetchData(); }}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                Marquer comme lu & Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Admin */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-6">
             <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Console Admin</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Connecté
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    Dernière synchro : {lastSync.toLocaleTimeString()}
                  </span>
                </div>
             </div>
             {/* Onglets */}
             <div className="flex bg-gray-100 p-1 rounded-2xl ml-4">
                <button 
                  onClick={() => { setActiveTab('loans'); setFilter(''); }}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'loans' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Prêts
                </button>
                <button 
                  onClick={() => { setActiveTab('contacts'); setFilter(''); }}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'contacts' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Messages
                </button>
             </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              onClick={seedUpstashSpanish} 
              disabled={uploading}
              className="bg-indigo-600 text-white p-3 rounded-xl border border-indigo-700 shadow-sm hover:bg-indigo-700 flex items-center gap-2 font-bold text-sm"
              title="Envoyer la traduction Espagnol vers Redis"
            >
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
              {uploading ? "Envoi..." : "Initialiser Espagnol"}
            </button>
            <button onClick={fetchData} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50">
              <RefreshCw className={`w-5 h-5 text-emerald-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Statistiques Dynamiques selon l'onglet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTab === 'loans' ? (
            <>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Dossiers</p><p className="text-3xl font-black text-gray-900">{applications.length}</p></div>
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Users className="w-8 h-8" /></div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">En Étude</p><p className="text-3xl font-black text-gray-900">{applications.filter(a => a.status === 'pending').length}</p></div>
                <div className="bg-orange-50 p-4 rounded-2xl text-orange-500"><Clock className="w-8 h-8" /></div>
              </div>
              <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-100 flex items-center justify-between">
                <div><p className="text-xs font-black text-emerald-100 uppercase tracking-widest mb-1">Volume global</p><p className="text-3xl font-black">{applications.reduce((s, a) => s + (Number(a.amount) || 0), 0).toLocaleString()} €</p></div>
                <div className="bg-white/20 p-4 rounded-2xl"><Landmark className="w-8 h-8" /></div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Messages</p><p className="text-3xl font-black text-gray-900">{contacts.length}</p></div>
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600"><Mail className="w-8 h-8" /></div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Non lus</p><p className="text-3xl font-black text-gray-900">{contacts.filter(c => c.status === 'unread').length}</p></div>
                <div className="bg-red-50 p-4 rounded-2xl text-red-500"><MessageSquare className="w-8 h-8" /></div>
              </div>
              <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-100 flex items-center justify-between">
                <div><p className="text-xs font-black text-emerald-100 uppercase tracking-widest mb-1">Avis Positifs</p><p className="text-3xl font-black">98%</p></div>
                <div className="bg-white/20 p-4 rounded-2xl"><Sparkles className="w-8 h-8" /></div>
              </div>
            </>
          )}
        </div>

        {/* Liste Tabulaire */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden min-h-[400px]">
          <div className="p-8 border-b border-gray-50 flex items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" placeholder={`Recherche dans les ${activeTab === 'loans' ? 'dossiers' : 'messages'}...`}
                value={filter} onChange={(e) => setFilter(e.target.value)}
                className="w-full bg-gray-50 border-none pl-14 pr-8 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-80 gap-4">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
            </div>
          ) : (activeTab === 'loans' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <tr><th className="px-8 py-5 text-left">Date</th><th className="px-8 py-5 text-left">Client</th><th className="px-8 py-5 text-left">Détails</th><th className="px-8 py-5 text-left">Statut</th><th className="px-8 py-5 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {applications.filter(a => `${a.firstName} ${a.lastName} ${a.email}`.toLowerCase().includes(filter.toLowerCase())).map((app) => (
                    <tr key={app._id} onClick={() => setSelectedApp(app)} className="hover:bg-emerald-50/50 transition-colors cursor-pointer group">
                      <td className="px-8 py-5">
                         <p className="text-[10px] font-black text-gray-400 uppercase">{new Date(app.date || app._created).toLocaleDateString()}</p>
                         <p className="text-[9px] font-bold text-emerald-600 uppercase">{new Date(app.date || app._created).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-bold text-gray-900">{app.firstName} {app.lastName}</p>
                        <p className="text-xs text-emerald-600 font-medium">{app.email}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-black text-gray-900">{(app.amount || 0).toLocaleString()} €</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">{app.duration} mois</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${app.status === 'pending' ? 'bg-orange-100 text-orange-600' : app.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'pending' ? 'bg-orange-600' : app.status === 'approved' ? 'bg-emerald-600' : 'bg-red-600'}`}></span>
                          {app.status === 'pending' ? 'Étude' : app.status === 'approved' ? 'Validé' : 'Refusé'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right"><span className="text-xs font-black text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">Voir le dossier</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <tr><th className="px-8 py-5 text-left">Date</th><th className="px-8 py-5 text-left">Nom</th><th className="px-8 py-5 text-left">Objet</th><th className="px-8 py-5 text-left">Statut</th><th className="px-8 py-5 text-right">Action</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contacts.filter(c => `${c.name} ${c.email} ${c.subject}`.toLowerCase().includes(filter.toLowerCase())).map((contact) => (
                    <tr key={contact._id} onClick={() => setSelectedContact(contact)} className="hover:bg-blue-50/50 transition-colors cursor-pointer group">
                      <td className="px-8 py-5">
                         <p className="text-[10px] font-black text-gray-400 uppercase">{new Date(contact.date).toLocaleDateString()}</p>
                         <p className="text-[9px] font-bold text-blue-600 uppercase">{new Date(contact.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-bold text-gray-900">{contact.name}</p>
                        <p className="text-xs text-blue-600 font-medium">{contact.email}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-black text-gray-900 truncate max-w-[200px]">{contact.subject}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[200px]">{contact.message}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${contact.status === 'unread' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${contact.status === 'unread' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                          {contact.status === 'unread' ? 'Nouveau' : 'Lu'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right"><span className="text-xs font-black text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">Lire le message</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
