import { useState, useEffect } from 'react';
import { Menu, X, Music, Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navbar = ({ isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.booking'), href: '#booking', isButton: true },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 text-2xl font-bold">
          <div className="relative">
            <Music className="h-8 w-8 text-orange-500" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
            DJ Chezzy
          </span>
          <span className="text-sm text-orange-400 font-normal">🌴 Bremen</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isButton ? (
              <a 
                key={link.name}
                href={link.href}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 animate-pulse"
              >
                🎵 {link.name}
              </a>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            )
          ))}
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Social Icons */}
          <div className="flex items-center gap-3 ml-4">
            <a 
              href="https://instagram.com/djchezzy_music" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram size={16} className="text-white" />
            </a>
            <a 
              href="#" 
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook size={16} className="text-white" />
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav className={`fixed inset-0 top-[60px] bg-black/95 backdrop-blur-md transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center gap-8 pt-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xl ${link.isButton ? 'px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-medium' : 'text-white/80 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <a 
              href="https://instagram.com/djchezzy_music" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram size={20} className="text-white" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook size={20} className="text-white" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;