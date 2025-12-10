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

  // Basic fields
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [expiration, setExpiration] = useState("");
  const [department, setDepartment] = useState("");
  const [ouvert, setOuvert] = useState(true);

  // New fields
  const [duree, setDuree] = useState("");
  const [tempsEngagement, setTempsEngagement] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [remunere, setRemunere] = useState(false);
  const [montant, setMontant] = useState("");
  const [location, setlocation] = useState("");
  const [nbPositions, setNbPositions] = useState("");

  // Array fields
  const [exigences, setExigences] = useState<string[]>([]);
  const [newExigence, setNewExigence] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Partner object
  const [hasPartner, setHasPartner] = useState(false);
  const [partnerName, setPartnerName] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [partnerLink, setPartnerLink] = useState("");

  // Initialize form when opportunity changes
  useEffect(() => {
    if (opportunity) {
      setTitre(opportunity.titre || "");
      setDescription(opportunity.description || "");
      setType(opportunity.type || "");
      setExpiration(opportunity.expiration || "");
      setDepartment(opportunity.department || "");
      setOuvert(opportunity.ouvert ?? true);

      setDuree(opportunity.duree || "");
      setTempsEngagement(opportunity.temps_engagement || "");
      setDateDebut(opportunity.date_debut || "");
      setRemunere(opportunity.remunere ?? false);
      setMontant(opportunity.montant?.toString() || "");
      setNbPositions(opportunity.nb_positions?.toString() || "");
      setNbPositions(opportunity.nb_positions?.toString() || "");

      setExigences(opportunity.exigences || []);
      setSkills(opportunity.skills || []);

      if (opportunity.partenaire) {
        setHasPartner(true);
        setPartnerName(opportunity.partenaire.name || "");
        setPartnerEmail(opportunity.partenaire.email || "");
        setPartnerLink(opportunity.partenaire.link || "");
      } else {
        setHasPartner(false);
      }
    } else {
      resetForm();
    }
  }, [opportunity]);

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setType("");
    setExpiration("");
    setDepartment("");
    setOuvert(true);
    setDuree("");
    setTempsEngagement("");
    setDateDebut("");
    setRemunere(false);
    setMontant("");
    setlocation("");
    setNbPositions("");
    setExigences([]);
    setSkills([]);
    setHasPartner(false);
    setPartnerName("");
    setPartnerEmail("");
    setPartnerLink("");
    setNewExigence("");
    setNewSkill("");
  };

  // Handle adding exigences
  const handleAddExigence = () => {
    const trimmed = newExigence.trim();
    if (trimmed && !exigences.includes(trimmed)) {
      setExigences([...exigences, trimmed]);
      setNewExigence("");
    }
  };

  const handleRemoveExigence = (exigence: string) => {
    setExigences(exigences.filter((e) => e !== exigence));
  };

  // Handle adding skills
  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titre.trim() || !description.trim() || !type || !expiration) {
      store.addNotification("Please fill in all required fields", "error");
      return;
    }

    setIsSaving(true);

    try {
      // Prepare partner object
      const partnerData = hasPartner
        ? {
            name: partnerName.trim(),
            email: partnerEmail.trim(),
            link: partnerLink.trim(),
          }
        : null;

      const opportunityData = {
        titre,
        description,
        type,
        expiration,
        department: department || "General",
        ouvert,
        duree: duree || null,
        temps_engagement: tempsEngagement || null,
        date_debut: dateDebut || null,
        remunere,
        montant: montant ? parseFloat(montant) : null,
        location: location || null,
        nb_positions: nbPositions ? parseInt(nbPositions) : null,
        exigences,
        skills,
        partenaire: partnerData,
      };

      if (opportunity) {
        // Update existing opportunity
        const { error } = await supabase
          .from("opportunites")
          .update(opportunityData)
          .eq("id_opportunite", opportunity.id_opportunite);

        if (error) throw error;
        store.addNotification("Opportunity updated successfully!", "success");
      } else {
        // Create new opportunity
        const { error } = await supabase.from("opportunites").insert({
          ...opportunityData,
          professeur_id: professorId,
          admin_id: 1,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold">
            {opportunity ? "Edit Opportunity" : "Create New Opportunity"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  Submission Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Number of Positions
                </label>
                <input
                  type="number"
                  value={nbPositions}
                  onChange={(e) => setNbPositions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 2"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ouvert}
                    onChange={(e) => setOuvert(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">
                    Opportunity is Open
                  </span>
                </label>
              </div>
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
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Pav. Roger-Gaudry 2442"
              />
            </div>
          </div>

          {/* Timeline & Commitment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Timeline & Commitment
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={duree}
                  onChange={(e) => setDuree(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 3 months, 1 semester"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Time Commitment
              </label>
              <input
                type="text"
                value={tempsEngagement}
                onChange={(e) => setTempsEngagement(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., 10-15 hours/week, Full-time"
              />
            </div>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Compensation
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remunere}
                  onChange={(e) => setRemunere(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">
                  This is a paid position
                </span>
              </label>
            </div>

            {remunere && (
              <div className="grid grid-cols-1  gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Amount ($/hour or total)
                  </label>
                  <input
                    type="float"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 20"
                    min="0"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Requirements
            </h3>

            <div>
              <label className="block text-sm font-medium mb-1">
                Requirements
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newExigence}
                  onChange={(e) => setNewExigence(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddExigence())
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add a requirement..."
                />
                <Button
                  buttonText="Add"
                  variant="view"
                  type="button"
                  onClick={handleAddExigence}
                />
              </div>
              {exigences.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exigences.map((exigence) => (
                    <span
                      key={exigence}
                      className="bg-gray-200 px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                    >
                      {exigence}
                      <button
                        type="button"
                        onClick={() => handleRemoveExigence(exigence)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Required Skills
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddSkill())
                  }
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add a skill..."
                />
                <Button
                  buttonText="Add"
                  variant="view"
                  type="button"
                  onClick={handleAddSkill}
                />
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Partner Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Partner Information
              </h3>
              <label className="flex items-center gap-2 cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={hasPartner}
                  onChange={(e) => setHasPartner(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">This opportunity has a partner</span>
              </label>
            </div>

            {hasPartner && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Partner Name
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Organization/Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Partner Email
                  </label>
                  <input
                    type="email"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="contact@partner.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Partner Website
                  </label>
                  <input
                    type="url"
                    value={partnerLink}
                    onChange={(e) => setPartnerLink(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://partner.com"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
            <Button
              buttonText={isSaving ? "Saving..." : "Save Opportunity"}
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
