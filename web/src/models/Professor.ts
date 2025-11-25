export interface Professor {
  id_professeur: number;
  courriel: string;
  nom: string;
  site_web: string | null;
  disponible: boolean;
  bio: string | null;
  photo_profil: string | null;
  last_modified: string | null;
}
