# NestJS Service Patterns

## 1. Service Patterns

### Description
Creating services with NestJS for business logic.

### Example - Basic Service
```typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  private users: User[] = []

  async findAll(): Promise<User[]> {
    return this.users
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = {
      id: Date.now().toString(),
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    this.users.push(user)
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date()
    }

    return this.users[userIndex]
  }

  async remove(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    this.users.splice(userIndex, 1)
  }
}
```

### Example - Advanced Service
```typescript
import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly eventEmitter: EventEmitter
  ) {}

  async findAll(query: UserQueryDto): Promise<PaginatedResult<User>> {
    this.logger.log('Fetching all users')
    
    try {
      const result = await this.userRepository.findAll(query)
      this.logger.log(`Found ${result.total} users`)
      return result
    } catch (error) {
      this.logger.error('Failed to fetch users', error.stack)
      throw error
    }
  }

  async findOne(id: string): Promise<User> {
    this.logger.log(`Fetching user with ID: ${id}`)
    
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating new user')
    
    // Business validation
    await this.validateUserData(createUserDto)
    
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(createUserDto.email)
    if (existingUser) {
      throw new BadRequestException('Email already exists')
    }

    try {
      const user = await this.userRepository.create(createUserDto)
      
      // Send welcome email
      await this.emailService.sendWelcomeEmail(user.email, user.name)
      
      // Emit event
      this.eventEmitter.emit('user.created', user)
      
      this.logger.log(`User created with ID: ${user.id}`)
      return user
    } catch (error) {
      this.logger.error('Failed to create user', error.stack)
      throw error
    }
  }

  private async validateUserData(data: CreateUserDto): Promise<void> {
    if (data.password && data.password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters')
    }
    
    // Other business validations...
  }
}
```

## 2. Dependency Injection Patterns

### Description
Dependency injection with NestJS.

### Example - Constructor Injection
```typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly logger: Logger
  ) {}
}
```

### Example - Property Injection
```typescript
import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class UsersService {
  @Inject('USER_REPOSITORY')
  private readonly userRepository: UserRepository

  @Inject('EMAIL_SERVICE')
  private readonly emailService: EmailService
}
```

### Example - Method Injection
```typescript
import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class UsersService {
  private userRepository: UserRepository
  private emailService: EmailService

  constructor(
    @Inject('USER_REPOSITORY') userRepository: UserRepository,
    @Inject('EMAIL_SERVICE') emailService: EmailService
  ) {
    this.userRepository = userRepository
    this.emailService = emailService
  }
}
```

## 3. Service Communication Patterns

### Description
Communication between services with NestJS.

### Example - Service-to-Service Communication
```typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService
  ) {}

  async findUserWithPosts(userId: string): Promise<UserWithPosts> {
    const user = await this.findOne(userId)
    const posts = await this.postsService.findByUserId(userId)
    
    return {
      ...user,
      posts
    }
  }

  async findUserWithComments(userId: string): Promise<UserWithComments> {
    const user = await this.findOne(userId)
    const comments = await this.commentsService.findByUserId(userId)
    
    return {
      ...user,
      comments
    }
  }
}
```

### Example - Event-Driven Communication
```typescript
import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class UsersService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto)
    
    // Emit event
    this.eventEmitter.emit('user.created', {
      userId: user.id,
      email: user.email,
      name: user.name
    })
    
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(id, updateUserDto)
    
    // Emit event
    this.eventEmitter.emit('user.updated', {
      userId: user.id,
      changes: updateUserDto
    })
    
    return user
  }
}

// Event listeners
@Injectable()
export class UserEventListener {
  constructor(
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService
  ) {}

  @OnEvent('user.created')
  async handleUserCreated(event: UserCreatedEvent) {
    await this.emailService.sendWelcomeEmail(event.email, event.name)
    await this.notificationService.sendWelcomeNotification(event.userId)
  }

  @OnEvent('user.updated')
  async handleUserUpdated(event: UserUpdatedEvent) {
    await this.notificationService.sendUpdateNotification(event.userId, event.changes)
  }
}
```

## 4. Repository Pattern

### Description
Repository pattern for data access.

### Example - Repository Interface
```typescript
export interface UserRepository {
  findAll(query?: UserQueryDto): Promise<PaginatedResult<User>>
  findOne(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(userData: CreateUserDto): Promise<User>
  update(id: string, userData: UpdateUserDto): Promise<User>
  delete(id: string): Promise<void>
}

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findAll(query?: UserQueryDto): Promise<PaginatedResult<User>> {
    return this.userRepository.findAll(query)
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto)
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto)
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.delete(id)
  }
}
```

## 5. Service Composition Pattern

### Description
Service composition to create complex functionality.

### Example - Service Composition
```typescript
@Injectable()
export class UserManagementService {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly permissionsService: PermissionsService
  ) {}

  async createUserWithRole(
    createUserDto: CreateUserDto,
    roleName: string
  ): Promise<UserWithRole> {
    // Create user
    const user = await this.usersService.create(createUserDto)
    
    // Assign role
    const role = await this.rolesService.findByName(roleName)
    if (!role) {
      throw new NotFoundException(`Role ${roleName} not found`)
    }
    
    await this.rolesService.assignRoleToUser(user.id, role.id)
    
    // Get permissions
    const permissions = await this.permissionsService.findByRoleId(role.id)
    
    return {
      ...user,
      role,
      permissions
    }
  }

  async updateUserRole(userId: string, newRoleName: string): Promise<UserWithRole> {
    const user = await this.usersService.findOne(userId)
    const newRole = await this.rolesService.findByName(newRoleName)
    
    if (!newRole) {
      throw new NotFoundException(`Role ${newRoleName} not found`)
    }
    
    await this.rolesService.updateUserRole(userId, newRole.id)
    const permissions = await this.permissionsService.findByRoleId(newRole.id)
    
    return {
      ...user,
      role: newRole,
      permissions
    }
  }
}
```

## 6. Service Testing Patterns

### Description
Testing services with NestJS.

### Example - Unit Tests
```typescript
describe('UsersService', () => {
  let service: UsersService
  let userRepository: jest.Mocked<UserRepository>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
    userRepository = module.get(UserRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: '1', name: 'John' }]
      userRepository.findAll.mockResolvedValue(mockUsers)

      const result = await service.findAll()
      
      expect(result).toEqual(mockUsers)
      expect(userRepository.findAll).toHaveBeenCalled()
    })
  })

  describe('findOne', () => {
    it('should return a user', async () => {
      const mockUser = { id: '1', name: 'John' }
      userRepository.findOne.mockResolvedValue(mockUser)

      const result = await service.findOne('1')
      
      expect(result).toEqual(mockUser)
      expect(userRepository.findOne).toHaveBeenCalledWith('1')
    })

    it('should throw NotFoundException when user not found', async () => {
      userRepository.findOne.mockResolvedValue(null)

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException)
    })
  })
})
```

## Best Practices

1. **Single responsibility**: One responsibility per service
2. **Dependency injection**: Use dependency injection
3. **Error handling**: Handle errors properly
4. **Logging**: Add appropriate logs
5. **Testing**: Test services

## Pitfalls to Avoid

1. **Business logic in controllers**: Avoid business logic in controllers
2. **Direct database access**: Avoid direct database access
3. **Circular dependencies**: Avoid circular dependencies
4. **Missing error handling**: Don't forget error handling
5. **Poor separation of concerns**: Avoid poor separation of concerns
