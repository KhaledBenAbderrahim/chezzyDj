import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'de' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'nav.services': 'Services',
    'nav.gallery': 'Galerie',
    'nav.booking': 'Buchung',
    'nav.contact': 'Kontakt',
    
    // Hero Section
    'hero.welcome': '🌴 Willkommen bei DJ Chezzy! 🌴',
    'hero.subtitle': 'Die heißesten Beats der Karibik direkt aus Bremen!',
    'hero.description': '🎧 Salsa | Bachata | Reggaeton | Querbeat 🎶',
    'hero.experience': '🔥 Über 25 Jahre Erfahrung! 🔥',
    'hero.experience.sub': 'Auf Hochzeiten, Partys & Clubs weltweit!',
    'hero.experience.desc': '🇩🇴 Dominikanische Republik trifft Bremen 🇩🇪',
    'hero.dance': '💃 Tanzfläche zum Beben bringen! 💃',
    'hero.dance.sub': 'Latino-Vibes für jeden Anlass',
    'hero.dance.desc': '🎵 Jetzt buchen und die Party starten! 🎉',
    'hero.play': '🎵 PLAY ME! - Salsa Sunset Mix',
    'hero.book': '📞 JETZT BUCHEN!',
    'hero.discover': '🎶 Meine Services entdecken',
    
    // About Section
    'about.title': '🧔🏽‍♂️ Wer ist DJ Chezzy?',
    'about.heading': '¡Hola! Ich bin DJ Chezzy',
    'about.origin': 'Gebürtig aus der Dominikanischen Republik 🇩🇴 und seit vielen Jahren in Bremen 🇩🇪 zuhause.',
    'about.passion': 'Ich bringe die Latino-Vibes direkt zu euch – ob Hochzeit, Geburtstag oder Clubnacht.',
    'about.experience': 'Mit über 25 Jahren Erfahrung, unzähligen Events und einem feinen Gespür für den perfekten Moment, sorge ich für Stimmung, Spaß und Tanz!',
    'about.styles': '🎶 Meine Musikstile:',
    'about.location': '📍 Einsatzort: Bremen, Umgebung – oder wohin ihr mich braucht!',
    'about.years': 'Jahre Erfahrung',
    'about.events': 'Events gespielt',
    'about.cities': 'Städte weltweit',
    'about.days': 'Tage im Jahr bereit',
    
    // Services Section
    'services.title': 'Services Offered',
    'services.heading': 'Latin Beats For Every Occasion',
    'services.description': 'Von intimen Zusammenkünften bis zu großen Feiern, bringe die authentischen Latin Vibes zu deinem Event mit professionellen DJ Services.',
    'services.private': 'Private Parties',
    'services.private.desc': 'Verwandle dein privates Event in eine unvergessliche Fiesta mit maßgeschneiderten Latin Music Sets, die auf deine Gäste und den Anlass zugeschnitten sind.',
    'services.club': 'Club Nights',
    'services.club.desc': 'Bringe das authentische Latin Club Erlebnis in deine Location mit energiegeladenen Sets, die die Tanzfläche die ganze Nacht über gefüllt halten.',
    'services.corporate': 'Corporate Events',
    'services.corporate.desc': 'Füge Latin Flair zu deiner Firmenveranstaltung hinzu mit einer anspruchsvollen Musikauswahl, die die perfekte professionelle Atmosphäre schafft.',
    'services.wedding': 'Wedding Receptions',
    'services.wedding.desc': 'Schaffe magische Momente an deinem besonderen Tag mit der perfekten Mischung aus romantischen Latin Klassikern und modernen Tanzflächen-Hits.',
    'services.book': 'Book Your Event Now',
    
    // Gallery Section
    'gallery.title': '📸 Galerie',
    'gallery.heading': 'Momente voller Musik',
    'gallery.description': 'Ein Einblick in die Energie und Atmosphäre vergangener Events. Erlebe die Leidenschaft der lateinamerikanischen Musik durch diese eingefangenen Momente.',
    
    // Testimonials Section
    'testimonials.title': 'Testimonials',
    'testimonials.heading': 'Was Kunden sagen',
    'testimonials.description': 'Glaub nicht nur mir – höre von Kunden, die die Latin Vibes bei ihren Events erlebt haben.',
    
    // Booking Section
    'booking.title': '📅 Buchung',
    'booking.heading': 'Bring den Vibe zu deinem Event',
    'booking.description': 'Planst du ein Event? DJ Chezzy bringt die karibische Stimmung direkt zu euch! Jetzt Termin sichern – ich freue mich auf deine Anfrage!',
    'booking.weddings': 'Hochzeiten',
    'booking.birthdays': 'Geburtstage',
    'booking.corporate': 'Firmenfeiern',
    'booking.clubs': 'Clubs & Open Airs',
    'booking.contact': 'Deine Kontaktdaten',
    'booking.event': 'Event Details',
    'booking.name': 'Name',
    'booking.email': 'E-Mail',
    'booking.phone': 'Telefon',
    'booking.date': 'Event Datum',
    'booking.time': 'Uhrzeit',
    'booking.venue': 'Veranstaltungsort',
    'booking.guests': 'Anzahl Gäste',
    'booking.type': 'Event Typ',
    'booking.music': 'Musik Wunsch',
    'booking.message': 'Zusätzliche Informationen',
    'booking.submit': '🎵 Buchungsanfrage senden',
    'booking.required': '* Pflichtfelder',
    
    // Contact Section
    'contact.title': '📞 Kontakt',
    'contact.heading': "Let's connect!",
    'contact.description': '🎶 Musik ist meine Sprache – schreib mir einfach, ich antworte schnell!',
    'contact.location': '📍 DJ Chezzy – Bremen, Germany',
    'contact.available': 'Verfügbar für Events weltweit',
    'contact.follow': '📷 Folge mir auf Social Media',
    'contact.quick': 'Schnelle Nachricht senden',
    'contact.your.name': 'Dein Name',
    'contact.your.email': 'Deine E-Mail',
    'contact.subject': 'Betreff',
    'contact.send': 'Nachricht senden',
    
    // Music Player
    'player.title': 'DJ Chezzy Player',
    'player.playlist': 'PLAYLIST',
    'player.minimize': 'Minimieren',
    'player.expand': 'Player erweitern',
    'player.previous': 'Vorheriger Track',
    'player.next': 'Nächster Track',
    'player.play': 'Play',
    'player.pause': 'Pause',
    'player.mute': 'Stumm',
    'player.unmute': 'Laut',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.booking': 'Booking',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.welcome': '🌴 Welcome to DJ Chezzy! 🌴',
    'hero.subtitle': 'The hottest Caribbean beats straight from Bremen!',
    'hero.description': '🎧 Salsa | Bachata | Reggaeton | Querbeat 🎶',
    'hero.experience': '🔥 Over 25 Years Experience! 🔥',
    'hero.experience.sub': 'At weddings, parties & clubs worldwide!',
    'hero.experience.desc': '🇩🇴 Dominican Republic meets Bremen 🇩🇪',
    'hero.dance': '💃 Make the dance floor shake! 💃',
    'hero.dance.sub': 'Latino vibes for every occasion',
    'hero.dance.desc': '🎵 Book now and start the party! 🎉',
    'hero.play': '🎵 PLAY ME! - Salsa Sunset Mix',
    'hero.book': '📞 BOOK NOW!',
    'hero.discover': '🎶 Discover My Services',
    
    // About Section
    'about.title': '🧔🏽‍♂️ Who is DJ Chezzy?',
    'about.heading': '¡Hola! I am DJ Chezzy',
    'about.origin': 'Born in the Dominican Republic 🇩🇴 and living in Bremen 🇩🇪 for many years.',
    'about.passion': 'I bring Latino vibes directly to you – whether wedding, birthday or club night.',
    'about.experience': 'With over 25 years of experience, countless events and a fine sense for the perfect moment, I create atmosphere, fun and dance!',
    'about.styles': '🎶 My Music Styles:',
    'about.location': '📍 Location: Bremen, surrounding area – or wherever you need me!',
    'about.years': 'Years Experience',
    'about.events': 'Events Played',
    'about.cities': 'Cities Worldwide',
    'about.days': 'Days Ready Per Year',
    
    // Services Section
    'services.title': 'Services Offered',
    'services.heading': 'Latin Beats For Every Occasion',
    'services.description': 'From intimate gatherings to grand celebrations, bring the authentic Latin vibes to your event with professional DJ services.',
    'services.private': 'Private Parties',
    'services.private.desc': 'Turn your private event into an unforgettable fiesta with customized Latin music sets tailored to your guests and occasion.',
    'services.club': 'Club Nights',
    'services.club.desc': 'Bring the authentic Latin club experience to your venue with high-energy sets that keep the dance floor packed all night long.',
    'services.corporate': 'Corporate Events',
    'services.corporate.desc': 'Add Latin flair to your corporate function with sophisticated music selection that creates the perfect professional atmosphere.',
    'services.wedding': 'Wedding Receptions',
    'services.wedding.desc': 'Create magical moments on your special day with the perfect blend of romantic Latin classics and modern dance floor hits.',
    'services.book': 'Book Your Event Now',
    
    // Gallery Section
    'gallery.title': '📸 Gallery',
    'gallery.heading': 'Moments Full of Music',
    'gallery.description': 'A glimpse into the energy and atmosphere of past events. Experience the passion of Latin American music through these captured moments.',
    
    // Testimonials Section
    'testimonials.title': 'Testimonials',
    'testimonials.heading': 'What Clients Say',
    'testimonials.description': "Don't just take my word for it - hear from clients who have experienced the Latin vibes at their events.",
    
    // Booking Section
    'booking.title': '📅 Booking',
    'booking.heading': 'Bring the Vibe to Your Event',
    'booking.description': 'Planning an event? DJ Chezzy brings Caribbean vibes directly to you! Secure your date now – I look forward to your inquiry!',
    'booking.weddings': 'Weddings',
    'booking.birthdays': 'Birthdays',
    'booking.corporate': 'Corporate Events',
    'booking.clubs': 'Clubs & Open Airs',
    'booking.contact': 'Your Contact Details',
    'booking.event': 'Event Details',
    'booking.name': 'Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.date': 'Event Date',
    'booking.time': 'Time',
    'booking.venue': 'Venue',
    'booking.guests': 'Number of Guests',
    'booking.type': 'Event Type',
    'booking.music': 'Music Preference',
    'booking.message': 'Additional Information',
    'booking.submit': '🎵 Send Booking Request',
    'booking.required': '* Required fields',
    
    // Contact Section
    'contact.title': '📞 Contact',
    'contact.heading': "Let's connect!",
    'contact.description': '🎶 Music is my language – just write to me, I respond quickly!',
    'contact.location': '📍 DJ Chezzy – Bremen, Germany',
    'contact.available': 'Available for events worldwide',
    'contact.follow': '📷 Follow me on Social Media',
    'contact.quick': 'Send Quick Message',
    'contact.your.name': 'Your Name',
    'contact.your.email': 'Your Email',
    'contact.subject': 'Subject',
    'contact.send': 'Send Message',
    
    // Music Player
    'player.title': 'DJ Chezzy Player',
    'player.playlist': 'PLAYLIST',
    'player.minimize': 'Minimize',
    'player.expand': 'Expand Player',
    'player.previous': 'Previous Track',
    'player.next': 'Next Track',
    'player.play': 'Play',
    'player.pause': 'Pause',
    'player.mute': 'Mute',
    'player.unmute': 'Unmute',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.services': 'Servicios',
    'nav.gallery': 'Galería',
    'nav.booking': 'Reservar',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.welcome': '🌴 ¡Bienvenido a DJ Chezzy! 🌴',
    'hero.subtitle': '¡Los ritmos caribeños más calientes directamente desde Bremen!',
    'hero.description': '🎧 Salsa | Bachata | Reggaeton | Querbeat 🎶',
    'hero.experience': '🔥 ¡Más de 25 años de experiencia! 🔥',
    'hero.experience.sub': '¡En bodas, fiestas y clubes en todo el mundo!',
    'hero.experience.desc': '🇩🇴 República Dominicana se encuentra con Bremen 🇩🇪',
    'hero.dance': '💃 ¡Haz temblar la pista de baile! 💃',
    'hero.dance.sub': 'Vibras latinas para cada ocasión',
    'hero.dance.desc': '🎵 ¡Reserva ahora y comienza la fiesta! 🎉',
    'hero.play': '🎵 ¡TÓCAME! - Salsa Sunset Mix',
    'hero.book': '📞 ¡RESERVAR AHORA!',
    'hero.discover': '🎶 Descubre Mis Servicios',
    
    // About Section
    'about.title': '🧔🏽‍♂️ ¿Quién es DJ Chezzy?',
    'about.heading': '¡Hola! Soy DJ Chezzy',
    'about.origin': 'Nacido en República Dominicana 🇩🇴 y viviendo en Bremen 🇩🇪 desde hace muchos años.',
    'about.passion': 'Traigo las vibras latinas directamente a ustedes – ya sea boda, cumpleaños o noche de club.',
    'about.experience': '¡Con más de 25 años de experiencia, innumerables eventos y un fino sentido para el momento perfecto, creo ambiente, diversión y baile!',
    'about.styles': '🎶 Mis Estilos Musicales:',
    'about.location': '📍 Ubicación: Bremen, alrededores – ¡o donde me necesites!',
    'about.years': 'Años de Experiencia',
    'about.events': 'Eventos Tocados',
    'about.cities': 'Ciudades Mundial',
    'about.days': 'Días Listo al Año',
    
    // Services Section
    'services.title': 'Servicios Ofrecidos',
    'services.heading': 'Ritmos Latinos Para Cada Ocasión',
    'services.description': 'Desde reuniones íntimas hasta grandes celebraciones, trae las auténticas vibras latinas a tu evento con servicios profesionales de DJ.',
    'services.private': 'Fiestas Privadas',
    'services.private.desc': 'Convierte tu evento privado en una fiesta inolvidable con sets de música latina personalizados adaptados a tus invitados y ocasión.',
    'services.club': 'Noches de Club',
    'services.club.desc': 'Trae la auténtica experiencia del club latino a tu local con sets de alta energía que mantienen la pista de baile llena toda la noche.',
    'services.corporate': 'Eventos Corporativos',
    'services.corporate.desc': 'Añade estilo latino a tu función corporativa con una selección musical sofisticada que crea la atmósfera profesional perfecta.',
    'services.wedding': 'Recepciones de Boda',
    'services.wedding.desc': 'Crea momentos mágicos en tu día especial con la mezcla perfecta de clásicos latinos románticos y éxitos modernos de pista de baile.',
    'services.book': 'Reserva Tu Evento Ahora',
    
    // Gallery Section
    'gallery.title': '📸 Galería',
    'gallery.heading': 'Momentos Llenos de Música',
    'gallery.description': 'Un vistazo a la energía y atmósfera de eventos pasados. Experimenta la pasión de la música latinoamericana a través de estos momentos capturados.',
    
    // Testimonials Section
    'testimonials.title': 'Testimonios',
    'testimonials.heading': 'Lo Que Dicen Los Clientes',
    'testimonials.description': 'No solo tomes mi palabra - escucha de clientes que han experimentado las vibras latinas en sus eventos.',
    
    // Booking Section
    'booking.title': '📅 Reservar',
    'booking.heading': 'Trae la Vibra a Tu Evento',
    'booking.description': '¿Planificando un evento? ¡DJ Chezzy trae las vibras caribeñas directamente a ti! Asegura tu fecha ahora – ¡espero tu consulta!',
    'booking.weddings': 'Bodas',
    'booking.birthdays': 'Cumpleaños',
    'booking.corporate': 'Eventos Corporativos',
    'booking.clubs': 'Clubes y Aire Libre',
    'booking.contact': 'Tus Datos de Contacto',
    'booking.event': 'Detalles del Evento',
    'booking.name': 'Nombre',
    'booking.email': 'Email',
    'booking.phone': 'Teléfono',
    'booking.date': 'Fecha del Evento',
    'booking.time': 'Hora',
    'booking.venue': 'Lugar',
    'booking.guests': 'Número de Invitados',
    'booking.type': 'Tipo de Evento',
    'booking.music': 'Preferencia Musical',
    'booking.message': 'Información Adicional',
    'booking.submit': '🎵 Enviar Solicitud de Reserva',
    'booking.required': '* Campos requeridos',
    
    // Contact Section
    'contact.title': '📞 Contacto',
    'contact.heading': '¡Conectemos!',
    'contact.description': '🎶 La música es mi idioma – solo escríbeme, ¡respondo rápido!',
    'contact.location': '📍 DJ Chezzy – Bremen, Alemania',
    'contact.available': 'Disponible para eventos en todo el mundo',
    'contact.follow': '📷 Sígueme en Redes Sociales',
    'contact.quick': 'Enviar Mensaje Rápido',
    'contact.your.name': 'Tu Nombre',
    'contact.your.email': 'Tu Email',
    'contact.subject': 'Asunto',
    'contact.send': 'Enviar Mensaje',
    
    // Music Player
    'player.title': 'Reproductor DJ Chezzy',
    'player.playlist': 'LISTA DE REPRODUCCIÓN',
    'player.minimize': 'Minimizar',
    'player.expand': 'Expandir Reproductor',
    'player.previous': 'Pista Anterior',
    'player.next': 'Siguiente Pista',
    'player.play': 'Reproducir',
    'player.pause': 'Pausar',
    'player.mute': 'Silenciar',
    'player.unmute': 'Activar Sonido',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};