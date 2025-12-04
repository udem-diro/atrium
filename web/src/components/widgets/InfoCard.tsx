type InfoCardProps = {
  title: string;
  content: string;
  color: string;
  icon: React.ComponentType;
};

function InfoCard({ title, content, color, icon: Icon }: InfoCardProps) {
  const colorClass = `${color}`;
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-6 border border-gray-400 p-3 py-6 md:p-6 rounded-lg shadow-md">
      <div
        className={`${colorClass} rounded-xl w-[50%] md:w-[60%] lg:w-[20%] aspect-square flex justify-center items-center text-white text-3xl`}
      >
        <Icon />
      </div>
      <div className="w-full text-center">
        <h2 className="font-semibold text-sm md:text-lg">{title}</h2>
        <p className="text-gray-600 text-sm md:text-lg">{content}</p>
      </div>
    </div>
  );
}
export default InfoCard;
