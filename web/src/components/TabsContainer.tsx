import Tab from "./Tab.tsx";

type tabsContainerProps = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};

function TabsContainer({ selectedTab, setSelectedTab }: tabsContainerProps) {
  return (
    <div className="flex gap-1 mt-4 rounded-lg py-1 px-1 bg-[#F3F3F5]">
      <Tab
        tabText="Opportunities"
        isActive={selectedTab === "op"}
        onClick={() => setSelectedTab("op")}
      />
      <Tab
        tabText="Professors"
        isActive={selectedTab === "prof"}
        onClick={() => setSelectedTab("prof")}
      />
      <Tab
        tabText="Students"
        isActive={selectedTab === "stu"}
        onClick={() => setSelectedTab("stu")}
      />
    </div>
  );
}

export default TabsContainer;
