export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { Quote, Order, Contact } from "@/lib/supabase/types";
import StatusUpdater from "./StatusUpdater";

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  new: { label: "Nouveau", variant: "default" },
  read: { label: "Lu", variant: "secondary" },
  replied: { label: "Répondu", variant: "outline" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function QuoteRow({ quote }: { quote: Quote }) {
  const status = STATUS_MAP[quote.status] ?? STATUS_MAP.new;
  return (
    <details className="bg-background rounded-xl border border-border group">
      <summary className="flex items-start justify-between p-5 cursor-pointer list-none">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-foreground truncate">{quote.nom} — {quote.etablissement}</p>
            <Badge variant={status.variant} className="shrink-0 text-xs">{status.label}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{quote.type_client} · {formatDate(quote.created_at)}</p>
        </div>
        <svg className="w-4 h-4 text-muted-foreground ml-4 shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="px-5 pb-5 border-t border-border pt-4 space-y-3 text-sm">
        <div className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
          <p><span className="font-medium text-foreground">Téléphone : </span>{quote.telephone}</p>
          <p><span className="font-medium text-foreground">E-mail : </span>{quote.email}</p>
          {quote.produits && <p className="sm:col-span-2"><span className="font-medium text-foreground">Produits : </span>{quote.produits}</p>}
          {quote.volume && <p><span className="font-medium text-foreground">Volume : </span>{quote.volume}</p>}
          {quote.message && <p className="sm:col-span-2"><span className="font-medium text-foreground">Message : </span>{quote.message}</p>}
        </div>
        <StatusUpdater table="quotes" id={quote.id} currentStatus={quote.status} />
      </div>
    </details>
  );
}

function OrderRow({ order }: { order: Order }) {
  const status = STATUS_MAP[order.status] ?? STATUS_MAP.new;
  return (
    <details className="bg-background rounded-xl border border-border group">
      <summary className="flex items-start justify-between p-5 cursor-pointer list-none">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-foreground truncate">{order.nom} — {order.zone}</p>
            <Badge variant={status.variant} className="shrink-0 text-xs">{status.label}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {order.items?.length ?? 0} article{(order.items?.length ?? 0) !== 1 ? "s" : ""} · {order.total ?? 0} DH · {formatDate(order.created_at)}
          </p>
        </div>
        <svg className="w-4 h-4 text-muted-foreground ml-4 shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="px-5 pb-5 border-t border-border pt-4 space-y-3 text-sm">
        <div className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
          <p><span className="font-medium text-foreground">Téléphone : </span>{order.telephone}</p>
          <p><span className="font-medium text-foreground">Adresse : </span>{order.adresse}</p>
          {order.creneau && <p><span className="font-medium text-foreground">Créneau : </span>{order.creneau}</p>}
          {order.notes && <p className="sm:col-span-2"><span className="font-medium text-foreground">Notes : </span>{order.notes}</p>}
        </div>
        {order.items && (
          <table className="w-full text-xs border border-border rounded-lg overflow-hidden">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-2">Produit</th>
                <th className="text-center p-2">Qté</th>
                <th className="text-right p-2">Sous-total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">{item.qty}</td>
                  <td className="p-2 text-right">{item.price * item.qty} DH</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <StatusUpdater table="orders" id={order.id} currentStatus={order.status} />
      </div>
    </details>
  );
}

function ContactRow({ contact }: { contact: Contact }) {
  const status = STATUS_MAP[contact.status] ?? STATUS_MAP.new;
  return (
    <details className="bg-background rounded-xl border border-border group">
      <summary className="flex items-start justify-between p-5 cursor-pointer list-none">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-foreground truncate">{contact.nom} — {contact.sujet ?? "Sans sujet"}</p>
            <Badge variant={status.variant} className="shrink-0 text-xs">{status.label}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{contact.email} · {formatDate(contact.created_at)}</p>
        </div>
        <svg className="w-4 h-4 text-muted-foreground ml-4 shrink-0 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="px-5 pb-5 border-t border-border pt-4 space-y-3 text-sm">
        <div className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
          {contact.telephone && <p><span className="font-medium text-foreground">Téléphone : </span>{contact.telephone}</p>}
          {contact.message && <p className="sm:col-span-2 whitespace-pre-wrap"><span className="font-medium text-foreground">Message : </span>{contact.message}</p>}
        </div>
        <StatusUpdater table="contacts" id={contact.id} currentStatus={contact.status} />
      </div>
    </details>
  );
}

export default async function MessagesPage() {
  const supabase = await createClient();

  const [quotesRes, ordersRes, contactsRes] = await Promise.all([
    supabase.from("quotes").select("*").order("created_at", { ascending: false }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("contacts").select("*").order("created_at", { ascending: false }),
  ]);

  const quotes = (quotesRes.data ?? []) as Quote[];
  const orders = (ordersRes.data ?? []) as Order[];
  const contacts = (contactsRes.data ?? []) as Contact[];

  const newQuotes = quotes.filter((q) => q.status === "new").length;
  const newOrders = orders.filter((o) => o.status === "new").length;
  const newContacts = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Messages</h1>
      <p className="text-muted-foreground mb-8">Demandes de devis, commandes et messages de contact.</p>

      <Tabs defaultValue="quotes">
        <div className="overflow-x-auto pb-1">
        <TabsList>
          <TabsTrigger value="quotes" className="gap-1.5">
            Devis {newQuotes > 0 && <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{newQuotes}</span>}
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-1.5">
            Commandes {newOrders > 0 && <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{newOrders}</span>}
          </TabsTrigger>
          <TabsTrigger value="contacts" className="gap-1.5">
            Contact {newContacts > 0 && <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{newContacts}</span>}
          </TabsTrigger>
        </TabsList>
        </div>

        <TabsContent value="quotes" className="mt-6">
          {quotes.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Aucune demande de devis.</p>
          ) : (
            <div className="space-y-3">
              {quotes.map((q) => <QuoteRow key={q.id} quote={q} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Aucune commande.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => <OrderRow key={o.id} order={o} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          {contacts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Aucun message de contact.</p>
          ) : (
            <div className="space-y-3">
              {contacts.map((c) => <ContactRow key={c.id} contact={c} />)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
