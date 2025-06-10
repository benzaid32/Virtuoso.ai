import { useState, useCallback } from 'react';
import { AudioFile, GeneratedTrack } from '../types/audio';
import { audioService } from '../services/audioService';

export const useAudioProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File): Promise<AudioFile | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const audioFile = await audioService.processUploadedFile(file);
      return audioFile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process audio file');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const createPlayer = useCallback(async (audioFile: AudioFile): Promise<HTMLAudioElement | null> => {
    try {
      return await audioService.createAudioPlayer(audioFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create audio player');
      return null;
    }
  }, []);

  const exportTrack = useCallback(async (
    track: GeneratedTrack,
    format: 'mp3' | 'wav' | 'flac' = 'mp3'
  ): Promise<Blob | null> => {
    try {
      return await audioService.exportAudio(track, format);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export audio');
      return null;
    }
  }, []);

  return {
    isProcessing,
    error,
    processFile,
    createPlayer,
    exportTrack,
    clearError: () => setError(null)
  };
};