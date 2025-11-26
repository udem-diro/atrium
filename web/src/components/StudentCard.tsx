import { FaLink } from "react-icons/fa";
import Tag from "./widgets/Tag";
import { useNavigate } from "react-router-dom";
import type { Student } from "../models/Student";

type StudentCardProps = {
  student: Student;
};

function StudentCard({ student }: StudentCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center border border-gray-300 rounded-lg shadow-md  hover:shadow-lg transition-shadow relative cursor-pointer"
      onClick={() => navigate(`/student/${student.id_etudiant}`)}
    >
      <FaLink className="absolute text-sm text-primary top-4 right-4 " />
      <div className=" w-[90%] flex flex-col justify-center items-start md:items-start gap-2 md:gap-3 px-4 py-4 ">
        <div className="flex gap-1 justify-start">
          <Tag tagText="tag1" />
          <Tag tagText="tag2" />
        </div>
        <div className="flex gap-1 justify-start items-center">
          <div className="flex justify-center items-center min-w-10  w-14 lg:w-16 aspect-square rounded-full bg-primary text-white font-bold">
            S
          </div>
          <div className="wrap-anywhere text-xs">
            <h3>{student.nom}</h3>
            <h4>{student.programme_id}</h4>
            <h4>{student.courriel}</h4>
          </div>
        </div>
        <p className="text-sm text-justify text-gray-400">Bio</p>
        <div></div>
      </div>
    </div>
  );
}

export default StudentCard;
