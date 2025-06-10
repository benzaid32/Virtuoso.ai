import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useAppStore } from '../../stores/appStore';
import * as THREE from 'three';

export const AudioVisualizer3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { isPlaying, uploadedFile, generatedTrack, currentlyPlaying } = useAppStore();

  const waveformData = useMemo(() => {
    if (currentlyPlaying === 'original' && uploadedFile) {
      return uploadedFile.waveformData;
    } else if (currentlyPlaying === 'generated' && generatedTrack) {
      return generatedTrack.waveformData;
    }
    return Array.from({ length: 32 }, () => Math.random() * 0.5);
  }, [currentlyPlaying, uploadedFile, generatedTrack]);

  useFrame((state) => {
    if (groupRef.current && isPlaying) {
      groupRef.current.children.forEach((bar, index) => {
        const baseHeight = waveformData[index % waveformData.length] || 0.1;
        const animatedHeight = baseHeight + Math.sin(state.clock.elapsedTime * 5 + index * 0.5) * 0.3;
        bar.scale.y = Math.max(0.1, animatedHeight);
        
        // Color animation
        const material = (bar as THREE.Mesh).material as THREE.MeshLambertMaterial;
        const hue = (state.clock.elapsedTime * 0.1 + index * 0.1) % 1;
        material.color.setHSL(hue, 0.8, 0.6);
      });
    }
  });

  return (
    <group ref={groupRef} position={[-3, 0.5, 1]}>
      {[...Array(32)].map((_, i) => (
        <Box
          key={i}
          args={[0.08, 0.5, 0.08]}
          position={[i * 0.12 - 2, 0.25, 0]}
          castShadow
        >
          <meshLambertMaterial 
            color={isPlaying ? "#6366f1" : "#374151"} 
            transparent 
            opacity={isPlaying ? 0.8 : 0.3}
          />
        </Box>
      ))}
    </group>
  );
};