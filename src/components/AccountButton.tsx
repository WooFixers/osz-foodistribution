"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AccountButton() {
  const [status, setStatus] = useState<"loading" | "guest" | "user">("loading");
  const [nom, setNom] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setStatus("guest"); return; }
      /* Try to get the display name from the profile */
      const { data: profile } = await supabase
        .from("profiles")
        .select("nom")
        .eq("id", user.id)
        .single();
      setNom(profile?.nom ?? user.email ?? null);
      setStatus("user");
    });
  }, []);

  /* Avoid layout shift while checking — render same-size invisible placeholder */
  if (status === "loading") {
    return <span className="inline-block w-28 h-8" aria-hidden />;
  }

  if (status === "guest") {
    return (
      <Link
        href="/compte/connexion"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
      >
        <LogIn className="w-4 h-4" />
        Se connecter
      </Link>
    );
  }

  return (
    <Link
      href="/compte/profil"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors max-w-[160px]"
    >
      <User className="w-4 h-4 shrink-0" />
      <span className="truncate">{nom ?? "Mon compte"}</span>
    </Link>
  );
}
