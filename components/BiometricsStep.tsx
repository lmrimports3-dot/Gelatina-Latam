
import React, { useState, useEffect } from 'react';

interface BiometricsStepProps {
  onNext: (weight: number, height: number) => void;
}

const BiometricsStep: React.FC<BiometricsStepProps> = ({ onNext }) => {
  // Inicializamos com valores médios para facilitar o ajuste
  const [weight, setWeight] = useState<number>(70.0);
  const [height, setHeight] = useState<number>(1.65);

  const adjustWeight = (amount: number) => {
    setWeight(prev => Math.max(30, Math.min(250, parseFloat((prev + amount).toFixed(1)))));
  };

  const adjustHeight = (amount: number) => {
    setHeight(prev => Math.max(1.0, Math.min(2.5, parseFloat((prev + amount).toFixed(2)))));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(weight, height);
  };

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn text-center py-4">
      <h1 className="text-[22px] font-black text-[#4A148C] leading-tight mb-2 uppercase font-['Montserrat']">
        Vamos calcular seu Índice de Bloqueio Metabólico...
      </h1>
      <h2 className="text-[14px] text-[#555555] font-normal mb-8 font-['Montserrat'] px-4">
        Precisamos dessas medidas exatas para gerar seu protocolo personalizado.
      </h2>

      <form onSubmit={handleSubmit} className="w-full max-w-[420px] space-y-6">
        <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-gray-100 space-y-10">
          
          {/* Controle de Peso */}
          <div className="flex flex-col items-center">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block">
              Seu Peso Atual (kg)
            </label>
            <div className="flex items-center justify-between w-full bg-gray-50 p-2 rounded-full border border-gray-100">
              <button 
                type="button"
                onClick={() => adjustWeight(-0.5)}
                className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-3xl font-bold text-[#8B3A8B] active:scale-90 transition-transform"
              >
                −
              </button>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-[#4A148C] tracking-tighter">
                  {weight.toFixed(1).replace('.', ',')}
                </span>
                <span className="text-sm font-bold text-gray-400 uppercase">kg</span>
              </div>
              <button 
                type="button"
                onClick={() => adjustWeight(0.5)}
                className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-3xl font-bold text-[#8B3A8B] active:scale-90 transition-transform"
              >
                +
              </button>
            </div>
          </div>

          {/* Controle de Altura */}
          <div className="flex flex-col items-center">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block">
              Sua Altura (m)
            </label>
            <div className="flex items-center justify-between w-full bg-gray-50 p-2 rounded-full border border-gray-100">
              <button 
                type="button"
                onClick={() => adjustHeight(-0.01)}
                className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-3xl font-bold text-[#8B3A8B] active:scale-90 transition-transform"
              >
                −
              </button>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-[#4A148C] tracking-tighter">
                  {height.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm font-bold text-gray-400 uppercase">m</span>
              </div>
              <button 
                type="button"
                onClick={() => adjustHeight(0.01)}
                className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-3xl font-bold text-[#8B3A8B] active:scale-90 transition-transform"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-[#8B3A8B] opacity-80 pt-2 border-t border-gray-50">
            <span className="text-xl">🔒</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-left leading-tight">
              Seus dados são 100% confidenciais e criptografados.
            </span>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-6 bg-[#4CAF50] text-white font-['Montserrat'] font-black text-xl rounded-[24px] shadow-xl active:scale-95 transition-all uppercase"
        >
          CONTINUAR
        </button>

        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
          Usamos a fórmula oficial da OMS para este cálculo.
        </p>
      </form>
    </div>
  );
};

export default BiometricsStep;
