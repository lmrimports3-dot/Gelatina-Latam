import React, { useState } from 'react';

const QUESTIONS = [
  {
    id: 2,
    question: "Quantos anos você tem?",
    subtext: "Sua idade determina o tipo de solução que você precisa",
    type: 'text',
    options: [
      { id: 'age1', label: "25-34 anos" },
      { id: 'age2', label: "35-44 anos" },
      { id: 'age3', label: "45-54 anos" },
      { id: 'age4', label: "55+ anos" }
    ]
  },
  {
    id: 3,
    question: "Há quanto tempo você tenta emagrecer sem sucesso?",
    subtext: "Quanto mais tempo tenta, mais seu metabolismo desacelera",
    type: 'text',
    options: [
      { id: 'time1', label: "6 meses a 1 ano" },
      { id: 'time2', label: "1 a 3 anos" },
      { id: 'time3', label: "3 a 5 anos" },
      { id: 'time4', label: "Mais de 5 anos (perdi a esperança)" }
    ]
  },
  {
    id: 4,
    question: "O que mais te impede de emagrecer?",
    subtext: "Identificar o bloqueio é o primeiro passo para resolver",
    type: 'text',
    options: [
      { id: 'obs1', label: "🍽️ Não consigo controlar a vontade de comer" },
      { id: 'obs2', label: "⏰ Não tenho tempo para dieta/exercício" },
      { id: 'obs3', label: "😔 Perdi a esperança, acho que é impossível" },
      { id: 'obs4', label: "💪 Meu corpo não responde mais" }
    ]
  },
  {
    id: 5,
    question: "Como é sua barriga?",
    subtext: "O tipo de barriga revela o tipo de problema",
    type: 'image_grid',
    options: [
      { id: 'belly1', label: "🌙 Incha principalmente à noite", image: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_b949q9b949q9b949.png?updatedAt=1770817457251" },
      { id: 'belly2', label: "📅 Incha durante o dia todo", image: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_q6lbyyq6lbyyq6lb.png" },
      { id: 'belly3', label: "😴 Acordo inchada", image: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_98lft398lft398lf.png" },
      { id: 'belly4', label: "🔥 Incha depois de comer (mesmo comendo pouco)", image: "https://ik.imagekit.io/ekdmcxqtr/Gemini_Generated_Image_8yi5ld8yi5ld8yi5.png" }
    ]
  },
  {
    id: 6,
    question: "Você já pensou em usar Ozempic/Mounjaro ou similares?",
    subtext: "Você não está sozinha. Milhares têm medo também.",
    type: 'text',
    options: [
      { id: 'med1', label: "✅ Já usei ou estou usando" },
      { id: 'med2', label: "🤔 Pensei, mas tenho medo dos efeitos colaterais" },
      { id: 'med3', label: "😰 Tenho medo de agulhas" },
      { id: 'med4', label: "🌿 Prefiro algo natural e seguro" }
    ]
  },
  {
    id: 7,
    question: "Quantas horas você dorme por noite?",
    subtext: "O sono influencia diretamente no emagrecimento",
    type: 'text',
    options: [
      { id: 'sleep1', label: "😴 Menos de 5 horas (durmo pouco)" },
      { id: 'sleep2', label: "🌙 5 a 7 horas" },
      { id: 'sleep3', label: "😊 7 a 9 horas" },
      { id: 'sleep4', label: "💤 Mais de 9 horas" }
    ]
  },
  {
    id: 8,
    question: "Quanto de água você bebe por dia?",
    subtext: "A hidratação é fundamental para a queima de gordura",
    type: 'text',
    options: [
      { id: 'water1', label: "🥤 Quase nada (menos de 1L)" },
      { id: 'water2', label: "💧 1 a 2 litros" },
      { id: 'water3', label: "💦 2 a 3 litros" },
      { id: 'water4', label: "🌊 Mais de 3 litros" }
    ]
  },
  {
    id: 9,
    question: "Dados Biométricos",
    subtext: "Precisamos disso para calcular seu IMC personalizado",
    type: 'weight_height'
  },
  {
    id: 10,
    question: "O que você mais quer conquistar?",
    subtext: "Seu objetivo nos ajuda a personalizar ainda mais",
    type: 'goal',
    options: [
      { id: 'goal1', label: "👗 Usar roupas que amo sem constrangimento" },
      { id: 'goal2', label: "😊 Recuperar minha autoestima" },
      { id: 'goal3', label: "💪 Ter energia para viver" },
      { id: 'goal4', label: "🏖️ Ir à praia/piscina sem medo" },
      { id: 'goal5', label: "Sentir-me atraente novamente 💑" }
    ]
  }
];

const Quiz: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(165);
  const [target, setTarget] = useState(60);

  const currentQ = QUESTIONS[step];
  const progress = Math.round(((step + 1) / QUESTIONS.length) * 100);

  const handleSelect = (val: string) => {
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onNext({ ...newAnswers, weight, height, targetWeight: target });
    }
  };

  const handleContinueData = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      onNext({ ...answers, weight, height, targetWeight: target });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center pb-10">
      {/* Progress Bar */}
      <div className="w-full px-4 pt-6 pb-2 sticky top-0 bg-white z-20">
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#E91E63] transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-lg px-6 py-6 flex flex-col items-center">
        <h2 className="text-[26px] font-black text-center leading-tight mb-2 text-gray-900 uppercase">
          {currentQ.question}
        </h2>
        <p className="text-[15px] font-medium text-gray-500 text-center mb-8">
          {currentQ.subtext}
        </p>

        {currentQ.type === 'text' && (
          <div className="w-full space-y-3">
            {currentQ.options?.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => handleSelect(opt.label)}
                className="w-full py-5 px-6 border-2 border-gray-100 rounded-2xl text-left font-bold text-gray-700 hover:border-[#E91E63] hover:bg-pink-50 transition-all active:scale-95"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {currentQ.type === 'image_grid' && (
          <div className="w-full grid grid-cols-2 gap-3">
            {currentQ.options?.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => handleSelect(opt.label)}
                className="flex flex-col border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#E91E63] hover:bg-pink-50 transition-all active:scale-95"
              >
                <div className="aspect-square bg-gray-50 overflow-hidden">
                  <img src={opt.image} alt={opt.label} width="200" height="200" loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-3 text-center">
                  <p className="text-[12px] font-black text-gray-800 leading-tight">
                    {opt.label}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentQ.type === 'weight_height' && (
          <div className="w-full space-y-12 animate-fadeIn py-4">
            {/* Seção de Peso */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-[32px] shadow-sm border border-gray-100">
               <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Qual é seu peso atual?</p>
               
               <div className="flex items-center justify-between w-full mb-8">
                 <button 
                   onClick={() => setWeight(Math.max(40, weight - 0.5))}
                   className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-2xl font-bold text-[#6B2D5C] active:scale-90 transition-transform"
                 >
                   −
                 </button>
                 
                 <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-[#6B2D5C] tracking-tighter transition-all">
                      {weight.toFixed(1).replace('.', ',')}
                    </span>
                    <span className="text-xl font-bold text-gray-400">kg</span>
                 </div>

                 <button 
                   onClick={() => setWeight(Math.min(200, weight + 0.5))}
                   className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-2xl font-bold text-[#6B2D5C] active:scale-90 transition-transform"
                 >
                   +
                 </button>
               </div>
               
               <input 
                 type="range" 
                 min="40" 
                 max="180" 
                 step="0.5"
                 value={weight} 
                 onChange={(e) => setWeight(parseFloat(e.target.value))} 
                 className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E91E63]" 
               />
               <div className="flex justify-between w-full mt-2 text-[10px] font-bold text-gray-300">
                 <span>40kg</span>
                 <span>180kg</span>
               </div>
            </div>

            {/* Seção de Altura */}
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-[32px] shadow-sm border border-gray-100">
               <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Qual é sua altura?</p>
               
               <div className="flex items-center justify-between w-full mb-8">
                 <button 
                   onClick={() => setHeight(Math.max(130, height - 1))}
                   className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-2xl font-bold text-[#6B2D5C] active:scale-90 transition-transform"
                 >
                   −
                 </button>

                 <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-[#6B2D5C] tracking-tighter">
                      {height}
                    </span>
                    <span className="text-xl font-bold text-gray-400">cm</span>
                 </div>

                 <button 
                   onClick={() => setHeight(Math.min(220, height + 1))}
                   className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 text-2xl font-bold text-[#6B2D5C] active:scale-90 transition-transform"
                 >
                   +
                 </button>
               </div>

               <input 
                 type="range" 
                 min="130" 
                 max="220" 
                 step="1"
                 value={height} 
                 onChange={(e) => setHeight(parseInt(e.target.value))} 
                 className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E91E63]" 
               />
               <div className="flex justify-between w-full mt-2 text-[10px] font-bold text-gray-300">
                 <span>130cm</span>
                 <span>220cm</span>
               </div>
            </div>

            <button 
              onClick={handleContinueData} 
              className="w-full py-6 bg-[#6B2D5C] text-white font-black text-xl rounded-2xl shadow-[0_15px_30px_rgba(107,45,92,0.3)] active:scale-95 transition-all mt-4 uppercase tracking-wider"
            >
              CONTINUAR
            </button>
          </div>
        )}

        {currentQ.type === 'goal' && (
          <div className="w-full space-y-3">
            {currentQ.options?.map((opt) => (
              <button 
                key={opt.id}
                onClick={() => handleSelect(opt.label)}
                className="w-full py-5 px-6 border-2 border-gray-100 rounded-2xl text-left font-bold text-gray-700 hover:border-[#E91E63] hover:bg-pink-50 transition-all active:scale-95"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
           <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.2em]">
             Pergunta {step + 1} de {QUESTIONS.length}
           </p>
        </div>
      </div>
    </div>
  );
};

export default Quiz;