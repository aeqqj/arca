export interface FileResponse {
    id: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    downloadUrl: string;  // e.g., "/api/files/123/download"
}

export interface FileUploadRequest {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  userId: number;
  postId: number;
  message: string;
}

export interface MultipleFileUploadRequest {
  files: FileUploadRequest[];
  message: string;
}
