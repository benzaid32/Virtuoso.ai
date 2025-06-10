import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProcessingStatus } from './ProcessingStatus';
import { useAppStore } from '../../stores/appStore';

export const ProcessingScreen: React.FC = () => {
  const { processingStatus, setCameraMode } = useAppStore();

  useEffect(() => {
    // Switch to close-up camera view during processing
    setCameraMode('close-up');
  }, [setCameraMode]);

  if (!processingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-400">Initializing AI processing...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Music Generation
          </h1>
          <p className="text-xl text-gray-400">
            Our AI is analyzing your audio and creating something amazing
          </p>
        </motion.div>

        {/* Processing Status */}
        <ProcessingStatus status={processingStatus} />

        {/* Background Animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 10,
              }}
              animate={{
                y: -10,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};