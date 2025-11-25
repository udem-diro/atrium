import { supabase } from "../supabaseClient.tsx";

export async function addOpportunite(opportunite: any) {
  return await supabase.from("opportunites").insert([opportunite]).select();
}

export async function getAllOpportunites() {
  return await supabase
    .from("opportunites")
    .select(
      `*,
      professeur (nom),
      administration (nom)
    `
    )
    .order("id_opportunite", { ascending: false });
}

export async function deleteOpportunite(id_opportunite: number) {
  return await supabase
    .from("opportunites")
    .delete()
    .eq("id_opportunite", id_opportunite);
}

export async function getOpportunity(id_opportunite: string | number) {
  const { data, error } = await supabase
    .from("opportunites")
    .select("*")
    .eq("id_opportunite", id_opportunite)
    .single();

  if (error) throw error;

  return data;
}
