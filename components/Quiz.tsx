
import React, { useState } from 'react';

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
  type: 'text' | 'image' | 'multi' | 'input' | 'card' | 'info' | 'weight' | 'height' | 'target_weight' | 'commitment' | 'transformation_offer' | 'transformation_stories' | 'analysis_summary';
  columns?: number;
}

const QUESTIONS: GenericQuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuál es tu ",
    questionHighlight: "edad?",
    subtext: "Esto nos ayuda a personalizar tu protocolo",
    type: 'text',
    options: [
      { id: 'age1', label: "18 - 27 años" },
      { id: 'age2', label: "28 - 39 años" },
      { id: 'age3', label: "40 - 54 años" },
      { id: 'age4', label: "54+ años" }
    ]
  },
  {
    id: 2,
    question: "¿Cómo clasificás ",
    questionHighlight: "tu cuerpo?",
    subtext: "Seleccioná la opción que mejor te describa",
    type: 'image',
    options: [
      { id: 'body1', label: "Medio", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(4).png" },
      { id: 'body2', label: "Plus Size", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(5).png" },
      { id: 'body3', label: "Por encima del peso", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(6).png" },
      { id: 'body4', label: "Sobrepeso", image: "https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(7).png" }
    ]
  },
  {
    id: 3,
    question: "¿Cuáles son las áreas donde más ",
    questionHighlight: "querés perder grasa?",
    subtext: "Seleccioná todas las que apliquen",
    type: 'multi',
    columns: 2,
    options: [
      { id: 'area1', label: "Caderas", icon: "🦵" },
      { id: 'area2', label: "Brazos", icon: "💪" },
      { id: 'area3', label: "Panza", icon: "🎯" },
      { id: 'area4', label: "Muslos", icon: "🦵" },
      { id: 'area5', label: "Glúteos", icon: "🍑" },
      { id: 'area6', label: "Todo el cuerpo", icon: "✨" }
    ]
  },
  {
    id: 4,
    question: "¿Cuál es tu ",
    questionHighlight: "nombre?",
    subtext: "Queremos conocerte mejor 💖",
    type: 'input',
    options: []
  },
  {
    id: 5,
    question: "¿Cómo afecta el peso tu vida?",
    subtext: "Entender esto nos ayuda a crear tu protocolo ideal",
    type: 'card',
    options: [
      { id: 'life1', label: "Afecta mi autoestima", subtext: "Me siento insegura con mi cuerpo", icon: "💔" },
      { id: 'life2', label: "Afecta mi salud", subtext: "Siento cansancio, dolores y falta de energía", icon: "🏥" },
      { id: 'life3', label: "Afecta mis relaciones", subtext: "Evito encuentros y situaciones sociales", icon: "👥" },
      { id: 'life4', label: "Afecta mi rutina", subtext: "Dificultad para hacer tareas simples", icon: "📅" }
    ]
  },
  {
    id: 6,
    question: "¿Estás feliz con tu apariencia actual?",
    subtext: "Sincerate con vos misma",
    type: 'card',
    options: [
      { id: 'hap1', label: "No estoy feliz", icon: "😔" },
      { id: 'hap2', label: "Podría estar mejor", icon: "🙄" },
      { id: 'hap3', label: "Estoy trabajando en eso", icon: "💪" }
    ]
  },
  {
    id: 7,
    question: "¿Qué te impide adelgazar?",
    subtext: "Seleccioná todos los obstáculos que enfrentás",
    type: 'multi',
    columns: 1,
    options: [
      { id: 'bar1', label: "Falta de tiempo", icon: "⏰" },
      { id: 'bar2', label: "Falta de autocontrol", icon: "🍫" },
      { id: 'bar3', label: "Cuestiones económicas", icon: "💰" },
      { id: 'bar4', label: "Falta de constancia", icon: "📉" }
    ]
  },
  {
    id: 8,
    question: "¿Qué querés conquistar?",
    subtext: "Seleccioná tus mayores objetivos",
    type: 'multi',
    columns: 2,
    options: [
      { id: 'goal1', label: "Tener más energía", icon: "⚡" },
      { id: 'goal2', label: "Usar la ropa que amo", icon: "👗" },
      { id: 'goal3', label: "Mejorar mi autoestima", icon: "💖" },
      { id: 'goal4', label: "Tener más salud", icon: "💪" },
      { id: 'goal5', label: "Sentirme más liviana", icon: "🦋" },
      { id: 'goal6', label: "Recibir elogios", icon: "🌟" }
    ]
  },
  {
    id: 9,
    question: "¡Buenísimo, [nombre]! 🎉",
    subtext: "Sin esfuerzo ni dietas pesadas: **La Gelatina Correcta** hace el trabajo pesado por vos, activando la quema de grasa con ingredientes caseros que preparás en minutos.",
    type: 'info',
    options: []
  },
  {
    id: 10,
    question: "¿Cuál es tu peso actual?",
    subtext: "Sé sincera para obtener un resultado preciso",
    type: 'weight',
    options: []
  },
  {
    id: 11,
    question: "¿Cuál es tu altura?",
    subtext: "Necesitamos esto para calcular tu IMC",
    type: 'height',
    options: []
  },
  {
    id: 12,
    question: "¿Cuál es tu peso deseado?",
    subtext: "¿Cuál es el peso que soñás alcanzar?",
    type: 'target_weight',
    options: []
  },
  {
    id: 13,
    question: "¿Cuántos embarazos tuviste?",
    subtext: "Esto influye en tu metabolismo",
    type: 'card',
    options: [
      { id: 'preg0', label: "Nunca estuve embarazada", icon: "🚫" },
      { id: 'preg1', label: "1 embarazo", icon: "1️⃣" },
      { id: 'preg2', label: "2 embarazos", icon: "2️⃣" },
      { id: 'preg3', label: "3 o más embarazos", icon: "👶" }
    ]
  },
  {
    id: 14,
    question: "¿Cómo es tu rutina diaria?",
    subtext: "Vamos a adaptar el protocolo a tu día a día",
    type: 'card',
    options: [
      { id: 'routine1', label: "Trabajo fuera de casa", icon: "🏢" },
      { id: 'routine2', label: "Hago home office", icon: "🏠" },
      { id: 'routine3', label: "Cuido la casa / familia", icon: "👪" },
      { id: 'routine4', label: "Estudio", icon: "📚" }
    ]
  },
  {
    id: 15,
    question: "¿Cuántas horas dormís por noche?",
    subtext: "El sueño influye directamente en el adelgazamiento",
    type: 'card',
    options: [
      { id: 'sleep1', label: "Menos de 5 horas", icon: "😴" },
      { id: 'sleep2', label: "5 a 7 horas", icon: "🌙" },
      { id: 'sleep3', label: "7 a 9 horas", icon: "😊" },
      { id: 'sleep4', label: "Más de 9 horas", icon: "💤" }
    ]
  },
  {
    id: 16,
    question: "¿Cuánta agua bebés por día?",
    subtext: "La hidratación es fundamental para la quema de grasa",
    type: 'card',
    options: [
      { id: 'water1', label: "Casi nada", icon: "🥤" },
      { id: 'water2', label: "Menos de 1 litro", icon: "💧" },
      { id: 'water3', label: "1 a 2 litros", icon: "💦" },
      { id: 'water4', label: "Más de 2 litros", icon: "🌊" }
    ]
  },
  {
    id: 17,
    question: "Resultado de tu análisis, [nombre]",
    subtext: "Analizamos tu perfil basado en tus respuestas.",
    type: 'analysis_summary',
    options: []
  },
  {
    id: 18,
    question: "Cómo usar ",
    questionHighlight: "La Gelatina Correcta",
    subtext: "Simple, práctico y eficaz",
    type: 'commitment',
    options: []
  },
  {
    id: 19,
    question: "¿Cuál es el ",
    questionHighlight: "cuerpo de tus sueños?",
    subtext: "¿Cómo te imaginás de acá a 30 días?",
    type: 'card',
    options: [
      { id: 'dream1', label: "En forma y definida", icon: "💪" },
      { id: 'dream2', label: "Natural y saludable", icon: "🌸" }
    ]
  },
  {
    id: 20,
    question: "[nombre], ¿te gustaría perder entre ",
    questionHighlight: "8 y 14 kilos",
    subtext: "Basado en tu perfil, ¡este resultado es totalmente alcanzable con **La Gelatina Correcta**!",
    type: 'transformation_offer',
    options: []
  },
  {
    id: 21,
    question: "Historias de ",
    questionHighlight: "Transformación",
    subtext: "Mirá quién ya transformó su cuerpo con **La Gelatina Correcta**",
    type: 'transformation_stories',
    options: []
  }
];

const Quiz: React.FC<{ onNext: (finalAnswers: any) => void }> = ({ onNext }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [userName, setUserName] = useState('');
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(165);
  const [targetWeight, setTargetWeight] = useState(60);

  const finishQuiz = (updatedAnswers: any) => {
    onNext({
      ...updatedAnswers,
      weight,
      height,
      targetWeight,
      name: answers[4] || userName || 'Amiga'
    });
  };

  const handleOptionSelect = (optionId: string, optionLabel: string) => {
    if (currentQuestion.type === 'multi') {
      setSelectedMulti(prev => 
        prev.includes(optionId) 
          ? prev.filter(id => id !== optionId) 
          : [...prev, optionId]
      );
      return;
    }

    const updatedAnswers = { ...answers, [currentQuestion.id]: optionLabel };
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

  const handleContinue = () => {
    if (currentQuestion.type === 'multi' && selectedMulti.length === 0) return;
    if (currentQuestion.type === 'input' && !userName.trim()) return;

    let answerValue: any;
    if (currentQuestion.type === 'input') {
      answerValue = userName;
    } else if (currentQuestion.type === 'weight') {
      answerValue = weight;
    } else if (currentQuestion.type === 'height') {
      answerValue = height;
    } else if (currentQuestion.type === 'target_weight') {
      answerValue = targetWeight;
    } else if (currentQuestion.type === 'multi') {
      answerValue = selectedMulti;
    } else {
      answerValue = true; 
    }

    const updatedAnswers = { ...answers, [currentQuestion.id]: answerValue };
    setAnswers(updatedAnswers);
    
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedMulti([]); 
    } else {
      finishQuiz(updatedAnswers);
    }
  };

  const adjustWeight = (amount: number) => {
    setWeight(prev => {
      const newVal = prev + amount;
      return Math.min(Math.max(newVal, 45), 150);
    });
  };

  const adjustHeight = (amount: number) => {
    setHeight(prev => {
      const newVal = prev + amount;
      return Math.min(Math.max(newVal, 140), 220);
    });
  };

  const adjustTargetWeight = (amount: number) => {
    setTargetWeight(prev => {
      const newVal = prev + amount;
      return Math.min(Math.max(newVal, 40), weight - 1);
    });
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const totalSteps = 24; 
  
  const stepMap: Record<number, number> = {
    17: 18,
    18: 19,
    19: 21,
    20: 22,
    21: 23
  };
  const currentStep = stepMap[currentQuestion.id] || (currentQuestionIndex + 2); 
  
  const progressMap: Record<number, number> = { 
    2: 8, 3: 13, 4: 17, 5: 21, 6: 25, 7: 29, 8: 33, 9: 38, 10: 42, 11: 46, 12: 50, 13: 54, 14: 58, 15: 63, 16: 67, 18: 75, 19: 79, 21: 88, 22: 92, 23: 96 
  };
  const progressPercentage = progressMap[currentStep] || 75;

  let displayQuestion = currentQuestion.question;
  if (currentQuestion.id === 5) {
    displayQuestion = `${answers[4] || 'Amiga'}, ${currentQuestion.question}`;
  } else if (currentQuestion.id === 9 || currentQuestion.id === 20 || currentQuestion.id === 17) {
    displayQuestion = currentQuestion.question.replace('[nombre]', answers[4] || 'Amiga');
  }

  const calculateBMI = () => {
    const h = height / 100;
    const bmi = weight / (h * h);
    return bmi.toFixed(1);
  };
  
  const getBMICategory = (bmi: string) => {
    const b = parseFloat(bmi);
    if (b < 18.5) return { label: 'Bajo peso', color: 'text-blue-500' };
    if (b < 25) return { label: 'Normal', color: 'text-green-500' };
    if (b < 30) return { label: 'Sobrepeso', color: 'text-orange-500' };
    return { label: 'Obesidad', color: 'text-red-500' };
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white pb-24 relative">
      <div className="w-full px-4 pt-4 pb-2 sticky top-[100px] bg-white z-10">
        <div className="flex justify-between items-end mb-1 px-1">
          <span className="text-[11px] font-bold text-gray-700">Etapa {currentStep} de {totalSteps}</span>
          <span className="text-[11px] font-bold text-purple-600">{progressPercentage}%</span>
        </div>
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
              Resultado de tu análisis, <span className="text-purple-600 lowercase">{answers[4] || 'Amiga'}</span>
            </h2>

            <div className="w-full bg-white rounded-3xl p-8 shadow-lg border border-gray-100 flex flex-col items-center mb-6">
               <span className="text-6xl font-black text-purple-600 tracking-tighter mb-2">{calculateBMI()}</span>
               <p className="text-sm font-bold text-gray-400">Su IMC: <span className={`font-black uppercase tracking-tight ${getBMICategory(calculateBMI()).color}`}>{getBMICategory(calculateBMI()).label}</span></p>
            </div>

            <div className="w-full bg-red-50 border border-red-100 rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">⚠️</span>
                <h3 className="text-[13px] font-black text-red-900 uppercase">Señales de alerta identificadas:</h3>
              </div>
              <ul className="space-y-2">
                {['Metabolismo desacelerado', 'Riesgo de acumulación de grasa visceral', 'Hormonas de saciedad desreguladas'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs font-bold text-red-700/80">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full bg-purple-50 border border-purple-100 rounded-3xl p-6 mb-8">
               <p className="text-[13px] font-medium text-gray-700 leading-relaxed text-center">
                 <span className="text-purple-600 font-black">El secreto para secar:</span> no es comer menos, es activar el GLP-1. ¡**La Gelatina Correcta** actúa como un "interruptor" hormonal natural!
               </p>
            </div>

            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-50 mb-10">
               <div className="flex h-64">
                 <img src="https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(7).png" alt="Antes" className="w-1/2 object-cover border-r-2 border-white" />
                 <img src="https://ik.imagekit.io/ekdmcxqtr/Image_fx%20(4).png" alt="Después" className="w-1/2 object-cover" />
               </div>
               <div className="p-5 text-center">
                 <p className="text-[14px] font-black text-gray-900 mb-1">"¡Bajé 12kg en 5 semanas!"</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{answers[4] || 'Amiga'}, 32 años - Buenos Aires</p>
                 <div className="flex justify-center gap-1 mt-2">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-orange-400 text-sm">★</span>)}
                 </div>
               </div>
            </div>

            <button onClick={handleContinue} className="w-full py-5 bg-[#d946ef] hover:bg-[#c026d3] text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all">
              Continuar
            </button>
          </div>
        ) : currentQuestion.type === 'transformation_stories' ? (
          <div className="w-full flex flex-col items-center animate-fadeIn">
             <div className="text-center mb-8">
                <h2 className="text-[22px] md:text-[24px] font-extrabold text-gray-900 leading-tight">
                  Historias de <span className="text-purple-600">Transformación</span>
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-2">
                  Mirá quién ya transformó su cuerpo con **La Gelatina Correcta**
                </p>
              </div>

              <div className="space-y-6 w-full mb-10">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-50 overflow-hidden">
                  <div className="h-64 w-full">
                    <img 
                      src="https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_4.jpg?updatedAt=1769185371770" 
                      alt="Transformación 1" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-black text-gray-900 mb-0.5">"Increíble... ¡Bajé 7kg en 3 semanas!"</p>
                    <p className="text-[10px] font-bold text-gray-400">Giovanna, 34 - Buenos Aires</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-50 overflow-hidden">
                  <div className="h-64 w-full">
                    <img 
                      src="https://ik.imagekit.io/ekdmcxqtr/carousel_antes_depois_1.jpg?updatedAt=1769185371443" 
                      alt="Transformación 2" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-black text-gray-900 mb-0.5">"¡Por fin logré desinflamar mi panza!"</p>
                    <p className="text-[10px] font-bold text-gray-400">Romina, 41 - Córdoba</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleContinue}
                className="w-full btn-gradient py-5 rounded-2xl text-white font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                Ver mi Protocolo Personalizado
              </button>
          </div>
        ) : currentQuestion.type === 'transformation_offer' ? (
           <div className="flex flex-col items-center text-center animate-fadeIn py-10">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-8 shadow-sm">
                <span className="text-4xl">🎯</span>
              </div>
              
              <h2 className="text-[20px] md:text-[22px] font-extrabold text-gray-900 leading-tight mb-3">
                <span className="lowercase">{answers[4] || 'Amiga'}</span>, ¿te gustaría perder entre <span className="text-purple-600">8 y 14 kilos</span> en pocas semanas?
              </h2>
              
              <p className="text-sm font-medium text-gray-500 mb-10 max-w-[300px] leading-relaxed">
                Basado en tu perfil, ¡este resultado es totalmente alcanzable con **La Gelatina Correcta**!
              </p>

              <button 
                onClick={handleContinue}
                className="w-full max-w-[340px] py-5 bg-[#10b981] hover:bg-[#059669] text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                ¡SÍ! ¡Quiero esa transformación! 🔥
              </button>
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
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Paso 1</span>
                    <h3 className="text-sm font-black text-gray-900 leading-none mb-1">Prepará la gelatina</h3>
                    <p className="text-[11px] text-gray-500">Seguí la receta simple de la app</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">🕒</div>
                    <div>
                      <span className="text-[10px] font-bold text-purple-600 uppercase">Paso 2</span>
                      <h3 className="text-sm font-black text-gray-900 leading-none mb-1">Consumila 2 veces al día</h3>
                      <p className="text-[11px] text-gray-500">Una a la mañana y otra antes de dormir</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-16">
                    <span className="px-3 py-1 bg-purple-100 rounded-full text-[10px] font-bold text-purple-700">☀️ Mañana</span>
                    <span className="px-3 py-1 bg-purple-100 rounded-full text-[10px] font-bold text-purple-700">🌙 Noche</span>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl flex-shrink-0">📅</div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase">Paso 3</span>
                    <h3 className="text-sm font-black text-gray-900 leading-none mb-1">Seguilo por 30 días</h3>
                    <p className="text-[11px] text-gray-500">El protocolo completo para ver resultados</p>
                  </div>
                </div>
                <div className="mt-4 bg-purple-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center justify-between relative px-2">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-orange-300 via-purple-300 to-purple-400 -translate-y-1/2 -z-0"></div>
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-purple-100 text-lg">☀️</div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-900 leading-none">Mañana</p>
                        <p className="text-[8px] text-gray-500 font-medium">En ayunas</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-purple-100 text-lg">✨</div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-900 leading-none">Día</p>
                        <p className="text-[8px] text-gray-500 font-medium">Sin hambre</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-purple-100 text-lg">🌙</div>
                      <div className="text-center">
                        <p className="text-[10px] font-bold text-gray-900 leading-none">Noche</p>
                        <p className="text-[8px] text-gray-500 font-medium">Antes de dormir</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={handleContinue} className="w-full mt-6 py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2"><span>✓ ¡Sí, me comprometo!</span></button>
              </div>
            )}

            {currentQuestion.type === 'target_weight' && (
              <div className="w-full flex flex-col items-center justify-center mt-10 animate-fadeIn">
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-6xl font-black text-purple-600 tracking-tighter">{targetWeight}</span>
                  <span className="text-xl font-bold text-gray-400">kg</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => adjustTargetWeight(-5)} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">-5</button>
                  <button onClick={() => adjustTargetWeight(-1)} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>−</span></button>
                  <button onClick={() => adjustTargetWeight(1)} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>+</span></button>
                  <button onClick={() => adjustTargetWeight(5)} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">+5</button>
                </div>
                <div className="w-full max-w-[200px] flex justify-between text-[11px] font-bold text-gray-300 uppercase tracking-widest mt-2"><span>40 kg</span><span>{weight - 1} kg</span></div>
                <button onClick={handleContinue} className="w-full mt-10 py-4 btn-gradient rounded-2xl font-extrabold text-white text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Continuar</button>
              </div>
            )}

            {(currentQuestion.type === 'weight' || currentQuestion.type === 'height') && (
              <div className="w-full flex flex-col items-center justify-center mt-10">
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-6xl font-black text-purple-600 tracking-tighter">{currentQuestion.type === 'weight' ? weight : height}</span>
                  <span className="text-xl font-bold text-gray-400">{currentQuestion.type === 'weight' ? 'kg' : 'cm'}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={() => currentQuestion.type === 'weight' ? adjustWeight(-5) : adjustHeight(-5)} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">-5</button>
                  <button onClick={() => currentQuestion.type === 'weight' ? adjustWeight(-1) : adjustHeight(-1)} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>−</span></button>
                  <button onClick={() => currentQuestion.type === 'weight' ? adjustWeight(1) : adjustHeight(1)} className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl text-purple-600 active:scale-90 transition-transform"><span>+</span></button>
                  <button onClick={() => currentQuestion.type === 'weight' ? adjustWeight(5) : adjustHeight(5)} className="w-12 h-12 flex items-center justify-center text-sm font-bold text-gray-400">+5</button>
                </div>
                <div className="w-full max-w-[200px] flex justify-between text-[11px] font-bold text-gray-300 uppercase tracking-widest mt-2"><span>{currentQuestion.type === 'weight' ? '45 kg' : '140 cm'}</span><span>{currentQuestion.type === 'weight' ? '150 kg' : '200 cm'}</span></div>
                <button onClick={handleContinue} className="w-full mt-10 py-4 btn-gradient rounded-2xl font-extrabold text-white text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Continuar</button>
              </div>
            )}

            {currentQuestion.type === 'info' && (
              <div className="w-full flex flex-col items-center animate-fadeIn">
                <p className="text-[15px] text-gray-600 text-center leading-relaxed mb-8 px-2">Sin esfuerzo ni dietas pesadas: <span className="font-bold text-purple-600">La Gelatina Correcta</span> hace el trabajo pesado por vos, activando la quema de grasa con ingredientes caseros que preparás en minutos.</p>
                <div className="relative mb-10 w-full max-w-[280px]">
                  <div className="bg-gray-50 rounded-3xl p-6 flex flex-col items-center shadow-sm">
                    <img src="https://ik.imagekit.io/ekdmcxqtr/e9e0639c-6c94-4464-ab97-8e369eb06fdf.png" alt="Gelatina" className="w-32 h-32 object-cover rounded-2xl shadow-lg mb-6 rotate-3"/>
                    <div className="flex items-center justify-between w-full px-4 gap-2">
                      <div className="flex flex-col items-center"><div className="text-2xl mb-1">👤</div><span className="text-[10px] font-bold text-gray-400 uppercase">Vos</span></div>
                      <div className="text-purple-300 text-xl animate-pulse">→</div>
                      <div className="flex flex-col items-center"><div className="text-2xl mb-1">🍮</div><span className="text-[10px] font-bold text-purple-600 uppercase">Gelatina</span></div>
                      <div className="text-purple-300 text-xl animate-pulse">→</div>
                      <div className="flex flex-col items-center"><div className="text-2xl mb-1">✨</div><span className="text-[10px] font-bold text-gray-400 uppercase">Objetivo</span></div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-purple-50 border border-purple-100 p-5 rounded-2xl mb-8"><p className="text-sm leading-relaxed text-gray-700"><span className="font-bold text-purple-700">Cómo funciona:</span> La receta casera activa el <span className="font-bold">GLP-1</span>, la misma hormona que logra el efecto del Mounjaro, ¡pero de forma 100% natural!</p></div>
                <button onClick={handleContinue} className="w-full py-4 btn-gradient rounded-2xl font-extrabold text-white text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">¡Entendido! Continuar 🚀</button>
              </div>
            )}

            {currentQuestion.type === 'image' && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-[340px]">
                {currentQuestion.options.map((option) => (
                  <button key={option.id} onClick={() => handleOptionSelect(option.id, option.label)} className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md active:scale-95 transition-transform group">
                    <img src={option.image} alt={option.label} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-3"><span className="text-white text-[13px] font-bold tracking-tight">{option.label}</span></div>
                    {answers[currentQuestion.id] === option.label && <div className="absolute inset-0 border-4 border-purple-500 rounded-xl bg-purple-500/10"></div>}
                  </button>
                ))}
              </div>
            )}

            {(currentQuestion.type === 'text' || currentQuestion.type === 'card') && (
              <div className="w-full space-y-3">
                {currentQuestion.options.map((option) => (
                  <button key={option.id} onClick={() => handleOptionSelect(option.id, option.label)} className={`w-full flex items-center justify-between border border-gray-200 rounded-2xl bg-white hover:border-purple-300 hover:bg-purple-50 transition-all active:scale-[0.98] group ${currentQuestion.type === 'card' ? 'p-4 gap-4' : 'p-5'}`}>
                    {currentQuestion.type === 'card' && <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-purple-100 transition-colors">{option.icon}</div>}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-gray-900">{option.label}</p>
                      {option.subtext && <p className="text-[11px] text-gray-500 font-medium mt-0.5">{option.subtext}</p>}
                    </div>
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full group-hover:border-purple-500 transition-colors flex items-center justify-center flex-shrink-0">
                      {answers[currentQuestion.id] === option.label && <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multi' && (
              <div className={`grid gap-3 w-full max-sm ${currentQuestion.columns === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {currentQuestion.options.map((option) => (
                  <button key={option.id} onClick={() => handleOptionSelect(option.id, option.label)} className={`relative flex items-center justify-between p-4 border rounded-xl transition-all active:scale-[0.98] ${selectedMulti.includes(option.id) ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-200 bg-white shadow-sm'}`}>
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

            {currentQuestion.type === 'input' && (
              <div className="w-full max-w-sm mt-4">
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Escribí tu primer nombre" className="w-full p-4 text-center border-2 border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-200 focus:outline-none font-bold text-gray-700 placeholder:font-medium placeholder:text-gray-300" autoFocus />
                <button onClick={handleContinue} disabled={!userName.trim()} className={`w-full mt-6 py-4 rounded-xl font-extrabold text-white text-lg shadow-lg transition-all active:scale-95 ${userName.trim() ? 'bg-purple-400 hover:bg-purple-500' : 'bg-gray-300 cursor-not-allowed opacity-60'}`}>Continuar</button>
              </div>
            )}
          </>
        )}
      </div>

      {currentQuestion.type === 'multi' && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md flex justify-center border-t border-gray-100">
          <button onClick={handleContinue} disabled={selectedMulti.length === 0} className={`w-full max-w-sm py-4 rounded-xl font-extrabold text-white text-lg shadow-lg transition-all active:scale-95 ${selectedMulti.length > 0 ? 'bg-purple-400 hover:bg-purple-500' : 'bg-gray-300 cursor-not-allowed opacity-60'}`}>Continuar</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
