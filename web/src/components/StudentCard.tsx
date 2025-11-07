import { FaLink } from "react-icons/fa";
import Tag from "./widgets/Tag";

type StudentCardProps = {
  name: string;
  department: string;
  email: string;
  shortBio: string;
  nbrPostedOpportunities: number;
  nbrSlotsAvailable: number;
  tags: string[];
};

function StudentCard({
  name,
  department,
  email,
  shortBio,
  tags,
}: StudentCardProps) {
  return (
    <div className="flex justify-center border border-gray-300 rounded-lg shadow-md  hover:shadow-lg transition-shadow relative">
      <FaLink className="absolute text-sm text-primary top-4 right-4 " />
      <div className=" w-[90%] flex flex-col justify-center items-start md:items-start gap-2 md:gap-3 px-4 py-4 ">
        <div className="flex gap-1 justify-start">
          <Tag tagText={tags[0]} />
          <Tag tagText={tags[1]} />
        </div>
        <div className="flex gap-1 justify-start items-center">
          <div className="flex justify-center items-center min-w-10  w-14 lg:w-16 aspect-square rounded-full bg-primary text-white font-bold">
            S
          </div>
          <div className="wrap-anywhere text-xs">
            <h3>{name}</h3>
            <h4>{department}</h4>
            <h4>{email}</h4>
          </div>
        </div>
        <p className="text-sm text-justify text-gray-400">{shortBio}</p>
        <div></div>
      </div>
    </div>
  );
}

export default StudentCard;
