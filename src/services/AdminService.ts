import axios from "axios";
import type { User } from '@/types/User';

const API_URL = import.meta.env.VITE_API_BASE_URL + "/admin";

export interface RoleRequest {
    role: string;
}

export interface BanEmailRequest {
    email: string;
    reason: string;
}

export interface SuccessResponse {
    message: string;
}

export interface ErrorResponse {
    error: string;
}

export const AdminService = {
    // Users
    getAllUsers: async (): Promise<User[]> => {
        const res = await axios.get<User[]>(`${API_URL}/users`);
        return res.data;
    },

    getUser: async (id: number): Promise<User> => {
        const res = await axios.get<User>(`${API_URL}/users/${id}`);
        return res.data;
    },

    createAdmin: async (user: { email: string; password: string; first_name: string; last_name: string }): Promise<SuccessResponse> => {
        const res = await axios.post<SuccessResponse>(`${API_URL}/create-admin`, user);
        return res.data;
    },

    promoteToAdmin: async (id: number): Promise<SuccessResponse> => {
        const res = await axios.put<SuccessResponse>(`${API_URL}/users/${id}/promote`);
        return res.data;
    },

    demoteFromAdmin: async (id: number): Promise<SuccessResponse> => {
        const res = await axios.put<SuccessResponse>(`${API_URL}/users/${id}/demote`);
        return res.data;
    },

    addRole: async (id: number, role: string): Promise<SuccessResponse> => {
        const res = await axios.put<SuccessResponse>(`${API_URL}/users/${id}/roles/add`, { role });
        return res.data;
    },

    removeRole: async (id: number, role: string): Promise<SuccessResponse> => {
        const res = await axios.put<SuccessResponse>(`${API_URL}/users/${id}/roles/remove`, { role });
        return res.data;
    },

    deleteUser: async (id: number): Promise<SuccessResponse> => {
        const res = await axios.delete<SuccessResponse>(`${API_URL}/users/${id}`);
        return res.data;
    },

    // Banned emails
    listBannedEmails: async (): Promise<BanEmailRequest[]> => {
        const res = await axios.get<BanEmailRequest[]>(`${API_URL}/banned-emails`);
        return res.data;
    },

    banEmail: async (request: BanEmailRequest): Promise<SuccessResponse> => {
        const res = await axios.post<SuccessResponse>(`${API_URL}/banned-emails`, request);
        return res.data;
    },

    unbanEmail: async (email: string): Promise<SuccessResponse> => {
        const res = await axios.delete<SuccessResponse>(`${API_URL}/banned-emails/${email}`);
        return res.data;
    },
};
