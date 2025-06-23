import React from 'react';
import { Trophy, Users, Music, Star, Zap, CheckCircle } from 'lucide-react';

const About = () => {
  const [imageError, setImageError] = React.useState(false);
  
  const stats = [
    { icon: Trophy, value: '25+', label: 'Jahre Erfahrung' },
    { icon: Users, value: '500+', label: 'Events gespielt' },
    { icon: Music, value: '10k+', label: 'Glückliche Gäste' },
    { icon: Star, value: '5.0', label: 'Top-Bewertung' },
  ];

  const whyPoints = [
    { 
      icon: Zap, 
      title: 'Energiegeladene Atmosphäre',
      text: 'Ich schaffe eine ansteckende Energie, die jeden auf die Tanzfläche zieht.' 
    },
    { 
      icon: CheckCircle, 
      title: 'Professionell & Zuverlässig',
      text: 'Pünktlichkeit, erstklassiges Equipment und reibungslose Abläufe sind garantiert.' 
    },
    { 
      icon: Music, 
      title: 'Perfekter Musikmix',
      text: 'Eine meisterhafte Mischung aus Latin-Rhythmen und Hits, die auf Ihr Event zugeschnitten ist.' 
    },
  ];

  return (
    <div className="bg-white text-gray-900 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Main Intro: Image on Right, Text on Left --- */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
          {/* Text Content */}
          <div className="animate-fadeInLeft">
            <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">ÜBER DJ CHEZZY</h2>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              25 Jahre Leidenschaft für den perfekten Beat
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Seit über einem Vierteljahrhundert ist es meine Mission, Events in unvergessliche Partys zu verwandeln. Meine Spezialität sind die pulsierenden Rhythmen Lateinamerikas, die ich mit modernen Hits zu einem einzigartigen musikalischen Erlebnis verbinde.
              </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ob Hochzeit, Geburtstag oder Firmenevent – ich bringe die Erfahrung, das Feingefühl und die Energie mit, um für eine volle Tanzfläche und glückliche Gäste zu sorgen.
              </p>
            </div>

          {/* Image */}
          <div className="animate-fadeInRight">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/images/about/hero5.png"
                alt="DJ Chezzy in action"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent"></div>
                </div>
              </div>
            </div>

        {/* --- Stats Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20 sm:mb-28">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms`}}>
              <p className="text-5xl sm:text-6xl font-black text-emerald-600">{stat.value}</p>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-2">{stat.label}</p>
            </div>
          ))}
          </div>

        {/* --- Why Choose Me Section --- */}
            <div className="text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">WARUM DJ CHEZZY?</h2>
          <h3 className="text-4xl sm:text-5xl font-black leading-tight mb-12">
            Mehr als nur Musik
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {whyPoints.map((point, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl text-left hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg animate-fadeInUp" style={{ animationDelay: `${200 + index * 100}ms`}}>
                <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold mb-2">{point.title}</h4>
                <p className="text-gray-600">{point.text}</p>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;