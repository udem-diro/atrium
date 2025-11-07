import { supabase } from "../supabaseClient";

export async function getCours() {
  return await supabase.from("cours").select("*").order("sigle_cours");
}

export async function addCours(cours: { sigle_cours: number; nom: string; nb_credits: number; description?: string }) {
  return await supabase.from("cours").insert([cours]).select();
}

export async function deleteCours(sigle_cours: number) {
  return await supabase.from("cours").delete().eq("sigle_cours", sigle_cours);
}

