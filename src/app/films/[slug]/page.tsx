import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilmDonationBox } from "@/components/films/FilmDonationBox";
import { FilmHero } from "@/components/films/FilmHero";
import { Container } from "@/components/layout/Container";
import { getFilmBySlug } from "@/lib/admin-storage";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const film = await getFilmBySlug((await params).slug);
  return film && film.publicVisibility
    ? createMetadata(
        film.seoTitle || film.title,
        film.seoDescription || film.shortDescription,
        `/films/${film.slug}`,
      )
    : {};
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const film = await getFilmBySlug((await params).slug);
  if (!film || !film.publicVisibility) notFound();
  return (
    <>
      <section className="bg-ru-soft py-20">
        <Container>
          <FilmHero film={film} />
        </Container>
      </section>
      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <h2 className="text-3xl font-black">Galerie du projet</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {film.gallery.length > 0 ? (
                film.gallery.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className={`from-ru-primary/30 to-ru-yellow/25 grid aspect-[4/3] place-items-center rounded-3xl bg-gradient-to-br p-5 text-center font-black ${index === 1 ? "sm:-translate-y-3" : ""}`}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <p className="text-ru-muted">Galerie bientôt disponible.</p>
              )}
            </div>
            <h2 className="mt-14 text-3xl font-black">Pourquoi ce film ?</h2>
            <p className="text-ru-muted mt-5 max-w-3xl text-lg leading-8">
              Ce projet est conçu avec ses futurs publics. Les soutiens
              financent l’écriture, le tournage, la postproduction et des
              projections accompagnées sur le terrain.
            </p>
          </div>
          <FilmDonationBox film={film} />
        </Container>
      </section>
    </>
  );
}
