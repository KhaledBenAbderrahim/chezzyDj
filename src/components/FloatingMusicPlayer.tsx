import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Minimize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useLanguage();

  // Playlist mit echten Latino-Tracks (Demo URLs - in Produktion würdest du echte MP3s verwenden)
  const playlist = [
    {
      title: "Salsa Sunset Mix",
      artist: "DJ Chezzy",
      genre: "Salsa",
      duration: "4:32",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Demo - ersetze mit echten MP3s
      cover: "https://images.pexels.com/photos/5765874/pexels-photo-5765874.jpeg"
    },
    {
      title: "Reggaeton Nights",
      artist: "DJ Chezzy",
      genre: "Reggaeton",
      duration: "3:45",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Demo - ersetze mit echten MP3s
      cover: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg"
    },
    {
      title: "Bachata Romance",
      artist: "DJ Chezzy",
      genre: "Bachata",
      duration: "4:18",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Demo - ersetze mit echten MP3s
      cover: "https://images.pexels.com/photos/8412246/pexels-photo-8412246.jpeg"
    },
    {
      title: "Querbeat Fiesta",
      artist: "DJ Chezzy",
      genre: "Querbeat",
      duration: "3:52",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Demo - ersetze mit echten MP3s
      cover: "https://images.pexels.com/photos/8412181/pexels-photo-8412181.jpeg"
    },
    {
      title: "Merengue Madness",
      artist: "DJ Chezzy",
      genre: "Merengue",
      duration: "4:05",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Demo - ersetze mit echten MP3s
      cover: "https://images.pexels.com/photos/5765874/pexels-photo-5765874.jpeg"
    }
  ];

  const currentSong = playlist[currentTrack];

  // Auto-start music when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log("Autoplay prevented:", error);
          // Autoplay was prevented, user needs to interact first
        });
      }
    }, 2000); // Start after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Update time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % playlist.length;
    setCurrentTrack(next);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const prev = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = (parseFloat(e.target.value) / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.url}
        preload="metadata"
      />

      {/* Floating Player - ALWAYS VISIBLE */}
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isExpanded ? 'w-80' : 'w-16'
      }`}>
        
        {/* Expanded Player */}
        {isExpanded && (
          <div className="bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700 p-4 mb-2 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music className="text-orange-500" size={16} />
                <span className="text-sm font-medium text-orange-400">{t('player.title')}</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors"
                title={t('player.minimize')}
              >
                <Minimize2 size={16} />
              </button>
            </div>

            {/* Current Track Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm truncate">{currentSong.title}</h4>
                <p className="text-gray-400 text-xs">{currentSong.artist} • {currentSong.genre}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevTrack}
                className="text-gray-400 hover:text-white transition-colors"
                title={t('player.previous')}
              >
                <SkipBack size={20} />
              </button>
              
              <button
                onClick={togglePlay}
                className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"
                title={isPlaying ? t('player.pause') : t('player.play')}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button
                onClick={nextTrack}
                className="text-gray-400 hover:text-white transition-colors"
                title={t('player.next')}
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 mb-4">
              <button 
                onClick={toggleMute} 
                className="text-gray-400 hover:text-white"
                title={isMuted ? t('player.unmute') : t('player.mute')}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Playlist */}
            <div className="max-h-40 overflow-y-auto">
              <h5 className="text-xs font-medium text-gray-400 mb-2">{t('player.playlist')}</h5>
              {playlist.map((track, index) => (
                <button
                  key={index}
                  onClick={() => selectTrack(index)}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                    index === currentTrack
                      ? 'bg-orange-500/20 border border-orange-500/30'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center flex-shrink-0">
                    {index === currentTrack && isPlaying ? (
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-orange-500 animate-pulse"></div>
                        <div className="w-1 h-2 bg-orange-500 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-4 bg-orange-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    ) : (
                      <Play size={12} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate ${
                      index === currentTrack ? 'text-orange-400' : 'text-white'
                    }`}>
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-400">{track.genre}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compact Player Button - ALWAYS VISIBLE */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden"
            title={isExpanded ? t('player.minimize') : t('player.expand')}
          >
            {!isExpanded ? (
              <>
                {isPlaying ? (
                  <>
                    <Pause size={24} />
                    <div className="absolute inset-0 bg-white/20 animate-ping rounded-full"></div>
                  </>
                ) : (
                  <Play size={24} />
                )}
              </>
            ) : (
              <Minimize2 size={24} />
            )}
          </button>
        </div>

        {/* Now Playing Info - Compact Mode */}
        {!isExpanded && (
          <div className="absolute bottom-20 right-0 bg-gray-900/95 backdrop-blur-md rounded-lg p-2 border border-gray-700 opacity-0 hover:opacity-100 transition-opacity duration-300 w-64">
            <div className="flex items-center gap-2">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-8 h-8 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white truncate">{currentSong.title}</p>
                <p className="text-xs text-gray-400">{currentSong.artist}</p>
              </div>
              {isPlaying && (
                <div className="flex gap-1">
                  <div className="w-1 h-2 bg-orange-500 animate-pulse"></div>
                  <div className="w-1 h-3 bg-orange-500 animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-2 bg-orange-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};

export default FloatingMusicPlayer;