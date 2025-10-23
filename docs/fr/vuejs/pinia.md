# Pinia - State Management Vue 3

## Installation

```bash
npm install pinia
```

```typescript
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

## Store de base

```typescript
// stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Counter'
  }),
  
  getters: {
    doubleCount: (state) => state.count * 2,
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    }
  },
  
  actions: {
    increment() {
      this.count++
    },
    
    async fetchData() {
      try {
        const response = await fetch('/api/data')
        const data = await response.json()
        this.count = data.count
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }
})
```

## Store avec Composition API

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // Getters
  const isLoggedIn = computed(() => !!user.value)
  const userInitials = computed(() => {
    if (!user.value) return ''
    return user.value.firstName[0] + user.value.lastName[0]
  })
  
  // Actions
  const login = async (credentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) throw new Error('Login failed')
      
      user.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
    error.value = null
  }
  
  return {
    user,
    loading,
    error,
    isLoggedIn,
    userInitials,
    login,
    logout
  }
})
```

## Utilisation dans un composant

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">+1</button>
    
    <div v-if="user.isLoggedIn">
      <p>Welcome, {{ user.user?.firstName }}!</p>
      <button @click="user.logout">Logout</button>
    </div>
    <div v-else>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

const counter = useCounterStore()
const user = useUserStore()

const login = () => {
  user.login({ email: 'user@example.com', password: 'password' })
}
</script>
```

## Store modulaire

```typescript
// stores/index.ts
export { useCounterStore } from './counter'
export { useUserStore } from './user'
export { useCartStore } from './cart'
export { useProductStore } from './product'
```

## Persistance

```typescript
// stores/persisted.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePersistedStore = defineStore('persisted', () => {
  const theme = ref(localStorage.getItem('theme') || 'light')
  const preferences = ref(
    JSON.parse(localStorage.getItem('preferences') || '{}')
  )
  
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }
  
  const updatePreferences = (newPreferences) => {
    preferences.value = { ...preferences.value, ...newPreferences }
    localStorage.setItem('preferences', JSON.stringify(preferences.value))
  }
  
  return {
    theme,
    preferences,
    setTheme,
    updatePreferences
  }
})
```

## Plugins

```typescript
// plugins/pinia-plugin.ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  const { store } = context
  
  // Intercepter les actions
  store.$onAction(({ name, args, after, onError }) => {
    console.log(`Action ${name} called with args:`, args)
    
    after((result) => {
      console.log(`Action ${name} completed with result:`, result)
    })
    
    onError((error) => {
      console.error(`Action ${name} failed with error:`, error)
    })
  })
}

// main.ts
import { createPinia } from 'pinia'
import { myPiniaPlugin } from './plugins/pinia-plugin'

const pinia = createPinia()
pinia.use(myPiniaPlugin)
```

## Patterns avancés

### Store avec validation

```typescript
import { defineStore } from 'pinia'
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email()
})

export const useValidatedStore = defineStore('validated', () => {
  const users = ref([])
  
  const addUser = (userData) => {
    try {
      const validatedUser = userSchema.parse(userData)
      users.value.push(validatedUser)
    } catch (error) {
      console.error('Validation error:', error.errors)
    }
  }
  
  return { users, addUser }
})
```

### Store avec middleware

```typescript
// middleware/auth.ts
export const authMiddleware = (store) => {
  store.$onAction(({ name, args, after }) => {
    if (name === 'login' || name === 'logout') {
      after(() => {
        // Notifier d'autres stores
        store.$patch({ lastAuthAction: name })
      })
    }
  })
}
```

### Store partagé

```typescript
// stores/shared.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSharedStore = defineStore('shared', () => {
  const notifications = ref([])
  const isLoading = ref(false)
  
  const addNotification = (notification) => {
    notifications.value.push({
      id: Date.now(),
      ...notification,
      timestamp: new Date()
    })
  }
  
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  return {
    notifications,
    isLoading,
    addNotification,
    removeNotification
  }
})
```

## Tests

```typescript
// tests/stores/counter.test.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('should increment counter', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
    
    store.increment()
    expect(store.count).toBe(1)
  })
  
  it('should compute double count', () => {
    const store = useCounterStore()
    store.count = 5
    
    expect(store.doubleCount).toBe(10)
  })
})
```

## Bonnes pratiques

1. **Nommage** : Utiliser `use` + nom + `Store`
2. **Modularité** : Un store par domaine métier
3. **Types** : Utiliser TypeScript pour la sécurité
4. **Actions async** : Gérer les états de loading/error
5. **Getters** : Pour les données calculées
6. **Plugins** : Pour la logique transversale
7. **Tests** : Tester les stores isolément

## Pièges à éviter

1. **Mutations directes** : Utiliser les actions
2. **Stores trop gros** : Diviser en stores plus petits
3. **État global** : Éviter l'état global quand le local suffit
4. **Circular dependencies** : Attention aux dépendances circulaires



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

