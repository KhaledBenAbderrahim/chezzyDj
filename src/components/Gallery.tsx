import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import Masonry from 'masonry-layout';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const galleryItems = [
    // Images
    { 
      src: '/assets/images/gallery/chezzy1.jpeg', 
      type: 'image', 
      alt: 'DJ Chezzy Performance', 
      title: 'DJ Chezzy Live Performance' 
    },
    { 
      src: '/assets/images/gallery/chezzy14.jpeg', 
      type: 'image', 
      alt: 'DJ Chezzy Event', 
      title: 'Unvergessliche Event-Momente' 
    },
    
    // Videos
    { 
      src: '/assets/images/gallery/chezzy2.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 1', 
      title: 'Live DJ Set - Latin Beats' 
    },
    { 
      src: '/assets/images/gallery/chezzy3.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 2', 
      title: 'Club Night Performance' 
    },
    { 
      src: '/assets/images/gallery/chezzy4.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 3', 
      title: 'Wedding Party Mix' 
    },
    { 
      src: '/assets/images/gallery/chezzy5.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 4', 
      title: 'Urban & Hip-Hop Vibes' 
    },
    { 
      src: '/assets/images/gallery/chezzy6.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 5', 
      title: 'Festival Energy' 
    },
    { 
      src: '/assets/images/gallery/chezzy7.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 6', 
      title: 'Private Event Highlights' 
    },
    { 
      src: '/assets/images/gallery/chezzy8.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 7', 
      title: 'Reggaeton & Latin Mix' 
    },
    { 
      src: '/assets/images/gallery/chezzy9.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 8', 
      title: 'Dance Floor Magic' 
    },
    { 
      src: '/assets/images/gallery/chezzy10.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 9', 
      title: 'Corporate Event DJ' 
    },
    { 
      src: '/assets/images/gallery/chezzy11.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 10', 
      title: 'Birthday Party Celebration' 
    },
    { 
      src: '/assets/images/gallery/chezzy12.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 11', 
      title: 'House & Electronic Beats' 
    },
    { 
      src: '/assets/images/gallery/chezzy13.mp4', 
      type: 'video', 
      alt: 'DJ Chezzy Video 12', 
      title: 'Crowd Interaction & Energy' 
    },
  ];

  // Initialize all videos as muted
  useEffect(() => {
    const videoIndices = galleryItems
      .map((item, index) => item.type === 'video' ? index : -1)
      .filter(index => index !== -1);
    setMutedVideos(new Set(videoIndices));
  }, []);

  const handleItemClick = (index: number, event: React.MouseEvent) => {
    const item = galleryItems[index];
    
    if (item.type === 'image') {
      // Images open in modal
      setSelectedMedia(index);
    } else {
      // Videos play/pause directly in gallery
      event.stopPropagation();
      toggleVideoPlay(index);
    }
  };

  const toggleVideoPlay = (index: number) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      if (playingVideos.has(index)) {
        videoElement.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      } else {
        // Pause all other videos first
        playingVideos.forEach(playingIndex => {
          const otherVideo = videoRefs.current[playingIndex];
          if (otherVideo && playingIndex !== index) {
            otherVideo.pause();
          }
        });
        
        // Ensure proper audio setup before playing
        videoElement.volume = 0.7;
        videoElement.muted = mutedVideos.has(index);
        
        // Play the video
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setPlayingVideos(new Set([index]));
          }).catch(error => {
            console.log('Video play failed:', error);
            // Fallback: still update state even if play fails
            setPlayingVideos(new Set([index]));
          });
        } else {
          setPlayingVideos(new Set([index]));
        }
      }
    }
  };

  const toggleVideoMute = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      if (mutedVideos.has(index)) {
        // Unmute this video
        videoElement.muted = false;
        videoElement.volume = 0.7; // Set reasonable volume level
        
        // If video is playing, ensure audio starts
        if (playingVideos.has(index)) {
          videoElement.currentTime = videoElement.currentTime; // Trigger audio refresh
        }
        
        setMutedVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
        
        // Mute all other videos
        galleryItems.forEach((item, otherIndex) => {
          if (item.type === 'video' && otherIndex !== index) {
            const otherVideo = videoRefs.current[otherIndex];
            if (otherVideo) {
              otherVideo.muted = true;
              setMutedVideos(prev => new Set([...prev, otherIndex]));
            }
          }
        });
      } else {
        // Mute this video
        videoElement.muted = true;
        setMutedVideos(prev => new Set([...prev, index]));
      }
    }
  };
  
  const closeLightbox = () => {
    setSelectedMedia(null);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const nextMedia = () => {
    if (selectedMedia !== null) {
      // Only navigate through images in modal
      const imageIndices = galleryItems.map((item, index) => item.type === 'image' ? index : -1).filter(i => i !== -1);
      const currentImageIndex = imageIndices.indexOf(selectedMedia);
      if (currentImageIndex !== -1) {
        const nextImageIndex = imageIndices[(currentImageIndex + 1) % imageIndices.length];
        setSelectedMedia(nextImageIndex);
      }
    }
  };

  const prevMedia = () => {
    if (selectedMedia !== null) {
      // Only navigate through images in modal
      const imageIndices = galleryItems.map((item, index) => item.type === 'image' ? index : -1).filter(i => i !== -1);
      const currentImageIndex = imageIndices.indexOf(selectedMedia);
      if (currentImageIndex !== -1) {
        const prevImageIndex = imageIndices[(currentImageIndex - 1 + imageIndices.length) % imageIndices.length];
        setSelectedMedia(prevImageIndex);
      }
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
      const videos = gridRef.current.querySelectorAll('video');
      
      [...images, ...videos].forEach(media => {
        if (media) {
          media.addEventListener('loadeddata', () => {
            if (msnry && typeof msnry.layout === 'function') {
              msnry.layout();
            }
          });
        }
      });
    }
  }, [galleryItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMedia === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextMedia();
      if (e.key === 'ArrowLeft') prevMedia();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  return (
    <div id="gallery" className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">GALERIE</h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            Erlebe DJ Chezzy in Aktion
          </h3>
          <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Entdecke die Energie und Leidenschaft hinter jeder Performance
          </p>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="masonry-grid relative">
          <div className="grid-sizer"></div>
          {galleryItems.map((item, index) => (
            <div key={index} className="grid-item group" onClick={(e) => handleItemClick(index, e)}>
              <div className="relative overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                {item.type === 'image' ? (
                  <img 
                    src={item.src} 
                    alt={item.alt}
                    className="block w-full h-auto object-cover" 
                  />
                ) : (
                  <div className="relative">
                    <video 
                      ref={el => {
                        videoRefs.current[index] = el;
                        if (el) {
                          el.muted = mutedVideos.has(index);
                          el.volume = 0.7; // Set default volume
                          el.preload = 'metadata';
                        }
                      }}
                      src={item.src}
                      className="block w-full h-auto object-cover"
                      muted={mutedVideos.has(index)}
                      preload="metadata"
                      loop
                      playsInline
                      onLoadedData={() => {
                        const videoElement = videoRefs.current[index];
                        if (videoElement) {
                          videoElement.volume = 0.7;
                          videoElement.muted = mutedVideos.has(index);
                        }
                      }}
                      onEnded={() => {
                        setPlayingVideos(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(index);
                          return newSet;
                        });
                      }}
                    />
                    {/* Video Play/Pause Overlay */}
                    {!playingVideos.has(index) && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                          <Play className="text-black ml-1" size={24} />
                        </div>
                      </div>
                    )}
                    
                    {/* Video Controls - Visible on hover or when playing */}
                    <div className={`absolute top-4 right-4 flex gap-2 transition-opacity ${
                      playingVideos.has(index) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      {/* Mute/Unmute Button */}
                      <button
                        onClick={(e) => toggleVideoMute(index, e)}
                        className="w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors border border-white/20"
                      >
                        {mutedVideos.has(index) ? (
                          <VolumeX className="text-white" size={16} />
                        ) : (
                          <Volume2 className="text-emerald-400" size={16} />
                        )}
                      </button>
                      
                      {/* Pause Button - Only visible when playing */}
                      {playingVideos.has(index) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVideoPlay(index);
                          }}
                          className="w-10 h-10 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition-colors border border-white/20"
                        >
                          <Pause className="text-white" size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h4 className="text-white text-lg font-bold mb-1">{item.title}</h4>
                    <span className="text-emerald-400 text-sm font-medium uppercase tracking-wide">
                      {item.type === 'video' ? '🎥 Video' : '📸 Foto'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Only for Images */}
      {selectedMedia !== null && galleryItems[selectedMedia].type === 'image' && (
        <div className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center" onClick={closeLightbox}>
          {/* Close Button - Fixed position, always visible */}
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 z-[120] text-white w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors backdrop-blur-sm border border-white/20"
          >
            <X size={24} />
          </button>
          
          {/* Image Container */}
          <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryItems[selectedMedia].src} 
              alt={galleryItems[selectedMedia].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Title */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-white text-xl font-bold bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                {galleryItems[selectedMedia].title}
              </h3>
            </div>
          </div>
          
          {/* Navigation Buttons - Only for images */}
          <button
            onClick={prevMedia}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-[120] text-white w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextMedia}
            className="fixed right-16 top-1/2 -translate-y-1/2 z-[120] text-white w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors backdrop-blur-sm border border-white/20"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Image Counter */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[120] text-white bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
            Foto {galleryItems.map((item, index) => item.type === 'image' ? index : -1).filter(i => i !== -1).indexOf(selectedMedia) + 1} / {galleryItems.filter(item => item.type === 'image').length}
          </div>
        </div>
      )}

      <style>{`
        .grid-sizer, .grid-item { width: calc(33.333% - 14px); }
        .grid-item { margin-bottom: 20px; }
        @media (max-width: 1024px) { .grid-sizer, .grid-item { width: calc(50% - 10px); } }
        @media (max-width: 640px) { .grid-sizer, .grid-item { width: 100%; } }
        
        .grid-item video {
          aspect-ratio: 16/9;
          object-fit: cover;
        }
        
        .grid-item:nth-child(4n) { width: calc(66.666% - 14px); }
        .grid-item:nth-child(7n) { width: calc(66.666% - 14px); }
        
        @media (max-width: 1024px) {
          .grid-item:nth-child(4n), .grid-item:nth-child(7n) { width: calc(50% - 10px); }
        }
        
        @media (max-width: 640px) {
          .grid-item:nth-child(4n), .grid-item:nth-child(7n) { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Gallery;