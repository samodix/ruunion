import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Container } from "./Container";
import { navigation } from "@/data/navigation";

export function Header() {
  return (
    <header className="border-ru-border/80 bg-ru-cream/95 sticky top-0 z-50 border-b backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="RU Union — Accueil"
        >
          <span className="bg-ru-primary-dark shadow-ru-primary/20 grid size-11 place-items-center rounded-2xl text-white shadow-lg">
            <HeartHandshake aria-hidden="true" size={23} />
          </span>
          <span>
            <strong className="block text-lg leading-none">RU Union</strong>
            <small className="text-ru-muted mt-1 block text-xs">
              L’union des plus humains
            </small>
          </span>
        </Link>
        <nav
          className="text-ru-muted hidden items-center gap-6 text-sm font-bold md:flex"
          aria-label="Navigation principale"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-ru-primary-dark transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/films"
          className="bg-ru-primary-dark hover:bg-ru-ink rounded-full px-5 py-3 text-sm font-bold text-white transition"
        >
          Soutenir un film
        </Link>
      </Container>
    </header>
  );
}
