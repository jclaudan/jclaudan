# Pinia Avancé - Guide Expert

## 1. Architecture Avancée des Stores

### Store Modulaire avec Composition

```typescript
// stores/modules/user.store.ts
import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User, CreateUserDto, UpdateUserDto } from '@/types'

export const useUserStore = defineStore('user', () => {
  // État privé
  const _users = ref<Map<string, User>>(new Map())
  const _currentUser = ref<User | null>(null)
  const _loading = ref(false)
  const _error = ref<string | null>(null)
  const _lastSync = ref<Date | null>(null)
  
  // Getters publics
  const users = computed(() => Array.from(_users.value.values()))
  const currentUser = computed(() => _currentUser.value)
  const loading = computed(() => _loading.value)
  const error = computed(() => _error.value)
  const lastSync = computed(() => _lastSync.value)
  
  // Getters calculés
  const activeUsers = computed(() => 
    users.value.filter(user => user.active)
  )
  
  const userCount = computed(() => _users.value.size)
  
  const getUserById = computed(() => (id: string) => _users.value.get(id))
  
  const getUsersByRole = computed(() => (role: string) => 
    users.value.filter(user => user.role === role)
  )
  
  // Actions privées
  const _setLoading = (value: boolean) => {
    _loading.value = value
  }
  
  const _setError = (err: string | null) => {
    _error.value = err
    console.error('User store error:', err)
  }
  
  const _clearError = () => {
    _error.value = null
  }
  
  // Actions publiques
  const addUser = (user: User) => {
    _users.value.set(user.id, {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
  
  const updateUser = (id: string, updates: UpdateUserDto) => {
    const user = _users.value.get(id)
    if (user) {
      _users.value.set(id, {
        ...user,
        ...updates,
        updatedAt: new Date()
      })
    }
  }
  
  const removeUser = (id: string) => {
    _users.value.delete(id)
  }
  
  const setCurrentUser = (user: User | null) => {
    _currentUser.value = user
  }
  
  const fetchUsers = async () => {
    _setLoading(true)
    _clearError()
    
    try {
      const response = await $fetch<User[]>('/api/users')
      const userMap = new Map()
      response.forEach(user => {
        userMap.set(user.id, user)
      })
      _users.value = userMap
      _lastSync.value = new Date()
    } catch (err: any) {
      _setError(err.message)
      throw err
    } finally {
      _setLoading(false)
    }
  }
  
  const fetchUser = async (id: string) => {
    _setLoading(true)
    _clearError()
    
    try {
      const user = await $fetch<User>(`/api/users/${id}`)
      _users.value.set(user.id, user)
      return user
    } catch (err: any) {
      _setError(err.message)
      throw err
    } finally {
      _setLoading(false)
    }
  }
  
  const createUser = async (userData: CreateUserDto) => {
    _setLoading(true)
    _clearError()
    
    try {
      const user = await $fetch<User>('/api/users', {
        method: 'POST',
        body: userData
      })
      _users.value.set(user.id, user)
      return user
    } catch (err: any) {
      _setError(err.message)
      throw err
    } finally {
      _setLoading(false)
    }
  }
  
  const deleteUser = async (id: string) => {
    _setLoading(true)
    _clearError()
    
    try {
      await $fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      _users.value.delete(id)
    } catch (err: any) {
      _setError(err.message)
      throw err
    } finally {
      _setLoading(false)
    }
  }
  
  // Actions de recherche
  const searchUsers = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return users.value.filter(user => 
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery)
    )
  }
  
  const filterUsersByStatus = (status: 'active' | 'inactive') => {
    return users.value.filter(user => user.active === (status === 'active'))
  }
  
  // Actions de tri
  const sortUsersBy = (field: keyof User, direction: 'asc' | 'desc' = 'asc') => {
    return [...users.value].sort((a, b) => {
      const aVal = a[field]
      const bVal = b[field]
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
  }
  
  // Actions de pagination
  const getUsersPage = (page: number, limit: number = 10) => {
    const start = (page - 1) * limit
    const end = start + limit
    return users.value.slice(start, end)
  }
  
  // Actions de cache
  const clearCache = () => {
    _users.value.clear()
    _currentUser.value = null
    _lastSync.value = null
  }
  
  const isCacheValid = (maxAge: number = 5 * 60 * 1000) => {
    if (!_lastSync.value) return false
    return Date.now() - _lastSync.value.getTime() < maxAge
  }
  
  return {
    // État readonly
    users: readonly(users),
    currentUser: readonly(currentUser),
    loading: readonly(loading),
    error: readonly(error),
    lastSync: readonly(lastSync),
    
    // Getters calculés
    activeUsers,
    userCount,
    getUserById,
    getUsersByRole,
    
    // Actions
    addUser,
    updateUser,
    removeUser,
    setCurrentUser,
    fetchUsers,
    fetchUser,
    createUser,
    deleteUser,
    searchUsers,
    filterUsersByStatus,
    sortUsersBy,
    getUsersPage,
    clearCache,
    isCacheValid
  }
})
```

### Store avec Gestion d'État Complexe

```typescript
// stores/modules/order.store.ts
import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { Order, OrderItem, OrderStatus } from '@/types'

export const useOrderStore = defineStore('order', () => {
  // État
  const _orders = ref<Map<string, Order>>(new Map())
  const _cart = ref<OrderItem[]>([])
  const _loading = ref(false)
  const _error = ref<string | null>(null)
  const _filters = ref({
    status: null as OrderStatus | null,
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
    customerId: null as string | null
  })
  
  // Getters
  const orders = computed(() => Array.from(_orders.value.values()))
  const cart = computed(() => _cart.value)
  const loading = computed(() => _loading.value)
  const error = computed(() => _error.value)
  const filters = computed(() => _filters.value)
  
  // Getters calculés
  const filteredOrders = computed(() => {
    let filtered = orders.value
    
    if (_filters.value.status) {
      filtered = filtered.filter(order => order.status === _filters.value.status)
    }
    
    if (_filters.value.dateFrom) {
      filtered = filtered.filter(order => order.createdAt >= _filters.value.dateFrom!)
    }
    
    if (_filters.value.dateTo) {
      filtered = filtered.filter(order => order.createdAt <= _filters.value.dateTo!)
    }
    
    if (_filters.value.customerId) {
      filtered = filtered.filter(order => order.customerId === _filters.value.customerId)
    }
    
    return filtered
  })
  
  const cartTotal = computed(() => 
    _cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )
  
  const cartItemCount = computed(() => 
    _cart.value.reduce((count, item) => count + item.quantity, 0)
  )
  
  const ordersByStatus = computed(() => {
    const grouped: Record<OrderStatus, Order[]> = {
      pending: [],
      confirmed: [],
      shipped: [],
      delivered: [],
      cancelled: []
    }
    
    orders.value.forEach(order => {
      grouped[order.status].push(order)
    })
    
    return grouped
  })
  
  // Actions
  const setLoading = (value: boolean) => {
    _loading.value = value
  }
  
  const setError = (err: string | null) => {
    _error.value = err
  }
  
  const setFilters = (filters: Partial<typeof _filters.value>) => {
    _filters.value = { ..._filters.value, ...filters }
  }
  
  const clearFilters = () => {
    _filters.value = {
      status: null,
      dateFrom: null,
      dateTo: null,
      customerId: null
    }
  }
  
  // Actions de panier
  const addToCart = (item: OrderItem) => {
    const existingItem = _cart.value.find(cartItem => cartItem.productId === item.productId)
    
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      _cart.value.push({ ...item })
    }
  }
  
  const removeFromCart = (productId: string) => {
    const index = _cart.value.findIndex(item => item.productId === productId)
    if (index > -1) {
      _cart.value.splice(index, 1)
    }
  }
  
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    const item = _cart.value.find(cartItem => cartItem.productId === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }
  
  const clearCart = () => {
    _cart.value = []
  }
  
  // Actions de commande
  const createOrder = async (customerId: string) => {
    if (_cart.value.length === 0) {
      throw new Error('Le panier est vide')
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const orderData = {
        customerId,
        items: _cart.value,
        totalAmount: cartTotal.value,
        status: 'pending' as OrderStatus
      }
      
      const order = await $fetch<Order>('/api/orders', {
        method: 'POST',
        body: orderData
      })
      
      _orders.value.set(order.id, order)
      clearCart()
      
      return order
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setLoading(true)
    setError(null)
    
    try {
      const order = await $fetch<Order>(`/api/orders/${orderId}`, {
        method: 'PATCH',
        body: { status }
      })
      
      _orders.value.set(order.id, order)
      return order
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await $fetch<Order[]>('/api/orders')
      const orderMap = new Map()
      response.forEach(order => {
        orderMap.set(order.id, order)
      })
      _orders.value = orderMap
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }
  
  return {
    // État readonly
    orders: readonly(orders),
    cart: readonly(cart),
    loading: readonly(loading),
    error: readonly(error),
    filters: readonly(filters),
    
    // Getters calculés
    filteredOrders,
    cartTotal,
    cartItemCount,
    ordersByStatus,
    
    // Actions
    setFilters,
    clearFilters,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    createOrder,
    updateOrderStatus,
    fetchOrders
  }
})
```

## 2. Plugins et Middleware

### Plugin de Persistance

```typescript
// plugins/persistence.plugin.ts
import { PiniaPluginContext } from 'pinia'

interface PersistenceOptions {
  key?: string
  storage?: Storage
  paths?: string[]
  beforeRestore?: (context: PiniaPluginContext) => void
  afterRestore?: (context: PiniaPluginContext) => void
}

export const persistencePlugin = (options: PersistenceOptions = {}) => {
  const {
    key = 'pinia',
    storage = localStorage,
    paths = [],
    beforeRestore,
    afterRestore
  } = options
  
  return ({ store, options }: PiniaPluginContext) => {
    // Configuration du store
    const storeKey = `${key}_${store.$id}`
    const persistPaths = (options as any).persist || paths
    
    // Restaurer l'état
    const restoreState = () => {
      try {
        const stored = storage.getItem(storeKey)
        if (stored) {
          const parsedState = JSON.parse(stored)
          
          if (persistPaths.length > 0) {
            // Restaurer seulement les chemins spécifiés
            const partialState: any = {}
            persistPaths.forEach((path: string) => {
              const value = getNestedValue(parsedState, path)
              if (value !== undefined) {
                setNestedValue(partialState, path, value)
              }
            })
            store.$patch(partialState)
          } else {
            // Restaurer tout l'état
            store.$patch(parsedState)
          }
        }
      } catch (error) {
        console.error(`Error restoring state for store ${store.$id}:`, error)
      }
    }
    
    // Sauvegarder l'état
    const saveState = () => {
      try {
        const state = store.$state
        
        if (persistPaths.length > 0) {
          // Sauvegarder seulement les chemins spécifiés
          const partialState: any = {}
          persistPaths.forEach((path: string) => {
            const value = getNestedValue(state, path)
            if (value !== undefined) {
              setNestedValue(partialState, path, value)
            }
          })
          storage.setItem(storeKey, JSON.stringify(partialState))
        } else {
          // Sauvegarder tout l'état
          storage.setItem(storeKey, JSON.stringify(state))
        }
      } catch (error) {
        console.error(`Error saving state for store ${store.$id}:`, error)
      }
    }
    
    // Hooks
    if (beforeRestore) {
      beforeRestore({ store, options })
    }
    
    // Restaurer au démarrage
    restoreState()
    
    if (afterRestore) {
      afterRestore({ store, options })
    }
    
    // Sauvegarder à chaque changement
    store.$subscribe((mutation, state) => {
      saveState()
    })
  }
}

// Fonctions utilitaires
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const setNestedValue = (obj: any, path: string, value: any): void => {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {}
    return current[key]
  }, obj)
  target[lastKey] = value
}
```

### Plugin de Logging

```typescript
// plugins/logging.plugin.ts
import { PiniaPluginContext } from 'pinia'

interface LoggingOptions {
  enabled?: boolean
  logLevel?: 'debug' | 'info' | 'warn' | 'error'
  logActions?: boolean
  logMutations?: boolean
  logState?: boolean
}

export const loggingPlugin = (options: LoggingOptions = {}) => {
  const {
    enabled = process.env.NODE_ENV === 'development',
    logLevel = 'info',
    logActions = true,
    logMutations = true,
    logState = false
  } = options
  
  if (!enabled) return () => {}
  
  return ({ store, options }: PiniaPluginContext) => {
    const storeName = store.$id
    
    // Logger les actions
    if (logActions) {
      store.$onAction(({ name, args, after, onError }) => {
        const startTime = Date.now()
        
        console.group(`🔄 Action: ${storeName}.${name}`)
        console.log('Arguments:', args)
        
        after((result) => {
          const duration = Date.now() - startTime
          console.log('Result:', result)
          console.log(`Duration: ${duration}ms`)
          console.groupEnd()
        })
        
        onError((error) => {
          const duration = Date.now() - startTime
          console.error('Error:', error)
          console.log(`Duration: ${duration}ms`)
          console.groupEnd()
        })
      })
    }
    
    // Logger les mutations
    if (logMutations) {
      store.$subscribe((mutation, state) => {
        console.group(`📝 Mutation: ${storeName}`)
        console.log('Type:', mutation.type)
        console.log('Store ID:', mutation.storeId)
        console.log('Payload:', mutation.payload)
        
        if (logState) {
          console.log('New State:', state)
        }
        
        console.groupEnd()
      })
    }
  }
}
```

### Plugin de Validation

```typescript
// plugins/validation.plugin.ts
import { PiniaPluginContext } from 'pinia'
import { z } from 'zod'

interface ValidationOptions {
  schemas: Record<string, z.ZodSchema<any>>
  validateOnAction?: boolean
  validateOnMutation?: boolean
}

export const validationPlugin = (options: ValidationOptions) => {
  const { schemas, validateOnAction = true, validateOnMutation = true } = options
  
  return ({ store, options }: PiniaPluginContext) => {
    const storeName = store.$id
    const schema = schemas[storeName]
    
    if (!schema) {
      console.warn(`No validation schema found for store: ${storeName}`)
      return
    }
    
    // Validation des actions
    if (validateOnAction) {
      store.$onAction(({ name, args, after, onError }) => {
        try {
          // Valider l'état avant l'action
          const currentState = store.$state
          schema.parse(currentState)
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error(`Validation error before action ${name}:`, error.errors)
            onError(error)
          }
        }
        
        after((result) => {
          try {
            // Valider l'état après l'action
            const newState = store.$state
            schema.parse(newState)
          } catch (error) {
            if (error instanceof z.ZodError) {
              console.error(`Validation error after action ${name}:`, error.errors)
            }
          }
        })
      })
    }
    
    // Validation des mutations
    if (validateOnMutation) {
      store.$subscribe((mutation, state) => {
        try {
          schema.parse(state)
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error(`Validation error after mutation:`, error.errors)
          }
        }
      })
    }
  }
}
```

## 3. Testing Avancé

### Tests Unitaires des Stores

```typescript
// tests/stores/user.store.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/modules/user.store'
import type { User } from '@/types'

// Mock de $fetch
vi.mock('#app', () => ({
  $fetch: vi.fn()
}))

describe('UserStore', () => {
  let store: ReturnType<typeof useUserStore>
  
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useUserStore()
    vi.clearAllMocks()
  })
  
  describe('État initial', () => {
    it('devrait avoir un état initial correct', () => {
      expect(store.users).toEqual([])
      expect(store.currentUser).toBeNull()
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.userCount).toBe(0)
    })
  })
  
  describe('Actions de base', () => {
    it('devrait ajouter un utilisateur', () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        active: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      store.addUser(user)
      
      expect(store.users).toHaveLength(1)
      expect(store.users[0]).toEqual(user)
      expect(store.userCount).toBe(1)
    })
    
    it('devrait mettre à jour un utilisateur', () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        active: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      store.addUser(user)
      store.updateUser('1', { name: 'Jane Doe' })
      
      expect(store.users[0].name).toBe('Jane Doe')
    })
    
    it('devrait supprimer un utilisateur', () => {
      const user: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        active: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      store.addUser(user)
      expect(store.userCount).toBe(1)
      
      store.removeUser('1')
      expect(store.userCount).toBe(0)
    })
  })
  
  describe('Actions asynchrones', () => {
    it('devrait récupérer les utilisateurs', async () => {
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          active: true,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      const { $fetch } = await import('#app')
      vi.mocked($fetch).mockResolvedValue(mockUsers)
      
      await store.fetchUsers()
      
      expect(store.users).toHaveLength(1)
      expect(store.users[0].name).toBe('John Doe')
      expect(store.loading).toBe(false)
    })
    
    it('devrait gérer les erreurs lors de la récupération', async () => {
      const { $fetch } = await import('#app')
      vi.mocked($fetch).mockRejectedValue(new Error('Network error'))
      
      await expect(store.fetchUsers()).rejects.toThrow('Network error')
      expect(store.error).toBe('Network error')
      expect(store.loading).toBe(false)
    })
  })
  
  describe('Getters calculés', () => {
    beforeEach(() => {
      const users: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          active: true,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          active: false,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      users.forEach(user => store.addUser(user))
    })
    
    it('devrait filtrer les utilisateurs actifs', () => {
      const activeUsers = store.activeUsers
      expect(activeUsers).toHaveLength(1)
      expect(activeUsers[0].name).toBe('John Doe')
    })
    
    it('devrait récupérer un utilisateur par ID', () => {
      const user = store.getUserById('1')
      expect(user?.name).toBe('John Doe')
    })
    
    it('devrait filtrer les utilisateurs par rôle', () => {
      const adminUsers = store.getUsersByRole('admin')
      expect(adminUsers).toHaveLength(1)
      expect(adminUsers[0].name).toBe('Jane Doe')
    })
  })
  
  describe('Recherche et tri', () => {
    beforeEach(() => {
      const users: User[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          active: true,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          active: true,
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      
      users.forEach(user => store.addUser(user))
    })
    
    it('devrait rechercher des utilisateurs par nom', () => {
      const results = store.searchUsers('John')
      expect(results).toHaveLength(1)
      expect(results[0].name).toBe('John Doe')
    })
    
    it('devrait rechercher des utilisateurs par email', () => {
      const results = store.searchUsers('jane@example.com')
      expect(results).toHaveLength(1)
      expect(results[0].name).toBe('Jane Smith')
    })
    
    it('devrait trier les utilisateurs par nom', () => {
      const sorted = store.sortUsersBy('name', 'asc')
      expect(sorted[0].name).toBe('Jane Smith')
      expect(sorted[1].name).toBe('John Doe')
    })
  })
})
```

### Tests d'Intégration

```typescript
// tests/integration/store-integration.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/modules/user.store'
import { useOrderStore } from '@/stores/modules/order.store'

describe('Store Integration', () => {
  let userStore: ReturnType<typeof useUserStore>
  let orderStore: ReturnType<typeof useOrderStore>
  
  beforeEach(() => {
    setActivePinia(createPinia())
    userStore = useUserStore()
    orderStore = useOrderStore()
  })
  
  it('devrait créer une commande avec un utilisateur', async () => {
    // Ajouter un utilisateur
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      active: true,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    userStore.addUser(user)
    userStore.setCurrentUser(user)
    
    // Ajouter des articles au panier
    orderStore.addToCart({
      productId: 'prod1',
      name: 'Product 1',
      price: 10,
      quantity: 2
    })
    
    expect(orderStore.cartItemCount).toBe(2)
    expect(orderStore.cartTotal).toBe(20)
    
    // Créer la commande
    const order = await orderStore.createOrder('1')
    
    expect(order.customerId).toBe('1')
    expect(order.totalAmount).toBe(20)
    expect(orderStore.cartItemCount).toBe(0)
  })
})
```

## 4. Performance et Optimisation

### Optimisation des Getters

```typescript
// stores/optimized.store.ts
import { defineStore } from 'pinia'
import { ref, computed, readonly, shallowRef } from 'vue'

export const useOptimizedStore = defineStore('optimized', () => {
  // Utiliser shallowRef pour les grandes structures
  const _largeData = shallowRef<Map<string, any>>(new Map())
  
  // Getters optimisés avec cache
  const _computedCache = new Map<string, any>()
  
  const getCachedComputed = <T>(key: string, computeFn: () => T): T => {
    if (!_computedCache.has(key)) {
      _computedCache.set(key, computed(computeFn))
    }
    return _computedCache.get(key).value
  }
  
  // Getters avec debounce
  const debouncedSearch = computed(() => {
    let timeout: NodeJS.Timeout
    
    return (query: string) => {
      clearTimeout(timeout)
      
      return new Promise((resolve) => {
        timeout = setTimeout(() => {
          const results = Array.from(_largeData.value.values())
            .filter(item => item.name.includes(query))
          resolve(results)
        }, 300)
      })
    }
  })
  
  // Actions optimisées
  const batchUpdate = (updates: Array<{ id: string; data: any }>) => {
    const newData = new Map(_largeData.value)
    
    updates.forEach(({ id, data }) => {
      newData.set(id, { ...newData.get(id), ...data })
    })
    
    _largeData.value = newData
  }
  
  return {
    getCachedComputed,
    debouncedSearch,
    batchUpdate
  }
})
```

### Monitoring des Performances

```typescript
// plugins/performance.plugin.ts
import { PiniaPluginContext } from 'pinia'

export const performancePlugin = () => {
  return ({ store, options }: PiniaPluginContext) => {
    const storeName = store.$id
    const metrics = {
      actionCount: 0,
      mutationCount: 0,
      totalActionTime: 0,
      totalMutationTime: 0
    }
    
    // Mesurer les performances des actions
    store.$onAction(({ name, after, onError }) => {
      const startTime = performance.now()
      metrics.actionCount++
      
      after(() => {
        const duration = performance.now() - startTime
        metrics.totalActionTime += duration
        
        if (duration > 100) {
          console.warn(`Slow action: ${storeName}.${name} took ${duration}ms`)
        }
      })
      
      onError(() => {
        const duration = performance.now() - startTime
        metrics.totalMutationTime += duration
      })
    })
    
    // Mesurer les performances des mutations
    store.$subscribe((mutation, state) => {
      const startTime = performance.now()
      metrics.mutationCount++
      
      // Simuler la mesure de la mutation
      setTimeout(() => {
        const duration = performance.now() - startTime
        metrics.totalMutationTime += duration
      }, 0)
    })
    
    // Exposer les métriques
    store.$metrics = metrics
  }
}
```

## Bonnes Pratiques Expertes

1. **Architecture Modulaire** : Organiser les stores par domaine métier
2. **État Privé** : Utiliser des refs privées pour l'état interne
3. **Getters Optimisés** : Utiliser des computed properties pour les calculs
4. **Actions Asynchrones** : Gérer correctement les états de chargement et d'erreur
5. **Plugins** : Créer des plugins réutilisables pour la persistance et le logging
6. **Tests** : Tester les stores de manière unitaire et en intégration
7. **Performance** : Optimiser les getters et surveiller les performances

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
