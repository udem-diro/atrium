export interface Opportunity {
  id_opportunite: number;
  titre: string | null;
  description: string;
  exigences: string | null;
  ouvert: boolean | null;
  expiration: string | null;
  partenaire: string | null;
  type: number;
  montant: number | null;
  emplacement: number | null;
  professeur_id: number;
  admin_id: number;
  created_at: string | null;
  updated_at: string | null;
  skills: string[];
}
