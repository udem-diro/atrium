import TabsContainer from "../components/layouts/TabsContainer";
import ProfessorProfileCard from "../components/ProfessorProfileCard";

function ProfessorProfilePage() {
  return (
    <div>
      <h1>Professor Profile Page</h1>
      <ProfessorProfileCard
        name={"Dr. Sarah Chen"}
        department={"Computer Science"}
        email={"s.chen@udem.ca"}
      />
      <TabsContainer />
    </div>
  );
}

export default ProfessorProfilePage;
