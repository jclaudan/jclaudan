# Patterns de Composition Vue 3

## 1. Composables Pattern

### Description
Logique réutilisable encapsulée dans des fonctions composables.

### Exemple - useCounter
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

### Exemple - useApi
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
Injection de dépendances avec `provide()` et `inject()`.

### Exemple - Theme Provider
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

### Exemple - Theme Consumer
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
Composition de fonctionnalités avec des composables.

### Exemple - useValidation
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
Création de composants dynamiques avec des factories.

### Exemple - Component Factory
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
Pattern d'observation avec des événements personnalisés.

### Exemple - Event Bus
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
Pattern de stratégie avec des composables.

### Exemple - useSorting
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

## Bonnes Pratiques

1. **Single Responsibility** : Un composable, une responsabilité
2. **Naming Convention** : Utiliser le préfixe `use`
3. **Return Object** : Retourner un objet avec des propriétés nommées
4. **Cleanup** : Nettoyer les ressources dans `onUnmounted`
5. **TypeScript** : Utiliser TypeScript pour la sécurité des types

## Pièges à Éviter

1. **Side Effects in Composables** : Éviter les effets de bord dans les composables
2. **Global State in Composables** : Éviter l'état global dans les composables
3. **Over-nesting** : Ne pas sur-imbriquer les composables
4. **Memory Leaks** : Nettoyer les listeners et timers



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

