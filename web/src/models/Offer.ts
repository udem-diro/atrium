export type OfferType = "internship" | "research" | "project" | "mentorship" | "job";
export type OfferStatus = "draft" | "published" | "closed" | "archived";


export interface Offer {
    id: string;
    title: string;
    description: string;
    type: OfferType;
    status: OfferStatus;
    professorId: string;
    department: string;
    requirements: string[];
    tags: string[];
    maxSubmissions?: number;
    deadline?: string;
    createdAt: string;
    updatedAt: string;
}