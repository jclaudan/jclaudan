# NestJS Controller Patterns

## 1. REST Controller Patterns

### Description
Creating REST controllers with NestJS.

### Example - Basic Controller
```typescript
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: any): Promise<User[]> {
    return this.usersService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id)
  }
}
```

### Example - Advanced Controller
```typescript
import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  Query,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common'

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search?: string
  ): Promise<PaginatedResult<User>> {
    return this.usersService.findAll({ page, limit, search })
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id)
  }
}
```

## 2. Route Parameter Patterns

### Description
Route parameter management with validation and transformation.

### Example - Parameter Validation
```typescript
import { Controller, Get, Param, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id)
  }

  @Get(':uuid')
  async findByUuid(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<User> {
    return this.usersService.findByUuid(uuid)
  }

  @Get(':id/posts')
  async findUserPosts(@Param('id', ParseIntPipe) id: number): Promise<Post[]> {
    return this.usersService.findUserPosts(id)
  }
}
```

### Example - Custom Parameter Validation
```typescript
import { Controller, Get, Param, BadRequestException } from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    if (!this.isValidId(id)) {
      throw new BadRequestException('Invalid user ID')
    }
    return this.usersService.findOne(id)
  }

  private isValidId(id: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(id)
  }
}
```

## 3. Request Body Patterns

### Description
Request body management with validation and transformation.

### Example - DTO Validation
```typescript
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string

  @IsEmail()
  email: string

  @IsOptional()
  @MinLength(8)
  password?: string
}

export class UpdateUserDto {
  @IsOptional()
  @MinLength(2)
  name?: string

  @IsOptional()
  @IsEmail()
  email?: string
}

@Controller('users')
export class UsersController {
  @Post()
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto
  ): Promise<User> {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto)
  }
}
```

### Example - Custom Validation
```typescript
import { Controller, Post, Body, BadRequestException } from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Post()
  async create(@Body() createUserDto: any): Promise<User> {
    this.validateUserData(createUserDto)
    return this.usersService.create(createUserDto)
  }

  private validateUserData(data: any): void {
    if (!data.name || data.name.length < 2) {
      throw new BadRequestException('Name must be at least 2 characters')
    }
    
    if (!this.isValidEmail(data.email)) {
      throw new BadRequestException('Invalid email format')
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
```

## 4. Query Parameter Patterns

### Description
Query parameter management with validation and transformation.

### Example - Query Parameters
```typescript
import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('order', new DefaultValuePipe('asc')) order?: 'asc' | 'desc'
  ): Promise<PaginatedResult<User>> {
    return this.usersService.findAll({
      page,
      limit,
      search,
      sort,
      order
    })
  }
}
```

### Example - Query DTO
```typescript
import { Controller, Get, Query } from '@nestjs/common'
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator'
import { Transform } from 'class-transformer'

export class UserQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  page?: number = 1

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10

  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsString()
  sort?: string

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc' = 'asc'
}

@Controller('users')
export class UsersController {
  @Get()
  async findAll(@Query() query: UserQueryDto): Promise<PaginatedResult<User>> {
    return this.usersService.findAll(query)
  }
}
```

## 5. Response Patterns

### Description
Response management with different formats and status codes.

### Example - Response DTOs
```typescript
import { Controller, Get, Post, HttpStatus, HttpCode } from '@nestjs/common'

export class UserResponseDto {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export class CreateUserResponseDto {
  id: number
  name: string
  email: string
  message: string
}

@Controller('users')
export class UsersController {
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll()
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }))
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.usersService.create(createUserDto)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      message: 'User created successfully'
    }
  }
}
```

### Example - Error Handling
```typescript
import { 
  Controller, 
  Get, 
  Param, 
  NotFoundException, 
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common'

@Controller('users')
export class UsersController {
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(id)
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`)
      }
      return user
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('Failed to fetch user')
    }
  }
}
```

## 6. Middleware Patterns

### Description
Using middleware with controllers.

### Example - Custom Middleware
```typescript
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
    next()
  }
}

// Usage in module
@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(UsersController)
  }
}
```

## Best Practices

1. **Use DTOs**: Use DTOs for validation
2. **Handle errors properly**: Handle errors properly
3. **Use appropriate HTTP status codes**: Use appropriate HTTP status codes
4. **Validate input**: Validate input
5. **Use guards and interceptors**: Use guards and interceptors

## Pitfalls to Avoid

1. **Direct database access**: Avoid direct database access
2. **Missing validation**: Don't forget validation
3. **Poor error handling**: Avoid poor error handling
4. **Inconsistent responses**: Avoid inconsistent responses
5. **Security vulnerabilities**: Avoid security vulnerabilities



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>

