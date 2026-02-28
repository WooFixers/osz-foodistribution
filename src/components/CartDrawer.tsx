"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ShoppingCart, Minus, Plus, Trash2,
  ArrowLeft, ChevronRight, Package,
  Truck, MapPin, Phone, Clock, CheckCircle2,
  Navigation, Loader2, AlertCircle, CalendarDays,
  UserCheck, LogIn,
} from "lucide-react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import type { CartItem } from "@/hooks/use-cart";

/* ─── Date helpers ─── */
function toDateInput(d: Date) { return d.toISOString().split("T")[0]; }
function getMinDate() { return toDateInput(new Date()); }
function getMaxDate() {
  const d = new Date(); d.setDate(d.getDate() + 3); return toDateInput(d);
}

/* ─── Order schema ─── */
const orderSchema = z.object({
  nom:           z.string().min(2, "Nom requis"),
  telephone:     z.string().min(8, "Téléphone requis"),
  adresse:       z.string().min(5, "Adresse requise"),
  creneau:       z.string().min(1, "Créneau requis"),
  creneau_date:  z.string().optional(),
  creneau_time:  z.string().optional(),
  notes:         z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.creneau === "personnalise") {
    if (!data.creneau_date)
      ctx.addIssue({ code: "custom", message: "Date requise", path: ["creneau_date"] });
    if (!data.creneau_time)
      ctx.addIssue({ code: "custom", message: "Heure requise", path: ["creneau_time"] });
  }
});
type OrderValues = z.infer<typeof orderSchema>;

/* ─── Post-order account creation schema ─── */
const signupSchema = z.object({
  email:    z.string().email("E-mail invalide"),
  password: z.string().min(6, "6 caractères minimum"),
});
type SignupValues = z.infer<typeof signupSchema>;

/* ─── GPS ─── */
interface GeoLocation { address: string; lat: number; lng: number; }

const CRENEAUX = [
  { value: "matin",        label: "Matin (11h – 14h)" },
  { value: "apres-midi",   label: "Après-midi (14h – 17h)" },
  { value: "soir",         label: "Soir (17h – 19h)" },
  { value: "personnalise", label: "📅 Choisir une date et heure" },
];

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onClear: () => void;
}

export default function CartDrawer({
  open, onClose, items, total, onRemove, onUpdateQty, onClear,
}: CartDrawerProps) {
  const [step, setStep]           = useState<"cart" | "form" | "done">("cart");
  const [location, setLocation]   = useState<GeoLocation | null>(null);
  const [locating, setLocating]   = useState(false);
  const [locError, setLocError]   = useState<string | null>(null);

  /* ─── Auth state ─── */
  const [authEmail, setAuthEmail]   = useState<string | null>(null);   // null = guest
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setAuthChecked(true); return; }
      setAuthEmail(user.email ?? null);
      /* Pre-fill order form from profile */
      const { data: profile } = await supabase
        .from("profiles")
        .select("nom, telephone, adresse")
        .eq("id", user.id)
        .single();
      if (profile) {
        if (profile.nom)       orderForm.setValue("nom",       profile.nom);
        if (profile.telephone) orderForm.setValue("telephone", profile.telephone);
        if (profile.adresse)   orderForm.setValue("adresse",   profile.adresse);
      }
      setAuthChecked(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Order form ─── */
  const orderForm = useForm<OrderValues>({ resolver: zodResolver(orderSchema) as any });
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = orderForm;
  const creneau  = watch("creneau");
  const isCustom = creneau === "personnalise";

  /* ─── Post-order signup form ─── */
  const signupForm = useForm<SignupValues>({ resolver: zodResolver(signupSchema) as any });

  /* ─── GPS detection ─── */
  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocError("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }
    setLocating(true); setLocError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=fr`,
            { headers: { "User-Agent": "OSZ-FoodDistribution/1.0" } }
          );
          const data = await res.json();
          setLocation({ address: data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng });
        } catch {
          setLocation({ address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng });
        } finally { setLocating(false); }
      },
      (err) => {
        setLocating(false);
        setLocError(err.code === 1
          ? "Permission refusée. Autorisez la localisation dans votre navigateur."
          : "Impossible de détecter votre position.");
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  };

  /* ─── Close ─── */
  const handleClose = () => { onClose(); setTimeout(() => setStep("cart"), 300); };

  /* ─── Order submit ─── */
  const onSubmit = async (values: OrderValues) => {
    let creneauStr = CRENEAUX.find((c) => c.value === values.creneau)?.label ?? values.creneau;
    if (isCustom && values.creneau_date && values.creneau_time) {
      const dateStr = new Date(values.creneau_date).toLocaleDateString("fr-FR", {
        weekday: "long", day: "numeric", month: "long",
      });
      creneauStr = `${dateStr} à ${values.creneau_time}`;
    }
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: values.nom, telephone: values.telephone, adresse: values.adresse,
          zone: location ? `${location.lat},${location.lng}` : null,
          creneau: creneauStr, notes: values.notes,
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, unit: i.unit, qty: i.qty })),
          total,
        }),
      });
      if (!res.ok) throw new Error();
      onClear(); reset(); setLocation(null); setStep("done");
    } catch {
      toast.error("Une erreur est survenue. Réessayez ou contactez-nous par WhatsApp.");
    }
  };

  /* ─── Post-order account creation ─── */
  const onSignup = async (values: SignupValues) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) { toast.error("Erreur lors de la création du compte : " + error.message); return; }
    toast.success("Compte créé ! Retrouvez vos commandes dans Mon espace.");
    setAuthEmail(values.email);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 gap-0">

        {/* ══════════════════════════════════════
            STEP 1 — CART
        ══════════════════════════════════════ */}
        {step === "cart" && (
          <>
            <SheetHeader className="px-5 py-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2 font-heading text-lg">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Mon panier
              </SheetTitle>
              {items.length > 0 && (
                <p className="text-xs text-muted-foreground pl-7 -mt-1">
                  {items.reduce((s, i) => s + i.qty, 0)} article{items.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}
                </p>
              )}
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
                <Package className="w-16 h-16 text-muted-foreground/20" />
                <p className="font-heading text-lg font-semibold text-foreground">Votre panier est vide</p>
                <p className="text-sm text-muted-foreground">Ajoutez des produits depuis le catalogue pour passer commande.</p>
                <Button variant="outline" onClick={handleClose}>Voir le catalogue</Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm font-semibold text-foreground leading-tight mb-0.5 truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground mb-2">{item.price} DH / {item.unit}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-border rounded-md overflow-hidden">
                            <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="p-1 hover:bg-accent transition-colors" aria-label="Réduire">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-medium min-w-[1.75rem] text-center">{item.qty}</span>
                            <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="p-1 hover:bg-accent transition-colors" aria-label="Augmenter">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-primary ml-auto">{item.price * item.qty} DH</span>
                          <button onClick={() => onRemove(item.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" aria-label="Supprimer">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border px-5 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total estimé</span>
                    <span className="font-heading text-xl font-bold text-primary">{total} DH</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Livraison à Marrakech uniquement. Frais à confirmer.</p>
                  <Button className="w-full" size="lg" onClick={() => setStep("form")}>
                    Passer commande <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <button onClick={onClear} className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors text-center">
                    Vider le panier
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ══════════════════════════════════════
            STEP 2 — ORDER FORM
        ══════════════════════════════════════ */}
        {step === "form" && (
          <>
            <SheetHeader className="px-5 py-4 border-b border-border">
              <SheetTitle className="flex items-center gap-2 font-heading text-lg">
                <button onClick={() => setStep("cart")} className="p-1 hover:bg-accent rounded-md transition-colors mr-1">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                Informations de livraison
              </SheetTitle>
            </SheetHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

                {/* ─── Auth status banner ─── */}
                {authChecked && (
                  authEmail ? (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary">
                      <UserCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>Connecté — vos informations ont été pré-remplies.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground">
                      <LogIn className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        <Link
                          href="/compte/connexion"
                          target="_blank"
                          rel="noopener"
                          className="text-primary font-medium hover:underline"
                        >
                          Connectez-vous
                        </Link>
                        {" "}pour retrouver vos commandes dans Mon espace.
                      </span>
                    </div>
                  )
                )}

                {/* ─── Order summary ─── */}
                <div className="bg-secondary rounded-xl p-4 space-y-2">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">Récapitulatif</p>
                  {items.map((i) => (
                    <div key={i.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate mr-2">{i.name} × {i.qty}</span>
                      <span className="font-medium text-foreground shrink-0">{i.price * i.qty} DH</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">{total} DH</span>
                  </div>
                </div>

                {/* ─── Contact ─── */}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="nom" className="text-sm font-medium">Nom complet *</Label>
                    <Input id="nom" placeholder="Votre nom" className="mt-1" {...register("nom")} />
                    {errors.nom && <p className="text-xs text-destructive mt-1">{errors.nom.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="telephone" className="text-sm font-medium">Téléphone *</Label>
                    <Input id="telephone" placeholder="06 XX XX XX XX" className="mt-1" {...register("telephone")} />
                    {errors.telephone && <p className="text-xs text-destructive mt-1">{errors.telephone.message}</p>}
                  </div>
                </div>

                {/* ─── Delivery address ─── */}
                <div>
                  <Label htmlFor="adresse" className="text-sm font-medium">Adresse de livraison *</Label>
                  <Input
                    id="adresse"
                    placeholder="Rue, numéro, immeuble, quartier..."
                    className="mt-1"
                    {...register("adresse")}
                  />
                  {errors.adresse && <p className="text-xs text-destructive mt-1">{errors.adresse.message}</p>}
                </div>

                {/* ─── GPS pin (optional) ─── */}
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Épingle GPS
                    <span className="font-normal text-muted-foreground">(optionnel)</span>
                  </Label>
                  <p className="text-[11px] text-muted-foreground mt-0.5 mb-2">
                    Aide le livreur à trouver votre emplacement exact.
                  </p>

                  {location ? (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground leading-snug break-words">{location.address}</p>
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=17/${location.lat}/${location.lng}`}
                          target="_blank" rel="noopener noreferrer"
                          className="text-[11px] text-primary hover:underline mt-1 block"
                        >Vérifier sur la carte ↗</a>
                      </div>
                      <button type="button" onClick={() => { setLocation(null); setLocError(null); }}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0 text-xs">✕</button>
                    </div>
                  ) : (
                    <Button type="button" variant="outline" size="sm" className="w-full border-dashed"
                      onClick={detectLocation} disabled={locating}>
                      {locating
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Localisation en cours…</>
                        : <><Navigation className="w-4 h-4" /> Épingler ma position actuelle</>}
                    </Button>
                  )}

                  {locError && (
                    <div className="flex items-start gap-2 mt-2 p-2.5 rounded-lg bg-destructive/5 border border-destructive/20">
                      <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                      <p className="text-[11px] text-destructive leading-snug">{locError}</p>
                    </div>
                  )}
                </div>

                {/* ─── Créneau ─── */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Créneau de livraison *</Label>
                    <Select onValueChange={(v) => { setValue("creneau", v); setValue("creneau_date", ""); setValue("creneau_time", ""); }} value={creneau}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir un créneau" />
                      </SelectTrigger>
                      <SelectContent>
                        {CRENEAUX.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.creneau && <p className="text-xs text-destructive mt-1">{errors.creneau.message}</p>}
                  </div>

                  {isCustom && (
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-secondary border border-border">
                      <div>
                        <Label htmlFor="creneau_date" className="text-xs font-medium flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" /> Date *
                        </Label>
                        <Input id="creneau_date" type="date" min={getMinDate()} max={getMaxDate()} className="mt-1 text-sm" {...register("creneau_date")} />
                        {errors.creneau_date && <p className="text-[11px] text-destructive mt-1">{errors.creneau_date.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="creneau_time" className="text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Heure *
                        </Label>
                        <Input id="creneau_time" type="time" min="11:00" max="19:00" className="mt-1 text-sm" {...register("creneau_time")} />
                        {errors.creneau_time && <p className="text-[11px] text-destructive mt-1">{errors.creneau_time.message}</p>}
                      </div>
                      <p className="col-span-2 text-[11px] text-muted-foreground">
                        Disponible aujourd'hui jusqu'à dans 3 jours, entre 11h et 19h.
                      </p>
                    </div>
                  )}
                </div>

                {/* ─── Notes ─── */}
                <div>
                  <Label htmlFor="notes" className="text-sm font-medium">Notes (optionnel)</Label>
                  <Textarea id="notes" placeholder="Instructions particulières, code portail, étage..."
                    className="mt-1 resize-none" rows={2} {...register("notes")} />
                </div>

                {/* ─── Reassurance ─── */}
                <div className="bg-secondary rounded-xl p-4 space-y-2.5">
                  {[
                    { icon: Truck,  text: "Livraison à domicile à Marrakech" },
                    { icon: Clock,  text: "Délai moyen : 24 à 48h" },
                    { icon: Phone,  text: "Confirmation par appel ou WhatsApp" },
                    { icon: MapPin, text: "Paiement à la livraison accepté" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />{text}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border px-5 py-4">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
                    : "Confirmer la commande"}
                </Button>
              </div>
            </form>
          </>
        )}

        {/* ══════════════════════════════════════
            STEP 3 — DONE
        ══════════════════════════════════════ */}
        {step === "done" && (
          <div className="flex-1 overflow-y-auto flex flex-col gap-5 px-8 py-10">
            {/* Success icon + message */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-primary" />
              </div>
              <div>
                <p className="font-heading text-xl font-bold text-foreground mb-2">Commande reçue !</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nous avons bien reçu votre commande. Notre équipe vous contactera sous peu pour confirmer la livraison.
                </p>
              </div>
              <div className="space-y-2 w-full">
                <Button className="w-full" onClick={handleClose}>Fermer</Button>
                <a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer"
                  className="block text-sm text-center text-primary hover:underline">
                  Suivre via WhatsApp
                </a>
              </div>
            </div>

            {/* ── Logged-in: link to orders ── */}
            {authEmail ? (
              <div className="flex items-center justify-center">
                <Link href="/compte/commandes" onClick={handleClose}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
                  Voir mes commandes →
                </Link>
              </div>
            ) : (
              /* ── Guest: offer account creation ── */
              <div className="rounded-xl border border-border bg-secondary p-5 space-y-3">
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">Suivez vos commandes</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Créez un compte pour retrouver cet achat et vos prochaines commandes dans Mon espace.
                  </p>
                </div>
                <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-2.5">
                  <div>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      className="h-9 text-sm"
                      {...signupForm.register("email")}
                    />
                    {signupForm.formState.errors.email && (
                      <p className="text-[11px] text-destructive mt-1">{signupForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Mot de passe (6 caractères min.)"
                      className="h-9 text-sm"
                      {...signupForm.register("password")}
                    />
                    {signupForm.formState.errors.password && (
                      <p className="text-[11px] text-destructive mt-1">{signupForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button type="submit" variant="outline" size="sm" className="w-full"
                    disabled={signupForm.formState.isSubmitting}>
                    {signupForm.formState.isSubmitting
                      ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Création…</>
                      : "Créer mon compte"}
                  </Button>
                </form>
              </div>
            )}
          </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
