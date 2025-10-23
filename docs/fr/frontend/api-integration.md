# Guide d'Intégration API - Frontend

## Introduction

Ce guide couvre l'intégration d'APIs dans les applications frontend, en comparant `fetch` vs `axios`, la gestion de l'authentification, la gestion des erreurs, et la configuration CORS.

## fetch vs axios

### fetch API

```javascript
// Avantages
- API native du navigateur
- Promises intégrées
- Légère (pas de dépendance externe)
- Support moderne dans tous les navigateurs

// Inconvénients
- Pas d'intercepteurs par défaut
- Gestion des erreurs manuelle
- Pas de timeout automatique
- Nécessite du polyfill pour IE
```

#### Utilisation basique

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

#### Wrapper fetch avancé

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

// Utilisation
const apiClient = new ApiClient('https://api.example.com');
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', { name: 'John', email: 'john@example.com' });
```

### axios

```javascript
// Avantages
- Intercepteurs intégrés
- Gestion automatique des erreurs
- Support des timeouts
- Transformation automatique des données
- Support des requêtes simultanées

// Inconvénients
- Dépendance externe
- Taille du bundle plus importante
- Configuration supplémentaire requise
```

#### Installation et configuration

```bash
npm install axios
```

```javascript
import axios from 'axios';

// Configuration globale
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteurs de requête
apiClient.interceptors.request.use(
  (config) => {
    // Ajouter le token d'authentification
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Ajouter un timestamp
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteurs de réponse
apiClient.interceptors.response.use(
  (response) => {
    // Log des performances
    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    console.log(`Request to ${response.config.url} took ${duration}ms`);
    
    return response;
  },
  (error) => {
    // Gestion globale des erreurs
    if (error.response?.status === 401) {
      // Rediriger vers la page de connexion
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

#### Utilisation avec axios

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

// Requêtes simultanées
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

## Authentification

### Tokens JWT

```javascript
// Stockage du token
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Récupération du token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Suppression du token
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Vérification de la validité du token
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

// Refresh automatique du token
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

### Intercepteurs d'authentification

```javascript
// Intercepteur pour refresh automatique
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

### Gestion des rôles et permissions

```javascript
// Vérification des permissions
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

// HOC pour la protection des routes
const withPermission = (WrappedComponent, requiredPermission) => {
  return (props) => {
    if (!hasPermission(requiredPermission)) {
      return <div>Accès refusé</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Utilisation
const AdminPanel = withPermission(AdminComponent, 'admin:read');
```

## Gestion des erreurs

### Types d'erreurs

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

### Gestion centralisée des erreurs

```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Erreur de réponse du serveur
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new ValidationError(data.message || 'Données invalides', data.errors);
      case 401:
        throw new ApiError('Non authentifié', 401, 'UNAUTHORIZED');
      case 403:
        throw new ApiError('Accès refusé', 403, 'FORBIDDEN');
      case 404:
        throw new ApiError('Ressource non trouvée', 404, 'NOT_FOUND');
      case 500:
        throw new ApiError('Erreur serveur', 500, 'SERVER_ERROR');
      default:
        throw new ApiError(data.message || 'Erreur inconnue', status);
    }
  } else if (error.request) {
    // Erreur de réseau
    throw new NetworkError('Impossible de contacter le serveur');
  } else {
    // Autre erreur
    throw new Error(error.message);
  }
};

// Utilisation
try {
  const data = await apiClient.get('/users');
  return data;
} catch (error) {
  handleApiError(error);
}
```

### Retry automatique

```javascript
const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
};

// Utilisation
const fetchUsersWithRetry = () => {
  return retryRequest(() => apiClient.get('/users'));
};
```

## Configuration CORS

### Côté serveur (NestJS)

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS
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

### Côté client

```javascript
// Configuration axios avec CORS
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true, // Inclure les cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// Gestion des erreurs CORS
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Erreur CORS ou réseau');
      // Afficher un message d'erreur approprié
    }
    return Promise.reject(error);
  }
);
```

## États de chargement et UX

### Gestion des états de chargement

```javascript
// Hook personnalisé pour les états de chargement
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

// Utilisation
const UserList = () => {
  const { loading, error, data, execute } = useApiCall();

  const fetchUsers = () => {
    execute(() => apiClient.get('/users'));
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!data) return <button onClick={fetchUsers}>Charger les utilisateurs</button>;

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

## Bonnes pratiques

### 1. Configuration centralisée

```javascript
// config/api.js
export const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};
```

### 2. Types TypeScript

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

// Services typés
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

### 3. Tests

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
      expect(screen.getByText('Erreur: Network error')).toBeInTheDocument();
    });
  });
});
```

### 4. Optimisation des performances

```javascript
// Debounce pour les recherches
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

// Cache des requêtes
const queryCache = new Map();

const cachedApiCall = async (key, apiCall) => {
  if (queryCache.has(key)) {
    return queryCache.get(key);
  }

  const result = await apiCall();
  queryCache.set(key, result);
  
  // Invalider le cache après 5 minutes
  setTimeout(() => {
    queryCache.delete(key);
  }, 5 * 60 * 1000);

  return result;
};
```

## Conclusion

Ce guide couvre les aspects essentiels de l'intégration API dans les applications frontend :

- **fetch vs axios** : Choix basé sur les besoins du projet
- **Authentification** : Gestion des tokens et permissions
- **Gestion des erreurs** : Approche centralisée et robuste
- **CORS** : Configuration pour la communication cross-origin
- **UX** : États de chargement et feedback utilisateur
- **Bonnes pratiques** : Configuration, types, tests et performance

Ces pratiques garantissent une intégration API robuste et une expérience utilisateur optimale.
