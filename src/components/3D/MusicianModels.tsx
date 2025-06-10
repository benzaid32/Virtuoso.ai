import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { useAppStore } from '../../stores/appStore';
import * as THREE from 'three';

export const MusicianModels: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { generationMode, selectedInstrument, selectedEnsemble, isPlaying } = useAppStore();

  useFrame((state) => {
    if (groupRef.current && isPlaying) {
      // Animate musicians when playing
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  const renderSoloInstrument = () => {
    switch (selectedInstrument) {
      case 'saxophone':
        return (
          <group position={[0, 1, 2]}>
            {/* Saxophone Body */}
            <Cylinder
              args={[0.08, 0.12, 1.2]}
              rotation={[0, 0, Math.PI / 6]}
              castShadow
            >
              <meshLambertMaterial color="#d4af37" />
            </Cylinder>
            
            {/* Saxophone Bell */}
            <Cylinder
              args={[0.2, 0.12, 0.3]}
              position={[0.3, -0.5, 0]}
              rotation={[0, 0, Math.PI / 6]}
              castShadow
            >
              <meshLambertMaterial color="#d4af37" />
            </Cylinder>
          </group>
        );

      case 'harmonica':
        return (
          <group position={[0, 1.2, 2]}>
            <Box
              args={[0.8, 0.15, 0.08]}
              castShadow
            >
              <meshLambertMaterial color="#c0c0c0" />
            </Box>
            
            {/* Harmonica Holes */}
            {[...Array(10)].map((_, i) => (
              <Box
                key={i}
                args={[0.06, 0.08, 0.02]}
                position={[-0.35 + i * 0.08, 0, 0.05]}
                castShadow
              >
                <meshLambertMaterial color="#1a1a1a" />
              </Box>
            ))}
          </group>
        );

      case 'steelpan':
        return (
          <group position={[0, 1, 2]}>
            <Cylinder
              args={[0.8, 0.7, 0.2]}
              castShadow
            >
              <meshLambertMaterial color="#c0c0c0" />
            </Cylinder>
            
            {/* Steel Pan Sections */}
            {[...Array(8)].map((_, i) => (
              <Cylinder
                key={i}
                args={[0.1, 0.08, 0.05]}
                position={[
                  Math.cos(i * Math.PI / 4) * 0.4,
                  0.15,
                  Math.sin(i * Math.PI / 4) * 0.4
                ]}
                castShadow
              >
                <meshLambertMaterial color="#8B4513" />
              </Cylinder>
            ))}
          </group>
        );

      case 'electric-guitar':
        return (
          <group position={[0, 1, 2]}>
            {/* Guitar Body */}
            <Box
              args={[0.4, 1.2, 0.08]}
              castShadow
            >
              <meshLambertMaterial color="#8B4513" />
            </Box>
            
            {/* Guitar Neck */}
            <Box
              args={[0.08, 0.8, 0.04]}
              position={[0, 1, 0]}
              castShadow
            >
              <meshLambertMaterial color="#654321" />
            </Box>
            
            {/* Strings */}
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                args={[0.002, 2, 0.002]}
                position={[-0.1 + i * 0.04, 0.4, 0.05]}
                castShadow
              >
                <meshLambertMaterial color="#c0c0c0" />
              </Box>
            ))}
          </group>
        );

      default:
        return null;
    }
  };

  const renderEnsemble = () => {
    switch (selectedEnsemble) {
      case 'orchestra':
        return (
          <group position={[0, 1, 2]}>
            {/* Orchestra Arrangement */}
            {[...Array(12)].map((_, i) => (
              <group
                key={i}
                position={[
                  Math.cos(i * Math.PI / 6) * 2,
                  0,
                  Math.sin(i * Math.PI / 6) * 2
                ]}
              >
                <Sphere
                  args={[0.1]}
                  castShadow
                >
                  <meshLambertMaterial color="#d4af37" />
                </Sphere>
                
                {/* Instrument representation */}
                <Box
                  args={[0.05, 0.3, 0.02]}
                  position={[0, 0.2, 0]}
                  castShadow
                >
                  <meshLambertMaterial color="#8B4513" />
                </Box>
              </group>
            ))}
          </group>
        );

      case '60s-soul-band':
        return (
          <group position={[0, 1, 2]}>
            {/* Bass */}
            <group position={[-1.5, 0, 0]}>
              <Box args={[0.15, 1.5, 0.08]} castShadow>
                <meshLambertMaterial color="#8B4513" />
              </Box>
            </group>
            
            {/* Drums */}
            <group position={[0, 0, -1]}>
              <Cylinder args={[0.4, 0.3, 0.6]} castShadow>
                <meshLambertMaterial color="#1a1a1a" />
              </Cylinder>
            </group>
            
            {/* Keyboard */}
            <group position={[1.5, 0, 0]}>
              <Box args={[1, 0.1, 0.4]} castShadow>
                <meshLambertMaterial color="#ffffff" />
              </Box>
            </group>
            
            {/* Horns */}
            <group position={[0, 0, 1]}>
              <Cylinder args={[0.05, 0.08, 0.8]} rotation={[0, 0, Math.PI / 4]} castShadow>
                <meshLambertMaterial color="#d4af37" />
              </Cylinder>
            </group>
          </group>
        );

      default:
        return null;
    }
  };

  return (
    <group ref={groupRef}>
      {generationMode === 'solo' ? renderSoloInstrument() : renderEnsemble()}
    </group>
  );
};