import type { Film } from "@/types/film";

export const films: Film[] = [
  {
    slug: "parce-que-cest-toi",
    title: "Parce que c’est toi",
    shortDescription: "Un récit intime sur les liens qui nous relèvent.",
    description:
      "À travers plusieurs trajectoires qui se croisent, le film raconte la force d’une présence, d’un geste et d’une parole au bon moment.",
    genre: "Drame solidaire",
    year: 2026,
    donationGoal: 80000,
    donationRaised: 43600,
    isFeatured: true,
    priorityOrder: 1,
    publicVisibility: true,
    homepageVisibility: true,
    status: "en-production",
    accent: "from-[#48C1B3] to-[#0E9A8B]",
    gallery: ["Rencontre", "Transmission", "Coulisses"],
    trailerLabel: "Bande-annonce prochainement",
  },
  {
    slug: "film-solidaire-2",
    title: "Film solidaire 2",
    shortDescription: "Des voisins transforment leur quartier par l’entraide.",
    description:
      "Une chronique lumineuse où des habitants réinventent la proximité et font de leurs différences une force collective.",
    genre: "Documentaire",
    year: 2027,
    donationGoal: 45000,
    donationRaised: 12800,
    isFeatured: true,
    priorityOrder: 2,
    publicVisibility: true,
    homepageVisibility: true,
    status: "à-venir",
    accent: "from-[#F6B62E] to-[#FFD77A]",
    gallery: ["Quartier", "Portraits", "Atelier"],
    trailerLabel: "Teaser en préparation",
  },
  {
    slug: "film-solidaire-3",
    title: "Film solidaire 3",
    shortDescription: "La jeunesse raconte le monde qu’elle veut construire.",
    description:
      "Des jeunes venus d’horizons différents imaginent ensemble des réponses sensibles aux fractures de notre époque.",
    genre: "Fiction collective",
    year: 2027,
    donationGoal: 60000,
    donationRaised: 9500,
    isFeatured: false,
    priorityOrder: 3,
    publicVisibility: true,
    homepageVisibility: false,
    status: "à-venir",
    accent: "from-[#33363A] to-[#5F666B]",
    gallery: ["Écriture", "Répétitions", "Équipe"],
    trailerLabel: "Bande-annonce à venir",
  },
  {
    slug: "film-archive",
    title: "Film archive",
    shortDescription: "Une mémoire de nos premières actions de terrain.",
    description:
      "Ce film d’archive documente les rencontres fondatrices de RU Union et les premiers liens tissés avec le public.",
    genre: "Archive",
    year: 2024,
    donationGoal: 30000,
    donationRaised: 30000,
    isFeatured: false,
    priorityOrder: 4,
    publicVisibility: false,
    homepageVisibility: false,
    status: "archive",
    accent: "from-[#DDEDEA] to-[#F8FBFA]",
    gallery: ["Archives", "Témoignages", "Premières"],
    trailerLabel: "Archive vidéo",
  },
];

export const publicFilms = films
  .filter((film) => film.publicVisibility)
  .sort((a, b) => a.priorityOrder - b.priorityOrder);

export const featuredFilms = films
  .filter((film) => film.isFeatured && film.homepageVisibility)
  .sort((a, b) => a.priorityOrder - b.priorityOrder);
