import { FaUser } from "react-icons/fa";
import Tag from "../../components/widgets/Tag";

function ProfessorAvailabilityTab() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-300 p-4 md:p-8 lg:p-16 shadow-md">
      <div className="flex gap-2">
        <FaUser />
        <h3 className="font-semibold">Student Supervision Capacity</h3>
      </div>
      <h4 className="font-semibold">Current availability</h4>
      <div className="bg-green-200 rounded-lg px-6 py-2 text-green-700 w-fit">
        <h4>2 positions available</h4>
        <h3 className="font-semibold">for winter 2025</h3>
      </div>
      <div>
        <h3 className="font-semibold">Types of Supervision</h3>
        <div className="flex gap-2 my-1">
          <Tag tagText="Master's Thesis" />
          <Tag tagText="PhD Supervision" />
        </div>
      </div>
      <hr className="text-gray-300" />
      <h3 className="font-semibold">Additional information</h3>
      <p className="text-gray-500">
        Available to supervise internships and masters research in the topics of
        AI ethics, Machine learning
      </p>
    </div>
  );
}
export default ProfessorAvailabilityTab;
