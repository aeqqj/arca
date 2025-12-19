import axios from 'axios';
import type { PostType, PostApprovalRequest, PostRequest, PostUpdateRequest } from '@/types/Post';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // https://arca-292333624176.asia-east2.run.app/api
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken'); // <- JWT saved in localStorage after login
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const postService = {
  // Get single post (latest version)
  async getPost(postId: number): Promise<PostType> {
    const { data } = await api.get<PostType>(`/posts/${postId}`);
    return data;
  },

  // Get post history (all versions)
  async getPostHistory(postId: number): Promise<PostType[]> {
    const { data } = await api.get<PostType[]>(`/posts/history/${postId}`);
    return data;
  },

  // Get all user posts
  async getAllUserPosts(userId: number): Promise<PostType[]> {
    const { data } = await api.get<PostType[]>(`/posts/user/${userId}`);
    return data;
  },

  // Get all department posts
  async getAllDepartmentPosts(departmentId: number): Promise<PostType[]> {
    const { data } = await api.get<PostType[]>(`/posts/department/${departmentId}`);
    return data;
  },

  // Get pending posts
  async getPendingPosts(): Promise<PostType[]> {
    const { data } = await api.get<PostType[]>('/posts/pending');
    return data;
  },

  // Get pending posts by department
  async getPendingPostsByDepartment(departmentId: number): Promise<PostType[]> {
    const { data } = await api.get<PostType[]>(`/posts/pending/department/${departmentId}`);
    return data;
  },

  // Create post
  async createPost(newPost: PostRequest): Promise<string> {
    const { data } = await api.post<string>('/posts', newPost);
    return data;
  },

  // Update post
  async updatePost(postId: number, updatedPost: PostUpdateRequest): Promise<string> {
    const { data } = await api.put<string>(`/posts/${postId}`, updatedPost);
    return data;
  },

  // Delete post
  async deletePost(postId: number): Promise<string> {
    const { data } = await api.delete<string>(`/posts/${postId}`);
    return data;
  },

  // Approve post
  async approvePost(postId: number, approval: PostApprovalRequest): Promise<string> {
    const { data } = await api.post<string>(`/posts/${postId}/approve`, approval);
    return data;
  },
};
