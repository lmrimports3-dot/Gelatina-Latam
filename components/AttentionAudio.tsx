import React, { useState, useRef, useEffect } from 'react';

const AUDIO_URL = "https://diplomatic-blush-gjqli2jfsx.edgeone.app/gelatina%20br_%20%7Bhappy%7DOi,%20tudo....mp3";

const AttentionAudio: React.FC<{ onNext: () => void }> = ({ onNext }) => {
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
    <div className="w-full min-h-screen bg-gradient-to-b from-[#6B2D5C] to-[#2D1226] flex flex-col items-center px-6 py-12 text-white overflow-hidden">
      <div className="w-full max-w-lg flex flex-col items-center">
        <h2 className="text-[26px] font-black text-center mb-8 leading-tight uppercase">
          🎧 Ouça o Especialista
        </h2>

        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#E91E63] shadow-2xl mb-8">
          <img 
            src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp" 
            alt="Especialista" 
            width="112"
            height="112"
            loading="lazy"
            className="w-full h-full object-cover" 
          />
        </div>

        <p className="text-[18px] font-bold text-center text-[#FFC107] mb-10 italic">
          "Antes de você ver seu protocolo, preciso conversar algo importante..."
        </p>

        {/* Custom Audio Player */}
        <div className="w-full bg-white/10 backdrop-blur-md rounded-[40px] p-8 border border-white/10 shadow-inner mb-12">
          <audio ref={audioRef} src={AUDIO_URL} onTimeUpdate={handleTimeUpdate} onEnded={() => setIsPlaying(false)} className="hidden" />
          
          <div className="flex flex-col items-center">
             <button onClick={togglePlay} className="w-20 h-20 bg-[#E91E63] rounded-full flex items-center justify-center text-white shadow-2xl active:scale-95 transition-all mb-6">
               {isPlaying ? (
                 <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
               ) : (
                 <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               )}
             </button>

             <div className="w-full space-y-2">
               <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-[#FFC107] transition-all" style={{ width: `${progress}%` }}></div>
               </div>
               <div className="flex justify-between text-[10px] font-black uppercase text-white/40 tracking-widest">
                 <span>0:00</span>
                 <span>1:47</span>
               </div>
             </div>
          </div>
        </div>

        <button onClick={onNext} className="w-full py-6 bg-[#FFC107] text-black font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-all uppercase">
          ACESSAR MEU PROTOCOLO AGORA 👉
        </button>
      </div>
    </div>
  );
};

export default AttentionAudio;