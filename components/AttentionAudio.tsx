
import React, { useState, useRef, useEffect } from 'react';

interface AttentionAudioProps {
  onNext: () => void;
}

const AUDIO_URL = "https://diplomatic-blush-gjqli2jfsx.edgeone.app/gelatina%20br_%20%7Bhappy%7DOi,%20tudo....mp3";

// AttentionAudio component to be used in App.tsx
const AttentionAudio: React.FC<AttentionAudioProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false); 
  const [trackedHalf, setTrackedHalf] = useState(false);
  const [trackedFull, setTrackedFull] = useState(false);
  const [trackedStarted, setTrackedStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const trackCustom = (eventName: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).fbq) (window as any).fbq('trackCustom', eventName);
      if ((window as any).dataLayer) (window as any).dataLayer.push({ event: eventName.toLowerCase() });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    
    if (isNaN(total) || total === 0) return;

    const percent = (current / total) * 100;
    setProgress(percent);
    setCurrentTime(current);
    setDuration(total);

    // Liberar botão faltando 10 segundos
    if (total > 0 && current >= total - 10 && !isUnlocked) {
      setIsUnlocked(true);
    }

    if (percent >= 50 && !trackedHalf) {
      trackCustom('AudioHalf');
      setTrackedHalf(true);
    }

    if (percent >= 99 && !trackedFull) {
      trackCustom('AudioCompleted');
      setTrackedFull(true);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Erro ao reproduzir áudio:", err);
      });
      if (!trackedStarted) {
        trackCustom('AudioStarted');
        setTrackedStarted(true);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleFinalNext = () => {
    if (!isUnlocked) return;
    if (typeof window !== 'undefined') {
      if ((window as any).fbq) (window as any).fbq('track', 'ViewContent');
      if ((window as any).dataLayer) (window as any).dataLayer.push({ event: 'audio_cta_clicked' });
    }
    onNext();
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-10 min-h-screen animate-fadeIn bg-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 px-2">
          Atenção
        </h1>
        <p className="text-[15px] font-bold text-gray-700 leading-relaxed mb-4 px-2">
          Escute com atenção a mensagem abaixo para finalizar seu perfil.
        </p>
      </div>

      <div className="w-full bg-gray-50 border border-gray-100 rounded-[32px] p-8 mb-10 shadow-sm flex flex-col items-center">
        <audio 
          ref={audioRef}
          src={AUDIO_URL}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="hidden"
          preload="auto"
        />

        <button 
          onClick={togglePlay}
          className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all mb-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          {isPlaying ? (
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        <div className="w-full space-y-2">
          <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : "0:46"}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-purple-600 transition-all duration-300 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <button 
          onClick={handleFinalNext}
          disabled={!isUnlocked}
          className={`w-full py-6 rounded-2xl font-black text-lg shadow-2xl transition-all uppercase flex items-center justify-center gap-2 btn-gradient text-white hover:scale-[1.02] active:scale-95 ${!isUnlocked ? 'opacity-50 cursor-not-allowed filter grayscale' : 'animate-bounce-short'}`}
        >
          <span>Continuar</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>
        {!isUnlocked && (
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
            O botão será liberado ao final do áudio
          </p>
        )}
      </div>

      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AttentionAudio;
