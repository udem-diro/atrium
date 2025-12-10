import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Opportunity } from "../models/Opportunity.ts";
import type { Professor } from "../models/Professor.ts";
import Button from "./widgets/Button";
import Tag from "./widgets/Tag";
import { getProfesseur } from "../API/updateDB/updateProfesseur.ts";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

function formatDate(date?: string | null) {
  if (!date) return "N/A";
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

function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const navigate = useNavigate();
  const [professor, setProfessor] = useState<Professor | null>(null);

  // Fetch professor data
  useEffect(() => {
    async function fetchProfessor() {
      if (!opportunity.professeur_id) return;
      try {
        const prof = await getProfesseur(opportunity.professeur_id);
        setProfessor(prof);
      } catch (err) {
        console.error("Error fetching professor:", err);
      }
    }
    fetchProfessor();
  }, [opportunity.professeur_id]);

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

  const deadline = formatDate(expiration);
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
      : "Paid"
    : "Unpaid";

  const partnerDisplay = partenaire
    ? {
        name: partenaire.name || null,
        email: partenaire.email || null,
        link: partenaire.link || null,
      }
    : null;

  // Professor initials
  const getInitials = (fullName: string) => {
    const words = fullName.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className="flex flex-col justify-between gap-2 p-6 border rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white">
      <div className="flex flex-col gap-2">
        {/* Header */}

        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <h4 className="text-[#AA0000] font-semibold">
              Deadline: {deadline}
            </h4>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                ouvert
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {ouvert ? "Open" : "Closed"}
            </div>
          </div>
          <div className="flex justify-start">
            <Tag tagText={type ?? "Unknown"} />
          </div>
        </div>

        {/* Title + Department */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h2 className="font-bold text-xl">{title}</h2>
          <span className="text-sm text-gray-500 md:ml-2">— {dept}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">{desc}</p>

        {/* Main Info Grid */}
        <div className="flex flex-col gap-4 mt-3 text-sm text-gray-700">
          <ul className="grid grid-cols-2 space-y-2">
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
          <ul className="flex gap-6">
            {partnerDisplay?.name ? (
              <li className="flex-1">
                <strong>Partner:</strong>{" "}
                {partnerDisplay.name ? (
                  <div className=" flex flex-col gap-1">
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
                    </div>
                  </div>
                ) : (
                  "None"
                )}
              </li>
            ) : (
              <li></li>
            )}
            <li>
              <strong>Skills:</strong>{" "}
              {Array.isArray(skills) && skills.length > 0 ? (
                <div className="flex-1 flex flex-wrap gap-2 mt-1">
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
      </div>
      <div>
        {/* Professor section */}
        {professor && (
          <div className="mt-1">
            <h3 className="font-semibold mb-1">Professor</h3>
            <div className="flex gap-4 items-center bg-light-gray rounded-lg px-4 py-3 shadow-md ">
              {professor.photo_profil ? (
                <img
                  src={professor.photo_profil}
                  alt={professor.nom}
                  className="w-16 aspect-square rounded-full object-cover"
                />
              ) : (
                <div className="w-16 aspect-square rounded-full bg-primary text-white font-bold flex justify-center items-center text-xl">
                  {getInitials(professor.nom)}
                </div>
              )}
              <div className="flex flex-col gap-1">
                <h4 className="font-bold">{professor.nom}</h4>
                {professor.bio && (
                  <h5 className="text-xs text-gray-500 line-clamp-1">
                    {professor.bio}
                  </h5>
                )}
                <h5 className="text-dark-green font-semibold">
                  {professor.courriel}
                </h5>
                <div className="flex gap-2 mt-1">
                  <Button
                    buttonText="Contact"
                    size="sm"
                    variant="view"
                    onClick={() => window.open(`mailto:${professor.courriel}`)}
                  />
                  <Button
                    buttonText="Profile"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      navigate(`/professor/${professor.id_professeur}`)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-4">
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
    </div>
  );
}

export default OpportunityCard;
