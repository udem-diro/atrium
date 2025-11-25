import OppotunityCard from "../../components/OppotunityCard";
import { supabase } from "../../API/supabaseClient.tsx";
import { useEffect, useState } from "react";
import type { Opportunity } from "../../models/Opportunity.ts";
import { useStore } from "../../hooks/useStore.ts";

function OpportunitiesList() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const searchQuery = useStore((s) => s.searchQuery);

  // need to fetch the data of opportunities from supabase
  // then render each Card with the data I get
  async function fetchOpportunities() {
    const { data, error } = await supabase
      .from("opportunites")
      .select("*")
      .order("expiration", { ascending: true });

    if (error) {
      console.error("Error fetching opportunities:", error);
      return;
    }
    setOpportunities((data ?? []) as Opportunity[]);
  }

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Filter results based on search query
  const filteredOpportunities = opportunities.filter((opp) => {
    const q = searchQuery.toLowerCase();

    return (
      opp.titre?.toLowerCase().includes(q) ||
      opp.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6">
      {filteredOpportunities.map((opp) => (
        <OppotunityCard key={opp.id_opportunite} opportunity={opp} />
      ))}
    </div>
  );
}

export default OpportunitiesList;
