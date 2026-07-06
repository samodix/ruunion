import fs from "fs";
import path from "path";
import sharp from "sharp";

const MEDIA_SOURCE_DIR = "./media-source";
const MEDIA_OPTIMIZED_DIR = "./media-optimized";

const FILMS = [
  { slug: "parce-que-cest-toi", title: "Parce que c'est toi", color: "#B45309" },
  { slug: "film-solidaire-2", title: "Film Solidaire 2", color: "#047857" },
  { slug: "film-solidaire-3", title: "Film Solidaire 3", color: "#1D4ED8" },
  { slug: "film-archive", title: "Film Archive", color: "#4B5563" },
];

const PACKS = [
  { slug: "soutien-decouverte", title: "Soutien Découverte", price: "10€", color: "#4B5563" },
  { slug: "soutien-solidaire", title: "Soutien Solidaire", price: "25€", color: "#047857" },
  { slug: "soutien-film", title: "Soutien Film", price: "50€", color: "#B45309" },
  { slug: "soutien-avant-premiere", title: "Soutien Avant-première", price: "100€", color: "#1D4ED8" },
  { slug: "soutien-partenaire", title: "Soutien Partenaire", price: "250€", color: "#6D28D9" },
  { slug: "grand-mecene", title: "Grand Mécène", price: "500€", color: "#D97706" },
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Génère un SVG cinématique pour les affiches de films
function generatePosterSvg(title, color) {
  return `
    <svg width="1200" height="1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0F172A" />
        </radialGradient>
        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.4" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#glow)" style="mix-blend-mode: color-burn;" />
      
      <!-- Bordure cinématique fine -->
      <rect x="40" y="40" width="1120" height="1520" fill="none" stroke="${color}" stroke-width="2" stroke-opacity="0.3" />
      <rect x="50" y="50" width="1100" height="1500" fill="none" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.1" />

      <!-- Éléments décoratifs -->
      <text x="50%" y="150" font-family="'Space Grotesk', 'Inter', sans-serif" font-size="24" fill="#FFFFFF" letter-spacing="8" fill-opacity="0.5" text-anchor="middle">RU UNION PRÉSENTE</text>
      <line x1="500" y1="180" x2="700" y2="180" stroke="${color}" stroke-width="2" stroke-opacity="0.6" />

      <!-- Titre du film -->
      <text x="50%" y="750" font-family="'Space Grotesk', 'Inter', sans-serif" font-weight="bold" font-size="76" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">${title.toUpperCase()}</text>
      
      <!-- Sous-titre -->
      <text x="50%" y="830" font-family="'Inter', sans-serif" font-size="28" fill="${color}" letter-spacing="4" font-weight="500" text-anchor="middle">UN FILM SOLIDAIRE ET ENGAGÉ</text>
      
      <!-- Bas d'affiche style crédits cinéma -->
      <g transform="translate(0, 1200)" fill="#FFFFFF" fill-opacity="0.6" font-family="'Inter', sans-serif" font-size="16" text-anchor="middle">
        <text x="50%" y="0" font-size="20" letter-spacing="4" fill="#FFFFFF">UNE PRODUCTION RU UNION</text>
        <text x="50%" y="50" letter-spacing="2">RÉALISÉ PAR L'ASSOCIATION RU UNION • IMAGE DE SYNTHÈSE PLACEHOLDER</text>
        <text x="50%" y="90" letter-spacing="1">AVEC LE SOUTIEN DES CITOYENS ENGAGÉS • MUSIQUE ORIGINALE LIBRE</text>
        <text x="50%" y="130" letter-spacing="1">TOUS DROITS RÉSERVÉS © 2026 RU UNION</text>
        
        <!-- Logo de l'association symbolisé -->
        <circle cx="50%" cy="220" r="30" fill="none" stroke="${color}" stroke-width="3" />
        <text x="50%" y="227" font-size="18" font-weight="bold" fill="#FFFFFF" letter-spacing="0">RU</text>
      </g>
    </svg>
  `;
}

// Génère un SVG cinématique pour la galerie (coulisses)
function generateGallerySvg(title, step, color) {
  const scenes = [
    "DANS LES COULISSES - LE TOURNAGE",
    "PREPARATION DES EQUIPES ET MATERIEL",
    "CAPTURE D'EMOTIONS EN DIRECT"
  ];
  return `
    <svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#030712" />
        </linearGradient>
        <radialGradient id="lens" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <circle cx="80%" cy="40%" r="600" fill="url(#lens)" />

      <!-- Ligne de temps et cadre caméra -->
      <path d="M 50 50 L 150 50 M 50 50 L 50 150" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.4" />
      <path d="M 1550 50 L 1450 50 M 1550 50 L 1550 150" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.4" />
      <path d="M 50 850 L 150 850 M 50 850 L 50 750" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.4" />
      <path d="M 1550 850 L 1450 850 M 1550 850 L 1550 750" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.4" />
      
      <!-- Indicateur REC rouge clignotant -->
      <circle cx="100" cy="100" r="15" fill="#EF4444" />
      <text x="130" y="108" font-family="'Inter', sans-serif" font-weight="bold" font-size="22" fill="#FFFFFF" fill-opacity="0.9">REC</text>
      
      <!-- Timecode -->
      <text x="1500" y="108" font-family="'JetBrains Mono', monospace" font-size="22" fill="#FFFFFF" fill-opacity="0.8" text-anchor="end">01:24:43:${12 * step}</text>

      <!-- Titre principal -->
      <text x="100" y="480" font-family="'Space Grotesk', 'Inter', sans-serif" font-weight="bold" font-size="48" fill="#FFFFFF">${title.toUpperCase()}</text>
      <text x="100" y="540" font-family="'Inter', sans-serif" font-size="24" fill="${color}" font-weight="600" letter-spacing="2">${scenes[step - 1]}</text>
      <text x="100" y="580" font-family="'Inter', sans-serif" font-size="18" fill="#9CA3AF" fill-opacity="0.8">Instant de création solidaire — RU Union Production (Image de test ${step})</text>
      
      <!-- Grille cinéma -->
      <line x1="50" y1="450" x2="1550" y2="450" stroke="#FFFFFF" stroke-width="1" stroke-dasharray="10,10" stroke-opacity="0.1" />
    </svg>
  `;
}

// Génère un SVG cinématique pour les packs de soutien WooCommerce
function generatePackSvg(title, price, color) {
  return `
    <svg width="1200" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
        <radialGradient id="highlight" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#0F172A" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <rect width="100%" height="100%" fill="url(#highlight)" />

      <!-- Cercles de fond élégants -->
      <circle cx="600" cy="450" r="350" fill="none" stroke="${color}" stroke-width="1" stroke-opacity="0.1" />
      <circle cx="600" cy="450" r="280" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="5,5" stroke-opacity="0.15" />

      <!-- Conteneur central style carte -->
      <rect x="250" y="150" width="700" height="600" rx="16" fill="#020617" fill-opacity="0.8" stroke="${color}" stroke-width="2" stroke-opacity="0.5" />
      
      <!-- Badge de l'association -->
      <circle cx="600" cy="240" r="45" fill="none" stroke="${color}" stroke-width="2" />
      <text x="600" y="248" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="28" fill="#FFFFFF" text-anchor="middle">RU</text>
      
      <!-- Titre du pack -->
      <text x="600" y="370" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="44" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">${title.toUpperCase()}</text>
      <text x="600" y="420" font-family="'Inter', sans-serif" font-size="20" fill="#9CA3AF" text-anchor="middle" letter-spacing="4">PACK DE SOUTIEN SOLIDAIRE</text>
      
      <line x1="450" y1="460" x2="750" y2="460" stroke="${color}" stroke-width="2" stroke-opacity="0.6" />

      <!-- Prix -->
      <text x="600" y="560" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="72" fill="#FFFFFF" text-anchor="middle">${price}</text>
      
      <!-- Mention légale / exonération d'impôts -->
      <rect x="350" y="610" width="500" height="50" rx="25" fill="${color}" fill-opacity="0.1" />
      <text x="600" y="641" font-family="'Inter', sans-serif" font-size="15" fill="#FFFFFF" font-weight="500" text-anchor="middle" fill-opacity="0.9">66% de réduction d'impôt applicable</text>

      <text x="600" y="710" font-family="'Inter', sans-serif" font-size="14" fill="#6B7280" text-anchor="middle">RU UNION — L'UNION DES PLUS HUMAINS</text>
    </svg>
  `;
}

async function processMedia() {
  console.log("=== DEBUT DE L'OPTIMISATION DES MEDIAS RU UNION ===");
  
  ensureDir(MEDIA_SOURCE_DIR);
  ensureDir(MEDIA_OPTIMIZED_DIR);
  ensureDir(path.join(MEDIA_OPTIMIZED_DIR, "films"));
  ensureDir(path.join(MEDIA_OPTIMIZED_DIR, "packs"));

  // 1. Traitement des FILMS (Affiches + Galeries)
  for (const film of FILMS) {
    const filmSourceDir = path.join(MEDIA_SOURCE_DIR, "films", film.slug);
    const filmOptimizedDir = path.join(MEDIA_OPTIMIZED_DIR, "films", film.slug);
    
    ensureDir(path.join(filmSourceDir, "poster"));
    ensureDir(path.join(filmSourceDir, "gallery"));
    ensureDir(filmOptimizedDir);

    // -- Affiche (poster.webp) --
    const posterSrcFiles = fs.readdirSync(path.join(filmSourceDir, "poster"))
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
    
    const posterDestPath = path.join(filmOptimizedDir, "poster.webp");
    
    if (posterSrcFiles.length > 0) {
      const srcFile = path.join(filmSourceDir, "poster", posterSrcFiles[0]);
      console.log(`[AFFICHE] Optimisation de ${srcFile} vers ${posterDestPath}`);
      await sharp(srcFile)
        .resize(1200, 1600, { fit: "cover" })
        .webp({ quality: 82 })
        .toFile(posterDestPath);
    } else {
      console.log(`[AFFICHE] Aucune affiche source trouvée pour "${film.title}". Génération d'un placeholder...`);
      const svg = generatePosterSvg(film.title, film.color);
      await sharp(Buffer.from(svg))
        .webp({ quality: 82 })
        .toFile(posterDestPath);
      console.log(`[AFFICHE] Placeholder généré avec succès dans ${posterDestPath}`);
    }

    // -- Galerie (gallery-1.webp, gallery-2.webp, gallery-3.webp) --
    const gallerySrcFiles = fs.readdirSync(path.join(filmSourceDir, "gallery"))
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
      .sort();

    for (let i = 1; i <= 3; i++) {
      const galleryDestPath = path.join(filmOptimizedDir, `gallery-${i}.webp`);
      if (gallerySrcFiles[i - 1]) {
        const srcFile = path.join(filmSourceDir, "gallery", gallerySrcFiles[i - 1]);
        console.log(`[GALERIE] Optimisation de ${srcFile} vers ${galleryDestPath}`);
        await sharp(srcFile)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(galleryDestPath);
      } else {
        console.log(`[GALERIE] Image de galerie ${i} manquante pour "${film.title}". Génération d'un placeholder...`);
        const svg = generateGallerySvg(film.title, i, film.color);
        await sharp(Buffer.from(svg))
          .webp({ quality: 80 })
          .toFile(galleryDestPath);
        console.log(`[GALERIE] Placeholder ${i} généré dans ${galleryDestPath}`);
      }
    }
  }

  // 2. Traitement des PACKS WOOCOMMERCE
  for (const pack of PACKS) {
    const packSourceDir = path.join(MEDIA_SOURCE_DIR, "packs", pack.slug);
    const packDestPath = path.join(MEDIA_OPTIMIZED_DIR, "packs", `${pack.slug}.webp`);
    
    ensureDir(packSourceDir);

    const packSrcFiles = fs.readdirSync(packSourceDir)
      .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));

    if (packSrcFiles.length > 0) {
      const srcFile = path.join(packSourceDir, packSrcFiles[0]);
      console.log(`[PACK] Optimisation de ${srcFile} vers ${packDestPath}`);
      await sharp(srcFile)
        .resize(1200, 900, { fit: "cover" })
        .webp({ quality: 82 })
        .toFile(packDestPath);
    } else {
      console.log(`[PACK] Aucun visuel source trouvé pour le pack "${pack.title}". Génération d'un placeholder...`);
      const svg = generatePackSvg(pack.title, pack.price, pack.color);
      await sharp(Buffer.from(svg))
        .webp({ quality: 82 })
        .toFile(packDestPath);
      console.log(`[PACK] Placeholder généré avec succès dans ${packDestPath}`);
    }
  }

  console.log("=== OPTIMISATION DES MEDIAS TERMINEE AVEC SUCCES ===");
}

processMedia().catch(err => {
  console.error("Erreur durant l'optimisation des médias :", err);
  process.exit(1);
});
