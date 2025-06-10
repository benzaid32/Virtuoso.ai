import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Cylinder, Plane } from '@react-three/drei';
import { useGalleryStore } from '../../stores/galleryStore';
import * as THREE from 'three';

export const DeskEnvironment: React.FC = () => {
  const steamRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Group>(null);
  const { cameraMode } = useGalleryStore();

  useFrame((state) => {
    // Animated steam from coffee cup
    if (steamRef.current) {
      steamRef.current.children.forEach((particle, index) => {
        particle.position.y += 0.01;
        particle.position.x += Math.sin(state.clock.elapsedTime + index) * 0.002;
        if (particle.position.y > 2) {
          particle.position.y = 0.5;
        }
      });
    }

    // Monitor screen glow effect
    if (monitorRef.current && cameraMode === 'monitor') {
      const intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      monitorRef.current.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = intensity;
        }
      });
    }
  });

  return (
    <group>
      {/* Wooden Desk */}
      <RoundedBox
        args={[8, 0.2, 4]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.1, 0]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial color="#8b4513" />
      </RoundedBox>

      {/* Desk Legs */}
      {[[-3.5, -1, -1.5], [3.5, -1, -1.5], [-3.5, -1, 1.5], [3.5, -1, 1.5]].map((pos, index) => (
        <Box
          key={index}
          args={[0.2, 1.8, 0.2]}
          position={pos as [number, number, number]}
          castShadow
        >
          <meshLambertMaterial color="#654321" />
        </Box>
      ))}

      {/* Retro Computer Monitor */}
      <group ref={monitorRef} position={[0, 0.8, -1]}>
        {/* Monitor Base */}
        <Cylinder
          args={[0.8, 0.6, 0.3]}
          position={[0, -0.5, 0]}
          castShadow
        >
          <meshLambertMaterial color="#2a2a2a" />
        </Cylinder>

        {/* Monitor Body */}
        <RoundedBox
          args={[3, 2.5, 1.5]}
          radius={0.1}
          smoothness={4}
          position={[0, 0, 0]}
          castShadow
        >
          <meshLambertMaterial color="#1a1a1a" />
        </RoundedBox>

        {/* Monitor Screen */}
        <RoundedBox
          args={[2.6, 2, 0.1]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, 0.8]}
        >
          <meshBasicMaterial 
            color="#000000" 
            transparent 
            opacity={0.9}
          />
        </RoundedBox>

        {/* Screen Glow */}
        <RoundedBox
          args={[2.8, 2.2, 0.05]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, 0.85]}
        >
          <meshBasicMaterial 
            color="#d4af37" 
            transparent 
            opacity={0.3}
          />
        </RoundedBox>
      </group>

      {/* Coffee Cup with Steam */}
      <group position={[2.5, 0.3, 0.5]}>
        <Cylinder
          args={[0.3, 0.25, 0.4]}
          castShadow
        >
          <meshLambertMaterial color="#8b4513" />
        </Cylinder>

        {/* Coffee */}
        <Cylinder
          args={[0.28, 0.23, 0.05]}
          position={[0, 0.15, 0]}
        >
          <meshLambertMaterial color="#3e2723" />
        </Cylinder>

        {/* Steam Particles */}
        <group ref={steamRef}>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 0.2,
                0.5 + i * 0.1,
                (Math.random() - 0.5) * 0.2
              ]}
            >
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.6 - i * 0.05}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Keyboard */}
      <RoundedBox
        args={[1.8, 0.1, 0.6]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.05, 1.2]}
        castShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </RoundedBox>

      {/* Mouse */}
      <RoundedBox
        args={[0.3, 0.08, 0.5]}
        radius={0.02}
        smoothness={4}
        position={[1.2, 0.04, 1.2]}
        castShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </RoundedBox>

      {/* Desk Lamp */}
      <group position={[-2.5, 0, 0.8]}>
        {/* Base */}
        <Cylinder
          args={[0.4, 0.3, 0.1]}
          position={[0, 0.05, 0]}
          castShadow
        >
          <meshLambertMaterial color="#2a2a2a" />
        </Cylinder>

        {/* Arm */}
        <Cylinder
          args={[0.05, 0.05, 1.5]}
          position={[0, 0.8, 0]}
          rotation={[0, 0, Math.PI / 6]}
          castShadow
        >
          <meshLambertMaterial color="#2a2a2a" />
        </Cylinder>

        {/* Lamp Head */}
        <Cylinder
          args={[0.3, 0.2, 0.4]}
          position={[0.7, 1.4, 0]}
          rotation={[0, 0, -Math.PI / 3]}
          castShadow
        >
          <meshLambertMaterial color="#d4af37" />
        </Cylinder>
      </group>

      {/* Room Floor */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </Plane>

      {/* Room Walls */}
      <Plane
        args={[20, 10]}
        position={[0, 3, -10]}
        receiveShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </Plane>

      <Plane
        args={[20, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 3, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </Plane>
    </group>
  );
};