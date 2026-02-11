
import React from 'react';
import { UserData } from '../types';

const ResultPage: React.FC<{ userData: UserData, onNext: () => void }> = ({ userData, onNext }) => {
  const heightInMeters = userData.height / 100;
  const bmiValue = parseFloat((userData.weight / (heightInMeters * heightInMeters)).toFixed(1));
  const dynamicTargetWeight = Math.round((heightInMeters * heightInMeters) * 21.7);
  
  const getBmiStatus = (v: number) => {
    if (v < 24.9) return { l: "⚠️ Alerta: Inflamação Oculta (Falso Magro)", c: "text-orange-600" };
    if (v < 30) return { l: "Sobrepeso", c: "text-orange-500" };
    return { l: "Obesidade", c: "text-red-500" };
  };

  const status = getBmiStatus(bmiValue);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-10 pb-16 animate-fadeIn font-['Poppins']">
      <div className="w-full max-w-lg">
        <h1 className="text-[26px] font-['Montserrat'] font-black text-center text-gray-900 leading-tight mb-8 uppercase tracking-tight">
          🎯 SEU DIAGNÓSTICO PERSONALIZADO
        </h1>

        {/* Biometria */}
        <div className="bg-gray-50 rounded-[32px] p-8 mb-8 border border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-5xl font-['Montserrat'] font-black text-[#8B3A8B] tracking-tighter">{bmiValue}</span>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seu IMC Atual</p>
          </div>
          <div className="text-right max-w-[60%]">
             <span className={`text-[15px] leading-tight font-black uppercase inline-block ${status.c}`}>{status.l}</span>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Status Metabólico</p>
          </div>
        </div>

        {/* Tipo de Barriga */}
        <div className="bg-emerald-50 border-2 border-emerald-500 p-8 rounded-[40px] shadow-[0_20px_40px_rgba(16,185,129,0.1)] mb-8">
           <h3 className="text-xs font-black text-emerald-600 tracking-widest uppercase mb-2">Seu Tipo de Barriga Identificado:</h3>
           <p className="text-2xl font-black text-gray-900 mb-4">{userData.bellyType || "Barriga Hormonal"}</p>
           <p className="text-[14px] font-medium text-gray-600 leading-relaxed">
             Com base em suas respostas, identificamos que seu metabolismo está bloqueado. Isso significa que dietas tradicionais dificilmente funcionariam para você. A boa notícia é que nosso protocolo foi especificamente desenhado para reverter esse tipo de inchaço.
           </p>
        </div>

        {/* Especialista */}
        <div className="bg-[#8B3A8B]/5 border border-[#8B3A8B]/10 p-8 rounded-[40px] mb-8">
           <div className="flex items-center gap-4 mb-6">
             <img src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp" className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md" alt="Carla" />
             <div>
               <p className="text-[16px] font-black text-gray-900">Carla Clemente</p>
               <p className="text-[10px] font-bold text-[#8B3A8B] uppercase tracking-widest">Especialista em Metabolismo Feminino</p>
             </div>
           </div>
           
           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
             <div className="absolute -top-2 left-6 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100"></div>
             <p className="text-[13px] font-bold text-gray-700 leading-relaxed italic">
               "Oi! Sou a Carla. Vi seu diagnóstico e quero te contar algo importante sobre seu tipo de barriga. Antes de você ver seu protocolo completo, preciso que você ouça um áudio meu. Tem apenas 2 minutos, mas pode mudar tudo para você."
             </p>
           </div>
        </div>

        <button 
          onClick={onNext} 
          className="w-full py-6 bg-[#FFD700] text-black font-['Montserrat'] font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-all uppercase"
        >
          OUÇA O ÁUDIO DA ESPECIALISTA
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
