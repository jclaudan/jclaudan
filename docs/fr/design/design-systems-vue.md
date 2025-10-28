# Design Systems avec Vue 3 - Guide Complet

> **Design Systems Vue 3** - Guide complet pour créer, maintenir et évoluer un design system avec Vue 3, incluant les meilleures pratiques et outils modernes.

## 📋 Table des matières
- [🎯 Vue d'ensemble](#-vue-densemble)
- [🏗️ Concepts de Design System](#️-concepts-de-design-system)
- [🚀 Création d'un Design System Vue 3](#-création-dun-design-system-vue-3)
- [🛠️ Outils et Workflow](#️-outils-et-workflow)
- [📚 Exemples de Design Systems](#-exemples-de-design-systems)
- [🎯 Bonnes Pratiques](#-bonnes-pratiques)
- [🔄 Évolution et Maintenance](#-évolution-et-maintenance)

---

## 🎯 Vue d'ensemble

Un design system est une collection de composants, règles et outils réutilisables qui permettent de créer des interfaces cohérentes et maintenables. Avec Vue 3, il est possible de créer des design systems robustes et évolutifs.

### 🎯 Bénéfices d'un Design System

| Bénéfice | Description | Impact |
|----------|-------------|---------|
| **Cohérence** | Interface uniforme | Meilleure UX |
| **Efficacité** | Développement plus rapide | Réduction des coûts |
| **Maintenabilité** | Code centralisé | Maintenance simplifiée |
| **Collaboration** | Langage commun | Meilleure communication |
| **Évolutivité** | Architecture modulaire | Croissance facilitée |

### 🎯 Architecture d'un Design System

![Diagramme Mermaid](assets/mermaid/design-systems-vue-0-fr-design-design-systems-vue.png)

---

## 🏗️ Concepts de Design System

### Atomic Design Methodology

**1. Atomes** - Éléments de base :
```vue
<!-- Button.vue -->
<template>
  <button :class="buttonClasses" @click="$emit('click')">
    <slot />
  </button>
</template>

<!-- Input.vue -->
<template>
  <input :class="inputClasses" v-bind="$attrs" />
</template>

<!-- Icon.vue -->
<template>
  <svg :class="iconClasses" v-bind="$attrs">
    <use :href="`#icon-${name}`" />
  </svg>
</template>
```

**2. Molécules** - Combinaisons d'atomes :
```vue
<!-- SearchBox.vue -->
<template>
  <div class="search-box">
    <Icon name="search" class="search-icon" />
    <Input
      v-model="query"
      placeholder="Rechercher..."
      class="search-input"
    />
    <Button v-if="query" @click="clear" variant="ghost">
      <Icon name="close" />
    </Button>
  </div>
</template>

<!-- FormField.vue -->
<template>
  <div class="form-field">
    <Label v-if="label" :for="id">{{ label }}</Label>
    <Input :id="id" v-bind="$attrs" />
    <ErrorMessage v-if="error" :message="error" />
  </div>
</template>
```

**3. Organismes** - Sections complexes :
```vue
<!-- Header.vue -->
<template>
  <header class="header">
    <Logo />
    <Navigation :items="navItems" />
    <UserMenu :user="currentUser" />
  </header>
</template>

<!-- ProductCard.vue -->
<template>
  <article class="product-card">
    <ProductImage :src="product.image" :alt="product.name" />
    <ProductInfo :product="product" />
    <ProductActions :product="product" />
  </article>
</template>
```

### Tokens de Design

**1. Structure des tokens** :
```typescript
// design-tokens.ts
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      900: '#1e3a8a'
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
}
```

**2. CSS Variables** :
```css
/* design-tokens.css */
:root {
  /* Colors */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  /* Typography */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  
  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
```

---

## 🚀 Création d'un Design System Vue 3

### Structure de Projet

```
design-system/
├── 📁 packages/
│   ├── 📁 core/                 # Package principal
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/   # Composants
│   │   │   ├── 📁 tokens/       # Tokens de design
│   │   │   ├── 📁 styles/       # Styles globaux
│   │   │   └── 📁 utils/        # Utilitaires
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── 📁 vue/                  # Adapter Vue
│   │   ├── 📁 src/
│   │   │   └── 📁 components/
│   │   └── package.json
│   └── 📁 react/                # Adapter React (optionnel)
├── 📁 docs/                     # Documentation
│   ├── 📁 storybook/
│   └── 📁 guidelines/
├── 📁 tools/                    # Outils de build
└── package.json
```

### Configuration du Package Principal

**`packages/core/package.json`** :
```json
{
  "name": "@my-org/design-system-core",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch",
    "type-check": "vue-tsc --noEmit"
  },
  "peerDependencies": {
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "vue": "^3.3.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-vue": "^4.0.0"
  }
}
```

**`packages/core/vite.config.ts`** :
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystemCore',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

### Composants de Base

**`packages/core/src/components/Button/Button.vue`** :
```vue
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <Icon v-if="icon" :name="icon" class="button-icon" />
    <span v-if="$slots.default" class="button-content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../Icon/Icon.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  icon?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button'
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
    'btn--icon-only': props.icon && !$slots.default
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
  @apply inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn--primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
}

.btn--secondary {
  @apply bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500;
}

.btn--ghost {
  @apply bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500;
}

.btn--danger {
  @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
}

.btn--sm {
  @apply px-3 py-1.5 text-sm rounded-md;
}

.btn--md {
  @apply px-4 py-2 text-base rounded-lg;
}

.btn--lg {
  @apply px-6 py-3 text-lg rounded-lg;
}

.btn--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.btn--icon-only {
  @apply p-2;
}

.button-icon {
  @apply w-4 h-4;
}

.button-content {
  @apply ml-2;
}
</style>
```

### Système de Thématisation

**`packages/core/src/themes/ThemeProvider.vue`** :
```vue
<template>
  <div :class="themeClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

interface Props {
  theme?: 'light' | 'dark' | 'auto'
  colorScheme?: 'blue' | 'green' | 'purple'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  colorScheme: 'blue'
})

const themeClasses = computed(() => [
  'theme-provider',
  `theme--${props.theme}`,
  `color-scheme--${props.colorScheme}`
])

// Fournir le thème aux composants enfants
provide('theme', {
  theme: props.theme,
  colorScheme: props.colorScheme
})
</script>

<style scoped>
.theme-provider {
  @apply min-h-screen;
}

.theme--light {
  @apply bg-white text-gray-900;
}

.theme--dark {
  @apply bg-gray-900 text-white;
}

.color-scheme--blue {
  --color-primary: theme('colors.blue.600');
  --color-primary-hover: theme('colors.blue.700');
}

.color-scheme--green {
  --color-primary: theme('colors.green.600');
  --color-primary-hover: theme('colors.green.700');
}

.color-scheme--purple {
  --color-primary: theme('colors.purple.600');
  --color-primary-hover: theme('colors.purple.700');
}
</style>
```

### Adapter Vue

**`packages/vue/src/index.ts`** :
```typescript
import { App } from 'vue'
import { Button } from '@my-org/design-system-core'
import { Input } from '@my-org/design-system-core'
import { Card } from '@my-org/design-system-core'

const components = {
  Button,
  Input,
  Card
}

export const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export * from '@my-org/design-system-core'
export default { install }
```

---

## 🛠️ Outils et Workflow

### Storybook comme Source de Vérité

**Configuration Storybook** :
```javascript
// .storybook/main.js
module.exports = {
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-designs'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
}
```

**Stories pour le Design System** :
```typescript
// packages/core/src/components/Button/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Composant bouton du design system avec plusieurs variantes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="space-y-4">
        <div class="space-x-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div class="space-x-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    `
  })
}
```

### Synchronisation Design-Code

**1. Figma Integration** :
```typescript
// .storybook/preview.js
export const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/abc123/Design-System'
  }
}
```

**2. Design Tokens Sync** :
```javascript
// tools/sync-tokens.js
// Script pour synchroniser les tokens depuis Figma

const syncDesignTokens = async () => {
  // 1. Récupérer les tokens depuis Figma API
  const figmaTokens = await fetchFigmaTokens()
  
  // 2. Convertir vers format CSS/JS
  const cssTokens = convertToCSS(figmaTokens)
  const jsTokens = convertToJS(figmaTokens)
  
  // 3. Écrire les fichiers
  await writeFile('src/tokens/design-tokens.css', cssTokens)
  await writeFile('src/tokens/design-tokens.ts', jsTokens)
  
  // 4. Mettre à jour Storybook
  await updateStorybook()
}
```

### Tests Visuels avec Chromatic

**Configuration Chromatic** :
```json
// package.json
{
  "scripts": {
    "chromatic": "chromatic --project-token=your-token"
  }
}
```

**Tests de régression** :
```typescript
// tests/visual-regression.test.ts
import { test, expect } from '@playwright/test'

test('Button visual regression', async ({ page }) => {
  await page.goto('/storybook/iframe.html?id=button--all-variants')
  
  await expect(page).toHaveScreenshot('button-all-variants.png')
})
```

---

## 📚 Exemples de Design Systems

### Vuetify 3

**Caractéristiques** :
- Framework UI complet pour Vue 3
- Material Design
- Thématisation avancée
- Composants accessibles

**Utilisation** :
```bash
npm install vuetify
```

```typescript
// main.ts
import { createApp } from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'

const app = createApp(App)
app.use(Vuetify)
app.mount('#app')
```

### PrimeVue

**Caractéristiques** :
- Composants riches
- Thèmes multiples
- Accessibilité
- Performance optimisée

**Utilisation** :
```bash
npm install primevue
```

```vue
<template>
  <Button label="Click" icon="pi pi-check" />
  <DataTable :value="products" />
</template>
```

### Naive UI

**Caractéristiques** :
- TypeScript natif
- Thématisation flexible
- Composants modernes
- Performance

**Utilisation** :
```bash
npm install naive-ui
```

```vue
<template>
  <n-button type="primary">Primary</n-button>
  <n-data-table :columns="columns" :data="data" />
</template>
```

### Element Plus

**Caractéristiques** :
- Composants d'entreprise
- Thèmes personnalisables
- Documentation complète
- Support i18n

**Utilisation** :
```bash
npm install element-plus
```

```vue
<template>
  <el-button type="primary">Primary</el-button>
  <el-table :data="tableData" />
</template>
```

---

## 🎯 Bonnes Pratiques

### 1. Architecture et Organisation

**Structure modulaire** :
```bash
components/
├── 📁 atoms/           # Éléments de base
│   ├── Button/
│   ├── Input/
│   └── Icon/
├── 📁 molecules/       # Combinaisons
│   ├── SearchBox/
│   ├── FormField/
│   └── Card/
├── 📁 organisms/       # Sections complexes
│   ├── Header/
│   ├── Navigation/
│   └── ProductList/
└── 📁 templates/       # Layouts
    ├── PageLayout/
    └── DashboardLayout/
```

### 2. Naming Convention

**Conventions de nommage** :
```typescript
// Composants : PascalCase
Button.vue
SearchBox.vue
ProductCard.vue

// Props : camelCase
interface Props {
  isVisible: boolean
  maxItems: number
  onItemClick: (item: Item) => void
}

// Events : kebab-case
emit('item-click', item)
emit('form-submit', data)
```

### 3. Documentation

**Documentation des composants** :
```typescript
// Button.vue
/**
 * Composant bouton réutilisable
 * 
 * @example
 * <Button variant="primary" size="lg" @click="handleClick">
 *   Cliquer ici
 * </Button>
 */
export default defineComponent({
  name: 'Button',
  props: {
    /**
     * Variante visuelle du bouton
     * @type {'primary' | 'secondary' | 'ghost' | 'danger'}
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value: string) => 
        ['primary', 'secondary', 'ghost', 'danger'].includes(value)
    }
  }
})
```

### 4. Tests

**Tests unitaires** :
```typescript
// Button.test.ts
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders with correct variant', () => {
    const wrapper = mount(Button, {
      props: { variant: 'primary' }
    })
    
    expect(wrapper.classes()).toContain('btn--primary')
  })
  
  it('emits click event', async () => {
    const wrapper = mount(Button)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### 5. Accessibilité

**Standards d'accessibilité** :
```vue
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :aria-pressed="pressed"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  ariaLabel?: string
  pressed?: boolean
  disabled?: boolean
}

// Focus management
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick()
  }
}
</script>
```

---

## 🔄 Évolution et Maintenance

### Versioning

**Stratégie de versioning** :
```json
// package.json
{
  "version": "1.2.0",
  "changelog": {
    "1.2.0": {
      "added": ["New Button variants"],
      "changed": ["Updated color palette"],
      "deprecated": ["Old Card component"],
      "removed": ["Legacy Input styles"],
      "fixed": ["Accessibility issues"]
    }
  }
}
```

### Migration Guide

**Guide de migration** :
```markdown
# Migration Guide v1.2.0

## Breaking Changes

### Button Component
- `size` prop values changed: `small` → `sm`, `large` → `lg`
- `variant` prop: `outline` → `ghost`

### Before
```vue
<Button size="small" variant="outline">Click</Button>
```

### After
```vue
<Button size="sm" variant="ghost">Click</Button>
```
```

### Monitoring et Analytics

**Suivi d'utilisation** :
```typescript
// analytics.ts
export const trackComponentUsage = (componentName: string, props: any) => {
  analytics.track('component_used', {
    component: componentName,
    props: Object.keys(props),
    timestamp: Date.now()
  })
}
```

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
