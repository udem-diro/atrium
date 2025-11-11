import Button from "../../components/widgets/Button";
import OpportunitiesList from "./OpportunitiesList";

function AdminOpportunitiesTab() {
  return (
    <div>
      <div className="flex justify-between items-center my-4 md:my-6">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Opportunities Management
        </h2>
        <Button
          buttonText="Add Opportunity +"
          size="responsive"
          variant="view"
        />
      </div>
      <div>
        <OpportunitiesList />
      </div>
    </div>
  );
}
export default AdminOpportunitiesTab;
