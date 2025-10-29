import { useEffect } from "react";
import { supabase } from "./supabaseClient.tsx";

import "./App.css";
import Header from "./components/Header.tsx";
import TabsContainer from "./components/TabsContainer.tsx";

function App() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("test_table")
        .select("*")
        .limit(3);
      if (error) {
        console.error("❌ Supabase connection error:", error.message);
      } else {
        console.log("✅ Supabase connected! Example data:", data);
      }
    };
    testConnection();
  }, []);

  return (
    <div>
      <Header />
      <TabsContainer />
    </div>
  );
}

export default App;
