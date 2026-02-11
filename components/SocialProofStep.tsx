
import React, { useEffect } from 'react';

const SocialProofStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 8000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn text-center py-2">
      <h1 className="text-[18px] font-black text-[#4A148C] leading-tight mb-8 uppercase font-['Montserrat'] px-4">
        Enquanto calculamos, veja o que aconteceu com a Márcia, de 47 anos...
      </h1>

      <div className="w-full max-w-[320px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-emerald-50 bg-emerald-50 p-4 mb-8">
        <img 
          src="https://ik.imagekit.io/ekdmcxqtr/resultado03.jpg?updatedAt=1770311728413" 
          alt="Resultado da Márcia" 
          className="w-full h-auto rounded-2xl" 
        />
      </div>

      <div className="flex flex-col items-center gap-2">
         <div className="w-8 h-8 border-4 border-[#8B3A8B]/10 border-t-[#8B3A8B] rounded-full animate-spin"></div>
         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Calculando seu potencial...</p>
      </div>
    </div>
  );
};

export default SocialProofStep;
