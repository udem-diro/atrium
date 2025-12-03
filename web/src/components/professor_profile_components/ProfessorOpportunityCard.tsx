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

function ProfessorOpportunityCard({
  opportunity,
  isOwnProfile = false,
  onEdit,
  onDelete,
}: ProfessorOpportunityCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 lg:gap-5 justify-between p-4 md:p-5 2xl:p-10 border rounded-lg shadow-md hover:shadow-black/20 transition-shadow">
      <h4 className="text-[#AA0000]">Deadline: {opportunity.expiration}</h4>
      <div className="flex gap-2">
        <Tag tagText={opportunity.type} />
        <h2 className="font-semibold">{opportunity.titre}</h2>
      </div>
      <p className="text-[#838383] text-sm line-clamp-3">
        {opportunity.description}
      </p>

      <div className="flex gap-6 text-sm text-[#848484] font-bold self-center">
        <div>
          <ul>
            <li>15sep -15dec</li>
            <li>$18-20/h</li>
            <li>2 persons</li>
          </ul>
        </div>
        <div className="w-px h-12 bg-gray-300 self-center"></div>
        <div>
          <ul>
            <li>20-25h/week</li>
            <li>Pav.Roger G 2442</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {isOwnProfile && (
          <div className="flex gap-2 justify-center">
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
          buttonText="view details"
          variant="view"
          size="responsive"
          onClick={() => navigate(`/opportunity/${opportunity.id_opportunite}`)}
        />
      </div>
    </div>
  );
}

export default ProfessorOpportunityCard;
