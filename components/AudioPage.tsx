
import React, { useState, useRef, useEffect } from 'react';

const AUDIO_URL = "https://diplomatic-blush-gjqli2jfsx.edgeone.app/gelatina%20br_%20%7Bhappy%7DOi,%20tudo....mp3";

const AudioPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(p);
  };

  return (
    <div className="w-full min-h-screen bg-[#8B3A8B]/5 flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-lg flex flex-col items-center">
        <h2 className="text-[20px] font-black text-center text-[#8B3A8B] mb-8 leading-tight uppercase font-['Montserrat']">
          🎧 OUÇA COM ATENÇÃO: Seu resultado é mais comum do que você imagina.
        </h2>

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#8B3A8B] shadow-2xl mb-10">
          <img 
            src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp" 
            alt="Carla Clemente" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="w-full bg-white rounded-[40px] p-8 shadow-2xl border border-white/50 mb-12">
          <audio ref={audioRef} src={AUDIO_URL} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} className="hidden" />
          
          <div className="flex flex-col items-center">
             <button onClick={togglePlay} className="w-20 h-20 bg-[#8B3A8B] rounded-full flex items-center justify-center text-white shadow-xl active:scale-95 transition-all mb-6">
               {isPlaying ? (
                 <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
               ) : (
                 <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               )}
             </button>

             <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-[#8B3A8B] transition-all" style={{ width: `${progress}%` }}></div>
             </div>
             <div className="flex justify-between w-full text-[10px] font-black uppercase text-gray-300 tracking-widest">
               <span>0:00</span>
               <span>1:47</span>
             </div>
          </div>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-6 bg-[#FFD700] text-black font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-all uppercase"
        >
          ACESSAR MEU PROTOCOLO AGORA
        </button>
      </div>
    </div>
  );
};

export default AudioPage;
