
import React, { useEffect, useRef } from 'react';

const SpecialistAudioStep: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Tenta iniciar o áudio automaticamente
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Navegadores podem bloquear o autoplay se não houver interação prévia
          console.log("Autoplay bloqueado pelo navegador:", error);
        });
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn text-center py-4 px-4">
      <h1 className="text-[22px] font-black text-[#4A148C] leading-tight mb-2 uppercase font-['Montserrat']">
        OUÇA COM ATENÇÃO: Seu resultado é mais comum do que você imagina.
      </h1>
      <h2 className="text-[14px] text-[#555555] font-normal mb-8 font-['Montserrat']">
        A especialista Carla Clemente gravou uma mensagem rápida para você.
      </h2>

      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#8B3A8B] shadow-lg mb-8 bg-white">
        <img 
          src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp" 
          alt="Especialista Carla Clemente" 
          className="w-full h-full object-cover" 
        />
      </div>

      <div className="w-full max-w-sm mb-10 bg-white/40 p-5 rounded-[32px] border border-white shadow-sm">
        <audio 
          ref={audioRef} 
          src="https://diplomatic-blush-gjqli2jfsx.edgeone.app/gelatina%20br_%20%7Bhappy%7DOi,%20tudo....mp3" 
          controls 
          autoPlay
          className="w-full"
        />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3 font-['Montserrat']">
          🔊 O áudio iniciará automaticamente
        </p>
      </div>

      <button 
        onClick={onComplete}
        className="w-full py-6 bg-[#FFD700] text-black font-black text-lg rounded-2xl shadow-[0_10px_30px_rgba(255,215,0,0.3)] active:scale-95 transition-all uppercase"
      >
        ACESSAR MEU PROTOCOLO AGORA
      </button>
    </div>
  );
};

export default SpecialistAudioStep;
