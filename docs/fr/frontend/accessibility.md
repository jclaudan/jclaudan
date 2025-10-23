# ♿ Accessibilité Web - Guide RAWeb/WCAG

> **L'accessibilité web** est l'art de rendre les sites web utilisables par tous, indépendamment de leurs capacités physiques, cognitives ou techniques. Le référentiel RAWeb (Référentiel Général d'Amélioration de l'Accessibilité) est le standard français basé sur WCAG.

## 📋 Table des matières
- [🚀 Introduction](#-introduction)
- [📊 Standards et Conformité](#-standards-et-conformité)
- [🏗️ HTML Sémantique](#️-html-sémantique)
- [🎯 Attributs ARIA](#-attributs-aria)
- [⌨️ Navigation Clavier](#️-navigation-clavier)
- [🔊 Lecteurs d'Écran](#-lecteurs-décran)
- [🎨 Couleur et Contraste](#-couleur-et-contraste)
- [🧪 Outils de Test](#-outils-de-test)
- [📝 Formulaires Accessibles](#-formulaires-accessibles)
- [🎭 Contenu Dynamique](#-contenu-dynamique)
- [📱 Responsive et Mobile](#-responsive-et-mobile)
- [🎯 Bonnes Pratiques](#-bonnes-pratiques)
- [📚 Ressources](#-ressources)

---

## 🚀 Introduction

### Qu'est-ce que l'accessibilité web ?

L'accessibilité web consiste à concevoir et développer des sites web qui peuvent être utilisés par tous, y compris :
- **Personnes handicapées** : Visuel, auditif, moteur, cognitif
- **Utilisateurs âgés** : Avec des capacités diminuées
- **Utilisateurs mobiles** : Avec des écrans tactiles
- **Utilisateurs temporairement handicapés** : Blessure, fatigue
- **Utilisateurs avec des connexions lentes** : Contexte limité

### Pourquoi l'accessibilité est importante ?

✅ **Avantages :**
- **Inclusion sociale** : Droit fondamental à l'accès à l'information
- **Conformité légale** : Obligation légale en France (RGAA)
- **Amélioration SEO** : Meilleur référencement
- **Expérience utilisateur** : Interface plus intuitive pour tous
- **Économie** : Marché plus large, réduction des coûts de support

### Impact des handicaps sur le web

| Type de handicap | Difficultés rencontrées | Solutions |
|------------------|------------------------|-----------|
| **Visuel** | Ne voient pas les couleurs, images, texte | Alt text, contraste, structure |
| **Auditif** | N'entendent pas les sons, vidéos | Sous-titres, transcriptions |
| **Moteur** | Ne peuvent pas utiliser la souris | Navigation clavier, zones cliquables |
| **Cognitif** | Difficulté de compréhension | Langage simple, structure claire |

---

## 📊 Standards et Conformité

### WCAG (Web Content Accessibility Guidelines)

**WCAG 2.1** est le standard international avec 3 niveaux :
- **A** : Niveau minimal (conformité de base)
- **AA** : Niveau standard (conformité recommandée)
- **AAA** : Niveau élevé (conformité maximale)

### RAWeb (Référentiel Général d'Amélioration de l'Accessibilité)

**RAWeb** est le référentiel français basé sur WCAG 2.1 avec 4 critères :

#### 🎯 Critères RGAA

| Critère | Description | Exemples |
|---------|-------------|----------|
| **Images** | Alternative textuelle | Alt text, légendes |
| **Cadres** | Titre et alternative | iframe, title |
| **Couleurs** | Information non colorielle | Indicateurs visuels |
| **Multimédia** | Sous-titres, transcriptions | Vidéos, audio |

#### 📊 Niveaux de Conformité RAWeb

| Niveau | Description | Exigences |
|--------|-------------|-----------|
| **A** | Conformité de base | Critères essentiels |
| **AA** | Conformité standard | Critères recommandés |
| **AAA** | Conformité élevée | Critères avancés |

### Checklist de Conformité

```markdown
## ✅ Checklist Accessibilité

### Structure et Navigation
- [ ] Titres hiérarchisés (H1, H2, H3...)
- [ ] Structure sémantique claire
- [ ] Navigation au clavier possible
- [ ] Liens d'évitement (skip links)

### Images et Médias
- [ ] Texte alternatif pour toutes les images
- [ ] Sous-titres pour les vidéos
- [ ] Transcription pour l'audio
- [ ] Pas d'information uniquement visuelle

### Formulaires
- [ ] Labels associés aux champs
- [ ] Messages d'erreur clairs
- [ ] Validation en temps réel
- [ ] Instructions d'aide

### Couleurs et Contraste
- [ ] Contraste suffisant (4.5:1 minimum)
- [ ] Information non uniquement colorielle
- [ ] Test avec daltonisme
- [ ] Mode sombre/clair
```

---

## 🏗️ HTML Sémantique

### Structure Sémantique

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Accessible</title>
</head>
<body>
  <!-- Skip Links -->
  <a href="#main" class="skip-link">Aller au contenu principal</a>
  <a href="#nav" class="skip-link">Aller à la navigation</a>

  <!-- En-tête -->
  <header role="banner">
    <nav role="navigation" id="nav" aria-label="Navigation principale">
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Contenu principal -->
  <main id="main" role="main">
    <article>
      <header>
        <h1>Titre de l'article</h1>
        <time datetime="2024-01-01">1er janvier 2024</time>
      </header>
      
      <section>
        <h2>Section 1</h2>
        <p>Contenu de la section...</p>
      </section>
      
      <section>
        <h2>Section 2</h2>
        <p>Contenu de la section...</p>
      </section>
    </article>

    <!-- Contenu secondaire -->
    <aside role="complementary" aria-label="Informations complémentaires">
      <h2>Articles connexes</h2>
      <ul>
        <li><a href="/article-1">Article 1</a></li>
        <li><a href="/article-2">Article 2</a></li>
      </ul>
    </aside>
  </main>

  <!-- Pied de page -->
  <footer role="contentinfo">
    <p>&copy; 2024 Mon Site. Tous droits réservés.</p>
  </footer>
</body>
</html>
```

### Éléments Sémantiques Essentiels

| Élément | Rôle | Usage | Accessibilité |
|---------|------|-------|---------------|
| `<header>` | Banner | En-tête de page/section | Navigation principale |
| `<nav>` | Navigation | Menu de navigation | Liste de liens |
| `<main>` | Main | Contenu principal | Point d'entrée principal |
| `<article>` | Article | Contenu autonome | Article indépendant |
| `<section>` | Section | Section thématique | Regroupement logique |
| `<aside>` | Complementary | Contenu secondaire | Informations complémentaires |
| `<footer>` | Contentinfo | Pied de page | Informations sur la page |

### Hiérarchie des Titres

```html
<!-- ✅ Bon : Hiérarchie logique -->
<h1>Titre principal de la page</h1>
  <h2>Section principale</h2>
    <h3>Sous-section</h3>
      <h4>Détail</h4>
    <h3>Autre sous-section</h3>
  <h2>Autre section principale</h2>

<!-- ❌ Éviter : Hiérarchie cassée -->
<h1>Titre principal</h1>
  <h3>Sous-section (manque H2)</h3>
    <h2>Section (mauvaise hiérarchie)</h2>
```

### Landmarks et Régions

```html
<!-- Définir des régions accessibles -->
<div role="banner">En-tête</div>
<div role="navigation" aria-label="Menu principal">Navigation</div>
<div role="main">Contenu principal</div>
<div role="complementary">Contenu secondaire</div>
<div role="contentinfo">Pied de page</div>

<!-- Régions personnalisées -->
<div role="region" aria-label="Panneau de recherche">
  <h2>Recherche</h2>
  <!-- Contenu de recherche -->
</div>
```

---

## 🎯 Attributs ARIA

### Introduction à ARIA

**ARIA (Accessible Rich Internet Applications)** étend HTML pour améliorer l'accessibilité des applications web dynamiques.

### Rôles ARIA

```html
<!-- Rôles de structure -->
<div role="banner">En-tête</div>
<div role="navigation">Navigation</div>
<div role="main">Contenu principal</div>
<div role="complementary">Contenu secondaire</div>
<div role="contentinfo">Pied de page</div>

<!-- Rôles de composants -->
<button role="button">Bouton</button>
<input role="textbox">Zone de texte</input>
<div role="dialog" aria-labelledby="dialog-title">Modal</div>
<div role="tablist">Liste d'onglets</div>
<div role="tab" aria-selected="true">Onglet actif</div>
```

### États et Propriétés ARIA

```html
<!-- États -->
<button aria-pressed="true">Bouton pressé</button>
<div aria-expanded="false">Contenu replié</div>
<input aria-invalid="true" aria-describedby="error-message">Champ invalide</input>
<div aria-hidden="true">Contenu masqué aux lecteurs d'écran</div>

<!-- Propriétés -->
<div aria-labelledby="title-id">Élément avec label</div>
<div aria-describedby="description-id">Élément avec description</div>
<div aria-required="true">Champ obligatoire</div>
<input aria-autocomplete="list" aria-activedescendant="option-1">Autocomplétion</input>
```

### ARIA Live Regions

```html
<!-- Messages dynamiques -->
<div aria-live="polite" aria-atomic="true" id="status-message">
  <!-- Messages de statut -->
</div>

<div aria-live="assertive" aria-atomic="false" id="error-message">
  <!-- Messages d'erreur urgents -->
</div>

<!-- JavaScript pour mettre à jour -->
<script>
function updateStatus(message) {
  document.getElementById('status-message').textContent = message;
}

function showError(error) {
  document.getElementById('error-message').textContent = error;
}
</script>
```

### Patterns ARIA Communs

#### Modal Dialog

```html
<div role="dialog" 
     aria-labelledby="modal-title" 
     aria-describedby="modal-description"
     aria-modal="true">
  <h2 id="modal-title">Titre de la modal</h2>
  <p id="modal-description">Description de la modal</p>
  
  <button aria-label="Fermer la modal">×</button>
  <button>Annuler</button>
  <button>Confirmer</button>
</div>
```

#### Menu Dropdown

```html
<button aria-expanded="false" 
        aria-haspopup="true" 
        aria-controls="menu"
        id="menu-button">
  Menu
</button>

<ul role="menu" 
    aria-labelledby="menu-button" 
    id="menu"
    style="display: none;">
  <li role="none">
    <a role="menuitem" href="/item1">Recommandations</a>
  </li>
  <li role="none">
    <a role="menuitem" href="/item2">Recherche</a>
  </li>
</ul>
```

#### Onglets (Tabs)

```html
<div role="tablist" aria-label="Navigation par onglets">
  <button role="tab" 
          aria-selected="true" 
          aria-controls="panel1"
          id="tab1">
    Onglet 1
  </button>
  <button role="tab" 
          aria-selected="false" 
          aria-controls="panel2"
          id="tab2">
    Onglet 2
  </button>
</div>

<div role="tabpanel" 
     aria-labelledby="tab1" 
     id="panel1">
  Contenu de l'onglet 1
</div>

<div role="tabpanel" 
     aria-labelledby="tab2" 
     id="panel2" 
     aria-hidden="true">
  Contenu de l'onglet 2
</div>
```

---

## ⌨️ Navigation Clavier

### Principes de Navigation Clavier

La navigation clavier doit permettre d'accéder à tous les éléments interactifs sans souris.

### Ordre de Tabulation

```html
<!-- Ordre logique de tabulation -->
<form>
  <label for="nom">Nom :</label>
  <input type="text" id="nom" tabindex="0">
  
  <label for="email">Email :</label>
  <input type="email" id="email" tabindex="0">
  
  <button type="submit" tabindex="0">Envoyer</button>
</form>
```

### Gestion du Focus

```css
/* Styles de focus visibles */
*:focus {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* Focus personnalisé */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.3);
}

/* Focus pour les lecteurs d'écran uniquement */
.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem;
  background: #000;
  color: #fff;
}
```

### Skip Links (Liens d'évitement)

```html
<!-- Liens pour éviter la navigation -->
<a href="#main" class="skip-link">Aller au contenu principal</a>
<a href="#nav" class="skip-link">Aller à la navigation</a>
<a href="#search" class="skip-link">Aller à la recherche</a>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
</style>
```

### Raccourcis Clavier

```javascript
// Gestion des raccourcis clavier
document.addEventListener('keydown', function(event) {
  // Échap pour fermer les modales
  if (event.key === 'Escape') {
    closeModal();
  }
  
  // Entrée pour activer les boutons
  if (event.key === 'Enter' && event.target.tagName === 'BUTTON') {
    event.target.click();
  }
  
  // Espace pour les boutons et liens
  if (event.key === ' ' && event.target.tagName === 'BUTTON') {
    event.preventDefault();
    event.target.click();
  }
});
```

### Zones Cliquables

```css
/* Zones cliquables suffisamment grandes */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

/* Espacement entre les éléments cliquables */
.nav-item {
  margin: 8px;
}

/* Zones de clic étendues */
.card {
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
}
```

---

## 🔊 Lecteurs d'Écran

### Comment Fonctionnent les Lecteurs d'Écran

Les lecteurs d'écran convertissent le contenu web en parole synthétique ou en braille.

### Structure pour les Lecteurs d'Écran

```html
<!-- Structure sémantique claire -->
<main>
  <h1>Titre principal</h1>
  
  <nav aria-label="Navigation principale">
    <h2>Navigation</h2>
    <ul>
      <li><a href="/">Accueil</a></li>
      <li><a href="/services">Services</a></li>
    </ul>
  </nav>
  
  <article>
    <h2>Article principal</h2>
    <p>Contenu de l'article...</p>
  </article>
</main>
```

### Texte Alternatif pour les Images

```html
<!-- ✅ Bon : Description informative -->
<img src="graphique-ventes.png" 
     alt="Graphique montrant une augmentation des ventes de 25% en 2024">

<!-- ✅ Bon : Image décorative -->
<img src="decoration.png" alt="" role="presentation">

<!-- ❌ Éviter : Description vague -->
<img src="graphique.png" alt="Graphique">

<!-- ❌ Éviter : Oublier l'alt -->
<img src="image.png">
```

### Formulaires Accessibles

```html
<!-- Labels associés -->
<label for="nom">Nom complet :</label>
<input type="text" id="nom" name="nom" required>

<!-- Groupes de champs -->
<fieldset>
  <legend>Informations de contact</legend>
  
  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required>
  
  <label for="telephone">Téléphone :</label>
  <input type="tel" id="telephone" name="telephone">
</fieldset>

<!-- Messages d'erreur -->
<label for="age">Âge :</label>
<input type="number" id="age" name="age" aria-invalid="true" aria-describedby="age-error">
<span id="age-error" role="alert">L'âge doit être un nombre positif</span>
```

### Contenu Masqué

```html
<!-- Masquer visuellement mais garder pour les lecteurs d'écran -->
<span class="sr-only">Texte pour lecteurs d'écran uniquement</span>

<!-- Masquer complètement -->
<div aria-hidden="true">Contenu décoratif masqué</div>

<style>
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
</style>
```

---

## 🎨 Couleur et Contraste

### Ratios de Contraste WCAG

| Niveau | Ratio Normal | Ratio Large | Usage |
|--------|--------------|-------------|-------|
| **AA** | 4.5:1 | 3:1 | Standard recommandé |
| **AAA** | 7:1 | 4.5:1 | Niveau élevé |

### Test de Contraste

```css
/* ✅ Bon : Contraste suffisant */
.text-primary {
  color: #000000; /* Noir sur blanc = 21:1 */
  background: #ffffff;
}

.text-secondary {
  color: #333333; /* Gris foncé sur blanc = 12.6:1 */
  background: #ffffff;
}

/* ❌ Éviter : Contraste insuffisant */
.text-low-contrast {
  color: #999999; /* Gris clair sur blanc = 2.8:1 */
  background: #ffffff;
}
```

### Information Non Uniquement Colorielle

```html
<!-- ✅ Bon : Information par couleur ET icône -->
<div class="status">
  <span class="status-icon" aria-label="Statut">✅</span>
  <span>Commande confirmée</span>
</div>

<!-- ✅ Bon : Information par couleur ET texte -->
<button class="button button--success">
  <span class="sr-only">Succès : </span>
  Valider
</button>

<!-- ❌ Éviter : Information uniquement par couleur -->
<div class="status success"></div> <!-- Rouge = erreur, Vert = succès -->
```

### Mode Sombre/Clair

```css
/* Variables CSS pour les thèmes */
:root {
  --color-text: #000000;
  --color-bg: #ffffff;
  --color-primary: #0066cc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #ffffff;
    --color-bg: #000000;
    --color-primary: #66b3ff;
  }
}

/* Utilisation des variables */
body {
  color: var(--color-text);
  background: var(--color-bg);
}

.button {
  background: var(--color-primary);
  color: var(--color-bg);
}
```

### Test de Daltonisme

```html
<!-- Test avec différents types de daltonisme -->
<div class="color-test">
  <span class="red">Rouge</span>
  <span class="green">Vert</span>
  <span class="blue">Bleu</span>
</div>

<style>
/* Simulation de daltonisme */
.color-test.protanopia .red { color: #000000; }
.color-test.deuteranopia .green { color: #000000; }
.color-test.tritanopia .blue { color: #000000; }
</style>
```

---

## 🧪 Outils de Test

### Outils Automatisés

#### Lighthouse (Chrome DevTools)

```bash
# Test Lighthouse en ligne de commande
npm install -g lighthouse

# Test d'accessibilité
lighthouse https://example.com --only-categories=accessibility

# Test complet
lighthouse https://example.com --view
```

#### axe DevTools

```html
<!-- Extension axe DevTools -->
<!-- Test automatique des violations WCAG -->
<script>
// Test axe-core
axe.run(document, {
  rules: {
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true },
    'aria-required-attributes': { enabled: true }
  }
}).then(results => {
  console.log('Violations:', results.violations);
});
</script>
```

### Outils de Test Manuel

#### Navigation Clavier

```javascript
// Test de navigation clavier
function testKeyboardNavigation() {
  const focusableElements = document.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  console.log('Éléments focusables:', focusableElements.length);
  
  focusableElements.forEach((element, index) => {
    console.log(`${index + 1}. ${element.tagName} - ${element.textContent || element.value}`);
  });
}
```

#### Test de Contraste

```javascript
// Calcul du ratio de contraste
function getContrastRatio(color1, color2) {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(color) {
  // Conversion hex vers RGB et calcul de la luminance
  const rgb = hexToRgb(color);
  const [r, g, b] = rgb.map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
```

### Lecteurs d'Écran pour Tests

#### NVDA (Windows)

```bash
# Télécharger NVDA
# https://www.nvaccess.org/download/

# Raccourcis clavier NVDA
# NVDA + Q : Quitter
# NVDA + S : Arrêter la parole
# NVDA + H : Lire le titre
# NVDA + K : Lire le lien
```

#### VoiceOver (macOS)

```bash
# Activer VoiceOver
# Cmd + F5

# Raccourcis VoiceOver
# Cmd + F5 : Activer/Désactiver
# Ctrl + Option + A : Annoncer l'élément
# Ctrl + Option + H : Navigation par titre
```

### Checklist de Test

```markdown
## ✅ Checklist de Test d'Accessibilité

### Tests Automatisés
- [ ] Lighthouse Accessibility Score > 90
- [ ] axe DevTools : 0 violation critique
- [ ] WAVE : 0 erreur
- [ ] Contrast Checker : Ratio > 4.5:1

### Tests Manuels
- [ ] Navigation clavier complète
- [ ] Focus visible sur tous les éléments
- [ ] Lecteur d'écran fonctionnel
- [ ] Images avec alt text approprié
- [ ] Formulaires avec labels

### Tests Utilisateurs
- [ ] Test avec utilisateurs handicapés
- [ ] Test sur différents appareils
- [ ] Test avec connexion lente
- [ ] Test sans JavaScript
```

---

## 📝 Formulaires Accessibles

### Structure de Base

```html
<form novalidate>
  <fieldset>
    <legend>Informations personnelles</legend>
    
    <div class="form-group">
      <label for="prenom">Prénom *</label>
      <input type="text" 
             id="prenom" 
             name="prenom" 
             required 
             aria-describedby="prenom-help">
      <small id="prenom-help">Votre prénom sera affiché publiquement</small>
    </div>
    
    <div class="form-group">
      <label for="email">Email *</label>
      <input type="email" 
             id="email" 
             name="email" 
             required 
             aria-invalid="false"
             aria-describedby="email-error">
      <div id="email-error" role="alert" aria-live="polite"></div>
    </div>
    
    <div class="form-group">
      <label for="telephone">Téléphone</label>
      <input type="tel" 
             id="telephone" 
             name="telephone" 
             pattern="[0-9]{10}"
             aria-describedby="telephone-help">
      <small id="telephone-help">Format : 0123456789</small>
    </div>
  </fieldset>
  
  <button type="submit">Envoyer</button>
</form>
```

### Validation en Temps Réel

```javascript
// Validation accessible
function validateField(field) {
  const errorId = field.id + '-error';
  let errorElement = document.getElementById(errorId);
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    field.parentNode.appendChild(errorElement);
  }
  
  const isValid = field.checkValidity();
  
  if (!isValid) {
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = field.validationMessage;
    field.setAttribute('aria-describedby', errorId);
  } else {
    field.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
    field.removeAttribute('aria-describedby');
  }
}

// Écouter les changements
document.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => validateField(field));
});
```

### Groupes de Champs

```html
<!-- Groupes radio -->
<fieldset>
  <legend>Préférences de contact</legend>
  
  <div class="radio-group" role="radiogroup" aria-labelledby="contact-pref">
    <input type="radio" id="email-pref" name="contact" value="email">
    <label for="email-pref">Email</label>
    
    <input type="radio" id="phone-pref" name="contact" value="phone">
    <label for="phone-pref">Téléphone</label>
    
    <input type="radio" id="sms-pref" name="contact" value="sms">
    <label for="sms-pref">SMS</label>
  </div>
</fieldset>

<!-- Groupes checkbox -->
<fieldset>
  <legend>Centres d'intérêt</legend>
  
  <div class="checkbox-group">
    <input type="checkbox" id="tech" name="interests" value="tech">
    <label for="tech">Technologie</label>
    
    <input type="checkbox" id="sport" name="interests" value="sport">
    <label for="sport">Sport</label>
    
    <input type="checkbox" id="culture" name="interests" value="culture">
    <label for="culture">Culture</label>
  </div>
</fieldset>
```

---

## 🎭 Contenu Dynamique

### Mise à Jour de Contenu

```html
<!-- Région live pour les mises à jour -->
<div aria-live="polite" aria-atomic="true" id="status-updates">
  <!-- Mises à jour de statut -->
</div>

<div aria-live="assertive" aria-atomic="false" id="error-messages">
  <!-- Messages d'erreur urgents -->
</div>

<script>
// Mise à jour accessible
function updateStatus(message, type = 'info') {
  const container = document.getElementById(
    type === 'error' ? 'error-messages' : 'status-updates'
  );
  
  container.textContent = message;
  
  // Nettoyer après 5 secondes
  setTimeout(() => {
    container.textContent = '';
  }, 5000);
}

// Exemple d'utilisation
updateStatus('Données sauvegardées avec succès');
updateStatus('Erreur lors de la sauvegarde', 'error');
</script>
```

### Modales Accessibles

```html
<!-- Modal accessible -->
<div id="modal" 
     role="dialog" 
     aria-labelledby="modal-title" 
     aria-describedby="modal-description"
     aria-modal="true"
     aria-hidden="true">
  
  <div class="modal-content">
    <h2 id="modal-title">Confirmer la suppression</h2>
    <p id="modal-description">
      Êtes-vous sûr de vouloir supprimer cet élément ? 
      Cette action est irréversible.
    </p>
    
    <div class="modal-actions">
      <button type="button" id="cancel-btn">Annuler</button>
      <button type="button" id="confirm-btn">Supprimer</button>
    </div>
    
    <button type="button" 
            class="modal-close" 
            aria-label="Fermer la modal">
      ×
    </button>
  </div>
</div>

<script>
// Gestion de la modal
function openModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  
  // Focus sur le premier bouton
  document.getElementById('cancel-btn').focus();
  
  // Piéger le focus dans la modal
  trapFocus(modal);
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  
  // Restaurer le focus
  document.getElementById('open-modal-btn').focus();
}

// Piégeage du focus
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
    
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}
</script>
```

### Navigation par Onglets

```html
<!-- Onglets accessibles -->
<div class="tabs">
  <div role="tablist" aria-label="Navigation par onglets">
    <button role="tab" 
            aria-selected="true" 
            aria-controls="panel1"
            id="tab1"
            tabindex="0">
      Onglet 1
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="panel2"
            id="tab2"
            tabindex="-1">
      Onglet 2
    </button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="panel3"
            id="tab3"
            tabindex="-1">
      Onglet 3
    </button>
  </div>
  
  <div role="tabpanel" 
       aria-labelledby="tab1" 
       id="panel1">
    Contenu de l'onglet 1
  </div>
  
  <div role="tabpanel" 
       aria-labelledby="tab2" 
       id="panel2"
       aria-hidden="true">
    Contenu de l'onglet 2
  </div>
  
  <div role="tabpanel" 
       aria-labelledby="tab3" 
       id="panel3"
       aria-hidden="true">
    Contenu de l'onglet 3
  </div>
</div>

<script>
// Gestion des onglets
function switchTab(tabId) {
  // Désactiver tous les onglets
  document.querySelectorAll('[role="tab"]').forEach(tab => {
    tab.setAttribute('aria-selected', 'false');
    tab.setAttribute('tabindex', '-1');
  });
  
  // Masquer tous les panneaux
  document.querySelectorAll('[role="tabpanel"]').forEach(panel => {
    panel.setAttribute('aria-hidden', 'true');
  });
  
  // Activer l'onglet sélectionné
  const activeTab = document.getElementById(tabId);
  const activePanel = document.getElementById(activeTab.getAttribute('aria-controls'));
  
  activeTab.setAttribute('aria-selected', 'true');
  activeTab.setAttribute('tabindex', '0');
  activePanel.setAttribute('aria-hidden', 'false');
  activeTab.focus();
}

// Navigation clavier
document.querySelectorAll('[role="tab"]').forEach(tab => {
  tab.addEventListener('keydown', function(e) {
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const currentIndex = tabs.indexOf(this);
    
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % tabs.length;
        switchTab(tabs[nextIndex].id);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        switchTab(tabs[prevIndex].id);
        break;
      case 'Home':
        e.preventDefault();
        switchTab(tabs[0].id);
        break;
      case 'End':
        e.preventDefault();
        switchTab(tabs[tabs.length - 1].id);
        break;
    }
  });
});
</script>
```

---

## 📱 Responsive et Mobile

### Design Responsive Accessible

```css
/* Breakpoints accessibles */
@media (max-width: 768px) {
  /* Navigation mobile */
  .nav-menu {
    display: none;
  }
  
  .nav-toggle {
    display: block;
  }
  
  /* Zones de toucher plus grandes */
  .button {
    min-height: 48px;
    min-width: 48px;
  }
  
  /* Texte plus lisible */
  body {
    font-size: 16px;
    line-height: 1.5;
  }
}

/* Mode paysage */
@media (orientation: landscape) {
  .modal {
    max-height: 90vh;
    overflow-y: auto;
  }
}
```

### Navigation Mobile

```html
<!-- Navigation mobile accessible -->
<nav role="navigation" aria-label="Navigation principale">
  <button class="nav-toggle" 
          aria-expanded="false" 
          aria-controls="nav-menu"
          aria-label="Ouvrir le menu">
    <span class="hamburger"></span>
  </button>
  
  <ul id="nav-menu" class="nav-menu">
    <li><a href="/">Accueil</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<script>
// Gestion du menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');

navToggle.addEventListener('click', function() {
  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  
  this.setAttribute('aria-expanded', !isExpanded);
  navMenu.classList.toggle('nav-menu--open');
  
  // Focus sur le premier lien du menu
  if (!isExpanded) {
    navMenu.querySelector('a').focus();
  }
});
</script>
```

### Gestes Tactiles

```css
/* Zones de toucher optimisées */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Espacement entre les éléments */
.touch-list li {
  margin: 8px 0;
}

/* Feedback tactile */
.button:active {
  transform: scale(0.98);
  transition: transform 0.1s;
}
```

---

## 🎯 Bonnes Pratiques

### Checklist de Développement

```markdown
## ✅ Checklist Accessibilité par Phase

### Phase Conception
- [ ] Structure sémantique définie
- [ ] Hiérarchie des titres planifiée
- [ ] Navigation clavier prévue
- [ ] Contraste des couleurs vérifié
- [ ] Zones de toucher dimensionnées

### Phase Développement
- [ ] HTML sémantique utilisé
- [ ] Labels associés aux formulaires
- [ ] Alt text pour toutes les images
- [ ] Focus visible sur tous les éléments
- [ ] ARIA utilisé quand nécessaire

### Phase Test
- [ ] Tests automatisés passés
- [ ] Navigation clavier fonctionnelle
- [ ] Lecteur d'écran testé
- [ ] Contraste vérifié
- [ ] Tests utilisateurs réalisés
```

### Optimisations Performance

```javascript
// Chargement progressif accessible
function loadContentAccessibly(url, container) {
  // Afficher un indicateur de chargement
  const loader = document.createElement('div');
  loader.setAttribute('aria-live', 'polite');
  loader.textContent = 'Chargement en cours...';
  container.appendChild(loader);
  
  fetch(url)
    .then(response => response.text())
    .then(html => {
      // Retirer l'indicateur
      loader.remove();
      
      // Ajouter le contenu
      container.innerHTML = html;
      
      // Annoncer le chargement terminé
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.textContent = 'Contenu chargé';
      container.appendChild(announcement);
      
      setTimeout(() => announcement.remove(), 3000);
    })
    .catch(error => {
      loader.remove();
      const errorMsg = document.createElement('div');
      errorMsg.setAttribute('role', 'alert');
      errorMsg.textContent = 'Erreur lors du chargement';
      container.appendChild(errorMsg);
    });
}
```

### Maintenance et Évolution

```javascript
// Audit d'accessibilité automatique
function accessibilityAudit() {
  const issues = [];
  
  // Vérifier les images sans alt
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  imagesWithoutAlt.forEach(img => {
    issues.push(`Image sans alt text: ${img.src}`);
  });
  
  // Vérifier les liens sans texte
  const linksWithoutText = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
  linksWithoutText.forEach(link => {
    if (!link.textContent.trim()) {
      issues.push(`Lien sans texte: ${link.href}`);
    }
  });
  
  // Vérifier les formulaires sans labels
  const inputsWithoutLabels = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
  inputsWithoutLabels.forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label) {
      issues.push(`Champ sans label: ${input.name || input.id}`);
    }
  });
  
  return issues;
}

// Exécuter l'audit
console.log('Problèmes d\'accessibilité:', accessibilityAudit());
```

---

## 📚 Ressources

### Documentation Officielle
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [RGAA 4.1 (France)](https://references.modernisation.gouv.fr/rgaa-accessibilite/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Outils de Test
- [axe DevTools](https://www.deque.com/axe/devtools/) - Extension navigateur
- [WAVE](https://wave.webaim.org/) - Test en ligne
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Audit Chrome
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Test de contraste

### Lecteurs d'Écran
- [NVDA](https://www.nvaccess.org/) - Windows (gratuit)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) - Windows (payant)
- [VoiceOver](https://www.apple.com/accessibility/vision/) - macOS (intégré)
- [Orca](https://help.gnome.org/users/orca/) - Linux (gratuit)

### Communauté et Formation
- [WebAIM](https://webaim.org/) - Ressources et formations
- [A11y Project](https://www.a11yproject.com/) - Communauté
- [Accessibility Weekly](https://a11yweekly.com/) - Newsletter
- [Inclusive Design Principles](https://inclusivedesignprinciples.org/) - Principes

### Framework et Bibliothèques
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Composants accessibles React
- [Vue A11y](https://vue-a11y.com/) - Accessibilité Vue.js
- [Angular CDK A11y](https://material.angular.io/cdk/a11y/overview) - Outils Angular
- [Headless UI](https://headlessui.dev/) - Composants accessibles

---

*Cette documentation couvre les aspects essentiels de l'accessibilité web selon les standards RAWeb/WCAG pour créer des sites web inclusifs et conformes aux réglementations françaises.*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

