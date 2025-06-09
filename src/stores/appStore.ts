import { create } from 'zustand';

export type InstrumentType = 'saxophone' | 'harmonica' | 'steelpan' | 'guitar' | 'orchestra' | 'soul';
export type GenerationMode = 'solo' | 'group';
export type ProcessingState = 'idle' | 'uploading' | 'analyzing' | 'generating' | 'completed' | 'error';

interface AudioFile {
  file: File;
  name: string;
  duration: number;
  url: string;
}

interface GeneratedResult {
  originalUrl: string;
  generatedUrl: string;
  instrument: InstrumentType;
  mode: GenerationMode;
  timestamp: number;
}

interface AppState {
  // File management
  uploadedFile: AudioFile | null;
  setUploadedFile: (file: AudioFile | null) => void;
  
  // Generation settings
  selectedInstrument: InstrumentType;
  selectedMode: GenerationMode;
  setSelectedInstrument: (instrument: InstrumentType) => void;
  setSelectedMode: (mode: GenerationMode) => void;
  
  // Processing state
  processingState: ProcessingState;
  processingProgress: number;
  setProcessingState: (state: ProcessingState) => void;
  setProcessingProgress: (progress: number) => void;
  
  // Results
  generatedResult: GeneratedResult | null;
  setGeneratedResult: (result: GeneratedResult | null) => void;
  
  // UI state
  is3DViewActive: boolean;
  setIs3DViewActive: (active: boolean) => void;
  
  // Audio playback
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // File management
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  
  // Generation settings
  selectedInstrument: 'saxophone',
  selectedMode: 'solo',
  setSelectedInstrument: (instrument) => set({ selectedInstrument: instrument }),
  setSelectedMode: (mode) => set({ selectedMode: mode }),
  
  // Processing state
  processingState: 'idle',
  processingProgress: 0,
  setProcessingState: (state) => set({ processingState: state }),
  setProcessingProgress: (progress) => set({ processingProgress: progress }),
  
  // Results
  generatedResult: null,
  setGeneratedResult: (result) => set({ generatedResult: result }),
  
  // UI state
  is3DViewActive: true,
  setIs3DViewActive: (active) => set({ is3DViewActive: active }),
  
  // Audio playback
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration: duration }),
}));