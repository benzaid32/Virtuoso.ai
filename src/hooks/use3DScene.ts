import { useState, useCallback, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const use3DScene = () => {
  const [cameraMode, setCameraMode] = useState<'overview' | 'desk' | 'close-up'>('overview');
  const [isAnimating, setIsAnimating] = useState(false);
  const sceneRef = useRef<THREE.Group>(null);

  const cameraPositions = {
    overview: { position: [8, 6, 8], target: [0, 0, 0] },
    desk: { position: [0, 4, 6], target: [0, 1, 0] },
    'close-up': { position: [0, 2, 3], target: [0, 1.5, 0] }
  };

  const transitionCamera = useCallback((newMode: typeof cameraMode) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCameraMode(newMode);
    
    // Animation will complete in the camera controller
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const animateScene = useCallback((delta: number) => {
    if (sceneRef.current) {
      // Add subtle scene animations here
      sceneRef.current.rotation.y += delta * 0.01;
    }
  }, []);

  return {
    cameraMode,
    isAnimating,
    sceneRef,
    cameraPositions,
    transitionCamera,
    animateScene
  };
};