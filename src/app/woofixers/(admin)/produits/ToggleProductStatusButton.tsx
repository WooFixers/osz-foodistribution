"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  productId: string;
  isActive: boolean;
}

export default function ToggleProductStatusButton({ productId, isActive }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId, is_active: !isActive }),
    });
    setLoading(false);
    if (!res.ok) {
      toast.error("Erreur lors du changement de statut.");
      return;
    }
    toast.success(isActive ? "Produit désactivé." : "Produit activé.");
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
      className={isActive ? "" : "text-green-600 hover:text-green-600 hover:border-green-600/50"}
    >
      {loading
        ? <Loader2 className="w-4 h-4 animate-spin" />
        : isActive ? "Désactiver" : "Activer"}
    </Button>
  );
}
