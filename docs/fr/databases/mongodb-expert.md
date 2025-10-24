# MongoDB Expert - Guide Avancé

## 1. Architecture et Sharding

### Configuration de Sharding

#### Shard Key Design
```javascript
// Bonne clé de shard - distribution uniforme
db.users.createIndex({ "user_id": 1, "created_at": 1 })

// Mauvaise clé de shard - distribution inégale
db.users.createIndex({ "country": 1 }) // Peu de pays, distribution inégale

// Clé de shard composée pour éviter les hotspots
db.orders.createIndex({ "user_id": 1, "order_date": 1 })
```

#### Configuration du Cluster
```javascript
// 1. Démarrer les config servers
mongod --configsvr --replSet configReplSet --port 27019

// 2. Initialiser le replica set de config
rs.initiate({
  _id: "configReplSet",
  configsvr: true,
  members: [
    { _id: 0, host: "config1:27019" },
    { _id: 1, host: "config2:27019" },
    { _id: 2, host: "config3:27019" }
  ]
})

// 3. Démarrer les shards
mongod --shardsvr --replSet shard1 --port 27018

// 4. Démarrer le mongos
mongos --configdb configReplSet/config1:27019,config2:27019,config3:27019

// 5. Ajouter les shards
sh.addShard("shard1/shard1-1:27018,shard1-2:27018,shard1-3:27018")
sh.addShard("shard2/shard2-1:27018,shard2-2:27018,shard2-3:27018")

// 6. Activer le sharding sur une base de données
sh.enableSharding("my_database")

// 7. Sharder une collection
sh.shardCollection("my_database.users", { "user_id": 1, "created_at": 1 })
```

### Gestion des Shards

```javascript
// Vérifier le statut du sharding
sh.status()

// Équilibrer les données
sh.startBalancer()

// Arrêter l'équilibreur
sh.stopBalancer()

// Vérifier l'équilibrage
sh.getBalancerState()

// Forcer la migration d'un chunk
sh.moveChunk("my_database.users", { "user_id": 1000 }, "shard2")

// Diviser un chunk
sh.splitAt("my_database.users", { "user_id": 5000 })

// Fusionner des chunks
sh.mergeChunks("my_database.users", { "user_id": 1000 }, { "user_id": 2000 })
```

## 2. Réplication Avancée

### Configuration de Replica Set

```javascript
// Configuration avancée d'un replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    {
      _id: 0,
      host: "primary:27017",
      priority: 2,
      tags: { "dc": "east", "rack": "rack1" }
    },
    {
      _id: 1,
      host: "secondary1:27017",
      priority: 1,
      tags: { "dc": "east", "rack": "rack2" }
    },
    {
      _id: 2,
      host: "secondary2:27017",
      priority: 1,
      tags: { "dc": "west", "rack": "rack1" }
    },
    {
      _id: 3,
      host: "arbiter:27017",
      arbiterOnly: true
    }
  ],
  settings: {
    heartbeatIntervalMillis: 2000,
    electionTimeoutMillis: 10000,
    catchUpTimeoutMillis: 2000
  }
})
```

### Read Preferences et Write Concerns

```javascript
// Read preferences
db.users.find().readPref("secondaryPreferred")
db.users.find().readPref("nearest", { tags: [{ "dc": "east" }] })

// Write concerns
db.users.insertOne({ name: "John" }, { writeConcern: { w: "majority", j: true } })
db.users.insertMany([{ name: "Jane" }], { writeConcern: { w: 2, wtimeout: 5000 } })

// Configuration globale
db.adminCommand({
  setDefaultRWConcern: {
    defaultReadConcern: { level: "majority" },
    defaultWriteConcern: { w: "majority", j: true }
  }
})
```

### Gestion des Élections

```javascript
// Forcer une élection
rs.stepDown(60) // Step down pendant 60 secondes

// Vérifier le statut
rs.status()

// Configuration des priorités
rs.reconfig({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "primary:27017", priority: 2 },
    { _id: 1, host: "secondary1:27017", priority: 1 },
    { _id: 2, host: "secondary2:27017", priority: 0.5 }
  ]
})
```

## 3. Performance et Optimisation

### Index Avancés

#### Index Composés Optimisés
```javascript
// Index pour requêtes de range
db.orders.createIndex({ "user_id": 1, "created_at": -1, "status": 1 })

// Index pour tri
db.products.createIndex({ "category": 1, "price": 1, "rating": -1 })

// Index partiel
db.users.createIndex(
  { "email": 1 },
  { partialFilterExpression: { "active": true } }
)

// Index sparse
db.users.createIndex({ "phone": 1 }, { sparse: true })

// Index TTL
db.sessions.createIndex({ "expires_at": 1 }, { expireAfterSeconds: 0 })
```

#### Index de Texte et Géospatial
```javascript
// Index de texte
db.articles.createIndex({
  "title": "text",
  "content": "text",
  "tags": "text"
}, {
  weights: { "title": 10, "content": 5, "tags": 3 },
  default_language: "french"
})

// Index géospatial 2dsphere
db.locations.createIndex({ "location": "2dsphere" })

// Index géospatial 2d
db.places.createIndex({ "coordinates": "2d" })

// Index géospatial avec d'autres champs
db.events.createIndex({
  "location": "2dsphere",
  "date": 1,
  "category": 1
})
```

### Profiling et Analyse

```javascript
// Activer le profiler
db.setProfilingLevel(2, { slowms: 100 })

// Profiler avec filtres
db.setProfilingLevel(2, {
  slowms: 100,
  filter: {
    "command.find": { "filter": { "user_id": { $exists: true } } }
  }
})

// Analyser les requêtes lentes
db.system.profile.find().sort({ ts: -1 }).limit(5)

// Statistiques d'index
db.users.aggregate([{ $indexStats: {} }])

// Plan d'exécution
db.users.find({ "email": "john@example.com" }).explain("executionStats")
```

### Optimisation des Requêtes

```javascript
// Requête optimisée avec projection
db.users.find(
  { "active": true },
  { "name": 1, "email": 1, "_id": 0 }
).limit(100)

// Utilisation d'index pour le tri
db.orders.find({ "user_id": 123 })
  .sort({ "created_at": -1 })
  .limit(10)

// Agrégation optimisée
db.orders.aggregate([
  { $match: { "created_at": { $gte: new Date("2024-01-01") } } },
  { $group: { _id: "$user_id", total: { $sum: "$amount" } } },
  { $sort: { "total": -1 } },
  { $limit: 100 }
])
```

## 4. Aggregation Pipeline Avancé

### Pipeline Complexe

```javascript
// Pipeline d'analyse des ventes
db.orders.aggregate([
  // Étape 1: Filtrer les commandes récentes
  {
    $match: {
      "created_at": { $gte: new Date("2024-01-01") },
      "status": { $in: ["completed", "shipped"] }
    }
  },
  
  // Étape 2: Joindre avec les utilisateurs
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  
  // Étape 3: Dérouler le tableau user
  { $unwind: "$user" },
  
  // Étape 4: Ajouter des champs calculés
  {
    $addFields: {
      "order_month": { $month: "$created_at" },
      "user_age_group": {
        $switch: {
          branches: [
            { case: { $lt: ["$user.age", 25] }, then: "18-24" },
            { case: { $lt: ["$user.age", 35] }, then: "25-34" },
            { case: { $lt: ["$user.age", 45] }, then: "35-44" },
            { case: { $lt: ["$user.age", 55] }, then: "45-54" }
          ],
          default: "55+"
        }
      }
    }
  },
  
  // Étape 5: Grouper par mois et groupe d'âge
  {
    $group: {
      _id: {
        month: "$order_month",
        age_group: "$user_age_group"
      },
      total_orders: { $sum: 1 },
      total_revenue: { $sum: "$amount" },
      avg_order_value: { $avg: "$amount" },
      unique_users: { $addToSet: "$user_id" }
    }
  },
  
  // Étape 6: Calculer le nombre d'utilisateurs uniques
  {
    $addFields: {
      unique_user_count: { $size: "$unique_users" }
    }
  },
  
  // Étape 7: Trier par mois et revenus
  {
    $sort: {
      "_id.month": 1,
      "total_revenue": -1
    }
  },
  
  // Étape 8: Projeter les champs finaux
  {
    $project: {
      _id: 0,
      month: "$_id.month",
      age_group: "$_id.age_group",
      total_orders: 1,
      total_revenue: 1,
      avg_order_value: { $round: ["$avg_order_value", 2] },
      unique_user_count: 1
    }
  }
])
```

### Pipeline avec Fenêtrage

```javascript
// Analyse des tendances avec fenêtrage
db.sales.aggregate([
  {
    $match: {
      "date": { $gte: new Date("2024-01-01") }
    }
  },
  
  // Trier par produit et date
  {
    $sort: {
      "product_id": 1,
      "date": 1
    }
  },
  
  // Ajouter des calculs de fenêtre
  {
    $setWindowFields: {
      partitionBy: "$product_id",
      sortBy: { "date": 1 },
      output: {
        "previous_sales": {
          $shift: {
            output: "$quantity",
            by: -1,
            default: 0
          }
        },
        "sales_growth": {
          $subtract: ["$quantity", { $shift: { output: "$quantity", by: -1, default: 0 } }]
        },
        "rolling_avg_7d": {
          $avg: "$quantity",
          window: {
            range: [-6, 0],
            unit: "day"
          }
        },
        "rank": {
          $rank: {}
        }
      }
    }
  },
  
  // Calculer le pourcentage de croissance
  {
    $addFields: {
      "growth_percentage": {
        $cond: {
          if: { $gt: ["$previous_sales", 0] },
          then: {
            $multiply: [
              { $divide: ["$sales_growth", "$previous_sales"] },
              100
            ]
          },
          else: 0
        }
      }
    }
  }
])
```

## 5. Gestion des Données

### Transactions Avancées

```javascript
// Transaction avec retry
async function transferMoney(fromAccountId, toAccountId, amount) {
  const session = client.startSession();
  
  try {
    await session.withTransaction(async () => {
      // Vérifier le solde
      const fromAccount = await db.accounts.findOne(
        { _id: fromAccountId },
        { session }
      );
      
      if (fromAccount.balance < amount) {
        throw new Error('Insufficient funds');
      }
      
      // Débiter le compte source
      await db.accounts.updateOne(
        { _id: fromAccountId },
        { $inc: { balance: -amount } },
        { session }
      );
      
      // Créditer le compte destination
      await db.accounts.updateOne(
        { _id: toAccountId },
        { $inc: { balance: amount } },
        { session }
      );
      
      // Enregistrer la transaction
      await db.transactions.insertOne({
        from_account: fromAccountId,
        to_account: toAccountId,
        amount: amount,
        timestamp: new Date()
      }, { session });
    });
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  } finally {
    await session.endSession();
  }
}
```

### Gestion des Conflits

```javascript
// Optimistic concurrency control
async function updateUserWithRetry(userId, updates, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Récupérer la version actuelle
      const user = await db.users.findOne({ _id: userId });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Mettre à jour avec vérification de version
      const result = await db.users.updateOne(
        { 
          _id: userId,
          version: user.version // Vérifier que la version n'a pas changé
        },
        {
          $set: { ...updates, updated_at: new Date() },
          $inc: { version: 1 } // Incrémenter la version
        }
      );
      
      if (result.modifiedCount === 0) {
        throw new Error('Version conflict');
      }
      
      return result;
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      
      // Attendre avant de réessayer
      await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempt)));
    }
  }
}
```

## 6. Monitoring et Observabilité

### Métriques de Performance

```javascript
// Script de monitoring
async function getPerformanceMetrics() {
  const metrics = {};
  
  // Statistiques de base de données
  const dbStats = await db.stats();
  metrics.database = {
    size: dbStats.dataSize,
    storageSize: dbStats.storageSize,
    indexes: dbStats.indexSize,
    collections: dbStats.collections,
    objects: dbStats.objects
  };
  
  // Statistiques de serveur
  const serverStatus = await db.serverStatus();
  metrics.server = {
    uptime: serverStatus.uptime,
    connections: serverStatus.connections,
    memory: serverStatus.mem,
    operations: serverStatus.opcounters
  };
  
  // Statistiques de réplication
  if (serverStatus.repl) {
    metrics.replication = {
      isMaster: serverStatus.repl.ismaster,
      secondary: serverStatus.repl.secondary,
      replLag: serverStatus.repl.replicationLag
    };
  }
  
  // Statistiques de sharding
  if (serverStatus.sharding) {
    metrics.sharding = {
      configServerState: serverStatus.sharding.configServerState,
      mongos: serverStatus.sharding.mongos
    };
  }
  
  return metrics;
}
```

### Alertes Automatiques

```javascript
// Système d'alertes
class MongoAlerts {
  constructor() {
    this.alerts = [];
    this.thresholds = {
      connections: 1000,
      memoryUsage: 0.8,
      replicationLag: 10,
      slowQueries: 100
    };
  }
  
  async checkAlerts() {
    const metrics = await this.getMetrics();
    
    // Vérifier les connexions
    if (metrics.connections.current > this.thresholds.connections) {
      this.addAlert('HIGH_CONNECTIONS', 
        `Too many connections: ${metrics.connections.current}`);
    }
    
    // Vérifier l'utilisation mémoire
    const memoryUsage = metrics.memory.resident / metrics.memory.virtual;
    if (memoryUsage > this.thresholds.memoryUsage) {
      this.addAlert('HIGH_MEMORY', 
        `High memory usage: ${(memoryUsage * 100).toFixed(2)}%`);
    }
    
    // Vérifier le lag de réplication
    if (metrics.replication && metrics.replication.replLag > this.thresholds.replicationLag) {
      this.addAlert('REPLICATION_LAG', 
        `High replication lag: ${metrics.replication.replLag}s`);
    }
    
    return this.alerts;
  }
  
  addAlert(type, message) {
    this.alerts.push({
      type,
      message,
      timestamp: new Date(),
      severity: this.getSeverity(type)
    });
  }
  
  getSeverity(type) {
    const severityMap = {
      'HIGH_CONNECTIONS': 'WARNING',
      'HIGH_MEMORY': 'CRITICAL',
      'REPLICATION_LAG': 'WARNING'
    };
    return severityMap[type] || 'INFO';
  }
}
```

## 7. Sécurité Avancée

### Authentification et Autorisation

```javascript
// Créer un utilisateur avec rôles spécifiques
db.createUser({
  user: "app_user",
  pwd: "secure_password",
  roles: [
    {
      role: "readWrite",
      db: "my_database"
    },
    {
      role: "read",
      db: "analytics"
    }
  ],
  customData: {
    department: "engineering",
    level: "senior"
  }
});

// Rôle personnalisé
db.createRole({
  role: "data_analyst",
  privileges: [
    {
      resource: { db: "analytics", collection: "" },
      actions: ["find", "aggregate"]
    },
    {
      resource: { db: "analytics", collection: "reports" },
      actions: ["insert", "update"]
    }
  ],
  roles: []
});
```

### Chiffrement et Audit

```javascript
// Configuration du chiffrement au repos
// mongod.conf
storage:
  wiredTiger:
    engineConfig:
      configString: "encryption=(name=AES256-CBC,keyId=key1)"

// Audit des opérations
// mongod.conf
auditLog:
  destination: file
  format: JSON
  path: /var/log/mongodb/audit.json
  filter: '{ "users": { $elemMatch: { "user": { $ne: "system" } } } }'

// Vérifier les logs d'audit
db.adminCommand({ getAuditConfig: 1 });
```

## 8. Backup et Récupération

### Sauvegarde Avancée

```bash
# Sauvegarde avec compression
mongodump --host localhost:27017 \
  --db my_database \
  --gzip \
  --archive=backup_$(date +%Y%m%d_%H%M%S).gz

# Sauvegarde sélective
mongodump --host localhost:27017 \
  --db my_database \
  --collection users \
  --query '{"active": true}' \
  --out /backup/active_users

# Sauvegarde avec authentification
mongodump --host localhost:27017 \
  --username admin \
  --password secure_password \
  --authenticationDatabase admin \
  --db my_database \
  --out /backup
```

### Récupération Point-in-Time

```bash
# Récupération complète
mongorestore --host localhost:27017 \
  --db my_database \
  --drop \
  /backup/my_database

# Récupération avec authentification
mongorestore --host localhost:27017 \
  --username admin \
  --password secure_password \
  --authenticationDatabase admin \
  --db my_database \
  --drop \
  /backup/my_database

# Récupération sélective
mongorestore --host localhost:27017 \
  --db my_database \
  --collection users \
  /backup/my_database/users.bson
```

## 9. Maintenance et Optimisation

### Maintenance Automatique

```javascript
// Script de maintenance
async function maintenanceRoutine() {
  const results = {};
  
  // Analyser les collections
  for (const collection of await db.listCollections().toArray()) {
    const collectionName = collection.name;
    results[collectionName] = {};
    
    // Reindexer si nécessaire
    const indexStats = await db[collectionName].aggregate([{ $indexStats: {} }]).toArray();
    const fragmentedIndexes = indexStats.filter(stat => stat.accesses.ops > 1000);
    
    if (fragmentedIndexes.length > 0) {
      await db[collectionName].reIndex();
      results[collectionName].reindexed = true;
    }
    
    // Nettoyer les documents expirés
    const ttlIndexes = await db[collectionName].getIndexes();
    const hasTTL = ttlIndexes.some(index => index.expireAfterSeconds !== undefined);
    
    if (hasTTL) {
      const deletedCount = await db[collectionName].deleteMany({
        $expr: { $lt: ["$created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)] }
      });
      results[collectionName].deletedOldDocs = deletedCount.deletedCount;
    }
  }
  
  // Nettoyer les logs
  await db.system.profile.deleteMany({
    ts: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  });
  
  return results;
}
```

### Optimisation des Index

```javascript
// Analyse des index inutilisés
async function analyzeUnusedIndexes() {
  const unusedIndexes = [];
  
  for (const collection of await db.listCollections().toArray()) {
    const collectionName = collection.name;
    const indexStats = await db[collectionName].aggregate([{ $indexStats: {} }]).toArray();
    
    for (const stat of indexStats) {
      if (stat.accesses.ops === 0) {
        unusedIndexes.push({
          collection: collectionName,
          index: stat.name,
          size: stat.size
        });
      }
    }
  }
  
  return unusedIndexes;
}

// Suppression des index inutilisés
async function removeUnusedIndexes() {
  const unusedIndexes = await analyzeUnusedIndexes();
  
  for (const index of unusedIndexes) {
    if (index.index !== '_id_') { // Ne pas supprimer l'index _id
      await db[index.collection].dropIndex(index.index);
      console.log(`Dropped unused index: ${index.collection}.${index.index}`);
    }
  }
}
```

## 10. Intégration et DevOps

### Configuration avec Docker

```yaml
# docker-compose.yml
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    container_name: mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: secure_password
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
      - ./mongod.conf:/etc/mongod.conf:ro
    command: ["mongod", "--config", "/etc/mongod.conf"]
    networks:
      - mongodb_network

  mongo-express:
    image: mongo-express:latest
    container_name: mongo-express
    restart: always
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: secure_password
      ME_CONFIG_MONGODB_URL: mongodb://admin:secure_password@mongodb:27017/
    depends_on:
      - mongodb
    networks:
      - mongodb_network

volumes:
  mongodb_data:

networks:
  mongodb_network:
    driver: bridge
```

### Scripts de Déploiement

```bash
#!/bin/bash
# deploy-mongodb.sh

set -e

# Variables
MONGO_VERSION="7.0"
REPLICA_SET_NAME="myReplicaSet"
ADMIN_USER="admin"
ADMIN_PASSWORD="secure_password"

# Fonction pour déployer un nœud
deploy_node() {
    local node_id=$1
    local host=$2
    local port=$3
    
    echo "Deploying MongoDB node $node_id on $host:$port"
    
    # Créer le répertoire de données
    ssh $host "mkdir -p /data/mongodb"
    
    # Copier la configuration
    scp mongod.conf $host:/etc/mongod.conf
    
    # Démarrer MongoDB
    ssh $host "docker run -d \
        --name mongodb-$node_id \
        --restart always \
        -p $port:27017 \
        -v /data/mongodb:/data/db \
        -v /etc/mongod.conf:/etc/mongod.conf \
        mongo:$MONGO_VERSION \
        mongod --config /etc/mongod.conf"
    
    echo "Node $node_id deployed successfully"
}

# Déployer les nœuds
deploy_node "1" "node1.example.com" "27017"
deploy_node "2" "node2.example.com" "27017"
deploy_node "3" "node3.example.com" "27017"

# Initialiser le replica set
echo "Initializing replica set..."
mongo --host node1.example.com:27017 --eval "
rs.initiate({
  _id: '$REPLICA_SET_NAME',
  members: [
    { _id: 0, host: 'node1.example.com:27017' },
    { _id: 1, host: 'node2.example.com:27017' },
    { _id: 2, host: 'node3.example.com:27017' }
  ]
})
"

echo "MongoDB cluster deployed successfully!"
```

## Bonnes Pratiques Expertes

1. **Design des Shard Keys** : Choisir des clés qui distribuent uniformément les données
2. **Monitoring Continu** : Surveiller les métriques de performance et de santé
3. **Backup Automatisé** : Automatiser les sauvegardes et tests de récupération
4. **Optimisation des Index** : Analyser et optimiser régulièrement les index
5. **Gestion des Conflits** : Implémenter des stratégies de résolution de conflits
6. **Sécurité** : Configurer l'authentification, l'autorisation et l'audit
7. **Haute Disponibilité** : Configurer la réplication et le failover
8. **Maintenance Préventive** : Automatiser les tâches de maintenance

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
