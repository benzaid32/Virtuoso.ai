import { InstrumentConfig, EnsembleConfig } from '../types/generation';

export const SUPPORTED_AUDIO_FORMATS = [
  'audio/mp3',
  'audio/mpeg',
  'audio/wav',
  'audio/wave',
  'audio/flac',
  'audio/x-flac'
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const INSTRUMENTS: InstrumentConfig[] = [
  {
    id: 'saxophone',
    name: 'Saxophone',
    description: 'Smooth jazz and soulful melodies',
    icon: '🎷',
    style: 'Jazz/Smooth',
    processingTime: 25000,
    difficulty: 'medium'
  },
  {
    id: 'harmonica',
    name: 'Harmonica',
    description: 'Blues and folk expressions',
    icon: '🎵',
    style: 'Blues/Folk',
    processingTime: 20000,
    difficulty: 'easy'
  },
  {
    id: 'steelpan',
    name: 'Steel Pan',
    description: 'Caribbean tropical rhythms',
    icon: '🥁',
    style: 'Caribbean/Tropical',
    processingTime: 30000,
    difficulty: 'medium'
  },
  {
    id: 'electric-guitar',
    name: 'Electric Guitar',
    description: 'Rock and blues power',
    icon: '🎸',
    style: 'Rock/Blues',
    processingTime: 35000,
    difficulty: 'hard'
  }
];

export const ENSEMBLES: EnsembleConfig[] = [
  {
    id: 'orchestra',
    name: 'Orchestra',
    description: 'Full symphonic arrangement',
    icon: '🎼',
    instruments: ['Strings', 'Brass', 'Woodwinds', 'Percussion'],
    processingTime: 45000,
    complexity: 'very-high'
  },
  {
    id: '60s-soul-band',
    name: "60's Soul Band",
    description: 'Motown funk and soul',
    icon: '🎤',
    instruments: ['Bass', 'Drums', 'Keys', 'Horns', 'Vocals'],
    processingTime: 40000,
    complexity: 'high'
  }
];

export const PROCESSING_STAGES = {
  idle: { message: 'Ready to generate', progress: 0 },
  uploading: { message: 'Uploading audio file...', progress: 10 },
  analyzing: { message: 'Analyzing input audio...', progress: 25 },
  generating: { message: 'Generating AI performance...', progress: 60 },
  enhancing: { message: 'Enhancing audio quality...', progress: 85 },
  finalizing: { message: 'Finalizing output...', progress: 95 },
  complete: { message: 'Generation complete!', progress: 100 },
  error: { message: 'An error occurred', progress: 0 }
};

export const THEME = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  background: '#0a0a0a',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#a1a1aa',
  border: '#374151',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444'
};