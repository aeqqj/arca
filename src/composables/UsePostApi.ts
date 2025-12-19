import { api } from '@/services/Api';
import type { PostType, PostRequest, PostUpdateRequest, PostApprovalRequest } from '@/types/Post';

const API_BASE = '/posts';

export const usePostApi = () => {
    const getPost = async (postId: number): Promise<PostType> => {
        try {
            const { data } = await api.get<PostType>(`${API_BASE}/${postId}`);
            return data;
        } catch (err: any) {
            console.error('Failed to fetch post:', err);
            throw new Error(err.response?.data?.error || 'Failed to fetch post');
        }
    };

    const getAllUserPosts = async (userId: number): Promise<PostType[]> => {
        try {
            const { data } = await api.get<PostType[]>(`${API_BASE}/user/${userId}`);
            return data;
        } catch (err: any) {
            console.error('Failed to fetch user posts:', err);
            throw new Error(err.response?.data?.error || 'Failed to fetch user posts');
        }
    };

    const getAllDepartmentPosts = async (departmentId: number): Promise<PostType[]> => {
        try {
            const { data } = await api.get<PostType[]>(`${API_BASE}/department/${departmentId}`);
            return data;
        } catch (err: any) {
            console.error('Failed to fetch department posts:', err);
            throw new Error(err.response?.data?.error || 'Failed to fetch department posts');
        }
    };

    const createPost = async (newPost: PostRequest): Promise<string> => {
        try {
            const { data } = await api.post<string>(API_BASE, newPost);
            return data;
        } catch (err: any) {
            console.error('Failed to create post:', err);
            throw new Error(err.response?.data?.error || 'Failed to create post');
        }
    };

    const updatePost = async (postId: number, updatedPost: PostUpdateRequest): Promise<string> => {
        try {
            const { data } = await api.put<string>(`${API_BASE}/${postId}`, updatedPost);
            return data;
        } catch (err: any) {
            console.error('Failed to update post:', err);
            throw new Error(err.response?.data?.error || 'Failed to update post');
        }
    };

    const deletePost = async (postId: number): Promise<string> => {
        try {
            const { data } = await api.delete<string>(`${API_BASE}/${postId}`);
            return data;
        } catch (err: any) {
            console.error('Failed to delete post:', err);
            throw new Error(err.response?.data?.error || 'Failed to delete post');
        }
    };

    const getAllPendingApprovalPosts = async (): Promise<PostType[]> => {
        try {
            const { data } = await api.get<PostType[]>(`${API_BASE}/pending`);
            return data;
        } catch (err: any) {
            console.error('Failed to fetch pending posts:', err);
            throw new Error(err.response?.data?.error || 'Failed to fetch pending posts');
        }
    };

    const approvePost = async (postId: number, approvalRequest: PostApprovalRequest): Promise<string> => {
        try {
            const { data } = await api.post<string>(`${API_BASE}/${postId}/approve`, approvalRequest);
            return data;
        } catch (err: any) {
            console.error('Failed to approve post:', err);
            throw new Error(err.response?.data?.error || 'Failed to approve post');
        }
    };

    const getPendingPostsByDepartment = async (departmentId: number): Promise<PostType[]> => {
        try {
            const { data } = await api.get<PostType[]>(`${API_BASE}/pending/department/${departmentId}`);
            return data;
        } catch (err: any) {
            console.error('Failed to fetch pending posts by department:', err);
            throw new Error(err.response?.data?.error || 'Failed to fetch pending posts by department');
        }
    };

    const getPostHistory = async (postId: number): Promise<PostType[]> => {
        try {
            const { data } = await api.get<PostType[]>(`${API_BASE}/history/${postId}`);
            return data;
        } catch (err: any) {
            console.error('Failed to fetch post history:', err);
            throw new Error(err.response?.data?.error || 'Failed to fetch post history');
        }
    };

    return {
        getPost,
        getAllUserPosts,
        getAllDepartmentPosts,
        createPost,
        updatePost,
        deletePost,
        getAllPendingApprovalPosts,
        approvePost,
        getPendingPostsByDepartment,
        getPostHistory
    };
};
