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
  research_areas: string[];
  available_positions: number;
  available_semester: string | null;
  supervision_types: string[];
  additional_info: string | null;
  calendar_link: string | null;
  role: "professor";
}
