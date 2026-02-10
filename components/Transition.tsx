
import React, { useEffect } from 'react';

interface TransitionProps {
  onNext: (data?: any) => void;
}

const Transition: React.FC<TransitionProps> = ({ onNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-8 min-h-screen bg-white">
      {/* 🚨 Headline */}
      <div className="w-full bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
        <h1 className="text-[17px] md:text-lg font-black text-red-700 leading-tight">
          ⚠️ Mounjaro, canetas e injeções estão adoecendo mulheres em silêncio.
        </h1>
      </div>

      {/* 📌 Subheadline & Corpo do Texto */}
      <div className="w-full mb-6 space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed font-bold">
          Relatos de inflamações, pancreatite e colapso digestivo estão explodindo — enquanto uma alternativa noturna natural começa a se espalhar.
        </p>
        <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
          Milhares de mulheres já abandonaram agulhas e remédios perigosos.  
          Agora estão usando um truque noturno simples, que desincha a barriga enquanto dormem — sem química, sem riscos e sem injeções.
        </p>
      </div>

      {/* 💜 Texto de Transição e Destaque */}
      <div className="w-full bg-purple-50 rounded-2xl p-5 mb-6 border border-purple-100">
        <p className="text-[14px] text-purple-900 font-bold leading-relaxed">
          Antes de te mostrar como funciona o Truque da Gelatina Noturna, preciso entender seu perfil.
        </p>
      </div>

      {/* ✅ Botão de Continuidade */}
      <button
        onClick={() => onNext()}
        className="w-full btn-gradient text-white font-extrabold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mb-8 uppercase"
      >
        <span>👉 GERAR MEU PROTOCOLO AGORA</span>
      </button>

      {/* ✨ Micro Prova Social */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
              <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
          ✨ Mais de 312.000 mulheres já começaram por aqui
        </p>
      </div>
    </div>
  );
};

export default Transition;
