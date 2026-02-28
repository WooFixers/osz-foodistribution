import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GTMScript } from "@/components/GTMScript";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.osz-foodistribution.ma";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OSZ Food Distribution — Viandes & Produits alimentaires à Marrakech",
    template: "%s | OSZ Food Distribution",
  },
  description:
    "Spécialiste de la distribution de viandes et produits alimentaires à Marrakech. Qualité professionnelle livrée chez vous et auprès des restaurateurs, hôtels et traiteurs.",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: SITE_URL,
    siteName: "OSZ Food Distribution",
    title: "OSZ Food Distribution — Viandes & Produits alimentaires à Marrakech",
    description:
      "Spécialiste de la distribution de viandes et produits alimentaires à Marrakech. Qualité professionnelle livrée chez vous et auprès des restaurateurs, hôtels et traiteurs.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "OSZ Food Distribution — Viandes & Produits alimentaires à Marrakech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OSZ Food Distribution — Viandes & Produits alimentaires à Marrakech",
    description:
      "Spécialiste de la distribution de viandes et produits alimentaires à Marrakech.",
    images: ["/assets/logo.png"],
  },
  robots: { index: true, follow: true },
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
      <body className={`${cormorant.variable} ${nunito.variable}`} suppressHydrationWarning>
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
