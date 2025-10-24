# DTOs et Patterns de Validation - Guide Complet

## 1. Concepts Fondamentaux des DTOs

### Qu'est-ce qu'un DTO ?

Un **Data Transfer Object (DTO)** est un objet qui transporte des données entre les couches d'une application. Il encapsule les données et peut inclure de la validation, de la transformation et de la sérialisation.

```typescript
// Exemple de DTO basique
interface UserDto {
  id: string
  name: string
  email: string
  age: number
  createdAt: Date
}

// DTO avec validation
class CreateUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly age: number
  ) {
    this.validate()
  }
  
  private validate(): void {
    if (!this.name || this.name.length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères')
    }
    
    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('Email invalide')
    }
    
    if (this.age < 18 || this.age > 120) {
      throw new Error('L\'âge doit être entre 18 et 120 ans')
    }
  }
  
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
```

### Types de DTOs

```typescript
// DTO de création
interface CreateUserDto {
  name: string
  email: string
  age: number
  password: string
}

// DTO de mise à jour (tous les champs optionnels)
interface UpdateUserDto {
  name?: string
  email?: string
  age?: number
}

// DTO de réponse (données publiques)
interface UserResponseDto {
  id: string
  name: string
  email: string
  age: number
  createdAt: Date
  // Pas de mot de passe dans la réponse
}

// DTO de requête avec pagination
interface GetUsersDto {
  page?: number
  limit?: number
  search?: string
  sortBy?: 'name' | 'email' | 'createdAt'
  sortOrder?: 'asc' | 'desc'
}

// DTO de requête avec filtres
interface FilterUsersDto {
  ageMin?: number
  ageMax?: number
  isActive?: boolean
  role?: 'user' | 'admin' | 'moderator'
}
```

## 2. Validation avec Zod

### Schémas de Base

```typescript
// schemas/user.schema.ts
import { z } from 'zod'

// Schéma de base pour l'utilisateur
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120),
  isActive: z.boolean().default(true),
  role: z.enum(['user', 'admin', 'moderator']).default('user'),
  createdAt: z.date(),
  updatedAt: z.date()
})

// DTOs dérivés
export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).extend({
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
})

export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password: true
})

export const UserResponseSchema = UserSchema.omit({
  password: true
})

// Types TypeScript générés
export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type UserResponse = z.infer<typeof UserResponseSchema>
```

### Validation Avancée

```typescript
// schemas/advanced-validation.schema.ts
import { z } from 'zod'

// Validation avec contraintes métier
export const OrderSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().min(1).max(100),
    price: z.number().min(0)
  })).min(1, 'La commande doit contenir au moins un article'),
  
  shippingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().regex(/^[0-9]{5}$/),
    country: z.string().min(2).max(2) // Code ISO
  }),
  
  paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
  totalAmount: z.number().min(0)
}).refine(
  (data) => {
    const calculatedTotal = data.items.reduce(
      (sum, item) => sum + (item.quantity * item.price), 0
    )
    return Math.abs(calculatedTotal - data.totalAmount) < 0.01
  },
  {
    message: 'Le montant total ne correspond pas à la somme des articles',
    path: ['totalAmount']
  }
)

// Validation conditionnelle
export const UserProfileSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('individual'),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.date()
  }),
  z.object({
    type: z.literal('company'),
    companyName: z.string().min(1),
    siret: z.string().regex(/^[0-9]{14}$/),
    vatNumber: z.string().regex(/^FR[0-9]{2}[0-9]{9}$/)
  })
])

// Validation avec transformation
export const ProductSchema = z.object({
  name: z.string().min(1).transform(name => name.trim()),
  price: z.union([
    z.string().transform(val => parseFloat(val.replace(',', '.'))),
    z.number()
  ]).refine(val => !isNaN(val) && val >= 0, 'Prix invalide'),
  
  category: z.string().transform(cat => cat.toLowerCase()),
  tags: z.array(z.string()).transform(tags => [...new Set(tags)]),
  
  metadata: z.record(z.any()).transform(metadata => {
    // Nettoyer les valeurs nulles/undefined
    const cleaned: Record<string, any> = {}
    for (const [key, value] of Object.entries(metadata)) {
      if (value !== null && value !== undefined && value !== '') {
        cleaned[key] = value
      }
    }
    return cleaned
  })
})
```

## 3. Patterns de Validation

### Pattern de Validation en Couches

```typescript
// validation/layered-validation.ts
import { z } from 'zod'

// Couche 1: Validation de format
export const formatValidation = {
  email: z.string().email(),
  phone: z.string().regex(/^(\+33|0)[1-9][0-9]{8}$/),
  postalCode: z.string().regex(/^[0-9]{5}$/),
  uuid: z.string().uuid()
}

// Couche 2: Validation métier
export const businessValidation = {
  userAge: z.number().min(18).max(120),
  passwordStrength: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
  orderQuantity: z.number().min(1).max(1000)
}

// Couche 3: Validation contextuelle
export const contextualValidation = {
  userRegistration: z.object({
    name: z.string().min(2).max(50),
    email: formatValidation.email,
    age: businessValidation.userAge,
    password: businessValidation.passwordStrength
  }),
  
  userUpdate: z.object({
    name: z.string().min(2).max(50).optional(),
    email: formatValidation.email.optional(),
    age: businessValidation.userAge.optional()
  })
}

// Fonction de validation en couches
export const validateLayered = <T>(
  data: unknown,
  validators: z.ZodSchema<T>[]
): { success: true; data: T } | { success: false; errors: string[] } => {
  const errors: string[] = []
  
  for (const validator of validators) {
    try {
      const result = validator.parse(data)
      return { success: true, data: result }
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(...error.errors.map(err => err.message))
      }
    }
  }
  
  return { success: false, errors }
}
```

### Pattern de Validation avec Retry

```typescript
// validation/retry-validation.ts
import { z } from 'zod'

// Fonction d'auto-correction
const autoCorrect = (data: any, error: z.ZodError): any => {
  const corrected = { ...data }
  
  error.errors.forEach((err) => {
    const path = err.path.join('.')
    const value = getNestedValue(corrected, path)
    
    switch (err.code) {
      case 'invalid_type':
        if (err.expected === 'string' && typeof value === 'number') {
          setNestedValue(corrected, path, value.toString())
        } else if (err.expected === 'number' && typeof value === 'string') {
          const num = parseFloat(value)
          if (!isNaN(num)) {
            setNestedValue(corrected, path, num)
          }
        }
        break
      
      case 'too_small':
        if (err.type === 'string' && value.length < err.minimum) {
          setNestedValue(corrected, path, value.padEnd(err.minimum, ' '))
        }
        break
      
      case 'too_big':
        if (err.type === 'string' && value.length > err.maximum) {
          setNestedValue(corrected, path, value.substring(0, err.maximum))
        }
        break
    }
  })
  
  return corrected
}

// Validation avec retry et auto-correction
export const validateWithRetry = async <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  maxRetries: number = 3
): Promise<T> => {
  let currentData = data
  let lastError: z.ZodError | null = null
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return schema.parse(currentData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        lastError = error
        
        if (attempt < maxRetries - 1) {
          currentData = autoCorrect(currentData, error)
        }
      } else {
        throw error
      }
    }
  }
  
  throw lastError
}

// Fonctions utilitaires
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const setNestedValue = (obj: any, path: string, value: any): void => {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {}
    return current[key]
  }, obj)
  target[lastKey] = value
}
```

## 4. DTOs avec NestJS

### DTOs avec Class Validator

```typescript
// dto/user.dto.ts
import { IsString, IsEmail, IsNumber, IsOptional, Min, Max, Length } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value?.trim())
  name: string
  
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email: string
  
  @IsNumber()
  @Min(18)
  @Max(120)
  @Transform(({ value }) => parseInt(value))
  age: number
  
  @IsString()
  @Length(8, 100)
  password: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value?.trim())
  name?: string
  
  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase())
  email?: string
  
  @IsOptional()
  @IsNumber()
  @Min(18)
  @Max(120)
  @Transform(({ value }) => parseInt(value))
  age?: number
}

export class GetUsersDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number = 1
  
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit?: number = 10
  
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string
  
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'email' | 'createdAt' = 'createdAt'
  
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc'
}
```

### DTOs avec Validation Personnalisée

```typescript
// dto/custom-validation.dto.ts
import { IsString, IsNumber, IsOptional, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

// Validateur personnalisé
@ValidatorConstraint({ name: 'isValidPostalCode', async: false })
export class IsValidPostalCodeConstraint implements ValidatorConstraintInterface {
  validate(postalCode: string, args: ValidationArguments) {
    const [country] = args.constraints
    const countryCode = (args.object as any).country
    
    switch (countryCode || country) {
      case 'FR':
        return /^[0-9]{5}$/.test(postalCode)
      case 'US':
        return /^[0-9]{5}(-[0-9]{4})?$/.test(postalCode)
      case 'CA':
        return /^[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]$/.test(postalCode)
      default:
        return true
    }
  }
  
  defaultMessage(args: ValidationArguments) {
    const countryCode = (args.object as any).country
    return `Code postal invalide pour le pays ${countryCode}`
  }
}

// DTO avec validation personnalisée
export class AddressDto {
  @IsString()
  street: string
  
  @IsString()
  city: string
  
  @IsString()
  @Validate(IsValidPostalCodeConstraint, ['FR'])
  postalCode: string
  
  @IsString()
  country: string
}

// Validateur pour les mots de passe forts
@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
  }
  
  defaultMessage() {
    return 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
  }
}

export class CreateUserWithValidationDto {
  @IsString()
  name: string
  
  @IsEmail()
  email: string
  
  @IsString()
  @Validate(IsStrongPasswordConstraint)
  password: string
  
  @IsNumber()
  age: number
  
  @IsOptional()
  @Validate(AddressDto)
  address?: AddressDto
}
```

## 5. DTOs avec Vue 3

### Composable de Validation

```typescript
// composables/useDtoValidation.ts
import { ref, computed, watch } from 'vue'
import { z } from 'zod'

export const useDtoValidation = <T>(schema: z.ZodSchema<T>) => {
  const data = ref<Partial<T>>({})
  const errors = ref<Record<string, string[]>>({})
  const isValid = ref(false)
  const isDirty = ref(false)
  const isSubmitting = ref(false)
  
  // Validation complète
  const validate = () => {
    try {
      schema.parse(data.value)
      errors.value = {}
      isValid.value = true
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string[]> = {}
        
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          if (!formattedErrors[path]) {
            formattedErrors[path] = []
          }
          formattedErrors[path].push(err.message)
        })
        
        errors.value = formattedErrors
        isValid.value = false
        return false
      }
      throw error
    }
  }
  
  // Validation d'un champ spécifique
  const validateField = (field: keyof T) => {
    try {
      const fieldSchema = schema.shape[field as string]
      if (fieldSchema) {
        fieldSchema.parse(data.value[field])
        delete errors.value[field as string]
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value[field as string] = error.errors.map(err => err.message)
      }
    }
  }
  
  // Reset des données
  const reset = () => {
    data.value = {}
    errors.value = {}
    isValid.value = false
    isDirty.value = false
    isSubmitting.value = false
  }
  
  // Soumission avec validation
  const submit = async (onSubmit: (data: T) => Promise<void>) => {
    if (!validate()) return false
    
    isSubmitting.value = true
    try {
      await onSubmit(data.value as T)
      return true
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      return false
    } finally {
      isSubmitting.value = false
    }
  }
  
  // Watch pour la validation automatique
  watch(data, () => {
    isDirty.value = true
    validate()
  }, { deep: true })
  
  return {
    data,
    errors: computed(() => errors.value),
    isValid: computed(() => isValid.value),
    isDirty: computed(() => isDirty.value),
    isSubmitting: computed(() => isSubmitting.value),
    validate,
    validateField,
    reset,
    submit
  }
}
```

### Composant de Formulaire DTO

```vue
<!-- components/DtoForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="dto-form">
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label :for="field.name" class="form-label">
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </label>
      
      <!-- Champ texte -->
      <input
        v-if="field.type === 'text' || field.type === 'email'"
        :id="field.name"
        v-model="data[field.name]"
        :type="field.type"
        :placeholder="field.placeholder"
        class="form-input"
        :class="{ 'error': errors[field.name] }"
        @blur="validateField(field.name)"
      />
      
      <!-- Champ numérique -->
      <input
        v-else-if="field.type === 'number'"
        :id="field.name"
        v-model.number="data[field.name]"
        type="number"
        :placeholder="field.placeholder"
        class="form-input"
        :class="{ 'error': errors[field.name] }"
        @blur="validateField(field.name)"
      />
      
      <!-- Champ mot de passe -->
      <input
        v-else-if="field.type === 'password'"
        :id="field.name"
        v-model="data[field.name]"
        type="password"
        :placeholder="field.placeholder"
        class="form-input"
        :class="{ 'error': errors[field.name] }"
        @blur="validateField(field.name)"
      />
      
      <!-- Zone de texte -->
      <textarea
        v-else-if="field.type === 'textarea'"
        :id="field.name"
        v-model="data[field.name]"
        :placeholder="field.placeholder"
        class="form-textarea"
        :class="{ 'error': errors[field.name] }"
        @blur="validateField(field.name)"
      />
      
      <!-- Sélecteur -->
      <select
        v-else-if="field.type === 'select'"
        :id="field.name"
        v-model="data[field.name]"
        class="form-select"
        :class="{ 'error': errors[field.name] }"
        @blur="validateField(field.name)"
      >
        <option value="">Sélectionner...</option>
        <option v-for="option in field.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      
      <!-- Messages d'erreur -->
      <div v-if="errors[field.name]" class="error-messages">
        <div v-for="error in errors[field.name]" :key="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
    
    <!-- Actions du formulaire -->
    <div class="form-actions">
      <button type="button" @click="reset" class="btn btn-secondary">
        Réinitialiser
      </button>
      <button 
        type="submit" 
        :disabled="!isValid || isSubmitting" 
        class="btn btn-primary"
      >
        <span v-if="isSubmitting">Envoi en cours...</span>
        <span v-else>Soumettre</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useDtoValidation } from '~/composables/useDtoValidation'

interface Props {
  schema: z.ZodSchema<any>
  fields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'number' | 'password' | 'textarea' | 'select'
    required?: boolean
    placeholder?: string
    options?: Array<{ value: string; label: string }>
  }>
  onSubmit: (data: any) => Promise<void>
}

const props = defineProps<Props>()

const { data, errors, isValid, isSubmitting, validateField, reset, submit } = useDtoValidation(props.schema)

const handleSubmit = async () => {
  await submit(props.onSubmit)
}
</script>
```

## 6. Patterns de Transformation

### Transformation de Données

```typescript
// transformation/data-transformation.ts
import { z } from 'zod'

// Transformation pour normaliser les données
export const normalizeData = <T>(data: any, schema: z.ZodSchema<T>): T => {
  return schema.parse(data)
}

// Transformation pour nettoyer les données
export const cleanData = (data: any): any => {
  const cleaned: any = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined && value !== '') {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nestedCleaned = cleanData(value)
        if (Object.keys(nestedCleaned).length > 0) {
          cleaned[key] = nestedCleaned
        }
      } else {
        cleaned[key] = value
      }
    }
  }
  
  return cleaned
}

// Transformation pour formater les données
export const formatData = (data: any, formatters: Record<string, (value: any) => any>): any => {
  const formatted: any = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (formatters[key]) {
      formatted[key] = formatters[key](value)
    } else {
      formatted[key] = value
    }
  }
  
  return formatted
}

// Transformation pour sérialiser les données
export const serializeData = (data: any): string => {
  return JSON.stringify(data, (key, value) => {
    if (value instanceof Date) {
      return value.toISOString()
    }
    return value
  })
}

// Transformation pour désérialiser les données
export const deserializeData = (serialized: string): any => {
  return JSON.parse(serialized, (key, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return new Date(value)
    }
    return value
  })
}
```

### Transformation avec Validation

```typescript
// transformation/validated-transformation.ts
import { z } from 'zod'

// Transformation avec validation de format
export const transformWithValidation = <T>(
  data: any,
  schema: z.ZodSchema<T>,
  transformers: Record<string, (value: any) => any> = {}
): T => {
  // Appliquer les transformations
  const transformed = { ...data }
  
  for (const [key, transformer] of Object.entries(transformers)) {
    if (transformed[key] !== undefined) {
      transformed[key] = transformer(transformed[key])
    }
  }
  
  // Valider le résultat
  return schema.parse(transformed)
}

// Transformation pour les dates
export const dateTransformers = {
  toDate: (value: any) => {
    if (typeof value === 'string') {
      return new Date(value)
    }
    return value
  },
  
  toISOString: (value: any) => {
    if (value instanceof Date) {
      return value.toISOString()
    }
    return value
  },
  
  toTimestamp: (value: any) => {
    if (value instanceof Date) {
      return value.getTime()
    }
    return value
  }
}

// Transformation pour les nombres
export const numberTransformers = {
  toInt: (value: any) => {
    if (typeof value === 'string') {
      return parseInt(value, 10)
    }
    return value
  },
  
  toFloat: (value: any) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'))
    }
    return value
  },
  
  toCurrency: (value: any) => {
    if (typeof value === 'number') {
      return (value / 100).toFixed(2)
    }
    return value
  }
}

// Transformation pour les chaînes
export const stringTransformers = {
  trim: (value: any) => {
    if (typeof value === 'string') {
      return value.trim()
    }
    return value
  },
  
  toLowerCase: (value: any) => {
    if (typeof value === 'string') {
      return value.toLowerCase()
    }
    return value
  },
  
  toUpperCase: (value: any) => {
    if (typeof value === 'string') {
      return value.toUpperCase()
    }
    return value
  },
  
  capitalize: (value: any) => {
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }
    return value
  }
}
```

## 7. Patterns de Sérialisation

### Sérialisation Avancée

```typescript
// serialization/advanced-serialization.ts
import { z } from 'zod'

// Sérialiseur personnalisé
export class CustomSerializer {
  private static instance: CustomSerializer
  private transformers: Map<string, (value: any) => any> = new Map()
  private deserializers: Map<string, (value: any) => any> = new Map()
  
  static getInstance(): CustomSerializer {
    if (!CustomSerializer.instance) {
      CustomSerializer.instance = new CustomSerializer()
    }
    return CustomSerializer.instance
  }
  
  // Enregistrer un transformateur
  registerTransformer(type: string, transformer: (value: any) => any): void {
    this.transformers.set(type, transformer)
  }
  
  // Enregistrer un désérialiseur
  registerDeserializer(type: string, deserializer: (value: any) => any): void {
    this.deserializers.set(type, deserializer)
  }
  
  // Sérialiser avec validation
  serialize<T>(data: T, schema: z.ZodSchema<T>): string {
    // Valider les données
    const validated = schema.parse(data)
    
    // Sérialiser
    return JSON.stringify(validated, (key, value) => {
      if (value instanceof Date) {
        return { __type: 'Date', value: value.toISOString() }
      }
      
      if (value instanceof Map) {
        return { __type: 'Map', value: Array.from(value.entries()) }
      }
      
      if (value instanceof Set) {
        return { __type: 'Set', value: Array.from(value) }
      }
      
      return value
    })
  }
  
  // Désérialiser avec validation
  deserialize<T>(serialized: string, schema: z.ZodSchema<T>): T {
    const parsed = JSON.parse(serialized, (key, value) => {
      if (value && typeof value === 'object' && value.__type) {
        switch (value.__type) {
          case 'Date':
            return new Date(value.value)
          case 'Map':
            return new Map(value.value)
          case 'Set':
            return new Set(value.value)
          default:
            return value
        }
      }
      return value
    })
    
    return schema.parse(parsed)
  }
}

// Utilisation
const serializer = CustomSerializer.getInstance()

// Sérialiser un utilisateur
const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
  tags: new Set(['admin', 'user'])
}

const serialized = serializer.serialize(user, UserSchema)
const deserialized = serializer.deserialize(serialized, UserSchema)
```

## 8. Patterns de Cache et Performance

### Cache de Validation

```typescript
// cache/validation-cache.ts
import { z } from 'zod'

export class ValidationCache {
  private static instance: ValidationCache
  private cache: Map<string, any> = new Map()
  private maxSize: number = 1000
  private ttl: number = 5 * 60 * 1000 // 5 minutes
  
  static getInstance(): ValidationCache {
    if (!ValidationCache.instance) {
      ValidationCache.instance = new ValidationCache()
    }
    return ValidationCache.instance
  }
  
  // Générer une clé de cache
  private generateKey(schema: z.ZodSchema<any>, data: any): string {
    const schemaString = schema.toString()
    const dataString = JSON.stringify(data)
    return `${schemaString}:${dataString}`
  }
  
  // Valider avec cache
  validate<T>(schema: z.ZodSchema<T>, data: any): T {
    const key = this.generateKey(schema, data)
    const cached = this.cache.get(key)
    
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.result
    }
    
    const result = schema.parse(data)
    
    // Mettre en cache
    this.cache.set(key, {
      result,
      timestamp: Date.now()
    })
    
    // Nettoyer le cache si nécessaire
    if (this.cache.size > this.maxSize) {
      this.cleanup()
    }
    
    return result
  }
  
  // Nettoyer le cache
  private cleanup(): void {
    const now = Date.now()
    const entries = Array.from(this.cache.entries())
    
    // Supprimer les entrées expirées
    entries.forEach(([key, value]) => {
      if (now - value.timestamp > this.ttl) {
        this.cache.delete(key)
      }
    })
    
    // Si encore trop d'entrées, supprimer les plus anciennes
    if (this.cache.size > this.maxSize) {
      const sortedEntries = entries
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
        .slice(0, this.cache.size - this.maxSize)
      
      sortedEntries.forEach(([key]) => {
        this.cache.delete(key)
      })
    }
  }
  
  // Vider le cache
  clear(): void {
    this.cache.clear()
  }
  
  // Obtenir les statistiques du cache
  getStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: 0 // À implémenter avec un compteur de hits
    }
  }
}
```

## Bonnes Pratiques Expertes

1. **Validation Stricte** : Utiliser des schémas stricts pour éviter les erreurs
2. **Transformation** : Utiliser les transformations pour normaliser les données
3. **Gestion d'Erreurs** : Implémenter une gestion d'erreurs robuste
4. **Performance** : Utiliser le cache pour optimiser les validations
5. **Réutilisabilité** : Créer des DTOs réutilisables et modulaires
6. **Tests** : Tester les DTOs et les validations
7. **Documentation** : Documenter les DTOs complexes
8. **Sécurité** : Valider toutes les données d'entrée

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
