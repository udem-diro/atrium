import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import OpportunityPage from "./pages/OpportunityPage.tsx";
// import { addEtudiant } from "./API/updateDB/updateEtudiants.ts";

function App() {
  // async function handleAdd() {
  //   try {
  //     const data = await addEtudiant({
  //       id_etudiant: 20257343,
  //       nom: "Jean Tremblay",
  //       courriel: "jean.tremblay@umontreal.ca",
  //       programme_id: 5544,
  //     });
  //     console.log("ajouter etudiant:", data);
  //     alert("Student added successfully!");
  //   } catch (error: any) {
  //     console.error("erreur d'ajout etudiant:", error.message);
  //     alert("Error: " + error.message);
  //   }
  // }

  return (
    <Router>
      <div className="flex flex-col mb-24">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opportunity" element={<OpportunityPage />} />
        </Routes>
      </div>
      {/* <div>
        <h1>Test Add Étudiant</h1>
        <button
          onClick={handleAdd}
          className="border bg-light-blue rounded px-4 py-1 text-gray-600 font-semibold hover:bg-dark-blue"
        >
          Add Student
        </button>
      </div> */}
    </Router>
  );
}

export default App;
