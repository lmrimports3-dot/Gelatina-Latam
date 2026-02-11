
import React, { useState, useEffect } from 'react';
import { UserData } from '../types';

const CHECKOUT_URL = "https://lastlink.com/p/CDD52DF74/checkout-payment/";

const SalesVSL: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Cálculos de Diagnóstico
  const weight = userData.weight || 70;
  const height = userData.height || 1.65;
  const bmi = parseFloat((weight / (height * height)).toFixed(1));
  const targetWeight = Math.round((height * height) * 22);
  const weightToLose = Math.max(0, Math.round(weight - targetWeight));

  const getBmiStatus = (v: number) => {
    if (v < 18.5) return { label: "Abaixo do Peso", color: "text-blue-500", bg: "bg-blue-50" };
    if (v < 24.9) return { label: "Peso Normal (Inflamação Oculta)", color: "text-emerald-600", bg: "bg-emerald-50" };
    if (v < 29.9) return { label: "Sobrepeso Detectado", color: "text-orange-500", bg: "bg-orange-50" };
    return { label: "Obesidade Identificada", color: "text-red-500", bg: "bg-red-50" };
  };

  const status = getBmiStatus(bmi);

  const modules = [
    { icon: '🧬', title: 'PROTOCOLO PERSONALIZADO', desc: 'A receita exata da Gelatina Noturna e o modo de preparo para o seu tipo de barriga (Moon Belly).' },
    { icon: '🍽️', title: 'CARDÁPIO DE 30 DIAS', desc: 'Lista de compras e refeições que combinam com a gelatina para acelerar a queima de gordura.' },
    { icon: '📊', title: 'DASHBOARD DE EVOLUÇÃO', desc: 'Acompanhe seu peso, medidas e veja seu corpo mudar com gráficos automáticos.' },
    { icon: '🎥', title: 'BIBLIOTECA DE AULAS (47 VÍDEOS)', desc: 'Aprenda sobre hormônios, sono e intestino com vídeos rápidos de 3 minutos.' },
    { icon: '👩‍👩‍👧‍👦', title: 'COMUNIDADE VIP', desc: 'Acesso vitalício ao grupo com 312.000 mulheres para suporte e motivação 24h.' },
    { icon: '🎁', title: 'PACOTE DE BÔNUS (GRÁTIS)', desc: 'Inclui E-book de Metabolismo, Receitas Gourmet e Áudios de Meditação para dormir.' }
  ];

  const testimonials = [
    { img: "https://ik.imagekit.io/ekdmcxqtr/img_0136%20(3).png", name: "Ana Silva" },
    { img: "https://ik.imagekit.io/ekdmcxqtr/img_0136%20(2).png", name: "Mariana Costa" },
    { img: "https://ik.imagekit.io/ekdmcxqtr/celebrity-proof-CMYKHlYT%20(1).jpg", name: "Juliana Oliveira" },
    { img: "https://ik.imagekit.io/ekdmcxqtr/resultado03.jpg?updatedAt=1770311728413", name: "Roberta Mendes" }
  ];

  const faqItems = [
    { q: "Vai realmente funcionar para mim?", a: "Sim. Nosso protocolo foi testado com mais de 17.859 mulheres. Se você seguir as instruções, verá resultados em menos de 7 dias. Garantido." },
    { q: "Quanto tempo leva para ver resultado?", a: "Muitas mulheres veem resultados em 3 dias. A maioria vê mudanças significativas em 1 semana." },
    { q: "Preciso fazer exercício?", a: "Não. O protocolo funciona enquanto você dorme. Nenhum exercício necessário." },
    { q: "É seguro? Tem efeitos colaterais?", a: "100% seguro. É uma solução natural, sem medicamentos ou agulhas. Zero efeitos colaterais." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleBuy = () => {
    if (typeof window !== 'undefined') {
      (window as any).isNavigatingToCheckout = true;
      window.location.replace(CHECKOUT_URL);
    }
  };

  return (
    <div className="w-full animate-fadeIn font-['Poppins'] pb-20">
      
      {/* Header Result & Diagnosis Section */}
      <section className="w-full py-6 px-4 flex flex-col items-center">
        <h1 className="text-[19px] font-black text-[#4A148C] leading-tight uppercase font-['Montserrat'] mb-6 text-center">
          Parabéns, {userData.name || 'você'}! Seu Diagnóstico Personalizado está Pronto.
        </h1>
        
        {/* Diagnosis Result Card */}
        <div className="w-full bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden mb-8 max-w-[440px]">
          <div className="bg-[#4A148C] py-3 px-6 text-center">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Resumo do Seu Perfil Metabólico</span>
          </div>
          
          <div className="p-8 space-y-8">
            {/* IMC & Status */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-[6px] border-[#E9D8E9] flex items-center justify-center relative">
                   <div className="absolute inset-0 border-[6px] border-[#8B3A8B] rounded-full border-t-transparent -rotate-45"></div>
                   <span className="text-3xl font-black text-[#4A148C]">{bmi}</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 uppercase mt-2">Seu IMC Atual</span>
              </div>
              
              <div className="flex-1 text-right">
                <div className={`${status.bg} ${status.color} px-4 py-2 rounded-2xl inline-block mb-1`}>
                   <span className="text-[12px] font-black uppercase leading-tight">{status.label}</span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">
                  Identificamos um bloqueio na sua queima de gordura noturna.
                </p>
              </div>
            </div>

            {/* Metas Dinâmicas */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100 text-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Peso Ideal Sugerido</p>
                <p className="text-2xl font-black text-[#4A148C]">{targetWeight}kg</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100 text-center">
                <p className="text-[9px] font-bold text-emerald-600 uppercase mb-1">Potencial de Perda</p>
                <p className="text-2xl font-black text-emerald-600">-{weightToLose}kg</p>
              </div>
            </div>

            {/* Perfil Identificado */}
            <div className="bg-purple-50 p-5 rounded-3xl border border-purple-100 flex items-center gap-4">
               <span className="text-3xl">🎯</span>
               <div className="text-left">
                 <p className="text-[10px] font-black text-[#8B3A8B] uppercase tracking-wider">Tipo de Barriga:</p>
                 <p className="text-[15px] font-black text-gray-800 uppercase">{userData.bellyType || "Hormonal / Estresse"}</p>
               </div>
            </div>
          </div>
        </div>

        <button 
          onClick={handleBuy}
          className="w-full max-w-[420px] py-6 bg-[#4CAF50] text-white font-['Montserrat'] font-black text-lg rounded-2xl shadow-lg active:scale-95 transition-all uppercase animate-pulse mb-4"
        >
          SIM! QUERO ACESSAR MEU PROTOCOLO
        </button>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
          ✅ 100% Personalizado para {userData.name || 'você'}
        </p>
      </section>

      {/* Módulos Compactos - CRO Optimized */}
      <section className="w-full py-8 px-4 bg-white rounded-[32px] shadow-sm mb-8 border border-gray-100 max-w-[440px] mx-auto">
        <h2 className="text-center font-black text-[17px] text-[#4A148C] uppercase mb-8 font-['Montserrat']">
          O QUE VOCÊ RECEBE NO APP:
        </h2>
        <div className="space-y-6">
          {modules.map((mod, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <span className="text-3xl shrink-0 leading-none">{mod.icon}</span>
              <div className="flex flex-col">
                <h3 className="font-black text-[14px] text-gray-800 leading-none mb-1 uppercase tracking-tight">{mod.title}</h3>
                <p className="text-[12px] text-gray-500 leading-snug font-medium">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Slider - Space Saving */}
      <section className="w-full py-8 px-4 text-center max-w-[440px] mx-auto">
        <h2 className="font-black text-[16px] text-gray-900 uppercase mb-6 font-['Montserrat']">
          RESULTADOS REAIS:
        </h2>
        <div className="relative w-full overflow-hidden rounded-3xl shadow-xl border-4 border-white aspect-[4/5] bg-gray-50">
          {testimonials.map((test, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeTestimonial ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={test.img} alt={`Resultado ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'w-6 bg-[#8B3A8B]' : 'w-1.5 bg-gray-200'}`}
            ></div>
          ))}
        </div>
      </section>

      {/* Guarantee Section - Compact */}
      <section className="w-full bg-gray-50 py-8 px-6 rounded-[32px] border border-gray-100 text-center mb-8 mx-auto max-w-[400px]">
         <img src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp?tr=w-80,h-80,cm-extract" alt="Selo" className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-white shadow-sm" />
         <h3 className="text-[16px] font-black text-gray-900 uppercase mb-2">RISCO ZERO: 7 DIAS</h3>
         <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
           Se você não desinchar ou não amar o protocolo, devolvemos seu dinheiro. Sem perguntas.
         </p>
      </section>

      {/* High Contrast Price Box - CRO Optimized */}
      <section className="w-full py-10 px-4 text-center bg-[#FFFBEB] rounded-[40px] border-2 border-yellow-200 shadow-lg mb-8 max-w-[420px] mx-auto">
         <div className="flex flex-col items-center">
            <span className="text-red-500 font-bold text-sm uppercase mb-2 tracking-tighter">Oferta Exclusiva para {userData.name || 'você'}</span>
            <span className="text-gray-400 line-through text-md font-bold">De R$ 197,00</span>
            <div className="flex items-center justify-center gap-1 my-2">
              <span className="text-[18px] font-bold text-gray-900">POR APENAS</span>
              <span className="text-6xl font-black text-[#8B3A8B] tracking-tighter">R$ 19,90</span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Acesso Vitalício + Todos os Bônus</p>
         </div>

         <button 
          onClick={handleBuy}
          className="w-full py-6 bg-[#4CAF50] text-white font-['Montserrat'] font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all uppercase"
        >
          SIM! QUERO ACESSAR AGORA!
        </button>
      </section>

      {/* FAQ Compacto */}
      <section className="w-full py-6 px-4 max-w-[440px] mx-auto">
         <h2 className="text-center font-black text-lg text-gray-900 uppercase mb-6 font-['Montserrat'] tracking-tight">Perguntas Frequentes</h2>
         <div className="space-y-2 text-left">
            {faqItems.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden text-left">
                 <button 
                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
                   className="w-full p-4 text-left flex justify-between items-center font-bold text-gray-800"
                 >
                   <span className="text-[12px] font-leading-tight pr-4">{faq.q}</span>
                   <span className="text-lg text-gray-400 leading-none">{openFaq === i ? '−' : '+'}</span>
                 </button>
                 {openFaq === i && (
                   <div className="p-4 pt-0 text-[11px] text-gray-500 font-medium leading-relaxed animate-fadeIn">
                     {faq.a}
                   </div>
                 )}
              </div>
            ))}
         </div>
      </section>

      <footer className="w-full py-10 px-6 text-center text-gray-300">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-4">© 2026 O Truque da Gelatina Noturna</p>
          <p className="text-[8px] leading-relaxed max-w-xs mx-auto opacity-50">
            Este produto não substitui orientação médica. Consulte um profissional de saúde.<br/>
            Política de Privacidade | Termos de Serviço
          </p>
      </footer>
    </div>
  );
};

export default SalesVSL;
