import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Plane, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export const GalleryEnvironment: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);

  // Create floating dust particles for atmosphere
  const particleCount = 50;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25;
    positions[i * 3 + 1] = Math.random() * 8 + 1;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    
    colors[i * 3] = 0.9 + Math.random() * 0.1;     // R
    colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G  
    colors[i * 3 + 2] = 0.6 + Math.random() * 0.3; // B
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    if (spotlightRef.current) {
      spotlightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      spotlightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <group>
      {/* Gallery Floor */}
      <Plane
        args={[40, 40]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </Plane>

      {/* Gallery Walls */}
      {/* Back Wall */}
      <Plane
        args={[40, 12]}
        position={[0, 6, -20]}
        receiveShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </Plane>

      {/* Left Wall */}
      <Plane
        args={[40, 12]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-20, 6, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </Plane>

      {/* Right Wall */}
      <Plane
        args={[40, 12]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[20, 6, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </Plane>

      {/* Ceiling */}
      <Plane
        args={[40, 40]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 12, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </Plane>

      {/* Gallery Pedestals */}
      <RoundedBox
        args={[2, 1.5, 2]}
        radius={0.1}
        smoothness={4}
        position={[-8, 0.75, -5]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial color="#f5f5f5" />
      </RoundedBox>

      <RoundedBox
        args={[2, 1.2, 2]}
        radius={0.1}
        smoothness={4}
        position={[8, 0.6, -5]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial color="#f5f5f5" />
      </RoundedBox>

      <RoundedBox
        args={[2, 1.8, 2]}
        radius={0.1}
        smoothness={4}
        position={[0, 0.9, 8]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial color="#f5f5f5" />
      </RoundedBox>

      {/* Gallery Benches */}
      <RoundedBox
        args={[4, 0.4, 1]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.2, 0]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial color="#8b4513" />
      </RoundedBox>

      {/* Track Lighting Rails */}
      <Box
        args={[30, 0.1, 0.2]}
        position={[0, 11, -10]}
        castShadow
      >
        <meshLambertMaterial color="#333333" />
      </Box>

      <Box
        args={[30, 0.1, 0.2]}
        position={[0, 11, 0]}
        castShadow
      >
        <meshLambertMaterial color="#333333" />
      </Box>

      <Box
        args={[30, 0.1, 0.2]}
        position={[0, 11, 10]}
        castShadow
      >
        <meshLambertMaterial color="#333333" />
      </Box>

      {/* Floating Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.4}
        />
      </points>

      {/* Ambient Gallery Atmosphere */}
      <mesh position={[0, 6, 0]}>
        <sphereGeometry args={[25, 32, 32]} />
        <meshBasicMaterial 
          color="#f59e0b" 
          transparent 
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Gallery Information Plaques */}
      <RoundedBox
        args={[1.5, 0.8, 0.05]}
        radius={0.02}
        smoothness={4}
        position={[-8, 2.5, -4]}
        castShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </RoundedBox>

      <RoundedBox
        args={[1.5, 0.8, 0.05]}
        radius={0.02}
        smoothness={4}
        position={[8, 2.3, -4]}
        castShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </RoundedBox>
    </group>
  );
};