import React, { useState, useEffect } from 'react';

const Diagnosis: React.FC<{ userData: any, onNext: () => void }> = ({ userData, onNext }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const bmi = (userData.weight / ((userData.height/100) * (userData.height/100))).toFixed(1);
  
  const getBmiStatus = (v: number) => {
    // Lógica Anti-Normal: Se estiver abaixo de 24.9, entra em Alerta (Falso Magro)
    if (v < 24.9) return { l: "⚠️ Alerta: Inflamação Oculta (Falso Magro)", c: "text-orange-600" };
    if (v < 30) return { l: "Sobrepeso", c: "text-orange-500" };
    return { l: "Obesidade", c: "text-red-500" };
  };

  const status = getBmiStatus(parseFloat(bmi));

  const testimonials = [
    { img: "https://ik.imagekit.io/ekdmcxqtr/img_0136%20(3).png" },
    { img: "https://ik.imagekit.io/ekdmcxqtr/img_0136%20(2).png" },
    { img: "https://ik.imagekit.io/ekdmcxqtr/celebrity-proof-CMYKHlYT%20(1).jpg" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3500); // Intervalo de 3.5 segundos conforme solicitado
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center px-6 pt-10 pb-16 animate-fadeIn font-['Poppins']">
      <div className="w-full max-w-lg">
        {/* Headline Principal */}
        <h1 className="text-[28px] font-['Montserrat'] font-black text-center text-gray-900 leading-tight mb-8 uppercase tracking-tight">
          🎯 SEU DIAGNÓSTICO PERSONALIZADO
        </h1>

        {/* Resumo Biométrico Compacto */}
        <div className="bg-gray-50 rounded-[32px] p-6 mb-8 border border-gray-100 flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-4xl font-['Montserrat'] font-black text-[#6B2D5C] tracking-tighter">{bmi}</span>
            <p className="text-[11px] font-bold text-gray-400 uppercase">Seu IMC Atual</p>
          </div>
          <div className="text-right max-w-[60%]">
             <span className={`text-[14px] leading-tight font-black uppercase inline-block ${status.c}`}>{status.l}</span>
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Status Metabólico</p>
          </div>
        </div>

        {/* CARROSSEL DE FOCO TOTAL E EXCLUSIVO NA IMAGEM */}
        <div className="relative w-full mb-8">
          <div className="overflow-hidden rounded-[32px] shadow-2xl border border-gray-100 bg-white">
            <div 
              className="flex transition-transform duration-700 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((rev, i) => (
                <div key={i} className="min-w-full flex flex-col">
                  {/* Imagem como foco principal e único */}
                  <div className="aspect-[4/5] md:h-[450px] overflow-hidden bg-gray-50">
                    <img 
                      src={rev.img} 
                      alt={`Resultado ${i + 1}`} 
                      width="400"
                      height="500"
                      loading="lazy"
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores de slide */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-[#E91E63]' : 'w-2 bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Principal */}
        <button 
          onClick={onNext} 
          className="w-full py-6 btn-gradient text-white font-['Montserrat'] font-black text-xl rounded-2xl shadow-[0_15px_35px_rgba(233,30,99,0.3)] active:scale-95 transition-all uppercase flex items-center justify-center gap-2 group"
        >
          <span>CONTINUAR AO PROTOCOLO</span>
          <span className="group-hover:translate-x-1 transition-transform">👉</span>
        </button>
        
        <div className="mt-8 flex flex-col items-center gap-2 opacity-40">
           <div className="flex items-center gap-1">
             <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
             <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
             <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
           </div>
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
             Diagnóstico Seguro • Criptografia 256 bits
           </p>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;