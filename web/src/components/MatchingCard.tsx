import SearchBar from "./widgets/SearchBar";
import Tag from "./widgets/Tag";

type MatchingCardProps = {
  text: string;
};

function MatchingCard({ text }: MatchingCardProps) {
  return (
    <div className="flex flex-col gap-2 border border-gray-400 rounded-lg shadow-md p-2 md:p-4">
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center w-8 aspect-square rounded-full bg-gray-300">
          1
        </div>
        <h2>Select Opportunity</h2>
      </div>
      <SearchBar placeholder={`Search ${text}`} />
      <div className="flex flex-col gap-2 h-[250px] overflow-y-scroll overflow-x-hidden py-2">
        <div className="border border-gray-300 rounded-xl p-2 mr-2">
          <div className="flex gap-2">
            <Tag tagText="Internship" />
            <h3 className="font-semibold text-[14px]">
              Front-End dev internship
            </h3>
          </div>
          <h4 className="text-sm text-gray-500">computer science department</h4>
        </div>
        <div className="border border-gray-300 rounded-xl p-2 mr-2">
          <div className="flex gap-2">
            <Tag tagText="Internship" />
            <h3 className="font-semibold text-[14px]">
              Front-End dev internship
            </h3>
          </div>
          <h4 className="text-sm text-gray-500">computer science department</h4>
        </div>
        <div className="border border-gray-300 rounded-xl p-2 mr-2">
          <div className="flex gap-2">
            <Tag tagText="Internship" />
            <h3 className="font-semibold text-[14px]">
              Front-End dev internship
            </h3>
          </div>
          <h4 className="text-sm text-gray-500">computer science department</h4>
        </div>
        <div className="border border-gray-300 rounded-xl p-2 mr-2">
          <div className="flex gap-2">
            <Tag tagText="Internship" />
            <h3 className="font-semibold text-[14px]">
              Front-End dev internship
            </h3>
          </div>
          <h4 className="text-sm text-gray-500">computer science department</h4>
        </div>
      </div>
    </div>
  );
}

export default MatchingCard;
