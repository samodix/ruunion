export type FilmStatus =
  "en-production" | "termine" | "en-diffusion" | "archive";

export type Film = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  year: number;
  status: FilmStatus;
  poster: string;
  trailerUrl?: string;
  gallery: string[];
  donationGoal?: number;
  donationCollected?: number;
  isFeatured: boolean;
  priorityOrder: number;
  publicVisibility: boolean;
  homepageVisibility: boolean;
  donationPackSlug?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FilmInput = Omit<Film, "id" | "createdAt" | "updatedAt">;
