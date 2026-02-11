import React, { useEffect, useState } from 'react';

const PERSUASIVE_TEXTS = [
  "Analisando suas respostas...",
  "Identificando seu tipo metabólico...",
  "Calculando defasagem calórica...",
  "Verificando compatibilidade genética...",
  "Gerando protocolo personalizado...",
  "Verificando disponibilidade de vagas...",
  "Quase pronto..."
];

const PreSalesLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Duração total entre 4 e 5 segundos
    const duration = 4500;
    const intervalTime = 45; // Para 100 passos
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev < PERSUASIVE_TEXTS.length - 1 ? prev + 1 : prev));
    }, duration / PERSUASIVE_TEXTS.length);

    const timeout = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center px-10">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Spinner Moderno */}
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#E91E63] border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-xl font-black text-gray-900 text-center mb-6 uppercase tracking-tight">
          Preparando seu acesso
        </h2>

        {/* Barra de Progresso */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#E91E63] to-[#6B2D5C] transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-[#E91E63] font-black text-2xl">{progress}%</span>
          <p className="text-[13px] font-bold text-gray-400 uppercase text-center tracking-widest animate-pulse h-5">
            {PERSUASIVE_TEXTS[textIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreSalesLoading;