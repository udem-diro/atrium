import { useEffect, useState } from "react";
import StudentCard from "../../components/StudentCard";
import type { Student } from "../../models/Student";
import { useStore } from "../../hooks/useStore";
import { supabase } from "../../API/supabaseClient";
import { getStore } from "../../utils/Store";

function StudentsList() {
  const [students, setStudents] = useState<Student[]>([]);
  const searchQuery = useStore((s) => s.searchQuery);
  const store = getStore();

  // need to fetch the list of professors from supabase
  // then render each Card with the data I get
  async function fetchStudents() {
    const { data, error } = await supabase
      .from("etudiants")
      .select("*")
      .order("nom", { ascending: true });

    if (error) {
      console.error("Error fetching opportunities:", error);
      return;
    }
    setStudents((data ?? []) as Student[]);
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter results based on search query - Extended fields
  const filteredStudents = students.filter((stu) => {
    const q = searchQuery.toLowerCase();

    return (
      stu.nom?.toLowerCase().includes(q) ||
      stu.courriel?.toLowerCase().includes(q) ||
      stu.bio?.toLowerCase().includes(q) ||
      stu.domaine_etude?.toLowerCase().includes(q) ||
      // Search in interets_academiques array
      (stu.interets_academiques &&
        stu.interets_academiques.some((interet) =>
          interet.toLowerCase().includes(q)
        )) ||
      // Search in project titles
      (stu.projets &&
        stu.projets.some((projet) =>
          projet.title?.toLowerCase().includes(q)
        )) ||
      // Search in project technologies
      (stu.projets &&
        stu.projets.some((projet) =>
          projet.technologies?.some((tech) => tech.toLowerCase().includes(q))
        ))
    );
  });

  useEffect(() => {
    store.setNbrOfResults(filteredStudents.length);
  }, [filteredStudents]);

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3">
      {filteredStudents.map((student) => (
        <StudentCard key={student.id_etudiant} student={student} />
      ))}
    </div>
  );
}

export default StudentsList;
