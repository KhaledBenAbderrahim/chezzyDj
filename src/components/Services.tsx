import { Music2, Users, Headphones, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <Music2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" />,
      title: t('services.private'),
      description: t('services.private.desc'),
      features: ['Personalized playlists', 'Professional sound equipment', 'Lighting options available']
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />,
      title: t('services.club'),
      description: t('services.club.desc'),
      features: ['Peak-time performance', 'Crowd reading expertise', 'Genre-blending transitions']
    },
    {
      icon: <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500" />,
      title: t('services.corporate'),
      description: t('services.corporate.desc'),
      features: ['Volume-appropriate mixes', 'Elegant setup', 'Background to dance floor progression']
    },
    {
      icon: <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />,
      title: t('services.wedding'),
      description: t('services.wedding.desc'),
      features: ['Special moments coordination', 'Multi-generational playlists', 'MC services available']
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-emerald-500 rounded-full blur-3xl opacity-5"></div>
      <div className="absolute bottom-1/3 left-0 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500 rounded-full blur-3xl opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
            <p className="uppercase tracking-wider text-xs sm:text-sm font-medium text-emerald-500">{t('services.title')}</p>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{t('services.heading')}</h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-4 sm:p-6 lg:p-8 rounded-xl hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
                  {service.description}
                </p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></span>
                      <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <a 
            href="#booking" 
            className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white text-sm sm:text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {t('services.book')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;