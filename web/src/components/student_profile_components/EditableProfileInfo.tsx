import { useState } from "react";
import {
  FaEdit,
  FaCheck,
  FaTimes,
  FaBuilding,
  FaEnvelope,
  FaUpload,
} from "react-icons/fa";
import {
  updateStudentProfilePicture,
  updateStudentCV,
  updateStudentFieldOfStudy,
} from "../../API/updateDB/updateEtudiants";
import { uploadProfilePicture, uploadCV } from "../../API/storage";
import { getStore } from "../../utils/Store";
import Button from "../widgets/Button";
import Tag from "../widgets/Tag";
import type { Student } from "../../models/Student";

interface EditableProfileInfoProps {
  student: Student;
  isOwnProfile: boolean;
  onUpdate: (updatedStudent: Partial<Student>) => void;
}

function EditableProfileInfo({
  student,
  isOwnProfile,
  onUpdate,
}: EditableProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldOfStudy, setFieldOfStudy] = useState(student.domaine_etude || "");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(student.photo_profil);
  const [isSaving, setIsSaving] = useState(false);
  const store = getStore();

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      store.addNotification("Please select an image file", "error");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      store.addNotification("Image size must be less than 5MB", "error");
      return;
    }

    setProfilePicture(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicturePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF only)
    if (file.type !== "application/pdf") {
      store.addNotification("Please select a PDF file", "error");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      store.addNotification("CV size must be less than 10MB", "error");
      return;
    }

    setCvFile(file);
    store.addNotification("CV selected. Click save to upload.", "info");
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let updatedData: Partial<Student> = {};

      // Upload profile picture if changed
      if (profilePicture && student.UUID) {
        const { url, error } = await uploadProfilePicture(
          student.UUID,
          profilePicture
        );
        if (error) throw new Error("Failed to upload profile picture");

        if (url) {
          const { error: dbError } = await updateStudentProfilePicture(
            student.id_etudiant,
            url
          );
          if (dbError) throw dbError;
          updatedData.photo_profil = url;
        }
      }

      // Upload CV if changed
      if (cvFile && student.UUID) {
        const { url, error } = await uploadCV(student.UUID, cvFile);
        if (error) throw new Error("Failed to upload CV");

        if (url) {
          const { error: dbError } = await updateStudentCV(
            student.id_etudiant,
            url
          );
          if (dbError) throw dbError;
          updatedData.cv_url = url;
        }
      }

      // Update field of study if changed
      if (fieldOfStudy !== student.domaine_etude) {
        const { error } = await updateStudentFieldOfStudy(
          student.id_etudiant,
          fieldOfStudy
        );
        if (error) throw error;
        updatedData.domaine_etude = fieldOfStudy;
      }

      onUpdate(updatedData);
      setIsEditing(false);
      setProfilePicture(null);
      setCvFile(null);
      store.addNotification("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update profile:", error);
      store.addNotification(
        "Failed to update profile. Please try again.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFieldOfStudy(student.domaine_etude || "");
    setProfilePicture(null);
    setCvFile(null);
    setProfilePicturePreview(student.photo_profil);
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
    <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div></div>

        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-primary transition-colors"
            title="Edit profile"
          >
            <FaEdit />
          </button>
        )}

        {isEditing && (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
              title="Save changes"
            >
              {isSaving ? "..." : <FaCheck />}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
              title="Cancel"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      {/* Profile Picture & Name */}
      <div className="flex flex-col gap-2 items-center mt-4">
        {profilePicturePreview ? (
          <img
            src={profilePicturePreview}
            alt={student.nom}
            className="rounded-full w-24 h-24 object-cover"
          />
        ) : (
          <div className="flex justify-center items-center rounded-full w-24 h-24 bg-primary text-white font-semibold">
            {getInitials(student.nom)}
          </div>
        )}

        {isEditing && (
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
              disabled={isSaving}
            />
            <span className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
              <FaUpload size={12} />
              {profilePicture ? "Change photo" : "Upload photo"}
            </span>
          </label>
        )}

        <h2 className="font-semibold">{student.nom}</h2>
        {student.domaine_etude && <Tag tagText={student.domaine_etude} />}
      </div>

      {/* Email */}
      <div className="flex items-center gap-4 mt-4">
        <FaEnvelope className="text-2xl" />
        <div>
          <h3 className="text-gray-500">Email</h3>
          <p className="font-semibold break-all">{student.courriel}</p>
        </div>
      </div>

      {/* Field of Study */}
      <div className="flex items-center gap-4 mt-4">
        <FaBuilding className="text-2xl" />
        <div className="flex-1">
          <h3 className="text-gray-500">Field of study</h3>
          {isEditing ? (
            <input
              type="text"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              placeholder="e.g., B.Sc. Computer Science"
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
              disabled={isSaving}
            />
          ) : (
            <p className="font-semibold">
              {student.domaine_etude || "Not specified"}
            </p>
          )}
        </div>
      </div>

      {/* CV Upload/Download */}
      <div className="flex flex-col gap-2 mt-4">
        {isEditing ? (
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleCVChange}
              className="hidden"
              disabled={isSaving}
            />
            <div className="px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-center font-semibold flex items-center justify-center gap-2">
              <FaUpload />
              {cvFile
                ? `Selected: ${cvFile.name}`
                : student.cv_url
                ? "Replace CV"
                : "Upload CV"}
            </div>
          </label>
        ) : (
          <>
            {student.cv_url ? (
              <Button
                buttonText="Download CV"
                variant="outline"
                size="responsive"
                onClick={() => window.open(student.cv_url!, "_blank")}
              />
            ) : (
              <p className="text-sm text-gray-400 text-center">
                No CV uploaded
              </p>
            )}
          </>
        )}

        {!isEditing && (
          <Button
            buttonText="Contact Student"
            variant="view"
            size="responsive"
            onClick={() =>
              (window.location.href = `mailto:${student.courriel}`)
            }
          />
        )}
      </div>
    </div>
  );
}

export default EditableProfileInfo;
