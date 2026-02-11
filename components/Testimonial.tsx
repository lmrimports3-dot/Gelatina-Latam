
import React, { useEffect } from 'react';

const Testimonial: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 7000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-lg flex flex-col items-center text-center">
        <h2 className="text-[20px] font-black text-gray-900 leading-tight mb-10 uppercase font-['Montserrat']">
          Veja o que aconteceu com a Márcia em 1 semana...
        </h2>

        <div className="w-full rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 bg-emerald-50 p-6">
          <img 
            src="https://ik.imagekit.io/ekdmcxqtr/celebrity-proof-CMYKHlYT%20(1).jpg" 
            alt="11_depoimento_marcia" 
            className="w-full h-auto rounded-3xl" 
          />
        </div>

        <div className="mt-12 flex flex-col items-center gap-2">
           <div className="w-8 h-8 border-4 border-[#8B3A8B]/20 border-t-[#8B3A8B] rounded-full animate-spin"></div>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sincronizando depoimentos...</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
