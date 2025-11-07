import { supabase } from "../supabaseClient";

export async function getProgrammes() {
  return await supabase.from("programme").select("*").order("id_programme");
}
export async function addProgramme(programme: { id_programme: number; nom: string; description?: string }) {
  return await supabase.from("programme").insert([programme]).select();
}

export async function deleteProgramme(id_programme: number) {
  return await supabase.from("programme").delete().eq("id_programme", id_programme);
}
