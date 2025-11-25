import { useEffect, useState } from "react";
import TabsContainer from "../components/layouts/TabsContainer";
import ProfessorProfileCard from "../components/ProfessorProfileCard";
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
  const { id } = useParams();

  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

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
      {professor && <ProfessorProfileCard professor={professor} />}
      <TabsContainer
        tabs={["Availability & Supervision", "Research Areas", "Opportunities"]}
      />
      <section className="mt-6">
        {selectedTab === "Availability & Supervision" && (
          <ProfessorAvailabilityTab />
        )}
        {selectedTab === "Research Areas" && <ProfessorResearchAreaTab />}
        {selectedTab === "Opportunities" && <ProfessorOpportunitiesTab />}
      </section>
    </div>
  );
}

export default ProfessorProfilePage;
