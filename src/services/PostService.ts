import { api } from "@/services/Api";
import type { PostRequest } from "@/types/Post";
import type { PostUpdateRequest } from "@/types/Post";
import type { PostApprovalRequest } from "@/types/Post";
import type { PostResponse } from "@/types/Post";

const API_URL = "/posts";

export const PostService = {
    getPost: async (postId: number): Promise<PostResponse> => {
        const res = await api.get<PostResponse>(`${API_URL}/${postId}`);
        return res.data;
    },
    
    getAllUserPost: async (userId: number): Promise<PostResponse[]> => {
        const res = await api.get<PostResponse[]>(`${API_URL}/user/${userId}`);
        return res.data;
    },
    
    getAllDepartmentPost: async (departmentId: number): Promise<PostResponse[]> => {
        const res = await api.get<PostResponse[]>(`${API_URL}/department/${departmentId}`);
        return res.data;
    },
    
    createPost: async (newPost: PostRequest): Promise<PostResponse> => {
        const res = await api.post<PostResponse>(API_URL, newPost);
        return res.data;
    },
    
    updatePost: async (postId: number, updatedPost: PostUpdateRequest): Promise<string> => {
        const res = await api.put<string>(`${API_URL}/${postId}`, updatedPost);
        return res.data;
    },
    
    deletePost: async (postId: number): Promise<string> => {
        const res = await api.delete<string>(`${API_URL}/${postId}`);
        return res.data;
    },
    
    getAllPendingApprovalPosts: async (): Promise<PostResponse[]> => {
        const res = await api.get<PostResponse[]>(`${API_URL}/pending`);
        return res.data;
    },
    
    approvePost: async (postId: number, approvalRequest: PostApprovalRequest): Promise<string> => {
        const res = await api.post<string>(`${API_URL}/${postId}/approve`, approvalRequest);
        return res.data;
    },
    
    getPendingPostsByDepartment: async (departmentId: number): Promise<PostResponse[]> => {
        const res = await api.get<PostResponse[]>(`${API_URL}/pending/department/${departmentId}`);
        return res.data;
    },
    
    // === Version History ===
    getPostHistory: async (postId: number): Promise<PostResponse[]> => {
        const res = await api.get<PostResponse[]>(`${API_URL}/history/${postId}`);
        return res.data;
    },
};
