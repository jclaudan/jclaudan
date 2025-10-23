# 🟢 Vue 3 Composition API - Design Patterns

## 📋 Complete Vue 3 Patterns Reference Tables

### 🎯 Basic Patterns

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|-----------|
| **Composable Pattern** | Reusable composition functions | Shared logic | Reusability, testability |
| **Provider Pattern** | Data provision via provide/inject | Global state | Decoupling, flexibility |
| **Observer Pattern** | Reactivity with watch/watchEffect | Change monitoring | Reactivity, performance |
| **Factory Pattern** | Dynamic component creation | Dynamic components | Flexibility, extensibility |
| **Strategy Pattern** | Interchangeable algorithms | Conditional logic | Extensibility, maintainability |
| **Decorator Pattern** | Component enrichment | Additional features | Modularity, reusability |
| **Proxy Pattern** | Data access control | Validation, logging | Control, security |
| **Singleton Pattern** | Single instance | Services, stores | Consistency, performance |
| **Module Pattern** | Logic encapsulation | Code organization | Encapsulation, reusability |
| **Mixin Pattern** | Feature sharing | Common logic | Reusability, composition |

### 🎯 Advanced Patterns

| Pattern | Description | Usage | Advantages |
|---------|-------------|-------|-----------|
| **Container/Presenter** | Logic/display separation | Complex components | Separation of concerns |
| **Higher-Order Component** | Higher-order components | Enhancement | Reusability, composition |
| **Render Props** | Render props | Logic sharing | Flexibility, reusability |
| **Compound Components** | Composed components | Complex interfaces | Modularity, flexibility |
| **Context Pattern** | Shared context | Global data | Decoupling, performance |
| **Event Bus Pattern** | Event bus | Communication | Decoupling, flexibility |
| **State Machine** | State machine | State management | Predictability, maintainability |
| **Plugin Pattern** | Plugin system | Extensibility | Extensibility, modularity |
| **Middleware Pattern** | Middleware | Data processing | Modularity, reusability |
| **Hook Pattern** | Custom hooks | Reusable logic | Reusability, composition |

---

## 🚀 Introduction

Vue 3 with the Composition API introduces new patterns and improves existing patterns to create more maintainable, testable, and performant applications.

## 🎯 Composable Pattern

### Basic Pattern

```typescript
// useCounter.ts
import { ref, computed, readonly } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const double = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    double,
    isEven
  }
}
```

### Advanced Composable with State Management

```typescript
// useUser.ts
import { ref, computed, readonly } from 'vue'
import { User, CreateUserDto, UpdateUserDto } from '@/types'

export function useUser() {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const userCount = computed(() => users.value.length)
  const activeUsers = computed(() => users.value.filter(user => user.active))
  
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/users')
      users.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }
  
  const createUser = async (userData: CreateUserDto) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to create user')
      }
      
      const newUser = await response.json()
      users.value.push(newUser)
      
      return newUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const updateUser = async (id: string, userData: UpdateUserDto) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      
      const updatedUser = await response.json()
      const index = users.value.findIndex(user => user.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      
      return updatedUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const deleteUser = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      
      users.value = users.value.filter(user => user.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }
  
  return {
    users: readonly(users),
    loading: readonly(loading),
    error: readonly(error),
    userCount,
    activeUsers,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  }
}
```

## 🎯 Provider Pattern

### Basic Pattern

```typescript
// useAuth.ts
import { provide, inject, ref, computed, readonly } from 'vue'

const AuthSymbol = Symbol('auth')

export interface AuthState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  register: (userData: RegisterData) => Promise<void>
}

export function provideAuth() {
  const user = ref<User | null>(null)
  const loading = ref(false)
  
  const isAuthenticated = computed(() => !!user.value)
  
  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      const data = await response.json()
      user.value = data.user
      localStorage.setItem('token', data.token)
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
  }
  
  const register = async (userData: RegisterData) => {
    loading.value = true
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      const data = await response.json()
      user.value = data.user
      localStorage.setItem('token', data.token)
    } finally {
      loading.value = false
    }
  }
  
  const auth: AuthState = {
    user: readonly(user),
    loading: readonly(loading),
    isAuthenticated,
    login,
    logout,
    register
  }
  
  provide(AuthSymbol, auth)
  return auth
}

export function useAuth(): AuthState {
  const auth = inject<AuthState>(AuthSymbol)
  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return auth
}
```

### Advanced Provider with Persistence

```typescript
// useTheme.ts
import { provide, inject, ref, computed, watch, readonly } from 'vue'

const ThemeSymbol = Symbol('theme')

export interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export function provideTheme() {
  const theme = ref<'light' | 'dark'>('light')
  
  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
  if (savedTheme) {
    theme.value = savedTheme
  }
  
  // Apply theme to document
  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  
  // Apply initial theme
  applyTheme(theme.value)
  
  // Watch theme changes
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  })
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
  }
  
  const themeState: ThemeState = {
    theme: readonly(theme),
    toggleTheme,
    setTheme
  }
  
  provide(ThemeSymbol, themeState)
  return themeState
}

export function useTheme(): ThemeState {
  const theme = inject<ThemeState>(ThemeSymbol)
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return theme
}
```

## 🎯 Observer Pattern

### Basic Pattern with watch

```typescript
// useWatcher.ts
import { ref, watch, watchEffect, computed } from 'vue'

export function useWatcher() {
  const count = ref(0)
  const name = ref('')
  const isEven = computed(() => count.value % 2 === 0)
  
  // Simple watch
  watch(count, (newValue, oldValue) => {
    console.log(`Count changed from ${oldValue} to ${newValue}`)
  })
  
  // Watch with options
  watch(
    count,
    (newValue) => {
      console.log(`Count is now: ${newValue}`)
    },
    { immediate: true, deep: true }
  )
  
  // Watch multiple sources
  watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
    console.log(`Count: ${oldCount} -> ${newCount}`)
    console.log(`Name: ${oldName} -> ${newName}`)
  })
  
  // WatchEffect
  watchEffect(() => {
    console.log(`Count is ${count.value} and name is ${name.value}`)
  })
  
  // Watch with cleanup
  watch(
    count,
    (newValue, oldValue, onCleanup) => {
      const timer = setTimeout(() => {
        console.log(`Delayed: Count is ${newValue}`)
      }, 1000)
      
      onCleanup(() => {
        clearTimeout(timer)
      })
    }
  )
  
  return {
    count,
    name,
    isEven
  }
}
```

### Advanced Observer Pattern

```typescript
// useEventBus.ts
import { ref, onMounted, onUnmounted } from 'vue'

type EventCallback = (...args: any[]) => void

class EventBus {
  private events: Map<string, EventCallback[]> = new Map()
  
  on(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
    this.events.get(event)!.push(callback)
  }
  
  off(event: string, callback: EventCallback) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }
  
  emit(event: string, ...args: any[]) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(...args))
    }
  }
}

const eventBus = new EventBus()

export function useEventBus() {
  const on = (event: string, callback: EventCallback) => {
    eventBus.on(event, callback)
  }
  
  const off = (event: string, callback: EventCallback) => {
    eventBus.off(event, callback)
  }
  
  const emit = (event: string, ...args: any[]) => {
    eventBus.emit(event, ...args)
  }
  
  return {
    on,
    off,
    emit
  }
}

// Usage in a component
export default {
  setup() {
    const { on, off, emit } = useEventBus()
    
    const handleUserUpdate = (user: User) => {
      console.log('User updated:', user)
    }
    
    onMounted(() => {
      on('user:updated', handleUserUpdate)
    })
    
    onUnmounted(() => {
      off('user:updated', handleUserUpdate)
    })
    
    const updateUser = (user: User) => {
      emit('user:updated', user)
    }
    
    return {
      updateUser
    }
  }
}
```

## 🎯 Factory Pattern

### Basic Pattern

```typescript
// useComponentFactory.ts
import { defineComponent, h } from 'vue'

interface ComponentConfig {
  name: string
  props: string[]
  template: string
  styles?: string
}

export function useComponentFactory() {
  const createComponent = (config: ComponentConfig) => {
    return defineComponent({
      name: config.name,
      props: config.props.reduce((acc, prop) => {
        acc[prop] = String
        return acc
      }, {} as Record<string, any>),
      setup(props, { slots }) {
        return () => h('div', { class: config.name }, [
          h('div', { innerHTML: config.template }),
          slots.default?.()
        ])
      }
    })
  }
  
  const createButton = (variant: 'primary' | 'secondary' | 'danger' = 'primary') => {
    return defineComponent({
      name: 'DynamicButton',
      props: {
        disabled: Boolean,
        loading: Boolean
      },
      setup(props, { slots, emit }) {
        const handleClick = () => {
          if (!props.disabled && !props.loading) {
            emit('click')
          }
        }
        
        return () => h('button', {
          class: ['btn', `btn-${variant}`, {
            'btn-disabled': props.disabled,
            'btn-loading': props.loading
          }],
          onClick: handleClick
        }, [
          props.loading ? 'Loading...' : slots.default?.()
        ])
      }
    })
  }
  
  const createForm = (fields: FormField[]) => {
    return defineComponent({
      name: 'DynamicForm',
      setup(props, { emit }) {
        const formData = ref({})
        
        const handleSubmit = () => {
          emit('submit', formData.value)
        }
        
        return () => h('form', {
          onSubmit: handleSubmit
        }, fields.map(field => {
          switch (field.type) {
            case 'text':
              return h('input', {
                type: 'text',
                placeholder: field.placeholder,
                value: formData.value[field.name],
                onInput: (e: Event) => {
                  formData.value[field.name] = (e.target as HTMLInputElement).value
                }
              })
            case 'email':
              return h('input', {
                type: 'email',
                placeholder: field.placeholder,
                value: formData.value[field.name],
                onInput: (e: Event) => {
                  formData.value[field.name] = (e.target as HTMLInputElement).value
                }
              })
            case 'textarea':
              return h('textarea', {
                placeholder: field.placeholder,
                value: formData.value[field.name],
                onInput: (e: Event) => {
                  formData.value[field.name] = (e.target as HTMLTextAreaElement).value
                }
              })
            default:
              return null
          }
        }))
      }
    })
  }
  
  return {
    createComponent,
    createButton,
    createForm
  }
}
```

## 🎯 Strategy Pattern

### Basic Pattern

```typescript
// useValidation.ts
interface ValidationStrategy {
  validate(value: any): boolean
  getMessage(): string
}

class RequiredStrategy implements ValidationStrategy {
  validate(value: any): boolean {
    return value !== null && value !== undefined && value !== ''
  }
  
  getMessage(): string {
    return 'This field is required'
  }
}

class EmailStrategy implements ValidationStrategy {
  validate(value: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }
  
  getMessage(): string {
    return 'Please enter a valid email address'
  }
}

class MinLengthStrategy implements ValidationStrategy {
  constructor(private minLength: number) {}
  
  validate(value: any): boolean {
    return typeof value === 'string' && value.length >= this.minLength
  }
  
  getMessage(): string {
    return `Minimum length is ${this.minLength} characters`
  }
}

export function useValidation() {
  const strategies = new Map<string, ValidationStrategy>()
  
  const addStrategy = (name: string, strategy: ValidationStrategy) => {
    strategies.set(name, strategy)
  }
  
  const validate = (value: any, ruleNames: string[]) => {
    const errors: string[] = []
    
    for (const ruleName of ruleNames) {
      const strategy = strategies.get(ruleName)
      if (strategy && !strategy.validate(value)) {
        errors.push(strategy.getMessage())
      }
    }
    
    return errors
  }
  
  // Add default strategies
  addStrategy('required', new RequiredStrategy())
  addStrategy('email', new EmailStrategy())
  addStrategy('minLength', new MinLengthStrategy(6))
  
  return {
    addStrategy,
    validate
  }
}
```

### Advanced Strategy Pattern

```typescript
// usePayment.ts
interface PaymentStrategy {
  processPayment(amount: number): Promise<PaymentResult>
}

class CreditCardStrategy implements PaymentStrategy {
  constructor(private cardNumber: string, private cvv: string) {}
  
  async processPayment(amount: number): Promise<PaymentResult> {
    // Credit card payment logic
    return { success: true, transactionId: 'cc_123' }
  }
}

class PayPalStrategy implements PaymentStrategy {
  constructor(private email: string) {}
  
  async processPayment(amount: number): Promise<PaymentResult> {
    // PayPal payment logic
    return { success: true, transactionId: 'pp_456' }
  }
}

class BankTransferStrategy implements PaymentStrategy {
  constructor(private accountNumber: string) {}
  
  async processPayment(amount: number): Promise<PaymentResult> {
    // Bank transfer logic
    return { success: true, transactionId: 'bt_789' }
  }
}

export function usePayment() {
  const paymentStrategy = ref<PaymentStrategy | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const setStrategy = (strategy: PaymentStrategy) => {
    paymentStrategy.value = strategy
  }
  
  const processPayment = async (amount: number): Promise<PaymentResult | null> => {
    if (!paymentStrategy.value) {
      error.value = 'No payment method selected'
      return null
    }
    
    loading.value = true
    error.value = null
    
    try {
      const result = await paymentStrategy.value.processPayment(amount)
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Payment failed'
      return null
    } finally {
      loading.value = false
    }
  }
  
  return {
    paymentStrategy: readonly(paymentStrategy),
    loading: readonly(loading),
    error: readonly(error),
    setStrategy,
    processPayment
  }
}
```

## 🎯 Decorator Pattern

### Basic Pattern

```typescript
// useDecorator.ts
type DecoratorFunction = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void

export function useDecorator() {
  const log = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    
    descriptor.value = function (...args: any[]) {
      console.log(`Calling ${propertyKey} with args:`, args)
      const result = originalMethod.apply(this, args)
      console.log(`${propertyKey} returned:`, result)
      return result
    }
    
    return descriptor
  }
  
  const debounce = (delay: number) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value
      let timeoutId: NodeJS.Timeout
      
      descriptor.value = function (...args: any[]) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          originalMethod.apply(this, args)
        }, delay)
      }
      
      return descriptor
    }
  }
  
  const throttle = (delay: number) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value
      let lastCall = 0
      
      descriptor.value = function (...args: any[]) {
        const now = Date.now()
        if (now - lastCall >= delay) {
          lastCall = now
          return originalMethod.apply(this, args)
        }
      }
      
      return descriptor
    }
  }
  
  return {
    log,
    debounce,
    throttle
  }
}
```

### Advanced Decorator Pattern

```typescript
// useValidationDecorator.ts
export function useValidationDecorator() {
  const validate = (rules: ValidationRule[]) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value
      
      descriptor.value = function (...args: any[]) {
        const value = args[0]
        const errors: string[] = []
        
        for (const rule of rules) {
          if (!rule.validate(value)) {
            errors.push(rule.message)
          }
        }
        
        if (errors.length > 0) {
          throw new Error(`Validation failed: ${errors.join(', ')}`)
        }
        
        return originalMethod.apply(this, args)
      }
      
      return descriptor
    }
  }
  
  const cache = (ttl: number = 60000) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value
      const cache = new Map<string, { value: any; timestamp: number }>()
      
      descriptor.value = function (...args: any[]) {
        const key = JSON.stringify(args)
        const cached = cache.get(key)
        
        if (cached && Date.now() - cached.timestamp < ttl) {
          return cached.value
        }
        
        const result = originalMethod.apply(this, args)
        cache.set(key, { value: result, timestamp: Date.now() })
        
        return result
      }
      
      return descriptor
    }
  }
  
  return {
    validate,
    cache
  }
}
```

## 🎯 Container/Presenter Pattern

### Basic Pattern

```vue
<!-- UserContainer.vue -->
<template>
  <UserPresenter
    :users="users"
    :loading="loading"
    :error="error"
    @create-user="createUser"
    @update-user="updateUser"
    @delete-user="deleteUser"
  />
</template>

<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import UserPresenter from './UserPresenter.vue'

const { users, loading, error, createUser, updateUser, deleteUser } = useUser()
</script>

<!-- UserPresenter.vue -->
<template>
  <div class="user-presenter">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="user in users" :key="user.id" class="user-item">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button @click="$emit('update-user', user)">Edit</button>
        <button @click="$emit('delete-user', user.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  users: User[]
  loading: boolean
  error: string | null
}

interface Emits {
  (e: 'create-user', user: CreateUserDto): void
  (e: 'update-user', user: User): void
  (e: 'delete-user', id: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
```

## 🎯 Higher-Order Component Pattern

### Basic Pattern

```typescript
// withLoading.ts
import { defineComponent, h } from 'vue'

export function withLoading(component: any) {
  return defineComponent({
    name: `WithLoading(${component.name || 'Component'})`,
    props: {
      loading: Boolean
    },
    setup(props, { slots }) {
      return () => {
        if (props.loading) {
          return h('div', { class: 'loading' }, 'Loading...')
        }
        return h(component, props, slots)
      }
    }
  })
}

// withError.ts
export function withError(component: any) {
  return defineComponent({
    name: `WithError(${component.name || 'Component'})`,
    props: {
      error: String
    },
    setup(props, { slots }) {
      return () => {
        if (props.error) {
          return h('div', { class: 'error' }, props.error)
        }
        return h(component, props, slots)
      }
    }
  })
}

// Usage
const UserListWithLoading = withLoading(UserList)
const UserListWithError = withError(UserList)
const UserListWithLoadingAndError = withError(withLoading(UserList))
```

## 📚 Resources

### Official Documentation
- [Vue.js Composition API](https://vuejs.org/guide/composition-api-introduction.html)
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Vue.js Best Practices](https://vuejs.org/guide/best-practices/performance.html)

### Tools and Frameworks
- [VueUse](https://vueuse.org/) - Composable collection
- [Pinia](https://pinia.vuejs.org/) - Vue store
- [Vue Router](https://router.vuejs.org/) - Vue routing

### Communities and Resources
- [Vue.js Community](https://vuejs.org/community/)
- [Vue.js Discord](https://discord.gg/vue)
- [Vue.js GitHub](https://github.com/vuejs/vue)

---

*Last updated: January 2024*


<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

