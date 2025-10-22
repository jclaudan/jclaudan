# ⚡ Vitest - Guide Complet

> **Vitest** est un framework de test ultra-rapide construit sur Vite. Il offre une expérience de développement moderne avec un hot reload instantané, une configuration minimale et une compatibilité Jest.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-vitest)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [🟢 Débutant - Premiers Tests](#-débutant---premiers-tests)
- [🟡 Intermédiaire - Tests Avancés](#-intermédiaire---tests-avancés)
- [🟠 Confirmé - Migration et Optimisation](#-confirmé---migration-et-optimisation)
- [🔴 Senior - Tests Complexes](#-senior---tests-complexes)
- [⚫ Expert - Performance et CI/CD](#-expert---performance-et-cicd)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Vitest

### 🎯 Comparaison Jest vs Vitest

| Aspect | Jest | Vitest | Avantage Vitest |
|--------|------|--------|-----------------|
| **Vitesse** | ~2-3s | ~200ms | 10x plus rapide |
| **Hot Reload** | Non | Oui | Développement instantané |
| **Configuration** | Complexe | Minimale | Zero-config |
| **TypeScript** | Via ts-jest | Natif | Support natif |
| **ESM** | Limité | Complet | Modules modernes |
| **Watch Mode** | Basique | Avancé | Filtrage intelligent |
| **Coverage** | Via Istanbul | Intégré | Plus rapide |
| **Snapshots** | Oui | Oui | Compatible |
| **Mocking** | Jest | Vitest | API similaire |

### 🎯 API Vitest - Hooks de Test

| Hook | Description | Exemple |
|------|-------------|---------|
| **describe** | Groupe de tests | `describe('User Service', () => {})` |
| **it / test** | Test individuel | `it('should create user', () => {})` |
| **beforeAll** | Avant tous les tests | `beforeAll(() => setup())` |
| **afterAll** | Après tous les tests | `afterAll(() => cleanup())` |
| **beforeEach** | Avant chaque test | `beforeEach(() => reset())` |
| **afterEach** | Après chaque test | `afterEach(() => cleanup())` |
| **describe.skip** | Ignorer un groupe | `describe.skip('Legacy', () => {})` |
| **it.skip** | Ignorer un test | `it.skip('broken test', () => {})` |
| **it.only** | Exécuter seulement | `it.only('focus test', () => {})` |

### 🎯 Matchers Vitest

| Matcher | Description | Exemple |
|---------|-------------|---------|
| **toBe()** | Égalité stricte | `expect(2 + 2).toBe(4)` |
| **toEqual()** | Égalité profonde | `expect({a: 1}).toEqual({a: 1})` |
| **toBeTruthy()** | Valeur truthy | `expect(1).toBeTruthy()` |
| **toBeFalsy()** | Valeur falsy | `expect(0).toBeFalsy()` |
| **toBeNull()** | Valeur null | `expect(null).toBeNull()` |
| **toBeUndefined()** | Valeur undefined | `expect(undefined).toBeUndefined()` |
| **toBeDefined()** | Valeur définie | `expect(5).toBeDefined()` |
| **toContain()** | Contient élément | `expect([1,2,3]).toContain(2)` |
| **toMatch()** | Correspond regex | `expect('Hello').toMatch(/Hello/)` |
| **toThrow()** | Lance exception | `expect(() => { throw new Error() }).toThrow()` |

### 🎯 Configuration Vitest

| Option | Description | Valeur par défaut |
|--------|-------------|-------------------|
| **testEnvironment** | Environnement de test | `'node'` |
| **globals** | Variables globales | `false` |
| **environment** | Environnement | `'node'` |
| **setupFiles** | Fichiers de setup | `[]` |
| **include** | Patterns de tests | `['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']` |
| **exclude** | Patterns à exclure | `['**/node_modules/**', '**/dist/**']` |
| **coverage** | Configuration couverture | `{}` |
| **reporter** | Reporters | `['default']` |
| **watch** | Mode watch | `true` |
| **passWithNoTests** | Passer sans tests | `false` |

### 🎯 Commandes CLI Vitest

| Commande | Description | Exemple |
|----------|-------------|---------|
| **vitest** | Lancer les tests | `vitest` |
| **vitest run** | Lancer une fois | `vitest run` |
| **vitest watch** | Mode watch | `vitest watch` |
| **vitest --coverage** | Avec couverture | `vitest --coverage` |
| **vitest --ui** | Interface graphique | `vitest --ui` |
| **vitest --reporter** | Reporter spécifique | `vitest --reporter=verbose` |
| **vitest --testNamePattern** | Filtrer par nom | `vitest --testNamePattern="user"` |
| **vitest --updateSnapshot** | Mettre à jour snapshots | `vitest --updateSnapshot` |

---

## 🚀 Introduction

Vitest est un framework de test moderne conçu pour être ultra-rapide et compatible avec l'écosystème Vite. Il offre une expérience de développement exceptionnelle avec un hot reload instantané.

### Qu'est-ce que Vitest ?
Vitest est un framework de test JavaScript construit sur Vite qui combine la vitesse de Vite avec une API familière inspirée de Jest. Il est spécialement optimisé pour les projets modernes utilisant ES modules et TypeScript.

### Pourquoi choisir Vitest ?
- **⚡ Performance** : 10x plus rapide que Jest
- **🔥 Hot Reload** : Re-exécution instantanée des tests
- **🎯 Zero Config** : Configuration minimale requise
- **📦 ESM Native** : Support natif des modules ES
- **🔧 TypeScript** : Support TypeScript natif
- **🎭 Jest Compatible** : Migration facile depuis Jest
- **🖥️ UI Mode** : Interface graphique pour les tests
- **📊 Coverage** : Couverture de code intégrée

### Quand utiliser Vitest ?
- Projets utilisant Vite
- Applications Vue.js, React, Svelte
- Projets TypeScript modernes
- Développement avec ESM
- Besoin de tests ultra-rapides
- Migration depuis Jest

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Installation avec Vite
npm create vite@latest my-project -- --template vue
cd my-project
npm install

# Installation manuelle
npm install -D vitest @vitest/ui

# Avec TypeScript
npm install -D vitest @vitest/ui typescript
```

### Configuration de base

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Environnement de test
    environment: 'jsdom', // ou 'node' pour Node.js
    
    // Variables globales
    globals: true,
    
    // Setup files
    setupFiles: ['./src/test/setup.ts'],
    
    // Patterns de tests
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    
    // Couverture de code
    coverage: {
      provider: 'v8', // ou 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
      ]
    },
    
    // Reporters
    reporter: ['verbose', 'html'],
    
    // Timeout
    testTimeout: 10000,
    
    // Mode watch
    watch: true
  }
})
```

### Configuration TypeScript

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
```

### Setup file

```typescript
// src/test/setup.ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import * as matchers from '@testing-library/jest-dom/matchers'

// Étendre les matchers
expect.extend(matchers)

// Nettoyer après chaque test
afterEach(() => {
  cleanup()
})
```

---

## 🟢 Débutant - Premiers Tests

### Premier test simple

```javascript
// math.js
export function add(a, b) {
  return a + b
}

export function subtract(a, b) {
  return a - b
}

// math.test.js
import { describe, it, expect } from 'vitest'
import { add, subtract } from './math'

describe('Math functions', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
  })

  it('subtracts 5 - 3 to equal 2', () => {
    expect(subtract(5, 3)).toBe(2)
  })
})
```

### Tests avec describe et it

```javascript
// user-service.js
export class UserService {
  constructor() {
    this.users = []
  }

  addUser(user) {
    this.users.push(user)
    return user
  }

  getUser(id) {
    return this.users.find(user => user.id === id)
  }

  getAllUsers() {
    return this.users
  }
}

// user-service.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { UserService } from './user-service'

describe('UserService', () => {
  let userService

  beforeEach(() => {
    userService = new UserService()
  })

  it('should add a user', () => {
    const user = { id: 1, name: 'John Doe' }
    const addedUser = userService.addUser(user)
    
    expect(addedUser).toEqual(user)
    expect(userService.getAllUsers()).toContain(user)
  })

  it('should get a user by id', () => {
    const user = { id: 1, name: 'John Doe' }
    userService.addUser(user)
    
    const foundUser = userService.getUser(1)
    expect(foundUser).toEqual(user)
  })

  it('should return undefined for non-existent user', () => {
    const foundUser = userService.getUser(999)
    expect(foundUser).toBeUndefined()
  })
})
```

### Tests asynchrones

```javascript
// api-service.js
export class ApiService {
  async fetchUser(id) {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      throw new Error('User not found')
    }
    return response.json()
  }

  async createUser(userData) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    return response.json()
  }
}

// api-service.test.js
import { describe, it, expect, vi } from 'vitest'
import { ApiService } from './api-service'

// Mock fetch
global.fetch = vi.fn()

describe('ApiService', () => {
  let apiService

  beforeEach(() => {
    apiService = new ApiService()
    vi.clearAllMocks()
  })

  it('should fetch user successfully', async () => {
    const mockUser = { id: 1, name: 'John Doe' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    })

    const user = await apiService.fetchUser(1)
    
    expect(fetch).toHaveBeenCalledWith('/api/users/1')
    expect(user).toEqual(mockUser)
  })

  it('should throw error when user not found', async () => {
    fetch.mockResolvedValueOnce({
      ok: false
    })

    await expect(apiService.fetchUser(999)).rejects.toThrow('User not found')
  })

  it('should create user', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' }
    const mockResponse = { id: 2, ...userData }
    
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse
    })

    const result = await apiService.createUser(userData)
    
    expect(fetch).toHaveBeenCalledWith('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    expect(result).toEqual(mockResponse)
  })
})
```

---

## 🟡 Intermédiaire - Tests Avancés

### Tests de composants Vue.js

```vue
<!-- UserCard.vue -->
<template>
  <div class="user-card" data-testid="user-card">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>Age: {{ user.age }}</p>
    <div class="actions">
      <button @click="$emit('edit', user.id)">Edit</button>
      <button @click="$emit('delete', user.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>
```

```javascript
// UserCard.test.js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserCard from './UserCard.vue'

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  }

  it('renders user information', () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })

    expect(wrapper.find('[data-testid="user-card"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
    expect(wrapper.text()).toContain('30')
  })

  it('emits edit event when edit button is clicked', async () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })

    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')[0]).toEqual([1])
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser }
    })

    const deleteButton = wrapper.findAll('button')[1]
    await deleteButton.trigger('click')
    
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')[0]).toEqual([1])
  })
})
```

### Tests avec mocks avancés

```javascript
// user-repository.js
import { apiClient } from './api-client'

export class UserRepository {
  async findById(id) {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  }

  async create(userData) {
    const response = await apiClient.post('/users', userData)
    return response.data
  }

  async update(id, userData) {
    const response = await apiClient.put(`/users/${id}`, userData)
    return response.data
  }

  async delete(id) {
    await apiClient.delete(`/users/${id}`)
  }
}

// user-repository.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserRepository } from './user-repository'
import { apiClient } from './api-client'

// Mock du module api-client
vi.mock('./api-client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

describe('UserRepository', () => {
  let userRepository

  beforeEach(() => {
    userRepository = new UserRepository()
    vi.clearAllMocks()
  })

  it('should find user by id', async () => {
    const mockUser = { id: 1, name: 'John Doe' }
    apiClient.get.mockResolvedValue({ data: mockUser })

    const user = await userRepository.findById(1)

    expect(apiClient.get).toHaveBeenCalledWith('/users/1')
    expect(user).toEqual(mockUser)
  })

  it('should create user', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' }
    const mockResponse = { id: 2, ...userData }
    apiClient.post.mockResolvedValue({ data: mockResponse })

    const user = await userRepository.create(userData)

    expect(apiClient.post).toHaveBeenCalledWith('/users', userData)
    expect(user).toEqual(mockResponse)
  })

  it('should update user', async () => {
    const userData = { name: 'John Updated' }
    const mockResponse = { id: 1, ...userData }
    apiClient.put.mockResolvedValue({ data: mockResponse })

    const user = await userRepository.update(1, userData)

    expect(apiClient.put).toHaveBeenCalledWith('/users/1', userData)
    expect(user).toEqual(mockResponse)
  })

  it('should delete user', async () => {
    apiClient.delete.mockResolvedValue({})

    await userRepository.delete(1)

    expect(apiClient.delete).toHaveBeenCalledWith('/users/1')
  })
})
```

### Tests de snapshots

```javascript
// component-generator.js
export function generateUserCard(user) {
  return `
    <div class="user-card" data-user-id="${user.id}">
      <h2 class="user-name">${user.name}</h2>
      <p class="user-email">${user.email}</p>
      <p class="user-age">Age: ${user.age}</p>
      <div class="user-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    </div>
  `
}

// component-generator.test.js
import { describe, it, expect } from 'vitest'
import { generateUserCard } from './component-generator'

describe('generateUserCard', () => {
  it('generates correct HTML for user card', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    }

    const html = generateUserCard(user)
    expect(html).toMatchSnapshot()
  })

  it('handles user with missing age', () => {
    const user = {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com'
    }

    const html = generateUserCard(user)
    expect(html).toMatchSnapshot()
  })
})
```

---

## 🟠 Confirmé - Migration et Optimisation

### Migration depuis Jest

```javascript
// jest.config.js (ancien)
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ]
}

// vitest.config.js (nouveau)
import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
```

### Migration des tests

```javascript
// Avant (Jest)
const { add, subtract } = require('./math')

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
  })
})

// Après (Vitest)
import { describe, it, expect } from 'vitest'
import { add, subtract } from './math'

describe('Math functions', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
  })
})
```

### Configuration avancée

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Environnement
    environment: 'jsdom',
    globals: true,
    
    // Setup
    setupFiles: ['./src/test/setup.ts'],
    
    // Patterns
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
    
    // Couverture
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    
    // Reporters
    reporter: ['verbose', 'html', 'json'],
    
    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000,
    
    // Mode watch
    watch: true,
    
    // Pool options
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@tests': resolve(__dirname, './tests')
    }
  }
})
```

---

## 🔴 Senior - Tests Complexes

### Tests de performance

```javascript
// performance.test.js
import { describe, it, expect } from 'vitest'
import { performance } from 'perf_hooks'

describe('Performance Tests', () => {
  it('should process large dataset efficiently', async () => {
    const startTime = performance.now()
    
    // Simulation d'un traitement lourd
    const largeDataset = Array.from({ length: 100000 }, (_, i) => ({
      id: i,
      value: Math.random(),
      processed: false
    }))

    const processedData = largeDataset
      .filter(item => item.value > 0.5)
      .map(item => ({ ...item, processed: true }))

    const endTime = performance.now()
    const executionTime = endTime - startTime

    expect(processedData.length).toBeGreaterThan(0)
    expect(executionTime).toBeLessThan(100) // Moins de 100ms
  })

  it('should handle concurrent operations', async () => {
    const concurrentOperations = 100
    const operations = Array.from({ length: concurrentOperations }, (_, i) => 
      simulateAsyncOperation(i)
    )

    const startTime = performance.now()
    const results = await Promise.all(operations)
    const endTime = performance.now()

    expect(results).toHaveLength(concurrentOperations)
    expect(endTime - startTime).toBeLessThan(1000) // Moins de 1 seconde
  })
})

async function simulateAsyncOperation(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, completed: true }), Math.random() * 10)
  })
}
```

### Tests de régression

```javascript
// regression.test.js
import { describe, it, expect } from 'vitest'

describe('Regression Tests', () => {
  it('should maintain API compatibility', () => {
    const apiResponse = {
      data: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' }
        ]
      },
      meta: {
        total: 1,
        page: 1,
        limit: 10
      }
    }

    // Vérifier la structure de l'API
    expect(apiResponse).toHaveProperty('data')
    expect(apiResponse).toHaveProperty('meta')
    expect(apiResponse.data).toHaveProperty('users')
    expect(apiResponse.meta).toHaveProperty('total')
    expect(apiResponse.meta).toHaveProperty('page')
    expect(apiResponse.meta).toHaveProperty('limit')
  })

  it('should handle edge cases correctly', () => {
    const testCases = [
      null,
      undefined,
      '',
      0,
      false,
      [],
      {}
    ]

    testCases.forEach(testCase => {
      expect(() => processInput(testCase)).not.toThrow()
    })
  })
})

function processInput(input) {
  if (input === null || input === undefined) {
    return 'default'
  }
  return input
}
```

### Tests d'intégration

```javascript
// integration.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../src/App.vue'
import UserStore from '../src/stores/user'

describe('Integration Tests', () => {
  let app
  let pinia
  let router

  beforeAll(() => {
    // Setup de l'application
    pinia = createPinia()
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: () => import('../src/views/Home.vue') },
        { path: '/users', component: () => import('../src/views/Users.vue') }
      ]
    })

    app = createApp(App)
    app.use(pinia)
    app.use(router)
  })

  afterAll(() => {
    app.unmount()
  })

  it('should navigate between routes', async () => {
    await router.push('/users')
    expect(router.currentRoute.value.path).toBe('/users')
  })

  it('should manage user state correctly', () => {
    const userStore = UserStore()
    
    userStore.addUser({ id: 1, name: 'John Doe' })
    expect(userStore.users).toHaveLength(1)
    
    userStore.removeUser(1)
    expect(userStore.users).toHaveLength(0)
  })
})
```

---

## ⚫ Expert - Performance et CI/CD

### Configuration optimisée

```javascript
// vitest.config.expert.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Environnement
    environment: 'jsdom',
    globals: true,
    
    // Performance
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4,
        minThreads: 1
      }
    },
    
    // Cache
    cache: {
      dir: './node_modules/.vitest'
    },
    
    // Setup
    setupFiles: ['./src/test/setup.ts'],
    
    // Patterns optimisés
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
    ],
    
    // Couverture optimisée
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        },
        './src/core/': {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95
        }
      }
    },
    
    // Reporters
    reporter: ['verbose', 'html', 'json', 'junit'],
    
    // Timeouts
    testTimeout: 30000,
    hookTimeout: 30000,
    
    // Mode watch optimisé
    watch: true,
    
    // Séquenceur personnalisé
    sequence: {
      shuffle: true,
      concurrent: true
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@tests': resolve(__dirname, './tests')
    }
  }
})
```

### Tests de charge

```javascript
// load-testing.test.js
import { describe, it, expect } from 'vitest'

describe('Load Testing', () => {
  it('should handle high concurrent load', async () => {
    const concurrentUsers = 1000
    const requestsPerUser = 10
    
    const startTime = performance.now()
    
    const userPromises = Array.from({ length: concurrentUsers }, (_, userId) => {
      return Promise.all(
        Array.from({ length: requestsPerUser }, (_, requestId) => 
          simulateUserRequest(userId, requestId)
        )
      )
    })
    
    const results = await Promise.all(userPromises)
    const endTime = performance.now()
    
    const totalRequests = concurrentUsers * requestsPerUser
    const totalTime = endTime - startTime
    const requestsPerSecond = totalRequests / (totalTime / 1000)
    
    expect(requestsPerSecond).toBeGreaterThan(100) // Au moins 100 req/s
  })

  it('should maintain performance under memory pressure', async () => {
    const memoryBefore = process.memoryUsage()
    
    // Simulation de traitement intensif
    const largeData = Array.from({ length: 1000000 }, (_, i) => ({
      id: i,
      data: new Array(100).fill(Math.random())
    }))
    
    const processedData = largeData
      .filter(item => item.id % 2 === 0)
      .map(item => ({ ...item, processed: true }))
    
    const memoryAfter = process.memoryUsage()
    const memoryIncrease = memoryAfter.heapUsed - memoryBefore.heapUsed
    
    expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024) // Moins de 100MB
    expect(processedData.length).toBe(500000)
  })
})

async function simulateUserRequest(userId, requestId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ userId, requestId, success: true })
    }, Math.random() * 10)
  })
}
```

### Configuration CI/CD

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
        fail_ci_if_error: true
```

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:ci": "vitest run --coverage --reporter=verbose --reporter=junit --outputFile=test-results.xml",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## 📚 Ressources

### Documentation officielle
- [Vitest Documentation](https://vitest.dev/)
- [Vitest API Reference](https://vitest.dev/api/)
- [Vitest Configuration](https://vitest.dev/config/)

### Outils et extensions
- [Vitest UI](https://vitest.dev/guide/ui.html)
- [Vitest Coverage](https://vitest.dev/guide/coverage.html)
- [Testing Library Vue](https://testing-library.com/docs/vue-testing-library/intro/)

### Migration et comparaisons
- [Jest to Vitest Migration](https://vitest.dev/guide/migration.html)
- [Vitest vs Jest](https://vitest.dev/guide/comparisons.html)
- [Vite Integration](https://vitest.dev/guide/integrations.html)

### Patterns et bonnes pratiques
- [Vitest Best Practices](https://vitest.dev/guide/best-practices.html)
- [Testing Patterns](https://vitest.dev/guide/testing-patterns.html)
- [Performance Tips](https://vitest.dev/guide/performance.html)

---

*Dernière mise à jour : Janvier 2024*
