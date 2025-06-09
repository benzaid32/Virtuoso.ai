import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Download, Volume2 } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

export const AudioPlayer: React.FC = () => {
  const { 
    generatedResult, 
    isPlaying, 
    currentTime, 
    duration,
    setIsPlaying,
    setCurrentTime,
    setDuration 
  } = useAppStore();
  
  const originalAudioRef = useRef<HTMLAudioElement>(null);
  const generatedAudioRef = useRef<HTMLAudioElement>(null);
  const [activeTrack, setActiveTrack] = useState<'original' | 'generated'>('generated');
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const audio = activeTrack === 'original' ? originalAudioRef.current : generatedAudioRef.current;
    if (!audio || !generatedResult) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeTrack, generatedResult, setCurrentTime, setDuration, setIsPlaying]);

  useEffect(() => {
    const audio = activeTrack === 'original' ? originalAudioRef.current : generatedAudioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, activeTrack]);

  useEffect(() => {
    [originalAudioRef.current, generatedAudioRef.current].forEach(audio => {
      if (audio) audio.volume = volume;
    });
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = activeTrack === 'original' ? originalAudioRef.current : generatedAudioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skip = (seconds: number) => {
    const audio = activeTrack === 'original' ? originalAudioRef.current : generatedAudioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    }
  };

  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    if (!generatedResult) return;
    
    const link = document.createElement('a');
    link.href = generatedResult.generatedUrl;
    link.download = `virtuoso-${generatedResult.instrument}-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!generatedResult) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      {/* Hidden Audio Elements */}
      <audio ref={originalAudioRef} src={generatedResult.originalUrl} preload="metadata" />
      <audio ref={generatedAudioRef} src={generatedResult.generatedUrl} preload="metadata" />

      <div className="space-y-6">
        {/* Track Selection */}
        <div className="flex gap-2 p-1 bg-black/20 rounded-xl">
          <button
            onClick={() => setActiveTrack('original')}
            className={`
              flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300
              ${activeTrack === 'original' 
                ? 'bg-white/20 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            Original
          </button>
          <button
            onClick={() => setActiveTrack('generated')}
            className={`
              flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300
              ${activeTrack === 'generated' 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            Generated {generatedResult.instrument}
          </button>
        </div>

        {/* Waveform Visualization */}
        <div className="h-20 bg-black/20 rounded-xl p-4 flex items-center justify-center">
          <div className="flex items-end gap-1 h-full">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className={`
                  w-1 bg-gradient-to-t rounded-full
                  ${activeTrack === 'generated' 
                    ? 'from-primary-600 to-primary-400' 
                    : 'from-accent-600 to-accent-400'
                  }
                `}
                animate={{
                  height: isPlaying 
                    ? `${20 + Math.sin((Date.now() / 100) + i) * 15}px`
                    : `${5 + (i % 3) * 8}px`
                }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-neutral-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => skip(-10)}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors shadow-lg"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => skip(10)}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-neutral-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download
            </motion.button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
};