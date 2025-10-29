# Design Systems with Vue 3 - Complete Guide

> **Design Systems Vue 3** - Complete guide for creating, maintaining, and evolving a design system with Vue 3, including best practices and modern tools.

## 📋 Table of Contents
- [🎯 Overview](#-overview)
- [🏗️ Design System Concepts](#️-design-system-concepts)
- [🚀 Creating a Vue 3 Design System](#-creating-a-vue-3-design-system)
- [🛠️ Tools and Workflow](#️-tools-and-workflow)
- [📚 Design System Examples](#-design-system-examples)
- [🎯 Best Practices](#-best-practices)
- [🔄 Evolution and Maintenance](#-evolution-and-maintenance)

---

## 🎯 Overview

A design system is a collection of reusable components, rules, and tools that enable creating consistent and maintainable interfaces. With Vue 3, it's possible to create robust and scalable design systems.

### 🎯 Design System Benefits

| Benefit | Description | Impact |
|---------|-------------|---------|
| **Consistency** | Uniform interface | Better UX |
| **Efficiency** | Faster development | Cost reduction |
| **Maintainability** | Centralized code | Simplified maintenance |
| **Collaboration** | Common language | Better communication |
| **Scalability** | Modular architecture | Facilitated growth |

### 🎯 Design System Architecture

![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/design-systems-vue-0-en-design-design-systems-vue.png)

---

## 🏗️ Design System Concepts

### Atomic Design Methodology

**1. Atoms** - Basic elements:
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

**2. Molecules** - Atom combinations:
```vue
<!-- SearchBox.vue -->
<template>
  <div class="search-box">
    <Icon name="search" class="search-icon" />
    <Input
      v-model="query"
      placeholder="Search..."
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

**3. Organisms** - Complex sections:
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

### Design Tokens

**1. Token Structure**:
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

**2. CSS Variables**:
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

## 🚀 Creating a Vue 3 Design System

### Project Structure

```
design-system/
├── 📁 packages/
│   ├── 📁 core/                 # Main package
│   │   ├── 📁 src/
│   │   │   ├── 📁 components/   # Components
│   │   │   ├── 📁 tokens/       # Design tokens
│   │   │   ├── 📁 styles/       # Global styles
│   │   │   └── 📁 utils/        # Utilities
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── 📁 vue/                  # Vue adapter
│   │   ├── 📁 src/
│   │   │   └── 📁 components/
│   │   └── package.json
│   └── 📁 react/                # React adapter (optional)
├── 📁 docs/                     # Documentation
│   ├── 📁 storybook/
│   └── 📁 guidelines/
├── 📁 tools/                    # Build tools
└── package.json
```

### Main Package Configuration

**`packages/core/package.json`**:
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

**`packages/core/vite.config.ts`**:
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

### Base Components

**`packages/core/src/components/Button/Button.vue`**:
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

### Theming System

**`packages/core/src/themes/ThemeProvider.vue`**:
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

// Provide theme to child components
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

### Vue Adapter

**`packages/vue/src/index.ts`**:
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

## 🛠️ Tools and Workflow

### Storybook as Source of Truth

**Storybook Configuration**:
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

**Design System Stories**:
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
        component: 'Design system button component with multiple variants.'
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

### Design-Code Synchronization

**1. Figma Integration**:
```typescript
// .storybook/preview.js
export const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/abc123/Design-System'
  }
}
```

**2. Design Tokens Sync**:
```javascript
// tools/sync-tokens.js
// Script to synchronize tokens from Figma

const syncDesignTokens = async () => {
  // 1. Fetch tokens from Figma API
  const figmaTokens = await fetchFigmaTokens()
  
  // 2. Convert to CSS/JS format
  const cssTokens = convertToCSS(figmaTokens)
  const jsTokens = convertToJS(figmaTokens)
  
  // 3. Write files
  await writeFile('src/tokens/design-tokens.css', cssTokens)
  await writeFile('src/tokens/design-tokens.ts', jsTokens)
  
  // 4. Update Storybook
  await updateStorybook()
}
```

### Visual Testing with Chromatic

**Chromatic Configuration**:
```json
// package.json
{
  "scripts": {
    "chromatic": "chromatic --project-token=your-token"
  }
}
```

**Regression Testing**:
```typescript
// tests/visual-regression.test.ts
import { test, expect } from '@playwright/test'

test('Button visual regression', async ({ page }) => {
  await page.goto('/storybook/iframe.html?id=button--all-variants')
  
  await expect(page).toHaveScreenshot('button-all-variants.png')
})
```

---

## 📚 Design System Examples

### Vuetify 3

**Features**:
- Complete UI framework for Vue 3
- Material Design
- Advanced theming
- Accessible components

**Usage**:
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

**Features**:
- Rich components
- Multiple themes
- Accessibility
- Optimized performance

**Usage**:
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

**Features**:
- Native TypeScript
- Flexible theming
- Modern components
- Performance

**Usage**:
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

**Features**:
- Enterprise components
- Customizable themes
- Complete documentation
- i18n support

**Usage**:
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

## 🎯 Best Practices

### 1. Architecture and Organization

**Modular Structure**:
```bash
components/
├── 📁 atoms/           # Basic elements
│   ├── Button/
│   ├── Input/
│   └── Icon/
├── 📁 molecules/       # Combinations
│   ├── SearchBox/
│   ├── FormField/
│   └── Card/
├── 📁 organisms/       # Complex sections
│   ├── Header/
│   ├── Navigation/
│   └── ProductList/
└── 📁 templates/       # Layouts
    ├── PageLayout/
    └── DashboardLayout/
```

### 2. Naming Convention

**Naming Conventions**:
```typescript
// Components: PascalCase
Button.vue
SearchBox.vue
ProductCard.vue

// Props: camelCase
interface Props {
  isVisible: boolean
  maxItems: number
  onItemClick: (item: Item) => void
}

// Events: kebab-case
emit('item-click', item)
emit('form-submit', data)
```

### 3. Documentation

**Component Documentation**:
```typescript
// Button.vue
/**
 * Reusable button component
 * 
 * @example
 * <Button variant="primary" size="lg" @click="handleClick">
 *   Click here
 * </Button>
 */
export default defineComponent({
  name: 'Button',
  props: {
    /**
     * Button visual variant
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

### 4. Testing

**Unit Tests**:
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

### 5. Accessibility

**Accessibility Standards**:
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

## 🔄 Evolution and Maintenance

### Versioning

**Versioning Strategy**:
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

**Migration Guide**:
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

### Monitoring and Analytics

**Usage Tracking**:
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

[![Back to Profile](https://img.shields.io/badge/🏠_Back_to_Profile-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
