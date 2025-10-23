# 🎨 Figma - Guide Complet

> **Figma** est un outil de design UI/UX collaboratif en ligne qui permet de créer, prototyper et partager des designs d'interfaces utilisateur de manière intuitive et efficace.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-figma)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [🟢 Interface et Outils](#-débutant---interface-et-outils)
- [🟡 Composants et Variants](#-intermédiaire---composants-et-variants)
- [🟠 Design Systems et Prototypage](#-confirmé---design-systems-et-prototypage)
- [🔴 Collaboration et Workflow](#-senior---collaboration-et-workflow)
- [⚫ Plugins et Automatisation](#-expert---plugins-et-automatisation)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Figma

### 🎯 Raccourcis Clavier Essentiels

| Action | Raccourci | Description |
|--------|-----------|-------------|
| **Sélection** | `V` | Outil de sélection |
| **Rectangle** | `R` | Créer un rectangle |
| **Ellipse** | `O` | Créer un cercle/ellipse |
| **Texte** | `T` | Outil de texte |
| **Ligne** | `L` | Créer une ligne |
| **Flèche** | `Shift + L` | Créer une flèche |
| **Dupliquer** | `Ctrl + D` | Dupliquer la sélection |
| **Grouper** | `Ctrl + G` | Grouper les éléments |
| **Dégrouper** | `Ctrl + Shift + G` | Dégrouper les éléments |
| **Copier** | `Ctrl + C` | Copier |
| **Coller** | `Ctrl + V` | Coller |
| **Annuler** | `Ctrl + Z` | Annuler la dernière action |
| **Refaire** | `Ctrl + Shift + Z` | Refaire l'action annulée |
| **Zoom** | `Ctrl + +/-` | Zoomer/Dézoomer |
| **Zoom Fit** | `Shift + 1` | Ajuster à la fenêtre |
| **Zoom 100%** | `Shift + 0` | Zoom à 100% |
| **Masquer** | `Ctrl + Shift + H` | Masquer la sélection |
| **Afficher** | `Ctrl + Alt + H` | Afficher tout |
| **Verrouiller** | `Ctrl + Alt + L` | Verrouiller la sélection |
| **Déverrouiller** | `Ctrl + Alt + Shift + L` | Déverrouiller tout |

### 🎯 Outils de Base

| Outil | Raccourci | Description | Utilisation |
|-------|-----------|-------------|-------------|
| **Move** | `V` | Déplacer et sélectionner | Navigation et sélection |
| **Frame** | `F` | Créer un frame | Structure de page |
| **Rectangle** | `R` | Forme rectangulaire | Boutons, cartes, conteneurs |
| **Ellipse** | `O` | Forme circulaire | Avatars, icônes, boutons |
| **Line** | `L` | Ligne droite | Séparateurs, connecteurs |
| **Arrow** | `Shift + L` | Flèche | Flux, navigation |
| **Text** | `T` | Texte | Titres, paragraphes, labels |
| **Pen** | `P` | Plume | Formes personnalisées |
| **Pencil** | `Shift + P` | Crayon | Dessins libres |
| **Hand** | `H` | Main | Navigation dans le canvas |
| **Comment** | `C` | Commentaire | Feedback et collaboration |

### 🎯 Panels et Fenêtres

| Panel | Raccourci | Description | Contenu |
|-------|-----------|-------------|---------|
| **Layers** | `Ctrl + Alt + 3` | Panneau des calques | Structure hiérarchique |
| **Assets** | `Ctrl + Alt + 2` | Bibliothèque d'assets | Composants, styles |
| **Properties** | `Ctrl + Alt + 1` | Propriétés | Style, contraintes, effets |
| **Design** | `Ctrl + Alt + 4` | Design | Couleurs, typographie, effets |
| **Prototype** | `Ctrl + Alt + 5` | Prototypage | Interactions, animations |
| **Inspect** | `Ctrl + Alt + 6` | Inspection | Code CSS, mesures |
| **Comments** | `Ctrl + Alt + 7` | Commentaires | Feedback et discussions |
| **Version History** | `Ctrl + Alt + 8` | Historique | Versions et changements |

### 🎯 Types de Composants

| Type | Description | Utilisation | Avantages |
|-------|-------------|-------------|-----------|
| **Component** | Composant principal | Éléments réutilisables | Cohérence, maintenance |
| **Instance** | Instance de composant | Utilisation du composant | Flexibilité, variants |
| **Master** | Composant parent | Définition de base | Source unique de vérité |
| **Variant** | Variante de composant | États différents | Organisation, efficacité |
| **Auto Layout** | Mise en page automatique | Responsive design | Adaptation automatique |
| **Constraints** | Contraintes de position | Positionnement relatif | Responsive, cohérence |

### 🎯 Propriétés de Design

| Propriété | Description | Valeurs | Exemple |
|-----------|-------------|---------|---------|
| **Fill** | Remplissage | Couleur, dégradé, image | `#FF0000`, `linear-gradient()` |
| **Stroke** | Contour | Couleur, épaisseur, style | `2px solid #000000` |
| **Opacity** | Opacité | 0-100% | `80%` |
| **Blend Mode** | Mode de fusion | Normal, Multiply, Overlay | `Multiply` |
| **Effects** | Effets | Ombre, flou, glow | `drop-shadow(0 4px 8px rgba(0,0,0,0.1))` |
| **Corner Radius** | Rayon des coins | 0-999px | `8px` |
| **Rotation** | Rotation | -360° à 360° | `45deg` |
| **Scale** | Échelle | 0-1000% | `150%` |

### 🎯 Auto Layout

| Propriété | Description | Valeurs | Utilisation |
|-----------|-------------|---------|-------------|
| **Direction** | Direction du layout | Vertical, Horizontal | Colonnes, rangées |
| **Spacing** | Espacement | 0-999px | Gap entre éléments |
| **Padding** | Marge intérieure | 0-999px | Espace autour du contenu |
| **Fill Container** | Remplir le conteneur | Oui/Non | Adaptation à la largeur |
| **Hug Contents** | Adapter au contenu | Oui/Non | Taille minimale |
| **Fixed Size** | Taille fixe | Oui/Non | Dimensions constantes |
| **Wrap** | Retour à la ligne | Oui/Non | Éléments multiples |
| **Justify** | Justification | Start, Center, End, Space-between | Alignement horizontal |
| **Align** | Alignement | Start, Center, End | Alignement vertical |

### 🎯 Plugins Essentiels

| Plugin | Description | Utilisation |
|--------|-------------|-------------|
| **Figma to Code** | Génération de code | CSS, React, Vue |
| **Content Reel** | Données de test | Lorem ipsum, avatars |
| **Iconify** | Bibliothèque d'icônes | Icônes vectorielles |
| **Figma to HTML** | Export HTML | Code HTML/CSS |
| **Auto Layout** | Layout automatique | Responsive design |
| **Design System Organizer** | Organisation | Gestion des composants |
| **Figma to React** | Code React | Composants React |
| **Figma to Flutter** | Code Flutter | Applications mobiles |

---

## 🚀 Introduction

Figma est un outil de design UI/UX collaboratif en ligne qui révolutionne la façon dont les équipes créent et partagent des designs d'interfaces utilisateur.

### Qu'est-ce que Figma ?
Figma est un outil de design vectoriel basé sur le web qui permet aux équipes de créer, prototyper et collaborer sur des designs d'interfaces utilisateur en temps réel. Il combine la puissance d'un outil de design professionnel avec la flexibilité du cloud.

### Pourquoi choisir Figma ?
- **🌐 Collaboration en Temps Réel** : Travail simultané de plusieurs utilisateurs
- **☁️ Cloud-Native** : Accès depuis n'importe où, synchronisation automatique
- **🎨 Design System** : Gestion centralisée des composants et styles
- **🔄 Prototypage** : Création d'interactions et animations
- **📱 Multi-Plateforme** : Web, desktop, mobile
- **🔌 Écosystème** : Plugins et intégrations
- **💰 Modèle Freemium** : Version gratuite généreuse
- **🎯 Handoff** : Export de code pour les développeurs

### Quand utiliser Figma ?
- Design d'interfaces utilisateur
- Prototypage d'applications
- Design systems
- Collaboration en équipe
- Design responsive
- Handoff développeur
- Tests utilisateur

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Pas d'installation requise - Figma est basé sur le web
# Accès direct via https://figma.com

# Application desktop (optionnelle)
# Télécharger depuis https://figma.com/downloads/
```

### Configuration du compte

1. **Créer un compte**
   - Aller sur https://figma.com
   - Cliquer sur "Sign up"
   - Choisir un plan (Free, Professional, Organization)

2. **Configuration du profil**
   - Ajouter une photo de profil
   - Configurer les notifications
   - Définir les préférences

3. **Créer une équipe**
   - Créer un workspace
   - Inviter des membres
   - Configurer les permissions

### Configuration des préférences

```javascript
// Préférences recommandées
{
  "interface": {
    "theme": "light", // ou "dark"
    "zoom": "fit-to-screen",
    "grid": "enabled"
  },
  "keyboard": {
    "shortcuts": "default",
    "custom": {
      "toggle-grid": "Ctrl + G",
      "toggle-rulers": "Ctrl + R"
    }
  },
  "export": {
    "format": "PNG",
    "scale": "1x",
    "quality": "high"
  },
  "collaboration": {
    "comments": "enabled",
    "notifications": "real-time",
    "version-history": "enabled"
  }
}
```

---

## 🟢 Interface et Outils

### Interface de base

```markdown
# Structure de l'interface Figma

## Barre latérale gauche
- **Layers Panel** : Hiérarchie des éléments
- **Assets Panel** : Composants et styles
- **Pages** : Navigation entre les pages

## Canvas central
- **Zone de travail** : Design principal
- **Rulers** : Règles pour l'alignement
- **Grid** : Grille de référence
- **Frames** : Conteneurs de design

## Barre latérale droite
- **Design Panel** : Couleurs, typographie, effets
- **Prototype Panel** : Interactions et animations
- **Inspect Panel** : Code et mesures

## Barre d'outils
- **Outils de sélection** : Move, Scale, Rotate
- **Outils de forme** : Rectangle, Ellipse, Line
- **Outils de texte** : Text, Type
- **Outils de dessin** : Pen, Pencil
```

### Premiers pas

```markdown
# Créer votre premier design

## 1. Créer un nouveau fichier
- Cliquer sur "New file"
- Choisir un template ou commencer vide

## 2. Créer un frame
- Sélectionner l'outil Frame (F)
- Choisir un device preset (iPhone, Desktop, etc.)
- Dessiner le frame sur le canvas

## 3. Ajouter du contenu
- Utiliser l'outil Rectangle (R) pour créer des formes
- Utiliser l'outil Text (T) pour ajouter du texte
- Utiliser l'outil Ellipse (O) pour créer des cercles

## 4. Styliser les éléments
- Sélectionner un élément
- Utiliser le panel Design pour modifier les couleurs
- Ajuster les propriétés dans le panel Properties
```

### Outils de base

```markdown
# Outils essentiels

## Outil Move (V)
- Sélectionner et déplacer des éléments
- Redimensionner avec les poignées
- Rotation avec la poignée de rotation

## Outil Rectangle (R)
- Créer des rectangles et carrés
- Maintenir Shift pour créer un carré
- Maintenir Alt pour centrer depuis le point de clic

## Outil Ellipse (O)
- Créer des cercles et ellipses
- Maintenir Shift pour créer un cercle
- Maintenir Alt pour centrer depuis le point de clic

## Outil Text (T)
- Créer du texte
- Cliquer pour du texte simple
- Dessiner un rectangle pour du texte contraint

## Outil Line (L)
- Créer des lignes droites
- Maintenir Shift pour des lignes parfaitement droites
- Maintenir Alt pour centrer depuis le point de clic
```

---

## 🟡 Composants et Variants

### Création de composants

```markdown
# Créer un composant

## 1. Créer l'élément de base
- Dessiner un bouton avec Rectangle + Text
- Styliser avec les couleurs et typographie
- Grouper les éléments (Ctrl + G)

## 2. Convertir en composant
- Sélectionner le groupe
- Cliquer sur "Create component" (Ctrl + Alt + K)
- Le composant apparaît dans le panel Assets

## 3. Utiliser le composant
- Glisser depuis le panel Assets
- Ou utiliser le composant dans d'autres frames
- Modifier les propriétés dans le panel Properties
```

### Variants de composants

```markdown
# Créer des variants

## 1. Créer le composant principal
- Créer un bouton de base
- Convertir en composant

## 2. Ajouter des variants
- Sélectionner le composant
- Cliquer sur "Add variant" dans le panel Properties
- Modifier les propriétés pour chaque variant

## 3. Organiser les variants
- Utiliser des noms descriptifs
- Grouper par type (Primary, Secondary, etc.)
- Utiliser des propriétés booléennes pour les états
```

### Auto Layout

```markdown
# Utiliser Auto Layout

## 1. Activer Auto Layout
- Sélectionner un frame ou un groupe
- Cliquer sur "Auto Layout" dans le panel Properties
- Ou utiliser le raccourci Shift + A

## 2. Configurer la direction
- Direction : Vertical ou Horizontal
- Spacing : Espacement entre les éléments
- Padding : Marge intérieure

## 3. Contraintes
- Fill Container : Remplir le conteneur
- Hug Contents : Adapter au contenu
- Fixed Size : Taille fixe

## 4. Alignement
- Justify : Alignement horizontal
- Align : Alignement vertical
- Wrap : Retour à la ligne
```

### Styles et tokens

```markdown
# Créer des styles

## 1. Styles de couleur
- Sélectionner un élément avec une couleur
- Cliquer sur "Create style" dans le panel Design
- Nommer le style (ex: "Primary/500")
- Organiser dans des groupes

## 2. Styles de texte
- Sélectionner un texte
- Cliquer sur "Create style" dans le panel Design
- Nommer le style (ex: "Heading/H1")
- Définir la typographie, taille, poids

## 3. Styles d'effet
- Sélectionner un élément avec un effet
- Cliquer sur "Create style" dans le panel Design
- Nommer le style (ex: "Shadow/Medium")
- Définir l'ombre, le flou, etc.

## 4. Utiliser les styles
- Sélectionner un élément
- Choisir le style dans le panel Design
- Le style s'applique automatiquement
```

---

## 🟠 Design Systems et Prototypage

### Design System

```markdown
# Créer un Design System

## 1. Structure du fichier
- Créer un fichier dédié au Design System
- Organiser en pages : Colors, Typography, Components, etc.
- Utiliser des frames pour chaque section

## 2. Tokens de design
- Couleurs : Primary, Secondary, Neutral, Semantic
- Typographie : Headings, Body, Captions
- Espacement : 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Rayons : Small (4px), Medium (8px), Large (16px)

## 3. Composants de base
- Buttons : Primary, Secondary, Ghost, Danger
- Inputs : Text, Email, Password, Select
- Cards : Default, Elevated, Outlined
- Navigation : Header, Sidebar, Breadcrumb

## 4. Documentation
- Ajouter des descriptions aux composants
- Créer des exemples d'utilisation
- Documenter les états et interactions
```

### Prototypage

```markdown
# Créer des prototypes

## 1. Activer le mode Prototype
- Cliquer sur "Prototype" dans le panel de droite
- Ou utiliser le raccourci Ctrl + Alt + 5

## 2. Créer des connexions
- Sélectionner un élément source
- Cliquer sur le point de connexion
- Glisser vers l'élément de destination

## 3. Configurer les interactions
- Trigger : On Click, On Drag, On Hover, etc.
- Action : Navigate, Overlay, Back, etc.
- Animation : Instant, Dissolve, Move In, etc.
- Easing : Ease In, Ease Out, Ease In Out, etc.

## 4. Tester le prototype
- Cliquer sur "Present" pour tester
- Utiliser les contrôles de navigation
- Tester sur différents devices
```

### Responsive Design

```markdown
# Design responsive

## 1. Frames responsives
- Créer des frames pour chaque breakpoint
- Mobile : 375px, 414px
- Tablet : 768px, 1024px
- Desktop : 1440px, 1920px

## 2. Auto Layout
- Utiliser Auto Layout pour l'adaptation
- Configurer les contraintes appropriées
- Tester la redimensionnement

## 3. Constraints
- Fix : Position fixe
- Left/Right : Alignement horizontal
- Top/Bottom : Alignement vertical
- Left & Right : Étirement horizontal
- Top & Bottom : Étirement vertical
- Scale : Mise à l'échelle proportionnelle

## 4. Composants adaptatifs
- Créer des variants pour chaque breakpoint
- Utiliser des propriétés booléennes
- Tester sur différentes tailles
```

---

## 🔴 Collaboration et Workflow

### Gestion d'équipe

```markdown
# Collaboration en équipe

## 1. Permissions
- Owner : Contrôle total
- Editor : Modification et commentaires
- Viewer : Consultation uniquement
- Commenter : Commentaires uniquement

## 2. Organisation
- Créer des dossiers par projet
- Utiliser des conventions de nommage
- Organiser les composants par catégorie
- Maintenir une hiérarchie claire

## 3. Communication
- Utiliser les commentaires pour le feedback
- Mentionner les collègues avec @
- Résoudre les commentaires après action
- Utiliser les notifications

## 4. Versioning
- Créer des versions majeures
- Documenter les changements
- Utiliser l'historique des versions
- Restaurer si nécessaire
```

### Workflow de développement

```markdown
# Workflow Figma → Code

## 1. Préparation du design
- Utiliser des composants cohérents
- Nommer les éléments de manière claire
- Organiser les layers
- Utiliser des styles et tokens

## 2. Handoff développeur
- Utiliser le panel Inspect
- Exporter les assets nécessaires
- Documenter les interactions
- Fournir les spécifications

## 3. Export de code
- Utiliser des plugins comme "Figma to Code"
- Générer du CSS, React, Vue, etc.
- Vérifier la qualité du code généré
- Adapter si nécessaire

## 4. Maintenance
- Mettre à jour les composants
- Synchroniser avec le code
- Gérer les versions
- Communiquer les changements
```

### Intégration avec les outils

```markdown
# Intégrations

## 1. Slack
- Notifications automatiques
- Partage de designs
- Commentaires intégrés

## 2. Jira
- Lier les designs aux tickets
- Suivre les changements
- Gérer les versions

## 3. GitHub
- Intégration avec les PR
- Commentaires sur le code
- Synchronisation des changements

## 4. Zeplin
- Export automatique
- Spécifications détaillées
- Gestion des assets

## 5. Abstract
- Versioning avancé
- Gestion des branches
- Collaboration complexe
```

---

## ⚫ Plugins et Automatisation

### Plugins avancés

```javascript
// Exemple de plugin Figma
// figma-plugin-example.js

// Plugin pour générer des composants automatiquement
figma.showUI(__html__, { width: 300, height: 400 });

// Écouter les messages de l'UI
figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-button') {
    // Créer un bouton
    const button = figma.createFrame();
    button.name = 'Button';
    button.resize(120, 40);
    
    // Ajouter du texte
    const text = figma.createText();
    text.characters = 'Button';
    text.fontSize = 14;
    text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    
    // Positionner le texte
    text.x = button.width / 2 - text.width / 2;
    text.y = button.height / 2 - text.height / 2;
    
    // Ajouter au bouton
    button.appendChild(text);
    
    // Ajouter au canvas
    figma.currentPage.appendChild(button);
    
    // Sélectionner le bouton
    figma.currentPage.selection = [button];
    figma.viewport.scrollAndZoomIntoView([button]);
  }
  
  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
```

### Automatisation avec API

```javascript
// Exemple d'intégration API Figma
// figma-api-integration.js

const axios = require('axios');

class FigmaAPI {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseURL = 'https://api.figma.com/v1';
  }

  async getFile(fileKey) {
    try {
      const response = await axios.get(`${this.baseURL}/files/${fileKey}`, {
        headers: {
          'X-Figma-Token': this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  }

  async getImages(fileKey, nodeIds) {
    try {
      const response = await axios.get(`${this.baseURL}/images/${fileKey}`, {
        headers: {
          'X-Figma-Token': this.accessToken
        },
        params: {
          ids: nodeIds.join(','),
          format: 'png',
          scale: 2
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }

  async getComments(fileKey) {
    try {
      const response = await axios.get(`${this.baseURL}/files/${fileKey}/comments`, {
        headers: {
          'X-Figma-Token': this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
}

// Utilisation
const figma = new FigmaAPI('your-access-token');
figma.getFile('file-key').then(file => {
  console.log('File data:', file);
});
```

### Plugins personnalisés

```markdown
# Créer un plugin Figma

## 1. Structure du plugin
```
plugin/
├── code.js          # Code principal
├── ui.html          # Interface utilisateur
├── manifest.json    # Configuration
└── package.json     # Dépendances
```

## 2. manifest.json
```json
{
  "name": "Mon Plugin",
  "id": "mon-plugin-id",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "ui.html",
  "capabilities": [],
  "enableProposedApi": false,
  "editorType": ["figma"],
  "networkAccess": {
    "allowedDomains": ["none"]
  }
}
```

## 3. code.js
```javascript
// Code principal du plugin
figma.showUI(__html__, { width: 300, height: 400 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-component') {
    // Logique de création de composant
  }
};
```

## 4. ui.html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mon Plugin</title>
</head>
<body>
  <div id="app">
    <h1>Mon Plugin Figma</h1>
    <button id="create-component">Créer un composant</button>
  </div>
  <script>
    // Code de l'interface utilisateur
  </script>
</body>
</html>
```
```

### Intégration CI/CD

```yaml
# .github/workflows/figma-sync.yml
name: Figma Sync

on:
  schedule:
    - cron: '0 9 * * *'  # Tous les jours à 9h
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Sync Figma components
      run: |
        node scripts/sync-figma.js
      env:
        FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
        FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
    
    - name: Commit changes
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add .
        git diff --staged --quiet || git commit -m "Update Figma components"
        git push
```

---

## 📚 Ressources

### Documentation officielle
- [Figma Documentation](https://help.figma.com/)
- [Figma API](https://www.figma.com/developers/api)
- [Figma Plugin API](https://www.figma.com/plugin-docs/)

### Outils et plugins
- [Figma Community](https://www.figma.com/community)
- [Figma Plugins](https://www.figma.com/community/plugins)
- [Figma Templates](https://www.figma.com/community/templates)

### Apprentissage
- [Figma Academy](https://www.figma.com/academy/)
- [Figma YouTube Channel](https://www.youtube.com/c/figma)
- [Figma Blog](https://www.figma.com/blog/)

### Intégrations
- [Figma Integrations](https://www.figma.com/integrations/)
- [Figma for Developers](https://www.figma.com/developers/)
- [Figma for Teams](https://www.figma.com/teams/)

---

*Dernière mise à jour : Janvier 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

