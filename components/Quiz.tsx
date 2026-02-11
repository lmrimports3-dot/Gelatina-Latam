
import React from 'react';

interface QuizProps {
  title: string;
  type?: 'text' | 'gender';
  options?: string[];
  onSelect: (val: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ title, type = 'text', options, onSelect }) => {
  if (type === 'gender') {
    const genderOptions = [
      { label: 'Mulher', icon: 'https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q07qytq07qytq07q.png?tr=w-100,h-100,cm-extract', border: 'border-[#8B3A8B]' },
      { label: 'Homem', icon: 'https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q07qytq07qytq07q.png?tr=w-100,h-100,cm-extract&grayscale=true', border: 'border-gray-200' },
      { label: 'Outro', icon: 'https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q07qytq07qytq07q.png?tr=w-100,h-100,cm-extract&grayscale=true', border: 'border-gray-200' },
    ];

    return (
      <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-12 pb-10">
        <div className="w-full max-w-lg">
          <h2 className="text-[22px] font-black text-gray-900 leading-tight mb-10 uppercase font-['Montserrat'] text-center">
            {title}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {genderOptions.map((opt) => (
              <button 
                key={opt.label}
                onClick={() => onSelect(opt.label)}
                className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all active:scale-95 ${opt.border}`}
              >
                <img src={opt.icon} alt={opt.label} className="w-12 h-12 mb-2 rounded-full" />
                <span className="text-[12px] font-bold text-gray-700">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-12 pb-10">
      <div className="w-full max-w-lg">
        <h2 className="text-[22px] font-black text-gray-900 leading-tight mb-10 uppercase font-['Montserrat'] text-center">
          {title}
        </h2>
        <div className="space-y-4">
          {options?.map((opt) => (
            <button 
              key={opt}
              onClick={() => onSelect(opt)}
              className="w-full py-5 px-6 rounded-2xl border-2 border-gray-100 bg-white text-gray-700 font-bold text-[14px] leading-snug transition-all active:scale-95 hover:border-[#8B3A8B]/30"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
