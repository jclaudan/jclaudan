# 🟢 Vue.js - Guide Complet

> **Vue.js** est un framework JavaScript progressif pour construire des interfaces utilisateur modernes. Il se distingue par sa simplicité d'apprentissage, sa flexibilité et ses performances exceptionnelles.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-vuejs)
- [🚀 Introduction](#-introduction)
- [🔄 Migration Vue 2 → Vue 3](#-migration-vue-2--vue-3)
- [🎯 Meilleures pratiques](#-meilleures-pratiques)
- [🏗️ Design Patterns](#️-design-patterns)
- [🏛️ Architecture](#️-architecture)
- [💡 Snippets avancés](#-snippets-avancés)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Vue.js

### 🎯 Syntaxes de Base

| Concept | Syntaxe | Description | Exemple |
|---------|---------|-------------|---------|
| **Interpolation** | `{{ }}` | Affichage de données dans le template | `{{ message }}` |
| **v-text** | `v-text="expression"` | Équivalent à l'interpolation, plus explicite | `v-text="user.name"` |
| **v-html** | `v-html="expression"` | Rendu de HTML brut (attention sécurité) | `v-html="rawHtml"` |
| **v-bind** | `:attribut="expression"` | Liaison d'attribut dynamique | `:class="isActive"` |
| **v-on** | `@event="handler"` | Gestion d'événement simplifiée | `@click="handleClick"` |
| **v-model** | `v-model="variable"` | Liaison bidirectionnelle pour formulaires | `v-model="inputValue"` |
| **v-if** | `v-if="condition"` | Rendu conditionnel (création/destruction) | `v-if="isVisible"` |
| **v-show** | `v-show="condition"` | Affichage conditionnel (CSS display) | `v-show="isActive"` |
| **v-for** | `v-for="item in items"` | Boucle de rendu pour listes | `v-for="user in users"` |
| **v-slot** | `#slotName` | Définition de slot pour composants | `#header="slotProps"` |

### 🔧 Directives Avancées

| Directive | Syntaxe | Modificateurs | Description |
|-----------|---------|---------------|-------------|
| **v-model** | `v-model="value"` | `.lazy`, `.number`, `.trim` | Liaison bidirectionnelle avec modificateurs |
| **v-on** | `@event="handler"` | `.prevent`, `.stop`, `.once`, `.capture` | Gestion d'événements avec modificateurs |
| **v-bind** | `:prop="value"` | `.prop`, `.camel`, `.sync` | Liaison de propriétés avec modificateurs |
| **v-for** | `v-for="(item, index) in items"` | `:key="uniqueKey"` | Boucles avec index et clé unique |
| **v-if** | `v-if="condition"` | `v-else-if`, `v-else` | Conditions multiples avec alternatives |
| **v-show** | `v-show="condition"` | Aucun | Affichage conditionnel via CSS |
| **v-cloak** | `v-cloak` | Aucun | Masque le contenu pendant le chargement |
| **v-once** | `v-once` | Aucun | Rendu unique, pas de mise à jour |
| **v-memo** | `v-memo="[dep1, dep2]"` | Aucun | Mémorisation pour performance (Vue 3.2+) |

### 🔄 Composition API - Hooks de Base

| Hook | Import | Description | Exemple |
|------|--------|-------------|---------|
| **ref** | `import { ref } from 'vue'` | Crée une référence réactive pour valeurs primitives | `const count = ref(0)` |
| **reactive** | `import { reactive } from 'vue'` | Crée un objet réactif pour objets complexes | `const state = reactive({})` |
| **computed** | `import { computed } from 'vue'` | Crée une propriété calculée mise en cache | `const double = computed(() => count.value * 2)` |
| **watch** | `import { watch } from 'vue'` | Surveille les changements de valeurs | `watch(count, (newVal) => {})` |
| **watchEffect** | `import { watchEffect } from 'vue'` | Surveillance automatique des dépendances | `watchEffect(() => {})` |
| **onMounted** | `import { onMounted } from 'vue'` | Hook appelé après le montage du composant | `onMounted(() => {})` |
| **onUpdated** | `import { onUpdated } from 'vue'` | Hook appelé après chaque mise à jour | `onUpdated(() => {})` |
| **onUnmounted** | `import { onUnmounted } from 'vue'` | Hook appelé avant le démontage | `onUnmounted(() => {})` |

### 🏗️ Options API - Propriétés

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| **data** | `Function` | Fonction retournant les données réactives | `data() { return { count: 0 } }` |
| **computed** | `Object` | Propriétés calculées avec mise en cache | `computed: { double() { return this.count * 2 } }` |
| **methods** | `Object` | Méthodes du composant | `methods: { increment() { this.count++ } }` |
| **watch** | `Object` | Surveillance des changements | `watch: { count(newVal) {} }` |
| **props** | `Array/Object` | Propriétés reçues du composant parent | `props: ['title']` |
| **emits** | `Array/Object` | Événements émis vers le parent | `emits: ['update']` |
| **components** | `Object` | Composants enfants enregistrés | `components: { Child }` |
| **directives** | `Object` | Directives personnalisées | `directives: { focus }` |
| **mixins** | `Array` | Mixins pour partager du code | `mixins: [myMixin]` |

---

## 🚀 Introduction

Vue.js est un framework JavaScript progressif pour construire des interfaces utilisateur. Il se distingue par sa simplicité d'apprentissage et sa flexibilité.

### Qu'est-ce que Vue.js ?
Vue.js est un framework JavaScript moderne qui facilite la création d'interfaces utilisateur interactives. Il utilise un système de composants réutilisables et une réactivité automatique pour simplifier le développement.

### Pourquoi choisir Vue.js ?
- **🎯 Simplicité** : Courbe d'apprentissage douce, syntaxe intuitive
- **⚡ Performance** : Rendu optimisé, taille de bundle réduite
- **🔧 Flexibilité** : Peut être intégré progressivement dans des projets existants
- **🌍 Écosystème** : Large communauté, nombreux plugins et outils
- **📱 Polyvalence** : Applications web, mobile (avec NativeScript), desktop (avec Electron)

### Vue 2 vs Vue 3

| Aspect | Vue 2 | Vue 3 |
|--------|-------|-------|
| **API** | Options API | Composition API + Options API |
| **Performance** | ~2x plus lent | ~2x plus rapide |
| **Bundle size** | Plus volumineux | 41% plus léger |
| **TypeScript** | Support limité | Support natif |
| **Tree-shaking** | Limité | Complet |

## 🔄 Migration Vue 2 → Vue 3

### 1. Options API → Composition API

**Vue 2 (Options API)**
```javascript
export default {
  data() {
    return {
      count: 0,
      message: 'Hello Vue 2'
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Component mounted')
  }
}
```

**Vue 3 (Composition API)**
```javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const message = ref('Hello Vue 3')
    
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('Component mounted')
    })
    
    return {
      count,
      message,
      doubleCount,
      increment
    }
  }
}
```

### 2. Script Setup (Recommandé)

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'

// Variables réactives
const count = ref(0)
const message = ref('Hello Vue 3')

// Computed properties
const doubleCount = computed(() => count.value * 2)

// Méthodes
const increment = () => {
  count.value++
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

## 🎯 Meilleures pratiques

### 1. Structure de composant

```vue
<template>
  <!-- Template en premier -->
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>

<script setup>
// Imports en premier
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

// Props et emits
const props = defineProps({
  userId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['user-updated'])

// Variables réactives
const user = ref(null)
const loading = ref(false)

// Computed properties
const userDisplayName = computed(() => {
  return user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
})

// Méthodes
const fetchUser = async () => {
  loading.value = true
  try {
    user.value = await userStore.fetchUser(props.userId)
  } catch (error) {
    console.error('Error fetching user:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
/* Styles scoped */
.user-card {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
```

### 2. Gestion d'état avec Pinia

```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    loading: false
  }),
  
  getters: {
    activeUsers: (state) => state.users.filter(user => user.active),
    userCount: (state) => state.users.length
  },
  
  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await api.get('/users')
        this.users = response.data
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        this.loading = false
      }
    },
    
    async createUser(userData) {
      try {
        const response = await api.post('/users', userData)
        this.users.push(response.data)
        return response.data
      } catch (error) {
        console.error('Error creating user:', error)
        throw error
      }
    }
  }
})
```

### 3. Composables personnalisés

```javascript
// composables/useApi.js
import { ref } from 'vue'

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const execute = async (apiCall) => {
    loading.value = true
    error.value = null
    
    try {
      data.value = await apiCall()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }
  
  return {
    data,
    loading,
    error,
    execute
  }
}
```

## 🏗️ Design Patterns

### 1. Provider Pattern

```javascript
// composables/useTheme.js
import { provide, inject, ref } from 'vue'

const THEME_KEY = Symbol('theme')

export function provideTheme() {
  const theme = ref('light')
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  provide(THEME_KEY, {
    theme,
    toggleTheme
  })
}

export function useTheme() {
  const themeContext = inject(THEME_KEY)
  
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return themeContext
}
```

### 2. Observer Pattern avec Watch

```javascript
import { ref, watch, watchEffect } from 'vue'

export default {
  setup() {
    const searchQuery = ref('')
    const results = ref([])
    
    // Watch simple
    watch(searchQuery, async (newQuery) => {
      if (newQuery.length > 2) {
        results.value = await searchAPI(newQuery)
      }
    })
    
    // Watch avec options
    watch(
      searchQuery,
      async (newQuery, oldQuery) => {
        console.log(`Search changed from "${oldQuery}" to "${newQuery}"`)
        results.value = await searchAPI(newQuery)
      },
      {
        immediate: true, // Exécute immédiatement
        deep: true,      // Surveille les changements profonds
        flush: 'post'    // Exécute après le rendu
      }
    )
    
    // WatchEffect - surveille automatiquement les dépendances
    watchEffect(async () => {
      if (searchQuery.value.length > 2) {
        results.value = await searchAPI(searchQuery.value)
      }
    })
    
    return {
      searchQuery,
      results
    }
  }
}
```

### 3. Factory Pattern pour les composants

```javascript
// composables/useComponentFactory.js
export function useComponentFactory() {
  const createFormField = (type, config) => {
    const baseConfig = {
      required: false,
      placeholder: '',
      validation: null
    }
    
    switch (type) {
      case 'text':
        return {
          ...baseConfig,
          ...config,
          component: 'InputText',
          type: 'text'
        }
      case 'email':
        return {
          ...baseConfig,
          ...config,
          component: 'InputEmail',
          type: 'email',
          validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
      case 'select':
        return {
          ...baseConfig,
          ...config,
          component: 'SelectField',
          options: config.options || []
        }
      default:
        throw new Error(`Unknown field type: ${type}`)
    }
  }
  
  return {
    createFormField
  }
}
```

## 🏛️ Architecture

### 1. Architecture par couches

```
src/
├── components/          # Composants réutilisables
│   ├── base/           # Composants de base (Button, Input, etc.)
│   ├── forms/          # Composants de formulaire
│   └── layout/         # Composants de mise en page
├── views/              # Pages/Vues
├── composables/        # Logique réutilisable
├── stores/             # Gestion d'état (Pinia)
├── services/           # Services API
├── utils/              # Utilitaires
├── types/              # Types TypeScript
└── assets/             # Ressources statiques
```

### 2. Architecture hexagonale avec Vue

```javascript
// domain/entities/User.js
export class User {
  constructor(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
  }
  
  isValid() {
    return this.name && this.email && this.email.includes('@')
  }
}

// domain/repositories/UserRepository.js
export class UserRepository {
  async findById(id) {
    throw new Error('Method must be implemented')
  }
  
  async save(user) {
    throw new Error('Method must be implemented')
  }
}

// infrastructure/repositories/HttpUserRepository.js
import { User } from '@/domain/entities/User'
import { UserRepository } from '@/domain/repositories/UserRepository'

export class HttpUserRepository extends UserRepository {
  constructor(apiClient) {
    super()
    this.apiClient = apiClient
  }
  
  async findById(id) {
    const response = await this.apiClient.get(`/users/${id}`)
    return new User(response.data.id, response.data.name, response.data.email)
  }
  
  async save(user) {
    const response = await this.apiClient.post('/users', {
      name: user.name,
      email: user.email
    })
    return new User(response.data.id, response.data.name, response.data.email)
  }
}

// application/services/UserService.js
export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }
  
  async getUser(id) {
    if (!id) {
      throw new Error('User ID is required')
    }
    
    return await this.userRepository.findById(id)
  }
  
  async createUser(userData) {
    const user = new User(null, userData.name, userData.email)
    
    if (!user.isValid()) {
      throw new Error('Invalid user data')
    }
    
    return await this.userRepository.save(user)
  }
}

// composables/useUserService.js
import { UserService } from '@/application/services/UserService'
import { HttpUserRepository } from '@/infrastructure/repositories/HttpUserRepository'
import { apiClient } from '@/infrastructure/api/apiClient'

export function useUserService() {
  const userRepository = new HttpUserRepository(apiClient)
  const userService = new UserService(userRepository)
  
  return {
    getUser: userService.getUser.bind(userService),
    createUser: userService.createUser.bind(userService)
  }
}
```

## 💡 Snippets avancés

### 1. Gestion avancée des erreurs avec retry

```javascript
// composables/useErrorHandler.js
import { ref, computed } from 'vue'

export function useErrorHandler() {
  const error = ref(null)
  const isError = ref(false)
  const retryCount = ref(0)
  const maxRetries = ref(3)
  
  const canRetry = computed(() => retryCount.value < maxRetries.value)
  
  const handleError = async (err, retryFn = null) => {
    error.value = err
    isError.value = true
    console.error('Error:', err)
    
    // Auto-clear error after 5 seconds
    setTimeout(() => {
      clearError()
    }, 5000)
    
    // Auto-retry logic
    if (retryFn && canRetry.value) {
      retryCount.value++
      setTimeout(async () => {
        try {
          await retryFn()
          retryCount.value = 0
        } catch (retryErr) {
          console.error('Retry failed:', retryErr)
        }
      }, 1000 * retryCount.value) // Exponential backoff
    }
  }
  
  const clearError = () => {
    error.value = null
    isError.value = false
    retryCount.value = 0
  }
  
  const retry = async (retryFn) => {
    if (!canRetry.value) return false
    
    retryCount.value++
    try {
      await retryFn()
      retryCount.value = 0
      return true
    } catch (err) {
      handleError(err)
      return false
    }
  }
  
  return {
    error,
    isError,
    retryCount,
    canRetry,
    handleError,
    clearError,
    retry
  }
}
```

### 2. Composable avancé pour les API avec cache

```javascript
// composables/useApiCache.js
import { ref, computed, watch } from 'vue'

export function useApiCache(apiCall, options = {}) {
  const {
    cacheKey = null,
    ttl = 5 * 60 * 1000, // 5 minutes
    retryCount = 3,
    retryDelay = 1000
  } = options
  
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref(null)
  const cache = new Map()
  
  const isStale = computed(() => {
    if (!lastFetch.value) return true
    return Date.now() - lastFetch.value > ttl
  })
  
  const shouldFetch = computed(() => {
    return !data.value || isStale.value
  })
  
  const execute = async (params = {}) => {
    const key = cacheKey ? `${cacheKey}-${JSON.stringify(params)}` : JSON.stringify(params)
    
    // Check cache first
    if (cache.has(key) && !isStale.value) {
      data.value = cache.get(key)
      return data.value
    }
    
    loading.value = true
    error.value = null
    
    let attempts = 0
    while (attempts < retryCount) {
      try {
        const result = await apiCall(params)
        data.value = result
        lastFetch.value = Date.now()
        cache.set(key, result)
        return result
      } catch (err) {
        attempts++
        if (attempts >= retryCount) {
          error.value = err
          throw err
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempts))
      }
    }
  }
  
  const invalidate = (params = {}) => {
    const key = cacheKey ? `${cacheKey}-${JSON.stringify(params)}` : JSON.stringify(params)
    cache.delete(key)
    data.value = null
    lastFetch.value = null
  }
  
  const refresh = async (params = {}) => {
    invalidate(params)
    return await execute(params)
  }
  
  // Auto-refresh when data becomes stale
  watch(isStale, (stale) => {
    if (stale && data.value) {
      execute()
    }
  })
  
  return {
    data,
    loading,
    error,
    isStale,
    shouldFetch,
    execute,
    invalidate,
    refresh
  }
}
```

### 3. Gestion d'état avancée avec Pinia

```javascript
// stores/advanced-user.store.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdvancedUserStore = defineStore('advancedUser', () => {
  // State
  const users = ref(new Map())
  const loading = ref(false)
  const error = ref(null)
  const lastSync = ref(null)
  
  // Getters
  const userList = computed(() => Array.from(users.value.values()))
  const activeUsers = computed(() => 
    userList.value.filter(user => user.status === 'active')
  )
  const userCount = computed(() => users.value.size)
  
  const getUserById = computed(() => (id) => users.value.get(id))
  const getUsersByRole = computed(() => (role) => 
    userList.value.filter(user => user.role === role)
  )
  
  // Actions
  const setLoading = (value) => {
    loading.value = value
  }
  
  const setError = (err) => {
    error.value = err
    console.error('User store error:', err)
  }
  
  const clearError = () => {
    error.value = null
  }
  
  const addUser = (user) => {
    users.value.set(user.id, {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
  
  const updateUser = (id, updates) => {
    const user = users.value.get(id)
    if (user) {
      users.value.set(id, {
        ...user,
        ...updates,
        updatedAt: new Date()
      })
    }
  }
  
  const removeUser = (id) => {
    users.value.delete(id)
  }
  
  const fetchUsers = async () => {
    setLoading(true)
    clearError()
    
    try {
      const response = await api.get('/users')
      const userMap = new Map()
      response.data.forEach(user => {
        userMap.set(user.id, user)
      })
      users.value = userMap
      lastSync.value = new Date()
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const fetchUser = async (id) => {
    setLoading(true)
    clearError()
    
    try {
      const response = await api.get(`/users/${id}`)
      addUser(response.data)
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const createUser = async (userData) => {
    setLoading(true)
    clearError()
    
    try {
      const response = await api.post('/users', userData)
      addUser(response.data)
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const updateUserAsync = async (id, userData) => {
    setLoading(true)
    clearError()
    
    try {
      const response = await api.put(`/users/${id}`, userData)
      updateUser(id, response.data)
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const deleteUser = async (id) => {
    setLoading(true)
    clearError()
    
    try {
      await api.delete(`/users/${id}`)
      removeUser(id)
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const syncUsers = async () => {
    if (lastSync.value && Date.now() - lastSync.value < 30000) {
      return // Skip if synced less than 30 seconds ago
    }
    
    await fetchUsers()
  }
  
  const searchUsers = (query) => {
    if (!query) return userList.value
    
    const lowercaseQuery = query.toLowerCase()
    return userList.value.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) ||
      user.email.toLowerCase().includes(lowercaseQuery) ||
      user.role.toLowerCase().includes(lowercaseQuery)
    )
  }
  
  const bulkUpdate = async (updates) => {
    setLoading(true)
    clearError()
    
    try {
      const response = await api.patch('/users/bulk', { updates })
      updates.forEach(({ id, data }) => {
        updateUser(id, data)
      })
      return response.data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  return {
    // State
    users,
    loading,
    error,
    lastSync,
    
    // Getters
    userList,
    activeUsers,
    userCount,
    getUserById,
    getUsersByRole,
    
    // Actions
    setLoading,
    setError,
    clearError,
    addUser,
    updateUser,
    removeUser,
    fetchUsers,
    fetchUser,
    createUser,
    updateUserAsync,
    deleteUser,
    syncUsers,
    searchUsers,
    bulkUpdate
  }
})
```

### 4. Middleware avancé pour les routes

```javascript
// router/middleware/auth.middleware.js
export function authMiddleware(to, from, next) {
  const userStore = useUserStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // Check if route requires specific role
  if (to.meta.roles && !to.meta.roles.includes(userStore.user?.role)) {
    next({
      name: 'forbidden',
      replace: true
    })
    return
  }
  
  // Check if route requires specific permission
  if (to.meta.permissions) {
    const hasPermission = to.meta.permissions.every(permission => 
      userStore.hasPermission(permission)
    )
    
    if (!hasPermission) {
      next({
        name: 'forbidden',
        replace: true
      })
      return
    }
  }
  
  next()
}

// router/middleware/guest.middleware.js
export function guestMiddleware(to, from, next) {
  const userStore = useUserStore()
  
  if (userStore.isAuthenticated) {
    next({
      name: 'dashboard',
      replace: true
    })
    return
  }
  
  next()
}

// router/middleware/rate-limit.middleware.js
const rateLimitMap = new Map()

export function rateLimitMiddleware(to, from, next) {
  const key = `${to.name}-${Date.now()}`
  const now = Date.now()
  const windowMs = 60000 // 1 minute
  const maxRequests = 10
  
  // Clean old entries
  for (const [k, v] of rateLimitMap.entries()) {
    if (now - v.timestamp > windowMs) {
      rateLimitMap.delete(k)
    }
  }
  
  // Check rate limit
  const requests = Array.from(rateLimitMap.values())
    .filter(req => now - req.timestamp < windowMs)
  
  if (requests.length >= maxRequests) {
    next({
      name: 'rate-limit-exceeded',
      replace: true
    })
    return
  }
  
  // Add current request
  rateLimitMap.set(key, { timestamp: now })
  
  next()
}
```

### 5. Plugin Vue avancé

```javascript
// plugins/advanced-plugin.js
export default {
  install(app, options = {}) {
    const {
      apiBaseUrl = '/api',
      timeout = 10000,
      retryCount = 3
    } = options
    
    // Global properties
    app.config.globalProperties.$api = {
      baseURL: apiBaseUrl,
      timeout,
      retryCount
    }
    
    // Global methods
    app.config.globalProperties.$formatDate = (date, format = 'DD/MM/YYYY') => {
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(date))
    }
    
    app.config.globalProperties.$formatCurrency = (amount, currency = 'EUR') => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency
      }).format(amount)
    }
    
    app.config.globalProperties.$debounce = (func, wait) => {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    }
    
    app.config.globalProperties.$throttle = (func, limit) => {
      let inThrottle
      return function executedFunction(...args) {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => inThrottle = false, limit)
        }
      }
    }
    
    // Global components
    app.component('LoadingSpinner', {
      template: `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <slot>Loading...</slot>
        </div>
      `,
      props: {
        size: {
          type: String,
          default: 'medium'
        }
      }
    })
    
    app.component('ErrorBoundary', {
      template: `
        <div v-if="hasError" class="error-boundary">
          <h3>Something went wrong</h3>
          <p>{{ error }}</p>
          <button @click="retry">Retry</button>
        </div>
        <slot v-else />
      `,
      data() {
        return {
          hasError: false,
          error: null
        }
      },
      methods: {
        retry() {
          this.hasError = false
          this.error = null
        }
      },
      errorCaptured(err, instance, info) {
        this.hasError = true
        this.error = err.message
        console.error('Error caught by boundary:', err, info)
        return false
      }
    })
    
    // Global directives
    app.directive('click-outside', {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    })
    
    app.directive('lazy-load', {
      mounted(el, binding) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              binding.value()
              observer.unobserve(el)
            }
          })
        })
        observer.observe(el)
      }
    })
    
    // Global mixins
    app.mixin({
      methods: {
        $showToast(message, type = 'info') {
          // Implementation for toast notifications
          console.log(`Toast [${type}]: ${message}`)
        },
        
        $confirm(message) {
          return new Promise((resolve) => {
            const result = confirm(message)
            resolve(result)
          })
        }
      }
    })
  }
}
```

### 2. Debounce pour les recherches

```javascript
// composables/useDebounce.js
import { ref, watch } from 'vue'

export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value)
  
  watch(value, (newValue) => {
    const timer = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
    
    return () => clearTimeout(timer)
  })
  
  return debouncedValue
}
```

### 3. Lazy loading de composants

```javascript
// composables/useLazyComponent.js
import { defineAsyncComponent } from 'vue'

export function useLazyComponent(loader) {
  return defineAsyncComponent({
    loader,
    loadingComponent: () => import('@/components/LoadingSpinner.vue'),
    errorComponent: () => import('@/components/ErrorComponent.vue'),
    delay: 200,
    timeout: 3000
  })
}
```

### 4. Validation de formulaire

```javascript
// composables/useFormValidation.js
import { ref, computed } from 'vue'

export function useFormValidation(rules) {
  const errors = ref({})
  const touched = ref({})
  
  const validate = (field, value) => {
    const rule = rules[field]
    if (!rule) return true
    
    const isValid = rule(value)
    errors.value[field] = isValid ? null : rule.message || 'Invalid value'
    return isValid
  }
  
  const validateAll = (formData) => {
    let isValid = true
    Object.keys(rules).forEach(field => {
      if (!validate(field, formData[field])) {
        isValid = false
      }
    })
    return isValid
  }
  
  const touch = (field) => {
    touched.value[field] = true
  }
  
  const hasError = (field) => {
    return touched.value[field] && errors.value[field]
  }
  
  const isFormValid = computed(() => {
    return Object.values(errors.value).every(error => !error)
  })
  
  return {
    errors,
    touched,
    validate,
    validateAll,
    touch,
    hasError,
    isFormValid
  }
}
```

## 📚 Référence Complète Vue.js

### 🆕 Améliorations Vue.js 2024

#### Vue 3.4+ - Nouvelles fonctionnalités
```javascript
// defineModel (Vue 3.4+)
// Remplacé v-model dans les composants
<script setup>
// Avant
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// Maintenant
const model = defineModel()

// Utilisation
model.value = 'nouvelle valeur'
</script>

// defineSlots (Vue 3.4+)
<script setup>
const slots = defineSlots<{
  default(props: { message: string }): any
  header(props: { title: string }): any
}>()
</script>

// defineOptions (Vue 3.4+)
<script setup>
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false
})
</script>
```

#### Améliorations Performance
```javascript
// v-memo (Vue 3.2+)
<template>
  <div v-memo="[valueA, valueB]">
    <!-- Contenu coûteux qui ne se re-render que si valueA ou valueB changent -->
  </div>
</template>

// v-once avec v-memo
<template>
  <div v-memo="[id]">
    <div v-once>{{ expensiveComputation() }}</div>
  </div>
</template>
```

### 📖 Syntaxe Complète Vue.js

#### 1. Template Syntax
```vue
<template>
  <!-- Interpolations -->
  <div>{{ message }}</div>
  <div v-text="message"></div>
  <div v-html="rawHtml"></div>
  
  <!-- Attributs -->
  <div :id="dynamicId" :class="classObject" :style="styleObject"></div>
  <div :class="[isActive ? 'active' : '', 'base-class']"></div>
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  
  <!-- Événements -->
  <button @click="doThis"></button>
  <button @click="doThis($event)"></button>
  <button @click="doThis('hello', $event)"></button>
  <button @click.once="doThis"></button>
  <button @click.prevent="doThis"></button>
  <button @click.stop="doThis"></button>
  <button @click.self="doThis"></button>
  <button @click.capture="doThis"></button>
  <button @click.passive="doThis"></button>
  
  <!-- Modificateurs de clavier -->
  <input @keyup.enter="submit">
  <input @keyup.13="submit">
  <input @keyup.ctrl.enter="submit">
  <input @keyup.meta.enter="submit">
  <input @keyup.alt.enter="submit">
  <input @keyup.shift.enter="submit">
  
  <!-- Modificateurs de souris -->
  <button @click.left="doThis"></button>
  <button @click.right="doThis"></button>
  <button @click.middle="doThis"></button>
  
  <!-- Directives conditionnelles -->
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else-if="type === 'C'">C</div>
  <div v-else>Not A/B/C</div>
  
  <div v-show="ok">Hello!</div>
  
  <!-- Directives de boucle -->
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  <div v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.text }}
  </div>
  <div v-for="(value, key) in object" :key="key">
    {{ key }}: {{ value }}
  </div>
  <div v-for="(value, key, index) in object" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </div>
  
  <!-- v-for avec v-if -->
  <div v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </div>
  
  <!-- Directives de formulaire -->
  <input v-model="message" placeholder="edit me">
  <textarea v-model="message" placeholder="add multiple lines"></textarea>
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">{{ checked }}</label>
  
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  
  <!-- Modificateurs v-model -->
  <input v-model.trim="msg">
  <input v-model.number="age" type="number">
  <input v-model.lazy="msg">
  
  <!-- Slots -->
  <slot></slot>
  <slot name="header"></slot>
  <slot name="footer" :user="user" :text="text"></slot>
  
  <!-- Composants dynamiques -->
  <component :is="currentComponent"></component>
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
  
  <!-- Transitions -->
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
  
  <transition-group name="list" tag="p">
    <span v-for="item in items" :key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</template>
```

#### 2. Composition API Complète
```javascript
<script setup>
import { 
  // Reactivity
  ref, reactive, computed, watch, watchEffect, watchPostEffect, watchSyncEffect,
  // Lifecycle
  onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount,
  onActivated, onDeactivated, onErrorCaptured, onRenderTracked, onRenderTriggered,
  // Utilities
  readonly, shallowRef, triggerRef, customRef, shallowReactive, shallowReadonly,
  toRaw, markRaw, effectScope, getCurrentScope, onScopeDispose,
  // Advanced
  nextTick, defineAsyncComponent, defineCustomElement, getCurrentInstance,
  useSlots, useAttrs, useCssModule, useCssVars,
  // Directives
  vModelText, vModelCheckbox, vModelRadio, vModelSelect, vModelDynamic,
  // Components
  Transition, TransitionGroup, KeepAlive, Teleport, Suspense,
  // Composables
  onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter,
  // Store
  storeToRefs, useStore
} from 'vue'

// Props et Emits
const props = defineProps({
  title: String,
  count: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0
  },
  user: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const emit = defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'increment', value: number): void
}>()

// Reactive data
const count = ref(0)
const state = reactive({
  name: 'Vue',
  version: '3.4'
})

// Computed
const doubleCount = computed(() => count.value * 2)
const fullName = computed({
  get: () => state.firstName + ' ' + state.lastName,
  set: (newValue) => {
    [state.firstName, state.lastName] = newValue.split(' ')
  }
})

// Watchers
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})

watch(() => state.name, (newName) => {
  console.log(`Name changed to ${newName}`)
}, { immediate: true, deep: true })

watchEffect(() => {
  console.log(`Count is ${count.value}`)
})

// Lifecycle
onMounted(() => {
  console.log('Component mounted')
})

onBeforeUnmount(() => {
  console.log('Component will unmount')
})

// Methods
const increment = () => {
  count.value++
  emit('increment', count.value)
}

const updateTitle = (newTitle) => {
  emit('update:title', newTitle)
}

// Expose to template
defineExpose({
  count,
  increment
})
</script>
```

#### 3. Options API Complète
```javascript
<script>
export default {
  name: 'MyComponent',
  
  // Data
  data() {
    return {
      message: 'Hello Vue!',
      count: 0,
      user: {
        name: 'John',
        age: 30
      }
    }
  },
  
  // Computed
  computed: {
    doubleCount() {
      return this.count * 2
    },
    fullName: {
      get() {
        return this.user.firstName + ' ' + this.user.lastName
      },
      set(newValue) {
        [this.user.firstName, this.user.lastName] = newValue.split(' ')
      }
    }
  },
  
  // Methods
  methods: {
    increment() {
      this.count++
    },
    async fetchData() {
      try {
        const response = await fetch('/api/data')
        this.data = await response.json()
      } catch (error) {
        console.error('Error:', error)
      }
    }
  },
  
  // Watchers
  watch: {
    count(newVal, oldVal) {
      console.log(`Count changed from ${oldVal} to ${newVal}`)
    },
    'user.name': {
      handler(newVal, oldVal) {
        console.log(`Name changed from ${oldVal} to ${newVal}`)
      },
      immediate: true,
      deep: true
    }
  },
  
  // Lifecycle
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  unmounted() {
    console.log('unmounted')
  },
  activated() {
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  },
  errorCaptured(err, instance, info) {
    console.error('Error captured:', err, info)
    return false
  },
  
  // Props
  props: {
    title: String,
    count: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0
    }
  },
  
  // Emits
  emits: ['update:title', 'increment'],
  
  // Components
  components: {
    ChildComponent
  },
  
  // Directives
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      }
    }
  },
  
  // Mixins
  mixins: [myMixin],
  
  // Provide/Inject
  provide() {
    return {
      theme: this.theme
    }
  },
  inject: ['theme'],
  
  // Expose
  expose: ['publicMethod']
}
</script>
```

### 🛠️ Directives Personnalisées
```javascript
// Directive globale
app.directive('focus', {
  mounted(el, binding) {
    if (binding.value) {
      el.focus()
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})

// Directive avec arguments et modificateurs
app.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  },
  updated(el, binding) {
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})

// Utilisation
// <div v-pin:bottom="200">I'm pinned 200px from the bottom</div>
```

## 📋 Tableaux de Référence Complète Vue.js

### 🎯 Syntaxes de Base

| Concept | Syntaxe | Description | Exemple |
|---------|---------|-------------|---------|
| **Interpolation** | `{{ }}` | Affichage de données | `{{ message }}` |
| **v-text** | `v-text="expression"` | Équivalent à interpolation | `v-text="user.name"` |
| **v-html** | `v-html="expression"` | HTML brut | `v-html="rawHtml"` |
| **v-bind** | `:attribut="expression"` | Liaison d'attribut | `:class="isActive"` |
| **v-on** | `@event="handler"` | Gestion d'événement | `@click="handleClick"` |
| **v-model** | `v-model="variable"` | Liaison bidirectionnelle | `v-model="inputValue"` |
| **v-if** | `v-if="condition"` | Rendu conditionnel | `v-if="isVisible"` |
| **v-show** | `v-show="condition"` | Affichage conditionnel | `v-show="isActive"` |
| **v-for** | `v-for="item in items"` | Boucle de rendu | `v-for="user in users"` |
| **v-slot** | `#slotName` | Définition de slot | `#header="slotProps"` |

### 🔧 Directives Avancées

| Directive | Syntaxe | Modificateurs | Description |
|-----------|---------|---------------|-------------|
| **v-model** | `v-model="value"` | `.lazy`, `.number`, `.trim` | Liaison bidirectionnelle |
| **v-on** | `@event="handler"` | `.prevent`, `.stop`, `.once`, `.capture` | Gestion d'événements |
| **v-bind** | `:prop="value"` | `.prop`, `.camel`, `.sync` | Liaison de propriétés |
| **v-for** | `v-for="(item, index) in items"` | `:key="uniqueKey"` | Boucles avec index |
| **v-if** | `v-if="condition"` | `v-else-if`, `v-else` | Conditions multiples |
| **v-show** | `v-show="condition"` | Aucun | Affichage CSS |
| **v-cloak** | `v-cloak` | Aucun | Masque pendant chargement |
| **v-once** | `v-once` | Aucun | Rendu unique |
| **v-memo** | `v-memo="[dep1, dep2]"` | Aucun | Mémorisation (Vue 3.2+) |

### 🎨 Modificateurs d'Événements

| Modificateur | Description | Exemple |
|--------------|-------------|---------|
| `.prevent` | Empêche le comportement par défaut | `@click.prevent="handler"` |
| `.stop` | Arrête la propagation | `@click.stop="handler"` |
| `.once` | Exécute une seule fois | `@click.once="handler"` |
| `.capture` | Mode capture | `@click.capture="handler"` |
| `.passive` | Mode passif | `@scroll.passive="handler"` |
| `.self` | Seulement si c'est l'élément cible | `@click.self="handler"` |
| `.left` | Clic gauche de souris | `@click.left="handler"` |
| `.right` | Clic droit de souris | `@click.right="handler"` |
| `.middle` | Clic molette | `@click.middle="handler"` |

### ⌨️ Modificateurs de Clavier

| Modificateur | Description | Exemple |
|--------------|-------------|---------|
| `.enter` | Touche Entrée | `@keyup.enter="submit"` |
| `.tab` | Touche Tab | `@keyup.tab="next"` |
| `.delete` | Touche Suppr | `@keyup.delete="remove"` |
| `.esc` | Touche Échap | `@keyup.esc="close"` |
| `.space` | Touche Espace | `@keyup.space="toggle"` |
| `.up` | Flèche haut | `@keyup.up="moveUp"` |
| `.down` | Flèche bas | `@keyup.down="moveDown"` |
| `.left` | Flèche gauche | `@keyup.left="moveLeft"` |
| `.right` | Flèche droite | `@keyup.right="moveRight"` |
| `.ctrl` | Touche Ctrl | `@keyup.ctrl.enter="submit"` |
| `.alt` | Touche Alt | `@keyup.alt.enter="submit"` |
| `.shift` | Touche Shift | `@keyup.shift.enter="submit"` |
| `.meta` | Touche Cmd/Meta | `@keyup.meta.enter="submit"` |

### 🔄 Composition API - Hooks de Base

| Hook | Import | Description | Exemple |
|------|--------|-------------|---------|
| **ref** | `import { ref } from 'vue'` | Réactivité simple | `const count = ref(0)` |
| **reactive** | `import { reactive } from 'vue'` | Réactivité objet | `const state = reactive({})` |
| **computed** | `import { computed } from 'vue'` | Propriété calculée | `const double = computed(() => count.value * 2)` |
| **watch** | `import { watch } from 'vue'` | Surveillance | `watch(count, (newVal) => {})` |
| **watchEffect** | `import { watchEffect } from 'vue'` | Surveillance automatique | `watchEffect(() => {})` |
| **onMounted** | `import { onMounted } from 'vue'` | Montage | `onMounted(() => {})` |
| **onUpdated** | `import { onUpdated } from 'vue'` | Mise à jour | `onUpdated(() => {})` |
| **onUnmounted** | `import { onUnmounted } from 'vue'` | Démontage | `onUnmounted(() => {})` |

### 🔄 Composition API - Hooks Avancés

| Hook | Import | Description | Exemple |
|------|--------|-------------|---------|
| **onBeforeMount** | `import { onBeforeMount } from 'vue'` | Avant montage | `onBeforeMount(() => {})` |
| **onBeforeUpdate** | `import { onBeforeUpdate } from 'vue'` | Avant mise à jour | `onBeforeUpdate(() => {})` |
| **onBeforeUnmount** | `import { onBeforeUnmount } from 'vue'` | Avant démontage | `onBeforeUnmount(() => {})` |
| **onActivated** | `import { onActivated } from 'vue'` | Activation | `onActivated(() => {})` |
| **onDeactivated** | `import { onDeactivated } from 'vue'` | Désactivation | `onDeactivated(() => {})` |
| **onErrorCaptured** | `import { onErrorCaptured } from 'vue'` | Capture d'erreur | `onErrorCaptured(() => {})` |
| **onRenderTracked** | `import { onRenderTracked } from 'vue'` | Suivi de rendu | `onRenderTracked(() => {})` |
| **onRenderTriggered** | `import { onRenderTriggered } from 'vue'` | Déclenchement de rendu | `onRenderTriggered(() => {})` |

### 🔄 Composition API - Utilitaires

| Utilitaire | Import | Description | Exemple |
|------------|--------|-------------|---------|
| **readonly** | `import { readonly } from 'vue'` | Lecture seule | `const ro = readonly(state)` |
| **shallowRef** | `import { shallowRef } from 'vue'` | Réf. superficielle | `const shallow = shallowRef({})` |
| **triggerRef** | `import { triggerRef } from 'vue'` | Déclencher ref | `triggerRef(shallow)` |
| **customRef** | `import { customRef } from 'vue'` | Ref personnalisée | `customRef((track, trigger) => {})` |
| **shallowReactive** | `import { shallowReactive } from 'vue'` | Réactive superficielle | `shallowReactive({})` |
| **shallowReadonly** | `import { shallowReadonly } from 'vue'` | Lecture seule superficielle | `shallowReadonly({})` |
| **toRaw** | `import { toRaw } from 'vue'` | Objet brut | `toRaw(reactiveObj)` |
| **markRaw** | `import { markRaw } from 'vue'` | Marquer comme brut | `markRaw(obj)` |
| **nextTick** | `import { nextTick } from 'vue'` | Prochain tick | `await nextTick()` |

### 🏗️ Options API - Propriétés

| Propriété | Type | Description | Exemple |
|-----------|------|-------------|---------|
| **data** | `Function` | Données réactives | `data() { return { count: 0 } }` |
| **computed** | `Object` | Propriétés calculées | `computed: { double() { return this.count * 2 } }` |
| **methods** | `Object` | Méthodes | `methods: { increment() { this.count++ } }` |
| **watch** | `Object` | Surveillance | `watch: { count(newVal) {} }` |
| **props** | `Array/Object` | Propriétés | `props: ['title']` |
| **emits** | `Array/Object` | Événements | `emits: ['update']` |
| **components** | `Object` | Composants | `components: { Child }` |
| **directives** | `Object` | Directives | `directives: { focus }` |
| **mixins** | `Array` | Mixins | `mixins: [myMixin]` |

### 🏗️ Options API - Lifecycle

| Hook | Description | Exemple |
|------|-------------|---------|
| **beforeCreate** | Avant création | `beforeCreate() { console.log('beforeCreate') }` |
| **created** | Après création | `created() { console.log('created') }` |
| **beforeMount** | Avant montage | `beforeMount() { console.log('beforeMount') }` |
| **mounted** | Après montage | `mounted() { console.log('mounted') }` |
| **beforeUpdate** | Avant mise à jour | `beforeUpdate() { console.log('beforeUpdate') }` |
| **updated** | Après mise à jour | `updated() { console.log('updated') }` |
| **beforeUnmount** | Avant démontage | `beforeUnmount() { console.log('beforeUnmount') }` |
| **unmounted** | Après démontage | `unmounted() { console.log('unmounted') }` |
| **activated** | Activation | `activated() { console.log('activated') }` |
| **deactivated** | Désactivation | `deactivated() { console.log('deactivated') }` |
| **errorCaptured** | Capture d'erreur | `errorCaptured(err) { console.log('error') }` |

### 🎨 Classes CSS Dynamiques

| Syntaxe | Description | Exemple |
|---------|-------------|---------|
| **Objet** | `:class="{ active: isActive }"` | Classes conditionnelles | `:class="{ 'text-red': hasError }"` |
| **Array** | `:class="[baseClass, { active: isActive }]"` | Mélange array/objet | `:class="['btn', { 'btn-primary': isPrimary }]"` |
| **Computed** | `:class="computedClass"` | Classe calculée | `:class="buttonClass"` |
| **String** | `:class="'btn btn-' + type"` | Concaténation | `:class="'btn btn-' + variant"` |

### 🎨 Styles Dynamiques

| Syntaxe | Description | Exemple |
|---------|-------------|---------|
| **Objet** | `:style="{ color: activeColor }"` | Styles conditionnels | `:style="{ fontSize: size + 'px' }"` |
| **Array** | `:style="[baseStyle, { color: activeColor }]"` | Mélange array/objet | `:style="[baseStyle, dynamicStyle]"` |
| **Computed** | `:style="computedStyle"` | Style calculé | `:style="buttonStyle"` |
| **String** | `:style="'color: ' + activeColor"` | Concaténation | `:style="'background: ' + bgColor"` |

### 🔄 v-model avec Composants

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Text** | `v-model="value"` | Input texte | `<input v-model="text" />` |
| **Number** | `v-model.number="value"` | Input numérique | `<input v-model.number="age" />` |
| **Checkbox** | `v-model="checked"` | Case à cocher | `<input type="checkbox" v-model="checked" />` |
| **Radio** | `v-model="picked"` | Bouton radio | `<input type="radio" v-model="picked" />` |
| **Select** | `v-model="selected"` | Liste déroulante | `<select v-model="selected" />` |
| **Textarea** | `v-model="message"` | Zone de texte | `<textarea v-model="message" />` |

### 🎯 Slots

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Default** | `<slot />` | Slot par défaut | `<slot />` |
| **Named** | `<slot name="header" />` | Slot nommé | `<slot name="header" />` |
| **Scoped** | `<slot :user="user" />` | Slot avec props | `<slot :user="user" />` |
| **Fallback** | `<slot>Default content</slot>` | Contenu par défaut | `<slot>Loading...</slot>` |

### 🔄 Transitions

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **Simple** | `<transition name="fade">` | Transition simple | `<transition name="fade">` |
| **Group** | `<transition-group name="list">` | Transition de groupe | `<transition-group name="list">` |
| **Mode** | `mode="out-in"` | Mode de transition | `<transition mode="out-in">` |
| **Appear** | `appear` | Transition d'apparition | `<transition appear>` |

### 📚 Ressources

### Documentation officielle
- [Vue.js Guide](https://vuejs.org/guide/)
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia Store](https://pinia.vuejs.org/)

### Outils recommandés
- [Vue DevTools](https://devtools.vuejs.org/)
- [Vite](https://vitejs.dev/) - Build tool
- [Vue Router](https://router.vuejs.org/) - Routing
- [VueUse](https://vueuse.org/) - Collection de composables

### Patterns et bonnes pratiques
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Vue 3 Best Practices](https://vuejs.org/guide/best-practices/performance.html)
- [Composition API Patterns](https://vuejs.org/guide/reusability/composables.html)

---

*Dernière mise à jour : Janvier 2024*
