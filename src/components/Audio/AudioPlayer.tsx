import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { AudioFile, GeneratedTrack } from '../../types/audio';
import { formatDuration } from '../../utils/audioUtils';

interface AudioPlayerProps {
  originalFile?: AudioFile;
  generatedTrack?: GeneratedTrack;
  onPlayStateChange?: (isPlaying: boolean, track: 'original' | 'generated' | null) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  originalFile,
  generatedTrack,
  onPlayStateChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<'original' | 'generated' | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
      onPlayStateChange?.(false, null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onPlayStateChange]);

  const playTrack = (track: 'original' | 'generated') => {
    const audio = audioRef.current;
    if (!audio) return;

    const trackData = track === 'original' ? originalFile : generatedTrack;
    if (!trackData) return;

    if (currentTrack !== track) {
      audio.src = trackData.url;
      setCurrentTrack(track);
    }

    audio.play();
    setIsPlaying(true);
    onPlayStateChange?.(true, track);
  };

  const pauseTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    onPlayStateChange?.(false, currentTrack);
  };

  const stopTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTrack(null);
    onPlayStateChange?.(false, null);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(newVolume);
    audio.volume = newVolume;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <audio ref={audioRef} />

      {/* Track Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <motion.button
          onClick={() => playTrack('original')}
          disabled={!originalFile}
          className={`
            p-3 sm:p-4 rounded-lg border-2 transition-all duration-300
            ${currentTrack === 'original' 
              ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300' 
              : 'border-gray-600 hover:border-gray-500 text-gray-300'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          whileHover={{ scale: originalFile ? 1.02 : 1 }}
          whileTap={{ scale: originalFile ? 0.98 : 1 }}
        >
          <div className="text-sm font-medium mb-1">Original Track</div>
          <div className="text-xs text-gray-400 truncate">
            {originalFile ? originalFile.name : 'No file uploaded'}
          </div>
        </motion.button>

        <motion.button
          onClick={() => playTrack('generated')}
          disabled={!generatedTrack}
          className={`
            p-3 sm:p-4 rounded-lg border-2 transition-all duration-300
            ${currentTrack === 'generated' 
              ? 'border-purple-400 bg-purple-500/20 text-purple-300' 
              : 'border-gray-600 hover:border-gray-500 text-gray-300'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          whileHover={{ scale: generatedTrack ? 1.02 : 1 }}
          whileTap={{ scale: generatedTrack ? 0.98 : 1 }}
        >
          <div className="text-sm font-medium mb-1">Generated Track</div>
          <div className="text-xs text-gray-400 truncate">
            {generatedTrack ? `${generatedTrack.mode} - ${generatedTrack.instrument || generatedTrack.ensemble}` : 'Not generated yet'}
          </div>
        </motion.button>
      </div>

      {/* Playback Controls */}
      <div className="glass-effect p-4 sm:p-6 rounded-xl">
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4">
          <motion.button
            onClick={() => skipTime(-10)}
            disabled={!currentTrack}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          <motion.button
            onClick={isPlaying ? pauseTrack : () => currentTrack && playTrack(currentTrack)}
            disabled={!currentTrack}
            className="p-3 sm:p-4 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
          </motion.button>

          <motion.button
            onClick={stopTrack}
            disabled={!currentTrack}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Square className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          <motion.button
            onClick={() => skipTime(10)}
            disabled={!currentTrack}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-gray-400">
            <span>{formatDuration(currentTime)}</span>
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-3 mt-4">
          <Volume2 className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-gray-400 w-8">{Math.round(volume * 100)}</span>
        </div>
      </div>
    </div>
  );
};