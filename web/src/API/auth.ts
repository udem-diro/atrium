import { supabase } from "../API/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

export async function signUp(
  email: string,
  password: string,
  fullName?: string,
  studentId?: number,
  programmeId?: number
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName ?? "", // optional, fallback to empty
        programmeId: programmeId ?? 1, // optional, fallback to 0
        studentId: studentId ?? 0,
      },
    },
  });

  if (error) throw error;

  return data;
}

export async function signIn(
  email: string,
  password: string
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
