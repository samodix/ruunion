import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/lib/config";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "Contact",
  "Échangez avec l’équipe RU Union.",
  "/contact",
);

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionTitle
            eyebrow="Contact"
            title="Construisons la suite ensemble"
            description="Un projet, une proposition de partenariat ou simplement une question ? Écrivez-nous."
          />
          <div className="text-ru-muted mt-9 space-y-4">
            <p className="flex items-center gap-3">
              <Mail className="text-ru-primary-dark" />
              {siteConfig.email}
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-ru-primary-dark" />
              France · Projets nationaux et locaux
            </p>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
