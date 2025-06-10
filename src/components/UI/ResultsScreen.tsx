import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Share2, Star } from 'lucide-react';
import { WaveformDisplay } from '../Audio/WaveformDisplay';
import { AudioPlayer } from '../Audio/AudioPlayer';
import { useAppStore } from '../../stores/appStore';
import { downloadBlob } from '../../utils/audioUtils';

export const ResultsScreen: React.FC = () => {
  const {
    uploadedFile,
    generatedTrack,
    setCurrentlyPlaying,
    setIsPlaying,
    setCameraMode,
    resetApp
  } = useAppStore();

  useEffect(() => {
    // Switch to desk view for results
    setCameraMode('desk');
  }, [setCameraMode]);

  const handleDownload = async () => {
    if (!generatedTrack) return;

    try {
      const response = await fetch(generatedTrack.url);
      const blob = await response.blob();
      const filename = `virtuoso-ai-${generatedTrack.mode}-${Date.now()}.mp3`;
      downloadBlob(blob, filename);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handlePlayStateChange = (isPlaying: boolean, track: 'original' | 'generated' | null) => {
    setIsPlaying(isPlaying);
    setCurrentlyPlaying(track);
  };

  if (!generatedTrack) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-lg sm:text-xl text-gray-400">No generated track available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-4">
              Your AI Music is Ready!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 px-4">
              Compare your original with the AI-generated {generatedTrack.mode} performance
            </p>
          </motion.div>

          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 mb-6 sm:mb-8">
            {/* Original Track */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-4 sm:p-6 rounded-xl"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Original Track</h3>
              {uploadedFile && (
                <>
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2 truncate">{uploadedFile.name}</div>
                    <WaveformDisplay 
                      waveformData={uploadedFile.waveformData}
                      color="#6366f1"
                      height={60}
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Duration: {Math.floor(uploadedFile.duration / 60)}:{(uploadedFile.duration % 60).toString().padStart(2, '0')}
                  </div>
                </>
              )}
            </motion.div>

            {/* Generated Track */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect p-4 sm:p-6 rounded-xl"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Generated Track</h3>
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">
                  {generatedTrack.mode === 'solo' 
                    ? `${generatedTrack.instrument} Solo` 
                    : `${generatedTrack.ensemble} Arrangement`
                  }
                </div>
                <WaveformDisplay 
                  waveformData={generatedTrack.waveformData}
                  color="#8b5cf6"
                  height={60}
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
                <span>Generated: {generatedTrack.generatedAt.toLocaleTimeString()}</span>
                <span>Quality: {generatedTrack.quality}</span>
              </div>
            </motion.div>
          </div>

          {/* Audio Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <AudioPlayer
              originalFile={uploadedFile}
              generatedTrack={generatedTrack}
              onPlayStateChange={handlePlayStateChange}
            />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <motion.button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Download MP3</span>
              <span className="sm:hidden">Download</span>
            </motion.button>

            <motion.button
              onClick={() => {/* Share functionality */}}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Share</span>
            </motion.button>

            <motion.button
              onClick={() => {/* Rating functionality */}}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Rate</span>
            </motion.button>

            <motion.button
              onClick={resetApp}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Generate Another</span>
              <span className="sm:hidden">New</span>
            </motion.button>
          </motion.div>

          {/* Generation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect p-4 sm:p-6 rounded-xl"
          >
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Generation Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div>
                <span className="text-gray-400">Mode:</span>
                <div className="text-white font-medium capitalize">{generatedTrack.mode}</div>
              </div>
              <div>
                <span className="text-gray-400">
                  {generatedTrack.mode === 'solo' ? 'Instrument:' : 'Ensemble:'}
                </span>
                <div className="text-white font-medium">
                  {generatedTrack.instrument || generatedTrack.ensemble}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Processing Time:</span>
                <div className="text-white font-medium">
                  {Math.round(generatedTrack.processingTime / 1000)}s
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};