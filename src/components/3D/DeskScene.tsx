import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Cylinder, Plane } from '@react-three/drei';
import { useAppStore } from '../../stores/appStore';
import * as THREE from 'three';

export const DeskScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Group>(null);
  const { isPlaying, currentlyPlaying } = useAppStore();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle ambient animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }

    if (monitorRef.current && isPlaying) {
      // Monitor glow effect when playing
      monitorRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.01);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Desk Surface */}
      <RoundedBox
        args={[8, 0.2, 4]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial color="#8B4513" />
      </RoundedBox>

      {/* Monitor Setup */}
      <group ref={monitorRef} position={[0, 1.5, -1]}>
        {/* Monitor Base */}
        <Cylinder
          args={[0.3, 0.4, 0.1]}
          position={[0, -0.8, 0]}
          castShadow
        >
          <meshLambertMaterial color="#2a2a2a" />
        </Cylinder>

        {/* Monitor Stand */}
        <Box
          args={[0.1, 0.8, 0.1]}
          position={[0, -0.4, 0]}
          castShadow
        >
          <meshLambertMaterial color="#2a2a2a" />
        </Box>

        {/* Monitor Body */}
        <RoundedBox
          args={[3, 2, 0.3]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, 0]}
          castShadow
        >
          <meshLambertMaterial color="#1a1a1a" />
        </RoundedBox>

        {/* Monitor Screen */}
        <RoundedBox
          args={[2.8, 1.8, 0.05]}
          radius={0.02}
          smoothness={4}
          position={[0, 0, 0.18]}
        >
          <meshBasicMaterial 
            color={isPlaying ? "#1a1a2e" : "#000000"} 
            transparent 
            opacity={0.9}
          />
        </RoundedBox>

        {/* Screen Glow */}
        {isPlaying && (
          <RoundedBox
            args={[3, 2.2, 0.02]}
            radius={0.03}
            smoothness={4}
            position={[0, 0, 0.2]}
          >
            <meshBasicMaterial 
              color="#6366f1" 
              transparent 
              opacity={0.2}
            />
          </RoundedBox>
        )}
      </group>

      {/* Audio Interface */}
      <group position={[2.5, 0.3, 0.5]}>
        <RoundedBox
          args={[1.5, 0.3, 1]}
          radius={0.02}
          smoothness={4}
          castShadow
        >
          <meshLambertMaterial color="#2a2a2a" />
        </RoundedBox>

        {/* Control Knobs */}
        {[...Array(6)].map((_, i) => (
          <Cylinder
            key={i}
            args={[0.05, 0.05, 0.08]}
            position={[
              -0.5 + (i % 3) * 0.5,
              0.2,
              -0.2 + Math.floor(i / 3) * 0.4
            ]}
            castShadow
          >
            <meshLambertMaterial color="#6366f1" />
          </Cylinder>
        ))}
      </group>

      {/* Coffee Cup with Steam */}
      <group position={[-2, 0.3, 1]}>
        <Cylinder
          args={[0.15, 0.12, 0.2]}
          castShadow
        >
          <meshLambertMaterial color="#8B4513" />
        </Cylinder>

        {/* Steam Effect */}
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            args={[0.02, 0.1, 0.02]}
            position={[
              -0.05 + i * 0.05,
              0.3 + i * 0.1,
              0
            ]}
          >
            <meshBasicMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.3 - i * 0.1}
            />
          </Box>
        ))}
      </group>

      {/* Desk Accessories */}
      <group position={[-1.5, 0.2, -0.5]}>
        {/* Notebook */}
        <Box
          args={[0.8, 0.02, 1]}
          castShadow
        >
          <meshLambertMaterial color="#f5f5f5" />
        </Box>

        {/* Pen */}
        <Cylinder
          args={[0.01, 0.01, 0.6]}
          rotation={[0, 0, Math.PI / 4]}
          position={[0.2, 0.02, 0.2]}
          castShadow
        >
          <meshLambertMaterial color="#1a1a1a" />
        </Cylinder>
      </group>

      {/* Floor */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </Plane>

      {/* Back Wall */}
      <Plane
        args={[20, 10]}
        position={[0, 3, -8]}
        receiveShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </Plane>
    </group>
  );
};