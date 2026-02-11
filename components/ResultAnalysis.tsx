import React, { useState, useEffect, useRef } from 'react';

const CHECKOUT_URL = "https://lastlink.com/p/CDD52DF74/checkout-payment/";

interface ResultAnalysisProps {
  userData: any;
  onNext: () => void;
}

const GoogleReviewsCarousel: React.FC = () => {
  const [scrollX, setScrollX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const reviews = [
    { name: "Mariana S.", time: "há 2 dias", text: "Gente, funciona mesmo! Em 15 dias minha barriga desinchou muito. O suporte no whats é ótimo." },
    { name: "Roberta F.", time: "há 5 horas", text: "Melhor investimento que fiz esse ano. O app é super intuitivo e a gelatina é deliciosa." },
    { name: "Carla M.", time: "há 1 semana", text: "Finalmente algo que não é enganação. Já perdi 4kg sem passar fome." },
    { name: "Juliana T.", time: "há 3 dias", text: "Estava cética, mas os resultados falam por si só. Minhas roupas voltaram a servir!" },
    { name: "Fernanda L.", time: "há 1 dia", text: "Adorei a comunidade das alunas, a gente se ajuda muito. Vale cada centavo." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        if (containerRef.current.scrollLeft >= maxScroll - 5) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          containerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-4 mb-8">
      <div className="flex items-center gap-2 mb-4 px-1">
        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" width="92" height="30" loading="lazy" className="h-4 object-contain opacity-70" />
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Avaliações Verificadas</span>
      </div>
      
      <div 
        ref={containerRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review, i) => (
          <div 
            key={i} 
            className="min-w-[260px] max-w-[260px] bg-white p-5 rounded-2xl shadow-sm border border-gray-100 snap-center flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex text-[#FFC107] text-xs">
                {"★★★★★".split("").map((s, si) => <span key={si}>{s}</span>)}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">{review.time}</span>
            </div>
            <p className="text-[12px] font-bold text-gray-800 mb-2">{review.name}</p>
            <p className="text-[13px] text-gray-500 leading-relaxed">"{review.text}"</p>
          </div>
        ))}
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

const ResultAnalysis: React.FC<ResultAnalysisProps> = ({ userData }) => {
  const [spots, setSpots] = useState(47);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // LOGICA DE NEGOCIO: Peso Alvo Dinâmico e Status do IMC
  const heightInMeters = userData.height / 100;
  const dynamicTargetWeight = Math.round((heightInMeters * heightInMeters) * 21.7);
  const weightLossPotential = userData.weight - dynamicTargetWeight;
  const bmiValue = parseFloat((userData.weight / (heightInMeters * heightInMeters)).toFixed(1));

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setInterval(() => {
      setSpots(prev => (prev > 7 ? prev - Math.floor(Math.random() * 2) : prev));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleCta = () => {
    (window as any).isNavigatingToCheckout = true;
    window.location.replace(CHECKOUT_URL);
  };

  const faqItems = [
    { q: "Vai realmente funcionar para mim?", a: "Sim. O app é personalizado para VOCÊ. Ele analisa suas respostas no quiz e cria um protocolo único baseado na sua idade, tipo de barriga e metabolismo. Se não ver resultado em 15 dias, devolvemos seu dinheiro." },
    { q: "Quanto tempo leva para ver resultado?", a: "Muitas mulheres sentem desinchaço em 7 dias. Perda de peso real (8-14kg) ocorre entre 30 a 60 dias seguindo o protocolo." },
    { q: "Preciso fazer exercício?", a: "Não é obrigatório. O protocolo foca na ativação metabólica noturna através da alimentação estratégica." },
    { q: "Quanto custa o acesso?", a: "Apenas R$ 19,90 UMA VEZ. Acesso vitalício, sem mensalidades ou taxas escondidas." }
  ];

  const modules = [
    { icon: '🧬', title: 'PROTOCOLO PERSONALIZADO', desc: 'A receita exata da Gelatina Noturna e o modo de preparo para o seu tipo de barriga (Moon Belly).' },
    { icon: '🍽️', title: 'CARDÁPIO DE 30 DIAS', desc: 'Lista de compras e refeições que combinam com a gelatina para acelerar a queima de gordura.' },
    { icon: '📊', title: 'DASHBOARD DE EVOLUÇÃO', desc: 'Acompanhe seu peso, medidas e veja seu corpo mudar com gráficos automáticos.' },
    { icon: '🎥', title: 'BIBLIOTECA DE VÍDEOS', desc: 'Passo a passo em vídeo sobre metabolismo, hormônios e preparo.' },
    { icon: '👩‍👩‍👧‍👦', title: 'COMUNIDADE VIP', desc: 'Suporte e motivação com mais de 312 mil mulheres que já transformaram seus corpos.' },
    { icon: '🤖', title: 'AJUSTE INTELIGENTE', desc: 'O sistema ajusta seu protocolo semanalmente conforme seu progresso real.' },
    { icon: '🎁', title: 'BÔNUS GRÁTIS', desc: '7 guias extras inclusos hoje (Valor original: R$ 197).' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#F5F5F5] font-['Poppins']">
      
      {/* SEÇÃO 1: HEADLINE REFORMULADA (SUCCESS NOTIFICATION) */}
      <section className="w-full bg-roxo-grad pt-6 pb-8 px-6 flex flex-col items-center">
        <div className="w-full max-w-lg mb-8">
          <div className="flex justify-between items-center mb-1 px-1">
            <span className="text-white text-[10px] font-bold opacity-60 uppercase tracking-tighter">Sincronizando dados...</span>
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Sistema Online
            </span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full shadow-[0_0_10px_#10b981]"></div>
          </div>
        </div>

        <div className="max-w-lg w-full text-center">
          {/* Box de Notificação de Sucesso */}
          <div className="bg-emerald-50 border-2 border-emerald-500 p-6 rounded-[32px] shadow-[0_20px_40px_rgba(16,185,129,0.15)] mb-8 transform hover:scale-[1.02] transition-transform animate-fadeIn">
            <div className="text-5xl mb-4 animate-bounce">✅</div>
            <h2 className="text-[11px] font-black text-emerald-600 tracking-[0.3em] uppercase mb-2">ANÁLISE FINALIZADA COM SUCESSO</h2>
            <h1 className="font-['Montserrat'] font-black text-[24px] md:text-[30px] leading-tight text-gray-900 uppercase">
              SEU PLANO DE <span className="text-emerald-600">QUEIMA ACELERADA</span> ESTÁ PRONTO
            </h1>
          </div>
          
          <div className="bg-white rounded-[24px] p-5 text-left shadow-2xl border-b-4 border-gray-200 mb-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Seu Peso Alvo</p>
                <p className="text-xl font-black text-[#6B2D5C]">{dynamicTargetWeight}kg</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-center">
                <p className="text-[10px] font-bold text-emerald-800 uppercase">Potencial de Perda</p>
                <p className="text-xl font-black text-emerald-600">-{weightLossPotential > 0 ? weightLossPotential : 0}kg</p>
              </div>
            </div>

            <div className="bg-red-50 p-3 rounded-xl mb-0 border border-red-100">
              <p className="text-[11px] font-black text-red-700 uppercase flex items-center gap-2 leading-tight">
                <span className="animate-pulse shrink-0">⚠️</span> {bmiValue < 24.9 ? "Alerta: Inflamação Oculta (Falso Magro)" : "Bloqueio Identificado: Metabolismo Lento"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: MÓDULOS COMPACTOS (ACCORDION STYLE LIST) */}
      <section className="w-full bg-white py-10 px-6 flex flex-col items-center border-t border-gray-100">
        <div className="max-w-lg w-full">
          <h2 className="font-['Montserrat'] font-bold text-[22px] text-[#6B2D5C] text-center mb-8 uppercase tracking-tight">
            📱 O QUE VOCÊ RECEBE NO APP:
          </h2>
          
          <div className="space-y-4">
            {modules.map((mod, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
                <span className="text-3xl shrink-0 mt-1">{mod.icon}</span>
                <div>
                  <h3 className="font-bold text-[15px] text-gray-800 leading-none mb-1">{mod.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-snug">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PREÇO E CTA DIRETO */}
      <section className="w-full bg-rosa-roxo-grad py-12 px-6 flex flex-col items-center text-white">
        <div className="max-w-lg w-full text-center">
          <p className="text-[#FFC107] font-black text-sm uppercase tracking-widest mb-2">Oferta Exclusiva - Vagas Limitadas</p>
          
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold opacity-60">R$</span>
              <span className="text-[68px] font-black text-[#FFC107] leading-none">19,90</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mt-2 text-white/80">Acesso Vitalício</p>
          </div>

          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full py-2 px-4 mb-8 inline-block animate-pulse">
            <p className="text-[11px] font-black uppercase">⚠️ Apenas {spots} vagas restantes nesse valor</p>
          </div>

          <button 
            onClick={handleCta}
            className="w-full py-6 bg-[#FFC107] text-black font-['Montserrat'] font-black text-[22px] rounded-[24px] shadow-[0_15px_35px_rgba(255,193,7,0.3)] active:scale-95 transition-all uppercase mb-6"
          >
            QUERO COMEÇAR AGORA 👉
          </button>

          {/* NOVO CARROSSEL DE DEPOIMENTOS ABAIXO DO CTA */}
          <GoogleReviewsCarousel />

          <div className="flex items-center justify-center gap-6 opacity-60">
             <img src="https://img.icons8.com/color/48/000000/visa.png" width="48" height="24" loading="lazy" className="h-6 object-contain grayscale brightness-200" alt="Visa" />
             <img src="https://img.icons8.com/color/48/000000/mastercard.png" width="48" height="24" loading="lazy" className="h-6 object-contain grayscale brightness-200" alt="Master" />
             <img src="https://img.icons8.com/color/48/000000/pix.png" width="48" height="24" loading="lazy" className="h-6 object-contain grayscale brightness-200" alt="Pix" />
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: GARANTIA & FAQ COMPACTO */}
      <section className="w-full bg-white py-12 px-6 flex flex-col items-center border-t border-gray-100">
        <div className="max-w-lg w-full text-center">
          <div className="flex flex-col items-center mb-10">
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="font-black text-xl text-gray-800 uppercase mb-2">RISCO ZERO</h3>
            <p className="text-sm text-gray-500 leading-relaxed px-4">
              Garantia incondicional de 15 dias. Se não desinchar ou não gostar, devolvemos seu dinheiro. Sem perguntas.
            </p>
          </div>

          <div className="space-y-3 text-left">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-gray-100 pb-3">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-2 text-left flex justify-between items-center"
                >
                  <span className="font-bold text-[15px] text-gray-700">{item.q}</span>
                  <span className="text-xl text-gray-400">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p className="text-[14px] text-gray-500 py-2 animate-fadeIn">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full bg-black py-10 px-6 text-center text-white/30 text-[10px] font-bold uppercase tracking-widest">
        © 2026 Protocolo Gelatina Noturna • Todos os direitos reservados
      </footer>
    </div>
  );
};

export default ResultAnalysis;