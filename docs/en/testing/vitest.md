# ⚡ Vitest - Complete Guide

> **Vitest** is an ultra-fast testing framework built on Vite. It offers a modern development experience with instant hot reload, minimal configuration, and Jest compatibility.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-vitest-reference-tables)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation and Configuration](#️-installation-and-configuration)
- [🟢 First Tests](#-beginner---first-tests)
- [🟡 Advanced Tests](#-intermediate---advanced-tests)
- [🟠 Migration and Optimization](#-confirmed---migration-and-optimization)
- [🔴 Complex Tests](#-senior---complex-tests)
- [⚫ Performance and CI/CD](#-expert---performance-and-cicd)
- [📚 Resources](#-resources)

---

## 🎯 Complete Vitest Reference Tables

### 🎯 Jest vs Vitest Comparison

| Aspect | Jest | Vitest | Vitest Advantage |
|--------|------|--------|------------------|
| **Speed** | ~2-3s | ~200ms | 10x faster |
| **Hot Reload** | No | Yes | Instant development |
| **Configuration** | Complex | Minimal | Zero-config |
| **TypeScript** | Via ts-jest | Native | Native support |
| **ESM** | Limited | Complete | Modern modules |
| **Watch Mode** | Basic | Advanced | Smart filtering |
| **Coverage** | Via Istanbul | Built-in | Faster |
| **Snapshots** | Yes | Yes | Compatible |
| **Mocking** | Jest | Vitest | Similar API |

### 🎯 Vitest API - Test Hooks

| Hook | Description | Example |
|------|-------------|---------|
| **describe** | Test group | `describe('User Service', () => {})` |
| **it / test** | Individual test | `it('should create user', () => {})` |
| **beforeAll** | Before all tests | `beforeAll(() => setup())` |
| **afterAll** | After all tests | `afterAll(() => cleanup())` |
| **beforeEach** | Before each test | `beforeEach(() => reset())` |
| **afterEach** | After each test | `afterEach(() => cleanup())` |
| **describe.skip** | Skip group | `describe.skip('Legacy', () => {})` |
| **it.skip** | Skip test | `it.skip('broken test', () => {})` |
| **it.only** | Run only | `it.only('focus test', () => {})` |

### 🎯 Vitest Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| **toBe()** | Strict equality | `expect(2 + 2).toBe(4)` |
| **toEqual()** | Deep equality | `expect({a: 1}).toEqual({a: 1})` |
| **toBeTruthy()** | Truthy value | `expect(1).toBeTruthy()` |
| **toBeFalsy()** | Falsy value | `expect(0).toBeFalsy()` |
| **toBeNull()** | Null value | `expect(null).toBeNull()` |
| **toBeUndefined()** | Undefined value | `expect(undefined).toBeUndefined()` |
| **toBeDefined()** | Defined value | `expect(5).toBeDefined()` |
| **toContain()** | Contains element | `expect([1,2,3]).toContain(2)` |
| **toMatch()** | Match regex | `expect('Hello').toMatch(/Hello/)` |
| **toThrow()** | Throw exception | `expect(() => { throw new Error() }).toThrow()` |

### 🎯 Vitest Configuration

| Option | Description | Default Value |
|--------|-------------|---------------|
| **testEnvironment** | Test environment | `'node'` |
| **globals** | Global variables | `false` |
| **environment** | Environment | `'node'` |
| **setupFiles** | Setup files | `[]` |
| **include** | Test patterns | `['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']` |
| **exclude** | Exclude patterns | `['**/node_modules/**', '**/dist/**']` |
| **coverage** | Coverage config | `{}` |
| **reporter** | Reporters | `['default']` |
| **watch** | Watch mode | `true` |
| **passWithNoTests** | Pass with no tests | `false` |

### 🎯 Vitest CLI Commands

| Command | Description | Example |
|---------|-------------|---------|
| **vitest** | Run tests | `vitest` |
| **vitest run** | Run once | `vitest run` |
| **vitest watch** | Watch mode | `vitest watch` |
| **vitest --coverage** | With coverage | `vitest --coverage` |
| **vitest --ui** | GUI interface | `vitest --ui` |
| **vitest --reporter** | Specific reporter | `vitest --reporter=verbose` |
| **vitest --testNamePattern** | Filter by name | `vitest --testNamePattern="user"` |
| **vitest --updateSnapshot** | Update snapshots | `vitest --updateSnapshot` |

---

## 🚀 Introduction

Vitest is a modern testing framework designed to be ultra-fast and compatible with the Vite ecosystem. It offers an exceptional development experience with instant hot reload.

### What is Vitest?
Vitest is a JavaScript testing framework built on Vite that combines Vite's speed with a familiar API inspired by Jest. It's specially optimized for modern projects using ES modules and TypeScript.

### Why choose Vitest?
- **⚡ Performance**: 10x faster than Jest
- **🔥 Hot Reload**: Instant test re-execution
- **🎯 Zero Config**: Minimal configuration required
- **📦 ESM Native**: Native ES modules support
- **🔧 TypeScript**: Native TypeScript support
- **🎭 Jest Compatible**: Easy migration from Jest
- **🖥️ UI Mode**: GUI interface for tests
- **📊 Coverage**: Built-in code coverage

### When to use Vitest?
- Projects using Vite
- Vue.js, React, Svelte applications
- Modern TypeScript projects
- Development with ESM
- Need for ultra-fast tests
- Migration from Jest

---

## ⚙️ Installation and Configuration

### Installation

```bash
# Installation with Vite
npm create vite@latest my-project -- --template vue
cd my-project
npm install

# Manual installation
npm install -D vitest @vitest/ui

# With TypeScript
npm install -D vitest @vitest/ui typescript
```

### Basic Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Test environment
    environment: 'jsdom', // or 'node' for Node.js
    
    // Global variables
    globals: true,
    
    // Setup files
    setupFiles: ['./src/test/setup.ts'],
    
    // Test patterns
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    
    // Code coverage
    coverage: {
      provider: 'v8', // or 'istanbul'
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
    
    // Watch mode
    watch: true
  }
})
```

### TypeScript Configuration

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

### Setup File

```typescript
// src/test/setup.ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/vue'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend matchers
expect.extend(matchers)

// Cleanup after each test
afterEach(() => {
  cleanup()
})
```

---

## 🟢 First Tests

### Simple First Test

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

### Tests with describe and it

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

### Asynchronous Tests

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

## 🟡 Advanced Tests

### Vue.js Component Tests

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

### Advanced Mocking Tests

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

// Mock api-client module
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

### Snapshot Tests

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

## 🟠 Migration and Optimization

### Migration from Jest

```javascript
// jest.config.js (old)
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

// vitest.config.js (new)
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

### Test Migration

```javascript
// Before (Jest)
const { add, subtract } = require('./math')

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
  })
})

// After (Vitest)
import { describe, it, expect } from 'vitest'
import { add, subtract } from './math'

describe('Math functions', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3)
  })
})
```

### Advanced Configuration

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Environment
    environment: 'jsdom',
    globals: true,
    
    // Setup
    setupFiles: ['./src/test/setup.ts'],
    
    // Patterns
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
    
    // Coverage
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
    
    // Watch mode
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

## 🔴 Complex Tests

### Performance Tests

```javascript
// performance.test.js
import { describe, it, expect } from 'vitest'
import { performance } from 'perf_hooks'

describe('Performance Tests', () => {
  it('should process large dataset efficiently', async () => {
    const startTime = performance.now()
    
    // Simulation of heavy processing
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
    expect(executionTime).toBeLessThan(100) // Less than 100ms
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
    expect(endTime - startTime).toBeLessThan(1000) // Less than 1 second
  })
})

async function simulateAsyncOperation(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, completed: true }), Math.random() * 10)
  })
}
```

### Regression Tests

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

    // Check API structure
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

### Integration Tests

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
    // Application setup
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

## ⚫ Performance and CI/CD

### Optimized Configuration

```javascript
// vitest.config.expert.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    // Environment
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
    
    // Optimized patterns
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
    ],
    
    // Optimized coverage
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
    
    // Optimized watch mode
    watch: true,
    
    // Custom sequencer
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

### Load Testing

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
    
    expect(requestsPerSecond).toBeGreaterThan(100) // At least 100 req/s
  })

  it('should maintain performance under memory pressure', async () => {
    const memoryBefore = process.memoryUsage()
    
    // Simulation of intensive processing
    const largeData = Array.from({ length: 1000000 }, (_, i) => ({
      id: i,
      data: new Array(100).fill(Math.random())
    }))
    
    const processedData = largeData
      .filter(item => item.id % 2 === 0)
      .map(item => ({ ...item, processed: true }))
    
    const memoryAfter = process.memoryUsage()
    const memoryIncrease = memoryAfter.heapUsed - memoryBefore.heapUsed
    
    expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024) // Less than 100MB
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

### CI/CD Configuration

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

## 📚 Resources

### Official Documentation
- [Vitest Documentation](https://vitest.dev/)
- [Vitest API Reference](https://vitest.dev/api/)
- [Vitest Configuration](https://vitest.dev/config/)

### Tools and Extensions
- [Vitest UI](https://vitest.dev/guide/ui.html)
- [Vitest Coverage](https://vitest.dev/guide/coverage.html)
- [Testing Library Vue](https://testing-library.com/docs/vue-testing-library/intro/)

### Migration and Comparisons
- [Jest to Vitest Migration](https://vitest.dev/guide/migration.html)
- [Vitest vs Jest](https://vitest.dev/guide/comparisons.html)
- [Vite Integration](https://vitest.dev/guide/integrations.html)

### Patterns and Best Practices
- [Vitest Best Practices](https://vitest.dev/guide/best-practices.html)
- [Testing Patterns](https://vitest.dev/guide/testing-patterns.html)
- [Performance Tips](https://vitest.dev/guide/performance.html)

---

*Last updated: January 2024*
