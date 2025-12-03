import { useEffect, useState } from "react";
import { supabase } from "../../API/supabaseClient.tsx";
import type { Opportunity } from "../../models/Opportunity.ts";
import ProfessorOpportunityCard from "./ProfessorOpportunityCard";
import { getStore } from "../../utils/Store.ts";

interface ProfessorOpportunitiesListProps {
  professorId: number;
  isOwnProfile?: boolean;
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (opportunityId: number) => void;
}

function ProfessorOpportunitiesList({
  professorId,
  isOwnProfile = false,
  onEdit,
  onDelete,
}: ProfessorOpportunitiesListProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const store = getStore();

  async function fetchProfessorOpportunities() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("opportunites")
        .select("*")
        .eq("professeur_id", professorId)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching opportunities:", error);
        store.addNotification("Failed to load opportunities", "error");
        return;
      }

      setOpportunities((data ?? []) as Opportunity[]);
    } catch (err) {
      console.error("Error:", err);
      store.addNotification("An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProfessorOpportunities();
  }, [professorId]);

  const handleDeleteClick = async (opportunityId: number) => {
    if (!confirm("Are you sure you want to delete this opportunity?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("opportunites")
        .delete()
        .eq("id_opportunite", opportunityId);

      if (error) throw error;

      setOpportunities((prev) =>
        prev.filter((opp) => opp.id_opportunite !== opportunityId)
      );
      store.addNotification("Opportunity deleted successfully", "success");
      onDelete(opportunityId);
    } catch (err) {
      console.error("Error deleting opportunity:", err);
      store.addNotification("Failed to delete opportunity", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading opportunities...</div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 mb-2">No opportunities posted yet</p>
        {isOwnProfile && (
          <p className="text-sm text-gray-400">
            Click "Create New Opportunity" to get started
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6">
      {opportunities.map((opp) => (
        <ProfessorOpportunityCard
          key={opp.id_opportunite}
          opportunity={opp}
          isOwnProfile={isOwnProfile}
          onEdit={() => onEdit(opp)}
          onDelete={() => handleDeleteClick(opp.id_opportunite)}
        />
      ))}
    </div>
  );
}

export default ProfessorOpportunitiesList;
