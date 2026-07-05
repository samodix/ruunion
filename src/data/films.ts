import type { Film } from "@/types/film";

export const films: Film[] = [
  {
    id: "film-parce-que-cest-toi",
    slug: "parce-que-cest-toi",
    title: "Parce que c’est toi",
    shortDescription: "Un récit intime sur les liens qui nous relèvent.",
    longDescription:
      "À travers plusieurs trajectoires qui se croisent, le film raconte la force d’une présence, d’un geste et d’une parole au bon moment.",
    year: 2026,
    status: "en-production",
    poster: "",
    trailerUrl: "",
    gallery: ["Rencontre", "Transmission", "Coulisses"],
    donationGoal: 80000,
    donationCollected: 43600,
    isFeatured: true,
    priorityOrder: 1,
    publicVisibility: true,
    homepageVisibility: true,
    donationPackSlug: "soutien-film",
    seoTitle: "Parce que c’est toi — Film solidaire",
    seoDescription: "Découvrez et soutenez Parce que c’est toi.",
  },
  {
    id: "film-solidaire-2",
    slug: "film-solidaire-2",
    title: "Film solidaire 2",
    shortDescription: "Des voisins transforment leur quartier par l’entraide.",
    longDescription:
      "Une chronique lumineuse où des habitants réinventent la proximité et font de leurs différences une force collective.",
    year: 2027,
    status: "en-production",
    poster: "",
    gallery: ["Quartier", "Portraits", "Atelier"],
    donationGoal: 45000,
    donationCollected: 12800,
    isFeatured: true,
    priorityOrder: 2,
    publicVisibility: true,
    homepageVisibility: true,
  },
  {
    id: "film-solidaire-3",
    slug: "film-solidaire-3",
    title: "Film solidaire 3",
    shortDescription: "La jeunesse raconte le monde qu’elle veut construire.",
    longDescription:
      "Des jeunes venus d’horizons différents imaginent ensemble des réponses sensibles aux fractures de notre époque.",
    year: 2027,
    status: "en-production",
    poster: "",
    gallery: ["Écriture", "Répétitions", "Équipe"],
    donationGoal: 60000,
    donationCollected: 9500,
    isFeatured: false,
    priorityOrder: 3,
    publicVisibility: true,
    homepageVisibility: false,
  },
  {
    id: "film-archive",
    slug: "film-archive",
    title: "Film archive",
    shortDescription: "Une mémoire de nos premières actions de terrain.",
    longDescription:
      "Ce film d’archive documente les rencontres fondatrices de RU Union et les premiers liens tissés avec le public.",
    year: 2024,
    status: "archive",
    poster: "",
    gallery: ["Archives", "Témoignages", "Premières"],
    donationGoal: 30000,
    donationCollected: 30000,
    isFeatured: false,
    priorityOrder: 4,
    publicVisibility: false,
    homepageVisibility: false,
  },
];

export const publicFilms = films
  .filter((film) => film.publicVisibility)
  .sort((a, b) => a.priorityOrder - b.priorityOrder || b.year - a.year);

export const featuredFilms = films
  .filter(
    (film) =>
      film.isFeatured && film.homepageVisibility && film.publicVisibility,
  )
  .sort((a, b) => a.priorityOrder - b.priorityOrder)
  .slice(0, 3);
