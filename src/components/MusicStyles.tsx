import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
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
    'https://github.com/KhaledBenAbderrahim/dj-cehzy/blob/master/Hero1.png?raw=true',
    'https://github.com/KhaledBenAbderrahim/dj-cehzy/blob/master/Hero2.png?raw=true',
    'https://github.com/KhaledBenAbderrahim/dj-cehzy/blob/master/hero5.png?raw=true',
  ];

  return (
    <div className="bg-black text-white py-20 sm:py-28 overflow-hidden">
      {/* Inject styles directly for the Swiper component */}
      <style>{`
        .music-styles-swiper .swiper-slide {
          width: 70%;
          max-width: 400px;
          transition: transform 0.5s ease, opacity 0.5s ease;
          opacity: 0.5;
          transform: scale(0.8);
        }

        .music-styles-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }

        @media (max-width: 768px) {
          .music-styles-swiper .swiper-slide {
            width: 80%;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-4">MUSIKRICHTUNGEN</h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            Der Rhythmus deiner Nacht
          </h3>
        </div>

        {/* 3D Carousel */}
        <div className="relative">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 80,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            modules={[EffectCoverflow, Navigation]}
            className="music-styles-swiper"
          >
          {musicStyles.map((style, index) => (
              <SwiperSlide key={index} className="group">
                {({ isActive }) => (
                  <div className={`relative aspect-[3/4] w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ${isActive ? 'shadow-2xl shadow-emerald-500/30' : 'shadow-md'}`}>
                    {/* Background Image */}
                    <img 
                      src={djImages[index % djImages.length]}
                      alt="DJ Chezzy"
                      className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${isActive ? 'scale-110' : 'scale-100'}`}
                    />
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80'}`}></div>
              
              {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <h4 className="text-3xl lg:text-4xl font-black mb-2 transition-colors duration-300 group-hover:text-emerald-400">{style.name}</h4>
                      <p className="text-white/80 mb-4">{style.description}</p>
                      <div className={`border-t border-white/20 pt-4 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-sm text-white/60 font-mono tracking-wider">{style.artists}</p>
                  </div>
                </div>
                  </div>
                )}
              </SwiperSlide>
          ))}
          </Swiper>

          {/* Custom Navigation */}
          <button className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default MusicStyles;