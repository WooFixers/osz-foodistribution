"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import type { Product } from "@/lib/supabase/types";

const schema = z.object({
  name: z.string().min(1, "Nom requis"),
  description: z.string().optional(),
  long_description: z.string().optional(),
  price: z.coerce.number().positive("Prix requis"),
  unit: z.string().min(1, "Unité requise"),
  category: z.enum(["viandes", "legumes", "charcuterie"]),
  type: z.enum(["frais", "surgele", "prepare"]).optional(),
  format: z.enum(["unite", "kilo", "paquet"]).optional(),
  badge: z.enum(["populaire", "nouveau", "offre"]).optional(),
  in_stock: z.boolean().default(true),
  rating: z.coerce.number().min(0).max(5).optional(),
  origin: z.string().optional(),
  weight: z.string().optional(),
  storage_instructions: z.string().optional(),
  suggestions: z.string().optional(),
  is_featured: z.boolean().default(false),
  sort_order: z.coerce.number().int().default(0),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  product?: Product | null;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<FormValues, any, FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      long_description: product?.long_description ?? "",
      price: product?.price ?? 0,
      unit: product?.unit ?? "kg",
      category: (product?.category as "viandes" | "legumes" | "charcuterie") ?? "viandes",
      type: (product?.type as "frais" | "surgele" | "prepare") ?? undefined,
      format: (product?.format as "unite" | "kilo" | "paquet") ?? undefined,
      badge: (product?.badge as "populaire" | "nouveau" | "offre") ?? undefined,
      in_stock: product?.in_stock ?? true,
      rating: product?.rating ?? undefined,
      origin: product?.origin ?? "",
      weight: product?.weight ?? "",
      storage_instructions: product?.storage_instructions ?? "",
      suggestions: product?.suggestions?.join(", ") ?? "",
      is_featured: product?.is_featured ?? false,
      sort_order: product?.sort_order ?? 0,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("product-images").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch {
      toast.error("Erreur lors de l'upload des images.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      images,
      type: values.type ?? null,
      format: values.format ?? null,
      badge: values.badge ?? null,
      rating: values.rating ?? null,
      origin: values.origin || null,
      weight: values.weight || null,
      storage_instructions: values.storage_instructions || null,
      suggestions: values.suggestions
        ? values.suggestions.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    let error;
    if (product) {
      ({ error } = await supabase.from("products").update(payload).eq("id", product.id));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    if (error) {
      toast.error("Erreur lors de l'enregistrement.");
      return;
    }
    toast.success(product ? "Produit mis à jour !" : "Produit créé !");
    router.push("/woofixers/produits");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        {/* Images */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Images du produit</p>
          <div className="flex flex-wrap gap-3 mb-3">
            {images.map((url, i) => (
              <div key={i} className="relative w-24 h-20 rounded-lg overflow-hidden border border-border group">
                <Image src={url} alt={`Image ${i + 1}`} fill className="object-cover" sizes="96px" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="w-24 h-20 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
              {uploading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                  <span className="text-[10px] text-muted-foreground">Ajouter</span>
                </>
              )}
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Nom *</FormLabel>
              <FormControl><Input placeholder="Nom du produit" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Description courte</FormLabel>
              <FormControl><Input placeholder="Description affichée dans la liste" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="long_description" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Description détaillée</FormLabel>
              <FormControl><Textarea placeholder="Description complète sur la page produit" rows={4} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel>Prix (DH) *</FormLabel>
              <FormControl><Input type="number" step="0.01" min="0" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="unit" render={({ field }) => (
            <FormItem>
              <FormLabel>Unité *</FormLabel>
              <FormControl><Input placeholder="kg, pièce, paquet..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="viandes">Viandes</SelectItem>
                  <SelectItem value="legumes">Légumes</SelectItem>
                  <SelectItem value="charcuterie">Charcuterie</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="type" render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="frais">Frais</SelectItem>
                  <SelectItem value="surgele">Surgelé</SelectItem>
                  <SelectItem value="prepare">Préparé</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="format" render={({ field }) => (
            <FormItem>
              <FormLabel>Conditionnement</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="unite">À l&apos;unité</SelectItem>
                  <SelectItem value="kilo">Au kilo</SelectItem>
                  <SelectItem value="paquet">Paquet familial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="badge" render={({ field }) => (
            <FormItem>
              <FormLabel>Badge</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl><SelectTrigger><SelectValue placeholder="Aucun" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="populaire">Populaire</SelectItem>
                  <SelectItem value="nouveau">Nouveau</SelectItem>
                  <SelectItem value="offre">Offre spéciale</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="rating" render={({ field }) => (
            <FormItem>
              <FormLabel>Note (0–5)</FormLabel>
              <FormControl><Input type="number" step="0.1" min="0" max="5" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="origin" render={({ field }) => (
            <FormItem>
              <FormLabel>Origine</FormLabel>
              <FormControl><Input placeholder="Ex. : Élevage local" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="weight" render={({ field }) => (
            <FormItem>
              <FormLabel>Conditionnement / Poids</FormLabel>
              <FormControl><Input placeholder="Ex. : 1 kg minimum" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="storage_instructions" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Instructions de conservation</FormLabel>
              <FormControl><Input placeholder="Ex. : Conserver entre 0°C et 4°C." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="suggestions" render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Suggestions de préparation</FormLabel>
              <FormControl><Input placeholder="Grillades, Tajine, Rôti... (séparés par des virgules)" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="sort_order" render={({ field }) => (
            <FormItem>
              <FormLabel>Ordre d&apos;affichage</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Toggles */}
        <div className="flex gap-8">
          <FormField control={form.control} name="in_stock" render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0 cursor-pointer">En stock</FormLabel>
            </FormItem>
          )} />
          <FormField control={form.control} name="is_featured" render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="!mt-0 cursor-pointer">Mis en avant</FormLabel>
            </FormItem>
          )} />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enregistrement...</>
            ) : (product ? "Mettre à jour" : "Créer le produit")}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/woofixers/produits")}>
            Annuler
          </Button>
        </div>
      </form>
    </Form>
  );
}
