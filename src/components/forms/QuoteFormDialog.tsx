"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  nom: z.string().min(2, "Nom requis"),
  etablissement: z.string().min(2, "Nom de l'établissement requis"),
  type_client: z.string().min(1, "Type d'établissement requis"),
  telephone: z.string().min(8, "Numéro de téléphone requis"),
  email: z.string().email("Adresse e-mail invalide"),
  produits: z.string().optional(),
  volume: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const CLIENT_TYPES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "hotel", label: "Hôtel" },
  { value: "traiteur", label: "Traiteur" },
  { value: "collectivite", label: "Collectivité" },
  { value: "boucherie", label: "Boucherie" },
  { value: "commerce", label: "Commerce alimentaire" },
  { value: "autre", label: "Autre" },
];

interface QuoteFormDialogProps {
  children: React.ReactNode;
}

export default function QuoteFormDialog({ children }: QuoteFormDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nom: "", etablissement: "", type_client: "", telephone: "",
      email: "", produits: "", volume: "", message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      toast.success("Demande envoyée ! Nous vous contacterons sous 24h.");
      form.reset();
      setOpen(false);
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Demande de devis professionnel</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="nom" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom *</FormLabel>
                  <FormControl><Input placeholder="Votre nom" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="etablissement" render={({ field }) => (
                <FormItem>
                  <FormLabel>Établissement *</FormLabel>
                  <FormControl><Input placeholder="Nom de l'établissement" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="type_client" render={({ field }) => (
              <FormItem>
                <FormLabel>Type d&apos;établissement *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CLIENT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="telephone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone *</FormLabel>
                  <FormControl><Input placeholder="06 XX XX XX XX" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail *</FormLabel>
                  <FormControl><Input placeholder="vous@exemple.com" type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="produits" render={({ field }) => (
              <FormItem>
                <FormLabel>Produits souhaités</FormLabel>
                <FormControl><Input placeholder="Viandes, légumes, charcuterie..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="volume" render={({ field }) => (
              <FormItem>
                <FormLabel>Volume approximatif</FormLabel>
                <FormControl><Input placeholder="Ex. : 50 kg / semaine" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="message" render={({ field }) => (
              <FormItem>
                <FormLabel>Message complémentaire</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Précisez vos besoins, contraintes ou questions..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button
              type="submit"
              className="w-full h-12"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Envoi en cours...</>
              ) : (
                "Envoyer ma demande de devis"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
