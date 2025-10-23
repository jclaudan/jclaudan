# Patterns Asynchrones Node.js

## 1. Callback Patterns

### Description
Gestion de l'asynchrone avec des callbacks.

### Exemple - Error-First Callbacks
```javascript
const fs = require('fs')

function readFileCallback(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      callback(err, null)
      return
    }
    callback(null, data)
  })
}

// Utilisation
readFileCallback('file.txt', (err, data) => {
  if (err) {
    console.error('Error:', err.message)
    return
  }
  console.log('Data:', data)
})
```

### Exemple - Callback Hell (à éviter)
```javascript
// ❌ Callback hell - difficile à lire et maintenir
function processUserData(userId, callback) {
  getUser(userId, (err, user) => {
    if (err) return callback(err)
    
    getProfile(user.profileId, (err, profile) => {
      if (err) return callback(err)
      
      getSettings(profile.settingsId, (err, settings) => {
        if (err) return callback(err)
        
        getPreferences(settings.preferencesId, (err, preferences) => {
          if (err) return callback(err)
          
          callback(null, { user, profile, settings, preferences })
        })
      })
    })
  })
}
```

### Exemple - Callback Hell Solution
```javascript
// ✅ Solution avec des fonctions nommées
function processUserData(userId, callback) {
  getUser(userId, handleUser)
}

function handleUser(err, user) {
  if (err) return callback(err)
  getProfile(user.profileId, handleProfile)
}

function handleProfile(err, profile) {
  if (err) return callback(err)
  getSettings(profile.settingsId, handleSettings)
}

function handleSettings(err, settings) {
  if (err) return callback(err)
  getPreferences(settings.preferencesId, handlePreferences)
}

function handlePreferences(err, preferences) {
  if (err) return callback(err)
  callback(null, { user, profile, settings, preferences })
}
```

## 2. Promise Patterns

### Description
Gestion de l'asynchrone avec des promesses.

### Exemple - Promise Chaining
```javascript
function getUser(userId) {
  return new Promise((resolve, reject) => {
    // Simulation d'une requête
    setTimeout(() => {
      resolve({ id: userId, name: 'John Doe' })
    }, 100)
  })
}

function getProfile(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ userId, bio: 'Software Developer' })
    }, 100)
  })
}

function getSettings(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ userId, theme: 'dark' })
    }, 100)
  })
}

// Utilisation avec chaînage
getUser(1)
  .then(user => {
    console.log('User:', user)
    return getProfile(user.id)
  })
  .then(profile => {
    console.log('Profile:', profile)
    return getSettings(profile.userId)
  })
  .then(settings => {
    console.log('Settings:', settings)
  })
  .catch(error => {
    console.error('Error:', error)
  })
```

### Exemple - Promise.all
```javascript
// Exécution en parallèle
Promise.all([
  getUser(1),
  getProfile(1),
  getSettings(1)
])
  .then(([user, profile, settings]) => {
    console.log('All data:', { user, profile, settings })
  })
  .catch(error => {
    console.error('Error:', error)
  })
```

### Exemple - Promise.race
```javascript
function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms)
  })
}

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Data fetched'), 2000)
  })
}

// Utilisation avec race
Promise.race([
  fetchData(),
  timeoutPromise(3000)
])
  .then(data => {
    console.log('Data:', data)
  })
  .catch(error => {
    console.error('Error:', error.message)
  })
```

### Exemple - Promise.allSettled
```javascript
// Toutes les promesses terminées, même en cas d'erreur
Promise.allSettled([
  getUser(1),
  getProfile(999), // Erreur
  getSettings(1)
])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index}:`, result.value)
      } else {
        console.log(`Promise ${index} failed:`, result.reason)
      }
    })
  })
```

## 3. Async/Await Patterns

### Description
Syntaxe moderne pour l'asynchrone avec async/await.

### Exemple - Basic Async/Await
```javascript
async function processUserData(userId) {
  try {
    const user = await getUser(userId)
    console.log('User:', user)
    
    const profile = await getProfile(user.id)
    console.log('Profile:', profile)
    
    const settings = await getSettings(profile.userId)
    console.log('Settings:', settings)
    
    return { user, profile, settings }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Utilisation
processUserData(1)
  .then(data => console.log('Complete data:', data))
  .catch(error => console.error('Failed:', error))
```

### Exemple - Parallel Execution
```javascript
async function processUserDataParallel(userId) {
  try {
    // Exécution en parallèle
    const [user, profile, settings] = await Promise.all([
      getUser(userId),
      getProfile(userId),
      getSettings(userId)
    ])
    
    return { user, profile, settings }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
```

### Exemple - Error Handling
```javascript
async function robustAsyncFunction() {
  try {
    const data = await fetchData()
    return data
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      console.log('Network error, retrying...')
      // Retry logic
      return await fetchData()
    } else if (error.code === 'TIMEOUT') {
      console.log('Timeout error, using fallback...')
      return getFallbackData()
    } else {
      throw error
    }
  }
}
```

## 4. Advanced Async Patterns

### Exemple - Async Generator
```javascript
async function* asyncGenerator() {
  yield await getUser(1)
  yield await getProfile(1)
  yield await getSettings(1)
}

// Utilisation
async function processAsyncGenerator() {
  for await (const data of asyncGenerator()) {
    console.log('Data:', data)
  }
}
```

### Exemple - Async Queue
```javascript
class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  async add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject })
      this.process()
    })
  }

  async process() {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return
    }

    this.running++
    const { task, resolve, reject } = this.queue.shift()

    try {
      const result = await task()
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      this.running--
      this.process()
    }
  }
}

// Utilisation
const queue = new AsyncQueue(2)

queue.add(() => getUser(1))
queue.add(() => getUser(2))
queue.add(() => getUser(3))
```

### Exemple - Retry Pattern
```javascript
async function retry(fn, maxAttempts = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error
      }
      
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
      delay *= 2 // Exponential backoff
    }
  }
}

// Utilisation
const result = await retry(() => fetchData())
```

## Bonnes Pratiques

1. **Use async/await** : Préférer async/await aux callbacks
2. **Handle errors properly** : Gérer les erreurs correctement
3. **Use Promise.all for parallel execution** : Utiliser Promise.all pour l'exécution en parallèle
4. **Avoid callback hell** : Éviter l'enfer des callbacks
5. **Use proper error handling** : Utiliser une gestion d'erreur appropriée

## Pièges à Éviter

1. **Callback hell** : Éviter l'enfer des callbacks
2. **Unhandled promise rejections** : Gérer les rejets de promesses
3. **Mixing callbacks and promises** : Éviter de mélanger callbacks et promesses
4. **Blocking the event loop** : Ne pas bloquer la boucle d'événements
5. **Memory leaks** : Éviter les fuites mémoire
