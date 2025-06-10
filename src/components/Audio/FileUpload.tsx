import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, AlertCircle } from 'lucide-react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { formatFileSize } from '../../utils/audioUtils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isDragOver,
    uploadProgress,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    clearError
  } = useFileUpload();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        className={`
          relative border-2 border-dashed rounded-xl p-4 sm:p-8 transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-indigo-400 bg-indigo-500/10' 
            : 'border-gray-600 hover:border-gray-500'
          }
          ${error ? 'border-red-400 bg-red-500/10' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, onFileSelect)}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={(e) => handleFileSelect(e, onFileSelect)}
          className="hidden"
          disabled={isProcessing}
        />

        <div className="text-center">
          {error ? (
            <div className="space-y-4">
              <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-red-400 mx-auto" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-red-400 mb-2">Upload Error</h3>
                <p className="text-red-300 text-xs sm:text-sm px-2">{error}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearError();
                  }}
                  className="mt-3 px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-xs sm:text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto" />
                {isDragOver && (
                  <motion.div
                    className="absolute inset-0 bg-indigo-500/20 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {isDragOver ? 'Drop your audio file here' : 'Upload Audio File'}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 px-2">
                  Drag & drop or click to select • MP3, WAV, FLAC • Max 50MB
                </p>

                {!isProcessing && (
                  <motion.button
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <File className="w-4 h-4 inline mr-2" />
                    Choose File
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-indigo-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </motion.div>

      <div className="mt-4 text-center text-xs text-gray-500">
        Supported formats: MP3, WAV, FLAC • Maximum file size: 50MB
      </div>
    </div>
  );
};