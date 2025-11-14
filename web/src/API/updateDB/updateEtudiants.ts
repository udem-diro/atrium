import {supabase} from "../supabaseClient";

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
  }) {
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
  return await supabase.from("Etudiants").delete().eq("id_etudiant", id_etudiant);
}