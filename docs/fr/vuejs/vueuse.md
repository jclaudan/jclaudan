# VueUse - Collection de Composables Vue

## Installation

```bash
npm install @vueuse/core
```

## Composables de base

### useLocalStorage / useSessionStorage

```vue
<template>
  <div>
    <input v-model="value" placeholder="Enter value" />
    <p>Stored: {{ storedValue }}</p>
    <button @click="clear">Clear</button>
  </div>
</template>

<script setup>
import { useLocalStorage, useSessionStorage } from '@vueuse/core'

// LocalStorage
const value = useLocalStorage('my-key', 'default value')

// SessionStorage
const sessionValue = useSessionStorage('session-key', null)

// Avec options
const theme = useLocalStorage('theme', 'light', {
  serializer: {
    read: (value) => value,
    write: (value) => value
  }
})

const clear = () => {
  value.value = null
}
</script>
```

### useFetch

```vue
<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
    <button @click="execute">Refresh</button>
  </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core'

const { data, error, isLoading, execute } = useFetch('/api/users', {
  immediate: false,
  timeout: 10000,
  beforeFetch({ url, options, cancel }) {
    const token = localStorage.getItem('token')
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`
      }
    }
    return { options }
  },
  afterFetch(ctx) {
    console.log('Data fetched:', ctx.data)
    return ctx
  }
})

// POST request
const { execute: createUser } = useFetch('/api/users', {
  immediate: false,
  method: 'POST'
}).post({ name: 'John', email: 'john@example.com' })
</script>
```

### useMouse

```vue
<template>
  <div>
    <p>Mouse position: {{ x }}, {{ y }}</p>
    <p>Is inside: {{ isInside }}</p>
  </div>
</template>

<script setup>
import { useMouse, useMouseInElement } from '@vueuse/core'
import { ref } from 'vue'

// Position globale de la souris
const { x, y } = useMouse()

// Souris dans un élément
const target = ref()
const { isInside, elementX, elementY } = useMouseInElement(target)
</script>
```

### useEventListener

```vue
<template>
  <div>
    <p>Key pressed: {{ key }}</p>
    <p>Window size: {{ width }} x {{ height }}</p>
  </div>
</template>

<script setup>
import { useEventListener, useWindowSize } from '@vueuse/core'
import { ref } from 'vue'

const key = ref('')

// Écouter les touches
useEventListener('keydown', (e) => {
  key.value = e.key
})

// Taille de la fenêtre
const { width, height } = useWindowSize()

// Scroll
useEventListener('scroll', (e) => {
  console.log('Scrolling:', e.target.scrollTop)
})
</script>
```

## Composables d'état

### useToggle

```vue
<template>
  <div>
    <button @click="toggle">Toggle: {{ state }}</button>
    <button @click="setTrue">Set True</button>
    <button @click="setFalse">Set False</button>
  </div>
</template>

<script setup>
import { useToggle } from '@vueuse/core'

const [state, toggle, setTrue, setFalse] = useToggle()

// Avec valeur initiale
const [isOpen, toggleOpen] = useToggle(false)
</script>
```

### useCounter

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="inc">+</button>
    <button @click="dec">-</button>
    <button @click="set(10)">Set to 10</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { useCounter } from '@vueuse/core'

const { count, inc, dec, set, reset } = useCounter(0, {
  min: 0,
  max: 100
})
</script>
```

### useClipboard

```vue
<template>
  <div>
    <input v-model="text" placeholder="Text to copy" />
    <button @click="copy(text)" :disabled="!isSupported">
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
  </div>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'

const { copy, copied, isSupported } = useClipboard()

const text = ref('Hello World')
</script>
```

## Composables d'animation

### useTransition

```vue
<template>
  <div>
    <p>Value: {{ output }}</p>
    <button @click="setValue(100)">Animate to 100</button>
  </div>
</template>

<script setup>
import { useTransition } from '@vueuse/core'
import { ref } from 'vue'

const source = ref(0)
const output = useTransition(source, {
  duration: 1000,
  transition: [0.25, 0.1, 0.25, 1] // easeInOut
})

const setValue = (value) => {
  source.value = value
}
</script>
```

### useInterval

```vue
<template>
  <div>
    <p>Timer: {{ counter }}</p>
    <button @click="pause">Pause</button>
    <button @click="resume">Resume</button>
    <button @click="stop">Stop</button>
  </div>
</template>

<script setup>
import { useInterval } from '@vueuse/core'
import { ref } from 'vue'

const counter = ref(0)

const { pause, resume, stop } = useInterval(() => {
  counter.value++
}, 1000)
</script>
```

## Composables de géolocalisation

### useGeolocation

```vue
<template>
  <div>
    <div v-if="isLoading">Loading location...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <p>Latitude: {{ latitude }}</p>
      <p>Longitude: {{ longitude }}</p>
      <p>Accuracy: {{ accuracy }}m</p>
    </div>
  </div>
</template>

<script setup>
import { useGeolocation } from '@vueuse/core'

const { coords, isSupported, error } = useGeolocation({
  immediate: true,
  enableHighAccuracy: true
})

const { latitude, longitude, accuracy } = coords
const isLoading = computed(() => !latitude.value && !error.value)
</script>
```

## Composables de validation

### useForm

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input 
      v-model="form.email" 
      type="email" 
      placeholder="Email"
      :class="{ error: errors.email }"
    />
    <span v-if="errors.email">{{ errors.email }}</span>
    
    <input 
      v-model="form.password" 
      type="password" 
      placeholder="Password"
      :class="{ error: errors.password }"
    />
    <span v-if="errors.password">{{ errors.password }}</span>
    
    <button type="submit" :disabled="!isValid">Submit</button>
  </form>
</template>

<script setup>
import { useForm } from '@vueuse/core'

const { form, errors, isValid, handleSubmit } = useForm({
  initialValues: {
    email: '',
    password: ''
  },
  validationSchema: {
    email: (value) => {
      if (!value) return 'Email is required'
      if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid'
      return null
    },
    password: (value) => {
      if (!value) return 'Password is required'
      if (value.length < 6) return 'Password must be at least 6 characters'
      return null
    }
  }
})
</script>
```

## Composables de performance

### useDebounce

```vue
<template>
  <div>
    <input v-model="input" placeholder="Search..." />
    <p>Debounced: {{ debouncedInput }}</p>
  </div>
</template>

<script setup>
import { useDebounce } from '@vueuse/core'
import { ref } from 'vue'

const input = ref('')
const debouncedInput = useDebounce(input, 500)

// Utiliser pour les recherches
watch(debouncedInput, (value) => {
  if (value) {
    search(value)
  }
})
</script>
```

### useThrottle

```vue
<template>
  <div>
    <button @click="throttledClick">Click me</button>
    <p>Clicks: {{ clickCount }}</p>
  </div>
</template>

<script setup>
import { useThrottleFn } from '@vueuse/core'
import { ref } from 'vue'

const clickCount = ref(0)

const throttledClick = useThrottleFn(() => {
  clickCount.value++
}, 1000) // Max 1 click per second
</script>
```

## Composables de date

### useNow

```vue
<template>
  <div>
    <p>Current time: {{ now }}</p>
    <p>Formatted: {{ formatted }}</p>
  </div>
</template>

<script setup>
import { useNow } from '@vueuse/core'

const now = useNow()
const formatted = computed(() => 
  now.value.toLocaleString()
)
</script>
```

### useTimeAgo

```vue
<template>
  <div>
    <p>Created {{ timeAgo }}</p>
  </div>
</template>

<script setup>
import { useTimeAgo } from '@vueuse/core'

const date = new Date('2024-01-01')
const timeAgo = useTimeAgo(date)
</script>
```

## Composables utilitaires

### useDark

```vue
<template>
  <div>
    <button @click="toggleDark">Toggle Dark Mode</button>
    <p>Is dark: {{ isDark }}</p>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
```

### useBreakpoints

```vue
<template>
  <div>
    <p>Screen size: {{ currentBreakpoint }}</p>
    <p>Is mobile: {{ isMobile }}</p>
    <p>Is tablet: {{ isTablet }}</p>
    <p>Is desktop: {{ isDesktop }}</p>
  </div>
</template>

<script setup>
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 0,
  tablet: 768,
  desktop: 1024
})

const { mobile, tablet, desktop } = breakpoints
const currentBreakpoint = computed(() => {
  if (mobile.value) return 'mobile'
  if (tablet.value) return 'tablet'
  if (desktop.value) return 'desktop'
  return 'unknown'
})
</script>
```

## Composables personnalisés

### useAuth

```typescript
// composables/useAuth.ts
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export function useAuth() {
  const token = useLocalStorage('auth-token', null)
  const user = useLocalStorage('auth-user', null)
  
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    const data = await response.json()
    token.value = data.token
    user.value = data.user
  }
  
  const logout = () => {
    token.value = null
    user.value = null
  }
  
  return {
    token,
    user,
    isAuthenticated,
    login,
    logout
  }
}
```

### useApi

```typescript
// composables/useApi.ts
import { useFetch } from '@vueuse/core'
import { useAuth } from './useAuth'

export function useApi(endpoint, options = {}) {
  const { token } = useAuth()
  
  return useFetch(endpoint, {
    ...options,
    beforeFetch({ options }) {
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`
        }
      }
      return { options }
    }
  })
}
```

## Tests

```typescript
// tests/composables/useCounter.test.ts
import { renderHook } from '@testing-library/vue'
import { useCounter } from '@vueuse/core'

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter())
    
    expect(result.current.count.value).toBe(0)
    
    result.current.inc()
    expect(result.current.count.value).toBe(1)
  })
})
```

## Bonnes pratiques

1. **Composables réutilisables** : Créer des composables personnalisés
2. **Performance** : Utiliser debounce/throttle pour les événements
3. **Gestion d'état** : Combiner avec Pinia si nécessaire
4. **Tests** : Tester les composables isolément
5. **TypeScript** : Utiliser TypeScript pour la sécurité

## Pièges à éviter

1. **Overuse** : Ne pas abuser des composables
2. **Memory leaks** : Nettoyer les listeners
3. **Reactivity** : Comprendre la réactivité Vue
4. **Performance** : Attention aux performances avec beaucoup de composables
