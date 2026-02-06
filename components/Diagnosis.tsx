
import React, { useEffect } from 'react';

interface DiagnosisProps {
  userData: any;
  onNext: () => void;
}

const Diagnosis: React.FC<DiagnosisProps> = ({ userData, onNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const name = userData?.name || '';
  const weight = userData?.weight || '--';
  const height = userData?.height || '--';
  const targetWeight = userData?.targetWeight || '--';
  
  // No Quiz.tsx renumereado, o novo id 6 é a área de gordura (multi-select)
  const areas = userData?.[6] || [];
  const areaGordura = Array.isArray(areas) && areas.length > 0 
    ? areas.join(', ') 
    : 'Áreas críticas';

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10 min-h-screen animate-fadeIn bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
          🔎 Diagnóstico do Seu Corpo — Análise Concluída
        </h1>
        <p className="text-[15px] font-bold text-gray-600 leading-relaxed">
          Com base nas suas respostas, identificamos os principais fatores que estão impedindo seu corpo de desinchar e emagrecer.
        </p>
      </div>

      <div className="w-full bg-white rounded-[32px] p-8 mb-8 shadow-xl border border-gray-100">
        <h2 className="text-[12px] font-black text-purple-600 uppercase tracking-[0.2em] mb-6 text-center">Ficha Clínica do Perfil</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-xs font-bold text-gray-400 uppercase">Nome</span>
            <span className="text-sm font-black text-gray-900">{name || '---'}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-xs font-bold text-gray-400 uppercase">Peso Atual</span>
            <span className="text-sm font-black text-gray-900">{weight} kg</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-xs font-bold text-gray-400 uppercase">Altura</span>
            <span className="text-sm font-black text-gray-900">{height} cm</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-50">
            <span className="text-xs font-bold text-gray-400 uppercase">Objetivo</span>
            <span className="text-sm font-black text-gray-900">{targetWeight} kg</span>
          </div>
          <div className="flex flex-col py-3">
            <span className="text-xs font-bold text-gray-400 uppercase mb-1">Área que mais incomoda</span>
            <span className="text-sm font-black text-purple-600">{areaGordura}</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-red-50 border border-red-100 rounded-2xl p-6 mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">⚠️</span>
          <h3 className="text-sm font-black text-red-900 uppercase tracking-tighter">Atenção:</h3>
        </div>
        <p className="text-[13px] font-bold text-red-700 leading-relaxed">
          Seu perfil indica retenção abdominal noturna, digestão lenta à noite e maior tendência a inchaço — exatamente o cenário onde o Truque da Gelatina Noturna atuará com mais força.
        </p>
      </div>

      <button 
        onClick={onNext}
        className="w-full py-6 btn-gradient text-white font-black text-lg rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase flex items-center justify-center gap-3"
      >
        <span>👉 Continuar para liberação do protocolo</span>
      </button>
    </div>
  );
};

export default Diagnosis;
