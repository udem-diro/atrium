import {supabase} from "../API/supabaseClient";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: any | null;        // Supabase auth user
  profile: any | null;     // Row from Etudiants table
  loading: boolean;        // True until everything is loaded
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch session + profile on mount
  useEffect(() => {
    async function loadUser() {
      const { data: sessionData } = await supabase.auth.getSession();

      const sessionUser = sessionData.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        await fetchProfile(sessionUser);
      }

      setLoading(false);
    }

    loadUser();

    // Listen to login/logout/auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (sessionUser) {
          await fetchProfile(sessionUser);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Load student profile from Etudiants table
  async function fetchProfile(sessionUser: any) {
    // Use email to fetch profile (since Etudiants.courriel = auth email)
    const { data, error } = await supabase
      .from("etudiants")
      .select("*")
      .eq("courriel", sessionUser.email)
      .single();

    if (!error) setProfile(data);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Helper hook to use everywhere
export function useAuth() {
  return useContext(AuthContext);
}
