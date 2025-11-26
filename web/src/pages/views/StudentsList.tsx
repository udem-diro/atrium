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

  // Filter results based on search query
  const filteredStudents = students.filter((stu) => {
    const q = searchQuery.toLowerCase();

    return (
      stu.nom?.toLowerCase().includes(q) ||
      stu.courriel?.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    store.setNbrOfResults(filteredStudents.length);
  }, [filteredStudents]);

  return (
    <div className="grid gap-2 md:gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {filteredStudents.map((student) => (
        <StudentCard key={student.id_etudiant} student={student} />
      ))}
    </div>
  );
}

export default StudentsList;
