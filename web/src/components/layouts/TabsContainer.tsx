import Tab from "../widgets/Tab.tsx";
import { useStore } from "../../hooks/useStore.ts";
import { getStore } from "../../utils/Store.ts";

type TabsContainerProps = {
  tabs: string[];
};

function TabsContainer({ tabs }: TabsContainerProps) {
  const selectedTab = useStore((s) => s.selectedTab);
  const store = getStore();

  return (
    <div className="flex gap-1 mt-4 rounded-lg py-1 px-1 bg-[#F3F3F5]">
      {tabs.map((tab) => (
        <Tab
          key={tab}
          tabText={tab}
          isActive={selectedTab === tab}
          onClick={() => store.setSelectedTab(tab)}
        />
      ))}
    </div>
  );
}

export default TabsContainer;
