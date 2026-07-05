import type { SupportPack } from "@/types/support-pack";

export const supportPacks: SupportPack[] = [
  {
    id: "decouverte",
    title: "Soutien Découverte",
    price: 29,
    description: "Un premier geste pour faire avancer les récits solidaires.",
    benefits: ["Actualités du projet", "Remerciement numérique"],
  },
  {
    id: "solidaire",
    title: "Soutien Solidaire",
    price: 49,
    description: "Un soutien concret à la production et à la diffusion.",
    benefits: ["Contenus en avant-première", "Nom au générique web"],
    featured: true,
  },
  {
    id: "film",
    title: "Soutien Film",
    price: 199,
    description: "Participez directement à la fabrication d’un film.",
    benefits: ["Invitation à une projection", "Journal de production"],
  },
  {
    id: "avant-premiere",
    title: "Soutien Avant-première",
    price: 400,
    description: "Vivez une rencontre privilégiée autour du film.",
    benefits: ["Deux places avant-première", "Échange avec l’équipe"],
  },
  {
    id: "partenaire",
    title: "Soutien Partenaire",
    price: 600,
    description: "Associez votre engagement à une action culturelle utile.",
    benefits: ["Mention partenaire", "Kit de communication"],
  },
  {
    id: "grand-mecene",
    title: "Grand Mécène",
    price: 3000,
    description: "Donnez une impulsion décisive à un projet RU Union.",
    benefits: [
      "Rencontre dédiée",
      "Visibilité personnalisée",
      "Suivi d’impact",
    ],
  },
];
