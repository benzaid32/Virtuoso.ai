import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const DeskEnvironment: React.FC = () => {
  const deskRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create floating particles
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 10 + 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    colors[i * 3] = 0.2 + Math.random() * 0.3;     // R
    colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G  
    colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Main Desk Surface */}
      <Box
        ref={deskRef}
        args={[12, 0.2, 8]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#2d1810" />
      </Box>
      
      {/* Desk Legs */}
      <Box args={[0.3, 2, 0.3]} position={[-5.5, -1, -3.5]} castShadow>
        <meshLambertMaterial color="#1a0e08" />
      </Box>
      <Box args={[0.3, 2, 0.3]} position={[5.5, -1, -3.5]} castShadow>
        <meshLambertMaterial color="#1a0e08" />
      </Box>
      <Box args={[0.3, 2, 0.3]} position={[-5.5, -1, 3.5]} castShadow>
        <meshLambertMaterial color="#1a0e08" />
      </Box>
      <Box args={[0.3, 2, 0.3]} position={[5.5, -1, 3.5]} castShadow>
        <meshLambertMaterial color="#1a0e08" />
      </Box>

      {/* Floor */}
      <Plane
        args={[50, 50]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.1, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#0f172a" />
      </Plane>

      {/* Floating Particles */}
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
          size={0.05}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.6}
        />
      </points>

      {/* Ambient Glow */}
      <mesh position={[0, 5, 0]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial 
          color="#1e40af" 
          transparent 
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};