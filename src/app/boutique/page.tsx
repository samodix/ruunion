import type { Metadata } from "next";
import {
  ArrowDown,
  CheckCircle2,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SupportPackGrid } from "@/components/shop/SupportPackGrid";
import { DataSourceNotice } from "@/components/ui/DataSourceNotice";
import { buildMetadataFromWordPressPage, createMetadata } from "@/lib/seo";
import { getWooSupportPacksWithSource } from "@/lib/woocommerce";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataFromWordPressPage(
    "/boutique",
    createMetadata(
      "Soutenir RU Union",
      "Choisissez un pack de soutien pour aider les films et les actions RU Union.",
      "/boutique",
    ),
  );
}

export default async function BoutiquePage() {
  const result = await getWooSupportPacksWithSource();
  const packs = [...result.packs].sort(
    (a, b) =>
      Number(b.isHighlighted) - Number(a.isHighlighted) || a.price - b.price,
  );
  const steps = [
    "Vous choisissez un pack adapté à votre envie de soutenir.",
    "Le soutien finance un film, une rencontre ou une action.",
    "RU Union transforme cette énergie en projet concret.",
  ];

  return (
    <>
      <section className="from-ru-cream via-ru-soft to-ru-primary/12 relative isolate overflow-hidden bg-gradient-to-br py-20 sm:py-28">
        <div className="bg-ru-yellow/25 absolute -top-32 right-[-8rem] -z-10 size-[34rem] rounded-full blur-3xl" />
        <div className="ru-grid-pattern absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-45" />
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="border-ru-border text-ru-primary-dark inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-xs font-black tracking-[.13em] uppercase">
              <Sparkles size={15} /> Packs de soutien · Paiement bientôt
              disponible
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl leading-[.95] font-black tracking-[-.06em] sm:text-7xl">
              Soutenir RU Union
            </h1>
            <p className="text-ru-muted mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
              Choisissez un pack de soutien et participez au développement des
              films, des actions et des projets humains portés par RU Union.
            </p>
            <a
              href="#packs"
              className="text-ru-primary-dark mt-9 inline-flex items-center text-sm font-black"
            >
              Découvrir les packs <ArrowDown className="ml-2" size={17} />
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="bg-ru-ink relative min-h-[25rem] overflow-hidden rounded-[2.75rem] p-8 text-white shadow-[0_35px_90px_rgba(51,54,58,.22)]">
              <div className="bg-ru-primary/30 absolute -top-20 -right-20 size-64 rounded-full blur-2xl" />
              <div className="bg-ru-yellow/20 absolute -bottom-24 -left-16 size-64 rounded-full blur-2xl" />
              <HeartHandshake
                className="text-ru-yellow relative"
                size={54}
                strokeWidth={1.4}
              />
              <p className="text-ru-primary relative mt-14 text-xs font-black tracking-[.2em] uppercase">
                Un soutien, trois effets
              </p>
              <h2 className="relative mt-4 text-3xl leading-tight font-black">
                Un film avance.
                <br />
                Une voix circule.
                <br />
                Un lien se crée.
              </h2>
              <p className="relative mt-6 text-sm leading-6 text-white/60">
                Aucun paiement réel n’est actif. Les packs préparent la future
                expérience de soutien.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="packs" className="py-24 sm:py-32">
        <Container>
          <DataSourceNotice
            source={result.source}
            successLabel="Packs synchronisés depuis WooCommerce local."
          />
          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-ru-primary-dark text-sm font-black tracking-[.2em] uppercase">
                La collection solidaire
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-6xl">
                Choisissez votre manière d’agir
              </h2>
            </div>
            <p className="text-ru-muted max-w-md leading-7">
              Du premier geste au mécénat, chaque pack ouvre une place dans
              l’aventure RU Union.
            </p>
          </div>
          <div className="mt-12">
            <SupportPackGrid packs={packs} />
          </div>
        </Container>
      </section>

      <section className="bg-ru-soft py-24 sm:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="text-ru-primary-dark text-sm font-black tracking-[.2em] uppercase">
              Une énergie utile
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-6xl">
              Comment votre soutien agit
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step}
                className="border-ru-border rounded-[2rem] border bg-white p-7 shadow-sm sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="text-ru-primary-dark" size={28} />
                  <span className="text-ru-border text-4xl font-black">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-8 text-lg leading-8 font-bold">{step}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
