import { useState, useCallback } from 'react';
import { GenerationRequest, ProcessingStatus } from '../types/generation';
import { AudioFile, GeneratedTrack } from '../types/audio';
import { mockAIService } from '../services/mockAIService';

export const useAIGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateMusic = useCallback(async (
    request: GenerationRequest,
    audioFile: AudioFile
  ): Promise<GeneratedTrack | null> => {
    setIsGenerating(true);
    setError(null);
    setProcessingStatus({
      stage: 'analyzing',
      progress: 0,
      message: 'Starting generation...',
      estimatedTimeRemaining: 30000
    });

    try {
      const generatedTrack = await mockAIService.generateMusic(
        request,
        audioFile,
        (status) => setProcessingStatus(status)
      );

      return generatedTrack;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Generation failed';
      setError(errorMessage);
      setProcessingStatus({
        stage: 'error',
        progress: 0,
        message: errorMessage,
        estimatedTimeRemaining: 0,
        error: errorMessage
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const resetGeneration = useCallback(() => {
    setIsGenerating(false);
    setProcessingStatus(null);
    setError(null);
  }, []);

  return {
    isGenerating,
    processingStatus,
    error,
    generateMusic,
    resetGeneration,
    clearError: () => setError(null)
  };
};