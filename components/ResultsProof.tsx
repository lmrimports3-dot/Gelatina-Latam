import React, { useEffect } from 'react';

interface ResultsProofProps {
  onNext: () => void;
}

const IMAGE_URL = "https://ik.imagekit.io/ekdmcxqtr/celebrity-proof-CMYKHlYT%20(1).jpg";

const ResultsProof: React.FC<ResultsProofProps> = ({ onNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center min-h-screen animate-fadeIn bg-white pb-10">
      {/* Headlines */}
      <div className="text-center mb-8 px-6 pt-10">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
          Sim, até as famosas estão usando!
        </h1>
      </div>

      {/* Hero Image - Layout corrigido: centralizado, max-width 92%, respiro visual (padding 12px), bordas arredondadas (12px) */}
      <div className="w-full px-[12px] max-w-[92%] mx-auto mb-10">
        <img 
          src={IMAGE_URL} 
          alt="Resultados Reais" 
          className="w-full h-auto block rounded-[12px] object-contain"
        />
      </div>

      {/* Button Always Enabled */}
      <div className="w-full px-6 mt-auto">
        <button 
          onClick={onNext}
          className="w-full py-6 btn-gradient text-white font-black text-lg rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase"
        >
          CONTINUAR
        </button>
      </div>

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