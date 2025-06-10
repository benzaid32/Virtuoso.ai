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
  
  // Actions
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
  incrementVisitorCount: () => void;
  updateTime: () => void;
}

const mockArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Ethereal Landscape',
    artist: 'Marina Volkov',
    year: 2023,
    medium: 'Digital Oil on Canvas',
    dimensions: '120 × 80 cm',
    description: 'A dreamlike landscape that captures the essence of twilight, where reality meets imagination. The piece explores themes of solitude and transcendence through masterful use of light and shadow.',
    imageUrl: 'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'landscape',
    price: '$12,500',
    isAvailable: true,
    installationType: 'floating-frames'
  },
  {
    id: '2',
    title: 'Chromatic Resonance',
    artist: 'David Chen',
    year: 2024,
    medium: 'Acrylic and Mixed Media',
    dimensions: '100 × 100 cm',
    description: 'An explosive symphony of color and form that challenges perception. This abstract masterpiece invites viewers to lose themselves in its vibrant complexity.',
    imageUrl: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'abstract',
    price: '$8,750',
    isAvailable: true,
    installationType: 'particle-system'
  },
  {
    id: '3',
    title: 'Urban Solitude',
    artist: 'Elena Rodriguez',
    year: 2023,
    medium: 'Digital Photography',
    dimensions: '90 × 60 cm',
    description: 'A haunting portrayal of modern isolation within the urban landscape. The photographer captures the poetry of loneliness in bustling city life.',
    imageUrl: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'photography',
    price: '$3,200',
    isAvailable: true,
    installationType: 'light-installation'
  },
  {
    id: '4',
    title: 'Metamorphosis',
    artist: 'James Morrison',
    year: 2024,
    medium: 'Bronze and Steel',
    dimensions: '180 × 120 × 80 cm',
    description: 'A powerful sculptural piece that embodies transformation and growth. The interplay of materials creates a dialogue between strength and fluidity.',
    imageUrl: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'sculpture',
    price: '$45,000',
    isAvailable: false,
    installationType: '3d-sculpture'
  },
  {
    id: '5',
    title: 'Digital Dreams',
    artist: 'Aria Kim',
    year: 2024,
    medium: 'AI-Generated Art',
    dimensions: '150 × 100 cm',
    description: 'A groundbreaking exploration of human-AI collaboration in art creation. This piece questions the boundaries between human creativity and artificial intelligence.',
    imageUrl: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'contemporary',
    price: '$6,800',
    isAvailable: true,
    installationType: 'holographic'
  },
  {
    id: '6',
    title: 'Portrait of Time',
    artist: 'Vincent Laurent',
    year: 2023,
    medium: 'Oil on Canvas',
    dimensions: '80 × 60 cm',
    description: 'A masterful portrait that captures not just physical likeness but the essence of temporal passage. Each brushstroke tells a story of moments lived.',
    imageUrl: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1200',
    category: 'portrait',
    price: '$15,200',
    isAvailable: true,
    installationType: 'geometric-forms'
  }
];

export const useGalleryStore = create<GalleryState>((set, get) => ({
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
  
  // Actions
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
  incrementVisitorCount: () => set((state) => ({ visitorCount: state.visitorCount + 1 })),
  updateTime: () => set({ currentTime: new Date().toLocaleTimeString() }),
}));