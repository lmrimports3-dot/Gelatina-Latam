
import React, { useEffect, useState } from 'react';

interface ResultsProofProps {
  onNext: () => void;
}

const IMAGES = [
  "https://ik.imagekit.io/ekdmcxqtr/resultado01.jpg",
  "https://ik.imagekit.io/ekdmcxqtr/resultado02.jpg",
  "https://ik.imagekit.io/ekdmcxqtr/resultado03.jpg"
];

const ResultsProof: React.FC<ResultsProofProps> = ({ onNext }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Efeito para o carrossel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10 min-h-screen animate-fadeIn bg-white">
      {/* Headlines */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
          Resultados reais de mulheres que começaram o Truque da Gelatina Noturna
        </h1>
        <p className="text-[15px] font-bold text-gray-700 leading-relaxed px-2">
          Desinchaço visível, barriga menos estufada e roupas voltando a servir — já nas primeiras semanas.
        </p>
      </div>

      {/* Automatic Carousel */}
      <div className="w-full relative mb-8 overflow-hidden">
        <div 
          className="flex transition-transform duration-700 ease-in-out gap-4 px-4"
          style={{ transform: `translateX(-${activeIndex * (85 + 4)}%)` }}
        >
          {IMAGES.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[85%] snap-center">
              <img 
                src={src} 
                alt={`Resultado Real ${i + 1}`} 
                className="w-full h-auto rounded-[32px] shadow-lg border border-gray-100"
              />
            </div>
          ))}
        </div>
        
        {/* Scroll Indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {IMAGES.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-6 bg-purple-600' : 'w-1.5 bg-purple-200'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Reinforcement Text */}
      <p className="text-[14px] text-gray-600 font-medium text-center mb-10 leading-relaxed px-4">
        Esses resultados aconteceram após seguir o protocolo noturno do jeito correto, respeitando o corpo e o ritmo digestivo.
      </p>

      {/* Button Always Enabled */}
      <button 
        onClick={onNext}
        className="w-full py-6 btn-gradient text-white font-black text-lg rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase"
      >
        CONTINUAR
      </button>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ResultsProof;
