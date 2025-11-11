import { useEffect } from "react";
import TabsContainer from "../components/layouts/TabsContainer";
import ProfessorProfileCard from "../components/ProfessorProfileCard";
import { useStore } from "../hooks/useStore.ts";
import { getStore } from "../utils/Store.ts";
import ProfessorAvailabilityTab from "./views/ProfessorAvailabilityTab.tsx";
import ProfessorResearchAreaTab from "./views/ProfessorResearchAreaTab.tsx";
import ProfessorOpportunitiesTab from "./views/ProfessorOpportunitiesTab.tsx";

function ProfessorProfilePage() {
  const selectedTab = useStore((s) => s.selectedTab);

  useEffect(() => {
    const store = getStore();
    store.setSelectedTab("Availability & Supervision");
  }, []);

  return (
    <div>
      <ProfessorProfileCard
        name={"Dr. Sarah Chen"}
        department={"Computer Science"}
        email={"s.chen@udem.ca"}
        hasProfileButton={false}
      />
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
