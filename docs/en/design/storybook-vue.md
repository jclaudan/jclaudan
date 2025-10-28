# Storybook for Vue 3 - Complete Guide

> **Storybook Vue 3** - Complete guide for setting up and using Storybook with Vue 3, including Figma integration and best practices.

## 📋 Table of Contents
- [🎯 Overview](#-overview)
- [⚙️ Installation and Configuration](#️-installation-and-configuration)
- [📖 Creating Stories](#-creating-stories)
- [🔌 Essential Addons](#-essential-addons)
- [🎨 Figma Integration](#-figma-integration)
- [🧪 Testing and Interactions](#-testing-and-interactions)
- [📚 Component Documentation](#-component-documentation)
- [🚀 Deployment](#-deployment)
- [🎯 Best Practices](#-best-practices)

---

## 🎯 Overview

Storybook is a workshop for developing UI components in isolation. It allows you to build, test, and document Vue 3 components independently.

### 🎯 Storybook Benefits

| Benefit | Description |
|---------|-------------|
| **Isolated Development** | Develop components without dependencies |
| **Living Documentation** | Automatic component documentation |
| **Visual Testing** | Visual regression detection |
| **Collaboration** | Easy sharing with designers |
| **Design Integration** | Synchronization with Figma/Sketch |

### 🎯 Storybook Workflow

![Diagramme Mermaid](assets/mermaid/storybook-vue-0-en-design-storybook-vue.png)

---

## ⚙️ Installation and Configuration

### Initial Installation

```bash
# Initialize Storybook in existing Vue 3 project
npx storybook@latest init

# Or manual installation
npm install --save-dev @storybook/vue3 @storybook/addon-essentials
```

### Basic Configuration

**`.storybook/main.js`**:
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

**`.storybook/preview.js`**:
```javascript
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

// Global configuration
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

// Vue 3 configuration
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

### TypeScript Support

**`.storybook/main.js`** with TypeScript:
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

## 📖 Creating Stories

### CSF 3.0 Format

**`Button.stories.ts`**:
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

// Default story
export const Default: Story = {
  args: {
    label: 'Button'
  }
}

// Stories with variants
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

### Stories with Slots

**`Card.stories.ts`**:
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

### Stories with Composables

**`UserProfile.stories.ts`**:
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
      // Pinia configuration for tests
      setActivePinia(createPinia())
      return { args }
    },
    template: '<UserProfile v-bind="args" />'
  })
}
```

---

## 🔌 Essential Addons

### @storybook/addon-essentials

**Configuration**:
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    '@storybook/addon-essentials'
  ]
}
```

**Included Features**:
- **Controls**: Interactive controls for props
- **Actions**: Event logging
- **Viewport**: Test on different screen sizes
- **Backgrounds**: Background changes
- **Toolbars**: Custom toolbar
- **Measure**: Measurement tools
- **Outline**: Element outlines

### @storybook/addon-a11y - Accessibility

**Installation**:
```bash
npm install --save-dev @storybook/addon-a11y
```

**Configuration**:
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    '@storybook/addon-a11y'
  ]
}
```

**Usage**:
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

### @storybook/addon-interactions - Interaction Testing

**Installation**:
```bash
npm install --save-dev @storybook/addon-interactions @storybook/test
```

**Usage**:
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
    
    // Verify event was emitted
    await expect(button).toHaveTextContent('Clicked!')
  }
}
```

### storybook-addon-designs - Design Integration

**Installation**:
```bash
npm install --save-dev storybook-addon-designs
```

**Configuration**:
```javascript
// .storybook/main.js
module.exports = {
  addons: [
    'storybook-addon-designs'
  ]
}
```

**Usage with Figma**:
```typescript
// Button.stories.ts
export const WithFigmaDesign: Story = {
  args: {
    label: 'Button'
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/abc123/Design-System?node-id=1%3A2'
    }
  }
}
```

---

## 🎨 Figma Integration

### Figma Configuration

**1. Get Figma Link**:
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

**2. Multiple Design Embeds**:
```typescript
// Button.stories.ts
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

### Designer-Developer Workflow

**1. Design System Figma**:
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

**2. Components with Specs**:
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

### Design-Code Synchronization

**Automatic Configuration**:
```typescript
// .storybook/preview.js
export const parameters = {
  design: {
    // Global configuration
    defaultTab: 'design',
    hideInDocs: false
  }
}
```

---

## 🧪 Testing and Interactions

### Interaction Testing with Play

**Installation**:
```bash
npm install --save-dev @storybook/test
```

**Basic Tests**:
```typescript
// Button.stories.ts
import { userEvent, within, expect } from '@storybook/test'

export const ClickTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    
    await userEvent.click(button)
    
    // Verify state after click
    await expect(button).toHaveClass('clicked')
  }
}
```

**Form Testing**:
```typescript
// Form.stories.ts
export const FormSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Fill form
    await userEvent.type(canvas.getByLabelText('Name'), 'John Doe')
    await userEvent.type(canvas.getByLabelText('Email'), 'john@example.com')
    
    // Submit
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }))
    
    // Verify result
    await expect(canvas.getByText('Form submitted!')).toBeInTheDocument()
  }
}
```

### Visual Testing with Chromatic

**Installation**:
```bash
npm install --save-dev chromatic
```

**Configuration**:
```json
// package.json
{
  "scripts": {
    "chromatic": "chromatic --project-token=your-token"
  }
}
```

**Usage**:
```bash
# Deploy to Chromatic
npm run chromatic

# Local tests
npx chromatic --build-script-name=build-storybook
```

---

## 📚 Component Documentation

### Automatic Documentation

**Configuration**:
```typescript
// Button.stories.ts
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // Enable automatic documentation
  parameters: {
    docs: {
      description: {
        component: 'A reusable button component with multiple variants.'
      }
    }
  }
}
```

### Custom Documentation

**MDX Documentation**:
```mdx
<!-- Button.mdx -->
import { Meta, Story, Canvas } from '@storybook/blocks'
import * as ButtonStories from './Button.stories'

<Meta of={ButtonStories} />

# Button

A reusable button component with multiple variants and sizes.

## Usage

```vue
<template>
  <Button variant="primary" size="large">
    Click here
  </Button>
</template>
```

## Variants

<Canvas of={ButtonStories.Primary} />
<Canvas of={ButtonStories.Secondary} />

## Sizes

<Canvas of={ButtonStories.Large} />
<Canvas of={ButtonStories.Small} />
```

### Props Documentation

**Props Documentation**:
```typescript
// Button.stories.ts
const meta: Meta<typeof Button> = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'The visual variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' }
      }
    }
  }
}
```

---

## 🚀 Deployment

### Static Build

**Configuration**:
```json
// package.json
{
  "scripts": {
    "build-storybook": "storybook build"
  }
}
```

**Build**:
```bash
npm run build-storybook
```

### Netlify Deployment

**Configuration**:
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

### Vercel Deployment

**Configuration**:
```json
// vercel.json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static"
}
```

### GitHub Pages Deployment

**GitHub Actions**:
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

## 🎯 Best Practices

### 1. Story Organization

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
// Good naming practices
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Hierarchical organization
  component: Button,
  tags: ['autodocs']
}

// Stories with descriptive names
export const PrimaryButton: Story = { /* ... */ }
export const LargePrimaryButton: Story = { /* ... */ }
export const DisabledButton: Story = { /* ... */ }
```

### 3. Args and Controls

```typescript
// Control configuration
const meta: Meta<typeof Button> = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Button variant'
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

### 4. Testing and Interactions

```typescript
// Interaction tests
export const InteractiveExample: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Accessibility test
    const button = canvas.getByRole('button')
    await expect(button).toBeInTheDocument()
    
    // Interaction test
    await userEvent.click(button)
    
    // State verification
    await expect(button).toHaveClass('clicked')
  }
}
```

### 5. Documentation

```typescript
// Complete documentation
const meta: Meta<typeof Button> = {
  parameters: {
    docs: {
      description: {
        component: `
          A reusable button component with support for:
          - Multiple variants (primary, secondary, danger)
          - Different sizes (small, medium, large)
          - States (normal, disabled, loading)
          - Full accessibility
        `
      }
    }
  }
}
```

---

## 🎯 Complete Examples

### Complete Button Component

**`Button.vue`**:
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

**`Button.stories.ts`**:
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
        component: 'A reusable button component with multiple variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger'],
      description: 'The visual variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading state'
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
    
    // Verify event was emitted
    await expect(button).toBeInTheDocument()
  }
}
```

---

<div align="center">

[![Back to Profile](https://img.shields.io/badge/🏠_Back_to_Profile-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
