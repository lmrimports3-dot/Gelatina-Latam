
import React from 'react';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10">
      {/* Headline principal */}
      <h1 className="text-xl md:text-2xl font-extrabold text-center text-gray-900 leading-tight mb-6">
        <span className="text-red-600">⚠️ ATENÇÃO:</span> Relatos recentes associam as <span className="text-purple-600">CANETAS para emagrecer</span> e o uso de <span className="text-purple-600">Mounjaro</span> a efeitos colaterais que estão preocupando especialistas.
      </h1>

      {/* Imagen principal */}
      <div className="relative mb-8 w-full bg-white rounded-3xl shadow-2xl flex items-center justify-center p-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-transparent rounded-3xl -z-10"></div>
        <img 
          src="https://ik.imagekit.io/ekdmcxqtr/Design%20sem%20nome.png" 
          alt="Alerta Saúde" 
          className="rounded-2xl w-full h-auto float-animation shadow-sm"
        />
      </div>

      {/* Transição para oferta */}
      <p className="text-[15px] text-center text-gray-700 mb-10 max-w-[360px] leading-relaxed font-semibold">
        👉 Enquanto métodos agressivos assustam cada vez mais pessoas, milhares estão migrando para o <span className="font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-lg border border-purple-200 shadow-sm">Truque da Gelatina Noturna</span> — uma rotina simples que faz a barriga desinchar enquanto você dorme.
      </p>

      {/* CTA Principal */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="w-full btn-gradient text-white font-extrabold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mb-3 flex flex-col items-center justify-center uppercase"
      >
        <span>🔥 QUERO DESINCHAR MINHA BARRIGA AGORA</span>
      </button>

      {/* Micro copy */}
      <p className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-tight mb-8">
        ⏱ LEVA MENOS DE 2 MINUTOS • TESTE GRATUITO • RESULTADO PERSONALIZADO
      </p>
    </div>
  );
};

export default Landing;
