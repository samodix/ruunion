import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Banknote,
  Clapperboard,
  Eye,
  HeartHandshake,
  Home,
  Sparkles,
} from "lucide-react";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getFilms, getSupportPacks } from "@/lib/admin-storage";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const [films, packs] = await Promise.all([getFilms(), getSupportPacks()]);
  const stats = [
    { label: "Films au total", value: films.length, icon: Clapperboard },
    {
      label: "Films publics",
      value: films.filter((film) => film.publicVisibility).length,
      icon: Eye,
    },
    {
      label: "Films mis en avant",
      value: films.filter((film) => film.isFeatured).length,
      icon: Sparkles,
      accent: "yellow" as const,
    },
    { label: "Packs au total", value: packs.length, icon: HeartHandshake },
    {
      label: "Packs mis en avant",
      value: packs.filter((pack) => pack.isHighlighted).length,
      icon: Home,
      accent: "yellow" as const,
    },
    {
      label: "Objectifs de dons",
      value: formatCurrency(
        films.reduce((sum, film) => sum + (film.donationGoal ?? 0), 0),
      ),
      icon: Banknote,
      accent: "dark" as const,
    },
  ];
  const links = [
    { href: "/admin/films", label: "Gérer les films" },
    { href: "/admin/films/new", label: "Ajouter un film" },
    { href: "/admin/support-packs", label: "Gérer les packs" },
    { href: "/admin/support-packs/new", label: "Ajouter un pack" },
    { href: "/", label: "Voir le site public" },
  ];
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section>
        <h2 className="text-3xl font-black">Tableau de bord RU Union</h2>
        <p className="text-ru-muted mt-2">
          Vue d’ensemble du stockage local de démonstration.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <AdminStatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>
      <section className="border-ru-border rounded-3xl border bg-white p-6">
        <h2 className="text-xl font-black">Liens rapides</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-ru-border bg-ru-soft hover:border-ru-primary-dark hover:text-ru-primary-dark rounded-full border px-5 py-3 text-sm font-bold transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
