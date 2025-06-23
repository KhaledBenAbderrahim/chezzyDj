import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 800); // Duration of fade-out animation
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40); // Controls speed of loading

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  const circleSize = 300; // Base size of the circle in px
  const strokeWidth = 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ease-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center" style={{ width: circleSize, height: circleSize }}>

        {/* Pulsating background rings */}
        <div className="absolute inset-0 animate-pulse-slow rounded-full bg-emerald-500/10"></div>
        <div className="absolute inset-0 animate-pulse-slow-delay rounded-full bg-emerald-500/5 scale-125"></div>
        <div className="absolute inset-0 animate-pulse-slow-delay-more rounded-full bg-emerald-500/5 scale-150"></div>

        {/* Circular progress SVG */}
        <svg width={circleSize} height={circleSize} className="absolute inset-0 -rotate-90">
          {/* Background track */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-white/10"
            fill="transparent"
          />
          {/* Progress fill */}
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="stroke-emerald-400 drop-shadow-[0_0_5px_#34d399]"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 0.2s linear' }}
          />
        </svg>
            
        {/* DJ Photo with reveal mask */}
        <div 
          className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
        >
          <div 
            className="absolute inset-0 w-full h-full bg-black rounded-full transition-transform duration-300 ease-in-out"
            style={{ transform: `scale(${1.1 - (progress / 100)})` }}
          ></div>
              <img 
            src="/assets/images/hero/Hero3.png"
                alt="DJ Chezzy"
            className="w-full h-full object-cover object-top scale-125"
            style={{ objectPosition: '50% 25%' }}
          />
        </div>

        {/* Progress Text */}
        <div className="absolute flex flex-col items-center justify-center text-white">
          <span className="font-mono text-5xl font-bold tracking-tighter">
            {Math.floor(progress)}
            </span>
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-emerald-400">
            Loading
            </span>
        </div>
      </div>

      {/* Adding custom keyframe animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.05); opacity: 0.15; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse-slow-delay {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 1s;
        }
        .animate-pulse-slow-delay-more {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;