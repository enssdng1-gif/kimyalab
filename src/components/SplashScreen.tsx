import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 2500);
    const timer2 = setTimeout(() => onFinish(), 3200);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-700 px-4 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)' }}>
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fade-in">
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-16 sm:h-16" fill="none">
            <circle cx="32" cy="20" r="12" stroke="white" strokeWidth="3" fill="none" />
            <circle cx="32" cy="20" r="4" fill="white" opacity="0.8" />
            <path d="M20 32 L16 56 L32 48 L48 56 L44 32" stroke="white" strokeWidth="3" fill="none" strokeLinejoin="round" />
            <circle cx="26" cy="42" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="38" cy="44" r="2" fill="rgba(255,255,255,0.6)" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="text-white">Kimya</span>
            <span className="text-blue-200">Lab</span>
          </h1>
        </div>
      </div>
      <p className="text-blue-100 text-sm sm:text-lg tracking-wide mb-6 sm:mb-8 text-center">MEB Müfredatı Kimya Öğrenme Platformu</p>
      <div className="flex gap-2">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
