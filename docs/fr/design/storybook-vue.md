# Storybook pour Vue 3 - Guide Complet

> **Storybook Vue 3** - Guide complet pour configurer et utiliser Storybook avec Vue 3, incluant l'intégration avec Figma et les meilleures pratiques.

## 📋 Table des matières
- [🎯 Vue d'ensemble](#-vue-densemble)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [📖 Création de Stories](#-création-de-stories)
- [🔌 Addons Essentiels](#-addons-essentiels)
- [🎨 Intégration avec Figma](#-intégration-avec-figma)
- [🧪 Tests et Interactions](#-tests-et-interactions)
- [📚 Documentation des Composants](#-documentation-des-composants)
- [🚀 Déploiement](#-déploiement)
- [🎯 Bonnes Pratiques](#-bonnes-pratiques)

---

## 🎯 Vue d'ensemble

Storybook est un atelier pour développer des composants UI en isolation. Il permet de construire, tester et documenter des composants Vue 3 de manière indépendante.

### 🎯 Avantages de Storybook

| Avantage | Description |
|----------|-------------|
| **Développement Isolé** | Développer des composants sans dépendances |
| **Documentation Vivante** | Documentation automatique des composants |
| **Tests Visuels** | Détection des régressions visuelles |
| **Collaboration** | Partage facile avec les designers |
| **Intégration Design** | Synchronisation avec Figma/Sketch |

### 🎯 Workflow Storybook

![Diagramme Mermaid](assets/mermaid/storybook-vue-0-fr-design-storybook-vue.png)

---

## ⚙️ Installation et Configuration

### Installation Initiale

```bash
# Initialiser Storybook dans un projet Vue 3 existant
npx storybook@latest init

# Ou installation manuelle
npm install --save-dev @storybook/vue3 @storybook/addon-essentials
```

### Configuration de Base

**`.storybook/main.js`** :
```javascript
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    'storybook-addon-designs'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
```

**`.storybook/preview.js`** :
```javascript
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

// Configuration globale
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  docs: {
    toc: true
  }
}

// Configuration Vue 3
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes: []
})

setup((app) => {
  app.use(pinia)
  app.use(router)
})
```

### Support TypeScript

**`.storybook/main.js`** avec TypeScript :
```javascript
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  }
}
```

---

## 📖 Création de Stories

### Format CSF 3.0

**`Button.stories.ts`** :
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Story par défaut
export const Default: Story = {
  args: {
    label: 'Button'
  }
}

// Story avec variantes
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button'
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button'
  }
}
```

### Stories avec Slots

**`Card.stories.ts`** :
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import Card from './Card.vue'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Card Title'
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <template #content>
          <p>This is the card content</p>
        </template>
        <template #footer>
          <button>Action</button>
        </template>
      </Card>
    `
  })
}
```

### Stories avec Composables

**`UserProfile.stories.ts`** :
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import UserProfile from './UserProfile.vue'
import { createPinia, setActivePinia } from 'pinia'

const meta: Meta<typeof UserProfile> = {
  title: 'Components/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { UserProfile },
    setup() {
      // Configuration Pinia pour les tests
      setActivePinia(createPinia())
      return { args }
    },
    template: '<UserProfile v-bind="args" />'
  })
}
```

---

## 🔌 Addons Essentiels

### @storybook/addon-essentials

**Configuration** :
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    '@storybook/addon-essentials'
  ]
}
```

**Fonctionnalités incluses** :
- **Controls** : Contrôles interactifs pour les props
- **Actions** : Logging des événements
- **Viewport** : Test sur différentes tailles d'écran
- **Backgrounds** : Changement de fond
- **Toolbars** : Barre d'outils personnalisée
- **Measure** : Outils de mesure
- **Outline** : Contour des éléments

### @storybook/addon-a11y - Accessibilité

**Installation** :
```bash
npm install --save-dev @storybook/addon-a11y
```

**Configuration** :
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    '@storybook/addon-a11y'
  ]
}
```

**Utilisation** :
```typescript
// Button.stories.ts
export const Accessible: Story = {
  args: {
    label: 'Accessible Button',
    'aria-label': 'Close dialog'
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  }
}
```

### @storybook/addon-interactions - Tests d'Interactions

**Installation** :
```bash
npm install --save-dev @storybook/addon-interactions @storybook/test
```

**Utilisation** :
```typescript
// Button.stories.ts
import { userEvent, within, expect } from '@storybook/test'

export const WithInteractions: Story = {
  args: {
    label: 'Click me'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    await userEvent.click(button)
    
    // Vérifier que l'événement a été émis
    await expect(button).toHaveTextContent('Clicked!')
  }
}
```

### storybook-addon-designs - Intégration Design

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

**Utilisation avec Figma** :
```typescript
// Button.stories.ts
export const WithFigmaDesign: Story = {
  args: {
    label: 'Button'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...'
    }
  }
}
```

---

## 🎨 Intégration avec Figma

### Configuration Figma

**1. Obtenir le lien Figma** :
```typescript
// Button.stories.ts
export const FigmaDesign: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/abc123/Design-System?node-id=1%3A2'
    }
  }
}
```

**2. Embed de designs multiples** :
```typescript
export const AllVariants: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: [
        'https://www.figma.com/file/.../Primary',
        'https://www.figma.com/file/.../Secondary',
        'https://www.figma.com/file/.../Danger'
      ]
    }
  }
}
```

### Workflow Designer-Développeur

**1. Design System Figma** :
```typescript
// DesignSystem.stories.ts
export const ColorPalette: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/.../Colors'
    }
  }
}

export const Typography: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/.../Typography'
    }
  }
}
```

**2. Composants avec Specs** :
```typescript
// Button.stories.ts
export const WithSpecs: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/.../Button',
      allowFullscreen: true
    }
  }
}
```

### Synchronisation Design-Code

**Configuration automatique** :
```typescript
// .storybook/preview.js
export const parameters = {
  design: {
    // Configuration globale
    defaultTab: 'design',
    hideInDocs: false
  }
}
```

---

## 🧪 Tests et Interactions

### Tests d'Interactions avec Play

**Installation** :
```bash
npm install --save-dev @storybook/test
```

**Tests de base** :
```typescript
// Button.stories.ts
import { userEvent, within, expect } from '@storybook/test'

export const ClickTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    await userEvent.click(button)
    
    // Vérifier l'état après clic
    await expect(button).toHaveClass('clicked')
  }
}
```

**Tests de formulaires** :
```typescript
// Form.stories.ts
export const FormSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Remplir le formulaire
    await userEvent.type(canvas.getByLabelText('Name'), 'John Doe')
    await userEvent.type(canvas.getByLabelText('Email'), 'john@example.com')
    
    // Soumettre
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }))
    
    // Vérifier le résultat
    await expect(canvas.getByText('Form submitted!')).toBeInTheDocument()
  }
}
```

### Tests Visuels avec Chromatic

**Installation** :
```bash
npm install --save-dev chromatic
```

**Configuration** :
```json
// package.json
{
  "scripts": {
    "chromatic": "chromatic --project-token=your-token"
  }
}
```

**Utilisation** :
```bash
# Déployer sur Chromatic
npm run chromatic

# Tests locaux
npx chromatic --build-script-name=build-storybook
```

---

## 📚 Documentation des Composants

### Documentation Automatique

**Configuration** :
```typescript
// Button.stories.ts
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // Active la documentation automatique
  parameters: {
    docs: {
      description: {
        component: 'Un composant bouton réutilisable avec plusieurs variantes.'
      }
    }
  }
}
```

### Documentation Personnalisée

**MDX Documentation** :
```mdx
<!-- Button.mdx -->
import { Meta, Story, Canvas } from '@storybook/blocks'
import * as ButtonStories from './Button.stories'

<Meta of={ButtonStories} />

# Button

Un composant bouton réutilisable avec plusieurs variantes et tailles.

## Utilisation

```vue
<template>
  <Button variant="primary" size="large">
    Cliquez ici
  </Button>
</template>
```

## Variantes

<Canvas of={ButtonStories.Primary} />
<Canvas of={ButtonStories.Secondary} />

## Tailles

<Canvas of={ButtonStories.Large} />
<Canvas of={ButtonStories.Small} />
```

### Props Documentation

**Documentation des props** :
```typescript
// Button.stories.ts
const meta: Meta<typeof Button> = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'La variante visuelle du bouton',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'La taille du bouton',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      }
    }
  }
}
```

---

## 🚀 Déploiement

### Build Statique

**Configuration** :
```json
// package.json
{
  "scripts": {
    "build-storybook": "storybook build"
  }
}
```

**Build** :
```bash
npm run build-storybook
```

### Déploiement sur Netlify

**Configuration** :
```toml
# netlify.toml
[build]
  command = "npm run build-storybook"
  publish = "storybook-static"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Déploiement sur Vercel

**Configuration** :
```json
// vercel.json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static"
}
```

### Déploiement avec GitHub Pages

**GitHub Actions** :
```yaml
# .github/workflows/storybook.yml
name: Deploy Storybook

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build Storybook
        run: npm run build-storybook
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-static
```

---

## 🎯 Bonnes Pratiques

### 1. Organisation des Stories

```bash
src/
├── components/
│   ├── Button/
│   │   ├── Button.vue
│   │   ├── Button.stories.ts
│   │   └── Button.test.ts
│   └── Card/
│       ├── Card.vue
│       ├── Card.stories.ts
│       └── Card.test.ts
└── stories/
    ├── Introduction.stories.mdx
    └── DesignSystem.stories.mdx
```

### 2. Naming Convention

```typescript
// Bonnes pratiques de nommage
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Organisation hiérarchique
  component: Button,
  tags: ['autodocs']
}

// Stories avec noms descriptifs
export const PrimaryButton: Story = { /* ... */ }
export const LargePrimaryButton: Story = { /* ... */ }
export const DisabledButton: Story = { /* ... */ }
```

### 3. Args et Controls

```typescript
// Configuration des contrôles
const meta: Meta<typeof Button> = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'Variante du bouton'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: { type: 'boolean' }
    },
    onClick: { action: 'clicked' } // Actions
  }
}
```

### 4. Tests et Interactions

```typescript
// Tests d'interactions
export const InteractiveExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test d'accessibilité
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()
    
    // Test d'interaction
    await userEvent.click(button)
    
    // Vérification de l'état
    await expect(button).toHaveClass('clicked')
  }
}
```

### 5. Documentation

```typescript
// Documentation complète
const meta: Meta<typeof Button> = {
  parameters: {
    docs: {
      description: {
        component: `
          Un composant bouton réutilisable avec support pour :
          - Plusieurs variantes (primary, secondary, danger)
          - Différentes tailles (small, medium, large)
          - États (normal, disabled, loading)
          - Accessibilité complète
        `
      }
    }
  }
}
```

---

## 🎯 Exemples Complets

### Composant Button Complet

**`Button.vue`** :
```vue
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner" />
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--disabled': props.disabled,
    'btn--loading': props.loading
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
```

**`Button.stories.ts`** :
```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import { userEvent, within, expect } from '@storybook/test'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Un composant bouton réutilisable avec plusieurs variantes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'La variante visuelle du bouton'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'La taille du bouton'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Désactive le bouton'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Affiche un état de chargement'
    },
    onClick: { action: 'clicked' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Button'
  }
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button'
  }
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Danger Button'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button'
  }
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Button'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Button'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    label: 'Loading Button'
  }
}

export const WithClick: Story = {
  args: {
    label: 'Click me'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    await userEvent.click(button)
    
    // Vérifier que l'événement a été émis
    await expect(button).toBeInTheDocument()
  }
}
```

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
