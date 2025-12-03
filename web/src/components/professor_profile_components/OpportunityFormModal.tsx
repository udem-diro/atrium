import { useState, useEffect } from "react";
import { supabase } from "../../API/supabaseClient.tsx";
import type { Opportunity } from "../../models/Opportunity.ts";
import Button from "../widgets/Button";
import { getStore } from "../../utils/Store.ts";

interface OpportunityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity?: Opportunity | null;
  professorId: number;
  onSuccess: () => void;
}

function OpportunityFormModal({
  isOpen,
  onClose,
  opportunity,
  professorId,
  onSuccess,
}: OpportunityFormModalProps) {
  const store = getStore();
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [expiration, setExpiration] = useState("");

  // Initialize form when opportunity changes
  useEffect(() => {
    if (opportunity) {
      setTitre(opportunity.titre || "");
      setDescription(opportunity.description || "");
      setType(opportunity.type || "");
      setExpiration(opportunity.expiration || "");
    } else {
      resetForm();
    }
  }, [opportunity]);

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setType("");
    setExpiration("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titre.trim() || !description.trim() || !type || !expiration) {
      store.addNotification("Please fill in all required fields", "error");
      return;
    }

    setIsSaving(true);

    try {
      if (opportunity) {
        // Update existing opportunity
        const { error } = await supabase
          .from("opportunites")
          .update({
            titre,
            description,
            type,
            expiration,
          })
          .eq("id_opportunite", opportunity.id_opportunite);

        if (error) throw error;
        store.addNotification("Opportunity updated successfully!", "success");
      } else {
        // Create new opportunity
        const { error } = await supabase.from("opportunites").insert({
          titre,
          description,
          type,
          expiration,
          professeur_id: professorId,
          admin_id: 1,
          department: "General", // ADD THIS if required, or make it a form field
          ouvert: true, // ADD THIS - set opportunity as open by default
        });

        if (error) throw error;
        store.addNotification("Opportunity created successfully!", "success");
      }

      resetForm();
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error saving opportunity:", err);
      store.addNotification(
        `Failed to ${opportunity ? "update" : "create"} opportunity`,
        "error"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            {opportunity ? "Edit Opportunity" : "Create New Opportunity"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter opportunity title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select type</option>
              <option value="Research">Research</option>
              <option value="Internship">Internship</option>
              <option value="TA">Teaching Assistant</option>
              <option value="Scholarship">Scholarship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter opportunity description"
              rows={5}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              buttonText={isSaving ? "Saving..." : "Save"}
              variant="view"
              type="submit"
              disabled={isSaving}
            />
            <Button
              buttonText="Cancel"
              variant="delete"
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default OpportunityFormModal;
