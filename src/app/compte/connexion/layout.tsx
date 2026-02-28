import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion — Mon espace client",
  description: "Connectez-vous ou créez votre compte client OSZ Food Distribution.",
  robots: { index: false, follow: false },
};

export default function ConnexionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
