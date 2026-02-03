
import React, { useEffect, useState } from 'react';

interface LoadingResultProps {
  onComplete: () => void;
}

const STEPS = [
  "Analisando suas respostas...",
  "Comparando perfis metabólicos...",
  "Calculando doses de gelatina...",
  "Finalizando seu plano personalizado..."
];

const LoadingResult: React.FC<LoadingResultProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center px-6 py-20 min-h-screen animate-fadeIn">
      {/* Circular Spinner */}
      <div className="relative w-24 h-24 mb-10">
        <svg className="w-full h-full animate-spin">
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray="264"
            strokeDashoffset="80"
            className="text-purple-500"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Headline */}
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2 px-4">
          Preparando seu protocolo personalizado...
        </h2>
        <p className="text-[15px] font-bold text-purple-400">
          Preparando a receita ideal da **Gelatina Noturna** para você...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
          <div 
            className="h-full bg-purple-500 transition-all duration-150 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs font-black text-gray-500">{progress}%</span>
      </div>

      {/* Dynamic Cycling Message */}
      <div className="mt-12 h-6">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">
          {STEPS[stepIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoadingResult;
