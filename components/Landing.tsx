
import React from 'react';

interface LandingProps {
  onNext: () => void;
}

const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-4 pt-6 pb-8 h-[100dvh] justify-between overflow-hidden bg-white">
      {/* Topo: Headline de Alto Impacto - Mantida em Português */}
      <div className="w-full text-center">
        <h1 className="text-[24px] md:text-[30px] font-black text-gray-900 leading-[1] mb-1 px-1 tracking-tight">
          Finalmente Revelado: O <span className="text-purple-600">Ritual Noturno Japonês</span> de 10 Segundos que Desincha a Barriga Enquanto Você Dorme
        </h1>
      </div>

      {/* Meio: Imagem Maximizada com Seta Redirecionada (Apontando para Baixo) */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden my-2">
        <div className="relative w-full h-full max-h-[58vh] aspect-[4/3] bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center p-0.5 overflow-hidden border border-gray-100">
          <img 
            src="https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_k24e9tk24e9tk24e%20(1).png?updatedAt=1770846320166" 
            alt="Ritual Japonês" 
            className="w-full h-full object-cover object-top rounded-[2.35rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Badge de Destaque Flutuante - Método 2026 */}
          <div className="absolute top-5 right-5 bg-purple-600 text-white text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg animate-pulse uppercase tracking-wider">
            Método 2026
          </div>

          {/* Seta Vermelha Translúcida - Reposicionada para apontar DIRETAMENTE para baixo (CTA) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-90 pointer-events-none animate-bounce-arrow">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V22M12 22L19 15M12 22L5 15" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Base: Sub-headline + CTA Persuasivo (Grosso) */}
      <div className="w-full flex flex-col items-center">
        <p className="text-[17px] md:text-[19px] text-center text-gray-800 mb-4 leading-tight font-black px-1 mt-1">
          Descubra qual dos 3 Tipos de <span className="text-red-600">"Inchaço Hormonal"</span> está impedindo você de emagrecer e como reverter isso agora.
        </p>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-black text-[25px] py-6 rounded-3xl shadow-[0_15px_45px_rgba(16,185,129,0.5)] active:scale-95 transition-all mb-3 flex flex-col items-center justify-center uppercase tracking-tighter animate-bounce-subtle border-b-[8px] border-emerald-800"
        >
          <span className="py-0.5 tracking-tight">QUERO DESINCHAR AGORA</span>
          <span className="text-[13px] opacity-100 font-extrabold -mt-1 tracking-normal normal-case">Toque para ver seu diagnóstico gratuito. 👆</span>
        </button>

        {/* Rodapé: Contraste aumentado para Preto Sólido conforme solicitado */}
        <div className="flex items-center justify-center gap-1.5 opacity-100 mt-1">
          <div className="flex -space-x-1 mr-1">
            <div className="w-2.5 h-2.5 bg-purple-600 rounded-full border border-white"></div>
            <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full border border-white"></div>
          </div>
          <p className="text-[10px] font-black text-black uppercase tracking-tight">
            PROTOCOLO PERSONALIZADO • GRÁTIS
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 12px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2.5s infinite ease-in-out;
        }
        .animate-bounce-arrow {
          animation: bounce-arrow 1.2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Landing;
