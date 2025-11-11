import OppotunityCard from "../../components/OppotunityCard";

function OpportunitiesList() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6">
      <OppotunityCard />
      <OppotunityCard />
      <OppotunityCard />
      <OppotunityCard />
    </div>
  );
}

export default OpportunitiesList;
