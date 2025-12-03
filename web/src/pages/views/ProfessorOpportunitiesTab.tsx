import { useState } from "react";
import Button from "../../components/widgets/Button";
import ProfessorOpportunitiesList from "../../components/professor_profile_components/ProfessorOpportunitiesList";
import OpportunityFormModal from "../../components/professor_profile_components/OpportunityFormModal";
import type { Opportunity } from "../../models/Opportunity.ts";

interface ProfessorOpportunitiesTabProps {
  professorId: number;
  isOwnProfile?: boolean;
}

function ProfessorOpportunitiesTab({
  professorId,
  isOwnProfile = false,
}: ProfessorOpportunitiesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setSelectedOpportunity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOpportunity(null);
  };

  const handleSuccess = () => {
    // Trigger a refresh of the opportunities list
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3 md:mb-6">
        <h2 className="font-semibold text-sm md:text-md lg:text-xl">
          Posted Opportunities
        </h2>
        {isOwnProfile && (
          <Button
            buttonText="Create New Opportunity +"
            size="responsive"
            variant="view"
            onClick={handleCreateNew}
          />
        )}
      </div>

      <ProfessorOpportunitiesList
        key={refreshKey}
        professorId={professorId}
        isOwnProfile={isOwnProfile}
        onEdit={handleEdit}
        onDelete={handleSuccess}
      />

      {isOwnProfile && (
        <OpportunityFormModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          opportunity={selectedOpportunity}
          professorId={professorId}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

export default ProfessorOpportunitiesTab;
