import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import OpportunityPage from "./pages/OpportunityPage.tsx";
import {addEtudiant}  from "./API/updateDB/updateEtudiants.ts";

function App() {
  async function handleAdd() {
    try {
      const data = await addEtudiant({
        id_etudiant: 20257343,
        nom: "Jean Tremblay",
        courriel: "jean.tremblay@umontreal.ca",
        programme_id: 5544,
      });
      console.log("✅ Added student:", data);
      alert("Student added successfully!");
    } catch (error: any) {
      console.error("❌ Error adding student:", error.message);
      alert("Error: " + error.message);
    }
  }



  return (

    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opportunity" element={<OpportunityPage />} />
        </Routes>
      </div>

      <div>
      <h1>Test Add Étudiant</h1>
      <button onClick={handleAdd}>Add Student</button>
      </div>
    </Router>
  );
}

export default App;
