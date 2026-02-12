
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
  const [trackedHalf, setTrackedHalf] = useState(false);
  const [trackedFull, setTrackedFull] = useState(false);
  const [trackedStarted, setTrackedStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playStartTimeRef = useRef<number | null>(null);

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
      const d = audioRef.current.duration;
      if (Number.isFinite(d)) {
        setDuration(d);
      }
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
      
      playStartTimeRef.current = Date.now() - (audioRef.current.currentTime * 1000);

      if (!trackedStarted) {
        trackCustom('AudioStarted');
        setTrackedStarted(true);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleFinalNext = () => {
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
    <div className="w-full min-h-screen relative overflow-hidden bg-white flex flex-col items-center">
      {/* Background Decorativo */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-20 -left-10 w-64 h-64 border-8 border-purple-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 border-[20px] border-blue-50 rotate-45 blur-2xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-50 rounded-lg blur-3xl"></div>
      </div>

      {/* Barra de Notificação Superior */}
      <div className="w-full bg-red-600 py-3 px-4 flex items-center justify-center gap-2 shadow-md relative z-20">
        <span className="text-white text-lg animate-pulse">⚠️</span>
        <span className="text-white text-[11px] font-black uppercase tracking-[0.2em]">
          ATENÇÃO: MENSAGEM CONFIDENCIAL
        </span>
      </div>

      <div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 pt-12 pb-20 flex-1 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4 px-2">
            OUÇA COM ATENÇÃO: Seu resultado é mais comum do que você imagina.
          </h1>
          <p className="text-[15px] font-bold text-gray-700 leading-relaxed px-2">
            A especialista Carla Clemente gravou uma mensagem rápida para você.
          </p>
        </div>

        {/* Card Flutuante com Glassmorphism */}
        <div className="w-full backdrop-blur-xl bg-white/40 border border-white/60 rounded-[40px] p-10 mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center transition-all duration-500 hover:shadow-[0_25px_60px_rgba(147,51,234,0.15)]">
          <audio 
            ref={audioRef}
            src={AUDIO_URL}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
            preload="auto"
          />

          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-3 shadow-inner overflow-hidden border-2 border-purple-200">
               <img 
                src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp?updatedAt=1770818256097" 
                alt="Especialista Carla Clemente" 
                className="w-full h-full object-cover"
               />
            </div>
            <p className="text-sm font-black text-purple-600 uppercase tracking-widest">Especialista Carla Clemente</p>
          </div>

          {/* Botão de PLAY */}
          <div className="relative mb-8">
            <div className={`absolute inset-0 bg-purple-500 rounded-full blur-xl transition-all duration-1000 ${isPlaying ? 'opacity-20 scale-150' : 'opacity-40 animate-pulse-slow'}`}></div>
            <button 
              onClick={togglePlay}
              className={`w-24 h-24 btn-gradient rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 transition-all relative overflow-hidden group ${!isPlaying ? 'animate-vibrate' : ''}`}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {isPlaying ? (
                <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-10 h-10 fill-current ml-2" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
          </div>

          <p className="text-[11px] font-bold text-gray-400 mb-6 flex items-center gap-1">
             <span>🔊 O áudio iniciará automaticamente</span>
          </p>

          {/* Visualização de Onda Sonora */}
          <div className="w-full flex items-center justify-center gap-1.5 h-12 mb-6">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 rounded-full bg-gradient-to-t from-purple-400 to-pink-500 transition-all duration-300 ${isPlaying ? 'animate-waveform' : 'h-3 opacity-30'}`}
                style={{ 
                  height: isPlaying ? `${Math.random() * 100}%` : '12px',
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            ))}
          </div>

          <div className="w-full space-y-3">
            <div className="flex justify-between text-[11px] font-black text-purple-600/60 uppercase tracking-widest">
              <span className="tabular-nums">{formatTime(currentTime)}</span>
              <span className="tabular-nums">01:27</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200/50 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-purple-600 transition-all duration-300 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-6">
          <button 
            onClick={handleFinalNext}
            className="w-full py-6 rounded-2xl font-black text-lg shadow-2xl transition-all uppercase flex items-center justify-center gap-2 btn-gradient text-white hover:scale-[1.02] active:scale-95 animate-bounce-short"
          >
            <span>ACESSAR MEU PROTOCOLO AGORA</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
          
          <div className="flex items-center gap-2 opacity-40">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Início Imediato</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes vibrate {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
        @keyframes waveform {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s infinite ease-in-out;
        }
        .animate-vibrate {
          animation: vibrate 0.5s infinite linear;
        }
        .animate-waveform {
          animation: waveform 0.8s infinite ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AttentionAudio;
