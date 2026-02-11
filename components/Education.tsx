
import React, { useEffect } from 'react';

const Education: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full min-h-screen bg-[#8B3A8B]/5 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-lg flex flex-col items-center text-center">
        <h2 className="text-[24px] font-black text-[#8B3A8B] leading-tight mb-8 uppercase font-['Montserrat']">
          Você Sabia?
        </h2>

        <div className="w-full aspect-video rounded-[32px] overflow-hidden shadow-lg mb-10 border-4 border-white">
          <img 
            src="https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q07qytq07qytq07q.png" 
            alt="09_mulher_dormindo" 
            className="w-full h-full object-cover" 
          />
        </div>

        <p className="text-[17px] font-bold text-gray-800 leading-relaxed px-4">
          Uma noite de sono ruim pode aumentar em até 30% a inflamação no seu corpo, fazendo sua barriga inchar e acumular gordura, mesmo que você coma pouco.
        </p>
        
        <div className="mt-12 flex flex-col items-center gap-2">
           <div className="w-8 h-8 border-4 border-[#8B3A8B]/20 border-t-[#8B3A8B] rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aguarde um momento...</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
