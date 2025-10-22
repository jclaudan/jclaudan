# 🍃 MongoDB - Guide Complet

## 📋 Tableaux de Référence Complète MongoDB

### 🎯 Types de Données

| Type | Description | Exemple | Usage |
|------|-------------|---------|-------|
| **String** | Chaîne de caractères | `"Hello World"` | Texte |
| **Integer** | Entier | `42` | Nombres entiers |
| **Double** | Nombre décimal | `3.14159` | Nombres décimaux |
| **Boolean** | Booléen | `true, false` | Valeurs booléennes |
| **Date** | Date | `ISODate("2024-01-15T10:30:00Z")` | Dates et heures |
| **ObjectId** | Identifiant unique | `ObjectId("507f1f77bcf86cd799439011")` | Clés primaires |
| **Array** | Tableau | `[1, 2, 3]` | Listes |
| **Object** | Objet | `{name: "John", age: 30}` | Objets imbriqués |
| **Null** | Valeur nulle | `null` | Valeurs nulles |
| **Binary** | Données binaires | `BinData(0, "SGVsbG8=")` | Images, fichiers |
| **Regular Expression** | Expression régulière | `/pattern/i` | Recherche |
| **JavaScript** | Code JavaScript | `function() { return true; }` | Fonctions |
| **MinKey** | Clé minimale | `MinKey()` | Comparaisons |
| **MaxKey** | Clé maximale | `MaxKey()` | Comparaisons |
| **Decimal128** | Décimal 128 bits | `NumberDecimal("123.45")` | Précision monétaire |
| **Timestamp** | Horodatage | `Timestamp(1642248600, 1)` | Horodatage interne |

### 🎯 Opérations CRUD

| Opération | Méthode | Description | Exemple |
|-----------|---------|-------------|---------|
| **Create** | `insertOne()` | Insérer un document | `db.users.insertOne({name: "John"})` |
| **Create** | `insertMany()` | Insérer plusieurs documents | `db.users.insertMany([{name: "John"}, {name: "Jane"}])` |
| **Read** | `findOne()` | Trouver un document | `db.users.findOne({name: "John"})` |
| **Read** | `find()` | Trouver plusieurs documents | `db.users.find({age: {$gt: 18}})` |
| **Update** | `updateOne()` | Mettre à jour un document | `db.users.updateOne({name: "John"}, {$set: {age: 30}})` |
| **Update** | `updateMany()` | Mettre à jour plusieurs documents | `db.users.updateMany({active: true}, {$set: {lastLogin: new Date()}})` |
| **Update** | `replaceOne()` | Remplacer un document | `db.users.replaceOne({name: "John"}, {name: "John", age: 30})` |
| **Delete** | `deleteOne()` | Supprimer un document | `db.users.deleteOne({name: "John"})` |
| **Delete** | `deleteMany()` | Supprimer plusieurs documents | `db.users.deleteMany({active: false})` |

### 🎯 Opérateurs de Requête

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$eq** | Égal | `{age: {$eq: 30}}` | Égalité |
| **$ne** | Différent | `{age: {$ne: 30}}` | Différence |
| **$gt** | Supérieur | `{age: {$gt: 18}}` | Supériorité |
| **$gte** | Supérieur ou égal | `{age: {$gte: 18}}` | Supériorité ou égalité |
| **$lt** | Inférieur | `{age: {$lt: 65}}` | Infériorité |
| **$lte** | Inférieur ou égal | `{age: {$lte: 65}}` | Infériorité ou égalité |
| **$in** | Dans | `{age: {$in: [18, 30, 45]}}` | Appartenance |
| **$nin** | Pas dans | `{age: {$nin: [18, 30, 45]}}` | Non appartenance |
| **$exists** | Existe | `{email: {$exists: true}}` | Existence |
| **$regex** | Expression régulière | `{name: {$regex: /^J/}}` | Recherche |
| **$text** | Recherche textuelle | `{$text: {$search: "John"}}` | Recherche full-text |
| **$where** | Condition JavaScript | `{$where: "this.age > this.salary"}` | Condition personnalisée |

### 🎯 Opérateurs Logiques

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$and** | ET | `{$and: [{age: {$gt: 18}}, {active: true}]}` | Conjonction |
| **$or** | OU | `{$or: [{age: {$lt: 18}}, {age: {$gt: 65}}]}` | Disjonction |
| **$nor** | NI | `{$nor: [{age: {$lt: 18}}, {active: false}]}` | Négation |
| **$not** | NON | `{age: {$not: {$gt: 18}}}` | Négation |

### 🎯 Opérateurs de Mise à Jour

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$set** | Définir | `{$set: {age: 30}}` | Définir une valeur |
| **$unset** | Supprimer | `{$unset: {age: ""}}` | Supprimer un champ |
| **$inc** | Incrémenter | `{$inc: {age: 1}}` | Incrémenter |
| **$mul** | Multiplier | `{$mul: {price: 1.1}}` | Multiplier |
| **$rename** | Renommer | `{$rename: {oldName: "newName"}}` | Renommer un champ |
| **$min** | Minimum | `{$min: {age: 25}}` | Valeur minimale |
| **$max** | Maximum | `{$max: {age: 65}}` | Valeur maximale |
| **$currentDate** | Date actuelle | `{$currentDate: {lastModified: true}}` | Date actuelle |
| **$addToSet** | Ajouter à l'ensemble | `{$addToSet: {tags: "new"}}` | Ajouter unique |
| **$push** | Ajouter | `{$push: {tags: "new"}}` | Ajouter |
| **$pull** | Retirer | `{$pull: {tags: "old"}}` | Retirer |
| **$pop** | Supprimer premier/dernier | `{$pop: {tags: 1}}` | Supprimer élément |
| **$pullAll** | Retirer tous | `{$pullAll: {tags: ["old", "bad"]}}` | Retirer plusieurs |

### 🎯 Opérateurs de Tableau

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$all** | Tous les éléments | `{tags: {$all: ["red", "blue"]}}` | Contient tous |
| **$elemMatch** | Élément correspondant | `{scores: {$elemMatch: {$gte: 80}}}` | Élément correspondant |
| **$size** | Taille | `{tags: {$size: 3}}` | Taille du tableau |
| **$** | Position | `{scores.$: 85}` | Position dans le tableau |
| **$[]** | Tous les éléments | `{scores.$[]: 0}` | Tous les éléments |
| **$[<identifier>]** | Éléments correspondants | `{scores.$[elem]: 0}` | Éléments correspondants |

### 🎯 Opérateurs d'Agrégation

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$match** | Filtrer | `{$match: {age: {$gt: 18}}}` | Filtrage |
| **$group** | Grouper | `{$group: {_id: "$department", count: {$sum: 1}}}` | Groupement |
| **$project** | Projeter | `{$project: {name: 1, age: 1}}` | Sélection de champs |
| **$sort** | Trier | `{$sort: {age: -1}}` | Tri |
| **$limit** | Limiter | `{$limit: 10}` | Limitation |
| **$skip** | Ignorer | `{$skip: 5}` | Pagination |
| **$lookup** | Jointure | `{$lookup: {from: "orders", localField: "_id", foreignField: "userId", as: "orders"}}` | Jointure |
| **$unwind** | Dérouler | `{$unwind: "$tags"}` | Dérouler un tableau |
| **$addFields** | Ajouter des champs | `{$addFields: {fullName: {$concat: ["$firstName", " ", "$lastName"]}}}` | Ajouter des champs |
| **$replaceRoot** | Remplacer la racine | `{$replaceRoot: {newRoot: "$user"}}` | Remplacer la racine |

### 🎯 Opérateurs d'Agrégation - Fonctions

| Fonction | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **$sum** | Somme | `{$sum: "$price"}` | Somme |
| **$avg** | Moyenne | `{$avg: "$age"}` | Moyenne |
| **$min** | Minimum | `{$min: "$age"}` | Minimum |
| **$max** | Maximum | `{$max: "$age"}` | Maximum |
| **$first** | Premier | `{$first: "$name"}` | Premier élément |
| **$last** | Dernier | `{$last: "$name"}` | Dernier élément |
| **$push** | Ajouter | `{$push: "$name"}` | Ajouter à un tableau |
| **$addToSet** | Ajouter unique | `{$addToSet: "$name"}` | Ajouter unique |
| **$count** | Compter | `{$count: "total"}` | Compter |
| **$size** | Taille | `{$size: "$tags"}` | Taille d'un tableau |

### 🎯 Opérateurs de Date

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$year** | Année | `{$year: "$date"}` | Année |
| **$month** | Mois | `{$month: "$date"}` | Mois |
| **$dayOfMonth** | Jour du mois | `{$dayOfMonth: "$date"}` | Jour du mois |
| **$dayOfWeek** | Jour de la semaine | `{$dayOfWeek: "$date"}` | Jour de la semaine |
| **$dayOfYear** | Jour de l'année | `{$dayOfYear: "$date"}` | Jour de l'année |
| **$hour** | Heure | `{$hour: "$date"}` | Heure |
| **$minute** | Minute | `{$minute: "$date"}` | Minute |
| **$second** | Seconde | `{$second: "$date"}` | Seconde |
| **$millisecond** | Milliseconde | `{$millisecond: "$date"}` | Milliseconde |
| **$dateToString** | Formatage | `{$dateToString: {format: "%Y-%m-%d", date: "$date"}}` | Formatage |

### 🎯 Opérateurs de Chaîne

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$concat** | Concaténer | `{$concat: ["$firstName", " ", "$lastName"]}` | Concaténation |
| **$substr** | Sous-chaîne | `{$substr: ["$name", 0, 5]}` | Sous-chaîne |
| **$toLower** | Minuscules | `{$toLower: "$name"}` | Minuscules |
| **$toUpper** | Majuscules | `{$toUpper: "$name"}` | Majuscules |
| **$trim** | Supprimer espaces | `{$trim: {input: "$name"}}` | Supprimer espaces |
| **$ltrim** | Supprimer espaces gauche | `{$ltrim: {input: "$name"}}` | Supprimer espaces gauche |
| **$rtrim** | Supprimer espaces droite | `{$rtrim: {input: "$name"}}` | Supprimer espaces droite |
| **$split** | Diviser | `{$split: ["$name", " "]}` | Division |
| **$strLenBytes** | Longueur en bytes | `{$strLenBytes: "$name"}` | Longueur en bytes |
| **$strLenCP** | Longueur en caractères | `{$strLenCP: "$name"}` | Longueur en caractères |

### 🎯 Opérateurs Mathématiques

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$add** | Addition | `{$add: ["$price", "$tax"]}` | Addition |
| **$subtract** | Soustraction | `{$subtract: ["$price", "$discount"]}` | Soustraction |
| **$multiply** | Multiplication | `{$multiply: ["$price", 1.1]}` | Multiplication |
| **$divide** | Division | `{$divide: ["$total", "$count"]}` | Division |
| **$mod** | Modulo | `{$mod: ["$age", 10]}` | Modulo |
| **$abs** | Valeur absolue | `{$abs: "$price"}` | Valeur absolue |
| **$ceil** | Arrondir vers le haut | `{$ceil: "$price"}` | Arrondir vers le haut |
| **$floor** | Arrondir vers le bas | `{$floor: "$price"}` | Arrondir vers le bas |
| **$round** | Arrondir | `{$round: ["$price", 2]}` | Arrondir |
| **$sqrt** | Racine carrée | `{$sqrt: "$number"}` | Racine carrée |

### 🎯 Opérateurs Conditionnels

| Opérateur | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **$cond** | Condition | `{$cond: {if: {$gt: ["$age", 18]}, then: "adult", else: "minor"}}` | Condition |
| **$ifNull** | Si null | `{$ifNull: ["$name", "Unknown"]}` | Valeur par défaut |
| **$switch** | Switch | `{$switch: {branches: [{case: {$eq: ["$type", "A"]}, then: "Type A"}], default: "Other"}}` | Switch |
| **$case** | Cas | `{$case: {when: {$gt: ["$age", 18]}, then: "adult"}}` | Cas |

### 🎯 Index

| Type | Description | Exemple | Usage |
|------|-------------|---------|-------|
| **Single Field** | Index sur un champ | `db.users.createIndex({name: 1})` | Index simple |
| **Compound** | Index composite | `db.users.createIndex({name: 1, age: -1})` | Index composite |
| **Multikey** | Index sur tableau | `db.users.createIndex({tags: 1})` | Index sur tableau |
| **Text** | Index textuel | `db.users.createIndex({name: "text", bio: "text"})` | Recherche textuelle |
| **2dsphere** | Index géospatial | `db.places.createIndex({location: "2dsphere"})` | Géospatial |
| **2d** | Index 2D | `db.places.createIndex({location: "2d"})` | 2D |
| **Hashed** | Index hashé | `db.users.createIndex({_id: "hashed"})` | Sharding |
| **Sparse** | Index creux | `db.users.createIndex({email: 1}, {sparse: true})` | Champs optionnels |
| **Partial** | Index partiel | `db.users.createIndex({name: 1}, {partialFilterExpression: {active: true}})` | Index conditionnel |
| **TTL** | Index TTL | `db.sessions.createIndex({createdAt: 1}, {expireAfterSeconds: 3600})` | Expiration |

### 🎯 Opérations de Collection

| Opération | Description | Exemple | Usage |
|-----------|-------------|---------|-------|
| **createCollection** | Créer une collection | `db.createCollection("users")` | Création |
| **dropCollection** | Supprimer une collection | `db.users.drop()` | Suppression |
| **renameCollection** | Renommer une collection | `db.users.renameCollection("customers")` | Renommage |
| **createIndex** | Créer un index | `db.users.createIndex({name: 1})` | Index |
| **dropIndex** | Supprimer un index | `db.users.dropIndex({name: 1})` | Suppression index |
| **getIndexes** | Lister les index | `db.users.getIndexes()` | Liste des index |
| **countDocuments** | Compter les documents | `db.users.countDocuments({active: true})` | Comptage |
| **distinct** | Valeurs distinctes | `db.users.distinct("department")` | Valeurs uniques |
| **aggregate** | Agrégation | `db.users.aggregate([{$group: {_id: "$department", count: {$sum: 1}}}])` | Agrégation |
| **mapReduce** | Map-Reduce | `db.users.mapReduce(map, reduce, {out: "results"})` | Map-Reduce |

---

## 🚀 Introduction

MongoDB est une base de données NoSQL orientée documents qui stocke les données sous forme de documents JSON-like (BSON). Elle est connue pour sa flexibilité et sa scalabilité.

## 🎯 Installation et Configuration

### Installation

```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# CentOS/RHEL
sudo yum install -y mongodb-org

# macOS avec Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Docker
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

### Configuration de Base

```javascript
// Connexion
use mydb

// Créer un utilisateur
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: [
    { role: "readWrite", db: "mydb" }
  ]
})

// Créer une collection
db.createCollection("users")
```

## 🎯 Utilisation avec NestJS

### Configuration Mongoose

```typescript
// app.module.ts
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true
      }),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}
```

### Schéma Mongoose

```typescript
// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string

  @Prop({ required: true, unique: true, maxlength: 255 })
  email: string

  @Prop({ maxlength: 500 })
  bio: string

  @Prop({ default: true })
  active: boolean

  @Prop({ type: Object })
  metadata: Record<string, any>

  @Prop({ type: [String] })
  tags: string[]

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
```

### Service avec Requêtes Avancées

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, FilterQuery, UpdateQuery } from 'mongoose'
import { User } from './user.schema'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec()
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto)
    return await user.save()
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec()
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec()
  }

  // Requêtes avancées
  async findActiveUsers(): Promise<User[]> {
    return await this.userModel
      .find({ active: true })
      .sort({ createdAt: -1 })
      .exec()
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    return await this.userModel
      .find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } }
        ]
      })
      .exec()
  }

  async findUsersByTags(tags: string[]): Promise<User[]> {
    return await this.userModel
      .find({ tags: { $in: tags } })
      .exec()
  }

  async findUsersWithMetadata(): Promise<User[]> {
    return await this.userModel
      .find({ metadata: { $exists: true, $ne: null } })
      .exec()
  }

  async findUsersByDateRange(startDate: Date, endDate: Date): Promise<User[]> {
    return await this.userModel
      .find({
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .exec()
  }

  // Requêtes avec agrégation
  async getUserStats(): Promise<any> {
    return await this.userModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: { $sum: { $cond: ['$active', 1, 0] } },
          inactive: { $sum: { $cond: ['$active', 0, 1] } }
        }
      }
    ]).exec()
  }

  async getUsersByDepartment(): Promise<any[]> {
    return await this.userModel.aggregate([
      {
        $group: {
          _id: '$metadata.department',
          count: { $sum: 1 },
          avgAge: { $avg: '$metadata.age' }
        }
      },
      { $sort: { count: -1 } }
    ]).exec()
  }

  // Requêtes avec jointures
  async getUsersWithOrders(): Promise<any[]> {
    return await this.userModel.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $addFields: {
          orderCount: { $size: '$orders' },
          totalSpent: { $sum: '$orders.total' }
        }
      }
    ]).exec()
  }

  // Requêtes avec fenêtrage
  async getUsersWithRank(): Promise<any[]> {
    return await this.userModel.aggregate([
      {
        $addFields: {
          rank: {
            $rank: {
              over: { sortBy: { createdAt: 1 } }
            }
          }
        }
      }
    ]).exec()
  }

  // Requêtes avec pagination
  async findWithPagination(page: number, limit: number): Promise<{ users: User[], total: number }> {
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).exec(),
      this.userModel.countDocuments().exec()
    ])

    return { users, total }
  }
}
```

## 🎯 Requêtes Avancées

### Agrégation Complexe

```javascript
// Pipeline d'agrégation complexe
db.users.aggregate([
  // Étape 1: Filtrer les utilisateurs actifs
  {
    $match: {
      active: true,
      createdAt: { $gte: ISODate("2024-01-01") }
    }
  },
  
  // Étape 2: Ajouter des champs calculés
  {
    $addFields: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      age: {
        $divide: [
          { $subtract: [new Date(), "$birthDate"] },
          365 * 24 * 60 * 60 * 1000
        ]
      }
    }
  },
  
  // Étape 3: Grouper par département
  {
    $group: {
      _id: "$department",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
      users: { $push: "$$ROOT" }
    }
  },
  
  // Étape 4: Trier par nombre d'utilisateurs
  {
    $sort: { count: -1 }
  },
  
  // Étape 5: Limiter les résultats
  {
    $limit: 10
  }
])
```

### Requêtes avec Index

```javascript
// Créer des index
db.users.createIndex({ email: 1 })
db.users.createIndex({ name: 1, age: -1 })
db.users.createIndex({ "metadata.department": 1 })
db.users.createIndex({ tags: 1 })
db.users.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })

// Requêtes optimisées
db.users.find({ email: "john@example.com" }) // Utilise l'index email
db.users.find({ name: "John", age: { $gte: 18 } }) // Utilise l'index composite
db.users.find({ "metadata.department": "IT" }) // Utilise l'index metadata
db.users.find({ tags: "developer" }) // Utilise l'index tags
```

### Requêtes Géospatiales

```javascript
// Créer un index géospatial
db.places.createIndex({ location: "2dsphere" })

// Requêtes géospatiales
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-73.9857, 40.7484]
      },
      $maxDistance: 1000
    }
  }
})

// Recherche dans un polygone
db.places.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [[
          [-74.0, 40.7],
          [-74.0, 40.8],
          [-73.9, 40.8],
          [-73.9, 40.7],
          [-74.0, 40.7]
        ]]
      }
    }
  }
})
```

## 🎯 Optimisation des Performances

### Index et Analyse

```javascript
// Analyser les performances
db.users.find({ email: "john@example.com" }).explain("executionStats")

// Créer des index optimisés
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ name: 1, age: -1 })
db.users.createIndex({ "metadata.department": 1 }, { sparse: true })
db.users.createIndex({ tags: 1 }, { background: true })

// Index partiel
db.users.createIndex(
  { name: 1 },
  { partialFilterExpression: { active: true } }
)

// Index TTL
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)
```

### Requêtes Optimisées

```typescript
// Service optimisé
@Injectable()
export class OptimizedUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  // Utilisation d'index
  async findByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select('name email active') // Sélection spécifique
      .exec()
  }

  // Pagination efficace
  async findWithPagination(page: number, limit: number): Promise<{ users: User[], total: number }> {
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      this.userModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.userModel.countDocuments().exec()
    ])

    return { users, total }
  }

  // Requête avec cache
  @Cacheable('users', 300) // Cache 5 minutes
  async findCachedUsers(): Promise<User[]> {
    return await this.userModel
      .find({ active: true })
      .exec()
  }

  // Requête avec projection
  async findUserNames(): Promise<{ name: string, email: string }[]> {
    return await this.userModel
      .find({ active: true })
      .select('name email')
      .exec()
  }
}
```

## 🎯 Sécurité

### Gestion des Rôles

```javascript
// Créer des rôles
db.createRole({
  role: "app_user",
  privileges: [
    {
      resource: { db: "mydb", collection: "users" },
      actions: ["find", "insert", "update"]
    }
  ],
  roles: []
})

// Créer un utilisateur avec rôle
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: [
    { role: "app_user", db: "mydb" }
  ]
})
```

### Requêtes Sécurisées

```typescript
// Service sécurisé
@Injectable()
export class SecureUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  // Validation des entrées
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validation avec class-validator
    const user = new this.userModel(createUserDto)
    return await user.save()
  }

  // Requêtes sécurisées
  async findByName(name: string): Promise<User[]> {
    // Échapper les caractères spéciaux
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return await this.userModel
      .find({ name: { $regex: escapedName, $options: 'i' } })
      .exec()
  }

  // Audit des modifications
  async updateWithAudit(id: string, updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        ...updateUserDto,
        updatedBy: userId,
        updatedAt: new Date()
      },
      { new: true }
    ).exec()
  }
}
```

## 📚 Ressources

### Documentation officielle
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

### Outils et services
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Interface graphique
- [Studio 3T](https://studio3t.com/) - IDE MongoDB
- [MongoDB Atlas](https://www.mongodb.com/atlas) - MongoDB as a Service
- [Robo 3T](https://robomongo.org/) - Client MongoDB

### Communautés et ressources
- [MongoDB Community](https://community.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Exercises](https://university.mongodb.com/courses/M001/about)

---

*Dernière mise à jour : Janvier 2024*
