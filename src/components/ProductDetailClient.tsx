"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Clock, ChevronRight,
  ShoppingCart, Truck, ShieldCheck, Thermometer,
  Star, Minus, Plus, Check, Package, Zap,
  Info, UtensilsCrossed, Snowflake, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/use-cart";
import CartDrawer from "@/components/CartDrawer";
import AccountButton from "@/components/AccountButton";

/* ─── TYPES ─── */
export interface Product {
  id: string;
  name: string;
  description: string | null;
  long_description: string | null;
  price: number;
  unit: string;
  category: "viandes" | "legumes" | "charcuterie";
  in_stock: boolean;
  badge: "populaire" | "nouveau" | "offre" | null;
  images: string[];
  rating: number | null;
  origin: string | null;
  weight: string | null;
  storage_instructions: string | null;
  suggestions: string[];
}

const BADGE_MAP: Record<string, { label: string; className: string }> = {
  populaire: { label: "Populaire",      className: "bg-primary text-primary-foreground" },
  nouveau:   { label: "Nouveau",        className: "bg-accent text-accent-foreground border border-border" },
  offre:     { label: "Offre spéciale", className: "bg-secondary text-secondary-foreground border border-border" },
};

const CATEGORY_LABELS: Record<string, string> = {
  viandes:     "Viandes",
  legumes:     "Légumes",
  charcuterie: "Charcuterie",
};

/* ─── HEADER ─── */
const Header = ({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) => (
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
    <div className="container mx-auto flex items-center justify-between py-4">
      <Link href="/">
        <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto" />
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-base font-medium">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Accueil</Link>
        <Link href="/professionnels" className="text-muted-foreground hover:text-foreground transition-colors">Professionnels</Link>
        <Link href="/particuliers" className="text-muted-foreground hover:text-foreground transition-colors">Particuliers</Link>
        <Link href="/particuliers/catalogue" className="text-muted-foreground hover:text-foreground transition-colors">Catalogue</Link>
      </nav>
      <div className="flex items-center gap-3">
        <a href="tel:0670594545" className="hidden lg:flex items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors">
          <Phone className="w-3.5 h-3.5" /> 06 70 59 45 45
        </a>
        <AccountButton />
        <button onClick={onCartOpen} className="relative p-2 rounded-full hover:bg-accent transition-colors" aria-label="Panier">
          <ShoppingCart className="w-5 h-5 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </header>
);

/* ─── FOOTER ─── */
const Footer = () => (
  <footer className="bg-foreground text-background py-12">
    <div className="container mx-auto grid md:grid-cols-3 gap-8 text-sm">
      <div>
        <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={120} height={40} className="h-10 w-auto brightness-0 invert opacity-80 mb-3" />
        <p className="text-background/60 leading-relaxed">Votre partenaire de confiance pour des produits alimentaires premium à Marrakech.</p>
      </div>
      <div>
        <h4 className="font-heading font-bold mb-3">Contact</h4>
        <div className="space-y-2 text-background/60">
          <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /><a href="tel:0670594545" className="hover:text-background transition-colors">06 70 59 45 45</a></p>
          <p className="flex items-center gap-2"><MessageCircle className="w-3.5 h-3.5" /><a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">WhatsApp</a></p>
          <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> commande@osz-foodistribution.ma</p>
          <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Marrakech, Maroc</p>
          <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Lun – Sam : 8h – 20h</p>
        </div>
      </div>
      <div>
        <h4 className="font-heading font-bold mb-3">Navigation</h4>
        <div className="space-y-2 text-background/60">
          <Link href="/" className="block hover:text-background transition-colors">Accueil</Link>
          <Link href="/particuliers" className="block hover:text-background transition-colors">Espace Particuliers</Link>
          <Link href="/professionnels" className="block hover:text-background transition-colors">Espace Professionnels</Link>
        </div>
      </div>
    </div>
    <div className="container mx-auto mt-8 pt-6 border-t border-background/10 text-center text-background/40 text-xs">
      © {new Date().getFullYear()} OSZ Food Distribution — Tous droits réservés
    </div>
  </footer>
);

/* ─── CLIENT COMPONENT ─── */
export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { items, addItem, removeItem, updateQty: updateCartQty, clearCart, total, count } = useCart();
  const [cartOpen, setCartOpen]           = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty]                     = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const addToCart = (openDrawer = false) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.images?.[0] ?? "/assets/placeholder.jpg",
    }, qty);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
    if (openDrawer) setCartOpen(true);
  };

  const badge  = product.badge ? BADGE_MAP[product.badge] : null;
  const images = product.images?.length ? product.images : ["/assets/placeholder.jpg"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartCount={count} onCartOpen={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        total={total}
        onRemove={removeItem}
        onUpdateQty={updateCartQty}
        onClear={clearCart}
      />

      {/* Breadcrumb */}
      <section className="bg-secondary border-b border-border">
        <div className="container mx-auto py-4">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/particuliers" className="hover:text-foreground transition-colors">Particuliers</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/particuliers/catalogue" className="hover:text-foreground transition-colors">Catalogue</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto py-8 md:py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

          {/* LEFT — Image Gallery */}
          <div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-3">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {badge && (
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${badge.className}`}>
                  {badge.label}
                </span>
              )}
              {!product.in_stock && (
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <span className="bg-foreground/80 text-background px-5 py-2 rounded-full text-sm font-semibold">Rupture de stock</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === selectedImage ? "border-primary ring-1 ring-primary" : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Product Info */}
          <div>
            <div className="mb-1">
              <Badge variant="outline" className="text-xs text-muted-foreground mb-3">
                {CATEGORY_LABELS[product.category]}
              </Badge>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-muted-foreground text-base mb-4">{product.description}</p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating!) ? "text-amber-500 fill-amber-500" : "text-muted-foreground/20"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} / 5</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-heading font-bold text-primary">{product.price}</span>
              <span className="text-lg text-muted-foreground">DH / {product.unit}</span>
            </div>

            {/* Availability */}
            <div className="mb-6">
              {product.in_stock ? (
                <Badge variant="outline" className="border-primary/30 text-primary text-sm px-3 py-1">
                  <Check className="w-3.5 h-3.5 mr-1" /> En stock
                </Badge>
              ) : (
                <Badge variant="outline" className="border-destructive/30 text-destructive text-sm px-3 py-1">
                  Rupture de stock
                </Badge>
              )}
            </div>

            {/* Purchase Controls */}
            {product.in_stock && (
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-accent transition-colors" aria-label="Réduire">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-5 text-base font-medium min-w-[3rem] text-center">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-accent transition-colors" aria-label="Augmenter">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Total : <strong className="text-foreground">{product.price * qty} DH</strong>
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={() => addToCart(false)} size="lg" className="flex-1 text-base">
                    {addedFeedback
                      ? <><Check className="w-5 h-5" /> Ajouté !</>
                      : <><ShoppingCart className="w-5 h-5" /> Ajouter au panier</>
                    }
                  </Button>
                  <Button onClick={() => addToCart(true)} variant="outline" size="lg" className="flex-1 text-base border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Zap className="w-5 h-5" /> Commander maintenant
                  </Button>
                </div>
              </div>
            )}

            {/* Delivery Reassurance */}
            <div className="bg-secondary rounded-xl p-5 space-y-3">
              {[
                { icon: Truck,       text: "Livraison à domicile à Marrakech" },
                { icon: Thermometer, text: "Respect strict de la chaîne du froid" },
                { icon: ShieldCheck, text: "Emballage sécurisé et hygiénique" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 lg:mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Informations</TabsTrigger>
              <TabsTrigger value="preparation">Préparation</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="max-w-2xl">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {product.long_description ?? product.description}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <div className="max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Package,   label: "Conditionnement", value: product.weight },
                  { icon: MapPin,    label: "Origine",         value: product.origin },
                  { icon: Snowflake, label: "Conservation",    value: product.storage_instructions },
                  { icon: Info,      label: "Catégorie",       value: CATEGORY_LABELS[product.category] },
                ].filter(({ value }) => value).map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 p-4 rounded-lg bg-secondary">
                    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{label}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preparation" className="mt-6">
              <div className="max-w-2xl">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-primary" /> Suggestions de préparation
                </h3>
                {product.suggestions?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {product.suggestions.map((s) => (
                      <Badge key={s} variant="outline" className="text-sm px-3 py-1.5">{s}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Aucune suggestion disponible.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Vous aimerez aussi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((rp) => {
                const rpBadge = rp.badge ? BADGE_MAP[rp.badge] : null;
                const rpImage = rp.images?.[0] ?? "/assets/placeholder.jpg";
                return (
                  <Link key={rp.id} href={`/particuliers/produit/${rp.id}`} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image src={rpImage} alt={rp.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      {rpBadge && (
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${rpBadge.className}`}>
                          {rpBadge.label}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-sm font-semibold text-foreground leading-tight mb-1">{rp.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{rp.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-heading font-bold text-primary">{rp.price}</span>
                        <span className="text-xs text-muted-foreground">DH / {rp.unit}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Delivery Reassurance Bar */}
      <section className="bg-secondary border-t border-border">
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck,       title: "Livraison à domicile", desc: "Partout à Marrakech" },
              { icon: Thermometer, title: "Chaîne du froid",      desc: "Strictement respectée" },
              { icon: ShieldCheck, title: "Qualité garantie",     desc: "Produits sélectionnés avec soin" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
