import { useParams } from "react-router-dom";
import Button from "../components/widgets/Button";
import Tag from "../components/widgets/Tag";
import { FaBuilding, FaEnvelope, FaLink } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { Student, Link, Project } from "../models/Student";
import { getStudent } from "../API/updateDB/updateEtudiants";
import { useStore } from "../hooks/useStore";
import EditableAbout from "../components/student_profile_components/EditableAbout";
import EditableInterests from "../components/student_profile_components/EditableInterests";
import EditableExternalLinks from "../components/student_profile_components/EditableExternalLinks";
import EditableCompletedCourses from "../components/student_profile_components/EditableCompletedCourses";
import EditableProjects from "../components/student_profile_components/EditableProjects";
import EditableProfileInfo from "../components/student_profile_components/EditableProfileInfo";

function StudentProfilePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  const connectedUser = useStore((s) => s.auth.connectedUser);
  const isOwnProfile =
    connectedUser?.role === "student" &&
    connectedUser?.id_etudiant === student?.id_etudiant;

  const handleBioUpdate = (newBio: string) => {
    if (student) {
      setStudent({ ...student, bio: newBio });
    }
  };

  const handleInterestsUpdate = (newInterests: string[]) => {
    if (student) {
      setStudent({ ...student, interets_academiques: newInterests });
    }
  };

  const handleLinksUpdate = (newLinks: Link[]) => {
    if (student) {
      setStudent({ ...student, liens: newLinks });
    }
  };

  const handleCoursesUpdate = (newCourses: string[]) => {
    if (student) {
      setStudent({ ...student, cours_completes: newCourses });
    }
  };

  const handleProjectsUpdate = (newProjects: Project[]) => {
    if (student) {
      setStudent({ ...student, projets: newProjects });
    }
  };

  const handleProfileInfoUpdate = (updatedData: Partial<Student>) => {
    if (student) {
      setStudent({ ...student, ...updatedData });
    }
  };

  useEffect(() => {
    if (!id) return;

    async function fetchStudent() {
      const { data, error } = await getStudent(Number(id));

      if (error) {
        console.error(error);
        return;
      }

      setStudent(data ?? null);
      setLoading(false);
    }

    fetchStudent();
  }, [id]);

  if (loading) return <h1>loading...</h1>;
  if (!student) return <h1>Student not found</h1>;

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2.5fr_3fr] lg:grid-cols-[1fr_2fr] gap-4 justify-center mt-6">
      <div className="flex flex-col gap-4">
        <EditableProfileInfo
          student={student}
          isOwnProfile={isOwnProfile}
          onUpdate={handleProfileInfoUpdate}
        />

        <EditableExternalLinks
          studentId={student?.id_etudiant!}
          initialLinks={student?.liens ?? null}
          isOwnProfile={isOwnProfile}
          onUpdate={handleLinksUpdate}
        />
      </div>

      <div className="flex flex-col gap-4">
        <EditableAbout
          studentId={student?.id_etudiant!}
          initialBio={student?.bio ?? null}
          isOwnProfile={isOwnProfile}
          onUpdate={handleBioUpdate}
        />

        <EditableInterests
          studentId={student?.id_etudiant!}
          initialInterests={student?.interets_academiques ?? null}
          isOwnProfile={isOwnProfile}
          onUpdate={handleInterestsUpdate}
        />

        <EditableCompletedCourses
          studentId={student?.id_etudiant!}
          initialCourses={student?.cours_completes ?? null}
          isOwnProfile={isOwnProfile}
          onUpdate={handleCoursesUpdate}
        />

        <EditableProjects
          studentId={student?.id_etudiant!}
          initialProjects={student?.projets ?? null}
          isOwnProfile={isOwnProfile}
          onUpdate={handleProjectsUpdate}
        />
      </div>
    </div>
  );
}

export default StudentProfilePage;
