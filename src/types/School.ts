import type { DepartmentResponse } from "@/types/Department";

export interface SchoolResponse {
    id: number;
    name: string;
    departments: DepartmentResponse[];
}

export interface SchoolRequest {
    name: string;
}
