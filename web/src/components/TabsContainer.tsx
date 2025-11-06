import Tab from "./Tab.tsx";
import { useStore } from "../hooks/useStore.ts";
import { getStore } from "../utils/Store.ts";

function TabsContainer() {
  const selectedTab = useStore((s) => s.selectedTab);
  const store = getStore();

  return (
    <div className="flex gap-1 mt-4 rounded-lg py-1 px-1 bg-[#F3F3F5]">
      <Tab
        tabText="Opportunities"
        isActive={selectedTab === "op"}
        onClick={() => store.setSelectedTab("op")}
      />
      <Tab
        tabText="Professors"
        isActive={selectedTab === "prof"}
        onClick={() => store.setSelectedTab("prof")}
      />
      <Tab
        tabText="Students"
        isActive={selectedTab === "stu"}
        onClick={() => store.setSelectedTab("stu")}
      />
    </div>
  );
}

export default TabsContainer;
