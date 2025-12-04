import Button from "./widgets/Button";
import { useNavigate } from "react-router-dom";
import type { Professor } from "../models/Professor";

type ProfessorProfileCardProps = {
  professor: Professor;
  hasProfileButton?: boolean;
};

function ProfessorProfileCard({
  professor,
  hasProfileButton = true,
}: ProfessorProfileCardProps) {
  const navigate = useNavigate();
  // Extract initials
  const getInitials = (fullName: string) => {
    const words = fullName.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const initials = getInitials(professor.nom);

  return (
    <div className="w-full flex gap-5 md:gap-6 justify-center md:justify-start items-center border rounded-xl border-gray-400 p-4 md:p-6 lg:px-12 lg:py-8 shadow-md">
      {/* Profile photo or initials */}
      {professor.photo_profil ? (
        <img
          src={professor.photo_profil}
          alt={professor.nom}
          className="w-24 aspect-square rounded-full object-cover"
        />
      ) : (
        <div className="w-24 aspect-square rounded-full bg-primary text-white font-semibold flex justify-center items-center text-xl">
          {initials}
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col justify-between w-full">
        <div className="text-sm text-gray-800">
          <h3 className="font-semibold">{professor.nom}</h3>
          {professor.bio && (
            <h4 className="text-xs mb-0.5 text-gray-500">{professor.bio}</h4>
          )}
          <h4 className="font-semibold">{professor.courriel}</h4>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {/* Contact button opens mail */}
          <Button
            buttonText="Contact"
            size="responsive"
            variant="view"
            onClick={() => window.open(`mailto:${professor.courriel}`)}
          />

          {/* Profile button opens website if exists */}
          {hasProfileButton && professor.site_web && (
            <Button
              buttonText="Profile"
              size="responsive"
              variant="outline"
              onClick={() => navigate(`/professor/${professor.id_professeur}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfessorProfileCard;
