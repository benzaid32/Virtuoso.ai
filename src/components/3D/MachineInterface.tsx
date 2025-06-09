import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Text, Cylinder } from '@react-three/drei';
import { useAppStore } from '../../stores/appStore';
import * as THREE from 'three';

export const MachineInterface: React.FC = () => {
  const processingState = useAppStore((state) => state.processingState);
  const processingProgress = useAppStore((state) => state.processingProgress);
  const selectedInstrument = useAppStore((state) => state.selectedInstrument);
  
  const screenRef = useRef<THREE.Mesh>(null);
  const statusLightRef = useRef<THREE.Mesh>(null);
  const progressBarRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Animate screen glow
    if (screenRef.current) {
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      (screenRef.current.material as THREE.MeshBasicMaterial).opacity = intensity;
    }

    // Animate status light
    if (statusLightRef.current) {
      const isActive = processingState !== 'idle';
      const color = isActive ? '#00ff00' : '#ff6b00';
      (statusLightRef.current.material as THREE.MeshBasicMaterial).color.setHex(
        parseInt(color.replace('#', '0x'))
      );
    }

    // Animate progress bar
    if (progressBarRef.current && processingState === 'generating') {
      progressBarRef.current.scale.x = processingProgress / 100;
    }
  });

  return (
    <group position={[0, 1.5, -2]}>
      {/* Main Console Base */}
      <RoundedBox
        args={[8, 1.5, 3]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0]}
        castShadow
      >
        <meshLambertMaterial color="#2a2a2a" />
      </RoundedBox>

      {/* Control Panel */}
      <RoundedBox
        args={[7, 0.1, 2.5]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.8, 0]}
        castShadow
      >
        <meshLambertMaterial color="#1a1a1a" />
      </RoundedBox>

      {/* Main Screen */}
      <RoundedBox
        args={[4, 2, 0.1]}
        radius={0.05}
        smoothness={4}
        position={[0, 1.8, 0.5]}
        castShadow
      >
        <meshLambertMaterial color="#000000" />
      </RoundedBox>

      {/* Screen Glow */}
      <mesh ref={screenRef} position={[0, 1.8, 0.51]}>
        <planeGeometry args={[3.8, 1.8]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.3}
        />
      </mesh>

      {/* Status Lights */}
      <Cylinder
        ref={statusLightRef}
        args={[0.1, 0.1, 0.05]}
        position={[-3, 1.8, 0.6]}
        castShadow
      >
        <meshBasicMaterial color="#ff6b00" />
      </Cylinder>

      <Cylinder
        args={[0.08, 0.08, 0.05]}
        position={[-2.5, 1.8, 0.6]}
        castShadow
      >
        <meshBasicMaterial color="#3b82f6" />
      </Cylinder>

      <Cylinder
        args={[0.08, 0.08, 0.05]}
        position={[-2, 1.8, 0.6]}
        castShadow
      >
        <meshBasicMaterial color="#10b981" />
      </Cylinder>

      {/* Control Knobs */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <group key={i} position={[x * 1.2, 0.85, 0.8]}>
          <Cylinder
            args={[0.2, 0.2, 0.1]}
            castShadow
          >
            <meshLambertMaterial color="#4a5568" />
          </Cylinder>
          <Cylinder
            args={[0.05, 0.05, 0.12]}
            position={[0.1, 0, 0]}
            castShadow
          >
            <meshLambertMaterial color="#e2e8f0" />
          </Cylinder>
        </group>
      ))}

      {/* Progress Bar */}
      {processingState === 'generating' && (
        <group position={[0, 1.2, 0.6]}>
          <Box args={[3, 0.1, 0.05]} castShadow>
            <meshLambertMaterial color="#1a1a1a" />
          </Box>
          <Box 
            ref={progressBarRef}
            args={[3, 0.08, 0.06]} 
            position={[-1.5, 0, 0]}
            castShadow
          >
            <meshBasicMaterial color="#f59e0b" />
          </Box>
        </group>
      )}

      {/* Text Display */}
      <Text
        position={[0, 1.8, 0.52]}
        fontSize={0.2}
        color="#3b82f6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {processingState === 'idle' && 'READY TO GENERATE'}
        {processingState === 'uploading' && 'UPLOADING FILE...'}
        {processingState === 'analyzing' && 'ANALYZING AUDIO...'}
        {processingState === 'generating' && `GENERATING ${selectedInstrument.toUpperCase()}...`}
        {processingState === 'completed' && 'GENERATION COMPLETE'}
        {processingState === 'error' && 'ERROR OCCURRED'}
      </Text>

      {processingState === 'generating' && (
        <Text
          position={[0, 1.4, 0.52]}
          fontSize={0.15}
          color="#f59e0b"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-regular.woff"
        >
          {Math.round(processingProgress)}% COMPLETE
        </Text>
      )}
    </group>
  );
};