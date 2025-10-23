# Patterns de Composants Vue 3

## 1. Composition Pattern

### Description
Assembler des composants plus petits pour créer des composants complexes.

### Exemple
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
Séparer la logique métier (Container) de l'affichage (Presentational).

### Exemple - Container
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
  // Logique métier
  console.log('User selected:', user)
}

onMounted(async () => {
  loading.value = true
  users.value = await fetchUsers()
  loading.value = false
})
</script>
```

### Exemple - Presentational
```vue
<template>
  <div class="user-list">
    <div v-if="loading">Chargement...</div>
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
Composants qui fournissent de la logique sans template.

### Exemple
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
Utilisation avancée des slots pour la composition.

### Exemple - Named Slots
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

### Exemple - Scoped Slots
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

## Bonnes Pratiques

1. **Composition over Inheritance** : Préférer la composition à l'héritage
2. **Single Responsibility** : Un composant, une responsabilité
3. **Props Down, Events Up** : Props vers le bas, événements vers le haut
4. **Reusability** : Créer des composants réutilisables
5. **Naming Convention** : Utiliser des noms explicites

## Pièges à Éviter

1. **Props Drilling** : Éviter de passer trop de props
2. **Tight Coupling** : Éviter le couplage fort entre composants
3. **Over-engineering** : Ne pas sur-complexifier
4. **Missing Validation** : Toujours valider les props



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

