# Vue 3 State Patterns

## 1. Local State Pattern

### Description
Component local state management with `ref()` and `reactive()`.

### Example - Simple Local State
```vue
<template>
  <div>
    <input v-model="message" placeholder="Enter a message" />
    <p>Message: {{ message }}</p>
    <button @click="clearMessage">Clear</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const isEditing = ref(false)

const clearMessage = () => {
  message.value = ''
  isEditing.value = false
}
</script>
```

### Example - Complex Local State
```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" placeholder="Name" />
    <input v-model="form.email" placeholder="Email" />
    <button type="submit" :disabled="!isValid">Submit</button>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'

const form = reactive({
  name: '',
  email: '',
  errors: {}
})

const isValid = computed(() => {
  return form.name && form.email && Object.keys(form.errors).length === 0
})

const handleSubmit = () => {
  // Submission logic
  console.log('Form submitted:', form)
}
</script>
```

## 2. Shared State Pattern

### Description
State shared between components with composables.

### Example - useSharedState
```typescript
// composables/useSharedState.ts
import { ref, computed } from 'vue'

const globalState = ref({
  user: null,
  theme: 'light',
  notifications: []
})

export function useSharedState() {
  const setUser = (user: any) => {
    globalState.value.user = user
  }
  
  const setTheme = (theme: string) => {
    globalState.value.theme = theme
  }
  
  const addNotification = (notification: any) => {
    globalState.value.notifications.push(notification)
  }
  
  const removeNotification = (id: string) => {
    const index = globalState.value.notifications.findIndex(n => n.id === id)
    if (index > -1) {
      globalState.value.notifications.splice(index, 1)
    }
  }
  
  const user = computed(() => globalState.value.user)
  const theme = computed(() => globalState.value.theme)
  const notifications = computed(() => globalState.value.notifications)
  
  return {
    user,
    theme,
    notifications,
    setUser,
    setTheme,
    addNotification,
    removeNotification
  }
}
```

## 3. State Management Pattern (Pinia-like)

### Description
Global state management with stores.

### Example - User Store
```typescript
// stores/userStore.ts
import { ref, computed } from 'vue'

class UserStore {
  private state = ref({
    currentUser: null,
    users: [],
    loading: false,
    error: null
  })
  
  get currentUser() {
    return this.state.value.currentUser
  }
  
  get users() {
    return this.state.value.users
  }
  
  get loading() {
    return this.state.value.loading
  }
  
  get error() {
    return this.state.value.error
  }
  
  get isAuthenticated() {
    return computed(() => this.currentUser !== null)
  }
  
  async login(credentials: LoginCredentials) {
    this.state.value.loading = true
    this.state.value.error = null
    
    try {
      const user = await authService.login(credentials)
      this.state.value.currentUser = user
    } catch (error) {
      this.state.value.error = error.message
    } finally {
      this.state.value.loading = false
    }
  }
  
  logout() {
    this.state.value.currentUser = null
    this.state.value.error = null
  }
  
  async fetchUsers() {
    this.state.value.loading = true
    
    try {
      this.state.value.users = await userService.getAll()
    } catch (error) {
      this.state.value.error = error.message
    } finally {
      this.state.value.loading = false
    }
  }
}

export const userStore = new UserStore()
```

## 4. State Persistence Pattern

### Description
State persistence with localStorage/sessionStorage.

### Example - usePersistedState
```typescript
// composables/usePersistedState.ts
import { ref, watch } from 'vue'

export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  storage: Storage = localStorage
) {
  const storedValue = storage.getItem(key)
  const state = ref<T>(
    storedValue ? JSON.parse(storedValue) : defaultValue
  )
  
  watch(
    state,
    (newValue) => {
      storage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true }
  )
  
  const clear = () => {
    storage.removeItem(key)
    state.value = defaultValue
  }
  
  return {
    state,
    clear
  }
}
```

### Example - Usage
```vue
<template>
  <div>
    <input v-model="state.value.name" placeholder="Name" />
    <input v-model="state.value.email" placeholder="Email" />
    <button @click="clear">Clear</button>
  </div>
</template>

<script setup>
import { usePersistedState } from '@/composables/usePersistedState'

const { state, clear } = usePersistedState('user-form', {
  name: '',
  email: ''
})
</script>
```

## 5. State Validation Pattern

### Description
State validation with rules.

### Example - useValidatedState
```typescript
// composables/useValidatedState.ts
import { ref, computed } from 'vue'

type ValidationRule<T> = (value: T) => string | null

export function useValidatedState<T>(
  initialValue: T,
  rules: ValidationRule<T>[]
) {
  const state = ref<T>(initialValue)
  const errors = ref<string[]>([])
  
  const validate = () => {
    errors.value = rules
      .map(rule => rule(state.value))
      .filter(Boolean) as string[]
  }
  
  const isValid = computed(() => errors.value.length === 0)
  
  const setValue = (value: T) => {
    state.value = value
    validate()
  }
  
  return {
    state,
    errors,
    isValid,
    setValue,
    validate
  }
}
```

## 6. State Synchronization Pattern

### Description
State synchronization between components.

### Example - useStateSync
```typescript
// composables/useStateSync.ts
import { ref, watch } from 'vue'

const syncState = ref(new Map<string, any>())

export function useStateSync<T>(key: string, defaultValue: T) {
  if (!syncState.value.has(key)) {
    syncState.value.set(key, ref(defaultValue))
  }
  
  const state = syncState.value.get(key)
  
  const setValue = (value: T) => {
    state.value = value
  }
  
  const getValue = () => state.value
  
  return {
    state,
    setValue,
    getValue
  }
}
```

## 7. State Machine Pattern

### Description
State machine for managing state transitions.

### Example - useStateMachine
```typescript
// composables/useStateMachine.ts
import { ref, computed } from 'vue'

type State = string
type Event = string

interface StateMachine {
  states: State[]
  events: Event[]
  transitions: Record<State, Record<Event, State>>
  initialState: State
}

export function useStateMachine(machine: StateMachine) {
  const currentState = ref<State>(machine.initialState)
  
  const canTransition = (event: Event) => {
    return machine.transitions[currentState.value]?.[event] !== undefined
  }
  
  const transition = (event: Event) => {
    if (canTransition(event)) {
      currentState.value = machine.transitions[currentState.value][event]
    }
  }
  
  const isState = (state: State) => {
    return currentState.value === state
  }
  
  const availableEvents = computed(() => {
    return Object.keys(machine.transitions[currentState.value] || {})
  })
  
  return {
    currentState,
    canTransition,
    transition,
    isState,
    availableEvents
  }
}
```

## Best Practices

1. **Single Source of Truth**: One single source of truth for state
2. **Immutable Updates**: Immutable updates
3. **State Normalization**: Normalize complex state
4. **Separation of Concerns**: Separate concerns
5. **Type Safety**: Use TypeScript for type safety

## Pitfalls to Avoid

1. **Mutating State Directly**: Don't mutate state directly
2. **Circular Dependencies**: Avoid circular dependencies
3. **Over-normalization**: Don't over-normalize state
4. **State in Components**: Avoid global state in components



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

