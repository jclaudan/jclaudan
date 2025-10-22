# 🎭 Playwright - Guide Complet

> **Playwright** est un framework de test E2E (End-to-End) moderne qui permet de tester des applications web sur plusieurs navigateurs (Chrome, Firefox, Safari) avec une API unifiée et des fonctionnalités avancées.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-playwright)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [🟢 Premiers Tests](#-débutant---premiers-tests)
- [🟡 Tests Avancés](#-intermédiaire---tests-avancés)
- [🟠 Patterns et Bonnes Pratiques](#-confirmé---patterns-et-bonnes-pratiques)
- [🔴 Tests Complexes](#-senior---tests-complexes)
- [⚫ Performance et CI/CD](#-expert---performance-et-cicd)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Playwright

### 🎯 Navigateurs Supportés

| Navigateur | Engine | Support | Notes |
|------------|--------|---------|-------|
| **Chrome** | Chromium | ✅ Complet | Version stable |
| **Firefox** | Gecko | ✅ Complet | Version stable |
| **Safari** | WebKit | ✅ Complet | Version stable |
| **Edge** | Chromium | ✅ Complet | Basé sur Chromium |
| **Chrome Beta** | Chromium | ✅ Complet | Version beta |
| **Firefox Nightly** | Gecko | ✅ Complet | Version nightly |

### 🎯 Sélecteurs de Base

| Type | Syntaxe | Description | Exemple |
|------|---------|-------------|---------|
| **CSS** | `css=selector` | Sélecteur CSS standard | `css=.button` |
| **XPath** | `xpath=//div` | Sélecteur XPath | `xpath=//button[@id='submit']` |
| **Text** | `text=Hello` | Sélecteur par texte | `text=Submit` |
| **Role** | `role=button` | Sélecteur par rôle ARIA | `role=button[name='Submit']` |
| **Test ID** | `data-testid=submit` | Sélecteur par test-id | `data-testid=submit-button` |
| **Placeholder** | `placeholder=Email` | Sélecteur par placeholder | `placeholder=Enter email` |
| **Label** | `label=Username` | Sélecteur par label | `label=Username` |
| **Title** | `title=Close` | Sélecteur par title | `title=Close dialog` |

### 🎯 Actions de Base

| Action | Méthode | Description | Exemple |
|--------|---------|-------------|---------|
| **Click** | `click()` | Clic sur un élément | `await page.click('button')` |
| **Double Click** | `dblclick()` | Double-clic sur un élément | `await page.dblclick('.item')` |
| **Right Click** | `click({ button: 'right' })` | Clic droit sur un élément | `await page.click('button', { button: 'right' })` |
| **Fill** | `fill()` | Remplir un champ | `await page.fill('input[name="email"]', 'test@example.com')` |
| **Type** | `type()` | Taper du texte | `await page.type('input', 'Hello World')` |
| **Press** | `press()` | Appuyer sur une touche | `await page.press('input', 'Enter')` |
| **Select** | `selectOption()` | Sélectionner une option | `await page.selectOption('select', 'option1')` |
| **Check** | `check()` | Cocher une checkbox | `await page.check('input[type="checkbox"]')` |
| **Uncheck** | `uncheck()` | Décocher une checkbox | `await page.uncheck('input[type="checkbox"]')` |
| **Hover** | `hover()` | Survoler un élément | `await page.hover('.menu-item')` |
| **Focus** | `focus()` | Focus sur un élément | `await page.focus('input')` |
| **Blur** | `blur()` | Enlever le focus | `await page.blur('input')` |

### 🎯 Assertions de Base

| Assertion | Méthode | Description | Exemple |
|-----------|---------|-------------|---------|
| **Visible** | `toBeVisible()` | Élément visible | `await expect(page.locator('button')).toBeVisible()` |
| **Hidden** | `toBeHidden()` | Élément caché | `await expect(page.locator('.modal')).toBeHidden()` |
| **Enabled** | `toBeEnabled()` | Élément activé | `await expect(page.locator('button')).toBeEnabled()` |
| **Disabled** | `toBeDisabled()` | Élément désactivé | `await expect(page.locator('button')).toBeDisabled()` |
| **Checked** | `toBeChecked()` | Checkbox cochée | `await expect(page.locator('input[type="checkbox"]')).toBeChecked()` |
| **Focused** | `toBeFocused()` | Élément en focus | `await expect(page.locator('input')).toBeFocused()` |
| **Contain Text** | `toContainText()` | Contient du texte | `await expect(page.locator('h1')).toContainText('Welcome')` |
| **Have Text** | `toHaveText()` | A exactement ce texte | `await expect(page.locator('h1')).toHaveText('Welcome')` |
| **Have Value** | `toHaveValue()` | A cette valeur | `await expect(page.locator('input')).toHaveValue('test')` |
| **Have Attribute** | `toHaveAttribute()` | A cet attribut | `await expect(page.locator('a')).toHaveAttribute('href', '/home')` |
| **Have Class** | `toHaveClass()` | A cette classe | `await expect(page.locator('div')).toHaveClass('active')` |
| **Have Count** | `toHaveCount()` | A ce nombre d'éléments | `await expect(page.locator('.item')).toHaveCount(5)` |

### 🎯 Configuration Playwright

| Option | Description | Valeur par défaut |
|--------|-------------|-------------------|
| **testDir** | Dossier des tests | `'./tests'` |
| **testMatch** | Pattern des fichiers de test | `'**/*.spec.{js,ts}'` |
| **timeout** | Timeout par test | `30000` |
| **expect.timeout** | Timeout des assertions | `5000` |
| **use.baseURL** | URL de base | `undefined` |
| **use.headless** | Mode headless | `true` |
| **use.viewport** | Taille de la fenêtre | `{ width: 1280, height: 720 }` |
| **use.ignoreHTTPSErrors** | Ignorer les erreurs HTTPS | `false` |
| **use.actionTimeout** | Timeout des actions | `0` |
| **use.navigationTimeout** | Timeout de navigation | `0` |
| **use.screenshot** | Screenshots | `'only-on-failure'` |
| **use.video** | Enregistrement vidéo | `'retain-on-failure'` |

### 🎯 Commandes CLI Playwright

| Commande | Description | Exemple |
|----------|-------------|---------|
| **playwright test** | Lancer tous les tests | `playwright test` |
| **playwright test --ui** | Interface graphique | `playwright test --ui` |
| **playwright test --headed** | Mode avec interface | `playwright test --headed` |
| **playwright test --debug** | Mode debug | `playwright test --debug` |
| **playwright test --grep** | Filtrer par nom | `playwright test --grep="login"` |
| **playwright test --project** | Filtrer par projet | `playwright test --project="chromium"` |
| **playwright test --reporter** | Reporter spécifique | `playwright test --reporter=html` |
| **playwright test --update-snapshots** | Mettre à jour snapshots | `playwright test --update-snapshots` |
| **playwright codegen** | Générer du code | `playwright codegen https://example.com` |
| **playwright show-trace** | Afficher trace | `playwright show-trace trace.zip` |

---

## 🚀 Introduction

Playwright est un framework de test E2E moderne développé par Microsoft qui permet de tester des applications web sur plusieurs navigateurs avec une API unifiée et des fonctionnalités avancées.

### Qu'est-ce que Playwright ?
Playwright est un framework de test E2E qui permet d'automatiser les interactions avec les navigateurs web. Il supporte Chrome, Firefox, Safari et Edge avec une API unifiée, permettant d'écrire des tests une fois et de les exécuter sur tous les navigateurs.

### Pourquoi choisir Playwright ?
- **🌐 Multi-navigateur** : Chrome, Firefox, Safari, Edge
- **⚡ Performance** : Tests parallèles et optimisés
- **🎭 API Moderne** : API intuitive et puissante
- **🔍 Debugging** : Outils de debug avancés
- **📱 Mobile** : Tests sur appareils mobiles
- **🎬 Traces** : Enregistrement des exécutions
- **📸 Screenshots** : Captures d'écran automatiques
- **🎥 Vidéos** : Enregistrement vidéo des tests

### Quand utiliser Playwright ?
- Tests E2E d'applications web
- Tests multi-navigateurs
- Tests de régression visuels
- Tests de performance
- Tests d'accessibilité
- Tests de responsive design

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Installation de Playwright
npm install -D @playwright/test

# Installation des navigateurs
npx playwright install

# Installation avec TypeScript
npm install -D @playwright/test typescript
```

### Configuration de base

```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Dossier des tests
  testDir: './tests',
  
  // Pattern des fichiers de test
  testMatch: '**/*.spec.{js,ts}',
  
  // Timeout global
  timeout: 30 * 1000,
  
  // Timeout des assertions
  expect: {
    timeout: 5000
  },
  
  // Configuration par défaut
  use: {
    // URL de base
    baseURL: 'http://localhost:3000',
    
    // Mode headless
    headless: true,
    
    // Taille de la fenêtre
    viewport: { width: 1280, height: 720 },
    
    // Ignorer les erreurs HTTPS
    ignoreHTTPSErrors: true,
    
    // Screenshots
    screenshot: 'only-on-failure',
    
    // Vidéos
    video: 'retain-on-failure',
    
    // Traces
    trace: 'retain-on-failure'
  },
  
  // Projets (navigateurs)
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
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  
  // Serveur de test
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});
```

### Configuration TypeScript

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.{js,ts}',
  timeout: 30 * 1000,
  
  expect: {
    timeout: 5000
  },
  
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
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
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});
```

---

## 🟢 Premiers Tests

### Premier test simple

```javascript
// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Vérifier le titre
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Cliquer sur le lien "Get started"
  await page.click('text=Get started');
  
  // Vérifier l'URL
  await expect(page).toHaveURL(/.*intro/);
});
```

### Test avec interactions

```javascript
// tests/login.spec.js
const { test, expect } = require('@playwright/test');

test('user can login', async ({ page }) => {
  // Aller sur la page de login
  await page.goto('/login');
  
  // Remplir le formulaire
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  
  // Cliquer sur le bouton de connexion
  await page.click('button[type="submit"]');
  
  // Vérifier la redirection
  await expect(page).toHaveURL('/dashboard');
  
  // Vérifier que l'utilisateur est connecté
  await expect(page.locator('.user-menu')).toBeVisible();
});
```

### Test avec navigation

```javascript
// tests/navigation.spec.js
const { test, expect } = require('@playwright/test');

test('user can navigate through the app', async ({ page }) => {
  // Aller sur la page d'accueil
  await page.goto('/');
  
  // Cliquer sur le menu "Products"
  await page.click('text=Products');
  await expect(page).toHaveURL('/products');
  
  // Cliquer sur un produit
  await page.click('.product-item:first-child');
  await expect(page).toHaveURL(/\/products\/\d+/);
  
  // Ajouter au panier
  await page.click('button:has-text("Add to Cart")');
  
  // Vérifier le message de confirmation
  await expect(page.locator('.success-message')).toBeVisible();
});
```

---

## 🟡 Tests Avancés

### Tests avec fixtures

```javascript
// tests/fixtures/user-fixtures.js
const { test as base } = require('@playwright/test');

// Fixture pour créer un utilisateur
const test = base.extend({
  user: async ({ page }, use) => {
    // Créer un utilisateur de test
    const user = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };
    
    // Inscrire l'utilisateur
    await page.goto('/register');
    await page.fill('input[name="name"]', user.name);
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    // Attendre la redirection
    await page.waitForURL('/dashboard');
    
    // Passer l'utilisateur au test
    await use(user);
  }
});

module.exports = { test };

// tests/user-dashboard.spec.js
const { test, expect } = require('./fixtures/user-fixtures');

test('user can access dashboard', async ({ page, user }) => {
  // L'utilisateur est déjà connecté grâce à la fixture
  await page.goto('/dashboard');
  
  // Vérifier que le dashboard est visible
  await expect(page.locator('.dashboard')).toBeVisible();
  await expect(page.locator('.user-name')).toContainText(user.name);
});
```

### Tests avec mocks

```javascript
// tests/api-mock.spec.js
const { test, expect } = require('@playwright/test');

test('user can see products from API', async ({ page }) => {
  // Mock de l'API
  await page.route('**/api/products', async route => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 }
    ];
    
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockProducts)
    });
  });
  
  // Aller sur la page des produits
  await page.goto('/products');
  
  // Vérifier que les produits mockés sont affichés
  await expect(page.locator('.product-item')).toHaveCount(2);
  await expect(page.locator('.product-item:first-child')).toContainText('Product 1');
  await expect(page.locator('.product-item:last-child')).toContainText('Product 2');
});
```

### Tests avec upload de fichiers

```javascript
// tests/file-upload.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');

test('user can upload a file', async ({ page }) => {
  await page.goto('/upload');
  
  // Sélectionner un fichier
  const filePath = path.join(__dirname, 'fixtures', 'test-file.txt');
  await page.setInputFiles('input[type="file"]', filePath);
  
  // Cliquer sur le bouton d'upload
  await page.click('button:has-text("Upload")');
  
  // Vérifier le message de succès
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('.success-message')).toContainText('File uploaded successfully');
});
```

---

## 🟠 Patterns et Bonnes Pratiques

### Page Object Model

```javascript
// tests/pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };

// tests/pages/DashboardPage.js
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.userMenu = page.locator('.user-menu');
    this.userName = page.locator('.user-name');
    this.logoutButton = page.locator('button:has-text("Logout")');
  }
  
  async goto() {
    await this.page.goto('/dashboard');
  }
  
  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }
  
  async getUserName() {
    return await this.userName.textContent();
  }
}

module.exports = { DashboardPage };

// tests/login-flow.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { DashboardPage } = require('./pages/DashboardPage');

test('user can login and access dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  
  // Login
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  
  // Vérifier la redirection vers le dashboard
  await expect(page).toHaveURL('/dashboard');
  
  // Vérifier que l'utilisateur est connecté
  await expect(dashboardPage.userMenu).toBeVisible();
  await expect(dashboardPage.userName).toContainText('User');
});
```

### Tests avec données de test

```javascript
// tests/data/test-data.js
const testUsers = [
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
];

const testProducts = [
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
];

module.exports = { testUsers, testProducts };

// tests/user-roles.spec.js
const { test, expect } = require('@playwright/test');
const { testUsers } = require('./data/test-data');

test.describe('User Roles', () => {
  for (const user of testUsers) {
    test(`${user.role} can access appropriate features`, async ({ page }) => {
      // Login avec l'utilisateur
      await page.goto('/login');
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      
      // Vérifier la redirection
      await expect(page).toHaveURL('/dashboard');
      
      // Vérifier les fonctionnalités selon le rôle
      if (user.role === 'admin') {
        await expect(page.locator('.admin-panel')).toBeVisible();
        await expect(page.locator('.user-management')).toBeVisible();
      } else {
        await expect(page.locator('.admin-panel')).toBeHidden();
        await expect(page.locator('.user-dashboard')).toBeVisible();
      }
    });
  }
});
```

### Tests avec hooks

```javascript
// tests/hooks/setup.js
const { test } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Configuration commune avant chaque test
  await page.addInitScript(() => {
    // Désactiver les animations pour des tests plus rapides
    document.documentElement.style.setProperty('--animation-duration', '0s');
    document.documentElement.style.setProperty('--transition-duration', '0s');
  });
});

test.afterEach(async ({ page }) => {
  // Nettoyage après chaque test
  await page.evaluate(() => {
    // Nettoyer le localStorage
    localStorage.clear();
    // Nettoyer le sessionStorage
    sessionStorage.clear();
  });
});

// tests/cleanup.spec.js
const { test, expect } = require('@playwright/test');

test('test with cleanup', async ({ page }) => {
  // Le setup et cleanup sont automatiquement appliqués
  await page.goto('/');
  await page.click('button:has-text("Click me")');
  await expect(page.locator('.result')).toBeVisible();
});
```

---

## 🔴 Tests Complexes

### Tests de performance

```javascript
// tests/performance.spec.js
const { test, expect } = require('@playwright/test');

test('page loads within performance budget', async ({ page }) => {
  // Mesurer les métriques de performance
  const startTime = Date.now();
  
  await page.goto('/');
  
  // Attendre que la page soit complètement chargée
  await page.waitForLoadState('networkidle');
  
  const endTime = Date.now();
  const loadTime = endTime - startTime;
  
  // Vérifier que le temps de chargement est acceptable
  expect(loadTime).toBeLessThan(3000); // Moins de 3 secondes
  
  // Vérifier les métriques Web Vitals
  const performanceMetrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart
    };
  });
  
  expect(performanceMetrics.domContentLoaded).toBeLessThan(1000);
  expect(performanceMetrics.loadComplete).toBeLessThan(2000);
});
```

### Tests de régression visuels

```javascript
// tests/visual-regression.spec.js
const { test, expect } = require('@playwright/test');

test('visual regression test', async ({ page }) => {
  await page.goto('/');
  
  // Prendre une capture d'écran de la page entière
  await expect(page).toHaveScreenshot('homepage.png');
  
  // Prendre une capture d'écran d'un élément spécifique
  await expect(page.locator('.hero-section')).toHaveScreenshot('hero-section.png');
  
  // Test sur différentes tailles d'écran
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile
  await expect(page).toHaveScreenshot('homepage-mobile.png');
  
  await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
  await expect(page).toHaveScreenshot('homepage-desktop.png');
});
```

### Tests d'accessibilité

```javascript
// tests/accessibility.spec.js
const { test, expect } = require('@playwright/test');

test('page is accessible', async ({ page }) => {
  await page.goto('/');
  
  // Vérifier les attributs d'accessibilité
  await expect(page.locator('h1')).toHaveAttribute('id');
  await expect(page.locator('nav')).toHaveAttribute('role', 'navigation');
  await expect(page.locator('main')).toHaveAttribute('role', 'main');
  
  // Vérifier les labels des formulaires
  await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-label');
  await expect(page.locator('input[name="password"]')).toHaveAttribute('aria-label');
  
  // Vérifier la navigation au clavier
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  
  // Vérifier les contrastes de couleurs
  const contrast = await page.evaluate(() => {
    const element = document.querySelector('h1');
    const styles = window.getComputedStyle(element);
    return {
      color: styles.color,
      backgroundColor: styles.backgroundColor
    };
  });
  
  expect(contrast.color).toBeDefined();
  expect(contrast.backgroundColor).toBeDefined();
});
```

### Tests avec base de données

```javascript
// tests/database.spec.js
const { test, expect } = require('@playwright/test');
const { Pool } = require('pg');

// Configuration de la base de données de test
const pool = new Pool({
  host: process.env.TEST_DB_HOST || 'localhost',
  port: process.env.TEST_DB_PORT || 5432,
  database: process.env.TEST_DB_NAME || 'test_db',
  user: process.env.TEST_DB_USER || 'test_user',
  password: process.env.TEST_DB_PASSWORD || 'test_password'
});

test.beforeAll(async () => {
  // Setup de la base de données
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
});

test.afterAll(async () => {
  // Nettoyage de la base de données
  await pool.query('DROP TABLE IF EXISTS users');
  await pool.end();
});

test.beforeEach(async () => {
  // Nettoyage avant chaque test
  await pool.query('DELETE FROM users');
});

test('user can register and data is saved to database', async ({ page }) => {
  // Aller sur la page d'inscription
  await page.goto('/register');
  
  // Remplir le formulaire
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('input[name="password"]', 'password123');
  
  // Soumettre le formulaire
  await page.click('button[type="submit"]');
  
  // Vérifier la redirection
  await expect(page).toHaveURL('/dashboard');
  
  // Vérifier que l'utilisateur est enregistré en base
  const result = await pool.query('SELECT * FROM users WHERE email = $1', ['john@example.com']);
  expect(result.rows).toHaveLength(1);
  expect(result.rows[0].name).toBe('John Doe');
});
```

---

## ⚫ Performance et CI/CD

### Configuration optimisée

```javascript
// playwright.config.expert.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.{js,ts}',
  
  // Timeouts optimisés
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },
  
  // Configuration par défaut
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Optimisations de performance
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    
    // Configuration réseau
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  },
  
  // Projets optimisés
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
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  
  // Serveur de test
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  },
  
  // Configuration des workers
  workers: process.env.CI ? 2 : 4,
  
  // Configuration des reporters
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }]
  ],
  
  // Configuration des retries
  retries: process.env.CI ? 2 : 0,
  
  // Configuration des timeouts
  globalTimeout: 60 * 60 * 1000, // 1 heure
  timeout: 30 * 1000, // 30 secondes par test
  expect: { timeout: 10 * 1000 } // 10 secondes pour les assertions
});
```

### Tests de charge

```javascript
// tests/load-testing.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Load Testing', () => {
  test('should handle concurrent users', async ({ page }) => {
    const concurrentUsers = 10;
    const requestsPerUser = 5;
    
    const startTime = Date.now();
    
    // Simuler des utilisateurs concurrents
    const userPromises = Array.from({ length: concurrentUsers }, (_, userId) => {
      return simulateUserSession(page, userId, requestsPerUser);
    });
    
    const results = await Promise.all(userPromises);
    const endTime = Date.now();
    
    const totalRequests = concurrentUsers * requestsPerUser;
    const totalTime = endTime - startTime;
    const requestsPerSecond = totalRequests / (totalTime / 1000);
    
    expect(requestsPerSecond).toBeGreaterThan(10); // Au moins 10 req/s
    expect(results.every(result => result.success)).toBe(true);
  });
});

async function simulateUserSession(page, userId, requestCount) {
  try {
    for (let i = 0; i < requestCount; i++) {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.click('button:has-text("Click me")');
      await page.waitForTimeout(100); // Simuler le temps de réflexion
    }
    return { success: true, userId };
  } catch (error) {
    return { success: false, userId, error: error.message };
  }
}
```

### Configuration CI/CD

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: 18
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    
    - name: Run Playwright tests
      run: npx playwright test
      env:
        BASE_URL: http://localhost:3000
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
    
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: test-results
        path: test-results/
        retention-days: 30
```

```json
// package.json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report",
    "test:codegen": "playwright codegen",
    "test:install": "playwright install"
  }
}
```

---

## 📚 Ressources

### Documentation officielle
- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)

### Outils et extensions
- [Playwright UI](https://playwright.dev/docs/test-ui)
- [Playwright Inspector](https://playwright.dev/docs/debug)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)

### Patterns et bonnes pratiques
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Testing Patterns](https://playwright.dev/docs/test-patterns)

### Intégration et CI/CD
- [CI/CD Integration](https://playwright.dev/docs/ci)
- [Docker Integration](https://playwright.dev/docs/docker)
- [GitHub Actions](https://playwright.dev/docs/ci#github-actions)

---

*Dernière mise à jour : Janvier 2024*
