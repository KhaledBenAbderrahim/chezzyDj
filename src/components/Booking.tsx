import { useState } from 'react';
import { Calendar, Clock, MapPin, Music, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Booking = () => {
  const { t, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    venue: '',
    eventType: '',
    guestCount: '',
    musicPreference: '',
    message: ''
  });

  const eventTypes = {
    de: ['Hochzeit', 'Geburtstag', 'Firmenfeier', 'Clubnacht', 'Festival', 'Private Party', 'Open Air', 'Sonstiges'],
    en: ['Wedding', 'Birthday', 'Corporate Event', 'Club Night', 'Festival', 'Private Party', 'Open Air', 'Other'],
    es: ['Boda', 'Cumpleaños', 'Evento Corporativo', 'Noche de Club', 'Festival', 'Fiesta Privada', 'Aire Libre', 'Otro']
  };

  const musicPreferences = ['Salsa', 'Bachata', 'Reggaeton', 'Merengue', 'Querbeat', 'Mix aus allem'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Vielen Dank für deine Buchungsanfrage! Ich melde mich schnell bei dir zurück.');
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      venue: '',
      eventType: '',
      guestCount: '',
      musicPreference: '',
      message: ''
    });
  };

  return (
    <section id="booking" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative">
      <div className="absolute top-0 left-0 w-full h-32 sm:h-64 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-emerald-500 to-blue-500"></div>
            <p className="uppercase tracking-wider text-xs sm:text-sm font-medium text-emerald-500">{t('booking.title')}</p>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{t('booking.heading')}</h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            {t('booking.description')}
          </p>
        </div>

        {/* Event Types Info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {[
            { icon: '💒', title: t('booking.weddings'), desc: 'Romantische Momente' },
            { icon: '🎂', title: t('booking.birthdays'), desc: 'Unvergessliche Feiern' },
            { icon: '🏢', title: t('booking.corporate'), desc: 'Professionelle Events' },
            { icon: '🌅', title: t('booking.clubs'), desc: 'Energiegeladene Nächte' }
          ].map((item, index) => (
            <div key={index} className="text-center p-3 sm:p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{item.icon}</div>
              <h3 className="font-bold text-emerald-400 text-sm sm:text-base">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <Users className="text-emerald-500" size={18} />
                <span>{t('booking.contact')}</span>
              </h3>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.name')} *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.email')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              />
            </div>
            
            <div className="lg:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.phone')} *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              />
            </div>

            {/* Event Information */}
            <div className="lg:col-span-2 mt-2 sm:mt-4">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="text-blue-500" size={18} />
                <span>{t('booking.event')}</span>
              </h3>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.date')} *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.time')} *</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.venue')} *</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label htmlFor="guestCount" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.guests')} *</label>
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.type')} *</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              >
                <option value="">{t('booking.select')}</option>
                {eventTypes[language as keyof typeof eventTypes].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="musicPreference" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.music')}</label>
              <select
                id="musicPreference"
                name="musicPreference"
                value={formData.musicPreference}
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base"
              >
                <option value="">{t('booking.select')}</option>
                {musicPreferences.map((preference) => (
                  <option key={preference} value={preference}>{preference}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="lg:col-span-2 mt-2 sm:mt-4">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <Music className="text-purple-500" size={18} />
                <span>{t('booking.details')}</span>
              </h3>
            </div>
            
            <div className="lg:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">{t('booking.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2.5 sm:px-4 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 text-sm sm:text-base resize-none"
                placeholder={t('booking.messagePlaceholder')}
              />
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-2 mt-4 sm:mt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-sm sm:text-base uppercase tracking-wider hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-400/30"
              >
                {t('booking.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Booking;