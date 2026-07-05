import type { Metadata } from "next";
import { FilmGrid } from "@/components/films/FilmGrid";
import { Container } from "@/components/layout/Container";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { buildMetadataFromWordPressPage, createMetadata } from "@/lib/seo";
import { getWordPressFilmsWithSource } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataFromWordPressPage(
    "/films",
    createMetadata(
      "Nos films",
      "Découvrez les films solidaires de RU Union.",
      "/films",
    ),
  );
}

export default async function FilmsPage() {
  const result = await getWordPressFilmsWithSource();
  const films = result.films
    .filter((film) => film.publicVisibility)
    .sort((a, b) => a.priorityOrder - b.priorityOrder || b.year - a.year);

  return (
    <>
      <section className="bg-ru-ink relative isolate overflow-hidden py-24 text-white sm:py-32">
        <div className="bg-ru-primary/25 absolute -top-32 right-0 -z-10 size-[32rem] rounded-full blur-3xl" />
        <div className="bg-ru-yellow/12 absolute -bottom-40 -left-28 -z-10 size-[30rem] rounded-full blur-3xl" />
        <div className="ru-cinematic-lines absolute inset-0 -z-10 opacity-35" />
        <Container className="relative grid gap-12 lg:grid-cols-[1fr_.55fr] lg:items-end">
          <div>
            <p className="text-ru-primary text-sm font-black tracking-[.2em] uppercase">
              Nos productions
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl leading-[.95] font-black tracking-[-.055em] sm:text-7xl">
              Nos films solidaires
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
              Chaque film raconte une part d’humanité et participe à un projet
              plus grand : soutenir des actions, faire circuler les voix et
              créer des rencontres durables.
            </p>
          </div>
          <div className="border-l border-white/15 pl-7">
            <strong className="text-ru-yellow block text-6xl font-black">
              {String(films.length).padStart(2, "0")}
            </strong>
            <span className="mt-2 block text-sm font-black tracking-[.18em] text-white/55 uppercase">
              Films publics à découvrir
            </span>
          </div>
        </Container>
      </section>
      <section className="py-24">
        <Container>
          <DataSourceNotice source={result.source} />
          <FilmGrid className="mt-4" films={films} />
        </Container>
      </section>
    </>
  );
}
