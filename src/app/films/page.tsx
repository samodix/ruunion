import type { Metadata } from "next";
import { FilmGrid } from "@/components/films/FilmGrid";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { publicFilms } from "@/data/films";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Nos films",
  "Découvrez les films solidaires de RU Union.",
  "/films",
);

export default function FilmsPage() {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          eyebrow="Nos productions"
          title="Des films qui mettent le lien en mouvement"
          description="Fictions, documentaires et créations collectives : chaque film ouvre une conversation et soutient une action."
        />
        <FilmGrid className="mt-12" films={publicFilms} />
      </Container>
    </section>
  );
}
