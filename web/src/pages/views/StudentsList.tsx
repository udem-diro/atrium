import StudentCard from "../../components/StudentCard";

function StudentsList() {
  return (
    <div className="grid gap-2 md:gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      <StudentCard
        name="John Doe"
        department="Computer Science"
        email="john.doe@example.com"
        shortBio="Aspiring software engineer."
        nbrPostedOpportunities={2}
        nbrSlotsAvailable={1}
        tags={["JavaScript", "React"]}
      />
      <StudentCard
        name="Jane Smith"
        department="Mathematics"
        email="jane.smith@example.com"
        shortBio="Mathematics enthusiast."
        nbrPostedOpportunities={0}
        nbrSlotsAvailable={0}
        tags={["TA", "Internship"]}
      />
      <StudentCard
        name="Alice Johnson"
        department="Physics"
        email="alice.johnson@example.com"
        shortBio="Physics major with a passion for research."
        nbrPostedOpportunities={1}
        nbrSlotsAvailable={1}
        tags={["Physics", "Research"]}
      />
      <StudentCard
        name="Bob Brown"
        department="Chemistry"
        email="bob.brown@example.com"
        shortBio="Chemistry student with a focus on organic chemistry."
        nbrPostedOpportunities={0}
        nbrSlotsAvailable={0}
        tags={["TA", "Internship"]}
      />
    </div>
  );
}

export default StudentsList;
