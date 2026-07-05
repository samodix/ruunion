"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  ExternalLink,
  HeartHandshake,
  LayoutDashboard,
  PackagePlus,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  {
    href: "/admin",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    exact: true,
  },
  { href: "/admin/films", label: "Films", icon: Clapperboard },
  { href: "/admin/films/new", label: "Ajouter un film", icon: PlusCircle },
  {
    href: "/admin/support-packs",
    label: "Packs de soutien",
    icon: HeartHandshake,
  },
  {
    href: "/admin/support-packs/new",
    label: "Ajouter un pack",
    icon: PackagePlus,
  },
  { href: "/", label: "Retour au site", icon: ExternalLink, exact: true },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="border-ru-border border-b bg-white lg:min-h-screen lg:border-r lg:border-b-0">
      <div className="border-ru-border border-b px-6 py-6">
        <Link href="/admin" className="text-ru-primary-dark text-xl font-black">
          RU Union{" "}
          <span className="text-ru-muted block text-xs font-bold">
            Back-office local
          </span>
        </Link>
      </div>
      <nav
        className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:p-4"
        aria-label="Navigation du back-office"
      >
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-ru-muted hover:bg-ru-soft hover:text-ru-primary-dark flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition",
                active &&
                  "bg-ru-primary-dark hover:bg-ru-primary-dark text-white hover:text-white",
              )}
            >
              <Icon size={19} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
