
import React, { useState } from 'react';
import Landing from './components/Landing';
import Transition from './components/Transition';
import Quiz from './components/Quiz';
import LoadingResult from './components/LoadingResult';
import ResultAnalysis from './components/ResultAnalysis';
import { AppStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [userData, setUserData] = useState<any>(null);

  const handleNext = (data?: any) => {
    // Only set userData if it's actual quiz data and not a DOM/React event
    if (data && typeof data.preventDefault !== 'function' && !data.nativeEvent) {
      setUserData(data);
    }

    switch (currentStep) {
      case AppStep.LANDING:
        setCurrentStep(AppStep.TRANSITION);
        break;
      case AppStep.TRANSITION:
        setCurrentStep(AppStep.QUIZ);
        break;
      case AppStep.QUIZ:
        setCurrentStep(AppStep.CALCULATING);
        break;
      case AppStep.CALCULATING:
        setCurrentStep(AppStep.RESULT);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white overflow-x-hidden">
      {/* Global Fixed Header - Adjusted height and padding for a larger logo */}
      <header className="w-full bg-white flex justify-center sticky top-0 z-50 border-b border-gray-100 shadow-sm h-[100px] items-center px-4">
         <img 
            src="https://ik.imagekit.io/ekdmcxqtr/ChatGPT%20Image%2030%20de%20jan.%20de%202026,%2011_35_41.png" 
            alt="La Gelatina Correcta Logo" 
            className="h-20 md:h-24 w-auto object-contain transition-all" 
         />
      </header>

      <main className="w-full flex-1 flex flex-col items-center">
        {currentStep === AppStep.LANDING && <Landing onNext={handleNext} />}
        {currentStep === AppStep.TRANSITION && <Transition onNext={handleNext} />}
        {currentStep === AppStep.QUIZ && <Quiz onNext={handleNext} />}
        {currentStep === AppStep.CALCULATING && <LoadingResult onComplete={handleNext} />}
        {currentStep === AppStep.RESULT && <ResultAnalysis userData={userData} onNext={() => {}} />}
      </main>
    </div>
  );
};

export default App;
