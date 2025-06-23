import React, { useState } from 'react';
import { Phone, Instagram, Mail, MapPin, Send } from 'lucide-react';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Vielen Dank für Ihre Anfrage! Ich melde mich schnellstmöglich bei Ihnen.');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      info: '+49 (0) 123 456 7890',
      link: 'tel:+491234567890'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      info: '@djchezzy_official',
      link: 'https://instagram.com/djchezzy_official'
    },
    {
      icon: Mail,
      title: 'E-Mail',
      info: 'info@djchezzy.de',
      link: 'mailto:info@djchezzy.de'
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
                <Send className="w-5 h-5" />
                <span>Anfrage senden</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;