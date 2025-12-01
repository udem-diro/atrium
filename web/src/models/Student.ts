export interface Student {
  id_etudiant: number;
  courriel: string;
  nom: string;
  liens: string | null;
  cv_url: string | null;
  photo_profil: string | null;
  programme_id: number;
  UUID: string;
  role: "student";
}
