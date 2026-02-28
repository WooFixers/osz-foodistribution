"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, User, ShoppingBag, LogOut } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { Profile } from "@/lib/supabase/types";

const schema = z.object({
  nom: z.string().min(2, "Nom requis"),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  zone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const ZONES = ["Marrakech centre", "Guéliz", "Hivernage", "Palmeraie", "Targa"];

interface Props {
  user: SupabaseUser;
  profile: Profile | null;
}

export default function ProfileForm({ user, profile }: Props) {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nom: profile?.nom ?? "",
      telephone: profile?.telephone ?? "",
      adresse: profile?.adresse ?? "",
      zone: profile?.zone ?? "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        nom: values.nom,
        telephone: values.telephone ?? null,
        adresse: values.adresse ?? null,
        zone: values.zone ?? null,
      })
      .eq("id", user.id);

    if (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
      return;
    }
    toast.success("Profil mis à jour !");
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/compte/profil" className="flex items-center gap-1.5 text-foreground font-semibold">
              <User className="w-4 h-4" /> Mon profil
            </Link>
            <Link href="/compte/commandes" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingBag className="w-4 h-4" /> Mes commandes
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto py-12 max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Mon profil</h1>
        <p className="text-muted-foreground mb-8">Gérez vos informations personnelles et vos préférences de livraison.</p>

        <div className="bg-background rounded-xl border border-border shadow-sm p-8">
          <div className="mb-6 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground">Connecté en tant que</p>
            <p className="font-semibold text-foreground">{user.email}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="nom" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet *</FormLabel>
                  <FormControl><Input placeholder="Votre nom" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="telephone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl><Input placeholder="06 XX XX XX XX" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="adresse" render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse de livraison</FormLabel>
                  <FormControl><Input placeholder="Numéro, rue, quartier..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="zone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone de livraison préférée</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Sélectionner une zone" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ZONES.map((z) => <SelectItem key={z} value={z}>{z}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enregistrement...</>
                ) : "Enregistrer les modifications"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
