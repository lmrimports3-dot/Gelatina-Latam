import React, { useState, useEffect, useRef } from 'react';

interface QuizOption {
  label: string;
  subtext?: string;
  image?: string;
  icon?: string;
  id: string;
}

interface GenericQuizQuestion {
  id: number;
  question: string;
  questionHighlight?: string;
  subtext: string;
  options: QuizOption[];
  type: 'text' | 'image' | 'multi' | 'input' | 'card' | 'info' | 'weight' | 'height' | 'target_weight' | 'commitment' | 'transformation_offer' | 'transformation_stories' | 'analysis_summary' | 'loading_transition' | 'intermediate_audio' | 'results_proof_carousel';
  columns?: number;
}

const QUESTIONS: GenericQuizQuestion[] = [
  {
    id: 1,
    question: "Qual é a sua ",
    questionHighlight: "idade?",
    subtext: "Isso nos ajuda a personalizar seu protocolo",
    type: 'text',
    options: [
      { id: 'age1', label: "18 - 27 anos" },
      { id: 'age2', label: "28 - 39 anos" },
      { id: 'age3', label: "40 - 54 anos" },
      { id: 'age4', label: "54+ anos" }
    ]
  },
  {
    id: 2,
    question: "Como você classificaria ",
    questionHighlight: "seu corpo?",
    subtext: "Selecione a opção que melhor te descreve",
    type: 'image',
    options: [
      { id: 'body1', label: "Normal", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(4).png" },
      { id: 'body2', label: "Plus Size", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(5).png" },
      { id: 'body3', label: "Acima do peso", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(6).png" },
      { id: 'body4', label: "Muita barriga", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(7).png" }
    ]
  },
  {
    id: 101,
    question: "Quando você mais sente a ",
    questionHighlight: "barriga inchada?",
    subtext: "Identificar o momento ajuda no ajuste do protocolo",
    type: 'text',
    options: [
      { id: 'bloat1', label: "Ao acordar" },
      { id: 'bloat2', label: "Após o jantar" },
      { id: 'bloat3', label: "Durante o dia todo" },
      { id: 'bloat4', label: "Principalmente à noite" }
    ]
  },
  {
    id: 102,
    question: "Você já pensou em usar canetas emagrecedoras como ",
    questionHighlight: "Mounjaro ou similares?",
    subtext: "Queremos entender sua preferência por métodos",
    type: 'text',
    options: [
      { id: 'pen1', label: "Já usei" },
      { id: 'pen2', label: "Pensei, mas tive medo dos efeitos colaterais" },
      { id: 'pen3', label: "Nunca usei e não pretendo" },
      { id: 'pen4', label: "Prefiro soluções naturais" }
    ]
  },
  {
    id: 103,
    question: "Seu intestino funciona com ",
    questionHighlight: "regularidade?",
    subtext: "O trânsito intestinal é chave para o desinchaço",
    type: 'text',
    options: [
      { id: 'bowel1', label: "Todos os dias" },
      { id: 'bowel2', label: "Dia sim, dia não" },
      { id: 'bowel3', label: "Raramente" },
      { id: 'bowel4', label: "Quase nunca" }
    ]
  },
  {
    id: 3,
    question: "Em quais áreas você mais ",
    questionHighlight: "quer perder gordura?",
    subtext: "Selecione todas que se aplicam",
    type: 'multi',
    columns: 2,
    options: [
      { id: 'area1', label: "Quadril", icon: "🦵" },
      { id: 'area2', label: "Braços", icon: "💪" },
      { id: 'area3', label: "Barriga", icon: "🎯" },
      { id: 'area4', label: "Pernas", icon: "🦵" },
      { id: 'area5', label: "Glúteos", icon: "🍑" },
      { id: 'area6', label: "Todo o corpo", icon: "✨" }
    ]
  },
  {
    id: 4,
    question: "Qual é o seu ",
    questionHighlight: "nome?",
    subtext: "Queremos te conhecer melhor 💖",
    type: 'input',
    options: []
  },
  {
    id: 401,
    question: "Analisando suas informações…",
    subtext: "Ajustando o protocolo de acordo com seu perfil",
    type: 'loading_transition',
    options: []
  },
  {
    id: 402,
    question: "⚠️ Atenção: isso explica por que tantas mulheres estão abandonando canetas e Mounjaro",
    subtext: "O que você vai ouvir agora explica por que o Truque da Gelatina Noturna começou a gerar resultados reais sem agredir o corpo.",
    type: 'intermediate_audio',
    options: []
  },
  {
    id: 403,
    question: "Resultados reais de mulheres que começaram o Truque da Gelatina Noturna",
    subtext: "Desinchaço visível, barriga menos estufada e roupas voltando a servir — já nas primeiras semanas.",
    type: 'results_proof_carousel',
    options: []
  },
  {
    id: 5,
    question: "Como o peso afeta sua vida?",
    subtext: "Entender isso nos ajuda a criar seu protocolo ideal",
    type: 'card',
    options: [
      { id: 'life1', label: "Afeta minha autoestima", subtext: "Sinto-me insegura com meu corpo", icon: "💔" },
      { id: 'life2', label: "Afeta minha saúde", subtext: "Sinto cansaço e falta de energia", icon: "🏥" },
      { id: 'life3', label: "Afeta meus relacionamentos", subtext: "Evito encontros sociais", icon: "👥" },
      { id: 'life4', label: "Afeta minha rotina", subtext: "Dificuldade para tarefas simples", icon: "📅" }
    ]
  },
  {
    id: 6,
    question: "Você está feliz com sua aparência atual?",
    subtext: "Seja sincera com você mesma",
    type: 'card',
    options: [
      { id: 'hap1', label: "Não estou feliz", icon: "😔" },
      { id: 'hap2', label: "Poderia estar melhor", icon: "🙄" },
      { id: 'hap3', label: "Estou trabalhando nisso", icon: "💪" }
    ]
  },
  {
    id: 7,
    question: "O que te impede de emagrecer?",
    subtext: "Selecione seus maiores obstáculos",
    type: 'multi',
    columns: 1,
    options: [
      { id: 'bar1', label: "Falta de tempo", icon: "⏰" },
      { id: 'bar2', label: "Falta de autocontrole", icon: "🍫" },
      { id: 'bar3', label: "Questões financeiras", icon: "💰" },
      { id: 'bar4', label: "Falta de constância", icon: "📉" }
    ]
  },
  {
    id: 8,
    question: "O que você quer conquistar?",
    subtext: "Selecione seus maiores objetivos",
    type: 'multi',
    columns: 2,
    options: [
      { id: 'goal1', label: "Ter mais energia", icon: "⚡" },
      { id: 'goal2', label: "Usar as roupas que amo", icon: "👗" },
      { id: 'goal3', label: "Melhorar autoestima", icon: "💖" },
      { id: 'goal4', label: "Ter mais saúde", icon: "💪" },
      { id: 'goal5', label: "Sentir-me mais leve", icon: "🦋" },
      { id: 'goal6', label: "Receber elogios", icon: "🌟" }
    ]
  },
  {
    id: 9,
    question: "Ótimo, [nome]! 🎉",
    subtext: "Sem esforço nem dietas pesadas: **A Gelatina Noturna** faz o trabalho pesado por você, ativando a queima de gordura com ingredientes caseiros que você prepara em minutos.",
    type: 'info',
    options: []
  },
  {
    id: 10,
    question: "Qual seu peso atual?",
    subtext: "Seja sincera para obter um resultado preciso",
    type: 'weight',
    options: []
  },
  {
    id: 11,
    question: "Qual sua altura?",
    subtext: "Precisamos disso para calcular seu IMC",
    type: 'height',
    options: []
  },
  {
    id: 12,
    question: "Qual seu peso desejado?",
    subtext: "Qual é o peso que você sonha alcançar?",
    type: 'target_weight',
    options: []
  },
  {
    id: 13,
    question: "Você já tentou alguma dessas ",
    questionHighlight: "soluções?",
    subtext: "Isso nos ajuda a entender sua jornada",
    type: 'multi',
    columns: 1,
    options: [
      { id: 'sol1', label: "Dietas restritivas", icon: "🥗" },
      { id: 'sol2', label: "Chás ou receitas naturais", icon: "🍵" },
      { id: 'sol3', label: "Exercícios específicos", icon: "🏃‍♀️" },
      { id: 'sol4', label: "Remédios / canetas para emagrecer", icon: "💉" },
      { id: 'sol5', label: "Ainda não tentei nada", icon: "✨" }
    ]
  },
  {
    id: 14,
    question: "Quantas gravidezes você teve?",
    subtext: "Isso influencia no seu metabolismo",
    type: 'card',
    options: [
      { id: 'preg0', label: "Nunca engravidei", icon: "🚫" },
      { id: 'preg1', label: "1 gravidez", icon: "1️⃣" },
      { id: 'preg2', label: "2 gravidezes", icon: "2️⃣" },
      { id: 'preg3', label: "3 ou mais gravidezes", icon: "👶" }
    ]
  },
  {
    id: 15,
    question: "Como é sua rotina diária?",
    subtext: "Vamos adaptar o protocolo ao seu dia a dia",
    type: 'card',
    options: [
      { id: 'routine1', label: "Trabalho fora de casa", icon: "🏢" },
      { id: 'routine2', label: "Faço home office", icon: "🏠" },
      { id: 'routine3', label: "Cuido da casa / família", icon: "👪" },
      { id: 'routine4', label: "Estudo", icon: "📚" }
    ]
  },
  {
    id: 16,
    question: "Quantas horas dorme por noite?",
    subtext: "O sono influencia diretamente no emagrecimento",
    type: 'card',
    options: [
      { id: 'sleep1', label: "Menos de 5 horas", icon: "😴" },
      { id: 'sleep2', label: "5 a 7 horas", icon: "🌙" },
      { id: 'sleep3', label: "7 a 9 horas", icon: "😊" },
      { id: 'sleep4', label: "Mais de 9 horas", icon: "💤" }
    ]
  },
  {
    id: 17,
    question: "Quanto de água bebe por dia?",
    subtext: "A hidratação é fundamental para a queima de gordura",
    type: 'card',
    options: [
      { id: 'water1', label: "Quase nada", icon: "🥤" },
      { id: 'water2', label: "Menos de 1 litro", icon: "💧" },
      { id: 'water3', label: "1 a 2 litros", icon: "💦" },
      { id: 'water4', label: "Mais de 2 litros", icon: "🌊" }
    ]
  },
  {
    id: 18,
    question: "Resultado da sua análise, [nome]",
    subtext: "Analisamos seu perfil baseado nas suas respostas.",
    type: 'analysis_summary',
    options: []
  },
  {
    id: 19,
    question: "Como usar ",
    questionHighlight: "A Gelatina Noturna",
    subtext: "Simples, prático e eficaz",
    type: 'commitment',
    options: []
  },
  {
    id: 20,
    question: "Qual o ",
    questionHighlight: "corpo dos seus sonhos?",
    subtext: "Como você se imagina daqui a 30 dias?",
    type: 'card',
    options: [
      { id: 'dream1', label: "Em forma e definida", icon: "💪" },
      { id: 'dream2', label: "Natural e saudável", icon: "🌸" }
    ]
  },
  {
    id: 21,
    question: "[nome], gostaria de perder entre ",
    questionHighlight: "8 e 14 quilos?",
    subtext: "Baseado no seu perfil, este resultado é totalmente alcançável com a **Gelatina Noturna**!",
    type: 'transformation_offer',
    options: []
  },
  {
    id: 22,
    question: "Histórias de ",
    questionHighlight: "Transformação",
    subtext: "Veja quem já transformou o corpo com a **Gelatina Noturna**",
    type: 'transformation_stories',
    options: []
  }
];

const TRANSFORMATION_IMAGES = [
  "https://ik.imagekit.io/ekdmcxqtr/img_0136%20(3).png",
  "https://ik.imagekit.io/ekdmcxqtr/img_0136%20(2).png",
  "https://ik.imagekit.io/ekdmcxqtr/img_0136%20(1).png"
];

const PROOF_IMAGES = [
  "https://ik.imagekit.io/ekdmcxqtr/resultado01.jpg",
  "https://ik.imagekit.io/ekdmcxqtr/resultado02.jpg",
  "https://ik.imagekit.io/ekdmcxqtr/resultado03.jpg"
];

const Quiz: React.FC<{ onNext: (finalAnswers: any) => void }> = ({ onNext }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(165);
  const [targetWeight, setTargetWeight] = useState(60);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isIntermediateAudioPlaying, setIsIntermediateAudioPlaying] = useState(false);
  const [isIntermediateAudioUnlocked, setIsIntermediateAudioUnlocked] = useState(false);
  
  const intermediateAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioPlayTimestamp = useRef<number | null>(null);

  // Tracking Helper
  const track = (name: string) => {
    if (typeof window !== 'undefined') {
      if ((window as any).fbq) (window as any).fbq('trackCustom', name);
      if ((window as any).utmify?.track) (window as any).utmify.track(name);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      track('quiz_view');
    }
    const stepNumber = currentQuestionIndex + 1;
    if (stepNumber <= 5) {
      track(`quiz_step_${stepNumber}`);
    }
  }, [currentQuestionIndex]);

  // Loading Transition Effect
  useEffect(() => {
    const q = QUESTIONS[currentQuestionIndex];
    if (q.type === 'loading_transition') {
      const timer = setTimeout(() => {
        handleContinue(new MouseEvent('click') as any);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex]);

  // Carousel Effect
  useEffect(() => {
    const q = QUESTIONS[currentQuestionIndex];
    if (q.type === 'transformation_stories' || q.type === 'results_proof_carousel') {
      const items = q.type === 'transformation_stories' ? TRANSFORMATION_IMAGES : PROOF_IMAGES;
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % items.length);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      setCarouselIndex(0);
    }
  }, [currentQuestionIndex]);

  // Fallback Timer for iOS Safari Compatibility
  useEffect(() => {
    const q = QUESTIONS[currentQuestionIndex];
    if (q.type !== 'intermediate_audio' || isIntermediateAudioUnlocked) return;

    const fallbackInterval = setInterval(() => {
      const audio = intermediateAudioRef.current;
      if (!audio || !audioPlayTimestamp.current || !isIntermediateAudioPlaying) return;

      const elapsed = (Date.now() - audioPlayTimestamp.current) / 1000;
      const duration = audio.duration;

      // Se a duração for válida, usamos ela. Caso contrário, Safari falhou mas o timer continua.
      // A gelatina noturna áudio intermediário tem aprox 32 segundos.
      const estimatedDuration = (duration && !isNaN(duration) && duration !== Infinity) ? duration : 32;

      if (elapsed >= estimatedDuration - 10) {
        setIsIntermediateAudioUnlocked(true);
        clearInterval(fallbackInterval);
      }
    }, 1000);

    return () => clearInterval(fallbackInterval);
  }, [currentQuestionIndex, isIntermediateAudioPlaying, isIntermediateAudioUnlocked]);

  const finishQuiz = (updatedAnswers: any) => {
    onNext({
      ...updatedAnswers,
      weight,
      height,
      targetWeight,
      name: answers[4] || userName || 'Amiga'
    });
  };

  const handleOptionSelect = (e: React.MouseEvent, optionId: string, optionLabel: string) => {
    e.stopPropagation();
    const q = QUESTIONS[currentQuestionIndex];
    if (q.type === 'multi') {
      setSelectedMulti(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId) 
          : [...prev, optionId]
      );
      return;
    }
    const updatedAnswers = { ...answers, [q.id]: optionLabel };
    setAnswers(updatedAnswers);
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedMulti([]); 
      }, 400);
    } else {
      setTimeout(() => {
        finishQuiz(updatedAnswers);
      }, 400);
    }
  };

  const handleContinue = (e: React.MouseEvent) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const q = QUESTIONS[currentQuestionIndex];
    
    // Bloqueio do botão de áudio intermediário
    if (q.type === 'intermediate_audio' && !isIntermediateAudioUnlocked) return;
    
    if (q.type === 'multi' && selectedMulti.length === 0) return;
    if (q.type === 'input' && !userName.trim()) return;
    
    // Stop audio if moving away from audio step
    if (q.type === 'intermediate_audio' && intermediateAudioRef.current) {
      intermediateAudioRef.current.pause();
      setIsIntermediateAudioPlaying(false);
    }

    let answerValue: any;
    if (q.type === 'input') {
      answerValue = userName;
    } else if (q.type === 'weight') {
      answerValue = weight;
    } else if (q.type === 'height') {
      answerValue = height;
    } else if (q.type === 'target_weight') {
      answerValue = targetWeight;
    } else if (q.type === 'multi') {
      answerValue = selectedMulti;
    } else {
      answerValue = true; 
    }
    const updatedAnswers = { ...answers, [q.id]: answerValue };
    setAnswers(updatedAnswers);
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedMulti([]); 
      setIsIntermediateAudioUnlocked(false); // Reset para próximos passos
      audioPlayTimestamp.current = null;
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const adjustWeight = (amount: number) => {
    setWeight(prev => Math.min(Math.max(prev + amount, 45), 150));
  };

  const adjustHeight = (amount: number) => {
    setHeight(prev => Math.min(Math.max(prev + amount, 140), 220));
  };

  const adjustTargetWeight = (amount: number) => {
    setTargetWeight(prev => Math.min(Math.max(prev + amount, 40), weight - 1));
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  
  // Lógica para cálculo da porcentagem da barra de progresso
  const totalSteps = QUESTIONS.length + 3; 
  const currentStep = currentQuestionIndex + 3;
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  let displayQuestion = currentQuestion.question;
  if (currentQuestion.id === 5) {
    displayQuestion = `${answers[4] || 'Amiga'}, ${currentQuestion.question}`;
  } else if (currentQuestion.id === 9 || currentQuestion.id === 21 || currentQuestion.id === 18) {
    displayQuestion = currentQuestion.question.replace('[nome]', answers[4] || 'Amiga');
  }

  const calculateBMI = () => {
    const h = height / 100;
    const bmi = weight / (h * h);
    return bmi.toFixed(1);
  };
  
  const getBMICategory = (bmi: string) => {
    const b = parseFloat(bmi);
    if (b < 18.5) return { label: 'Baixo peso', color: 'text-blue-500' };
    if (b < 25) return { label: 'Normal', color: 'text-green-500' };
    if (b < 30) return { label: 'Sobrepeso', color: 'text-orange-500' };
    return { label: 'Obesidade', color: 'text-red-500' };
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white pb-24 relative">
      <div className="w-full px-4 pt-4 pb-2 sticky top-0 bg-white z-10">
        <div className="w-full bg-gray-100 h-[6px] rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-600 transition-all duration-700 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 py-8 max-w-lg mx-auto w-full">
        {currentQuestion.type === 'analysis_summary' ? (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-tight mb-8 text-center">
              Resultado da sua análise, <span className="text-purple-600 lowercase">{answers[4] || 'Amiga'}</span>
            </h2>

            <div className="w-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col items-center mb-6">
               <span className="text-6xl font-black text-purple-600 tracking-tighter mb-2">{calculateBMI()}</span>
               <p className="text-sm font-bold text-gray-400">Seu IMC: <span className={`font-black uppercase tracking-tight ${getBMICategory(calculateBMI()).color}`}>{getBMICategory(calculateBMI()).label}</span></p>
            </div>

            <div className="w-full bg-red-50 border border-red-100 rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">⚠️</span>
                <h3 className="text-[13px] font-black text-red-900 uppercase">Sinais de alerta identificados:</h3>
              </div>
              <ul className="space-y-2">
                {['Metabolismo desacelerado', 'Risco de acúmulo de gordura visceral', 'Hormônios da saciedade desregulados'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-red-700/80">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full bg-purple-50 border border-purple-100 rounded-3xl p-6 mb-8">
               <p className="text-[13px] font-medium text-gray-700 leading-relaxed text-center">
                 <span className="text-purple-600 font-black">O segredo para secar:</span> não é comer menos, é ativar o GLP-1. A **Gelatina Noturna** atua como um "interruptor" hormonal natural!
               </p>
            </div>

            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-50 mb-10">
               <div className="flex h-64">
                 <img src="https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(7).png" alt="Antes" className="w-1/2 object-cover border-r-2 border-white" />
                 <img src="https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(4).png" alt="Depois" className="w-1/2 object-cover" />
               </div>
               <div className="p-5 text-center">
                 <p className="text-[14px] font-black text-gray-900 mb-1">"Perdi 12kg em 5 semanas!"</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{answers[4] || 'Amiga'}, 32 anos - São Paulo</p>
                 <div className="flex justify-center gap-1 mt-2">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-orange-400 text-sm">★</span>)}
                 </div>
               </div>
            </div>

            <button onClick={(e) => handleContinue(e)} className="w-full py-5 bg-[#d946ef] hover:bg-[#c026d3] text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all">
              Continuar
            </button>
          </div>
        ) : currentQuestion.type === 'transformation_stories' ? (
          <div className="w-full flex flex-col items-center animate-fadeIn">
             <div className="text-center mb-8">
                <h2 className="text-[22px] md:text-[24px] font-extrabold text-gray-900 leading-tight">
                  Histórias de <span className="text-purple-600">Transformação</span>
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-2">
                  Veja quem já transformou o corpo com a **Gelatina Noturna**
                </p>
              </div>

              <div className="w-full mb-10 relative px-2">
                <div className="w-full min-h-[400px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 relative flex items-center justify-center">
                  {TRANSFORMATION_IMAGES.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`Transformação ${idx + 1}`} 
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${carouselIndex === idx ? 'opacity-100' : 'opacity-0'}`} 
                    />
                  ))}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2">
                    {TRANSFORMATION_IMAGES.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-2 rounded-full transition-all duration-500 ${carouselIndex === idx ? 'w-8 bg-purple-600' : 'w-2 bg-purple-200'}`}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-3 -right-1 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg rotate-12 z-20">
                  RESULTADO REAL ✨
                </div>
              </div>

              <button 
                onClick={(e) => handleContinue(e)}
                className="w-full btn-gradient py-5 rounded-2xl text-white font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Ver meu Protocolo Personalizado
              </button>
          </div>
        ) : currentQuestion.type === 'transformation_offer' ? (
           <div className="flex flex-col items-center text-center animate-fadeIn py-10">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-8 shadow-sm">
                <span className="text-4xl">🎯</span>
              </div>
              <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-tight mb-3">
                <span className="lowercase">{answers[4] || 'Amiga'}</span>, você gostaria de perder entre <span className="text-purple-600">8 e 14 quilos</span> em poucas semanas?
              </h2>
              <p className="text-sm font-medium text-gray-500 mb-10 max-w-[300px] leading-relaxed">
                Baseado no seu perfil, este resultado é totalmente alcançável com a **Gelatina Noturna**!
              </p>
              <button 
                onClick={(e) => handleContinue(e)}
                className="w-full max-w-[340px] py-5 bg-[#10b981] hover:bg-[#059669] text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                SIM! Eu quero essa transformação! 🔥
              </button>
           </div>
        ) : currentQuestion.type === 'loading_transition' ? (
          <div className="w-full flex flex-col items-center justify-center py-20 animate-fadeIn">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-8"></div>
            <h2 className="text-[22px] font-black text-gray-900 text-center mb-2">{currentQuestion.question}</h2>
            <p className="text-sm font-medium text-gray-500 text-center">{currentQuestion.subtext}</p>
          </div>
        ) : currentQuestion.type === 'intermediate_audio' ? (
          <div className="w-full flex flex-col items-center animate-fadeIn">
             <div className="text-center mb-8">
                <h2 className="text-[22px] md:text-[24px] font-extrabold text-gray-900 leading-tight mb-4 px-2">
                  {currentQuestion.question}
                </h2>
                <p className="text-[15px] font-bold text-gray-700 leading-relaxed mb-2 px-2">
                  {currentQuestion.subtext}
                </p>
              </div>

              <div className="w-full bg-gray-50 border border-gray-100 rounded-[32px] p-8 mb-10 shadow-sm flex flex-col items-center">
                <audio 
                  ref={intermediateAudioRef}
                  src="https://helpless-jade-9wxkrufo1i.edgeone.app/gelatinanoturna_%20Perfeito,%20agora....mp3"
                  onTimeUpdate={(e) => {
                    const audio = e.currentTarget;
                    if (audio.duration > 0 && audio.currentTime >= audio.duration - 10 && !isIntermediateAudioUnlocked) {
                      setIsIntermediateAudioUnlocked(true);
                    }
                  }}
                  onPlay={() => {
                    if (!audioPlayTimestamp.current) {
                      audioPlayTimestamp.current = Date.now();
                    }
                  }}
                  onEnded={() => {
                    setIsIntermediateAudioPlaying(false);
                    setIsIntermediateAudioUnlocked(true);
                  }}
                  className="hidden"
                  preload="auto"
                />
                <button 
                  onClick={() => {
                    const audio = intermediateAudioRef.current;
                    if (audio) {
                      if (audio.paused) {
                        audio.play().then(() => {
                          setIsIntermediateAudioPlaying(true);
                          if (!audioPlayTimestamp.current) audioPlayTimestamp.current = Date.now();
                        }).catch(err => {
                          console.error("Audio playback failed:", err);
                        });
                      } else {
                        audio.pause();
                        setIsIntermediateAudioPlaying(false);
                      }
                    }
                  }}
                  className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-all mb-6 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {isIntermediateAudioPlaying ? (
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  ) : (
                    <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
                <p className="text-[11px] font-bold text-purple-400 uppercase tracking-tighter">
                  {isIntermediateAudioPlaying ? "Ouvindo mensagem..." : "Clique no play para ouvir"}
                </p>
              </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-[22px] md:text-[24px] font-extrabold text-gray-900 leading-tight">
                {displayQuestion}
                {currentQuestion.questionHighlight && (
                  <span className="text-purple-600">{currentQuestion.questionHighlight}</span>
                )}
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-2">
                {currentQuestion.subtext}
              </p>
            </div>

            {currentQuestion.type === 'commitment' && (
              <div className="w-full flex flex-col gap-4 animate-fadeIn">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">✨</div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Passo 1</span>
                    <h3 className="text-sm font-black text-gray-900 leading-none mb-1">Prepare a gelatina</h3>
                    <p className="text-[11px] text-gray-500">Siga a receita simples do app</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">🕒</div>
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 uppercase">Passo 2</span>
                      <h3 className="text-sm font-black text-gray-900 leading-none mb-1">Consuma 2 vezes ao dia</h3>
                      <p className="text-[11px] text-gray-500">Uma de manhã e outra antes de dormir</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-16">
                    <span className="px-3 py-1 bg-purple-100 rounded-full text-[10px] font-bold text-purple-700">☀️ Manhã</span>
                    <span className="px-3 py-1 bg-purple-100 rounded-full text-[10px] font-bold text-purple-700">🌙 Noite</span>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">📅</div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Passo 3</span>
                    <h3 className="text-sm font-black text-gray-900 leading-none mb-1">Siga por 30 dias</h3>
                    <p className="text-[11px] text-gray-500">O protocolo completo para ver resultados</p>
                  </div>
                </div>
                <button onClick={(e) => handleContinue(e)} className="w-full mt-6 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"><span>✓ Sim, eu me comprometo!</span></button>
              </div>
            )}

            {currentQuestion.type === 'target_weight' && (
              <div className="w-full flex flex-col items-center justify-center mt-10 animate-fadeIn">
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-6xl font-black text-purple-600 tracking-tighter">{targetWeight}</span>
                  <span className="text-xl font-bold text-gray-400">kg</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={(e) => { e.stopPropagation(); adjustTargetWeight(-5); }} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">-5</button>
                  <button onClick={(e) => { e.stopPropagation(); adjustTargetWeight(-1); }} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>−</span></button>
                  <button onClick={(e) => { e.stopPropagation(); adjustTargetWeight(1); }} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>+</span></button>
                  <button onClick={(e) => { e.stopPropagation(); adjustTargetWeight(5); }} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">+5</button>
                </div>
                <button onClick={(e) => handleContinue(e)} className="w-full mt-10 py-4 btn-gradient rounded-2xl font-extrabold text-white text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Continuar</button>
              </div>
            )}

            {(currentQuestion.type === 'weight' || currentQuestion.type === 'height') && (
              <div className="w-full flex flex-col items-center justify-center mt-10">
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-6xl font-black text-purple-600 tracking-tighter">{currentQuestion.type === 'weight' ? weight : height}</span>
                  <span className="text-xl font-bold text-gray-400">{currentQuestion.type === 'weight' ? 'kg' : 'cm'}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={(e) => { e.stopPropagation(); currentQuestion.type === 'weight' ? adjustWeight(-5) : adjustHeight(-5); }} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">-5</button>
                  <button onClick={(e) => { e.stopPropagation(); currentQuestion.type === 'weight' ? adjustWeight(-1) : adjustHeight(-1); }} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>−</span></button>
                  <button onClick={(e) => { e.stopPropagation(); adjustWeight(1); }} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>+</span></button>
                  <button onClick={(e) => { e.stopPropagation(); adjustWeight(5); }} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">+5</button>
                </div>
                <button onClick={(e) => handleContinue(e)} className="w-full mt-10 py-4 btn-gradient rounded-2xl font-extrabold text-white text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Continuar</button>
              </div>
            )}

            {currentQuestion.type === 'input' && (
              <div className="w-full max-w-sm mt-4">
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  placeholder="Escreva seu primeiro nome" 
                  className="w-full p-4 text-center border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-200 focus:outline-none font-bold text-gray-700 placeholder:font-medium placeholder:text-gray-300" 
                  autoFocus 
                />
                <button 
                  onClick={(e) => handleContinue(e)} 
                  disabled={!userName.trim()} 
                  className={`w-full mt-6 py-4 rounded-xl font-extrabold text-white text-lg shadow-lg transition-all active:scale-95 ${userName.trim() ? 'bg-purple-400 hover:bg-purple-500' : 'bg-gray-300 cursor-not-allowed opacity-60'}`}
                >
                  Continuar
                </button>
              </div>
            )}

            {(currentQuestion.type === 'text' || currentQuestion.type === 'card' || currentQuestion.type === 'image') && (
               <div className={`w-full ${currentQuestion.type === 'image' ? 'grid grid-cols-2 gap-3 max-w-[340px]' : 'space-y-3'}`}>
                  {currentQuestion.options.map((option) => (
                    <button key={option.id} onClick={(e) => handleOptionSelect(e, option.id, option.label)} className={`relative w-full flex transition-all active:scale-[0.98] group ${currentQuestion.type === 'image' ? 'aspect-[3/4] rounded-xl overflow-hidden shadow-md' : 'items-center justify-between border border-gray-200 rounded-2xl bg-white hover:border-purple-300 hover:bg-purple-50 p-5'}`}>
                      {currentQuestion.type === 'image' && <img src={option.image} alt={option.label} className="w-full h-full object-cover"/>}
                      {currentQuestion.type === 'image' && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-3"><span className="text-white text-[13px] font-bold tracking-tight">{option.label}</span></div>}
                      {currentQuestion.type !== 'image' && (
                        <>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-gray-900">{option.label}</p>
                            {option.subtext && <p className="text-[11px] text-gray-500 font-medium mt-0.5">{option.subtext}</p>}
                          </div>
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-purple-500 transition-colors flex items-center justify-center flex-shrink-0">
                            {answers[currentQuestion.id] === option.label && <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>}
                          </div>
                        </>
                      )}
                    </button>
                  ))}
               </div>
            )}

            {currentQuestion.type === 'multi' && (
              <div className={`grid gap-3 w-full max-sm ${currentQuestion.columns === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {currentQuestion.options.map((option) => (
                  <button key={option.id} onClick={(e) => handleOptionSelect(e, option.id, option.label)} className={`relative flex items-center justify-between p-4 border rounded-xl transition-all active:scale-[0.98] ${selectedMulti.includes(option.id) ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-200 bg-white shadow-sm'}`}>
                    <div className={`flex items-center ${currentQuestion.columns === 2 ? 'flex-col gap-2 p-2 text-center' : 'gap-3'}`}>
                      <span className={`${currentQuestion.columns === 2 ? 'text-2xl' : 'text-xl'}`}>{option.icon}</span>
                      <span className="text-[13px] font-bold text-gray-800 leading-tight">{option.label}</span>
                    </div>
                    <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors flex-shrink-0 ${selectedMulti.includes(option.id) ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white'} ${currentQuestion.columns === 2 ? 'absolute top-3 right-3' : ''}`}>
                      {selectedMulti.includes(option.id) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {(currentQuestion.type === 'multi' || currentQuestion.type === 'intermediate_audio' || currentQuestion.type === 'results_proof_carousel') && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md flex justify-center border-t border-gray-100">
          <button 
            onClick={(e) => handleContinue(e)} 
            disabled={currentQuestion.type === 'intermediate_audio' && !isIntermediateAudioUnlocked}
            className={`w-full max-sm py-4 rounded-xl font-extrabold text-white text-lg shadow-lg transition-all active:scale-95 ${((currentQuestion.type === 'multi' && selectedMulti.length === 0) || (currentQuestion.type === 'intermediate_audio' && !isIntermediateAudioUnlocked)) ? 'bg-gray-300 cursor-not-allowed opacity-60' : 'bg-purple-400 hover:bg-purple-500'}`}
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;