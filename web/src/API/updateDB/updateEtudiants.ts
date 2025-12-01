import { supabase } from "../supabaseClient";
import type { Link, Project } from "../../models/Student";

export async function addEtudiant(etudiant: {
  id_etudiant: number;
  courriel: string;
  nom: string;
  programme_id: number;
  liens?: string;
  cv_url?: string;
  photo_profil?: string;
}) {
  const { data, error } = await supabase
    .from("etudiants")
    .insert([etudiant])
    .select();

  if (error) throw error;
  return data?.[0];
}

// Update a student
export async function updateEtudiant(
  id_etudiant: number,
  etudiant: {
    courriel: string;
    nom: string;
    programme_id: number;
    liens?: string;
    cv_url?: string;
    photo_profil?: string;
  }
) {
  const { data, error } = await supabase
    .from("etudiants")
    .update(etudiant)
    .eq("id_etudiant", id_etudiant)
    .select();

  if (error) throw error;
  return data?.[0];
}

// Delete a student
export async function deleteEtudiant(id_etudiant: number) {
  return await supabase
    .from("Etudiants")
    .delete()
    .eq("id_etudiant", id_etudiant);
}

export async function getStudent(id_etudiant: number) {
  const data = await supabase
    .from("etudiants")
    .select("*")
    .eq("id_etudiant", id_etudiant)
    .single();

  return data;
}

// Gets a student by UUID ( the same as auth.user table)
export async function getStudentByUUID(id: string) {
  const { data, error } = await supabase
    .from("etudiants")
    .select("*")
    .eq("UUID", id)
    .single();

  // add the role field to match the interface Store is expecting to set the connected user
  if (data) {
    return { data: { ...data, role: "student" as const }, error: null };
  }

  return { data, error };
}

// Update student bio
export async function updateStudentBio(id_etudiant: number, bio: string) {
  const { data, error } = await supabase
    .from("etudiants")
    .update({ bio })
    .eq("id_etudiant", id_etudiant)
    .select()
    .single();

  if (error) throw error;
  return { data: { ...data, role: "student" as const }, error: null };
}

// Update academic interests
export async function updateStudentInterests(
  id_etudiant: number,
  interets_academiques: string[]
) {
  const { data, error } = await supabase
    .from("etudiants")
    .update({ interets_academiques })
    .eq("id_etudiant", id_etudiant)
    .select()
    .single();

  if (error) throw error;
  return { data: { ...data, role: "student" as const }, error: null };
}

// Update completed courses
export async function updateStudentCourses(
  id_etudiant: number,
  cours_completes: string[]
) {
  const { data, error } = await supabase
    .from("etudiants")
    .update({ cours_completes })
    .eq("id_etudiant", id_etudiant)
    .select()
    .single();

  if (error) throw error;
  return { data: { ...data, role: "student" as const }, error: null };
}

// Update projects
export async function updateStudentProjects(
  id_etudiant: number,
  projets: Project[]
) {
  const { data, error } = await supabase
    .from("etudiants")
    .update({ projets })
    .eq("id_etudiant", id_etudiant)
    .select()
    .single();

  if (error) throw error;
  return { data: { ...data, role: "student" as const }, error: null };
}

// Update external links
export async function updateStudentLinks(id_etudiant: number, liens: Link[]) {
  const { data, error } = await supabase
    .from("etudiants")
    .update({ liens })
    .eq("id_etudiant", id_etudiant)
    .select()
    .single();

  if (error) throw error;
  return { data: { ...data, role: "student" as const }, error: null };
}
