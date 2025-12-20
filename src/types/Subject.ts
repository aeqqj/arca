import type { DepartmentResponse } from "@/types/Department";

export interface SubjectResponse {
  id: number;
  code: string;
  name: string;
  aliases?: string[];
  departments: DepartmentResponse[];
}

export interface SubjectRequest {
    code: string;
    name: string;
    aliases?: string[];
    department_ids: number[];
}
