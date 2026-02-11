
import React from 'react';

const Retention: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-12 pb-10">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-[26px] font-black text-red-600 leading-tight mb-6 uppercase font-['Montserrat']">
          Espere! Não feche essa página ainda!
        </h2>

        <div className="text-left bg-gray-50 p-8 rounded-[40px] border border-gray-100 mb-8 space-y-4">
          <p className="text-[14px] font-bold text-gray-600 leading-relaxed">
            Você ia cometer o mesmo erro que 90% das pessoas cometem... eu vi que você quase finalizou seu diagnóstico, mas está hesitando.
          </p>
          <p className="text-[14px] font-bold text-gray-600 leading-relaxed">
            Eu não quero que o preço seja a barreira entre você e o corpo que você merece. Por isso, vou fazer algo especial para você AGORA.
          </p>
        </div>

        <div className="bg-[#FF69B4]/10 border-2 border-dashed border-[#FF69B4] p-8 rounded-[40px] mb-8">
           <p className="text-sm font-black text-[#FF69B4] uppercase tracking-widest mb-2">Oferta Relâmpago</p>
           <div className="flex flex-col items-center">
             <span className="text-sm text-gray-400 line-through">De R$ 19,90</span>
             <div className="flex items-baseline gap-1">
               <span className="text-sm font-bold text-gray-900">POR APENAS:</span>
               <span className="text-5xl font-black text-[#8B3A8B]">R$ 9,90</span>
             </div>
           </div>
           <p className="text-[11px] font-bold text-gray-400 mt-4">Apenas para as 10 primeiras mulheres.</p>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-6 bg-[#FFD700] text-black font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-all uppercase"
        >
          SIM! EU QUERO POR R$ 9,90
        </button>
      </div>
    </div>
  );
};

export default Retention;
