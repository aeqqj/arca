export interface DepartmentDetailResponse {
  id: number;
  name: string;
  school_id: number;
  school_name: string;
}

export interface DepartmentRequest {
  id?: number;        // optional if creating, required if updating
  name: string;
  school_id: number;
  school_name: string;
}

export interface DepartmentResponse {
  id: number;
  name: string;
}
