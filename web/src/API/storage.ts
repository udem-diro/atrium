import { supabase } from "./supabaseClient";

// Upload profile picture
export async function uploadProfilePicture(
  userId: string,
  file: File
): Promise<{ url: string | null; error: any }> {
  try {
    // Create a unique file name: userId/profile-picture.ext
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/profile-picture.${fileExt}`;

    // Delete old profile picture if exists
    await supabase.storage.from("profile-pictures").remove([fileName]);

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(fileName);

    return { url: data.publicUrl, error: null };
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return { url: null, error };
  }
}

// Upload CV
export async function uploadCV(
  userId: string,
  file: File
): Promise<{ url: string | null; error: any }> {
  try {
    // Create a unique file name: userId/cv.pdf
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/cv.${fileExt}`;

    // Delete old CV if exists
    await supabase.storage.from("cvs").remove([fileName]);

    // Upload new file
    const { error: uploadError } = await supabase.storage
      .from("cvs")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage.from("cvs").getPublicUrl(fileName);

    return { url: data.publicUrl, error: null };
  } catch (error) {
    console.error("Error uploading CV:", error);
    return { url: null, error };
  }
}

// Delete profile picture
export async function deleteProfilePicture(
  userId: string
): Promise<{ error: any }> {
  try {
    const { error } = await supabase.storage
      .from("profile-pictures")
      .remove([`${userId}/profile-picture`]);

    return { error };
  } catch (error) {
    console.error("Error deleting profile picture:", error);
    return { error };
  }
}

// Delete CV
export async function deleteCV(userId: string): Promise<{ error: any }> {
  try {
    const { error } = await supabase.storage
      .from("cvs")
      .remove([`${userId}/cv`]);

    return { error };
  } catch (error) {
    console.error("Error deleting CV:", error);
    return { error };
  }
}
