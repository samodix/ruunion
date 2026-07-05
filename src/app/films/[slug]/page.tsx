import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilmDonationBox } from "@/components/films/FilmDonationBox";
import { FilmHero } from "@/components/films/FilmHero";
import { Container } from "@/components/layout/Container";
import { films } from "@/data/films";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return films
    .filter((film) => film.publicVisibility)
    .map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = films.find(
    (item) => item.slug === slug && item.publicVisibility,
  );
  return film
    ? createMetadata(film.title, film.shortDescription, `/films/${slug}`)
    : {};
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = films.find(
    (item) => item.slug === slug && item.publicVisibility,
  );
  if (!film) notFound();
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
              {film.gallery.map((item, index) => (
                <div
                  key={item}
                  className={`grid aspect-[4/3] place-items-center rounded-3xl bg-gradient-to-br ${film.accent} p-5 text-center font-black ${index === 1 ? "sm:-translate-y-3" : ""}`}
                >
                  {item}
                </div>
              ))}
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
