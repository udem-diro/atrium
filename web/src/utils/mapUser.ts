import type { User } from "../models/User";

export function mapStudentToUser(dbStudent: any, authUser: any): User {
  return {
    id: String(dbStudent.id_etudiant),
    email: dbStudent.courriel,
    firstName: dbStudent.nom,
    lastName: "", // You can improve this later
    role: "student",
    department: dbStudent.programme_id ? String(dbStudent.programme_id) : undefined,
    profilePicture: dbStudent.photo_profil || undefined,
    createdAt: authUser.created_at,
  };
}