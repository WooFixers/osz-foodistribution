import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as XLSX from "xlsx";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("name");

  const rows = (products ?? []).map((p) => ({
    "ID":                 p.id,
    "Nom":                p.name,
    "Prix (DH)":          p.price,
    "Unité":              p.unit,
    "Catégorie":          p.category,
    "Type":               p.type ?? "",
    "Format":             p.format ?? "",
    "Badge":              p.badge ?? "",
    "En stock":           p.in_stock ? "VRAI" : "FAUX",
    "Mis en avant":       p.is_featured ? "VRAI" : "FAUX",
    "Ordre d'affichage":  p.sort_order,
    "Description":        p.description ?? "",
    "Note (0-5)":         p.rating ?? "",
    "Origine":            p.origin ?? "",
    "Poids/Format":       p.weight ?? "",
    "Conservation":       p.storage_instructions ?? "",
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);

  ws["!cols"] = [
    { wch: 38 }, // ID
    { wch: 30 }, // Nom
    { wch: 12 }, // Prix
    { wch: 10 }, // Unité
    { wch: 14 }, // Catégorie
    { wch: 12 }, // Type
    { wch: 12 }, // Format
    { wch: 14 }, // Badge
    { wch: 10 }, // En stock
    { wch: 14 }, // Mis en avant
    { wch: 18 }, // Ordre
    { wch: 40 }, // Description
    { wch: 10 }, // Note
    { wch: 16 }, // Origine
    { wch: 16 }, // Poids
    { wch: 30 }, // Conservation
  ];

  // Freeze header row
  ws["!freeze"] = { xSplit: 0, ySplit: 1 };

  XLSX.utils.book_append_sheet(wb, ws, "Produits");

  // Reference sheet with valid values
  const ref = XLSX.utils.aoa_to_sheet([
    ["Champ",                 "Valeurs autorisées"],
    ["Catégorie",             "viandes, legumes, charcuterie"],
    ["Type",                  "frais, surgele, prepare"],
    ["Format",                "unite, kilo, paquet"],
    ["Badge",                 "populaire, nouveau, offre  (laisser vide pour aucun)"],
    ["En stock / Mis en avant", "VRAI ou FAUX"],
    ["",                      ""],
    ["⚠ Important",           "Ne pas modifier la colonne ID"],
    ["",                      "Seules les lignes avec un ID valide sont mises à jour"],
    ["",                      "Sauvegarder en format .xlsx avant d'importer"],
  ]);
  ref["!cols"] = [{ wch: 28 }, { wch: 52 }];
  XLSX.utils.book_append_sheet(wb, ref, "Valeurs valides");

  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  const date = new Date().toISOString().slice(0, 10);

  return new NextResponse(buf, {
    headers: {
      "Content-Type":        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="produits-osz-${date}.xlsx"`,
    },
  });
}
