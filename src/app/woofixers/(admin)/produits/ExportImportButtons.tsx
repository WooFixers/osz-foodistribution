"use client";

import { useState, useRef } from "react";
import { Download, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ExportImportButtons() {
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/admin/import-products", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Erreur serveur");
        return;
      }

      toast.success(`${data.updated} produit(s) mis à jour sur ${data.total}`);

      if (data.errors?.length) {
        toast.error(`${data.errors.length} erreur(s) — ${data.errors[0]}`);
      }

      window.location.reload();
    } catch {
      toast.error("Erreur lors de l'import");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a href="/api/admin/export-products" download>
        <Button variant="outline" size="sm" type="button">
          <Download className="w-4 h-4" /> Exporter Excel
        </Button>
      </a>

      <input
        ref={fileRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleImport}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileRef.current?.click()}
        disabled={importing}
      >
        {importing ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Import...</>
        ) : (
          <><Upload className="w-4 h-4" /> Importer Excel</>
        )}
      </Button>
    </div>
  );
}
