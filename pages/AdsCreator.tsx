
import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronLeft, Image as ImageIcon, Type, Sparkles, RefreshCw, Layout, MousePointer2, Check, ShieldCheck, Palette, ListChecks, Star, LayoutGrid } from 'lucide-react';

interface AdsCreatorProps {
  onBack: () => void;
}

const AdsCreator: React.FC<AdsCreatorProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [text, setText] = useState("VOTRE CRÉDIT IMMOBILIER");
  const [subText, setSubText] = useState("Taxa fixa garantida de 2,00% TAEG.");
  const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1080");
  const [fontSize, setFontSize] = useState(65);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isWhiteTheme, setIsWhiteTheme] = useState(true);

  const images = [
    { url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1080", label: "Immobilier" },
    { url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1080", label: "Auto" },
    { url: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1080", label: "Entreprise" },
    { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1080", label: "Personnel" }
  ];

  const advantages = [
    "Aprovação em 24h",
    "Sem Custos de Processo",
    "Gestão 100% Online",
    "Segurança Total"
  ];

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
    return currentY + lineHeight;
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = bgImage;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const themeBg = isWhiteTheme ? "#FFFFFF" : "#0f172a";
      const themeTitle = isWhiteTheme ? "#111827" : "#FFFFFF";
      const themeAccent = "#10b981";
      const themeText = isWhiteTheme ? "#4b5563" : "#94a3b8";

      // 1. Fond Global
      ctx.fillStyle = themeBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- CONFIGURATION DU SPLIT LAYOUT ---
      const splitX = canvas.width * 0.52; // Ligne de séparation à 52%
      const margin = 80;
      const textMaxWidth = splitX - (margin * 2);

      // 2. RENDU DE L'IMAGE (Zone Droite Uniquement)
      const imgWidth = canvas.width - splitX;
      const imgHeight = canvas.height;

      ctx.save();
      // On crée un rectangle de masque pour être certain que l'image ne déborde pas à gauche
      ctx.beginPath();
      ctx.rect(splitX, 0, imgWidth, imgHeight);
      ctx.clip();

      const imgRatio = img.width / img.height;
      const containerRatio = imgWidth / imgHeight;
      let dW, dH, oX, oY;

      if (imgRatio > containerRatio) {
        dH = imgHeight;
        dW = img.width * (imgHeight / img.height);
        oX = splitX + (imgWidth - dW) / 2;
        oY = 0;
      } else {
        dW = imgWidth;
        dH = img.height * (imgWidth / img.width);
        oX = splitX;
        oY = (imgHeight - dH) / 2;
      }
      ctx.drawImage(img, oX, oY, dW, dH);
      ctx.restore();

      // 3. RENDU DU TEXTE (Zone Gauche Uniquement)
      ctx.textAlign = "left";

      // Logo
      ctx.fillStyle = themeAccent;
      ctx.font = "900 45px 'Inter', sans-serif";
      ctx.fillText("EUROPCAPITAL", margin, 120);
      
      // Petite barre sous le logo
      ctx.fillRect(margin, 145, 60, 6);

      // Titre Principal
      ctx.fillStyle = themeTitle;
      ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
      let currentY = 350;
      currentY = wrapText(ctx, text.toUpperCase(), margin, currentY, textMaxWidth, fontSize * 1.15);

      // Sous-titre avec le taux de 2% (IMPORTANT : Reste strictement à gauche)
      ctx.fillStyle = themeAccent;
      ctx.font = "700 36px 'Inter', sans-serif";
      currentY += 30;
      currentY = wrapText(ctx, subText, margin, currentY, textMaxWidth, 45);

      // Guarnição : Avantages avec icônes (Strictement à gauche)
      currentY += 80;
      advantages.forEach((adv) => {
        // Cercle icône
        ctx.fillStyle = themeAccent;
        ctx.beginPath();
        ctx.arc(margin + 15, currentY - 12, 18, 0, Math.PI * 2);
        ctx.fill();
        
        // Check mark
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.font = "900 20px 'Inter', sans-serif";
        ctx.fillText("✓", margin + 15, currentY - 5);

        // Texte
        ctx.textAlign = "left";
        ctx.fillStyle = themeText;
        ctx.font = "700 28px 'Inter', sans-serif";
        ctx.fillText(adv, margin + 50, currentY);
        currentY += 60;
      });

      // Pied de page (Lien URL)
      ctx.fillStyle = isWhiteTheme ? "#f8fafc" : "#1e293b";
      ctx.beginPath();
      ctx.roundRect(margin, canvas.height - 120, textMaxWidth, 70, 15);
      ctx.fill();

      ctx.fillStyle = isWhiteTheme ? "#1e293b" : "#FFFFFF";
      ctx.font = "900 24px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("WWW.EUROPCAPITAL.COM", margin + (textMaxWidth/2), canvas.height - 120 + 44);

      // Décoration : Ligne verticale de séparation (optionnelle, style moderne)
      ctx.strokeStyle = themeAccent;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.moveTo(splitX, 100);
      ctx.lineTo(splitX, canvas.height - 100);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    };
  };

  useEffect(() => {
    drawCanvas();
  }, [text, subText, bgImage, fontSize, isWhiteTheme]);

  const handleDownload = () => {
    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `europcapital-affiche-pro.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="pt-24 pb-20 bg-[#0a0a0c] min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="bg-white/5 p-4 rounded-2xl text-white hover:bg-white/10 transition-all border border-white/10">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-emerald-500 mb-1">
                <Sparkles className="w-4 h-4 fill-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Layout Sécurisé (Anti-chevauchement)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter flex items-center gap-3">
                Ads Creator <span className="text-emerald-500 font-light">Elite</span>
              </h1>
            </div>
          </div>
          
          <div className="flex gap-4 w-full lg:w-auto">
            <button 
                onClick={() => setIsWhiteTheme(!isWhiteTheme)}
                className={`flex-1 lg:flex-none px-6 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all border ${isWhiteTheme ? 'bg-white text-gray-900 border-white shadow-xl' : 'bg-white/5 text-white border-white/10'}`}
            >
                <Palette className="w-5 h-5" />
                MODE {isWhiteTheme ? 'PROFESSIONNEL' : 'NOCTURNE'}
            </button>
            <button 
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex-1 lg:flex-none bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
                {isGenerating ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
                TÉLÉCHARGER HD
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* PRÉVISUALISATION */}
          <div className="space-y-8 sticky top-32">
            <div className={`rounded-[3rem] p-3 shadow-2xl border aspect-square flex items-center justify-center overflow-hidden transition-all duration-500 bg-gray-900/40 border-white/5`}>
              <canvas 
                ref={canvasRef} 
                width={1080} 
                height={1080} 
                className="max-w-full h-auto rounded-[2.5rem] shadow-2xl"
              />
            </div>
            <div className="bg-emerald-900/10 border border-emerald-500/20 p-6 rounded-[2rem] flex items-center gap-6 backdrop-blur-xl">
              <ShieldCheck className="w-10 h-10 text-emerald-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-100">
                  Layout Magazine : Photo à droite, Texte à gauche. Garanti sans interférence sur vos visuels.
                </p>
              </div>
            </div>
          </div>

          {/* RÉGLAGES */}
          <div className="bg-[#111114] rounded-[3rem] p-8 sm:p-12 border border-white/5 space-y-12 shadow-2xl">
            
            <section className="space-y-8">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-3">
                <Type className="w-4 h-4 text-emerald-500" /> Édition des Textes
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 ml-1 uppercase">Titre de l'Affiche</label>
                  <input 
                    value={text} 
                    onChange={e => setText(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl font-black text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 ml-1 uppercase">Message & Taux (Zône Sécurisée)</label>
                  <textarea 
                    value={subText} 
                    onChange={e => setSubText(e.target.value)}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl font-bold text-emerald-400 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-500 ml-1 uppercase tracking-widest">Taille du Titre ({fontSize}px)</label>
                  <input 
                    type="range" min="40" max="95" value={fontSize}
                    onChange={e => setFontSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-3">
                <ImageIcon className="w-4 h-4 text-emerald-500" /> Photo de Droite
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setBgImage(img.url)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${bgImage === img.url ? 'border-emerald-500 scale-105 shadow-xl' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" alt="" />
                    {bgImage === img.url && <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center"><Check className="text-white w-6 h-6" /></div>}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 ml-1 uppercase">URL Image Personnalisée</label>
                <div className="relative">
                   <input 
                    value={bgImage} 
                    onChange={e => setBgImage(e.target.value)}
                    placeholder="Lien de l'image..."
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl font-mono text-[11px] text-emerald-400 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                  <MousePointer2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-3">
                <LayoutGrid className="w-4 h-4 text-emerald-500" /> Garanties (Automatiques)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {advantages.map((adv, i) => (
                  <div key={i} className="bg-emerald-500/5 border border-emerald-500/10 px-4 py-3 rounded-xl flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-100 uppercase">{adv}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdsCreator;
