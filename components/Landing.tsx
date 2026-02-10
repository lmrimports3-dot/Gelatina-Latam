import React from 'react';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10">
      {/* Headline principal */}
      <h1 className="text-xl md:text-2xl font-extrabold text-center text-gray-900 leading-tight mb-6">
        ⚠️ Seu metabolismo não está “preguiçoso”… <br/>
        <span className="text-red-600">Você tem sido enganada.</span>
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

      {/* Subheadline & Bloco de Impacto */}
      <div className="text-[15px] text-center text-gray-700 mb-10 max-w-[360px] leading-relaxed font-semibold">
        <p className="text-purple-600 font-extrabold mb-5">
          Barriga inchada mesmo depois de comer pouco, dietas, médicos e remédios?
        </p>

        <p className="mb-5">
          Você já tentou tudo: Dieta | Exercício | Suplemento | Remédio e Canetas Caras...
        </p>

        <p className="mb-5">
          E ainda acorda inchada, parece grávida depois de um prato, e se sente insegura o dia inteiro.
        </p>

        <p>
          Enquanto isso, 312.000 mulheres descobriram um protocolo noturno que aciona seu próprio metabolismo enquanto você dorme — <br/>
          <span className="text-purple-600">sem remédios, sem injeção, sem riscos.</span>
        </p>
      </div>

      {/* CTA Principal */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="w-full btn-gradient text-white font-extrabold text-lg py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mb-4 flex flex-col items-center justify-center uppercase"
      >
        <span>🔥 DESCOBRIR MEU PROTOCOLO AGORA</span>
      </button>

      {/* Prova Social */}
      <div className="text-[11px] font-bold text-gray-400 text-center uppercase tracking-tight mb-8">
        <p className="text-purple-600 mb-1">
          ✨ 312.000 mulheres • ⭐ 4.9/5 <br/>
          📈 até 8kg em 30 dias • 🏆 garantia 15 dias
        </p>
      </div>
    </div>
  );
};

export default Landing;