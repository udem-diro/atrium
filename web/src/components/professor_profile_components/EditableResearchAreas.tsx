import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { supabase } from "../../API/supabaseClient";
import Button from "../widgets/Button";
import { getStore } from "../../utils/Store";

interface EditableResearchAreasProps {
  professorId: number;
  researchAreas: string[];
  isOwnProfile?: boolean;
  onUpdate: (areas: string[]) => void;
}

function EditableResearchAreas({
  professorId,
  researchAreas,
  isOwnProfile = false,
  onUpdate,
}: EditableResearchAreasProps) {
  const store = getStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [areas, setAreas] = useState<string[]>(researchAreas);
  const [newArea, setNewArea] = useState("");

  const handleAddArea = () => {
    const trimmedArea = newArea.trim();
    if (trimmedArea && !areas.includes(trimmedArea)) {
      setAreas([...areas, trimmedArea]);
      setNewArea("");
    }
  };

  const handleRemoveArea = (areaToRemove: string) => {
    setAreas(areas.filter((area) => area !== areaToRemove));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("professeur")
        .update({ research_areas: areas })
        .eq("id_professeur", professorId);

      if (error) throw error;

      onUpdate(areas);
      setIsEditing(false);
      store.addNotification("Research areas updated successfully!", "success");
    } catch (err) {
      console.error("Error updating research areas:", err);
      store.addNotification("Failed to update research areas", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setAreas(researchAreas);
    setNewArea("");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col justify-center gap-2 p-6 md:p-8 lg:p-12 border border-gray-400 rounded-lg shadow-md">
      <div className="flex gap-2 items-center justify-between mb-2">
        <div className="flex gap-2 items-center">
          <FaGraduationCap className="text-2xl" />
          <h3 className="font-semibold">Research areas and expertise</h3>
        </div>
        {isOwnProfile && !isEditing && (
          <Button
            buttonText="Edit"
            size="responsive"
            variant="view"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          {/* Input to add new area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddArea()}
              placeholder="Add research area..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              buttonText="Add"
              variant="view"
              onClick={handleAddArea}
              disabled={!newArea.trim()}
            />
          </div>

          {/* List of areas with remove button */}
          {areas.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 text-sm lg:text-lg">
              {areas.map((area) => (
                <li
                  key={area}
                  className="bg-light-gray py-1 px-2 lg:py-2 lg:px-4 rounded-lg flex items-center justify-between"
                >
                  <span>{area}</span>
                  <button
                    onClick={() => handleRemoveArea(area)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              No research areas added yet. Add some above.
            </p>
          )}

          {/* Save/Cancel buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              buttonText={isSaving ? "Saving..." : "Save"}
              variant="view"
              onClick={handleSave}
              disabled={isSaving}
            />
            <Button
              buttonText="Cancel"
              variant="delete"
              onClick={handleCancel}
              disabled={isSaving}
            />
          </div>
        </div>
      ) : (
        <div>
          {areas.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 text-sm lg:text-lg text-start">
              {areas.map((area) => (
                <li
                  key={area}
                  className="bg-light-gray py-1 px-2 lg:py-2 lg:px-4 rounded-lg flex items-center"
                >
                  {area}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              {isOwnProfile
                ? "No research areas added yet. Click Edit to add some."
                : "No research areas listed."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default EditableResearchAreas;
