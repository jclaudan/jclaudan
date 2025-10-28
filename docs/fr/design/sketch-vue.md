# Sketch pour Vue 3 - Guide Complet

> **Sketch Vue 3** - Guide complet pour utiliser Sketch avec Vue 3, incluant l'export de composants, l'intégration avec Storybook et les workflows de collaboration.

## 📋 Table des matières
- [🎯 Vue d'ensemble](#-vue-densemble)
- [🛠️ Sketch pour Développeurs Vue](#️-sketch-pour-développeurs-vue)
- [📤 Export vers Vue](#-export-vers-vue)
- [🔌 Intégration avec Storybook](#-intégration-avec-storybook)
- [🔄 Alternatives et Migration](#-alternatives-et-migration)
- [🎯 Workflows de Collaboration](#-workflows-de-collaboration)
- [📚 Ressources et Plugins](#-ressources-et-plugins)

---

## 🎯 Vue d'ensemble

Sketch est un outil de design vectoriel professionnel pour macOS, largement utilisé pour la conception d'interfaces utilisateur. Ce guide couvre l'utilisation de Sketch dans le contexte du développement Vue 3.

### 🎯 Sketch vs Figma

| Aspect | Sketch | Figma |
|--------|--------|-------|
| **Plateforme** | macOS uniquement | Multi-plateforme (Web, macOS, Windows) |
| **Collaboration** | Limité (nécessite Sketch Cloud) | Collaboration en temps réel |
| **Prix** | Abonnement mensuel | Freemium avec abonnement |
| **Performance** | Optimisé pour macOS | Dépend de la connexion web |
| **Plugins** | Écosystème mature | Écosystème en croissance |
| **Export** | Plugins spécialisés | Export natif |

### 🎯 Cas d'Usage Sketch

- **Design Systems** : Création de bibliothèques de composants
- **Prototypage** : Création de prototypes interactifs
- **Export Assets** : Génération d'assets pour le développement
- **Collaboration** : Partage avec les développeurs
- **Workflow Mac** : Intégration dans l'écosystème Apple

---

## 🛠️ Sketch pour Développeurs Vue

### Installation et Configuration

**1. Installation de Sketch** :
```bash
# Via Mac App Store ou site officiel
# https://www.sketch.com/
```

**2. Configuration initiale** :
- Créer un compte Sketch
- Configurer Sketch Cloud pour la collaboration
- Installer les plugins essentiels

### Structure de Projet Sketch

**Organisation recommandée** :
```
Design System.sketch
├── 📁 01 - Foundation
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Icons
├── 📁 02 - Components
│   ├── Buttons
│   ├── Forms
│   ├── Cards
│   └── Navigation
├── 📁 03 - Patterns
│   ├── Headers
│   ├── Footers
│   └── Layouts
└── 📁 04 - Pages
    ├── Home
    ├── Dashboard
    └── Profile
```

### Création de Composants

**1. Symboles Sketch** :
```markdown
# Création d'un symbole Button

1. Créer le design du bouton
2. Sélectionner tous les éléments
3. Clic droit > "Create Symbol"
4. Nommer le symbole : "Button/Primary"
5. Configurer les overrides
```

**2. Variantes de composants** :
```markdown
# Système de variantes

Button/
├── Primary
├── Secondary
├── Danger
└── Disabled

Size/
├── Small
├── Medium
└── Large
```

**3. Overrides et propriétés** :
```markdown
# Configuration des overrides

- Text: "Label" (modifiable)
- Color: "Background" (sélectionnable)
- Size: "Size" (prédéfini)
- State: "State" (prédéfini)
```

---

## 📤 Export vers Vue

### Plugins d'Export

**1. Sketch to Vue** :
```bash
# Installation via Sketch Plugin Manager
# Rechercher "Sketch to Vue" dans les plugins
```

**Configuration** :
```javascript
// Configuration du plugin
{
  "outputPath": "./src/components",
  "componentPrefix": "Sk",
  "includeStyles": true,
  "generateTypes": true
}
```

**2. Sketch2React** :
```bash
# Plugin pour export vers React/Vue
# https://github.com/html-sketchapp/sketch2react
```

**Utilisation** :
```bash
# Export d'un composant
1. Sélectionner le symbole
2. Exécuter le plugin
3. Choisir le format (Vue)
4. Configurer les options
5. Exporter
```

### Export Manuel

**1. Assets et Images** :
```markdown
# Export des assets

1. Sélectionner l'élément
2. Clic droit > "Export"
3. Choisir le format (PNG, SVG, JPG)
4. Configurer la résolution (@1x, @2x, @3x)
5. Exporter vers le dossier assets/
```

**2. Spécifications CSS** :
```markdown
# Génération de CSS

1. Utiliser le plugin "Sketch Measure"
2. Sélectionner l'élément
3. Copier les propriétés CSS
4. Adapter pour Vue 3
```

**Exemple de conversion** :
```css
/* CSS généré par Sketch */
.button {
  width: 120px;
  height: 40px;
  background-color: #007AFF;
  border-radius: 8px;
  font-family: SF Pro Display;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
}

/* CSS adapté pour Vue 3 */
.btn {
  @apply px-4 py-2 rounded-lg font-semibold text-white;
  background-color: theme('colors.blue.500');
}
```

### Tokens de Design

**1. Extraction des tokens** :
```javascript
// sketch-tokens.js
// Script pour extraire les tokens depuis Sketch

const extractTokens = (sketchDocument) => {
  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
    shadows: {}
  }
  
  // Extraction des couleurs
  sketchDocument.colors.forEach(color => {
    tokens.colors[color.name] = color.hex
  })
  
  // Extraction de la typographie
  sketchDocument.textStyles.forEach(style => {
    tokens.typography[style.name] = {
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      lineHeight: style.lineHeight
    }
  })
  
  return tokens
}
```

**2. Génération de CSS Variables** :
```css
/* design-tokens.css */
:root {
  /* Colors */
  --color-primary: #007AFF;
  --color-secondary: #5856D6;
  --color-success: #34C759;
  --color-warning: #FF9500;
  --color-danger: #FF3B30;
  
  /* Typography */
  --font-family-primary: 'SF Pro Display', sans-serif;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

---

## 🔌 Intégration avec Storybook

### Plugin storybook-addon-designs

**Installation** :
```bash
npm install --save-dev storybook-addon-designs
```

**Configuration** :
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    'storybook-addon-designs'
  ]
}
```

### Stories avec Designs Sketch

**1. Upload des designs** :
```typescript
// Button.stories.ts
export const WithSketchDesign: Story = {
  args: {
    label: 'Button'
  },
  parameters: {
    design: {
      type: 'image',
      url: '/designs/button-sketch.png'
    }
  }
}
```

**2. Comparaison design-code** :
```typescript
// Button.stories.ts
export const DesignComparison: Story = {
  parameters: {
    design: {
      type: 'image',
      url: '/designs/button-variants.png',
      allowFullscreen: true
    }
  }
}
```

### Workflow de Validation

**1. Processus de review** :
```markdown
# Workflow de validation

1. Designer crée le composant dans Sketch
2. Export vers Storybook
3. Développeur implémente le composant Vue
4. Comparaison côte à côte dans Storybook
5. Validation et ajustements
6. Mise à jour du design system
```

**2. Documentation des écarts** :
```typescript
// Button.stories.ts
export const DesignNotes: Story = {
  parameters: {
    docs: {
      description: {
        story: `
          **Écarts avec le design Sketch :**
          - Border radius ajusté de 6px à 8px pour l'accessibilité
          - Couleur hover ajoutée pour l'interactivité
          - Focus ring ajouté pour l'accessibilité
        `
      }
    }
  }
}
```

---

## 🔄 Alternatives et Migration

### Comparaison Sketch vs Figma

**Avantages Sketch** :
- Performance native sur macOS
- Écosystème de plugins mature
- Intégration avec l'écosystème Apple
- Workflow offline

**Avantages Figma** :
- Collaboration en temps réel
- Multi-plateforme
- Versioning intégré
- Export natif vers code

### Migration Sketch vers Figma

**1. Outils de migration** :
```bash
# Plugin Figma pour importer Sketch
# https://www.figma.com/community/plugin/735725060906946414/Sketch-Importer
```

**2. Processus de migration** :
```markdown
# Étapes de migration

1. Préparer les fichiers Sketch
2. Organiser les symboles et styles
3. Utiliser le plugin d'import Figma
4. Vérifier et ajuster les designs
5. Mettre à jour les workflows
6. Former l'équipe
```

**3. Script de migration** :
```javascript
// migration-script.js
// Script pour automatiser la migration

const migrateSketchToFigma = async (sketchFile) => {
  // 1. Extraire les symboles
  const symbols = extractSymbols(sketchFile)
  
  // 2. Extraire les styles
  const styles = extractStyles(sketchFile)
  
  // 3. Convertir vers format Figma
  const figmaData = convertToFigmaFormat(symbols, styles)
  
  // 4. Créer le fichier Figma
  await createFigmaFile(figmaData)
}
```

### Outils de Conversion

**1. Sketch2Figma** :
```bash
# Outil en ligne pour conversion
# https://sketch2figma.com/
```

**2. Plugin de conversion** :
```javascript
// Conversion automatique
const convertDesign = {
  colors: (sketchColors) => {
    return sketchColors.map(color => ({
      name: color.name,
      value: color.hex,
      type: 'color'
    }))
  },
  
  typography: (sketchTextStyles) => {
    return sketchTextStyles.map(style => ({
      name: style.name,
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight
    }))
  }
}
```

---

## 🎯 Workflows de Collaboration

### Workflow Designer-Développeur

**1. Processus de handoff** :
![Diagramme Mermaid](assets/mermaid/sketch-vue-0-fr-design-sketch-vue.png)

**2. Outils de collaboration** :
```markdown
# Outils recommandés

- **Sketch Cloud** : Partage et commentaires
- **Zeplin** : Handoff design-développement
- **Abstract** : Versioning et collaboration
- **InVision** : Prototypage et feedback
```

### Gestion des Versions

**1. Versioning dans Sketch** :
```markdown
# Stratégie de versioning

v1.0.0 - Version initiale
v1.1.0 - Ajout de nouveaux composants
v1.1.1 - Corrections mineures
v2.0.0 - Refonte majeure
```

**2. Synchronisation avec le code** :
```javascript
// sync-versions.js
// Script de synchronisation des versions

const syncVersions = {
  sketch: '1.2.0',
  vue: '1.2.0',
  storybook: '1.2.0'
}

// Vérification de cohérence
const checkVersionConsistency = () => {
  const versions = Object.values(syncVersions)
  return versions.every(version => version === versions[0])
}
```

### Communication et Feedback

**1. Processus de feedback** :
```markdown
# Workflow de feedback

1. Designer partage le design via Sketch Cloud
2. Développeur commente les spécifications
3. Discussion et ajustements
4. Validation finale
5. Mise à jour du design system
```

**2. Documentation des décisions** :
```typescript
// design-decisions.md
// Documentation des décisions de design

## Décision 001: Système de couleurs
- **Date**: 2024-01-15
- **Contexte**: Définition de la palette de couleurs
- **Décision**: Utilisation de couleurs système iOS
- **Impact**: Cohérence avec l'écosystème Apple
- **Statut**: Approuvé
```

---

## 📚 Ressources et Plugins

### Plugins Sketch Essentiels

**1. Plugins de développement** :
```markdown
# Plugins recommandés

- **Sketch to Vue** : Export vers Vue 3
- **Sketch Measure** : Spécifications CSS
- **Sketch2React** : Export vers React/Vue
- **Design Tokens** : Extraction de tokens
- **Sketch Icons** : Gestion des icônes
```

**2. Plugins de productivité** :
```markdown
# Plugins de productivité

- **Rename It** : Renommage en masse
- **Find and Replace** : Recherche et remplacement
- **Sketch Runner** : Raccourcis clavier
- **Sketch Palettes** : Gestion des couleurs
- **Sketch Data Populator** : Données de test
```

### Ressources d'Apprentissage

**1. Documentation officielle** :
- [Sketch Documentation](https://www.sketch.com/docs/)
- [Sketch Plugins](https://www.sketch.com/plugins/)
- [Sketch Community](https://www.sketch.com/community/)

**2. Tutoriels et guides** :
- [Sketch for Developers](https://www.sketch.com/for-developers/)
- [Design Systems with Sketch](https://www.sketch.com/design-systems/)
- [Sketch to Code Workflows](https://www.sketch.com/workflows/)

### Communauté et Support

**1. Communautés** :
- [Sketch Community Forum](https://www.sketch.com/community/)
- [Sketch Slack](https://sketch.com/slack/)
- [Reddit r/sketchapp](https://www.reddit.com/r/sketchapp/)

**2. Ressources d'aide** :
- [Sketch Help Center](https://help.sketch.com/)
- [Sketch YouTube Channel](https://www.youtube.com/c/sketch)
- [Sketch Blog](https://www.sketch.com/blog/)

---

## 🎯 Exemples Pratiques

### Composant Button depuis Sketch

**1. Design dans Sketch** :
```markdown
# Création du symbole Button

1. Créer un rectangle 120x40px
2. Appliquer border-radius 8px
3. Ajouter couleur de fond #007AFF
4. Ajouter texte "Button" centré
5. Créer le symbole "Button/Primary"
6. Configurer les overrides
```

**2. Export vers Vue** :
```vue
<!-- Button.vue -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--disabled': props.disabled
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  @apply px-4 py-2 rounded-lg font-semibold transition-colors;
}

.btn--primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.btn--secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}

.btn--danger {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.btn--small {
  @apply px-3 py-1 text-sm;
}

.btn--medium {
  @apply px-4 py-2 text-base;
}

.btn--large {
  @apply px-6 py-3 text-lg;
}

.btn--disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
```

**3. Story Storybook** :
```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    design: {
      type: 'image',
      url: '/designs/button-sketch.png'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button'
  }
}
```

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
