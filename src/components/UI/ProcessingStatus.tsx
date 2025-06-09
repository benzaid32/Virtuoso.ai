import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Brain, Waveform, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';

const processingSteps = [
  { id: 'analyzing', name: 'Analyzing Audio', icon: Waveform, description: 'Extracting audio features and patterns' },
  { id: 'generating', name: 'AI Generation', icon: Brain, description: 'Creating new instrumental performance' },
  { id: 'processing', name: 'Post-Processing', icon: Loader2, description: 'Applying final audio mastering' },
];

export const ProcessingStatus: React.FC = () => {
  const { 
    processingState, 
    processingProgress, 
    setProcessingProgress,
    selectedInstrument,
    setProcessingState 
  } = useAppStore();

  useEffect(() => {
    if (processingState === 'analyzing') {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 30) {
            clearInterval(interval);
            setTimeout(() => setProcessingState('generating'), 500);
            return 30;
          }
          return prev + Math.random() * 3;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }

    if (processingState === 'generating') {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            setTimeout(() => setProcessingState('completed'), 1000);
            return 90;
          }
          return prev + Math.random() * 2;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }

    if (processingState === 'completed') {
      setProcessingProgress(100);
    }
  }, [processingState, setProcessingProgress, setProcessingState]);

  if (processingState === 'idle' || processingState === 'uploading') {
    return null;
  }

  const getCurrentStep = () => {
    if (processingState === 'analyzing') return 0;
    if (processingState === 'generating') return 1;
    return 2;
  };

  const currentStep = getCurrentStep();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
      >
        {processingState === 'completed' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Generation Complete!</h3>
            <p className="text-neural-300 mb-6">
              Your {selectedInstrument} performance has been successfully generated
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-green-400">
              <CheckCircle className="w-4 h-4" />
              <span>Ready for playback and download</span>
            </div>
          </motion.div>
        ) : processingState === 'error' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">Processing Error</h3>
            <p className="text-neural-300 mb-6">
              Something went wrong during generation. Please try again.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Generating {selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)} Performance
              </h3>
              <p className="text-neural-300">
                AI is analyzing your audio and creating the instrumental version
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Progress</span>
                <span className="text-sm font-medium text-primary-400">
                  {Math.round(processingProgress)}%
                </span>
              </div>
              
              <div className="w-full bg-neural-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${processingProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Processing Steps */}
            <div className="space-y-4">
              {processingSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'bg-primary-500/20 border border-primary-500/50' 
                        : isCompleted 
                          ? 'bg-green-500/10 border border-green-500/30'
                          : 'bg-white/5 border border-neutral-600'
                      }
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive 
                        ? 'bg-primary-500 text-white' 
                        : isCompleted 
                          ? 'bg-green-500 text-white'
                          : 'bg-neural-700 text-neural-400'
                      }
                    `}>
                      {isActive ? (
                        <Icon className="w-6 h-6 animate-spin" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold transition-colors duration-300 ${
                        isActive ? 'text-primary-300' : isCompleted ? 'text-green-300' : 'text-white'
                      }`}>
                        {step.name}
                      </h4>
                      <p className="text-sm text-neural-400">{step.description}</p>
                    </div>
                    
                    {isActive && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Estimated Time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center text-sm text-neural-400"
            >
              Estimated time remaining: {Math.max(1, Math.ceil((100 - processingProgress) / 10))} minutes
            </motion.div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};