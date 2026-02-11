
import React, { useState } from 'react';
import { UserData } from '../types';

const CHECKOUT_URL = "https://lastlink.com/p/CDD52DF74/checkout-payment/";

const SalesPage: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleBuy = () => {
    if (typeof window !== 'undefined') {
      (window as any).isNavigatingToCheckout = true;
      window.location.replace(CHECKOUT_URL);
    }
  };

  const faqItems = [
    { q: "Vai realmente funcionar para mim?", a: "Sim. Nosso protocolo foi testado com mais de 17.859 mulheres. Se você seguir as instruções, verá resultados em menos de 7 dias. Garantido." },
    { q: "Quanto tempo leva para ver resultado?", a: "Muitas mulheres veem resultados em 3 dias. A maioria vê mudanças significativas em 1 semana." },
    { q: "Preciso fazer exercício?", a: "Não. O protocolo funciona enquanto você dorme. Nenhum exercício necessário." },
    { q: "É seguro? Tem efeitos colaterais?", a: "100% seguro. É uma solução natural, sem medicamentos ou agulhas. Zero efeitos colaterais." }
  ];

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center font-['Poppins']">
      
      <section className="w-full bg-[#8B3A8B] py-10 px-6 flex flex-col items-center text-white">
        <div className="max-w-lg w-full text-center">
           <h1 className="text-[22px] md:text-[26px] font-black leading-tight uppercase font-['Montserrat'] mb-6">
             Parabéns, {userData.name}! Seu Diagnóstico Personalizado está Pronto.
           </h1>
           
           {/* VSL Placeholder - Em um app real, aqui estaria o player do Panda/Vturb */}
           <div className="w-full aspect-video bg-black rounded-2xl shadow-2xl relative overflow-hidden mb-8 border-2 border-white/20">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                   <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                 </div>
              </div>
              <img src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp?tr=bl-10" className="w-full h-full object-cover opacity-50" alt="VSL Preview" />
           </div>

           <button 
             onClick={handleBuy}
             className="w-full py-6 bg-[#4CAF50] text-white font-['Montserrat'] font-black text-[18px] md:text-[20px] rounded-2xl shadow-[0_10px_30px_rgba(76,175,80,0.4)] active:scale-95 transition-all uppercase"
           >
             SIM, QUERO ACESSAR O PROTOCOLO AGORA!
           </button>
        </div>
      </section>

      <section className="w-full py-12 px-6 flex flex-col items-center">
        <div className="max-w-lg w-full">
           <h2 className="text-center font-black text-xl text-gray-900 uppercase mb-10">Resultados de quem seguiu o protocolo:</h2>
           <div className="space-y-6">
              <img src="https://ik.imagekit.io/ekdmcxqtr/img_0136%20(3).png" alt="12_depoimento_fernanda" className="w-full rounded-3xl shadow-lg" />
              <img src="https://ik.imagekit.io/ekdmcxqtr/img_0136%20(2).png" alt="13_depoimento_juliana" className="w-full rounded-3xl shadow-lg" />
              <img src="https://ik.imagekit.io/ekdmcxqtr/celebrity-proof-CMYKHlYT%20(1).jpg" alt="14_depoimento_carla" className="w-full rounded-3xl shadow-lg" />
           </div>
        </div>
      </section>

      <section className="w-full bg-gray-50 py-12 px-6 flex flex-col items-center border-y border-gray-200">
        <div className="max-w-lg w-full text-center">
           <img src="https://ik.imagekit.io/ekdmcxqtr/giovana-ermetice-nutricionista-campinas-001.webp?tr=w-100,h-100,cm-extract" alt="15_selo_garantia" className="w-24 h-24 mx-auto mb-6" />
           <h3 className="text-xl font-black text-gray-900 uppercase mb-4">GARANTIA INCONDICIONAL</h3>
           <p className="text-[14px] text-gray-500 font-medium leading-relaxed">
             Experimente o protocolo por 7 dias. Se você não sentir suas roupas mais largas ou não estiver satisfeita(o), devolvemos cada centavo.
           </p>
        </div>
      </section>

      <section className="w-full py-12 px-6 flex flex-col items-center">
        <div className="max-w-lg w-full text-center">
           <p className="text-gray-400 line-through font-bold">De R$ 197,00</p>
           <div className="flex items-center justify-center gap-2 mb-10">
              <span className="text-lg font-bold">POR APENAS</span>
              <span className="text-6xl font-black text-[#8B3A8B]">R$ 19,90</span>
           </div>

           <h2 className="text-center font-black text-xl text-gray-900 uppercase mb-8">Perguntas Frequentes</h2>
           <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden text-left">
                   <button 
                     onClick={() => setOpenFaq(openFaq === i ? null : i)}
                     className="w-full p-5 text-left flex justify-between items-center font-bold text-gray-800"
                   >
                     <span className="text-[14px] leading-tight">{faq.q}</span>
                     <span className="text-xl text-gray-400">{openFaq === i ? '−' : '+'}</span>
                   </button>
                   {openFaq === i && (
                     <div className="p-5 pt-0 text-[13px] text-gray-500 font-medium leading-relaxed">
                       {faq.a}
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>
      </section>

      <footer className="w-full bg-black py-10 px-6 text-center text-white/30">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">© 2026 O Truque da Gelatina Noturna</p>
          <p className="text-[9px] leading-relaxed max-w-xs mx-auto">
            Este produto não substitui orientação médica. Consulte um profissional de saúde.<br/>
            Política de Privacidade | Termos de Serviço
          </p>
      </footer>
    </div>
  );
};

export default SalesPage;
