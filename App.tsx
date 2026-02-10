import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Transition from './components/Transition';
import Quiz from './components/Quiz';
import LoadingResult from './components/LoadingResult';
import AttentionAudio from './components/AttentionAudio';
import DiagnosisLoading from './components/DiagnosisLoading';
import Diagnosis from './components/Diagnosis';
import DiscountScratch from './components/DiscountScratch';
import ResultAnalysis from './components/ResultAnalysis';
import { AppStep } from './types';

const REDIRECT_URL = "https://ofertaexclusiva.figma.site/";

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [userData, setUserData] = useState<any>(null);

  const trackStep = (n: number) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', `quiz_step_${n}`);
    }
  };

  useEffect(() => {
    // Tracking global steps
    if (currentStep === AppStep.LANDING) trackStep(1);
    if (currentStep === AppStep.TRANSITION) trackStep(2);
    if (currentStep === AppStep.CALCULATING) trackStep(30);
    if (currentStep === AppStep.ATTENTION_AUDIO) trackStep(31);
    if (currentStep === AppStep.DIAGNOSIS_LOADING) trackStep(32);
    if (currentStep === AppStep.DIAGNOSIS) trackStep(33);
    if (currentStep === AppStep.DISCOUNT_SCRATCH) trackStep(34);
    if (currentStep === AppStep.RESULT) trackStep(35);
  }, [currentStep]);

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

    // 2. IMPLEMENTAÇÃO DO BACK REDIRECT (SCRIPT GLOBAL)
    // Criar Stack Manual de History
    window.history.pushState({br:true}, "", window.location.href);
    window.history.pushState({br:true}, "", window.location.href);

    const handleBackRedirect = () => {
      if (sessionStorage.getItem("br_done")) return;
      sessionStorage.setItem("br_done", "1");
      window.location.replace(REDIRECT_URL);
    };

    // Captura do Botão Voltar
    window.addEventListener("popstate", function(e) {
      handleBackRedirect();
    });

    // Captura de Fechamento de Aba / Navegador
    window.addEventListener("beforeunload", function(e) {
      handleBackRedirect();
    });

    window.addEventListener("pagehide", function(e) {
      handleBackRedirect();
    });

    return () => {
      clearTimeout(pixelTimer);
    };
  }, []);

  const handleNext = (data?: any) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({br:true}, "", window.location.href);
    }

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
        setCurrentStep(AppStep.TRANSITION);
        break;
      case AppStep.TRANSITION:
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
        {currentStep === AppStep.TRANSITION && <Transition onNext={() => handleNext()} />}
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