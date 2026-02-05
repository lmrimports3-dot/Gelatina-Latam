import React from 'react';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10">
      {/* Headline principal */}
      <h1 className="text-xl md:text-2xl font-extrabold text-center text-gray-900 leading-tight mb-6">
        <span className="text-red-600">⚠️</span> Canetas de emagrecer estão dando problema — descobrimos o truque que funciona <span className="text-purple-600">ENQUANTO VOCÊ DORME</span>
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
        O truque que as mulheres estão usando para desinchar a barriga em DIAS — e que o Mounjaro não consegue fazer
      </p>

      {/* CTA Principal */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="w-full btn-gradient text-white font-extrabold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mb-3 flex flex-col items-center justify-center uppercase"
      >
        <span>GERAR MEU PROTOCOLO NOTURNO</span>
      </button>

      {/* Micro copy */}
      <p className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-tight mb-8">
        ⏱ LEVA MENOS DE 2 MINUTOS • TESTE GRATUITO • RESULTADO PERSONALIZADO
      </p>
    </div>
  );
};

export default Landing;