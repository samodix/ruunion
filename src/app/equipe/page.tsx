import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata(
  "L’équipe",
  "Les personnes qui font vivre RU Union.",
  "/equipe",
);

const members = [
  { initials: "MB", name: "M. Bertrand", role: "Présidence & vision" },
  { initials: "CR", name: "Camille R.", role: "Production solidaire" },
  { initials: "YA", name: "Yanis A.", role: "Réalisation & image" },
  { initials: "SL", name: "Sofia L.", role: "Partenariats & territoires" },
];

export default function EquipePage() {
  return (
    <section className="py-20">
      <Container>
        <SectionTitle
          eyebrow="Notre équipe"
          title="Des regards différents, un même engagement"
          description="Une équipe pluridisciplinaire au service de récits utiles et accessibles."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <Card key={member.name} className="text-center">
              <div
                className={`mx-auto grid size-28 place-items-center rounded-[2rem] text-2xl font-black ${index % 2 ? "bg-ru-yellow/25" : "bg-ru-primary/20 text-ru-primary-dark"}`}
              >
                {member.initials}
              </div>
              <h2 className="mt-5 text-xl font-black">{member.name}</h2>
              <p className="text-ru-muted mt-2 text-sm">{member.role}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
