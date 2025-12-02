import { supabase } from "../supabaseClient";
import type { Professor } from "../../models/Professor";

export async function getProfesseurs() {
  return await supabase.from("professeur").select("*").order("id_professeur");
}

export async function addProfesseur(professeur: {
  id_professeur: number;
  courriel: string;
  nom: string;
  site_web?: string;
  disponible: boolean;
  bio?: string;
  photo_profil?: string;
  last_modified?: string;
}) {
  return await supabase.from("professeur").insert([professeur]).select();
}

export async function deleteProfesseur(id_professeur: number) {
  return await supabase
    .from("professeur")
    .delete()
    .eq("id_professeur", id_professeur);
}

export async function updateProfesseur(
  id_professeur: number,
  professeur: {
    courriel: string;
    nom: string;
    site_web?: string;
    disponible: boolean;
    bio?: string;
    photo_profil?: string;
    last_modified?: string;
  }
) {
  return await supabase
    .from("professeur")
    .update(professeur)
    .eq("id_professeur", id_professeur)
    .select();
}

export async function getProfessorByUUID(id: string) {
  const { data, error } = await supabase
    .from("professeur")
    .select("*")
    .eq("UUID", id)
    .single();

  // Add the role field to match the interface
  if (data) {
    return { data: { ...data, role: "professor" as const }, error: null };
  }

  return { data: null, error };
}

export async function getProfesseur(id: number) {
  const { data, error } = await supabase
    .from("professeur")
    .select("*")
    .eq("id_professeur", id)
    .maybeSingle<Professor>();

  if (error) throw error;
  return data;
}

export async function updateProfessorInfo(
  professorId: number,
  updatedData: Partial<{
    nom: string;
    courriel: string;
    site_web: string | null;
    disponible: boolean;
    bio: string | null;
    photo_profil: string | null;
  }>
) {
  const { data, error } = await supabase
    .from("professeur")
    .update({
      ...updatedData,
      last_modified: new Date().toISOString(),
    })
    .eq("id_professeur", professorId)
    .select()
    .single();

  return { data, error };
}

// Update profile picture
export async function updateProfessorProfilePicture(
  professorId: number,
  url: string
) {
  const { data, error } = await supabase
    .from("professeur")
    .update({ photo_profil: url, last_modified: new Date().toISOString() })
    .eq("id_professeur", professorId)
    .select()
    .single();

  return { data, error };
}
