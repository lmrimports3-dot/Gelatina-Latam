
import React, { useState, useRef, useEffect } from 'react';

interface AttentionAudioProps {
  onNext: () => void;
}

const AUDIO_URL = "https://diplomatic-blush-gjqli2jfsx.edgeone.app/gelatina%20br_%20%7Bhappy%7DOi,%20tudo....mp3";

const AttentionAudio: React.FC<AttentionAudioProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Tentativa de Autoplay (Truque de Bypass)
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay bloqueado pelo navegador. Aguardando interação.");
          setNeedsInteraction(true);
        }
      }
    };

    const timer = setTimeout(attemptAutoplay, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    if (isNaN(total) || total === 0) return;

    setProgress((current / total) * 100);
    setCurrentTime(current);
    setDuration(total);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
    if (needsInteraction) setNeedsInteraction(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full min-h-[100dvh] max-w-md mx-auto relative overflow-hidden bg-white flex flex-col items-center shadow-2xl">
      {/* Overlay de Interação (Bypass Autoplay) */}
      {needsInteraction && (
        <div 
          onClick={togglePlay}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center cursor-pointer"
        >
          <div className="bg-white rounded-full p-8 mb-6 animate-bounce shadow-[0_0_50px_rgba(147,51,234,0.5)]">
            <svg className="w-16 h-16 text-purple-600 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <h2 className="text-white text-2xl font-black mb-4 uppercase tracking-tight">
            🔊 CLIQUE PARA OUVIR A MENSAGEM DE CARLA
          </h2>
          <p className="text-white/70 font-bold">O áudio contém informações importantes sobre o seu diagnóstico.</p>
        </div>
      )}

      {/* Barra de Notificação Superior */}
      <div className="w-full bg-red-600 py-3 px-4 flex items-center justify-center gap-2 shadow-md relative z-20">
        <span className="text-white text-lg animate-pulse">⚠️</span>
        <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">
          ATENÇÃO: MENSAGEM CONFIDENCIAL
        </span>
      </div>

      <div className="w-full flex flex-col items-center px-6 pt-10 pb-20 flex-1 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-[1.1] mb-4">
            OUÇA COM ATENÇÃO: Seu resultado é mais comum do que você imagina.
          </h1>
          <p className="text-[15px] font-bold text-gray-700 leading-relaxed">
            A especialista Carla Clemente gravou uma mensagem rápida para você.
          </p>
        </div>

        {/* Player Container */}
        <div className="w-full bg-white border border-gray-100 rounded-[40px] p-8 mb-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col items-center">
          <audio 
            ref={audioRef}
            src={AUDIO_URL}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="hidden"
            preload="auto"
          />

          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-3 shadow-inner overflow-hidden border-2 border-purple-100">
               <img 
                src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp?updatedAt=1770818256097" 
                alt="Especialista Carla Clemente" 
                className="w-full h-full object-cover"
               />
            </div>
            <p className="text-[12px] font-black text-purple-600 uppercase tracking-widest">Especialista Carla Clemente</p>
          </div>

          {/* Botão de Play Central */}
          <button 
            onClick={togglePlay}
            className={`w-20 h-20 btn-gradient rounded-full flex items-center justify-center text-white shadow-xl active:scale-95 transition-all mb-8 ${!isPlaying ? 'animate-pulse' : ''}`}
          >
            {isPlaying ? (
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          {/* Barra de Progresso */}
          <div className="w-full space-y-3">
            <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <span>{formatTime(currentTime)}</span>
              <span>01:27</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 transition-all duration-300 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full mt-auto">
          <button 
            onClick={onNext}
            className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[18px] rounded-2xl shadow-[0_15px_45px_rgba(5,150,105,0.4)] transition-all uppercase flex items-center justify-center gap-2 animate-pulse-short"
          >
            <span>ACESSAR MEU PROTOCOLO AGORA</span>
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Acesso Imediato • Seguro</span>
          </div>
        </div>
      </div>

      <style>{`
        .animate-pulse-short {
          animation: pulse-short 2s infinite ease-in-out;
        }
        @keyframes pulse-short {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .btn-gradient {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
        }
      `}</style>
    </div>
  );
};

export default AttentionAudio;
