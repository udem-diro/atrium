import { useState } from "react";
import { FaUser, FaCalendar } from "react-icons/fa";
import { supabase } from "../../API/supabaseClient";
import Button from "../widgets/Button";
import Tag from "../widgets/Tag";
import { getStore } from "../../utils/Store";
import type { Professor } from "../../models/Professor";

interface EditableAvailabilityProps {
  professor: Professor;
  isOwnProfile?: boolean;
  onUpdate: (data: Partial<Professor>) => void;
}

const SUPERVISION_OPTIONS = [
  "Master's Thesis",
  "PhD Supervision",
  "Undergraduate Research",
  "Internship Supervision",
  "Postdoc Supervision",
];

function EditableAvailability({
  professor,
  isOwnProfile = false,
  onUpdate,
}: EditableAvailabilityProps) {
  const store = getStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [positions, setPositions] = useState(
    professor.available_positions || 0
  );
  const [semester, setSemester] = useState(professor.available_semester || "");
  const [supervisionTypes, setSupervisionTypes] = useState<string[]>(
    professor.supervision_types || []
  );
  const [additionalInfo, setAdditionalInfo] = useState(
    professor.additional_info || ""
  );
  const [calendarLink, setCalendarLink] = useState(
    professor.calendar_link || ""
  );

  const handleToggleSupervisionType = (type: string) => {
    if (supervisionTypes.includes(type)) {
      setSupervisionTypes(supervisionTypes.filter((t) => t !== type));
    } else {
      setSupervisionTypes([...supervisionTypes, type]);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("professeur")
        .update({
          available_positions: positions,
          available_semester: semester,
          supervision_types: supervisionTypes,
          additional_info: additionalInfo,
          calendar_link: calendarLink,
        })
        .eq("id_professeur", professor.id_professeur);

      if (error) throw error;

      onUpdate({
        available_positions: positions,
        available_semester: semester,
        supervision_types: supervisionTypes,
        additional_info: additionalInfo,
        calendar_link: calendarLink,
      });

      setIsEditing(false);
      store.addNotification("Availability updated successfully!", "success");
    } catch (err) {
      console.error("Error updating availability:", err);
      store.addNotification("Failed to update availability", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setPositions(professor.available_positions || 0);
    setSemester(professor.available_semester || "");
    setSupervisionTypes(professor.supervision_types || []);
    setAdditionalInfo(professor.additional_info || "");
    setCalendarLink(professor.calendar_link || "");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-300 p-4 md:p-8 lg:p-16 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <FaUser />
          <h3 className="font-semibold">Student Supervision Capacity</h3>
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
          {/* Positions Available */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Number of Available Positions
            </label>
            <input
              type="number"
              min="0"
              value={positions}
              onChange={(e) => setPositions(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Semester/Term
            </label>
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="e.g., Winter 2025, Fall 2025"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Supervision Types */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Types of Supervision
            </label>
            <div className="flex flex-wrap gap-2">
              {SUPERVISION_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleToggleSupervisionType(type)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    supervisionTypes.includes(type)
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Link */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Calendar Link (Calendly, Google Calendar, etc.)
            </label>
            <input
              type="url"
              value={calendarLink}
              onChange={(e) => setCalendarLink(e.target.value)}
              placeholder="https://calendly.com/your-link or Google Calendar embed"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-gray-500 mt-1">
              Students will be able to book meetings through this link
            </p>
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Additional Information
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any additional details about supervision availability..."
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Save/Cancel */}
          <div className="flex gap-2">
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
        <>
          {/* View Mode */}
          <h4 className="font-semibold">Current availability</h4>

          {positions > 0 ? (
            <div className="bg-green-200 rounded-lg px-6 py-2 text-green-700 w-fit">
              <h4>
                {positions} position{positions !== 1 ? "s" : ""} available
              </h4>
              {semester && <h3 className="font-semibold">for {semester}</h3>}
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg px-6 py-2 text-gray-700 w-fit">
              <h4>No positions currently available</h4>
            </div>
          )}

          {supervisionTypes.length > 0 && (
            <div>
              <h3 className="font-semibold">Types of Supervision</h3>
              <div className="flex flex-wrap gap-2 my-1">
                {supervisionTypes.map((type) => (
                  <Tag key={type} tagText={type} />
                ))}
              </div>
            </div>
          )}

          {calendarLink && (
            <div>
              <div className="flex gap-2 items-center mb-2">
                <FaCalendar className="text-primary" />
                <h3 className="font-semibold">Schedule a Meeting</h3>
              </div>
              <a
                href={calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Book an Appointment
              </a>
            </div>
          )}

          {additionalInfo && (
            <>
              <hr className="text-gray-300" />
              <div>
                <h3 className="font-semibold">Additional information</h3>
                <p className="text-gray-500 whitespace-pre-line">
                  {additionalInfo}
                </p>
              </div>
            </>
          )}

          {!positions && !supervisionTypes.length && !additionalInfo && (
            <p className="text-gray-500 text-sm">
              {isOwnProfile
                ? "No availability information added yet. Click Edit to add details."
                : "No availability information provided."}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default EditableAvailability;
