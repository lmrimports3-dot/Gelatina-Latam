
import React, { useState } from 'react';

const Biometrics: React.FC<{ updateData: (d: any) => void, onNext: () => void }> = ({ updateData, onNext }) => {
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(165);

  const handleNext = () => {
    updateData({ weight, height });
    onNext();
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-12 pb-10">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-[22px] font-black text-gray-900 leading-tight mb-2 uppercase font-['Montserrat']">
          Agora, vamos calcular seu Índice de Inchaço Metabólico (IIM).
        </h2>
        
        <div className="mt-12 space-y-12">
          {/* Peso Slider */}
          <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 shadow-inner">
             <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Qual seu peso atual?</p>
             <div className="flex items-center justify-between mb-6">
                <button onClick={() => setWeight(Math.max(40, weight - 0.5))} className="w-12 h-12 bg-white rounded-full shadow border border-gray-100 text-2xl font-bold text-[#8B3A8B]">−</button>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#8B3A8B] tracking-tighter">{weight.toFixed(1).replace('.', ',')}</span>
                  <span className="text-lg font-bold text-gray-300">kg</span>
                </div>
                <button onClick={() => setWeight(Math.min(180, weight + 0.5))} className="w-12 h-12 bg-white rounded-full shadow border border-gray-100 text-2xl font-bold text-[#8B3A8B]">+</button>
             </div>
             <input 
               type="range" min="40" max="180" step="0.5" value={weight} 
               onChange={(e) => setWeight(parseFloat(e.target.value))}
               className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B3A8B]"
             />
          </div>

          {/* Altura Slider */}
          <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 shadow-inner">
             <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Qual sua altura?</p>
             <div className="flex items-center justify-between mb-6">
                <button onClick={() => setHeight(Math.max(140, height - 1))} className="w-12 h-12 bg-white rounded-full shadow border border-gray-100 text-2xl font-bold text-[#8B3A8B]">−</button>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#8B3A8B] tracking-tighter">{height}</span>
                  <span className="text-lg font-bold text-gray-300">cm</span>
                </div>
                <button onClick={() => setHeight(Math.min(200, height + 1))} className="w-12 h-12 bg-white rounded-full shadow border border-gray-100 text-2xl font-bold text-[#8B3A8B]">+</button>
             </div>
             <input 
               type="range" min="140" max="200" step="1" value={height} 
               onChange={(e) => setHeight(parseInt(e.target.value))}
               className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8B3A8B]"
             />
          </div>
        </div>

        <button 
          onClick={handleNext}
          className="w-full py-6 bg-[#FFD700] text-black font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-all uppercase mt-12"
        >
          CALCULAR MEU IIM
        </button>
      </div>
    </div>
  );
};

export default Biometrics;
