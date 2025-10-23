# Guide d'Intégration CMS Vue.js

## Introduction

Ce guide couvre l'intégration de Vue.js avec les CMS, en comparant les approches SPA vs micro-applications, la communication entre micro-apps, et la configuration de build.

## SPA vs Micro-applications

### Single Page Application (SPA)

```javascript
// Avantages
- Expérience utilisateur fluide
- Navigation rapide
- État partagé facilement
- Déploiement simple

// Inconvénients
- Bundle monolithique
- Temps de chargement initial long
- Difficile à maintenir à grande échelle
- Déploiement de toute l'application pour un changement mineur
```

#### Architecture SPA traditionnelle

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');
```

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Blog from '../views/Blog.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/blog', name: 'Blog', component: Blog }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

### Micro-applications

```javascript
// Avantages
- Développement indépendant
- Déploiement indépendant
- Équipes autonomes
- Technologies différentes possibles
- Isolation des erreurs

// Inconvénients
- Complexité de communication
- Gestion d'état partagé complexe
- Configuration de build complexe
- Débogage plus difficile
```

#### Architecture micro-applications

```javascript
// shell-app/main.js (Application hôte)
import { createApp } from 'vue';
import ShellApp from './ShellApp.vue';

const app = createApp(ShellApp);
app.mount('#shell-app');
```

```javascript
// ShellApp.vue
<template>
  <div id="shell-app">
    <nav class="main-navigation">
      <router-link to="/">Accueil</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/shop">Boutique</router-link>
    </nav>
    
    <main class="main-content">
      <div id="micro-app-container"></div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Charger la micro-app selon la route
  loadMicroApp();
});
</script>
```

## Communication entre Micro-applications

### Event Bus Pattern

```javascript
// shared/eventBus.js
class EventBus {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

export const eventBus = new EventBus();
```

#### Utilisation dans les micro-apps

```javascript
// blog-app/components/BlogList.vue
<template>
  <div>
    <h2>Articles de blog</h2>
    <div v-for="post in posts" :key="post.id" class="post">
      <h3 @click="selectPost(post)">{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { eventBus } from '../shared/eventBus';

const posts = ref([]);

const selectPost = (post) => {
  // Émettre un événement pour informer les autres micro-apps
  eventBus.emit('post-selected', post);
};

onMounted(() => {
  // Écouter les événements des autres micro-apps
  eventBus.on('user-logged-in', (user) => {
    console.log('User logged in:', user);
    // Mettre à jour l'état local
  });
});
</script>
```

### Shared State Pattern

```javascript
// shared/store.js
class SharedStore {
  constructor() {
    this.state = {
      user: null,
      theme: 'light',
      language: 'fr'
    };
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }
}

export const sharedStore = new SharedStore();
```

#### Utilisation du store partagé

```javascript
// user-app/components/UserProfile.vue
<template>
  <div class="user-profile">
    <h2>Profil utilisateur</h2>
    <p>Nom: {{ user?.name }}</p>
    <p>Email: {{ user?.email }}</p>
    <button @click="updateTheme">Changer le thème</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { sharedStore } from '../shared/store';

const user = ref(null);
let unsubscribe;

onMounted(() => {
  // S'abonner aux changements d'état
  unsubscribe = sharedStore.subscribe((state) => {
    user.value = state.user;
  });
  
  // Initialiser l'état
  user.value = sharedStore.getState().user;
});

onUnmounted(() => {
  // Se désabonner
  unsubscribe();
});

const updateTheme = () => {
  const currentTheme = sharedStore.getState().theme;
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  sharedStore.setState({ theme: newTheme });
};
</script>
```

### Module Federation (Webpack 5)

```javascript
// webpack.config.js (Shell App)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        blog: 'blog@http://localhost:3001/remoteEntry.js',
        shop: 'shop@http://localhost:3002/remoteEntry.js',
      },
    }),
  ],
};
```

```javascript
// webpack.config.js (Blog App)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new ModuleFederationPlugin({
      name: 'blog',
      filename: 'remoteEntry.js',
      exposes: {
        './BlogApp': './src/BlogApp.vue',
        './BlogList': './src/components/BlogList.vue',
      },
      shared: {
        vue: { singleton: true },
        'vue-router': { singleton: true },
      },
    }),
  ],
};
```

#### Utilisation des modules fédérés

```javascript
// shell-app/components/MicroAppLoader.vue
<template>
  <div id="micro-app-container">
    <Suspense>
      <component :is="microAppComponent" v-if="microAppComponent" />
      <template #fallback>
        <div>Chargement...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const microAppComponent = ref(null);

const loadMicroApp = async (appName) => {
  try {
    // Charger dynamiquement la micro-app
    const module = await import(`${appName}/BlogApp`);
    microAppComponent.value = module.default;
  } catch (error) {
    console.error('Erreur lors du chargement de la micro-app:', error);
  }
};

onMounted(() => {
  // Charger la micro-app selon la route actuelle
  const currentRoute = window.location.pathname;
  if (currentRoute.startsWith('/blog')) {
    loadMicroApp('blog');
  } else if (currentRoute.startsWith('/shop')) {
    loadMicroApp('shop');
  }
});
</script>
```

## Intégration CMS

### Headless CMS avec Vue.js

```javascript
// services/cmsService.js
class CMSService {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async fetchContent(type, params = {}) {
    const url = new URL(`${this.apiUrl}/${type}`, window.location.origin);
    
    // Ajouter les paramètres de requête
    Object.keys(params).forEach(key => {
      url.searchParams.append(key, params[key]);
    });

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur CMS: ${response.status}`);
    }

    return await response.json();
  }

  async getPosts(limit = 10, offset = 0) {
    return this.fetchContent('posts', { limit, offset });
  }

  async getPost(slug) {
    return this.fetchContent(`posts/${slug}`);
  }

  async getPages() {
    return this.fetchContent('pages');
  }
}

export const cmsService = new CMSService(
  process.env.VUE_APP_CMS_API_URL,
  process.env.VUE_APP_CMS_API_KEY
);
```

#### Composant de blog avec CMS

```javascript
// components/BlogList.vue
<template>
  <div class="blog-list">
    <h2>Articles de blog</h2>
    <div v-if="loading" class="loading">Chargement...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <article v-for="post in posts" :key="post.id" class="post">
        <h3>
          <router-link :to="`/blog/${post.slug}`">
            {{ post.title }}
          </router-link>
        </h3>
        <p class="excerpt">{{ post.excerpt }}</p>
        <div class="meta">
          <span class="date">{{ formatDate(post.publishedAt) }}</span>
          <span class="author">{{ post.author.name }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { cmsService } from '../services/cmsService';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const loadPosts = async () => {
  try {
    loading.value = true;
    const response = await cmsService.getPosts();
    posts.value = response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

onMounted(loadPosts);
</script>
```

### CMS avec Nuxt.js

```javascript
// nuxt.config.js
export default {
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/tailwindcss'
  ],
  
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    entities: ['posts', 'pages', 'categories']
  },

  // Génération statique avec le CMS
  target: 'static',
  generate: {
    async routes() {
      const { $strapi } = require('@nuxtjs/strapi');
      
      // Générer les routes pour les posts
      const posts = await $strapi.find('posts');
      const postRoutes = posts.map(post => `/blog/${post.slug}`);
      
      // Générer les routes pour les pages
      const pages = await $strapi.find('pages');
      const pageRoutes = pages.map(page => `/${page.slug}`);
      
      return [...postRoutes, ...pageRoutes];
    }
  }
};
```

#### Page de blog avec Nuxt.js

```javascript
// pages/blog/index.vue
<template>
  <div class="blog-page">
    <h1>Blog</h1>
    <div class="posts-grid">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <NuxtLink :to="`/blog/${post.slug}`">
          <img :src="post.image?.url" :alt="post.title" />
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $strapi }) {
    const posts = await $strapi.find('posts', {
      populate: ['image', 'author'],
      sort: ['publishedAt:desc']
    });
    
    return { posts };
  },
  
  head() {
    return {
      title: 'Blog',
      meta: [
        { hid: 'description', name: 'description', content: 'Articles de blog' }
      ]
    };
  }
};
</script>
```

## Configuration de Build

### Webpack Configuration pour Micro-apps

```javascript
// webpack.config.js
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  
  plugins: [
    new ModuleFederationPlugin({
      name: 'vue_cms_app',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',
        './components/BlogList': './src/components/BlogList.vue',
      },
      shared: {
        vue: {
          singleton: true,
          requiredVersion: '^3.0.0',
        },
        'vue-router': {
          singleton: true,
          requiredVersion: '^4.0.0',
        },
      },
    }),
  ],
  
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### Vite Configuration pour Micro-apps

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'vue_cms_app',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',
        './components/BlogList': './src/components/BlogList.vue',
      },
      shared: ['vue', 'vue-router'],
    }),
  ],
  
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  
  server: {
    port: 3000,
    cors: true,
  },
});
```

### Docker Configuration

```dockerfile
# Dockerfile pour micro-app
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "serve"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  shell-app:
    build: ./shell-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - cms-api

  blog-app:
    build: ./blog-app
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - cms-api

  shop-app:
    build: ./shop-app
    ports:
      - "3002:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - cms-api

  cms-api:
    image: strapi/strapi:latest
    ports:
      - "1337:1337"
    environment:
      - DATABASE_CLIENT=postgres
      - DATABASE_HOST=postgres
      - DATABASE_PORT=5432
      - DATABASE_NAME=strapi
      - DATABASE_USERNAME=strapi
      - DATABASE_PASSWORD=strapi
    depends_on:
      - postgres

  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=strapi
      - POSTGRES_USER=strapi
      - POSTGRES_PASSWORD=strapi
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Tests pour Micro-applications

### Tests unitaires

```javascript
// tests/components/BlogList.test.js
import { mount } from '@vue/test-utils';
import BlogList from '@/components/BlogList.vue';
import { cmsService } from '@/services/cmsService';

// Mock du service CMS
jest.mock('@/services/cmsService');

describe('BlogList', () => {
  it('affiche les posts du CMS', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', excerpt: 'Excerpt 1' },
      { id: 2, title: 'Post 2', excerpt: 'Excerpt 2' }
    ];

    cmsService.getPosts.mockResolvedValue({ data: mockPosts });

    const wrapper = mount(BlogList);
    
    // Attendre que les posts soient chargés
    await wrapper.vm.$nextTick();
    
    expect(wrapper.findAll('.post')).toHaveLength(2);
    expect(wrapper.text()).toContain('Post 1');
    expect(wrapper.text()).toContain('Post 2');
  });

  it('affiche une erreur en cas d\'échec du chargement', async () => {
    cmsService.getPosts.mockRejectedValue(new Error('Erreur CMS'));

    const wrapper = mount(BlogList);
    
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.error').text()).toContain('Erreur CMS');
  });
});
```

### Tests d'intégration

```javascript
// tests/integration/microAppCommunication.test.js
import { mount } from '@vue/test-utils';
import { eventBus } from '@/shared/eventBus';

describe('Communication entre micro-apps', () => {
  it('émet et reçoit des événements correctement', () => {
    const callback = jest.fn();
    eventBus.on('test-event', callback);
    
    eventBus.emit('test-event', { data: 'test' });
    
    expect(callback).toHaveBeenCalledWith({ data: 'test' });
  });

  it('se désabonne des événements', () => {
    const callback = jest.fn();
    eventBus.on('test-event', callback);
    eventBus.off('test-event', callback);
    
    eventBus.emit('test-event', { data: 'test' });
    
    expect(callback).not.toHaveBeenCalled();
  });
});
```

## Bonnes pratiques

### 1. Gestion des erreurs

```javascript
// utils/errorHandler.js
class MicroAppErrorHandler {
  constructor() {
    this.errors = [];
  }

  handleError(error, context) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    };
    
    this.errors.push(errorInfo);
    
    // Envoyer l'erreur au service de monitoring
    this.reportError(errorInfo);
  }

  reportError(errorInfo) {
    // Intégration avec Sentry, LogRocket, etc.
    console.error('Micro-app error:', errorInfo);
  }
}

export const errorHandler = new MicroAppErrorHandler();
```

### 2. Monitoring et observabilité

```javascript
// utils/performanceMonitor.js
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
  }

  startTimer(name) {
    const startTime = performance.now();
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        this.recordMetric(name, duration);
      }
    };
  }

  recordMetric(name, value) {
    this.metrics.push({
      name,
      value,
      timestamp: new Date().toISOString()
    });
  }

  getMetrics() {
    return this.metrics;
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

### 3. Configuration d'environnement

```javascript
// config/environment.js
const config = {
  development: {
    cmsApiUrl: 'http://localhost:1337',
    microAppUrl: 'http://localhost:3001',
    enableDebug: true
  },
  production: {
    cmsApiUrl: 'https://cms.yourdomain.com',
    microAppUrl: 'https://blog.yourdomain.com',
    enableDebug: false
  }
};

export default config[process.env.NODE_ENV || 'development'];
```

## Conclusion

Ce guide couvre les aspects essentiels de l'intégration CMS avec Vue.js :

- **SPA vs Micro-applications** : Choix d'architecture selon les besoins
- **Communication** : Patterns pour l'échange de données entre micro-apps
- **Intégration CMS** : Connexion avec des CMS headless
- **Configuration de build** : Setup pour le déploiement
- **Tests** : Stratégies de test pour les micro-applications
- **Bonnes pratiques** : Gestion d'erreurs, monitoring et configuration

Ces pratiques garantissent une architecture robuste et maintenable pour les applications Vue.js intégrées avec des CMS.
