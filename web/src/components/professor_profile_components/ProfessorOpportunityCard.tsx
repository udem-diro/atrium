import type { Opportunity } from "../../models/Opportunity.ts";
import Button from "../widgets/Button";
import Tag from "../widgets/Tag";
import { useNavigate } from "react-router-dom";

interface ProfessorOpportunityCardProps {
  opportunity: Opportunity;
  isOwnProfile?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

function formatDate(date?: string | null) {
  if (!date) return null;
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString();
  } catch {
    return date;
  }
}

function safeText(value: any) {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
}

function ProfessorOpportunityCard({
  opportunity,
  isOwnProfile = false,
  onEdit,
  onDelete,
}: ProfessorOpportunityCardProps) {
  const navigate = useNavigate();

  const {
    titre,
    description,
    department,
    ouvert,
    expiration,
    partenaire,
    type,
    montant,
    location,
    skills,
    duree,
    temps_engagement,
    date_debut,
    remunere,
    nb_positions,
    id_opportunite,
  } = opportunity as any;

  const deadline = formatDate(expiration) || "No deadline";
  const startDate = formatDate(date_debut);
  const duration = safeText(duree);
  const timeCommit = safeText(temps_engagement);
  const dept = safeText(department);
  const title = titre || "Untitled opportunity";
  const desc = description || "";

  const locationDisplay =
    location === null || location === undefined
      ? "N/A"
      : typeof location === "number"
      ? `ID: ${location}`
      : String(location);

  const remunerationDisplay = remunere
    ? montant || montant === 0
      ? `${montant}$`
      : "Paid (amount not specified)"
    : "Unpaid";

  const partnerDisplay = partenaire
    ? {
        name: partenaire.name || null,
        email: partenaire.email || null,
        link: partenaire.link || null,
      }
    : null;

  return (
    <div className="flex flex-col justify-between gap-3 p-6 border rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white">
      {/* Header: Deadline, Status, Type */}
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-3">
        <div className="flex flex-col items-start gap-3">
          <h4 className="text-[#AA0000] font-semibold">Deadline: {deadline}</h4>
          <Tag tagText={type ?? "Unknown"} />
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            ouvert ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
          }`}
        >
          {ouvert ? "Open" : "Closed"}
        </span>
      </div>

      {/* Title + Department */}
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <h2 className="font-bold text-xl">{title}</h2>
        <span className="text-sm text-gray-500 md:ml-2">— {dept}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-4">{desc}</p>

      {/* Main Info Grid */}
      <div className="flex flex-col gap-6 mt-3 text-sm text-gray-700">
        {/* Left Column */}
        <ul className="grid grid-cols-2 align-center space-y-2">
          <li>
            <strong>Start:</strong> {startDate ?? "Not specified"}
          </li>
          <li>
            <strong>Duration:</strong> {duration !== "N/A" ? duration : "—"}
          </li>
          <li>
            <strong>Time commitment:</strong>{" "}
            {timeCommit !== "N/A" ? timeCommit : "—"}
          </li>
          <li>
            <strong>Remuneration:</strong> {remunerationDisplay}
          </li>
          <li>
            <strong>Positions:</strong>{" "}
            {nb_positions ? `${nb_positions} position(s)` : "Not specified"}
          </li>
          <li>
            <strong>Location:</strong> {locationDisplay}
          </li>
        </ul>
        <hr className="border-gray-300" />
        {/* Right Column */}
        <ul className="grid grid-cols-2 space-y-2">
          <li>
            <strong>Partner:</strong>{" "}
            {partnerDisplay ? (
              <div className="flex flex-col gap-1">
                {partnerDisplay.name && <span>{partnerDisplay.name}</span>}
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  {partnerDisplay.email && (
                    <a
                      href={`mailto:${partnerDisplay.email}`}
                      className="underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {partnerDisplay.email}
                    </a>
                  )}
                  {partnerDisplay.link && (
                    <a
                      href={partnerDisplay.link}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            ) : (
              "None"
            )}
          </li>
          <li>
            <strong>Skills:</strong>{" "}
            {Array.isArray(skills) && skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {skills.map((s: string) => (
                  <span
                    key={s}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              "None listed"
            )}
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-4">
        {isOwnProfile && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              buttonText="Edit"
              variant="outline"
              size="responsive"
              onClick={onEdit}
              className="flex-1"
            />
            <Button
              buttonText="Delete"
              variant="delete"
              size="responsive"
              onClick={onDelete}
              className="flex-1"
            />
          </div>
        )}
        <Button
          buttonText="View details"
          variant="view"
          size="responsive"
          onClick={() =>
            navigate(
              `/opportunity/${id_opportunite ?? opportunity.id_opportunite}`
            )
          }
        />
      </div>
    </div>
  );
}

export default ProfessorOpportunityCard;
