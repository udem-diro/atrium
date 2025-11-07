import ProfessorCard from "../components/ProfessorCard";
import Button from "../components/widgets/Button";
import InfoCard from "../components/widgets/InfoCard.tsx";
import Tag from "../components/widgets/Tag";
import { FaClock } from "react-icons/fa";

function OpportunityPage() {
  return (
    <div className="mt-6">
      <Button
        buttonText="&larr; Back to search"
        size="responsive"
        variant="outline"
      />

      <div className="flex flex-col gap-4 justify-center items-start mt-6">
        <div className="flex gap-2 justify-start">
          <Tag tagText={"Research"} />
          <Tag tagText={"3 students"} />
        </div>

        <h1 className="text-md md:text-lg lg:text-xl font-semibold">
          AI Ethics Research
        </h1>

        <ProfessorCard
          name={"Dr. Alice Martin"}
          department={"Computer Science"}
          email={"a.martin@umontreal.ca"}
          shortBio={""}
          nbrPostedOpportunities={0}
          nbrSlotsAvailable={0}
          tags={["Machine Learning", "Ethics"]}
        />

        <div className="w-full grid gap-3 md:gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 justify-center items-center">
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
          <InfoCard
            title="Deadline"
            content="December 15, 2024"
            icon={FaClock}
          />
        </div>
      </div>
    </div>
  );
}

export default OpportunityPage;
