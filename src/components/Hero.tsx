import React, { useState, useEffect } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, Music, Star } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const slides = [
    {
      id: 1,
      image: '/assets/images/hero/Hero1.png',
      title: 'DJ CHEZZY',
      subtitle: 'Der Meister der tropischen Rhythmen',
      description: 'Leidenschaft für lateinamerikanische Musik. Ich bringe pure Lebensfreude auf jede Tanzfläche.',
      primaryButton: 'Jetzt buchen',
      imagePosition: 'object-center',
      imageStyle: 'brightness-110 contrast-105'
    },
    {
      id: 2,
      image: '/assets/images/hero/Hero2.png',
      title: 'UNVERGESSLICHE EVENTS',
      subtitle: 'Hochzeiten • Geburtstage • Firmenevents',
      description: 'Über 25 Jahre Erfahrung für unvergessliche Momente in ganz Deutschland.',
      primaryButton: 'Event planen',
      imagePosition: 'object-center',
      imageStyle: 'brightness-105 contrast-110'
    },
    {
      id: 3,
      image: '/assets/images/hero/Hero3.png',
      title: 'LATIN & URBAN VIBES',
      subtitle: 'Salsa • Bachata • Hip Hop • Dancehall',
      description: 'Erlebe pure Lebensfreude mit heißen Rhythmen und modernen urbanen Beats.',
      primaryButton: 'Musikstile entdecken',
      imagePosition: 'object-center object-top',
      imageStyle: 'brightness-115 contrast-110 saturate-110'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 seconds per slide
    return () => clearInterval(interval);
  }, [slides.length]);

  const navigateSlide = (direction: 'next' | 'prev') => {
    setCurrentSlide(prev => {
      if (direction === 'next') {
        return (prev + 1) % slides.length;
      }
      return (prev - 1 + slides.length) % slides.length;
    });
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section id="hero" className="relative h-screen bg-black text-white overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative w-full h-full overflow-hidden">
              <img 
                src={slide.image}
                alt={slide.title}
                onError={() => setImageErrors(prev => ({...prev, [slide.id]: true}))}
                className={`w-full h-full object-cover ${slide.imagePosition} ${slide.imageStyle} transition-transform duration-[8000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}
                style={{
                  ...(slide.id === 3 && {
                    objectPosition: 'center 30%',
                    transform: index === currentSlide ? 'scale(1.15)' : 'scale(1.05)'
                  })
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"></div>
              
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/50 hover:scale-110 transition-all duration-300 border border-white/20 group"
        onClick={() => navigateSlide('prev')}
      >
        <ChevronLeft className="w-6 h-6 group-hover:text-emerald-400 transition-colors" />
      </button>
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/50 hover:scale-110 transition-all duration-300 border border-white/20 group"
        onClick={() => navigateSlide('next')}
      >
        <ChevronRight className="w-6 h-6 group-hover:text-emerald-400 transition-colors" />
      </button>

      {/* Enhanced Content with Better Positioning */}
      <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl text-left">
          <div key={currentSlide} className="animate-fadeInUp">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-emerald-500/30">
              <Music className="w-4 h-4 text-emerald-400" />
              <p className="text-emerald-400 font-semibold tracking-widest uppercase text-sm">
                {currentSlideData.subtitle}
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-6 leading-tight bg-gradient-to-r from-white via-white to-emerald-400 bg-clip-text text-transparent">
              {currentSlideData.title}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mb-8 leading-relaxed">
              {currentSlideData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-400/30">
                {currentSlideData.primaryButton}
              </button>
              
              <button className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/20 transition-all duration-300 border border-white/30">
                Portfolio ansehen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative transition-all duration-300 ${index === currentSlide ? 'w-8 h-3' : 'w-3 h-3'}`}
          >
            <div className={`w-full h-full rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-gradient-to-r from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/50' 
                : 'bg-white/40 hover:bg-white/80'
            }`}></div>
          </button>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center space-y-2">
        <span className="text-white/70 text-sm uppercase tracking-wider transform -rotate-90 origin-center">Scroll</span>
        <ArrowDown className="w-8 h-8 animate-bounce text-emerald-400" />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        .bg-gradient-radial {
          background: radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 100%);
        }
      `}</style>
    </section>
  );
};

export default Hero;