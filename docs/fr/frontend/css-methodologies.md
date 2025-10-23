# 🎨 Méthodologies CSS et Architecture

> **Les méthodologies CSS** sont des approches systématiques pour organiser, structurer et maintenir le code CSS. Elles aident à créer des stylesheets maintenables, évolutives et collaboratives.

## 📋 Table des matières
- [🚀 Introduction](#-introduction)
- [🏗️ BEM (Block Element Modifier)](#️-bem-block-element-modifier)
- [🎯 SMACSS](#-smacss)
- [🔧 OOCSS](#-oocss)
- [⚡ ITCSS](#-itcss)
- [🧩 Atomic CSS](#-atomic-css)
- [🎨 Utility-First vs Component-Based](#-utility-first-vs-component-based)
- [📝 Conventions de Nommage](#-conventions-de-nommage)
- [🏛️ Architecture CSS](#️-architecture-css)
- [🎯 Bonnes Pratiques](#-bonnes-pratiques)
- [📚 Ressources](#-ressources)

---

## 🚀 Introduction

### Pourquoi utiliser une méthodologie CSS ?

Les méthodologies CSS résolvent les problèmes courants :
- **Spécificité** : Conflits de styles et cascade complexe
- **Maintenabilité** : Code difficile à modifier et comprendre
- **Réutilisabilité** : Duplication de code et incohérence
- **Collaboration** : Conflits entre développeurs
- **Performance** : CSS non optimisé et volumineux

### Comparaison des Méthodologies

| Méthodologie | Complexité | Apprentissage | Performance | Équipe |
|--------------|------------|---------------|-------------|--------|
| **BEM** | Faible | Facile | Bonne | Toute taille |
| **SMACSS** | Moyenne | Moyen | Bonne | Moyenne/Grande |
| **OOCSS** | Moyenne | Moyen | Excellente | Expérimentée |
| **ITCSS** | Élevée | Difficile | Excellente | Grande |
| **Atomic CSS** | Faible | Facile | Excellente | Toute taille |

---

## 🏗️ BEM (Block Element Modifier)

### Qu'est-ce que BEM ?

**BEM** (Block Element Modifier) est une méthodologie de nommage CSS qui divise l'interface en blocs indépendants et réutilisables.

### Structure BEM

```css
/* Block */
.button { }

/* Element */
.button__icon { }
.button__text { }

/* Modifier */
.button--primary { }
.button--large { }
.button--disabled { }
```

### Règles de Nommage

```css
/* ✅ Bon : Nommage BEM correct */
.card { }
.card__header { }
.card__body { }
.card__footer { }
.card--featured { }
.card--featured__header { }

/* ❌ Éviter : Nommage incorrect */
.card { }
.cardHeader { }           /* Pas de double underscore */
.card-body { }            /* Pas de tiret */
.cardFeatured { }         /* Pas de double tiret */
```

### Exemple Pratique

```html
<!-- Structure HTML -->
<article class="card card--featured">
  <header class="card__header">
    <h2 class="card__title">Titre de l'article</h2>
    <span class="card__badge card__badge--new">Nouveau</span>
  </header>
  
  <div class="card__body">
    <p class="card__content">Contenu de l'article...</p>
  </div>
  
  <footer class="card__footer">
    <button class="button button--primary">
      <span class="button__icon">📖</span>
      <span class="button__text">Lire</span>
    </button>
  </footer>
</article>
```

```css
/* Styles BEM */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.card--featured {
  border: 2px solid #007bff;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card__title {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.card__badge {
  background: #28a745;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.card__badge--new {
  background: #ffc107;
  color: #212529;
}

.card__body {
  margin-bottom: 1rem;
}

.card__content {
  line-height: 1.6;
  margin: 0;
}

.card__footer {
  display: flex;
  justify-content: flex-end;
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button--primary {
  background: #007bff;
  color: white;
}

.button--primary:hover {
  background: #0056b3;
}

.button__icon {
  font-size: 1rem;
}

.button__text {
  font-weight: 500;
}
```

### Avantages et Inconvénients

#### ✅ Avantages
- **Clarté** : Structure claire et prévisible
- **Maintenabilité** : Facile à modifier et déboguer
- **Réutilisabilité** : Composants indépendants
- **Collaboration** : Convention partagée
- **Spécificité faible** : Évite les conflits

#### ❌ Inconvénients
- **Verbose** : Classes longues
- **Rigidité** : Structure stricte
- **Performance** : Plus de classes dans le HTML

---

## 🎯 SMACSS

### Qu'est-ce que SMACSS ?

**SMACSS** (Scalable and Modular Architecture for CSS) organise le CSS en 5 catégories principales.

### Structure SMACSS

```css
/* 1. Base - Styles de base */
body, h1, h2, p {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

/* 2. Layout - Structure principale */
.l-header, .l-main, .l-footer {
  width: 100%;
}

.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 3. Module - Composants réutilisables */
.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
}

.card-header {
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

/* 4. State - États des éléments */
.is-hidden {
  display: none;
}

.is-active {
  background: #007bff;
  color: white;
}

/* 5. Theme - Thèmes et variations */
.theme-dark {
  background: #333;
  color: white;
}

.theme-dark .card {
  background: #444;
  color: white;
}
```

### Organisation des Fichiers

```
styles/
├── base/
│   ├── _normalize.css
│   ├── _typography.css
│   └── _base.css
├── layout/
│   ├── _header.css
│   ├── _main.css
│   └── _footer.css
├── modules/
│   ├── _buttons.css
│   ├── _cards.css
│   └── _forms.css
├── state/
│   └── _states.css
├── theme/
│   └── _theme.css
└── main.css
```

### Exemple Complet

```html
<!-- Layout -->
<header class="l-header">
  <div class="l-container">
    <nav class="nav">
      <a href="#" class="nav__link is-active">Accueil</a>
      <a href="#" class="nav__link">Services</a>
    </nav>
  </div>
</header>

<main class="l-main">
  <div class="l-container">
    <article class="card">
      <header class="card-header">
        <h2>Titre de l'article</h2>
      </header>
      <div class="card-body">
        <p>Contenu de l'article...</p>
      </div>
    </article>
  </div>
</main>
```

```css
/* Layout */
.l-header {
  background: #333;
  color: white;
  padding: 1rem 0;
}

.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.l-main {
  padding: 2rem 0;
}

/* Modules */
.nav {
  display: flex;
  gap: 1rem;
}

.nav__link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav__link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.card-body {
  padding: 1rem;
}

/* States */
.is-active {
  background: #007bff;
}

.is-active:hover {
  background: #0056b3;
}
```

---

## 🔧 OOCSS

### Qu'est-ce que OOCSS ?

**OOCSS** (Object-Oriented CSS) sépare la structure du style et les contenus des conteneurs pour créer des objets CSS réutilisables.

### Principes OOCSS

#### 1. Séparer Structure et Peau

```css
/* Structure - Géométrie et positionnement */
.media {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.media__figure {
  flex-shrink: 0;
}

.media__body {
  flex: 1;
}

/* Peau - Apparence visuelle */
.media--bordered {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.media--shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

#### 2. Séparer Conteneur et Contenu

```css
/* Conteneur - Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Contenu - Styles spécifiques */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--primary {
  background: #007bff;
  color: white;
}

.btn--primary:hover {
  background: #0056b3;
}
```

### Exemple Pratique

```html
<!-- Objet Media réutilisable -->
<div class="media media--bordered media--shadow">
  <div class="media__figure">
    <img src="avatar.jpg" alt="Avatar" class="avatar">
  </div>
  <div class="media__body">
    <h3 class="title">Nom d'utilisateur</h3>
    <p class="text">Message de l'utilisateur...</p>
  </div>
</div>

<!-- Même objet, contexte différent -->
<div class="media media--compact">
  <div class="media__figure">
    <img src="product.jpg" alt="Produit" class="thumbnail">
  </div>
  <div class="media__body">
    <h4 class="title title--small">Nom du produit</h4>
    <p class="price">29.99€</p>
  </div>
</div>
```

```css
/* Objet Media - Structure */
.media {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.media__figure {
  flex-shrink: 0;
}

.media__body {
  flex: 1;
  min-width: 0; /* Empêche le débordement */
}

/* Variations de l'objet Media */
.media--bordered {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.media--shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.media--compact {
  gap: 0.5rem;
}

.media--compact .media__figure {
  width: 60px;
  height: 60px;
}

/* Objets de contenu réutilisables */
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.title {
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  line-height: 1.2;
}

.title--small {
  font-size: 0.875rem;
}

.text {
  margin: 0;
  line-height: 1.5;
  color: #666;
}

.price {
  margin: 0.5rem 0 0 0;
  font-weight: bold;
  color: #007bff;
}
```

---

## ⚡ ITCSS

### Qu'est-ce que ITCSS ?

**ITCSS** (Inverted Triangle CSS) organise le CSS en couches selon leur spécificité et leur portée, du plus général au plus spécifique.

### Structure ITCSS

```css
/* 1. Settings - Variables et configuration */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --font-family-base: 'Arial', sans-serif;
  --spacing-unit: 1rem;
}

/* 2. Tools - Mixins et fonctions */
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

/* 3. Generic - Reset et normalisation */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-family-base);
}

/* 4. Elements - Styles des éléments HTML */
h1, h2, h3 {
  margin-top: 0;
  margin-bottom: var(--spacing-unit);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

/* 5. Objects - Layout et structure */
.o-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-unit);
}

.o-grid {
  display: grid;
  gap: var(--spacing-unit);
}

/* 6. Components - Composants spécifiques */
.c-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.c-button--primary {
  background: var(--color-primary);
  color: white;
}

/* 7. Utilities - Classes utilitaires */
.u-text-center {
  text-align: center;
}

.u-mb-0 {
  margin-bottom: 0;
}

.u-hidden {
  display: none;
}
```

### Organisation des Fichiers

```
styles/
├── 01-settings/
│   ├── _variables.css
│   └── _colors.css
├── 02-tools/
│   ├── _mixins.css
│   └── _functions.css
├── 03-generic/
│   ├── _reset.css
│   └── _normalize.css
├── 04-elements/
│   ├── _headings.css
│   ├── _links.css
│   └── _forms.css
├── 05-objects/
│   ├── _container.css
│   ├── _grid.css
│   └── _layout.css
├── 06-components/
│   ├── _buttons.css
│   ├── _cards.css
│   └── _navigation.css
├── 07-utilities/
│   ├── _spacing.css
│   ├── _text.css
│   └── _display.css
└── main.css
```

### Exemple Complet

```html
<div class="o-container">
  <div class="o-grid o-grid--2-cols">
    <article class="c-card">
      <header class="c-card__header">
        <h2 class="c-card__title">Titre de l'article</h2>
      </header>
      <div class="c-card__body">
        <p class="u-text-center">Contenu de l'article...</p>
      </div>
      <footer class="c-card__footer">
        <button class="c-button c-button--primary">Lire</button>
      </footer>
    </article>
  </div>
</div>
```

---

## 🧩 Atomic CSS

### Qu'est-ce que l'Atomic CSS ?

**Atomic CSS** utilise des classes utilitaires simples et atomiques pour construire des interfaces complexes.

### Principes

```css
/* Classes atomiques - Une propriété par classe */
.d-flex { display: flex; }
.d-block { display: block; }
.d-none { display: none; }

.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }

.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-4 { margin: 1rem; }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.bg-blue { background-color: #007bff; }
.bg-red { background-color: #dc3545; }
.bg-green { background-color: #28a745; }

.text-white { color: white; }
.text-black { color: black; }
.text-gray { color: #6c757d; }
```

### Exemple Pratique

```html
<!-- Construction avec classes atomiques -->
<div class="d-flex flex-col items-center p-4 bg-blue text-white">
  <h2 class="text-center m-2">Titre</h2>
  <p class="text-center m-2">Description</p>
  <button class="d-block p-2 bg-red text-white">
    Bouton
  </button>
</div>

<!-- Alternative avec Tailwind CSS -->
<div class="flex flex-col items-center p-4 bg-blue-500 text-white">
  <h2 class="text-center m-2">Titre</h2>
  <p class="text-center m-2">Description</p>
  <button class="block p-2 bg-red-500 text-white">
    Bouton
  </button>
</div>
```

### Avantages et Inconvénients

#### ✅ Avantages
- **Performance** : CSS très optimisé
- **Rapidité** : Développement rapide
- **Consistance** : Design system intégré
- **Maintenance** : Moins de CSS personnalisé

#### ❌ Inconvénients
- **Apprentissage** : Nouvelles conventions
- **Verbose** : Beaucoup de classes dans le HTML
- **Limitations** : Peut être restrictif
- **Debugging** : Plus difficile à déboguer

---

## 🎨 Utility-First vs Component-Based

### Utility-First (Tailwind CSS)

```html
<!-- Approche Utility-First -->
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" 
           src="image.jpg" alt="Image">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        Article
      </div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
        Titre de l'article
      </a>
      <p class="mt-2 text-slate-500">
        Description de l'article avec du texte plus long...
      </p>
    </div>
  </div>
</div>
```

### Component-Based (CSS traditionnel)

```html
<!-- Approche Component-Based -->
<div class="card">
  <div class="card__media">
    <img src="image.jpg" alt="Image" class="card__image">
  </div>
  <div class="card__content">
    <span class="card__category">Article</span>
    <h3 class="card__title">
      <a href="#">Titre de l'article</a>
    </h3>
    <p class="card__description">
      Description de l'article avec du texte plus long...
    </p>
  </div>
</div>
```

```css
/* Styles Component-Based */
.card {
  max-width: 28rem;
  margin: 0 auto;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

@media (min-width: 768px) {
  .card {
    display: flex;
  }
}

.card__media {
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .card__media {
    height: 12rem;
    width: 12rem;
  }
}

.card__image {
  height: 12rem;
  width: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .card__image {
    height: 100%;
  }
}

.card__content {
  padding: 2rem;
}

.card__category {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  color: #6366f1;
  font-weight: 600;
}

.card__title {
  margin-top: 0.25rem;
  font-size: 1.125rem;
  font-weight: 500;
  color: black;
}

.card__title a {
  color: inherit;
  text-decoration: none;
}

.card__title a:hover {
  text-decoration: underline;
}

.card__description {
  margin-top: 0.5rem;
  color: #64748b;
}
```

### Comparaison

| Aspect | Utility-First | Component-Based |
|--------|---------------|-----------------|
| **Développement** | Rapide | Plus lent |
| **Maintenance** | Facile | Complexe |
| **Réutilisabilité** | Élevée | Moyenne |
| **Performance** | Excellente | Bonne |
| **Apprentissage** | Courbe initiale | Plus facile |
| **Taille HTML** | Plus grande | Plus petite |
| **Flexibilité** | Élevée | Limitée |

---

## 📝 Conventions de Nommage

### BEM Convention

```css
/* Block */
.component { }

/* Element */
.component__element { }

/* Modifier */
.component--modifier { }
.component__element--modifier { }
```

### SUIT CSS Convention

```css
/* Component */
.ComponentName { }

/* Descendant */
.ComponentName-descendantName { }

/* Modifier */
.ComponentName--modifierName { }

/* State */
.ComponentName.is-stateOfComponent { }
```

### Atomic CSS Convention

```css
/* Property-Value */
.d-flex { display: flex; }
.p-4 { padding: 1rem; }
.text-center { text-align: center; }

/* Property-Value-Breakpoint */
.md-flex { display: flex; }
.lg-p-4 { padding: 1rem; }
.xl-text-center { text-align: center; }
```

### Convention Personnalisée

```css
/* Prefixes pour organiser */
.l-layout { }           /* Layout */
.c-component { }        /* Component */
.u-utility { }          /* Utility */
.t-theme { }            /* Theme */
.js-hook { }            /* JavaScript hook */

/* Suffixes pour les variants */
.button--primary { }
.button--secondary { }
.button--large { }
.button--small { }
```

---

## 🏛️ Architecture CSS

### Structure Recommandée

```
styles/
├── abstracts/
│   ├── _variables.scss
│   ├── _functions.scss
│   └── _mixins.scss
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _base.scss
├── layout/
│   ├── _grid.scss
│   ├── _header.scss
│   └── _footer.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── _forms.scss
├── pages/
│   ├── _home.scss
│   └── _contact.scss
└── main.scss
```

### Organisation par Fonctionnalité

```
styles/
├── components/
│   ├── button/
│   │   ├── _button.scss
│   │   ├── _button-variants.scss
│   │   └── _button-states.scss
│   └── card/
│       ├── _card.scss
│       └── _card-variants.scss
├── layout/
│   ├── _grid.scss
│   └── _spacing.scss
└── utilities/
    ├── _helpers.scss
    └── _responsive.scss
```

### Variables et Configuration

```scss
// _variables.scss
$colors: (
  primary: #007bff,
  secondary: #6c757d,
  success: #28a745,
  danger: #dc3545,
  warning: #ffc107,
  info: #17a2b8
);

$spacing: (
  xs: 0.25rem,
  sm: 0.5rem,
  md: 1rem,
  lg: 1.5rem,
  xl: 3rem
);

$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

// _functions.scss
@function color($name) {
  @return map-get($colors, $name);
}

@function spacing($size) {
  @return map-get($spacing, $size);
}

@function breakpoint($name) {
  @return map-get($breakpoints, $name);
}

// _mixins.scss
@mixin respond-to($breakpoint) {
  @media (min-width: breakpoint($breakpoint)) {
    @content;
  }
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 🎯 Bonnes Pratiques

### Performance

```css
/* ✅ Bon : Utiliser des sélecteurs efficaces */
.button { }
.card { }

/* ❌ Éviter : Sélecteurs complexes */
div > ul > li > a { }
[class*="button"] { }

/* ✅ Bon : Éviter la cascade profonde */
.component { }
.component__element { }

/* ❌ Éviter : Cascade trop profonde */
.component .element .sub-element .detail { }
```

### Maintenabilité

```css
/* ✅ Bon : Nommage descriptif */
.user-profile { }
.article-card { }
.navigation-menu { }

/* ❌ Éviter : Nommage vague */
.box { }
.item { }
.content { }

/* ✅ Bon : Commentaires utiles */
/* Navigation principale */
.main-nav { }

/* Bouton principal avec état hover */
.btn-primary:hover { }
```

### Réutilisabilité

```css
/* ✅ Bon : Composants modulaires */
.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
}

.card--featured {
  border: 2px solid #007bff;
}

/* ❌ Éviter : Styles trop spécifiques */
.homepage-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 2px solid #007bff;
}
```

### Collaboration

```css
/* ✅ Bon : Convention claire */
/* BEM Convention */
.block { }
.block__element { }
.block--modifier { }

/* ❌ Éviter : Conventions mixtes */
.block { }
.blockElement { }
.block--modifier { }
```

### Documentation

```css
/**
 * Card Component
 * 
 * Un composant de carte réutilisable pour afficher du contenu.
 * 
 * @example
 * <div class="card">
 *   <div class="card__header">Titre</div>
 *   <div class="card__body">Contenu</div>
 * </div>
 */

.card {
  /* Styles du composant */
}

.card__header {
  /* En-tête de la carte */
}

.card__body {
  /* Corps de la carte */
}
```

---

## 📚 Ressources

### Méthodologies
- [BEM](https://getbem.com/) - Site officiel BEM
- [SMACSS](https://smacss.com/) - Site officiel SMACSS
- [OOCSS](https://github.com/stubbornella/oocss/wiki) - Documentation OOCSS
- [ITCSS](https://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528) - Guide ITCSS

### Frameworks CSS
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first framework
- [Bootstrap](https://getbootstrap.com/) - Component-based framework
- [Bulma](https://bulma.io/) - Modern CSS framework
- [Foundation](https://foundation.zurb.com/) - Responsive framework

### Outils
- [CSS Lint](https://github.com/CSSLint/csslint) - Linter CSS
- [Stylelint](https://stylelint.io/) - Linter CSS moderne
- [PostCSS](https://postcss.org/) - Outil de transformation CSS
- [Sass](https://sass-lang.com/) - Préprocesseur CSS

### Communauté
- [CSS-Tricks](https://css-tricks.com/) - Articles et tutoriels CSS
- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Documentation CSS
- [Can I Use](https://caniuse.com/) - Compatibilité navigateurs
- [CSS Guidelines](https://cssguidelin.es/) - Guide de style CSS

---

*Cette documentation couvre les principales méthodologies CSS pour créer des stylesheets maintenables, évolutives et collaboratives dans vos projets web.*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

