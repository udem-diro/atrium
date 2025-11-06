import { useState } from "react";
import { useStore } from "./hooks/useStore.ts";
// import { useEffect } from "react";
// import { supabase } from "./supabaseClient.tsx";

import "./App.css";
import Header from "./components/Header.tsx";
import TabsContainer from "./components/TabsContainer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import FilterList from "./components/FilterList.tsx";
import Button from "./components/Button.tsx";
import OpportunitiesList from "./views/OpportunitiesList.tsx";
import ProfessorsList from "./views/ProfessorsList.tsx";
import StudentsList from "./views/StudentsList.tsx";

function App() {
  // useEffect(() => {
  //   const testConnection = async () => {
  //     const { data, error } = await supabase
  //       .from("test_table")
  //       .select("*")
  //       .limit(3);
  //     if (error) {
  //       console.error("❌ Supabase connection error:", error.message);
  //     } else {
  //       console.log("✅ Supabase connected! Example data:", data);
  //     }
  //   };
  //   testConnection();
  // }, []);

  const selectedTab = useStore((s) => s.selectedTab);

  return (
    <div className="h-screen flex flex-col mb-24">
      <Header />
      <TabsContainer />
      <div className="flex flex-col gap-2 md:flex-row mt-4 justify-center align-center">
        <SearchBar />
        <FilterList bgColor="bg-light-blue" filtersList="🔍Opportunities ▼" />
      </div>

      {/* quick filters */}
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

      {/*Search result text + order by*/}

      <div className="mt-6 flex items-center ">
        <h2 className="font-semibold text-[#848484] flex-3 text-sm lg:text-base">
          Found 2 Opportunities
        </h2>
        <FilterList bgColor="bg-light-gray" filtersList="Most recent ▼" />
      </div>

      {/*Content*/}

      <section className="my-4 flex-1 lg:overflow-auto scroll-smooth lg:pb-12">
        {selectedTab === "op" && <OpportunitiesList />}
        {selectedTab === "prof" && <ProfessorsList />}
        {selectedTab === "stu" && <StudentsList />}
      </section>
    </div>
  );
}

export default App;
