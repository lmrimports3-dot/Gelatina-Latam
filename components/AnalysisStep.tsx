
import React, { useEffect, useState } from 'react';

const PHRASES = [
  "Analisando suas respostas...",
  "Cruzando dados com mais de 17.859 mulheres...",
  "Identificando seu tipo de bloqueio hormonal...",
  "Criando seu protocolo personalizado..."
];

const AnalysisStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => {
        if (prev >= PHRASES.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn py-10">
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 border-4 border-[#8B3A8B]/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#8B3A8B] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-[14px] font-black text-[#8B3A8B] text-center uppercase tracking-[0.2em] px-6 h-10 leading-relaxed">
        {PHRASES[index]}
      </h2>
    </div>
  );
};

export default AnalysisStep;
