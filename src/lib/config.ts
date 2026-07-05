export const siteConfig = {
  name: "RU Union",
  tagline: "L’union des plus humains",
  description:
    "Des récits, des rencontres et des actions concrètes pour faire grandir la solidarité.",
  email: "contact@ruunion.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
