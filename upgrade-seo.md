# Claude Code — OSZ Food Distribution : Optimisation contenu & SEO (pages existantes uniquement)

## Périmètre strict

Tu travailles sur **osz-foodistribution.ma**, site Next.js App Router.

**Pages concernées — exactement 4, pas une de plus :**
| Page | URL actuelle | Changement d'URL |
|------|-------------|-----------------|
| Homepage | `/` | Aucun |
| Professionnels | `/professionnels` | Aucun |
| Particuliers | `/particuliers` | Aucun |
| Catalogue | `/particuliers/catalogue` | Renommer en `/particuliers/commander` |

**Pas de création de nouvelles pages. Pas de nouvelles routes. Pas de blog. Pas de sous-pages produits.**
Uniquement : métadonnées, contenu textuel, H1/H2/H3, renommage du catalogue, et navigation.

---

## Contexte SEO — ce que la recherche a établi

**Réalité du marché marocain :** Les requêtes exactes "livraison viande domicile marrakech" et "fournisseur viande restaurant marrakech" ont un volume quasi nul dans les outils SEO. C'est un marché digital vierge — l'avantage first mover est réel.

**Analyse SERP réelle (Google.ma, fr) :**
- Sur "livraison viande domicile marrakech" : concurrents locaux positionnés = `marrakechviandebio.com`, `daraljizara.com`, `amanfresh.ma` — tous avec des sites faibles, peu de contenu structuré.
- Sur "fournisseur viande restaurant marrakech" : seul `kechmar.ma` (grossiste généraliste) est bien positionné localement. Aucun concurrent spécialisé viande n'occupe ce terrain.
- Les **related searches Google** révèlent les vraies intentions : "meilleure boucherie marrakech", "grossiste marrakech", "viande fraîche marrakech", "viande maturée maroc".

**2 mots-clés cibles principaux :**
- B2C : `livraison viande domicile marrakech`
- B2B : `fournisseur viande restaurant marrakech`

**Mots-clés secondaires à intégrer naturellement dans le contenu :**
- `viande fraîche marrakech`
- `livraison viande marrakech`
- `viande boeuf marrakech`
- `agneau frais marrakech`
- `grossiste viande marrakech`
- `fournisseur viande hôtel marrakech`
- `distribution viande marrakech`
- `viande qualité professionnelle marrakech`

---

## Règles d'écriture — s'appliquent à tout le contenu

- **Langue :** français uniquement. Aucun anglais non justifié.
- **Ton :** professionnel, ancré localement à Marrakech, chaleureux — pas corporate.
- **Intégration des mots-clés :** fluide et naturelle. Jamais de répétition mécanique.
- **Géolocalisation :** mentionner les quartiers (Guéliz, Hivernage, Palmeraie, Médina, Targa) quand c'est pertinent — pas de façon forcée.
- **Longueur :** chaque section doit être plus dense qu'actuellement. Le contenu trop court est pénalisé.
- **CTAs :** chaque section principale doit mener vers une action concrète (WhatsApp, devis, commander).
- **Ne pas inventer de faits :** si un prix ou une info n'est pas confirmée, utiliser "prix sur demande" ou "nous contacter".
- **Contenu final uniquement :** aucun placeholder, aucun "à compléter". Tout doit être publiable tel quel.

---

## 1. Renommage de la page Catalogue

### Changements à effectuer

**URL :** `/particuliers/catalogue` → `/particuliers/commander`

**Label dans la navigation :** "Catalogue" → "Commander"

**Breadcrumb :** "Catalogue" → "Commander"

**Redirect 301 obligatoire :**
```js
// next.config.js — ajouter dans redirects()
{
  source: '/particuliers/catalogue',
  destination: '/particuliers/commander',
  permanent: true,
}
```

**Raison SEO :** "Commander" signale une intention transactionnelle à Google et est plus cohérent avec le parcours utilisateur réel (commande via WhatsApp). "Catalogue" implique un e-commerce fonctionnel qui n'existe pas encore.

---

## 2. Homepage (`/`)

### 2a. Métadonnées

```ts
export const metadata: Metadata = {
  title: 'OSZ Food Distribution — Livraison viande fraîche à Marrakech',
  description: 'Spécialiste de la distribution de viande bovine et agneau à Marrakech depuis plus de 15 ans. Livraison à domicile pour les particuliers et approvisionnement professionnel pour restaurants, hôtels et riads. Qualité garantie, chaîne du froid maîtrisée.',
  openGraph: {
    title: 'OSZ Food Distribution — Livraison viande fraîche à Marrakech',
    description: 'Distribution de viande bovine et agneau à Marrakech. Livraison domicile et approvisionnement pour restaurants et hôtels.',
    url: 'https://www.osz-foodistribution.ma',
    siteName: 'OSZ Food Distribution',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.osz-foodistribution.ma',
  },
}
```

### 2b. Hero section

**Texte actuel à remplacer :**
> "Distribution alimentaire d'excellence / Votre partenaire de confiance / Spécialiste de la distribution de viandes et produits alimentaires..."

**Nouveau contenu :**
```
Overline : Distribution de viande fraîche à Marrakech

H1 : Votre distributeur de viande bovine et agneau à Marrakech

Sous-titre : Qualité professionnelle, livrée chez vous ou dans votre établissement.
OSZ Food Distribution sert les particuliers et les professionnels de Marrakech depuis plus de 15 ans.

CTA1 : Je commande à domicile → /particuliers
CTA2 : Je suis professionnel → /professionnels
```

### 2c. Section "Notre expertise"

**H2 actuel :** "L'excellence au service de votre activité"

**Nouveau H2 :** "La distribution de viande fraîche de référence à Marrakech"

**Corps de section — remplacer le contenu actuel par :**
```
OSZ Food Distribution est née de la conviction que la qualité de la viande ne devrait pas
être réservée aux seuls grands restaurants. Depuis plus de 15 ans, nous bâtissons des
relations durables avec des éleveurs et producteurs sélectionnés pour proposer à Marrakech
une viande bovine et un agneau d'une fraîcheur irréprochable.

Notre réseau de fournisseurs locaux et notre maîtrise rigoureuse de la chaîne du froid
nous permettent de garantir la même qualité — qu'il s'agisse d'une commande à domicile
pour une famille de Guéliz ou d'un approvisionnement hebdomadaire pour un hôtel de la Palmeraie.
```

**Cards expertise — remplacer les titres et descriptions :**
```
1. Sélection rigoureuse
   Des partenariats directs avec des éleveurs pour une viande bovine et un agneau
   traçables de l'origine à la livraison.

2. Chaîne du froid maîtrisée
   Stockage et transport réfrigérés à chaque étape. Votre viande arrive fraîche,
   quelle que soit la distance.

3. Réseau local Marrakech
   Présents à Marrakech depuis plus de 15 ans, nous connaissons les exigences
   du marché local et de ses professionnels.

4. Livraison fiable
   Planning de livraison respecté, réactivité en cas de besoin urgent.
   Nos clients professionnels comptent sur nous 7j/7.

5. Satisfaction client
   500+ clients professionnels fidèles. Votre satisfaction est notre engagement quotidien.
```

### 2d. Section "Qualité & Conformité"

**H2 actuel :** "La sécurité alimentaire, notre engagement"

**Conserver le H2** — il est déjà bon.

**Corps — remplacer par :**
```
Chaque produit distribué par OSZ Food Distribution répond aux standards sanitaires
en vigueur au Maroc. Normes HACCP appliquées à chaque étape de notre chaîne,
traçabilité complète de l'origine à la livraison, contrôle qualité systématique
à la réception et au départ.

Pour nos clients professionnels (restaurants, hôtels, riads), nous fournissons
sur demande toute la documentation sanitaire requise par les autorités compétentes.
```

### 2e. Section "Pour les professionnels"

**H2 actuel :** "Un service dédié à votre établissement"

**Nouveau H2 :** "Fournisseur de viande pour restaurants et hôtels à Marrakech"

**Corps — remplacer par :**
```
Votre restaurant, hôtel ou riad à Marrakech a besoin d'un fournisseur de viande
capable de tenir une qualité constante semaine après semaine. OSZ Food Distribution
répond à cette exigence depuis 15 ans, avec des livraisons planifiées, une découpe
sur spécification, et un interlocuteur dédié pour vos commandes.

Bœuf et agneau en volume, frais ou surgelé selon vos besoins, livrés aux horaires
qui s'adaptent à votre brigade.
```

**Bullet points — remplacer par :**
```
• Approvisionnement régulier en bœuf et agneau
• Découpe sur spécification (grammage, type de découpe)
• Traçabilité HACCP complète
• Réactivité sur commandes urgentes
```

**Stats — conserver mais reformuler :**
```
500+ clients professionnels à Marrakech
15+ années d'expérience en distribution viande
```

### 2f. Section "Pour les particuliers"

**H2 actuel :** "Des produits d'exception chez vous"

**Nouveau H2 :** "Livraison de viande fraîche à domicile — Marrakech"

**Corps — remplacer par :**
```
Commandez votre viande bovine ou votre agneau frais et recevez-le directement
à votre domicile à Marrakech. La même qualité que celle servie dans les restaurants
et hôtels de la ville, accessible aux particuliers via une simple commande WhatsApp.

Guéliz, Hivernage, Palmeraie, Médina, Targa — nous livrons dans toute la ville
dans un emballage isotherme qui respecte la chaîne du froid jusqu'à votre cuisine.
```

**Bullet points — remplacer par :**
```
• Viande bovine et agneau de qualité professionnelle
• Commande rapide via WhatsApp
• Emballage réfrigéré, livraison à domicile
• Délai maximum 48h sur Marrakech
```

**Stats :**
```
100% qualité garantie
48h délai de livraison maximum
```

### 2g. Section témoignages

**Remplacer les noms génériques par des témoignages plus crédibles et contextualisés :**
```
"OSZ est notre fournisseur de viande depuis 5 ans. La qualité du bœuf et de l'agneau
est constante, les livraisons toujours à l'heure. C'est exactement ce dont une cuisine
professionnelle a besoin."
— Chef de cuisine, Restaurant, Marrakech

"Fiabilité, qualité et réactivité. Trois mots qui résument notre collaboration avec OSZ.
Depuis 8 ans, ils approvisionnent notre établissement sans jamais nous faire défaut."
— Directeur F&B, Hôtel, Palmeraie Marrakech

"Je commande ma viande chez OSZ depuis que je les connais. La fraîcheur est irréprochable
et le service WhatsApp est très pratique. Je recommande à tous mes voisins de Guéliz."
— Particulier, Guéliz
```

### 2h. Section footer

**Description footer actuelle :** "Spécialiste de la distribution de viandes et produits alimentaires depuis plus de 15 ans."

**Nouvelle description :**
```
Distributeur de viande bovine et agneau frais à Marrakech depuis plus de 15 ans.
Livraison à domicile pour les particuliers. Approvisionnement professionnel pour
restaurants, hôtels et riads.
```

---

## 3. Page Professionnels (`/professionnels`)

### 3a. Métadonnées

```ts
export const metadata: Metadata = {
  title: 'Fournisseur viande restaurant Marrakech — Hôtels & Restauration | OSZ',
  description: 'OSZ Food Distribution : fournisseur de viande bovine et agneau pour restaurants, hôtels et riads à Marrakech. Livraisons régulières, qualité HACCP, 500+ clients professionnels. Demandez votre devis personnalisé.',
  openGraph: {
    title: 'Fournisseur viande restaurant & hôtel Marrakech | OSZ Food Distribution',
    description: 'Approvisionnement professionnel en viande bovine et agneau à Marrakech. Qualité HACCP, livraisons planifiées, interlocuteur dédié.',
    url: 'https://www.osz-foodistribution.ma/professionnels',
    siteName: 'OSZ Food Distribution',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.osz-foodistribution.ma/professionnels',
  },
}
```

### 3b. Hero section

**Texte actuel :** "Le partenaire des professionnels / Approvisionnez votre établissement..."

**Nouveau contenu :**
```
Overline : Approvisionnement professionnel — Marrakech

H1 : Fournisseur de viande pour restaurants, hôtels et riads à Marrakech

Sous-titre : Bœuf et agneau frais ou surgelé, livrés régulièrement dans votre établissement.
Qualité constante, traçabilité HACCP, interlocuteur dédié. Plus de 500 professionnels
nous font confiance à Marrakech.

CTA : Demander un devis → mailto:commande@osz-foodistribution.ma?subject=Demande%20de%20devis%20professionnel
```

### 3c. Section "Nos Services"

**H2 actuel :** "Une offre complète pour les professionnels"

**Conserver le H2.**

**Cards services — réécrire les titres et descriptions :**
```
1. Approvisionnement viande
   Bœuf et agneau frais ou surgelé, en volume adapté à votre activité.
   Disponibilité régulière, pas de ruptures.

2. Découpe sur spécification
   Vos pièces préparées selon vos standards : grammage précis, type de découpe,
   conditionnement adapté à votre brigade.

3. Livraisons planifiées
   1, 2 ou 3 passages hebdomadaires selon vos besoins. Horaires adaptés
   à vos ouvertures de cuisine.

4. Solutions urgentes
   Besoin de dernière minute ? Notre équipe répond sur WhatsApp 7j/7
   et peut organiser une livraison sous 24h.

5. Documentation sanitaire
   Certificats d'origine, fiches techniques, traçabilité complète disponibles
   sur demande pour vos audits et contrôles.

6. Compte professionnel dédié
   Un interlocuteur unique pour vos commandes, vos réclamations
   et vos ajustements de volume.
```

### 3d. Section "Pourquoi choisir OSZ"

**H2 actuel :** "Pourquoi choisir OSZ Food Distribution"

**Nouveau H2 :** "Pourquoi les professionnels de Marrakech choisissent OSZ"

**Cards — réécrire :**
```
1. Spécialiste viande
   Contrairement aux grossistes généralistes, OSZ se concentre exclusivement
   sur la viande bovine et l'agneau. Une expertise pointue qui se ressent
   dans la qualité lot après lot.

2. Prix compétitifs
   Tarification professionnelle dégressive selon les volumes.
   Devis personnalisé après évaluation de vos besoins.

3. Chaîne du froid irréprochable
   Transport réfrigéré de notre entrepôt à votre cuisine.
   Températures contrôlées à chaque étape.

4. Traçabilité complète
   Origine, abattoir, date de traitement — chaque lot est documenté.
   Conformité aux exigences de l'ONSSA.

5. Normes HACCP
   Application rigoureuse du système HACCP. Procédures de contrôle
   qualité régulières et documentées.

6. 15 ans d'expertise locale
   Présents à Marrakech depuis 15 ans, nous connaissons les spécificités
   de la restauration et de l'hôtellerie locales.

7. Réactivité
   Votre activité ne peut pas attendre. Nous répondons aux demandes urgentes
   et nous adaptons à vos pics d'activité saisonniers.

8. Partenariat long terme
   Nous construisons des relations durables avec nos clients professionnels.
   98% de fidélité sur nos comptes actifs.
```

### 3e. Section "Logistique & Livraison"

**H2 actuel :** "Une logistique de précision"

**Nouveau H2 :** "Livraisons de viande sur Marrakech et environs"

**Corps — ajouter avant les cards :**
```
Notre logistique de distribution est calibrée pour les exigences de la restauration
professionnelle : régularité, ponctualité, respect absolu de la chaîne du froid.
Nous couvrons Marrakech centre, Guéliz, l'Hivernage, la Palmeraie, Targa
et les zones périphériques sur demande.
```

### 3f. Section "Qualité & Conformité"

**H2 :** Conserver "L'excellence au service de votre exigence"

**Corps — ajouter :**
```
La sécurité alimentaire de vos clients commence chez votre fournisseur.
Chaque lot de viande bovine et d'agneau distribué par OSZ Food Distribution
est traçable de son origine jusqu'à votre réception. Nos processus HACCP
sont documentés et disponibles sur demande pour vos audits internes
ou les contrôles des autorités sanitaires marocaines.
```

### 3g. Section clients

**Titre actuel :** "Ils nous font confiance au quotidien"

**Remplacer la liste des types de clients :**
```
Restaurants gastronomiques et bistrots
Hôtels 4 et 5 étoiles
Riads & maisons d'hôtes
Traiteurs événementiels
Services de livraison de repas
Collectivités (entreprises, cantines)
```

### 3h. Section témoignages

**Remplacer par des témoignages géolocalisés et contextualisés :**
```
"La constance de la qualité du bœuf et de l'agneau OSZ est ce qui fait la différence
au quotidien. En 5 ans de collaboration, jamais de mauvaise surprise à la réception."
— Chef de cuisine, Restaurant gastronomique, Marrakech

"OSZ comprend les contraintes d'un hôtel : livraisons ponctuelles, documentation
sanitaire en ordre, et réactivité quand on a besoin d'un supplément de dernière minute.
C'est un partenariat qui fonctionne depuis 8 ans."
— Directeur F&B, Hôtel, Palmeraie

"La capacité d'OSZ à gérer nos volumes en haute saison est un vrai atout.
Quand Marrakech se remplit, notre approvisionnement en viande n'est jamais une source
de stress."
— Responsable achat, Riad, Médina
```

### 3i. Section CTA finale

**Texte actuel :** "Prêt à collaborer ?"

**Nouveau contenu :**
```
H2 : Vous approvisionnez en viande à Marrakech ?

Corps :
Contactez notre équipe pour discuter de vos besoins en viande bovine et agneau.
Nous établissons un devis personnalisé selon vos volumes, votre fréquence de livraison
et vos spécifications de découpe.

CTA1 : Demander un devis → mailto:commande@osz-foodistribution.ma?subject=Demande%20devis%20professionnel
CTA2 : Nous écrire sur WhatsApp → https://wa.me/212670594545
```

---

## 4. Page Particuliers (`/particuliers`)

### 4a. Métadonnées

```ts
export const metadata: Metadata = {
  title: 'Livraison viande domicile Marrakech — Bœuf & Agneau frais | OSZ',
  description: 'Commandez votre viande bovine et agneau frais en ligne. Livraison à domicile à Marrakech : Guéliz, Hivernage, Palmeraie, Targa, Route de l\'Ourika. Commande simple via WhatsApp, délai 48h max. OSZ Food Distribution.',
  openGraph: {
    title: 'Livraison viande à domicile Marrakech | OSZ Food Distribution',
    description: 'Bœuf et agneau frais livrés chez vous à Marrakech. Qualité professionnelle accessible aux particuliers. Commande via WhatsApp.',
    url: 'https://www.osz-foodistribution.ma/particuliers',
    siteName: 'OSZ Food Distribution',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.osz-foodistribution.ma/particuliers',
  },
}
```

### 4b. Hero section

**Texte actuel :** "La qualité pro livrée chez vous / Viandes premium, légumes frais et charcuterie artisanale..."

**Nouveau contenu :**
```
Overline : Livraison viande domicile — Marrakech

H1 : Viande fraîche livrée à domicile à Marrakech

Sous-titre : Bœuf et agneau de qualité professionnelle, livrés directement chez vous
où que vous soyez à Marrakech. Commande rapide via WhatsApp, livraison réfrigérée sous 48h.

CTA1 : Commander maintenant → https://wa.me/212670594545
CTA2 : Voir nos produits → /particuliers/commander
```

### 4c. Section "Nos Produits"

**H2 actuel :** "Des produits d'exception à portée de clic"

**Nouveau H2 :** "Viande bovine et agneau frais — Livraison à domicile"

**Corps introductif — ajouter avant les cards :**
```
Notre sélection est centrée sur deux familles de produits : la viande de bœuf
et l'agneau frais. Des pièces sélectionnées chez des éleveurs partenaires,
découpées sur commande pour garantir la fraîcheur maximale à la livraison.
```

**Card Viandes — réécrire :**
```
Titre : Viande de bœuf & agneau

Corps :
Entrecôte, filet, côte à l'os, gigot, épaule — notre sélection de viande bovine
et d'agneau frais, découpée selon vos préférences.

Liste :
• Entrecôte de bœuf — 189 MAD/kg
• Gigot d'agneau entier
• Épaule d'agneau
• Agneau entier (mechoui) — prix sur demande
• Autres découpes sur commande

CTA : Commander via WhatsApp
```

**Card Légumes — conserver mais reformuler :**
```
Titre : Légumes frais de saison

Corps :
Une sélection de légumes frais pour compléter vos commandes de viande.
Produits du marché, choisis pour leur fraîcheur et leur qualité.

Liste :
• Légumes de saison
• Herbes fraîches
• Légumes racines
• Crudités

CTA : Nous demander la disponibilité
```

**Card Charcuterie — conserver telle quelle** (déjà correcte)

### 4d. Section "Vos Avantages"

**H2 actuel :** "Pourquoi commander chez OSZ"

**Conserver le H2.**

**Cards — réécrire :**
```
1. Qualité identique aux restaurants
   Le même bœuf et le même agneau servis dans les restaurants et hôtels
   de Marrakech, maintenant accessible aux particuliers.

2. Fraîcheur garantie
   Découpe à la commande, emballage isotherme, livraison réfrigérée.
   Votre viande arrive dans les mêmes conditions que si vous la achetiez
   directement chez le boucher.

3. Commande simple sur WhatsApp
   Envoyez votre commande au 06 70 59 45 45. Confirmation sous 2h,
   livraison dans les 48h.

4. Livraison sur tout Marrakech
   Guéliz, Hivernage, Palmeraie, Médina, Targa, Route de l'Ourika —
   nous livrons partout à Marrakech et ses environs.

5. Paiement à la livraison
   Pas de prépaiement en ligne. Vous payez à la réception de votre commande.
```

### 4e. Section "Livraison & Service"

**H2 actuel :** "Livré chez vous à Marrakech"

**Conserver le H2.**

**Corps — réécrire :**
```
Nous livrons votre viande fraîche directement à votre domicile à Marrakech,
dans un emballage réfrigéré isotherme qui maintient la chaîne du froid
de notre entrepôt jusqu'à votre cuisine. Délai maximum : 48h après confirmation
de votre commande. Livraison offerte à partir de 250 MAD d'achat.
```

### 4f. Section "Comment ça marche"

**H2 :** Conserver "Commander en 3 étapes"

**Réécrire chaque étape :**
```
Étape 1 — Choisissez votre viande
Parcourez notre sélection de bœuf et d'agneau frais. Précisez la découpe
et la quantité souhaitée. Nos prix sont affichés dans notre catalogue,
ou demandez-nous un devis sur WhatsApp pour des découpes spécifiques.

Étape 2 — Envoyez votre commande sur WhatsApp
Écrivez-nous au 06 70 59 45 45. Notre équipe vous confirme la disponibilité,
le prix final et le créneau de livraison dans les 2 heures ouvrées.
Paiement à la livraison — pas de carte bancaire requise.

Étape 3 — Réceptionnez votre viande fraîche
Votre commande est livrée dans un emballage isotherme réfrigéré.
Livraison disponible 7 jours sur 7, de 8h à 20h, sur tout Marrakech.
Délai : 48h maximum après confirmation.
```

### 4g. Section "Sélection du moment"

**Conserver les 4 produits vedettes avec les prix existants.**

**Reformuler les labels :**
```
Entrecôte de bœuf fraîche — 189 MAD/kg  [tag: Populaire]
Filet d'agneau — 249 MAD/kg             [tag: Premium]
Poulet fermier entier — 69 MAD/kg       [tag: Nouveau]
Assortiment charcuterie — 149 MAD       [tag: Offre spéciale]
```

### 4h. Section témoignages

**Remplacer par des témoignages localisés :**
```
"La viande arrive toujours fraîche et bien emballée. Je commande toutes les semaines
pour ma famille à Guéliz — c'est devenu un réflexe."
— Fatima Z., Guéliz

"Enfin une vraie qualité de bœuf accessible sans aller au marché. Le gigot d'agneau
pour notre déjeuner du vendredi était exceptionnel."
— Youssef B., Hivernage

"Simple, rapide, frais. La commande WhatsApp fonctionne parfaitement
et la livraison est toujours dans les délais. Je recommande."
— Sarah M., Palmeraie
```

### 4i. Section "Présence locale"

**H2 actuel :** "Votre partenaire à Marrakech"

**Nouveau H2 :** "Livraison viande dans tout Marrakech"

**Corps — remplacer :**
```
Implantés à Marrakech depuis plus de 15 ans, nous connaissons la ville
et ses quartiers. Notre zone de livraison couvre Marrakech centre, Guéliz,
l'Hivernage, la Palmeraie, Targa et la Route de l'Ourika.

Vous n'êtes pas sûr d'être dans notre zone ? Contactez-nous sur WhatsApp —
nous vous confirmons la faisabilité en moins de 2 heures.
```

---

## 5. Page Commander (`/particuliers/commander`, ex-Catalogue)

### 5a. Métadonnées

```ts
export const metadata: Metadata = {
  title: 'Commander viande en ligne — Bœuf & Agneau Marrakech | OSZ Food Distribution',
  description: 'Commandez votre viande bovine et agneau frais en ligne. Livraison à domicile à Marrakech en 48h. Filtrez par catégorie, type et prix. Paiement à la livraison. OSZ Food Distribution.',
  openGraph: {
    title: 'Commander viande fraîche à Marrakech | OSZ Food Distribution',
    description: 'Sélectionnez vos viandes et passez commande. Livraison domicile Marrakech sous 48h.',
    url: 'https://www.osz-foodistribution.ma/particuliers/commander',
    siteName: 'OSZ Food Distribution',
    locale: 'fr_MA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.osz-foodistribution.ma/particuliers/commander',
  },
}
```

### 5b. H1 et introduction

**H1 actuel :** "Nos Produits"

**Nouveau H1 :** "Commander votre viande fraîche à Marrakech"

**Sous-titre — ajouter sous le H1 :**
```
Sélectionnez vos produits et passez commande via WhatsApp.
Livraison réfrigérée à domicile sur tout Marrakech — délai 48h maximum.
```

### 5c. État vide du catalogue (aucun produit affiché)

Le catalogue est actuellement vide. Afficher un message clair au lieu d'une page blanche :

```tsx
// Composant EmptyState à afficher quand aucun produit n'est chargé
<div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
  <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
    Notre catalogue est en cours de mise à jour.
  </p>
  <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
    Pour passer commande dès maintenant, contactez-nous directement sur WhatsApp.
    Nous vous envoyons notre liste de produits disponibles du jour avec les prix.
  </p>
  <a href="https://wa.me/212670594545?text=Bonjour%2C%20je%20voudrais%20commander%20de%20la%20viande%20fra%C3%AEche%20%C3%A0%20Marrakech."
     style={{ display: 'inline-block', padding: '12px 24px', background: '#25D366', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>
    Commander sur WhatsApp
  </a>
</div>
```

**Le lien WhatsApp doit contenir un message pré-rempli :**
```
https://wa.me/212670594545?text=Bonjour%2C%20je%20voudrais%20commander%20de%20la%20viande%20fra%C3%AEche%20%C3%A0%20Marrakech.
```

---

## 6. Navigation — mise à jour globale

**Mettre à jour dans tous les composants de navigation (header, footer, breadcrumbs) :**

```
"Catalogue" → "Commander"
Lien : /particuliers/catalogue → /particuliers/commander
```

**Vérifier que le changement est appliqué dans :**
- Header principal (desktop et mobile)
- Footer — section "Accès rapide"
- Footer de la page `/particuliers`
- Breadcrumb de la page `/particuliers/commander`
- Tout lien interne qui pointait vers `/particuliers/catalogue`

---

## 7. Données structurées JSON-LD — pages principales

### Homepage

```tsx
// Dans app/page.tsx
export function HomepageSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'OSZ Food Distribution',
      description: 'Distributeur de viande bovine et agneau frais à Marrakech. Livraison à domicile et approvisionnement professionnel pour restaurants, hôtels et riads.',
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
      sameAs: ['https://wa.me/212670594545'],
      areaServed: ['Marrakech', 'Guéliz', 'Hivernage', 'Palmeraie', 'Targa'],
    })}} />
  )
}
```

### Page Professionnels

```tsx
export function ProfessionnelsSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Approvisionnement viande professionnel — OSZ Food Distribution',
      description: 'Service de distribution de viande bovine et agneau pour restaurants, hôtels, riads et traiteurs à Marrakech.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'OSZ Food Distribution',
        url: 'https://www.osz-foodistribution.ma',
      },
      areaServed: 'Marrakech',
      serviceType: 'Distribution alimentaire professionnelle',
    })}} />
  )
}
```

### Page Particuliers

```tsx
export function ParticuliersSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Livraison viande domicile Marrakech — OSZ Food Distribution',
      description: 'Livraison de viande bovine et agneau frais à domicile à Marrakech pour les particuliers.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'OSZ Food Distribution',
        url: 'https://www.osz-foodistribution.ma',
      },
      areaServed: ['Marrakech', 'Guéliz', 'Hivernage', 'Palmeraie', 'Targa'],
      serviceType: 'Livraison alimentaire à domicile',
    })}} />
  )
}
```

---

## 8. Sitemap — mettre à jour l'URL du catalogue

```ts
// app/sitemap.ts
export default function sitemap() {
  const base = 'https://www.osz-foodistribution.ma'
  const now = new Date()
  return [
    { url: base,                                  lastModified: now, changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${base}/particuliers`,                lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.9 },
    { url: `${base}/particuliers/commander`,      lastModified: now, changeFrequency: 'weekly'  as const, priority: 0.9 },
    { url: `${base}/professionnels`,              lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
  ]
}
```

---

## Ordre d'exécution

1. **Renommage** : URL + redirect 301 + navigation (touche tout le site, faire en premier)
2. **Métadonnées** : 4 pages (rapide, impact immédiat sur Google)
3. **JSON-LD** : 3 schemas (30 min)
4. **Contenu homepage** : sections dans l'ordre décrit ci-dessus
5. **Contenu `/professionnels`** : dans l'ordre décrit
6. **Contenu `/particuliers`** : dans l'ordre décrit
7. **Page `/particuliers/commander`** : H1, intro, état vide avec CTA WhatsApp
8. **Sitemap** : mise à jour finale
9. **Vérification** : tester toutes les URLs, vérifier le redirect 301, valider les métadonnées avec `next build`

---

## Contraintes absolues

- **Aucune nouvelle page, aucune nouvelle route.** Strictement les 4 pages existantes.
- **Aucun placeholder** — tout le contenu est final et publiable immédiatement.
- **Aucun anglais** dans le contenu visible.
- **Les prix existants sont conservés** (189 MAD, 249 MAD, 69 MAD, 149 MAD). Ne pas en inventer d'autres.
- **Le redirect 301** de `/particuliers/catalogue` vers `/particuliers/commander` est obligatoire.
- **Ne pas modifier le design**, les couleurs, les images ou les composants UI.
- **Tester** avec `npm run build` après chaque étape pour détecter les erreurs TypeScript.