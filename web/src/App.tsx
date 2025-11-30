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
import { useEffect } from "react";
import { supabase } from "./API/supabaseClient.tsx";
import { getStore } from "./utils/Store.ts";
import { getStudentByUUID } from "./API/updateDB/updateEtudiants.ts";

function App() {
  const store = getStore();

  useEffect(() => {
    let mounted = true;
    let authSubscription: any;

    const loadStudent = async (session: any) => {
      if (!session?.user) {
        store.setConnectedUser(null);
        return;
      }

      const { data: student, error } = await getStudentByUUID(session.user.id);
      if (error || !student) {
        console.error("Could not load student profile", error);
        store.setConnectedUser(null);
        return;
      }

      store.setConnectedUser(student);
    };

    const init = async () => {
      // 1️⃣ First load the existing session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        await loadStudent(session);
      }

      // 2️⃣ Then attach ONE listener
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (mounted) {
          await loadStudent(session);
        }
      });

      authSubscription = subscription;
    };

    init();

    return () => {
      mounted = false;
      authSubscription?.unsubscribe();
    };
  }, []);

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
