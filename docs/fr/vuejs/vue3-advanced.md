# Vue 3 Avancé - Guide Expert

## 1. Progressive Web App (PWA)

### Configuration PWA avec Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Mon App Vue 3',
        short_name: 'Vue3App',
        description: 'Application Vue 3 PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 heures
              }
            }
          }
        ]
      }
    })
  ]
})
```

### Service Worker Avancé

```typescript
// composables/usePWA.ts
export const usePWA = () => {
  const isOnline = ref(navigator.onLine)
  const isInstalled = ref(false)
  const canInstall = ref(false)
  const deferredPrompt = ref<any>(null)
  
  // Écouter les changements de connectivité
  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine
  }
  
  // Écouter l'événement d'installation
  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault()
    deferredPrompt.value = e
    canInstall.value = true
  }
  
  // Installer l'app
  const installApp = async () => {
    if (!deferredPrompt.value) return
    
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    
    if (outcome === 'accepted') {
      isInstalled.value = true
    }
    
    deferredPrompt.value = null
    canInstall.value = false
  }
  
  // Vérifier si l'app est installée
  const checkInstallation = () => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      isInstalled.value = true
    }
  }
  
  onMounted(() => {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    checkInstallation()
  })
  
  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  })
  
  return {
    isOnline: readonly(isOnline),
    isInstalled: readonly(isInstalled),
    canInstall: readonly(canInstall),
    installApp
  }
}
```

### Gestion du Cache Offline

```typescript
// composables/useOfflineCache.ts
export const useOfflineCache = () => {
  const cache = ref<Map<string, any>>(new Map())
  const isOnline = useOnline()
  
  // Sauvegarder en cache
  const setCache = (key: string, data: any) => {
    cache.value.set(key, {
      data,
      timestamp: Date.now()
    })
    
    // Sauvegarder dans localStorage
    localStorage.setItem(`cache_${key}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }))
  }
  
  // Récupérer du cache
  const getCache = (key: string, maxAge: number = 24 * 60 * 60 * 1000) => {
    const cached = cache.value.get(key)
    
    if (cached && Date.now() - cached.timestamp < maxAge) {
      return cached.data
    }
    
    // Vérifier localStorage
    const stored = localStorage.getItem(`cache_${key}`)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Date.now() - parsed.timestamp < maxAge) {
        return parsed.data
      }
    }
    
    return null
  }
  
  // Requête avec cache
  const fetchWithCache = async <T>(
    key: string,
    fetcher: () => Promise<T>,
    maxAge: number = 24 * 60 * 60 * 1000
  ): Promise<T> => {
    // Vérifier le cache d'abord
    const cached = getCache(key, maxAge)
    if (cached) {
      return cached
    }
    
    // Si hors ligne, retourner le cache expiré
    if (!isOnline.value) {
      const expired = getCache(key, Infinity)
      if (expired) {
        return expired
      }
      throw new Error('No cached data available')
    }
    
    // Faire la requête
    try {
      const data = await fetcher()
      setCache(key, data)
      return data
    } catch (error) {
      // En cas d'erreur, retourner le cache si disponible
      const cached = getCache(key, Infinity)
      if (cached) {
        return cached
      }
      throw error
    }
  }
  
  return {
    setCache,
    getCache,
    fetchWithCache
  }
}
```

## 3. Performance et Optimisation

### Lazy Loading et Code Splitting

```typescript
// composables/useLazyComponent.ts
export const useLazyComponent = (importFn: () => Promise<any>) => {
  const component = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const loadComponent = async () => {
    if (component.value) return component.value
    
    loading.value = true
    error.value = null
    
    try {
      const module = await importFn()
      component.value = module.default || module
      return component.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    component: readonly(component),
    loading: readonly(loading),
    error: readonly(error),
    loadComponent
  }
}

// Utilisation
const { component: LazyChart, loading, loadComponent } = useLazyComponent(
  () => import('~/components/Chart.vue')
)

// Charger le composant quand nécessaire
onMounted(() => {
  loadComponent()
})
```

### Virtual Scrolling

```vue
<!-- components/VirtualList.vue -->
<template>
  <div class="virtual-list" ref="container" @scroll="handleScroll">
    <div :style="{ height: totalHeight + 'px' }">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        :style="{ transform: `translateY(${item.top}px)` }"
        class="virtual-item"
      >
        <slot :item="item.data" :index="item.index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  items: any[]
  itemHeight: number
  containerHeight: number
}

const props = defineProps<Props>()
const container = ref<HTMLElement>()

const scrollTop = ref(0)
const totalHeight = computed(() => props.items.length * props.itemHeight)

const visibleItems = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight)
  const end = Math.min(
    start + Math.ceil(props.containerHeight / props.itemHeight) + 1,
    props.items.length
  )
  
  return props.items.slice(start, end).map((item, index) => ({
    ...item,
    index: start + index,
    top: (start + index) * props.itemHeight
  }))
})

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}
</script>
```

### Optimisation des Renders

```typescript
// composables/useRenderOptimization.ts
export const useRenderOptimization = () => {
  // Debounce des mises à jour
  const debouncedUpdate = useDebounceFn((fn: Function) => {
    fn()
  }, 100)
  
  // Throttle des événements
  const throttledEvent = useThrottleFn((fn: Function) => {
    fn()
  }, 16) // 60fps
  
  // Mémoisation des calculs coûteux
  const memoizedComputation = useMemoize((input: any) => {
    // Calcul coûteux
    return expensiveComputation(input)
  })
  
  // Lazy evaluation
  const lazyValue = computed(() => {
    // Ne s'exécute que quand la valeur est accédée
    return someExpensiveOperation()
  })
  
  return {
    debouncedUpdate,
    throttledEvent,
    memoizedComputation,
    lazyValue
  }
}
```

## 3. Testing Avancé

### Tests Unitaires avec Vitest

```typescript
// tests/composables/useCounter.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCounter } from '~/composables/useCounter'

describe('useCounter', () => {
  let counter: ReturnType<typeof useCounter>
  
  beforeEach(() => {
    counter = useCounter(0)
  })
  
  it('should initialize with correct value', () => {
    expect(counter.count.value).toBe(0)
  })
  
  it('should increment correctly', () => {
    counter.increment()
    expect(counter.count.value).toBe(1)
  })
  
  it('should decrement correctly', () => {
    counter.increment()
    counter.decrement()
    expect(counter.count.value).toBe(0)
  })
  
  it('should reset to initial value', () => {
    counter.increment()
    counter.increment()
    counter.reset()
    expect(counter.count.value).toBe(0)
  })
  
  it('should compute double correctly', () => {
    counter.increment()
    counter.increment()
    expect(counter.double.value).toBe(4)
  })
})
```

### Tests d'Intégration avec Playwright

```typescript
// tests/e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Flow', () => {
  test('should complete user registration', async ({ page }) => {
    // Aller à la page d'inscription
    await page.goto('/register')
    
    // Remplir le formulaire
    await page.fill('[data-testid="name"]', 'John Doe')
    await page.fill('[data-testid="email"]', 'john@example.com')
    await page.fill('[data-testid="password"]', 'securepassword')
    
    // Soumettre le formulaire
    await page.click('[data-testid="submit"]')
    
    // Vérifier la redirection
    await expect(page).toHaveURL('/dashboard')
    
    // Vérifier le message de succès
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })
  
  test('should handle form validation', async ({ page }) => {
    await page.goto('/register')
    
    // Soumettre le formulaire vide
    await page.click('[data-testid="submit"]')
    
    // Vérifier les messages d'erreur
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible()
  })
})
```

### Tests de Performance

```typescript
// tests/performance/render-performance.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import LargeList from '~/components/LargeList.vue'

describe('Render Performance', () => {
  it('should render large list efficiently', async () => {
    const startTime = performance.now()
    
    const wrapper = mount(LargeList, {
      props: {
        items: Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }))
      }
    })
    
    await nextTick()
    
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    // Vérifier que le rendu prend moins de 100ms
    expect(renderTime).toBeLessThan(100)
    
    // Vérifier que tous les éléments sont rendus
    expect(wrapper.findAll('[data-testid="list-item"]')).toHaveLength(1000)
  })
})
```

## 4. Gestion d'État Avancée

### Store Modulaire avec Pinia

```typescript
// stores/modules/user.store.ts
export const useUserStore = defineStore('user', () => {
  const users = ref<Map<string, User>>(new Map())
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // Getters
  const userList = computed(() => Array.from(users.value.values()))
  const activeUsers = computed(() => 
    userList.value.filter(user => user.active)
  )
  
  const getUserById = computed(() => (id: string) => users.value.get(id))
  
  // Actions
  const setLoading = (value: boolean) => {
    loading.value = value
  }
  
  const setError = (err: string | null) => {
    error.value = err
  }
  
  const addUser = (user: User) => {
    users.value.set(user.id, user)
  }
  
  const updateUser = (id: string, updates: Partial<User>) => {
    const user = users.value.get(id)
    if (user) {
      users.value.set(id, { ...user, ...updates })
    }
  }
  
  const removeUser = (id: string) => {
    users.value.delete(id)
  }
  
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await $fetch<User[]>('/api/users')
      const userMap = new Map()
      response.forEach(user => {
        userMap.set(user.id, user)
      })
      users.value = userMap
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return {
    users: readonly(users),
    currentUser: readonly(currentUser),
    loading: readonly(loading),
    error: readonly(error),
    userList,
    activeUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser,
    fetchUsers
  }
})
```

### Plugin Pinia Avancé

```typescript
// plugins/pinia-persistence.ts
export const piniaPersistence = (context: PiniaPluginContext) => {
  const { store } = context
  
  // Sauvegarder l'état dans localStorage
  const saveState = () => {
    localStorage.setItem(`pinia_${store.$id}`, JSON.stringify(store.$state))
  }
  
  // Restaurer l'état depuis localStorage
  const restoreState = () => {
    const saved = localStorage.getItem(`pinia_${store.$id}`)
    if (saved) {
      store.$patch(JSON.parse(saved))
    }
  }
  
  // Restaurer au démarrage
  restoreState()
  
  // Sauvegarder à chaque changement
  store.$subscribe((mutation, state) => {
    saveState()
  })
}

// plugins/pinia-devtools.ts
export const piniaDevtools = (context: PiniaPluginContext) => {
  const { store } = context
  
  // Ajouter des métadonnées pour les devtools
  store.$onAction(({ name, args, after, onError }) => {
    const startTime = Date.now()
    
    after((result) => {
      console.log(`Action ${name} completed in ${Date.now() - startTime}ms`)
    })
    
    onError((error) => {
      console.error(`Action ${name} failed:`, error)
    })
  })
}
```

## 5. Internationalisation (i18n)

### Configuration i18n Avancée

```typescript
// plugins/i18n.ts
export default defineNuxtPlugin(({ $i18n }) => {
  // Détection automatique de la langue
  const detectLanguage = () => {
    if (process.client) {
      const stored = localStorage.getItem('locale')
      if (stored) return stored
      
      const browser = navigator.language.split('-')[0]
      return ['en', 'fr', 'es'].includes(browser) ? browser : 'en'
    }
    return 'en'
  }
  
  // Changer la langue
  const changeLanguage = (locale: string) => {
    $i18n.setLocale(locale)
    if (process.client) {
      localStorage.setItem('locale', locale)
    }
  }
  
  return {
    provide: {
      changeLanguage
    }
  }
})

// composables/useI18n.ts
export const useI18n = () => {
  const { $i18n } = useNuxtApp()
  
  const t = (key: string, params?: Record<string, any>) => {
    return $i18n.t(key, params)
  }
  
  const locale = computed(() => $i18n.locale.value)
  
  const availableLocales = computed(() => $i18n.availableLocales.value)
  
  return {
    t,
    locale,
    availableLocales
  }
}
```

## 6. Sécurité et Validation

### Validation Avancée avec Zod

```typescript
// schemas/user.schema.ts
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export type User = z.infer<typeof userSchema>

// composables/useValidation.ts
export const useValidation = <T>(schema: z.ZodSchema<T>) => {
  const errors = ref<Record<string, string>>({})
  const isValid = ref(false)
  
  const validate = (data: unknown): T | null => {
    try {
      const result = schema.parse(data)
      errors.value = {}
      isValid.value = true
      return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value = {}
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          errors.value[path] = err.message
        })
      }
      isValid.value = false
      return null
    }
  }
  
  const validateField = (field: string, value: any) => {
    try {
      const fieldSchema = schema.shape[field]
      if (fieldSchema) {
        fieldSchema.parse(value)
        delete errors.value[field]
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value[field] = error.errors[0].message
      }
    }
  }
  
  return {
    errors: readonly(errors),
    isValid: readonly(isValid),
    validate,
    validateField
  }
}
```

### Protection CSRF

```typescript
// composables/useCSRF.ts
export const useCSRF = () => {
  const token = ref<string | null>(null)
  
  const generateToken = async () => {
    const response = await $fetch<{ token: string }>('/api/csrf-token')
    token.value = response.token
    return response.token
  }
  
  const validateToken = (providedToken: string) => {
    return token.value === providedToken
  }
  
  const secureRequest = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    if (!token.value) {
      await generateToken()
    }
    
    const headers = {
      'X-CSRF-Token': token.value,
      ...options.headers
    }
    
    return $fetch<T>(url, {
      ...options,
      headers
    })
  }
  
  return {
    token: readonly(token),
    generateToken,
    validateToken,
    secureRequest
  }
}
```

## 7. Monitoring et Analytics

### Monitoring des Performances

```typescript
// composables/usePerformance.ts
export const usePerformance = () => {
  const metrics = ref<Record<string, number>>({})
  
  const measure = (name: string, fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    metrics.value[name] = end - start
  }
  
  const measureAsync = async (name: string, fn: () => Promise<void>) => {
    const start = performance.now()
    await fn()
    const end = performance.now()
    metrics.value[name] = end - start
  }
  
  const getMetrics = () => {
    return { ...metrics.value }
  }
  
  const clearMetrics = () => {
    metrics.value = {}
  }
  
  return {
    metrics: readonly(metrics),
    measure,
    measureAsync,
    getMetrics,
    clearMetrics
  }
}
```

### Analytics Avancé

```typescript
// composables/useAnalytics.ts
export const useAnalytics = () => {
  const track = (event: string, properties?: Record<string, any>) => {
    if (process.client) {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', event, properties)
      }
      
      // Custom analytics
      $fetch('/api/analytics', {
        method: 'POST',
        body: {
          event,
          properties,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        }
      })
    }
  }
  
  const trackPageView = (page: string) => {
    track('page_view', { page })
  }
  
  const trackUserAction = (action: string, target?: string) => {
    track('user_action', { action, target })
  }
  
  const trackError = (error: Error, context?: string) => {
    track('error', {
      message: error.message,
      stack: error.stack,
      context
    })
  }
  
  return {
    track,
    trackPageView,
    trackUserAction,
    trackError
  }
}
```

## Bonnes Pratiques Expertes

1. **SSR Optimisé** : Utiliser le cache et l'hydratation efficace
2. **PWA Complète** : Implémenter le cache offline et les notifications
3. **Performance** : Optimiser les rendus et le lazy loading
4. **Testing** : Couvrir les tests unitaires, d'intégration et de performance
5. **Sécurité** : Valider les données et protéger contre les attaques
6. **Monitoring** : Surveiller les performances et les erreurs
7. **Accessibilité** : Respecter les standards WCAG
8. **SEO** : Optimiser pour les moteurs de recherche

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
