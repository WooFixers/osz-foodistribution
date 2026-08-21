export type ProductCategory = "viandes" | "legumes" | "charcuterie";
export type ProductType = "frais" | "surgele" | "prepare";
export type ProductFormat = "unite" | "kilo" | "paquet";
export type ProductBadge = "populaire" | "nouveau" | "offre";
export type SubmissionStatus = "new" | "read" | "replied";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  long_description: string | null;
  price: number;
  unit: string;
  category: ProductCategory;
  type: ProductType | null;
  format: ProductFormat | null;
  in_stock: boolean;
  badge: ProductBadge | null;
  images: string[];
  rating: number | null;
  origin: string | null;
  weight: string | null;
  storage_instructions: string | null;
  suggestions: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  nom: string | null;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
  zone: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  qty: number;
}

export interface Order {
  id: string;
  user_id: string | null;
  nom: string | null;
  telephone: string | null;
  adresse: string | null;
  zone: string | null;
  creneau: string | null;
  notes: string | null;
  items: OrderItem[];
  total: number | null;
  status: SubmissionStatus;
  created_at: string;
}

export interface Quote {
  id: string;
  nom: string | null;
  etablissement: string | null;
  type_client: string | null;
  telephone: string | null;
  email: string | null;
  produits: string | null;
  volume: string | null;
  message: string | null;
  status: SubmissionStatus;
  created_at: string;
}

export interface Contact {
  id: string;
  nom: string | null;
  email: string | null;
  telephone: string | null;
  sujet: string | null;
  message: string | null;
  status: SubmissionStatus;
  created_at: string;
}
