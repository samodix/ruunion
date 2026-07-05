"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";

function pageTitle(pathname: string) {
  if (pathname.includes("support-packs/new")) return "Nouveau pack";
  if (pathname.includes("support-packs/")) return "Modifier le pack";
  if (pathname.includes("support-packs")) return "Packs de soutien";
  if (pathname.includes("films/new")) return "Nouveau film";
  if (pathname.includes("films/")) return "Modifier le film";
  if (pathname.includes("films")) return "Films";
  return "Tableau de bord";
}

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="border-ru-border flex flex-wrap items-center justify-between gap-4 border-b bg-white px-5 py-4 sm:px-8">
      <div>
        <p className="text-ru-primary-dark text-xs font-black tracking-[.16em] uppercase">
          Administration
        </p>
        <h1 className="text-2xl font-black">{pageTitle(pathname)}</h1>
      </div>
      <div className="flex gap-2">
        <Link
          href="/"
          className="border-ru-border inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold"
        >
          <ExternalLink size={16} />
          Voir le site
        </Link>
        <button
          className="bg-ru-ink inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white"
          onClick={async () => {
            await fetch("/api/admin/auth/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
