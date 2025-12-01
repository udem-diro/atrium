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

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2.5fr_3fr] lg:grid-cols-[1fr_2fr] gap-4 justify-center mt-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md">
          <div className="flex flex-col gap-2 items-center mt-4">
            <div className="flex justify-center items-center rounded-full w-16 aspect-square bg-primary text-white font-semibold">
              J
            </div>

            <h2 className="font-semibold">{student?.nom}</h2>
            <Tag tagText="Bsc" />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <FaEnvelope className="text-2xl" />
            <div>
              <h3 className="text-gray-500">Email</h3>
              <p className="font-semibold break-all">{student?.courriel}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <FaBuilding className="text-2xl" />
            <div>
              <h3 className="text-gray-500">Field of study</h3>
              <p className="font-semibold">Bsc. Computer Science</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button
              buttonText="Download CV"
              variant="outline"
              size="responsive"
              onClick={() => {}}
            />
            <Button
              buttonText="Contact Student"
              variant="view"
              size="responsive"
              onClick={() => {}}
            />
          </div>
        </div>

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

        <div className="flex flex-col justify-center gap-2 p-6 border border-gray-400 rounded-lg shadow-md text-sm">
          <h2 className="text-gray-500 font-semibold">Projects</h2>
          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-black font-semibold">
              Medical image classification system <br />
              <span className="text-gray-400 text-sm">2024</span>
            </h3>
            <p className="text-gray-600">
              Developed a convolutional neural network to classify medical
              images for early disease detection. Achievec 94% accuracy.
            </p>
            <h4 className="font-semibold">Technologies</h4>
            <div className="flex gap-2 flex-wrap">
              <Tag tagText="Python" />
              <Tag tagText="TensorFlow" />
              <Tag tagText="Keras" />
            </div>
            <hr className="text-gray-200 mt-4 w-2/3 mx-auto" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-black font-semibold">
              Medical image classification system <br />
              <span className="text-gray-400 text-sm">2024</span>
            </h3>
            <p className="text-gray-600">
              Developed a convolutional neural network to classify medical
              images for early disease detection. Achievec 94% accuracy.
            </p>
            <h4 className="font-semibold">Technologies</h4>
            <div className="flex gap-2 flex-wrap">
              <Tag tagText="Python" />
              <Tag tagText="TensorFlow" />
              <Tag tagText="Keras" />
            </div>
            <hr className="text-gray-200 mt-4 w-2/3 mx-auto" />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <h3 className="text-black font-semibold">
              Medical image classification system <br />
              <span className="text-gray-400 text-sm">2024</span>
            </h3>
            <p className="text-gray-600">
              Developed a convolutional neural network to classify medical
              images for early disease detection. Achievec 94% accuracy.
            </p>
            <h4 className="font-semibold">Technologies</h4>
            <div className="flex gap-2 flex-wrap">
              <Tag tagText="Python" />
              <Tag tagText="TensorFlow" />
              <Tag tagText="Keras" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfilePage;
