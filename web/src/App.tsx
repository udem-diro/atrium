import { useEffect } from "react";
import { supabase } from "./supabaseClient.tsx";

import "./App.css";

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
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-green-600">
        Supabase Connection Test 🚀
      </h1>
    </div>
  );
}

export default App;
