"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email("E-mail invalide"),
  password: z.string().min(6, "Mot de passe requis (6 caractères minimum)"),
});

const registerSchema = z.object({
  nom: z.string().min(2, "Nom requis"),
  email: z.string().email("E-mail invalide"),
  password: z.string().min(6, "Mot de passe : 6 caractères minimum"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

function PasswordInput({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} {...field} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginValues) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      toast.error("E-mail ou mot de passe incorrect.");
      return;
    }
    toast.success("Connexion réussie !");
    router.push("/compte/profil");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl><Input type="email" placeholder="vous@exemple.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl><PasswordInput field={field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connexion...</>
          ) : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}

function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nom: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: RegisterValues) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { nom: values.nom },
      },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Compte créé ! Vérifiez votre e-mail pour confirmer votre inscription.");
    router.push("/compte/profil");
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="nom" render={({ field }) => (
          <FormItem>
            <FormLabel>Nom complet</FormLabel>
            <FormControl><Input placeholder="Votre nom" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl><Input type="email" placeholder="vous@exemple.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl><PasswordInput field={field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
          <FormItem>
            <FormLabel>Confirmer le mot de passe</FormLabel>
            <FormControl><PasswordInput field={field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" className="w-full h-11" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Création...</>
          ) : "Créer mon compte"}
        </Button>
      </form>
    </Form>
  );
}

export default function ConnexionPage() {
  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Mini header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto" />
          </Link>
          <Link href="/particuliers/catalogue" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Retour au catalogue
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Mon espace</h1>
            <p className="text-muted-foreground">Connectez-vous ou créez votre compte client</p>
          </div>

          <div className="bg-background rounded-xl border border-border shadow-sm p-8">
            <Tabs defaultValue="connexion">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="connexion" className="flex-1">Connexion</TabsTrigger>
                <TabsTrigger value="inscription" className="flex-1">Inscription</TabsTrigger>
              </TabsList>
              <TabsContent value="connexion">
                <LoginForm />
              </TabsContent>
              <TabsContent value="inscription">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
