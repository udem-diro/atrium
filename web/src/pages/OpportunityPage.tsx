import { useNavigate } from "react-router";
import OrganisationProfileCard from "../components/OrganisationProfileCard.tsx";
import ProfessorProfileCard from "../components/ProfessorProfileCard.tsx";
import Button from "../components/widgets/Button";
import InfoCard from "../components/widgets/InfoCard.tsx";
import Tag from "../components/widgets/Tag";
import {
  FaClock,
  FaCalendarAlt,
  FaUserGraduate,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOpportunity } from "../API/updateDB/updateOpportunite.ts";
import { getProfesseur } from "../API/updateDB/updateProfesseur.ts";
import type { Opportunity } from "../models/Opportunity.ts";
import type { Professor } from "../models/Professor.ts";

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

function OpportunityPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [professor, setProfessor] = useState<Professor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;

      try {
        const opp = await getOpportunity(id);
        setOpportunity(opp);

        const prof = await getProfesseur(opp.professeur_id);
        setProfessor(prof);
      } catch (err) {
        console.error("Error fetching opportunity:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!opportunity) return <p>Opportunity not found.</p>;

  const {
    titre,
    description,
    expiration,
    partenaire,
    skills,
    exigences,
    nb_positions,
    location,
    duree,
    temps_engagement,
    date_debut,
    remunere,
    montant,
  } = opportunity;

  const formattedDeadline = formatDate(expiration);
  const formattedStartDate = formatDate(date_debut);
  const remunerationDisplay = remunere
    ? montant || montant === 0
      ? `${montant}$`
      : "Paid (amount not specified)"
    : "Unpaid";

  return (
    <div className="mt-6">
      <Button
        buttonText="&larr; Back"
        size="responsive"
        variant="outline"
        onClick={() => navigate(-1)}
      />

      <div className="flex flex-col gap-4 justify-center items-start mt-6">
        {/* Tags */}
        <div className="flex gap-2 justify-start flex-wrap">
          <Tag tagText={opportunity?.type ?? "Opportunity"} />
          <Tag tagText={`${nb_positions ?? "N/A"} positions`} />
        </div>

        {/* Title */}
        <h1 className="text-md md:text-lg lg:text-xl font-semibold">{titre}</h1>

        {/* Profiles */}
        <div className="flex w-full flex-col md:flex-row gap-4 justify-start items-start">
          {professor && <ProfessorProfileCard professor={professor} />}
          {partenaire && partenaire.name && (
            <OrganisationProfileCard
              name={partenaire.name}
              email={partenaire.email ?? "N/A"}
              link={partenaire.link ?? undefined}
            />
          )}
        </div>

        {/* Info Cards */}
        <div className="w-full grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 mt-4">
          <InfoCard
            title="Deadline"
            content={formattedDeadline}
            icon={FaClock}
            color="bg-dark-red"
          />
          <InfoCard
            title="Start Date"
            content={formattedStartDate}
            icon={FaCalendarAlt}
            color="bg-dark-green"
          />
          <InfoCard
            title="Location"
            content={location?.toString() ?? "N/A"}
            icon={FaMapMarkerAlt}
            color="bg-dark-yellow"
          />
          <InfoCard
            title="Duration"
            content={duree ?? "N/A"}
            icon={FaClock}
            color="bg-dark-purple"
          />
          <InfoCard
            title="Time Commitment"
            content={temps_engagement ?? "N/A"}
            icon={FaClock}
            color="bg-dark-orange"
          />
          <InfoCard
            title="Remuneration"
            content={remunerationDisplay}
            icon={FaClock}
            color="bg-dark-turquoise"
          />
        </div>

        {/* Description & Requirements & Skills */}
        <div className="w-full flex flex-col md:grid md:grid-cols-[2fr_1fr] md:grid-rows-2 gap-4 mt-4">
          {/* Description */}
          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:row-span-2">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>

          {/* Requirements */}
          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:ml-1">
            <h2 className="font-semibold mb-2">Requirements</h2>
            {exigences && exigences.length > 0 ? (
              <ul className="text-gray-500 text-sm list-disc list-inside leading-6">
                {exigences.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                No specific requirements listed.
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:ml-1">
            <h2 className="font-semibold mb-2">Desired Skills</h2>
            {skills && skills.length > 0 ? (
              <div className="flex gap-2 flex-wrap">
                {skills.map((skill, idx) => (
                  <Tag key={idx} tagText={skill} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No skills listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpportunityPage;
