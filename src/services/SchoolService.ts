import axios from "axios";
import type { SchoolRequest } from "@/types/School";
import type { SchoolResponse } from "@/types/School";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/schools";

export const SchoolService = {
  addSchool: async (request: SchoolRequest): Promise<SchoolResponse> => {
    const res = await axios.post<SchoolResponse>(`${API_URL}/add`, request);
    return res.data;
  },

  getAllSchools: async (): Promise<SchoolResponse[]> => {
    const res = await axios.get<SchoolResponse[]>(API_URL);
    return res.data;
  },

  editSchool: async (id: number, request: SchoolRequest): Promise<SchoolResponse> => {
    const res = await axios.put<SchoolResponse>(`${API_URL}/edit/${id}`, request);
    return res.data;
  },

  deleteSchool: async (id: number): Promise<string> => {
    const res = await axios.delete<string>(`${API_URL}/delete/${id}`);
    return res.data;
  },
};
