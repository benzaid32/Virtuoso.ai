import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { GalleryEnvironment } from './GalleryEnvironment';
import { ArtInstallation } from './ArtInstallation';
import { GalleryLighting } from './GalleryLighting';
import { LoadingSpinner } from './LoadingSpinner';

interface Gallery3DProps {
  className?: string;
}

export const Gallery3D: React.FC<Gallery3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="bg-gradient-to-b from-neutral-900 to-neutral-800"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <PerspectiveCamera
            makeDefault
            position={[0, 6, 10]}
            fov={65}
            near={0.1}
            far={1000}
          />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={6}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 8}
            target={[0, 2, 0]}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />

          {/* Lighting Setup */}
          <GalleryLighting />

          {/* Environment */}
          <Environment preset="studio" />
          
          {/* 3D Components */}
          <GalleryEnvironment />
          <ArtInstallation />
        </Suspense>
      </Canvas>
      
      {/* Overlay UI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm font-medium border border-amber-500/20">
            3D Gallery View
          </div>
        </div>
        
        <div className="absolute top-4 right-4 pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm font-medium flex items-center gap-2 border border-amber-500/20">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            Interactive Mode
          </div>
        </div>

        <div className="absolute bottom-4 left-4 pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-md rounded-lg px-3 py-2 text-amber-300 text-xs font-medium border border-amber-500/20">
            Click & drag to explore • Scroll to zoom
          </div>
        </div>
      </div>
    </div>
  );
};