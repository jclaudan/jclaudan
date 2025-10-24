# Méthodologies de Développement

## 1. TDD (Test-Driven Development)

### Description
Le Test-Driven Development est une approche de développement logiciel où les tests sont écrits avant le code de production. Le cycle TDD suit le principe Red-Green-Refactor.

### Cycle TDD : Red-Green-Refactor

#### 1. Red (Rouge) - Écrire un test qui échoue
```typescript
// test/user.service.test.ts
import { UserService } from '../src/user.service'

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService()
  })

  it('should create a user with valid data', () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    }

    // Act
    const user = userService.createUser(userData)

    // Assert
    expect(user).toBeDefined()
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.age).toBe(30)
    expect(user.id).toBeDefined()
  })

  it('should throw error for invalid email', () => {
    // Arrange
    const userData = {
      name: 'John Doe',
      email: 'invalid-email',
      age: 30
    }

    // Act & Assert
    expect(() => userService.createUser(userData))
      .toThrow('Invalid email format')
  })
})
```

#### 2. Green (Vert) - Écrire le code minimum pour faire passer le test
```typescript
// src/user.service.ts
export interface User {
  id: string
  name: string
  email: string
  age: number
}

export interface CreateUserData {
  name: string
  email: string
  age: number
}

export class UserService {
  createUser(userData: CreateUserData): User {
    // Validation basique
    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format')
    }

    return {
      id: Math.random().toString(36),
      name: userData.name,
      email: userData.email,
      age: userData.age
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
```

#### 3. Refactor (Refactorisation) - Améliorer le code sans casser les tests
```typescript
// src/user.service.ts (version refactorisée)
import { v4 as uuidv4 } from 'uuid'

export class UserService {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  createUser(userData: CreateUserData): User {
    this.validateUserData(userData)

    return {
      id: uuidv4(),
      name: userData.name,
      email: userData.email.toLowerCase(),
      age: userData.age
    }
  }

  private validateUserData(userData: CreateUserData): void {
    if (!userData.name || userData.name.trim().length === 0) {
      throw new Error('Name is required')
    }

    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email format')
    }

    if (userData.age < 0 || userData.age > 150) {
      throw new Error('Age must be between 0 and 150')
    }
  }

  private isValidEmail(email: string): boolean {
    return this.emailRegex.test(email)
  }
}
```

### Avantages du TDD
- **Code plus fiable** : Chaque fonctionnalité est testée
- **Design meilleur** : Force à penser à l'interface avant l'implémentation
- **Refactoring sécurisé** : Les tests garantissent que le comportement est préservé
- **Documentation vivante** : Les tests servent de documentation
- **Détection précoce des bugs** : Les erreurs sont détectées immédiatement

### Inconvénients du TDD
- **Courbe d'apprentissage** : Nécessite un changement de mentalité
- **Temps initial** : Plus de temps au début du développement
- **Tests mal conçus** : Peuvent devenir un fardeau s'ils sont mal écrits
- **Complexité** : Peut être difficile pour des logiques très complexes

## 2. BDD (Behavior-Driven Development)

### Description
Le Behavior-Driven Development se concentre sur le comportement du système du point de vue de l'utilisateur. Il utilise un langage naturel pour décrire les fonctionnalités.

### Syntaxe Given-When-Then
```typescript
// features/user-registration.feature
Feature: User Registration
  As a website visitor
  I want to register for an account
  So that I can access personalized content

  Scenario: Successful user registration
    Given I am on the registration page
    When I fill in the form with valid data
    And I submit the registration form
    Then I should see a success message
    And I should receive a confirmation email

  Scenario: Registration with invalid email
    Given I am on the registration page
    When I fill in the form with an invalid email
    And I submit the registration form
    Then I should see an error message
    And I should not be registered
```

### Implémentation avec Cucumber
```typescript
// step-definitions/user-registration.steps.ts
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from 'chai'
import { UserRegistrationPage } from '../pages/user-registration.page'

let registrationPage: UserRegistrationPage

Given('I am on the registration page', async () => {
  registrationPage = new UserRegistrationPage()
  await registrationPage.navigateTo()
})

When('I fill in the form with valid data', async () => {
  await registrationPage.fillName('John Doe')
  await registrationPage.fillEmail('john@example.com')
  await registrationPage.fillPassword('SecurePassword123')
  await registrationPage.fillConfirmPassword('SecurePassword123')
})

When('I fill in the form with an invalid email', async () => {
  await registrationPage.fillName('John Doe')
  await registrationPage.fillEmail('invalid-email')
  await registrationPage.fillPassword('SecurePassword123')
  await registrationPage.fillConfirmPassword('SecurePassword123')
})

When('I submit the registration form', async () => {
  await registrationPage.submitForm()
})

Then('I should see a success message', async () => {
  const successMessage = await registrationPage.getSuccessMessage()
  expect(successMessage).to.include('Registration successful')
})

Then('I should see an error message', async () => {
  const errorMessage = await registrationPage.getErrorMessage()
  expect(errorMessage).to.include('Invalid email format')
})

Then('I should receive a confirmation email', async () => {
  // Vérification de l'email (mock ou service de test)
  const emailSent = await registrationPage.checkConfirmationEmailSent()
  expect(emailSent).to.be.true
})

Then('I should not be registered', async () => {
  const isRegistered = await registrationPage.isUserRegistered()
  expect(isRegistered).to.be.false
})
```

### Page Object Model
```typescript
// pages/user-registration.page.ts
export class UserRegistrationPage {
  private readonly nameInput = '#name'
  private readonly emailInput = '#email'
  private readonly passwordInput = '#password'
  private readonly confirmPasswordInput = '#confirmPassword'
  private readonly submitButton = '#submit'
  private readonly successMessage = '.success-message'
  private readonly errorMessage = '.error-message'

  async navigateTo(): Promise<void> {
    await browser.url('/register')
  }

  async fillName(name: string): Promise<void> {
    await $(this.nameInput).setValue(name)
  }

  async fillEmail(email: string): Promise<void> {
    await $(this.emailInput).setValue(email)
  }

  async fillPassword(password: string): Promise<void> {
    await $(this.passwordInput).setValue(password)
  }

  async fillConfirmPassword(password: string): Promise<void> {
    await $(this.confirmPasswordInput).setValue(password)
  }

  async submitForm(): Promise<void> {
    await $(this.submitButton).click()
  }

  async getSuccessMessage(): Promise<string> {
    return await $(this.successMessage).getText()
  }

  async getErrorMessage(): Promise<string> {
    return await $(this.errorMessage).getText()
  }

  async checkConfirmationEmailSent(): Promise<boolean> {
    // Logique pour vérifier l'envoi d'email
    return true // Mock
  }

  async isUserRegistered(): Promise<boolean> {
    // Logique pour vérifier l'enregistrement
    return false // Mock
  }
}
```

## 3. DDD (Domain-Driven Design)

### Description
Le Domain-Driven Design se concentre sur la modélisation du domaine métier et la création d'un langage ubiquitaire partagé entre les développeurs et les experts métier.

### Langage Ubiquitaire
```typescript
// domain/user.aggregate.ts
export class User {
  private constructor(
    private readonly id: UserId,
    private readonly email: Email,
    private readonly profile: UserProfile,
    private readonly status: UserStatus
  ) {}

  static create(email: string, profile: UserProfile): User {
    const userId = UserId.generate()
    const userEmail = Email.create(email)
    
    return new User(userId, userEmail, profile, UserStatus.PENDING)
  }

  activate(): void {
    if (this.status === UserStatus.ACTIVE) {
      throw new DomainError('User is already active')
    }
    
    this.status = UserStatus.ACTIVE
    // Émettre un événement de domaine
    DomainEvents.raise(new UserActivatedEvent(this.id))
  }

  updateProfile(newProfile: UserProfile): void {
    this.profile = newProfile
    DomainEvents.raise(new UserProfileUpdatedEvent(this.id, newProfile))
  }

  isActive(): boolean {
    return this.status === UserStatus.ACTIVE
  }
}

// domain/value-objects/email.ts
export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    if (!this.isValid(email)) {
      throw new DomainError('Invalid email format')
    }
    return new Email(email.toLowerCase())
  }

  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  getValue(): string {
    return this.value
  }

  equals(other: Email): boolean {
    return this.value === other.value
  }
}

// domain/value-objects/user-id.ts
export class UserId {
  private constructor(private readonly value: string) {}

  static generate(): UserId {
    return new UserId(uuidv4())
  }

  static fromString(value: string): UserId {
    if (!this.isValid(value)) {
      throw new DomainError('Invalid user ID format')
    }
    return new UserId(value)
  }

  private static isValid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
  }

  getValue(): string {
    return this.value
  }

  equals(other: UserId): boolean {
    return this.value === other.value
  }
}
```

### Bounded Contexts
```typescript
// user-context/domain/user.aggregate.ts
export class User {
  // Logique spécifique au contexte utilisateur
}

// order-context/domain/order.aggregate.ts
export class Order {
  // Logique spécifique au contexte commande
}

// shared-kernel/domain/value-objects/money.ts
export class Money {
  // Valeur partagée entre les contextes
}
```

### Repository Pattern
```typescript
// domain/repositories/user.repository.ts
export interface UserRepository {
  findById(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  save(user: User): Promise<void>
  delete(id: UserId): Promise<void>
}

// infrastructure/repositories/typeorm-user.repository.ts
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>
  ) {}

  async findById(id: UserId): Promise<User | null> {
    const entity = await this.userEntityRepository.findOne({
      where: { id: id.getValue() }
    })
    
    return entity ? this.toDomain(entity) : null
  }

  async findByEmail(email: Email): Promise<User | null> {
    const entity = await this.userEntityRepository.findOne({
      where: { email: email.getValue() }
    })
    
    return entity ? this.toDomain(entity) : null
  }

  async save(user: User): Promise<void> {
    const entity = this.toEntity(user)
    await this.userEntityRepository.save(entity)
  }

  async delete(id: UserId): Promise<void> {
    await this.userEntityRepository.delete(id.getValue())
  }

  private toDomain(entity: UserEntity): User {
    // Conversion de l'entité vers l'agrégat de domaine
  }

  private toEntity(user: User): UserEntity {
    // Conversion de l'agrégat vers l'entité
  }
}
```

## 4. ATDD (Acceptance Test-Driven Development)

### Description
L'Acceptance Test-Driven Development se concentre sur l'écriture de tests d'acceptation avant le développement, en collaboration avec les parties prenantes.

### Exemple - Tests d'Acceptation
```typescript
// acceptance-tests/user-registration.test.ts
describe('User Registration Acceptance Tests', () => {
  let userRegistrationService: UserRegistrationService
  let emailService: EmailService
  let userRepository: UserRepository

  beforeEach(() => {
    userRegistrationService = new UserRegistrationService()
    emailService = new EmailService()
    userRepository = new UserRepository()
  })

  describe('AC-001: User Registration with Valid Data', () => {
    it('should register a new user and send confirmation email', async () => {
      // Given
      const registrationRequest = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePassword123'
      }

      // When
      const result = await userRegistrationService.register(registrationRequest)

      // Then
      expect(result.success).toBe(true)
      expect(result.userId).toBeDefined()
      
      // Verify user is saved
      const savedUser = await userRepository.findById(result.userId)
      expect(savedUser).toBeDefined()
      expect(savedUser.email).toBe('john@example.com')
      
      // Verify email is sent
      const sentEmails = emailService.getSentEmails()
      expect(sentEmails).toHaveLength(1)
      expect(sentEmails[0].to).toBe('john@example.com')
      expect(sentEmails[0].subject).toContain('Welcome')
    })
  })

  describe('AC-002: User Registration with Duplicate Email', () => {
    it('should reject registration with existing email', async () => {
      // Given
      const existingUser = await userRegistrationService.register({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'Password123'
      })

      const duplicateRequest = {
        name: 'John Doe',
        email: 'jane@example.com', // Same email
        password: 'AnotherPassword123'
      }

      // When & Then
      await expect(userRegistrationService.register(duplicateRequest))
        .rejects.toThrow('Email already exists')
    })
  })
})
```

## 5. Property-Based Testing

### Description
Le Property-Based Testing génère automatiquement des données de test et vérifie que certaines propriétés sont toujours vraies.

### Exemple avec Fast-Check
```typescript
import * as fc from 'fast-check'

describe('User Service Property-Based Tests', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService()
  })

  it('should always create valid users with valid input', () => {
    fc.assert(fc.property(
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 100 }),
        email: fc.emailAddress(),
        age: fc.integer({ min: 0, max: 150 })
      }),
      (userData) => {
        // Act
        const user = userService.createUser(userData)

        // Assert - Propriétés qui doivent toujours être vraies
        expect(user).toBeDefined()
        expect(user.id).toBeDefined()
        expect(user.name).toBe(userData.name)
        expect(user.email).toBe(userData.email.toLowerCase())
        expect(user.age).toBe(userData.age)
        expect(typeof user.id).toBe('string')
        expect(user.id.length).toBeGreaterThan(0)
      }
    ))
  })

  it('should always reject invalid emails', () => {
    fc.assert(fc.property(
      fc.record({
        name: fc.string({ minLength: 1 }),
        email: fc.string().filter(email => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
        age: fc.integer({ min: 0, max: 150 })
      }),
      (userData) => {
        // Act & Assert
        expect(() => userService.createUser(userData))
          .toThrow('Invalid email format')
      }
    ))
  })

  it('should always generate unique user IDs', () => {
    fc.assert(fc.property(
      fc.array(fc.record({
        name: fc.string({ minLength: 1 }),
        email: fc.emailAddress(),
        age: fc.integer({ min: 0, max: 150 })
      }), { minLength: 2, maxLength: 10 }),
      (userDataArray) => {
        // Act
        const users = userDataArray.map(data => userService.createUser(data))
        const userIds = users.map(user => user.id)

        // Assert - Tous les IDs doivent être uniques
        const uniqueIds = new Set(userIds)
        expect(uniqueIds.size).toBe(userIds.length)
      }
    ))
  })
})
```

## 6. Comparaison des Méthodologies

### Tableau Comparatif

| Aspect | TDD | BDD | DDD | ATDD | Property-Based |
|--------|-----|-----|-----|------|----------------|
| **Focus** | Code | Comportement | Domaine | Acceptation | Propriétés |
| **Niveau** | Unitaire | Intégration | Architecture | End-to-End | Unitaire/Intégration |
| **Langage** | Technique | Naturel | Métier | Naturel | Technique |
| **Collaboration** | Développeurs | Équipe | Experts métier | Parties prenantes | Développeurs |
| **Complexité** | Moyenne | Élevée | Très élevée | Élevée | Moyenne |
| **Maintenance** | Facile | Difficile | Très difficile | Difficile | Facile |

### Quand Utiliser Chaque Méthodologie

#### TDD
- **Quand** : Développement de nouvelles fonctionnalités
- **Avantages** : Code fiable, design amélioré
- **Inconvénients** : Courbe d'apprentissage

#### BDD
- **Quand** : Collaboration avec les parties prenantes
- **Avantages** : Communication améliorée, tests compréhensibles
- **Inconvénients** : Complexité de mise en place

#### DDD
- **Quand** : Domaines métier complexes
- **Avantages** : Modélisation précise, langage partagé
- **Inconvénients** : Overhead important

#### ATDD
- **Quand** : Validation avec les parties prenantes
- **Avantages** : Alignement sur les besoins
- **Inconvénients** : Temps de développement

#### Property-Based Testing
- **Quand** : Logique complexe, algorithmes
- **Avantages** : Couverture exhaustive, détection de cas limites
- **Inconvénients** : Difficile à déboguer

## Bonnes Pratiques

1. **Commencer simple** : Commencer par TDD avant d'adopter des méthodologies plus complexes
2. **Collaboration** : Impliquer les parties prenantes dans BDD et ATDD
3. **Langage ubiquitaire** : Créer un vocabulaire partagé en DDD
4. **Tests maintenables** : Écrire des tests clairs et maintenables
5. **Automatisation** : Automatiser l'exécution des tests
6. **Documentation** : Utiliser les tests comme documentation

## Pièges à Éviter

1. **Sur-ingénierie** : Ne pas appliquer toutes les méthodologies en même temps
2. **Tests fragiles** : Éviter les tests qui cassent facilement
3. **Couverture excessive** : Ne pas viser 100% de couverture à tout prix
4. **Tests lents** : Éviter les tests qui prennent trop de temps
5. **Maintenance négligée** : Maintenir les tests à jour avec le code

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
