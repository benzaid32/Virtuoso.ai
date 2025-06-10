import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Cylinder, Plane, Sphere } from '@react-three/drei';
import { useMusicStore } from '../../stores/musicStore';
import * as THREE from 'three';

export const MusicStudio: React.FC = () => {
  const audioVisualizerRef = useRef<THREE.Group>(null);
  const speakerRef = useRef<THREE.Group>(null);
  const { isPlaying, currentTrack, selectedInstrument, generationMode } = useMusicStore();

  useFrame((state) => {
    // Audio visualizer animation
    if (audioVisualizerRef.current && isPlaying) {
      audioVisualizerRef.current.children.forEach((bar, index) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 5 + index * 0.5) * 0.5;
        bar.scale.y = scale;
      });
    }

    // Speaker cone movement
    if (speakerRef.current && isPlaying) {
      speakerRef.current.children.forEach(speaker => {
        if (speaker instanceof THREE.Mesh) {
          speaker.position.z = Math.sin(state.clock.elapsedTime * 10) * 0.02;
        }
      });
    }
  });

  return (
    <group>
      {/* Studio Desk */}
      <RoundedBox
        args={[10, 0.3, 5]}
        radius={0.05}
        smoothness={4}
        position={[0, -0.15, 0]}
        castShadow
        receiveShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </RoundedBox>

      {/* Main Computer/Monitor */}
      <group position={[0, 1.2, -1.5]}>
        {/* Monitor Base */}
        <Cylinder
          args={[0.8, 0.6, 0.3]}
          position={[0, -0.7, 0]}
          castShadow
        >
          <meshLambertMaterial color="#1a1a1a" />
        </Cylinder>

        {/* Monitor Body */}
        <RoundedBox
          args={[4, 3, 1.5]}
          radius={0.1}
          smoothness={4}
          position={[0, 0, 0]}
          castShadow
        >
          <meshLambertMaterial color="#0a0a0a" />
        </RoundedBox>

        {/* Monitor Screen */}
        <RoundedBox
          args={[3.6, 2.4, 0.1]}
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
          args={[3.8, 2.6, 0.05]}
          radius={0.05}
          smoothness={4}
          position={[0, 0, 0.85]}
        >
          <meshBasicMaterial 
            color="#22c55e" 
            transparent 
            opacity={0.3}
          />
        </RoundedBox>
      </group>

      {/* Audio Interface/Mixer */}
      <group position={[3, 0.3, 0.5]}>
        <RoundedBox
          args={[2, 0.4, 1.5]}
          radius={0.05}
          smoothness={4}
          castShadow
        >
          <meshLambertMaterial color="#1a1a1a" />
        </RoundedBox>

        {/* Mixer Knobs */}
        {[...Array(8)].map((_, i) => (
          <Cylinder
            key={i}
            args={[0.08, 0.08, 0.1]}
            position={[
              -0.6 + (i % 4) * 0.4,
              0.25,
              -0.3 + Math.floor(i / 4) * 0.6
            ]}
            castShadow
          >
            <meshLambertMaterial color="#d4af37" />
          </Cylinder>
        ))}
      </group>

      {/* Studio Monitors/Speakers */}
      <group ref={speakerRef}>
        {/* Left Speaker */}
        <group position={[-4, 1.5, -1]}>
          <RoundedBox
            args={[1, 1.8, 1]}
            radius={0.05}
            smoothness={4}
            castShadow
          >
            <meshLambertMaterial color="#1a1a1a" />
          </RoundedBox>
          
          {/* Speaker Cone */}
          <Cylinder
            args={[0.3, 0.25, 0.1]}
            position={[0, 0.3, 0.55]}
            castShadow
          >
            <meshLambertMaterial color="#333333" />
          </Cylinder>
          
          {/* Tweeter */}
          <Cylinder
            args={[0.1, 0.08, 0.05]}
            position={[0, -0.3, 0.55]}
            castShadow
          >
            <meshLambertMaterial color="#d4af37" />
          </Cylinder>
        </group>

        {/* Right Speaker */}
        <group position={[4, 1.5, -1]}>
          <RoundedBox
            args={[1, 1.8, 1]}
            radius={0.05}
            smoothness={4}
            castShadow
          >
            <meshLambertMaterial color="#1a1a1a" />
          </RoundedBox>
          
          <Cylinder
            args={[0.3, 0.25, 0.1]}
            position={[0, 0.3, 0.55]}
            castShadow
          >
            <meshLambertMaterial color="#333333" />
          </Cylinder>
          
          <Cylinder
            args={[0.1, 0.08, 0.05]}
            position={[0, -0.3, 0.55]}
            castShadow
          >
            <meshLambertMaterial color="#d4af37" />
          </Cylinder>
        </group>
      </group>

      {/* Audio Visualizer Bars */}
      <group ref={audioVisualizerRef} position={[-3, 0.5, 1]}>
        {[...Array(16)].map((_, i) => (
          <Box
            key={i}
            args={[0.1, 0.5, 0.1]}
            position={[i * 0.15 - 1.2, 0.25, 0]}
            castShadow
          >
            <meshBasicMaterial 
              color={isPlaying ? '#22c55e' : '#333333'} 
              transparent 
              opacity={isPlaying ? 0.8 : 0.3}
            />
          </Box>
        ))}
      </group>

      {/* Instrument Display (changes based on selection) */}
      <group position={[0, 0.5, 2]}>
        {generationMode === 'solo' && selectedInstrument === 'saxophone' && (
          <group>
            {/* Saxophone representation */}
            <Cylinder
              args={[0.1, 0.15, 1.5]}
              rotation={[0, 0, Math.PI / 6]}
              castShadow
            >
              <meshLambertMaterial color="#d4af37" />
            </Cylinder>
          </group>
        )}

        {generationMode === 'solo' && selectedInstrument === 'electric-guitar' && (
          <group>
            {/* Guitar representation */}
            <RoundedBox
              args={[0.3, 1.8, 0.1]}
              radius={0.05}
              castShadow
            >
              <meshLambertMaterial color="#8b4513" />
            </RoundedBox>
          </group>
        )}

        {generationMode === 'group' && (
          <group>
            {/* Orchestra/Band representation */}
            {[...Array(5)].map((_, i) => (
              <Sphere
                key={i}
                args={[0.1]}
                position={[
                  Math.sin(i * Math.PI * 0.4) * 1,
                  0.5,
                  Math.cos(i * Math.PI * 0.4) * 1
                ]}
                castShadow
              >
                <meshBasicMaterial color="#d4af37" transparent opacity={0.6} />
              </Sphere>
            ))}
          </group>
        )}
      </group>

      {/* Studio Floor */}
      <Plane
        args={[20, 20]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#0a0a0a" />
      </Plane>

      {/* Studio Walls */}
      <Plane
        args={[20, 10]}
        position={[0, 3, -10]}
        receiveShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </Plane>

      <Plane
        args={[20, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 3, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </Plane>

      <Plane
        args={[20, 10]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[10, 3, 0]}
        receiveShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </Plane>

      {/* Acoustic Foam Panels */}
      {[...Array(12)].map((_, i) => (
        <RoundedBox
          key={i}
          args={[0.8, 0.8, 0.2]}
          radius={0.02}
          position={[
            -9.8,
            1 + (i % 3) * 1.2,
            -4 + Math.floor(i / 3) * 2
          ]}
          castShadow
        >
          <meshLambertMaterial color="#2a2a2a" />
        </RoundedBox>
      ))}
    </group>
  );
};