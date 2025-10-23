# Zod - Validation de schémas TypeScript

## Installation

```bash
npm install zod
```

## Schémas de base

```typescript
import { z } from 'zod'

// Types primitifs
const stringSchema = z.string()
const numberSchema = z.number()
const booleanSchema = z.boolean()
const dateSchema = z.date()

// Validation
const result = stringSchema.parse('hello') // 'hello'
const error = stringSchema.parse(123) // ZodError
```

## Schémas d'objet

```typescript
import { z } from 'zod'

// Schéma utilisateur
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date())
})

// Validation
const user = userSchema.parse({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 25
})

// Types TypeScript générés
type User = z.infer<typeof userSchema>
```

## Validation avec messages personnalisés

```typescript
import { z } from 'zod'

const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }).min(2, 'Name must be at least 2 characters'),
  
  email: z.string().email('Invalid email format'),
  
  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be a number'
  }).min(18, 'Must be at least 18 years old')
})

// Validation avec gestion d'erreur
try {
  const user = userSchema.parse(input)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(error.errors)
  }
}
```

## Schémas optionnels et nullable

```typescript
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  
  // Optionnel
  phone: z.string().optional(),
  
  // Nullable
  avatar: z.string().nullable(),
  
  // Optionnel et nullable
  bio: z.string().optional().nullable(),
  
  // Avec valeur par défaut
  role: z.enum(['user', 'admin']).default('user')
})
```

## Schémas d'array

```typescript
import { z } from 'zod'

// Array simple
const stringArraySchema = z.array(z.string())

// Array avec validation
const userArraySchema = z.array(z.object({
  id: z.number(),
  name: z.string()
})).min(1, 'At least one user is required')

// Array avec length spécifique
const coordinatesSchema = z.array(z.number()).length(2)

// Validation
const users = userArraySchema.parse([
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
])
```

## Schémas d'union et d'intersection

```typescript
import { z } from 'zod'

// Union
const stringOrNumberSchema = z.union([z.string(), z.number()])

// Discriminated union
const animalSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('dog'),
    breed: z.string()
  }),
  z.object({
    type: z.literal('cat'),
    color: z.string()
  })
])

// Intersection
const userSchema = z.object({
  name: z.string(),
  email: z.string().email()
})

const adminSchema = z.object({
  role: z.literal('admin'),
  permissions: z.array(z.string())
})

const adminUserSchema = userSchema.and(adminSchema)
```

## Schémas de transformation

```typescript
import { z } from 'zod'

// Transformation simple
const stringToNumberSchema = z.string().transform((val) => parseInt(val))

// Transformation avec validation
const emailSchema = z.string().email().transform((email) => email.toLowerCase())

// Transformation conditionnelle
const ageSchema = z.union([
  z.string().transform((val) => parseInt(val)),
  z.number()
])

// Preprocess
const preprocessedSchema = z.preprocess(
  (val) => {
    if (typeof val === 'string') {
      return JSON.parse(val)
    }
    return val
  },
  z.object({
    name: z.string(),
    age: z.number()
  })
)
```

## Schémas de validation avancés

```typescript
import { z } from 'zod'

// Validation personnalisée
const passwordSchema = z.string().refine((val) => {
  return val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val)
}, {
  message: 'Password must be at least 8 characters with uppercase and number'
})

// Validation avec contexte
const confirmPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

// Validation async
const uniqueEmailSchema = z.string().email().refine(async (email) => {
  const exists = await checkEmailExists(email)
  return !exists
}, {
  message: 'Email already exists'
})
```

## Intégration avec Vue 3

### Composable de validation

```typescript
// composables/useValidation.ts
import { z } from 'zod'
import { ref, computed } from 'vue'

export function useValidation(schema: z.ZodSchema) {
  const errors = ref<Record<string, string>>({})
  const isValid = computed(() => Object.keys(errors.value).length === 0)
  
  const validate = (data: unknown) => {
    try {
      schema.parse(data)
      errors.value = {}
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value = error.errors.reduce((acc, err) => {
          const path = err.path.join('.')
          acc[path] = err.message
          return acc
        }, {} as Record<string, string>)
      }
      return false
    }
  }
  
  const validateField = (field: string, value: unknown) => {
    try {
      schema.pick({ [field]: true }).parse({ [field]: value })
      delete errors.value[field]
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors.find(err => err.path[0] === field)
        if (fieldError) {
          errors.value[field] = fieldError.message
        }
      }
    }
  }
  
  return {
    errors,
    isValid,
    validate,
    validateField
  }
}
```

### Utilisation dans un composant

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input 
        v-model="form.name" 
        type="text" 
        placeholder="Name"
        :class="{ error: errors.name }"
      />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    
    <div>
      <input 
        v-model="form.email" 
        type="email" 
        placeholder="Email"
        :class="{ error: errors.email }"
      />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    
    <div>
      <input 
        v-model="form.age" 
        type="number" 
        placeholder="Age"
        :class="{ error: errors.age }"
      />
      <span v-if="errors.age" class="error">{{ errors.age }}</span>
    </div>
    
    <button type="submit" :disabled="!isValid">Submit</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { z } from 'zod'
import { useValidation } from '@/composables/useValidation'

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  age: z.number().min(18, 'Must be at least 18 years old')
})

const { errors, isValid, validate, validateField } = useValidation(userSchema)

const form = ref({
  name: '',
  email: '',
  age: 0
})

// Validation en temps réel
watch(form, (newForm) => {
  Object.keys(newForm).forEach(field => {
    validateField(field, newForm[field])
  })
}, { deep: true })

const handleSubmit = () => {
  if (validate(form.value)) {
    console.log('Form is valid:', form.value)
  }
}
</script>

<style>
.error {
  color: red;
  border-color: red;
}
</style>
```

## Intégration avec Pinia

```typescript
// stores/user.ts
import { defineStore } from 'pinia'
import { z } from 'zod'

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user', 'admin']).default('user')
})

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  
  const addUser = (userData: unknown) => {
    try {
      const validatedUser = userSchema.parse(userData)
      users.value.push(validatedUser)
      return validatedUser
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`)
      }
      throw error
    }
  }
  
  const updateUser = (id: number, userData: unknown) => {
    try {
      const validatedUser = userSchema.parse(userData)
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...validatedUser }
      }
      return validatedUser
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Validation error: ${error.errors.map(e => e.message).join(', ')}`)
      }
      throw error
    }
  }
  
  return {
    users,
    addUser,
    updateUser
  }
})

type User = z.infer<typeof userSchema>
```

## Intégration avec API

```typescript
// composables/useApi.ts
import { z } from 'zod'
import { useFetch } from '@vueuse/core'

const apiResponseSchema = z.object({
  data: z.array(z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
  })),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number()
  })
})

export function useApi() {
  const { data, error, isLoading } = useFetch('/api/users')
  
  const validatedData = computed(() => {
    if (data.value) {
      try {
        return apiResponseSchema.parse(data.value)
      } catch (error) {
        console.error('API response validation failed:', error)
        return null
      }
    }
    return null
  })
  
  return {
    data: validatedData,
    error,
    isLoading
  }
}
```

## Schémas réutilisables

```typescript
// schemas/common.ts
import { z } from 'zod'

export const idSchema = z.number().positive()
export const emailSchema = z.string().email()
export const passwordSchema = z.string().min(8)
export const dateSchema = z.date()

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('asc')
})

export const searchSchema = z.object({
  query: z.string().min(1),
  filters: z.record(z.string()).optional()
})
```

## Tests

```typescript
// tests/schemas/user.test.ts
import { z } from 'zod'
import { userSchema } from '@/schemas/user'

describe('User Schema', () => {
  it('should validate a valid user', () => {
    const validUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    }
    
    expect(() => userSchema.parse(validUser)).not.toThrow()
  })
  
  it('should reject invalid email', () => {
    const invalidUser = {
      id: 1,
      name: 'John Doe',
      email: 'invalid-email',
      age: 25
    }
    
    expect(() => userSchema.parse(invalidUser)).toThrow()
  })
  
  it('should reject age below 18', () => {
    const invalidUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      age: 17
    }
    
    expect(() => userSchema.parse(invalidUser)).toThrow()
  })
})
```

## Bonnes pratiques

1. **Schémas réutilisables** : Créer des schémas de base réutilisables
2. **Messages d'erreur** : Utiliser des messages d'erreur clairs
3. **Validation en temps réel** : Valider les champs au fur et à mesure
4. **Types TypeScript** : Utiliser `z.infer` pour générer les types
5. **Tests** : Tester les schémas de validation
6. **Performance** : Éviter les validations trop complexes

## Pièges à éviter

1. **Validation excessive** : Ne pas sur-valider
2. **Messages d'erreur** : Éviter les messages d'erreur génériques
3. **Performance** : Attention aux validations async
4. **Types** : Vérifier la cohérence des types générés
