
import React, { useState, useEffect } from 'react';

interface ResultAnalysisProps {
  userData: {
    name: string;
    weight: number;
    height: number;
    targetWeight: number;
  };
  onNext: () => void;
}

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/dpCTw65YospDkrg0ZDRd";

const ResultAnalysis: React.FC<ResultAnalysisProps> = ({ userData }) => {
  const name = userData?.name || 'Amiga';
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckoutClick = () => {
    try {
      const url = new URL(CHECKOUT_URL);
      const currentParams = new URLSearchParams(window.location.search);
      
      // Append all current UTMs and tracking params to the checkout URL
      currentParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });

      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    } catch (e) {
      // Fallback in case of URL parsing issues
      window.open(CHECKOUT_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center bg-[#fcfcfc] min-h-screen animate-fadeIn pb-20">
      {/* Main Headline */}
      <div className="text-center px-6 mb-2 mt-6">
        <h1 className="text-2xl font-black text-gray-900 leading-tight">
          <span className="text-purple-600 lowercase">{name}</span>, ¡tu plan fue generado!
        </h1>
        <p className="text-[13px] text-gray-500 font-bold mt-2 leading-relaxed max-w-[280px] mx-auto">
          Es exclusivo y generado solo una vez, no salgas de esta página para no perderlo.
        </p>
      </div>

      {/* Plan Card */}
      <div className="w-full px-4 mt-6">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-4">
            Tu plan: <span className="text-purple-600">PLAN VITALICIO</span>
          </h2>
          <p className="text-[13px] text-gray-500 text-center leading-relaxed mb-8 px-2 font-bold">
            <span className="lowercase">{name}</span>, de acuerdo con tu perfil y objetivo, vas a llegar a tu cuerpo ideal en 4 semanas con **La Gelatina Correcta**.
          </p>

          {/* Progress Path */}
          <div className="w-full relative px-4 mb-4">
            <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 w-full opacity-30"></div>
            </div>
            <div className="flex justify-between items-center relative z-10">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-black text-purple-600">25%</span>
                <div className="w-3 h-3 bg-purple-600 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-black text-purple-600">50%</span>
                <div className="w-3 h-3 bg-purple-600 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-black text-purple-600">75%</span>
                <div className="w-3 h-3 bg-purple-600 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs shadow-lg border-2 border-white -mt-3">🎯</div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between px-2 text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-4">
            <span className="w-16 text-center">Primeros resultados</span>
            <span className="w-16 text-center">-3 kg</span>
            <span className="w-16 text-center">Pérdida de 5 a 7 kg</span>
            <span className="w-16 text-center">Pérdida de 9 a 12 kg</span>
          </div>
        </div>
      </div>

      {/* Kit Section */}
      <div className="w-full px-4 mt-4">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 flex flex-col items-center">
          <h2 className="text-xl font-black text-gray-900 mb-8 uppercase">¡Tu KIT PERSONALIZADO!</h2>
          
          <div className="bg-white rounded-3xl mb-8 w-full flex items-center justify-center overflow-hidden">
            <img 
              src="https://ik.imagekit.io/ekdmcxqtr/criativo_argentina_produto_digital_premium.jpg" 
              alt="Kit La Gelatina Correcta" 
              className="w-full h-auto object-contain rounded-2xl shadow-xl float-animation"
            />
          </div>

          <div className="text-center mb-8">
            <h3 className="text-sm font-black text-gray-900 leading-none mb-1">APP PROTOCOLO COMPLETO</h3>
            <p className="text-xs font-bold text-purple-600 uppercase">ACCESO VITALICIO</p>
          </div>

          {/* Checklist */}
          <div className="w-full space-y-3 mb-8">
            {[
              "Receta completa de **La Gelatina Correcta**",
              "Protocolo de 30 días paso a paso",
              "Lista de compras de los ingredientes",
              "Tips para acelerar resultados",
              "Acceso vitalicio a la app"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-purple-600 text-sm">✓</span>
                <span className="text-xs font-bold text-gray-700">{item}</span>
              </div>
            ))}
          </div>

          {/* Bonuses */}
          <div className="w-full space-y-2 mb-10">
            {[
              "BONUS: Dietas completas",
              "BONUS: Recetas dulces saludables",
              "BONUS: Plan de 21 días de pilates en la pared en casa"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-pink-500 text-sm mt-0.5">🎁</span>
                <span className="text-xs font-black text-purple-600">{item}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <p className="text-[10px] font-black text-gray-400 uppercase line-through mb-1">TODO ESTO DE US$ 19.90</p>
            <p className="text-[10px] font-black text-gray-500 uppercase">POR APENAS</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl font-black text-purple-600">US$</span>
              <span className="text-5xl font-black text-purple-600 tracking-tighter">2.99</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 mt-1">O US$ 2.99 AL CONTADO</p>
          </div>

          {/* CTA 1 */}
          <button onClick={handleCheckoutClick} className="w-full py-5 bg-[#d946ef] hover:bg-[#c026d3] text-white font-black text-lg rounded-2xl shadow-xl shadow-purple-100 active:scale-95 transition-all mb-4">
            Comprar La Gelatina Correcta
          </button>
        </div>
      </div>

      {/* Timer Section */}
      <div className="w-full px-4 mt-6">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⏰</span>
            <span className="text-xs font-bold text-gray-800">Tu plan vence en:</span>
          </div>
          <span className="text-3xl font-black text-red-500 tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Secondary CTA */}
      <div className="w-full px-4 mt-6">
        <button onClick={handleCheckoutClick} className="w-full py-5 bg-[#d946ef] text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all">
          Quiero mi gelatina
        </button>
      </div>

      {/* Social Proof Text */}
      <p className="mt-8 text-sm font-black text-gray-900 flex items-center gap-2">
        Quien lo usa tiene resultados 😍 🔥
      </p>

      {/* Guarantee Section */}
      <div className="w-full px-4 mt-8">
        <div className="bg-[#fff9e6] rounded-[32px] border border-[#ffecb3] p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-white font-black text-2xl mb-4 shadow-lg">30</div>
          <h3 className="text-lg font-black text-gray-900 mb-3">Garantía de Reembolso</h3>
          <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(s => <span key={s} className="text-orange-400 text-lg">★</span>)}
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium mb-6">
            Todo producto está obligado a dar al menos 7 días de garantía, pero confiamos tanto en la fórmula que ofrecemos <span className="font-bold">30 días corridos</span>.
          </p>
          <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
            O sea, si no te gusta o no podés bajar ni siquiera 7 kg en el primer mes de uso, nosotros te reembolsamos cada centavo que pagaste, sin preguntas.
          </p>
        </div>
      </div>

      {/* Final Button Loop */}
      <div className="w-full px-4 mt-10">
        <button onClick={handleCheckoutClick} className="w-full py-5 bg-[#d946ef] text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all">
          Comprar La Gelatina Correcta
        </button>
      </div>

      {/* Expert Endorsement */}
      <div className="w-full px-4 mt-10">
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-purple-100">
                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200" alt="Dra" className="w-full h-full object-cover" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Plan generado por:</p>
            <h4 className="text-sm font-black text-gray-900">Dra. Beatriz Viana</h4>
            <p className="text-[10px] font-bold text-gray-500">Nutricionista • MN-BA 08-7734</p>
        </div>
      </div>

      {/* CTA Final */}
      <div className="w-full px-4 mt-10">
        <button onClick={handleCheckoutClick} className="w-full py-5 bg-[#d946ef] text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all">
          Comprar La Gelatina Correcta
        </button>
      </div>

      {/* Testimonials */}
      <div className="w-full px-4 mt-10 space-y-4">
        <h3 className="text-center font-black text-gray-900 uppercase tracking-widest text-xs mb-6">Testimonios</h3>
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
            <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(s => <span key={s} className="text-orange-400 text-xs">★</span>)}
            </div>
            <p className="text-sm font-black text-gray-900 mb-1">Larissa Antunes</p>
            <p className="text-[11px] text-gray-600 font-medium">"¡Bajé 9 kg y finalmente volví a usar mis pantalones talle 38! **La Gelatina Correcta** es mágica, no siento más ese hambre de león a la tarde. Práctica y barata."</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100">
            <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(s => <span key={s} className="text-orange-400 text-xs">★</span>)}
            </div>
            <p className="text-sm font-black text-gray-900 mb-1">Simone Alencar</p>
            <p className="text-[11px] text-gray-600 font-medium">"Lo que esta gelatina hace con la panza es irreal. En 2 semanas mi hinchazón desapareció y el metabolismo se aceleró muchísimo. Ya eliminé 7 kg sin necesidad de gimnasio."</p>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="w-full px-4 mt-12">
        <div className="bg-white rounded-[32px] p-8 flex flex-col items-center">
            <h3 className="text-sm font-black text-gray-900 text-center leading-tight mb-8">¿Ya te pusiste a pensar cuánto gastaste tratando de adelgazar?</h3>
            <div className="w-full space-y-4 mb-8">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>Consultas + exámenes</span>
                    <span className="text-red-500 line-through">US$ 50.00</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>Gimnasio + personal trainer</span>
                    <span className="text-red-500 line-through">US$ 40.00</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>Dietas + suplementos</span>
                    <span className="text-red-500 line-through">US$ 30.00</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                    <span>Cremas adelgazantes</span>
                    <span className="text-red-500 line-through">US$ 20.00</span>
                </div>
                <div className="h-px bg-gray-100 my-4"></div>
                <div className="flex justify-between items-center text-sm font-black">
                    <span className="text-purple-600">La Gelatina Correcta</span>
                    <span className="text-purple-600">US$ 2.99</span>
                </div>
            </div>
            <p className="text-[10px] text-center text-gray-500 font-medium leading-relaxed">
                Mientras otros métodos cuestan fortunas por mes, vos garantizás **La Gelatina Correcta** por apenas US$ 2.99. Una inversión accesible para un resultado certero y sin efectos secundarios.
            </p>
        </div>
      </div>

      {/* Final Offer */}
      <div className="w-full px-4 mt-10">
        <div className="bg-white rounded-[32px] p-8 flex flex-col items-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Gelatinas disponibles hoy: <span className="text-purple-600">7</span></p>
            <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4">Plan Vitalicio</span>
            <p className="text-[10px] font-black text-gray-400 uppercase line-through mb-1">de US$ 19.90</p>
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <span className="text-2xl font-black text-purple-600">US$</span>
              <span className="text-6xl font-black text-purple-600 tracking-tighter">2.99</span>
            </div>
            <button onClick={handleCheckoutClick} className="w-full py-5 bg-[#d946ef] text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all mb-4 uppercase">
              Comprar La Gelatina Correcta
            </button>
        </div>
      </div>

      {/* Final Results Headline */}
      <div className="mt-12 text-center px-6">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter">TENÉ RESULTADOS EN HASTA 30 DÍAS O TU DINERO DE VUELTA</h3>
        <p className="text-[10px] font-bold text-gray-500 mt-2">Descuento de hasta 70% solo hoy</p>
      </div>

      {/* Transformation Image */}
      <div className="w-full px-4 mt-8">
         <img 
           src="https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_3.jpg?updatedAt=1769185371332" 
           alt="Resultados" 
           className="w-full rounded-2xl h-48 object-cover border border-gray-100" 
         />
      </div>

      {/* Ultimate CTA */}
      <div className="w-full px-4 mt-10">
        <button onClick={handleCheckoutClick} className="w-full py-5 bg-[#d946ef] text-white font-black text-sm rounded-2xl shadow-xl active:scale-95 transition-all uppercase tracking-tighter">
          ¡QUIERO MI GELATINA AHORA! 🔥
        </button>
        <div className="flex items-center justify-center gap-4 mt-6">
            <p className="text-[9px] font-bold text-gray-400 flex items-center gap-1">🔒 Compra 100% segura</p>
            <p className="text-[9px] font-bold text-gray-400 flex items-center gap-1">🛡️ Garantía de 30 días</p>
        </div>
      </div>

    </div>
  );
};

export default ResultAnalysis;
