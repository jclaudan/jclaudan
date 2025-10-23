# 🎭 Playwright - Complete Guide

> **Playwright** is a modern E2E (End-to-End) testing framework that allows you to test web applications across multiple browsers (Chrome, Firefox, Safari) with a unified API and advanced features.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-playwright-reference-tables)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation and Configuration](#️-installation-and-configuration)
- [🟢 First Tests](#-beginner---first-tests)
- [🟡 Advanced Tests](#-intermediate---advanced-tests)
- [🟠 Patterns and Best Practices](#-confirmed---patterns-and-best-practices)
- [🔴 Complex Tests](#-senior---complex-tests)
- [⚫ Performance and CI/CD](#-expert---performance-and-cicd)
- [📚 Resources](#-resources)

---

## 🎯 Complete Playwright Reference Tables

### 🎯 Supported Browsers

| Browser | Engine | Support | Notes |
|---------|--------|---------|-------|
| **Chrome** | Chromium | ✅ Complete | Stable version |
| **Firefox** | Gecko | ✅ Complete | Stable version |
| **Safari** | WebKit | ✅ Complete | Stable version |
| **Edge** | Chromium | ✅ Complete | Based on Chromium |
| **Chrome Beta** | Chromium | ✅ Complete | Beta version |
| **Firefox Nightly** | Gecko | ✅ Complete | Nightly version |

### 🎯 Basic Selectors

| Type | Syntax | Description | Example |
|------|--------|-------------|---------|
| **CSS** | `css=selector` | Standard CSS selector | `css=.button` |
| **XPath** | `xpath=//div` | XPath selector | `xpath=//button[@id='submit']` |
| **Text** | `text=Hello` | Text selector | `text=Submit` |
| **Role** | `role=button` | ARIA role selector | `role=button[name='Submit']` |
| **Test ID** | `data-testid=submit` | Test-id selector | `data-testid=submit-button` |
| **Placeholder** | `placeholder=Email` | Placeholder selector | `placeholder=Enter email` |
| **Label** | `label=Username` | Label selector | `label=Username` |
| **Title** | `title=Close` | Title selector | `title=Close dialog` |

### 🎯 Basic Actions

| Action | Method | Description | Example |
|--------|--------|-------------|---------|
| **Click** | `click()` | Click on element | `await page.click('button')` |
| **Double Click** | `dblclick()` | Double-click on element | `await page.dblclick('.item')` |
| **Right Click** | `click({ button: 'right' })` | Right-click on element | `await page.click('button', { button: 'right' })` |
| **Fill** | `fill()` | Fill a field | `await page.fill('input[name="email"]', 'test@example.com')` |
| **Type** | `type()` | Type text | `await page.type('input', 'Hello World')` |
| **Press** | `press()` | Press a key | `await page.press('input', 'Enter')` |
| **Select** | `selectOption()` | Select an option | `await page.selectOption('select', 'option1')` |
| **Check** | `check()` | Check a checkbox | `await page.check('input[type="checkbox"]')` |
| **Uncheck** | `uncheck()` | Uncheck a checkbox | `await page.uncheck('input[type="checkbox"]')` |
| **Hover** | `hover()` | Hover over element | `await page.hover('.menu-item')` |
| **Focus** | `focus()` | Focus on element | `await page.focus('input')` |
| **Blur** | `blur()` | Remove focus | `await page.blur('input')` |

### 🎯 Basic Assertions

| Assertion | Method | Description | Example |
|-----------|--------|-------------|---------|
| **Visible** | `toBeVisible()` | Element visible | `await expect(page.locator('button')).toBeVisible()` |
| **Hidden** | `toBeHidden()` | Element hidden | `await expect(page.locator('.modal')).toBeHidden()` |
| **Enabled** | `toBeEnabled()` | Element enabled | `await expect(page.locator('button')).toBeEnabled()` |
| **Disabled** | `toBeDisabled()` | Element disabled | `await expect(page.locator('button')).toBeDisabled()` |
| **Checked** | `toBeChecked()` | Checkbox checked | `await expect(page.locator('input[type="checkbox"]')).toBeChecked()` |
| **Focused** | `toBeFocused()` | Element in focus | `await expect(page.locator('input')).toBeFocused()` |
| **Contain Text** | `toContainText()` | Contains text | `await expect(page.locator('h1')).toContainText('Welcome')` |
| **Have Text** | `toHaveText()` | Has exactly this text | `await expect(page.locator('h1')).toHaveText('Welcome')` |
| **Have Value** | `toHaveValue()` | Has this value | `await expect(page.locator('input')).toHaveValue('test')` |
| **Have Attribute** | `toHaveAttribute()` | Has this attribute | `await expect(page.locator('a')).toHaveAttribute('href', '/home')` |
| **Have Class** | `toHaveClass()` | Has this class | `await expect(page.locator('div')).toHaveClass('active')` |
| **Have Count** | `toHaveCount()` | Has this number of elements | `await expect(page.locator('.item')).toHaveCount(5)` |

### 🎯 Playwright Configuration

| Option | Description | Default Value |
|--------|-------------|---------------|
| **testDir** | Test directory | `'./tests'` |
| **testMatch** | Test file pattern | `'**/*.spec.{js,ts}'` |
| **timeout** | Test timeout | `30000` |
| **expect.timeout** | Assertion timeout | `5000` |
| **use.baseURL** | Base URL | `undefined` |
| **use.headless** | Headless mode | `true` |
| **use.viewport** | Window size | `{ width: 1280, height: 720 }` |
| **use.ignoreHTTPSErrors** | Ignore HTTPS errors | `false` |
| **use.actionTimeout** | Action timeout | `0` |
| **use.navigationTimeout** | Navigation timeout | `0` |
| **use.screenshot** | Screenshots | `'only-on-failure'` |
| **use.video** | Video recording | `'retain-on-failure'` |

### 🎯 Playwright CLI Commands

| Command | Description | Example |
|---------|-------------|---------|
| **playwright test** | Run all tests | `playwright test` |
| **playwright test --ui** | GUI interface | `playwright test --ui` |
| **playwright test --headed** | With interface mode | `playwright test --headed` |
| **playwright test --debug** | Debug mode | `playwright test --debug` |
| **playwright test --grep** | Filter by name | `playwright test --grep="login"` |
| **playwright test --project** | Filter by project | `playwright test --project="chromium"` |
| **playwright test --reporter** | Specific reporter | `playwright test --reporter=html` |
| **playwright test --update-snapshots** | Update snapshots | `playwright test --update-snapshots` |
| **playwright codegen** | Generate code | `playwright codegen https://example.com` |
| **playwright show-trace** | Show trace | `playwright show-trace trace.zip` |

---

## 🚀 Introduction

Playwright is a modern E2E testing framework developed by Microsoft that allows you to test web applications across multiple browsers with a unified API and advanced features.

### What is Playwright?
Playwright is an E2E testing framework that allows you to automate browser interactions. It supports Chrome, Firefox, Safari, and Edge with a unified API, allowing you to write tests once and run them on all browsers.

### Why choose Playwright?
- **🌐 Multi-browser**: Chrome, Firefox, Safari, Edge
- **⚡ Performance**: Parallel and optimized tests
- **🎭 Modern API**: Intuitive and powerful API
- **🔍 Debugging**: Advanced debugging tools
- **📱 Mobile**: Tests on mobile devices
- **🎬 Traces**: Execution recording
- **📸 Screenshots**: Automatic screenshots
- **🎥 Videos**: Test video recording

### When to use Playwright?
- E2E tests for web applications
- Multi-browser tests
- Visual regression tests
- Performance tests
- Accessibility tests
- Responsive design tests

---

## ⚙️ Installation and Configuration

### Installation

```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install

# Install with TypeScript
npm install -D @playwright/test typescript
```

### Basic Configuration

```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory
  testDir: './tests',
  
  // Test file pattern
  testMatch: '**/*.spec.{js,ts}',
  
  // Global timeout
  timeout: 30 * 1000,
  
  // Assertion timeout
  expect: {
    timeout: 5000
  },
  
  // Default configuration
  use: {
    // Base URL
    baseURL: 'http://localhost:3000',
    
    // Headless mode
    headless: true,
    
    // Window size
    viewport: { width: 1280, height: 720 },
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    
    // Screenshots
    screenshot: 'only-on-failure',
    
    // Videos
    video: 'retain-on-failure',
    
    // Traces
    trace: 'retain-on-failure'
  },
  
  // Projects (browsers)
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
  
  // Test server
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI
  }
});
```

### TypeScript Configuration

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

## 🟢 First Tests

### Simple First Test

```javascript
// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Check title
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // Click on "Get started" link
  await page.click('text=Get started');
  
  // Check URL
  await expect(page).toHaveURL(/.*intro/);
});
```

### Test with Interactions

```javascript
// tests/login.spec.js
const { test, expect } = require('@playwright/test');

test('user can login', async ({ page }) => {
  // Go to login page
  await page.goto('/login');
  
  // Fill the form
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  
  // Click login button
  await page.click('button[type="submit"]');
  
  // Check redirect
  await expect(page).toHaveURL('/dashboard');
  
  // Check that user is logged in
  await expect(page.locator('.user-menu')).toBeVisible();
});
```

### Test with Navigation

```javascript
// tests/navigation.spec.js
const { test, expect } = require('@playwright/test');

test('user can navigate through the app', async ({ page }) => {
  // Go to homepage
  await page.goto('/');
  
  // Click on "Products" menu
  await page.click('text=Products');
  await expect(page).toHaveURL('/products');
  
  // Click on a product
  await page.click('.product-item:first-child');
  await expect(page).toHaveURL(/\/products\/\d+/);
  
  // Add to cart
  await page.click('button:has-text("Add to Cart")');
  
  // Check confirmation message
  await expect(page.locator('.success-message')).toBeVisible();
});
```

---

## 🟡 Advanced Tests

### Tests with Fixtures

```javascript
// tests/fixtures/user-fixtures.js
const { test as base } = require('@playwright/test');

// Fixture to create a user
const test = base.extend({
  user: async ({ page }, use) => {
    // Create a test user
    const user = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };
    
    // Register user
    await page.goto('/register');
    await page.fill('input[name="name"]', user.name);
    await page.fill('input[name="email"]', user.email);
    await page.fill('input[name="password"]', user.password);
    await page.click('button[type="submit"]');
    
    // Wait for redirect
    await page.waitForURL('/dashboard');
    
    // Pass user to test
    await use(user);
  }
});

module.exports = { test };

// tests/user-dashboard.spec.js
const { test, expect } = require('./fixtures/user-fixtures');

test('user can access dashboard', async ({ page, user }) => {
  // User is already logged in thanks to fixture
  await page.goto('/dashboard');
  
  // Check that dashboard is visible
  await expect(page.locator('.dashboard')).toBeVisible();
  await expect(page.locator('.user-name')).toContainText(user.name);
});
```

### Tests with Mocks

```javascript
// tests/api-mock.spec.js
const { test, expect } = require('@playwright/test');

test('user can see products from API', async ({ page }) => {
  // Mock API
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
  
  // Go to products page
  await page.goto('/products');
  
  // Check that mocked products are displayed
  await expect(page.locator('.product-item')).toHaveCount(2);
  await expect(page.locator('.product-item:first-child')).toContainText('Product 1');
  await expect(page.locator('.product-item:last-child')).toContainText('Product 2');
});
```

### Tests with File Upload

```javascript
// tests/file-upload.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');

test('user can upload a file', async ({ page }) => {
  await page.goto('/upload');
  
  // Select a file
  const filePath = path.join(__dirname, 'fixtures', 'test-file.txt');
  await page.setInputFiles('input[type="file"]', filePath);
  
  // Click upload button
  await page.click('button:has-text("Upload")');
  
  // Check success message
  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('.success-message')).toContainText('File uploaded successfully');
});
```

---

## 🟠 Patterns and Best Practices

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
  
  // Check redirect to dashboard
  await expect(page).toHaveURL('/dashboard');
  
  // Check that user is logged in
  await expect(dashboardPage.userMenu).toBeVisible();
  await expect(dashboardPage.userName).toContainText('User');
});
```

### Tests with Test Data

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
      // Login with user
      await page.goto('/login');
      await page.fill('input[name="email"]', user.email);
      await page.fill('input[name="password"]', user.password);
      await page.click('button[type="submit"]');
      
      // Check redirect
      await expect(page).toHaveURL('/dashboard');
      
      // Check features according to role
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

### Tests with Hooks

```javascript
// tests/hooks/setup.js
const { test } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Common setup before each test
  await page.addInitScript(() => {
    // Disable animations for faster tests
    document.documentElement.style.setProperty('--animation-duration', '0s');
    document.documentElement.style.setProperty('--transition-duration', '0s');
  });
});

test.afterEach(async ({ page }) => {
  // Cleanup after each test
  await page.evaluate(() => {
    // Clear localStorage
    localStorage.clear();
    // Clear sessionStorage
    sessionStorage.clear();
  });
});

// tests/cleanup.spec.js
const { test, expect } = require('@playwright/test');

test('test with cleanup', async ({ page }) => {
  // Setup and cleanup are automatically applied
  await page.goto('/');
  await page.click('button:has-text("Click me")');
  await expect(page.locator('.result')).toBeVisible();
});
```

---

## 🔴 Complex Tests

### Performance Tests

```javascript
// tests/performance.spec.js
const { test, expect } = require('@playwright/test');

test('page loads within performance budget', async ({ page }) => {
  // Measure performance metrics
  const startTime = Date.now();
  
  await page.goto('/');
  
  // Wait for page to be completely loaded
  await page.waitForLoadState('networkidle');
  
  const endTime = Date.now();
  const loadTime = endTime - startTime;
  
  // Check that load time is acceptable
  expect(loadTime).toBeLessThan(3000); // Less than 3 seconds
  
  // Check Web Vitals metrics
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

### Visual Regression Tests

```javascript
// tests/visual-regression.spec.js
const { test, expect } = require('@playwright/test');

test('visual regression test', async ({ page }) => {
  await page.goto('/');
  
  // Take a screenshot of the entire page
  await expect(page).toHaveScreenshot('homepage.png');
  
  // Take a screenshot of a specific element
  await expect(page.locator('.hero-section')).toHaveScreenshot('hero-section.png');
  
  // Test on different screen sizes
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile
  await expect(page).toHaveScreenshot('homepage-mobile.png');
  
  await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
  await expect(page).toHaveScreenshot('homepage-desktop.png');
});
```

### Accessibility Tests

```javascript
// tests/accessibility.spec.js
const { test, expect } = require('@playwright/test');

test('page is accessible', async ({ page }) => {
  await page.goto('/');
  
  // Check accessibility attributes
  await expect(page.locator('h1')).toHaveAttribute('id');
  await expect(page.locator('nav')).toHaveAttribute('role', 'navigation');
  await expect(page.locator('main')).toHaveAttribute('role', 'main');
  
  // Check form labels
  await expect(page.locator('input[name="email"]')).toHaveAttribute('aria-label');
  await expect(page.locator('input[name="password"]')).toHaveAttribute('aria-label');
  
  // Check keyboard navigation
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  
  // Check color contrasts
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

### Database Tests

```javascript
// tests/database.spec.js
const { test, expect } = require('@playwright/test');
const { Pool } = require('pg');

// Test database configuration
const pool = new Pool({
  host: process.env.TEST_DB_HOST || 'localhost',
  port: process.env.TEST_DB_PORT || 5432,
  database: process.env.TEST_DB_NAME || 'test_db',
  user: process.env.TEST_DB_USER || 'test_user',
  password: process.env.TEST_DB_PASSWORD || 'test_password'
});

test.beforeAll(async () => {
  // Database setup
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
  // Database cleanup
  await pool.query('DROP TABLE IF EXISTS users');
  await pool.end();
});

test.beforeEach(async () => {
  // Cleanup before each test
  await pool.query('DELETE FROM users');
});

test('user can register and data is saved to database', async ({ page }) => {
  // Go to registration page
  await page.goto('/register');
  
  // Fill the form
  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('input[name="password"]', 'password123');
  
  // Submit the form
  await page.click('button[type="submit"]');
  
  // Check redirect
  await expect(page).toHaveURL('/dashboard');
  
  // Check that user is saved to database
  const result = await pool.query('SELECT * FROM users WHERE email = $1', ['john@example.com']);
  expect(result.rows).toHaveLength(1);
  expect(result.rows[0].name).toBe('John Doe');
});
```

---

## ⚫ Performance and CI/CD

### Optimized Configuration

```javascript
// playwright.config.expert.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.{js,ts}',
  
  // Optimized timeouts
  timeout: 60 * 1000,
  expect: { timeout: 10 * 1000 },
  
  // Default configuration
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    headless: process.env.CI ? true : false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    
    // Performance optimizations
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    
    // Network configuration
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  },
  
  // Optimized projects
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
  
  // Test server
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  },
  
  // Worker configuration
  workers: process.env.CI ? 2 : 4,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'test-results.xml' }]
  ],
  
  // Retry configuration
  retries: process.env.CI ? 2 : 0,
  
  // Timeout configuration
  globalTimeout: 60 * 60 * 1000, // 1 hour
  timeout: 30 * 1000, // 30 seconds per test
  expect: { timeout: 10 * 1000 } // 10 seconds for assertions
});
```

### Load Testing

```javascript
// tests/load-testing.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Load Testing', () => {
  test('should handle concurrent users', async ({ page }) => {
    const concurrentUsers = 10;
    const requestsPerUser = 5;
    
    const startTime = Date.now();
    
    // Simulate concurrent users
    const userPromises = Array.from({ length: concurrentUsers }, (_, userId) => {
      return simulateUserSession(page, userId, requestsPerUser);
    });
    
    const results = await Promise.all(userPromises);
    const endTime = Date.now();
    
    const totalRequests = concurrentUsers * requestsPerUser;
    const totalTime = endTime - startTime;
    const requestsPerSecond = totalRequests / (totalTime / 1000);
    
    expect(requestsPerSecond).toBeGreaterThan(10); // At least 10 req/s
    expect(results.every(result => result.success)).toBe(true);
  });
});

async function simulateUserSession(page, userId, requestCount) {
  try {
    for (let i = 0; i < requestCount; i++) {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.click('button:has-text("Click me")');
      await page.waitForTimeout(100); // Simulate thinking time
    }
    return { success: true, userId };
  } catch (error) {
    return { success: false, userId, error: error.message };
  }
}
```

### CI/CD Configuration

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

## 📚 Resources

### Official Documentation
- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Configuration](https://playwright.dev/docs/test-configuration)

### Tools and Extensions
- [Playwright UI](https://playwright.dev/docs/test-ui)
- [Playwright Inspector](https://playwright.dev/docs/debug)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)

### Patterns and Best Practices
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Testing Patterns](https://playwright.dev/docs/test-patterns)

### Integration and CI/CD
- [CI/CD Integration](https://playwright.dev/docs/ci)
- [Docker Integration](https://playwright.dev/docs/docker)
- [GitHub Actions](https://playwright.dev/docs/ci#github-actions)

---

*Last updated: January 2024*
