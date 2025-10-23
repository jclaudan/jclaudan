# 🟢 Vue.js 3 - Design Patterns & Composition API

## 📋 Table des matières

- [Introduction](#introduction)
- [Patterns de Base](#patterns-de-base)
- [Patterns Composition API](#patterns-composition-api)
- [Patterns d'État](#patterns-détat)
- [Patterns de Composants](#patterns-de-composants)
- [Patterns de Performance](#patterns-de-performance)
- [Patterns Avancés](#patterns-avancés)

## 🚀 Introduction

Ce guide couvre tous les design patterns spécifiques à Vue.js 3 avec la Composition API, incluant les paradigmes POO et fonctionnels.

## 🎯 Patterns de Base

### 1. Singleton Pattern

#### POO - Classique
```typescript
// stores/singleton.store.ts
class SingletonStore {
  private static instance: SingletonStore
  private data: any = {}

  private constructor() {}

  static getInstance(): SingletonStore {
    if (!SingletonStore.instance) {
      SingletonStore.instance = new SingletonStore()
    }
    return SingletonStore.instance
  }

  setData(key: string, value: any): void {
    this.data[key] = value
  }

  getData(key: string): any {
    return this.data[key]
  }
}

export default SingletonStore
```

#### Fonctionnel - Composition API
```typescript
// composables/useSingleton.ts
let instance: any = null

export function useSingleton() {
  if (!instance) {
    instance = reactive({
      data: {},
      setData(key: string, value: any) {
        this.data[key] = value
      },
      getData(key: string) {
        return this.data[key]
      }
    })
  }
  return instance
}
```

### 2. Factory Pattern

#### POO - Classique
```typescript
// factories/component.factory.ts
interface ComponentConfig {
  type: 'button' | 'input' | 'select'
  props: Record<string, any>
}

class ComponentFactory {
  static create(config: ComponentConfig) {
    switch (config.type) {
      case 'button':
        return new ButtonComponent(config.props)
      case 'input':
        return new InputComponent(config.props)
      case 'select':
        return new SelectComponent(config.props)
      default:
        throw new Error(`Unknown component type: ${config.type}`)
    }
  }
}

class ButtonComponent {
  constructor(private props: Record<string, any>) {}
  
  render() {
    return h('button', this.props)
  }
}
```

#### Fonctionnel - Composition API
```typescript
// composables/useComponentFactory.ts
export function useComponentFactory() {
  const createComponent = (config: ComponentConfig) => {
    const componentMap = {
      button: () => h('button', config.props),
      input: () => h('input', config.props),
      select: () => h('select', config.props)
    }
    
    return componentMap[config.type]?.() || h('div', 'Unknown component')
  }

  return { createComponent }
}
```

### 3. Observer Pattern

#### POO - Classique
```typescript
// patterns/observer.pattern.ts
interface Observer {
  update(data: any): void
}

class Subject {
  private observers: Observer[] = []

  addObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index > -1) {
      this.observers.splice(index, 1)
    }
  }

  notify(data: any): void {
    this.observers.forEach(observer => observer.update(data))
  }
}

class DataSubject extends Subject {
  private _data: any = null

  set data(value: any) {
    this._data = value
    this.notify(value)
  }

  get data() {
    return this._data
  }
}
```

#### Fonctionnel - Composition API
```typescript
// composables/useObserver.ts
export function useObserver() {
  const observers = ref<Function[]>([])
  
  const subscribe = (callback: Function) => {
    observers.value.push(callback)
    
    return () => {
      const index = observers.value.indexOf(callback)
      if (index > -1) {
        observers.value.splice(index, 1)
      }
    }
  }
  
  const notify = (data: any) => {
    observers.value.forEach(callback => callback(data))
  }
  
  return { subscribe, notify }
}
```

## 🎯 Patterns Composition API

### 1. Composable Pattern

```typescript
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  const setValue = (value: number) => count.value = value
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    setValue
  }
}

// Usage
const { count, increment, decrement } = useCounter(10)
```

### 2. Provider Pattern

```typescript
// composables/useTheme.ts
const ThemeSymbol = Symbol('theme')

export function provideTheme(theme: Ref<string>) {
  provide(ThemeSymbol, theme)
}

export function useTheme() {
  const theme = inject(ThemeSymbol)
  if (!theme) {
    throw new Error('Theme not provided')
  }
  return theme
}

// Parent component
export default defineComponent({
  setup() {
    const theme = ref('dark')
    provideTheme(theme)
    
    return { theme }
  }
})

// Child component
export default defineComponent({
  setup() {
    const theme = useTheme()
    
    return { theme }
  }
})
```

### 3. State Machine Pattern

```typescript
// composables/useStateMachine.ts
interface StateMachineConfig {
  initial: string
  states: Record<string, {
    on?: Record<string, string>
    enter?: () => void
    exit?: () => void
  }>
}

export function useStateMachine(config: StateMachineConfig) {
  const currentState = ref(config.initial)
  
  const transition = (event: string) => {
    const state = config.states[currentState.value]
    const nextState = state.on?.[event]
    
    if (nextState) {
      state.exit?.()
      currentState.value = nextState
      config.states[nextState].enter?.()
    }
  }
  
  const canTransition = (event: string) => {
    const state = config.states[currentState.value]
    return !!state.on?.[event]
  }
  
  return {
    currentState: readonly(currentState),
    transition,
    canTransition
  }
}

// Usage
const { currentState, transition, canTransition } = useStateMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { start: 'loading' }
    },
    loading: {
      on: { success: 'success', error: 'error' },
      enter: () => console.log('Loading started')
    },
    success: {
      on: { reset: 'idle' }
    },
    error: {
      on: { retry: 'loading', reset: 'idle' }
    }
  }
})
```

## 🎯 Patterns d'État

### 1. Store Pattern

```typescript
// stores/useStore.ts
interface StoreState {
  user: User | null
  theme: string
  loading: boolean
}

export function useStore() {
  const state = reactive<StoreState>({
    user: null,
    theme: 'light',
    loading: false
  })
  
  const mutations = {
    setUser(user: User | null) {
      state.user = user
    },
    setTheme(theme: string) {
      state.theme = theme
    },
    setLoading(loading: boolean) {
      state.loading = loading
    }
  }
  
  const actions = {
    async login(credentials: LoginCredentials) {
      state.loading = true
      try {
        const user = await authService.login(credentials)
        mutations.setUser(user)
      } catch (error) {
        throw error
      } finally {
        state.loading = false
      }
    },
    
    logout() {
      mutations.setUser(null)
    }
  }
  
  const getters = {
    isAuthenticated: computed(() => !!state.user),
    userRole: computed(() => state.user?.role || 'guest')
  }
  
  return {
    state: readonly(state),
    mutations,
    actions,
    getters
  }
}
```

### 2. Event Bus Pattern

```typescript
// composables/useEventBus.ts
type EventCallback = (...args: any[]) => void

class EventBus {
  private events: Record<string, EventCallback[]> = {}
  
  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }
  
  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return
    
    const index = this.events[event].indexOf(callback)
    if (index > -1) {
      this.events[event].splice(index, 1)
    }
  }
  
  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return
    
    this.events[event].forEach(callback => callback(...args))
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
  
  return { on, off, emit }
}
```

### 3. Reactive State Pattern

```typescript
// composables/useReactiveState.ts
export function useReactiveState<T>(initialValue: T) {
  const state = ref(initialValue)
  
  const setState = (newState: T | ((prev: T) => T)) => {
    if (typeof newState === 'function') {
      state.value = (newState as (prev: T) => T)(state.value)
    } else {
      state.value = newState
    }
  }
  
  const resetState = () => {
    state.value = initialValue
  }
  
  const updateState = (updater: Partial<T>) => {
    if (typeof state.value === 'object' && state.value !== null) {
      state.value = { ...state.value, ...updater }
    }
  }
  
  return {
    state: readonly(state),
    setState,
    resetState,
    updateState
  }
}
```

## 🎯 Patterns de Composants

### 1. Compound Component Pattern

```vue
<!-- components/Accordion.vue -->
<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface AccordionProps {
  multiple?: boolean
  defaultOpen?: string[]
}

const props = withDefaults(defineProps<AccordionProps>(), {
  multiple: false,
  defaultOpen: () => []
})

const openItems = ref(new Set(props.defaultOpen))

const toggleItem = (id: string) => {
  if (openItems.value.has(id)) {
    openItems.value.delete(id)
  } else {
    if (!props.multiple) {
      openItems.value.clear()
    }
    openItems.value.add(id)
  }
}

const isOpen = (id: string) => openItems.value.has(id)

provide('accordion', {
  toggleItem,
  isOpen
})
</script>
```

```vue
<!-- components/AccordionItem.vue -->
<template>
  <div class="accordion-item">
    <button @click="toggle" class="accordion-header">
      <slot name="header" />
      <span class="accordion-icon">{{ isOpen ? '−' : '+' }}</span>
    </button>
    <Transition name="accordion">
      <div v-if="isOpen" class="accordion-content">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface AccordionItemProps {
  id: string
}

const props = defineProps<AccordionItemProps>()
const accordion = inject('accordion')

const isOpen = computed(() => accordion.isOpen(props.id))
const toggle = () => accordion.toggleItem(props.id)
</script>
```

### 2. Render Props Pattern

```vue
<!-- components/DataProvider.vue -->
<template>
  <slot :data="data" :loading="loading" :error="error" />
</template>

<script setup lang="ts">
interface DataProviderProps {
  url: string
}

const props = defineProps<DataProviderProps>()

const data = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(props.url)
    data.value = await response.json()
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>
```

### 3. Higher-Order Component Pattern

```typescript
// composables/withLoading.ts
export function withLoading<T extends Record<string, any>>(
  WrappedComponent: Component<T>
) {
  return defineComponent({
    name: `WithLoading(${WrappedComponent.name || 'Component'})`,
    setup(props, { slots }) {
      const loading = ref(false)
      
      const setLoading = (value: boolean) => {
        loading.value = value
      }
      
      return () => {
        if (loading.value) {
          return h('div', { class: 'loading' }, 'Loading...')
        }
        
        return h(WrappedComponent, {
          ...props,
          setLoading
        }, slots)
      }
    }
  })
}

// Usage
const MyComponentWithLoading = withLoading(MyComponent)
```

## 🎯 Patterns de Performance

### 1. Virtual Scrolling Pattern

```vue
<!-- components/VirtualList.vue -->
<template>
  <div 
    ref="containerRef" 
    class="virtual-list"
    @scroll="handleScroll"
  >
    <div :style="{ height: totalHeight + 'px' }">
      <div 
        v-for="item in visibleItems" 
        :key="item.id"
        :style="{ 
          position: 'absolute', 
          top: item.top + 'px',
          height: itemHeight + 'px'
        }"
      >
        <slot :item="item.data" :index="item.index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface VirtualListProps {
  items: any[]
  itemHeight: number
  containerHeight: number
}

const props = defineProps<VirtualListProps>()

const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)

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

const totalHeight = computed(() => props.items.length * props.itemHeight)

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}
</script>
```

### 2. Lazy Loading Pattern

```typescript
// composables/useLazyLoad.ts
export function useLazyLoad(options: IntersectionObserverInit = {}) {
  const target = ref<HTMLElement>()
  const isIntersecting = ref(false)
  const hasIntersected = ref(false)
  
  const observer = new IntersectionObserver(
    ([entry]) => {
      isIntersecting.value = entry.isIntersecting
      if (entry.isIntersecting && !hasIntersected.value) {
        hasIntersected.value = true
      }
    },
    options
  )
  
  onMounted(() => {
    if (target.value) {
      observer.observe(target.value)
    }
  })
  
  onUnmounted(() => {
    observer.disconnect()
  })
  
  return {
    target,
    isIntersecting: readonly(isIntersecting),
    hasIntersected: readonly(hasIntersected)
  }
}

// Usage
const { target, hasIntersected } = useLazyLoad()
</script>

<template>
  <div ref="target">
    <div v-if="hasIntersected">
      <!-- Lazy loaded content -->
    </div>
  </div>
</template>
```

### 3. Memoization Pattern

```typescript
// composables/useMemo.ts
export function useMemo<T>(fn: () => T, deps: Ref<any>[]) {
  const cache = ref<Map<string, T>>(new Map())
  
  const memoized = computed(() => {
    const key = deps.map(dep => dep.value).join('|')
    
    if (cache.value.has(key)) {
      return cache.value.get(key)!
    }
    
    const result = fn()
    cache.value.set(key, result)
    
    return result
  })
  
  return memoized
}

// Usage
const expensiveValue = useMemo(
  () => heavyComputation(props.data.value),
  [props.data]
)
```

## 🎯 Patterns Avancés

### 1. Plugin Pattern

```typescript
// plugins/myPlugin.ts
interface PluginOptions {
  theme?: string
  locale?: string
}

export default {
  install(app: App, options: PluginOptions = {}) {
    // Global properties
    app.config.globalProperties.$myPlugin = {
      theme: options.theme || 'light',
      locale: options.locale || 'en'
    }
    
    // Global components
    app.component('MyButton', MyButton)
    
    // Directives
    app.directive('focus', {
      mounted(el: HTMLElement) {
        el.focus()
      }
    })
    
    // Provide/Inject
    app.provide('myPlugin', {
      theme: options.theme || 'light',
      locale: options.locale || 'en'
    })
  }
}

// Usage
app.use(myPlugin, {
  theme: 'dark',
  locale: 'fr'
})
```

### 2. Middleware Pattern

```typescript
// composables/useMiddleware.ts
type MiddlewareFunction = (context: any, next: () => void) => void

export function useMiddleware() {
  const middlewares: MiddlewareFunction[] = []
  
  const use = (middleware: MiddlewareFunction) => {
    middlewares.push(middleware)
  }
  
  const execute = async (context: any) => {
    let index = 0
    
    const next = () => {
      if (index < middlewares.length) {
        const middleware = middlewares[index++]
        middleware(context, next)
      }
    }
    
    next()
  }
  
  return { use, execute }
}

// Usage
const { use, execute } = useMiddleware()

use((context, next) => {
  console.log('Middleware 1')
  next()
})

use((context, next) => {
  console.log('Middleware 2')
  next()
})

execute({ data: 'test' })
```

### 3. Strategy Pattern

```typescript
// strategies/validation.strategy.ts
interface ValidationStrategy {
  validate(value: any): boolean
  getMessage(): string
}

class EmailValidation implements ValidationStrategy {
  validate(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }
  
  getMessage(): string {
    return 'Invalid email format'
  }
}

class PhoneValidation implements ValidationStrategy {
  validate(value: string): boolean {
    return /^\+?[\d\s-()]+$/.test(value)
  }
  
  getMessage(): string {
    return 'Invalid phone format'
  }
}

// composables/useValidation.ts
export function useValidation() {
  const strategies = new Map<string, ValidationStrategy>()
  
  strategies.set('email', new EmailValidation())
  strategies.set('phone', new PhoneValidation())
  
  const validate = (value: any, type: string) => {
    const strategy = strategies.get(type)
    if (!strategy) {
      throw new Error(`Unknown validation type: ${type}`)
    }
    
    return {
      isValid: strategy.validate(value),
      message: strategy.getMessage()
    }
  }
  
  return { validate }
}
```

## 📚 Ressources

### Documentation officielle
- [Vue.js Composition API](https://vuejs.org/guide/composition-api/)
- [Vue.js Style Guide](https://vuejs.org/style-guide/)
- [Vue.js Best Practices](https://vuejs.org/guide/best-practices/)

### Patterns et bonnes pratiques
- [Vue.js Design Patterns](https://vuejs.org/guide/reusability/composables.html)
- [Composition API Patterns](https://vuejs.org/guide/reusability/composables.html)
- [Vue.js Performance](https://vuejs.org/guide/best-practices/performance.html)

---

*Dernière mise à jour : Janvier 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

