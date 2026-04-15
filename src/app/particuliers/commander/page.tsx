"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Clock, ChevronRight,
  ShoppingCart, Search, Menu,
  Truck, ShieldCheck, Thermometer, Star,
  Package, Check, Minus, Plus, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { useCart } from "@/hooks/use-cart";
import CartDrawer from "@/components/CartDrawer";
import AccountButton from "@/components/AccountButton";

/* ─── TYPES ─── */
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  unit: string;
  category: "viandes" | "legumes" | "charcuterie";
  type: "frais" | "surgele" | "prepare" | null;
  format: "unite" | "kilo" | "paquet" | null;
  in_stock: boolean;
  badge: "populaire" | "nouveau" | "offre" | null;
  images: string[];
  rating: number | null;
}

const BADGE_MAP: Record<string, { label: string; className: string }> = {
  populaire: { label: "Populaire", className: "bg-primary text-primary-foreground" },
  nouveau:   { label: "Nouveau",   className: "bg-accent text-accent-foreground border border-border" },
  offre:     { label: "Offre spéciale", className: "bg-secondary text-secondary-foreground border border-border" },
};

/* ─── HEADER ─── */
const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/professionnels", label: "Professionnels" },
  { href: "/particuliers", label: "Particuliers" },
  { href: "/particuliers/commander", label: "Commander" },
];

const CatHeader = ({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) => (
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
    <div className="container mx-auto flex items-center justify-between py-4">
      <Link href="/">
        <Image src="/assets/logo.png" alt="OSZ Food Distribution — retour à l'accueil" width={120} height={40} className="h-10 w-auto" />
      </Link>
      <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-6 text-base font-medium">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className={href === "/particuliers/commander" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground transition-colors"}>
            {label}
          </Link>
        ))}
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
        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full hover:bg-accent transition-colors" aria-label="Menu">
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Image src="/assets/logo.png" alt="OSZ Food Distribution" width={100} height={34} className="h-8 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      href === "/particuliers/commander"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
                <a href="tel:0670594545" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4" /> 06 70 59 45 45
                </a>
                <a href="https://wa.me/212670594545" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  </header>
);

/* ─── PRODUCT CARD ─── */
const ProductCard = ({ product, onAdd }: { product: Product; onAdd: (product: Product, qty: number) => void }) => {
  const [qty, setQty] = useState(1);
  const badge = product.badge ? BADGE_MAP[product.badge] : null;
  const image = product.images?.[0] ?? "/assets/placeholder.jpg";

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/particuliers/produit/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${badge.className}`}>
              {badge.label}
            </span>
          )}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <span className="bg-foreground/80 text-background px-4 py-1.5 rounded-full text-sm font-semibold">Rupture de stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading text-base font-semibold text-foreground leading-tight">{product.name}</h3>
          {product.rating && (
            <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-medium text-muted-foreground">{product.rating}</span>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-xl font-heading font-bold text-primary">{product.price}</span>
            <span className="text-sm text-muted-foreground ml-1">DH / {product.unit}</span>
          </div>
          {product.in_stock && (
            <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
              <Check className="w-3 h-3 mr-0.5" /> Disponible
            </Badge>
          )}
        </div>

        {product.in_stock && (
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-1.5 hover:bg-accent transition-colors" aria-label="Réduire quantité">
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-1.5 hover:bg-accent transition-colors" aria-label="Augmenter quantité">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <Button onClick={() => onAdd(product, qty)} size="sm" className="flex-1 text-xs">
              <ShoppingCart className="w-3.5 h-3.5" /> Ajouter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── SKELETON CARD ─── */
const SkeletonCard = () => (
  <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-muted" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
      <div className="h-8 bg-muted rounded w-full mt-2" />
    </div>
  </div>
);

/* ─── FOOTER ─── */
const CatFooter = () => (
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

/* ─── MAIN PAGE ─── */
export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const { items, addItem, removeItem, updateQty, clearCart, total, count } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("pertinence");
  const [page, setPage] = useState(1);
  const perPage = 9;

  /* ─── Fetch from Supabase ─── */
  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("id, slug, name, description, price, unit, category, type, format, in_stock, badge, images, rating")
        .order("sort_order", { ascending: true });
      if (!error && data) setProducts(data as Product[]);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !(p.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    switch (sortBy) {
      case "prix-asc":   result = [...result].sort((a, b) => a.price - b.price); break;
      case "prix-desc":  result = [...result].sort((a, b) => b.price - a.price); break;
      case "nouveautes": result = [...result].sort((a, b) => (b.badge === "nouveau" ? 1 : 0) - (a.badge === "nouveau" ? 1 : 0)); break;
      case "populaires": result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break;
    }
    return result;
  }, [products, searchQuery, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const addToCart = (product: Product, qty: number) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.images?.[0] ?? "/assets/placeholder.jpg",
    }, qty);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CatHeader cartCount={count} onCartOpen={() => setCartOpen(true)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        total={total}
        onRemove={removeItem}
        onUpdateQty={updateQty}
        onClear={clearCart}
      />

      {/* ─── BREADCRUMB & INTRO ─── */}
      <section className="bg-secondary border-b border-border">
        <div className="container mx-auto py-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/particuliers" className="hover:text-foreground transition-colors">Particuliers</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Commander</span>
          </nav>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Commander votre viande fraîche à Marrakech</h1>
          <p className="text-muted-foreground max-w-xl">Sélectionnez vos produits et passez commande via WhatsApp. Livraison réfrigérée à domicile sur tout Marrakech — délai 48h maximum.</p>
        </div>
      </section>

      {/* ─── SEARCH & SORT BAR ─── */}
      <div className="container mx-auto py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] text-sm"><SelectValue placeholder="Trier par" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pertinence">Pertinence</SelectItem>
              <SelectItem value="prix-asc">Prix croissant</SelectItem>
              <SelectItem value="prix-desc">Prix décroissant</SelectItem>
              <SelectItem value="nouveautes">Nouveautés</SelectItem>
              <SelectItem value="populaires">Populaires</SelectItem>
            </SelectContent>
          </Select>

          {!loading && (
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="container mx-auto flex-1 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => { setPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      n === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Catalogue en cours de mise à jour</h3>
            <p className="text-muted-foreground mb-2">Notre catalogue est en cours de mise à jour.</p>
            <p className="text-muted-foreground mb-6">Contactez-nous directement pour passer commande :</p>
            <a
              href="https://wa.me/212670594545?text=Bonjour%2C%20je%20voudrais%20commander%20de%20la%20viande%20fra%C3%AEche%20%C3%A0%20Marrakech."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Commander via WhatsApp
            </a>
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground">Essayez de modifier votre recherche.</p>
          </div>
        )}
      </div>

      {/* ─── DELIVERY REASSURANCE ─── */}
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

      <CatFooter />
      <FloatingWhatsApp />
    </div>
  );
}
