
import React, { useState } from 'react';

interface LeadCaptureProps {
  onNext: (name: string, email: string) => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onNext(name, email);
    }
  };

  return (
    <div className="w-full flex flex-col items-center animate-fadeIn text-center py-2">
      <h1 className="text-[22px] md:text-[24px] font-black text-[#4A148C] leading-tight mb-2 uppercase font-['Montserrat'] px-2">
        Ótimo! Estamos analisando suas respostas...
      </h1>
      <h2 className="text-[14px] text-[#555555] font-medium mb-8 font-['Poppins'] px-4 leading-relaxed max-w-[90%]">
        Para onde devemos enviar seu diagnóstico personalizado e gratuito?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[420px] bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
        <div className="text-left">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block ml-2 font-['Montserrat']">
            Digite seu primeiro nome
          </label>
          <input 
            type="text" 
            placeholder="Ex: Maria" 
            required
            className="w-full py-5 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50 text-gray-900 font-bold focus:border-[#8B3A8B] outline-none transition-all shadow-inner text-lg placeholder:text-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="text-left">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block ml-2 font-['Montserrat']">
            Digite seu melhor e-mail
          </label>
          <input 
            type="email" 
            placeholder="Ex: maria@email.com" 
            required
            className="w-full py-5 px-6 rounded-2xl border-2 border-gray-100 bg-gray-50 text-gray-900 font-bold focus:border-[#8B3A8B] outline-none transition-all shadow-inner text-lg placeholder:text-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button 
          type="submit"
          className="w-full py-6 bg-[#FFD700] text-black font-black text-xl rounded-2xl shadow-xl active:scale-95 transition-all uppercase mt-4 hover:shadow-2xl"
        >
          RECEBER MEU DIAGNÓSTICO
        </button>
      </form>
      
      <p className="text-[10px] font-bold text-gray-400 mt-8 flex items-center justify-center gap-2 uppercase tracking-widest">
        🔒 Ódio spam tanto quanto você. Seu e-mail está seguro.
      </p>
    </div>
  );
};

export default LeadCapture;
