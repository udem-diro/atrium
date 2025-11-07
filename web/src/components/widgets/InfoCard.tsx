type InfoCardProps = {
  title: string;
  content: string;
  icon: React.ComponentType;
};

function InfoCard({ title, content, icon: Icon }: InfoCardProps) {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-6 border border-gray-400 p-3 md:p-6 rounded-lg shadow-md">
      <div className="bg-primary rounded-xl w-[60%] lg:w-[25%] aspect-square flex justify-center items-center text-white text-3xl">
        <Icon />
      </div>
      <div className="w-[50%] text-center">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}
export default InfoCard;
