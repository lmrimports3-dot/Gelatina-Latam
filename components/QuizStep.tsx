
import React from 'react';

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface QuizStepProps {
  title: string;
  subtitle: string;
  type?: 'text' | 'gender' | 'grid';
  options?: Option[];
  onSelect: (val: string) => void;
}

const QuizStep: React.FC<QuizStepProps> = ({ title, subtitle, type = 'text', options, onSelect }) => {
  const containerClass = "w-full flex flex-col items-center animate-fadeIn text-center py-2";
  const titleClass = "text-[22px] md:text-[24px] font-black text-[#4A148C] leading-tight mb-2 uppercase font-['Montserrat'] px-2";
  const subtitleClass = "text-[14px] text-[#555555] font-medium mb-8 font-['Poppins'] px-4 leading-relaxed max-w-[90%]";
  const cardBaseClass = "bg-white border-2 border-gray-100 rounded-[28px] shadow-sm transition-all duration-300 active:scale-95 hover:border-[#8B3A8B]/40 hover:shadow-md flex flex-col items-center justify-center group";

  if (type === 'gender') {
    const genderOptions = [
      { label: 'Mulher', icon: '👩', value: 'Mulher' },
      { label: 'Homem', icon: '👨', value: 'Homem' },
      { label: 'Outro', icon: '👤', value: 'Outro' },
    ];

    return (
      <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        <h2 className={subtitleClass}>{subtitle}</h2>
        <div className="grid grid-cols-3 gap-4 w-full max-w-[440px]">
          {genderOptions.map((opt) => (
            <button 
              key={opt.label}
              onClick={() => onSelect(opt.value)}
              className={`${cardBaseClass} p-6 aspect-square`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {opt.icon}
              </div>
              <span className="text-[11px] font-black uppercase text-gray-700 tracking-wider font-['Montserrat']">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className={containerClass}>
        <h1 className={titleClass}>{title}</h1>
        <h2 className={subtitleClass}>{subtitle}</h2>
        <div className="grid grid-cols-2 gap-4 w-full max-w-[440px]">
          {options?.map((opt) => (
            <button 
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={`${cardBaseClass} p-8 aspect-square`}
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {opt.icon}
              </span>
              <span className="text-[14px] font-bold text-[#4A148C] font-['Montserrat'] uppercase tracking-tight">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <h1 className={titleClass}>{title}</h1>
      <h2 className={subtitleClass}>{subtitle}</h2>
      <div className="space-y-4 w-full max-w-[420px]">
        {options?.map((opt) => (
          <button 
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full p-5 rounded-[24px] border-2 border-gray-100 bg-white text-gray-700 font-bold text-[14px] leading-snug transition-all duration-300 active:scale-95 hover:border-[#8B3A8B]/30 hover:bg-purple-50/30 text-left flex items-center shadow-sm group"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mr-4 shrink-0 group-hover:bg-[#8B3A8B] group-hover:text-white transition-colors">
              <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-white"></div>
            </div>
            <span className="font-['Poppins'] font-semibold leading-tight">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizStep;
