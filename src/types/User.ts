export interface User {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    course: string;
    department: string;
    bio: string | null;
    profile_picture: string;
    deleted_at: string | null;
    roles: string[];
    deleted: boolean;
}
