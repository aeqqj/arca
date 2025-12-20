import { api } from "@/services/Api"; // Import your existing axios instance
import type { User } from "@/types/User";
import type { ProfilePictureResponse } from "@/types/ProfilePicture";

const API_URL = "/user"; // Remove the base URL part since it's already in the api instance

export const UserService = {
    getUserDetails: async (userId: number): Promise<User> => {
        const res = await api.get<User>(`${API_URL}/${userId}`);
        return res.data;
    },

    getAllUsers: async (): Promise<User[]> => {
        const res = await api.get<User[]>(API_URL);
        return res.data;
    },

    createUser: async (user: User): Promise<string> => {
        const res = await api.post<string>(API_URL, user);
        return res.data;
    },

    updateUser: async (userId: number, user: User): Promise<string> => {
        const res = await api.put<string>(`${API_URL}/${userId}`, user);
        return res.data;
    },

    deleteUser: async (userId: number): Promise<string> => {
        const res = await api.delete<string>(`${API_URL}/${userId}`);
        return res.data;
    },

    updateProfilePicture: async (userId: number, file: File): Promise<ProfilePictureResponse> => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await api.put<ProfilePictureResponse>(
            `${API_URL}/${userId}/profile-picture`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return res.data;
    },
};
