import { GenerationRequest, ProcessingStatus } from '../types/generation';
import { GeneratedTrack, AudioFile } from '../types/audio';
import { PROCESSING_STAGES } from '../utils/constants';
import { generateUniqueId } from '../utils/fileUtils';

class MockAIService {
  private processingCallbacks: Map<string, (status: ProcessingStatus) => void> = new Map();

  async generateMusic(
    request: GenerationRequest,
    audioFile: AudioFile,
    onProgress: (status: ProcessingStatus) => void
  ): Promise<GeneratedTrack> {
    const requestId = generateUniqueId();
    this.processingCallbacks.set(requestId, onProgress);

    try {
      // Simulate realistic AI processing stages
      await this.simulateProcessing(requestId, request);

      // Create mock generated track with modified waveform
      const generatedTrack: GeneratedTrack = {
        id: generateUniqueId(),
        originalFileId: audioFile.id,
        mode: request.mode,
        instrument: request.instrument,
        ensemble: request.ensemble,
        url: this.createMockGeneratedAudio(audioFile),
        waveformData: this.generateModifiedWaveform(audioFile.waveformData, request),
        generatedAt: new Date(),
        processingTime: this.getProcessingTime(request),
        quality: 'high'
      };

      this.processingCallbacks.delete(requestId);
      return generatedTrack;
    } catch (error) {
      this.processingCallbacks.delete(requestId);
      throw error;
    }
  }

  private async simulateProcessing(requestId: string, request: GenerationRequest): Promise<void> {
    const stages = ['analyzing', 'generating', 'enhancing', 'finalizing'];
    const totalTime = this.getProcessingTime(request);
    const stageTime = totalTime / stages.length;

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i] as keyof typeof PROCESSING_STAGES;
      const baseProgress = (i / stages.length) * 100;
      
      // Simulate gradual progress within each stage
      for (let progress = 0; progress <= 100; progress += 5) {
        const overallProgress = baseProgress + (progress / stages.length);
        
        this.updateProgress(requestId, {
          stage: stage as any,
          progress: Math.min(overallProgress, 100),
          message: PROCESSING_STAGES[stage].message,
          estimatedTimeRemaining: Math.max(0, totalTime - (overallProgress / 100) * totalTime)
        });

        await this.delay(stageTime / 20);
      }
    }

    // Final completion
    this.updateProgress(requestId, {
      stage: 'complete',
      progress: 100,
      message: 'Generation complete!',
      estimatedTimeRemaining: 0
    });
  }

  private updateProgress(requestId: string, status: ProcessingStatus): void {
    const callback = this.processingCallbacks.get(requestId);
    if (callback) {
      callback(status);
    }
  }

  private getProcessingTime(request: GenerationRequest): number {
    // Base processing time varies by complexity
    let baseTime = 20000; // 20 seconds

    if (request.mode === 'solo') {
      const instrumentTimes = {
        'saxophone': 25000,
        'harmonica': 20000,
        'steelpan': 30000,
        'electric-guitar': 35000
      };
      baseTime = instrumentTimes[request.instrument!] || baseTime;
    } else {
      const ensembleTimes = {
        'orchestra': 45000,
        '60s-soul-band': 40000
      };
      baseTime = ensembleTimes[request.ensemble!] || baseTime;
    }

    // Add some randomness for realism
    return baseTime + Math.random() * 10000;
  }

  private createMockGeneratedAudio(originalFile: AudioFile): string {
    // In a real implementation, this would return a URL to the generated audio
    // For now, we'll return the original URL (in production, this would be different)
    return originalFile.url;
  }

  private generateModifiedWaveform(originalWaveform: number[], request: GenerationRequest): number[] {
    // Create a modified waveform that looks different from the original
    return originalWaveform.map((value, index) => {
      let modifier = 1;
      
      // Apply different modifications based on instrument/ensemble
      if (request.mode === 'solo') {
        switch (request.instrument) {
          case 'saxophone':
            modifier = 0.8 + Math.sin(index * 0.1) * 0.3;
            break;
          case 'harmonica':
            modifier = 0.6 + Math.cos(index * 0.15) * 0.4;
            break;
          case 'steelpan':
            modifier = 0.9 + Math.sin(index * 0.2) * 0.2;
            break;
          case 'electric-guitar':
            modifier = 1.2 + Math.sin(index * 0.05) * 0.5;
            break;
        }
      } else {
        // Ensemble modifications
        modifier = 1.1 + Math.sin(index * 0.08) * 0.4;
      }

      return Math.max(0, Math.min(1, value * modifier));
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockAIService = new MockAIService();