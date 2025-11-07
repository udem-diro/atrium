import { supabase } from "../supabaseClient";

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
  return await supabase.from("professeur").delete().eq("id_professeur", id_professeur);
}