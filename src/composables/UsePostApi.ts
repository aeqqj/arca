import axios from 'axios';
import type { PostResponse, PostRequest, PostUpdateRequest, PostApprovalRequest } from '@/types/Post';

export const usePostApi = () => {
  const API_BASE = '/api/posts';

  const getPost = async (postId: number): Promise<PostResponse> => {
    const { data } = await axios.get<PostResponse>(`${API_BASE}/${postId}`);
    return data;
  };

  const getAllUserPosts = async (userId: number): Promise<PostResponse[]> => {
    const { data } = await axios.get<PostResponse[]>(`${API_BASE}/user/${userId}`);
    return data;
  };

  const getAllDepartmentPosts = async (departmentId: number): Promise<PostResponse[]> => {
    const { data } = await axios.get<PostResponse[]>(`${API_BASE}/department/${departmentId}`);
    return data;
  };

  const createPost = async (newPost: PostRequest): Promise<string> => {
    const { data } = await axios.post<string>(API_BASE, newPost);
    return data;
  };

  const updatePost = async (postId: number, updatedPost: PostUpdateRequest): Promise<string> => {
    const { data } = await axios.put<string>(`${API_BASE}/${postId}`, updatedPost);
    return data;
  };

  const deletePost = async (postId: number): Promise<string> => {
    const { data } = await axios.delete<string>(`${API_BASE}/${postId}`);
    return data;
  };

  const getAllPendingApprovalPosts = async (): Promise<PostResponse[]> => {
    const { data } = await axios.get<PostResponse[]>(`${API_BASE}/pending`);
    return data;
  };

  const approvePost = async (postId: number, approvalRequest: PostApprovalRequest): Promise<string> => {
    const { data } = await axios.post<string>(`${API_BASE}/${postId}/approve`, approvalRequest);
    return data;
  };

  const getPendingPostsByDepartment = async (departmentId: number): Promise<PostResponse[]> => {
    const { data } = await axios.get<PostResponse[]>(`${API_BASE}/pending/department/${departmentId}`);
    return data;
  };

  const getPostHistory = async (postId: number): Promise<PostResponse[]> => {
    const { data } = await axios.get<PostResponse[]>(`${API_BASE}/history/${postId}`);
    return data;
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
