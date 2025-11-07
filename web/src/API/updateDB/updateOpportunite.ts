import { supabase } from "../supabaseClient.tsx";

export async function addOpportunite(opportunite: any) {
  return await supabase.from("opportunites").insert([opportunite]).select();
}

export async function getOpportunites() {
  return await supabase.from("opportunites").select(`*,
      professeur (nom),
      administration (nom)
    `)
    .order("id_opportunite", { ascending: false });
}

export async function deleteOpportunite(id_opportunite: number) {
  return await supabase.from("opportunites").delete().eq("id_opportunite", id_opportunite);
}