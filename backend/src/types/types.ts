// Types and Interfaces
export interface MRFData {
  version: string;
  timestamp: string;
  data: Record<string, any>[] | any;
}

export interface MRFFileInfo {
  name: string;
  size: number;
  created: Date;
  modified: Date;
}

export interface UploadResponse {
  success: boolean;
  filename: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}

export type APIResponse<T> = Response & {
  data?: T;
  error?: ErrorResponse;
}