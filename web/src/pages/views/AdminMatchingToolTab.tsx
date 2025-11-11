import MatchingCard from "../../components/MatchingCard";
import MatchingHistoryCard from "../../components/MatchingHistoryCard";

function AdminMatchingToolTab() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold my-2 md:my-6">
        Matching Tool
      </h2>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4  mb-4">
        <MatchingCard text="Select Opportunity" />
        <MatchingCard text="Select Professor" />
        <MatchingCard text="Select Student" />
      </div>

      <div className="p-4 border rounded-lg shadow-md">
        <h3>Recent Matches</h3>
        <MatchingHistoryCard />
        <MatchingHistoryCard />
        <MatchingHistoryCard />
      </div>
    </div>
  );
}

export default AdminMatchingToolTab;
