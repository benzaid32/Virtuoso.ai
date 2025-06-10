import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useGalleryStore } from '../../stores/galleryStore';
import * as THREE from 'three';

export const CameraController: React.FC = () => {
  const { cameraMode } = useGalleryStore();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { camera } = useThree();
  
  const cameraPositions = {
    idle: { position: [8, 4, 8], target: [0, 1, 0] },
    desk: { position: [0, 3, 5], target: [0, 1, 0] },
    monitor: { position: [0, 1.5, 2], target: [0, 0.8, -1] },
    free: { position: [0, 6, 10], target: [0, 2, 0] }
  };

  useFrame(() => {
    if (cameraRef.current) {
      const targetPos = cameraPositions[cameraMode];
      const currentPos = cameraRef.current.position;
      const targetVec = new THREE.Vector3(...targetPos.position);
      const lookAtVec = new THREE.Vector3(...targetPos.target);

      // Smooth camera transition
      currentPos.lerp(targetVec, 0.05);
      cameraRef.current.lookAt(lookAtVec);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={cameraPositions[cameraMode].position}
      fov={60}
      near={0.1}
      far={1000}
    />
  );
};