import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGalleryStore } from '../../stores/galleryStore';
import { Box, Cylinder, Sphere, Torus, RoundedBox, Cone } from '@react-three/drei';
import * as THREE from 'three';

const InstallationModel: React.FC<{ 
  installationType: string; 
  position: [number, number, number];
  scale?: number;
}> = ({ installationType, position, scale = 1 }) => {
  const meshRef = useRef<THREE.Group>(null);
  const isSlideshow = useGalleryStore((state) => state.isSlideshow);

  useFrame((state) => {
    if (meshRef.current) {
      if (isSlideshow) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      }
    }
  });

  const getInstallation = () => {
    switch (installationType) {
      case '3d-sculpture':
        return (
          <group ref={meshRef} position={position} scale={scale}>
            {/* Abstract Sculpture */}
            <Sphere args={[0.8]} position={[0, 1.5, 0]} castShadow>
              <meshLambertMaterial color="#cd7f32" />
            </Sphere>
            <Cylinder args={[0.3, 0.5, 2]} position={[0, 0.5, 0]} castShadow>
              <meshLambertMaterial color="#8b4513" />
            </Cylinder>
            <Torus args={[0.6, 0.1, 8, 16]} position={[0, 2.2, 0]} rotation={[Math.PI / 4, 0, 0]} castShadow>
              <meshLambertMaterial color="#ffd700" />
            </Torus>
          </group>
        );
      
      case 'floating-frames':
        return (
          <group ref={meshRef} position={position} scale={scale}>
            {/* Floating Picture Frames */}
            {[...Array(5)].map((_, i) => (
              <RoundedBox
                key={i}
                args={[1.2, 0.8, 0.1]}
                radius={0.02}
                position={[
                  Math.sin(i * Math.PI * 0.4) * 2,
                  1.5 + Math.sin(i * 0.5) * 0.5,
                  Math.cos(i * Math.PI * 0.4) * 2
                ]}
                rotation={[0, i * Math.PI * 0.4, 0]}
                castShadow
              >
                <meshLambertMaterial color="#8b4513" />
              </RoundedBox>
            ))}
          </group>
        );
      
      case 'light-installation':
        return (
          <group ref={meshRef} position={position} scale={scale}>
            {/* Light Beams Installation */}
            {[...Array(8)].map((_, i) => (
              <Cylinder
                key={i}
                args={[0.05, 0.05, 3]}
                position={[
                  Math.cos(i * Math.PI / 4) * 1.5,
                  1.5,
                  Math.sin(i * Math.PI / 4) * 1.5
                ]}
                castShadow
              >
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
              </Cylinder>
            ))}
            <Sphere args={[0.3]} position={[0, 1.5, 0]} castShadow>
              <meshBasicMaterial color="#ffffff" />
            </Sphere>
          </group>
        );
      
      case 'geometric-forms':
        return (
          <group ref={meshRef} position={position} scale={scale}>
            {/* Geometric Shapes */}
            <Box args={[1, 1, 1]} position={[-1, 1, 0]} castShadow>
              <meshLambertMaterial color="#ff6b6b" />
            </Box>
            <Sphere args={[0.6]} position={[0, 1.5, 0]} castShadow>
              <meshLambertMaterial color="#4ecdc4" />
            </Sphere>
            <Cone args={[0.5, 1.5]} position={[1, 0.75, 0]} castShadow>
              <meshLambertMaterial color="#ffe66d" />
            </Cone>
            <Torus args={[0.4, 0.15, 8, 16]} position={[0, 2.5, 0]} castShadow>
              <meshLambertMaterial color="#a8e6cf" />
            </Torus>
          </group>
        );
      
      case 'particle-system':
        return (
          <group ref={meshRef} position={position} scale={scale}>
            {/* Particle Cloud */}
            {[...Array(20)].map((_, i) => (
              <Sphere
                key={i}
                args={[0.05 + Math.random() * 0.1]}
                position={[
                  (Math.random() - 0.5) * 4,
                  Math.random() * 3 + 0.5,
                  (Math.random() - 0.5) * 4
                ]}
                castShadow
              >
                <meshBasicMaterial 
                  color={new THREE.Color().setHSL(Math.random(), 0.7, 0.6)} 
                  transparent 
                  opacity={0.8}
                />
              </Sphere>
            ))}
          </group>
        );
      
      case 'holographic':
        return (
          <group ref={meshRef} position={position} scale={scale}>
            {/* Holographic Display */}
            <RoundedBox args={[2, 0.1, 2]} radius={0.05} position={[0, 0.05, 0]} castShadow>
              <meshLambertMaterial color="#1a1a1a" />
            </RoundedBox>
            <Cylinder args={[0.8, 0.8, 0.05]} position={[0, 0.12, 0]} castShadow>
              <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
            </Cylinder>
            {[...Array(3)].map((_, i) => (
              <Torus
                key={i}
                args={[0.5 + i * 0.3, 0.02, 8, 32]}
                position={[0, 1 + i * 0.5, 0]}
                castShadow
              >
                <meshBasicMaterial color="#00ffff" transparent opacity={0.5 - i * 0.1} />
              </Torus>
            ))}
          </group>
        );
      
      default:
        return null;
    }
  };

  return getInstallation();
};

export const ArtInstallation: React.FC = () => {
  const currentArtwork = useGalleryStore((state) => state.currentArtwork);

  if (!currentArtwork) return null;

  return (
    <group>
      {/* Main Installation */}
      <InstallationModel 
        installationType={currentArtwork.installationType}
        position={[0, 0, -5]}
        scale={1.2}
      />

      {/* Secondary Installations */}
      <InstallationModel 
        installationType="floating-frames"
        position={[-8, 0, -5]}
        scale={0.8}
      />

      <InstallationModel 
        installationType="light-installation"
        position={[8, 0, -5]}
        scale={0.8}
      />

      <InstallationModel 
        installationType="geometric-forms"
        position={[0, 0, 8]}
        scale={0.6}
      />

      {/* Ambient Art Elements */}
      {[...Array(6)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.1]}
          position={[
            Math.sin(i * Math.PI / 3) * 12,
            2 + Math.sin(i) * 0.5,
            Math.cos(i * Math.PI / 3) * 12
          ]}
          castShadow
        >
          <meshBasicMaterial 
            color="#f59e0b" 
            transparent 
            opacity={0.4}
          />
        </Sphere>
      ))}
    </group>
  );
};