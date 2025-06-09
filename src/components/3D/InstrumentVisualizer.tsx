import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppStore, InstrumentType } from '../../stores/appStore';
import { Box, Cylinder, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const InstrumentModel: React.FC<{ instrument: InstrumentType; position: [number, number, number] }> = ({ 
  instrument, 
  position 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isPlaying = useAppStore((state) => state.isPlaying);

  useFrame((state) => {
    if (meshRef.current && isPlaying) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const getInstrumentGeometry = () => {
    switch (instrument) {
      case 'saxophone':
        return (
          <group ref={meshRef} position={position}>
            <Cylinder args={[0.1, 0.15, 1.5]} position={[0, 0, 0]} castShadow>
              <meshLambertMaterial color="#ffd700" />
            </Cylinder>
            <Sphere args={[0.2]} position={[0, -0.8, 0]} castShadow>
              <meshLambertMaterial color="#ffed65" />
            </Sphere>
            <Cylinder args={[0.05, 0.05, 0.5]} position={[0, 0.5, 0.3]} rotation={[Math.PI / 4, 0, 0]} castShadow>
              <meshLambertMaterial color="#ffd700" />
            </Cylinder>
          </group>
        );
      
      case 'harmonica':
        return (
          <group ref={meshRef} position={position}>
            <Box args={[1.2, 0.3, 0.2]} castShadow>
              <meshLambertMaterial color="#c0392b" />
            </Box>
            <Box args={[1.0, 0.1, 0.25]} position={[0, 0.2, 0]} castShadow>
              <meshLambertMaterial color="#silver" />
            </Box>
          </group>
        );
      
      case 'steelpan':
        return (
          <group ref={meshRef} position={position}>
            <Cylinder args={[0.8, 0.6, 0.2]} castShadow>
              <meshLambertMaterial color="#708090" />
            </Cylinder>
            {[...Array(8)].map((_, i) => (
              <Cylinder 
                key={i}
                args={[0.08, 0.08, 0.05]} 
                position={[
                  Math.cos(i * Math.PI / 4) * 0.4,
                  0.15,
                  Math.sin(i * Math.PI / 4) * 0.4
                ]} 
                castShadow
              >
                <meshLambertMaterial color="#a0a0a0" />
              </Cylinder>
            ))}
          </group>
        );
      
      case 'guitar':
        return (
          <group ref={meshRef} position={position}>
            <Box args={[0.15, 2, 0.05]} position={[0, 0, 0]} castShadow>
              <meshLambertMaterial color="#8b4513" />
            </Box>
            <Torus args={[0.4, 0.05, 8, 24]} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <meshLambertMaterial color="#654321" />
            </Torus>
            {[...Array(6)].map((_, i) => (
              <Cylinder 
                key={i}
                args={[0.005, 0.005, 1.8]} 
                position={[-0.05 + i * 0.02, 0, 0.03]} 
                castShadow
              >
                <meshLambertMaterial color="#silver" />
              </Cylinder>
            ))}
          </group>
        );
      
      case 'orchestra':
        return (
          <group ref={meshRef} position={position}>
            {/* Multiple instruments grouped */}
            <Cylinder args={[0.05, 0.05, 0.8]} position={[-0.3, 0, 0]} castShadow>
              <meshLambertMaterial color="#8b4513" />
            </Cylinder>
            <Cylinder args={[0.08, 0.1, 1]} position={[0, 0, 0]} castShadow>
              <meshLambertMaterial color="#ffd700" />
            </Cylinder>
            <Cylinder args={[0.06, 0.06, 0.6]} position={[0.3, 0, 0]} castShadow>
              <meshLambertMaterial color="#silver" />
            </Cylinder>
          </group>
        );
      
      case 'soul':
        return (
          <group ref={meshRef} position={position}>
            <Sphere args={[0.3]} position={[0, 0.5, 0]} castShadow>
              <meshLambertMaterial color="#ff6b6b" />
            </Sphere>
            <Cylinder args={[0.1, 0.1, 0.8]} position={[0, 0, 0]} castShadow>
              <meshLambertMaterial color="#4ecdc4" />
            </Cylinder>
            <Torus args={[0.2, 0.05, 8, 16]} position={[0, 0.8, 0]} castShadow>
              <meshLambertMaterial color="#ffe66d" />
            </Torus>
          </group>
        );
      
      default:
        return null;
    }
  };

  return getInstrumentGeometry();
};

export const InstrumentVisualizer: React.FC = () => {
  const selectedInstrument = useAppStore((state) => state.selectedInstrument);
  const selectedMode = useAppStore((state) => state.selectedMode);
  const processingState = useAppStore((state) => state.processingState);

  if (processingState === 'idle' || processingState === 'uploading') {
    return null;
  }

  return (
    <group position={[3, 2, 0]}>
      {selectedMode === 'solo' ? (
        <InstrumentModel 
          instrument={selectedInstrument} 
          position={[0, 0, 0]} 
        />
      ) : (
        // Group mode - show multiple instruments
        <>
          <InstrumentModel 
            instrument={selectedInstrument} 
            position={[0, 0, 0]} 
          />
          <InstrumentModel 
            instrument="guitar" 
            position={[-1.5, 0, -1]} 
          />
          <InstrumentModel 
            instrument="saxophone" 
            position={[1.5, 0, -1]} 
          />
        </>
      )}

      {/* Audio visualization waves */}
      {processingState === 'completed' && (
        <group position={[0, -1, 0]}>
          {[...Array(10)].map((_, i) => (
            <Box
              key={i}
              args={[0.1, Math.random() * 2 + 0.5, 0.1]}
              position={[-2 + i * 0.4, 0, 0]}
              castShadow
            >
              <meshLambertMaterial color="#3b82f6" />
            </Box>
          ))}
        </group>
      )}
    </group>
  );
};