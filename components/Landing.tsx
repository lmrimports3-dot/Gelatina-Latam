import React from 'react';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#6B2D5C] to-black flex flex-col items-center text-white overflow-hidden">
      {/* Top Scarcity */}
      <div className="w-full bg-[#FFC107] py-1.5 px-4 text-center">
        <p className="text-[9px] font-black text-black uppercase tracking-widest">
          ⏰ DIAGNÓSTICO RÁPIDO - VÁLIDO SÓLO POR HOY
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-4 pb-8 max-w-lg w-full">
        {/* Main Image - Optimized Height & Performance (LCP) */}
        <div className="w-full max-h-[180px] sm:max-h-[220px] mb-3 overflow-hidden rounded-2xl shadow-xl border border-white/10">
          <img 
            src="https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q07qytq07qytq07q.png?tr=w-650,f-webp,q-80" 
            alt="Alerta de Intoxicación Metabólica" 
            width="650"
            height="220"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover float-animation"
          />
        </div>

        {/* Headline - Refined typography for readability and space */}
        <h1 className="text-[22px] font-black text-center leading-[1.3] mb-2 text-[#E91E63] drop-shadow-md">
          ALERTA: <span className="text-white">¿Presentás alguno de estos 4 signos de 'Intoxicación Metabólica'?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] font-medium text-center text-gray-300 mb-5 leading-snug">
          Seleccioná lo que sentís y descubrí por qué no podés bajar de peso<br/>
          (Incluso comiendo poco y haciendo ejercicio)
        </p>

        {/* Options - Compacted padding for "Slim" look */}
        <div className="w-full space-y-2.5 mb-5">
          {[
            { id: '1', icon: '😴', text: 'Me despierto con la panza chata, pero termino hinchada', sub: '(Incluso comiendo normal)' },
            { id: '2', icon: '😤', text: 'Ya probé TODO: dieta, ejercicio, tés, remedios...', sub: '(Nada parece funcionar)' },
            { id: '3', icon: '🔥', text: 'Mi metabolismo se frenó después de los 30', sub: '(Antes bajaba rápido, ahora es imposible)' },
            { id: '4', icon: '💊', text: 'Tengo miedo a las agujas / Ozempic / remedios', sub: '(Busco algo natural y seguro)' }
          ].map((opt) => (
            <button 
              key={opt.id}
              onClick={onNext}
              className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 py-2.5 px-4 rounded-xl text-left transition-all active:scale-[0.98]"
            >
              <span className="text-2xl shrink-0">{opt.icon}</span>
              <div className="flex-1">
                <p className="text-[12px] font-bold text-white leading-tight">{opt.text}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{opt.sub}</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center">
          ⏱ Lleva 90 segundos • Resultado Personalizado • Sin Spam
        </p>
      </div>

      {/* Footer minimal info */}
      <div className="w-full py-3 text-center border-t border-white/5 bg-black/50">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-tighter italic">
          EL TRUCO DE LA GELATINA NOCTURNA
        </p>
      </div>
    </div>
  );
};

export default Landing;