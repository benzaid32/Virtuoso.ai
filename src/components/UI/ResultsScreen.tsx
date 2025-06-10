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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-400">No generated track available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your AI Music is Ready!
          </h1>
          <p className="text-xl text-gray-400">
            Compare your original with the AI-generated {generatedTrack.mode} performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Original Track */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Original Track</h3>
            {uploadedFile && (
              <>
                <div className="mb-4">
                  <div className="text-sm text-gray-400 mb-2">{uploadedFile.name}</div>
                  <WaveformDisplay 
                    waveformData={uploadedFile.waveformData}
                    color="#6366f1"
                    height={80}
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
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Generated Track</h3>
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
                height={80}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
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
          className="mb-8"
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
          className="flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span>Download MP3</span>
          </motion.button>

          <motion.button
            onClick={() => {/* Share functionality */}}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </motion.button>

          <motion.button
            onClick={() => {/* Rating functionality */}}
            className="flex items-center space-x-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star className="w-5 h-5" />
            <span>Rate</span>
          </motion.button>

          <motion.button
            onClick={resetApp}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Generate Another</span>
          </motion.button>
        </motion.div>

        {/* Generation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-effect p-6 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Generation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
  );
};