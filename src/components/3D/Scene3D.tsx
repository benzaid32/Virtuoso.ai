import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { DeskScene } from './DeskScene';
import { MusicianModels } from './MusicianModels';
import { AudioVisualizer3D } from './AudioVisualizer3D';
import { useAppStore } from '../../stores/appStore';

const LoadingFallback: React.FC = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#6366f1" wireframe />
  </mesh>
);

export const Scene3D: React.FC = () => {
  const { cameraMode, setCameraMode } = useAppStore();

  const cameraPositions = {
    overview: { position: [8, 6, 8], target: [0, 0, 0] },
    desk: { position: [0, 4, 6], target: [0, 1, 0] },
    'close-up': { position: [0, 2, 3], target: [0, 1.5, 0] }
  };

  const handleCanvasClick = () => {
    if (cameraMode === 'overview') {
      setCameraMode('desk');
    } else if (cameraMode === 'desk') {
      setCameraMode('close-up');
    } else {
      setCameraMode('overview');
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        onClick={handleCanvasClick}
        style={{ cursor: 'pointer' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <PerspectiveCamera
            makeDefault
            position={cameraPositions[cameraMode].position}
            fov={60}
            near={0.1}
            far={1000}
          />

          {/* Lighting Setup */}
          <ambientLight intensity={0.4} color="#f5f5f5" />
          
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          <pointLight position={[-5, 5, 5]} intensity={0.5} color="#6366f1" />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />

          {/* Environment */}
          <Environment preset="night" />

          {/* 3D Components */}
          <DeskScene />
          <MusicianModels />
          <AudioVisualizer3D />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />

          {/* Fog */}
          <fog attach="fog" args={['#1a1a1a', 8, 30]} />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-24 left-6 text-white/80 text-sm font-mono">
        <div className="glass-effect p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>3D Engine Active</span>
          </div>
          <div className="text-xs text-white/60">
            Camera: {cameraMode.toUpperCase()}
          </div>
          <div className="text-xs text-white/60 mt-1">
            Click to change view
          </div>
        </div>
      </div>
    </div>
  );
};