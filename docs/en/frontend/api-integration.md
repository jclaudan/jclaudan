# API Integration Guide - Frontend

## Introduction

This guide covers API integration in frontend applications, comparing `fetch` vs `axios`, authentication management, error handling, and CORS configuration.

## fetch vs axios

### fetch API

```javascript
// Advantages
- Native browser API
- Built-in Promises
- Lightweight (no external dependency)
- Modern support in all browsers

// Disadvantages
- No built-in interceptors
- Manual error handling
- No automatic timeout
- Requires polyfill for IE
```

#### Basic usage

```javascript
// GET request
async function fetchUsers() {
  try {
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// POST request
async function createUser(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
```

#### Advanced fetch wrapper

```javascript
class ApiClient {
  constructor(baseURL, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.defaultHeaders,
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Usage
const apiClient = new ApiClient('https://api.example.com');
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', { name: 'John', email: 'john@example.com' });
```

### axios

```javascript
// Advantages
- Built-in interceptors
- Automatic error handling
- Timeout support
- Automatic data transformation
- Concurrent request support

// Disadvantages
- External dependency
- Larger bundle size
- Additional configuration required
```

#### Installation and configuration

```bash
npm install axios
```

```javascript
import axios from 'axios';

// Global configuration
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptors
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add timestamp
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptors
apiClient.interceptors.response.use(
  (response) => {
    // Log performance
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    console.log(`Request to ${response.config.url} took ${duration}ms`);
    
    return response;
  },
  (error) => {
    // Global error handling
    if (error.response?.status === 401) {
      // Redirect to login page
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

#### Usage with axios

```javascript
// GET request
async function fetchUsers() {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// POST request
async function createUser(userData) {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Concurrent requests
async function fetchUserData(userId) {
  try {
    const [user, posts, comments] = await Promise.all([
      apiClient.get(`/users/${userId}`),
      apiClient.get(`/users/${userId}/posts`),
      apiClient.get(`/users/${userId}/comments`)
    ]);
    
    return {
      user: user.data,
      posts: posts.data,
      comments: comments.data
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
```

## Authentication

### JWT Tokens

```javascript
// Store token
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Get token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Remove token
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Check token validity
const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Automatic token refresh
const refreshToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh');
    const newToken = response.data.token;
    setAuthToken(newToken);
    return newToken;
  } catch (error) {
    removeAuthToken();
    window.location.href = '/login';
    throw error;
  }
};
```

### Authentication interceptors

```javascript
// Interceptor for automatic refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

### Role and permission management

```javascript
// Check permissions
const hasPermission = (requiredPermission) => {
  const token = getAuthToken();
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userPermissions = payload.permissions || [];
    
    return userPermissions.includes(requiredPermission);
  } catch (error) {
    return false;
  }
};

// HOC for route protection
const withPermission = (WrappedComponent, requiredPermission) => {
  return (props) => {
    if (!hasPermission(requiredPermission)) {
      return <div>Access denied</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Usage
const AdminPanel = withPermission(AdminComponent, 'admin:read');
```

## Error Handling

### Error types

```javascript
class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}
```

### Centralized error handling

```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Server response error
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new ValidationError(data.message || 'Invalid data', data.errors);
      case 401:
        throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
      case 403:
        throw new ApiError('Forbidden', 403, 'FORBIDDEN');
      case 404:
        throw new ApiError('Not found', 404, 'NOT_FOUND');
      case 500:
        throw new ApiError('Server error', 500, 'SERVER_ERROR');
      default:
        throw new ApiError(data.message || 'Unknown error', status);
    }
  } else if (error.request) {
    // Network error
    throw new NetworkError('Unable to contact server');
  } else {
    // Other error
    throw new Error(error.message);
  }
};

// Usage
try {
  const data = await apiClient.get('/users');
  return data;
} catch (error) {
  handleApiError(error);
}
```

### Automatic retry

```javascript
const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

// Usage
const fetchUsersWithRetry = () => {
  return retryRequest(() => apiClient.get('/users'));
};
```

## CORS Configuration

### Server side (NestJS)

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS configuration
  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
```

### Client side

```javascript
// Axios configuration with CORS
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true, // Include cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// CORS error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('CORS or network error');
      // Display appropriate error message
    }
    return Promise.reject(error);
  }
);
```

## Loading states and UX

### Loading state management

```javascript
// Custom hook for loading states
const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, execute };
};

// Usage
const UserList = () => {
  const { loading, error, data, execute } = useApiCall();

  const fetchUsers = () => {
    execute(() => apiClient.get('/users'));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <button onClick={fetchUsers}>Load users</button>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Skeleton loading

```javascript
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

const UserCard = ({ user, loading }) => {
  if (loading) return <SkeletonLoader />;
  
  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};
```

## Best practices

### 1. Centralized configuration

```javascript
// config/api.js
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};
```

### 2. TypeScript types

```typescript
// types/api.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

// Typed services
export class UserService {
  static async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await apiClient.get('/users');
    return response.data;
  }

  static async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    const response = await apiClient.post('/users', userData);
    return response.data;
  }
}
```

### 3. Testing

```javascript
// tests/api.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from '../UserList';
import * as apiClient from '../apiClient';

// Mock axios
jest.mock('../apiClient');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('UserList', () => {
  it('should display users when API call succeeds', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    mockedApiClient.get.mockResolvedValue({ data: mockUsers });

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('should display error when API call fails', async () => {
    mockedApiClient.get.mockRejectedValue(new Error('Network error'));

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });
});
```

### 4. Performance optimization

```javascript
// Debounce for searches
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Request caching
const queryCache = new Map();

const cachedApiCall = async (key, apiCall) => {
  if (queryCache.has(key)) {
    return queryCache.get(key);
  }

  const result = await apiCall();
  queryCache.set(key, result);
  
  // Invalidate cache after 5 minutes
  setTimeout(() => {
    queryCache.delete(key);
  }, 5 * 60 * 1000);

  return result;
};
```

## Conclusion

This guide covers the essential aspects of API integration in frontend applications:

- **fetch vs axios**: Choice based on project needs
- **Authentication**: Token and permission management
- **Error handling**: Centralized and robust approach
- **CORS**: Configuration for cross-origin communication
- **UX**: Loading states and user feedback
- **Best practices**: Configuration, types, testing and performance

These practices ensure robust API integration and optimal user experience.



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

