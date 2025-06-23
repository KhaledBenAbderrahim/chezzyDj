import React, { useState, useEffect } from 'react';
import { Menu, X, Music } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'Über mich' },
    { href: '#music', label: 'Musikrichtungen' },
    { href: '#gallery', label: 'Galerie' },
    { href: '#contact', label: 'Kontakt' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Mobile optimiert */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
              <Music className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
            </div>
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wide">
              DJ CHEZZY
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white font-medium tracking-wide hover:text-emerald-400 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-emerald-400 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Verbessert */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 sm:top-20 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl">
            <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-white text-lg sm:text-xl font-medium hover:text-emerald-400 transition-colors py-2 border-b border-white/10 last:border-b-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;