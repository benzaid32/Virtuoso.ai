import { create } from 'zustand';
import { AudioFile, GeneratedTrack, GenerationMode, InstrumentType, EnsembleType } from '../types/audio';
import { ProcessingStatus } from '../types/generation';

interface AppState {
  // UI State
  currentScreen: 'upload' | 'processing' | 'results';
  cameraMode: 'overview' | 'desk' | 'close-up';
  isLoading: boolean;
  error: string | null;

  // Audio State
  uploadedFile: AudioFile | null;
  generatedTrack: GeneratedTrack | null;
  currentlyPlaying: 'original' | 'generated' | null;
  isPlaying: boolean;

  // Generation State
  generationMode: GenerationMode;
  selectedInstrument: InstrumentType;
  selectedEnsemble: EnsembleType;
  processingStatus: ProcessingStatus | null;

  // Actions
  setCurrentScreen: (screen: 'upload' | 'processing' | 'results') => void;
  setCameraMode: (mode: 'overview' | 'desk' | 'close-up') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUploadedFile: (file: AudioFile | null) => void;
  setGeneratedTrack: (track: GeneratedTrack | null) => void;
  setCurrentlyPlaying: (track: 'original' | 'generated' | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setGenerationMode: (mode: GenerationMode) => void;
  setSelectedInstrument: (instrument: InstrumentType) => void;
  setSelectedEnsemble: (ensemble: EnsembleType) => void;
  setProcessingStatus: (status: ProcessingStatus | null) => void;
  resetApp: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial UI State
  currentScreen: 'upload',
  cameraMode: 'overview',
  isLoading: false,
  error: null,

  // Initial Audio State
  uploadedFile: null,
  generatedTrack: null,
  currentlyPlaying: null,
  isPlaying: false,

  // Initial Generation State
  generationMode: 'solo',
  selectedInstrument: 'saxophone',
  selectedEnsemble: 'orchestra',
  processingStatus: null,

  // Actions
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setGeneratedTrack: (track) => set({ generatedTrack: track }),
  setCurrentlyPlaying: (track) => set({ currentlyPlaying: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setGenerationMode: (mode) => set({ generationMode: mode }),
  setSelectedInstrument: (instrument) => set({ selectedInstrument: instrument }),
  setSelectedEnsemble: (ensemble) => set({ selectedEnsemble: ensemble }),
  setProcessingStatus: (status) => set({ processingStatus: status }),
  resetApp: () => set({
    currentScreen: 'upload',
    uploadedFile: null,
    generatedTrack: null,
    currentlyPlaying: null,
    isPlaying: false,
    processingStatus: null,
    error: null
  })
}));