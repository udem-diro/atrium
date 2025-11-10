import OrganisationProfileCard from "../components/OrganisationProfileCard.tsx";
import ProfessorProfileCard from "../components/ProfessorProfileCard.tsx";
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

        <div className="flex w-full flex-col md:flex-row gap-4 justify-center">
          <ProfessorProfileCard
            name="Dr. Jane Smith"
            department="Computer Science"
            email="jane.smith@university.edu"
          />
          <OrganisationProfileCard
            name="Tech Innovations Inc."
            department="Research and Development"
            email="contact@techinnovations.com"
          />
        </div>

        <div className="w-full grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 justify-center items-center mt-1 mb-1 md:mb-3 lg:mb-4 lg:mt-4">
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

        <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] md:grid-rows-2 gap-4">
          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:row-span-2">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              porttitor nisi lectus, a lacinia nibh volutpat a. Donec pulvinar
              eros et lectus finibus egestas. Morbi blandit lacinia nisi, a
              viverra metus. Suspendisse varius ex fringilla lorem facilisis
              blandit. Ut at nulla eget dolor luctus dapibus non ut justo.{" "}
            </p>
          </div>

          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:ml-1">
            <h2 className="font-semibold mb-2">Requirements</h2>
            <ul className="text-gray-500 text-sm list-disc list-inside leading-6">
              <li>Background in computer science</li>
              <li>Background in computer science</li>
              <li>Background in computer science</li>
              <li>Background in computer science</li>
            </ul>
          </div>

          <div className="border border-gray-400 shadow-md p-6 rounded-xl md:p-8 lg:p-10 md:ml-1">
            <h2 className="font-semibold mb-2">Desired Skills</h2>
            <div className="flex gap-1 flex-wrap leading-5">
              <Tag tagText="Python" />
              <Tag tagText="Machine Learning" />
              <Tag tagText="Data Analysis" />
              <Tag tagText="Ethics" />
              <Tag tagText="Research" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpportunityPage;
