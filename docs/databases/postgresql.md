# 🐘 PostgreSQL - Guide Complet

## 📋 Tableaux de Référence Complète PostgreSQL

### 🎯 Types de Données

| Type | Description | Taille | Exemple | Usage |
|------|-------------|--------|---------|-------|
| **INTEGER** | Entier | 4 bytes | `42` | Nombres entiers |
| **BIGINT** | Grand entier | 8 bytes | `9223372036854775807` | Grands nombres |
| **SMALLINT** | Petit entier | 2 bytes | `32767` | Petits nombres |
| **DECIMAL** | Décimal exact | Variable | `123.45` | Monnaie, précision |
| **NUMERIC** | Numérique | Variable | `123.456789` | Calculs précis |
| **REAL** | Réel simple | 4 bytes | `3.14159` | Nombres flottants |
| **DOUBLE PRECISION** | Réel double | 8 bytes | `3.141592653589793` | Précision double |
| **SERIAL** | Sérial | 4 bytes | `1, 2, 3...` | Clés primaires |
| **BIGSERIAL** | Grand sérial | 8 bytes | `1, 2, 3...` | Grandes clés |
| **SMALLSERIAL** | Petit sérial | 2 bytes | `1, 2, 3...` | Petites clés |

### 🎯 Types de Texte

| Type | Description | Taille | Exemple | Usage |
|------|-------------|--------|---------|-------|
| **CHAR(n)** | Caractère fixe | n bytes | `'Hello'` | Texte fixe |
| **VARCHAR(n)** | Caractère variable | Variable | `'Hello'` | Texte variable |
| **TEXT** | Texte long | Variable | `'Long text...'` | Texte illimité |
| **CITEXT** | Texte insensible | Variable | `'Hello'` | Recherche insensible |
| **CHARACTER VARYING** | Alias VARCHAR | Variable | `'Hello'` | Alias |
| **CHARACTER** | Alias CHAR | n bytes | `'Hello'` | Alias |

### 🎯 Types de Date et Heure

| Type | Description | Taille | Exemple | Usage |
|------|-------------|--------|---------|-------|
| **DATE** | Date | 4 bytes | `'2024-01-15'` | Dates |
| **TIME** | Heure | 8 bytes | `'14:30:00'` | Heures |
| **TIMESTAMP** | Date et heure | 8 bytes | `'2024-01-15 14:30:00'` | Date et heure |
| **TIMESTAMPTZ** | Date et heure TZ | 8 bytes | `'2024-01-15 14:30:00+01'` | Avec fuseau |
| **INTERVAL** | Intervalle | 16 bytes | `'1 day 2 hours'` | Durées |
| **TIME WITH TIME ZONE** | Heure avec TZ | 12 bytes | `'14:30:00+01'` | Heure avec fuseau |

### 🎯 Types Booléens et Binaires

| Type | Description | Taille | Exemple | Usage |
|------|-------------|--------|---------|-------|
| **BOOLEAN** | Booléen | 1 byte | `true, false` | Valeurs booléennes |
| **BYTEA** | Données binaires | Variable | `'\xDEADBEEF'` | Images, fichiers |
| **BIT(n)** | Bits | n bits | `B'1010'` | Données binaires |
| **VARBIT(n)** | Bits variables | Variable | `B'1010'` | Bits variables |

### 🎯 Types Géométriques

| Type | Description | Taille | Exemple | Usage |
|------|-------------|--------|---------|-------|
| **POINT** | Point | 16 bytes | `(1,2)` | Coordonnées |
| **LINE** | Ligne | 32 bytes | `{1,2,3}` | Lignes |
| **LSEG** | Segment | 32 bytes | `[(1,2),(3,4)]` | Segments |
| **BOX** | Rectangle | 32 bytes | `(1,2),(3,4)` | Rectangles |
| **PATH** | Chemin | Variable | `[(1,2),(3,4)]` | Chemins |
| **POLYGON** | Polygone | Variable | `((1,2),(3,4))` | Polygones |
| **CIRCLE** | Cercle | 24 bytes | `<(1,2),3>` | Cercles |

### 🎯 Types de Réseau

| Type | Description | Taille | Exemple | Usage |
|------|-------------|--------|---------|-------|
| **INET** | Adresse IP | 7-19 bytes | `'192.168.1.1'` | Adresses IP |
| **CIDR** | Réseau CIDR | 7-19 bytes | `'192.168.1.0/24'` | Réseaux |
| **MACADDR** | Adresse MAC | 6 bytes | `'08:00:2b:01:02:03'` | Adresses MAC |
| **MACADDR8** | Adresse MAC 8 | 8 bytes | `'08:00:2b:01:02:03:04:05'` | MAC 8 bytes |

### 🎯 Types JSON

| Type | Description | Taille | Exemple | Usage |
|------|-------------|--------|---------|-------|
| **JSON** | JSON | Variable | `'{"key": "value"}'` | JSON brut |
| **JSONB** | JSON binaire | Variable | `'{"key": "value"}'` | JSON optimisé |
| **JSONPATH** | Chemin JSON | Variable | `'$.key'` | Chemins JSON |

### 🎯 Types de Tableau

| Type | Description | Exemple | Usage |
|------|-------------|---------|-------|
| **INTEGER[]** | Tableau d'entiers | `{1,2,3}` | Listes d'entiers |
| **TEXT[]** | Tableau de texte | `{'a','b','c'}` | Listes de texte |
| **JSONB[]** | Tableau JSON | `{'{"a":1}','{"b":2}'}` | Listes JSON |

### 🎯 Commandes DDL (Data Definition Language)

| Commande | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **CREATE DATABASE** | Créer une base | `CREATE DATABASE mydb;` | Nouvelle base |
| **DROP DATABASE** | Supprimer une base | `DROP DATABASE mydb;` | Suppression |
| **CREATE TABLE** | Créer une table | `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));` | Nouvelle table |
| **ALTER TABLE** | Modifier une table | `ALTER TABLE users ADD COLUMN email VARCHAR(255);` | Modification |
| **DROP TABLE** | Supprimer une table | `DROP TABLE users;` | Suppression |
| **CREATE INDEX** | Créer un index | `CREATE INDEX idx_users_name ON users(name);` | Performance |
| **DROP INDEX** | Supprimer un index | `DROP INDEX idx_users_name;` | Suppression |
| **CREATE VIEW** | Créer une vue | `CREATE VIEW user_view AS SELECT * FROM users;` | Vue |
| **DROP VIEW** | Supprimer une vue | `DROP VIEW user_view;` | Suppression |
| **CREATE SEQUENCE** | Créer une séquence | `CREATE SEQUENCE user_seq;` | Séquences |

### 🎯 Commandes DML (Data Manipulation Language)

| Commande | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **SELECT** | Sélectionner | `SELECT * FROM users;` | Lecture |
| **INSERT** | Insérer | `INSERT INTO users (name) VALUES ('John');` | Création |
| **UPDATE** | Mettre à jour | `UPDATE users SET name = 'Jane' WHERE id = 1;` | Modification |
| **DELETE** | Supprimer | `DELETE FROM users WHERE id = 1;` | Suppression |
| **MERGE** | Fusionner | `MERGE INTO users USING ...` | Fusion |
| **UPSERT** | Insérer/Mettre à jour | `INSERT ... ON CONFLICT ...` | Upsert |

### 🎯 Clauses SELECT

| Clause | Description | Exemple | Usage |
|--------|-------------|---------|-------|
| **WHERE** | Condition | `WHERE age > 18` | Filtrage |
| **GROUP BY** | Grouper | `GROUP BY department` | Groupement |
| **HAVING** | Condition sur groupe | `HAVING COUNT(*) > 5` | Filtrage groupe |
| **ORDER BY** | Trier | `ORDER BY name ASC` | Tri |
| **LIMIT** | Limiter | `LIMIT 10` | Limitation |
| **OFFSET** | Décaler | `OFFSET 20` | Pagination |
| **DISTINCT** | Distinct | `SELECT DISTINCT name` | Unicité |
| **UNION** | Union | `SELECT ... UNION SELECT ...` | Union |
| **INTERSECT** | Intersection | `SELECT ... INTERSECT SELECT ...` | Intersection |
| **EXCEPT** | Différence | `SELECT ... EXCEPT SELECT ...` | Différence |

### 🎯 Jointures

| Type | Description | Syntaxe | Usage |
|------|-------------|---------|-------|
| **INNER JOIN** | Jointure interne | `FROM a INNER JOIN b ON a.id = b.a_id` | Intersection |
| **LEFT JOIN** | Jointure gauche | `FROM a LEFT JOIN b ON a.id = b.a_id` | Tous A + B |
| **RIGHT JOIN** | Jointure droite | `FROM a RIGHT JOIN b ON a.id = b.a_id` | Tous B + A |
| **FULL OUTER JOIN** | Jointure complète | `FROM a FULL OUTER JOIN b ON a.id = b.a_id` | Tous A et B |
| **CROSS JOIN** | Produit cartésien | `FROM a CROSS JOIN b` | Toutes combinaisons |
| **SELF JOIN** | Auto-jointure | `FROM a a1 JOIN a a2 ON a1.id = a2.parent_id` | Référence |

### 🎯 Fonctions d'Agrégation

| Fonction | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **COUNT** | Compter | `COUNT(*)` | Nombre d'éléments |
| **SUM** | Somme | `SUM(price)` | Somme des valeurs |
| **AVG** | Moyenne | `AVG(age)` | Moyenne |
| **MIN** | Minimum | `MIN(date)` | Valeur minimale |
| **MAX** | Maximum | `MAX(score)` | Valeur maximale |
| **STDDEV** | Écart-type | `STDDEV(price)` | Écart-type |
| **VARIANCE** | Variance | `VARIANCE(price)` | Variance |
| **ARRAY_AGG** | Tableau | `ARRAY_AGG(name)` | Tableau de valeurs |
| **STRING_AGG** | Concaténation | `STRING_AGG(name, ',')` | Concaténation |
| **JSON_AGG** | JSON | `JSON_AGG(row_to_json(t))` | JSON |

### 🎯 Fonctions de Fenêtrage

| Fonction | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **ROW_NUMBER** | Numéro de ligne | `ROW_NUMBER() OVER (ORDER BY name)` | Numérotation |
| **RANK** | Rang | `RANK() OVER (ORDER BY score)` | Classement |
| **DENSE_RANK** | Rang dense | `DENSE_RANK() OVER (ORDER BY score)` | Classement dense |
| **LAG** | Valeur précédente | `LAG(price) OVER (ORDER BY date)` | Valeur précédente |
| **LEAD** | Valeur suivante | `LEAD(price) OVER (ORDER BY date)` | Valeur suivante |
| **FIRST_VALUE** | Première valeur | `FIRST_VALUE(price) OVER (PARTITION BY category)` | Première valeur |
| **LAST_VALUE** | Dernière valeur | `LAST_VALUE(price) OVER (PARTITION BY category)` | Dernière valeur |
| **NTILE** | Quantiles | `NTILE(4) OVER (ORDER BY score)` | Quantiles |
| **PERCENT_RANK** | Rang en pourcentage | `PERCENT_RANK() OVER (ORDER BY score)` | Rang relatif |
| **CUME_DIST** | Distribution cumulative | `CUME_DIST() OVER (ORDER BY score)` | Distribution |

### 🎯 Fonctions de Date

| Fonction | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **NOW** | Maintenant | `NOW()` | Date/heure actuelle |
| **CURRENT_DATE** | Date actuelle | `CURRENT_DATE` | Date actuelle |
| **CURRENT_TIME** | Heure actuelle | `CURRENT_TIME` | Heure actuelle |
| **EXTRACT** | Extraire | `EXTRACT(YEAR FROM date)` | Extraction |
| **DATE_TRUNC** | Tronquer | `DATE_TRUNC('month', date)` | Troncature |
| **AGE** | Âge | `AGE(date)` | Calcul d'âge |
| **INTERVAL** | Intervalle | `INTERVAL '1 day'` | Intervalle |
| **TO_CHAR** | Formatage | `TO_CHAR(date, 'YYYY-MM-DD')` | Formatage |
| **TO_DATE** | Conversion | `TO_DATE('2024-01-15', 'YYYY-MM-DD')` | Conversion |
| **DATE_PART** | Partie de date | `DATE_PART('year', date)` | Partie de date |

### 🎯 Fonctions de Texte

| Fonction | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **LENGTH** | Longueur | `LENGTH(text)` | Longueur |
| **UPPER** | Majuscules | `UPPER(text)` | Majuscules |
| **LOWER** | Minuscules | `LOWER(text)` | Minuscules |
| **TRIM** | Supprimer espaces | `TRIM(text)` | Nettoyage |
| **SUBSTRING** | Sous-chaîne | `SUBSTRING(text, 1, 5)` | Extraction |
| **REPLACE** | Remplacer | `REPLACE(text, 'old', 'new')` | Remplacement |
| **CONCAT** | Concaténer | `CONCAT(a, b)` | Concaténation |
| **SPLIT_PART** | Diviser | `SPLIT_PART(text, ',', 1)` | Division |
| **REGEXP_REPLACE** | Regex | `REGEXP_REPLACE(text, 'pattern', 'replacement')` | Regex |
| **POSITION** | Position | `POSITION('sub' IN text)` | Position |

### 🎯 Fonctions JSON

| Fonction | Description | Exemple | Usage |
|----------|-------------|---------|-------|
| **json_extract_path** | Extraire chemin | `json_extract_path(data, 'key')` | Extraction |
| **json_extract_path_text** | Extraire texte | `json_extract_path_text(data, 'key')` | Extraction texte |
| **json_build_object** | Construire objet | `json_build_object('key', value)` | Construction |
| **json_build_array** | Construire tableau | `json_build_array(1, 2, 3)` | Construction |
| **json_agg** | Agrégation JSON | `json_agg(row_to_json(t))` | Agrégation |
| **json_object_agg** | Objet agrégé | `json_object_agg(key, value)` | Objet agrégé |
| **json_array_length** | Longueur tableau | `json_array_length(data)` | Longueur |
| **json_typeof** | Type JSON | `json_typeof(data)` | Type |
| **json_strip_nulls** | Supprimer nulls | `json_strip_nulls(data)` | Nettoyage |
| **json_pretty** | Formatage | `json_pretty(data)` | Formatage |

### 🎯 Index

| Type | Description | Usage | Exemple |
|------|-------------|-------|---------|
| **B-tree** | Index B-tree | Général | `CREATE INDEX idx_name ON users(name);` |
| **Hash** | Index hash | Égalité | `CREATE INDEX idx_id ON users USING hash(id);` |
| **GIN** | Index GIN | Tableaux, JSON | `CREATE INDEX idx_tags ON posts USING gin(tags);` |
| **GiST** | Index GiST | Géométrie | `CREATE INDEX idx_location ON places USING gist(location);` |
| **SP-GiST** | Index SP-GiST | Spécialisé | `CREATE INDEX idx_phone ON users USING spgist(phone);` |
| **BRIN** | Index BRIN | Grandes tables | `CREATE INDEX idx_date ON logs USING brin(created_at);` |
| **Partial** | Index partiel | Condition | `CREATE INDEX idx_active ON users(name) WHERE active = true;` |
| **Expression** | Index d'expression | Calculé | `CREATE INDEX idx_upper ON users(UPPER(name));` |
| **Composite** | Index composite | Multi-colonnes | `CREATE INDEX idx_name_email ON users(name, email);` |
| **Unique** | Index unique | Unicité | `CREATE UNIQUE INDEX idx_email ON users(email);` |

### 🎯 Contraintes

| Type | Description | Exemple | Usage |
|------|-------------|---------|-------|
| **PRIMARY KEY** | Clé primaire | `id SERIAL PRIMARY KEY` | Identifiant unique |
| **FOREIGN KEY** | Clé étrangère | `FOREIGN KEY (user_id) REFERENCES users(id)` | Référence |
| **UNIQUE** | Unique | `email VARCHAR(255) UNIQUE` | Unicité |
| **NOT NULL** | Non null | `name VARCHAR(100) NOT NULL` | Obligatoire |
| **CHECK** | Vérification | `CHECK (age >= 0)` | Validation |
| **DEFAULT** | Valeur par défaut | `created_at TIMESTAMP DEFAULT NOW()` | Valeur par défaut |
| **EXCLUDE** | Exclusion | `EXCLUDE (name WITH =)` | Exclusion |

### 🎯 Transactions

| Commande | Description | Usage |
|----------|-------------|-------|
| **BEGIN** | Commencer | `BEGIN;` |
| **COMMIT** | Valider | `COMMIT;` |
| **ROLLBACK** | Annuler | `ROLLBACK;` |
| **SAVEPOINT** | Point de sauvegarde | `SAVEPOINT sp1;` |
| **ROLLBACK TO** | Annuler vers | `ROLLBACK TO sp1;` |
| **RELEASE** | Libérer | `RELEASE SAVEPOINT sp1;` |

### 🎯 Niveaux d'Isolement

| Niveau | Description | Problèmes résolus |
|--------|-------------|-------------------|
| **READ UNCOMMITTED** | Lecture non validée | Aucun |
| **READ COMMITTED** | Lecture validée | Dirty read |
| **REPEATABLE READ** | Lecture répétable | Dirty read, Non-repeatable read |
| **SERIALIZABLE** | Sérialisable | Dirty read, Non-repeatable read, Phantom read |

---

## 🚀 Introduction

PostgreSQL est un système de gestion de base de données relationnelle open source avancé, connu pour sa conformité aux standards SQL et ses fonctionnalités avancées.

## 🎯 Installation et Configuration

### Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# CentOS/RHEL
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb

# macOS avec Homebrew
brew install postgresql
brew services start postgresql

# Docker
docker run --name postgres -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

### Configuration de Base

```sql
-- Créer un utilisateur
CREATE USER myuser WITH PASSWORD 'mypassword';

-- Créer une base de données
CREATE DATABASE mydb OWNER myuser;

-- Accorder les privilèges
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- Se connecter à la base
\c mydb
```

## 🎯 Utilisation avec NestJS

### Configuration TypeORM

```typescript
// app.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development'
      }),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}
```

### Entité TypeORM

```typescript
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'text', nullable: true })
  bio: string

  @Column({ type: 'boolean', default: true })
  active: boolean

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
```

### Service avec Requêtes Avancées

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto)
    return await this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id)
  }

  // Requêtes avancées
  async findActiveUsers(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.active = :active', { active: true })
      .orderBy('user.created_at', 'DESC')
      .getMany()
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('user.email ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .getMany()
  }

  async getUsersWithMetadata(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.metadata IS NOT NULL')
      .getMany()
  }

  async getUsersByDateRange(startDate: Date, endDate: Date): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate
      })
      .getMany()
  }

  // Requêtes avec jointures
  async getUsersWithPosts(): Promise<any[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .getMany()
  }

  // Requêtes avec agrégation
  async getUserStats(): Promise<any> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('COUNT(*)', 'total')
      .addSelect('COUNT(CASE WHEN active = true THEN 1 END)', 'active')
      .addSelect('COUNT(CASE WHEN active = false THEN 1 END)', 'inactive')
      .getRawOne()
  }

  // Requêtes avec fenêtrage
  async getUsersWithRank(): Promise<any[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('user.*')
      .addSelect('ROW_NUMBER() OVER (ORDER BY user.created_at)', 'rank')
      .getRawMany()
  }
}
```

## 🎯 Requêtes Avancées

### Requêtes avec CTE (Common Table Expressions)

```sql
-- CTE simple
WITH recent_users AS (
  SELECT * FROM users 
  WHERE created_at > NOW() - INTERVAL '30 days'
)
SELECT COUNT(*) FROM recent_users;

-- CTE récursive
WITH RECURSIVE user_hierarchy AS (
  SELECT id, name, manager_id, 1 as level
  FROM users 
  WHERE manager_id IS NULL
  
  UNION ALL
  
  SELECT u.id, u.name, u.manager_id, uh.level + 1
  FROM users u
  JOIN user_hierarchy uh ON u.manager_id = uh.id
)
SELECT * FROM user_hierarchy;
```

### Requêtes avec Fenêtrage

```sql
-- Classement des utilisateurs
SELECT 
  name,
  email,
  ROW_NUMBER() OVER (ORDER BY created_at) as row_num,
  RANK() OVER (ORDER BY created_at) as rank,
  DENSE_RANK() OVER (ORDER BY created_at) as dense_rank
FROM users;

-- Valeurs précédentes/suivantes
SELECT 
  name,
  created_at,
  LAG(created_at) OVER (ORDER BY created_at) as prev_date,
  LEAD(created_at) OVER (ORDER BY created_at) as next_date
FROM users;

-- Agrégation avec fenêtrage
SELECT 
  name,
  created_at,
  COUNT(*) OVER (PARTITION BY DATE(created_at)) as daily_count
FROM users;
```

### Requêtes avec JSON

```sql
-- Recherche dans JSON
SELECT * FROM users 
WHERE metadata->>'department' = 'IT';

-- Filtrage avec JSON
SELECT * FROM users 
WHERE metadata @> '{"role": "admin"}';

-- Mise à jour JSON
UPDATE users 
SET metadata = jsonb_set(metadata, '{last_login}', 'NOW()')
WHERE id = 1;

-- Agrégation JSON
SELECT 
  metadata->>'department' as department,
  COUNT(*) as count
FROM users 
WHERE metadata ? 'department'
GROUP BY metadata->>'department';
```

## 🎯 Optimisation des Performances

### Index et Analyse

```sql
-- Créer un index
CREATE INDEX idx_users_email ON users(email);

-- Index composite
CREATE INDEX idx_users_name_email ON users(name, email);

-- Index partiel
CREATE INDEX idx_active_users ON users(name) WHERE active = true;

-- Index GIN pour JSON
CREATE INDEX idx_users_metadata ON users USING gin(metadata);

-- Analyser les performances
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Statistiques
ANALYZE users;
```

### Requêtes Optimisées

```typescript
// Service optimisé
@Injectable()
export class OptimizedUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // Utilisation d'index
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email'] // Sélection spécifique
    })
  }

  // Pagination efficace
  async findWithPagination(page: number, limit: number): Promise<{ users: User[], total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' }
    })

    return { users, total }
  }

  // Requête avec cache
  @Cacheable('users', 300) // Cache 5 minutes
  async findCachedUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: { active: true }
    })
  }
}
```

## 🎯 Sécurité

### Gestion des Rôles

```sql
-- Créer des rôles
CREATE ROLE app_user;
CREATE ROLE app_admin;

-- Accorder des privilèges
GRANT SELECT, INSERT, UPDATE ON users TO app_user;
GRANT ALL PRIVILEGES ON users TO app_admin;

-- Créer un utilisateur avec rôle
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT app_user TO myuser;
```

### Requêtes Sécurisées

```typescript
// Service sécurisé
@Injectable()
export class SecureUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // Prévention des injections SQL
  async findByName(name: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name }) // Paramètre lié
      .getMany()
  }

  // Validation des entrées
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validation avec class-validator
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

  // Audit des modifications
  async updateWithAudit(id: number, updateUserDto: UpdateUserDto, userId: number): Promise<User> {
    await this.userRepository.update(id, {
      ...updateUserDto,
      updated_by: userId,
      updated_at: new Date()
    })
    return await this.findOne(id)
  }
}
```

## 📚 Ressources

### Documentation officielle
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [TypeORM Documentation](https://typeorm.io/)

### Outils et services
- [pgAdmin](https://www.pgadmin.org/) - Interface graphique
- [Postico](https://eggerapps.at/postico/) - Client macOS
- [DBeaver](https://dbeaver.io/) - Client universel
- [Supabase](https://supabase.com/) - PostgreSQL as a Service

### Communautés et ressources
- [PostgreSQL Community](https://www.postgresql.org/community/)
- [PostgreSQL Wiki](https://wiki.postgresql.org/)
- [PostgreSQL Exercises](https://pgexercises.com/)

---

*Dernière mise à jour : Janvier 2024*
