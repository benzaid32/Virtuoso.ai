import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Heart, ZoomIn, ZoomOut, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGalleryStore } from '../../stores/galleryStore';

export const GalleryTerminal: React.FC = () => {
  const {
    currentArtwork,
    currentArtworkIndex,
    artworks,
    favorites,
    isSlideshow,
    audioEnabled,
    visitorCount,
    galleryStatus,
    currentTime,
    zoomLevel,
    showArtworkInfo,
    nextArtwork,
    previousArtwork,
    toggleSlideshow,
    toggleFavorite,
    toggleAudio,
    setZoomLevel,
    toggleArtworkInfo
  } = useGalleryStore();

  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  if (!currentArtwork) return null;

  const isFavorite = favorites.includes(currentArtwork.id);

  const getStatusColor = () => {
    switch (galleryStatus) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'private-viewing': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm text-green-400 font-mono text-sm overflow-hidden pointer-events-none">
      {/* Terminal Header */}
      <div className="border-b border-green-400 p-4 pointer-events-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-yellow-400 font-bold">🎨 VIRTUAL ART GALLERY 🎨</span>
            <span className="text-gray-400">|</span>
            <span>Visitors: {visitorCount.toLocaleString()}</span>
            <span className="text-gray-400">|</span>
            <span className={getStatusColor()}>{galleryStatus.toUpperCase()}</span>
            <span className="text-gray-400">|</span>
            <span>{currentTime}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className="p-2 border border-green-400 hover:bg-green-400 hover:text-black transition-all"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Gallery Interface */}
      <div className="flex h-[calc(100vh-80px)] pointer-events-auto">
        {/* Left Panel - Artwork Display */}
        <div className="flex-1 p-6 border-r border-green-400">
          <div className="h-full flex flex-col">
            {/* Artwork Frame */}
            <div className="flex-1 border-2 border-yellow-400 p-4 mb-4 relative">
              <div className="w-full h-full bg-black border border-green-400 relative overflow-hidden">
                <motion.img
                  key={currentArtwork.id}
                  src={currentArtwork.imageUrl}
                  alt={currentArtwork.title}
                  className="w-full h-full object-cover"
                  style={{ transform: `scale(${zoomLevel})` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Gallery Lighting Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-400/10 pointer-events-none" />
                
                {/* Zoom Controls */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <button
                    onClick={() => setZoomLevel(zoomLevel - 0.25)}
                    disabled={zoomLevel <= 1}
                    className="p-1 bg-black/80 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black disabled:opacity-50"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(zoomLevel + 0.25)}
                    disabled={zoomLevel >= 3}
                    className="p-1 bg-black/80 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black disabled:opacity-50"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(currentArtwork.id)}
                  className={`absolute top-2 right-2 p-1 border ${
                    isFavorite 
                      ? 'border-red-400 text-red-400 bg-red-400/20' 
                      : 'border-green-400 text-green-400 bg-black/80'
                  } hover:bg-red-400 hover:text-black`}
                >
                  <Heart className={`w-3 h-3 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Artwork Info Plaque */}
            <div className="border border-yellow-400 p-3 bg-black/50">
              <div className="text-yellow-400 font-bold text-lg mb-1">
                {currentArtwork.title}
              </div>
              <div className="text-green-400 mb-2">
                by {currentArtwork.artist}, {currentArtwork.year}
              </div>
              <div className="text-xs text-gray-400 flex justify-between">
                <span>{currentArtwork.medium}</span>
                <span>{currentArtwork.dimensions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Controls & Info */}
        <div className="w-80 p-6 flex flex-col">
          {/* Artwork Details */}
          <div className="border border-green-400 p-4 mb-4 flex-1">
            <div className="text-yellow-400 font-bold mb-2 border-b border-green-400 pb-2">
              📋 ARTWORK DETAILS
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-400">Style:</span>
                <span className="ml-2 text-green-400 capitalize">{currentArtwork.category}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Price:</span>
                <span className="ml-2 text-yellow-400">{currentArtwork.price || 'N/A'}</span>
              </div>
              
              <div>
                <span className="text-gray-400">Status:</span>
                <span className={`ml-2 ${currentArtwork.isAvailable ? 'text-green-400' : 'text-red-400'}`}>
                  {currentArtwork.isAvailable ? 'Available' : 'Sold/Reserved'}
                </span>
              </div>
            </div>

            {showArtworkInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-green-400"
              >
                <div className="text-yellow-400 font-bold mb-2">Description:</div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  {currentArtwork.description}
                </div>
              </motion.div>
            )}

            <div className="mt-4 pt-4 border-t border-green-400">
              <button
                onClick={toggleArtworkInfo}
                className="text-xs border border-green-400 px-2 py-1 hover:bg-green-400 hover:text-black transition-all"
              >
                {showArtworkInfo ? 'ℹ️ HIDE INFO' : 'ℹ️ MORE INFO'}
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="border border-green-400 p-4">
            <div className="text-yellow-400 font-bold mb-3 border-b border-green-400 pb-2">
              GALLERY NAVIGATION
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={previousArtwork}
                className="flex items-center gap-1 px-3 py-1 border border-green-400 hover:bg-green-400 hover:text-black transition-all text-xs"
              >
                <ChevronLeft className="w-3 h-3" />
                PREV
              </button>

              <div className="text-xs text-gray-400">
                [{currentArtworkIndex + 1} of {artworks.length}]
              </div>

              <button
                onClick={nextArtwork}
                className="flex items-center gap-1 px-3 py-1 border border-green-400 hover:bg-green-400 hover:text-black transition-all text-xs"
              >
                NEXT
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={toggleSlideshow}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 border transition-all text-xs ${
                isSlideshow 
                  ? 'border-yellow-400 text-yellow-400 bg-yellow-400/20' 
                  : 'border-green-400 text-green-400 hover:bg-green-400 hover:text-black'
              }`}
            >
              {isSlideshow ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isSlideshow ? '▶ SLIDESHOW ON' : '▶ SLIDESHOW OFF'}
            </button>

            {/* Artwork Thumbnails */}
            <div className="mt-4 pt-4 border-t border-green-400">
              <div className="text-xs text-gray-400 mb-2">Quick Select:</div>
              <div className="grid grid-cols-3 gap-1">
                {artworks.map((artwork, index) => (
                  <button
                    key={artwork.id}
                    onClick={() => useGalleryStore.getState().setCurrentArtwork(index)}
                    className={`aspect-square border text-xs ${
                      currentArtworkIndex === index 
                        ? 'border-yellow-400 bg-yellow-400/20' 
                        : 'border-green-400 hover:border-yellow-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Cursor */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <span className="text-green-400">
          gallery@vga:~${' '}
          {showCursor && <span className="bg-green-400 text-black">█</span>}
        </span>
      </div>
    </div>
  );
};