"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { SubmissionStatus } from "@/lib/supabase/types";

interface Props {
  table: "quotes" | "orders" | "contacts";
  id: string;
  currentStatus: SubmissionStatus;
}

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "Nouveau",
  read: "Lu",
  replied: "Répondu",
};

export default function StatusUpdater({ table, id, currentStatus }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleChange = async (value: string) => {
    setLoading(true);
    const { error } = await supabase
      .from(table)
      .update({ status: value })
      .eq("id", id);
    setLoading(false);
    if (error) {
      toast.error("Erreur lors de la mise à jour.");
      return;
    }
    toast.success("Statut mis à jour.");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Statut :</span>
      <Select defaultValue={currentStatus} onValueChange={handleChange} disabled={loading}>
        <SelectTrigger className="w-36 h-8 text-xs">
          <SelectValue />
          {loading && <Loader2 className="w-3 h-3 animate-spin ml-1" />}
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(STATUS_LABELS) as SubmissionStatus[]).map((s) => (
            <SelectItem key={s} value={s} className="text-xs">{STATUS_LABELS[s]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
