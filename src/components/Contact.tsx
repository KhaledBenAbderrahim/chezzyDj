import React, { useState } from 'react';
import { Phone, Instagram, Mail, MapPin, Send, Loader2, X, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    location: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
          Event-Typ: ${formData.eventType}
          Veranstaltungsdatum: ${formData.eventDate}
          Ort: ${formData.location}
          
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
        eventType: '',
        eventDate: '',
        location: '',
        message: ''
      });
      setShowModal(false);
      setIsSubmitted(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      info: '+49 162 6497365',
      link: 'tel:+4916264973655'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      info: '@dj.chezzy',
      link: 'https://www.instagram.com/dj.chezzy/'
    },
    {
      icon: Mail,
      title: 'E-Mail',
      info: 'ricalechampion@gmail.com',
      link: 'mailto:ricalechampion@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Standort',
      info: 'Deutschlandweit verfügbar',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-32 bg-black text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-emerald-400 font-semibold tracking-wider uppercase mb-4">
            Kontakt
          </p>
          <h2 className="text-5xl lg:text-6xl font-bold mb-8">
            Jetzt <span className="text-emerald-400">buchen</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Bereit für unvergessliche Musik bei Ihrem Event? Kontaktieren Sie mich für eine 
            unverbindliche Beratung und ein individuelles Angebot.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl font-bold mb-8">Kontaktinformationen</h3>
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center space-x-6 hover:text-emerald-400 transition-colors group"
                  >
                    <div className="bg-emerald-500 p-4 rounded-full group-hover:bg-emerald-400 transition-colors">
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{item.title}</div>
                      <div className="text-gray-400">{item.info}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 p-8">
              <h4 className="text-2xl font-bold mb-6">Warum DJ Chezzy wählen?</h4>
              <ul className="space-y-4">
                {[
                  'Kostenlose Erstberatung und Angebotsstellung',
                  'Professionelle Ausrüstung und Backup-Systeme',
                  'Individuelle Musikauswahl nach Ihren Wünschen',
                  'Pünktlich und zuverlässig',
                  'Faire Preise ohne versteckte Kosten',
                  'Deutschlandweite Verfügbarkeit'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-4"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white text-black p-12">
            <h3 className="text-3xl font-bold mb-8">Buchungsanfrage</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent text-lg"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent text-lg"
                    placeholder="ihre@email.de"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent text-lg"
                    placeholder="+49 123 456 7890"
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Event-Typ *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent text-lg"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="hochzeit">Hochzeit</option>
                    <option value="geburtstag">Geburtstag</option>
                    <option value="firmenfeier">Firmenfeier</option>
                    <option value="private-feier">Private Feier</option>
                    <option value="club-event">Club Event</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Veranstaltungsdatum *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Veranstaltungsort
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent text-lg"
                    placeholder="Stadt, Veranstaltungsort"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-0 py-4 border-0 border-b-2 border-gray-300 focus:border-emerald-500 focus:outline-none bg-transparent text-lg resize-none"
                  placeholder="Erzählen Sie mir mehr über Ihr Event, Ihre Musikwünsche und besondere Anforderungen..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-6 text-lg font-semibold tracking-wide uppercase transition-colors duration-300 flex items-center justify-center space-x-3"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Anfrage senden</span>
                  </>
                )}
              </button>
            </form>
          </div>
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
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-emerald-400">Nachricht wird übermittelt...</h3>
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
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-emerald-400">Perfekt! 🎵</h3>
                  <p className="text-base sm:text-lg opacity-90 mb-6">DJ Chezzy hat Ihre Anfrage erhalten!</p>
                </div>
                
                {/* Bottom Content */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-6 sm:p-8 text-center border-t border-emerald-500/30">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-6">
                    <p className="text-emerald-400 font-bold text-sm sm:text-base mb-2">
                      🎧 Ich melde mich schnellstmöglich bei Ihnen!
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Normalerweise antworte ich innerhalb von 24 Stunden
                    </p>
                  </div>
                  
                  <button
                    onClick={closeModal}
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl text-sm sm:text-base uppercase tracking-wider hover:scale-105 transition-all duration-300"
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

export default Contact;