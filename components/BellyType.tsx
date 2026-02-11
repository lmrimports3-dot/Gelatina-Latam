
import React from 'react';

const BellyType: React.FC<{ onSelect: (val: string) => void }> = ({ onSelect }) => {
  const options = [
    { label: "Barriga de Estresse", img: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_8yi5ld8yi5ld8yi5.png" },
    { label: "Barriga Hormonal", img: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q6lbyyq6lbyyq6lb.png" },
    { label: "Barriga de Intestino", img: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_98lft398lft398lf.png" },
    { label: "Barriga Noturna", img: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_b949q9b949q9b949.png" }
  ];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-12 pb-10">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-[22px] font-black text-gray-900 leading-tight mb-10 uppercase font-['Montserrat']">
          Qual destes tipos de barriga mais se parece com a sua?
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {options.map((opt) => (
            <button 
              key={opt.label}
              onClick={() => onSelect(opt.label)}
              className="flex flex-col border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#8B3A8B] transition-all active:scale-95 text-left"
            >
              <div className="aspect-square bg-gray-50 p-2">
                <img src={opt.img} alt={opt.label} className="w-full h-full object-contain" />
              </div>
              <div className="p-3 text-center">
                <p className="text-[11px] font-black uppercase text-gray-700">{opt.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BellyType;
