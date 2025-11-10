import { FaStar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Tag from "./widgets/Tag";
import Button from "./widgets/Button";
import { useNavigate } from "react-router-dom";

type ProfessorCardProps = {
  name: string;
  department: string;
  email: string;
  shortBio: string;
  nbrPostedOpportunities: number;
  nbrSlotsAvailable: number;
  tags: string[];
};

function ProfessorCard({
  name,
  department,
  email,
  shortBio,
  nbrPostedOpportunities,
  nbrSlotsAvailable,
  tags,
}: ProfessorCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center border border-gray-300 rounded-lg shadow-md  hover:shadow-lg transition-shadow">
      <div className=" w-[90%] flex flex-col justify-center items-start md:items-start gap-2 md:gap-3 px-4 py-4">
        <div className="flex gap-1 justify-start">
          <Tag tagText={tags[0]} />
          <Tag tagText={tags[1]} />
        </div>
        <div className="flex gap-1 justify-start items-center">
          <div className="flex justify-center items-center min-w-10  w-16 aspect-square rounded-full bg-primary text-white font-bold">
            S
          </div>
          <div className="text-xs wrap-anywhere">
            <h3>{name}</h3>
            <h4>{department}</h4>
            <h4>{email}</h4>
          </div>
        </div>
        <p className="text-sm text-justify text-gray-400">{shortBio}</p>
        <div>
          <div className="flex justify-start items-center gap-2 text-sm">
            <FaStar />
            <h3>{nbrPostedOpportunities} Posted Opportunities</h3>
          </div>

          <div className="flex justify-start items-center gap-2 text-sm">
            <FaUser />
            <h3>{nbrSlotsAvailable} Slots Available</h3>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            buttonText="Contact"
            variant="view"
            size="responsive"
            onClick={() =>
              (window.location.href = "mailto:someone@example.com")
            }
          />
          <Button
            buttonText="Profile"
            variant="outline"
            size="responsive"
            onClick={() => navigate("/professor")}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfessorCard;
