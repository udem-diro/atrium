import Button from "./widgets/Button";
import type { Professor } from "../models/Professor";

type ProfessorProfileCardProps = {
  professor: Professor;
  hasProfileButton?: boolean;
};

function ProfessorProfileCard({
  professor,
  hasProfileButton = true,
}: ProfessorProfileCardProps) {
  return (
    <div className="w-full flex gap-5 md:gap-6 justify-center md:justify-start items-center border rounded-xl border-gray-400 p-4 md:p-6 lg:px-12 lg:py-8 shadow-md">
      <div className="w-18 aspect-square rounded-full bg-primary text-white font-semibold flex justify-center items-center">
        S
      </div>
      <div>
        <div className="text-sm text-gray-800">
          <h3 className="font-semibold">{professor.nom}</h3>
          <h4 className="text-xs mb-0.5 text-gray-500">{professor.bio}</h4>
          <h4 className="font-semibold">{professor.courriel}</h4>
        </div>
        <div className="flex gap-2 mt-2">
          <Button buttonText="Contact" size="responsive" variant="view" />
          {hasProfileButton && (
            <Button buttonText="Profile" size="responsive" variant="outline" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfessorProfileCard;
