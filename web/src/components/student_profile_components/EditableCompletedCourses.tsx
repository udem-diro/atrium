import { useState } from "react";
import { FaEdit, FaCheck, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { updateStudentCourses } from "../../API/updateDB/updateEtudiants";
import { getStore } from "../../utils/Store";

interface EditableCompletedCoursesProps {
  studentId: number;
  initialCourses: string[] | null;
  isOwnProfile: boolean;
  onUpdate: (newCourses: string[]) => void;
}

function EditableCompletedCourses({
  studentId,
  initialCourses,
  isOwnProfile,
  onUpdate,
}: EditableCompletedCoursesProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [courses, setCourses] = useState<string[]>(initialCourses || []);
  const [newCourse, setNewCourse] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const store = getStore();

  const handleAddCourse = () => {
    const trimmed = newCourse.trim().toUpperCase(); // Course codes are typically uppercase

    if (!trimmed) {
      store.addNotification("Course code cannot be empty", "error");
      return;
    }

    // Basic validation for course code format (e.g., IFT1234)
    const courseCodePattern = /^[A-Z]{3,4}\d{4}$/;
    if (!courseCodePattern.test(trimmed)) {
      store.addNotification(
        "Invalid course code format (e.g., IFT1215)",
        "error"
      );
      return;
    }

    // Check for duplicates
    if (courses.includes(trimmed)) {
      store.addNotification("This course is already added", "error");
      return;
    }

    setCourses([...courses, trimmed]);
    setNewCourse("");
  };

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await updateStudentCourses(studentId, courses);

      if (error) throw error;

      onUpdate(courses);
      setIsEditing(false);
      store.addNotification("Courses updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update courses:", error);
      store.addNotification(
        "Failed to update courses. Please try again.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setCourses(initialCourses || []);
    setNewCourse("");
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCourse();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 font-semibold">Completed Courses</h2>

        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-primary transition-colors"
            title="Edit courses"
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
          {/* Input to add new course */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Course code (e.g., IFT1215)"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary uppercase"
              disabled={isSaving}
              maxLength={10}
            />
            <button
              onClick={handleAddCourse}
              disabled={isSaving}
              className="px-3 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              <FaPlus size={12} />
              <span className="text-sm">Add</span>
            </button>
          </div>

          {/* Grid of courses with remove buttons */}
          {courses.length === 0 ? (
            <p className="text-sm text-gray-400">No courses added yet</p>
          ) : (
            <ul className="grid grid-cols-3 gap-2">
              {courses.map((course, index) => (
                <li
                  key={index}
                  className="bg-light-gray py-1 px-2 rounded-lg flex items-center justify-between group hover:bg-gray-200"
                >
                  <span className="text-sm">{course}</span>
                  <button
                    onClick={() => handleRemoveCourse(index)}
                    disabled={isSaving}
                    className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 ml-2"
                    title="Remove course"
                  >
                    <FaTrash size={10} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          {courses.length === 0 ? (
            <p className="text-sm text-gray-400">No courses added yet</p>
          ) : (
            <ul className="grid grid-cols-3 gap-2">
              {courses.map((course, index) => (
                <li
                  key={index}
                  className="bg-light-gray py-1 px-2 rounded-lg text-sm"
                >
                  {course}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default EditableCompletedCourses;
