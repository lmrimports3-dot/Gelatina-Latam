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
          ⏰ DIAGNÓSTICO RÁPIDO - VÁLIDO APENAS HOJE
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-4 pb-8 max-w-lg w-full">
        {/* Main Image - Optimized Height & Performance */}
        <div className="w-full max-h-[180px] sm:max-h-[220px] mb-3 overflow-hidden rounded-2xl shadow-xl border border-white/10">
          <img 
            src="https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q07qytq07qytq07q.png?tr=w-650,f-webp,q-80" 
            alt="Alerta" 
            width="512"
            height="220"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover float-animation"
          />
        </div>

        {/* Headline - Refined typography for readability and space */}
        <h1 className="text-[22px] font-black text-center leading-[1.3] mb-2 text-[#E91E63] drop-shadow-md">
          ALERTA: <span className="text-white">Você apresenta algum destes 4 sinais de 'Intoxicação Metabólica'?</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] font-medium text-center text-gray-300 mb-5 leading-snug">
          Selecione o que você sente e descubra por que você não consegue emagrecer<br/>
          (Mesmo comendo pouco e se exercitando)
        </p>

        {/* Options - Compacted padding for "Slim" look */}
        <div className="w-full space-y-2.5 mb-5">
          {[
            { id: '1', icon: '😴', text: 'Acordo com barriga chapada, mas termino estufada', sub: '(Mesmo comendo normal)' },
            { id: '2', icon: '😤', text: 'Já tentei TUDO: dieta, exercício, chás, remédios...', sub: '(Nada funciona mais)' },
            { id: '3', icon: '🔥', text: 'Meu metabolismo desacelerou depois dos 30', sub: '(Antes emagrecia rápido, agora é impossível)' },
            { id: '4', icon: '💊', text: 'Tenho medo de agulhas/Ozempic/remédios', sub: '(Quero algo natural e seguro)' }
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
          ⏱ Leva 90 segundos • Resultado Personalizado • Sem Spam
        </p>
      </div>

      {/* Footer minimal info */}
      <div className="w-full py-3 text-center border-t border-white/5 bg-black/50">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-tighter italic">
          O TRUQUE DA GELATINA NOTURNA
        </p>
      </div>
    </div>
  );
};

export default Landing;