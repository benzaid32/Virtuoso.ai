import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize, Heart, Info } from 'lucide-react';
import { useGalleryStore } from '../../stores/galleryStore';

export const ArtworkViewer: React.FC = () => {
  const { 
    currentArtwork, 
    favorites, 
    zoomLevel, 
    isFullscreen,
    showArtworkInfo,
    toggleFavorite, 
    setZoomLevel, 
    setFullscreen,
    toggleArtworkInfo
  } = useGalleryStore();

  const [imageLoaded, setImageLoaded] = useState(false);

  if (!currentArtwork) return null;

  const isFavorite = favorites.includes(currentArtwork.id);

  const handleZoomIn = () => setZoomLevel(zoomLevel + 0.25);
  const handleZoomOut = () => setZoomLevel(zoomLevel - 0.25);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-amber-900/10 to-yellow-900/10 backdrop-blur-md rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl"
    >
      {/* Artwork Frame */}
      <div className="relative p-8">
        {/* Ornate Frame Border */}
        <div className="absolute inset-4 border-4 border-amber-500/30 rounded-lg">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-l-4 border-t-4 border-amber-400 rounded-tl-lg"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 border-r-4 border-t-4 border-amber-400 rounded-tr-lg"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-4 border-b-4 border-amber-400 rounded-bl-lg"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-4 border-b-4 border-amber-400 rounded-br-lg"></div>
        </div>

        {/* Artwork Image */}
        <div className="relative aspect-[4/3] bg-black/20 rounded-lg overflow-hidden">
          <AnimatePresence>
            {!imageLoaded && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.img
            key={currentArtwork.id}
            src={currentArtwork.imageUrl}
            alt={currentArtwork.title}
            className="w-full h-full object-cover"
            style={{ 
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? zoomLevel : 0.9 }}
            transition={{ duration: 0.5 }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />

          {/* Gallery Lighting Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-radial from-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* Artwork Plaque */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 backdrop-blur-sm rounded-lg p-4 border border-amber-500/20"
        >
          <h3 className="text-xl font-bold text-white font-display mb-1">
            {currentArtwork.title}
          </h3>
          <p className="text-amber-300 text-sm mb-2">
            {currentArtwork.artist}, {currentArtwork.year}
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-300">
            <span>{currentArtwork.medium}</span>
            <span>{currentArtwork.dimensions}</span>
          </div>
        </motion.div>
      </div>

      {/* Control Overlay */}
      <div className="absolute top-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleFavorite(currentArtwork.id)}
          className={`
            w-10 h-10 rounded-full backdrop-blur-md border transition-all duration-300
            ${isFavorite 
              ? 'bg-red-500/20 border-red-500/50 text-red-400' 
              : 'bg-black/20 border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400'
            }
          `}
        >
          <Heart className={`w-5 h-5 mx-auto ${isFavorite ? 'fill-current' : ''}`} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleArtworkInfo}
          className={`
            w-10 h-10 rounded-full backdrop-blur-md border transition-all duration-300
            ${showArtworkInfo 
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
              : 'bg-black/20 border-white/20 text-white hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400'
            }
          `}
        >
          <Info className="w-5 h-5 mx-auto" />
        </motion.button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomOut}
          disabled={zoomLevel <= 1}
          className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomOut className="w-5 h-5 mx-auto" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomIn}
          disabled={zoomLevel >= 3}
          className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ZoomIn className="w-5 h-5 mx-auto" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setFullscreen(!isFullscreen)}
          className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
        >
          <Maximize className="w-5 h-5 mx-auto" />
        </motion.button>
      </div>

      {/* Zoom Level Indicator */}
      {zoomLevel > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-mono"
        >
          {Math.round(zoomLevel * 100)}%
        </motion.div>
      )}
    </motion.div>
  );
};