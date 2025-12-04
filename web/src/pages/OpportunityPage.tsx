import { useNavigate } from "react-router";
import OrganisationProfileCard from "../components/OrganisationProfileCard.tsx";
import ProfessorProfileCard from "../components/ProfessorProfileCard.tsx";
import Button from "../components/widgets/Button";
import InfoCard from "../components/widgets/InfoCard.tsx";
import Tag from "../components/widgets/Tag";
import { FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOpportunity } from "../API/updateDB/updateOpportunite.ts";
import { getProfesseur } from "../API/updateDB/updateProfesseur.ts";
import type { Opportunity } from "../models/Opportunity.ts";
import type { Professor } from "../models/Professor.ts";

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
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-6">
      <Button
        buttonText="&larr; Back"
        size="responsive"
        variant="outline"
        onClick={() => navigate(-1)}
      />

      <div className="flex flex-col gap-4 justify-center items-start mt-6">
        <div className="flex gap-2 justify-start">
          <Tag tagText={"Research"} />
          <Tag tagText={"3 students"} />
        </div>

        <h1 className="text-md md:text-lg lg:text-xl font-semibold">
          {opportunity?.titre}
        </h1>

        <div className="flex w-full flex-col md:flex-row gap-4 justify-center">
          {professor && <ProfessorProfileCard professor={professor} />}
          <OrganisationProfileCard
            name={opportunity?.partenaire?.name}
            department="Research and Development"
            email="contact@techinnovations.com"
          />
        </div>

        <div className="w-full grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 justify-center items-center mt-1 mb-1 md:mb-3 lg:mb-4 lg:mt-4">
          <InfoCard
            title="Deadline"
            content={opportunity?.expiration ?? "N/A"}
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
        </div>

        <div className="w-full flex flex-col md:grid md:grid-cols-[2fr_1fr] md:grid-rows-2 gap-4">
          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:row-span-2">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-500 text-sm">{opportunity?.description} </p>
          </div>

          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:ml-1">
            <h2 className="font-semibold mb-2">Requirements</h2>
            <ul className="text-gray-500 text-sm list-disc list-inside leading-6">
              {opportunity?.exigences}
            </ul>
          </div>

          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:ml-1">
            <h2 className="font-semibold mb-2">Desired Skills</h2>
            <div className="flex gap-1 flex-wrap leading-5">
              {opportunity?.skills?.map((skill, index) => (
                <Tag key={index} tagText={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpportunityPage;
