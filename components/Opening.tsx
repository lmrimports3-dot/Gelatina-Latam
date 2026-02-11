
import React from 'react';

const Opening: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="w-full flex flex-col items-center text-center animate-fadeIn py-2">
      <h1 className="text-[20px] md:text-[24px] font-black text-[#4A148C] mb-3 font-['Montserrat'] uppercase leading-tight">
        Finalmente Revelado: O <span className="text-[#8B3A8B]">Ritual Noturno</span> Japonês de 10 Segundos que Desincha a Barriga de Mulheres Enquanto Elas Dormem
      </h1>

      <h2 className="text-[14px] font-normal text-[#555555] mb-5 leading-relaxed max-w-[90%] font-['Montserrat']">
        Descubra qual dos 3 Tipos de <span className="text-[#8B3A8B] font-bold">"Inchaço Hormonal"</span> está impedindo você de emagrecer (e como reverter isso hoje, sem dietas ou exercícios).
      </h2>

      <div className="w-full mb-6 flex justify-center">
        <img 
          src="https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_k24e9tk24e9tk24e%20(1).png" 
          alt="Ritual Noturno Japonês" 
          className="w-full max-h-[55vh] h-auto object-cover rounded-2xl shadow-lg border-4 border-[#8B3A8B]/10"
          fetchPriority="high"
        />
      </div>

      <button 
        onClick={onNext}
        className="w-full py-5 bg-[#FFD700] text-black font-black text-lg rounded-2xl shadow-[0_10px_30px_rgba(255,215,0,0.4)] active:scale-95 transition-all uppercase mb-3"
      >
        COMEÇAR DIAGNÓSTICO GRATUITO
      </button>

      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        ⏰ Leva 60 segundos | ✅ 100% Gratuito e Confidencial
      </p>
    </div>
  );
};

export default Opening;
