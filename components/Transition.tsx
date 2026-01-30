
import React, { useEffect } from 'react';

interface TransitionProps {
  onNext: () => void;
}

const Transition: React.FC<TransitionProps> = ({ onNext }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-12 min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Antes de continuar, algo importante:
        </h2>

        <div className="space-y-4 mb-10">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
            <p className="text-gray-700 font-semibold">Esta es la receta correcta de la gelatina.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
            <p className="text-gray-700 font-semibold">No una adaptación.</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
            <p className="text-gray-700 font-semibold">No una versión de TikTok.</p>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mb-8">
          <p className="text-purple-900 font-medium leading-relaxed">
            Voy a hacerte unas preguntas rápidas para verificar si este truco funciona para tu cuerpo y calcular la forma correcta de prepararlo según tu perfil.
          </p>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 active:scale-95 transition-all"
        >
          Entendido, continuar
        </button>
      </div>
    </div>
  );
};

export default Transition;
