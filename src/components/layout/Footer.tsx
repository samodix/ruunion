import Link from "next/link";
import { Container } from "./Container";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-ru-border bg-ru-ink border-t py-12 text-white">
      <Container className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xl font-black">RU Union</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
            {siteConfig.description}
          </p>
        </div>
        <div>
          <p className="text-ru-primary text-sm font-bold">Explorer</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
            <Link href="/films">Nos films</Link>
            <Link href="/association">Notre mission</Link>
            <Link href="/boutique">Packs de soutien</Link>
          </div>
        </div>
        <div>
          <p className="text-ru-primary text-sm font-bold">Informations</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/75">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Confidentialité</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
