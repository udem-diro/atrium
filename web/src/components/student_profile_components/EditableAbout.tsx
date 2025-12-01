import { useState } from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { updateStudentBio } from "../../API/updateDB/updateEtudiants";
import { getStore } from "../../utils/Store";

interface EditableAboutProps {
  studentId: number;
  initialBio: string | null;
  isOwnProfile: boolean;
  onUpdate: (newBio: string) => void;
}

function EditableAbout({
  studentId,
  initialBio,
  isOwnProfile,
  onUpdate,
}: EditableAboutProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialBio || "");
  const [isSaving, setIsSaving] = useState(false);
  const store = getStore();

  const handleSave = async () => {
    if (!bio.trim()) {
      store.addNotification("Bio cannot be empty", "error");
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await updateStudentBio(studentId, bio);

      if (error) throw error;

      onUpdate(bio); // Update parent component state
      setIsEditing(false);
      store.addNotification("Bio updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update bio:", error);
      store.addNotification("Failed to update bio. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setBio(initialBio || "");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 font-semibold">About</h2>

        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-primary transition-colors"
            title="Edit about section"
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

      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="text-sm text-gray-600 border border-gray-300 rounded p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tell us about yourself..."
          disabled={isSaving}
        />
      ) : (
        <p className="text-sm text-gray-600">{bio || "No bio added yet."}</p>
      )}
    </div>
  );
}

export default EditableAbout;
