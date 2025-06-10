import { create } from 'zustand';

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  category: 'landscape' | 'abstract' | 'portrait' | 'sculpture' | 'photography' | 'contemporary';
  price?: string;
  isAvailable: boolean;
  installationType: '3d-sculpture' | 'floating-frames' | 'light-installation' | 'geometric-forms' | 'particle-system' | 'holographic';
}

export interface GalleryState {
  // System state
  isLoading: boolean;
  loadingProgress: number;
  loadingStage: string;
  systemReady: boolean;
  showWelcome: boolean;
  
  // Artworks
  artworks: Artwork[];
  currentArtworkIndex: number;
  currentArtwork: Artwork | null;
  favorites: string[];
  
  // Gallery state
  isSlideshow: boolean;
  slideshowInterval: number;
  visitorCount: number;
  galleryStatus: 'open' | 'closed' | 'private-viewing';
  currentTime: string;
  
  // UI state
  isFullscreen: boolean;
  zoomLevel: number;
  showArtworkInfo: boolean;
  is3DViewActive: boolean;
  cameraMode: 'idle' | 'desk' | 'monitor' | 'free';
  audioEnabled: boolean;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number, stage: string) => void;
  setSystemReady: (ready: boolean) => void;
  setShowWelcome: (show: boolean) => void;
  setCameraMode: (mode: 'idle' | 'desk' | 'monitor' | 'free') => void;
  setCurrentArtwork: (index: number) => void;
  nextArtwork: () => void;
  previousArtwork: () => void;
  toggleFavorite: (artworkId: string) => void;
  toggleSlideshow: () => void;
  setSlideshowInterval: (interval: number) => void;
  setFullscreen: (fullscreen: boolean) => void;
  setZoomLevel: (zoom: number) => void;
  toggleArtworkInfo: () => void;
  setIs3DViewActive: (active: boolean) => void;
  toggleAudio: () => void;
  incrementVisitorCount: () => void;
  updateTime: () => void;
}

const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    year: 1889,
    medium: 'Oil on Canvas',
    dimensions: '73.7 × 92.1 cm',
    description: 'A swirling night sky over a French village, painted during van Gogh\'s stay at the Saint-Paul-de-Mausole asylum. The piece captures the artist\'s unique vision of movement and energy in the cosmos.',
    imageUrl: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'landscape',
    price: 'Priceless',
    isAvailable: false,
    installationType: 'floating-frames'
  },
  {
    id: '2',
    title: 'Abstract Waves',
    artist: 'Marina Chen',
    year: 2024,
    medium: 'Digital Art',
    dimensions: '120 × 80 cm',
    description: 'A contemporary exploration of fluid dynamics through digital manipulation. The piece represents the intersection of technology and natural phenomena.',
    imageUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'abstract',
    price: '$8,750',
    isAvailable: true,
    installationType: 'particle-system'
  },
  {
    id: '3',
    title: 'Urban Geometry',
    artist: 'David Rodriguez',
    year: 2023,
    medium: 'Mixed Media',
    dimensions: '100 × 100 cm',
    description: 'A bold geometric composition that captures the rhythm and structure of modern urban architecture through vibrant colors and sharp angles.',
    imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'contemporary',
    price: '$12,400',
    isAvailable: true,
    installationType: 'geometric-forms'
  },
  {
    id: '4',
    title: 'Mountain Solitude',
    artist: 'Elena Volkov',
    year: 2023,
    medium: 'Photography',
    dimensions: '90 × 60 cm',
    description: 'A breathtaking capture of alpine serenity, where mist meets mountain peaks in perfect harmony. This piece invites contemplation of nature\'s grandeur.',
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'landscape',
    price: '$3,200',
    isAvailable: true,
    installationType: 'light-installation'
  },
  {
    id: '5',
    title: 'Cosmic Nebula',
    artist: 'James Morrison',
    year: 2024,
    medium: 'Digital Sculpture',
    dimensions: '150 × 100 cm',
    description: 'A mesmerizing journey through cosmic space, rendered with cutting-edge digital techniques to create an otherworldly experience.',
    imageUrl: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'contemporary',
    price: '$15,600',
    isAvailable: true,
    installationType: 'holographic'
  },
  {
    id: '6',
    title: 'Portrait of Time',
    artist: 'Aria Laurent',
    year: 2023,
    medium: 'Oil on Canvas',
    dimensions: '80 × 60 cm',
    description: 'A masterful portrait that transcends traditional representation, capturing the essence of temporal passage through masterful brushwork.',
    imageUrl: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'portrait',
    price: '$18,900',
    isAvailable: false,
    installationType: '3d-sculpture'
  }
];

export const useGalleryStore = create<GalleryState>((set, get) => ({
  // System state
  isLoading: true,
  loadingProgress: 0,
  loadingStage: 'Initializing Gallery Systems...',
  systemReady: false,
  showWelcome: false,
  
  // Artworks
  artworks: mockArtworks,
  currentArtworkIndex: 0,
  currentArtwork: mockArtworks[0],
  favorites: [],
  
  // Gallery state
  isSlideshow: false,
  slideshowInterval: 5000,
  visitorCount: 1247,
  galleryStatus: 'open',
  currentTime: new Date().toLocaleTimeString(),
  
  // UI state
  isFullscreen: false,
  zoomLevel: 1,
  showArtworkInfo: true,
  is3DViewActive: true,
  cameraMode: 'idle',
  audioEnabled: true,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress, stage) => set({ loadingProgress: progress, loadingStage: stage }),
  setSystemReady: (ready) => set({ systemReady: ready }),
  setShowWelcome: (show) => set({ showWelcome: show }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  
  setCurrentArtwork: (index) => {
    const artworks = get().artworks;
    set({ 
      currentArtworkIndex: index,
      currentArtwork: artworks[index] || null
    });
  },
  
  nextArtwork: () => {
    const { currentArtworkIndex, artworks } = get();
    const nextIndex = (currentArtworkIndex + 1) % artworks.length;
    get().setCurrentArtwork(nextIndex);
  },
  
  previousArtwork: () => {
    const { currentArtworkIndex, artworks } = get();
    const prevIndex = currentArtworkIndex === 0 ? artworks.length - 1 : currentArtworkIndex - 1;
    get().setCurrentArtwork(prevIndex);
  },
  
  toggleFavorite: (artworkId) => {
    set((state) => ({
      favorites: state.favorites.includes(artworkId)
        ? state.favorites.filter(id => id !== artworkId)
        : [...state.favorites, artworkId]
    }));
  },
  
  toggleSlideshow: () => set((state) => ({ isSlideshow: !state.isSlideshow })),
  setSlideshowInterval: (interval) => set({ slideshowInterval: interval }),
  setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
  setZoomLevel: (zoom) => set({ zoomLevel: Math.max(1, Math.min(3, zoom)) }),
  toggleArtworkInfo: () => set((state) => ({ showArtworkInfo: !state.showArtworkInfo })),
  setIs3DViewActive: (active) => set({ is3DViewActive: active }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  incrementVisitorCount: () => set((state) => ({ visitorCount: state.visitorCount + 1 })),
  updateTime: () => set({ currentTime: new Date().toLocaleTimeString() }),
}));