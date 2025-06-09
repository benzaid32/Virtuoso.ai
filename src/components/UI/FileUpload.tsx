import React, { useCallback, useState } from 'react';
import { Upload, Music, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { motion, AnimatePresence } from 'framer-motion';

export const FileUpload: React.FC = () => {
  const { uploadedFile, setUploadedFile, processingState, setProcessingState } = useAppStore();
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFile = (file: File): string | null => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/ogg', 'audio/m4a'];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.some(type => file.type === type || file.name.toLowerCase().includes(type.split('/')[1]))) {
      return 'Please upload a valid audio file (MP3, WAV, OGG, M4A)';
    }

    if (file.size > maxSize) {
      return 'File size must be less than 50MB';
    }

    return null;
  };

  const processFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }

    setUploadError('');
    setProcessingState('uploading');

    try {
      // Create audio URL for preview
      const url = URL.createObjectURL(file);
      
      // Get audio duration
      const audio = new Audio(url);
      await new Promise((resolve, reject) => {
        audio.addEventListener('loadedmetadata', resolve);
        audio.addEventListener('error', reject);
      });

      const audioFile = {
        file,
        name: file.name,
        duration: audio.duration,
        url
      };

      setUploadedFile(audioFile);
      
      // Simulate upload delay
      setTimeout(() => {
        setProcessingState('analyzing');
      }, 1500);

    } catch (error) {
      setUploadError('Failed to process audio file');
      setProcessingState('error');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  if (uploadedFile && processingState !== 'idle') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-primary-500/20 rounded-xl flex items-center justify-center">
              <Music className="w-8 h-8 text-primary-400" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold truncate">
                {uploadedFile.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-neural-300">
              <span>{formatDuration(uploadedFile.duration)}</span>
              <span>•</span>
              <span>{formatFileSize(uploadedFile.file.size)}</span>
            </div>
            
            <div className="mt-2 text-xs text-primary-400">
              ✓ File uploaded successfully
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${dragActive 
            ? 'border-primary-400 bg-primary-500/10 scale-105' 
            : 'border-neural-600 hover:border-primary-500 bg-white/5'
          }
          backdrop-blur-sm
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={processingState !== 'idle'}
        />

        <AnimatePresence>
          {dragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-500/20 rounded-2xl flex items-center justify-center"
            >
              <div className="text-primary-300 text-xl font-semibold">
                Drop your audio file here
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <motion.div
            animate={{ y: dragActive ? -10 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Upload className="w-16 h-16 text-primary-400 mx-auto mb-4" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            Import Your Audio
          </h3>
          
          <p className="text-neural-300 mb-6 max-w-md mx-auto">
            Drag and drop your audio file here, or click to browse. 
            We support MP3, WAV, OGG, and M4A formats up to 50MB.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 
                       text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300
                       shadow-lg hover:shadow-xl"
            disabled={processingState !== 'idle'}
          >
            Select Audio File
          </motion.button>

          {uploadError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-red-400"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{uploadError}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Upload Progress Indicator */}
      {processingState === 'uploading' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white font-semibold">Uploading...</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};