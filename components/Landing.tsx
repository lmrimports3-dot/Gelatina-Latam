import React from 'react';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10">
      {/* Headline principal */}
      <h1 className="text-xl md:text-2xl font-extrabold text-center text-gray-900 leading-tight mb-6">
        Seu metabolismo não é preguiçoso. <span className="text-red-600">Você está sendo enganada.</span>
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

      {/* Bloco de Impacto / Subheadline */}
      <p className="text-[15px] text-center text-gray-700 mb-10 max-w-[360px] leading-relaxed font-semibold">
        <span className="text-purple-600 font-extrabold">Descubra como 312.000 mulheres estão perdendo 8kg em 30 dias enquanto dormem.</span><br/><br/>
        Remédios e injeções bagunçam hormônios e criam dependência. Enquanto isso, 312.000 mulheres descobriram um protocolo noturno que ativa o metabolismo durante o sono.<br/><br/>
        Sem dieta. Sem exercício. Sem remédios. <br/>
        Resultados em 30-60 dias.
      </p>

      {/* CTA Principal */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="w-full btn-gradient text-white font-extrabold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mb-3 flex flex-col items-center justify-center uppercase"
      >
        <span>🔥 DESCOBRIR MEU PROTOCOLO AGORA</span>
      </button>

      {/* Micro copy e Prova Social */}
      <p className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-tight mb-8">
        <span className="text-purple-600">✨ 312.000 mulheres • ⭐ 4.9/5 estrelas • 8kg em 30 dias • 🏆 Garantia 15 dias</span>
      </p>
    </div>
  );
};

export default Landing;