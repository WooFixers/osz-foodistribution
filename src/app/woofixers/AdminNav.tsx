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

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async (closeSheet?: () => void) => {
    closeSheet?.();
    await supabase.auth.signOut();
    router.push("/woofixers");
    router.refresh();
  };

  return (
    <header className="bg-foreground text-background shrink-0">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        {/* Logo */}
        <div>
          <p className="font-heading font-bold text-base text-background leading-none">OSZ Admin</p>
          <p className="text-[10px] text-background/40 mt-0.5 hidden sm:block">Espace administration</p>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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

        {/* Desktop logout */}
        <button
          onClick={() => handleSignOut()}
          className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-background/70 hover:bg-background/10 hover:text-background transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>

        {/* Mobile hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 rounded-lg text-background/70 hover:bg-background/10 hover:text-background transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-0 bg-foreground text-background border-background/10">
            <div className="p-5 border-b border-background/10">
              <p className="font-heading font-bold text-base text-background">OSZ Admin</p>
              <p className="text-xs text-background/40 mt-0.5">Espace administration</p>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
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
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-background/10">
              <button
                onClick={() => handleSignOut()}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-background/70 hover:bg-background/10 hover:text-background transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
