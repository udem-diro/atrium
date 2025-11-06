import { useStore } from "../hooks/useStore.ts";

import TabsContainer from "../components/layouts/TabsContainer.tsx";
import SearchBar from "../components/widgets/SearchBar.tsx";
import FilterList from "../components/widgets/FilterList.tsx";
import Button from "../components/widgets/Button.tsx";
import OpportunitiesList from "../views/OpportunitiesList.tsx";
import ProfessorsList from "../views/ProfessorsList.tsx";
import StudentsList from "../views/StudentsList.tsx";

export default function HomePage() {
  const selectedTab = useStore((s) => s.selectedTab);

  return (
    <div className="flex flex-col mb-24">
      <TabsContainer />

      <div className="flex flex-col gap-2 md:flex-row mt-4 justify-center">
        <SearchBar />
        <FilterList
          bgColor="bg-light-blue"
          hoverColor="hover:bg-dark-blue"
          options={["All Opportunities", "Internships", "Scholarships"]}
        />
      </div>

      {/* Quick filters */}
      <div className="flex flex-col gap-2 mt-3">
        <h2 className="font-semibold">Filter by departments</h2>
        <div className="flex gap-2 lg:gap-3 flex-wrap">
          <Button
            buttonText="Computer Science"
            size="sm"
            variant="secondary"
            className="text-xs lg:text-sm"
          />
          <Button
            buttonText="Psychology"
            size="sm"
            variant="secondary"
            className="text-xs lg:text-sm"
          />
          <Button
            buttonText="Econimics"
            size="sm"
            variant="secondary"
            className="text-xs lg:text-sm"
          />
        </div>
      </div>

      {/* Search result text + order by */}
      <div className="mt-6 flex items-center">
        <h2 className="font-semibold text-[#848484] flex-3 text-sm lg:text-base">
          Found 2 Opportunities
        </h2>
        <FilterList
          bgColor="bg-light-gray"
          hoverColor="hover:bg-dark-gray"
          options={["Most recent", "Deadline soon"]}
        />
      </div>

      {/* Content */}
      <section className="my-4 flex-1 lg:overflow-auto scroll-smooth lg:pb-12">
        {selectedTab === "op" && <OpportunitiesList />}
        {selectedTab === "prof" && <ProfessorsList />}
        {selectedTab === "stu" && <StudentsList />}
      </section>
    </div>
  );
}
