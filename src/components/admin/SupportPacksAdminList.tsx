"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import type { SupportPack, SupportPackType } from "@/types/support-pack";
import { formatCurrency } from "@/lib/utils";
import { AdminBadge } from "./AdminBadge";
import { AdminConfirmModal } from "./AdminConfirmModal";
import { AdminEmptyState } from "./AdminEmptyState";
import { AdminTable } from "./AdminTable";

const typeLabels: Record<SupportPackType, string> = {
  donation: "Don",
  product: "Produit",
  ticket: "Billet",
  sponsor: "Mécénat",
};

export function SupportPacksAdminList({
  initialPacks,
}: {
  initialPacks: SupportPack[];
}) {
  const [packs, setPacks] = useState(initialPacks);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [selected, setSelected] = useState<SupportPack | null>(null);
  const [loading, setLoading] = useState(false);
  const filtered = useMemo(
    () =>
      packs.filter(
        (pack) =>
          pack.title.toLowerCase().includes(search.toLowerCase()) &&
          (type === "all" || pack.type === type),
      ),
    [packs, search, type],
  );
  async function remove() {
    if (!selected) return;
    setLoading(true);
    const response = await fetch(`/api/admin/support-packs/${selected.id}`, {
      method: "DELETE",
    });
    if (response.ok)
      setPacks((current) => current.filter((pack) => pack.id !== selected.id));
    setLoading(false);
    setSelected(null);
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Rechercher un pack</span>
            <Search
              className="text-ru-muted absolute top-1/2 left-4 -translate-y-1/2"
              size={18}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher par titre"
              className="border-ru-border w-full rounded-full border bg-white py-3 pr-4 pl-11"
            />
          </label>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="border-ru-border rounded-full border bg-white px-5 py-3 font-bold"
          >
            <option value="all">Tous les types</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/admin/support-packs/new"
          className="bg-ru-primary-dark inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold text-white"
        >
          <Plus size={18} />
          Ajouter un pack
        </Link>
      </div>
      {filtered.length === 0 ? (
        <AdminEmptyState
          title="Aucun pack trouvé"
          description="Modifiez vos filtres ou ajoutez un pack."
          href="/admin/support-packs/new"
          action="Ajouter un pack"
        />
      ) : (
        <AdminTable>
          <thead className="bg-ru-soft text-ru-muted text-xs tracking-wide uppercase">
            <tr>
              {[
                "Titre",
                "Prix",
                "Type",
                "Mis en avant",
                "Film associé",
                "Woo ID",
                "Stripe",
                "PayPal",
                "Actions",
              ].map((label) => (
                <th key={label} className="px-4 py-4 whitespace-nowrap">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-ru-border divide-y">
            {filtered.map((pack) => (
              <tr key={pack.id} className="hover:bg-ru-soft/70">
                <td className="min-w-52 px-4 py-4 font-bold">{pack.title}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {formatCurrency(pack.price)}
                </td>
                <td className="px-4 py-4">
                  <AdminBadge>{typeLabels[pack.type]}</AdminBadge>
                </td>
                <td className="px-4 py-4">
                  <AdminBadge tone={pack.isHighlighted ? "warning" : "neutral"}>
                    {pack.isHighlighted ? "Oui" : "Non"}
                  </AdminBadge>
                </td>
                <td className="px-4 py-4">{pack.relatedFilmSlug || "—"}</td>
                <td className="px-4 py-4">{pack.wooProductId || "—"}</td>
                <td className="px-4 py-4">{pack.stripePriceId || "—"}</td>
                <td className="px-4 py-4">{pack.paypalPlanId || "—"}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/support-packs/${pack.id}`}
                      aria-label={`Modifier ${pack.title}`}
                      className="border-ru-border text-ru-primary-dark rounded-xl border p-2"
                    >
                      <Pencil size={17} />
                    </Link>
                    <button
                      aria-label={`Supprimer ${pack.title}`}
                      className="rounded-xl border border-red-200 p-2 text-red-600"
                      onClick={() => setSelected(pack)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
      <AdminConfirmModal
        open={Boolean(selected)}
        title="Supprimer ce pack ?"
        description={`Le pack « ${selected?.title ?? ""} » sera retiré du stockage local.`}
        loading={loading}
        onCancel={() => setSelected(null)}
        onConfirm={remove}
      />
    </div>
  );
}
