import { AudioFile, GeneratedTrack, WaveformData } from '../types/audio';
import { generateWaveformData, loadAudioBuffer, createAudioContext } from '../utils/audioUtils';
import { generateUniqueId } from '../utils/fileUtils';

class AudioService {
  private audioContext: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = createAudioContext();
    }
    return this.audioContext;
  }

  async processUploadedFile(file: File): Promise<AudioFile> {
    try {
      const audioBuffer = await loadAudioBuffer(file);
      const waveformData = generateWaveformData(audioBuffer);
      
      return {
        id: generateUniqueId(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        duration: audioBuffer.duration,
        file,
        waveformData,
        uploadedAt: new Date()
      };
    } catch (error) {
      throw new Error('Failed to process audio file');
    }
  }

  async generateWaveform(audioFile: AudioFile): Promise<WaveformData> {
    const audioBuffer = await loadAudioBuffer(audioFile.file);
    const peaks = generateWaveformData(audioBuffer);
    
    return {
      peaks,
      duration: audioBuffer.duration,
      sampleRate: audioBuffer.sampleRate
    };
  }

  async createAudioPlayer(audioFile: AudioFile): Promise<HTMLAudioElement> {
    const audio = new Audio(audioFile.url);
    audio.preload = 'metadata';
    
    return new Promise((resolve, reject) => {
      audio.addEventListener('loadedmetadata', () => resolve(audio));
      audio.addEventListener('error', () => reject(new Error('Failed to load audio')));
    });
  }

  async exportAudio(track: GeneratedTrack, format: 'mp3' | 'wav' | 'flac' = 'mp3'): Promise<Blob> {
    // In a real implementation, this would convert the audio to the specified format
    // For now, we'll return a mock blob
    const response = await fetch(track.url);
    return await response.blob();
  }

  cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export const audioService = new AudioService();