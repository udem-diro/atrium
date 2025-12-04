import { useState } from "react";
import {
  FaEdit,
  FaCheck,
  FaTimes,
  FaUpload,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import type { Professor } from "../../models/Professor";
import { getStore } from "../../utils/Store";
import {
  updateProfessorInfo,
  updateProfessorProfilePicture,
} from "../../API/updateDB/updateProfesseur";
import { uploadProfilePicture } from "../../API/storage";

interface EditableProfileProps {
  professor: Professor;
  isOwnProfile: boolean;
  onUpdate: (updated: Partial<Professor>) => void;
}

function EditableProfile({
  professor,
  isOwnProfile,
  onUpdate,
}: EditableProfileProps) {
  const store = getStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Local form state
  const [name, setName] = useState(professor.nom);
  const [email, setEmail] = useState(professor.courriel);
  const [bio, setBio] = useState(professor.bio || "");
  const [website, setWebsite] = useState(professor.site_web || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(professor.photo_profil);

  // Handle profile picture change
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      store.addNotification("Please select an image file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      store.addNotification("Image size must be less than 5MB", "error");
      return;
    }

    setProfilePicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedData: Partial<Professor> = {};

      // Upload profile picture if changed
      if (profilePicture && professor.UUID) {
        const { url, error } = await uploadProfilePicture(
          professor.UUID,
          profilePicture
        );
        if (error) throw error;

        if (!url)
          throw new Error("Profile picture upload failed, no URL returned");

        const { error: dbError } = await updateProfessorProfilePicture(
          professor.id_professeur,
          url
        );
        if (dbError) throw dbError;

        updatedData.photo_profil = url;
      }

      // Update other fields
      if (
        name !== professor.nom ||
        email !== professor.courriel ||
        bio !== professor.bio ||
        website !== professor.site_web
      ) {
        const { error } = await updateProfessorInfo(professor.id_professeur, {
          nom: name,
          courriel: email,
          bio,
          site_web: website,
        });
        if (error) throw error;

        updatedData.nom = name;
        updatedData.courriel = email;
        updatedData.bio = bio;
        updatedData.site_web = website;
      }

      onUpdate(updatedData);
      setIsEditing(false);
      setProfilePicture(null);
      store.addNotification("Profile updated successfully!", "success");
    } catch (err: any) {
      console.error(
        "Failed to update professor:",
        JSON.stringify(err, null, 2)
      );
      store.addNotification(
        "Failed to update profile. Check console for details.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(professor.nom);
    setEmail(professor.courriel);
    setBio(professor.bio || "");
    setWebsite(professor.site_web || "");
    setProfilePicture(null);
    setProfilePicturePreview(professor.photo_profil);
    setIsEditing(false);
  };

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-5 md:gap-24 items-center border rounded-xl border-gray-400 p-8 md:p-8 md:px-24 lg:px-36 lg:py-8 shadow-md relative">
      {isOwnProfile && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:text-primary absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-10"
        >
          <FaEdit />
        </button>
      )}
      {/* LEFT SIDE — avatar */}
      <div className="flex flex-col items-center justify-center mb-4">
        {profilePicturePreview ? (
          <img
            src={profilePicturePreview}
            alt={name}
            className="rounded-full w-24 lg:w-32 aspect-square object-cover"
          />
        ) : (
          <div className="w-24 aspect-square rounded-full bg-primary text-white flex justify-center items-center text-xl font-semibold">
            {getInitials(name)}
          </div>
        )}

        {isEditing && (
          <label className="cursor-pointer mt-3 text-sm text-primary hover:text-primary/80 flex gap-1 items-center">
            <FaUpload size={12} />
            {profilePicture ? "Change photo" : "Upload photo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
              disabled={isSaving}
            />
          </label>
        )}
      </div>

      {/* RIGHT SIDE — content */}
      <div className="flex flex-col  flex-1 text-sm text-gray-800 w-full">
        <div className="">
          {/* Header buttons */}
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-lg">{name}</h3>

            {isEditing && (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="text-green-600 hover:text-green-700 disabled:opacity-50"
                >
                  {isSaving ? "..." : <FaCheck />}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="text-red-600 hover:text-red-700 disabled:opacity-50"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-500">
              <FaEnvelope />
              <span>Email</span>
            </div>

            <p className="font-semibold mt-1 break-all">{email}</p>
          </div>

          {/* BIO */}
          <div className="mb-4">
            <h4 className="text-gray-500">About</h4>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border w-full p-2 rounded mt-1"
                rows={3}
              />
            ) : (
              <p className="text-gray-600 mt-1">{bio || "No bio yet."}</p>
            )}
          </div>

          {/* WEBSITE */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-500">
              <FaGlobe />
              <span>Website</span>
            </div>
            {isEditing ? (
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="border w-full p-2 rounded mt-1"
                placeholder="https://example.com"
              />
            ) : (
              <p className="font-semibold mt-1 break-all">
                {website || "Not specified"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditableProfile;
