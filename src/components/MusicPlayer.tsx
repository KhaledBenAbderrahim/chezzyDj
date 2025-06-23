import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, X, ChevronUp } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

    const songs: Song[] = [
    { 
      id: 1, 
      title: "Salsa Caliente", 
      artist: "DJ Chezzy Mix", 
      src: "/assets/music/music1.mpeg"
    },
    { 
      id: 2, 
      title: "Bachata Romance", 
      artist: "DJ Chezzy Mix", 
      src: "/assets/music/music2.mpeg"
    },
    { 
      id: 3, 
      title: "Reggaeton Fire", 
      artist: "DJ Chezzy Mix", 
      src: "/assets/music/music3.mpeg"
    },
    { 
      id: 4, 
      title: "Latin Hits", 
      artist: "DJ Chezzy Mix", 
      src: "/assets/music/music4.mpeg"
    }
  ];

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextSong();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Auto-play when component mounts with multiple attempts
  useEffect(() => {
    const startAutoPlay = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      try {
        // Set volume to low initially to avoid being too loud
        audio.volume = 0.3;
        
        // Multiple attempts with different delays
        const attemptPlay = async (delay: number) => {
          return new Promise((resolve) => {
            setTimeout(async () => {
              try {
                await audio.play();
                setIsPlaying(true);
                // Gradually increase volume
                setTimeout(() => {
                  if (audio) audio.volume = volume;
                }, 500);
                resolve(true);
              } catch (error) {
                resolve(false);
              }
            }, delay);
          });
        };

        // Try multiple times with different delays
        const success = await attemptPlay(1000) || 
                       await attemptPlay(2000) || 
                       await attemptPlay(3000);
        
        if (!success) {
          console.log('Auto-play blocked by browser - user interaction required');
          // Show a subtle indicator that music is ready to play
        }
      } catch (error) {
        console.log('Auto-play setup failed:', error);
      }
    };

    startAutoPlay();
  }, [volume]);

  // Enable auto-play on first user interaction
  useEffect(() => {
    const enableAutoPlay = async () => {
      const audio = audioRef.current;
      if (!audio || autoPlayEnabled || isPlaying) return;

      try {
        await audio.play();
        setIsPlaying(true);
        setAutoPlayEnabled(true);
        audio.volume = volume;
      } catch (error) {
        // Still blocked, will try again on next interaction
      }
    };

    const handleUserInteraction = () => {
      enableAutoPlay();
      // Remove listeners after first successful interaction
      if (autoPlayEnabled) {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [autoPlayEnabled, isPlaying, volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Playback failed:', error);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };
  
  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  // Auto-play when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentSongIndex === 0) return; // Skip for initial load

    const playNewSong = async () => {
      if (isPlaying) {
        try {
          audio.volume = volume;
          await audio.play();
        } catch (error) {
          console.log('Failed to play new song:', error);
        }
      }
    };

    // Small delay to ensure new song is loaded
    setTimeout(playNewSong, 100);
  }, [currentSongIndex, isPlaying, volume]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio 
        ref={audioRef} 
        src={currentSong.src}
      />
      
      {/* Auto-play hint */}
      {!isPlaying && !autoPlayEnabled && (
        <div className="absolute -top-12 right-0 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full animate-bounce">
          🎵 Klicken für Musik
        </div>
      )}
      
      {/* Compact Player */}
      {!isExpanded && (
        <div className="bg-black/90 backdrop-blur-md rounded-full p-2 shadow-2xl border border-white/20 flex items-center space-x-2 min-w-[200px] sm:min-w-[250px]">
          <button 
            onClick={togglePlay} 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying 
                ? 'bg-emerald-500 hover:bg-emerald-600' 
                : !autoPlayEnabled 
                  ? 'bg-emerald-500 hover:bg-emerald-600 animate-pulse' 
                  : 'bg-emerald-500 hover:bg-emerald-600'
            }`}
            title={!isPlaying && !autoPlayEnabled ? 'Klicken um Musik zu starten' : ''}
          >
            {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{currentSong.title}</p>
            <div className="w-full bg-white/20 rounded-full h-1 mt-1">
              <div className="bg-emerald-500 h-1 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
          
          <button onClick={() => setIsExpanded(true)} className="text-white/70 hover:text-white transition-colors">
            <ChevronUp size={16} />
        </button>
        </div>
      )}

      {/* Expanded Player */}
      {isExpanded && (
        <div className="bg-black/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/20 w-80 max-w-[calc(100vw-2rem)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-lg">DJ Chezzy Mix</h3>
            <button onClick={() => setIsExpanded(false)} className="text-white/70 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="text-center mb-4">
            <p className="text-white font-medium">{currentSong.title}</p>
            <p className="text-white/70 text-sm">{currentSong.artist}</p>
              </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="flex justify-between text-white/70 text-xs mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button onClick={prevSong} className="text-white/70 hover:text-white transition-colors">
              <SkipBack size={20} />
            </button>
            <button onClick={togglePlay} className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-0.5" />}
            </button>
            <button onClick={nextSong} className="text-white/70 hover:text-white transition-colors">
              <SkipForward size={20} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none slider"
            />
          </div>

          {/* Playlist */}
          <div className="mt-4 max-h-32 overflow-y-auto">
              {songs.map((song, index) => (
                <button
                  key={song.id}
                onClick={() => setCurrentSongIndex(index)}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  index === currentSongIndex ? 'bg-emerald-500/20 text-emerald-400' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                <p className="text-sm font-medium truncate">{song.title}</p>
                </button>
              ))}
          </div>
        </div>
      )}

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;