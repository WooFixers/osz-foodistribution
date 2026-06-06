import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function POST(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const payload = await req.json();
  const admin = await createAdminClient();
  const { error } = await admin.from("products").insert(payload);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const user = await requireAuth();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id, ...payload } = await req.json();
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });

  const admin = await createAdminClient();
  const { error } = await admin.from("products").update(payload).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
