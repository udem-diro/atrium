import { useEffect, useState } from "react";
import TabsContainer from "../components/layouts/TabsContainer";
import EditableProfile from "../components/professor_profile_components/EditableProfile.tsx";
import { useStore } from "../hooks/useStore.ts";
import { getStore } from "../utils/Store.ts";
import ProfessorAvailabilityTab from "./views/ProfessorAvailabilityTab.tsx";
import ProfessorResearchAreaTab from "./views/ProfessorResearchAreaTab.tsx";
import ProfessorOpportunitiesTab from "./views/ProfessorOpportunitiesTab.tsx";
import { useParams } from "react-router-dom";
import type { Professor } from "../models/Professor.ts";
import { getProfesseur } from "../API/updateDB/updateProfesseur.ts";

function ProfessorProfilePage() {
  const selectedTab = useStore((s) => s.selectedTab);
  const connectedUser = useStore((s) => s.auth.connectedUser);
  const { id } = useParams();

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile =
    connectedUser?.role === "professor" &&
    connectedUser?.id_professeur === professor?.id_professeur;

  const handleProfileUpdate = (updatedData: Partial<Professor>) => {
    if (professor) {
      setProfessor({ ...professor, ...updatedData });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      try {
        const prof = await getProfesseur(Number(id));
        setProfessor(prof);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    const store = getStore();
    store.setSelectedTab("Availability & Supervision");
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {professor && (
        <EditableProfile
          professor={professor}
          isOwnProfile={isOwnProfile}
          onUpdate={handleProfileUpdate}
        />
      )}
      <TabsContainer
        tabs={["Availability & Supervision", "Research Areas", "Opportunities"]}
      />
      <section className="mt-6">
        {selectedTab === "Availability & Supervision" && (
          <ProfessorAvailabilityTab />
        )}
        {selectedTab === "Research Areas" && professor && (
          <ProfessorResearchAreaTab
            professor={professor}
            isOwnProfile={isOwnProfile}
            onUpdate={handleProfileUpdate}
          />
        )}
        {selectedTab === "Opportunities" && professor?.id_professeur && (
          <ProfessorOpportunitiesTab
            professorId={professor?.id_professeur}
            isOwnProfile={isOwnProfile}
          />
        )}
      </section>
    </div>
  );
}

export default ProfessorProfilePage;
