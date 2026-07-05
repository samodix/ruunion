"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import type { Film, FilmStatus } from "@/types/film";
import { formatCurrency } from "@/lib/utils";
import { AdminBadge } from "./AdminBadge";
import { AdminConfirmModal } from "./AdminConfirmModal";
import { AdminEmptyState } from "./AdminEmptyState";
import { AdminTable } from "./AdminTable";

const statusLabels: Record<FilmStatus, string> = {
  "en-production": "En production",
  termine: "Terminé",
  "en-diffusion": "En diffusion",
  archive: "Archive",
};

export function FilmsAdminList({ initialFilms }: { initialFilms: Film[] }) {
  const [films, setFilms] = useState(initialFilms);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<Film | null>(null);
  const [loading, setLoading] = useState(false);
  const filtered = useMemo(
    () =>
      films.filter(
        (film) =>
          film.title.toLowerCase().includes(search.toLowerCase()) &&
          (status === "all" || film.status === status),
      ),
    [films, search, status],
  );
  async function remove() {
    if (!selected) return;
    setLoading(true);
    const response = await fetch(`/api/admin/films/${selected.id}`, {
      method: "DELETE",
    });
    if (response.ok)
      setFilms((current) => current.filter((film) => film.id !== selected.id));
    setLoading(false);
    setSelected(null);
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Rechercher un film</span>
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
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="border-ru-border rounded-full border bg-white px-5 py-3 font-bold"
          >
            <option value="all">Tous les statuts</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/admin/films/new"
          className="bg-ru-primary-dark inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold text-white"
        >
          <Plus size={18} />
          Ajouter un film
        </Link>
      </div>
      {filtered.length === 0 ? (
        <AdminEmptyState
          title="Aucun film trouvé"
          description="Modifiez vos filtres ou ajoutez un nouveau film."
          href="/admin/films/new"
          action="Ajouter un film"
        />
      ) : (
        <AdminTable>
          <thead className="bg-ru-soft text-ru-muted text-xs tracking-wide uppercase">
            <tr>
              {[
                "Titre",
                "Statut",
                "Année",
                "Public",
                "Accueil",
                "Priorité",
                "Objectif",
                "Collecté",
                "Actions",
              ].map((label) => (
                <th key={label} className="px-4 py-4 whitespace-nowrap">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-ru-border divide-y">
            {filtered.map((film) => (
              <tr key={film.id} className="hover:bg-ru-soft/70">
                <td className="min-w-56 px-4 py-4">
                  <strong>{film.title}</strong>
                  {film.isFeatured && (
                    <span className="ml-2">
                      <AdminBadge tone="warning">Mis en avant</AdminBadge>
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <AdminBadge>{statusLabels[film.status]}</AdminBadge>
                </td>
                <td className="px-4 py-4">{film.year}</td>
                <td className="px-4 py-4">
                  <AdminBadge
                    tone={film.publicVisibility ? "success" : "neutral"}
                  >
                    {film.publicVisibility ? "Public" : "Masqué"}
                  </AdminBadge>
                </td>
                <td className="px-4 py-4">
                  <AdminBadge
                    tone={film.homepageVisibility ? "success" : "neutral"}
                  >
                    {film.homepageVisibility ? "Oui" : "Non"}
                  </AdminBadge>
                </td>
                <td className="px-4 py-4">{film.priorityOrder}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {formatCurrency(film.donationGoal ?? 0)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {formatCurrency(film.donationCollected ?? 0)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/films/${film.id}`}
                      aria-label={`Modifier ${film.title}`}
                      className="border-ru-border text-ru-primary-dark rounded-xl border p-2"
                    >
                      <Pencil size={17} />
                    </Link>
                    <button
                      aria-label={`Supprimer ${film.title}`}
                      className="rounded-xl border border-red-200 p-2 text-red-600"
                      onClick={() => setSelected(film)}
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
        title="Supprimer ce film ?"
        description={`Le film « ${selected?.title ?? ""} » sera retiré du stockage local. Les packs associés ne seront pas modifiés.`}
        loading={loading}
        onCancel={() => setSelected(null)}
        onConfirm={remove}
      />
    </div>
  );
}
