import type { FileResponse } from "./File";

export interface PostResponse {
  id: number;
  postId: number;
  version: number;
  title: string;
  content: string;
  status: string;
  userId: number;
  firstName: string;
  lastName: string;
  departmentId: number;
  departmentName: string;
  postTags: string[];
  rejectionReason: string | null;
  isLatestVersion: boolean;  // Note: camelCase in TypeScript/JSON
  createdAt: string;  // ISO date string from LocalDateTime
  updatedAt: string;  // ISO date string from LocalDateTime
  upvoteCount: number;
  downvoteCount: number;
  files: FileResponse[];
}

export interface PostApprovalRequest {
  approved: boolean;
  rejectionReason?: string;
}

export interface PostRequest {
  title: string;
  content: string;
  userId: number;
  departmentId: number;
  postTags?: number[];
}

export interface PostUpdateRequest {
  title?: string;
  content?: string;
  postTags?: number[];
}
