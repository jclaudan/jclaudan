# Vue Router - Routing Vue 3

## Installation

```bash
npm install vue-router@4
```

## Configuration de base

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

## Navigation

```vue
<template>
  <nav>
    <!-- Navigation déclarative -->
    <router-link to="/" exact-active-class="active">Home</router-link>
    <router-link to="/about" active-class="active">About</router-link>
    
    <!-- Navigation programmatique -->
    <button @click="goToAbout">Go to About</button>
    <button @click="goBack">Go Back</button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAbout = () => {
  router.push('/about')
  // ou
  router.push({ name: 'About' })
}

const goBack = () => {
  router.go(-1)
  // ou
  router.back()
}

// Navigation avec remplacement
const replaceRoute = () => {
  router.replace('/about')
}
</script>
```

## Routes dynamiques

```typescript
// router/index.ts
const routes = [
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
    props: true
  },
  {
    path: '/user/:id/edit',
    name: 'EditUser',
    component: () => import('@/views/EditUser.vue'),
    props: true
  }
]
```

```vue
<!-- User.vue -->
<template>
  <div>
    <h1>User {{ $route.params.id }}</h1>
    <!-- Avec props -->
    <h2>User ID: {{ id }}</h2>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

// Accès aux paramètres
console.log(route.params.id)

// Avec props
defineProps<{
  id: string
}>()
</script>
```

## Routes imbriquées

```typescript
// router/index.ts
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('@/views/DashboardHome.vue')
      },
      {
        path: 'profile',
        name: 'DashboardProfile',
        component: () => import('@/views/DashboardProfile.vue')
      },
      {
        path: 'settings',
        name: 'DashboardSettings',
        component: () => import('@/views/DashboardSettings.vue')
      }
    ]
  }
]
```

```vue
<!-- DashboardLayout.vue -->
<template>
  <div class="dashboard">
    <aside class="sidebar">
      <router-link to="/dashboard" exact-active-class="active">Home</router-link>
      <router-link to="/dashboard/profile" active-class="active">Profile</router-link>
      <router-link to="/dashboard/settings" active-class="active">Settings</router-link>
    </aside>
    
    <main class="content">
      <router-view />
    </main>
  </div>
</template>
```

## Guards de navigation

### Guards globaux

```typescript
// router/index.ts
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // Analytics
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: to.path
  })
})
```

### Guards par route

```typescript
// router/index.ts
const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    beforeEnter: (to, from, next) => {
      const user = getUser()
      if (user?.role === 'admin') {
        next()
      } else {
        next('/unauthorized')
      }
    }
  }
]
```

### Guards dans les composants

```vue
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

// Avant de quitter la route
onBeforeRouteLeave((to, from, next) => {
  const answer = window.confirm(
    'Do you really want to leave? You have unsaved changes!'
  )
  if (answer) {
    next()
  } else {
    next(false)
  }
})

// Avant la mise à jour de la route
onBeforeRouteUpdate((to, from, next) => {
  if (to.params.id !== from.params.id) {
    // Charger de nouvelles données
    loadUserData(to.params.id)
  }
  next()
})
</script>
```

## Query parameters

```vue
<template>
  <div>
    <!-- Navigation avec query -->
    <router-link :to="{ name: 'Search', query: { q: 'vue', page: 1 } }">
      Search Vue
    </router-link>
    
    <!-- Accès aux query params -->
    <p>Search: {{ $route.query.q }}</p>
    <p>Page: {{ $route.query.page }}</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Accès aux query parameters
console.log(route.query.q)
console.log(route.query.page)

// Navigation avec query
const search = (query) => {
  router.push({
    name: 'Search',
    query: { q: query, page: 1 }
  })
}

// Mise à jour des query sans navigation
const updatePage = (page) => {
  router.push({
    query: { ...route.query, page }
  })
}
</script>
```

## Lazy loading

```typescript
// router/index.ts
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "dashboard" */ 
      '@/views/Dashboard.vue'
    )
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(
      /* webpackChunkName: "admin" */ 
      '@/views/Admin.vue'
    )
  }
]
```

## Transitions

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
```

## Meta fields

```typescript
// router/index.ts
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home Page',
      requiresAuth: false,
      transition: 'fade'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      role: 'user',
      transition: 'slide'
    }
  }
]
```

```typescript
// router/index.ts - Update document title
router.afterEach((to, from) => {
  document.title = to.meta.title || 'My App'
})
```

## Patterns avancés

### Route avec données pré-chargées

```typescript
// router/index.ts
const routes = [
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
    async beforeEnter(to, from, next) {
      try {
        const user = await fetchUser(to.params.id)
        to.meta.user = user
        next()
      } catch (error) {
        next('/error')
      }
    }
  }
]
```

### Router avec état

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Utilisation du store dans les guards
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

### Navigation avec state

```typescript
// Composant
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateWithState = () => {
  router.push({
    name: 'User',
    params: { id: '123' },
    state: { fromDashboard: true }
  })
}
```

### Route avec redirect

```typescript
// router/index.ts
const routes = [
  {
    path: '/old-path',
    redirect: '/new-path'
  },
  {
    path: '/user/:id',
    redirect: to => {
      return { name: 'User', params: { id: to.params.id } }
    }
  }
]
```

## Tests

```typescript
// tests/router.test.ts
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from '@/App.vue'

describe('Router', () => {
  it('should navigate to about page', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } }
      ]
    })
    
    const app = createApp(App)
    app.use(router)
    
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    await router.push('/about')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('About')
  })
})
```

## Bonnes pratiques

1. **Lazy loading** : Utiliser pour les routes non critiques
2. **Guards** : Pour l'authentification et autorisation
3. **Meta fields** : Pour les métadonnées de route
4. **Transitions** : Pour une meilleure UX
5. **Noms de routes** : Utiliser des noms plutôt que des paths
6. **Props** : Utiliser props pour les paramètres
7. **Tests** : Tester la navigation

## Pièges à éviter

1. **Guards infinis** : Attention aux boucles infinies
2. **État partagé** : Éviter l'état dans les routes
3. **Navigation conditionnelle** : Vérifier les conditions avant navigation
4. **Memory leaks** : Nettoyer les listeners dans les guards
