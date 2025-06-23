import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import { Music2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const MusicStyles = () => {
  const musicStyles = [
    { name: 'Salsa & Bachata', description: 'Feurige Paartänze voller Leidenschaft.', artists: 'Marc Anthony, Romeo Santos, Grupo Niche' },
    { name: 'Merengue', description: 'Lebensfreude pur aus der Dominikanischen Republik.', artists: 'Juan Luis Guerra, Elvis Crespo, Olga Tañón' },
    { name: 'Reggaeton', description: 'Moderne, urbane Beats, die die Welt erobern.', artists: 'Bad Bunny, J Balvin, Daddy Yankee' },
    { name: 'Latin Pop', description: 'Die größten spanischsprachigen Chart-Hits.', artists: 'Shakira, Enrique Iglesias, Ricky Martin' },
    { name: 'Dancehall', description: 'Jamaikanische Energie für eine volle Tanzfläche.', artists: 'Sean Paul, Vybz Kartel, Popcaan' },
    { name: 'Hip Hop & RnB', description: 'Zeitlose Klassiker und aktuelle Club-Banger.', artists: 'Drake, Beyoncé, The Weeknd' },
  ];

  const djImages = [
    '/assets/images/hero/Hero1.png',
    '/assets/images/hero/Hero2.png',
    '/assets/images/hero/Hero3.png',
    '/assets/images/hero/Hero1.png',
    '/assets/images/hero/Hero2.png',
    '/assets/images/hero/Hero3.png',
  ];

  return (
    <div className="bg-black text-white py-12 sm:py-20 lg:py-28 overflow-hidden">
      {/* Enhanced styles for better mobile experience */}
      <style>{`
        .music-styles-swiper .swiper-slide {
          width: 85%;
          max-width: 400px;
          transition: transform 0.6s ease, opacity 0.6s ease, filter 0.6s ease;
          opacity: 0.3;
          transform: scale(0.75);
          filter: blur(2px) brightness(0.4);
        }

        .music-styles-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1.1);
          filter: blur(0px) brightness(1);
          z-index: 10;
        }

        .music-styles-swiper .swiper-slide-next,
        .music-styles-swiper .swiper-slide-prev {
          opacity: 0.6;
          transform: scale(0.85);
          filter: blur(1px) brightness(0.6);
        }

        @media (max-width: 768px) {
          .music-styles-swiper .swiper-slide {
            width: 90%;
            opacity: 0.2;
            transform: scale(0.7);
            filter: blur(3px) brightness(0.3);
          }
          
          .music-styles-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1.05);
            filter: blur(0px) brightness(1);
          }
          
          .music-styles-swiper .swiper-slide-next,
          .music-styles-swiper .swiper-slide-prev {
            opacity: 0.4;
            transform: scale(0.75);
            filter: blur(2px) brightness(0.4);
          }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-500 mb-3 sm:mb-4">MUSIKRICHTUNGEN</h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
            Der Rhythmus deiner Nacht
          </h3>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden text-center mb-6">
          <p className="text-white/60 text-xs uppercase tracking-wider">← Swipe für mehr Musikstile →</p>
        </div>

        {/* Enhanced 3D Carousel */}
        <div className="relative">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 60,
              depth: 300,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="music-styles-swiper"
          >
          {musicStyles.map((style, index) => (
              <SwiperSlide key={index} className="group">
                {({ isActive }) => (
                  <div className={`relative aspect-[3/4] w-full h-full rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-600 ${
                    isActive 
                      ? 'shadow-2xl shadow-emerald-500/50 ring-2 ring-emerald-500/30' 
                      : 'shadow-md shadow-black/50'
                  }`}>
                    {/* Background Image - More Transparent */}
                    <img 
                      src={djImages[index % djImages.length]}
                      alt={`DJ Chezzy - ${style.name}`}
                      className={`w-full h-full object-cover transition-all duration-600 ease-in-out ${
                        isActive ? 'scale-110 opacity-70' : 'scale-100 opacity-50'
                      }`}
                    />
                    
                    {/* Enhanced Overlay - Stronger for more transparency */}
                    <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-600 ${
                      isActive 
                        ? 'from-black/98 via-black/85 to-black/60 opacity-100' 
                        : 'from-black/90 via-black/70 to-black/40 opacity-90'
                    }`}></div>
                    
                    {/* Active Card Glow Effect */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-emerald-500/10 to-transparent opacity-50"></div>
                    )}
              
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                      <div className={`transition-all duration-600 ${isActive ? 'transform translate-y-0 opacity-100' : 'transform translate-y-4 opacity-70'}`}>
                        <h4 className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-2 transition-all duration-600 ${
                          isActive 
                            ? 'text-white group-hover:text-emerald-400' 
                            : 'text-white/80'
                        }`}>
                          {style.name}
                        </h4>
                        
                        <p className={`text-sm sm:text-base mb-3 sm:mb-4 transition-all duration-600 ${
                          isActive ? 'text-white/90' : 'text-white/60'
                        }`}>
                          {style.description}
                        </p>
                        
                        <div className={`border-t border-white/20 pt-3 sm:pt-4 transition-all duration-600 ${
                          isActive ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                        }`}>
                          <p className="text-xs sm:text-sm text-emerald-400/80 font-mono tracking-wider">
                            {style.artists}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
          ))}
          </Swiper>

          {/* Custom Navigation - Hidden on Mobile */}
          <button className="swiper-button-prev-custom hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 lg:left-0 z-20 w-12 h-12 bg-black/30 backdrop-blur-md rounded-full items-center justify-center hover:bg-black/50 hover:scale-110 transition-all duration-300 border border-white/20 group">
            <ChevronLeft className="w-6 h-6 group-hover:text-emerald-400 transition-colors" />
          </button>
          <button className="swiper-button-next-custom hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 lg:right-0 z-20 w-12 h-12 bg-black/30 backdrop-blur-md rounded-full items-center justify-center hover:bg-black/50 hover:scale-110 transition-all duration-300 border border-white/20 group">
            <ChevronRight className="w-6 h-6 group-hover:text-emerald-400 transition-colors" />
          </button>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Jeder Musikstil wird perfekt auf Ihr Event abgestimmt. Von intimen Hochzeiten bis zu energiegeladenen Clubnächten.
          </p>
        </div>

      </div>
    </div>
  );
};

export default MusicStyles;