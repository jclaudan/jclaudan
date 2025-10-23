# 🍃 MongoDB - Complete Guide

## 📋 Complete MongoDB Reference Tables

### 🎯 Data Types

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **String** | String | `"Hello World"` | Text |
| **Integer** | Integer | `42` | Integers |
| **Double** | Decimal | `3.14159` | Decimals |
| **Boolean** | Boolean | `true, false` | Boolean values |
| **Date** | Date | `ISODate("2024-01-15T10:30:00Z")` | Dates and times |
| **ObjectId** | Unique identifier | `ObjectId("507f1f77bcf86cd799439011")` | Primary keys |
| **Array** | Array | `[1, 2, 3]` | Lists |
| **Object** | Object | `{name: "John", age: 30}` | Nested objects |
| **Null** | Null value | `null` | Null values |
| **Binary** | Binary data | `BinData(0, "SGVsbG8=")` | Images, files |
| **Regular Expression** | Regular expression | `/pattern/i` | Search |
| **JavaScript** | JavaScript code | `function() { return true; }` | Functions |
| **MinKey** | Minimum key | `MinKey()` | Comparisons |
| **MaxKey** | Maximum key | `MaxKey()` | Comparisons |
| **Decimal128** | 128-bit decimal | `NumberDecimal("123.45")` | Monetary precision |
| **Timestamp** | Timestamp | `Timestamp(1642248600, 1)` | Internal timestamp |

### 🎯 CRUD Operations

| Operation | Method | Description | Example |
|-----------|---------|-------------|---------|
| **Create** | `insertOne()` | Insert one document | `db.users.insertOne({name: "John"})` |
| **Create** | `insertMany()` | Insert multiple documents | `db.users.insertMany([{name: "John"}, {name: "Jane"}])` |
| **Read** | `findOne()` | Find one document | `db.users.findOne({name: "John"})` |
| **Read** | `find()` | Find multiple documents | `db.users.find({age: {$gt: 18}})` |
| **Update** | `updateOne()` | Update one document | `db.users.updateOne({name: "John"}, {$set: {age: 30}})` |
| **Update** | `updateMany()` | Update multiple documents | `db.users.updateMany({active: true}, {$set: {lastLogin: new Date()}})` |
| **Update** | `replaceOne()` | Replace one document | `db.users.replaceOne({name: "John"}, {name: "John", age: 30})` |
| **Delete** | `deleteOne()` | Delete one document | `db.users.deleteOne({name: "John"})` |
| **Delete** | `deleteMany()` | Delete multiple documents | `db.users.deleteMany({active: false})` |

### 🎯 Query Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$eq** | Equal | `{age: {$eq: 30}}` | Equality |
| **$ne** | Not equal | `{age: {$ne: 30}}` | Inequality |
| **$gt** | Greater than | `{age: {$gt: 18}}` | Greater than |
| **$gte** | Greater than or equal | `{age: {$gte: 18}}` | Greater than or equal |
| **$lt** | Less than | `{age: {$lt: 65}}` | Less than |
| **$lte** | Less than or equal | `{age: {$lte: 65}}` | Less than or equal |
| **$in** | In | `{age: {$in: [18, 30, 45]}}` | Membership |
| **$nin** | Not in | `{age: {$nin: [18, 30, 45]}}` | Non-membership |
| **$exists** | Exists | `{email: {$exists: true}}` | Existence |
| **$regex** | Regular expression | `{name: {$regex: /^J/}}` | Search |
| **$text** | Text search | `{$text: {$search: "John"}}` | Full-text search |
| **$where** | JavaScript condition | `{$where: "this.age > this.salary"}` | Custom condition |

### 🎯 Logical Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$and** | AND | `{$and: [{age: {$gt: 18}}, {active: true}]}` | Conjunction |
| **$or** | OR | `{$or: [{age: {$lt: 18}}, {age: {$gt: 65}}]}` | Disjunction |
| **$nor** | NOR | `{$nor: [{age: {$lt: 18}}, {active: false}]}` | Negation |
| **$not** | NOT | `{age: {$not: {$gt: 18}}}` | Negation |

### 🎯 Update Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$set** | Set | `{$set: {age: 30}}` | Set a value |
| **$unset** | Remove | `{$unset: {age: ""}}` | Remove a field |
| **$inc** | Increment | `{$inc: {age: 1}}` | Increment |
| **$mul** | Multiply | `{$mul: {price: 1.1}}` | Multiply |
| **$rename** | Rename | `{$rename: {oldName: "newName"}}` | Rename a field |
| **$min** | Minimum | `{$min: {age: 25}}` | Minimum value |
| **$max** | Maximum | `{$max: {age: 65}}` | Maximum value |
| **$currentDate** | Current date | `{$currentDate: {lastModified: true}}` | Current date |
| **$addToSet** | Add to set | `{$addToSet: {tags: "new"}}` | Add unique |
| **$push** | Add | `{$push: {tags: "new"}}` | Add |
| **$pull** | Remove | `{$pull: {tags: "old"}}` | Remove |
| **$pop** | Remove first/last | `{$pop: {tags: 1}}` | Remove element |
| **$pullAll** | Remove all | `{$pullAll: {tags: ["old", "bad"]}}` | Remove multiple |

### 🎯 Array Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$all** | All elements | `{tags: {$all: ["red", "blue"]}}` | Contains all |
| **$elemMatch** | Matching element | `{scores: {$elemMatch: {$gte: 80}}}` | Matching element |
| **$size** | Size | `{tags: {$size: 3}}` | Array size |
| **$** | Position | `{scores.$: 85}` | Position in array |
| **$[]** | All elements | `{scores.$[]: 0}` | All elements |
| **$[<identifier>]** | Matching elements | `{scores.$[elem]: 0}` | Matching elements |

### 🎯 Aggregation Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$match** | Filter | `{$match: {age: {$gt: 18}}}` | Filtering |
| **$group** | Group | `{$group: {_id: "$department", count: {$sum: 1}}}` | Grouping |
| **$project** | Project | `{$project: {name: 1, age: 1}}` | Field selection |
azy **$sort** | Sort | `{$sort: {age: -1}}` | Sorting |
| **$limit** | Limit | `{$limit: 10}` | Limiting |
| **$skip** | Skip | `{$skip: 5}` | Pagination |
| **$lookup** | Join | `{$lookup: {from: "orders", localField: "_id", foreignField: "userId", as: "orders"}}` | Join |
| **$unwind** | Unwind | `{$unwind: "$tags"}` | Unwind an array |
| **$addFields** | Add fields | `{$addFields: {fullName: {$concat: ["$firstName", " ", "$lastName"]}}}` | Add fields |
| **$replaceRoot** | Replace root | `{$replaceRoot: {newRoot: "$user"}}` | Replace root |

### 🎯 Aggregation Operators - Functions

| Function | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$sum** | Sum | `{$sum: "$price"}` | Sum |
| **$avg** | Average | `{$avg: "$age"}` | Average |
| **$min** | Minimum | `{$min: "$age"}` | Minimum |
| **$max** | Maximum | `{$max: "$age"}` | Maximum |
| **$first** | First | `{$first: "$name"}` | First element |
| **$last** | Last | `{$last: "$name"}` | Last element |
| **$push** | Add | `{$push: "$name"}` | Add to array |
| **$addToSet** | Add unique | `{$addToSet: "$name"}` | Add unique |
| **$count** | Count | `{$count: "total"}` | Count |
| **$size** | Size | `{$size: "$tags"}` | Array size |

### 🎯 Date Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$year** | Year | `{$year: "$date"}` | Year |
| **$month** | Month | `{$month: "$date"}` | Month |
| **$dayOfMonth** | Day of month | `{$dayOfMonth: "$date"}` | Day of month |
| **$dayOfWeek** | Day of week | `{$dayOfWeek: "$date"}` | Day of week |
| **$dayOfYear** | Day of year | `{$dayOfYear: "$date"}` | Day of year |
| **$hour** | Hour | `{$hour: "$date"}` | Hour |
| **$minute** | Minute | `{$minute: "$date"}` | Minute |
| **$second** | Second | `{$second: "$date"}` | Second |
| **$millisecond** | Millisecond | `{$millisecond: "$date"}` | Millisecond |
| **$dateToString** | Format | `{$dateToString: {format: "%Y-%m-%d", date: "$date"}}` | Formatting |

### 🎯 String Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$concat** | Concatenate | `{$concat: ["$firstName", " ", "$lastName"]}` | Concatenation |
| **$substr** | Substring | `{$substr: ["$name", 0, 5]}` | Substring |
| **$toLower** | Lowercase | `{$toLower: "$name"}` | Lowercase |
| **$toUpper** | Uppercase | `{$toUpper: "$name"}` | Uppercase |
| **$trim** | Remove spaces | `{$trim: {input: "$name"}}` | Remove spaces |
| **$ltrim** | Remove left spaces | `{$ltrim: {input: "$name"}}` | Remove left spaces |
| **$rtrim** | Remove right spaces | `{$rtrim: {input: "$name"}}` | Remove right spaces |
| **$split** | Split | `{$split: ["$name", " "]}` | Split |
| **$strLenBytes** | Length in bytes | `{$strLenBytes: "$name"}` | Length in bytes |
| **$strLenCP** | Length in characters | `{$strLenCP: "$name"}` | Length in characters |

### 🎯 Mathematical Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$add** | Addition | `{$add: ["$price", "$tax"]}` | Addition |
| **$subtract** | Subtraction | `{$subtract: ["$price", "$discount"]}` | Subtraction |
| **$multiply** | Multiplication | `{$multiply: ["$price", 1.1]}` | Multiplication |
| **$divide** | Division | `{$divide: ["$total", "$count"]}` | Division |
| **$mod** | Modulo | `{$mod: ["$age", 10]}` | Modulo |
| **$abs** | Absolute value | `{$abs: "$price"}` | Absolute value |
| **$ceil** | Round up | `{$ceil: "$price"}` | Round up |
| **$floor** | Round down | `{$floor: "$price"}` | Round down |
| **$round** | Round | `{$round: ["$price", 2]}` | Round |
| **$sqrt** | Square root | `{$sqrt: "$number"}` | Square root |

### 🎯 Conditional Operators

| Operator | Description | Example | Usage |
|----------|-------------|---------|-------|
| **$cond** | Condition | `{$cond: {if: {$gt: ["$age", 18]}, then: "adult", else: "minor"}}` | Condition |
| **$ifNull** | If null | `{$ifNull: ["$name", "Unknown"]}` | Default value |
| **$switch** | Switch | `{$switch: {branches: [{case: {$eq: ["$type", "A"]}, then: "Type A"}], default: "Other"}}` | Switch |
| **$case** | Case | `{$case: {when: {$gt: ["$age", 18]}, then: "adult"}}` | Case |

### 🎯 Indexes

| Type | Description | Example | Usage |
|------|-------------|---------|-------|
| **Single Field** | Index on one field | `db.users.createIndex({name: 1})` | Simple index |
| **Compound** | Composite index | `db.users.createIndex({name: 1, age: -1})` | Composite index |
| **Multikey** | Array index | `db.users.createIndex({tags: 1})` | Array index |
| **Text** | Text index | `db.users.createIndex({name: "text", bio: "text"})` | Text search |
| **2dsphere** | Geospatial index | `db.places.createIndex({location: "2dsphere"})` | Geospatial |
| **2d** | 2D index | `db.places.createIndex({location: "2d"})` | 2D |
| **Hashed** | Hashed index | `db.users.createIndex({_id: "hashed"})` | Sharding |
| **Sparse** | Sparse index | `db.users.createIndex({email: 1}, {sparse: true})` | Optional fields |
| **Partial** | Partial index | `db.users.createIndex({name: 1}, {partialFilterExpression: {active: true}})` | Conditional index |
| **TTL** | TTL index | `db.sessions.createIndex({createdAt: 1}, {expireAfterSeconds: 3600})` | Expiration |

### 🎯 Collection Operations

| Operation | Description | Example | Usage |
|-----------|-------------|---------|-------|
| **createCollection** | Create collection | `db.createCollection("users")` | Creation |
| **dropCollection** | Drop collection | `db.users.drop()` | Deletion |
| **renameCollection** | Rename collection | `db.users.renameCollection("customers")` | Rename |
| **createIndex** | Create index | `db.users.createIndex({name: 1})` | Index |
| **dropIndex** | Drop index | `db.users.dropIndex({name: 1})` | Drop index |
| **getIndexes** | List indexes | `db.users.getIndexes()` | List indexes |
| **countDocuments** | Count documents | `db.users.countDocuments({active: true})` | Count |
| **distinct** | Distinct values | `db.users.distinct("department")` | Unique values |
| **aggregate** | Aggregation | `db.users.aggregate([{$group: {_id: "$department", count: {$sum: 1}}}])` | Aggregation |
| **mapReduce** | Map-Reduce | `db.users.mapReduce(map, reduce, {out: "results"})` | Map-Reduce |

---

## 🚀 Introduction

MongoDB is a NoSQL document-oriented database that stores data as JSON-like documents (BSON). It is known for its flexibility and scalability.

## 🎯 Installation and Configuration

### Installation

```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# CentOS/RHEL
sudo yum install -y mongodb-org

# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Docker
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

### Basic Configuration

```javascript
// Connection
use mydb

// Create a user
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: [
    { role: "readWrite", db: "mydb" }
  ]
})

// Create a collection
db.createCollection("users")
```

## 🎯 Usage with NestJS

### Mongoose Configuration

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

### Mongoose Schema

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

### Service with Advanced Queries

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

  // Advanced queries
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

  // Aggregation queries
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

  // Join queries
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

  // Window queries
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

  // Pagination queries
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

## 🎯 Advanced Queries

### Complex Aggregation

```javascript
// Complex aggregation pipeline
db.users.aggregate([
  // Step 1: Filter active users
  {
    $match: {
      active: true,
      createdAt: { $gte: ISODate("2024-01-01") }
    }
  },
  
  // Step 2: Add calculated fields
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
  
  // Step 3: Group by department
  {
    $group: {
      _id: "$department",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" },
      users: { $push: "$$ROOT" }
    }
  },
  
  // Step 4: Sort by user count
  {
    $sort: { count: -1 }
  },
  
  // Step 5: Limit results
  {
    $limit: 10
  }
])
```

### Queries with Indexes

```javascript
// Create indexes
db.users.createIndex({ email: 1 })
db.users.createIndex({ name: 1, age: -1 })
db.users.createIndex({ "metadata.department": 1 })
db.users.createIndex({ tags: 1 })
db.users.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })

// Optimized queries
db.users.find({ email: "john@example.com" }) // Uses email index
db.users.find({ name: "John", age: { $gte: 18 } }) // Uses composite index
db.users.find({ "metadata.department": "IT" }) // Uses metadata index
db.users.find({ tags: "developer" }) // Uses tags index
```

### Geospatial Queries

```javascript
// Create geospatial index
db.places.createIndex({ location: "2dsphere" })

// Geospatial queries
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

// Search within polygon
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

## 🎯 Performance Optimization

### Index and Analysis

```javascript
// Analyze performance
db.users.find({ email: "john@example.com" }).explain("executionStats")

// Create optimized indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ name: 1, age: -1 })
db.users.createIndex({ "metadata.department": 1 }, { sparse: true })
db.users.createIndex({ tags: 1 }, { background: true })

// Partial index
db.users.createIndex(
  { name: 1 },
  { partialFilterExpression: { active: true } }
)

// TTL index
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
)
```

### Optimized Queries

```typescript
// Optimized service
@Injectable()
export class OptimizedUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  // Index usage
  async findByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select('name email active') // Specific selection
      .exec()
  }

  // Efficient pagination
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

  // Cached query
  @Cacheable('users', 300) // Cache 5 minutes
  async findCachedUsers(): Promise<User[]> {
    return await this.userModel
      .find({ active: true })
      .exec()
  }

  // Query with projection
  async findUserNames(): Promise<{ name: string, email: string }[]> {
    return await this.userModel
      .find({ active: true })
      .select('name email')
      .exec()
  }
}
```

## 🎯 Security

### Role Management

```javascript
// Create roles
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

// Create user with role
db.createUser({
  user: "myuser",
  pwd: "mypassword",
  roles: [
    { role: "app_user", db: "mydb" }
  ]
})
```

### Secure Queries

```typescript
// Secure service
@Injectable()
export class SecureUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  // Input validation
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validation with class-validator
    const user = new this.userModel(createUserDto)
    return await user.save()
  }

  // Secure queries
  async findByName(name: string): Promise<User[]> {
    // Escape special characters
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return await this.userModel
      .find({ name: { $regex: escapedName, $options: 'i' } })
      .exec()
  }

  // Audit modifications
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

## 📚 Resources

### Official Documentation
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

### Tools and Services
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI interface
- [Studio 3T](https://studio3t.com/) - MongoDB IDE
- [MongoDB Atlas](https://www.mongodb.com/atlas) - MongoDB as a Service
- [Robo 3T](https://robomongo.org/) - MongoDB client

### Communities and Resources
- [MongoDB Community](https://community.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Exercises](https://university.mongodb.com/courses/M001/about)

---

*Last updated: January 2024*
