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
import { getProfessorByUUID } from "./API/updateDB/updateProfesseur.ts";

function App() {
  const store = getStore();

  useEffect(() => {
    let mounted = true;
    let authSubscription: any;

    const loadUser = async (session: any) => {
      if (!session?.user) {
        store.setConnectedUser(null);
        return;
      }

      // Check the role from user metadata
      const userRole = session.user.user_metadata?.role;

      if (userRole === "student") {
        // Try to find student
        const { data: student, error } = await getStudentByUUID(
          session.user.id
        );
        if (student && !error) {
          store.setConnectedUser(student);
          return;
        }
      } else if (userRole === "professor") {
        // Try to find professor
        const { data: professor, error } = await getProfessorByUUID(
          session.user.id
        );
        if (professor && !error) {
          store.setConnectedUser(professor);
          return;
        }
      } else {
        // Fallback: try both if role is not set (for existing users)
        const { data: student } = await getStudentByUUID(session.user.id);
        if (student) {
          store.setConnectedUser(student);
          return;
        }

        const { data: professor } = await getProfessorByUUID(session.user.id);
        if (professor) {
          store.setConnectedUser(professor);
          return;
        }
      }

      console.error("User not found in students or professors");
      store.setConnectedUser(null);
    };

    const init = async () => {
      // 1. First load the existing session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted) {
        await loadUser(session);
      }

      // 2.  Then attach supabase listener
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (mounted) {
          await loadUser(session);
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
