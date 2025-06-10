import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryHeader } from './components/Layout/GalleryHeader';
import { ResponsiveGrid } from './components/Layout/ResponsiveGrid';
import { Gallery3D } from './components/3D/Gallery3D';
import { ArtworkViewer } from './components/UI/ArtworkViewer';
import { ArtworkInfo } from './components/UI/ArtworkInfo';
import { GalleryControls } from './components/UI/GalleryControls';
import { useGalleryStore } from './stores/galleryStore';

export default function App() {
  const { 
    isSlideshow,
    slideshowInterval,
    nextArtwork,
    updateTime,
    incrementVisitorCount
  } = useGalleryStore();

  // Handle slideshow
  useEffect(() => {
    if (!isSlideshow) return;
    
    const interval = setInterval(() => {
      nextArtwork();
    }, slideshowInterval);

    return () => clearInterval(interval);
  }, [isSlideshow, slideshowInterval, nextArtwork]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  // Simulate visitor count updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        incrementVisitorCount();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [incrementVisitorCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-900/20 text-white overflow-hidden">
      <GalleryHeader />
      
      <main className="container mx-auto px-6 py-8 h-[calc(100vh-88px)]">
        <ResponsiveGrid>
          {/* Left Panel - 3D Gallery Scene */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-black/30 rounded-3xl overflow-hidden border border-amber-500/20 backdrop-blur-sm"
          >
            <Gallery3D />
          </motion.div>

          {/* Right Panel - Artwork Display & Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6 h-full"
          >
            {/* Artwork Viewer */}
            <div className="flex-1">
              <ArtworkViewer />
            </div>

            {/* Artwork Information */}
            <AnimatePresence>
              <ArtworkInfo />
            </AnimatePresence>

            {/* Gallery Controls */}
            <GalleryControls />
          </motion.div>
        </ResponsiveGrid>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-orange-500/5 rounded-full blur-2xl animate-float" />
      </div>
    </div>
  );
}