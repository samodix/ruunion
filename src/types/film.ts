export type Film = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  genre: string;
  year: number;
  donationGoal: number;
  donationRaised: number;
  isFeatured: boolean;
  priorityOrder: number;
  publicVisibility: boolean;
  homepageVisibility: boolean;
  status: "en-production" | "à-venir" | "terminé" | "archive";
  accent: string;
  gallery: string[];
  trailerLabel: string;
};
