import type { Metadata } from "next";
import { FilmGrid } from "@/components/films/FilmGrid";
import { Container } from "@/components/layout/Container";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buildMetadataFromYoastOrFallback, createMetadata } from "@/lib/seo";
import { getWordPressFilmsWithSource } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const wordpressBaseUrl =
    process.env.WORDPRESS_BASE_URL?.trim() || "http://localhost/ruunion";
  return buildMetadataFromYoastOrFallback(
    `${wordpressBaseUrl}/films/`,
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
    <section className="py-20">
      <Container>
        <SectionTitle
          eyebrow="Nos productions"
          title="Des films qui mettent le lien en mouvement"
          description="Fictions, documentaires et créations collectives : chaque film ouvre une conversation et soutient une action."
        />
        <DataSourceNotice source={result.source} />
        <FilmGrid className="mt-12" films={films} />
      </Container>
    </section>
  );
}
