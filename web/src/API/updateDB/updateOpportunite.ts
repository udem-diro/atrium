import { supabase } from "../supabaseClient.tsx";

export async function addOpportunite(opportunite: any) {
  return await supabase.from("opportunites").insert([opportunite]).select();
}

export async function getAllOpportunites() {
  return await supabase
    .from("opportunites")
    .select("*")
    .order("id_opportunite", { ascending: true });
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

// Function using a view on supabase to get the 6 top departments for quick
// filters on the home page
export async function fetchTopDepartments() {
  const { data, error } = await supabase.from("top_departments").select("*");

  if (error) {
    console.error("Error fetching top departments:", error);
    return [];
  }

  return data as { department: string; count: number }[];
}
