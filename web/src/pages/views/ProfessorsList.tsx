import ProfessorCard from "../../components/ProfessorCard";
import { useStore } from "../../hooks/useStore.ts";
import type { Professor } from "../../models/Professor.ts";
import { useState, useEffect } from "react";
import { supabase } from "../../API/supabaseClient.tsx";
import { getStore } from "../../utils/Store.ts";

function ProfessorsList() {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const searchQuery = useStore((s) => s.searchQuery);
  const store = getStore();

  // need to fetch the list of professors from supabase
  // then render each Card with the data I get
  async function fetchProfessors() {
    const { data, error } = await supabase
      .from("professeur")
      .select("*")
      .order("nom", { ascending: true });

    if (error) {
      console.error("Error fetching opportunities:", error);
      return;
    }
    setProfessors((data ?? []) as Professor[]);
  }

  useEffect(() => {
    fetchProfessors();
  }, []);

  // Filter results based on search query - Extended fields
  const filteredProfessors = professors.filter((prof) => {
    const q = searchQuery.toLowerCase();

    return (
      prof.nom?.toLowerCase().includes(q) ||
      prof.courriel?.toLowerCase().includes(q) ||
      prof.bio?.toLowerCase().includes(q) ||
      prof.available_semester?.toLowerCase().includes(q) ||
      prof.additional_info?.toLowerCase().includes(q) ||
      // Search in research_areas array
      (prof.research_areas &&
        prof.research_areas.some((area) => area.toLowerCase().includes(q)))
    );
  });

  useEffect(() => {
    store.setNbrOfResults(filteredProfessors.length);
  }, [filteredProfessors]);

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredProfessors.map((prof) => (
        <ProfessorCard key={prof.id_professeur} professor={prof} />
      ))}
    </div>
  );
}

export default ProfessorsList;
