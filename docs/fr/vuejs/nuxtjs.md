# Nuxt.js - Framework Full-Stack Vue

## Installation

```bash
npx nuxi@latest init my-app
cd my-app
npm install
```

## Structure de projet

```
nuxt-app/
├── assets/          # Assets non compilés (CSS, images)
├── components/      # Composants Vue
├── composables/     # Composables Vue
├── layouts/         # Layouts de page
├── middleware/      # Middleware
├── pages/           # Pages (routing automatique)
├── plugins/         # Plugins
├── public/          # Assets statiques
├── server/          # API routes
├── stores/          # Pinia stores
├── nuxt.config.ts   # Configuration Nuxt
└── package.json
```

## Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  
  // CSS
  css: ['~/assets/css/main.css'],
  
  // Runtime config
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  
  // SSR
  ssr: true,
  
  // Nitro
  nitro: {
    experimental: {
      wasm: true
    }
  }
})
```

## Pages et routing

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>Home Page</h1>
    <NuxtLink to="/about">About</NuxtLink>
  </div>
</template>

<script setup>
// Meta
useHead({
  title: 'Home Page',
  meta: [
    { name: 'description', content: 'Home page description' }
  ]
})
</script>
```

```vue
<!-- pages/about.vue -->
<template>
  <div>
    <h1>About Page</h1>
    <p>This is the about page</p>
  </div>
</template>

<script setup>
// Layout personnalisé
definePageMeta({
  layout: 'custom'
})
</script>
```

### Routes dynamiques

```vue
<!-- pages/users/[id].vue -->
<template>
  <div>
    <h1>User {{ user.id }}</h1>
    <p>Name: {{ user.name }}</p>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: user } = await $fetch(`/api/users/${route.params.id}`)

// Validation des paramètres
if (!user) {
  throw createError({
    statusCode: 404,
    statusMessage: 'User not found'
  })
}
</script>
```

### Routes imbriquées

```vue
<!-- pages/users/index.vue -->
<template>
  <div>
    <h1>Users List</h1>
    <NuxtPage />
  </div>
</template>
```

```vue
<!-- pages/users/profile.vue -->
<template>
  <div>
    <h2>User Profile</h2>
  </div>
</template>
```

## Layouts

```vue
<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <nav class="container mx-auto px-4 py-6">
        <NuxtLink to="/" class="text-xl font-bold">My App</NuxtLink>
      </nav>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2024 My App</p>
      </div>
    </footer>
  </div>
</template>
```

```vue
<!-- layouts/admin.vue -->
<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <nav>
        <NuxtLink to="/admin/dashboard">Dashboard</NuxtLink>
        <NuxtLink to="/admin/users">Users</NuxtLink>
      </nav>
    </aside>
    
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: #f8f9fa;
  padding: 1rem;
}

.content {
  flex: 1;
  padding: 1rem;
}
</style>
```

## Composables

```typescript
// composables/useAuth.ts
export const useAuth = () => {
  const user = useState('auth.user', () => null)
  const isLoggedIn = computed(() => !!user.value)
  
  const login = async (credentials: LoginCredentials) => {
    try {
      const { data } = await $fetch('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      user.value = data.user
      await navigateTo('/dashboard')
    } catch (error) {
      throw error
    }
  }
  
  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/')
  }
  
  return {
    user: readonly(user),
    isLoggedIn,
    login,
    logout
  }
}
```

```typescript
// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()
  
  const $api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options }) {
      // Add auth token
      const token = useCookie('auth-token')
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`
        }
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        // Handle unauthorized
        navigateTo('/login')
      }
    }
  })
  
  return { $api }
}
```

## Server API

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Validation
  const schema = z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10')
  })
  
  const { page, limit } = schema.parse(query)
  
  // Fetch users
  const users = await fetchUsers({
    page: parseInt(page),
    limit: parseInt(limit)
  })
  
  return {
    data: users,
    meta: {
      page: parseInt(page),
      limit: parseInt(limit)
    }
  }
})
```

```typescript
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }
  
  const user = await fetchUser(id)
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }
  
  return user
})
```

```typescript
// server/api/users/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Validation
  const userSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    age: z.number().min(18)
  })
  
  const validatedData = userSchema.parse(body)
  
  // Create user
  const user = await createUser(validatedData)
  
  return user
})
```

## Middleware

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()
  
  if (!isLoggedIn.value) {
    return navigateTo('/login')
  }
})
```

```typescript
// middleware/admin.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()
  
  if (!user.value || user.value.role !== 'admin') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Access denied'
    })
  }
})
```

```vue
<!-- pages/admin/dashboard.vue -->
<script setup>
// Utilisation du middleware
definePageMeta({
  middleware: ['auth', 'admin']
})
</script>
```

## Plugins

```typescript
// plugins/vue-toastification.client.ts
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: 'top-right',
    timeout: 3000
  })
})
```

```typescript
// plugins/api.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  return {
    provide: {
      api: $fetch.create({
        baseURL: config.public.apiBase
      })
    }
  }
})
```

## State Management avec Pinia

```typescript
// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const loading = ref(false)
  
  const fetchUsers = async () => {
    loading.value = true
    try {
      const { data } = await $fetch('/api/users')
      users.value = data
    } finally {
      loading.value = false
    }
  }
  
  const addUser = async (userData) => {
    const user = await $fetch('/api/users', {
      method: 'POST',
      body: userData
    })
    users.value.push(user)
    return user
  }
  
  return {
    users,
    loading,
    fetchUsers,
    addUser
  }
})
```

## SEO et Meta

```vue
<!-- pages/blog/[slug].vue -->
<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div v-html="post.content"></div>
  </div>
</template>

<script setup>
const route = useRoute()
const { data: post } = await $fetch(`/api/posts/${route.params.slug}`)

// SEO
useHead({
  title: post.title,
  meta: [
    { name: 'description', content: post.excerpt },
    { property: 'og:title', content: post.title },
    { property: 'og:description', content: post.excerpt },
    { property: 'og:image', content: post.image },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})

// JSON-LD
useSchemaOrg([
  defineArticle({
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt
  })
])
</script>
```

## Performance et optimisation

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Lazy loading
  experimental: {
    payloadExtraction: false
  },
  
  // Nitro
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  
  // Vite
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            utils: ['lodash', 'date-fns']
          }
        }
      }
    }
  }
})
```

## Déploiement

### Vercel

```json
// vercel.json
{
  "builds": [
    {
      "src": "nuxt.config.ts",
      "use": "@vercel/nuxt"
    }
  ]
}
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### PM2

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'nuxt-app',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster'
  }]
}
```

## Tests

```typescript
// tests/pages/index.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Index from '~/pages/index.vue'

describe('Index Page', () => {
  it('renders correctly', () => {
    const wrapper = mount(Index)
    expect(wrapper.text()).toContain('Home Page')
  })
})
```

## Bonnes pratiques

1. **Structure** : Organiser les fichiers par fonctionnalité
2. **Composables** : Créer des composables réutilisables
3. **Server API** : Utiliser les API routes pour la logique backend
4. **SEO** : Utiliser `useHead` et `useSchemaOrg`
5. **Performance** : Optimiser les images et le code
6. **Tests** : Tester les composants et les API
7. **Déploiement** : Utiliser des plateformes optimisées pour Nuxt

## Pièges à éviter

1. **SSR/CSR** : Comprendre la différence entre SSR et CSR
2. **Hydration** : Éviter les erreurs d'hydratation
3. **Performance** : Ne pas sur-optimiser
4. **SEO** : Ne pas oublier les meta tags
5. **State** : Gérer correctement l'état côté serveur et client



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

