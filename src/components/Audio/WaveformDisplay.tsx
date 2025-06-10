import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WaveformDisplayProps {
  waveformData: number[];
  isPlaying?: boolean;
  color?: string;
  height?: number;
  className?: string;
}

export const WaveformDisplay: React.FC<WaveformDisplayProps> = ({
  waveformData,
  isPlaying = false,
  color = '#6366f1',
  height = 80,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height: canvasHeight } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, canvasHeight);

    // Draw waveform
    const barWidth = width / waveformData.length;
    const maxHeight = canvasHeight * 0.8;

    waveformData.forEach((value, index) => {
      const barHeight = value * maxHeight;
      const x = index * barWidth;
      const y = (canvasHeight - barHeight) / 2;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '80');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, barHeight);

      // Add glow effect when playing
      if (isPlaying) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fillRect(x, y, barWidth - 1, barHeight);
        ctx.shadowBlur = 0;
      }
    });
  }, [waveformData, isPlaying, color]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={height}
        className="w-full h-full rounded-lg bg-gray-900/50"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {isPlaying && (
        <motion.div
          className="absolute inset-0 border-2 border-indigo-400 rounded-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};