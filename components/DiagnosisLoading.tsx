
import React, { useEffect, useState } from 'react';

interface DiagnosisLoadingProps {
  onComplete: () => void;
}

const DiagnosisLoading: React.FC<DiagnosisLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Carregamento em aproximadamente 3 segundos

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center px-6 py-20 min-h-screen animate-fadeIn bg-white">
      {/* Icone de Lupa Animado */}
      <div className="relative mb-12">
        <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center shadow-inner animate-pulse">
          <span className="text-5xl">🔎</span>
        </div>
        <div className="absolute -inset-2 border-4 border-purple-100 border-t-purple-500 rounded-full animate-spin"></div>
      </div>

      {/* Headlines */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
          Gerando seu <span className="text-purple-600">Mapa Metabólico</span> Personalizado...
        </h2>
        <p className="text-[16px] font-bold text-gray-500 leading-relaxed px-4">
          Aguarde enquanto nossa tecnologia identifica os bloqueios hormonais que estão impedindo seu corpo de desinchar naturalmente.
        </p>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden mb-4 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-black text-purple-600">{progress}%</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">
            Cruzando dados com o Protocolo da Gelatina Noturna...
          </span>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisLoading;
