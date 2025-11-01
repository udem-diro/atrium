export type UserRole = "student" | "professor" | "admin";

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    department?: string;
    profilePicture?: string;
    createdAt: string;
}
