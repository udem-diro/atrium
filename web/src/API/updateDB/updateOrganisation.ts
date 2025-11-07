import {supabase} from "../supabaseClient.tsx";

export async function addOrganisation(organisation: {
  id_organisation: number;
  nom: string;
  representant?: string;
  contact: string;
}) {
  return await supabase.from("organisation").insert([organisation]).select();
}

export async function getOrganisations() {
  return await supabase.from("organisation").select("*").order("id_organisation");
}

export async function deleteOrganisation(id_organisation: number) {
  return await supabase.from("organisation").delete().eq("id_organisation", id_organisation);
}