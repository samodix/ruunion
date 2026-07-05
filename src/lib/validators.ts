import { z } from "zod";

const optionalText = z.string().trim().optional().or(z.literal(""));
const optionalNumber = z.number().nonnegative().optional();

export const filmSchema = z.object({
  title: z.string().trim().min(1, "Le titre est obligatoire."),
  slug: z
    .string()
    .trim()
    .min(1, "Le slug est obligatoire.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Utilisez des minuscules, chiffres et tirets.",
    ),
  shortDescription: z
    .string()
    .trim()
    .min(1, "La description courte est obligatoire."),
  longDescription: z
    .string()
    .trim()
    .min(1, "La description longue est obligatoire."),
  year: z.number().int().min(1900).max(2100),
  status: z.enum(["en-production", "termine", "en-diffusion", "archive"]),
  poster: z.string().trim().default(""),
  trailerUrl: optionalText,
  gallery: z.array(z.string().trim()).default([]),
  donationGoal: optionalNumber,
  donationCollected: optionalNumber,
  isFeatured: z.boolean(),
  priorityOrder: z.number().int().min(0),
  publicVisibility: z.boolean(),
  homepageVisibility: z.boolean(),
  donationPackSlug: optionalText,
  seoTitle: optionalText,
  seoDescription: optionalText,
});

export const supportPackSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Le slug est obligatoire.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Utilisez des minuscules, chiffres et tirets.",
    ),
  title: z.string().trim().min(1, "Le titre est obligatoire."),
  description: z.string().trim().min(1, "La description est obligatoire."),
  price: z.number().nonnegative(),
  currency: z.literal("EUR"),
  type: z.enum(["donation", "product", "ticket", "sponsor"]),
  features: z.array(z.string().trim()).default([]),
  isHighlighted: z.boolean(),
  relatedFilmSlug: optionalText,
  wooProductId: z.number().int().positive().optional(),
  stripePriceId: optionalText,
  paypalPlanId: optionalText,
});

export const loginSchema = z.object({
  email: z.email("Adresse e-mail invalide."),
  password: z.string().min(1, "Le mot de passe est obligatoire."),
});
