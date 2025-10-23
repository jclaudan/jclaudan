# 🧪 Jest - Complete Guide

> **Jest** is a comprehensive JavaScript testing framework developed by Facebook. It offers an all-in-one solution for unit, integration, and snapshot testing with minimal configuration.

## 📋 Table of Contents
- [🎯 Reference Tables](#-complete-jest-reference-tables)
- [🚀 Introduction](#-introduction)
- [⚙️ Installation and Configuration](#️-installation-and-configuration)
- [🟢 First Tests](#-beginner---first-tests)
- [🟡 Advanced Tests](#-intermediate---advanced-tests)
- [🟠 Patterns and Best Practices](#-confirmed---patterns-and-best-practices)
- [🔴 Complex Tests](#-senior---complex-tests)
- [⚫ Optimization and Performance](#-expert---optimization-and-performance)
- [📚 Resources](#-resources)

---

## 🎯 Complete Jest Reference Tables

### 🎯 Basic Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| **toBe()** | Strict equality (===) | `expect(2 + 2).toBe(4)` |
| **toEqual()** | Deep equality | `expect({a: 1}).toEqual({a: 1})` |
| **toBeNull()** | Check if null | `expect(null).toBeNull()` |
| **toBeUndefined()** | Check if undefined | `expect(undefined).toBeUndefined()` |
| **toBeDefined()** | Check if defined | `expect(5).toBeDefined()` |
| **toBeTruthy()** | Check if truthy | `expect(1).toBeTruthy()` |
| **toBeFalsy()** | Check if falsy | `expect(0).toBeFalsy()` |
| **toBeGreaterThan()** | Greater than | `expect(10).toBeGreaterThan(5)` |
| **toBeLessThan()** | Less than | `expect(3).toBeLessThan(5)` |
| **toBeCloseTo()** | Close to (for decimals) | `expect(0.1 + 0.2).toBeCloseTo(0.3)` |

### 🎯 String Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| **toMatch()** | Match regex | `expect('Hello').toMatch(/Hello/)` |
| **toContain()** | Contains substring | `expect('Hello World').toContain('World')` |
| **toHaveLength()** | Specific length | `expect('Hello').toHaveLength(5)` |

### 🎯 Array Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| **toContain()** | Contains element | `expect([1, 2, 3]).toContain(2)` |
| **toHaveLength()** | Array length | `expect([1, 2, 3]).toHaveLength(3)` |
| **toContainEqual()** | Contains equal object | `expect([{a: 1}]).toContainEqual({a: 1})` |

### 🎯 Object Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| **toHaveProperty()** | Has property | `expect({a: 1}).toHaveProperty('a')` |
| **toHavePropertyValue()** | Has property with value | `expect({a coer: 1}).toHavePropertyValue('a', 1)` |
| **toMatchObject()** | Partial match | `expect({a: 1, b: 2}).toMatchObject({a: 1})` |

### 🎯 Exception Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| **toThrow()** | Throws exception | `expect(() => { throw new Error() }).toThrow()` |
| **toThrowError()** | Throws specific error | `expect(() => { throw new Error('test') }).toThrowError('test')` |

### 🎯 Promise Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| **resolves** | Resolved promise | `expect(Promise.resolve(1)).resolves.toBe(1)` |
| **rejects** | Rejected promise | `expect(Promise.reject('error')).rejects.toBe('error')` |

### 🎯 Jest Configuration

| Option | Description | Default Value |
|--------|-------------|---------------|
| **testEnvironment** | Test environment | `'node'` |
| **setupFilesAfterEnv** | Setup files | `[]` |
| **testMatch** | Test file patterns | `['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js']` |
| **collectCoverage** | Collect coverage | `false` |
| **coverageDirectory** | Coverage folder | `'coverage'` |
| **coverageReporters** | Report formats | `['text', 'lcov']` |
| **transform** | Transformations | `{}` |
| **moduleNameMapping** | Module mapping | `{}` |

### 🎯 Jest CLI Commands

| Command | Description | Example |
|---------|-------------|---------|
| **jest** | Run all tests | `jest` |
| **jest --watch** | Watch mode | `jest --watch` |
| **jest --coverage** | With coverage | `jest --coverage` |
| **jest --verbose** | Verbose mode | `jest --verbose` |
| **jest --testNamePattern** | Filter by name | `jest --testNamePattern="user"` |
| **jest --testPathPattern** | Filter by path | `jest --testPathPattern="utils"` |
| **jest --updateSnapshot** | Update snapshots | `jest --updateSnapshot` |

---

## 🚀 Introduction

Jest is a comprehensive JavaScript testing framework that makes it easy to write, run, and maintain tests. It's particularly popular in the React and Node.js ecosystem.

### What is Jest?
Jest is a "zero-configuration" testing framework that provides everything you need to test JavaScript code, including assertions, mocks, spies, and code coverage.

### Why choose Jest?
- **🎯 Zero Configuration**: Works immediately without setup
- **⚡ Performance**: Parallel and optimized tests
- **🔧 Rich API**: Powerful matchers and complete API
- **📊 Coverage**: Built-in code coverage
- **🔄 Snapshot Testing**: Visual regression tests
- **🎭 Mocking**: Advanced mocking system
- **📱 Watch Mode**: Automatic test re-execution

---

## ⚙️ Installation and Configuration

### Installation

```bash
# Local installation (recommended)
npm install --save-dev jest

# Global installation
npm install -g jest

# With TypeScript
npm install --save-dev jest @types/jest ts-jest typescript
```

### Basic Configuration

```javascript
// jest.config.js
module.exports = {
  // Test environment
  testEnvironment: 'node', // or 'jsdom' for React
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/* Subject: I'll continue translating the testing documentation files into English, starting with the Jest guide.

Maintenant, je vais créer la version anglaise du guide Jest :

```javascript
// jest.config.js
module.exports = {
  // Test environment
  testEnvironment: 'node', // or 'jsdom' for React
  
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  
  // Coverage folder
  coverageDirectory: 'coverage',
  
  // Coverage thresholds
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
  
  // File extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Module mapping
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

---

## 🟢 First Tests

### Simple First Test

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

### Tests with describe and it

```javascript
describe('User Service', () => {
  // Before all tests
  beforeAll(() => {
    console.log('Before all tests');
  });

  // Before each test
  beforeEach(() => {
    console.log('Before each test');
  });

  // After each test
  afterEach(() => {
    console.log('After each test');
  });

  // After all tests
  afterAll(() => {
    console.log('After all tests');
  });

  it('should create a user', () => {
    // Test implementation
  });

  it('should update a user', () => {
    // Test implementation
  });
});
```

### Asynchronous Tests

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
  // Test with Promise
  test('fetchUser returns a user', () => {
    return fetchUser(1).then(user => {
      expect(user).toEqual({ id: 1, name: 'John Doe' });
    });
  });

  // Test with async/await
  test('fetchUserAsync returns a user', async () => {
    const user = await fetchUserAsync(1);
    expect(user).toEqual({ id: 1, name: 'John Doe' });
  });

  // Test with resolves
  test('fetchUser resolves with user', () => {
    expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'John Doe' });
  });
});
```

---

## 🟡 Advanced Tests

### Function Mocking

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

### Module Mocking

```javascript
// email-service.js
class EmailService {
  sendEmail(to, subject, body) {
    // Real implementation
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
    // User creation logic
    const user = { id: 1, ...userData };
    
    // Send welcome email
    this.emailService.sendEmail(user.email, 'Welcome!', 'Welcome to our app');
    
    return user;
  }
}

module.exports = UserController;

// user-controller.test.js
const UserController = require('./user-controller');

// Mock EmailService module
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

### Snapshot Tests

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

## 🟠 Patterns and Best Practices

### React Component Tests

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

### Integration Tests

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

### Database Tests

```javascript
// database.test.js
const { Pool } = require('pg');
const UserRepository = require('./user-repository');

describe('UserRepository', () => {
  let pool;
  let userRepository;

  beforeAll(async () => {
    // Test configuration
    pool = new Pool({
      host: process.env.TEST_DB_HOST || 'localhost',
      port: process.env.TEST_DB_PORT || 5432,
      database: process.env.TEST_DB_NAME || 'test_db',
      user: process.env.TEST_DB_USER || 'test_user',
      password: process.env.TEST_DB_PASSWORD || 'test_password'
    });

    userRepository = new UserRepository(pool);
    
    // Create test tables
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
    // Cleanup
    await pool.query('DROP TABLE IF EXISTS users');
    await pool.end();
  });

  beforeEach(async () => {
    // Cleanup before each test
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

## 🔴 Complex Tests

### Performance Tests

```javascript
// performance.test.js
describe('Performance Tests', () => {
  test('should process large dataset within time limit', async () => {
    const startTime = Date.now();
    
    // Simulation of heavy processing
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
    expect(executionTime).toBeLessThan(1000); // Less than 1 second
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
    expect(executionTime).toBeLessThan(5000); // Less than 5 seconds
  });
});
```

### Security Tests

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
    expect(hashedPassword).toMatch(/^\$2[aby]\$\d+\$.{53}$/); // bcrypt format
    
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
    
    // Test with parameterized query (secure)
    const safeQuery = 'SELECT * FROM users WHERE name = $1';
    const result = await pool.query(safeQuery, [maliciousInput]);
    
    // Query should not cause an error
    expect(result.rows).toBeDefined();
  });
});
```

### Regression Tests

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

    // Test that API always returns the same format
    expect(oldApiResponse).toHaveProperty('user');
    expect(oldApiResponse).toHaveProperty('metadata');
    expect(oldApiResponse.user).toHaveProperty('id');
    expect(oldApiResponse.user).toHaveProperty('name');
    expect(oldApiResponse.user).toHaveProperty('email');
  });

  test('should handle edge cases correctly', () => {
    // Test with boundary values
    expect(() => processUser(null)).not.toThrow();
    expect(() => processUser(undefined)).not.toThrow();
    expect(() => processUser('')).not.toThrow();
    expect(() => processUser(0)).not.toThrow();
    expect(() => processUser(false)).not.toThrow();
  });
});
```

---

## ⚫ Optimization and Performance

### Advanced Configuration

```javascript
// jest.config.expert.js
module.exports = {
  // Basic configuration
  testEnvironment: 'node',
  
  // Performance optimizations
  maxWorkers: '50%', // Use 50% of available CPUs
  workerIdleMemoryLimit: '512MB',
  
  // Cache and transformations
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
  
  // Optimized transformations
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      isolatedModules: true,
      tsconfig: {
        target: 'es2020',
        module: 'commonjs'
      }
    }]
  },
  
  // Modules and resolution
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Setup and teardown
  globalSetup: '<rootDir>/tests/setup/global-setup.js',
  globalTeardown: '<rootDir>/tests/setup/global-teardown.js',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js'],
  
  // Advanced coverage
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
  
  // Custom reporters
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
  
  // Optimized parallel tests
  testSequencer: '<rootDir>/tests/sequencer.js',
  
  // Timeouts
  testTimeout: 30000,
  
  // Verbose and details
  verbose: true,
  detectOpenHandles: true,
  forceExit: true
};
```

### Load and Stress Tests

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
    
    expect(requestsPerSecond).toBeGreaterThan(100); // At least 100 req/s
  });

  test('should maintain performance under memory pressure', async () => {
    const memoryBefore = process.memoryUsage();
    
    // Simulation of intensive processing
    const largeData = Array.from({ length: 1000000 }, (_, i) => ({
      id: i,
      data: new Array(100).fill(Math.random())
    }));
    
    const processedData = largeData
      .filter(item => item.id % 2 === 0)
      .map(item => ({ ...item, processed: true }));
    
    const memoryAfter = process.memoryUsage();
    const memoryIncrease = memoryAfter.heapUsed - memoryBefore.heapUsed;
    
    expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024); // Less than 100MB
    expect(processedData.length).toBe(500000);
  });
});
```

### Monitoring and Observability Tests

```javascript
// monitoring.test.js
describe('Monitoring and Observability', () => {
  test('should emit correct metrics', async () => {
    const metrics = [];
    
    // Mock metrics system
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
    
    // Simulation of business operation
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
    
    // Mock logger
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

## 📚 Resources

### Official Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest API Reference](https://jestjs.io/docs/api)
- [Jest Configuration](https://jestjs.io/docs/configuration)

### Tools and Extensions
- [Jest Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM](https://github.com/testing-library/jest-dom)
- [Jest Coverage](https://jestjs.io/docs/cli#--coverage)

### Patterns and Best Practices
- [Jest Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest Patterns](https://github.com/sapegin/jest-cheat-sheet)

---

*Last updated: January 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

