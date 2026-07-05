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
      <section className="bg-ru-ink relative overflow-hidden py-24 text-white">
        <div className="bg-ru-primary/20 absolute -top-32 right-0 size-96 rounded-full blur-3xl" />
        <Container className="relative">
          <p className="text-ru-primary text-sm font-black tracking-[.2em] uppercase">
            Nos productions
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[.95] font-black tracking-[-.055em] sm:text-7xl">
            Nos films solidaires
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
            Chaque film raconte une part d’humanité et participe à un projet
            plus grand : soutenir des actions, faire circuler les voix et créer
            des rencontres durables.
          </p>
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
