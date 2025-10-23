# Vue 3 Composition Patterns

## 1. Composables Pattern

### Description
Reusable logic encapsulated in composable functions.

### Example - useCounter
```typescript
// composables/useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    isEven
  }
}
```

### Example - useApi
```typescript
// composables/useApi.ts
import { ref, computed } from 'vue'

export function useApi<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const fetchData = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error('Network error')
      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }
  
  const hasData = computed(() => data.value !== null)
  
  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    fetchData,
    hasData
  }
}
```

## 2. Provider/Inject Pattern

### Description
Dependency injection with `provide()` and `inject()`.

### Example - Theme Provider
```vue
<!-- ThemeProvider.vue -->
<template>
  <div :class="theme">
    <slot />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide('theme', {
  theme,
  toggleTheme
})
</script>
```

### Example - Theme Consumer
```vue
<!-- ThemeConsumer.vue -->
<template>
  <button @click="toggleTheme">
    Current theme: {{ theme }}
  </button>
</template>

<script setup>
import { inject } from 'vue'

const { theme, toggleTheme } = inject('theme', {
  theme: ref('light'),
  toggleTheme: () => {}
})
</script>
```

## 3. Mixin Pattern (Composables Alternative)

### Description
Feature composition with composables.

### Example - useValidation
```typescript
// composables/useValidation.ts
import { ref, computed } from 'vue'

export function useValidation() {
  const errors = ref<string[]>([])
  
  const validate = (rules: ValidationRule[], value: any) => {
    errors.value = rules
      .map(rule => rule(value))
      .filter(Boolean)
  }
  
  const isValid = computed(() => errors.value.length === 0)
  
  return {
    errors: readonly(errors),
    validate,
    isValid
  }
}

interface ValidationRule {
  (value: any): string | null
}
```

## 4. Factory Pattern

### Description
Dynamic component creation with factories.

### Example - Component Factory
```typescript
// composables/useComponentFactory.ts
import { defineComponent, h } from 'vue'

export function useComponentFactory() {
  const createButton = (props: any, children?: any) => {
    return defineComponent({
      props: ['variant', 'size', 'disabled'],
      setup(props, { slots }) {
        return () => h('button', {
          class: [
            'btn',
            `btn-${props.variant || 'primary'}`,
            `btn-${props.size || 'md'}`,
            { 'btn-disabled': props.disabled }
          ],
          disabled: props.disabled
        }, slots.default?.())
      }
    })
  }
  
  const createInput = (type: string) => {
    return defineComponent({
      props: ['modelValue', 'placeholder'],
      emits: ['update:modelValue'],
      setup(props, { emit }) {
        return () => h('input', {
          type,
          value: props.modelValue,
          placeholder: props.placeholder,
          onInput: (e: Event) => {
            emit('update:modelValue', (e.target as HTMLInputElement).value)
          }
        })
      }
    })
  }
  
  return {
    createButton,
    createInput
  }
}
```

## 5. Observer Pattern

### Description
Observation pattern with custom events.

### Example - Event Bus
```typescript
// composables/useEventBus.ts
import { ref, onUnmounted } from 'vue'

type EventCallback = (...args: any[]) => void

export function useEventBus() {
  const listeners = ref<Map<string, EventCallback[]>>(new Map())
  
  const on = (event: string, callback: EventCallback) => {
    if (!listeners.value.has(event)) {
      listeners.value.set(event, [])
    }
    listeners.value.get(event)!.push(callback)
    
    // Cleanup function
    return () => off(event, callback)
  }
  
  const off = (event: string, callback: EventCallback) => {
    const eventListeners = listeners.value.get(event)
    if (eventListeners) {
      const index = eventListeners.indexOf(callback)
      if (index > -1) {
        eventListeners.splice(index, 1)
      }
    }
  }
  
  const emit = (event: string, ...args: any[]) => {
    const eventListeners = listeners.value.get(event)
    if (eventListeners) {
      eventListeners.forEach(callback => callback(...args))
    }
  }
  
  return {
    on,
    off,
    emit
  }
}
```

## 6. Strategy Pattern

### Description
Strategy pattern with composables.

### Example - useSorting
```typescript
// composables/useSorting.ts
import { ref, computed } from 'vue'

type SortStrategy<T> = (a: T, b: T) => number

export function useSorting<T>(items: Ref<T[]>) {
  const sortStrategy = ref<SortStrategy<T> | null>(null)
  
  const sortedItems = computed(() => {
    if (!sortStrategy.value) return items.value
    return [...items.value].sort(sortStrategy.value)
  })
  
  const setSortStrategy = (strategy: SortStrategy<T>) => {
    sortStrategy.value = strategy
  }
  
  const sortBy = (key: keyof T, direction: 'asc' | 'desc' = 'asc') => {
    setSortStrategy((a, b) => {
      const aVal = a[key]
      const bVal = b[key]
      const result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return direction === 'asc' ? result : -result
    })
  }
  
  return {
    sortedItems,
    setSortStrategy,
    sortBy
  }
}
```

## Best Practices

1. **Single Responsibility**: One composable, one responsibility
2. **Naming Convention**: Use `use` prefix
3. **Return Object**: Return an object with named properties
4. **Cleanup**: Clean up resources in `onUnmounted`
5. **TypeScript**: Use TypeScript for type safety

## Pitfalls to Avoid

1. **Side Effects in Composables**: Avoid side effects in composables
2. **Global State in Composables**: Avoid global state in composables
3. **Over-nesting**: Don't over-nest composables
4. **Memory Leaks**: Clean up listeners and timers
