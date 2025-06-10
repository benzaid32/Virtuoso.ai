import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FileUpload } from '../Audio/FileUpload';
import { ModeSelector } from './ModeSelector';
import { InstrumentGrid } from './InstrumentGrid';
import { WaveformDisplay } from '../Audio/WaveformDisplay';
import { useAppStore } from '../../stores/appStore';
import { useAudioProcessing } from '../../hooks/useAudioProcessing';
import { useAIGeneration } from '../../hooks/useAIGeneration';
import { formatFileSize, formatDuration } from '../../utils/audioUtils';

export const UploadScreen: React.FC = () => {
  const {
    uploadedFile,
    generationMode,
    selectedInstrument,
    selectedEnsemble,
    setUploadedFile,
    setGenerationMode,
    setSelectedInstrument,
    setSelectedEnsemble,
    setCurrentScreen,
    setProcessingStatus
  } = useAppStore();

  const { processFile, isProcessing } = useAudioProcessing();
  const { generateMusic } = useAIGeneration();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileSelect = async (file: File) => {
    const audioFile = await processFile(file);
    if (audioFile) {
      setUploadedFile(audioFile);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile) return;

    setIsGenerating(true);
    setCurrentScreen('processing');

    const request = {
      audioFileId: uploadedFile.id,
      mode: generationMode,
      instrument: generationMode === 'solo' ? selectedInstrument : undefined,
      ensemble: generationMode === 'group' ? selectedEnsemble : undefined,
      options: {
        style: 'creative' as const,
        intensity: 7,
        tempo: 'maintain' as const,
        key: 'maintain' as const,
        effects: []
      }
    };

    try {
      const result = await generateMusic(request, uploadedFile);
      if (result) {
        setCurrentScreen('results');
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = uploadedFile && !isProcessing && !isGenerating;

  return (
    <div className="min-h-screen p-4 sm:p-6 pt-16 sm:pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
            Create AI Music
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Upload your audio file and let our AI generate amazing solo performances or ensemble arrangements
          </p>
        </motion.div>

        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left Column - Upload & Configuration */}
          <div className="space-y-6 sm:space-y-8">
            {/* File Upload */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">1. Upload Audio File</h2>
              <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
              
              {uploadedFile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 sm:mt-6 glass-effect p-3 sm:p-4 rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                    <span className="font-medium text-white text-sm sm:text-base truncate">{uploadedFile.name}</span>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {formatFileSize(uploadedFile.size)} • {formatDuration(uploadedFile.duration)}
                    </span>
                  </div>
                  <WaveformDisplay 
                    waveformData={uploadedFile.waveformData}
                    height={50}
                    color="#6366f1"
                  />
                </motion.div>
              )}
            </motion.section>

            {/* Mode Selection */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">2. Choose Generation Mode</h2>
              <ModeSelector
                selectedMode={generationMode}
                onModeChange={setGenerationMode}
              />
            </motion.section>
          </div>

          {/* Right Column - Instrument/Ensemble Selection */}
          <div className="space-y-6 sm:space-y-8">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                3. Select {generationMode === 'solo' ? 'Instrument' : 'Ensemble'}
              </h2>
              <InstrumentGrid
                mode={generationMode}
                selectedInstrument={selectedInstrument}
                selectedEnsemble={selectedEnsemble}
                onInstrumentChange={setSelectedInstrument}
                onEnsembleChange={setSelectedEnsemble}
              />
            </motion.section>

            {/* Generate Button */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`
                  w-full p-4 sm:p-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300
                  ${canGenerate
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg glow-effect'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }
                `}
                whileHover={canGenerate ? { scale: 1.02 } : {}}
                whileTap={canGenerate ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-center space-x-3">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Generate AI Music</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </motion.button>

              {!uploadedFile && (
                <p className="text-center text-sm text-gray-500 mt-3">
                  Upload an audio file to get started
                </p>
              )}
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};