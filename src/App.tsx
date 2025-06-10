import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BIOSLoader } from './components/System/BIOSLoader';
import { WelcomeScreen } from './components/System/WelcomeScreen';
import { Gallery3D } from './components/3D/Gallery3D';
import { MusicTerminal } from './components/UI/MusicTerminal';
import { useMusicStore } from './stores/musicStore';

export default function App() {
  const { 
    isLoading,
    systemReady,
    showWelcome,
    cameraMode,
    setCameraMode,
    updateTime
  } = useMusicStore();

  // Update time every second
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

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
          <div key="music-studio">
            {/* 3D Environment Layer */}
            <Gallery3D />
            
            {/* Terminal Interface Layer */}
            {cameraMode === 'monitor' && <MusicTerminal />}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}