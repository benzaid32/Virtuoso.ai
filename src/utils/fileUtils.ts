export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};

export const createObjectURL = (file: File): string => {
  return URL.createObjectURL(file);
};

export const revokeObjectURL = (url: string): void => {
  URL.revokeObjectURL(url);
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const sanitizeFilename = (filename: string): string => {
  return filename.replace(/[^a-z0-9.-]/gi, '_').toLowerCase();
};