
import React from 'react';

const Commitment: React.FC<{ onAnswer: (agreed: boolean) => void }> = ({ onAnswer }) => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-12 pb-10">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-[20px] font-black text-gray-900 leading-tight mb-10 uppercase font-['Montserrat']">
          Seu protocolo personalizado para reativar seu metabolismo noturno está pronto. Você está pronta para seguir um ritual simples de 10 segundos antes de dormir para ver resultados em menos de 7 dias?
        </h2>

        <div className="space-y-4">
          <button 
            onClick={() => onAnswer(true)}
            className="w-full py-6 bg-[#4CAF50] text-white font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-all uppercase"
          >
            ✅ Sim! Estou 100% comprometida!
          </button>
          
          <button 
            onClick={() => onAnswer(false)}
            className="w-full py-6 bg-white text-gray-400 font-black text-xl border-2 border-gray-100 rounded-2xl active:scale-95 transition-all uppercase"
          >
            ❌ Não, ainda não estou pronta.
          </button>
        </div>
      </div>
    </div>
  );
};

export default Commitment;
