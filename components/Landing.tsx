
import React from 'react';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10">
      {/* Redundant Logo section removed to use global header */}

      {/* Hero Image */}
      <div className="relative mb-8 w-64 h-64 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-transparent rounded-3xl -z-10"></div>
        <img 
          src="https://ik.imagekit.io/ekdmcxqtr/e9e0639c-6c94-4464-ab97-8e369eb06fdf.png" 
          alt="Gelatina" 
          className="rounded-2xl object-cover w-full h-full float-animation shadow-lg"
        />
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 leading-tight mb-4">
        ¿Estás luchando contra la <span className="text-purple-600">panza inflamada</span> y la <span className="text-pink-500">grasa localizada</span>?
      </h1>

      {/* Subheadline */}
      <p className="text-lg text-center text-gray-600 font-medium mb-3">
        Descubrí cómo activar tu metabolismo y reducir grasa visible usando la receta correcta de la gelatina.
      </p>

      {/* Supporting Description */}
      <p className="text-sm text-center text-gray-500 mb-8 max-w-[320px]">
        Un método natural que miles de mujeres ya están usando para dejar de acumular grasa, incluso después de los 40.
      </p>

      {/* Main CTA Button */}
      <button 
        onClick={() => onNext()}
        className="w-full btn-gradient text-white font-extrabold text-xl py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all mb-6 flex flex-col items-center justify-center"
      >
        <span>Quiero saber si funciona para mí</span>
        <span className="text-2xl mt-1">🔥</span>
      </button>

      {/* Trust Badges */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs font-bold text-gray-500 mb-6">
        <div className="flex items-center gap-1">
          <span className="text-purple-600 text-lg">✓</span>
          <span>Más de 127.000 mujeres ya probaron</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-purple-600 text-lg">✓</span>
          <span>100% natural</span>
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-xs font-bold text-gray-500 mb-8">
        <span className="text-purple-600 text-lg">✓</span>
        <span>Sin inyecciones ni dietas extremas</span>
      </div>

      {/* Micro Copy */}
      <div className="w-full border-t border-gray-100 pt-6 text-center">
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
          Ingredientes simples • Preparación rápida • Método personalizado
        </p>
      </div>
    </div>
  );
};

export default Landing;
