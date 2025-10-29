# 📝 Plateforme de Contenu : CMS Headless

## 📋 Table des matières
- [Introduction](#introduction)
- [Contexte métier](#contexte-métier)
- [Besoins spécifiques](#besoins-spécifiques)
- [Stack technique recommandée](#stack-technique-recommandée)
- [Architecture détaillée](#architecture-détaillée)
- [Structure de dossiers](#structure-de-dossiers)
- [User stories types](#user-stories-types)
- [Exemples de code clés](#exemples-de-code-clés)
- [Checklist de validation](#checklist-de-validation)
- [Ressources](#ressources)

## 🎯 Introduction

Ce cas d'usage présente l'architecture complète d'une plateforme de contenu avec CMS headless, incluant la gestion des contenus, des médias, des utilisateurs et de la publication.

### 🎯 Objectifs

- **Définir** l'architecture d'une plateforme de contenu moderne
- **Identifier** les besoins spécifiques au CMS headless
- **Proposer** une stack technique adaptée
- **Fournir** des user stories détaillées
- **Guider** l'implémentation complète

---

## 🏢 Contexte métier

### 📝 Description du projet

**Plateforme de contenu moderne**
- CMS headless pour la gestion des contenus
- API REST pour la distribution des contenus
- Gestion des médias et assets
- Système de publication et workflow
- Multi-canaux de distribution

### 📊 Acteurs principaux

| Acteur | Description | Responsabilités |
|--------|-------------|-----------------|
| **Content Creator** | Créateur de contenu | Création et édition des contenus |
| **Content Editor** | Éditeur de contenu | Révision et validation des contenus |
| **Content Manager** | Gestionnaire de contenu | Gestion du workflow et publication |
| **Developer** | Développeur | Intégration avec les applications |
| **Admin** | Administrateur | Configuration et gestion de la plateforme |

### 🎯 Objectifs métier

- **Flexibilité** : Distribution multi-canaux
- **Collaboration** : Workflow de création collaboratif
- **Scalabilité** : Support de grandes quantités de contenu
- **Performance** : Temps de chargement optimaux
- **Sécurité** : Protection des contenus et accès

---

## 🔍 Besoins spécifiques

### 📝 Fonctionnalités principales

#### Gestion des contenus
- **Création** : Création de contenus structurés
- **Édition** : Édition collaborative des contenus
- **Validation** : Workflow de validation et approbation
- **Versioning** : Gestion des versions de contenu
- **Templates** : Modèles de contenu réutilisables

#### Gestion des médias
- **Upload** : Téléchargement de fichiers multimédias
- **Optimisation** : Optimisation automatique des images
- **CDN** : Distribution via CDN
- **Formats** : Support de multiples formats
- **Métadonnées** : Gestion des métadonnées des médias

#### Système de publication
- **Workflow** : Workflow de publication personnalisable
- **Scheduling** : Planification de publication
- **Preview** : Aperçu des contenus
- **Multi-environnements** : Déploiement sur plusieurs environnements
- **Rollback** : Possibilité de retour en arrière

#### API et distribution
- **API REST** : API pour la récupération des contenus
- **GraphQL** : API GraphQL pour les requêtes complexes
- **Webhooks** : Notifications en temps réel
- **Caching** : Mise en cache intelligente
- **Rate limiting** : Limitation des requêtes

#### Gestion des utilisateurs
- **Authentification** : Système d'authentification
- **Permissions** : Système de rôles et permissions
- **Collaboration** : Fonctionnalités collaboratives
- **Audit** : Traçabilité des actions
- **Profiles** : Gestion des profils utilisateurs

### 📊 Besoins non-fonctionnels

| Besoin | Description | Critères |
|--------|-------------|----------|
| **Performance** | Temps de réponse rapide | < 200ms pour les API |
| **Scalabilité** | Support de la croissance | 10M+ contenus |
| **Sécurité** | Protection des données | Conformité RGPD |
| **Disponibilité** | Uptime élevé | 99.99% de disponibilité |
| **Maintenabilité** | Code maintenable | Architecture modulaire |

---

## 🛠️ Stack technique recommandée

### 📝 Architecture recommandée

**Architecture : Microservices avec CMS headless**
- **Flexibilité** : Séparation du contenu et de la présentation
- **Scalabilité** : Services indépendants et évolutifs
- **Performance** : Optimisation pour la distribution
- **Maintenabilité** : Architecture modulaire

### 🏗️ Stack technique

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **CMS** | Strapi / Contentful | Gestion des contenus |
| **Backend** | NestJS + TypeScript | API et services |
| **Base de données** | PostgreSQL | ACID, requêtes complexes |
| **Cache** | Redis | Performance, sessions |
| **Storage** | AWS S3 | Stockage des médias |
| **CDN** | CloudFront | Distribution des assets |
| **Search** | Elasticsearch | Recherche avancée |
| **Monitoring** | Prometheus + Grafana | Observabilité |

### 🔧 Outils de développement

| Outil | Usage | Justification |
|-------|-------|---------------|
| **Strapi** | CMS headless | Gestion des contenus |
| **Prisma** | ORM | Type safety, migrations |
| **Docker** | Containerisation | Environnement cohérent |
| **Kubernetes** | Orchestration | Scalabilité, gestion des ressources |
| **GitHub Actions** | CI/CD | Automatisation |
| **ESLint/Prettier** | Qualité de code | Standards cohérents |

---

## 🏗️ Architecture détaillée

### 📊 Schéma d'architecture

![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/content-platform-0-fr-methodology-05-use-cases-content-platform.png)

### 🔄 Flux de données

#### Flux de création de contenu
![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/content-platform-1-fr-methodology-05-use-cases-content-platform.png)

#### Flux de récupération de contenu
![Diagramme Mermaid](https://raw.githubusercontent.com/jclaudan/jclaudan/main/assets/mermaid/content-platform-2-fr-methodology-05-use-cases-content-platform.png)

---

## 📁 Structure de dossiers

### 📝 Structure complète

```
content-platform-project/
├── strapi/                   # CMS Strapi
│   ├── src/
│   │   ├── api/             # API endpoints
│   │   │   ├── articles/
│   │   │   │   ├── controllers/
│   │   │   │   ├── services/
│   │   │   │   ├── models/
│   │   │   │   └── routes/
│   │   │   ├── categories/
│   │   │   │   ├── controllers/
│   │   │   │   ├── services/
│   │   │   │   ├── models/
│   │   │   │   └── routes/
│   │   │   └── media/
│   │   │       ├── controllers/
│   │   │       ├── services/
│   │   │       ├── models/
│   │   │       └── routes/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── seo/
│   │   │   ├── metadata/
│   │   │   └── author/
│   │   ├── extensions/      # Extensions personnalisées
│   │   │   ├── content-manager/
│   │   │   ├── upload/
│   │   │   └── admin/
│   │   ├── middlewares/     # Middlewares
│   │   │   ├── auth.js
│   │   │   ├── rate-limit.js
│   │   │   └── cors.js
│   │   ├── plugins/         # Plugins
│   │   │   ├── search/
│   │   │   ├── webhooks/
│   │   │   └── analytics/
│   │   └── config/          # Configuration
│   │       ├── database.js
│   │       ├── server.js
│   │       └── plugins.js
│   ├── public/              # Fichiers publics
│   ├── package.json
│   ├── strapi.config.js
│   └── README.md
├── backend/                 # Services backend
│   ├── services/            # Microservices
│   │   ├── content-service/ # Service de contenu
│   │   │   ├── src/
│   │   │   │   ├── controllers/
│   │   │   │   ├── services/
│   │   │   │   ├── repositories/
│   │   │   │   ├── dto/
│   │   │   │   ├── entities/
│   │   │   │   └── content.module.ts
│   │   │   ├── prisma/
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   ├── search-service/  # Service de recherche
│   │   │   ├── src/
│   │   │   ├── prisma/
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   ├── media-service/   # Service de médias
│   │   │   ├── src/
│   │   │   ├── prisma/
│   │   │   ├── package.json
│   │   │   └── README.md
│   │   └── notification-service/ # Service de notifications
│   │       ├── src/
│   │       ├── prisma/
│   │       ├── package.json
│   │       └── README.md
│   ├── shared/              # Code partagé
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   └── types/
│   └── infrastructure/      # Infrastructure
│       ├── api-gateway/     # API Gateway
│       ├── load-balancer/   # Load Balancer
│       └── monitoring/      # Monitoring
├── frontend/                # Application frontend
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── atoms/       # Composants atomiques
│   │   │   │   ├── Button/
│   │   │   │   ├── Input/
│   │   │   │   └── Typography/
│   │   │   ├── molecules/   # Composants moléculaires
│   │   │   │   ├── ArticleCard/
│   │   │   │   ├── SearchBox/
│   │   │   │   └── CategoryFilter/
│   │   │   └── organisms/   # Composants organiques
│   │   │       ├── Header/
│   │   │       ├── Footer/
│   │   │       └── ArticleList/
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── Home/
│   │   │   ├── Articles/
│   │   │   ├── ArticleDetail/
│   │   │   ├── Categories/
│   │   │   ├── Search/
│   │   │   └── About/
│   │   ├── stores/          # State management
│   │   │   ├── articles.js
│   │   │   ├── categories.js
│   │   │   └── search.js
│   │   ├── composables/     # Composition API
│   │   │   ├── useArticles.js
│   │   │   ├── useCategories.js
│   │   │   └── useSearch.js
│   │   ├── utils/           # Utilitaires
│   │   │   ├── api.js
│   │   │   ├── helpers.js
│   │   │   └── seo.js
│   │   ├── types/           # Types TypeScript
│   │   │   ├── article.types.ts
│   │   │   ├── category.types.ts
│   │   │   └── media.types.ts
│   │   └── main.ts
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tsconfig.json
│   └── README.md
├── infrastructure/          # Infrastructure as Code
│   ├── docker/
│   │   ├── Dockerfile.strapi
│   │   ├── Dockerfile.backend
│   │   ├── Dockerfile.frontend
│   │   └── docker-compose.yml
│   ├── kubernetes/
│   │   ├── strapi-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── frontend-deployment.yaml
│   │   └── ingress.yaml
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── docs/                    # Documentation
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── README.md
├── scripts/                 # Scripts utilitaires
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
├── .github/                 # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── .gitignore
├── README.md
└── package.json
```

---

## 📝 User stories types

### ✍️ Content Creator

#### Création de contenu
- **En tant que** créateur de contenu, **je veux** créer de nouveaux articles **afin de** publier du contenu
- **En tant que** créateur de contenu, **je veux** utiliser des templates prédéfinis **afin de** maintenir la cohérence
- **En tant que** créateur de contenu, **je veux** ajouter des médias à mes contenus **afin de** enrichir les articles
- **En tant que** créateur de contenu, **je veux** organiser mes contenus en catégories **afin de** faciliter la navigation
- **En tant que** créateur de contenu, **je veux** sauvegarder mes brouillons **afin de** continuer plus tard

#### Édition et collaboration
- **En tant que** créateur de contenu, **je veux** modifier mes contenus **afin de** les améliorer
- **En tant que** créateur de contenu, **je veux** collaborer avec d'autres créateurs **afin de** créer du contenu de qualité
- **En tant que** créateur de contenu, **je veux** voir l'historique des modifications **afin de** suivre les changements
- **En tant que** créateur de contenu, **je veux** recevoir des commentaires **afin de** améliorer mes contenus
- **En tant que** créateur de contenu, **je veux** prévisualiser mes contenus **afin de** voir le rendu final

### ✏️ Content Editor

#### Révision et validation
- **En tant qu'** éditeur de contenu, **je veux** réviser les contenus soumis **afin de** maintenir la qualité
- **En tant qu'** éditeur de contenu, **je veux** valider les contenus **afin de** les approuver pour publication
- **En tant qu'** éditeur de contenu, **je veux** rejeter les contenus non conformes **afin de** maintenir les standards
- **En tant qu'** éditeur de contenu, **je veux** suggérer des améliorations **afin de** optimiser les contenus
- **En tant qu'** éditeur de contenu, **je veux** planifier la publication **afin de** gérer le calendrier éditorial

#### Gestion du workflow
- **En tant qu'** éditeur de contenu, **je veux** définir des workflows de publication **afin de** standardiser le processus
- **En tant qu'** éditeur de contenu, **je veux** assigner des tâches aux créateurs **afin de** organiser le travail
- **En tant qu'** éditeur de contenu, **je veux** suivre l'avancement des contenus **afin de** respecter les délais
- **En tant qu'** éditeur de contenu, **je veux** gérer les permissions **afin de** contrôler l'accès aux contenus

### 📊 Content Manager

#### Gestion stratégique
- **En tant que** gestionnaire de contenu, **je veux** définir la stratégie éditoriale **afin de** aligner les contenus sur les objectifs
- **En tant que** gestionnaire de contenu, **je veux** analyser les performances des contenus **afin de** optimiser la stratégie
- **En tant que** gestionnaire de contenu, **je veux** gérer le calendrier éditorial **afin de** planifier les publications
- **En tant que** gestionnaire de contenu, **je veux** coordonner les équipes **afin de** assurer la cohérence
- **En tant que** gestionnaire de contenu, **je veux** gérer les budgets **afin de** optimiser les ressources

#### Monitoring et analytics
- **En tant que** gestionnaire de contenu, **je veux** voir les métriques de performance **afin de** évaluer l'impact
- **En tant que** gestionnaire de contenu, **je veux** analyser le comportement des utilisateurs **afin de** adapter la stratégie
- **En tant que** gestionnaire de contenu, **je veux** générer des rapports **afin de** communiquer les résultats
- **En tant que** gestionnaire de contenu, **je veux** identifier les contenus populaires **afin de** reproduire le succès

### 👨‍💻 Developer

#### Intégration API
- **En tant que** développeur, **je veux** accéder à l'API de contenu **afin de** intégrer les contenus dans les applications
- **En tant que** développeur, **je veux** utiliser GraphQL **afin de** optimiser les requêtes
- **En tant que** développeur, **je veux** recevoir des webhooks **afin de** réagir aux changements de contenu
- **En tant que** développeur, **je veux** gérer le cache **afin de** optimiser les performances
- **En tant que** développeur, **je veux** tester l'API **afin de** valider l'intégration

#### Gestion des médias
- **En tant que** développeur, **je veux** optimiser automatiquement les images **afin de** améliorer les performances
- **En tant que** développeur, **je veux** utiliser un CDN **afin de** distribuer les médias rapidement
- **En tant que** développeur, **je veux** gérer les formats de fichiers **afin de** supporter différents types de médias
- **En tant que** développeur, **je veux** compresser les fichiers **afin de** réduire la bande passante

### 👨‍💼 Admin

#### Configuration et gestion
- **En tant qu'** admin, **je veux** configurer la plateforme **afin de** personnaliser l'environnement
- **En tant qu'** admin, **je veux** gérer les utilisateurs **afin de** contrôler l'accès
- **En tant qu'** admin, **je veux** configurer les workflows **afin de** standardiser les processus
- **En tant qu'** admin, **je veux** gérer les permissions **afin de** sécuriser la plateforme
- **En tant qu'** admin, **je veux** surveiller la plateforme **afin de** maintenir la performance

#### Maintenance et support
- **En tant qu'** admin, **je veux** sauvegarder les données **afin de** protéger les contenus
- **En tant qu'** admin, **je veux** restaurer les données **afin de** récupérer en cas de problème
- **En tant qu'** admin, **je veux** voir les logs **afin de** diagnostiquer les problèmes
- **En tant qu'** admin, **je veux** gérer les mises à jour **afin de** maintenir la sécurité

---

## 💻 Exemples de code clés

### 🏗️ Modèles de données

#### Modèle Article
```typescript
// strapi/src/api/articles/models/article.js
module.exports = {
  kind: 'collectionType',
  collectionName: 'articles',
  info: {
    singularName: 'article',
    pluralName: 'articles',
    displayName: 'Article',
    description: 'Articles de blog et contenus éditoriaux'
  },
  options: {
    draftAndPublish: true
  },
  pluginOptions: {
    i18n: {
      localized: true
    }
  },
  attributes: {
    title: {
      type: 'string',
      required: true,
      maxLength: 255
    },
    slug: {
      type: 'uid',
      targetField: 'title',
      required: true
    },
    content: {
      type: 'richtext',
      required: true
    },
    excerpt: {
      type: 'text',
      maxLength: 500
    },
    featuredImage: {
      type: 'media',
      multiple: false,
      required: false,
      allowedTypes: ['images']
    },
    gallery: {
      type: 'media',
      multiple: true,
      required: false,
      allowedTypes: ['images', 'videos', 'files']
    },
    category: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::category.category',
      inversedBy: 'articles'
    },
    tags: {
      type: 'relation',
      relation: 'manyToMany',
      target: 'api::tag.tag',
      inversedBy: 'articles'
    },
    author: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::users-permissions.user'
    },
    seo: {
      type: 'component',
      component: 'shared.seo',
      required: false
    },
    publishedAt: {
      type: 'datetime'
    },
    featured: {
      type: 'boolean',
      default: false
    },
    readingTime: {
      type: 'integer',
      min: 1
    }
  }
}
```

#### Modèle Category
```typescript
// strapi/src/api/categories/models/category.js
module.exports = {
  kind: 'collectionType',
  collectionName: 'categories',
  info: {
    singularName: 'category',
    pluralName: 'categories',
    displayName: 'Category',
    description: 'Catégories d\'articles'
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    i18n: {
      localized: true
    }
  },
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    slug: {
      type: 'uid',
      targetField: 'name',
      required: true
    },
    description: {
      type: 'text'
    },
    color: {
      type: 'string',
      default: '#007bff'
    },
    icon: {
      type: 'string'
    },
    articles: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::article.article',
      mappedBy: 'category'
    },
    parent: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'api::category.category'
    },
    children: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::category.category',
      mappedBy: 'parent'
    }
  }
}
```

### 🔧 Services métier

#### Service Article
```typescript
// strapi/src/api/articles/services/article.js
const { createCoreService } = require('@strapi/strapi').factories

module.exports = createCoreService('api::article.article', ({ strapi }) => ({
  async findWithFilters(params) {
    const { category, tag, author, featured, search, ...restParams } = params
    
    let query = strapi.db.query('api::article.article')
    
    // Filtres
    if (category) {
      query = query.where('category.slug', category)
    }
    
    if (tag) {
      query = query.where('tags.slug', tag)
    }
    
    if (author) {
      query = query.where('author.id', author)
    }
    
    if (featured !== undefined) {
      query = query.where('featured', featured)
    }
    
    if (search) {
      query = query.where(function() {
        this.where('title', 'like', `%${search}%`)
          .orWhere('content', 'like', `%${search}%`)
          .orWhere('excerpt', 'like', `%${search}%`)
      })
    }
    
    return query.findMany({
      ...restParams,
      populate: ['category', 'tags', 'author', 'featuredImage']
    })
  },

  async findBySlug(slug) {
    return strapi.db.query('api::article.article').findOne({
      where: { slug },
      populate: ['category', 'tags', 'author', 'featuredImage', 'gallery']
    })
  },

  async getRelatedArticles(articleId, limit = 5) {
    const article = await strapi.db.query('api::article.article').findOne({
      where: { id: articleId },
      populate: ['category', 'tags']
    })
    
    if (!article) return []
    
    return strapi.db.query('api::article.article').findMany({
      where: {
        id: { $ne: articleId },
        $or: [
          { category: article.category.id },
          { tags: { $in: article.tags.map(tag => tag.id) } }
        ]
      },
      limit,
      populate: ['category', 'featuredImage']
    })
  },

  async incrementViews(articleId) {
    return strapi.db.query('api::article.article').update({
      where: { id: articleId },
      data: {
        views: { $increment: 1 }
      }
    })
  }
}))
```

#### Service Search
```typescript
// backend/services/search-service/src/services/search.service.ts
import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { SearchDto } from '../dto/search.dto'

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(searchDto: SearchDto): Promise<any> {
    const { query, filters, sort, page = 1, limit = 10 } = searchDto
    
    const searchQuery = {
      index: 'articles',
      body: {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query,
                  fields: ['title^3', 'content^2', 'excerpt', 'tags.name'],
                  fuzziness: 'AUTO'
                }
              }
            ],
            filter: this.buildFilters(filters)
          }
        },
        sort: this.buildSort(sort),
        from: (page - 1) * limit,
        size: limit,
        highlight: {
          fields: {
            title: {},
            content: {},
            excerpt: {}
          }
        }
      }
    }

    const response = await this.elasticsearchService.search(searchQuery)
    
    return {
      hits: response.body.hits.hits,
      total: response.body.hits.total.value,
      page,
      limit,
      totalPages: Math.ceil(response.body.hits.total.value / limit)
    }
  }

  async indexArticle(article: any): Promise<void> {
    await this.elasticsearchService.index({
      index: 'articles',
      id: article.id,
      body: {
        title: article.title,
        content: article.content,
        excerpt: article.excerpt,
        slug: article.slug,
        category: article.category?.name,
        tags: article.tags?.map(tag => tag.name),
        author: article.author?.username,
        publishedAt: article.publishedAt,
        featured: article.featured
      }
    })
  }

  async deleteArticle(articleId: string): Promise<void> {
    await this.elasticsearchService.delete({
      index: 'articles',
      id: articleId
    })
  }

  private buildFilters(filters: any): any[] {
    const filterArray = []
    
    if (filters.category) {
      filterArray.push({
        term: { 'category.keyword': filters.category }
      })
    }
    
    if (filters.tags) {
      filterArray.push({
        terms: { 'tags.keyword': filters.tags }
      })
    }
    
    if (filters.author) {
      filterArray.push({
        term: { 'author.keyword': filters.author }
      })
    }
    
    if (filters.featured !== undefined) {
      filterArray.push({
        term: { featured: filters.featured }
      })
    }
    
    if (filters.dateRange) {
      filterArray.push({
        range: {
          publishedAt: {
            gte: filters.dateRange.from,
            lte: filters.dateRange.to
          }
        }
      })
    }
    
    return filterArray
  }

  private buildSort(sort: string): any[] {
    switch (sort) {
      case 'relevance':
        return [{ '_score': { order: 'desc' } }]
      case 'date':
        return [{ 'publishedAt': { order: 'desc' } }]
      case 'title':
        return [{ 'title.keyword': { order: 'asc' } }]
      default:
        return [{ '_score': { order: 'desc' } }]
    }
  }
}
```

### 🎨 Composants frontend

#### ArticleCard
```vue
<!-- frontend/src/components/molecules/ArticleCard/ArticleCard.vue -->
<template>
  <article class="article-card">
    <div class="article-card__image">
      <img 
        :src="article.featuredImage?.url" 
        :alt="article.title"
        loading="lazy"
      />
      <div v-if="article.featured" class="article-card__badge">
        Featured
      </div>
    </div>
    
    <div class="article-card__content">
      <div class="article-card__meta">
        <span class="article-card__category" :style="{ color: article.category?.color }">
          {{ article.category?.name }}
        </span>
        <span class="article-card__date">
          {{ formatDate(article.publishedAt) }}
        </span>
      </div>
      
      <h3 class="article-card__title">
        <router-link :to="`/articles/${article.slug}`">
          {{ article.title }}
        </router-link>
      </h3>
      
      <p class="article-card__excerpt">
        {{ article.excerpt }}
      </p>
      
      <div class="article-card__footer">
        <div class="article-card__author">
          <img 
            :src="article.author?.avatar?.url" 
            :alt="article.author?.username"
            class="article-card__avatar"
          />
          <span>{{ article.author?.username }}</span>
        </div>
        
        <div class="article-card__stats">
          <span>{{ article.readingTime }} min read</span>
          <span v-if="article.views">{{ article.views }} views</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Article } from '@/types/article.types'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.article-card__image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-card__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #007bff;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.article-card__content {
  padding: 24px;
}

.article-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #666;
}

.article-card__category {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.article-card__title {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
}

.article-card__title a {
  color: #333;
  text-decoration: none;
  transition: color 0.2s ease;
}

.article-card__title a:hover {
  color: #007bff;
}

.article-card__excerpt {
  color: #666;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.article-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.article-card__author {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.article-card__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.article-card__stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #999;
}
</style>
```

#### SearchBox
```vue
<!-- frontend/src/components/molecules/SearchBox/SearchBox.vue -->
<template>
  <div class="search-box">
    <div class="search-box__input-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher des articles..."
        class="search-box__input"
        @input="handleSearch"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
      />
      <button class="search-box__button" @click="performSearch">
        <svg class="search-box__icon" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </button>
    </div>
    
    <div v-if="showSuggestions && suggestions.length > 0" class="search-box__suggestions">
      <div
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        class="search-box__suggestion"
        @click="selectSuggestion(suggestion)"
      >
        <div class="search-box__suggestion-title">{{ suggestion.title }}</div>
        <div class="search-box__suggestion-excerpt">{{ suggestion.excerpt }}</div>
      </div>
    </div>
    
    <div v-if="showSuggestions && searchQuery && suggestions.length === 0" class="search-box__no-results">
      Aucun résultat trouvé
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearch } from '@/composables/useSearch'

const { search, suggestions, loading } = useSearch()

const searchQuery = ref('')
const showSuggestions = ref(false)
const searchTimeout = ref<NodeJS.Timeout>()

const handleSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  
  searchTimeout.value = setTimeout(() => {
    if (searchQuery.value.length >= 2) {
      search(searchQuery.value)
    }
  }, 300)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigation vers la page de résultats
    showSuggestions.value = false
  }
}

const selectSuggestion = (suggestion: any) => {
  searchQuery.value = suggestion.title
  showSuggestions.value = false
  // Navigation vers l'article
}

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

watch(searchQuery, (newQuery) => {
  if (newQuery.length < 2) {
    suggestions.value = []
  }
})
</script>

<style scoped>
.search-box {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-box__input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box__input {
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-box__input:focus {
  border-color: #007bff;
}

.search-box__button {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.search-box__button:hover {
  background-color: #f8f9fa;
}

.search-box__icon {
  width: 20px;
  height: 20px;
  fill: #666;
}

.search-box__suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.search-box__suggestion {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.search-box__suggestion:hover {
  background-color: #f8f9fa;
}

.search-box__suggestion:last-child {
  border-bottom: none;
}

.search-box__suggestion-title {
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.search-box__suggestion-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.search-box__no-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  color: #666;
  z-index: 1000;
}
</style>
```

---

## ✅ Checklist de validation

### 📋 Fonctionnalités principales

- [ ] **CMS Strapi** configuré et fonctionnel
- [ ] **API REST** complètement implémentée
- [ ] **Gestion des contenus** opérationnelle
- [ ] **Système de médias** fonctionnel
- [ ] **Recherche avancée** implémentée
- [ ] **Workflow de publication** configuré

### 📋 Architecture technique

- [ ] **Microservices** configurés et fonctionnels
- [ ] **API Gateway** opérationnel
- [ ] **Base de données** optimisée
- [ ] **Cache Redis** pour les performances
- [ ] **Elasticsearch** pour la recherche
- [ ] **CDN** pour la distribution des médias

### 📋 Sécurité et qualité

- [ ] **Authentification** sécurisée
- [ ] **Validation des données** implémentée
- [ ] **Gestion des permissions** configurée
- [ ] **Tests unitaires** et d'intégration
- [ ] **Monitoring** et logging
- [ ] **CI/CD** automatisé

### 📋 Performance et scalabilité

- [ ] **Optimisation des requêtes** base de données
- [ ] **Cache** des contenus fréquemment utilisés
- [ ] **Optimisation des images** automatique
- [ ] **CDN** pour la distribution
- [ ] **Monitoring** des performances
- [ ] **Gestion des ressources** optimisée

---

## 📚 Ressources

### 🎓 Formation
- [Architecture globale](../03-architecture/global-architecture.md)
- [Architecture backend](../03-architecture/backend-architecture.md)
- [Architecture frontend](../03-architecture/frontend-architecture.md)
- [Architecture base de données](../03-architecture/database-architecture.md)

### 🛠️ Outils
- [Strapi](https://strapi.io/) - CMS headless
- [NestJS](https://nestjs.com/) - Framework backend
- [PostgreSQL](https://www.postgresql.org/) - Base de données
- [Elasticsearch](https://www.elastic.co/) - Moteur de recherche
- [Redis](https://redis.io/) - Cache

### 📖 Références
- [Headless CMS Architecture](https://www.oreilly.com/library/view/headless-cms-architecture/9781449331770/) - O'Reilly
- [Strapi Documentation](https://docs.strapi.io/) - Documentation officielle
- [NestJS Documentation](https://docs.nestjs.com/) - Documentation officielle
- [Elasticsearch Documentation](https://www.elastic.co/guide/) - Documentation officielle

---

<div align="center">

[![Retour au Profil](../../../README.md)](../../../README.md)

</div>

---

*Dernière mise à jour : Janvier 2024*
