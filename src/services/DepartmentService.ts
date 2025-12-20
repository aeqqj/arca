import { api } from "@/services/Api";
import type { DepartmentRequest } from "@/types/Department";
import type { DepartmentDetailResponse } from "@/types/Department";

const API_URL = "/departments";

export const DepartmentService = {
    getDepartment: async (id: number): Promise<DepartmentDetailResponse> => {
        const res = await api.get<DepartmentDetailResponse>(`${API_URL}/${id}`);
        return res.data;
    },
    
    getAllDepartments: async (): Promise<DepartmentDetailResponse[]> => {
        const res = await api.get<DepartmentDetailResponse[]>(API_URL);
        return res.data;
    },
    
    createDepartment: async (request: DepartmentRequest): Promise<DepartmentDetailResponse> => {
        const res = await api.post<DepartmentDetailResponse>(API_URL, request);
        return res.data;
    },
    
    updateDepartment: async (id: number, request: DepartmentRequest): Promise<DepartmentDetailResponse> => {
        const res = await api.put<DepartmentDetailResponse>(`${API_URL}/${id}`, request);
        return res.data;
    },
    
    deleteDepartment: async (id: number): Promise<void> => {
        await api.delete(`${API_URL}/${id}`);
    },
};
