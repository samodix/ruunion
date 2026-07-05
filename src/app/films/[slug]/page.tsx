import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilmDonationBox } from "@/components/films/FilmDonationBox";
import { FilmHero } from "@/components/films/FilmHero";
import { Container } from "@/components/layout/Container";
import { buildMetadataFromWordPressFilm, createMetadata } from "@/lib/seo";
import { getWordPressFilmBySlug } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const film = await getWordPressFilmBySlug((await params).slug);
  if (!film || !film.publicVisibility) return {};

  return buildMetadataFromWordPressFilm(
    film.slug,
    createMetadata(
      film.seoTitle || film.title,
      film.seoDescription || film.shortDescription,
      `/films/${film.slug}`,
    ),
  );
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const film = await getWordPressFilmBySlug((await params).slug);
  if (!film || !film.publicVisibility) notFound();

  return (
    <>
      <section className="bg-ru-ink relative overflow-hidden py-24">
        <div className="bg-ru-primary/15 absolute -top-40 right-0 size-[32rem] rounded-full blur-3xl" />
        <Container className="relative">
          <FilmHero film={film} />
        </Container>
      </section>
      <section className="py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-ru-primary-dark text-sm font-black tracking-[.18em] uppercase">
              Dans les coulisses
            </p>
            <h2 className="mt-3 text-3xl font-black">Galerie du projet</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {film.gallery.length > 0 ? (
                film.gallery.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className={`from-ru-primary/30 to-ru-yellow/25 grid aspect-[4/3] place-items-center rounded-3xl bg-gradient-to-br p-5 text-center font-black shadow-sm ${index === 1 ? "sm:-translate-y-3" : ""}`}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="border-ru-border bg-ru-soft text-ru-muted col-span-full rounded-3xl border p-8">
                  Les premières images seront ajoutées depuis le CMS au fil de
                  la production.
                </div>
              )}
            </div>

            <h2 className="mt-16 text-3xl font-black">Pourquoi ce film ?</h2>
            <p className="text-ru-muted mt-5 max-w-3xl text-lg leading-8">
              Ce projet se construit avec ses futurs publics. Les soutiens
              financent l’écriture, le tournage, la postproduction et des
              projections accompagnées sur le terrain.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="border-ru-border rounded-2xl border bg-white p-5">
                <span className="text-ru-muted text-xs font-bold uppercase">
                  Année
                </span>
                <strong className="mt-2 block text-xl">{film.year}</strong>
              </div>
              <div className="border-ru-border rounded-2xl border bg-white p-5">
                <span className="text-ru-muted text-xs font-bold uppercase">
                  Statut
                </span>
                <strong className="mt-2 block text-xl capitalize">
                  {film.status.replaceAll("-", " ")}
                </strong>
              </div>
              <div className="border-ru-border rounded-2xl border bg-white p-5">
                <span className="text-ru-muted text-xs font-bold uppercase">
                  Engagement
                </span>
                <strong className="mt-2 block text-xl">Solidaire</strong>
              </div>
            </div>
          </div>
          <FilmDonationBox film={film} />
        </Container>
      </section>
    </>
  );
}
