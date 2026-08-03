import type { Metadata } from "next";
import { Anton, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PandaRP — Serveur GTA 5 RP sur FiveM Enhanced, sans whitelist",
    template: "%s — PandaRP",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "serveur GTA 5 RP",
    "serveur FiveM Enhanced",
    "GTA RP FiveM",
    "serveur GTA RP sans whitelist",
    "serveur GTA 5 RP français",
    "FiveM Enhanced",
    "PandaRP",
  ],
  authors: [{ name: "PandaRP" }],
  creator: "PandaRP",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "PandaRP — Serveur GTA 5 RP sur FiveM Enhanced, sans whitelist",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "PandaRP — Serveur GTA 5 RP sur FiveM Enhanced",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "games",
};

/**
 * Données structurées du site entier. Décrit PandaRP comme une organisation et
 * expose la recherche interne ; les pages ajoutent leurs propres schémas.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  ...(site.discordInvite ? { sameAs: [site.discordInvite] } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${instrument.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
