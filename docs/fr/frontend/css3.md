# 🎨 CSS3 - Guide Complet

> **CSS3** est la dernière évolution du langage de feuilles de style en cascade, offrant de nouvelles fonctionnalités pour le design et la mise en page des sites web modernes avec un focus sur l'accessibilité et les performances.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-css3)
- [🚀 Introduction](#-introduction)
- [🟢 Sélecteurs et Propriétés de Base](#-débutant---sélecteurs-et-propriétés-de-base)
- [🟡 Layout et Responsive](#-intermédiaire---layout-et-responsive)
- [🟠 Animations et Transitions](#-confirmé---animations-et-transitions)
- [🔴 Performance et Accessibilité](#-senior---performance-et-accessibilité)
- [⚫ CSS Avancé et Techniques Modernes](#-expert---css-avancé-et-techniques-modernes)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète CSS3

### 🎯 Sélecteurs CSS

| Sélecteur | Description | Exemple | Spécificité |
|-----------|-------------|---------|-------------|
| **`*`** | Tous les éléments | `* { margin: 0; }` | 0,0,0,0 |
| **`element`** | Élément HTML | `p { color: blue; }` | 0,0,0,1 |
| **`.class`** | Classe | `.container { width: 100%; }` | 0,0,1,0 |
| **`#id`** | Identifiant | `#header { background: red; }` | 0,1,0,0 |
| **`[attr]`** | Attribut | `[type="text"] { border: 1px solid; }` | 0,0,1,0 |
| **`[attr="value"]`** | Attribut avec valeur | `[href="https://"] { color: green; }` | 0,0,1,0 |
| **`[attr^="value"]`** | Commence par | `[class^="btn-"] { padding: 10px; }` | 0,0,1,0 |
| **`[attr$="value"]`** | Se termine par | `[src$=".jpg"] { border: 2px solid; }` | 0,0,1,0 |
| **`[attr*="value"]`** | Contient | `[class*="active"] { font-weight: bold; }` | 0,0,1,0 |
| **`:`** | Pseudo-classe | `:hover { background: yellow; }` | 0,0,1,0 |
| **`::`** | Pseudo-élément | `::before { content: ""; }` | 0,0,0,1 |
| **` `** | Descendant | `div p { margin: 10px; }` | Combiné |
| **`>`** | Enfant direct | `div > p { color: red; }` | Combiné |
| **`+`** | Frère adjacent | `h1 + p { margin-top: 0; }` | Combiné |
| **`~`** | Frère général | `h1 ~ p { color: blue; }` | Combiné |

### 🎯 Pseudo-classes

| Pseudo-classe | Description | Exemple | Utilisation |
|---------------|-------------|---------|-------------|
| **`:hover`** | Au survol | `a:hover { color: red; }` | Interactions utilisateur |
| **`:focus`** | Au focus | `input:focus { outline: 2px solid blue; }` | Accessibilité clavier |
| **`:active`** | Pendant le clic | `button:active { transform: scale(0.95); }` | Feedback tactile |
| **`:visited`** | Lien visité | `a:visited { color: purple; }` | Navigation |
| **`:link`** | Lien non visité | `a:link { color: blue; }` | Navigation |
| **`:first-child`** | Premier enfant | `li:first-child { font-weight: bold; }` | Styling de liste |
| **`:last-child`** | Dernier enfant | `li:last-child { border-bottom: none; }` | Styling de liste |
| **`:nth-child(n)`** | Enfant à la position n | `tr:nth-child(even) { background: #f5f5f5; }` | Tableaux, listes |
| **`:nth-of-type(n)`** | Élément de type n | `p:nth-of-type(2) { color: red; }` | Sélection par type |
| **`:only-child`** | Seul enfant | `div:only-child { margin: 0; }` | Layout conditionnel |
| **`:empty`** | Élément vide | `div:empty { display: none; }` | Masquage conditionnel |
| **`:not(selector)`** | Négation | `p:not(.special) { color: black; }` | Exclusion |
| **`:disabled`** | Élément désactivé | `input:disabled { opacity: 0.5; }` | Formulaires |
| **`:checked`** | Élément coché | `input:checked + label { font-weight: bold; }` | Formulaires |
| **`:valid`** | Valeur valide | `input:valid { border-color: green; }` | Validation |
| **`:invalid`** | Valeur invalide | `input:invalid { border-color: red; }` | Validation |
| **`:required`** | Champ obligatoire | `input:required { border-left: 3px solid red; }` | Formulaires |
| **`:optional`** | Champ optionnel | `input:optional { border-left: 3px solid green; }` | Formulaires |

### 🎯 Propriétés de Mise en Page

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`display`** | Type d'affichage | `block`, `inline`, `flex`, `grid`, `none` | `display: flex;` |
| **`position`** | Positionnement | `static`, `relative`, `absolute`, `fixed`, `sticky` | `position: absolute;` |
| **`top`** | Position depuis le haut | `auto`, `px`, `%`, `em` | `top: 10px;` |
| **`right`** | Position depuis la droite | `auto`, `px`, `%`, `em` | `right: 20px;` |
| **`bottom`** | Position depuis le bas | `auto`, `px`, `%`, `em` | `bottom: 0;` |
| **`left`** | Position depuis la gauche | `auto`, `px`, `%`, `em` | `left: 50%;` |
| **`z-index`** | Ordre d'empilement | `auto`, `number` | `z-index: 1000;` |
| **`float`** | Flottement | `none`, `left`, `right` | `float: left;` |
| **`clear`** | Nettoyage du flottement | `none`, `left`, `right`, `both` | `clear: both;` |
| **`overflow`** | Débordement | `visible`, `hidden`, `scroll`, `auto` | `overflow: hidden;` |
| **`visibility`** | Visibilité | `visible`, `hidden`, `collapse` | `visibility: hidden;` |
| **`opacity`** | Opacité | `0` à `1` | `opacity: 0.5;` |

### 🎯 Flexbox

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`flex-direction`** | Direction des éléments | `row`, `row-reverse`, `column`, `column-reverse` | `flex-direction: column;` |
| **`flex-wrap`** | Retour à la ligne | `nowrap`, `wrap`, `wrap-reverse` | `flex-wrap: wrap;` |
| **`justify-content`** | Alignement horizontal | `flex-start`, `center`, `flex-end`, `space-between`, `space-around` | `justify-content: center;` |
| **`align-items`** | Alignement vertical | `stretch`, `flex-start`, `center`, `flex-end`, `baseline` | `align-items: center;` |
| **`align-content`** | Alignement du contenu | `stretch`, `flex-start`, `center`, `flex-end`, `space-between` | `align-content: space-between;` |
| **`flex-grow`** | Facteur d'expansion | `number` | `flex-grow: 1;` |
| **`flex-shrink`** | Facteur de réduction | `number` | `flex-shrink: 0;` |
| **`flex-basis`** | Taille de base | `auto`, `px`, `%`, `em` | `flex-basis: 200px;` |
| **`flex`** | Raccourci | `grow shrink basis` | `flex: 1 0 200px;` |
| **`order`** | Ordre d'affichage | `number` | `order: 2;` |
| **`align-self`** | Alignement individuel | `auto`, `flex-start`, `center`, `flex-end` | `align-self: center;` |

### 🎯 Grid

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`display`** | Mode grille | `grid`, `inline-grid` | `display: grid;` |
| **`grid-template-columns`** | Colonnes | `px`, `%`, `fr`, `auto`, `repeat()` | `grid-template-columns: 1fr 2fr 1fr;` |
| **`grid-template-rows`** | Lignes | `px`, `%`, `fr`, `auto`, `repeat()` | `grid-template-rows: 100px 1fr;` |
| **`grid-template-areas`** | Zones nommées | `"header header" "sidebar main"` | `grid-template-areas: "header header";` |
| **`grid-gap`** | Espacement | `px`, `em` | `grid-gap: 20px;` |
| **`grid-column-gap`** | Espacement colonnes | `px`, `em` | `grid-column-gap: 10px;` |
| **`grid-row-gap`** | Espacement lignes | `px`, `em` | `grid-row-gap: 15px;` |
| **`justify-items`** | Alignement horizontal | `start`, `end`, `center`, `stretch` | `justify-items: center;` |
| **`align-items`** | Alignement vertical | `start`, `end`, `center`, `stretch` | `align-items: center;` |
| **`justify-content`** | Alignement du contenu | `start`, `end`, `center`, `stretch`, `space-around` | `justify-content: space-around;` |
| **`align-content`** | Alignement du contenu | `start`, `end`, `center`, `stretch`, `space-around` | `align-content: center;` |
| **`grid-column`** | Position colonne | `1 / 3`, `span 2`, `1 / -1` | `grid-column: 1 / 3;` |
| **`grid-row`** | Position ligne | `1 / 3`, `span 2`, `1 / -1` | `grid-row: 1 / 3;` |
| **`grid-area`** | Zone | `name`, `row-start / col-start / row-end / col-end` | `grid-area: header;` |

### 🎯 Typographie

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`font-family`** | Police | `Arial`, `"Times New Roman"`, `serif` | `font-family: Arial, sans-serif;` |
| **`font-size`** | Taille | `px`, `em`, `rem`, `%`, `smaller`, `larger` | `font-size: 16px;` |
| **`font-weight`** | Épaisseur | `normal`, `bold`, `100-900` | `font-weight: 700;` |
| **`font-style`** | Style | `normal`, `italic`, `oblique` | `font-style: italic;` |
| **`line-height`** | Hauteur de ligne | `number`, `px`, `em` | `line-height: 1.5;` |
| **`text-align`** | Alignement | `left`, `right`, `center`, `justify` | `text-align: center;` |
| **`text-decoration`** | Décoration | `none`, `underline`, `line-through`, `overline` | `text-decoration: underline;` |
| **`text-transform`** | Transformation | `none`, `uppercase`, `lowercase`, `capitalize` | `text-transform: uppercase;` |
| **`letter-spacing`** | Espacement des lettres | `normal`, `px`, `em` | `letter-spacing: 2px;` |
| **`word-spacing`** | Espacement des mots | `normal`, `px`, `em` | `word-spacing: 5px;` |
| **`text-shadow`** | Ombre du texte | `x y blur color` | `text-shadow: 2px 2px 4px rgba(0,0,0,0.5);` |
| **`text-overflow`** | Débordement du texte | `clip`, `ellipsis` | `text-overflow: ellipsis;` |
| **`white-space`** | Gestion des espaces | `normal`, `nowrap`, `pre`, `pre-wrap` | `white-space: nowrap;` |

### 🎯 Couleurs et Arrière-plans

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`color`** | Couleur du texte | `#ff0000`, `rgb(255,0,0)`, `red` | `color: #3498db;` |
| **`background-color`** | Couleur de fond | `#ff0000`, `rgb(255,0,0)`, `red` | `background-color: #f8f9fa;` |
| **`background-image`** | Image de fond | `url()`, `linear-gradient()`, `radial-gradient()` | `background-image: url('bg.jpg');` |
| **`background-size`** | Taille de l'image | `cover`, `contain`, `px`, `%` | `background-size: cover;` |
| **`background-position`** | Position de l'image | `top`, `center`, `bottom`, `left`, `right` | `background-position: center;` |
| **`background-repeat`** | Répétition | `repeat`, `no-repeat`, `repeat-x`, `repeat-y` | `background-repeat: no-repeat;` |
| **`background-attachment`** | Fixation | `scroll`, `fixed`, `local` | `background-attachment: fixed;` |
| **`background`** | Raccourci | Toutes les propriétés | `background: #f8f9fa url('bg.jpg') no-repeat center;` |
| **`opacity`** | Opacité | `0` à `1` | `opacity: 0.8;` |
| **`box-shadow`** | Ombre de boîte | `x y blur spread color` | `box-shadow: 0 2px 10px rgba(0,0,0,0.1);` |

### 🎯 Bordures et Espacement

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`border`** | Bordure | `width style color` | `border: 1px solid #ccc;` |
| **`border-width`** | Épaisseur | `thin`, `medium`, `thick`, `px` | `border-width: 2px;` |
| **`border-style`** | Style | `solid`, `dashed`, `dotted`, `double` | `border-style: solid;` |
| **`border-color`** | Couleur | `#ff0000`, `rgb(255,0,0)`, `red` | `border-color: #3498db;` |
| **`border-radius`** | Rayon des coins | `px`, `%` | `border-radius: 10px;` |
| **`margin`** | Marge extérieure | `px`, `em`, `%`, `auto` | `margin: 20px;` |
| **`padding`** | Marge intérieure | `px`, `em`, `%` | `padding: 15px;` |
| **`width`** | Largeur | `px`, `%`, `em`, `auto` | `width: 100%;` |
| **`height`** | Hauteur | `px`, `%`, `em`, `auto` | `height: 200px;` |
| **`max-width`** | Largeur maximale | `px`, `%`, `em`, `none` | `max-width: 1200px;` |
| **`max-height`** | Hauteur maximale | `px`, `%`, `em`, `none` | `max-height: 500px;` |
| **`min-width`** | Largeur minimale | `px`, `%`, `em` | `min-width: 300px;` |
| **`min-height`** | Hauteur minimale | `px`, `%`, `em` | `min-height: 200px;` |

### 🎯 Animations et Transitions

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`transition`** | Transition | `property duration timing-function delay` | `transition: all 0.3s ease;` |
| **`transition-property`** | Propriété à animer | `all`, `opacity`, `transform` | `transition-property: opacity;` |
| **`transition-duration`** | Durée | `s`, `ms` | `transition-duration: 0.3s;` |
| **`transition-timing-function`** | Fonction de timing | `ease`, `linear`, `ease-in`, `ease-out` | `transition-timing-function: ease-in-out;` |
| **`transition-delay`** | Délai | `s`, `ms` | `transition-delay: 0.1s;` |
| **`animation`** | Animation | `name duration timing-function delay iteration-count direction` | `animation: slideIn 1s ease-in-out;` |
| **`animation-name`** | Nom de l'animation | `@keyframes name` | `animation-name: slideIn;` |
| **`animation-duration`** | Durée | `s`, `ms` | `animation-duration: 1s;` |
| **`animation-timing-function`** | Fonction de timing | `ease`, `linear`, `cubic-bezier()` | `animation-timing-function: ease-out;` |
| **`animation-delay`** | Délai | `s`, `ms` | `animation-delay: 0.5s;` |
| **`animation-iteration-count`** | Nombre d'itérations | `number`, `infinite` | `animation-iteration-count: 3;` |
| **`animation-direction`** | Direction | `normal`, `reverse`, `alternate` | `animation-direction: alternate;` |
| **`animation-fill-mode`** | Mode de remplissage | `none`, `forwards`, `backwards`, `both` | `animation-fill-mode: forwards;` |
| **`animation-play-state`** | État de lecture | `running`, `paused` | `animation-play-state: paused;` |

### 🎯 Transformations

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **`transform`** | Transformation | `translate()`, `rotate()`, `scale()`, `skew()` | `transform: translateX(50px);` |
| **`transform-origin`** | Point d'origine | `center`, `top`, `left`, `px`, `%` | `transform-origin: center;` |
| **`perspective`** | Perspective 3D | `px`, `none` | `perspective: 1000px;` |
| **`perspective-origin`** | Origine de perspective | `center`, `top`, `left`, `px`, `%` | `perspective-origin: center;` |
| **`backface-visibility`** | Visibilité arrière | `visible`, `hidden` | `backface-visibility: hidden;` |

### 🎯 Media Queries

| Type | Description | Exemple | Utilisation |
|------|-------------|---------|-------------|
| **`@media screen`** | Écrans | `@media screen and (max-width: 768px)` | Responsive design |
| **`@media print`** | Impression | `@media print { body { color: black; } }` | Styles d'impression |
| **`@media (min-width)`** | Largeur minimale | `@media (min-width: 1024px)` | Desktop |
| **`@media (max-width)`** | Largeur maximale | `@media (max-width: 768px)` | Mobile |
| **`@media (orientation)`** | Orientation | `@media (orientation: landscape)` | Portrait/Paysage |
| **`@media (resolution)`** | Résolution | `@media (min-resolution: 2dppx)` | Écrans haute résolution |
| **`@media (prefers-color-scheme)`** | Thème système | `@media (prefers-color-scheme: dark)` | Mode sombre |

---

## 🚀 Introduction

CSS3 est la dernière évolution du langage de feuilles de style en cascade, offrant de nouvelles fonctionnalités pour le design et la mise en page des sites web modernes.

### Qu'est-ce que CSS3 ?
CSS3 est un langage de style qui décrit la présentation des documents HTML. Il permet de contrôler l'apparence, la mise en page, les animations et les interactions des éléments web de manière séparée du contenu.

### Pourquoi choisir CSS3 ?
- **🎨 Design Moderne** : Nouvelles fonctionnalités de design
- **📱 Responsive** : Adaptation automatique aux écrans
- **⚡ Performance** : Optimisations et nouvelles API
- **♿ Accessibilité** : Support des technologies d'assistance
- **🔄 Animations** : Transitions et animations fluides
- **🌐 Standards** : Conformité aux standards web
- **📚 Documentation** : Spécifications claires et complètes

### Meilleures Pratiques d'Accessibilité
- **Contraste suffisant** : Respectez les ratios WCAG (4.5:1 pour le texte normal)
- **Unités relatives** : Utilisez `rem` et `em` pour respecter les préférences utilisateur
- **Focus visible** : Assurez-vous que le focus clavier est visible
- **Animations respectueuses** : Respectez `prefers-reduced-motion`
- **Couleurs non exclusives** : N'utilisez pas seulement la couleur pour transmettre l'information

---

## 🟢 Sélecteurs et Propriétés de Base

### Structure de base CSS

```css
/* Commentaire CSS */

/* Sélecteur d'élément */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
}

/* Sélecteur de classe */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Sélecteur d'ID */
#header {
    background-color: #3498db;
    color: white;
    padding: 20px;
    text-align: center;
}

/* Sélecteur descendant */
.container p {
    line-height: 1.6;
    margin-bottom: 15px;
}

/* Sélecteur d'enfant direct */
.container > h1 {
    color: #2c3e50;
    font-size: 2.5em;
}

/* Sélecteur de frère adjacent */
h1 + p {
    font-style: italic;
    color: #7f8c8d;
}

/* Sélecteur d'attribut */
input[type="text"] {
    border: 2px solid #bdc3c7;
    padding: 10px;
    border-radius: 5px;
}

/* Pseudo-classe */
a:hover {
    color: #e74c3c;
    text-decoration: underline;
}

/* Pseudo-élément */
p::first-line {
    font-weight: bold;
    color: #2c3e50;
}
```

### Typographie de base

```css
/* Hiérarchie des titres */
h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 1rem;
    line-height: 1.2;
}

h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #34495e;
    margin-bottom: 0.8rem;
    line-height: 1.3;
}

h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #34495e;
    margin-bottom: 0.6rem;
    line-height: 1.4;
}

/* Paragraphes */
p {
    font-size: 1rem;
    line-height: 1.6;
    color: #2c3e50;
    margin-bottom: 1rem;
}

/* Liens */
a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: #2980b9;
    text-decoration: underline;
}

a:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}

/* Listes */
ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
}

li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
}

/* Citations */
blockquote {
    border-left: 4px solid #3498db;
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: #7f8c8d;
}

/* Code */
code {
    background-color: #f8f9fa;
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

pre {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 1rem;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1rem 0;
}
```

### Couleurs et arrière-plans

```css
/* Couleurs de base */
.primary {
    background-color: #3498db;
    color: white;
}

.secondary {
    background-color: #95a5a6;
    color: white;
}

.success {
    background-color: #27ae60;
    color: white;
}

.warning {
    background-color: #f39c12;
    color: white;
}

.danger {
    background-color: #e74c3c;
    color: white;
}

/* Dégradés */
.gradient-bg {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-text {
    background: linear-gradient(45deg, #3498db, #e74c3c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Images de fond */
.hero-section {
    background-image: url('hero-bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
}

/* Overlay sur image */
.overlay {
    position: relative;
}

.overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.overlay-content {
    position: relative;
    z-index: 2;
}
```

---

## 🟡 Layout et Responsive

### Flexbox Layout

```css
/* Conteneur flex */
.flex-container {
    display: flex;
    flex-direction: row; /* row, column, row-reverse, column-reverse */
    flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
    justify-content: center; /* flex-start, center, flex-end, space-between, space-around */
    align-items: center; /* stretch, flex-start, center, flex-end, baseline */
    gap: 20px; /* Espacement entre les éléments */
    min-height: 100vh;
}

/* Éléments flex */
.flex-item {
    flex: 1; /* flex-grow flex-shrink flex-basis */
    min-width: 200px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Exemple de navigation flex */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #2c3e50;
    color: white;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-menu li a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.nav-menu li a:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Card layout avec flexbox */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 2rem;
}

.card {
    flex: 1 1 300px; /* grow shrink basis */
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-header {
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.card-body {
    padding: 1.5rem;
}

.card-footer {
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}
```

### Grid Layout

```css
/* Conteneur grid */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    padding: 2rem;
}

/* Grid avec zones nommées */
.layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 250px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
}

.header {
    grid-area: header;
    background-color: #3498db;
    color: white;
    padding: 1rem;
    text-align: center;
}

.sidebar {
    grid-area: sidebar;
    background-color: #2c3e50;
    color: white;
    padding: 1rem;
}

.main {
    grid-area: main;
    background-color: #ecf0f1;
    padding: 1rem;
}

.footer {
    grid-area: footer;
    background-color: #34495e;
    color: white;
    padding: 1rem;
    text-align: center;
}

/* Grid responsive */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

/* Grid avec alignement */
.grid-center {
    display: grid;
    place-items: center;
    min-height: 100vh;
}

/* Grid avec espacement automatique */
.grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
}
```

### Responsive Design

```css
/* Mobile First Approach */
.container {
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
    
    .nav-menu {
        display: flex;
    }
    
    .nav-toggle {
        display: none;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

/* Navigation responsive */
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.nav-toggle {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
}

.nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #2c3e50;
    flex-direction: column;
    padding: 1rem;
}

.nav-menu.active {
    display: flex;
}

@media (min-width: 768px) {
    .nav-toggle {
        display: none;
    }
    
    .nav-menu {
        display: flex;
        position: static;
        flex-direction: row;
        background: none;
        padding: 0;
    }
}

/* Images responsive */
.responsive-img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Vidéos responsive */
.responsive-video {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.responsive-video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

---

## 🟠 Animations et Transitions

### Transitions CSS

```css
/* Transition de base */
.button {
    background-color: #3498db;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.button:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(52, 152, 219, 0.4);
}

/* Transitions multiples */
.card {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: 
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background-color: #f8f9fa;
}

/* Transition avec délai */
.staggered-item {
    opacity: 0;
    transform: translateY(20px);
    transition: 
        opacity 0.6s ease 0.1s,
        transform 0.6s ease 0.1s;
}

.staggered-item.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Transition de largeur */
.progress-bar {
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    transition: width 2s ease-in-out;
}

.progress-bar.animate {
    width: 100%;
}

/* Transition de couleur */
.theme-toggle {
    background-color: #f8f9fa;
    border: 2px solid #dee2e6;
    border-radius: 50px;
    width: 60px;
    height: 30px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.theme-toggle::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 22px;
    height: 22px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
}

.theme-toggle.active {
    background-color: #3498db;
}

.theme-toggle.active::before {
    transform: translateX(30px);
}
```

### Animations CSS

```css
/* Keyframes de base */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideInFromLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Utilisation des animations */
.fade-in {
    animation: fadeIn 1s ease-in-out;
}

.slide-in {
    animation: slideInFromLeft 0.8s ease-out;
}

.bounce {
    animation: bounce 2s infinite;
}

.pulse {
    animation: pulse 2s infinite;
}

.spinner {
    animation: spin 1s linear infinite;
}

/* Animation de chargement */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Animation de texte qui apparaît */
.text-reveal {
    overflow: hidden;
}

.text-reveal span {
    display: inline-block;
    animation: slideInFromLeft 0.8s ease-out forwards;
    opacity: 0;
}

.text-reveal span:nth-child(1) { animation-delay: 0.1s; }
.text-reveal span:nth-child(2) { animation-delay: 0.2s; }
.text-reveal span:nth-child(3) { animation-delay: 0.3s; }
.text-reveal span:nth-child(4) { animation-delay: 0.4s; }
.text-reveal span:nth-child(5) { animation-delay: 0.5s; }

/* Animation de menu hamburger */
.hamburger {
    width: 30px;
    height: 20px;
    position: relative;
    cursor: pointer;
}

.hamburger span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #333;
    margin: 5px 0;
    transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}
```

### Animations avancées

```css
/* Animation de particules */
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #3498db;
    border-radius: 50%;
    animation: float 3s ease-in-out infinite;
}

.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; animation-delay: 0.5s; }
.particle:nth-child(3) { left: 30%; animation-delay: 1s; }
.particle:nth-child(4) { left: 40%; animation-delay: 1.5s; }
.particle:nth-child(5) { left: 50%; animation-delay: 2s; }

/* Animation de typing */
@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

@keyframes blink {
    0%, 50% {
        border-color: transparent;
    }
    51%, 100% {
        border-color: #3498db;
    }
}

.typewriter {
    overflow: hidden;
    border-right: 2px solid #3498db;
    white-space: nowrap;
    animation: 
        typing 3s steps(40, end),
        blink 0.75s step-end infinite;
}

/* Animation de morphing */
@keyframes morph {
    0% {
        border-radius: 50%;
        transform: rotate(0deg);
    }
    50% {
        border-radius: 0%;
        transform: rotate(180deg);
    }
    100% {
        border-radius: 50%;
        transform: rotate(360deg);
    }
}

.morphing-shape {
    width: 100px;
    height: 100px;
    background: linear-gradient(45deg, #3498db, #e74c3c);
    animation: morph 4s ease-in-out infinite;
}

/* Animation de glitch */
@keyframes glitch {
    0% {
        transform: translate(0);
    }
    20% {
        transform: translate(-2px, 2px);
    }
    40% {
        transform: translate(-2px, -2px);
    }
    60% {
        transform: translate(2px, 2px);
    }
    80% {
        transform: translate(2px, -2px);
    }
    100% {
        transform: translate(0);
    }
}

.glitch-text {
    position: relative;
    color: #3498db;
    font-size: 2rem;
    font-weight: bold;
}

.glitch-text::before,
.glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.glitch-text::before {
    animation: glitch 0.3s infinite;
    color: #e74c3c;
    z-index: -1;
}

.glitch-text::after {
    animation: glitch 0.3s infinite reverse;
    color: #2ecc71;
    z-index: -2;
}
```

---

## 🔴 Performance et Accessibilité

### Optimisation des performances

```css
/* Utilisation de will-change pour les animations */
.animated-element {
    will-change: transform, opacity;
    transform: translateZ(0); /* Force l'accélération matérielle */
}

/* Éviter les reflows coûteux */
.optimized-layout {
    contain: layout style paint;
    content-visibility: auto;
}

/* Lazy loading des images */
.lazy-image {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy-image.loaded {
    opacity: 1;
}

/* Utilisation de CSS custom properties pour les thèmes */
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --text-color: #2c3e50;
    --bg-color: #ffffff;
    --border-radius: 8px;
    --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}

[data-theme="dark"] {
    --primary-color: #5dade2;
    --secondary-color: #58d68d;
    --text-color: #ecf0f1;
    --bg-color: #2c3e50;
    --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.themed-element {
    background-color: var(--bg-color);
    color: var(--text-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
}

/* Optimisation des polices */
@font-face {
    font-family: 'CustomFont';
    src: url('font.woff2') format('woff2'),
         url('font.woff') format('woff');
    font-display: swap; /* Améliore le rendu des polices */
    font-weight: 400;
    font-style: normal;
}

/* Utilisation de font-display pour les performances */
.optimized-text {
    font-family: 'CustomFont', Arial, sans-serif;
    font-display: swap;
}

/* CSS Grid avec subgrid (support limité) */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.grid-item {
    grid-column: span 4;
}

/* Utilisation de aspect-ratio pour les conteneurs */
.aspect-ratio {
    aspect-ratio: 16 / 9;
    background-color: #f8f9fa;
}

/* Container queries (support limité) */
@container (min-width: 300px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}
```

### Accessibilité avancée

```css
/* Respect des préférences utilisateur */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Mode sombre automatique */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #ffffff;
        --border-color: #333333;
    }
}

/* Contraste élevé */
@media (prefers-contrast: high) {
    .button {
        border: 2px solid currentColor;
    }
    
    .link {
        text-decoration: underline;
    }
}

/* Focus visible amélioré */
.focusable:focus {
    outline: 3px solid #3498db;
    outline-offset: 2px;
    border-radius: 4px;
}

.focusable:focus:not(:focus-visible) {
    outline: none;
}

.focusable:focus-visible {
    outline: 3px solid #3498db;
    outline-offset: 2px;
}

/* Skip links pour la navigation clavier */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    border-radius: 4px;
}

.skip-link:focus {
    top: 6px;
}

/* Indicateurs d'état pour les lecteurs d'écran */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* États de validation des formulaires */
.form-field:invalid {
    border-color: #e74c3c;
    box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2);
}

.form-field:valid {
    border-color: #27ae60;
    box-shadow: 0 0 0 2px rgba(39, 174, 96, 0.2);
}

.form-field:required::after {
    content: " *";
    color: #e74c3c;
}

/* Indicateurs de chargement accessibles */
.loading-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-spinner::before {
    content: "Chargement en cours";
    position: absolute;
    left: -9999px;
}

/* Animations respectueuses */
.respectful-animation {
    animation: slideIn 0.5s ease-out;
}

@media (prefers-reduced-motion: reduce) {
    .respectful-animation {
        animation: none;
        opacity: 1;
        transform: none;
    }
}

/* Contraste de couleurs automatique */
.auto-contrast {
    background-color: #3498db;
    color: white;
}

@media (prefers-contrast: high) {
    .auto-contrast {
        background-color: #000;
        color: #fff;
        border: 2px solid #fff;
    }
}
```

### Techniques avancées

```css
/* CSS Grid avec auto-fit et minmax */
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

/* Flexbox avec gap (support moderne) */
.flex-gap {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

/* CSS Grid avec areas nommées */
.layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
}

/* Utilisation de clamp() pour la typographie responsive */
.responsive-text {
    font-size: clamp(1rem, 2.5vw, 2rem);
    line-height: clamp(1.4, 1.5, 1.6);
}

/* CSS Grid avec subgrid (expérimental) */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.grid-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 4;
}

/* Utilisation de aspect-ratio */
.video-container {
    aspect-ratio: 16 / 9;
    background: #000;
}

/* Container queries (expérimental) */
@container (min-width: 300px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}

/* CSS Scroll Snap */
.scroll-container {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    height: 100vh;
}

.scroll-item {
    scroll-snap-align: start;
    height: 100vh;
}

/* CSS Logical Properties */
.logical-properties {
    margin-inline-start: 1rem;
    margin-inline-end: 1rem;
    padding-block-start: 1rem;
    padding-block-end: 1rem;
    border-inline-start: 2px solid #3498db;
}

/* CSS Custom Properties avec fallbacks */
.custom-property {
    background-color: var(--bg-color, #ffffff);
    color: var(--text-color, #000000);
    font-size: var(--font-size, 16px);
}

/* CSS Grid avec auto-fit et minmax pour les cartes */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

/* Flexbox avec order pour la réorganisation */
.flex-reorder {
    display: flex;
    flex-direction: column;
}

.flex-reorder .item-1 { order: 2; }
.flex-reorder .item-2 { order: 1; }
.flex-reorder .item-3 { order: 3; }

@media (min-width: 768px) {
    .flex-reorder {
        flex-direction: row;
    }
    
    .flex-reorder .item-1 { order: 1; }
    .flex-reorder .item-2 { order: 2; }
    .flex-reorder .item-3 { order: 3; }
}
```

---

## ⚫ CSS Avancé et Techniques Modernes

### CSS Custom Properties avancées

```css
/* Système de design avec CSS Custom Properties */
:root {
    /* Couleurs primaires */
    --color-primary-50: #ebf8ff;
    --color-primary-100: #bee3f8;
    --color-primary-200: #90cdf4;
    --color-primary-300: #63b3ed;
    --color-primary-400: #4299e1;
    --color-primary-500: #3182ce;
    --color-primary-600: #2b77cb;
    --color-primary-700: #2c5282;
    --color-primary-800: #2a4365;
    --color-primary-900: #1a365d;
    
    /* Espacement */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    
    /* Typographie */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;
    
    /* Ombres */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    /* Rayons de bordure */
    --radius-sm: 0.125rem;
    --radius-base: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-base: 250ms ease;
    --transition-slow: 350ms ease;
    
    /* Z-index */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
}

/* Thème sombre */
[data-theme="dark"] {
    --color-primary-50: #1a365d;
    --color-primary-100: #2a4365;
    --color-primary-200: #2c5282;
    --color-primary-300: #2b77cb;
    --color-primary-400: #3182ce;
    --color-primary-500: #4299e1;
    --color-primary-600: #63b3ed;
    --color-primary-700: #90cdf4;
    --color-primary-800: #bee3f8;
    --color-primary-900: #ebf8ff;
}

/* Utilisation des custom properties */
.button {
    background-color: var(--color-primary-500);
    color: white;
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    box-shadow: var(--shadow-base);
    transition: var(--transition-base);
    border: none;
    cursor: pointer;
}

.button:hover {
    background-color: var(--color-primary-600);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
}

.button:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
}

/* Système de grille avec custom properties */
.grid-system {
    --grid-columns: 12;
    --grid-gap: var(--space-6);
    --grid-max-width: 1200px;
    
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
    max-width: var(--grid-max-width);
    margin: 0 auto;
    padding: 0 var(--space-4);
}

.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-6 { grid-column: span 6; }
.col-12 { grid-column: span 12; }

@media (max-width: 768px) {
    .col-1, .col-2, .col-3, .col-4, .col-6 {
        grid-column: span 12;
    }
}
```

### CSS Grid avancé

```css
/* Grid avec auto-fit et minmax pour les cartes */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

/* Grid avec zones nommées et responsive */
.layout {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
}

@media (max-width: 768px) {
    .layout {
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
    }
}

/* Grid avec subgrid (expérimental) */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1rem;
}

.grid-item {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 4;
}

/* Grid avec auto-fit et aspect-ratio */
.aspect-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.aspect-item {
    aspect-ratio: 16 / 9;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

/* Grid avec masonry (expérimental) */
.masonry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: masonry;
    gap: 1rem;
}

.masonry-item {
    break-inside: avoid;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Grid avec auto-fit et minmax pour les images */
.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.image-item {
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
}

.image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.image-item:hover img {
    transform: scale(1.05);
}
```

### CSS Container Queries (expérimental)

```css
/* Container queries pour les composants */
.card-container {
    container-type: inline-size;
    container-name: card;
}

@container card (min-width: 300px) {
    .card {
        display: flex;
        flex-direction: row;
    }
    
    .card-image {
        width: 40%;
    }
    
    .card-content {
        width: 60%;
        padding: 1rem;
    }
}

@container card (max-width: 299px) {
    .card {
        display: flex;
        flex-direction: column;
    }
    
    .card-image {
        width: 100%;
    }
    
    .card-content {
        width: 100%;
        padding: 1rem;
    }
}

/* Container queries avec plusieurs conteneurs */
.sidebar {
    container-type: inline-size;
    container-name: sidebar;
}

.main-content {
    container-type: inline-size;
    container-name: main;
}

@container sidebar (min-width: 200px) {
    .sidebar-content {
        display: block;
    }
}

@container main (min-width: 600px) {
    .main-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }
}
```

### CSS Scroll Snap

```css
/* Scroll snap horizontal */
.horizontal-scroll {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    gap: 1rem;
    padding: 1rem;
}

.horizontal-scroll-item {
    flex: 0 0 300px;
    scroll-snap-align: start;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Scroll snap vertical */
.vertical-scroll {
    height: 100vh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
}

.vertical-scroll-section {
    height: 100vh;
    scroll-snap-align: start;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
}

/* Scroll snap avec grid */
.grid-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    overflow: auto;
    scroll-snap-type: both mandatory;
    height: 100vh;
    padding: 1rem;
}

.grid-scroll-item {
    scroll-snap-align: start;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

---

## 📚 Ressources

### Documentation officielle
- [MDN CSS](https://developer.mozilla.org/fr/docs/Web/CSS)
- [W3C CSS Specifications](https://www.w3.org/Style/CSS/)
- [CSS Working Group](https://www.w3.org/Style/CSS/current-work)

### Accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM CSS](https://webaim.org/articles/css/)
- [A11y Project](https://www.a11yproject.com/)

### Outils et validation
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Autoprefixer](https://autoprefixer.github.io/)
- [Can I Use](https://caniuse.com/)

### Apprentissage
- [CSS Tricks](https://css-tricks.com/)
- [CSS Grid Garden](https://cssgridgarden.com/)
- [Flexbox Froggy](https://flexboxfroggy.com/)

---

*Dernière mise à jour : Janvier 2024*
