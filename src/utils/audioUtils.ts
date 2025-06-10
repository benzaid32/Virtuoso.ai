export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const generateWaveformData = (audioBuffer: AudioBuffer): number[] => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = 200;
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData = [];
  
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  
  return filteredData;
};

export const createAudioContext = (): AudioContext => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const loadAudioBuffer = async (file: File): Promise<AudioBuffer> => {
  const audioContext = createAudioContext();
  const arrayBuffer = await file.arrayBuffer();
  return await audioContext.decodeAudioData(arrayBuffer);
};

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const validateAudioFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const supportedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/flac'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 50MB' };
  }
  
  if (!supportedTypes.includes(file.type)) {
    return { valid: false, error: 'Unsupported file format. Please use MP3, WAV, or FLAC' };
  }
  
  return { valid: true };
};