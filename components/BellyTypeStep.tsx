
import React from 'react';

const BellyTypeStep: React.FC<{ onSelect: (val: string) => void }> = ({ onSelect }) => {
  const options = [
    { 
      label: "Barriga de Estresse", 
      img: "https://ik.imagekit.io/ekdmcxqtr/barriga_estresse.png"
    },
    { 
      label: "Barriga Hormonal", 
      img: "https://ik.imagekit.io/ekdmcxqtr/barriga_hormonal.png"
    },
    { 
      label: "Barriga de Intestino", 
      img: "https://ik.imagekit.io/ekdmcxqtr/barriga_intestino.png"
    },
    { 
      label: "Barriga Noturna", 
      img: "https://ik.imagekit.io/ekdmcxqtr/barriga_noturna.png"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn text-center py-4">
      <h1 className="text-[22px] md:text-[24px] font-black text-[#4A148C] leading-tight mb-2 uppercase font-['Montserrat'] px-2">
        Como é a sua barriga?
      </h1>
      <h2 className="text-[14px] text-[#555555] font-medium mb-8 font-['Poppins'] px-4 leading-relaxed max-w-[90%]">
        Selecione a imagem que mais se parece com você no final do dia.
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-[540px]">
        {options.map((opt) => (
          <button 
            key={opt.label}
            onClick={() => onSelect(opt.label)}
            className="flex flex-col rounded-[32px] border-2 border-gray-100 bg-white shadow-sm transition-all duration-300 active:scale-95 hover:shadow-md group border-transparent hover:border-[#8B3A8B]/40 overflow-hidden aspect-[1/1.2]"
          >
            {/* Imagem (70% da altura) */}
            <div className="w-full h-[70%] overflow-hidden bg-gray-50">
              <img 
                src={opt.img} 
                alt={opt.label} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            
            {/* Área de Texto (30% da altura) */}
            <div className="w-full h-[30%] flex flex-col justify-center items-center p-3 bg-white border-t border-gray-50">
              <p className="text-[13px] font-black text-[#4A148C] leading-tight font-['Montserrat'] uppercase tracking-tight">
                {opt.label}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BellyTypeStep;
