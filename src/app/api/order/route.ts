import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const orderItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  price: z.number(),
  unit: z.string(),
  qty: z.number().int().positive(),
});

const schema = z.object({
  nom: z.string().min(1),
  telephone: z.string().min(1),
  adresse: z.string().min(1),
  zone: z.string().nullable().optional(),
  creneau: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
  total: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Attach logged-in user if present
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error: dbError } = await supabase.from("orders").insert({
      user_id: user?.id ?? null,
      nom: data.nom,
      telephone: data.telephone,
      adresse: data.adresse,
      zone: data.zone,
      creneau: data.creneau ?? null,
      notes: data.notes ?? null,
      items: data.items,
      total: data.total,
    });

    if (dbError) {
      console.error("Supabase order insert error:", dbError);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    // Send email via Resend (non-blocking)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const itemsHtml = data.items
        .map((item) => `<tr>
          <td style="padding:6px">${item.name}</td>
          <td style="padding:6px;text-align:center">${item.qty}</td>
          <td style="padding:6px;text-align:right">${item.price} DH / ${item.unit}</td>
          <td style="padding:6px;text-align:right">${item.price * item.qty} DH</td>
        </tr>`)
        .join("");

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@osz-foodistribution.ma",
        to: process.env.RESEND_TO_EMAIL ?? "commande@osz-foodistribution.ma",
        subject: `Nouvelle commande — ${data.nom} (${data.zone})`,
        html: `
          <h2>Nouvelle commande particulier</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold">Nom</td><td style="padding:8px">${data.nom}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Téléphone</td><td style="padding:8px">${data.telephone}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Adresse</td><td style="padding:8px">${data.adresse}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Zone</td><td style="padding:8px">${data.zone}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Créneau</td><td style="padding:8px">${data.creneau ?? "—"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Notes</td><td style="padding:8px">${data.notes ?? "—"}</td></tr>
          </table>
          <h3>Produits commandés</h3>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <thead>
              <tr style="background:#f5f5f5">
                <th style="padding:6px;text-align:left">Produit</th>
                <th style="padding:6px;text-align:center">Qté</th>
                <th style="padding:6px;text-align:right">Prix unit.</th>
                <th style="padding:6px;text-align:right">Sous-total</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>
              <tr style="font-weight:bold">
                <td colspan="3" style="padding:8px;text-align:right">Total</td>
                <td style="padding:8px;text-align:right">${data.total} DH</td>
              </tr>
            </tfoot>
          </table>
        `,
      }).catch((err) => console.error("Resend order error:", err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }
    console.error("Order route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
