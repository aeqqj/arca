import type { FileResponse } from "./File";

export interface PostResponse {
    id: number;
    post_id: number;
    version: number;
    title: string;
    content: string;
    status: string;
    user_id: number;
    first_name: string;
    last_name: string;
    department_id: number;
    department_name: string;
    post_tag?: string;
    rejection_reason?: string;
    is_latest_version: boolean;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    upvote_count: number;
    downvote_count: number;
    files: FileResponse[];
}

export interface PostApprovalRequest {
    approved: boolean;
    rejection_reason?: string;
}

export interface PostRequest {
    title: string;          // max 30 chars
    content: string;
    user_id: number;
    department_id: number;
    post_tag?: number;
}

export interface PostUpdateRequest {
    title?: string;     // optional, max 30 chars
    content?: string;   // optional
    post_tag?: string;  // optional
}
