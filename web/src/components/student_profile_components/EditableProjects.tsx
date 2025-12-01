import { useState } from "react";
import { FaEdit, FaCheck, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { updateStudentProjects } from "../../API/updateDB/updateEtudiants";
import { getStore } from "../../utils/Store";
import type { Project } from "../../models/Student";
import Tag from "../widgets/Tag";

interface EditableProjectsProps {
  studentId: number;
  initialProjects: Project[] | null;
  isOwnProfile: boolean;
  onUpdate: (newProjects: Project[]) => void;
}

function EditableProjects({
  studentId,
  initialProjects,
  isOwnProfile,
  onUpdate,
}: EditableProjectsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form state for new/editing project
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: "",
    year: "",
    description: "",
    technologies: [],
  });
  const [newTechnology, setNewTechnology] = useState("");

  const store = getStore();

  const resetForm = () => {
    setFormData({
      title: "",
      year: "",
      description: "",
      technologies: [],
    });
    setNewTechnology("");
    setIsAddingNew(false);
    setEditingIndex(null);
  };

  const handleAddTechnology = () => {
    const trimmed = newTechnology.trim();
    if (!trimmed) return;

    if (formData.technologies.includes(trimmed)) {
      store.addNotification("Technology already added", "error");
      return;
    }

    setFormData({
      ...formData,
      technologies: [...formData.technologies, trimmed],
    });
    setNewTechnology("");
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    });
  };

  const handleSaveProject = () => {
    if (!formData.title.trim()) {
      store.addNotification("Project title is required", "error");
      return;
    }

    if (!formData.year.trim()) {
      store.addNotification("Project year is required", "error");
      return;
    }

    if (!formData.description.trim()) {
      store.addNotification("Project description is required", "error");
      return;
    }

    if (formData.technologies.length === 0) {
      store.addNotification("Add at least one technology", "error");
      return;
    }

    let updatedProjects = [...projects];

    if (editingIndex !== null) {
      // Editing existing project
      updatedProjects[editingIndex] = formData;
    } else {
      // Adding new project
      updatedProjects.push(formData);
    }

    setProjects(updatedProjects);
    resetForm();
  };

  const handleEditProject = (index: number) => {
    setFormData(projects[index]);
    setEditingIndex(index);
    setIsAddingNew(true);
  };

  const handleDeleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    if (isAddingNew) {
      store.addNotification(
        "Please save or cancel the current project first",
        "error"
      );
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await updateStudentProjects(studentId, projects);

      if (error) throw error;

      onUpdate(projects);
      setIsEditing(false);
      store.addNotification("Projects updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update projects:", error);
      store.addNotification(
        "Failed to update projects. Please try again.",
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setProjects(initialProjects || []);
    resetForm();
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md text-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-500 font-semibold">Projects</h2>

        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-500 hover:text-primary transition-colors"
            title="Edit projects"
          >
            <FaEdit />
          </button>
        )}

        {isEditing && (
          <div className="flex gap-2">
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="text-green-600 hover:text-green-700 transition-colors disabled:opacity-50"
              title="Save all changes"
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
        <div className="flex flex-col gap-4">
          {/* Add New Project Button */}
          {!isAddingNew && (
            <button
              onClick={() => setIsAddingNew(true)}
              disabled={isSaving}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FaPlus size={12} />
              <span>Add New Project</span>
            </button>
          )}

          {/* Project Form */}
          {isAddingNew && (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">
                {editingIndex !== null ? "Edit Project" : "New Project"}
              </h3>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Project title"
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  placeholder="Year (e.g., 2024)"
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Project description"
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 min-h-20 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {/* Technologies */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold">Technologies</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add technology"
                      className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={handleAddTechnology}
                      className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-[#004985] transition-colors text-sm"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {formData.technologies.length === 0 ? (
                      <p className="text-xs text-gray-400">
                        No technologies added
                      </p>
                    ) : (
                      formData.technologies.map((tech, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 group"
                        >
                          <Tag tagText={tech} />
                          <button
                            onClick={() => handleRemoveTechnology(tech)}
                            className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTrash size={10} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSaveProject}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#004985] transition-colors"
                  >
                    {editingIndex !== null ? "Update Project" : "Save Project"}
                  </button>
                  <button
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* List of Projects */}
          <div className="flex flex-col gap-3">
            {projects.length === 0 ? (
              <p className="text-sm text-gray-400">No projects added yet</p>
            ) : (
              projects.map((project, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg p-3 bg-white hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-black font-semibold">
                        {project.title}
                      </h3>
                      <span className="text-gray-400 text-xs">
                        {project.year}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(index)}
                        disabled={isAddingNew}
                        className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                        title="Edit project"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(index)}
                        disabled={isAddingNew}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50"
                        title="Delete project"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.technologies.map((tech, idx) => (
                      <Tag key={idx} tagText={tech} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        // VIEW MODE
        <div className="flex flex-col gap-4">
          {projects.length === 0 ? (
            <p className="text-sm text-gray-400">No projects added yet</p>
          ) : (
            [...projects]
              .sort((a, b) => parseInt(b.year) - parseInt(a.year)) // Sort by year descending
              .map((project, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="text-black font-semibold">
                    {project.title} <br />
                    <span className="text-gray-400 text-sm">
                      {project.year}
                    </span>
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                  <h4 className="font-semibold">Technologies</h4>
                  <div className="flex gap-2 flex-wrap">
                    {project.technologies.map((tech, idx) => (
                      <Tag key={idx} tagText={tech} />
                    ))}
                  </div>
                  {index < projects.length - 1 && (
                    <hr className="text-gray-200 mt-4 w-2/3 mx-auto" />
                  )}
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}

export default EditableProjects;
