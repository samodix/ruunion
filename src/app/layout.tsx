import type { Metadata } from "next";
import { SiteFrame } from "@/components/layout/SiteFrame";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RU Union — L’union des plus humains",
    template: "%s | RU Union",
  },
  description:
    "RU Union crée des récits et des actions solidaires pour retisser les liens humains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col antialiased">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
