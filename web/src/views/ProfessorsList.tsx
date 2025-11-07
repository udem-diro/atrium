import ProfessorCard from "../components/ProfessorCard";

function ProfessorsList() {
  return (
    <div className="grid gap-2 md:gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProfessorCard
        name="Dr. Sarah Chen"
        department="Computer Science"
        email="sarah.chen@example.com"
        shortBio="Expert in AI and Machine Learning."
        nbrPostedOpportunities={5}
        nbrSlotsAvailable={2}
        tags={["AI", "Machine Learning"]}
      />
      <ProfessorCard
        name="Dr. John Smith"
        department="Mathematics"
        email="john.smith@example.com"
        shortBio="Specializes in Algebra and Geometry."
        nbrPostedOpportunities={3}
        nbrSlotsAvailable={1}
        tags={["Mathematics", "Geometry"]}
      />
      <ProfessorCard
        name="Dr. Emily Johnson"
        department="Physics"
        email="emily.johnson@example.com"
        shortBio="Researcher in Quantum Mechanics."
        nbrPostedOpportunities={4}
        nbrSlotsAvailable={0}
        tags={["Physics", "Quantum Mechanics"]}
      />
      <ProfessorCard
        name="Dr. Michael Brown"
        department="Chemistry"
        email="michael.brown@example.com"
        shortBio="Chemistry expert with a focus on Organic Chemistry."
        nbrPostedOpportunities={2}
        nbrSlotsAvailable={3}
        tags={["Chemistry", "Organic Chemistry"]}
      />
    </div>
  );
}

export default ProfessorsList;
