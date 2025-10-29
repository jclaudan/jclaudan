# 🧪 Stratégie de Tests : Qualité et Fiabilité

## 📋 Table des matières
- [Introduction](#introduction)
- [Pyramide des tests](#pyramide-des-tests)
- [Types de tests](#types-de-tests)
- [Outils de test](#outils-de-test)
- [Configuration et setup](#configuration-et-setup)
- [Exemples concrets](#exemples-concrets)
- [Templates de configuration](#templates-de-configuration)
- [Checklist de validation](#checklist-de-validation)
- [Ressources](#ressources)

## 🎯 Introduction

La stratégie de tests définit l'approche, les outils et les bonnes pratiques pour assurer la qualité et la fiabilité d'une application à travers différents types de tests.

### 🎯 Objectifs

- **Définir** une stratégie de tests complète
- **Implémenter** différents types de tests
- **Configurer** les outils de test appropriés
- **Automatiser** l'exécution des tests
- **Maintenir** la qualité du code

---

## 🔺 Pyramide des tests

### 📝 Principe

La pyramide des tests illustre la répartition idéale des différents types de tests dans un projet.

![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/testing-strategy-0-fr-methodology-04-implementation-testing-strategy.png)

### 📊 Répartition recommandée

| Type de test | Pourcentage | Nombre | Vitesse | Maintenance |
|--------------|-------------|--------|---------|-------------|
| **Tests unitaires** | 70% | Nombreux | Rapide | Facile |
| **Tests d'intégration** | 20% | Modéré | Modérée | Modérée |
| **Tests E2E** | 10% | Peu | Lent | Difficile |

---

## 🔬 Types de tests

### 📝 Tests unitaires

#### Principe

Les tests unitaires vérifient le comportement d'une unité de code isolée (fonction, méthode, classe).

#### Caractéristiques

- **Isolation** : Test d'une seule fonctionnalité
- **Rapidité** : Exécution en millisecondes
- **Simplicité** : Faciles à écrire et maintenir
- **Fiabilité** : Résultats prévisibles

#### Exemples

**Tests unitaires JavaScript/TypeScript**
```typescript
// utils/calculator.ts
export class Calculator {
  add(a: number, b: number): number {
    return a + b
  }

  subtract(a: number, b: number): number {
    return a - b
  }

  multiply(a: number, b: number): number {
    return a * b
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed')
    }
    return a / b
  }
}

// utils/calculator.test.ts
import { Calculator } from './calculator'

describe('Calculator', () => {
  let calculator: Calculator

  beforeEach(() => {
    calculator = new Calculator()
  })

  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      const result = calculator.add(2, 3)
      expect(result).toBe(5)
    })

    it('should add negative numbers correctly', () => {
      const result = calculator.add(-2, -3)
      expect(result).toBe(-5)
    })

    it('should add positive and negative numbers correctly', () => {
      const result = calculator.add(2, -3)
      expect(result).toBe(-1)
    })
  })

  describe('subtract', () => {
    it('should subtract two positive numbers correctly', () => {
      const result = calculator.subtract(5, 3)
      expect(result).toBe(2)
    })

    it('should subtract negative numbers correctly', () => {
      const result = calculator.subtract(-2, -3)
      expect(result).toBe(1)
    })
  })

  describe('multiply', () => {
    it('should multiply two positive numbers correctly', () => {
      const result = calculator.multiply(2, 3)
      expect(result).toBe(6)
    })

    it('should multiply by zero correctly', () => {
      const result = calculator.multiply(5, 0)
      expect(result).toBe(0)
    })
  })

  describe('divide', () => {
    it('should divide two positive numbers correctly', () => {
      const result = calculator.divide(6, 2)
      expect(result).toBe(3)
    })

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed')
    })

    it('should handle decimal results correctly', () => {
      const result = calculator.divide(5, 2)
      expect(result).toBe(2.5)
    })
  })
})
```

**Tests unitaires Vue.js**
```vue
<!-- components/UserCard.vue -->
<template>
  <div class="user-card" :class="{ active: isActive }">
    <img :src="user.avatar" :alt="user.name" class="user-card__avatar" />
    <div class="user-card__info">
      <h3 class="user-card__name">{{ user.name }}</h3>
      <p class="user-card__email">{{ user.email }}</p>
    </div>
    <div class="user-card__actions">
      <button @click="$emit('edit', user)" class="btn btn--primary">
        Modifier
      </button>
      <button @click="$emit('delete', user)" class="btn btn--danger">
        Supprimer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  user: User
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
})

defineEmits<{
  edit: [user: User]
  delete: [user: User]
}>()
</script>
```

```typescript
// components/UserCard.test.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserCard from './UserCard.vue'

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg'
}

describe('UserCard', () => {
  it('should render user information correctly', () => {
    const wrapper = mount(UserCard, {
      props: {
        user: mockUser
      }
    })

    expect(wrapper.find('.user-card__name').text()).toBe('John Doe')
    expect(wrapper.find('.user-card__email').text()).toBe('john@example.com')
    expect(wrapper.find('.user-card__avatar').attributes('src')).toBe('https://example.com/avatar.jpg')
  })

  it('should apply active class when isActive is true', () => {
    const wrapper = mount(UserCard, {
      props: {
        user: mockUser,
        isActive: true
      }
    })

    expect(wrapper.classes()).toContain('active')
  })

  it('should emit edit event when edit button is clicked', async () => {
    const wrapper = mount(UserCard, {
      props: {
        user: mockUser
      }
    })

    await wrapper.find('.btn--primary').trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]).toEqual([mockUser])
  })

  it('should emit delete event when delete button is clicked', async () => {
    const wrapper = mount(UserCard, {
      props: {
        user: mockUser
      }
    })

    await wrapper.find('.btn--danger').trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([mockUser])
  })
})
```

**Tests unitaires NestJS**
```typescript
// services/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../repositories/user.repository'
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)
    return this.userRepository.update(id, updateUserDto)
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)
    return this.userRepository.delete(id)
  }
}
```

```typescript
// services/user.service.test.ts
import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { UserService } from './user.service'
import { UserRepository } from '../repositories/user.repository'

describe('UserService', () => {
  let service: UserService
  let repository: jest.Mocked<UserRepository>

  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository
        }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
    repository = module.get(UserRepository)
  })

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser]
      repository.findAll.mockResolvedValue(users)

      const result = await service.findAll()

      expect(result).toEqual(users)
      expect(repository.findAll).toHaveBeenCalled()
    })
  })

  describe('findById', () => {
    it('should return a user when found', async () => {
      repository.findById.mockResolvedValue(mockUser)

      const result = await service.findById('1')

      expect(result).toEqual(mockUser)
      expect(repository.findById).toHaveBeenCalledWith('1')
    })

    it('should throw NotFoundException when user not found', async () => {
      repository.findById.mockResolvedValue(null)

      await expect(service.findById('1')).rejects.toThrow(NotFoundException)
      expect(repository.findById).toHaveBeenCalledWith('1')
    })
  })

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }
      repository.create.mockResolvedValue(mockUser)

      const result = await service.create(createUserDto)

      expect(result).toEqual(mockUser)
      expect(repository.create).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Jane Doe'
      }
      const updatedUser = { ...mockUser, name: 'Jane Doe' }
      
      repository.findById.mockResolvedValue(mockUser)
      repository.update.mockResolvedValue(updatedUser)

      const result = await service.update('1', updateUserDto)

      expect(result).toEqual(updatedUser)
      expect(repository.update).toHaveBeenCalledWith('1', updateUserDto)
    })

    it('should throw NotFoundException when user not found', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Jane Doe' }
      repository.findById.mockResolvedValue(null)

      await expect(service.update('1', updateUserDto)).rejects.toThrow(NotFoundException)
    })
  })

  describe('delete', () => {
    it('should delete an existing user', async () => {
      repository.findById.mockResolvedValue(mockUser)
      repository.delete.mockResolvedValue(undefined)

      await service.delete('1')

      expect(repository.findById).toHaveBeenCalledWith('1')
      expect(repository.delete).toHaveBeenCalledWith('1')
    })

    it('should throw NotFoundException when user not found', async () => {
      repository.findById.mockResolvedValue(null)

      await expect(service.delete('1')).rejects.toThrow(NotFoundException)
    })
  })
})
```

### 📝 Tests d'intégration

#### Principe

Les tests d'intégration vérifient l'interaction entre différents composants ou modules.

#### Caractéristiques

- **Interaction** : Test de plusieurs composants ensemble
- **Vitesse** : Exécution en secondes
- **Complexité** : Plus complexes à écrire et maintenir
- **Fiabilité** : Confiance modérée

#### Exemples

**Tests d'intégration API**
```typescript
// test/user.integration.test.ts
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { User } from '../src/entities/user.entity'

describe('User Integration Tests', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true
        }),
        AppModule
      ]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201)

      expect(response.body).toMatchObject({
        name: userData.name,
        email: userData.email
      })
      expect(response.body.id).toBeDefined()
      expect(response.body.password).toBeUndefined()
    })

    it('should return 400 for invalid data', async () => {
      const invalidUserData = {
        name: '',
        email: 'invalid-email',
        password: '123'
      }

      await request(app.getHttpServer())
        .post('/users')
        .send(invalidUserData)
        .expect(400)
    })
  })

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('GET /users/:id', () => {
    it('should return a specific user', async () => {
      // Créer un utilisateur d'abord
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123'
      }

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201)

      const userId = createResponse.body.id

      // Récupérer l'utilisateur
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200)

      expect(response.body).toMatchObject({
        id: userId,
        name: userData.name,
        email: userData.email
      })
    })

    it('should return 404 for non-existent user', async () => {
      await request(app.getHttpServer())
        .get('/users/non-existent-id')
        .expect(404)
    })
  })

  describe('PUT /users/:id', () => {
    it('should update an existing user', async () => {
      // Créer un utilisateur d'abord
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201)

      const userId = createResponse.body.id

      // Mettre à jour l'utilisateur
      const updateData = {
        name: 'John Updated'
      }

      const response = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send(updateData)
        .expect(200)

      expect(response.body).toMatchObject({
        id: userId,
        name: updateData.name,
        email: userData.email
      })
    })
  })

  describe('DELETE /users/:id', () => {
    it('should delete an existing user', async () => {
      // Créer un utilisateur d'abord
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }

      const createResponse = await request(app.getHttpServer())
        .post('/users')
        .send(userData)
        .expect(201)

      const userId = createResponse.body.id

      // Supprimer l'utilisateur
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200)

      // Vérifier que l'utilisateur n'existe plus
      await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(404)
    })
  })
})
```

### 📝 Tests E2E (End-to-End)

#### Principe

Les tests E2E vérifient le comportement complet de l'application du point de vue de l'utilisateur.

#### Caractéristiques

- **Complet** : Test de l'application entière
- **Vitesse** : Exécution en minutes
- **Complexité** : Très complexes à écrire et maintenir
- **Fiabilité** : Haute confiance

#### Exemples

**Tests E2E avec Playwright**
```typescript
// e2e/user-management.e2e.ts
import { test, expect } from '@playwright/test'

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
    await page.fill('[data-testid="email"]', 'admin@example.com')
    await page.fill('[data-testid="password"]', 'admin123')
    await page.click('[data-testid="login-button"]')
    await page.waitForURL('/dashboard')
  })

  test('should create a new user', async ({ page }) => {
    // Naviguer vers la page des utilisateurs
    await page.click('[data-testid="users-menu"]')
    await page.waitForURL('/users')

    // Cliquer sur le bouton "Nouvel utilisateur"
    await page.click('[data-testid="create-user-button"]')

    // Remplir le formulaire
    await page.fill('[data-testid="user-name"]', 'John Doe')
    await page.fill('[data-testid="user-email"]', 'john@example.com')
    await page.fill('[data-testid="user-password"]', 'password123')

    // Soumettre le formulaire
    await page.click('[data-testid="submit-button"]')

    // Vérifier que l'utilisateur a été créé
    await expect(page.locator('[data-testid="user-list"]')).toContainText('John Doe')
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Utilisateur créé avec succès')
  })

  test('should edit an existing user', async ({ page }) => {
    // Naviguer vers la page des utilisateurs
    await page.click('[data-testid="users-menu"]')
    await page.waitForURL('/users')

    // Cliquer sur le bouton d'édition du premier utilisateur
    await page.click('[data-testid="edit-user-button"]:first-child')

    // Modifier le nom
    await page.fill('[data-testid="user-name"]', 'Jane Doe')

    // Soumettre le formulaire
    await page.click('[data-testid="submit-button"]')

    // Vérifier que l'utilisateur a été modifié
    await expect(page.locator('[data-testid="user-list"]')).toContainText('Jane Doe')
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Utilisateur modifié avec succès')
  })

  test('should delete an existing user', async ({ page }) => {
    // Naviguer vers la page des utilisateurs
    await page.click('[data-testid="users-menu"]')
    await page.waitForURL('/users')

    // Cliquer sur le bouton de suppression du premier utilisateur
    await page.click('[data-testid="delete-user-button"]:first-child')

    // Confirmer la suppression
    await page.click('[data-testid="confirm-delete-button"]')

    // Vérifier que l'utilisateur a été supprimé
    await expect(page.locator('[data-testid="success-message"]')).toContainText('Utilisateur supprimé avec succès')
  })

  test('should search users', async ({ page }) => {
    // Naviguer vers la page des utilisateurs
    await page.click('[data-testid="users-menu"]')
    await page.waitForURL('/users')

    // Rechercher un utilisateur
    await page.fill('[data-testid="search-input"]', 'John')

    // Vérifier que seuls les utilisateurs correspondants sont affichés
    await expect(page.locator('[data-testid="user-list"]')).toContainText('John')
  })
})
```

**Tests E2E avec Cypress**
```typescript
// cypress/e2e/user-management.cy.ts
describe('User Management', () => {
  beforeEach(() => {
    cy.login('admin@example.com', 'admin123')
    cy.visit('/users')
  })

  it('should create a new user', () => {
    cy.get('[data-testid="create-user-button"]').click()
    
    cy.get('[data-testid="user-name"]').type('John Doe')
    cy.get('[data-testid="user-email"]').type('john@example.com')
    cy.get('[data-testid="user-password"]').type('password123')
    
    cy.get('[data-testid="submit-button"]').click()
    
    cy.get('[data-testid="user-list"]').should('contain', 'John Doe')
    cy.get('[data-testid="success-message"]').should('contain', 'Utilisateur créé avec succès')
  })

  it('should edit an existing user', () => {
    cy.get('[data-testid="edit-user-button"]').first().click()
    
    cy.get('[data-testid="user-name"]').clear().type('Jane Doe')
    
    cy.get('[data-testid="submit-button"]').click()
    
    cy.get('[data-testid="user-list"]').should('contain', 'Jane Doe')
    cy.get('[data-testid="success-message"]').should('contain', 'Utilisateur modifié avec succès')
  })

  it('should delete an existing user', () => {
    cy.get('[data-testid="delete-user-button"]').first().click()
    
    cy.get('[data-testid="confirm-delete-button"]').click()
    
    cy.get('[data-testid="success-message"]').should('contain', 'Utilisateur supprimé avec succès')
  })

  it('should search users', () => {
    cy.get('[data-testid="search-input"]').type('John')
    
    cy.get('[data-testid="user-list"]').should('contain', 'John')
  })
})
```

---

## 🛠️ Outils de test

### 📝 Jest

#### Configuration Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.enum.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

#### Setup Jest

```typescript
// src/test/setup.ts
import { config } from 'dotenv'

// Charger les variables d'environnement pour les tests
config({ path: '.env.test' })

// Configuration globale pour les tests
beforeAll(() => {
  // Setup global
})

afterAll(() => {
  // Cleanup global
})

beforeEach(() => {
  // Setup pour chaque test
})

afterEach(() => {
  // Cleanup pour chaque test
})
```

### 📝 Vitest

#### Configuration Vitest

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
      '@': resolve(__dirname, 'src')
    }
  }
})
```

#### Setup Vitest

```typescript
// src/test/setup.ts
import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Configuration globale pour les tests Vue
config.global.stubs = {
  'router-link': true,
  'router-view': true
}

// Mocks globaux
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    user: { id: '1', name: 'Test User' },
    isAuthenticated: true
  })
}))

// Setup global
beforeAll(() => {
  // Setup global
})

afterAll(() => {
  // Cleanup global
})
```

### 📝 Playwright

#### Configuration Playwright

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
})
```

### 📝 Cypress

#### Configuration Cypress

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    setupNodeEvents(on, config) {
      // Configuration des événements
    }
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    }
  }
})
```

---

## ⚙️ Configuration et setup

### 📝 Configuration complète

#### Package.json

```json
{
  "name": "ecommerce-project",
  "version": "1.0.0",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:component": "cypress run --component",
    "test:component:ui": "cypress open --component"
  },
  "devDependencies": {
    "@nestjs/testing": "^10.2.10",
    "@playwright/test": "^1.40.0",
    "@types/jest": "^29.5.8",
    "@types/supertest": "^2.0.16",
    "@vue/test-utils": "^2.4.2",
    "@vue/vite-plugin-cypress": "^1.0.0",
    "cypress": "^13.6.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "vitest": "^1.0.0"
  }
}
```

#### Configuration CI/CD

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    
    - name: Run E2E tests
      run: npm run test:e2e
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

---

## 💡 Exemples concrets

### 🏗️ Setup complet d'un projet

#### Structure des tests

```
project/
├── src/
│   ├── components/
│   │   ├── UserCard.vue
│   │   └── UserCard.test.ts
│   ├── services/
│   │   ├── user.service.ts
│   │   └── user.service.test.ts
│   ├── utils/
│   │   ├── calculator.ts
│   │   └── calculator.test.ts
│   └── test/
│       └── setup.ts
├── e2e/
│   ├── user-management.e2e.ts
│   └── product-catalog.e2e.ts
├── cypress/
│   ├── e2e/
│   │   └── user-management.cy.ts
│   ├── support/
│   │   └── e2e.ts
│   └── fixtures/
│       └── users.json
├── jest.config.js
├── vitest.config.ts
├── playwright.config.ts
└── cypress.config.ts
```

#### Configuration complète Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.enum.ts',
    '!src/test/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testTimeout: 10000
}
```

#### Configuration complète Vitest

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
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.interface.ts',
        '**/*.enum.ts'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
```

---

## 📋 Templates de configuration

### 🏗️ Template Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.enum.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

### 🏗️ Template Vitest

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
      '@': resolve(__dirname, 'src')
    }
  }
})
```

### 🏗️ Template Playwright

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
```

---

## ✅ Checklist de validation

### 📋 Stratégie de tests

- [ ] **Pyramide des tests** respectée
- [ ] **Types de tests** appropriés implémentés
- [ ] **Outils de test** configurés et fonctionnels
- [ ] **Couverture de code** atteinte (80%+)
- [ ] **Tests automatisés** en CI/CD

### 📋 Tests unitaires

- [ ] **Tests unitaires** pour toutes les fonctions publiques
- [ ] **Mocks et stubs** appropriés utilisés
- [ ] **Tests d'erreur** implémentés
- [ ] **Tests de cas limites** couverts
- [ ] **Performance** des tests optimisée

### 📋 Tests d'intégration

- [ ] **Tests d'API** complets
- [ ] **Tests de base de données** implémentés
- [ ] **Tests de services** externes
- [ ] **Tests de middleware** couverts
- [ ] **Tests de validation** des données

### 📋 Tests E2E

- [ ] **Tests E2E** pour les parcours critiques
- [ ] **Tests de navigation** implémentés
- [ ] **Tests de formulaires** complets
- [ ] **Tests de responsivité** couverts
- [ ] **Tests de performance** E2E

---

## 📚 Ressources

### 🎓 Formation
- [Standards de code](./coding-standards.md)
- [Sécurité](./security.md)
- [Setup de projet](./project-setup.md)
- [Architecture backend](../03-architecture/backend-architecture.md)

### 🛠️ Outils
- [Jest](https://jestjs.io/) - Framework de test JavaScript
- [Vitest](https://vitest.dev/) - Framework de test Vite
- [Playwright](https://playwright.dev/) - Tests E2E
- [Cypress](https://www.cypress.io/) - Tests E2E
- [Supertest](https://github.com/ladjs/supertest) - Tests d'API

### 📖 Références
- [Testing JavaScript Applications](https://www.oreilly.com/library/view/testing-javascript-applications/9781617297915/) - O'Reilly
- [Jest Documentation](https://jestjs.io/docs/getting-started) - Documentation officielle
- [Vitest Documentation](https://vitest.dev/guide/) - Documentation officielle
- [Playwright Documentation](https://playwright.dev/docs/intro) - Documentation officielle

---

<div align="center">

[![Retour au Profil](../../../README.md)](../../../README.md)

</div>

---

*Dernière mise à jour : Janvier 2024*
