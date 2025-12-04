import { FaLink, FaProjectDiagram, FaBook } from "react-icons/fa";
import Tag from "./widgets/Tag";
import Button from "./widgets/Button";
import { useNavigate } from "react-router-dom";
import type { Student } from "../models/Student";

type StudentCardProps = {
  student: Student;
};

function StudentCard({ student }: StudentCardProps) {
  const navigate = useNavigate();

  const getInitials = (fullName: string) => {
    const words = fullName.split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const navigateToStudentProfile = () => {
    navigate(`/student/${student.id_etudiant}`);
  };

  return (
    <div className="flex flex-col justify-between gap-3 p-5 border rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white w-full mx-auto cursor-pointer">
      {/* Tags */}
      {student.interets_academiques &&
        student.interets_academiques.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {student.interets_academiques.map((tag, idx) => (
              <Tag key={idx} tagText={tag} />
            ))}
          </div>
        )}

      {/* Header: photo / initials + name + program/email */}
      <div className="flex gap-4 items-center bg-light-gray rounded-lg px-4 py-3 shadow-md">
        {student.photo_profil ? (
          <img
            src={student.photo_profil}
            alt={student.nom}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-primary text-white font-bold flex justify-center items-center text-xl">
            {getInitials(student.nom)}
          </div>
        )}
        <div className="flex flex-col gap-1 text-sm">
          <h3 className="font-bold">{student.nom}</h3>
          <h4 className="text-gray-500 text-xs">
            {student.domaine_etude ?? "Programme inconnu"}
          </h4>
          <h4 className="text-blue-700 font-semibold">{student.courriel}</h4>
        </div>
      </div>

      {/* Bio */}
      {student.bio && (
        <p className="text-gray-600 text-md line-clamp-3">{student.bio}</p>
      )}

      <hr className="text-gray-300" />

      {/* Stats */}
      <div className="flex gap-2 flex-wrap text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaBook className="text-green-500" />
          <span>Cours complétés: {student.cours_completes?.length ?? 0}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaProjectDiagram className="text-purple-500" />
          <span>Projets: {student.projets?.length ?? 0}</span>
        </div>
        {student.liens && student.liens.length > 0 && (
          <div className="flex items-center gap-2">
            <FaLink className="text-blue-500" />
            <span>Liens: {student.liens.length}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <Button
          buttonText="Contact"
          size="sm"
          variant="view"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`mailto:${student.courriel}`);
          }}
        />
        <Button
          buttonText="Profile"
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            navigateToStudentProfile();
          }}
        />
      </div>
    </div>
  );
}

export default StudentCard;
