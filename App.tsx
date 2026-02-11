import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import LoadingResult from './components/LoadingResult';
import Diagnosis from './components/Diagnosis';
import AttentionAudio from './components/AttentionAudio';
import ResultAnalysis from './components/ResultAnalysis';
import PreSalesLoading from './components/PreSalesLoading';
import { AppStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [userData, setUserData] = useState<any>({
    weight: 75,
    height: 165,
    targetWeight: 60
  });

  const trackStep = (n: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', `quiz_step_${n}`);
    }
  };

  useEffect(() => {
    if (currentStep === AppStep.LANDING) trackStep(1);
    if (currentStep === AppStep.FINAL_PROOF) trackStep(14);
  }, [currentStep]);

  const handleNext = (data?: any) => {
    if (typeof window !== 'undefined') {
      (window as any).isInternalNavigation = true;
      setTimeout(() => { (window as any).isInternalNavigation = false; }, 500);
    }

    if (data) {
      setUserData((prev: any) => ({ ...prev, ...data }));
    }

    switch (currentStep) {
      case AppStep.LANDING:
        setCurrentStep(AppStep.QUIZ);
        break;
      case AppStep.QUIZ:
        setCurrentStep(AppStep.CALCULATING);
        break;
      case AppStep.CALCULATING:
        setCurrentStep(AppStep.DIAGNOSIS);
        break;
      case AppStep.DIAGNOSIS:
        setCurrentStep(AppStep.EXPERT_AUDIO);
        break;
      case AppStep.EXPERT_AUDIO:
        setCurrentStep(AppStep.PRE_SALES_LOADING);
        break;
      case AppStep.PRE_SALES_LOADING:
        setCurrentStep(AppStep.FINAL_PROOF);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F5F5F5] overflow-x-hidden">
      <main className="w-full flex-1 flex flex-col items-center">
        {currentStep === AppStep.LANDING && <Landing onNext={handleNext} />}
        {currentStep === AppStep.QUIZ && <Quiz onNext={handleNext} />}
        {currentStep === AppStep.CALCULATING && <LoadingResult onComplete={() => handleNext()} />}
        {currentStep === AppStep.DIAGNOSIS && <Diagnosis userData={userData} onNext={() => handleNext()} />}
        {currentStep === AppStep.EXPERT_AUDIO && <AttentionAudio onNext={() => handleNext()} />}
        {currentStep === AppStep.PRE_SALES_LOADING && <PreSalesLoading onComplete={() => handleNext()} />}
        {currentStep === AppStep.FINAL_PROOF && <ResultAnalysis userData={userData} onNext={() => {}} />}
      </main>
    </div>
  );
};

export default App;