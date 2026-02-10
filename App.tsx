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

    // 2. SISTEMA DE BACK REDIRECT SEGURO
    const performBackRedirect = (event?: any) => {
      // Regra 10: Controle por sessão (executar apenas 1 vez)
      if (sessionStorage.getItem('back_redirect_fired')) return;

      // Proteção contra disparos em botões de CTA/Checkout (Regra 6)
      if ((window as any).isNavigatingToCheckout) return;
      
      // Regra 7: Whitelist (Não disparar se URL contiver termos específicos)
      const whitelist = [
        '/checkout', '/pagamento', '/payment', '/obrigado', 
        '/thankyou', '/success', '/stripe', '/paypal', 
        '/hotmart', '/kirvano'
      ];
      const currentUrl = window.location.href.toLowerCase();
      if (whitelist.some(term => currentUrl.includes(term))) return;

      // Proteção: Impedir disparo em Reload/Refresh (Regra 6)
      if (window.performance && window.performance.getEntriesByType) {
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation && navigation.type === 'reload') return;
      }

      // Execução única
      sessionStorage.setItem('back_redirect_fired', 'true');
      
      // Regra 8: Comportamento imediato e invisível
      window.location.replace(REDIRECT_URL);
    };

    const setupHistoryTrap = () => {
      // Regra 5: Interceptar history para capturar o voltar
      window.history.pushState(null, '', window.location.href);
    };

    // Inicializa armadilha de histórico
    setupHistoryTrap();

    const onPopState = (event: PopStateEvent) => {
      // Regra 3: Evento popstate permitido para captura do voltar
      performBackRedirect();
      // Garante que o usuário permaneça na "armadilha" se o redirect falhar
      setupHistoryTrap();
    };

    // Listeners permitidos conforme Regra 3
    window.addEventListener('popstate', onPopState);
    
    // Regra 3: Interceptar fechamento real via beforeunload e pagehide
    window.addEventListener('beforeunload', (e) => {
      // Proteção contra disparo em navegação interna controlada
      if (!(window as any).isNavigatingInternally) {
        performBackRedirect();
      }
    });

    window.addEventListener('pagehide', (e) => {
      // Regra 1: Disparar em tentativa real de abandono/fechamento
      if (!e.persisted && !(window as any).isNavigatingInternally) {
        performBackRedirect();
      }
    });

    return () => {
      clearTimeout(pixelTimer);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const handleNext = (data?: any) => {
    // Flag de proteção para impedir backredirect durante troca de steps (Navegação interna - Regra 6)
    (window as any).isNavigatingInternally = true;
    
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.href);
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

    // Libera a flag após a troca de estado
    setTimeout(() => {
      (window as any).isNavigatingInternally = false;
    }, 100);
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