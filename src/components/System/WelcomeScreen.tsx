import React from 'react';
import { motion } from 'framer-motion';
import { useMusicStore } from '../../stores/musicStore';

export const WelcomeScreen: React.FC = () => {
  const { setShowWelcome, setLoading } = useMusicStore();

  const handleStart = () => {
    setShowWelcome(false);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-green-400 p-8 max-w-2xl text-center"
      >
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-yellow-400 font-display"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            VIRTUOSO.AI
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg"
          >
            AI-Powered Music Generation Terminal
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4 text-sm"
          >
            <p className="text-yellow-300">
              Import your music • Select instrument/group • Generate AI solos
            </p>
            <p className="text-gray-400">
              Compatible with WAV, MP3, FLAC audio formats
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="pt-4"
          >
            <p className="mb-4">
              Initialize music generation system{' '}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-green-400 text-black"
              >
                █
              </motion.span>
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#22c55e' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="border border-green-400 px-8 py-3 bg-transparent text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 font-bold tracking-wider"
            >
              [INITIALIZE SYSTEM]
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};