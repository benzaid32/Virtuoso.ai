import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppHeader } from './components/Layout/AppHeader';
import { ResponsiveGrid } from './components/Layout/ResponsiveGrid';
import { Scene3D } from './components/3D/Scene3D';
import { FileUpload } from './components/UI/FileUpload';
import { InstrumentSelector } from './components/UI/InstrumentSelector';
import { ProcessingStatus } from './components/UI/ProcessingStatus';
import { AudioPlayer } from './components/UI/AudioPlayer';
import { useAppStore } from './stores/appStore';

function App() {
  const { 
    processingState, 
    uploadedFile, 
    selectedInstrument, 
    selectedMode,
    setGeneratedResult 
  } = useAppStore();

  // Simulate AI generation completion
  useEffect(() => {
    if (processingState === 'completed' && uploadedFile) {
      // Create mock generated result
      const result = {
        originalUrl: uploadedFile.url,
        generatedUrl: uploadedFile.url, // In real app, this would be the generated audio
        instrument: selectedInstrument,
        mode: selectedMode,
        timestamp: Date.now()
      };
      setGeneratedResult(result);
    }
  }, [processingState, uploadedFile, selectedInstrument, selectedMode, setGeneratedResult]);

  const showProcessingOrResults = processingState !== 'idle' && processingState !== 'uploading';

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-900 via-neural-800 to-neural-900 text-white overflow-hidden">
      <AppHeader />
      
      <main className="container mx-auto px-6 py-8 h-[calc(100vh-88px)]">
        <ResponsiveGrid>
          {/* Left Panel - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-black/20 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm"
          >
            <Scene3D />
          </motion.div>

          {/* Right Panel - Controls & Status */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6 h-full"
          >
            <AnimatePresence mode="wait">
              {!uploadedFile || processingState === 'idle' ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col gap-6"
                >
                  <FileUpload />
                  {uploadedFile && <InstrumentSelector />}
                </motion.div>
              ) : showProcessingOrResults ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col gap-6"
                >
                  <ProcessingStatus />
                  {processingState === 'completed' && <AudioPlayer />}
                </motion.div>
              ) : (
                <InstrumentSelector />
              )}
            </AnimatePresence>

            {/* Generation Button */}
            {uploadedFile && processingState === 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => useAppStore.getState().setProcessingState('analyzing')}
                  className="w-full max-w-md bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 
                             text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300
                             shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Generate {selectedInstrument.charAt(0).toUpperCase() + selectedInstrument.slice(1)} Performance
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </ResponsiveGrid>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-float" />
      </div>
    </div>
  );
}

export default App;