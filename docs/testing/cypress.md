# 🎯 Cypress - Guide Complet

> **Cypress** est un framework de test E2E moderne qui offre une expérience de développement exceptionnelle avec un runner interactif, des tests en temps réel et une API intuitive pour tester des applications web.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-cypress)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [🟢 Premiers Tests](#-débutant---premiers-tests)
- [🟡 Tests Avancés](#-intermédiaire---tests-avancés)
- [🟠 Patterns et Bonnes Pratiques](#-confirmé---patterns-et-bonnes-pratiques)
- [🔴 Senior - Tests Complexes](#-senior---tests-complexes)
- [⚫ Expert - Performance et CI/CD](#-expert---performance-et-cicd)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Cypress

### 🎯 Sélecteurs Cypress

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **CSS** | `cy.get('.class')` | Sélecteur CSS standard | `cy.get('.button')` |
| **ID** | `cy.get('#id')` | Sélecteur par ID | `cy.get('#submit-btn')` |
| **Attribute** | `cy.get('[data-cy="value"]')` | Sélecteur par attribut | `cy.get('[data-cy="submit"]')` |
| **Text** | `cy.contains('text')` | Sélecteur par texte | `cy.contains('Submit')` |
| **XPath** | `cy.xpath('//div')` | Sélecteur XPath | `cy.xpath('//button[@id="submit"]')` |
| **jQuery** | `cy.get('div:first')` | Sélecteur jQuery | `cy.get('li:first-child')` |
| **Multiple** | `cy.get('div, span')` | Sélecteurs multiples | `cy.get('button, input[type="submit"]')` |
| **Within** | `cy.get('.parent').within()` | Sélecteur dans un contexte | `cy.get('.form').within(() => {})` |

### 🎯 Commandes de Base

| Commande | Description | Exemple |
|----------|-------------|---------|
| **visit()** | Aller sur une URL | `cy.visit('/login')` |
| **get()** | Sélectionner un élément | `cy.get('button')` |
| **contains()** | Trouver par texte | `cy.contains('Submit')` |
| **click()** | Cliquer sur un élément | `cy.get('button').click()` |
| **type()** | Taper du texte | `cy.get('input').type('Hello')` |
| **clear()** | Vider un champ | `cy.get('input').clear()` |
| **select()** | Sélectionner une option | `cy.get('select').select('option1')` |
| **check()** | Cocher une checkbox | `cy.get('input[type="checkbox"]').check()` |
| **uncheck()** | Décocher une checkbox | `cy.get('input[type="checkbox"]').uncheck()` |
| **trigger()** | Déclencher un événement | `cy.get('button').trigger('mouseover')` |
| **focus()** | Focus sur un élément | `cy.get('input').focus()` |
| **blur()** | Enlever le focus | `cy.get('input').blur()` |
| **scrollTo()** | Faire défiler | `cy.scrollTo('bottom')` |

### 🎯 Assertions de Base

| Assertion | Description | Exemple |
|-----------|-------------|---------|
| **should('be.visible')** | Élément visible | `cy.get('button').should('be.visible')` |
| **should('be.hidden')** | Élément caché | `cy.get('.modal').should('be.hidden')` |
| **should('be.enabled')** | Élément activé | `cy.get('button').should('be.enabled')` |
| **should('be.disabled')** | Élément désactivé | `cy.get('button').should('be.disabled')` |
| **should('be.checked')** | Checkbox cochée | `cy.get('input[type="checkbox"]').should('be.checked')` |
| **should('be.focused')** | Élément en focus | `cy.get('input').should('be.focused')` |
| **should('contain', 'text')** | Contient du texte | `cy.get('h1').should('contain', 'Welcome')` |
| **should('have.text', 'text')** | A exactement ce texte | `cy.get('h1').should('have.text', 'Welcome')` |
| **should('have.value', 'value')** | A cette valeur | `cy.get('input').should('have.value', 'test')` |
| **should('have.attr', 'attr', 'value')** | A cet attribut | `cy.get('a').should('have.attr', 'href', '/home')` |
| **should('have.class', 'class')** | A cette classe | `cy.get('div').should('have.class', 'active')` |
| **should('have.length', number)** | A ce nombre d'éléments | `cy.get('.item').should('have.length', 5)` |

### 🎯 Commandes de Navigation

| Commande | Description | Exemple |
|----------|-------------|---------|
| **go()** | Navigation dans l'historique | `cy.go('back')` |
| **reload()** | Recharger la page | `cy.reload()` |
| **url()** | Vérifier l'URL | `cy.url().should('include', '/dashboard')` |
| **title()** | Vérifier le titre | `cy.title().should('eq', 'My App')` |
| **location()** | Informations sur l'URL | `cy.location('pathname').should('eq', '/login')` |

### 🎯 Commandes de Réseau

| Commande | Description | Exemple |
|----------|-------------|---------|
| **intercept()** | Intercepter une requête | `cy.intercept('GET', '/api/users').as('getUsers')` |
| **wait()** | Attendre une requête | `cy.wait('@getUsers')` |
| **request()** | Faire une requête HTTP | `cy.request('GET', '/api/users')` |

### 🎯 Configuration Cypress

| Option | Description | Valeur par défaut |
|--------|-------------|-------------------|
| **baseUrl** | URL de base | `null` |
| **viewportWidth** | Largeur de la fenêtre | `1000` |
| **viewportHeight** | Hauteur de la fenêtre | `660` |
| **defaultCommandTimeout** | Timeout des commandes | `4000` |
| **requestTimeout** | Timeout des requêtes | `5000` |
| **responseTimeout** | Timeout des réponses | `30000` |
| **pageLoadTimeout** | Timeout de chargement | `60000` |
| **video** | Enregistrement vidéo | `true` |
| **screenshotOnRunFailure** | Screenshot en cas d'échec | `true` |
| **trashAssetsBeforeRuns** | Nettoyer avant les tests | `true` |

### 🎯 Commandes CLI Cypress

| Commande | Description | Exemple |
|----------|-------------|---------|
| **cypress open** | Ouvrir l'interface | `cypress open` |
| **cypress run** | Lancer les tests | `cypress run` |
| **cypress run --spec** | Lancer un test spécifique | `cypress run --spec "cypress/integration/login.spec.js"` |
| **cypress run --browser** | Lancer sur un navigateur | `cypress run --browser chrome` |
| **cypress run --headless** | Mode headless | `cypress run --headless` |
| **cypress run --record** | Enregistrer les tests | `cypress run --record --key <key>` |
| **cypress run --parallel** | Tests parallèles | `cypress run --parallel` |
| **cypress run --group** | Grouper les tests | `cypress run --group "smoke"` |

---

## 🚀 Introduction

Cypress est un framework de test E2E moderne qui offre une expérience de développement exceptionnelle avec un runner interactif, des tests en temps réel et une API intuitive.

### Qu'est-ce que Cypress ?
Cypress est un framework de test E2E qui permet de tester des applications web de manière interactive et intuitive. Il offre un runner en temps réel, des outils de debug avancés et une API simple et puissante.

### Pourquoi choisir Cypress ?
- **🎯 Interface Interactive** : Runner en temps réel avec interface graphique
- **⚡ Tests Rapides** : Exécution rapide et parallèle des tests
- **🔍 Debug Facile** : Outils de debug intégrés et time-travel
- **📸 Screenshots** : Captures d'écran automatiques
- **🎥 Vidéos** : Enregistrement vidéo des tests
- **🌐 Réseau** : Interception et mocking des requêtes
- **📱 Mobile** : Tests sur différentes tailles d'écran
- **🔄 Hot Reload** : Re-exécution automatique des tests

### Quand utiliser Cypress ?
- Tests E2E d'applications web
- Tests d'intégration
- Tests de régression
- Tests de performance
- Tests d'accessibilité
- Tests de responsive design

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Installation de Cypress
npm install --save-dev cypress

# Ou avec yarn
yarn add -D cypress

# Ouverture de Cypress (première fois)
npx cypress open
```

### Configuration de base

```javascript
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // URL de base
    baseUrl: 'http://localhost:3000',
    
    // Taille de la fenêtre
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts
    defaultCommandTimeout: 4000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    
    // Screenshots et vidéos
    screenshotOnRunFailure: true,
    video: true,
    
    // Dossiers
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Configuration des tests
    setupNodeEvents(on, config) {
      // Configuration des plugins
    }
  }
})
```

### Configuration TypeScript

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 4000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    screenshotOnRunFailure: true,
    video: true,
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // Configuration des plugins
    }
  }
})
```

### Configuration des commandes personnalisées

```javascript
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[name="email"]').type(email)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('logout', () => {
  cy.get('.user-menu').click()
  cy.get('button:contains("Logout")').click()
  cy.url().should('include', '/login')
})

Cypress.Commands.add('createUser', (userData) => {
  cy.request('POST', '/api/users', userData)
})

Cypress.Commands.add('deleteUser', (userId) => {
  cy.request('DELETE', `/api/users/${userId}`)
})
```

---

## 🟢 Premiers Tests

### Premier test simple

```javascript
// cypress/e2e/example.cy.js
describe('Example Test', () => {
  it('should visit the homepage', () => {
    cy.visit('/')
    cy.contains('Welcome to My App')
  })

  it('should have a working button', () => {
    cy.visit('/')
    cy.get('button').click()
    cy.get('.result').should('be.visible')
  })
})
```

### Test de navigation

```javascript
// cypress/e2e/navigation.cy.js
describe('Navigation', () => {
  it('should navigate to different pages', () => {
    cy.visit('/')
    
    // Cliquer sur le lien "About"
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')
    cy.contains('About Us')
    
    // Cliquer sur le lien "Contact"
    cy.get('a[href="/contact"]').click()
    cy.url().should('include', '/contact')
    cy.contains('Contact Us')
  })
})
```

### Test de formulaire

```javascript
// cypress/e2e/form.cy.js
describe('Contact Form', () => {
  it('should submit the contact form', () => {
    cy.visit('/contact')
    
    // Remplir le formulaire
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="email"]').type('john@example.com')
    cy.get('textarea[name="message"]').type('Hello, this is a test message')
    
    // Soumettre le formulaire
    cy.get('button[type="submit"]').click()
    
    // Vérifier le message de succès
    cy.get('.success-message').should('be.visible')
    cy.get('.success-message').should('contain', 'Thank you for your message')
  })
})
```

---

## 🟡 Tests Avancés

### Tests avec commandes personnalisées

```javascript
// cypress/e2e/user-management.cy.js
describe('User Management', () => {
  beforeEach(() => {
    // Login avant chaque test
    cy.login('admin@example.com', 'password123')
  })

  afterEach(() => {
    // Logout après chaque test
    cy.logout()
  })

  it('should create a new user', () => {
    cy.visit('/users')
    cy.get('button:contains("Add User")').click()
    
    cy.get('input[name="name"]').type('Jane Doe')
    cy.get('input[name="email"]').type('jane@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('select[name="role"]').select('user')
    
    cy.get('button[type="submit"]').click()
    
    cy.get('.success-message').should('be.visible')
    cy.get('table').should('contain', 'Jane Doe')
  })

  it('should edit an existing user', () => {
    cy.visit('/users')
    cy.get('table tbody tr:first-child button:contains("Edit")').click()
    
    cy.get('input[name="name"]').clear().type('John Updated')
    cy.get('button[type="submit"]').click()
    
    cy.get('.success-message').should('be.visible')
    cy.get('table').should('contain', 'John Updated')
  })

  it('should delete a user', () => {
    cy.visit('/users')
    cy.get('table tbody tr:first-child button:contains("Delete")').click()
    
    cy.get('.confirm-dialog button:contains("Confirm")').click()
    
    cy.get('.success-message').should('be.visible')
    cy.get('table tbody tr').should('have.length', 0)
  })
})
```

### Tests avec interception de requêtes

```javascript
// cypress/e2e/api-integration.cy.js
describe('API Integration', () => {
  it('should load users from API', () => {
    // Intercepter la requête API
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
      ]
    }).as('getUsers')

    cy.visit('/users')
    
    // Attendre que la requête soit faite
    cy.wait('@getUsers')
    
    // Vérifier que les utilisateurs sont affichés
    cy.get('table tbody tr').should('have.length', 2)
    cy.get('table').should('contain', 'John Doe')
    cy.get('table').should('contain', 'Jane Doe')
  })

  it('should handle API errors', () => {
    // Intercepter la requête avec une erreur
    cy.intercept('GET', '/api/users', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getUsersError')

    cy.visit('/users')
    
    // Attendre que la requête soit faite
    cy.wait('@getUsersError')
    
    // Vérifier que l'erreur est affichée
    cy.get('.error-message').should('be.visible')
    cy.get('.error-message').should('contain', 'Failed to load users')
  })
})
```

### Tests avec fixtures

```javascript
// cypress/fixtures/users.json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user"
    }
  ]
}

// cypress/e2e/fixtures.cy.js
describe('Using Fixtures', () => {
  it('should load users from fixture', () => {
    // Charger les données depuis le fixture
    cy.fixture('users').then((users) => {
      // Intercepter la requête avec les données du fixture
      cy.intercept('GET', '/api/users', {
        statusCode: 200,
        body: users.users
      }).as('getUsers')

      cy.visit('/users')
      cy.wait('@getUsers')
      
      // Vérifier que les utilisateurs sont affichés
      cy.get('table tbody tr').should('have.length', 2)
      cy.get('table').should('contain', 'John Doe')
      cy.get('table').should('contain', 'Jane Doe')
    })
  })
})
```

---

## 🟠 Patterns et Bonnes Pratiques

### Page Object Model

```javascript
// cypress/support/pages/LoginPage.js
class LoginPage {
  // Sélecteurs
  get emailInput() { return cy.get('input[name="email"]') }
  get passwordInput() { return cy.get('input[name="password"]') }
  get submitButton() { return cy.get('button[type="submit"]') }
  get errorMessage() { return cy.get('.error-message') }

  // Actions
  visit() {
    cy.visit('/login')
    return this
  }

  login(email, password) {
    this.emailInput.type(email)
    this.passwordInput.type(password)
    this.submitButton.click()
    return this
  }

  // Assertions
  shouldShowError(message) {
    this.errorMessage.should('be.visible')
    this.errorMessage.should('contain', message)
    return this
  }

  shouldRedirectToDashboard() {
    cy.url().should('include', '/dashboard')
    return this
  }
}

module.exports = new LoginPage()

// cypress/support/pages/DashboardPage.js
class DashboardPage {
  get userMenu() { return cy.get('.user-menu') }
  get userName() { return cy.get('.user-name') }
  get logoutButton() { return cy.get('button:contains("Logout")') }

  visit() {
    cy.visit('/dashboard')
    return this
  }

  logout() {
    this.userMenu.click()
    this.logoutButton.click()
    return this
  }

  shouldShowUserName(name) {
    this.userName.should('contain', name)
    return this
  }
}

module.exports = new DashboardPage()

// cypress/e2e/login-flow.cy.js
import LoginPage from '../support/pages/LoginPage'
import DashboardPage from '../support/pages/DashboardPage'

describe('Login Flow', () => {
  it('should login successfully', () => {
    LoginPage
      .visit()
      .login('user@example.com', 'password123')
      .shouldRedirectToDashboard()

    DashboardPage
      .shouldShowUserName('User')
  })

  it('should show error for invalid credentials', () => {
    LoginPage
      .visit()
      .login('invalid@example.com', 'wrongpassword')
      .shouldShowError('Invalid email or password')
  })
})
```

### Tests avec données de test

```javascript
// cypress/support/test-data.js
export const testUsers = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User'
  },
  {
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    name: 'Regular User'
  }
]

export const testProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    category: 'Clothing'
  }
]

// cypress/e2e/user-roles.cy.js
import { testUsers } from '../support/test-data'

describe('User Roles', () => {
  testUsers.forEach(user => {
    it(`${user.role} can access appropriate features`, () => {
      cy.login(user.email, user.password)
      
      if (user.role === 'admin') {
        cy.get('.admin-panel').should('be.visible')
        cy.get('.user-management').should('be.visible')
      } else {
        cy.get('.admin-panel').should('not.exist')
        cy.get('.user-dashboard').should('be.visible')
      }
    })
  })
})
```

### Tests avec hooks

```javascript
// cypress/e2e/hooks.cy.js
describe('Hooks Example', () => {
  before(() => {
    // Exécuté une fois avant tous les tests
    cy.log('Setting up test data')
    cy.createUser({ name: 'Test User', email: 'test@example.com' })
  })

  after(() => {
    // Exécuté une fois après tous les tests
    cy.log('Cleaning up test data')
    cy.deleteUser('test@example.com')
  })

  beforeEach(() => {
    // Exécuté avant chaque test
    cy.log('Logging in before test')
    cy.login('test@example.com', 'password123')
  })

  afterEach(() => {
    // Exécuté après chaque test
    cy.log('Logging out after test')
    cy.logout()
  })

  it('should do something', () => {
    cy.visit('/dashboard')
    cy.get('.dashboard').should('be.visible')
  })
})
```

---

## 🔴 Senior - Tests Complexes

### Tests de performance

```javascript
// cypress/e2e/performance.cy.js
describe('Performance Tests', () => {
  it('should load page within performance budget', () => {
    const startTime = Date.now()
    
    cy.visit('/')
    
    cy.window().then((win) => {
      const loadTime = Date.now() - startTime
      expect(loadTime).to.be.lessThan(3000) // Moins de 3 secondes
    })
  })

  it('should handle large datasets efficiently', () => {
    // Intercepter la requête avec un grand dataset
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`
      }))
    }).as('getLargeDataset')

    const startTime = Date.now()
    
    cy.visit('/users')
    cy.wait('@getLargeDataset')
    
    cy.window().then(() => {
      const loadTime = Date.now() - startTime
      expect(loadTime).to.be.lessThan(5000) // Moins de 5 secondes
    })
  })
})
```

### Tests de régression visuels

```javascript
// cypress/e2e/visual-regression.cy.js
describe('Visual Regression Tests', () => {
  it('should match homepage screenshot', () => {
    cy.visit('/')
    cy.get('body').should('be.visible')
    cy.matchImageSnapshot('homepage')
  })

  it('should match login page screenshot', () => {
    cy.visit('/login')
    cy.get('form').should('be.visible')
    cy.matchImageSnapshot('login-page')
  })

  it('should match dashboard screenshot', () => {
    cy.login('user@example.com', 'password123')
    cy.visit('/dashboard')
    cy.get('.dashboard').should('be.visible')
    cy.matchImageSnapshot('dashboard')
  })
})
```

### Tests d'accessibilité

```javascript
// cypress/e2e/accessibility.cy.js
describe('Accessibility Tests', () => {
  it('should have proper heading structure', () => {
    cy.visit('/')
    
    // Vérifier qu'il y a un h1
    cy.get('h1').should('exist')
    
    // Vérifier que les headings sont dans l'ordre
    cy.get('h1, h2, h3, h4, h5, h6').then($headings => {
      const levels = Array.from($headings).map(h => parseInt(h.tagName.charAt(1)))
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i]).to.be.at.most(levels[i - 1] + 1)
      }
    })
  })

  it('should have proper form labels', () => {
    cy.visit('/contact')
    
    // Vérifier que tous les inputs ont des labels
    cy.get('input[type="text"], input[type="email"], textarea').each($input => {
      const id = $input.attr('id')
      if (id) {
        cy.get(`label[for="${id}"]`).should('exist')
      }
    })
  })

  it('should be keyboard navigable', () => {
    cy.visit('/')
    
    // Vérifier la navigation au clavier
    cy.get('body').tab()
    cy.focused().should('be.visible')
    
    cy.focused().tab()
    cy.focused().should('be.visible')
  })
})
```

---

## ⚫ Expert - Performance et CI/CD

### Configuration optimisée

```javascript
// cypress.config.expert.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 4000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    screenshotOnRunFailure: true,
    video: true,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Configuration des tests
    setupNodeEvents(on, config) {
      // Configuration des plugins
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      
      // Configuration des variables d'environnement
      config.env = {
        ...config.env,
        ...process.env
      }
      
      return config
    }
  },
  
  // Configuration des composants
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack'
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js'
  }
})
```

### Tests de charge

```javascript
// cypress/e2e/load-testing.cy.js
describe('Load Testing', () => {
  it('should handle concurrent users', () => {
    const concurrentUsers = 10
    const requestsPerUser = 5
    
    const startTime = Date.now()
    
    // Simuler des utilisateurs concurrents
    const userPromises = Array.from({ length: concurrentUsers }, (_, userId) => {
      return simulateUserSession(userId, requestsPerUser)
    })
    
    cy.wrap(Promise.all(userPromises)).then(results => {
      const endTime = Date.now()
      const totalTime = endTime - startTime
      const requestsPerSecond = (concurrentUsers * requestsPerUser) / (totalTime / 1000)
      
      expect(requestsPerSecond).to.be.greaterThan(10) // Au moins 10 req/s
      expect(results.every(result => result.success)).to.be.true
    })
  })
})

async function simulateUserSession(userId, requestCount) {
  try {
    for (let i = 0; i < requestCount; i++) {
      cy.visit('/')
      cy.get('body').should('be.visible')
      cy.wait(100) // Simuler le temps de réflexion
    }
    return { success: true, userId }
  } catch (error) {
    return { success: false, userId, error: error.message }
  }
}
```

### Configuration CI/CD

```yaml
# .github/workflows/cypress.yml
name: Cypress Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run Cypress tests
      uses: cypress-io/github-action@v5
      with:
        start: npm start
        wait-on: 'http://localhost:3000'
        wait-on-timeout: 120
        browser: chrome
        record: true
        parallel: true
        group: 'UI Tests'
      env:
        CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Upload screenshots
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: cypress-screenshots
        path: cypress/screenshots
    
    - name: Upload videos
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: cypress-videos
        path: cypress/videos
```

```json
// package.json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:chrome": "cypress run --browser chrome",
    "cypress:run:firefox": "cypress run --browser firefox",
    "cypress:run:edge": "cypress run --browser edge",
    "cypress:run:headless": "cypress run --headless",
    "cypress:run:record": "cypress run --record",
    "cypress:run:parallel": "cypress run --parallel",
    "cypress:run:group": "cypress run --group"
  }
}
```

---

## 📚 Ressources

### Documentation officielle
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)
- [Cypress Configuration](https://docs.cypress.io/guides/references/configuration)

### Outils et extensions
- [Cypress Dashboard](https://docs.cypress.io/guides/dashboard/introduction)
- [Cypress Real Events](https://github.com/dmtrKovalenko/cypress-real-events)
- [Cypress Axe](https://github.com/avanslaars/cypress-axe)

### Patterns et bonnes pratiques
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model](https://docs.cypress.io/guides/references/best-practices#Page-Object-Model)
- [Custom Commands](https://docs.cypress.io/api/commands/custom-commands)

### Intégration et CI/CD
- [CI/CD Integration](https://docs.cypress.io/guides/continuous-integration/introduction)
- [GitHub Actions](https://docs.cypress.io/guides/continuous-integration/github-actions)
- [Docker Integration](https://docs.cypress.io/guides/continuous-integration/docker)

---

*Dernière mise à jour : Janvier 2024*
