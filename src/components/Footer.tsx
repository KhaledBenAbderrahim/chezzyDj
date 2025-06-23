import React from 'react';
import { Music, Instagram, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <Music className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-wide">DJ CHEZZY</span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Tropische Rhythmen und unvergessliche Momente seit über 25 Jahren. 
              Ihr Spezialist für lateinamerikanische Musik und perfekte Partyatmosphäre.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://instagram.com/djchezzy_official"
                className="bg-gray-800 p-2 sm:p-3 rounded-full hover:bg-emerald-600 transition-colors"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="tel:+491234567890"
                className="bg-gray-800 p-2 sm:p-3 rounded-full hover:bg-emerald-600 transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="mailto:info@djchezzy.de"
                className="bg-gray-800 p-2 sm:p-3 rounded-full hover:bg-emerald-600 transition-colors"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 tracking-wide">MEINE SERVICES</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white transition-colors cursor-pointer">Hochzeiten & Trauungen</li>
              <li className="hover:text-white transition-colors cursor-pointer">Geburtstagsfeiern</li>
              <li className="hover:text-white transition-colors cursor-pointer">Corporate Events</li>
              <li className="hover:text-white transition-colors cursor-pointer">Private Partys</li>
              <li className="hover:text-white transition-colors cursor-pointer">Club & Festival Auftritte</li>
              <li className="hover:text-white transition-colors cursor-pointer">Firmenveranstaltungen</li>
            </ul>
          </div>

          {/* Music Styles - AKTUALISIERT */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 tracking-wide">MUSIKRICHTUNGEN</h3>
            <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
              <li className="hover:text-white transition-colors cursor-pointer">🎵 Salsa</li>
              <li className="hover:text-white transition-colors cursor-pointer">💃 Bachata</li>
              <li className="hover:text-white transition-colors cursor-pointer">⚡ Querbeat</li>
              <li className="hover:text-white transition-colors cursor-pointer">🌟 Latin Hits</li>
              <li className="hover:text-white transition-colors cursor-pointer">🔥 Dancehall</li>
              <li className="hover:text-white transition-colors cursor-pointer">🎤 Hip Hop</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm sm:text-base">
              <p>&copy; 2025 DJ Chezzy. Alle Rechte vorbehalten.</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm sm:text-base">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for music lovers</span>
            </div>
          </div>
          {/* Disclaimer */}
          <div className="mt-6 md:mt-4 text-center">
            <p className="text-xs text-gray-500">
              Diese Webseite dient ausschließlich zu demonstrativen Zwecken und ist nicht für die kommerzielle Nutzung bestimmt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;