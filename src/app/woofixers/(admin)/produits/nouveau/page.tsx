import ProductForm from "../ProductForm";

export default function NouveauProduitPage() {
  return (
    <div className="p-8">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Nouveau produit</h1>
      <p className="text-muted-foreground mb-8">Ajoutez un nouveau produit au catalogue.</p>
      <ProductForm />
    </div>
  );
}
