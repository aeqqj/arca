import { api } from "@/services/Api";
import type { FileUploadRequest } from "@/types/File";
import type { MultipleFileUploadRequest } from "@/types/File";

const API_URL = "/files";

export const FileService = {
    uploadFiles: async (
        files: File[],
        userId: number,
        postId: number
    ): Promise<MultipleFileUploadRequest> => {
        const formData = new FormData();
        files.forEach((file) => formData.append("file", file));
        formData.append("user_id", userId.toString());
        formData.append("post_id", postId.toString());

        const res = await api.post<MultipleFileUploadRequest>(
            `${API_URL}/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return res.data;
    },

    downloadFile: async (id: number): Promise<Blob> => {
        const res = await api.get(`${API_URL}/download/${id}`, {
            responseType: "blob",
        });
        return res.data;
    },

    getFileInfo: async (id: number): Promise<FileUploadRequest | null> => {
        try {
            const res = await api.get<FileUploadRequest>(`${API_URL}/${id}`);
            return res.data;
        } catch (err: any) {
            if (err.response && err.response.status === 404) return null;
            throw err;
        }
    },
};
