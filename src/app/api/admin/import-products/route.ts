import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const wb = XLSX.read(bytes, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]]; // first sheet = "Produits"
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws);

  let updated = 0;
  const errors: string[] = [];

  for (const row of rows) {
    const id = String(row["ID"] ?? "").trim();
    if (!id) {
      errors.push("Ligne ignorée : ID manquant");
      continue;
    }

    const price = parseFloat(String(row["Prix (DH)"] ?? ""));
    if (isNaN(price) || price < 0) {
      errors.push(`ID ${id}: prix invalide (${row["Prix (DH)"]})`);
      continue;
    }

    const badge = String(row["Badge"] ?? "").trim();
    const type  = String(row["Type"] ?? "").trim();
    const fmt   = String(row["Format"] ?? "").trim();
    const note  = row["Note (0-5)"];

    const { error } = await supabase
      .from("products")
      .update({
        name:                 String(row["Nom"] ?? "").trim() || undefined,
        price,
        unit:                 String(row["Unité"] ?? "").trim() || undefined,
        category:             String(row["Catégorie"] ?? "").trim() || undefined,
        type:                 type || null,
        format:               fmt  || null,
        badge:                badge || null,
        in_stock:             String(row["En stock"] ?? "").toUpperCase().trim() === "VRAI",
        is_featured:          String(row["Mis en avant"] ?? "").toUpperCase().trim() === "VRAI",
        sort_order:           parseInt(String(row["Ordre d'affichage"] ?? "0")) || 0,
        description:          String(row["Description"] ?? "").trim() || null,
        rating:               note !== "" && note != null
                                ? parseFloat(String(note)) || null
                                : null,
        origin:               String(row["Origine"] ?? "").trim() || null,
        weight:               String(row["Poids/Format"] ?? "").trim() || null,
        storage_instructions: String(row["Conservation"] ?? "").trim() || null,
        updated_at:           new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      errors.push(`ID ${id}: ${error.message}`);
    } else {
      updated++;
    }
  }

  return NextResponse.json({ updated, errors, total: rows.length });
}
