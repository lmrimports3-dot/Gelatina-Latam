
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import LoadingResult from './components/LoadingResult';
import AttentionAudio from './components/AttentionAudio';
import DiagnosisLoading from './components/DiagnosisLoading';
import Diagnosis from './components/Diagnosis';
import DiscountScratch from './components/DiscountScratch';
import ResultAnalysis from './components/ResultAnalysis';
import { AppStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. UTMify Pixels e Scripts
    const pixelTimer = setTimeout(() => {
      if (!(window as any).pixelId) {
        (window as any).pixelId = "69702fa1c5b721d69dce91ef";
        const utmifyPixel = document.createElement("script");
        utmifyPixel.async = true;
        utmifyPixel.defer = true;
        utmifyPixel.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
        document.head.appendChild(utmifyPixel);
      }

      const utmifyCapture = document.createElement("script");
      utmifyCapture.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
      utmifyCapture.setAttribute("data-utmify-prevent-xcod-sck", "");
      utmifyCapture.setAttribute("data-utmify-prevent-subids", "");
      utmifyCapture.async = true;
      utmifyCapture.defer = true;
      document.head.appendChild(utmifyCapture);
    }, 1500);

    return () => {
      clearTimeout(pixelTimer);
    };
  }, []);

  const handleNext = (data?: any) => {
    if (data && (
      data.nativeEvent || 
      data instanceof Event || 
      (typeof Node !== 'undefined' && data instanceof Node) || 
      typeof data.preventDefault === 'function' ||
      data.target
    )) {
      data = null; 
    }

    if (data && typeof data === 'object') {
      try {
        const sanitized = JSON.parse(JSON.stringify(data, (key, value) => {
          if (typeof Node !== 'undefined' && value instanceof Node) return undefined;
          if (value instanceof Event) return undefined;
          return value;
        }));
        setUserData((prev: any) => ({ ...prev, ...sanitized }));
      } catch (e) {
        console.warn("Circular reference detected.");
      }
    }

    switch (currentStep) {
      case AppStep.LANDING:
        setCurrentStep(AppStep.QUIZ);
        break;
      case AppStep.QUIZ:
        setCurrentStep(AppStep.CALCULATING);
        break;
      case AppStep.CALCULATING:
        setCurrentStep(AppStep.ATTENTION_AUDIO);
        break;
      case AppStep.ATTENTION_AUDIO:
        setCurrentStep(AppStep.DIAGNOSIS_LOADING);
        break;
      case AppStep.DIAGNOSIS_LOADING:
        setCurrentStep(AppStep.DIAGNOSIS);
        break;
      case AppStep.DIAGNOSIS:
        setCurrentStep(AppStep.DISCOUNT_SCRATCH);
        break;
      case AppStep.DISCOUNT_SCRATCH:
        setCurrentStep(AppStep.RESULT);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white overflow-x-hidden">
      <main className="w-full flex-1 flex flex-col items-center">
        {currentStep === AppStep.LANDING && <Landing onNext={() => handleNext()} />}
        {currentStep === AppStep.QUIZ && <Quiz onNext={(data) => handleNext(data)} />}
        {currentStep === AppStep.CALCULATING && <LoadingResult onComplete={() => handleNext()} />}
        {currentStep === AppStep.ATTENTION_AUDIO && <AttentionAudio onNext={() => handleNext()} />}
        {currentStep === AppStep.DIAGNOSIS_LOADING && <DiagnosisLoading onComplete={() => handleNext()} />}
        {currentStep === AppStep.DIAGNOSIS && <Diagnosis userData={userData} onNext={() => handleNext()} />}
        {currentStep === AppStep.DISCOUNT_SCRATCH && <DiscountScratch onNext={() => handleNext()} />}
        {currentStep === AppStep.RESULT && <ResultAnalysis userData={userData} onNext={() => {}} />}
      </main>
    </div>
  );
};

export default App;
