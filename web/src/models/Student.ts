// In Student.ts
export interface Student {
  id_etudiant: number;
  UUID: string;
  courriel: string;
  nom: string;
  liens: Link[] | null;
  cv_url: string | null;
  photo_profil: string | null;
  programme_id: number;
  bio: string | null;
  interets_academiques: string[] | null;
  cours_completes: string[] | null;
  projets: Project[] | null;
  domaine_etude: string | null;
  role: "student";
}

// Supporting interfaces
export interface Link {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  year: string;
  description: string;
  technologies: string[];
}
