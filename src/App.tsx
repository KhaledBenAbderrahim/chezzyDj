import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import MusicStyles from './components/MusicStyles';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';

// Import the CSS files
import './styles/index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Header />
      
      {/* CARD SLIDING SCROLL CONTAINER */}
      <div className="scroll-container">
        
        {/* Hero Section - Base Layer (keine abgerundeten Ecken) */}
        <section id="hero" className="scroll-section hero-section">
          <Hero />
        </section>

        {/* About Section - Erste Karte */}
        <section id="about" className="scroll-section card-section bg-white">
          <div className="section-content">
            <About />
          </div>
        </section>

        {/* Music Styles Section - Zweite Karte */}
        <section id="music" className="scroll-section card-section bg-black">
          <div className="section-content">
            <MusicStyles />
          </div>
        </section>

        {/* Gallery Section - Dritte Karte */}
        <section id="gallery" className="scroll-section card-section bg-gray-50">
          <div className="section-content">
            <Gallery />
          </div>
        </section>

        {/* Contact Section - Vierte Karte */}
        <section id="contact" className="scroll-section card-section bg-black">
          <div className="section-content">
            <Contact />
          </div>
        </section>

        {/* Footer Section - Letzte Karte */}
        <section id="footer" className="scroll-section card-section bg-gray-900">
          <div className="section-content">
            <Footer />
          </div>
        </section>
      </div>

      <MusicPlayer />
    </div>
  );
}

export default App;