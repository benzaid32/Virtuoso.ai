export interface AppState {
  currentScreen: 'upload' | 'processing' | 'results';
  isLoading: boolean;
  error: string | null;
  cameraMode: 'overview' | 'desk' | 'close-up';
}

export interface UITheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ResponsiveBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}