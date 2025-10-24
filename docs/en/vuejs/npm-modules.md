# Vue 3 npm Modules - Complete Guide

> **Vue 3 npm Modules** - Complete collection of essential npm modules for developing modern and performant Vue 3 applications.

## 📋 Table of Contents
- [🎯 Overview](#-overview)
- [🔧 Build Tools & Dev Environment](#-build-tools--dev-environment)
- [⚡ Core Vue Ecosystem](#-core-vue-ecosystem)
- [🎨 UI & Styling](#-ui--styling)
- [📝 Forms & Validation](#-forms--validation)
- [🌐 HTTP & API](#-http--api)
- [🧪 Testing](#-testing)
- [🛠️ Development Tools](#️-development-tools)
- [⚡ Performance & Optimization](#-performance--optimization)
- [📦 Global Installation](#-global-installation)

---

## 🎯 Overview

This documentation covers all essential npm modules for developing modern Vue 3 applications, organized by category and importance level.

### 🎯 Module Categories

| Category | Description | Key Modules |
|----------|-------------|-------------|
| **Build Tools** | Build and development tools | Vite, vue-tsc |
| **Core Vue** | Official Vue ecosystem | Vue, Vue Router, Pinia |
| **UI & Styling** | Components and styles | Headless UI, Tailwind CSS |
| **Forms** | Form management | Zod, VeeValidate |
| **HTTP** | Requests and API | Axios, Vue Query |
| **Testing** | Testing and quality | Vitest, Vue Test Utils |
| **Dev Tools** | Development tools | ESLint, Prettier |
| **Performance** | Optimization | PWA, Auto-import |

---

## 🔧 Build Tools & Dev Environment

### Vite - Ultra-Fast Build Tool

**Description**: Modern and ultra-fast build tool for Vue 3, with instant HMR and native TypeScript support.

**Installation**:
```bash
npm create vue@latest my-project
# or
npm install -D vite @vitejs/plugin-vue
```

**Basic Configuration**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

**Use Cases**:
- Fast development with HMR
- Optimized production build
- Native TypeScript support
- Plugins and integrations

**Documentation**: [Vite](https://vitejs.dev/)

### @vitejs/plugin-vue - Vue Plugin for Vite

**Description**: Official plugin for integrating Vue 3 with Vite, supporting SFC, JSX and TypeScript.

**Installation**:
```bash
npm install -D @vitejs/plugin-vue
```

**Configuration**:
```typescript
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // Plugin options
      template: {
        compilerOptions: {
          // Compiler options
        }
      }
    })
  ]
})
```

**Features**:
- Single File Components support
- JSX/TSX support
- Native TypeScript
- Hot Module Replacement

### vue-tsc - TypeScript Type Checking

**Description**: TypeScript type checker specifically designed for Vue 3, based on the TypeScript compiler.

**Installation**:
```bash
npm install -D vue-tsc typescript
```

**Configuration**:
```json
// package.json
{
  "scripts": {
    "type-check": "vue-tsc --noEmit",
    "build": "vue-tsc && vite build"
  }
}
```

**Usage**:
```bash
# Type checking
vue-tsc --noEmit

# Build with checking
vue-tsc && vite build
```

---

## ⚡ Core Vue Ecosystem

### Vue 3 - Main Framework

**Description**: Progressive JavaScript framework for building modern user interfaces.

**Installation**:
```bash
npm install vue@^3.3.0
```

**Basic Usage**:
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

**Key Features**:
- Composition API
- Performant reactivity
- Native TypeScript
- Optimized tree-shaking

### Vue Router 4 - Official Routing

**Description**: Official router for Vue 3, with support for dynamic routes and navigation guards.

**Installation**:
```bash
npm install vue-router@^4.0.0
```

**Configuration**:
```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

**Usage in App**:
```typescript
// main.ts
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### Pinia - Official State Management

**Description**: Official store for Vue 3, replacing Vuex with a simpler API and native TypeScript.

**Installation**:
```bash
npm install pinia
```

**Configuration**:
```typescript
// stores/index.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return { count, increment, decrement }
})
```

**Usage**:
```typescript
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

---

## 🎨 UI & Styling

### @headlessui/vue - Accessible UI Components

**Description**: Accessible and unstyled UI components, perfect for Vue 3 applications.

**Installation**:
```bash
npm install @headlessui/vue
```

**Usage**:
```vue
<template>
  <div>
    <Menu as="div" class="relative">
      <MenuButton class="bg-blue-500 text-white px-4 py-2 rounded">
        Options
      </MenuButton>
      
      <MenuItems class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
        <MenuItem v-slot="{ active }">
          <a :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
            Account settings
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
```

### @heroicons/vue - SVG Icons

**Description**: Collection of optimized SVG icons, created by the makers of Tailwind CSS.

**Installation**:
```bash
npm install @heroicons/vue
```

**Usage**:
```vue
<template>
  <div>
    <HomeIcon class="h-6 w-6" />
    <UserIcon class="h-5 w-5 text-blue-500" />
  </div>
</template>

<script setup>
import { HomeIcon, UserIcon } from '@heroicons/vue/24/outline'
</script>
```

### Tailwind CSS - Utility-First CSS Framework

**Description**: Utility-first CSS framework for rapidly building modern interfaces.

**Installation**:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configuration**:
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Usage**:
```vue
<template>
  <div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">
      Title
    </h1>
    <p class="text-gray-600">
      Content with Tailwind CSS
    </p>
  </div>
</template>
```

### @vueuse/core - Composable Utilities Collection

**Description**: Collection of utility composables for Vue 3, covering many use cases.

**Installation**:
```bash
npm install @vueuse/core
```

**Usage**:
```typescript
// composables/useLocalStorage.ts
import { useLocalStorage, useDark, useToggle } from '@vueuse/core'

export const useTheme = () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)
  
  return {
    isDark: readonly(isDark),
    toggleDark
  }
}

// Usage
const { isDark, toggleDark } = useTheme()
```

---

## 📝 Forms & Validation

### Zod - TypeScript-First Schema Validation

**Description**: TypeScript-first schema validation library with automatic type inference.

**Installation**:
```bash
npm install zod
```

**Usage**:
```typescript
// schemas/user.schema.ts
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, 'Name must contain at least 2 characters'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Age must be at least 18')
})

export type User = z.infer<typeof userSchema>

// Validation
const result = userSchema.safeParse(userData)
if (!result.success) {
  console.error(result.error.issues)
}
```

### VeeValidate - Form Validation

**Description**: Form validation library for Vue 3, with TypeScript support.

**Installation**:
```bash
npm install vee-validate @vee-validate/zod
```

**Usage**:
```vue
<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <Field name="email" v-slot="{ field, errorMessage }">
      <input v-bind="field" type="email" />
      <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
    </Field>
    
    <button type="submit">Submit</button>
  </Form>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { userSchema } from '@/schemas/user.schema'

const schema = toTypedSchema(userSchema)

const onSubmit = (values) => {
  console.log('Form submitted:', values)
}
</script>
```

---

## 🌐 HTTP & API

### Axios - HTTP Client

**Description**: Promise-based HTTP client, perfect for API requests.

**Installation**:
```bash
npm install axios
```

**Configuration**:
```typescript
// api/client.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptors
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default apiClient
```

**Usage**:
```typescript
// composables/useApi.ts
import apiClient from '@/api/client'

export const useApi = () => {
  const get = async <T>(url: string): Promise<T> => {
    const response = await apiClient.get(url)
    return response.data
  }
  
  const post = async <T>(url: string, data: any): Promise<T> => {
    const response = await apiClient.post(url, data)
    return response.data
  }
  
  return { get, post }
}
```

### @tanstack/vue-query - Cache Management

**Description**: Cache and request management library for Vue 3, with automatic synchronization.

**Installation**:
```bash
npm install @tanstack/vue-query
```

**Configuration**:
```typescript
// main.ts
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

const app = createApp(App)
app.use(VueQueryPlugin)
app.mount('#app')
```

**Usage**:
```typescript
// composables/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'

export const useUsers = () => {
  const queryClient = useQueryClient()
  
  // Query
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.get('/users').then(res => res.data)
  })
  
  // Mutation
  const createUserMutation = useMutation({
    mutationFn: (userData) => apiClient.post('/users', userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  
  return {
    users,
    isLoading,
    error,
    createUser: createUserMutation.mutate
  }
}
```

---

## 🧪 Testing

### Vitest - Testing Framework

**Description**: Ultra-fast testing framework, Jest-compatible and optimized for Vite.

**Installation**:
```bash
npm install -D vitest @vitest/ui
```

**Configuration**:
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true
  }
})
```

**Usage**:
```typescript
// tests/composables/useCounter.test.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  it('should increment counter', () => {
    const { count, increment } = useCounter()
    
    expect(count.value).toBe(0)
    increment()
    expect(count.value).toBe(1)
  })
})
```

### @vue/test-utils - Vue Testing Utilities

**Description**: Official utilities for testing Vue 3 components.

**Installation**:
```bash
npm install -D @vue/test-utils
```

**Usage**:
```typescript
// tests/components/Button.test.ts
import { mount } from '@vue/test-utils'
import Button from '@/components/Button.vue'

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      props: { label: 'Click me' }
    })
    
    expect(wrapper.text()).toBe('Click me')
  })
  
  it('emits click event', async () => {
    const wrapper = mount(Button)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

---

## 🛠️ Development Tools

### ESLint - Linting

**Description**: JavaScript/TypeScript linter for maintaining code quality.

**Installation**:
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue
```

**Configuration**:
```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // Custom rules
  }
}
```

### Prettier - Code Formatting

**Description**: Code formatter for maintaining consistent style.

**Installation**:
```bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

**Configuration**:
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

## ⚡ Performance & Optimization

### vite-plugin-pwa - PWA Support

**Description**: Vite plugin for transforming your app into a Progressive Web App.

**Installation**:
```bash
npm install -D vite-plugin-pwa
```

**Configuration**:
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'My Vue 3 App',
        short_name: 'Vue3App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

### unplugin-vue-components - Auto-import

**Description**: Automatic component import, reducing manual imports.

**Installation**:
```bash
npm install -D unplugin-vue-components
```

**Configuration**:
```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true, // Generate TypeScript types
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true
    })
  ]
})
```

---

## 📦 Global Installation

### Complete Package.json

```json
{
  "name": "vue3-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix",
    "format": "prettier --write ."
  },
  "dependencies": {
    "vue": "^3.3.8",
    "vue-router": "^4.2.5",
    "pinia": "^2.1.7",
    "@headlessui/vue": "^1.7.16",
    "@heroicons/vue": "^2.0.18",
    "@vueuse/core": "^10.5.0",
    "axios": "^1.6.2",
    "zod": "^3.22.4",
    "vee-validate": "^4.11.8",
    "@vee-validate/zod": "^4.11.8",
    "@tanstack/vue-query": "^5.8.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.5.0",
    "@vue/tsconfig": "^0.4.0",
    "typescript": "~5.2.0",
    "vite": "^5.0.0",
    "vue-tsc": "^1.8.22",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "@vue/test-utils": "^2.4.2",
    "jsdom": "^23.0.1",
    "eslint": "^8.53.0",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint-plugin-vue": "^9.18.1",
    "prettier": "^3.1.0",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "vite-plugin-pwa": "^0.17.4",
    "unplugin-vue-components": "^0.25.2"
  }
}
```

### One-Command Installation

```bash
# Create new Vue 3 project with all modules
npm create vue@latest my-vue3-project
cd my-vue3-project

# Install additional modules
npm install @headlessui/vue @heroicons/vue @vueuse/core axios zod vee-validate @vee-validate/zod @tanstack/vue-query

# Install dev dependencies
npm install -D @vitest/ui @vue/test-utils jsdom eslint-plugin-vue prettier tailwindcss postcss autoprefixer vite-plugin-pwa unplugin-vue-components
```

---

## 🎯 Best Practices

### 1. Module Organization

```bash
src/
├── components/          # Reusable components
├── composables/         # Custom composables
├── stores/             # Pinia stores
├── router/             # Vue Router configuration
├── api/                # API configuration
├── schemas/            # Validation schemas
├── types/              # TypeScript types
├── utils/              # Utilities
└── assets/             # Static assets
```

### 2. TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. Development Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore",
    "type-check": "vue-tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

---

<div align="center">

[![Back to Profile](https://img.shields.io/badge/🏠_Back_to_Profile-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
