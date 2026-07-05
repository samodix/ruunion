import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Mail } from "lucide-react";
import { Container } from "./Container";
import { siteConfig } from "@/lib/config";

const columns = [
  {
    title: "Navigation",
    links: [
      ["Accueil", "/"],
      ["Association", "/association"],
      ["Films", "/films"],
      ["Boutique", "/boutique"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Soutenir",
    links: [
      ["Découvrir les packs", "/boutique"],
      ["Films en production", "/films"],
      ["Devenir partenaire", "/contact"],
    ],
  },
  {
    title: "Informations",
    links: [
      ["Mentions légales", "/mentions-legales"],
      ["Politique de confidentialité", "/politique-confidentialite"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ru-ink relative isolate overflow-hidden text-white">
      <div className="bg-ru-primary/20 absolute -top-48 -left-32 -z-10 size-[34rem] rounded-full blur-[110px]" />
      <div className="bg-ru-yellow/12 absolute -right-36 -bottom-48 -z-10 size-[38rem] rounded-full blur-[120px]" />
      <div className="ru-cinematic-lines absolute inset-0 -z-10 opacity-25" />
      <Container className="py-20 sm:py-24">
        <div className="border-b border-white/10 pb-16">
          <div className="text-ru-primary flex items-center gap-3">
            <HeartHandshake size={28} />
            <span className="text-sm font-black tracking-[.2em] uppercase">
              RU Union
            </span>
          </div>
          <h2 className="mt-7 max-w-5xl text-5xl leading-[.95] font-black tracking-[-.055em] sm:text-7xl lg:text-[6.5rem]">
            L’union des plus humains
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Des films, des récits et des actions pour créer du lien, soutenir
            les projets humains et faire grandir une solidarité concrète.
          </p>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-ru-primary text-xs font-black tracking-[.18em] uppercase">
              Nous écrire
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-ru-primary mt-5 inline-flex items-center text-lg font-black transition"
            >
              <Mail className="mr-3" size={20} />
              {siteConfig.email}
            </a>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/50">
              Une question, une proposition ou une envie de construire un projet
              ensemble ? Notre équipe vous répond.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-ru-primary text-xs font-black tracking-[.18em] uppercase">
                {column.title}
              </p>
              <nav
                className="mt-5 flex flex-col gap-3 text-sm text-white/65"
                aria-label={column.title}
              >
                {column.links.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="inline-flex items-center transition hover:translate-x-1 hover:text-white"
                  >
                    {label}
                    <ArrowUpRight className="ml-1.5 opacity-40" size={13} />
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © RU Union. Tous droits réservés.</p>
          <p>Cinéma · Solidarité · Projets humains</p>
        </div>
      </Container>
    </footer>
  );
}
