/**
 * Scroll Effects - Verbessert den Kartenfluss-Effekt
 */

// Funktion wird ausgeführt, wenn das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer für Flowing Sections
  const setupFlowingSections = () => {
    const sections = document.querySelectorAll('.flowing-section');
    
    // Erstellt einen Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Wenn die Sektion sichtbar wird
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.classList.remove('out-of-view');
        } else {
          entry.target.classList.remove('in-view');
          entry.target.classList.add('out-of-view');
        }
      });
    }, {
      root: null, // Viewport als Referenz
      threshold: 0.1, // 10% der Sektion muss sichtbar sein
      rootMargin: '-50px 0px' // Trigger etwas früher
    });
    
    // Beobachtet alle Flowing Sections
    sections.forEach(section => {
      observer.observe(section);
      // Initial als out-of-view markieren
      section.classList.add('out-of-view');
    });
  };
  
  // Verbessert das Scroll-Verhalten für Anker-Links
  const setupSmoothAnchorScrolling = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        
        // Nur für gültige Anker-Links
        if (targetId !== '#' && document.querySelector(targetId)) {
          e.preventDefault();
          
          // Scrollt zur Zielsektion mit Animation
          document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };
  
  // Initialisiert alle Scroll-Effekte
  const initScrollEffects = () => {
    setupFlowingSections();
    setupSmoothAnchorScrolling();
  };
  
  // Startet die Initialisierung
  initScrollEffects();
});
