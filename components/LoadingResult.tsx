
import React, { useEffect, useState } from 'react';

const STEPS = [
  "Analisando seu perfil...",
  "Calculando IMC...",
  "Identificando seus bloqueios...",
  "Gerando seu diagnóstico personalizado...",
  "Buscando depoimentos de mulheres similares..."
];

const LoadingResult: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const stepInterval = setInterval(() => {
      setStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center px-8 text-white">
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 border-4 border-[#E91E63]/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#E91E63] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">⏳</div>
      </div>

      <h2 className="text-2xl font-black text-center mb-10 tracking-tight">
        ANALISANDO SEU PERFIL...
      </h2>

      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-4 shadow-inner">
          <div className="h-full bg-gradient-to-r from-[#E91E63] to-[#6B2D5C] transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[#E91E63] font-black text-lg">{progress}%</span>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest animate-pulse h-4">
            {STEPS[step]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingResult;
