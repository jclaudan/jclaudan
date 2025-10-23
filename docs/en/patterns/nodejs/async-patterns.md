# Node.js Asynchronous Patterns

## 1. Callback Patterns

### Description
Asynchronous handling with callbacks.

### Example - Error-First Callbacks
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

// Usage
readFileCallback('file.txt', (err, data) => {
  if (err) {
    console.error('Error:', err.message)
    return
  }
  console.log('Data:', data)
})
```

### Example - Callback Hell (to avoid)
```javascript
// ❌ Callback hell - difficult to read and maintain
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

### Example - Callback Hell Solution
```javascript
// ✅ Solution with named functions
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
Asynchronous handling with promises.

### Example - Promise Chaining
```javascript
function getUser(userId) {
  return new Promise((resolve, reject) => {
    // Simulate a request
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

// Usage with chaining
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

### Example - Promise.all
```javascript
// Parallel execution
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

### Example - Promise.race
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

// Usage with race
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

### Example - Promise.allSettled
```javascript
// All promises completed, even with errors
Promise.allSettled([
  getUser(1),
  getProfile(999), // Error
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
Modern syntax for asynchronous operations with async/await.

### Example - Basic Async/Await
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

// Usage
processUserData(1)
  .then(data => console.log('Complete data:', data))
  .catch(error => console.error('Failed:', error))
```

### Example - Parallel Execution
```javascript
async function processUserDataParallel(userId) {
  try {
    // Parallel execution
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

### Example - Error Handling
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

### Example - Async Generator
```javascript
async function* asyncGenerator() {
  yield await getUser(1)
  yield await getProfile(1)
  yield await getSettings(1)
}

// Usage
async function processAsyncGenerator() {
  for await (const data of asyncGenerator()) {
    console.log('Data:', data)
  }
}
```

### Example - Async Queue
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

// Usage
const queue = new AsyncQueue(2)

queue.add(() => getUser(1))
queue.add(() => getUser(2))
queue.add(() => getUser(3))
```

### Example - Retry Pattern
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

// Usage
const result = await retry(() => fetchData())
```

## Best Practices

1. **Use async/await**: Prefer async/await over callbacks
2. **Handle errors properly**: Handle errors properly
3. **Use Promise.all for parallel execution**: Use Promise.all for parallel execution
4. **Avoid callback hell**: Avoid callback hell
5. **Use proper error handling**: Use proper error handling

## Pitfalls to Avoid

1. **Callback hell**: Avoid callback hell
2. **Unhandled promise rejections**: Handle promise rejections
3. **Mixing callbacks and promises**: Avoid mixing callbacks and promises
4. **Blocking the event loop**: Don't block the event loop
5. **Memory leaks**: Avoid memory leaks
