import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Masonry from 'masonry-layout';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    { src: '/assets/images/hero/Hero1.png', alt: 'DJ Chezzy Performance', title: 'DJ Chezzy Live' },
    { src: '/assets/images/hero/Hero2.png', alt: 'Event Performance', title: 'Unvergessliche Events' },
    { src: '/assets/images/hero/Hero3.png', alt: 'Latin Vibes', title: 'Latin & Urban Beats' },
    { src: '/assets/images/about/hero5.png', alt: 'DJ Chezzy Profil', title: 'DJ Chezzy Portrait' },
    { src: '/assets/images/hero/Hero1.png', alt: 'Hochzeitsfeier', title: 'Traumhochzeit' },
    { src: '/assets/images/hero/Hero2.png', alt: 'Club Night', title: 'Club Night' },
    { src: '/assets/images/hero/Hero3.png', alt: 'Festival-Stimmung', title: 'Festival Vibe' },
    { src: '/assets/images/about/hero5.png', alt: 'Private Feier', title: 'Private Events' },
  ];

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };
  
  useEffect(() => {
    if (gridRef.current) {
      const msnry = new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 20,
      });
      
      // Ensure layout is called after images have loaded
      const images = gridRef.current.querySelectorAll('img');
      images.forEach(img => {
        if (img) {
          img.addEventListener('load', () => {
            if (msnry && typeof msnry.layout === 'function') {
              msnry.layout();
            }
          });
        }
      });
    }
  }, [galleryImages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div id="gallery" className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">GALERIE</h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            Momente, die bleiben
          </h3>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="masonry-grid relative">
          <div className="grid-sizer"></div>
          {galleryImages.map((image, index) => (
            <div key={index} className="grid-item group" onClick={() => openLightbox(index)}>
              <div className="relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="block w-full" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h4 className="text-white text-lg font-bold">{image.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center" onClick={closeLightbox}>
          {/* Close Button - Fixed position, always visible */}
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 z-[120] text-white w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors backdrop-blur-sm border border-white/20"
          >
            <X size={24} />
          </button>
          
          {/* Image Container */}
          <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[selectedImage].src} 
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Navigation Buttons - Fixed position */}
          <button
            onClick={prevImage}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-[120] text-white w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextImage}
            className="fixed right-16 top-1/2 -translate-y-1/2 z-[120] text-white w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors backdrop-blur-sm border border-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      <style>{`
        .grid-sizer, .grid-item { width: calc(33.333% - 14px); }
        .grid-item { margin-bottom: 20px; }
        @media (max-width: 1024px) { .grid-sizer, .grid-item { width: calc(50% - 10px); } }
        @media (max-width: 640px) { .grid-sizer, .grid-item { width: 100%; } }
      `}</style>
    </div>
  );
};

export default Gallery;