# Zod Avancé - Guide Expert

## 1. Validateurs Personnalisés

### Création de Validateurs Complexes

```typescript
// validators/custom-validators.ts
import { z } from 'zod'

// Validateur pour les mots de passe forts
const strongPassword = z.string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial')

// Validateur pour les emails avec domaine spécifique
const companyEmail = z.string()
  .email('Format d\'email invalide')
  .refine(
    (email) => email.endsWith('@company.com'),
    'L\'email doit être du domaine @company.com'
  )

// Validateur pour les numéros de téléphone français
const frenchPhone = z.string()
  .regex(/^(?:\+33|0)[1-9](?:[0-9]{8})$/, 'Numéro de téléphone français invalide')
  .transform((phone) => {
    // Normaliser le format
    return phone.startsWith('0') ? `+33${phone.slice(1)}` : phone
  })

// Validateur pour les codes postaux français
const frenchPostalCode = z.string()
  .regex(/^[0-9]{5}$/, 'Code postal français invalide')
  .refine(
    (code) => {
      const num = parseInt(code)
      return num >= 1000 && num <= 99999
    },
    'Code postal invalide'
  )

// Validateur pour les dates de naissance
const birthDate = z.date()
  .refine(
    (date) => {
      const age = new Date().getFullYear() - date.getFullYear()
      return age >= 18 && age <= 120
    },
    'L\'âge doit être entre 18 et 120 ans'
  )

// Validateur pour les URLs sécurisées
const secureUrl = z.string()
  .url('URL invalide')
  .refine(
    (url) => url.startsWith('https://'),
    'L\'URL doit utiliser HTTPS'
  )
```

### Validateurs avec Logique Métier

```typescript
// validators/business-validators.ts
import { z } from 'zod'

// Validateur pour les commandes
const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().min(1, 'La quantité doit être positive'),
    price: z.number().min(0, 'Le prix doit être positif')
  })).min(1, 'La commande doit contenir au moins un article'),
  
  shippingAddress: z.object({
    street: z.string().min(1, 'L\'adresse est requise'),
    city: z.string().min(1, 'La ville est requise'),
    postalCode: frenchPostalCode,
    country: z.string().min(1, 'Le pays est requis')
  }),
  
  paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
  
  totalAmount: z.number().min(0, 'Le montant total doit être positif')
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

// Validateur pour les utilisateurs avec validation croisée
const userSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: companyEmail,
  phone: frenchPhone.optional(),
  birthDate: birthDate,
  password: strongPassword,
  confirmPassword: z.string()
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword']
  }
)

// Validateur pour les réservations
const bookingSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
  guests: z.number().min(1, 'Au moins un invité est requis'),
  roomType: z.enum(['single', 'double', 'suite']),
  specialRequests: z.string().optional()
}).refine(
  (data) => data.checkOut > data.checkIn,
  {
    message: 'La date de sortie doit être après la date d\'arrivée',
    path: ['checkOut']
  }
).refine(
  (data) => {
    const nights = Math.ceil((data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return nights <= 30
  },
  {
    message: 'La réservation ne peut pas dépasser 30 nuits',
    path: ['checkOut']
  }
)
```

## 2. Transformations Avancées

### Transformations de Données

```typescript
// transformers/data-transformers.ts
import { z } from 'zod'

// Transformation pour normaliser les noms
const normalizedName = z.string()
  .transform((name) => {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  })

// Transformation pour les montants monétaires
const currencyAmount = z.union([
  z.string().transform((val) => parseFloat(val.replace(',', '.'))),
  z.number()
]).refine(
  (val) => !isNaN(val) && val >= 0,
  'Montant invalide'
)

// Transformation pour les dates avec différents formats
const flexibleDate = z.union([
  z.string().transform((str) => new Date(str)),
  z.date()
]).refine(
  (date) => !isNaN(date.getTime()),
  'Date invalide'
)

// Transformation pour les tableaux avec déduplication
const uniqueArray = <T>(schema: z.ZodType<T>) => 
  z.array(schema).transform((arr) => [...new Set(arr)])

// Transformation pour les objets avec nettoyage
const cleanObject = z.record(z.any()).transform((obj) => {
  const cleaned: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== '') {
      cleaned[key] = value
    }
  }
  
  return cleaned
})

// Transformation pour les URLs avec paramètres
const urlWithParams = z.string().url().transform((url) => {
  const urlObj = new URL(url)
  const params: Record<string, string> = {}
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value
  })
  
  return {
    baseUrl: urlObj.origin + urlObj.pathname,
    params
  }
})
```

### Transformations avec Validation

```typescript
// transformers/validated-transformers.ts
import { z } from 'zod'

// Transformation avec validation de format
const phoneWithValidation = z.string()
  .transform((phone) => {
    // Nettoyer le numéro
    const cleaned = phone.replace(/[\s\-\(\)]/g, '')
    
    // Valider le format
    if (!/^(\+33|0)[1-9][0-9]{8}$/.test(cleaned)) {
      throw new Error('Format de téléphone invalide')
    }
    
    // Normaliser
    return cleaned.startsWith('0') ? `+33${cleaned.slice(1)}` : cleaned
  })

// Transformation avec validation de cohérence
const addressWithValidation = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().regex(/^[0-9]{5}$/),
  country: z.string().min(1)
}).transform((address) => {
  // Vérifier la cohérence code postal / ville
  const postalCodeToCity: Record<string, string[]> = {
    '75001': ['Paris'],
    '75002': ['Paris'],
    '69001': ['Lyon'],
    '13001': ['Marseille']
  }
  
  const expectedCities = postalCodeToCity[address.postalCode]
  if (expectedCities && !expectedCities.includes(address.city)) {
    throw new Error(`Code postal ${address.postalCode} incompatible avec la ville ${address.city}`)
  }
  
  return {
    ...address,
    fullAddress: `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`
  }
})

// Transformation avec validation de business rules
const orderWithValidation = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0)
  })),
  customerId: z.string(),
  discountCode: z.string().optional()
}).transform(async (order) => {
  // Vérifier la disponibilité des produits
  for (const item of order.items) {
    const product = await checkProductAvailability(item.productId, item.quantity)
    if (!product.available) {
      throw new Error(`Produit ${item.productId} non disponible`)
    }
  }
  
  // Calculer le total avec remise
  const subtotal = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  let discount = 0
  
  if (order.discountCode) {
    const discountInfo = await validateDiscountCode(order.discountCode)
    if (discountInfo.valid) {
      discount = subtotal * (discountInfo.percentage / 100)
    }
  }
  
  return {
    ...order,
    subtotal,
    discount,
    total: subtotal - discount
  }
})
```

## 3. Gestion d'Erreurs Avancée

### Gestion d'Erreurs Personnalisée

```typescript
// error-handling/custom-error-handler.ts
import { z } from 'zod'

// Classe d'erreur personnalisée
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string,
    public value: any
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Gestionnaire d'erreurs personnalisé
const customErrorHandler = (error: z.ZodError) => {
  const formattedErrors: Record<string, string[]> = {}
  
  error.errors.forEach((err) => {
    const path = err.path.join('.')
    
    if (!formattedErrors[path]) {
      formattedErrors[path] = []
    }
    
    // Messages d'erreur personnalisés
    let message = err.message
    
    switch (err.code) {
      case 'invalid_type':
        message = `Le champ ${path} doit être de type ${err.expected}`
        break
      case 'too_small':
        if (err.type === 'string') {
          message = `Le champ ${path} doit contenir au moins ${err.minimum} caractères`
        } else if (err.type === 'number') {
          message = `Le champ ${path} doit être supérieur ou égal à ${err.minimum}`
        }
        break
      case 'too_big':
        if (err.type === 'string') {
          message = `Le champ ${path} ne peut pas dépasser ${err.maximum} caractères`
        } else if (err.type === 'number') {
          message = `Le champ ${path} doit être inférieur ou égal à ${err.maximum}`
        }
        break
      case 'invalid_string':
        if (err.validation === 'email') {
          message = `Le champ ${path} doit être un email valide`
        } else if (err.validation === 'url') {
          message = `Le champ ${path} doit être une URL valide`
        }
        break
    }
    
    formattedErrors[path].push(message)
  })
  
  return formattedErrors
}

// Fonction de validation avec gestion d'erreurs
const validateWithCustomError = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } => {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: customErrorHandler(error) }
    }
    throw error
  }
}
```

### Validation avec Retry et Fallback

```typescript
// error-handling/validation-with-retry.ts
import { z } from 'zod'

// Fonction de validation avec retry
const validateWithRetry = async <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  maxRetries: number = 3
): Promise<T> => {
  let lastError: z.ZodError | null = null
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return schema.parse(data)
    } catch (error) {
      if (error instanceof z.ZodError) {
        lastError = error
        
        // Essayer de corriger les erreurs automatiquement
        if (attempt < maxRetries - 1) {
          data = await attemptAutoFix(data, error)
        }
      } else {
        throw error
      }
    }
  }
  
  throw lastError
}

// Fonction d'auto-correction
const attemptAutoFix = async (data: any, error: z.ZodError): Promise<any> => {
  const fixedData = { ...data }
  
  error.errors.forEach((err) => {
    const path = err.path.join('.')
    const value = getNestedValue(fixedData, path)
    
    // Tentatives d'auto-correction
    switch (err.code) {
      case 'invalid_type':
        if (err.expected === 'string' && typeof value === 'number') {
          setNestedValue(fixedData, path, value.toString())
        } else if (err.expected === 'number' && typeof value === 'string') {
          const num = parseFloat(value)
          if (!isNaN(num)) {
            setNestedValue(fixedData, path, num)
          }
        }
        break
      
      case 'too_small':
        if (err.type === 'string' && value.length < err.minimum) {
          setNestedValue(fixedData, path, value.padEnd(err.minimum, ' '))
        }
        break
      
      case 'too_big':
        if (err.type === 'string' && value.length > err.maximum) {
          setNestedValue(fixedData, path, value.substring(0, err.maximum))
        }
        break
    }
  })
  
  return fixedData
}

// Fonctions utilitaires pour la manipulation d'objets imbriqués
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

## 4. Schémas Dynamiques et Conditionnels

### Schémas Conditionnels

```typescript
// schemas/conditional-schemas.ts
import { z } from 'zod'

// Schéma conditionnel basé sur le type d'utilisateur
const userSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('admin'),
    permissions: z.array(z.enum(['read', 'write', 'delete', 'admin'])),
    adminLevel: z.number().min(1).max(5)
  }),
  z.object({
    type: z.literal('user'),
    preferences: z.object({
      theme: z.enum(['light', 'dark']),
      notifications: z.boolean()
    }),
    subscription: z.enum(['free', 'premium', 'enterprise'])
  }),
  z.object({
    type: z.literal('guest'),
    sessionId: z.string(),
    expiresAt: z.date()
  })
])

// Schéma conditionnel basé sur le statut
const orderSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0)
  })),
  createdAt: z.date(),
  updatedAt: z.date()
}).and(
  z.discriminatedUnion('status', [
    z.object({
      status: z.literal('pending'),
      paymentMethod: z.undefined()
    }),
    z.object({
      status: z.literal('confirmed'),
      paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
      paymentId: z.string()
    }),
    z.object({
      status: z.literal('shipped'),
      paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
      paymentId: z.string(),
      trackingNumber: z.string(),
      shippingDate: z.date()
    }),
    z.object({
      status: z.literal('delivered'),
      paymentMethod: z.enum(['credit_card', 'paypal', 'bank_transfer']),
      paymentId: z.string(),
      trackingNumber: z.string(),
      shippingDate: z.date(),
      deliveryDate: z.date(),
      deliveryConfirmation: z.string()
    }),
    z.object({
      status: z.literal('cancelled'),
      cancellationReason: z.string(),
      cancelledAt: z.date()
    })
  ])
)
```

### Schémas Dynamiques

```typescript
// schemas/dynamic-schemas.ts
import { z } from 'zod'

// Schéma dynamique basé sur la configuration
const createDynamicFormSchema = (fields: Array<{
  name: string
  type: 'string' | 'number' | 'boolean' | 'date' | 'email'
  required: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}>) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {}
  
  fields.forEach(field => {
    let fieldSchema: z.ZodTypeAny
    
    switch (field.type) {
      case 'string':
        fieldSchema = z.string()
        if (field.minLength) fieldSchema = fieldSchema.min(field.minLength)
        if (field.maxLength) fieldSchema = fieldSchema.max(field.maxLength)
        break
      case 'number':
        fieldSchema = z.number()
        if (field.min !== undefined) fieldSchema = fieldSchema.min(field.min)
        if (field.max !== undefined) fieldSchema = fieldSchema.max(field.max)
        break
      case 'boolean':
        fieldSchema = z.boolean()
        break
      case 'date':
        fieldSchema = z.date()
        break
      case 'email':
        fieldSchema = z.string().email()
        break
      default:
        fieldSchema = z.any()
    }
    
    if (!field.required) {
      fieldSchema = fieldSchema.optional()
    }
    
    schemaFields[field.name] = fieldSchema
  })
  
  return z.object(schemaFields)
}

// Schéma dynamique pour les API
const createApiSchema = <T extends Record<string, any>>(
  endpoints: Record<keyof T, {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    request?: z.ZodSchema<any>
    response: z.ZodSchema<any>
  }>
) => {
  return z.object({
    endpoint: z.enum(Object.keys(endpoints) as [keyof T, ...(keyof T)[]]),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
    request: z.any().optional(),
    response: z.any()
  }).refine(
    (data) => {
      const endpointConfig = endpoints[data.endpoint]
      return endpointConfig.method === data.method
    },
    {
      message: 'Méthode HTTP incompatible avec l\'endpoint',
      path: ['method']
    }
  )
}
```

## 5. Intégration avec Vue 3

### Composable de Validation

```typescript
// composables/useZodValidation.ts
import { z } from 'zod'
import { ref, computed, watch } from 'vue'

export const useZodValidation = <T>(schema: z.ZodSchema<T>) => {
  const data = ref<Partial<T>>({})
  const errors = ref<Record<string, string[]>>({})
  const isValid = ref(false)
  const isDirty = ref(false)
  
  // Validation en temps réel
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
    validate,
    validateField,
    reset
  }
}
```

### Composant de Formulaire avec Validation

```vue
<!-- components/ZodForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="zod-form">
    <div v-for="field in fields" :key="field.name" class="form-field">
      <label :for="field.name" class="form-label">
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </label>
      
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
      
      <textarea
        v-else-if="field.type === 'textarea'"
        :id="field.name"
        v-model="data[field.name]"
        :placeholder="field.placeholder"
        class="form-textarea"
        :class="{ 'error': errors[field.name] }"
        @blur="validateField(field.name)"
      />
      
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
      
      <div v-if="errors[field.name]" class="error-messages">
        <div v-for="error in errors[field.name]" :key="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
    
    <div class="form-actions">
      <button type="button" @click="reset" class="btn btn-secondary">
        Réinitialiser
      </button>
      <button type="submit" :disabled="!isValid" class="btn btn-primary">
        Soumettre
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useZodValidation } from '~/composables/useZodValidation'

interface Props {
  schema: z.ZodSchema<any>
  fields: Array<{
    name: string
    label: string
    type: 'text' | 'email' | 'number' | 'textarea' | 'select'
    required?: boolean
    placeholder?: string
    options?: Array<{ value: string; label: string }>
  }>
  onSubmit: (data: any) => void | Promise<void>
}

const props = defineProps<Props>()

const { data, errors, isValid, validate, validateField, reset } = useZodValidation(props.schema)

const handleSubmit = async () => {
  if (isValid.value) {
    await props.onSubmit(data.value)
  }
}
</script>
```

## 6. Performance et Optimisation

### Validation Lazy et Memoization

```typescript
// performance/lazy-validation.ts
import { z } from 'zod'

// Cache pour les schémas compilés
const schemaCache = new Map<string, z.ZodSchema<any>>()

// Fonction de validation lazy
const lazyValidate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const schemaKey = schema.toString()
  
  if (!schemaCache.has(schemaKey)) {
    schemaCache.set(schemaKey, schema)
  }
  
  const cachedSchema = schemaCache.get(schemaKey)!
  return cachedSchema.parse(data)
}

// Validation avec debounce
const debouncedValidate = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  delay: number = 300
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = schema.parse(data)
        resolve(result)
      } catch (error) {
        reject(error)
      }
    }, delay)
  })
}

// Validation en lot
const batchValidate = <T>(
  schema: z.ZodSchema<T>,
  dataArray: unknown[]
): { valid: T[]; invalid: Array<{ data: unknown; error: z.ZodError }> } => {
  const valid: T[] = []
  const invalid: Array<{ data: unknown; error: z.ZodError }> = []
  
  dataArray.forEach(data => {
    try {
      const result = schema.parse(data)
      valid.push(result)
    } catch (error) {
      if (error instanceof z.ZodError) {
        invalid.push({ data, error })
      } else {
        throw error
      }
    }
  })
  
  return { valid, invalid }
}
```

### Optimisation des Schémas

```typescript
// performance/schema-optimization.ts
import { z } from 'zod'

// Schéma optimisé pour les grandes structures
const optimizedUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().min(0).max(150),
  address: z.object({
    street: z.string().min(1).max(200),
    city: z.string().min(1).max(100),
    postalCode: z.string().regex(/^[0-9]{5}$/),
    country: z.string().min(1).max(100)
  }).optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
    language: z.enum(['fr', 'en', 'es'])
  }).optional()
})

// Schéma partiel pour les mises à jour
const updateUserSchema = optimizedUserSchema.partial()

// Schéma avec validation conditionnelle optimisée
const conditionalSchema = z.object({
  type: z.enum(['admin', 'user', 'guest']),
  data: z.any()
}).transform((data) => {
  // Validation conditionnelle optimisée
  switch (data.type) {
    case 'admin':
      return {
        ...data,
        data: z.object({
          permissions: z.array(z.string()),
          level: z.number().min(1).max(5)
        }).parse(data.data)
      }
    case 'user':
      return {
        ...data,
        data: z.object({
          preferences: z.object({
            theme: z.enum(['light', 'dark']),
            notifications: z.boolean()
          })
        }).parse(data.data)
      }
    case 'guest':
      return {
        ...data,
        data: z.object({
          sessionId: z.string(),
          expiresAt: z.date()
        }).parse(data.data)
      }
    default:
      throw new Error('Type invalide')
  }
})
```

## Bonnes Pratiques Expertes

1. **Validation Stricte** : Utiliser des schémas stricts pour éviter les erreurs
2. **Transformations** : Utiliser les transformations pour normaliser les données
3. **Gestion d'Erreurs** : Implémenter une gestion d'erreurs robuste
4. **Performance** : Optimiser les schémas pour les grandes structures
5. **Réutilisabilité** : Créer des schémas réutilisables et modulaires
6. **Tests** : Tester les schémas et les validations
7. **Documentation** : Documenter les schémas complexes
8. **Sécurité** : Valider toutes les données d'entrée

---

<div align="center">

[![Retour au Profil](https://img.shields.io/badge/🏠_Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../../README.md)

</div>
