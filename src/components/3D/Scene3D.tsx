import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { DeskEnvironment } from './DeskEnvironment';
import { MachineInterface } from './MachineInterface';
import { InstrumentVisualizer } from './InstrumentVisualizer';
import { LoadingSpinner } from './LoadingSpinner';

interface Scene3DProps {
  className?: string;
}

export const Scene3D: React.FC<Scene3DProps> = ({ className = '' }) => {
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
        className="bg-gradient-to-b from-neural-900 to-neural-800"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <PerspectiveCamera
            makeDefault
            position={[0, 8, 12]}
            fov={60}
            near={0.1}
            far={1000}
          />
          
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={25}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 6}
            target={[0, 2, 0]}
          />

          {/* Lighting Setup */}
          <ambientLight intensity={0.4} color="#4a90e2" />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
            color="#ffffff"
          />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#f59e0b" />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.8}
            castShadow
            color="#3b82f6"
          />

          {/* Environment */}
          <Environment preset="studio" />
          
          {/* 3D Components */}
          <DeskEnvironment />
          <MachineInterface />
          <InstrumentVisualizer />
        </Suspense>
      </Canvas>
      
      {/* Overlay UI Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 pointer-events-auto">
          <div className="bg-black/20 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm font-medium">
            Virtuoso.ai Studio
          </div>
        </div>
        
        <div className="absolute top-4 right-4 pointer-events-auto">
          <div className="bg-black/20 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            3D Engine Active
          </div>
        </div>
      </div>
    </div>
  );
};