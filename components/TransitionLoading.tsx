
import React, { useEffect, useState } from 'react';

const MESSAGES = [
  "⏳ Analisando suas respostas...",
  "📊 Cruzando dados com mais de 17.859 mulheres...",
  "🔍 Identificando seu tipo de bloqueio hormonal...",
  "✨ Criando seu protocolo personalizado...",
  "✅ Seu Diagnóstico Está Pronto!"
];

const TransitionLoading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalTime = 9000; // 9 segundos
    const stepTime = totalTime / MESSAGES.length;

    const msgTimer = setInterval(() => {
      setMsgIndex(prev => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, stepTime);

    const progTimer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 1));
    }, totalTime / 100);

    const finishTimer = setTimeout(onComplete, totalTime + 500);

    return () => {
      clearInterval(msgTimer);
      clearInterval(progTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#8B3A8B] to-[#2D1226] z-[9999] flex flex-col items-center justify-center px-10">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="relative w-24 h-24 mb-12">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-[13px] font-black text-white/40 uppercase tracking-[0.3em] mb-8 text-center h-4">
          {MESSAGES[msgIndex]}
        </h2>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-[#FFD700] to-[#FF69B4] transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span className="text-[#FFD700] font-black text-4xl tracking-tighter">{progress}%</span>
      </div>
    </div>
  );
};

export default TransitionLoading;
