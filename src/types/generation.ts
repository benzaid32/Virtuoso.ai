import { InstrumentType, EnsembleType, GenerationMode, ProcessingStage } from './audio';

export interface GenerationRequest {
  audioFileId: string;
  mode: GenerationMode;
  instrument?: InstrumentType;
  ensemble?: EnsembleType;
  options: GenerationOptions;
}

export interface GenerationOptions {
  style: 'conservative' | 'creative' | 'experimental';
  intensity: number; // 1-10
  tempo: 'maintain' | 'slower' | 'faster';
  key: 'maintain' | 'transpose';
  effects: string[];
}

export interface ProcessingStatus {
  stage: ProcessingStage;
  progress: number;
  message: string;
  estimatedTimeRemaining: number;
  error?: string;
}

export interface InstrumentConfig {
  id: InstrumentType;
  name: string;
  description: string;
  icon: string;
  style: string;
  processingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface EnsembleConfig {
  id: EnsembleType;
  name: string;
  description: string;
  icon: string;
  instruments: string[];
  processingTime: number;
  complexity: 'medium' | 'high' | 'very-high';
}