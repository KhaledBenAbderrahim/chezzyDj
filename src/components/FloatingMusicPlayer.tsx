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

  // Lokale Musikdateien
  const playlist = [
    {
      title: "Tropical Vibes Mix",
      artist: "DJ Chezzy",
      genre: "Salsa",
      duration: "4:32",
      url: "/assets/music/music1.mpeg",
      cover: "/assets/images/hero/Hero1.png"
    },
    {
      title: "Reggaeton Nights",
      artist: "DJ Chezzy",
      genre: "Reggaeton", 
      duration: "3:45",
      url: "/assets/music/music2.mpeg",
      cover: "/assets/images/hero/Hero2.png"
    },
    {
      title: "Bachata Romance",
      artist: "DJ Chezzy",
      genre: "Bachata",
      duration: "4:18", 
      url: "/assets/music/music3.mpeg",
      cover: "/assets/images/hero/Hero3.png"
    },
    {
      title: "Latin Fiesta",
      artist: "DJ Chezzy",
      genre: "Mixed",
      duration: "3:52",
      url: "/assets/music/music4.mpeg",
      cover: "/assets/images/hero/Hero1.png"
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
    }, 3000); // Start after 3 seconds

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

      {/* Floating Player - Mobile Optimized */}
      <div className={`fixed bottom-4 right-2 sm:right-4 z-50 transition-all duration-300 ${
        isExpanded ? 'w-72 sm:w-80' : 'w-14 sm:w-16'
      }`}>
        
        {/* Expanded Player */}
        {isExpanded && (
          <div className="bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700 p-3 sm:p-4 mb-2 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Music className="text-emerald-500" size={14} />
                <span className="text-xs sm:text-sm font-medium text-emerald-400">DJ Chezzy</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Minimieren"
              >
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Current Track Info */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-xs sm:text-sm truncate">{currentSong.title}</h4>
                <p className="text-gray-400 text-xs truncate">{currentSong.artist}</p>
                <span className="text-emerald-400 text-xs">{currentSong.genre}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3 sm:mb-4">
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
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <button
                onClick={prevTrack}
                className="text-gray-300 hover:text-white transition-colors p-1"
                title="Vorheriger Track"
              >
                <SkipBack size={16} />
              </button>
              
              <button
                onClick={togglePlay}
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 sm:p-3 transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              
              <button
                onClick={nextTrack}
                className="text-gray-300 hover:text-white transition-colors p-1"
                title="Nächster Track"
              >
                <SkipForward size={16} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={toggleMute}
                className="text-gray-400 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Playlist */}
            <div className="max-h-32 sm:max-h-40 overflow-y-auto">
              <h5 className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Playlist</h5>
              {playlist.map((track, index) => (
                <button
                  key={index}
                  onClick={() => selectTrack(index)}
                  className={`w-full text-left p-2 rounded-lg mb-1 transition-colors ${
                    index === currentTrack
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-6 h-6 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{track.title}</div>
                      <div className="text-xs text-gray-500 truncate">{track.genre}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compact Player Button - Mobile Optimized */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300 border-2 border-emerald-400/30 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
          title={isExpanded ? "Minimieren" : "Music Player öffnen"}
        >
          {isExpanded ? (
            <Minimize2 className="text-white" size={18} />
          ) : isPlaying ? (
            <Pause className="text-white" size={18} />
          ) : (
            <Play className="text-white ml-0.5" size={18} />
          )}
        </button>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #065f46;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #065f46;
        }
      `}</style>
    </>
  );
};

export default FloatingMusicPlayer;