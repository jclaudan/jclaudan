# 🐘 PostgreSQL - Complete Guide

## 📋 Complete PostgreSQL Reference Tables

### 🎯 Data Types

| Type | Description | Size | Example | Usage |
|------|-------------|------|---------|-------|
| **INTEGER** | Integer | 4 bytes | `42` | Integers |
| **BIGINT** | Large integer | 8 bytes | `9223372036854775807` | Large numbers |
| **SMALLINT** | Small integer | 2 bytes | `32767` | Small numbers |
| **DECIMAL** | Exact decimal | Variable | `123.45` | Currency, precision |
| **NUMERIC** | Numeric | Variable | `123.456789` | Precise calculations |
| **REAL** | Single real | 4 bytes | `3.14159` | Floating point |
| **DOUBLE PRECISION** | Double real | 8 bytes | `3.141592653589793` | Double precision |
| **SERIAL** | Serial | 4 bytes | `1, 2, 3...` | Primary keys |
| **BIGSERIAL** | Large serial | 8 bytes | `1, 2, 3...` | Large primary keys |
| **SMALLSERIAL** | Small serial | 2 bytes | `1, 2, 3...` | Small primary keys |

### 🎯 Text Types

| Type | Description | Size | Example | Usage |
|------|-------------|------|---------|-------|
| **CHAR(n)** | Fixed character | n bytes | `'Hello'` | Fixed text |
| **VARCHAR(n)** | Variable character | Variable | `'Hello'` | Variable text |
| **TEXT** | Long text | Variable | `'Long text...'` | Unlimited text |
| **CITEXT** | Case insensitive text | Variable | `'Hello'` | Case insensitive search |
| **CHARACTER VARYING** | VARCHAR alias | Variable | `'Hello'` | Alias |
| **CHARACTER** | CHAR alias | n bytes | `'Hello'` | Alias |

### 🎯 Date and Time Types

| Type | Description | Size | Example | Usage |
|------|-------------|------|---------|-------|
| **DATE** | Date | 4 bytes | `'2024-01-15'` | Dates |
| **TIME** | Time | 8 bytes | `'14:30:00'` | Times |
| **TIMESTAMP** | Date and time | 8 bytes | `'2024-01-15 14:30:00'` | Date and time |
| **TIMESTAMPTZ** | Date and time with TZ | 8 bytes | `'2024-01-15 14:30:00+01'` | With timezone |
| **INTERVAL** | Interval | 16 bytes | `'1 day 2 hours'` | Durations |
| **TIME WITH TIME ZONE** | Time with TZ | 12 bytes | `'14:30:00+01'` | Time with timezone |

### 🎯 Boolean and Binary Types

| Type | Description | Size | Example | Usage |
|------|-------------|------|---------|-------|
| **BOOLEAN** | Boolean | 1 byte | `true, false` | Boolean values |
| **BYTEA** | Binary data | Variable | `'\xDEADBEEF'` | Images, files |
| **BIT(n)** | Bits | n bits | `B'1010'` | Binary data |
| **VARBIT(n)** | Variable bits | Variable | `B'1010'` | Variable bits |

### 🎯 Geometric Types

| Type | Description | Size | Example | Usage |
|------|-------------|------|---------|-------|
| **POINT** | Point | 16 bytes | `(1,2)` | Coordinates |
| **LINE** | Line | 32 bytes | `{1,2,3}` | Lines |
| **LSEG** | Line segment | 32 bytes | `[(1,2),(3,4)]` | Line segments |
| **BOX** | Rectangle | 32 bytes | `(1,2),(3,4)` | Rectangles |
| **PATH** | Path | Variable | `[(1,2),(3,4)]` | Paths |
| **POLYGON** | Polygon | Variable | `((1,2),(3,4))` | Polygons |
| **CIRCLE** | Circle | 24 bytes | `<(1,2),3>` | Circles |

### 🎯 Network Types

| Type | Description | Size | Example | Usage |
|------|-------------|------|---------|-------|
| **INET** | IP address | 7-19 bytes | `'192.168.1.1'` | IP addresses |
| **CIDR** | CIDR network | 7-19 bytes | `'192.168.1.0/24'` | Networks |
| **MACADDR** | MAC address | 6 bytes | `'08:00:2b:01:02:03'` | MAC addresses |
| **MACADDR8** | 8-byte MAC address | 8 bytes | `'08:00:2b:01:02:03:04:05'` | 8-byte MAC |

### 🎯 JSON Types

| Type | Description | Size | Example | Usage |
|------|-------------|------|---------|-------|
| **JSON** | JSON | Variable | `'{"key": "value"}'` | Raw JSON |
| **JSONB** | Binary JSON | Variable | `'{"key": "value"}'` | Optimized JSON |
| **JSONPATH** | JSON path | Variable | `'$.key'` | JSON paths |

### 🎯 Array Types

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **INTEGER[]** | Integer array | `{1,2,3}` | Integer lists |
| **TEXT[]** | Text array | `{'a','b','c'}` | Text lists |
| **JSONB[]** | JSON array | `{'{"a":1}','{"b":2}'}` | JSON lists |

### 🎯 DDL Commands (Data Definition Language)

| Command | Description | Example | Usage |
|---------|-------------|---------|-------|
| **CREATE DATABASE** | Create database | `CREATE DATABASE mydb;` | New database |
| **DROP DATABASE** | Drop database | `DROP DATABASE mydb;` | Deletion |
| **CREATE TABLE** | Create table | `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));` | New table |
| **ALTER TABLE** | Modify table | `ALTER TABLE users ADD COLUMN email VARCHAR(255);` | Modification |
| **DROP TABLE** | Drop table | `DROP TABLE users;` | Deletion |
| **CREATE INDEX** | Create index | `CREATE INDEX idx_users_name ON users(name);` | Performance |
| **DROP INDEX** | Drop index | `DROP INDEX idx_users_name;` | Deletion |
| **CREATE VIEW** | Create view | `CREATE VIEW user_view AS SELECT * FROM users;` | View |
| **DROP VIEW** | Drop view | `DROP VIEW user_view;` | Deletion |
| **CREATE SEQUENCE** | Create sequence | `CREATE SEQUENCE user_seq;` | Sequences |

### 🎯 DML Commands (Data Manipulation Language)

| Command | Description | Example | Usage |
|---------|-------------|---------|-------|
| **SELECT** | Select | `SELECT * FROM users;` | Read |
| **INSERT** | Insert | `INSERT INTO users (name) VALUES ('John');` | Create |
| **UPDATE** | Update | `UPDATE users SET name = 'Jane' WHERE id = 1;` | Modify |
| **DELETE** | Delete | `DELETE FROM users WHERE id = 1;` | Delete |
| **MERGE** | Merge | `MERGE INTO users USING ...` | Merge |
| **UPSERT** | Insert/Update | `INSERT ... ON CONFLICT ...` | Upsert |

### 🎯 SELECT Clauses

| Clause | Description | Example | Usage |
|--------|-------------|---------|-------|
| **WHERE** | Condition | `WHERE age > 18` | Filtering |
| **GROUP BY** | Group | `GROUP BY department` | Grouping |
| **HAVING** | Group condition | `HAVING COUNT(*) > 5` | Group filtering |
| **ORDER BY** | Sort | `ORDER BY name ASC` | Sorting |
| **LIMIT** | Limit | `LIMIT 10` | Limiting |
| **OFFSET** | Offset | `OFFSET 20` | Pagination |
| **DISTINCT** | Distinct | `SELECT DISTINCT name` | Uniqueness |
| **UNION** | Union | `SELECT ... UNION SELECT ...` | Union |
| **INTERSECT** | Intersection | `SELECT ... INTERSECT SELECT ...` | Intersection |
| **EXCEPT** | Difference | `SELECT ... EXCEPT SELECT ...` | Difference |

### 🎯 Joins

| Type | Description | Syntax | Usage |
|------|-------------|--------|-------|
| **INNER JOIN** | Inner join | `FROM a INNER JOIN b ON a.id = b.a_id` | Intersection |
| **LEFT JOIN** | Left join | `FROM a LEFT JOIN b ON a.id = b.a_id` | All A + B |
| **RIGHT JOIN** | Right join | `FROM a RIGHT JOIN b ON a.id = b.a_id` | All B + A |
| **FULL OUTER JOIN** | Full outer join | `FROM a FULL OUTER JOIN b ON a.id = b.a_id` | All A and B |
| **CROSS JOIN** | Cartesian product | `FROM a CROSS JOIN b` | All combinations |
| **SELF JOIN** | Self join | `FROM a a1 JOIN a a2 ON a1.id = a2.parent_id` | Reference |

### 🎯 Aggregation Functions

| Function | Description | Example | Usage |
|----------|-------------|---------|-------|
| **COUNT** | Count | `COUNT(*)` | Number of elements |
| **SUM** | Sum | `SUM(price)` | Sum of values |
| **AVG** | Average | `AVG(age)` | Average |
| **MIN** | Minimum | `MIN(date)` | Minimum value |
| **MAX** | Maximum | `MAX(score)` | Maximum value |
| **STDDEV** | Standard deviation | `STDDEV(price)` | Standard deviation |
| **VARIANCE** | Variance | `VARIANCE(price)` | Variance |
| **ARRAY_AGG** | Array | `ARRAY_AGG(name)` | Array of values |
| **STRING_AGG** | Concatenation | `STRING_AGG(name, ',')` | Concatenation |
| **JSON_AGG** | JSON | `JSON_AGG(row_to_json(t))` | JSON |

### 🎯 Window Functions

| Function | Description | Example | Usage |
|----------|-------------|---------|-------|
| **ROW_NUMBER** | Row number | `ROW_NUMBER() OVER (ORDER BY name)` | Numbering |
| **RANK** | Rank | `RANK() OVER (ORDER BY score)` | Ranking |
| **DENSE_RANK** | Dense rank | `DENSE_RANK() OVER (ORDER BY score)` | Dense ranking |
| **LAG** | Previous value | `LAG(price) OVER (ORDER BY date)` | Previous value |
| **LEAD** | Next value Sam | `LEAD(price) OVER (ORDER BY date)` | Next value |
| **FIRST_VALUE** | First value | `FIRST_VALUE(price) OVER (PARTITION BY category)` | First value |
| **LAST_VALUE** | Last value | `LAST_VALUE(price) OVER (PARTITION BY category)` | Last value |
| **NTILE** | Quantiles | `NTILE(4) OVER (ORDER BY score)` | Quantiles |
| **PERCENT_RANK** | Percent rank | `PERCENT_RANK() OVER (ORDER BY score)` | Relative rank |
| **CUME_DIST** | Cumulative distribution | `CUME_DIST() OVER (ORDER BY score)` | Distribution |

### 🎯 Date Functions

| Function | Description | Example | Usage |
|----------|-------------|---------|-------|
| **NOW** | Now | `NOW()` | Current date/time |
| **CURRENT_DATE** | Current date | `CURRENT_DATE` | Current date |
| **CURRENT_TIME** | Current time | `CURRENT_TIME` | Current time |
| **EXTRACT** | Extract | `EXTRACT(YEAR FROM date)` | Extraction |
| **DATE_TRUNC** | Truncate | `DATE_TRUNC('month', date)` | Truncation |
| **AGE** | Age | `AGE(date)` | Age calculation |
| **INTERVAL** | Interval | `INTERVAL '1 day'` | Interval |
| **TO_CHAR** | Format | `TO_CHAR(date, 'YYYY-MM-DD')` | Formatting |
| **TO_DATE** | Convert | `TO_DATE('2024-01-15', 'YYYY-MM-DD')` | Conversion |
| **DATE_PART** | Date part | `DATE_PART('year', date)` | Date part |

### 🎯 Text Functions

| Function | Description | Example | Usage |
|----------|-------------|---------|-------|
| **LENGTH** | Length | `LENGTH(text)` | Length |
| **UPPER** | Uppercase | `UPPER(text)` | Uppercase |
| **LOWER** | Lowercase | `LOWER(text)` | Lowercase |
| **TRIM** | Remove spaces | `TRIM(text)` | Cleanup |
| **SUBSTRING** | Substring | `SUBSTRING(text, 1, 5)` | Extraction |
| **REPLACE** | Replace | `REPLACE(text, 'old', 'new')` | Replacement |
| **CONCAT** | Concatenate | `CONCAT(a, b)` | Concatenation |
| **SPLIT_PART** | Split | `SPLIT_PART(text, ',', 1)` | Split |
| **REGEXP_REPLACE** | Regex | `REGEXP_REPLACE(text, 'pattern', 'replacement')` | Regex |
| **POSITION** | Position | `POSITION('sub' IN text)` | Position |

### 🎯 JSON Functions

| Function | Description | Example | Usage |
|----------|-------------|---------|-------|
| **json_extract_path** | Extract path | `json_extract_path(data, 'key')` | Extraction |
| **json_extract_path_text** | Extract text | `json_extract_path_text(data, 'key')` | Text extraction |
| **json_build_object** | Build object | `json_build_object('key', value)` | Construction |
| **json_build_array** | Build array | `json_build_array(1, 2, 3)` | Construction |
| **json_agg** | JSON aggregation | `json_agg(row_to_json(t))` | Aggregation |
| **json_object_agg** | Object aggregation | `json_object_agg(key, value)` | Object aggregation |
| **json_array_length** | Array length | `json_array_length(data)` | Length |
| **json_typeof** | JSON type | `json_typeof(data)` | Type |
| **json_strip_nulls** | Remove nulls | `json_strip_nulls(data)` | Cleanup |
| **json_pretty** | Format | `json_pretty(data)` | Formatting |

### 🎯 Indexes

| Type | Description | Usage | Example |
|------|-------------|-------|---------|
| **B-tree** | B-tree index | General | `CREATE INDEX idx_name ON users(name);` |
| **Hash** | Hash index | Equality | `CREATE INDEX idx_id ON users USING hash(id);` |
| **GIN** | GIN index | Arrays, JSON | `CREATE INDEX idx_tags ON posts USING gin(tags);` |
| **GiST** | GiST index | Geometry | `CREATE INDEX idx_location ON places USING gist(location);` |
| **SP-GiST** | SP-GiST index | Specialized | `CREATE INDEX idx_phone ON users USING spgist(phone);` |
| **BRIN** | BRIN index | Large tables | `CREATE INDEX idx_date ON logs USING brin(created_at);` |
| **Partial** | Partial index | Condition | `CREATE INDEX idx_active ON users(name) WHERE active = true;` |
| **Expression** | Expression index | Calculated | `CREATE INDEX idx_upper ON users(UPPER(name));` |
| **Composite** | Composite index | Multi-column | `CREATE INDEX idx_name_email ON users(name, email);` |
| **Unique** | Unique index | Uniqueness | `CREATE UNIQUE INDEX idx_email ON users(email);` |

### 🎯 Constraints

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **PRIMARY KEY** | Primary key | `id SERIAL PRIMARY KEY` | Unique identifier |
| **FOREIGN KEY** | Foreign key | `FOREIGN KEY (user_id) REFERENCES users(id)` | Reference |
| **UNIQUE** | Unique | `email VARCHAR(255) UNIQUE` | Uniqueness |
| **NOT NULL** | Not null | `name VARCHAR(100) NOT NULL` | Required |
| **CHECK** | Check | `CHECK (age >= 0)` | Validation |
| **DEFAULT** | Default value | `created_at TIMESTAMP DEFAULT NOW()` | Default value |
| **EXCLUDE** | Exclude | `EXCLUDE (name WITH =)` | Exclusion |

### 🎯 Transactions

| Command | Description | Usage |
|---------|-------------|-------|
| **BEGIN** | Begin | `BEGIN;` |
| **COMMIT** | Commit | `COMMIT;` |
| **ROLLBACK** | Rollback | `ROLLBACK;` |
| **SAVEPOINT** | Savepoint | `SAVEPOINT sp1;` |
| **ROLLBACK TO** | Rollback to | `ROLLBACK TO sp1;` |
| **RELEASE** | Release | `RELEASE SAVEPOINT sp1;` |

### 🎯 Isolation Levels

| Level | Description |
|-------|-------------|
| **READ UNCOMMITTED** | Read uncommitted |
| **READ COMMITTED** | Read committed |
| **REPEATABLE READ** | Repeatable read |
| **SERIALIZABLE** | Serializable |

---

## 🚀 Introduction

PostgreSQL is an advanced open source relational database management system, known for its SQL standards compliance and advanced features.

## 🎯 Installation and Configuration

### Installation

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# CentOS/RHEL
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb

# macOS with Homebrew
brew install postgresql
brew services start postgresql

# Docker
docker run --name postgres -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres
```

### Basic Configuration

```sql
-- Create a user
CREATE USER myuser WITH PASSWORD 'mypassword';

-- Create a database
CREATE DATABASE mydb OWNER myuser;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- Connect to database
\c mydb
```

## 🎯 Usage with NestJS

### TypeORM Configuration

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

### TypeORM Entity

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

### Service with Advanced Queries

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

  // Advanced queries
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

  // Join queries
  async getUsersWithPosts(): Promise<any[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.posts', 'post')
      .getMany()
  }

  // Aggregation queries
  async getUserStats(): Promise<any> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('COUNT(*)', 'total')
      .addSelect('COUNT(CASE WHEN active = true THEN 1 END)', 'active')
      .addSelect('COUNT(CASE WHEN active = false THEN 1 END)', 'inactive')
      .getRawOne()
  }

  // Window queries
  async getUsersWithRank(): Promise<any[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select('user.*')
      .addSelect('ROW_NUMBER() OVER (ORDER BY user.created_at)', 'rank')
      .getRawMany()
  }
}
```

## 🎯 Advanced Queries

### Queries with CTE (Common Table Expressions)

```sql
-- Simple CTE
WITH recent_users AS (
  SELECT * FROM users 
  WHERE created_at > NOW() - INTERVAL '30 days'
)
SELECT COUNT(*) FROM recent_users;

-- Recursive CTE
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

### Window Queries

```sql
-- User ranking
SELECT 
  name,
  email,
  ROW_NUMBER() OVER (ORDER BY created_at) as row_num,
  RANK() OVER (ORDER BY created_at) as rank,
  DENSE_RANK() OVER (ORDER BY created_at) as dense_rank
FROM users;

-- Previous/next values
SELECT 
  name,
  created_at,
  LAG(created_at) OVER (ORDER BY created_at) as prev_date,
  LEAD(created_at) OVER (ORDER BY created_at) as next_date
FROM users;

-- Aggregation with windowing
SELECT 
  name,
  created_at,
  COUNT(*) OVER (PARTITION BY DATE(created_at)) as daily_count
FROM users;
```

### JSON Queries

```sql
-- JSON search
SELECT * FROM users 
WHERE metadata->>'department' = 'IT';

-- JSON filtering
SELECT * FROM users 
WHERE metadata @> '{"role": "admin"}';

-- JSON update
UPDATE users 
SET metadata = jsonb_set(metadata, '{last_login}', 'NOW()')
WHERE id = 1;

-- JSON aggregation
SELECT 
  metadata->>'department' as department,
  COUNT(*) as count
FROM users 
WHERE metadata ? 'department'
GROUP BY metadata->>'department';
```

## 🎯 Performance Optimization

### Index and Analysis

```sql
-- Create index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_users_name_email ON users(name, email);

-- Partial index
CREATE INDEX idx_active_users ON users(name) WHERE active = true;

-- GIN index for JSON
CREATE INDEX idx_users_metadata ON users USING gin(metadata);

-- Analyze performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- Statistics
ANALYZE users;
```

### Optimized Queries

```typescript
// Optimized service
@Injectable()
export class OptimizedUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // Index usage
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email'] // Specific selection
    })
  }

  // Efficient pagination
  async findWithPagination(page: number, limit: number): Promise<{ users: User[], total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' }
    })

    return { users, total }
  }

  // Cached query
  @Cacheable('users', 300) // Cache 5 minutes
  async findCachedUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: { active: true }
    })
  }
}
```

## 🎯 Security

### Role Management

```sql
-- Create roles
CREATE ROLE app_user;
CREATE ROLE app_admin;

-- Grant privileges
GRANT SELECT, INSERT, UPDATE ON users TO app_user;
GRANT ALL PRIVILEGES ON users TO app_admin;

-- Create user with role
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT app_user TO myuser;
```

### Secure Queries

```typescript
// Secure service
@Injectable()
export class SecureUserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  // SQL injection prevention
  async findByName(name: string): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.name = :name', { name }) // Bound parameter
      .getMany()
  }

  // Input validation
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validation with class-validator
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
  }

  // Audit modifications
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

## 📚 Resources

### Official Documentation
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [TypeORM Documentation](https://typeorm.io/)

### Tools and Services
- [pgAdmin](https://www.pgadmin.org/) - GUI interface
- [Postico](https://eggerapps.at/postico/) - macOS client
- [DBeaver](https://dbeaver.io/) - Universal client
- [Supabase](https://supabase.com/) - PostgreSQL as a Service

### Communities and Resources
- [PostgreSQL Community](https://www.postgresql.org/community/)
- [PostgreSQL Wiki](https://wiki.postgresql.org/)
- [PostgreSQL Exercises](https://pgexercises.com/)

---

*Last updated: January 2024*



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

