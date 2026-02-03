
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
          ⚠️ O uso do Mounjaro e de canetas para emagrecer está gerando uma preocupação crescente entre especialistas.
        </h1>
      </div>

      {/* 📌 Subheadline & Corpo do Texto */}
      <div className="w-full mb-6 space-y-4">
        <p className="text-[14px] text-gray-600 leading-relaxed font-medium">
          Novos relatos associam esses métodos a efeitos digestivos perigosos, incluindo casos de pancreatite, inflamações e alterações no funcionamento do metabolismo.
        </p>
        <p className="text-[14px] text-gray-600 leading-relaxed font-bold">
          Muitas mulheres estão abandonando essas soluções extremas e migrando para métodos naturais que estimulam o corpo sem expor a saúde a riscos.
        </p>
      </div>

      {/* 💜 Texto de Transição e Destaque */}
      <div className="w-full bg-purple-50 rounded-2xl p-5 mb-6 border border-purple-100">
        <p className="text-[14px] text-purple-900 font-bold leading-relaxed">
          👉 Uma dessas rotinas é o <span className="text-purple-600">Truque da Gelatina Noturna</span>, criado para estimular o organismo enquanto você dorme e acelerar o processo de desinchar a barriga.
        </p>
      </div>

      {/* ❓ Chamada para Ação */}
      <div className="w-full text-center mb-8">
        <p className="text-[15px] font-black text-gray-900">
          Antes de te mostrar como funciona, responda a este teste rápido.
        </p>
      </div>

      {/* ✅ Botão de Continuidade */}
      <button
        onClick={() => onNext()}
        className="w-full btn-gradient text-white font-extrabold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mb-8 uppercase"
      >
        <span>Continuar para o Teste</span>
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
          ✨ Mais de 312.000 mulheres já responderam este teste.
        </p>
      </div>
    </div>
  );
};

export default Transition;
