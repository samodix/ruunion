import type { Film } from "@/types/film";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { FilmGrid } from "@/components/films/FilmGrid";

export function FeaturedFilmsSection({ films }: { films: Film[] }) {
  return (
    <section className="bg-ru-soft relative overflow-hidden py-28">
      <div className="bg-ru-yellow/10 absolute -top-40 right-0 size-96 rounded-full blur-3xl" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle
            as="h2"
            eyebrow="À l’affiche"
            title="Des histoires qui ont besoin de nous"
            description="Entrez dans l’univers des films prioritaires, découvrez leur progression et choisissez l’histoire que vous souhaitez aider à faire grandir."
          />
          <Button href="/films" variant="secondary">
            Explorer tous les films
          </Button>
        </div>
        <FilmGrid className="mt-14" films={films} />
      </Container>
    </section>
  );
}
