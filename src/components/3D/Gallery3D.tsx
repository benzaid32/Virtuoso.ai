import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { MusicStudio } from './MusicStudio';
import { GalleryLighting } from './GalleryLighting';
import { CameraController } from './CameraController';
import { LoadingSpinner } from './LoadingSpinner';
import { useMusicStore } from '../../stores/musicStore';

export const Gallery3D: React.FC = () => {
  const { cameraMode, setCameraMode } = useMusicStore();

  const handleCanvasClick = () => {
    if (cameraMode === 'idle') {
      setCameraMode('desk');
    } else if (cameraMode === 'desk') {
      setCameraMode('monitor');
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        onClick={handleCanvasClick}
        style={{ cursor: cameraMode !== 'monitor' ? 'pointer' : 'default' }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <CameraController />
          
          {/* Lighting Setup */}
          <GalleryLighting />
          
          {/* Environment */}
          <Environment preset="night" />
          
          {/* 3D Components */}
          <MusicStudio />
          
          {/* Fog for atmosphere */}
          <fog attach="fog" args={['#000000', 8, 40]} />
        </Suspense>
      </Canvas>

      {/* UI Overlays */}
      <div className="absolute top-4 left-4 text-green-400 font-mono text-xs bg-black/80 border border-green-400 px-3 py-2 pointer-events-none">
        Camera: {cameraMode.toUpperCase()}
        {cameraMode !== 'monitor' && (
          <div className="text-yellow-400 mt-1">Click to advance camera</div>
        )}
      </div>

      <div className="absolute top-4 right-4 text-green-400 font-mono text-xs bg-black/80 border border-green-400 px-3 py-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          VIRTUOSO.AI SYSTEMS ONLINE
        </div>
      </div>

      {cameraMode === 'monitor' && (
        <div className="absolute bottom-4 left-4 text-green-400 font-mono text-xs bg-black/80 border border-green-400 px-3 py-2 pointer-events-none">
          Press ESC to exit terminal view
        </div>
      )}
    </div>
  );
};