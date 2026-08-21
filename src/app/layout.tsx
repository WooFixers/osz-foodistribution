import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GTMScript } from "@/components/GTMScript";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.osz-foodistribution.ma";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OSZ Food Distribution — Fournisseur de viande pour restaurants & hôtels à Marrakech",
    template: "%s | OSZ Food Distribution",
  },
  description:
    "Fournisseur de viande bovine et agneau de qualité professionnelle à Marrakech. Approvisionnement régulier pour restaurants, hôtels, riads et traiteurs. Traçabilité HACCP et chaîne du froid maîtrisée.",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE_URL,
    siteName: "OSZ Food Distribution",
    title: "OSZ Food Distribution — Fournisseur de viande à Marrakech",
    description:
      "Fournisseur de viande bovine et agneau pour restaurants, hôtels et riads à Marrakech. Approvisionnement régulier, qualité HACCP et livraisons planifiées.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "OSZ Food Distribution — Fournisseur de viande à Marrakech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSZ Food Distribution — Fournisseur de viande à Marrakech",
    description:
      "Fournisseur de viande bovine et agneau pour restaurants, hôtels et riads à Marrakech.",
    images: ["/assets/logo.png"],
  },
  robots: { index: true, follow: true },
  verification: { google: "ozYBBjSOxduMi9m6zOm2UBmUyqZxLvcK0lmgsYyL5vY" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "OSZ Food Distribution",
  description: "Distribution de viandes et produits alimentaires à Marrakech",
  url: SITE_URL,
  telephone: "+212670594545",
  email: "commande@osz-foodistribution.ma",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Marrakech",
    addressCountry: "MA",
  },
  areaServed: ["Marrakech", "Guéliz", "Hivernage", "Palmeraie", "Targa"],
  openingHours: "Mo-Sa 08:00-20:00",
  priceRange: "$$",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <GTMScript />
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
