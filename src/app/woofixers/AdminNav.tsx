"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, LogOut, Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/woofixers/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/woofixers/produits", label: "Produits", icon: Package },
  { href: "/woofixers/messages", label: "Messages", icon: MessageSquare },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 p-4 space-y-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "text-background/70 hover:bg-background/10 hover:text-background"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function LogoutButton({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    onNavigate?.();
    await supabase.auth.signOut();
    router.push("/woofixers");
    router.refresh();
  };

  return (
    <div className="p-4 border-t border-background/10">
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-background/70 hover:bg-background/10 hover:text-background transition-colors w-full"
      >
        <LogOut className="w-4 h-4" />
        Déconnexion
      </button>
    </div>
  );
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 bg-foreground text-background flex-col min-h-screen">
        <div className="p-6 border-b border-background/10">
          <p className="font-heading font-bold text-lg text-background">OSZ Admin</p>
          <p className="text-xs text-background/40 mt-0.5">Espace administration</p>
        </div>
        <NavLinks pathname={pathname} />
        <LogoutButton />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden bg-foreground text-background flex items-center justify-between px-4 py-3 shrink-0">
        <p className="font-heading font-bold text-base text-background">OSZ Admin</p>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg text-background/70 hover:bg-background/10 hover:text-background transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-foreground text-background border-background/10">
            <div className="p-6 border-b border-background/10">
              <p className="font-heading font-bold text-lg text-background">OSZ Admin</p>
              <p className="text-xs text-background/40 mt-0.5">Espace administration</p>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
              <NavLinks pathname={pathname} />
              <LogoutButton />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
