import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import OpportunityPage from "./pages/OpportunityPage.tsx";
import ProfessorProfilePage from "./pages/ProfessorProfilePage.tsx";
import StudentProfilePage from "./pages/StudentProfilePage.tsx";
import AdminProfilePage from "./pages/AdminProfilePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";

import { AuthProvider } from "./context/authContext";
// import useStore from "./store/store.ts";
// import { addEtudiant } from "./API/updateDB/updateEtudiants.ts";

function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opportunity/:id" element={<OpportunityPage />} />
          <Route path="/professor/:id" element={<ProfessorProfilePage />} />
          <Route path="/student/:id" element={<StudentProfilePage />} />
          <Route path="/admin" element={<AdminProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
