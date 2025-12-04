import { supabase } from "../API/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

export async function signUp(
  email: string,
  password: string,
  fullName?: string,
  studentId?: number,
  programmeId?: number | null
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName: fullName ?? "", // optional, fallback to empty
        programmeId: programmeId ?? null, // optional, fallback to 0
        studentId: studentId ?? 0,
        role: "student",
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

// Request password reset email
export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    throw error;
  }
}

// Update password with the token from email
export async function updatePassword(newPassword: string) {
  console.log("Attempting to update password..."); // Debug log

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  console.log("Update response:", { data, error }); // Debug log

  if (error) {
    console.error("Password update error:", error);
    throw error;
  }

  return data;
}
