import OppotunityCard from "../../components/OppotunityCard";
import { supabase } from "../../API/supabaseClient.tsx";
import { useEffect, useState } from "react";
import type { Opportunity } from "../../models/Opportunity.ts";
import { useStore } from "../../hooks/useStore.ts";
import { getStore } from "../../utils/Store.ts";

function OpportunitiesList() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const searchQuery = useStore((s) => s.searchQuery);
  const dropdownFilter = useStore((s) => s.dropdownFilter);
  const sortOrder = useStore((s) => s.sortOrder);
  const selectedDepartments = useStore((s) => s.selectedDepartments);
  const store = getStore();

  // need to fetch the data of opportunities from supabase
  // then render each Card with the data I get
  // TODO : USE API Functions to fetch data from supabase
  async function fetchOpportunities() {
    const { data, error } = await supabase
      .from("opportunites")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching opportunities:", error);
      return;
    }
    setOpportunities((data ?? []) as Opportunity[]);
  }

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Filter results based on search query + Filters
  const filteredOpportunities = opportunities
    .filter((opp) => {
      const q = searchQuery.toLowerCase();

      // 1. SEARCH FILTER - Extended fields
      const matchesSearch =
        opp.titre?.toLowerCase().includes(q) ||
        opp.description?.toLowerCase().includes(q) ||
        opp.department?.toLowerCase().includes(q) ||
        opp.type?.toLowerCase().includes(q) ||
        opp.location?.toString().toLowerCase().includes(q) ||
        opp.duree?.toLowerCase().includes(q) ||
        // Search in skills array
        (opp.skills &&
          opp.skills.some((skill) => skill.toLowerCase().includes(q)));

      // 2. DROPDOWN FILTER
      let matchesDropdown = true; // default (for "All")
      if (dropdownFilter !== "All Opportunities") {
        matchesDropdown = opp.type === dropdownFilter;
      }

      // 3. QUICK DEPARTMENT FILTERS (multi-select)
      let matchesDepartments = true; // default: no department selected = show all
      if (selectedDepartments.length > 0) {
        matchesDepartments = selectedDepartments.includes(opp.department);
      }

      return matchesSearch && matchesDropdown && matchesDepartments;
    })
    .sort((a, b) => {
      switch (sortOrder) {
        case "Most recent":
          const updatedA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const updatedB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return updatedB - updatedA; // newest first

        case "Deadline soon":
          const expA = a.expiration
            ? new Date(a.expiration).getTime()
            : Infinity;
          const expB = b.expiration
            ? new Date(b.expiration).getTime()
            : Infinity;
          return expA - expB; // earliest expiration first

        default:
          return 0;
      }
    });

  useEffect(() => {
    store.setNbrOfResults(filteredOpportunities.length);
  }, [filteredOpportunities]);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6">
      {filteredOpportunities.map((opp) => (
        <OppotunityCard key={opp.id_opportunite} opportunity={opp} />
      ))}
    </div>
  );
}

export default OpportunitiesList;
