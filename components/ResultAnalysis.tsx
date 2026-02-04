
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

const CHECKOUT_URL = "https://lastlink.com/p/CDD52DF74/checkout-payment";

const REVIEWS = [
  { name: "Carla", age: 34, city: "Curitiba", text: "Meu inchaço sumiu em 10 dias. Hoje minha barriga está visivelmente mais chapada.", img: "https://randomuser.me/api/portraits/women/32.jpg" },
  { name: "Renata", age: 41, city: "Rio de Janeiro", text: "Eu não acreditava que algo tão simples poderia funcionar. Já eliminei 6kg.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Juliana", age: 29, city: "Salvador", text: "A sensação de estar estufada desapareceu por completo.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Mariana", age: 45, city: "São Paulo", text: "Finalmente encontrei algo que não agride meu estômago e funciona de verdade.", img: "https://randomuser.me/api/portraits/women/50.jpg" }
];

const ResultAnalysis: React.FC<ResultAnalysisProps> = ({ userData }) => {
  const name = userData?.name || 'Amiga';
  const [timeLeft, setTimeLeft] = useState(600); 
  const [reviewIndex, setReviewIndex] = useState(0);

  const track = (name: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).fbq) (window as any).fbq('trackCustom', name);
      if ((window as any).utmify?.track) (window as any).utmify.track(name);
    }
  };

  useEffect(() => {
    track('quiz_result_view');
    window.scrollTo(0, 0);
  }, []);

  // Timer de urgência
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Carrossel automático de reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckoutClick = () => {
    track('quiz_cta_click');
    try {
      const url = new URL(CHECKOUT_URL);
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.forEach((value, key) => url.searchParams.set(key, value));
      window.open(url.toString(), '_blank', 'noopener,noreferrer');
    } catch (e) {
      window.open(CHECKOUT_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center bg-white min-h-screen animate-fadeIn pb-24 font-sans text-gray-900 overflow-x-hidden">
      
      {/* ⏳ BLOCO DE ESCASSEZ NO TOPO */}
      <section className="w-full bg-white border-b border-red-100 pt-6 pb-6 px-6 flex flex-col items-center text-center shadow-sm">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight px-4 leading-tight mb-4">
          Seu protocolo foi gerado com base nas suas respostas e pode ser removido se você sair desta página.
        </p>
        
        <div className="flex items-center gap-3 text-red-500 bg-red-50 px-5 py-2 rounded-full border border-red-100">
          <span className="text-[11px] font-black uppercase tracking-wider">Seu perfil expira em:</span>
          <span className="text-lg font-black tabular-nums">{formatTime(timeLeft)}</span>
        </div>
      </section>

      {/* 🎯 PRIMEIRA DOBRA */}
      <section className="w-full px-6 pt-10 pb-10 bg-white shadow-sm rounded-b-[40px] border-b border-gray-100 flex flex-col items-center text-center">
        <h1 className="text-[24px] md:text-[26px] font-black leading-tight mb-4 px-2">
          🎉 Seu Protocolo da <span className="text-purple-600">Gelatina Noturna</span> foi gerado para você.
        </h1>
        
        <p className="text-[14px] text-gray-500 font-medium leading-relaxed mb-10 px-4">
          Com base nas suas respostas, você apresenta sinais comuns de <strong>inchaço abdominal e metabolismo lento</strong> — por isso esse protocolo noturno foi adaptado para você, <span className="text-purple-600 font-bold">{name}</span>.
        </p>

        {/* 📊 BLOCO VISUAL DE RESULTADO SIMULADO */}
        <div className="w-full space-y-4 mb-8">
          {[
            { label: "Primeiros resultados", text: "Redução do inchaço", icon: "✨", color: "bg-purple-50", textCol: "text-purple-700" },
            { label: "Em 2 semanas", text: "Leveza e melhora digestiva", icon: "🕒", color: "bg-blue-50", textCol: "text-blue-700" },
            { label: "Em 4 semanas", text: "Redução visível da gordura", icon: "📏", color: "bg-emerald-50", textCol: "text-emerald-700" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-left bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-xl`}>{item.icon}</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                <p className={`text-[13px] font-black ${item.textCol}`}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🆕 NOVO CTA NA PRIMEIRA DOBRA */}
        <button 
          onClick={handleCheckoutClick} 
          className="w-full py-5 btn-gradient text-white font-black text-lg rounded-2xl shadow-2xl active:scale-95 transition-all uppercase flex items-center justify-center gap-2 mb-2"
        >
          <span>Acessar meu protocolo agora</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </button>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Início imediato</p>
      </section>

      {/* ⭐ SEÇÃO 1 — PROVA SOCIAL MASSIVA (CARROSSEL ESTILO GOOGLE) */}
      <section className="w-full px-6 py-16 bg-white overflow-hidden">
        <h2 className="text-xl font-black text-center mb-2 px-4 leading-tight">
          Mais de <span className="text-purple-600">350.000 mulheres</span> já usam o Truque da Gelatina Noturna
        </h2>
        <p className="text-sm text-gray-500 font-medium text-center mb-10 px-6">
          Resultados reais de mulheres que também sofriam com barriga inchada e digestão lenta.
        </p>

        <div className="relative w-full min-h-[220px]">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
          >
            {REVIEWS.map((d, i) => (
              <div key={i} className="w-full flex-shrink-0 px-2">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <img src={d.img} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt={d.name} />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <p className="text-[14px] font-black text-gray-900">{d.name}</p>
                        <span className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-[6px] text-white">✓</span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{d.city}, Brasil</p>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" className="w-4 h-4 opacity-20" alt="Google" />
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <svg key={s} className="w-4 h-4 text-orange-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      ))}
                    </div>
                    <p className="text-[11px] font-bold text-gray-400">Publicado há 2 semanas</p>
                  </div>

                  <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                    "{d.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-6">
            {REVIEWS.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${reviewIndex === i ? 'w-6 bg-purple-600' : 'w-1.5 bg-gray-200'}`}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧪 SEÇÃO 2 — POR QUE FUNCIONA */}
      <section className="w-full px-6 py-16 bg-purple-50">
        <h2 className="text-xl font-black text-center mb-10">Por que a <span className="text-purple-600">Gelatina Noturna</span> funciona?</h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { t: "Estimula o ritmo digestivo noturno", i: "🔄" },
            { t: "Ajuda a reduzir a retenção e o inchaço", i: "💧" },
            { t: "Favorece a saciedade e o equilíbrio", i: "⚖️" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-[24px] border border-purple-100 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">{item.i}</div>
              <p className="text-[13px] font-bold text-gray-700 leading-tight">{item.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🎁 SEÇÃO 3 — BÔNUS */}
      <section className="w-full px-6 py-16">
        <h2 className="text-xl font-black text-center mb-10 leading-tight px-4">
          Ao entrar hoje, você recebe <span className="text-purple-600">bônus exclusivos</span>
        </h2>
        
        <div className="space-y-6">
          {[
            { title: "Guia Anti-Inchaço Express", value: "R$ 49,00", desc: "Dicas alimentares que aceleram a redução do inchaço.", icon: "📖" },
            { title: "Cardápio Desinchante 7 Dias", value: "R$ 57,00", desc: "Sugestões práticas para potencializar o protocolo.", icon: "🥗" },
            { title: "Lista Inteligente de Ingredientes", value: "R$ 27,00", desc: "Facilita as compras e evita erros comuns.", icon: "🛒" }
          ].map((bonus, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md flex items-start gap-4">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-inner">{bonus.icon}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-black text-gray-900 pr-2">{bonus.title}</h3>
                  <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-lg whitespace-nowrap">{bonus.value}</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{bonus.desc}</p>
                <p className="text-[9px] font-black text-emerald-500 uppercase mt-2 tracking-widest">Incluso grátis ✨</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💰 SEÇÃO 4 — ANCORAGEM DE VALOR */}
      <section className="w-full px-6 py-12 bg-gray-900 text-white rounded-[40px] mb-16">
        <h2 className="text-lg font-black text-center mb-8 uppercase tracking-tighter">Sua Oferta Especial</h2>
        <div className="w-full space-y-3 mb-10 px-4">
          <div className="flex justify-between text-sm opacity-60">
            <span>Protocolo Gelatina Noturna</span>
            <span className="line-through">R$ 99,00</span>
          </div>
          <div className="flex justify-between text-sm opacity-60">
            <span>Guia Anti-Inchaço</span>
            <span className="line-through">R$ 49,00</span>
          </div>
          <div className="flex justify-between text-sm opacity-60">
            <span>Cardápio 7 Dias</span>
            <span className="line-through">R$ 57,00</span>
          </div>
          <div className="flex justify-between text-sm opacity-60">
            <span>Lista de Ingredientes</span>
            <span className="line-through">R$ 27,00</span>
          </div>
          <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
            <span className="text-xs font-bold uppercase">Total Real</span>
            <span className="text-xl font-black text-red-400">R$ 232,00</span>
          </div>
        </div>

        <div className="w-full bg-white/5 rounded-3xl p-8 text-center border border-white/10">
          <p className="text-[12px] font-black text-purple-400 uppercase mb-4 tracking-[0.2em]">Sua Oferta Exclusiva</p>
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-sm font-black text-purple-400 mr-1">Por apenas</span>
            <span className="text-2xl font-black text-purple-400">R$</span>
            <span className="text-6xl font-black text-purple-400 tracking-tighter">19,90</span>
          </div>
          
          <button onClick={handleCheckoutClick} className="w-full py-5 btn-gradient text-white font-black text-xl rounded-2xl shadow-2xl active:scale-95 transition-all uppercase flex items-center justify-center gap-2 mb-4 animate-pulse">
            <span>EU QUERO ESSA OFERTA</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>

          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pagamento único • Acesso vitalício</p>
        </div>
      </section>

      {/* 🛡️ SEÇÃO 5 — GARANTIA */}
      <section className="w-full px-6 py-16 text-center">
        <div className="w-full bg-[#FFFBEB] border border-[#FDE68A] rounded-[32px] p-8 flex flex-col items-center">
          <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping"></div>
            <svg className="w-full h-full text-yellow-500 relative z-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 6.707l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 1.414z"/>
            </svg>
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-4">Garantia Blindada de 30 Dias</h3>
          <p className="text-[13px] text-gray-600 leading-relaxed font-bold mb-4">
            Use o protocolo completo. Se não perceber redução do inchaço ou melhora digestiva, devolvemos 100% do seu dinheiro.
          </p>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-black text-yellow-700 uppercase">Sem perguntas.</span>
            <span className="text-[11px] font-black text-yellow-700 uppercase">Sem burocracia.</span>
          </div>
        </div>
      </section>

      {/* ⚡ SEÇÃO 6 — FAQ */}
      <section className="w-full px-6 py-16 bg-white">
        <h2 className="text-xl font-black text-center mb-10">Dúvidas Frequentes</h2>
        <div className="w-full space-y-4">
          {[
            { q: "Funciona para qualquer idade?", a: "Sim, o protocolo é adaptável e seguro para qualquer idade." },
            { q: "Preciso fazer dieta restritiva?", a: "Não. O foco é ativar seu metabolismo através da rotina noturna." },
            { q: "É necessário fazer exercícios?", a: "Não é obrigatório. Os resultados vêm da ativação hormonal natural." },
            { q: "É difícil de preparar?", a: "Extremamente simples. Leva menos de 5 minutos na sua cozinha." }
          ].map((faq, i) => (
            <div key={i} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
              <h4 className="text-[13px] font-black text-gray-900 mb-2">{faq.q}</h4>
              <p className="text-[12px] text-gray-600 leading-relaxed font-medium">→ {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 CTA FINAL */}
      <section className="w-full px-6 py-16 bg-white border-t border-gray-100 flex flex-col items-center">
        <button onClick={handleCheckoutClick} className="w-full py-6 btn-gradient text-white font-black text-[18px] rounded-2xl shadow-2xl active:scale-95 transition-all mb-4 uppercase">
          SIM, QUERO ACESSAR MEU PROTOCOLO COMPLETO
        </button>

        <div className="flex items-center gap-4 opacity-40 mt-4">
           <div className="flex flex-col items-center">
             <span className="text-xl">🔒</span>
             <span className="text-[8px] font-black uppercase">Seguro</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-xl">💳</span>
             <span className="text-[8px] font-black uppercase">Imediato</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-xl">🛡️</span>
             <span className="text-[8px] font-black uppercase">Garantido</span>
           </div>
        </div>
      </section>

    </div>
  );
};

export default ResultAnalysis;
