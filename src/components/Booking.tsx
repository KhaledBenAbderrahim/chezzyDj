import { useState } from 'react';
import { Calendar, Clock, MapPin, Music, Users, Loader2, Send, X, CheckCircle } from 'lucide-react';
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
  
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    setIsLoading(true);
    
    try {
      // Simulate email sending (in real app, this would be an API call)
      const emailData = {
        to: 'ricalechampion@gmail.com',
        subject: `Buchungsanfrage von ${formData.name}`,
        body: `
          Neue Buchungsanfrage:
          
          Name: ${formData.name}
          E-Mail: ${formData.email}
          Telefon: ${formData.phone}
          Datum: ${formData.date}
          Uhrzeit: ${formData.time}
          Veranstaltungsort: ${formData.venue}
          Event-Typ: ${formData.eventType}
          Anzahl Gäste: ${formData.guestCount}
          Musik-Präferenz: ${formData.musicPreference}
          
          Nachricht:
          ${formData.message}
        `,
        ...formData
      };
      
      console.log('Email would be sent to ricalechampion@gmail.com:', emailData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Don't auto-close - user must close manually
      
    } catch (error) {
      console.error('Error sending email:', error);
      setIsLoading(false);
      alert('Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.');
      setShowModal(false);
    }
  };

  const closeModal = () => {
    if (!isLoading) {
      // Reset form when closing
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
      setShowModal(false);
      setIsSubmitted(false);
    }
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
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : t('booking.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-sm sm:max-w-lg w-full mx-4 relative shadow-2xl border border-emerald-500/30 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 text-white bg-emerald-500/20 hover:bg-emerald-500/40 rounded-full p-2 transition-all duration-300 border border-emerald-500/50"
            >
              <X size={20} />
            </button>
            
            {/* Loading State */}
            {isLoading && (
              <div className="relative">
                {/* DJ Image - More Visible */}
                <div className="h-64 sm:h-80 relative overflow-hidden">
                  <img 
                    src="/assets/images/testimonials/chezzyAnfrage.png" 
                    alt="DJ Chezzy"
                    className="w-full h-full object-cover object-center"
                    style={{objectPosition: 'center top'}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50"></div>
                </div>
                
                {/* Loading Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                  <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 animate-spin text-emerald-400 mb-6" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-emerald-400">Buchungsanfrage wird übermittelt...</h3>
                  <p className="text-sm sm:text-base opacity-90 mb-6">DJ Chezzy wird benachrichtigt</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full max-w-xs bg-black/40 rounded-full h-3 border border-emerald-500/30">
                    <div className="bg-gradient-to-r from-emerald-400 to-blue-400 h-full rounded-full animate-pulse" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Success State */}
            {isSubmitted && !isLoading && (
              <div className="relative">
                {/* DJ Image - Fully Visible */}
                <div className="h-64 sm:h-80 relative overflow-hidden">
                  <img 
                    src="/assets/images/testimonials/chezzyAnfrage.png" 
                    alt="DJ Chezzy"
                    className="w-full h-full object-cover object-center"
                    style={{objectPosition: 'center top'}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                </div>
                
                {/* Success Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
                  <CheckCircle className="w-20 h-20 sm:w-24 sm:h-24 text-emerald-400 mb-4" />
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-emerald-400">Fantastisch! 🎉</h3>
                  <p className="text-base sm:text-lg opacity-90 mb-6">DJ Chezzy hat Ihre Buchungsanfrage erhalten!</p>
                </div>
                
                {/* Bottom Content */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-6 sm:p-8 text-center border-t border-emerald-500/30">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
                    <p className="text-emerald-400 font-bold text-sm sm:text-base mb-2">
                      🎵 Ich erstelle Ihnen ein individuelles Angebot!
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Sie erhalten eine Antwort innerhalb von 24 Stunden
                    </p>
                  </div>
                  
                  <button
                    onClick={closeModal}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl text-sm sm:text-base uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50 border border-emerald-400/30"
                  >
                    Verstanden ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Booking;