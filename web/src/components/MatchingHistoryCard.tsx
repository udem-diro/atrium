import { FaEdit } from "react-icons/fa";
import Tag from "./widgets/Tag";

function MatchingHistoryCard() {
  return (
    <div className="relative p-4 bg-gray-200 rounded-lg my-4">
      <div className="flex items-center gap-2">
        <Tag tagText="internship" />
        <h3 className="font-semibold">Front-End dev internship</h3>
      </div>
      <h4 className="mb-2 text-gray-400">Computer science department</h4>
      <div className="flex gap-2 md:gap-8 lg:gap-16 2xl:gap-24 justify-start  text-sm">
        <div>
          <h4 className="font-semibold mb-1">Matched Students:</h4>
          <div className="flex  gap-1 text-xs">
            <div className="bg-amber-100 rounded-lg px-2 py-1">John Doe</div>
            <div className="bg-amber-100 rounded-lg px-2 py-1">Jane Smith</div>
            <div className="bg-amber-100 rounded-lg px-2 py-1">
              Emily Johnson
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Professor:</h4>
          <div className="text-xs">
            <div className="bg-blue-200 rounded-lg px-2 py-1">
              Dr. Sara Chen
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-green-300 rounded-full p-1 cursor-pointer flex justify-center items-center">
        <FaEdit />
      </div>
    </div>
  );
}

export default MatchingHistoryCard;
