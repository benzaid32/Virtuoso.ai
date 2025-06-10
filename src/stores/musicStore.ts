import { create } from 'zustand';

export type InstrumentType = 'saxophone' | 'harmonica' | 'steelpan' | 'electric-guitar';
export type GroupType = 'orchestra' | '60s-soul-band';
export type GenerationMode = 'solo' | 'group';
export type ProcessingStage = 'idle' | 'uploading' | 'analyzing' | 'generating' | 'complete' | 'error';

export interface AudioFile {
  id: string;
  name: string;
  url: string;
  duration: number;
  waveformData: number[];
  uploadedAt: Date;
}

export interface GeneratedTrack {
  id: string;
  originalFileId: string;
  mode: GenerationMode;
  instrument?: InstrumentType;
  group?: GroupType;
  url: string;
  waveformData: number[];
  generatedAt: Date;
  isPlaying: boolean;
}

export interface MusicState {
  // System state
  isLoading: boolean;
  loadingProgress: number;
  loadingStage: string;
  systemReady: boolean;
  showWelcome: boolean;
  
  // Audio files
  uploadedFile: AudioFile | null;
  generatedTrack: GeneratedTrack | null;
  
  // Generation settings
  generationMode: GenerationMode;
  selectedInstrument: InstrumentType;
  selectedGroup: GroupType;
  
  // Processing state
  processingStage: ProcessingStage;
  processingProgress: number;
  
  // UI state
  cameraMode: 'idle' | 'desk' | 'monitor' | 'free';
  audioEnabled: boolean;
  currentTime: string;
  
  // Playback state
  isPlaying: boolean;
  currentTrack: 'original' | 'generated' | null;
  playbackPosition: number;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number, stage: string) => void;
  setSystemReady: (ready: boolean) => void;
  setShowWelcome: (show: boolean) => void;
  setCameraMode: (mode: 'idle' | 'desk' | 'monitor' | 'free') => void;
  setGenerationMode: (mode: GenerationMode) => void;
  setSelectedInstrument: (instrument: InstrumentType) => void;
  setSelectedGroup: (group: GroupType) => void;
  setUploadedFile: (file: AudioFile | null) => void;
  setGeneratedTrack: (track: GeneratedTrack | null) => void;
  setProcessingStage: (stage: ProcessingStage) => void;
  setProcessingProgress: (progress: number) => void;
  toggleAudio: () => void;
  updateTime: () => void;
  playTrack: (track: 'original' | 'generated') => void;
  pauseTrack: () => void;
  stopTrack: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  startGeneration: () => void;
  resetSession: () => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  // System state
  isLoading: true,
  loadingProgress: 0,
  loadingStage: 'Initializing Virtuoso.ai Systems...',
  systemReady: false,
  showWelcome: false,
  
  // Audio files
  uploadedFile: null,
  generatedTrack: null,
  
  // Generation settings
  generationMode: 'solo',
  selectedInstrument: 'saxophone',
  selectedGroup: 'orchestra',
  
  // Processing state
  processingStage: 'idle',
  processingProgress: 0,
  
  // UI state
  cameraMode: 'idle',
  audioEnabled: true,
  currentTime: new Date().toLocaleTimeString(),
  
  // Playback state
  isPlaying: false,
  currentTrack: null,
  playbackPosition: 0,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress, stage) => set({ loadingProgress: progress, loadingStage: stage }),
  setSystemReady: (ready) => set({ systemReady: ready }),
  setShowWelcome: (show) => set({ showWelcome: show }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setGenerationMode: (mode) => set({ generationMode: mode }),
  setSelectedInstrument: (instrument) => set({ selectedInstrument: instrument }),
  setSelectedGroup: (group) => set({ selectedGroup: group }),
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setGeneratedTrack: (track) => set({ generatedTrack: track }),
  setProcessingStage: (stage) => set({ processingStage: stage }),
  setProcessingProgress: (progress) => set({ processingProgress: progress }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  updateTime: () => set({ currentTime: new Date().toLocaleTimeString() }),
  
  playTrack: (track) => {
    set({ 
      isPlaying: true, 
      currentTrack: track 
    });
  },
  
  pauseTrack: () => set({ isPlaying: false }),
  
  stopTrack: () => set({ 
    isPlaying: false, 
    currentTrack: null, 
    playbackPosition: 0 
  }),
  
  skipForward: () => {
    const { playbackPosition } = get();
    set({ playbackPosition: Math.min(playbackPosition + 10, 100) });
  },
  
  skipBackward: () => {
    const { playbackPosition } = get();
    set({ playbackPosition: Math.max(playbackPosition - 10, 0) });
  },
  
  startGeneration: async () => {
    const { uploadedFile, generationMode, selectedInstrument, selectedGroup } = get();
    
    if (!uploadedFile) return;
    
    set({ processingStage: 'analyzing', processingProgress: 0 });
    
    // Simulate AI processing
    const stages = [
      { stage: 'analyzing', duration: 2000, message: 'Analyzing audio patterns...' },
      { stage: 'generating', duration: 3000, message: 'Generating AI music...' },
      { stage: 'complete', duration: 1000, message: 'Generation complete!' }
    ];
    
    for (const stageInfo of stages) {
      set({ processingStage: stageInfo.stage as ProcessingStage });
      
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, stageInfo.duration / 10));
        set({ processingProgress: i });
      }
    }
    
    // Create mock generated track
    const generatedTrack: GeneratedTrack = {
      id: `gen_${Date.now()}`,
      originalFileId: uploadedFile.id,
      mode: generationMode,
      instrument: generationMode === 'solo' ? selectedInstrument : undefined,
      group: generationMode === 'group' ? selectedGroup : undefined,
      url: 'https://example.com/generated-track.wav', // Mock URL
      waveformData: Array.from({ length: 100 }, () => Math.random() * 100),
      generatedAt: new Date(),
      isPlaying: false
    };
    
    set({ 
      generatedTrack,
      processingStage: 'complete'
    });
  },
  
  resetSession: () => {
    set({
      uploadedFile: null,
      generatedTrack: null,
      processingStage: 'idle',
      processingProgress: 0,
      isPlaying: false,
      currentTrack: null,
      playbackPosition: 0
    });
  }
}));