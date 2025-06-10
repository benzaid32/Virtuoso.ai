import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../stores/appStore';
import { UploadScreen } from '../UI/UploadScreen';
import { ProcessingScreen } from '../UI/ProcessingScreen';
import { ResultsScreen } from '../UI/ResultsScreen';

export const MainInterface: React.FC = () => {
  const currentScreen = useAppStore((state) => state.currentScreen);

  const screenVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  return (
    <div className="fixed inset-0 pt-20 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'upload' && (
          <motion.div
            key="upload"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <UploadScreen />
          </motion.div>
        )}

        {currentScreen === 'processing' && (
          <motion.div
            key="processing"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ProcessingScreen />
          </motion.div>
        )}

        {currentScreen === 'results' && (
          <motion.div
            key="results"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ResultsScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};