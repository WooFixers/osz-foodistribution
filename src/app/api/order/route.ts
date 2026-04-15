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
        .map((item) => `
          <tr>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0">${item.name}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:center">${item.qty}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:right">${item.price} DH / ${item.unit}</td>
            <td style="padding:10px 12px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600">${item.price * item.qty} DH</td>
          </tr>`)
        .join("");

      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "commande@osz-foodistribution.ma";
      const toEmail = process.env.RESEND_TO_EMAIL ?? "commande@osz-foodistribution.ma";

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `🛒 Nouvelle commande — ${data.nom}`,
        html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
          <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;color:#1a1a1a">
            <div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">

              <!-- Header -->
              <div style="background:#1a1a1a;padding:24px 32px;text-align:center">
                <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:0.5px">OSZ Food Distribution</p>
                <p style="margin:6px 0 0;color:#aaaaaa;font-size:13px">Nouvelle commande particulier</p>
              </div>

              <!-- Client Info -->
              <div style="padding:28px 32px;border-bottom:1px solid #f0f0f0">
                <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1a1a1a">Informations client</h2>
                <table style="width:100%;border-collapse:collapse">
                  <tr>
                    <td style="padding:8px 0;color:#666666;font-size:14px;width:130px">Nom</td>
                    <td style="padding:8px 0;font-size:14px;font-weight:600">${data.nom}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#666666;font-size:14px">Téléphone</td>
                    <td style="padding:8px 0;font-size:14px;font-weight:600">
                      <a href="tel:${data.telephone}" style="color:#1a1a1a;text-decoration:none">${data.telephone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#666666;font-size:14px">Adresse</td>
                    <td style="padding:8px 0;font-size:14px">${data.adresse}</td>
                  </tr>
                  ${data.zone ? `<tr>
                    <td style="padding:8px 0;color:#666666;font-size:14px">Zone GPS</td>
                    <td style="padding:8px 0;font-size:14px">${data.zone}</td>
                  </tr>` : ""}
                  ${data.creneau ? `<tr>
                    <td style="padding:8px 0;color:#666666;font-size:14px">Créneau</td>
                    <td style="padding:8px 0;font-size:14px">${data.creneau}</td>
                  </tr>` : ""}
                  ${data.notes ? `<tr>
                    <td style="padding:8px 0;color:#666666;font-size:14px">Notes</td>
                    <td style="padding:8px 0;font-size:14px;font-style:italic">${data.notes}</td>
                  </tr>` : ""}
                </table>
              </div>

              <!-- Products -->
              <div style="padding:28px 32px;border-bottom:1px solid #f0f0f0">
                <h2 style="margin:0 0 16px;font-size:16px;font-weight:700;color:#1a1a1a">Produits commandés</h2>
                <table style="width:100%;border-collapse:collapse">
                  <thead>
                    <tr style="background:#f8f8f8">
                      <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#666666;font-weight:600">Produit</th>
                      <th style="padding:10px 12px;text-align:center;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#666666;font-weight:600">Qté</th>
                      <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#666666;font-weight:600">Prix unit.</th>
                      <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;color:#666666;font-weight:600">Sous-total</th>
                    </tr>
                  </thead>
                  <tbody>${itemsHtml}</tbody>
                  <tfoot>
                    <tr style="background:#1a1a1a">
                      <td colspan="3" style="padding:14px 12px;text-align:right;color:#ffffff;font-weight:700;font-size:15px">Total</td>
                      <td style="padding:14px 12px;text-align:right;color:#ffffff;font-weight:700;font-size:15px">${data.total} DH</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <!-- Footer -->
              <div style="padding:20px 32px;text-align:center;background:#f8f8f8">
                <p style="margin:0;font-size:12px;color:#999999">OSZ Food Distribution — Marrakech, Maroc</p>
                <p style="margin:4px 0 0;font-size:12px;color:#999999">06 70 59 45 45 · commande@osz-foodistribution.ma</p>
              </div>

            </div>
          </body>
          </html>
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
