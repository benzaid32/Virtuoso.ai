import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BIOSLoader } from './components/System/BIOSLoader';
import { WelcomeScreen } from './components/System/WelcomeScreen';
import { Gallery3D } from './components/3D/Gallery3D';
import { GalleryTerminal } from './components/UI/GalleryTerminal';
import { useGalleryStore } from './stores/galleryStore';

export default function App() {
  const { 
    isLoading,
    systemReady,
    showWelcome,
    cameraMode,
    isSlideshow,
    slideshowInterval,
    nextArtwork,
    updateTime,
    incrementVisitorCount,
    setCameraMode
  } = useGalleryStore();

  // Handle slideshow
  useEffect(() => {
    if (!isSlideshow || cameraMode !== 'monitor') return;
    
    const interval = setInterval(() => {
      nextArtwork();
    }, slideshowInterval);

    return () => clearInterval(interval);
  }, [isSlideshow, slideshowInterval, nextArtwork, cameraMode]);

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

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && cameraMode === 'monitor') {
        setCameraMode('desk');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cameraMode, setCameraMode]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && !systemReady && (
          <BIOSLoader key="bios" />
        )}
        
        {systemReady && showWelcome && (
          <WelcomeScreen key="welcome" />
        )}
        
        {systemReady && !showWelcome && (
          <div key="gallery">
            {/* 3D Environment Layer */}
            <Gallery3D />
            
            {/* Terminal Interface Layer */}
            {cameraMode === 'monitor' && <GalleryTerminal />}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}