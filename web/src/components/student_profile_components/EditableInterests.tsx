import { useState } from "react";
import { FaEdit, FaCheck, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { updateStudentInterests } from "../../API/updateDB/updateEtudiants";
import { getStore } from "../../utils/Store";
import Tag from "../widgets/Tag";

interface EditableInterestsProps {
  studentId: number;
  initialInterests: string[] | null;
  isOwnProfile: boolean;
  onUpdate: (newInterests: string[]) => void;
}

function EditableInterests({
  studentId,
  initialInterests,
  isOwnProfile,
  onUpdate,
}: EditableInterestsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [interests, setInterests] = useState<string[]>(initialInterests || []);
  const [newInterest, setNewInterest] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const store = getStore();

  const handleAddInterest = () => {
    const trimmed = newInterest.trim();

    if (!trimmed) {
      store.addNotification("Interest cannot be empty", "error");
      return;
    }

    // Check for duplicates (case-insensitive)
    if (
      interests.some(
        (interest) => interest.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      store.addNotification("This interest already exists", "error");
      return;
    }

    setInterests([...interests, trimmed]);
    setNewInterest("");
  };

  const handleRemoveInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (interests.length === 0) {
      store.addNotification("Add at least one interest", "error");
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await updateStudentInterests(studentId, interests);

      if (error) throw error;

      onUpdate(interests);
      setIsEditing(false);
      store.addNotification("Interests updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update interests:", error);
      store.addNotification(
        "Failed to update interests. Please try again.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setInterests(initialInterests || []);
    setNewInterest("");
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddInterest();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 font-semibold">Academic Interests</h2>

        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-primary transition-colors"
            title="Edit interests"
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
        <div className="flex flex-col gap-3">
          {/* Input to add new interest */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add an interest..."
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSaving}
            />
            <button
              onClick={handleAddInterest}
              disabled={isSaving}
              className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              <FaPlus size={12} />
              <span className="text-sm">Add</span>
            </button>
          </div>

          {/* List of interests with remove buttons */}
          <div className="flex gap-2 flex-wrap">
            {interests.length === 0 ? (
              <p className="text-sm text-gray-400">No interests added yet</p>
            ) : (
              interests.map((interest, index) => (
                <div key={index} className="flex items-center gap-1 group">
                  <Tag tagText={interest} />
                  <button
                    onClick={() => handleRemoveInterest(index)}
                    disabled={isSaving}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    title="Remove interest"
                  >
                    <FaTrash size={10} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {interests.length === 0 ? (
            <p className="text-sm text-gray-400">No interests added yet</p>
          ) : (
            interests.map((interest, index) => (
              <Tag key={index} tagText={interest} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EditableInterests;
