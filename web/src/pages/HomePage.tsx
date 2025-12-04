import { useStore } from "../hooks/useStore.ts";
import { getStore } from "../utils/Store.ts";

import TabsContainer from "../components/layouts/TabsContainer.tsx";
import SearchBar from "../components/widgets/SearchBar.tsx";
import FilterList from "../components/widgets/FilterList.tsx";
import Button from "../components/widgets/Button.tsx";
import OpportunitiesList from "../pages/views/OpportunitiesList.tsx";
import ProfessorsList from "../pages/views/ProfessorsList.tsx";
import StudentsList from "../pages/views/StudentsList.tsx";
import { useEffect, useState } from "react";
import { fetchTopDepartments } from "../API/updateDB/updateOpportunite.ts";

export default function HomePage() {
  const store = getStore();
  const [departments, setDepartments] = useState<
    { department: string; count: number }[]
  >([]);

  useEffect(() => {
    store.setSelectedTab("Opportunities");
    store.setFilter("All Opportunities");
    store.setSearchQuery("");

    async function fetchDepartments() {
      const data = await fetchTopDepartments();
      setDepartments(data);
    }

    fetchDepartments();
  }, []);

  const selectedTab = useStore((s) => s.selectedTab);
  const nbrOfResults = useStore((s) => s.nbrOfResults);
  const selectedDepartments = useStore((s) => s.selectedDepartments);

  // function to pass to quick filter buttons to add/remove filter on click
  const toggleDepartment = (dept: string) => {
    const current = selectedDepartments;
    if (current.includes(dept)) {
      store.setSelectedDepartments(current.filter((d) => d !== dept)); // deselect
    } else {
      store.setSelectedDepartments([...current, dept]); // select
    }
  };

  return (
    <div className="flex flex-col mb-24">
      <TabsContainer tabs={["Opportunities", "Professors", "Students"]} />

      <div className="flex flex-col gap-2 md:flex-row mt-4 justify-center">
        <SearchBar />
        {selectedTab === "Opportunities" && (
          <FilterList
            bgColor="bg-light-blue"
            hoverColor="hover:bg-dark-blue"
            options={[
              "All Opportunities",
              "Internship",
              "Scholarship",
              "TA",
              "Research",
            ]}
            onSelect={(val) => store.setFilter(val)}
          />
        )}
      </div>

      {/* Quick filters buttons */}
      {selectedTab === "Opportunities" && (
        <div className="flex flex-col gap-2 mt-3">
          <h2 className="font-semibold">Filter by department</h2>
          <div className="flex gap-2 lg:gap-3 flex-wrap">
            {departments.map((d) => (
              <Button
                key={d.department}
                buttonText={d.department}
                size="sm"
                variant="secondary"
                isFilterButton
                dataSelected={selectedDepartments.includes(d.department)}
                className="text-xs lg:text-sm"
                onClick={() => toggleDepartment(d.department)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search result text + order by */}
      <div className="mt-6 flex items-center">
        <h2 className="font-semibold text-[#848484] flex-3 text-sm lg:text-base">
          Found {nbrOfResults} {selectedTab}
        </h2>

        {selectedTab === "Opportunities" && (
          <FilterList
            bgColor="bg-light-gray"
            hoverColor="hover:bg-dark-gray"
            options={["Most recent", "Deadline soon"]}
            onSelect={(val) => store.setSortOrder(val)}
          />
        )}
      </div>

      {/* Content */}
      <section className="my-4 flex-1 lg:overflow-auto scroll-smooth lg:pb-12">
        {selectedTab === "Opportunities" && <OpportunitiesList />}
        {selectedTab === "Professors" && <ProfessorsList />}
        {selectedTab === "Students" && <StudentsList />}
      </section>
    </div>
  );
}
