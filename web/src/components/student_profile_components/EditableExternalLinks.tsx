import { useState } from "react";
import {
  FaEdit,
  FaCheck,
  FaTimes,
  FaPlus,
  FaTrash,
  FaLink,
} from "react-icons/fa";
import { updateStudentLinks } from "../../API/updateDB/updateEtudiants";
import { getStore } from "../../utils/Store";
import type { Link } from "../../models/Student";
import Button from "../widgets/Button";

interface EditableExternalLinksProps {
  studentId: number;
  initialLinks: Link[] | null;
  isOwnProfile: boolean;
  onUpdate: (newLinks: Link[]) => void;
}

function EditableExternalLinks({
  studentId,
  initialLinks,
  isOwnProfile,
  onUpdate,
}: EditableExternalLinksProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [links, setLinks] = useState<Link[]>(initialLinks || []);
  const [newLabel, setNewLabel] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const store = getStore();

  // Simple URL validation
  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleAddLink = () => {
    const trimmedLabel = newLabel.trim();
    const trimmedUrl = newUrl.trim();

    if (!trimmedLabel) {
      store.addNotification("Label cannot be empty", "error");
      return;
    }

    if (!trimmedUrl) {
      store.addNotification("URL cannot be empty", "error");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      store.addNotification(
        "Please enter a valid URL (must start with http:// or https://)",
        "error"
      );
      return;
    }

    // Check for duplicate labels
    if (
      links.some(
        (link) => link.label.toLowerCase() === trimmedLabel.toLowerCase()
      )
    ) {
      store.addNotification("A link with this label already exists", "error");
      return;
    }

    setLinks([...links, { label: trimmedLabel, url: trimmedUrl }]);
    setNewLabel("");
    setNewUrl("");
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await updateStudentLinks(studentId, links);

      if (error) throw error;

      onUpdate(links);
      setIsEditing(false);
      store.addNotification("Links updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update links:", error);
      store.addNotification(
        "Failed to update links. Please try again.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setLinks(initialLinks || []);
    setNewLabel("");
    setNewUrl("");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2 items-center">
          <FaLink />
          <h2 className="text-gray-500 font-semibold">External Links</h2>
        </div>

        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-primary transition-colors"
            title="Edit links"
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
          {/* Input fields to add new link */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Label (e.g., GitHub, LinkedIn)"
              className="text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSaving}
            />
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="URL (e.g., https://github.com/username)"
              className="text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isSaving}
            />
            <button
              onClick={handleAddLink}
              disabled={isSaving}
              className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FaPlus size={12} />
              <span className="text-sm">Add Link</span>
            </button>
          </div>

          {/* List of links with remove buttons */}
          <div className="flex flex-col gap-2">
            {links.length === 0 ? (
              <p className="text-sm text-gray-400">No links added yet</p>
            ) : (
              links.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2 border border-gray-200 rounded group hover:bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700">
                      {link.label}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{link.url}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveLink(index)}
                    disabled={isSaving}
                    className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                    title="Remove link"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {links.length === 0 ? (
            <p className="text-sm text-gray-400">No links added yet</p>
          ) : (
            links.map((link, index) => (
              <Button
                key={index}
                buttonText={link.label}
                size="responsive"
                variant="outline"
                onClick={() => window.open(link.url, "_blank")}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EditableExternalLinks;
