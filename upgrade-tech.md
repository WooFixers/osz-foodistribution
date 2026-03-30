# Claude Code — OSZ Food Distribution : Améliorations techniques

## Contexte du projet

Tu travailles sur **osz-foodistribution.ma**, un site Next.js (App Router) de distribution alimentaire basé à Marrakech. Le site a deux espaces :
- **B2B** (`/professionnels`) : fournisseur pour restaurants, hôtels, traiteurs
- **B2C** (`/particuliers` + `/particuliers/catalogue`) : boutique en ligne pour particuliers

Le site est déployé en production. Toutes les modifications doivent être rétrocompatibles, non-breaking, et testées localement avant tout commit.

---

## Mission

Effectue les améliorations techniques suivantes, dans l'ordre de priorité indiqué. Pour chaque tâche, explique ce que tu as modifié et pourquoi.

---

## 1. Système de polices — Priorité maximale

### Objectif
Remplacer le système de polices actuel par une combinaison lisible, accessible et professionnelle, adaptée à un public francophone large (y compris les utilisateurs sur mobile à faible résolution).

### Combinaison cible
- **Display / Titres (h1, h2, h3)** : `Playfair Display` — serif élégante avec une excellente lisibilité pour les grands titres, connotation qualité/premium adaptée au secteur alimentaire.
- **Corps / Interface (body, nav, boutons, labels)** : `DM Sans` — sans-serif moderne, conçue spécifiquement pour la lisibilité à petite taille et sur écrans mobiles. Excellent support des caractères latins accentués (é, è, ê, à, ç, etc.).
- **Données / Prix / Chiffres** : `DM Mono` — pour les prix (189 MAD), métriques (500+ clients), et les éléments de données structurées.

### Implémentation
```js
// Dans app/layout.tsx (ou layout.js)
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})
```

Applique les variables CSS globalement dans `globals.css` :
```css
:root {
  --font-display: var(--font-playfair);
  --font-body: var(--font-dm-sans);
  --font-mono: var(--font-dm-mono);
}

body {
  font-family: var(--font-body), sans-serif;
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: var(--font-display), serif;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

/* Prix et métriques */
.metric, .price, [data-type="number"] {
  font-family: var(--font-mono), monospace;
}
```

### Exigences d'accessibilité à respecter
- Taille minimale de corps : **16px** (jamais en dessous sur mobile)
- Contraste minimum : **4.5:1** pour le texte courant, **3:1** pour les grands titres (WCAG AA)
- `line-height` minimum : **1.5** pour le corps, **1.25** pour les titres
- Ne jamais utiliser `font-weight: 300` sur du texte de moins de 18px
- Ajouter `font-display: swap` sur tous les chargements de polices pour éviter le FOIT

---

## 2. Performance — Core Web Vitals

### 2a. LCP (Largest Contentful Paint)
L'image hero (`/assets/hero-bg.jpg`, `/assets/pro-hero-bg.jpg`, `/assets/particuliers-hero-bg.jpg`) est probablement le LCP element. Vérifie et corrige :

```jsx
// Sur TOUTES les images hero
<Image
  src="/assets/hero-bg.jpg"
  alt="Distribution alimentaire premium à Marrakech"
  fill
  priority          // ← obligatoire sur le LCP element
  quality={85}
  sizes="100vw"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // générer avec plaiceholder ou sharp
/>
```

- Ajouter `priority` sur toutes les images above-the-fold
- Vérifier que `fetchpriority="high"` est généré dans le HTML final
- Si les images hero sont des JPG > 200 KB, les convertir en WebP/AVIF avec sharp

### 2b. CLS (Cumulative Layout Shift)
- Toutes les images `<Image>` doivent avoir `width` + `height` OU `fill` + un parent `position: relative` avec hauteur fixe
- Les fonts Google doivent utiliser `display: swap` (déjà inclus ci-dessus)
- Vérifier que le header/nav a une hauteur fixe définie en CSS pour éviter le saut au chargement

### 2c. Bundle size
```bash
# Analyser le bundle
ANALYZE=true next build
```
- Si `@next/bundle-analyzer` n'est pas installé, l'ajouter
- Identifier tout import qui charge une librairie entière (ex: `import _ from 'lodash'`) et le remplacer par des imports ciblés
- Vérifier que les composants "above the fold" ne chargent pas de JS inutile

---

## 3. SEO technique

### 3a. Métadonnées manquantes ou incorrectes
Chaque page doit avoir dans son `generateMetadata()` :

```ts
// Exemple pour /professionnels
export const metadata: Metadata = {
  title: 'Fournisseur alimentaire Marrakech — Restaurants & Hôtels | OSZ Food Distribution',
  description: 'Approvisionnement en viandes et produits alimentaires premium pour restaurants, hôtels et traiteurs à Marrakech. Livraisons fiables, traçabilité HACCP, 500+ clients pro.',
  openGraph: {
    title: 'OSZ Food Distribution — Fournisseur pro Marrakech',
    description: '...', // même description
    url: 'https://www.osz-foodistribution.ma/professionnels',
    siteName: 'OSZ Food Distribution',
    locale: 'fr_MA',
    type: 'website',
    images: [{
      url: '/assets/og-pro.jpg', // créer une image OG 1200×630
      width: 1200,
      height: 630,
      alt: 'OSZ Food Distribution — Fournisseur alimentaire Marrakech',
    }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://www.osz-foodistribution.ma/professionnels',
  },
}
```

### 3b. Structured Data (JSON-LD)
Ajouter le schema `LocalBusiness` sur la homepage et `FoodEstablishment` sur les pages produits :

```tsx
// components/SchemaOrg.tsx
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'OSZ Food Distribution',
    description: 'Distribution de viandes et produits alimentaires à Marrakech',
    url: 'https://www.osz-foodistribution.ma',
    telephone: '+212670594545',
    email: 'commande@osz-foodistribution.ma',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marrakech',
      addressCountry: 'MA',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
    priceRange: '$$',
    servesCuisine: 'Viandes et produits alimentaires',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 3c. Sitemap et robots.txt
Créer `app/sitemap.ts` si absent :
```ts
export default function sitemap() {
  return [
    { url: 'https://www.osz-foodistribution.ma', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://www.osz-foodistribution.ma/professionnels', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.osz-foodistribution.ma/particuliers', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://www.osz-foodistribution.ma/particuliers/catalogue', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]
}
```

Créer `public/robots.txt` si absent :
```
User-agent: *
Allow: /
Sitemap: https://www.osz-foodistribution.ma/sitemap.xml
```

---

## 4. Accessibilité (a11y)

### 4a. Navigation
- Le `<nav>` principal doit avoir `aria-label="Navigation principale"`
- Le lien actif dans la nav doit avoir `aria-current="page"`
- Le bouton mobile menu (hamburger) doit avoir `aria-expanded`, `aria-controls`, et un label visible ou `aria-label="Ouvrir le menu"`

### 4b. Images
- Toutes les images décoratives doivent avoir `alt=""`
- Les images hero doivent avoir un `alt` descriptif incluant le contexte géographique (ex: `"Distribution alimentaire premium à Marrakech"`)
- Le logo doit avoir `alt="OSZ Food Distribution — retour à l'accueil"`

### 4c. Couleurs et contraste
- Vérifier le contraste texte/fond sur tous les boutons CTA (le vert/foncé sur fond blanc doit passer WCAG AA)
- Le texte gris secondaire ne doit jamais être en dessous de `#767676` sur fond blanc
- Sur les sections à fond sombre (hero), vérifier que le texte blanc a un ratio ≥ 4.5:1

### 4d. Focus visible
```css
/* Ajouter dans globals.css si absent */
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
  border-radius: 3px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

### 4e. Liens et boutons
- Les liens "Mentions légales", "Politique de confidentialité", "CGV" dans le footer pointent vers `#`. Remplacer par de vraies pages ou par `href="/mentions-legales"` etc. (créer les pages correspondantes avec un contenu minimal si elles n'existent pas encore).
- Les boutons CTA sans `href` fonctionnel ("Demander un devis") doivent être soit des `<button>` avec un handler, soit des `<a>` avec `href="mailto:commande@osz-foodistribution.ma?subject=Demande de devis"` ou `href="https://wa.me/212670594545"`.

---

## 5. Corrections de bugs identifiés

### 5a. Incohérence du copyright
Le footer affiche `© 2025` sur la plupart des pages mais `© 2026` sur `/particuliers/catalogue`. Centraliser l'année dynamiquement :
```tsx
// components/Footer.tsx
<p>© {new Date().getFullYear()} OSZ Food Distribution. Tous droits réservés.</p>
```

### 5b. Liens morts dans le footer
Les ancres `#` pour les pages légales et les sections (`#services`, `#qualite`) doivent pointer vers des IDs réels. Vérifier que chaque section cible a bien un `id` correspondant dans son composant.

### 5c. Catalogue vide
La page `/particuliers/catalogue` affiche une interface de filtres mais aucun produit. Si les données produits n'existent pas encore en base, afficher au minimum un état vide explicite :
```tsx
// À la place d'un contenu vide
<div className="empty-state">
  <p>Notre catalogue est en cours de mise à jour.</p>
  <p>Contactez-nous directement pour passer commande :</p>
  <a href="https://wa.me/212670594545">Commander via WhatsApp</a>
</div>
```

---

## 6. Sécurité — Headers HTTP

Dans `next.config.js`, ajouter les headers de sécurité :

```js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## Ordre d'exécution recommandé

1. **Polices** (impact visuel immédiat, risque faible)
2. **Bugs** — copyright, liens morts, catalogue vide (quick wins)
3. **Accessibilité** — focus, aria, alt texts
4. **SEO** — metadata, sitemap, JSON-LD
5. **Performance** — images priority, bundle analysis
6. **Sécurité** — headers HTTP

---

## Contraintes à respecter

- Ne pas modifier le design ou les couleurs existantes (hors typographie)
- Ne pas toucher aux fichiers de contenu (textes, copy)
- Chaque changement doit être committé séparément avec un message clair
- Tester sur mobile (375px) et desktop (1440px) avant chaque commit
- Ne pas ajouter de dépendances non justifiées

---

## Livrables attendus

À la fin de chaque tâche, fournis :
1. Les fichiers modifiés avec le diff complet
2. Un résumé de ce qui a changé et pourquoi
3. Les commandes pour tester localement (`npm run dev`, `npm run build`, `npm run lint`)