import EditableResearchAreas from "../../components/professor_profile_components/EditableResearchAreas";
import type { Professor } from "../../models/Professor";

interface ProfessorResearchAreaTabProps {
  professor: Professor;
  isOwnProfile: boolean;
  onUpdate: (updatedData: Partial<Professor>) => void;
}

function ProfessorResearchAreaTab({
  professor,
  isOwnProfile = false,
  onUpdate,
}: ProfessorResearchAreaTabProps) {
  const handleResearchAreasUpdate = (areas: string[]) => {
    onUpdate({ research_areas: areas });
  };

  return (
    <EditableResearchAreas
      professorId={professor.id_professeur}
      researchAreas={professor.research_areas || []}
      isOwnProfile={isOwnProfile}
      onUpdate={handleResearchAreasUpdate}
    />
  );
}

export default ProfessorResearchAreaTab;
