import EditableAvailability from "../../components/professor_profile_components/EditableAvailability";
import type { Professor } from "../../models/Professor";

interface ProfessorAvailabilityTabProps {
  professor: Professor;
  isOwnProfile?: boolean;
  onUpdate: (updatedData: Partial<Professor>) => void;
}

function ProfessorAvailabilityTab({
  professor,
  isOwnProfile = false,
  onUpdate,
}: ProfessorAvailabilityTabProps) {
  return (
    <EditableAvailability
      professor={professor}
      isOwnProfile={isOwnProfile}
      onUpdate={onUpdate}
    />
  );
}

export default ProfessorAvailabilityTab;
