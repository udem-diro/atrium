import Button from "../../components/widgets/Button";
import OpportunitiesList from "./OpportunitiesList";

function ProfessorOpportunitiesTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-3 md:mb-6">
        <h2 className="font-semibold text-sm md:text-md lg:text-xl">
          Posted Opportunities
        </h2>
        <Button
          buttonText="Create New Opportunity +"
          size="responsive"
          variant="view"
        />
      </div>

      <OpportunitiesList />
    </div>
  );
}
export default ProfessorOpportunitiesTab;
