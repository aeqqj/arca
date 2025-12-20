import { api } from "@/services/Api";
import type { SubjectRequest } from "@/types/Subject";
import type { SubjectResponse } from "@/types/Subject";

const API_URL = "/subject";

export const SubjectService = {
  getAllSubjects: async (): Promise<SubjectResponse[]> => {
    const res = await api.get<SubjectResponse[]>(API_URL);
    return res.data;
  },
  
  getSubjectDetails: async (subjectId: number): Promise<SubjectResponse> => {
    const res = await api.get<SubjectResponse>(`${API_URL}/${subjectId}`);
    return res.data;
  },
  
  createSubject: async (request: SubjectRequest): Promise<SubjectResponse> => {
    const res = await api.post<SubjectResponse>(API_URL, request);
    return res.data;
  },
  
  updateSubject: async (subjectId: number, request: SubjectRequest): Promise<SubjectResponse> => {
    const res = await api.put<SubjectResponse>(`${API_URL}/${subjectId}`, request);
    return res.data;
  },
  
  deleteSubject: async (subjectId: number): Promise<void> => {
    await api.delete(`${API_URL}/${subjectId}`);
  },
};
