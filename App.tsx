
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Transition from './components/Transition';
import Quiz from './components/Quiz';
import LoadingResult from './components/LoadingResult';
import ResultAnalysis from './components/ResultAnalysis';
import { AppStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // 1. Meta Pixel
    if (!(window as any).fbq) {
      (function(f:any,b:any,e:any,v:any,n?:any,t?:any,s?:any)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}
      )(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      (window as any).fbq('init', '1516015499464507');
    }
    (window as any).fbq('track', 'PageView');

    // 2. UTMify Pixel
    if (!(window as any).pixelId) {
      (window as any).pixelId = "69702fa1c5b721d69dce91ef";
      const utmifyPixel = document.createElement("script");
      utmifyPixel.async = true;
      utmifyPixel.defer = true;
      utmifyPixel.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
      document.head.appendChild(utmifyPixel);
    }

    // 3. UTMify Capture (Latest.js)
    const utmifyCapture = document.createElement("script");
    utmifyCapture.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
    utmifyCapture.setAttribute("data-utmify-prevent-xcod-sck", "");
    utmifyCapture.setAttribute("data-utmify-prevent-subids", "");
    utmifyCapture.async = true;
    utmifyCapture.defer = true;
    document.head.appendChild(utmifyCapture);
    
    // Cleanup noscript fallback (optional, added to body via DOM)
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = "https://www.facebook.com/tr?id=1516015499464507&ev=PageView&noscript=1";
    noscript.appendChild(img);
    document.body.appendChild(noscript);

  }, []);

  const handleNext = (data?: any) => {
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
