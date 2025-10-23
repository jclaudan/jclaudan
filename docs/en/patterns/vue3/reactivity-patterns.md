# Vue 3 Reactivity Patterns

## 1. Reactive State Pattern

### Description
Reactive state management with `reactive()` and `ref()`.

### Example - Ref Pattern
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### Example - Reactive Pattern
```vue
<script setup>
import { reactive, toRefs } from 'vue'

const state = reactive({
  user: {
    name: 'John',
    email: 'john@example.com'
  },
  settings: {
    theme: 'dark',
    language: 'en'
  }
})

const { user, settings } = toRefs(state)
</script>
```

## 2. Computed Pattern

### Description
Computed properties that update automatically.

### Example - Simple Computed
```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: 20 },
  { name: 'Item 3', price: 30 }
])

const totalPrice = computed(() => {
  return items.value.reduce((sum, item) => sum + item.price, 0)
})

const expensiveItems = computed(() => {
  return items.value.filter(item => item.price > 15)
})
</script>
```

### Example - Computed with Parameters
```vue
<script setup>
import { ref, computed } from 'vue'

const users = ref([])
const searchTerm = ref('')

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const getUserById = computed(() => {
  return (id) => users.value.find(user => user.id === id)
})
</script>
```

## 3. Watch Pattern

### Description
Change monitoring with `watch()` and `watchEffect()`.

### Example - Watch
```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

watch(count, (newCount, oldCount) => {
  message.value = `Count changed from ${oldCount} to ${newCount}`
})

// Watch multiple sources
const firstName = ref('')
const lastName = ref('')
const fullName = ref('')

watch([firstName, lastName], ([newFirst, newLast]) => {
  fullName.value = `${newFirst} ${newLast}`.trim()
})
</script>
```

### Example - WatchEffect
```vue
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubleCount = ref(0)

watchEffect(() => {
  doubleCount.value = count.value * 2
  console.log(`Count is now ${count.value}, double is ${doubleCount.value}`)
})
</script>
```

## 4. Ref Pattern

### Description
Using reactive references for primitive values.

### Example - Template Refs
```vue
<template>
  <div>
    <input ref="inputRef" v-model="message" />
    <button @click="focusInput">Focus Input</button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const inputRef = ref(null)
const message = ref('')

const focusInput = async () => {
  await nextTick()
  inputRef.value?.focus()
}
</script>
```

### Example - Component Refs
```vue
<template>
  <div>
    <ChildComponent ref="childRef" />
    <button @click="callChildMethod">Call Child Method</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const childRef = ref(null)

const callChildMethod = () => {
  childRef.value?.someMethod()
}
</script>
```

## 5. Custom Reactive Pattern

### Description
Creating custom reactive systems.

### Example - Custom Store
```vue
<script setup>
import { reactive, computed } from 'vue'

class CounterStore {
  constructor() {
    this.state = reactive({
      count: 0,
      history: []
    })
  }

  get count() {
    return this.state.count
  }

  get history() {
    return this.state.history
  }

  increment() {
    this.state.count++
    this.state.history.push(`Incremented to ${this.state.count}`)
  }

  decrement() {
    this.state.count--
    this.state.history.push(`Decremented to ${this.state.count}`)
  }

  reset() {
    this.state.count = 0
    this.state.history.push('Reset to 0')
  }
}

const store = new CounterStore()
</script>
```

## Best Practices

1. **Use ref() for primitives**: Use `ref()` for primitive values
2. **Use reactive() for objects**: Use `reactive()` for objects
3. **Computed for derived state**: Use `computed()` for derived state
4. **Watch for side effects**: Use `watch()` for side effects
5. **Avoid deep watching**: Avoid deep watching when possible

## Pitfalls to Avoid

1. **Mutating reactive objects directly**: Don't mutate reactive objects directly
2. **Creating reactive inside reactive**: Avoid creating reactive inside reactive
3. **Memory leaks with watchers**: Avoid memory leaks with watchers
4. **Overusing watchEffect**: Don't overuse `watchEffect()`



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

