import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const schema = z.object({
  nom: z.string().min(1),
  etablissement: z.string().min(1),
  type_client: z.string().min(1),
  telephone: z.string().min(1),
  email: z.string().email(),
  produits: z.string().optional(),
  volume: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("quotes").insert({
      nom: data.nom,
      etablissement: data.etablissement,
      type_client: data.type_client,
      telephone: data.telephone,
      email: data.email,
      produits: data.produits ?? null,
      volume: data.volume ?? null,
      message: data.message ?? null,
    });

    if (dbError) {
      console.error("Supabase quote insert error:", dbError);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    // Send email via Resend (non-blocking)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@osz-foodistribution.ma",
        to: process.env.RESEND_TO_EMAIL ?? "commande@osz-foodistribution.ma",
        subject: `Nouvelle demande de devis — ${data.etablissement}`,
        html: `
          <h2>Nouvelle demande de devis professionnel</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${data.nom}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Établissement</td><td style="padding:8px">${data.etablissement}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Type</td><td style="padding:8px">${data.type_client}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${data.telephone}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">E-mail</td><td style="padding:8px">${data.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Produits</td><td style="padding:8px">${data.produits ?? "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Volume</td><td style="padding:8px">${data.volume ?? "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${data.message ?? "—"}</td></tr>
          </table>
        `,
      }).catch((err) => console.error("Resend quote error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    console.error("Quote route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
