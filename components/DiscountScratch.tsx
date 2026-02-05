
import React, { useState, useRef, useEffect } from 'react';

interface DiscountScratchProps {
  onNext: () => void;
}

const DiscountScratch: React.FC<DiscountScratchProps> = ({ onNext }) => {
  const [scratched, setScratched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.fillStyle = '#e2e8f0'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#94a3b8'; 
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('RASPE AQUI', canvas.width / 2, canvas.height / 2 + 6);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    // Pincel aumentado para 45px para facilitar a raspagem no mobile
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparentPixels++;
      }
    }

    const percent = (transparentPixels / (pixels.length / 4)) * 100;
    // Liberar automaticamente ao atingir 25% de área limpa (usabilidade facilitada)
    if (percent > 25) {
      setIsRevealed(true);
      setScratched(true);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10 min-h-screen animate-fadeIn bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
          🎉 Seu Protocolo Personalizado Foi Liberado
        </h1>
        <p className="text-[15px] font-bold text-gray-500 leading-relaxed mb-2 px-4">
          O valor oficial do Protocolo Personalizado da Gelatina Noturna é:
        </p>
        <p className="text-xl font-black text-gray-400 line-through mb-4">
          R$ 149,90
        </p>
        <p className="text-[15px] font-bold text-purple-600 leading-relaxed mb-8 px-4">
          Mas hoje você pode receber um desconto exclusivo.
        </p>
      </div>

      <div className="w-full flex flex-col items-center">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Raspe abaixo para revelar seu desconto</p>
        
        <div className="relative w-full aspect-[16/9] max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-dashed border-purple-200 bg-white group cursor-crosshair">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-50 p-6 text-center select-none">
            <h3 className="text-2xl font-black text-emerald-600 mb-2">🎊 PARABÉNS!</h3>
            <p className="text-sm font-bold text-emerald-700 mb-4">Você ganhou R$ 130,00 de desconto</p>
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-bold text-gray-400 line-through">De R$ 149,90</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-sm font-black text-emerald-600 uppercase">Por apenas</span>
                 <span className="text-4xl font-black text-emerald-600 tracking-tighter">R$ 19,90</span>
               </div>
            </div>
          </div>

          <canvas 
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
            onTouchMove={handleScratch}
          />
        </div>
      </div>

      {isRevealed && (
        <div className="w-full flex flex-col items-center mt-10 animate-fadeInSlow">
          <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <span className="text-xl">⏰</span>
            <p className="text-[12px] font-bold text-red-700 leading-tight">
              <strong>Atenção:</strong> Este desconto é válido somente agora. Ao sair desta página, o valor volta ao normal.
            </p>
          </div>

          <button 
            onClick={onNext}
            className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase flex items-center justify-center gap-3 animate-pulse"
          >
            <span>GARANTIR MEU PROTOCOLO AGORA</span>
          </button>
        </div>
      )}

      {!isRevealed && (
        <p className="text-[11px] font-bold text-gray-300 mt-6 uppercase animate-pulse">Use o dedo ou o mouse para raspar</p>
      )}

      <style>{`
        .animate-fadeInSlow {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default DiscountScratch;
