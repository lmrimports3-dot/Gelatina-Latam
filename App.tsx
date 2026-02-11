
import React, { useState } from 'react';
import Opening from './components/Opening';
import QuizStep from './components/QuizStep';
import BellyTypeStep from './components/BellyTypeStep';
import EducationStep from './components/EducationStep';
import SocialProofStep from './components/SocialProofStep';
import LeadCapture from './components/LeadCapture';
import BiometricsStep from './components/BiometricsStep';
import AnalysisStep from './components/AnalysisStep';
import SpecialistAudioStep from './components/SpecialistAudioStep';
import SalesVSL from './components/SalesVSL';
import { AppStep, UserData } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.OPENING);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    gender: '',
    age: '',
    emotional: '',
    bellyType: '',
    sleep: '',
    goal: '',
    weight: 0,
    height: 0,
    commitment: false
  });

  const updateData = (newData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const next = () => {
    const steps = Object.values(AppStep);
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const stepIndex = Object.values(AppStep).indexOf(currentStep) + 1;
  const totalSteps = Object.values(AppStep).length;
  const progressPercent = Math.round((stepIndex / totalSteps) * 100);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#E9D8E9] to-white font-['Poppins'] text-gray-800 flex flex-col overflow-x-hidden">
      
      {/* Barra de Progresso */}
      {currentStep !== AppStep.OPENING && currentStep !== AppStep.SALES && (
        <div className="w-full pt-4 px-6 flex flex-col items-center">
          <div className="w-full max-w-lg">
            <div className="w-full h-1 bg-white/50 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-[#FFD700] transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Container de Conteúdo */}
      <div className="flex-1 flex flex-col justify-center items-center py-4">
        <div className="w-full max-w-lg px-6 flex flex-col items-center">
          
          {currentStep === AppStep.OPENING && <Opening onNext={next} />}

          {currentStep === AppStep.EMOTIONAL && (
            <QuizStep 
              title="Primeiro, me diga: qual destas situações mais te frustra HOJE?" 
              subtitle="Saber a sua maior frustração nos ajuda a personalizar sua jornada."
              options={[
                { label: '😥 "Acordo com a barriga menos inchada, mas ao longo do dia ela dobra de tamanho..."', value: 'bloat' },
                { label: '😤 "Já tentei de tudo: dietas, chás, exercícios... Nada parece funcionar como antes."', value: 'failed' },
                { label: '😔 "Sinto que meu corpo mudou depois da menopausa e não me reconheço mais."', value: 'hormonal' },
                { label: '😰 "Tenho vergonha de usar certas roupas ou de tirar fotos por causa da minha barriga."', value: 'shame' }
              ]}
              onSelect={(val) => { updateData({ emotional: val }); next(); }}
            />
          )}

          {currentStep === AppStep.GENDER && (
            <QuizStep 
              title="Este protocolo foi desenhado por mulheres, para mulheres. Você se identifica como:" 
              subtitle="Isso nos ajuda a ajustar a comunicação para você."
              type="gender"
              onSelect={(val) => { updateData({ gender: val }); next(); }} 
            />
          )}

          {currentStep === AppStep.AGE && (
            <QuizStep 
              title="Sua idade é crucial. Ela nos ajuda a entender seu perfil hormonal." 
              subtitle="Após os 40, nosso metabolismo muda. Precisamos saber em que fase você está."
              type="grid"
              options={[
                { label: "35-44 anos", value: "35-44", icon: "👩" },
                { label: "45-54 anos", value: "45-54", icon: "👱‍♀️" },
                { label: "55-64 anos", value: "55-64", icon: "🧓" },
                { label: "65+ anos", value: "65+", icon: "👵" }
              ]}
              onSelect={(val) => { updateData({ age: val }); next(); }} 
            />
          )}

          {currentStep === AppStep.LEAD_CAPTURE && (
            <LeadCapture onNext={(name, email) => { updateData({ name, email }); next(); }} />
          )}

          {currentStep === AppStep.BELLY_TYPE && (
            <BellyTypeStep onSelect={(val) => { updateData({ bellyType: val }); next(); }} />
          )}

          {currentStep === AppStep.SLEEP && (
            <QuizStep 
              title="Seu sono é a chave. Como você descreveria suas noites?" 
              subtitle="O ritual noturno age enquanto você dorme. Precisamos entender seu padrão de sono."
              options={[
                { label: "😴 Durmo pouco e acordo cansada.", value: "tired" },
                { label: "🌙 Demoro para pegar no sono ou acordo várias vezes.", value: "insomnia" },
                { label: "😊 Durmo bem, mas ainda assim acordo inchada.", value: "bloated_sleep" },
                { label: "💤 Durmo mais de 8 horas, mas sinto que não descansei.", value: "no_rest" }
              ]}
              onSelect={(val) => { updateData({ sleep: val }); next(); }} 
            />
          )}

          {currentStep === AppStep.EDUCATION && <EducationStep onComplete={next} />}
          
          {currentStep === AppStep.SOCIAL_PROOF && <SocialProofStep onComplete={next} />}

          {currentStep === AppStep.FINAL_GOAL && (
            <QuizStep 
              title="Estamos finalizando seu protocolo. O que seria a maior vitória para você?" 
              subtitle="Visualize seu sucesso. O que mais te motiva a mudar?"
              options={[
                { label: "👗 Voltar a usar as roupas que eu amo.", value: "clothes" },
                { label: "😊 Me olhar no espelho e sentir orgulho de novo.", value: "pride" },
                { label: "💪 Ter energia para brincar com meus filhos/netos.", value: "energy" },
                { label: "🏖️ Ir à praia sem sentir vergonha do meu corpo.", value: "beach" }
              ]}
              onSelect={(val) => { updateData({ goal: val }); next(); }} 
            />
          )}

          {currentStep === AppStep.COMMITMENT && (
            <QuizStep 
              title="Seu protocolo está pronto. Você está pronta para seguir um ritual simples de 10 segundos antes de dormir?" 
              subtitle="A mudança só depende de você. Está comprometida?"
              options={[
                { label: "✅ Sim! Estou 100% comprometida em mudar!", value: "yes" },
                { label: "❌ Não, ainda não estou pronta.", value: "no" }
              ]}
              onSelect={(val) => { updateData({ commitment: val === 'yes' }); next(); }} 
            />
          )}

          {currentStep === AppStep.BIOMETRICS && (
            <BiometricsStep onNext={(weight, height) => { updateData({ weight, height }); next(); }} />
          )}

          {currentStep === AppStep.ANALYSIS && <AnalysisStep onComplete={next} />}

          {currentStep === AppStep.SPECIALIST_AUDIO && <SpecialistAudioStep onComplete={next} />}

          {currentStep === AppStep.SALES && <SalesVSL userData={userData} />}

        </div>
      </div>
    </div>
  );
};

export default App;
