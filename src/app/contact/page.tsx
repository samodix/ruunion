import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/lib/config";
import { buildMetadataFromWordPressPage, createMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadataFromWordPressPage(
    "/contact",
    createMetadata("Contact", "Échangez avec l’équipe RU Union.", "/contact"),
  );
}

export default function ContactPage() {
  return (
    <section className="py-24">
      <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionTitle
            eyebrow="Contact"
            title="Parlons de votre soutien"
            description="Une question, une proposition, un partenariat ou une envie d’aider ? L’équipe RU Union est à votre écoute."
          />
          <p className="text-ru-muted mt-9 flex items-center gap-3">
            <Mail className="text-ru-primary-dark" />
            {siteConfig.email}
          </p>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
