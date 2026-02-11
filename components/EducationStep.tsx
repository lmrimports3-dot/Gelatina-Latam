
import React, { useEffect } from 'react';

const EducationStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 7000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn text-center py-2">
      <h1 className="text-[20px] font-black text-[#4A148C] leading-tight mb-6 uppercase font-['Montserrat']">
        Você Sabia? A Causa do Inchaço Persistente NÃO é o que Você Come.
      </h1>

      <div className="w-full max-w-[300px] aspect-video rounded-3xl overflow-hidden shadow-lg mb-6 border-4 border-white">
        <img 
          src="https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q07qytq07qytq07q.png" 
          alt="Info" 
          className="w-full h-full object-cover" 
        />
      </div>

      <p className="text-[14px] font-normal text-[#555555] leading-relaxed px-2 font-['Montserrat'] mb-8">
        Pesquisas recentes de <span className="text-[#8B3A8B] font-bold">Harvard</span> mostram que, após os 40, seu corpo entra em modo de "estocagem de gordura" durante a noite. O resultado? Você acorda mais inchada, cansada e com o metabolismo travado.
      </p>
      
      <div className="flex flex-col items-center gap-2">
         <div className="w-8 h-8 border-4 border-[#8B3A8B]/10 border-t-[#8B3A8B] rounded-full animate-spin"></div>
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] font-['Montserrat']">Processando dados científicos...</p>
      </div>
    </div>
  );
};

export default EducationStep;
