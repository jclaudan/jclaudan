# Vue 3 Component Patterns

## 1. Composition Pattern

### Description
Assemble smaller components to create complex components.

### Example
```vue
<template>
  <div class="user-profile">
    <UserAvatar :user="user" />
    <UserInfo :user="user" />
    <UserActions :user="user" @edit="handleEdit" />
  </div>
</template>

<script setup>
import UserAvatar from './UserAvatar.vue'
import UserInfo from './UserInfo.vue'
import UserActions from './UserActions.vue'

const props = defineProps(['user'])
const emit = defineEmits(['edit'])

const handleEdit = () => {
  emit('edit', props.user)
}
</script>
```

## 2. Container/Presentational Pattern

### Description
Separate business logic (Container) from display (Presentational).

### Example - Container
```vue
<template>
  <UserListPresentation 
    :users="users"
    :loading="loading"
    @select="selectUser"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserListPresentation from './UserListPresentation.vue'

const users = ref([])
const loading = ref(false)

const selectUser = (user) => {
  // Business logic
  console.log('User selected:', user)
}

onMounted(async () => {
  loading.value = true
  users.value = await fetchUsers()
  loading.value = false
})
</script>
```

### Example - Presentational
```vue
<template>
  <div class="user-list">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div 
        v-for="user in users" 
        :key="user.id"
        @click="$emit('select', user)"
      >
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['users', 'loading'])
defineEmits(['select'])
</script>
```

## 3. Renderless Components

### Description
Components that provide logic without template.

### Example
```vue
<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['items', 'searchTerm'])
const emit = defineEmits(['filtered'])

const filteredItems = ref([])

watch(
  () => [props.items, props.searchTerm],
  () => {
    filteredItems.value = props.items.filter(item =>
      item.name.toLowerCase().includes(props.searchTerm.toLowerCase())
    )
    emit('filtered', filteredItems.value)
  },
  { immediate: true }
)
</script>

<template>
  <slot :filtered-items="filteredItems" />
</template>
```

## 4. Slot Patterns

### Description
Advanced use of slots for composition.

### Example - Named Slots
```vue
<template>
  <div class="card">
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
```

### Example - Scoped Slots
```vue
<template>
  <div class="data-table">
    <div v-for="item in items" :key="item.id">
      <slot name="row" :item="item" :index="index" />
    </div>
  </div>
</template>

<script setup>
defineProps(['items'])
</script>
```

## Best Practices

1. **Composition over Inheritance**: Prefer composition over inheritance
2. **Single Responsibility**: One component, one responsibility
3. **Props Down, Events Up**: Props down, events up
4. **Reusability**: Create reusable components
5. **Naming Convention**: Use explicit names

## Pitfalls to Avoid

1. **Props Drilling**: Avoid passing too many props
2. **Tight Coupling**: Avoid strong coupling between components
3. **Over-engineering**: Don't over-complicate
4. **Missing Validation**: Always validate props
