# Modules npm Vue 3 - Guide Complet

> **Modules npm Vue 3** - Collection complète des modules npm essentiels pour développer des applications Vue 3 modernes et performantes.

## 📋 Table des matières
- [🎯 Vue d'ensemble](#-vue-densemble)
- [🔧 Build Tools & Dev Environment](#-build-tools--dev-environment)
- [⚡ Core Vue Ecosystem](#-core-vue-ecosystem)
- [🎨 UI & Styling](#-ui--styling)
- [📝 Forms & Validation](#-forms--validation)
- [🌐 HTTP & API](#-http--api)
- [🧪 Testing](#-testing)
- [🛠️ Development Tools](#️-development-tools)
- [⚡ Performance & Optimization](#-performance--optimization)
- [📦 Installation Globale](#-installation-globale)

---

## 🎯 Vue d'ensemble

Cette documentation couvre tous les modules npm essentiels pour développer des applications Vue 3 modernes, organisés par catégorie et niveau d'importance.

### 🎯 Catégories de Modules

| Catégorie | Description | Modules Clés |
|-----------|-------------|--------------|
| **Build Tools** | Outils de build et développement | Vite, vue-tsc |
| **Core Vue** | Écosystème Vue officiel | Vue, Vue Router, Pinia |
| **UI & Styling** | Composants et styles | Headless UI, Tailwind CSS |
| **Forms** | Gestion des formulaires | Zod, VeeValidate |
| **HTTP** | Requêtes et API | Axios, Vue Query |
| **Testing** | Tests et qualité | Vitest, Vue Test Utils |
| **Dev Tools** | Outils de développement | ESLint, Prettier |
| **Performance** | Optimisation | PWA, Auto-import |

---

## 🔧 Build Tools & Dev Environment

### Vite - Build Tool Ultra-Rapide

**Description** : Build tool moderne et ultra-rapide pour Vue 3, avec HMR instantané et support TypeScript natif.

**Installation** :
```bash
npm create vue@latest mon-projet
# ou
npm install -D vite @vitejs/plugin-vue
```

**Configuration de base** :
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

**Cas d'usage** :
- Développement rapide avec HMR
- Build optimisé pour production
- Support TypeScript natif
- Plugins et intégrations

**Documentation** : [Vite](https://vitejs.dev/)

### @vitejs/plugin-vue - Plugin Vue pour Vite

**Description** : Plugin officiel pour intégrer Vue 3 avec Vite, supportant SFC, JSX et TypeScript.

**Installation** :
```bash
npm install -D @vitejs/plugin-vue
```

**Configuration** :
```typescript
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // Options du plugin
      template: {
        compilerOptions: {
          // Options du compilateur
        }
      }
    })
  ]
})
```

**Fonctionnalités** :
- Support des Single File Components
- Support JSX/TSX
- TypeScript natif
- Hot Module Replacement

### vue-tsc - Type Checking TypeScript

**Description** : Type checker TypeScript spécialement conçu pour Vue 3, basé sur le compilateur TypeScript.

**Installation** :
```bash
npm install -D vue-tsc typescript
```

**Configuration** :
```json
// package.json
{
  "scripts": {
    "type-check": "vue-tsc --noEmit",
    "build": "vue-tsc && vite build"
  }
}
```

**Utilisation** :
```bash
# Vérification des types
vue-tsc --noEmit

# Build avec vérification
vue-tsc && vite build
```

---

## ⚡ Core Vue Ecosystem

### Vue 3 - Framework Principal

**Description** : Framework JavaScript progressif pour construire des interfaces utilisateur modernes.

**Installation** :
```bash
npm install vue@^3.3.0
```

**Utilisation de base** :
```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

**Fonctionnalités clés** :
- Composition API
- Reactivité performante
- TypeScript natif
- Tree-shaking optimisé

### Vue Router 4 - Routage Officiel

**Description** : Routeur officiel pour Vue 3, avec support des routes dynamiques et navigation guards.

**Installation** :
```bash
npm install vue-router@^4.0.0
```

**Configuration** :
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

**Utilisation dans l'app** :
```typescript
// main.ts
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### Pinia - State Management Officiel

**Description** : Store officiel pour Vue 3, remplaçant Vuex avec une API plus simple et TypeScript natif.

**Installation** :
```bash
npm install pinia
```

**Configuration** :
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

**Utilisation** :
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

### @headlessui/vue - Composants UI Accessibles

**Description** : Composants UI accessibles et sans style, parfait pour les applications Vue 3.

**Installation** :
```bash
npm install @headlessui/vue
```

**Utilisation** :
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

### @heroicons/vue - Icônes SVG

**Description** : Collection d'icônes SVG optimisées, créées par les makers de Tailwind CSS.

**Installation** :
```bash
npm install @heroicons/vue
```

**Utilisation** :
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

### Tailwind CSS - Framework CSS Utility-First

**Description** : Framework CSS utility-first pour construire rapidement des interfaces modernes.

**Installation** :
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configuration** :
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

**Utilisation** :
```vue
<template>
  <div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-2xl font-bold text-gray-900 mb-4">
      Titre
    </h1>
    <p class="text-gray-600">
      Contenu avec Tailwind CSS
    </p>
  </div>
</template>
```

### @vueuse/core - Collection de Composables

**Description** : Collection de composables utilitaires pour Vue 3, couvrant de nombreux cas d'usage.

**Installation** :
```bash
npm install @vueuse/core
```

**Utilisation** :
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

// Utilisation
const { isDark, toggleDark } = useTheme()
```

---

## 📝 Forms & Validation

### Zod - Validation de Schémas TypeScript

**Description** : Bibliothèque de validation TypeScript-first avec inférence de types automatique.

**Installation** :
```bash
npm install zod
```

**Utilisation** :
```typescript
// schemas/user.schema.ts
import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  age: z.number().min(18, 'L\'âge doit être d\'au moins 18 ans')
})

export type User = z.infer<typeof userSchema>

// Validation
const result = userSchema.safeParse(userData)
if (!result.success) {
  console.error(result.error.issues)
}
```

### VeeValidate - Validation de Formulaires

**Description** : Bibliothèque de validation de formulaires pour Vue 3, avec support TypeScript.

**Installation** :
```bash
npm install vee-validate @vee-validate/zod
```

**Utilisation** :
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

### Axios - Client HTTP

**Description** : Client HTTP basé sur les promesses, parfait pour les requêtes API.

**Installation** :
```bash
npm install axios
```

**Configuration** :
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

// Intercepteurs
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

**Utilisation** :
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

### @tanstack/vue-query - Gestion du Cache

**Description** : Bibliothèque de gestion du cache et des requêtes pour Vue 3, avec synchronisation automatique.

**Installation** :
```bash
npm install @tanstack/vue-query
```

**Configuration** :
```typescript
// main.ts
import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'

const app = createApp(App)
app.use(VueQueryPlugin)
app.mount('#app')
```

**Utilisation** :
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

### Vitest - Framework de Test

**Description** : Framework de test ultra-rapide, compatible avec Jest et optimisé pour Vite.

**Installation** :
```bash
npm install -D vitest @vitest/ui
```

**Configuration** :
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

**Utilisation** :
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

### @vue/test-utils - Utilitaires de Test Vue

**Description** : Utilitaires officiels pour tester les composants Vue 3.

**Installation** :
```bash
npm install -D @vue/test-utils
```

**Utilisation** :
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

**Description** : Linter JavaScript/TypeScript pour maintenir la qualité du code.

**Installation** :
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue
```

**Configuration** :
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
    // Règles personnalisées
  }
}
```

### Prettier - Formatage de Code

**Description** : Formateur de code pour maintenir un style cohérent.

**Installation** :
```bash
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

**Configuration** :
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

### vite-plugin-pwa - Support PWA

**Description** : Plugin Vite pour transformer votre app en Progressive Web App.

**Installation** :
```bash
npm install -D vite-plugin-pwa
```

**Configuration** :
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
        name: 'Mon App Vue 3',
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

**Description** : Auto-import automatique des composants Vue, réduisant les imports manuels.

**Installation** :
```bash
npm install -D unplugin-vue-components
```

**Configuration** :
```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true, // Générer les types TypeScript
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true
    })
  ]
})
```

---

## 📦 Installation Globale

### Package.json Complet

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

### Installation en une commande

```bash
# Créer un nouveau projet Vue 3 avec tous les modules
npm create vue@latest mon-projet-vue3
cd mon-projet-vue3

# Installer les modules supplémentaires
npm install @headlessui/vue @heroicons/vue @vueuse/core axios zod vee-validate @vee-validate/zod @tanstack/vue-query

# Installer les dev dependencies
npm install -D @vitest/ui @vue/test-utils jsdom eslint-plugin-vue prettier tailwindcss postcss autoprefixer vite-plugin-pwa unplugin-vue-components
```

---

## 🎯 Bonnes Pratiques

### 1. Organisation des Modules

```bash
src/
├── components/          # Composants réutilisables
├── composables/         # Composables personnalisés
├── stores/             # Stores Pinia
├── router/             # Configuration Vue Router
├── api/                # Configuration API
├── schemas/            # Schémas de validation
├── types/              # Types TypeScript
├── utils/              # Utilitaires
└── assets/             # Assets statiques
```

### 2. Configuration TypeScript

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

### 3. Scripts de Développement

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

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
