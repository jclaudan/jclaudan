# 🎯 Cypress - Complete Guide

> **Cypress** is a modern E2E testing framework that offers an exceptional development experience with an interactive runner, real-time tests, and an intuitive API for testing web applications.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-cypress-reference-tables)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation and Configuration](#️-installation-and-configuration)
- [🟢 First Tests](#-beginner---first-tests)
- [🟡 Advanced Tests](#-intermediate---advanced-tests)
- [🟠 Patterns and Best Practices](#-confirmed---patterns-and-best-practices)
- [🔴 Complex Tests](#-senior---complex-tests)
- [⚫ Performance and CI/CD](#-expert---performance-and-cicd)
- [📚 Resources](#-resources)

---

## 🎯 Complete Cypress Reference Tables

### 🎯 Cypress Selectors

| Type | Syntax | Description | Example |
|------|--------|-------------|---------|
| **CSS** | `cy.get('.class')` | Standard CSS selector | `cy.get('.button')` |
| **ID** | `cy.get('#id')` | Selector by ID | `cy.get('#submit-btn')` |
| **Attribute** | `cy.get('[data-cy="value"]')` | Selector by attribute | `cy.get('[data-cy="submit"]')` |
| **Text** | `cy.contains('text')` | Selector by text | `cy.contains('Submit')` |
| **XPath** | `cy.xpath('//div')` | XPath selector | `cy.xpath('//button[@id="submit"]')` |
| **jQuery** | `cy.get('div:first')` | jQuery selector | `cy.get('li:first-child')` |
| **Multiple** | `cy.get('div, span')` | Multiple selectors | `cy.get('button, input[type="submit"]')` |
| **Within** | `cy.get('.parent').within()` | Selector within context | `cy.get('.form').within(() => {})` |

### 🎯 Basic Commands

| Command | Description | Example |
|---------|-------------|---------|
| **visit()** | Go to a URL | `cy.visit('/login')` |
| **get()** | Select an element | `cy.get('button')` |
| **contains()** | Find by text | `cy.contains('Submit')` |
| **click()** | Click on an element | `cy.get('button').click()` |
| **type()** | Type text | `cy.get('input').type('Hello')` |
| **clear()** | Clear a field | `cy.get('input').clear()` |
| **select()** | Select an option | `cy.get('select').select('option1')` |
| **check()** | Check a checkbox | `cy.get('input[type="checkbox"]').check()` |
| **uncheck()** | Uncheck a checkbox | `cy.get('input[type="checkbox"]').uncheck()` |
| **trigger()** | Trigger an event | `cy.get('button').trigger('mouseover')` |
| **focus()** | Focus on an element | `cy.get('input').focus()` |
| **blur()** | Remove focus | `cy.get('input').blur()` |
| **scrollTo()** | Scroll | `cy.scrollTo('bottom')` |

### 🎯 Basic Assertions

| Assertion | Description | Example |
|-----------|-------------|---------|
| **should('be.visible')** | Element visible | `cy.get('button').should('be.visible')` |
| **should('be.hidden')** | Element hidden | `cy.get('.modal').should('be.hidden')` |
| **should('be.enabled')** | Element enabled | `cy.get('button').should('be.enabled')` |
| **should('be.disabled')** | Element disabled | `cy.get('button').should('be.disabled')` |
| **should('be.checked')** | Checkbox checked | `cy.get('input[type="checkbox"]').should('be.checked')` |
| **should('be.focused')** | Element in focus | `cy.get('input').should('be.focused')` |
| **should('contain', 'text')** | Contains text | `cy.get('h1').should('contain', 'Welcome')` |
| **should('have.text', 'text')** | Has exactly this text | `cy.get('h1').should('have.text', 'Welcome')` |
| **should('have.value', 'value')** | Has this value | `cy.get('input').should('have.value', 'test')` |
| **should('have.attr', 'attr', 'value')** | Has this attribute | `cy.get('a').should('have.attr', 'href', '/home')` |
| **should('have.class', 'class')** | Has this class | `cy.get('div').should('have.class', 'active')` |
| **should('have.length', number)** | Has this number of elements | `cy.get('.item').should('have.length', 5)` |

### 🎯 Navigation Commands

| Command | Description | Example |
|---------|-------------|---------|
| **go()** | History navigation | `cy.go('back')` |
| **reload()** | Reload page | `cy.reload()` |
| **url()** | Check URL | `cy.url().should('include', '/dashboard')` |
| **title()** | Check title | `cy.title().should('eq', 'My App')` |
| **location()** | URL information | `cy.location('pathname').should('eq', '/login')` |

### 🎯 Network Commands

| Command | Description | Example |
|---------|-------------|---------|
| **intercept()** | Intercept a request | `cy.intercept('GET', '/api/users').as('getUsers')` |
| **wait()** | Wait for a request | `cy.wait('@getUsers')` |
| **request()** | Make HTTP request | `cy.request('GET', '/api/users')` |

### 🎯 Cypress Configuration

| Option | Description | Default Value |
|--------|-------------|---------------|
| **baseUrl** | Base URL | `null` |
| **viewportWidth** | Window width | `1000` |
| **viewportHeight** | Window height | `660` |
| **defaultCommandTimeout** | Command timeout | `4000` |
| **requestTimeout** | Request timeout | `5000` |
| **responseTimeout** | Response timeout | `30000` |
| **pageLoadTimeout** | Page load timeout | `60000` |
| **video** | Video recording | `true` |
| **screenshotOnRunFailure** | Screenshot on failure | `true` |
| **trashAssetsBeforeRuns** | Clean before tests | `true` |

### 🎯 Cypress CLI Commands

| Command | Description | Example |
|---------|-------------|---------|
| **cypress open** | Open interface | `cypress open` |
| **cypress run** | Run tests | `cypress run` |
| **cypress run --spec** | Run specific test | `cypress run --spec "cypress/integration/login.spec.js"` |
| **cypress run --browser** | Run on browser | `cypress run --browser chrome` |
| **cypress run --headless** | Headless mode | `cypress run --headless` |
| **cypress run --record** | Record tests | `cypress run --record --key <key>` |
| **cypress run --parallel** | Parallel tests | `cypress run --parallel` |
| **cypress run --group** | Group tests | `cypress run --group "smoke"` |

---

## 🚀 Introduction

Cypress is a modern E2E testing framework that offers an exceptional development experience with an interactive runner, real-time tests, and an intuitive API.

### What is Cypress?
Cypress is an E2E testing framework that allows you to test web applications interactively and intuitively. It offers a real-time runner, advanced debugging tools, and a simple yet powerful API.

### Why choose Cypress?
- **🎯 Interactive Interface**: Real-time runner with GUI
- **⚡ Fast Tests**: Fast and parallel test execution
- **🔍 Easy Debug**: Built-in debugging tools and time-travel
- **📸 Screenshots**: Automatic screenshots
- **🎥 Videos**: Test video recording
- **🌐 Network**: Request interception and mocking
- **📱 Mobile**: Tests on different screen sizes
- **🔄 Hot Reload**: Automatic test re-execution

### When to use Cypress?
- E2E tests for web applications
- Integration tests
- Regression tests
- Performance tests
- Accessibility tests
- Responsive design tests

---

## ⚙️ testInstallation and Configuration

### Installation

```bash
# Install Cypress
npm install --save-dev cypress

# Or with yarn
yarn add -D cypress

# Open Cypress (first time)
npx cypress open
```

### Basic Configuration

```javascript
// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Base URL
    baseUrl: 'http://localhost:3000',
    
    // Window size
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts
    defaultCommandTimeout: 4000,
    requestTimeout: 5000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    
    // Screenshots and videos
    screenshotOnRunFailure: true,
    video: true,
    
    // Folders
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Test configuration
    setupNodeEvents(on, config) {
      // Plugin configuration
    }
  }
})
```

### TypeScript Configuration

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
      // Plugin configuration
    }
  }
})
```

### Custom Commands Configuration

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

## 🟢 First Tests

### Simple First Test

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

### Navigation Test

```javascript
// cypress/e2e/navigation.cy.js
describe('Navigation', () => {
  it('should navigate to different pages', () => {
    cy.visit('/')
    
    // Click on "About" link
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')
    cy.contains('About Us')
    
    // Click on "Contact" link
    cy.get('a[href="/contact"]').click()
    cy.url().should('include', '/contact')
    cy.contains('Contact Us')
  })
})
```

### Form Test

```javascript
// cypress/e2e/form.cy.js
describe('Contact Form', () => {
  it('should submit the contact form', () => {
    cy.visit('/contact')
    
    // Fill the form
    cy.get('input[name="name"]').type('John Doe')
    cy.get('input[name="email"]').type('john@example.com')
    cy.get('textarea[name="message"]').type('Hello, this is a test message')
    
    // Submit the form
    cy.get('button[type="submit"]').click()
    
    // Verify success message
    cy.get('.success-message').should('be.visible')
    cy.get('.success-message').should('contain', 'Thank you for your message')
  })
})
```

---

## 🟡 Advanced Tests

### Tests with Custom Commands

```javascript
// cypress/e2e/user-management.cy.js
describe('User Management', () => {
  beforeEach(() => {
    // Login before each test
    cy.login('admin@example.com', 'password123')
  })

  afterEach(() => {
    // Logout after each test
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

### Tests with Request Interception

```javascript
// cypress/e2e/api-integration.cy.js
describe('API Integration', () => {
  it('should load users from API', () => {
    // Intercept API request
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
      ]
    }).as('getUsers')

    cy.visit('/users')
    
    // Wait for request to be made
    cy.wait('@getUsers')
    
    // Verify that users are displayed
    cy.get('table tbody tr').should('have.length', 2)
    cy.get('table').should('contain', 'John Doe')
    cy.get('table').should('contain', 'Jane Doe')
  })

  it('should handle API errors', () => {
    // Intercept request with error
    cy.intercept('GET', '/api/users', {
      statusCode: 500,
      body: { error: 'Internal Server Error' }
    }).as('getUsersError')

    cy.visit('/users')
    
    // Wait for request to be made
    cy.wait('@getUsersError')
    
    // Verify that error is displayed
    cy.get('.error-message').should('be.visible')
    cy.get('.error-message').should('contain', 'Failed to load users')
  })
})
```

### Tests with Fixtures

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
    // Load data from fixture
    cy.fixture('users').then((users) => {
      // Intercept request with fixture data
      cy.intercept('GET', '/api/users', {
        statusCode: 200,
        body: users.users
      }).as('getUsers')

      cy.visit('/users')
      cy.wait('@getUsers')
      
      // Verify that users are displayed
      cy.get('table tbody tr').should('have.length', 2)
      cy.get('table').should('contain', 'John Doe')
      cy.get('table').should('contain', 'Jane Doe')
    })
  })
})
```

---

## 🟠 Patterns and Best Practices

### Page Object Model

```javascript
// cypress/support/pages/LoginPage.js
class LoginPage {
  // Selectors
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

### Tests with Test Data

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

### Tests with Hooks

```javascript
// cypress/e2e/hooks.cy.js
describe('Hooks Example', () => {
  before(() => {
    // Executed once before all tests
    cy.log('Setting up test data')
    cy.createUser({ name: 'Test User', email: 'test@example.com' })
  })

  after(() => {
    // Executed once after all tests
    cy.log('Cleaning up test data')
    cy.deleteUser('test@example.com')
  })

  beforeEach(() => {
    // Executed before each test
    cy.log('Logging in before test')
    cy.login('test@example.com', 'password123')
  })

  afterEach(() => {
    // Executed after each test
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

## 🔴 Complex Tests

### Performance Tests

```javascript
// cypress/e2e/performance.cy.js
describe('Performance Tests', () => {
  it('should load page within performance budget', () => {
    const startTime = Date.now()
    
    cy.visit('/')
    
    cy.window().then((win) => {
      const loadTime = Date.now() - startTime
      expect(loadTime).to.be.lessThan(3000) // Less than 3 seconds
    })
  })

  it('should handle large datasets efficiently', () => {
    // Intercept request with large dataset
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
      expect(loadTime).to.be.lessThan(5000) // Less than 5 seconds
    })
  })
})
```

### Visual Regression Tests

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

### Accessibility Tests

```javascript
// cypress/e2e/accessibility.cy.js
describe('Accessibility Tests', () => {
  it('should have proper heading structure', () => {
    cy.visit('/')
    
    // Check that there is an h1
    cy.get('h1').should('exist')
    
    // Check that headings are in order
    cy.get('h1, h2, h3, h4, h5, h6').then($headings => {
      const levels = Array.from($headings).map(h => parseInt(h.tagName.charAt(1)))
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i]).to.be.at.most(levels[i - 1] + 1)
      }
    })
  })

  it('should have proper form labels', () => {
    cy.visit('/contact')
    
    // Check that all inputs have labels
    cy.get('input[type="text"], input[type="email"], textarea').each($input => {
      const id = $input.attr('id')
      if (id) {
        cy.get(`label[for="${id}"]`).should('exist')
      }
    })
  })

  it('should be keyboard navigable', () => {
    cy.visit('/')
    
    // Check keyboard navigation
    cy.get('body').tab()
    cy.focused().should('be.visible')
    
    cy.focused().tab()
    cy.focused().should('be.visible')
  })
})
```

---

## ⚫ Performance and CI/CD

### Optimized Configuration

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
    
    // Test configuration
    setupNodeEvents(on, config) {
      // Plugin configuration
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      
      // Environment variables configuration
      config.env = {
        ...config.env,
        ...process.env
      }
      
      return config
    }
  },
  
  // Component configuration
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

### Load Testing

```javascript
// cypress/e2e/load-testing.cy.js
describe('Load Testing', () => {
  it('should handle concurrent users', () => {
    const concurrentUsers = 10
    const requestsPerUser = 5
    
    const startTime = Date.now()
    
    // Simulate concurrent users
    const userPromises = Array.from({ length: concurrentUsers }, (_, userId) => {
      return simulateUserSession(userId, requestsPerUser)
    })
    
    cy.wrap(Promise.all(userPromises)).then(results => {
      const endTime = Date.now()
      const totalTime = endTime - startTime
      const requestsPerSecond = (concurrentUsers * requestsPerUser) / (totalTime / 1000)
      
      expect(requestsPerSecond).to.be.greaterThan(10) // At least 10 req/s
      expect(results.every(result => result.success)).to.be.true
    })
  })
})

async function simulateUserSession(userId, requestCount) {
  try {
    for (let i = 0; i < requestCount; i++) {
      cy.visit('/')
      cy.get('body').should('be.visible')
      cy.wait(100) // Simulate thinking time
    }
    return { success: true, userId }
  } catch (error) {
    return { success: false, userId, error: error.message }
  }
}
```

### CI/CD Configuration

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

## 📚 Resources

### Official Documentation
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)
- [Cypress Configuration](https://docs.cypress.io/guides/references/configuration)

### Tools and Extensions
- [Cypress Dashboard](https://docs.cypress.io/guides/dashboard/introduction)
- [Cypress Real Events](https://github.com/dmtrKovalenko/cypress-real-events)
- [Cypress Axe](https://github.com/avanslaars/cypress-axe)

### Patterns and Best Practices
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Page Object Model](https://docs.cypress.io/guides/references/best-practices#Page-Object-Model)
- [Custom Commands](https://docs.cypress.io/api/commands/custom-commands)

### Integration and CI/CD
- [CI/CD Integration](https://docs.cypress.io/guides/continuous-integration/introduction)
- [GitHub Actions](https://docs.cypress.io/guides/continuous-integration/github-actions)
- [Docker Integration](https://docs.cypress.io/guides/continuous-integration/docker)

---

*Last updated: January 2024*
