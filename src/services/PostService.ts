import axios from 'axios';
import type { PostResponse } from '@/types/Post';

const api = axios.create({
  baseURL: '/api', // or 'http://localhost:8080/api' for development
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postService = {
  // Get single post (latest version)
  async getPost(postId: number): Promise<PostResponse> {
    const { data } = await api.get<PostResponse>(`/posts/${postId}`);
    return data;
  },

  // Get post history (all versions)
  async getPostHistory(postId: number): Promise<PostResponse[]> {
    const { data } = await api.get<PostResponse[]>(`/posts/history/${postId}`);
    return data;
  },

  // Get all user posts
  async getAllUserPosts(userId: number): Promise<PostResponse[]> {
    const { data } = await api.get<PostResponse[]>(`/posts/user/${userId}`);
    return data;
  },

  // Get all department posts
  async getAllDepartmentPosts(departmentId: number): Promise<PostResponse[]> {
    const { data } = await api.get<PostResponse[]>(`/posts/department/${departmentId}`);
    return data;
  },

  // Get pending posts
  async getPendingPosts(): Promise<PostResponse[]> {
    const { data } = await api.get<PostResponse[]>('/posts/pending');
    return data;
  },

  // Get pending posts by department
  async getPendingPostsByDepartment(departmentId: number): Promise<PostResponse[]> {
    const { data } = await api.get<PostResponse[]>(`/posts/pending/department/${departmentId}`);
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
