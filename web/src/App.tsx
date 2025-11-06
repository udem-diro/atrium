import { useState } from "react";
import { useStore } from "./hooks/useStore.ts";
// import { useEffect } from "react";
// import { supabase } from "./supabaseClient.tsx";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import OpportunityPage from "./pages/OpportunityPage.tsx";

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

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opportunity" element={<OpportunityPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
