# 🧪 Jest - Guide Complet

> **Jest** est un framework de test JavaScript complet développé par Facebook. Il offre une solution tout-en-un pour les tests unitaires, d'intégration et de snapshot avec une configuration minimale.

## 📋 Table des matières
- [🎯 Tableaux de Référence](#-tableaux-de-référence-complète-jest)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation et Configuration](#️-installation-et-configuration)
- [🟢 Premiers Tests](#-débutant---premiers-tests)
- [🟡 Tests Avancés](#-intermédiaire---tests-avancés)
- [🟠 Patterns et Bonnes Pratiques](#-confirmé---patterns-et-bonnes-pratiques)
- [🔴 Senior - Tests Complexes](#-senior---tests-complexes)
- [⚫ Expert - Optimisation et Performance](#-expert---optimisation-et-performance)
- [📚 Ressources](#-ressources)

---

## 🎯 Tableaux de Référence Complète Jest

### 🎯 Matchers de Base

| Matcher | Description | Exemple |
|---------|-------------|---------|
| **toBe()** | Égalité stricte (===) | `expect(2 + 2).toBe(4)` |
| **toEqual()** | Égalité profonde | `expect({a: 1}).toEqual({a: 1})` |
| **toBeNull()** | Vérifie si null | `expect(null).toBeNull()` |
| **toBeUndefined()** | Vérifie si undefined | `expect(undefined).toBeUndefined()` |
| **toBeDefined()** | Vérifie si défini | `expect(5).toBeDefined()` |
| **toBeTruthy()** | Vérifie si truthy | `expect(1).toBeTruthy()` |
| **toBeFalsy()** | Vérifie si falsy | `expect(0).toBeFalsy()` |
| **toBeGreaterThan()** | Plus grand que | `expect(10).toBeGreaterThan(5)` |
| **toBeLessThan()** | Plus petit que | `expect(3).toBeLessThan(5)` |
| **toBeCloseTo()** | Proche de (pour décimaux) | `expect(0.1 + 0.2).toBeCloseTo(0.3)` |

### 🎯 Matchers de Chaînes

| Matcher | Description | Exemple |
|---------|-------------|---------|
| **toMatch()** | Correspond à une regex | `expect('Hello').toMatch(/Hello/)` |
| **toContain()** | Contient une sous-chaîne | `expect('Hello World').toContain('World')` |
| **toHaveLength()** | Longueur spécifique | `expect('Hello').toHaveLength(5)` |

### 🎯 Matchers de Tableaux

| Matcher | Description | Exemple |
|---------|-------------|---------|
| **toContain()** | Contient un élément | `expect([1, 2, 3]).toContain(2)` |
| **toHaveLength()** | Longueur du tableau | `expect([1, 2, 3]).toHaveLength(3)` |
| **toContainEqual()** | Contient un objet égal | `expect([{a: 1}]).toContainEqual({a: 1})` |

### 🎯 Matchers d'Objets

| Matcher | Description | Exemple |
|---------|-------------|---------|
| **toHaveProperty()** | A une propriété | `expect({a: 1}).toHaveProperty('a')` |
| **toHavePropertyValue()** | A une propriété avec valeur | `expect({a: 1}).toHavePropertyValue('a', 1)` |
| **toMatchObject()** | Correspond partiellement | `expect({a: 1, b: 2}).toMatchObject({a: 1})` |

### 🎯 Matchers d'Exceptions

| Matcher | Description | Exemple |
|---------|-------------|---------|
| **toThrow()** | Lance une exception | `expect(() => { throw new Error() }).toThrow()` |
| **toThrowError()** | Lance une erreur spécifique | `expect(() => { throw new Error('test') }).toThrowError('test')` |

### 🎯 Matchers de Promesses

| Matcher | Description | Exemple |
|---------|-------------|---------|
| **resolves** | Promesse résolue | `expect(Promise.resolve(1)).resolves.toBe(1)` |
| **rejects** | Promesse rejetée | `expect(Promise.reject('error')).rejects.toBe('error')` |

### 🎯 Configuration Jest

| Option | Description | Valeur par défaut |
|--------|-------------|-------------------|
| **testEnvironment** | Environnement de test | `'node'` |
| **setupFilesAfterEnv** | Fichiers de setup | `[]` |
| **testMatch** | Patterns de fichiers de test | `['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js']` |
| **collectCoverage** | Collecter la couverture | `false` |
| **coverageDirectory** | Dossier de couverture | `'coverage'` |
| **coverageReporters** | Formats de rapport | `['text', 'lcov']` |
| **transform** | Transformations | `{}` |
| **moduleNameMapping** | Mapping de modules | `{}` |

### 🎯 Commandes CLI Jest

| Commande | Description | Exemple |
|----------|-------------|---------|
| **jest** | Lancer tous les tests | `jest` |
| **jest --watch** | Mode watch | `jest --watch` |
| **jest --coverage** | Avec couverture | `jest --coverage` |
| **jest --verbose** | Mode verbeux | `jest --verbose` |
| **jest --testNamePattern** | Filtrer par nom | `jest --testNamePattern="user"` |
| **jest --testPathPattern** | Filtrer par chemin | `jest --testPathPattern="utils"` |
| **jest --updateSnapshot** | Mettre à jour snapshots | `jest --updateSnapshot` |

---

## 🚀 Introduction

Jest est un framework de test JavaScript complet qui facilite l'écriture, l'exécution et la maintenance des tests. Il est particulièrement populaire dans l'écosystème React et Node.js.

### Qu'est-ce que Jest ?
Jest est un framework de test "zero-configuration" qui fournit tout ce dont vous avez besoin pour tester du code JavaScript, incluant les assertions, les mocks, les spies, et la couverture de code.

### Pourquoi choisir Jest ?
- **🎯 Zero Configuration** : Fonctionne immédiatement sans configuration
- **⚡ Performance** : Tests parallèles et optimisés
- **🔧 Rich API** : Matchers puissants et API complète
- **📊 Coverage** : Couverture de code intégrée
- **🔄 Snapshot Testing** : Tests de régression visuels
- **🎭 Mocking** : Système de mocks avancé
- **📱 Watch Mode** : Re-exécution automatique des tests

---

## ⚙️ Installation et Configuration

### Installation

```bash
# Installation locale (recommandée)
npm install --save-dev jest

# Installation globale
npm install -g jest

# Avec TypeScript
npm install --save-dev jest @types/jest ts-jest typescript
```

### Configuration de base

```javascript
// jest.config.js
module.exports = {
  // Environnement de test
  testEnvironment: 'node', // ou 'jsdom' pour React
  
  // Patterns de fichiers de test
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Dossier de couverture
  coverageDirectory: 'coverage',
  
  // Seuils de couverture
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Transformations
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  
  // Extensions de fichiers
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Mapping de modules
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

---

## 🟢 Premiers Tests

### Premier test simple

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// math.test.js
const { add, subtract } = require('./math');

describe('Math functions', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('subtracts 5 - 3 to equal 2', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
```

### Tests avec describe et it

```javascript
describe('User Service', () => {
  // Avant tous les tests
  beforeAll(() => {
    console.log('Avant tous les tests');
  });

  // Avant chaque test
  beforeEach(() => {
    console.log('Avant chaque test');
  });

  // Après chaque test
  afterEach(() => {
    console.log('Après chaque test');
  });

  // Après tous les tests
  afterAll(() => {
    console.log('Après tous les tests');
  });

  it('should create a user', () => {
    // Test implementation
  });

  it('should update a user', () => {
    // Test implementation
  });
});
```

### Tests asynchrones

```javascript
// async-functions.js
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'John Doe' });
    }, 100);
  });
}

async function fetchUserAsync(id) {
  const user = await fetchUser(id);
  return user;
}

module.exports = { fetchUser, fetchUserAsync };

// async-functions.test.js
const { fetchUser, fetchUserAsync } = require('./async-functions');

describe('Async functions', () => {
  // Test avec Promise
  test('fetchUser returns a user', () => {
    return fetchUser(1).then(user => {
      expect(user).toEqual({ id: 1, name: 'John Doe' });
    });
  });

  // Test avec async/await
  test('fetchUserAsync returns a user', async () => {
    const user = await fetchUserAsync(1);
    expect(user).toEqual({ id: 1, name: 'John Doe' });
  });

  // Test avec resolves
  test('fetchUser resolves with user', () => {
    expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'John Doe' });
  });
});
```

---

## 🟡 Tests Avancés

### Mocking de fonctions

```javascript
// user-service.js
const axios = require('axios');

class UserService {
  async getUser(id) {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData) {
    const response = await axios.post('/users', userData);
    return response.data;
  }
}

module.exports = UserService;

// user-service.test.js
const UserService = require('./user-service');
const axios = require('axios');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  test('should fetch user', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    mockedAxios.get.mockResolvedValue({ data: mockUser });

    const user = await userService.getUser(1);

    expect(mockedAxios.get).toHaveBeenCalledWith('/users/1');
    expect(user).toEqual(mockUser);
  });

  test('should create user', async () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' };
    const mockResponse = { id: 2, ...userData };
    mockedAxios.post.mockResolvedValue({ data: mockResponse });

    const user = await userService.createUser(userData);

    expect(mockedAxios.post).toHaveBeenCalledWith('/users', userData);
    expect(user).toEqual(mockResponse);
  });
});
```

### Mocking de modules

```javascript
// email-service.js
class EmailService {
  sendEmail(to, subject, body) {
    // Implementation réelle
    console.log(`Sending email to ${to}: ${subject}`);
    return true;
  }
}

module.exports = EmailService;

// user-controller.js
const EmailService = require('./email-service');

class UserController {
  constructor() {
    this.emailService = new EmailService();
  }

  async createUser(userData) {
    // Logique de création d'utilisateur
    const user = { id: 1, ...userData };
    
    // Envoi d'email de bienvenue
    this.emailService.sendEmail(user.email, 'Welcome!', 'Welcome to our app');
    
    return user;
  }
}

module.exports = UserController;

// user-controller.test.js
const UserController = require('./user-controller');

// Mock du module EmailService
jest.mock('./email-service', () => {
  return jest.fn().mockImplementation(() => ({
    sendEmail: jest.fn()
  }));
});

describe('UserController', () => {
  let userController;
  let mockEmailService;

  beforeEach(() => {
    userController = new UserController();
    mockEmailService = userController.emailService;
  });

  test('should create user and send welcome email', async () => {
    const userData = { name: 'John', email: 'john@example.com' };
    
    const user = await userController.createUser(userData);
    
    expect(user).toEqual({ id: 1, ...userData });
    expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
      'john@example.com',
      'Welcome!',
      'Welcome to our app'
    );
  });
});
```

### Tests de snapshots

```javascript
// component.js
function createUserCard(user) {
  return `
    <div class="user-card">
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Age: ${user.age}</p>
    </div>
  `;
}

module.exports = { createUserCard };

// component.test.js
const { createUserCard } = require('./component');

describe('createUserCard', () => {
  test('creates user card with correct HTML', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };

    const html = createUserCard(user);
    expect(html).toMatchSnapshot();
  });
});
```

---

## 🟠 Patterns et Bonnes Pratiques

### Tests de composants React

```javascript
// UserCard.jsx
import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card" data-testid="user-card">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <div className="actions">
        <button onClick={() => onEdit(user.id)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;

// UserCard.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders user information', () => {
    render(
      <UserCard 
        user={mockUser} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Age: 30')).toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <UserCard 
        user={mockUser} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <UserCard 
        user={mockUser} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
```

### Tests d'intégration

```javascript
// integration/user-api.test.js
const request = require('supertest');
const app = require('../app');

describe('User API Integration', () => {
  test('GET /users should return all users', async () => {
    const response = await request(app)
      .get('/users')
      .expect(200);

    expect(response.body).toHaveProperty('users');
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  test('POST /users should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
  });

  test('PUT /users/:id should update user', async () => {
    const userData = {
      name: 'John Updated',
      email: 'john.updated@example.com'
    };

    const response = await request(app)
      .put('/users/1')
      .send(userData)
      .expect(200);

    expect(response.body.name).toBe(userData.name);
    expect(response.body.email).toBe(userData.email);
  });
});
```

### Tests avec base de données

```javascript
// database.test.js
const { Pool } = require('pg');
const UserRepository = require('./user-repository');

describe('UserRepository', () => {
  let pool;
  let userRepository;

  beforeAll(async () => {
    // Configuration de test
    pool = new Pool({
      host: process.env.TEST_DB_HOST || 'localhost',
      port: process.env.TEST_DB_PORT || 5432,
      database: process.env.TEST_DB_NAME || 'test_db',
      user: process.env.TEST_DB_USER || 'test_user',
      password: process.env.TEST_DB_PASSWORD || 'test_password'
    });

    userRepository = new UserRepository(pool);
    
    // Création des tables de test
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
  });

  afterAll(async () => {
    // Nettoyage
    await pool.query('DROP TABLE IF EXISTS users');
    await pool.end();
  });

  beforeEach(async () => {
    // Nettoyage avant chaque test
    await pool.query('DELETE FROM users');
  });

  test('should create a user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const user = await userRepository.create(userData);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
  });

  test('should find user by id', async () => {
    const userData = {
      name: 'Jane Doe',
      email: 'jane@example.com'
    };

    const createdUser = await userRepository.create(userData);
    const foundUser = await userRepository.findById(createdUser.id);

    expect(foundUser).toEqual(createdUser);
  });
});
```

---

## 🔴 Senior - Tests Complexes

### Tests de performance

```javascript
// performance.test.js
describe('Performance Tests', () => {
  test('should process large dataset within time limit', async () => {
    const startTime = Date.now();
    
    // Simulation d'un traitement lourd
    const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      value: Math.random()
    }));

    const result = largeDataset
      .filter(item => item.value > 0.5)
      .map(item => ({ ...item, processed: true }));

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    expect(result).toHaveLength(expect.any(Number));
    expect(executionTime).toBeLessThan(1000); // Moins de 1 seconde
  });

  test('should handle concurrent requests', async () => {
    const concurrentRequests = 100;
    const requests = Array.from({ length: concurrentRequests }, (_, i) => 
      fetch(`/api/users/${i}`)
    );

    const startTime = Date.now();
    const responses = await Promise.all(requests);
    const endTime = Date.now();

    const successCount = responses.filter(r => r.ok).length;
    const executionTime = endTime - startTime;

    expect(successCount).toBe(concurrentRequests);
    expect(executionTime).toBeLessThan(5000); // Moins de 5 secondes
  });
});
```

### Tests de sécurité

```javascript
// security.test.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

describe('Security Tests', () => {
  test('should hash passwords securely', async () => {
    const password = 'mySecretPassword123';
    const saltRounds = 12;
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword).toMatch(/^\$2[aby]\$\d+\$.{53}$/); // Format bcrypt
    
    const isValid = await bcrypt.compare(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  test('should generate valid JWT tokens', () => {
    const payload = { userId: 123, role: 'admin' };
    const secret = 'your-secret-key';
    const options = { expiresIn: '1h' };
    
    const token = jwt.sign(payload, secret, options);
    const decoded = jwt.verify(token, secret);
    
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.role).toBe(payload.role);
    expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  test('should prevent SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    
    // Test avec une requête paramétrée (sécurisée)
    const safeQuery = 'SELECT * FROM users WHERE name = $1';
    const result = await pool.query(safeQuery, [maliciousInput]);
    
    // La requête ne devrait pas causer d'erreur
    expect(result.rows).toBeDefined();
  });
});
```

### Tests de régression

```javascript
// regression.test.js
describe('Regression Tests', () => {
  test('should maintain backward compatibility', () => {
    const oldApiResponse = {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      },
      metadata: {
        version: '1.0.0',
        timestamp: '2023-01-01T00:00:00Z'
      }
    };

    // Test que l'API retourne toujours le même format
    expect(oldApiResponse).toHaveProperty('user');
    expect(oldApiResponse).toHaveProperty('metadata');
    expect(oldApiResponse.user).toHaveProperty('id');
    expect(oldApiResponse.user).toHaveProperty('name');
    expect(oldApiResponse.user).toHaveProperty('email');
  });

  test('should handle edge cases correctly', () => {
    // Test avec des valeurs limites
    expect(() => processUser(null)).not.toThrow();
    expect(() => processUser(undefined)).not.toThrow();
    expect(() => processUser('')).not.toThrow();
    expect(() => processUser(0)).not.toThrow();
    expect(() => processUser(false)).not.toThrow();
  });
});
```

---

## ⚫ Expert - Optimisation et Performance

### Configuration avancée

```javascript
// jest.config.expert.js
module.exports = {
  // Configuration de base
  testEnvironment: 'node',
  
  // Optimisations de performance
  maxWorkers: '50%', // Utilise 50% des CPU disponibles
  workerIdleMemoryLimit: '512MB',
  
  // Cache et transformations
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // Transformations optimisées
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      isolatedModules: true,
      tsconfig: {
        target: 'es2020',
        module: 'commonjs'
      }
    }]
  },
  
  // Modules et résolution
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Setup et teardown
  globalSetup: '<rootDir>/tests/setup/global-setup.js',
  globalTeardown: '<rootDir>/tests/setup/global-teardown.js',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
  
  // Couverture avancée
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{js,ts}',
    '!src/**/*.spec.{js,ts}'
  ],
  
  coverageThreshold: {
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
  },
  
  // Reporters personnalisés
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports',
      outputName: 'junit.xml'
    }],
    ['jest-html-reporters', {
      publicPath: 'reports',
      filename: 'report.html'
    }]
  ],
  
  // Tests parallèles optimisés
  testSequencer: '<rootDir>/tests/sequencer.js',
  
  // Timeouts
  testTimeout: 30000,
  
  // Verbose et détails
  verbose: true,
  detectOpenHandles: true,
  forceExit: true
};
```

### Tests de charge et stress

```javascript
// load-testing.test.js
const { performance } = require('perf_hooks');

describe('Load Testing', () => {
  test('should handle high concurrent load', async () => {
    const concurrentUsers = 1000;
    const requestsPerUser = 10;
    
    const startTime = performance.now();
    
    const userPromises = Array.from({ length: concurrentUsers }, (_, userId) => {
      return Promise.all(
        Array.from({ length: requestsPerUser }, (_, requestId) => 
          simulateUserRequest(userId, requestId)
        )
      );
    });
    
    const results = await Promise.all(userPromises);
    const endTime = performance.now();
    
    const totalRequests = concurrentUsers * requestsPerUser;
    const totalTime = endTime - startTime;
    const requestsPerSecond = totalRequests / (totalTime / 1000);
    
    expect(requestsPerSecond).toBeGreaterThan(100); // Au moins 100 req/s
  });

  test('should maintain performance under memory pressure', async () => {
    const memoryBefore = process.memoryUsage();
    
    // Simulation de traitement intensif
    const largeData = Array.from({ length: 1000000 }, (_, i) => ({
      id: i,
      data: new Array(100).fill(Math.random())
    }));
    
    const processedData = largeData
      .filter(item => item.id % 2 === 0)
      .map(item => ({ ...item, processed: true }));
    
    const memoryAfter = process.memoryUsage();
    const memoryIncrease = memoryAfter.heapUsed - memoryBefore.heapUsed;
    
    expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024); // Moins de 100MB
    expect(processedData.length).toBe(500000);
  });
});
```

### Tests de monitoring et observabilité

```javascript
// monitoring.test.js
describe('Monitoring and Observability', () => {
  test('should emit correct metrics', async () => {
    const metrics = [];
    
    // Mock du système de métriques
    const mockMetrics = {
      counter: jest.fn((name, value) => {
        metrics.push({ type: 'counter', name, value });
      }),
      histogram: jest.fn((name, value) => {
        metrics.push({ type: 'histogram', name, value });
      }),
      gauge: jest.fn((name, value) => {
        metrics.push({ type: 'gauge', name, value });
      })
    };
    
    // Simulation d'opération métier
    await processUserRegistration({
      name: 'John Doe',
      email: 'john@example.com'
    }, mockMetrics);
    
    expect(metrics).toContainEqual({
      type: 'counter',
      name: 'user.registration.attempts',
      value: 1
    });
    
    expect(metrics).toContainEqual({
      type: 'histogram',
      name: 'user.registration.duration',
      value: expect.any(Number)
    });
  });

  test('should log structured data', async () => {
    const logs = [];
    
    // Mock du logger
    const mockLogger = {
      info: jest.fn((message, meta) => {
        logs.push({ level: 'info', message, meta });
      }),
      error: jest.fn((message, meta) => {
        logs.push({ level: 'error', message, meta });
      })
    };
    
    try {
      await riskyOperation(mockLogger);
    } catch (error) {
      // Expected error
    }
    
    expect(logs).toContainEqual({
      level: 'info',
      message: 'Operation started',
      meta: expect.objectContaining({
        operationId: expect.any(String),
        timestamp: expect.any(String)
      })
    });
  });
});
```

---

## 📚 Ressources

### Documentation officielle
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest API Reference](https://jestjs.io/docs/api)
- [Jest Configuration](https://jestjs.io/docs/configuration)

### Outils et extensions
- [Jest Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM](https://github.com/testing-library/jest-dom)
- [Jest Coverage](https://jestjs.io/docs/cli#--coverage)

### Patterns et bonnes pratiques
- [Jest Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest Patterns](https://github.com/sapegin/jest-cheat-sheet)

---

*Dernière mise à jour : Janvier 2024*
