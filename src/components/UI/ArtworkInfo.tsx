import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Calendar, Ruler, Palette, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { useGalleryStore } from '../../stores/galleryStore';

export const ArtworkInfo: React.FC = () => {
  const { currentArtwork, showArtworkInfo } = useGalleryStore();

  if (!currentArtwork || !showArtworkInfo) return null;

  const getCategoryColor = (category: string) => {
    const colors = {
      landscape: 'from-green-500 to-emerald-600',
      abstract: 'from-purple-500 to-pink-600',
      portrait: 'from-blue-500 to-indigo-600',
      sculpture: 'from-gray-500 to-slate-600',
      photography: 'from-cyan-500 to-teal-600',
      contemporary: 'from-orange-500 to-red-600'
    };
    return colors[category as keyof typeof colors] || 'from-neutral-500 to-gray-600';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-amber-900/10 to-yellow-900/10 backdrop-blur-md rounded-2xl p-6 border border-amber-500/20 overflow-hidden"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display">Artwork Details</h3>
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(currentArtwork.category)} text-white text-xs font-medium uppercase tracking-wide`}>
              {currentArtwork.category}
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-300 text-sm leading-relaxed"
          >
            {currentArtwork.description}
          </motion.p>

          {/* Details Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Medium */}
            <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-amber-500/10">
              <Palette className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Medium</p>
                <p className="text-white text-sm font-medium">{currentArtwork.medium}</p>
              </div>
            </div>

            {/* Year */}
            <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-amber-500/10">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Year</p>
                <p className="text-white text-sm font-medium">{currentArtwork.year}</p>
              </div>
            </div>

            {/* Dimensions */}
            <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-amber-500/10">
              <Ruler className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Dimensions</p>
                <p className="text-white text-sm font-medium">{currentArtwork.dimensions}</p>
              </div>
            </div>

            {/* Price & Availability */}
            <div className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-amber-500/10">
              <DollarSign className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Price</p>
                <div className="flex items-center gap-2">
                  <p className="text-white text-sm font-medium">
                    {currentArtwork.price || 'Price on Request'}
                  </p>
                  {currentArtwork.isAvailable ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`
              flex items-center justify-center gap-2 p-3 rounded-lg border
              ${currentArtwork.isAvailable 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
              }
            `}
          >
            {currentArtwork.isAvailable ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Available for Purchase</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span className="font-medium">Currently Unavailable</span>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};