export interface Professor {
  id_professeur: number;
  UUID: string | null;
  courriel: string;
  nom: string;
  site_web: string | null;
  disponible: boolean;
  bio: string | null;
  photo_profil: string | null;
  last_modified: string | null;
  role: "professor";
}
