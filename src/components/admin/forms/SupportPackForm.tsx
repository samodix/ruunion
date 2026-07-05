"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SupportPack } from "@/types/support-pack";
import { supportPackSchema } from "@/lib/validators";

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

export function SupportPackForm({ pack }: { pack?: SupportPack }) {
  const router = useRouter();
  const [title, setTitle] = useState(pack?.title ?? "");
  const [slug, setSlug] = useState(pack?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(pack));
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
      description: String(form.get("description") ?? ""),
      price: Number(form.get("price")),
      currency: "EUR",
      type: String(form.get("type")),
      features: String(form.get("features") ?? "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      isHighlighted: form.has("isHighlighted"),
      relatedFilmSlug: String(form.get("relatedFilmSlug") ?? ""),
      wooProductId: optionalNumber("wooProductId"),
      stripePriceId: String(form.get("stripePriceId") ?? ""),
      paypalPlanId: String(form.get("paypalPlanId") ?? ""),
    };
    const parsed = supportPackSchema.safeParse(candidate);
    if (!parsed.success)
      return setMessage(
        parsed.error.issues[0]?.message ?? "Formulaire invalide.",
      );
    setSaving(true);
    const response = await fetch(
      pack ? `/api/admin/support-packs/${pack.id}` : "/api/admin/support-packs",
      {
        method: pack ? "PUT" : "POST",
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
    setMessage(pack ? "Pack mis à jour." : "Pack créé.");
    setTimeout(() => {
      router.push("/admin/support-packs");
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
          Description
          <textarea
            required
            name="description"
            defaultValue={pack?.description}
            rows={5}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Prix
          <input
            required
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={pack?.price ?? 0}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Devise
          <input readOnly name="currency" value="EUR" className={inputClass} />
        </label>
        <label className="text-sm font-bold">
          Type
          <select
            name="type"
            defaultValue={pack?.type ?? "donation"}
            className={inputClass}
          >
            <option value="donation">Don</option>
            <option value="product">Produit</option>
            <option value="ticket">Billet</option>
            <option value="sponsor">Mécénat</option>
          </select>
        </label>
        <label className="text-sm font-bold">
          Film associé
          <input
            name="relatedFilmSlug"
            defaultValue={pack?.relatedFilmSlug}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold md:col-span-2">
          Avantages — un par ligne
          <textarea
            name="features"
            defaultValue={pack?.features.join("\n")}
            rows={4}
            className={inputClass}
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-bold md:col-span-2">
          <input
            type="checkbox"
            name="isHighlighted"
            defaultChecked={pack?.isHighlighted}
            className="accent-ru-primary-dark size-5"
          />
          Mettre ce pack en avant
        </label>
      </div>
      <div className="border-ru-border grid gap-5 rounded-3xl border bg-white p-6 md:grid-cols-2">
        <label className="text-sm font-bold">
          WooCommerce Product ID
          <input
            name="wooProductId"
            type="number"
            min="1"
            defaultValue={pack?.wooProductId}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          Stripe Price ID
          <input
            name="stripePriceId"
            defaultValue={pack?.stripePriceId}
            className={inputClass}
          />
        </label>
        <label className="text-sm font-bold">
          PayPal Plan ID
          <input
            name="paypalPlanId"
            defaultValue={pack?.paypalPlanId}
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
            : pack
              ? "Mettre à jour"
              : "Créer le pack"}
        </button>
        <Link
          href="/admin/support-packs"
          className="border-ru-border rounded-full border bg-white px-6 py-3 font-bold"
        >
          Retour à la liste
        </Link>
      </div>
    </form>
  );
}
