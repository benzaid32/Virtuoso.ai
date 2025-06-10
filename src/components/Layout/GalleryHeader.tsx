import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Crown, Clock, Users } from 'lucide-react';
import { useGalleryStore } from '../../stores/galleryStore';

export const GalleryHeader: React.FC = () => {
  const { visitorCount, galleryStatus, currentTime } = useGalleryStore();

  const getStatusColor = () => {
    switch (galleryStatus) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'private-viewing': return 'text-amber-400';
      default: return 'text-neutral-400';
    }
  };

  const getStatusText = () => {
    switch (galleryStatus) {
      case 'open': return 'Gallery Open';
      case 'closed': return 'Gallery Closed';
      case 'private-viewing': return 'Private Viewing';
      default: return 'Gallery Status';
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 bg-black/30 backdrop-blur-md border-b border-amber-500/20"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">Virtuoso Gallery</h1>
              <p className="text-sm text-amber-300">Immersive Digital Art Experience</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-6">
            {/* Gallery Status */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg backdrop-blur-sm border border-amber-500/20"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </motion.div>

            {/* Visitor Count */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg backdrop-blur-sm border border-amber-500/20"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white">
                {visitorCount.toLocaleString()} visitors
              </span>
            </motion.div>

            {/* Current Time */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg backdrop-blur-sm border border-amber-500/20"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white font-mono">
                {currentTime}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};