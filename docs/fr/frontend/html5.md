# 🌐 HTML5 - Guide Complet

> **HTML5** est la dernière version du langage de balisage standard utilisé pour structurer le contenu web. Il introduit de nouveaux éléments sémantiques et des API améliorées, facilitant la création de sites web accessibles et performants.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-html5)
- [🚀 Introduction](#-introduction)
- [🟢 Structure et Éléments de Base](#-débutant---structure-et-éléments-de-base)
- [🟡 Sémantique et Accessibilité](#-intermédiaire---sémantique-et-accessibilité)
- [🟠 Formulaires et API](#-confirmé---formulaires-et-api)
- [🔴 Performance et SEO](#-senior---performance-et-seo)
- [⚫ Web Components et PWA](#-expert---web-components-et-pwa)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète HTML5

### 🎯 Éléments Sémantiques

| Élément | Description | Utilisation | Accessibilité |
|---------|-------------|-------------|---------------|
| **`<header>`** | En-tête de page ou section | Navigation, logo, titre principal | Landmark pour lecteurs d'écran |
| **`<nav>`** | Section de navigation | Menu principal, breadcrumbs, pagination | Navigation principale identifiée |
| **`<main>`** | Contenu principal unique | Contenu principal de la page | Point d'entrée principal |
| **`<section>`** | Section thématique | Groupement de contenu lié | Structure hiérarchique claire |
| **`<article>`** | Contenu autonome | Article de blog, actualité, commentaire | Contenu réutilisable |
| **`<aside>`** | Contenu complémentaire | Barre latérale, publicité, notes | Contenu secondaire |
| **`<footer>`** | Pied de page | Informations de contact, copyright | Informations de fin |
| **`<figure>`** | Contenu multimédia | Image, diagramme, code | Contenu illustratif |
| **`<figcaption>`** | Légende de figure | Description de l'image | Alternative textuelle |
| **`<time>`** | Date et heure | Horodatage, événements | Information temporelle |
| **`<mark>`** | Texte surligné | Recherche, importance | Mise en évidence |
| **`<progress>`** | Barre de progression | Téléchargement, tâche | État de progression |
| **`<meter>`** | Mesure dans une plage | Score, pourcentage | Valeur mesurée |

### 🎯 Éléments de Structure

| Élément | Description | Attributs | Utilisation |
|---------|-------------|-----------|-------------|
| **`<div>`** | Conteneur générique | `class`, `id`, `data-*` | Groupement sans sémantique |
| **`<span>`** | Inline générique | `class`, `id`, `data-*` | Style inline |
| **`<p>`** | Paragraphe | `class`, `id` | Texte structuré |
| **`<br>`** | Saut de ligne | Aucun | Retour à la ligne |
| **`<hr>`** | Séparateur horizontal | `class`, `id` | Séparation thématique |
| **`<pre>`** | Texte préformaté | `class`, `id` | Code, poésie |
| **`<code>`** | Code inline | `class`, `id` | Code dans le texte |
| **`<blockquote>`** | Citation longue | `cite` | Citation externe |
| **`<q>`** | Citation courte | `cite` | Citation inline |

### 🎯 Éléments de Titre

| Élément | Description | Accessibilité |
|---------|-------------|---------------|
| **`<h1>`** | Titre principal | Titre de page unique |
| **`<h2>`** | Sous-titre | Section principale |
| **`<h3>`** | Sous-sous-titre | Sous-section |
| **`<h4>`** | Titre niveau 4 | Détail de section |
| **`<h5>`** | Titre niveau 5 | Sous-détail |
| **`<h6>`** | Titre niveau 6 | Détail mineur |

### 🎯 Éléments de Liste

| Élément | Description | Attributs | Utilisation |
|---------|-------------|-----------|-------------|
| **`<ul>`** | Liste non ordonnée | `class`, `id` | Liste à puces |
| **`<ol>`** | Liste ordonnée | `type`, `start`, `reversed` | Liste numérotée |
| **`<li>`** | Élément de liste | `value` (ol) | Item de liste |
| **`<dl>`** | Liste de définitions | `class`, `id` | Glossaire |
| **`<dt>`** | Terme de définition | Aucun | Mot à définir |
| **`<dd>`** | Définition | Aucun | Explication |

### 🎯 Éléments de Tableau

| Élément | Description | Attributs | Accessibilité |
|---------|-------------|-----------|---------------|
| **`<table>`** | Tableau | `border`, `cellpadding`, `cellspacing` | Structure tabulaire |
| **`<caption>`** | Légende de tableau | Aucun | Description du tableau |
| **`<thead>`** | En-tête de tableau | Aucun | En-têtes de colonnes |
| **`<tbody>`** | Corps de tableau | Aucun | Données principales |
| **`<tfoot>`** | Pied de tableau | Aucun | Résumé, totaux |
| **`<tr>`** | Ligne de tableau | Aucun | Rangée de données |
| **`<th>`** | Cellule d'en-tête | `colspan`, `rowspan`, `scope` | En-tête de colonne/ligne |
| **`<td>`** | Cellule de données | `colspan`, `rowspan` | Donnée de cellule |
| **`<colgroup>`** | Groupe de colonnes | `span` | Style de colonnes |
| **`<col>`** | Colonne | `span` | Style de colonne |

### 🎯 Éléments de Formulaire

| Élément | Description | Attributs | Type |
|---------|-------------|-----------|------|
| **`<form>`** | Formulaire | `action`, `method`, `enctype` | Conteneur de formulaire |
| **`<input>`** | Champ de saisie | `type`, `name`, `value`, `required` | Saisie utilisateur |
| **`<textarea>`** | Zone de texte | `rows`, `cols`, `maxlength` | Texte multiligne |
| **`<select>`** | Liste déroulante | `name`, `multiple`, `size` | Sélection d'option |
| **`<option>`** | Option de sélection | `value`, `selected` | Choix dans select |
| **`<optgroup>`** | Groupe d'options | `label` | Groupement d'options |
| **`<button>`** | Bouton | `type`, `disabled` | Action utilisateur |
| **`<label>`** | Étiquette | `for` | Association champ-étiquette |
| **`<fieldset>`** | Groupe de champs | Aucun | Groupement logique |
| **`<legend>`** | Légende de groupe | Aucun | Titre du fieldset |
| **`<datalist>`** | Liste de suggestions | Aucun | Autocomplétion |
| **`<output>`** | Résultat de calcul | `for` | Résultat de formulaire |

### 🎯 Types d'Input HTML5

| Type | Description | Validation | Exemple |
|------|-------------|------------|---------|
| **`text`** | Texte simple | Aucune | Nom, prénom |
| **`email`** | Adresse email | Format email | user@example.com |
| **`url`** | URL | Format URL | https://example.com |
| **`tel`** | Numéro de téléphone | Aucune | +33 1 23 45 67 89 |
| **`password`** | Mot de passe | Aucune | Texte masqué |
| **`number`** | Nombre | Valeur numérique | 42, 3.14 |
| **`range`** | Curseur | Plage de valeurs | 0-100 |
| **`date`** | Date | Format date | 2024-01-15 |
| **`time`** | Heure | Format heure | 14:30 |
| **`datetime-local`** | Date et heure | Format datetime | 2024-01-15T14:30 |
| **`month`** | Mois | Format mois | 2024-01 |
| **`week`** | Semaine | Format semaine | 2024-W03 |
| **`color`** | Couleur | Valeur couleur | #ff0000 |
| **`file`** | Fichier | Fichier valide | image.jpg |
| **`checkbox`** | Case à cocher | Booléen | true/false |
| **`radio`** | Bouton radio | Sélection unique | Option A/B/C |
| **`submit`** | Soumission | Envoi formulaire | Envoyer |
| **`reset`** | Réinitialisation | Remise à zéro | Effacer |
| **`button`** | Bouton générique | Action personnalisée | Cliquer |
| **`hidden`** | Champ caché | Valeur masquée | Token CSRF |

### 🎯 Éléments Multimédia

| Élément | Description | Attributs | Utilisation |
|---------|-------------|-----------|-------------|
| **`<img>`** | Image | `src`, `alt`, `width`, `height` | Images statiques |
| **`<video>`** | Vidéo | `src`, `controls`, `autoplay` | Contenu vidéo |
| **`<audio>`** | Audio | `src`, `controls`, `loop` | Contenu audio |
| **`<source>`** | Source multimédia | `src`, `type` | Format alternatif |
| **`<track>`** | Piste de sous-titres | `src`, `kind`, `srclang` | Sous-titres, descriptions |
| **`<canvas>`** | Zone de dessin | `width`, `height` | Graphiques 2D |
| **`<svg>`** | Graphique vectoriel | `width`, `height`, `viewBox` | Images vectorielles |
| **`<iframe>`** | Cadre intégré | `src`, `width`, `height` | Contenu externe |
| **`<embed>`** | Contenu intégré | `src`, `type` | Plugin externe |
| **`<object>`** | Objet multimédia | `data`, `type` | Contenu externe |
| **`<param>`** | Paramètre d'objet | `name`, `value` | Configuration d'objet |

### 🎯 Attributs Globaux

| Attribut | Description | Valeurs | Utilisation |
|----------|-------------|---------|-------------|
| **`id`** | Identifiant unique | Texte unique | Référence CSS/JS |
| **`class`** | Classes CSS | Liste de classes | Style et sélection |
| **`style`** | Style inline | CSS inline | Style direct |
| **`title`** | Titre d'élément | Texte | Info-bulle |
| **`lang`** | Langue | Code ISO | Langue du contenu |
| **`dir`** | Direction | `ltr`, `rtl` | Sens de lecture |
| **`tabindex`** | Ordre de tabulation | Nombre | Navigation clavier |
| **`accesskey`** | Raccourci clavier | Caractère | Accès rapide |
| **`contenteditable`** | Édition | `true`, `false` | Contenu modifiable |
| **`draggable`** | Glisser-déposer | `true`, `false` | Élément déplaçable |
| **`hidden`** | Masqué | Aucune | Élément invisible |
| **`spellcheck`** | Vérification orthographique | `true`, `false` | Correction automatique |
| **`translate`** | Traduction | `yes`, `no` | Traduction automatique |

### 🎯 Attributs ARIA

| Attribut | Description | Valeurs | Accessibilité |
|----------|-------------|---------|---------------|
| **`role`** | Rôle sémantique | `button`, `dialog`, `menu` | Rôle de l'élément |
| **`aria-label`** | Étiquette accessible | Texte | Description courte |
| **`aria-labelledby`** | Référence d'étiquette | ID d'élément | Étiquette externe |
| **`aria-describedby`** | Description | ID d'élément | Description détaillée |
| **`aria-expanded`** | État d'expansion | `true`, `false` | Contenu déplié |
| **`aria-hidden`** | Masqué des lecteurs | `true`, `false` | Élément décoratif |
| **`aria-required`** | Champ obligatoire | `true`, `false` | Validation |
| **`aria-invalid`** | Valeur invalide | `true`, `false` | État d'erreur |
| **`aria-live`** | Région dynamique | `polite`, `assertive` | Mise à jour temps réel |
| **`aria-atomic`** | Mise à jour atomique | `true`, `false` | Mise à jour complète |

### 🎯 Éléments de Métadonnées

| Élément | Description | Attributs | Utilisation |
|---------|-------------|-----------|-------------|
| **`<head>`** | En-tête de document | Aucun | Métadonnées |
| **`<title>`** | Titre de page | Aucun | Titre de l'onglet |
| **`<meta>`** | Métadonnée | `name`, `content`, `charset` | Information sur la page |
| **`<link>`** | Lien externe | `rel`, `href`, `type` | CSS, icônes, préchargement |
| **`<style>`** | CSS inline | `type`, `media` | Styles dans la page |
| **`<script>`** | JavaScript | `src`, `type`, `async` | Code JavaScript |
| **`<noscript>`** | Contenu sans JS | Aucun | Alternative sans JavaScript |
| **`<base>`** | URL de base | `href`, `target` | URL relative |

---

## 🚀 Introduction

HTML5 est la cinquième et dernière version majeure du langage de balisage HTML. Il apporte de nombreuses améliorations en termes de sémantique, d'accessibilité, de performance et de fonctionnalités multimédia.

### Qu'est-ce qu'HTML5 ?
HTML5 est un langage de balisage qui structure le contenu des pages web. Il introduit de nouveaux éléments sémantiques, des API JavaScript avancées et des fonctionnalités multimédia intégrées, tout en maintenant la compatibilité avec les versions précédentes.

### Pourquoi choisir HTML5 ?
- **🎯 Sémantique** : Éléments avec une signification claire
- **♿ Accessibilité** : Support natif des technologies d'assistance
- **📱 Responsive** : Adaptation automatique aux écrans
- **🎨 Multimédia** : Support natif audio/vidéo
- **⚡ Performance** : Optimisations et nouvelles API
- **🔒 Sécurité** : Protection contre les attaques XSS
- **🌐 Standards** : Conformité aux standards web
- **📚 Documentation** : Spécifications claires et complètes

### Meilleures Pratiques d'Accessibilité
- **Structure sémantique** : Utilisez `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **Hiérarchie des titres** : Utilisez `<h1>` à `<h6>` de manière logique
- **Équivalents textuels** : Ajoutez des attributs `alt` descriptifs aux images
- **Navigation clavier** : Assurez-vous que tous les éléments sont accessibles au clavier
- **Contraste suffisant** : Respectez les ratios de contraste WCAG
- **Labels appropriés** : Associez les labels aux champs de formulaire

---

## 🟢 Structure et Éléments de Base

### Structure de base d'un document HTML5

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Site Web</title>
    <meta name="description" content="Description de mon site web">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Titre Principal</h1>
        <nav>
            <ul>
                <li><a href="#accueil">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="accueil">
            <h2>Bienvenue</h2>
            <p>Contenu principal de la page.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Mon Site Web. Tous droits réservés.</p>
    </footer>
</body>
</html>
```

### Éléments de texte de base

```html
<!-- Titres hiérarchiques -->
<h1>Titre Principal (une seule fois par page)</h1>
<h2>Sous-titre de section</h2>
<h3>Sous-sous-titre</h3>

<!-- Paragraphes et texte -->
<p>Ceci est un paragraphe de texte normal.</p>
<p><strong>Texte en gras</strong> et <em>texte en italique</em>.</p>
<p><mark>Texte surligné</mark> et <del>texte barré</del>.</p>

<!-- Citations -->
<blockquote cite="https://example.com">
    <p>Ceci est une citation longue d'une source externe.</p>
</blockquote>
<p>Comme dit <q>citation courte</q> dans le texte.</p>

<!-- Code -->
<pre><code>
function hello() {
    console.log("Hello World!");
}
</code></pre>
<p>Utilisez <code>console.log()</code> pour afficher du texte.</p>
```

### Listes et navigation

```html
<!-- Liste non ordonnée -->
<ul>
    <li>Premier élément</li>
    <li>Deuxième élément</li>
    <li>Troisième élément</li>
</ul>

<!-- Liste ordonnée -->
<ol>
    <li>Première étape</li>
    <li>Deuxième étape</li>
    <li>Troisième étape</li>
</ol>

<!-- Liste de définitions -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>

<!-- Navigation -->
<nav aria-label="Navigation principale">
    <ul>
        <li><a href="#accueil" aria-current="page">Accueil</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>
```

---

## 🟡 Sémantique et Accessibilité

### Structure sémantique avancée

```html
<article>
    <header>
        <h1>Titre de l'article</h1>
        <p class="meta">
            Par <author>John Doe</author> le 
            <time datetime="2024-01-15">15 janvier 2024</time>
        </p>
    </header>
    
    <section>
        <h2>Introduction</h2>
        <p>Introduction de l'article...</p>
    </section>
    
    <section>
        <h2>Contenu principal</h2>
        <p>Contenu de l'article...</p>
        
        <figure>
            <img src="image.jpg" alt="Description de l'image">
            <figcaption>Légende de l'image</figcaption>
        </figure>
    </section>
    
    <aside>
        <h3>Articles similaires</h3>
        <ul>
            <li><a href="article1.html">Article 1</a></li>
            <li><a href="article2.html">Article 2</a></li>
        </ul>
    </aside>
    
    <footer>
        <p>Mots-clés : <mark>HTML5</mark>, <mark>Accessibilité</mark></p>
    </footer>
</article>
```

### Formulaires accessibles

```html
<form action="/submit" method="post" novalidate>
    <fieldset>
        <legend>Informations personnelles</legend>
        
        <div class="form-group">
            <label for="nom">Nom *</label>
            <input type="text" id="nom" name="nom" required 
                   aria-describedby="nom-help">
            <div id="nom-help" class="help-text">
                Votre nom complet
            </div>
        </div>
        
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required
                   aria-describedby="email-help email-error">
            <div id="email-help" class="help-text">
                Nous ne partagerons jamais votre email
            </div>
            <div id="email-error" class="error-text" role="alert">
                Veuillez entrer une adresse email valide
            </div>
        </div>
        
        <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" 
                      aria-describedby="message-help"></textarea>
            <div id="message-help" class="help-text">
                Décrivez votre demande en détail
            </div>
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Préférences</legend>
        
        <div class="form-group">
            <fieldset>
                <legend>Newsletter</legend>
                <input type="radio" id="newsletter-oui" name="newsletter" value="oui">
                <label for="newsletter-oui">Oui, je souhaite recevoir la newsletter</label>
                
                <input type="radio" id="newsletter-non" name="newsletter" value="non">
                <label for="newsletter-non">Non, merci</label>
            </fieldset>
        </div>
        
        <div class="form-group">
            <input type="checkbox" id="conditions" name="conditions" required>
            <label for="conditions">
                J'accepte les <a href="conditions.html" target="_blank">conditions d'utilisation</a> *
            </label>
        </div>
    </fieldset>
    
    <button type="submit">Envoyer</button>
    <button type="reset">Effacer</button>
</form>
```

### Tableaux accessibles

```html
<table>
    <caption>Prix des produits par catégorie</caption>
    <thead>
        <tr>
            <th scope="col">Produit</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Prix HT</th>
            <th scope="col">Prix TTC</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">Ordinateur portable</th>
            <td>Informatique</td>
            <td>800€</td>
            <td>960€</td>
        </tr>
        <tr>
            <th scope="row">Smartphone</th>
            <td>Mobile</td>
            <td>400€</td>
            <td>480€</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row" colspan="3">Total</th>
            <td>1440€</td>
        </tr>
    </tfoot>
</table>
```

---

## 🟠 Formulaires et API

### Formulaires avancés avec validation

```html
<form id="inscription" novalidate>
    <fieldset>
        <legend>Création de compte</legend>
        
        <!-- Nom d'utilisateur avec validation en temps réel -->
        <div class="form-group">
            <label for="username">Nom d'utilisateur *</label>
            <input type="text" id="username" name="username" 
                   pattern="[a-zA-Z0-9_]{3,20}" 
                   title="3-20 caractères alphanumériques et underscores"
                   required aria-describedby="username-help username-error">
            <div id="username-help" class="help-text">
                3-20 caractères, lettres, chiffres et underscores uniquement
            </div>
            <div id="username-error" class="error-text" role="alert"></div>
        </div>
        
        <!-- Email avec validation -->
        <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" 
                   required aria-describedby="email-help email-error">
            <div id="email-help" class="help-text">
                Nous vous enverrons un email de confirmation
            </div>
            <div id="email-error" class="error-text" role="alert"></div>
        </div>
        
        <!-- Mot de passe avec indicateur de force -->
        <div class="form-group">
            <label for="password">Mot de passe *</label>
            <input type="password" id="password" name="password" 
                   minlength="8" required 
                   aria-describedby="password-help password-strength">
            <div id="password-help" class="help-text">
                Minimum 8 caractères avec majuscules, minuscules et chiffres
            </div>
            <div id="password-strength" class="strength-meter" role="progressbar" 
                 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        
        <!-- Confirmation de mot de passe -->
        <div class="form-group">
            <label for="confirm-password">Confirmer le mot de passe *</label>
            <input type="password" id="confirm-password" name="confirm-password" 
                   required aria-describedby="confirm-error">
            <div id="confirm-error" class="error-text" role="alert"></div>
        </div>
        
        <!-- Date de naissance -->
        <div class="form-group">
            <label for="birthdate">Date de naissance</label>
            <input type="date" id="birthdate" name="birthdate" 
                   max="2010-01-01" min="1900-01-01"
                   aria-describedby="birthdate-help">
            <div id="birthdate-help" class="help-text">
                Vous devez avoir au moins 14 ans
            </div>
        </div>
        
        <!-- Téléphone avec format international -->
        <div class="form-group">
            <label for="phone">Téléphone</label>
            <input type="tel" id="phone" name="phone" 
                   pattern="[0-9+\-\s\(\)]{10,20}"
                   placeholder="+33 1 23 45 67 89"
                   aria-describedby="phone-help">
            <div id="phone-help" class="help-text">
                Format international accepté
            </div>
        </div>
        
        <!-- Site web -->
        <div class="form-group">
            <label for="website">Site web</label>
            <input type="url" id="website" name="website" 
                   placeholder="https://example.com"
                   aria-describedby="website-help">
            <div id="website-help" class="help-text">
                URL complète avec http:// ou https://
            </div>
        </div>
        
        <!-- Niveau d'expérience -->
        <div class="form-group">
            <label for="experience">Niveau d'expérience</label>
            <select id="experience" name="experience">
                <option value="">Sélectionnez votre niveau</option>
                <optgroup label="Débutant">
                    <option value="0-1">0-1 an</option>
                </optgroup>
                <optgroup label="Intermédiaire">
                    <option value="2-5">2-5 ans</option>
                </optgroup>
                <optgroup label="Avancé">
                    <option value="6-10">6-10 ans</option>
                    <option value="10+">10+ ans</option>
                </optgroup>
            </select>
        </div>
        
        <!-- Compétences avec datalist -->
        <div class="form-group">
            <label for="skills">Compétences techniques</label>
            <input list="skills-list" id="skills" name="skills" 
                   multiple aria-describedby="skills-help">
            <datalist id="skills-list">
                <option value="HTML5">
                <option value="CSS3">
                <option value="JavaScript">
                <option value="Python">
                <option value="Java">
                <option value="React">
                <option value="Vue.js">
                <option value="Node.js">
            </datalist>
            <div id="skills-help" class="help-text">
                Tapez pour rechercher ou sélectionner dans la liste
            </div>
        </div>
        
        <!-- Barre de progression -->
        <div class="form-group">
            <label for="progress">Niveau de satisfaction</label>
            <input type="range" id="progress" name="progress" 
                   min="0" max="100" value="50" step="10"
                   aria-describedby="progress-value">
            <output id="progress-value" for="progress">50%</output>
        </div>
        
        <!-- Couleur préférée -->
        <div class="form-group">
            <label for="color">Couleur préférée</label>
            <input type="color" id="color" name="color" value="#3498db">
        </div>
    </fieldset>
    
    <div class="form-actions">
        <button type="submit">Créer le compte</button>
        <button type="reset">Effacer</button>
        <button type="button" id="preview">Aperçu</button>
    </div>
</form>
```

### API HTML5 - Géolocalisation

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Géolocalisation</title>
</head>
<body>
    <h1>Géolocalisation</h1>
    
    <button id="getLocation">Obtenir ma position</button>
    <button id="watchLocation">Surveiller ma position</button>
    <button id="stopWatch">Arrêter la surveillance</button>
    
    <div id="location-info">
        <p><strong>Latitude:</strong> <span id="latitude">-</span></p>
        <p><strong>Longitude:</strong> <span id="longitude">-</span></p>
        <p><strong>Précision:</strong> <span id="accuracy">-</span> mètres</p>
        <p><strong>Altitude:</strong> <span id="altitude">-</span> mètres</p>
        <p><strong>Vitesse:</strong> <span id="speed">-</span> m/s</p>
    </div>
    
    <div id="map" style="width: 100%; height: 400px; border: 1px solid #ccc;"></div>
    
    <script>
        let watchId = null;
        
        document.getElementById('getLocation').addEventListener('click', getCurrentPosition);
        document.getElementById('watchLocation').addEventListener('click', startWatching);
        document.getElementById('stopWatch').addEventListener('click', stopWatching);
        
        function getCurrentPosition() {
            if (!navigator.geolocation) {
                alert('Géolocalisation non supportée par ce navigateur.');
                return;
            }
            
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            };
            
            navigator.geolocation.getCurrentPosition(
                showPosition,
                showError,
                options
            );
        }
        
        function startWatching() {
            if (!navigator.geolocation) {
                alert('Géolocalisation non supportée par ce navigateur.');
                return;
            }
            
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };
            
            watchId = navigator.geolocation.watchPosition(
                showPosition,
                showError,
                options
            );
        }
        
        function stopWatching() {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
                watchId = null;
            }
        }
        
        function showPosition(position) {
            document.getElementById('latitude').textContent = position.coords.latitude;
            document.getElementById('longitude').textContent = position.coords.longitude;
            document.getElementById('accuracy').textContent = position.coords.accuracy;
            document.getElementById('altitude').textContent = position.coords.altitude || 'Non disponible';
            document.getElementById('speed').textContent = position.coords.speed || 'Non disponible';
            
            // Afficher sur une carte (nécessite une API de cartes)
            updateMap(position.coords.latitude, position.coords.longitude);
        }
        
        function showError(error) {
            let message = '';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Accès à la géolocalisation refusé par l\'utilisateur.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Informations de géolocalisation non disponibles.';
                    break;
                case error.TIMEOUT:
                    message = 'La requête de géolocalisation a expiré.';
                    break;
                default:
                    message = 'Une erreur inconnue s\'est produite.';
                    break;
            }
            alert('Erreur de géolocalisation: ' + message);
        }
        
        function updateMap(lat, lng) {
            // Ici vous pouvez intégrer une API de cartes comme Google Maps ou OpenStreetMap
            console.log(`Position: ${lat}, ${lng}`);
        }
    </script>
</body>
</html>
```

---

## 🔴 Performance et SEO

### Optimisation des métadonnées

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Métadonnées de base -->
    <title>Mon Site Web - Titre Optimisé SEO</title>
    <meta name="description" content="Description optimisée de 150-160 caractères pour le SEO">
    <meta name="keywords" content="mot-clé1, mot-clé2, mot-clé3">
    <meta name="author" content="Votre Nom">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://example.com/">
    <meta property="og:title" content="Titre pour les réseaux sociaux">
    <meta property="og:description" content="Description pour les réseaux sociaux">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Mon Site Web">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://example.com/">
    <meta name="twitter:title" content="Titre Twitter">
    <meta name="twitter:description" content="Description Twitter">
    <meta name="twitter:image" content="https://example.com/image.jpg">
    <meta name="twitter:creator" content="@votrecompte">
    
    <!-- Métadonnées techniques -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <meta name="theme-color" content="#3498db">
    <meta name="msapplication-TileColor" content="#3498db">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Mon App">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://example.com/page-courante">
    
    <!-- Favicons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- Preload des ressources critiques -->
    <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/css/critical.css" as="style">
    <link rel="preload" href="/js/main.js" as="script">
    
    <!-- DNS Prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//cdn.example.com">
    
    <!-- Styles critiques inline -->
    <style>
        /* CSS critique pour le rendu initial */
        body { font-family: Arial, sans-serif; margin: 0; }
        .header { background: #3498db; color: white; padding: 1rem; }
    </style>
    
    <!-- Styles non-critiques -->
    <link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
</head>
<body>
    <!-- Contenu de la page -->
</body>
</html>
```

### Structure JSON-LD pour le SEO

```html
<!-- Données structurées JSON-LD -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mon Site Web",
  "url": "https://example.com",
  "description": "Description de mon site web",
  "publisher": {
    "@type": "Organization",
    "name": "Mon Entreprise",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>

<!-- Article avec données structurées -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de l'article",
  "description": "Description de l'article",
  "image": "https://example.com/article-image.jpg",
  "author": {
    "@type": "Person",
    "name": "John Doe",
    "url": "https://example.com/author/john-doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Mon Site Web",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/article"
  }
}
</script>
```

---

## ⚫ Web Components et PWA

### Web Components personnalisés

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Components</title>
    <style>
        /* Styles pour le composant personnalisé */
        custom-button {
            --button-color: #3498db;
            --button-hover: #2980b9;
            --button-text: white;
        }
        
        custom-button button {
            background-color: var(--button-color);
            color: var(--button-text);
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        
        custom-button button:hover {
            background-color: var(--button-hover);
        }
        
        custom-button button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <h1>Web Components Personnalisés</h1>
    
    <!-- Utilisation du composant personnalisé -->
    <custom-button 
        text="Cliquez-moi" 
        variant="primary" 
        disabled="false"
        onclick="handleClick()">
    </custom-button>
    
    <custom-button 
        text="Bouton désactivé" 
        variant="secondary" 
        disabled="true">
    </custom-button>
    
    <script>
        // Définition du composant personnalisé
        class CustomButton extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            
            static get observedAttributes() {
                return ['text', 'variant', 'disabled'];
            }
            
            connectedCallback() {
                this.render();
            }
            
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this.render();
                }
            }
            
            render() {
                const text = this.getAttribute('text') || 'Bouton';
                const variant = this.getAttribute('variant') || 'primary';
                const disabled = this.getAttribute('disabled') === 'true';
                const onclick = this.getAttribute('onclick');
                
                this.shadowRoot.innerHTML = `
                    <button 
                        class="${variant}" 
                        ${disabled ? 'disabled' : ''}
                        ${onclick ? `onclick="${onclick}"` : ''}>
                        ${text}
                    </button>
                `;
            }
        }
        
        // Enregistrement du composant
        customElements.define('custom-button', CustomButton);
        
        // Fonction de gestion des clics
        function handleClick() {
            alert('Bouton cliqué !');
        }
    </script>
</body>
</html>
```

### Service Worker pour PWA

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA - Progressive Web App</title>
    
    <!-- Manifest PWA -->
    <link rel="manifest" href="/manifest.json">
    
    <!-- Meta tags PWA -->
    <meta name="theme-color" content="#3498db">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Mon PWA">
    
    <!-- Icônes PWA -->
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png">
    
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        
        .install-prompt {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            display: none;
        }
        
        .install-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        
        .status {
            margin: 20px 0;
            padding: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Mon PWA</h1>
        <p>Une Progressive Web App avec HTML5</p>
        
        <div class="install-prompt" id="installPrompt">
            <h3>Installer l'application</h3>
            <p>Installez cette application sur votre appareil pour une meilleure expérience !</p>
            <button class="install-btn" id="installBtn">Installer</button>
            <button class="install-btn" id="dismissBtn">Plus tard</button>
        </div>
        
        <div class="status" id="status">
            <h3>Statut de l'application</h3>
            <p id="connectionStatus">Vérification de la connexion...</p>
            <p id="serviceWorkerStatus">Vérification du Service Worker...</p>
        </div>
        
        <div class="features">
            <h3>Fonctionnalités PWA</h3>
            <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
                <li>✅ Installation sur l'appareil</li>
                <li>✅ Fonctionnement hors ligne</li>
                <li>✅ Notifications push</li>
                <li>✅ Synchronisation en arrière-plan</li>
                <li>✅ Interface native</li>
            </ul>
        </div>
    </div>
    
    <script>
        // Gestion de l'installation PWA
        let deferredPrompt;
        const installPrompt = document.getElementById('installPrompt');
        const installBtn = document.getElementById('installBtn');
        const dismissBtn = document.getElementById('dismissBtn');
        
        // Écouter l'événement beforeinstallprompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installPrompt.style.display = 'block';
        });
        
        // Gestion du clic sur le bouton d'installation
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`Installation ${outcome}`);
                deferredPrompt = null;
                installPrompt.style.display = 'none';
            }
        });
        
        // Masquer le prompt
        dismissBtn.addEventListener('click', () => {
            installPrompt.style.display = 'none';
        });
        
        // Vérifier si l'app est déjà installée
        window.addEventListener('appinstalled', () => {
            console.log('PWA installée avec succès');
            installPrompt.style.display = 'none';
        });
        
        // Gestion de la connexion
        function updateConnectionStatus() {
            const status = navigator.onLine ? 'En ligne' : 'Hors ligne';
            document.getElementById('connectionStatus').textContent = `Connexion: ${status}`;
        }
        
        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);
        updateConnectionStatus();
        
        // Enregistrement du Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker enregistré:', registration);
                    document.getElementById('serviceWorkerStatus').textContent = 
                        'Service Worker: Actif';
                })
                .catch(error => {
                    console.log('Erreur Service Worker:', error);
                    document.getElementById('serviceWorkerStatus').textContent = 
                        'Service Worker: Erreur';
                });
        } else {
            document.getElementById('serviceWorkerStatus').textContent = 
                'Service Worker: Non supporté';
        }
        
        // Gestion des notifications
        function requestNotificationPermission() {
            if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification('PWA installée !', {
                            body: 'L\'application a été installée avec succès.',
                            icon: '/icons/icon-192x192.png'
                        });
                    }
                });
            }
        }
        
        // Demander la permission de notification après installation
        installBtn.addEventListener('click', requestNotificationPermission);
    </script>
</body>
</html>
```

---

## 📚 Ressources

### Documentation officielle
- [MDN HTML5](https://developer.mozilla.org/fr/docs/Web/HTML)
- [W3C HTML5 Specification](https://www.w3.org/TR/html52/)
- [HTML5 Doctor](http://html5doctor.com/)

### Accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

### Outils et validation
- [W3C Markup Validator](https://validator.w3.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Apprentissage
- [HTML5 Tutorial](https://www.w3schools.com/html/)
- [HTML5 Rocks](https://www.html5rocks.com/)
- [Can I Use](https://caniuse.com/)

---

*Dernière mise à jour : Janvier 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

