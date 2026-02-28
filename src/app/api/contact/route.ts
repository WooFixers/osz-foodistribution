import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const schema = z.object({
  nom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().optional(),
  sujet: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase.from("contacts").insert({
      nom: data.nom,
      email: data.email,
      telephone: data.telephone ?? null,
      sujet: data.sujet ?? null,
      message: data.message,
    });

    if (dbError) {
      console.error("Supabase contact insert error:", dbError);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    // Send email via Resend (non-blocking)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@osz-foodistribution.ma",
        to: process.env.RESEND_TO_EMAIL ?? "commande@osz-foodistribution.ma",
        subject: `Nouveau message — ${data.sujet ?? "Contact"}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${data.nom}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">E-mail</td><td style="padding:8px">${data.email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${data.telephone ?? "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Sujet</td><td style="padding:8px">${data.sujet ?? "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px;white-space:pre-wrap">${data.message}</td></tr>
          </table>
        `,
      }).catch((err) => console.error("Resend contact error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
