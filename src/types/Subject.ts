export interface Subject {
    id: number;
    code: string;
    name: string;
}

export interface DepartmentSubject {
    department_id: number;
    subject_id: number;
}
