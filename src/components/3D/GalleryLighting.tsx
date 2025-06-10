import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGalleryStore } from '../../stores/galleryStore';
import * as THREE from 'three';

export const GalleryLighting: React.FC = () => {
  const spotLight1Ref = useRef<THREE.SpotLight>(null);
  const spotLight2Ref = useRef<THREE.SpotLight>(null);
  const spotLight3Ref = useRef<THREE.SpotLight>(null);
  const currentArtwork = useGalleryStore((state) => state.currentArtwork);

  useFrame((state) => {
    // Subtle lighting animation
    if (spotLight1Ref.current) {
      spotLight1Ref.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (spotLight2Ref.current) {
      spotLight2Ref.current.intensity = 1.0 + Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
    }
    if (spotLight3Ref.current) {
      spotLight3Ref.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Adjust lighting based on artwork category
  const getLightingColor = () => {
    if (!currentArtwork) return '#ffffff';
    
    switch (currentArtwork.category) {
      case 'landscape': return '#e6f3ff';
      case 'abstract': return '#ffe6f3';
      case 'portrait': return '#fff9e6';
      case 'sculpture': return '#f0f0f0';
      case 'photography': return '#e6e6ff';
      case 'contemporary': return '#ffe6e6';
      default: return '#ffffff';
    }
  };

  return (
    <>
      {/* Ambient Light */}
      <ambientLight intensity={0.3} color="#f5f5f5" />

      {/* Main Gallery Spotlights */}
      <spotLight
        ref={spotLight1Ref}
        position={[-8, 10, -5]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color={getLightingColor()}
        target-position={[-8, 1.5, -5]}
      />

      <spotLight
        ref={spotLight2Ref}
        position={[0, 10, -5]}
        angle={0.5}
        penumbra={0.6}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color={getLightingColor()}
        target-position={[0, 1.5, -5]}
      />

      <spotLight
        ref={spotLight3Ref}
        position={[8, 10, -5]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color={getLightingColor()}
        target-position={[8, 1.5, -5]}
      />

      {/* Track Lighting */}
      <pointLight position={[-12, 8, 0]} intensity={0.4} color="#f59e0b" />
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#f59e0b" />
      <pointLight position={[12, 8, 0]} intensity={0.4} color="#f59e0b" />

      {/* Accent Lighting */}
      <pointLight position={[0, 2, 8]} intensity={0.6} color="#ffd700" />
      <pointLight position={[-15, 6, -10]} intensity={0.3} color="#ff6b6b" />
      <pointLight position={[15, 6, -10]} intensity={0.3} color="#4ecdc4" />

      {/* Directional Light for Overall Scene */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        color="#ffffff"
      />

      {/* Rim Lighting */}
      <directionalLight
        position={[-10, 5, -10]}
        intensity={0.4}
        color="#f59e0b"
      />
    </>
  );
};