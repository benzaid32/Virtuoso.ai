export interface AudioFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  duration: number;
  file: File;
  waveformData: number[];
  uploadedAt: Date;
}

export interface GeneratedTrack {
  id: string;
  originalFileId: string;
  mode: GenerationMode;
  instrument?: InstrumentType;
  ensemble?: EnsembleType;
  url: string;
  waveformData: number[];
  generatedAt: Date;
  processingTime: number;
  quality: 'standard' | 'high' | 'premium';
}

export type InstrumentType = 'saxophone' | 'harmonica' | 'steelpan' | 'electric-guitar';
export type EnsembleType = 'orchestra' | '60s-soul-band';
export type GenerationMode = 'solo' | 'group';
export type ProcessingStage = 'idle' | 'uploading' | 'analyzing' | 'generating' | 'enhancing' | 'finalizing' | 'complete' | 'error';

export interface AudioProcessingOptions {
  quality: 'standard' | 'high' | 'premium';
  format: 'mp3' | 'wav' | 'flac';
  bitrate: number;
  sampleRate: number;
}

export interface WaveformData {
  peaks: number[];
  duration: number;
  sampleRate: number;
}