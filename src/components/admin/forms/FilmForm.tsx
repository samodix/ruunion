"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Film } from "@/types/film";
import { filmSchema } from "@/lib/validators";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputClass =
  "mt-2 w-full rounded-2xl border border-ru-border bg-white px-4 py-3 font-normal";

export function FilmForm({ film }: { film?: Film }) {
  const router = useRouter();
  const [title, setTitle] = useState(film?.title ?? "");
  const [slug, setSlug] = useState(film?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(film));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const optionalNumber = (name: string) =>
      form.get(name) ? Number(form.get(name)) : undefined;
    const candidate = {
      title,
      slug,
      shortDescription: String(form.get("shortDescription") ?? ""),
      longDescription: String(form.get("longDescription") ?? ""),
      year: Number(form.get("year")),
      status: String(form.get("status")),
      poster: String(form.get("poster") ?? ""),
      trailerUrl: String(form.get("trailerUrl") ?? ""),
      gallery: String(form.get("gallery") ?? "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      donationGoal: optionalNumber("donationGoal"),
      donationCollected: optionalNumber("donationCollected"),
      isFeatured: form.has("isFeatured"),
      priorityOrder: Number(form.get("priorityOrder")),
      publicVisibility: form.has("publicVisibility"),
      homepageVisibility: form.has("homepageVisibility"),
      donationPackSlug: String(form.get("donationPackSlug") ?? ""),
      seoTitle: String(form.get("seoTitle") ?? ""),
      seoDescription: String(form.get("seoDescription") ?? ""),
    };
    const parsed = filmSchema.safeParse(candidate);
    if (!parsed.success)
      return setMessage(
        parsed.error.issues[0]?.message ?? "Formulaire invalide.",
      );
    setSaving(true);
    const response = await fetch(
      film ? `/api/admin/films/${film.id}` : "/api/admin/films",
      {
        method: film ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      },
    );
    const result = (await response.json()) as {
      success: boolean;
      message?: string;
    };
    setSaving(false);
    if (!result.success)
      return setMessage(result.message ?? "Une erreur est survenue.");
    setMessage(film ? "Film mis à jour." : "Film créé.");
    setTimeout(() => {
      router.push("/admin/films");
      router.refresh();
    }, 500);
  }
  return (
    <form onSubmit={submit} className="space-y-7">
      <div className="border-ru-border grid gap-5 rounded-3xl border bg-white p-6 md:grid-cols-2">
        <label className="text-sm font-bold">
          Titre
          <input
            required
            value={title}
            onChange={(event) => {
              const value = event.target.value;
              setTitle(value);
              if (!slugTouched) setSlug(slugify(value));
            }}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Slug
          <input
            required
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(slugify(event.target.value));
            }}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          Description courte
          <textarea
            required
            name="shortDescription"
            defaultValue={film?.shortDescription}
            rows={2}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          Description longue
          <textarea
            required
            name="longDescription"
            defaultValue={film?.longDescription}
            rows={6}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Année
          <input
            required
            name="year"
            type="number"
            min="1900"
            max="2100"
            defaultValue={film?.year ?? new Date().getFullYear()}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Statut
          <select
            name="status"
            defaultValue={film?.status ?? "en-production"}
            className={inputClass}
          >
            <option value="en-production">En production</option>
            <option value="termine">Terminé</option>
            <option value="en-diffusion">En diffusion</option>
            <option value="archive">Archive</option>
          </select>
        </label>
        <label className="text-sm font-bold md:col-span-2">
          URL de l’affiche
          <input
            name="poster"
            defaultValue={film?.poster}
            placeholder="/images/film.jpg"
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          URL de la bande-annonce
          <input
            name="trailerUrl"
            defaultValue={film?.trailerUrl}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          Galerie — une URL ou légende par ligne
          <textarea
            name="gallery"
            defaultValue={film?.gallery.join("\n")}
            rows={4}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Objectif de dons
          <input
            name="donationGoal"
            type="number"
            min="0"
            defaultValue={film?.donationGoal}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Montant collecté
          <input
            name="donationCollected"
            type="number"
            min="0"
            defaultValue={film?.donationCollected}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Priorité
          <input
            required
            name="priorityOrder"
            type="number"
            min="0"
            defaultValue={film?.priorityOrder ?? 0}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Pack de soutien lié
          <input
            name="donationPackSlug"
            defaultValue={film?.donationPackSlug}
            className={inputClass}
          />
        </label>
        <div className="flex flex-wrap gap-5 md:col-span-2">
          {[
            ["isFeatured", "Mis en avant", film?.isFeatured],
            [
              "publicVisibility",
              "Visible publiquement",
              film?.publicVisibility ?? true,
            ],
            [
              "homepageVisibility",
              "Visible sur l’accueil",
              film?.homepageVisibility,
            ],
          ].map(([name, label, checked]) => (
            <label
              key={String(name)}
              className="flex items-center gap-2 text-sm font-bold"
            >
              <input
                type="checkbox"
                name={String(name)}
                defaultChecked={Boolean(checked)}
                className="accent-ru-primary-dark size-5"
              />
              {String(label)}
            </label>
          ))}
        </div>
      </div>
      <div className="border-ru-border grid gap-5 rounded-3xl border bg-white p-6 md:grid-cols-2">
        <label className="text-sm font-bold">
          Titre SEO
          <input
            name="seoTitle"
            defaultValue={film?.seoTitle}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          Description SEO
          <textarea
            name="seoDescription"
            defaultValue={film?.seoDescription}
            rows={3}
            className={inputClass}
          />
        </label>
      </div>
      {message && (
        <p
          role="status"
          className="bg-ru-primary/15 text-ru-primary-dark rounded-2xl px-4 py-3 font-bold"
        >
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          disabled={saving}
          className="bg-ru-primary-dark rounded-full px-6 py-3 font-bold text-white disabled:opacity-60"
        >
          {saving
            ? "Enregistrement…"
            : film
              ? "Mettre à jour"
              : "Créer le film"}
        </button>
        <Link
          href="/admin/films"
          className="border-ru-border rounded-full border bg-white px-6 py-3 font-bold"
        >
          Retour à la liste
        </Link>
      </div>
    </form>
  );
}
