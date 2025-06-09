import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#3b82f6" wireframe />
    </mesh>
  );
};