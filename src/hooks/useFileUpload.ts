import { useState, useCallback } from 'react';
import { validateAudioFile } from '../utils/audioUtils';

export const useFileUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, onFileSelect: (file: File) => void) => {
    e.preventDefault();
    setIsDragOver(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    const audioFile = files.find(file => file.type.startsWith('audio/'));

    if (!audioFile) {
      setError('Please drop an audio file (MP3, WAV, or FLAC)');
      return;
    }

    const validation = validateAudioFile(audioFile);
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    onFileSelect(audioFile);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>, onFileSelect: (file: File) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const validation = validateAudioFile(file);
    if (!validation.valid) {
      setError(validation.error!);
      return;
    }

    onFileSelect(file);
  }, []);

  const simulateUpload = useCallback(async (file: File): Promise<void> => {
    setUploadProgress(0);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }, []);

  return {
    isDragOver,
    uploadProgress,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    simulateUpload,
    clearError: () => setError(null)
  };
};