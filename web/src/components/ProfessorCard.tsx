import { FaStar, FaUser } from "react-icons/fa";
import Tag from "./widgets/Tag";
import Button from "./widgets/Button";
import { useNavigate } from "react-router-dom";
import type { Professor } from "../models/Professor";
import { useEffect, useState } from "react";
import { supabase } from "../API/supabaseClient";

type ProfessorCardProps = {
  professor: Professor;
};

function ProfessorCard({ professor }: ProfessorCardProps) {
  const navigate = useNavigate();

  const [count, setCount] = useState<number | null>(null);

  const getInitials = (fullName: string) => {
    const words = fullName.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const navigateToProfessorProfile = () => {
    navigate(`/professor/${professor.id_professeur}`);
  };

  useEffect(() => {
    async function fetchCount() {
      if (!professor) return;

      try {
        const { data, error } = await supabase
          .from("professor_opportunity_count")
          .select("nbr_opportunities")
          .eq("professor_id", professor.id_professeur)
          .single();

        if (error) {
          console.error("Error fetching opportunity count:", error);
          setCount(0);
        } else {
          setCount(data?.nbr_opportunities ?? 0);
        }
      } catch (err) {
        console.error(err);
        setCount(0);
      }
    }

    fetchCount();
  }, [professor]);

  return (
    <div className="flex flex-col justify-between gap-4 p-5 border rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white w-full mx-auto">
      {/* Tags */}
      {professor.research_areas?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {professor.research_areas.map((area, index) => (
            <Tag key={index} tagText={area} />
          ))}
        </div>
      )}

      {/* Header: photo / initials + name + department/email */}
      <div className="flex gap-4 items-center  bg-light-gray rounded-lg px-4 py-3 shadow-md">
        {professor.photo_profil ? (
          <img
            src={professor.photo_profil}
            alt={professor.nom}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary text-white font-bold flex justify-center items-center text-xl">
            {getInitials(professor.nom)}
          </div>
        )}

        <div className="flex flex-col gap-1 text-sm">
          <h3 className="font-bold">{professor.nom}</h3>
          {professor.available_semester && (
            <h4 className="text-gray-500 text-xs">
              Available: {professor.available_semester}
            </h4>
          )}
          <h4 className="text-blue-700 font-semibold">{professor.courriel}</h4>
          {professor.site_web && (
            <a
              href={professor.site_web}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-500 underline"
            >
              Website
            </a>
          )}
        </div>
      </div>

      {/* Bio */}
      {professor.bio && (
        <p className="text-gray-600 text-md line-clamp-3">{professor.bio}</p>
      )}

      <hr className="text-gray-300" />

      {/* Stats */}
      <div className="flex gap-1 flex-col text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          <span>Opportunities Posted: {count}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-500" />
          <span>Slots Available: {professor.available_positions}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <Button
          buttonText="Contact"
          size="sm"
          variant="view"
          className="flex-1"
          onClick={() => window.open(`mailto:${professor.courriel}`)}
        />
        <Button
          buttonText="Profile"
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={navigateToProfessorProfile}
        />
      </div>
    </div>
  );
}

export default ProfessorCard;
