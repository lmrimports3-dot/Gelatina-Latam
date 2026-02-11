
import React, { useState } from 'react';

interface LeadBiometricsProps {
  onNext: (name: string, email: string, weight: number, height: number) => void;
}

const LeadBiometricsStep: React.FC<LeadBiometricsProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(165);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisText, setAnalysisText] = useState('Analisando suas respostas...');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsAnalyzing(true);
    
    // Animação de transição (Etapa 12/13)
    const texts = [
      "Analisando suas respostas...",
      "Cruzando dados com mais de 17.859 mulheres...",
      "Identificando seu tipo de bloqueio hormonal...",
      "Calculando Índice de Inchaço Metabólico...",
      "Criando seu protocolo personalizado..."
    ];

    texts.forEach((text, i) => {
      setTimeout(() => setAnalysisText(text), i * 1800);
    });

    setTimeout(() => {
      onNext(name, email, weight, height);
    }, texts.length * 1800);
  };

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#8B3A8B] to-[#4A148C] z-[9999] flex flex-col items-center justify-center px-10">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-[12px] font-black text-white/50 uppercase tracking-[0.2em] mb-8 text-center h-8 leading-tight">
            {analysisText}
          </h2>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#FFD700] animate-progress"></div>
          </div>
        </div>
        <style>{`
          @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
          .animate-progress { animation: progress 9s linear forwards; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 animate-fadeIn py-6">
      <div className="w-full max-w-[440px]">
        <h1 className="text-[20px] font-black text-[#4A148C] leading-tight mb-1 uppercase font-['Montserrat'] text-center">
          Seu diagnóstico está quase pronto!
        </h1>
        <p className="text-gray-500 font-bold text-center text-[12px] mb-6">
          Para onde devemos enviar seu plano personalizado e gratuito?
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <div className="text-left">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">Nome</label>
              <input 
                type="text" 
                placeholder="Seu primeiro nome" 
                required
                className="w-full py-3 px-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-bold focus:border-[#8B3A8B] outline-none transition-all text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="text-left">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">E-mail</label>
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                required
                className="w-full py-3 px-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-bold focus:border-[#8B3A8B] outline-none transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6 bg-white/50 p-4 rounded-2xl border border-gray-100 shadow-sm">
            {/* Peso Slider */}
            <div className="flex flex-col items-center">
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Qual seu peso atual?</p>
               <div className="flex items-center justify-between w-full mb-2 max-w-[280px]">
                  <button type="button" onClick={() => setWeight(Math.max(40, weight - 0.5))} className="w-8 h-8 bg-white rounded-full shadow border border-gray-100 text-[#8B3A8B] font-bold text-sm">-</button>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#8B3A8B] tracking-tighter">{weight.toFixed(1).replace('.', ',')}</span>
                    <span className="text-[12px] font-bold text-gray-300">kg</span>
                  </div>
                  <button type="button" onClick={() => setWeight(Math.min(180, weight + 0.5))} className="w-8 h-8 bg-white rounded-full shadow border border-gray-100 text-[#8B3A8B] font-bold text-sm">+</button>
               </div>
               <input type="range" min="40" max="180" step="0.5" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))} className="w-full max-w-[300px] accent-[#8B3A8B] h-1.5" />
            </div>

            {/* Altura Slider */}
            <div className="flex flex-col items-center">
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Qual sua altura?</p>
               <div className="flex items-center justify-between w-full mb-2 max-w-[280px]">
                  <button type="button" onClick={() => setHeight(Math.max(130, height - 1))} className="w-8 h-8 bg-white rounded-full shadow border border-gray-100 text-[#8B3A8B] font-bold text-sm">-</button>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#8B3A8B] tracking-tighter">{height}</span>
                    <span className="text-[12px] font-bold text-gray-300">cm</span>
                  </div>
                  <button type="button" onClick={() => setHeight(Math.min(220, height + 1))} className="w-8 h-8 bg-white rounded-full shadow border border-gray-100 text-[#8B3A8B] font-bold text-sm">+</button>
               </div>
               <input type="range" min="130" max="220" step="1" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="w-full max-w-[300px] accent-[#8B3A8B] h-1.5" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#FFD700] text-black font-black text-lg rounded-xl shadow-lg active:scale-95 transition-all uppercase"
          >
            VER MEU DIAGNÓSTICO
          </button>
        </form>
        <p className="text-[9px] font-bold text-gray-400 mt-4 text-center uppercase flex items-center justify-center gap-2 tracking-widest">
           🔒 Seu e-mail está seguro e livre de spam.
        </p>
      </div>
    </div>
  );
};

export default LeadBiometricsStep;
