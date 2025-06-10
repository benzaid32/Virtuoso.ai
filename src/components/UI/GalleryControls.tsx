import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
import { useGalleryStore } from '../../stores/galleryStore';

export const GalleryControls: React.FC = () => {
  const { 
    currentArtworkIndex,
    artworks,
    isSlideshow,
    slideshowInterval,
    nextArtwork,
    previousArtwork,
    toggleSlideshow,
    setSlideshowInterval,
    setCurrentArtwork
  } = useGalleryStore();

  const handleRandomArtwork = () => {
    const randomIndex = Math.floor(Math.random() * artworks.length);
    setCurrentArtwork(randomIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-amber-900/10 to-yellow-900/10 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20"
    >
      <div className="space-y-6">
        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-display">Gallery Navigation</h3>
          <div className="text-sm text-amber-300">
            {currentArtworkIndex + 1} of {artworks.length}
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={previousArtwork}
            className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full border border-amber-500/30 text-white hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 mx-auto" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSlideshow}
            className={`
              w-16 h-16 rounded-full backdrop-blur-md border-2 transition-all duration-300 shadow-lg
              ${isSlideshow 
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                : 'bg-black/20 border-amber-500/30 text-white hover:bg-amber-500/20 hover:border-amber-500/50'
              }
            `}
          >
            {isSlideshow ? (
              <Pause className="w-8 h-8 mx-auto" />
            ) : (
              <Play className="w-8 h-8 mx-auto ml-1" />
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextArtwork}
            className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full border border-amber-500/30 text-white hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 mx-auto" />
          </motion.button>
        </div>

        {/* Additional Controls */}
        <div className="flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentArtwork(0)}
            className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-lg border border-amber-500/20 text-white hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm font-medium">Reset</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRandomArtwork}
            className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-lg border border-amber-500/20 text-white hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm font-medium">Random</span>
          </motion.button>
        </div>

        {/* Slideshow Settings */}
        {isSlideshow && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-amber-500/20 pt-4"
          >
            <div className="space-y-3">
              <label className="text-sm font-medium text-amber-300">
                Slideshow Speed: {slideshowInterval / 1000}s
              </label>
              <input
                type="range"
                min="2000"
                max="10000"
                step="1000"
                value={slideshowInterval}
                onChange={(e) => setSlideshowInterval(parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Fast (2s)</span>
                <span>Slow (10s)</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Artwork Thumbnails */}
        <div className="border-t border-amber-500/20 pt-4">
          <div className="grid grid-cols-6 gap-2">
            {artworks.map((artwork, index) => (
              <motion.button
                key={artwork.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentArtwork(index)}
                className={`
                  aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300
                  ${currentArtworkIndex === index 
                    ? 'border-amber-500 shadow-lg shadow-amber-500/25' 
                    : 'border-transparent hover:border-amber-500/50'
                  }
                `}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
};