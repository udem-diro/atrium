import { useEffect } from "react";
import AdminProfileCard from "../components/AdminProfileCard";
import TabsContainer from "../components/layouts/TabsContainer";
import { getStore } from "../utils/Store";
import { useStore } from "../hooks/useStore";
import AdminOpportunitiesTab from "./views/AdminOpportunitiesTab";
import AdminMatchingToolTab from "./views/AdminMatchingToolTab";

function AdminProfilePage() {
  const store = getStore();
  const selectedTab = useStore((s) => s.selectedTab);

  useEffect(() => {
    store.setSelectedTab("Opportunities Management");
  }, []);

  return (
    <div className="mt-4 mb-24">
      <AdminProfileCard />
      <TabsContainer tabs={["Opportunities Management", "Matching Tool"]} />

      {selectedTab === "Opportunities Management" && <AdminOpportunitiesTab />}
      {selectedTab === "Matching Tool" && <AdminMatchingToolTab />}
    </div>
  );
}

export default AdminProfilePage;
