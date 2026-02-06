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

const REDIRECT_URL = "https://gelatinaexpresso.lovable.app";

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

    // 2. SISTEMA GLOBAL DE BACKREDIRECT (REFORÇADO)
    const handleRedirect = () => {
      // Bloqueio se estiver indo para o checkout
      if ((window as any).isNavigatingToCheckout) return;
      
      // Redirecionamento Direto, Imediato e Invisível
      window.location.replace(REDIRECT_URL);
    };

    // INTERCEPTAÇÃO DO BOTÃO VOLTAR (POPSTATE)
    // Criamos uma entrada artificial no histórico para "prender" o usuário
    const setupBackTrap = () => {
      window.history.pushState(null, '', window.location.href);
    };

    setupBackTrap();

    const onPopState = (event: PopStateEvent) => {
      // Quando o usuário tenta voltar, ele "cai" na entrada anterior e dispara este evento
      handleRedirect();
      // Opcional: Re-inserir o trap para bloquear múltiplas tentativas
      setupBackTrap();
    };

    // Eventos de Abandono
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') handleRedirect();
    };

    window.addEventListener('popstate', onPopState);
    window.addEventListener('pagehide', handleRedirect);
    window.addEventListener('blur', handleRedirect);
    document.addEventListener('visibilitychange', onVisibilityChange);
    
    // Interceptação de navegação em browsers mobile/modernos
    window.addEventListener('beforeunload', (e) => {
      if (!(window as any).isNavigatingToCheckout) {
        handleRedirect();
      }
    });

    return () => {
      clearTimeout(pixelTimer);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pagehide', handleRedirect);
      window.removeEventListener('blur', handleRedirect);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const handleNext = (data?: any) => {
    // Limpeza de eventos nativos para evitar erros de serialização
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