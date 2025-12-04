export interface Opportunity {
  id_opportunite: number;
  titre: string | null;
  description: string;
  department: string;
  exigences: string[];
  ouvert: boolean | null;
  expiration: string | null;
  partenaire: {
    name: string;
    email: string;
    link: string;
  } | null;
  type: "Internship" | "TA" | "Scholarship" | "Research";
  montant: number | null;
  location: number | null;
  professeur_id: number;
  admin_id: number;
  created_at: string | null;
  updated_at: string | null;
  skills: string[];
  duree: string | null;
  temps_engagement: string | null;
  date_debut: string | null;
  remunere: boolean | null;
  nb_positions: number | null;
}
