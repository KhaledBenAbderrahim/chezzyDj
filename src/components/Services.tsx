import { Music2, Users, Headphones, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: <Music2 className="w-10 h-10 text-red-500" />,
      title: t('services.private'),
      description: t('services.private.desc'),
      features: ['Personalized playlists', 'Professional sound equipment', 'Lighting options available']
    },
    {
      icon: <Users className="w-10 h-10 text-yellow-500" />,
      title: t('services.club'),
      description: t('services.club.desc'),
      features: ['Peak-time performance', 'Crowd reading expertise', 'Genre-blending transitions']
    },
    {
      icon: <Headphones className="w-10 h-10 text-blue-500" />,
      title: t('services.corporate'),
      description: t('services.corporate.desc'),
      features: ['Volume-appropriate mixes', 'Elegant setup', 'Background to dance floor progression']
    },
    {
      icon: <Calendar className="w-10 h-10 text-purple-500" />,
      title: t('services.wedding'),
      description: t('services.wedding.desc'),
      features: ['Special moments coordination', 'Multi-generational playlists', 'MC services available']
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-5"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-yellow-500 rounded-full blur-3xl opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-red-500 to-yellow-500"></div>
            <p className="uppercase tracking-wider text-sm font-medium text-yellow-500">{t('services.title')}</p>
            <div className="h-px w-12 bg-gradient-to-r from-yellow-500 to-red-500"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('services.heading')}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></span>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#booking" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {t('services.book')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;