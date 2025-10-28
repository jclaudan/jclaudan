#!/usr/bin/env node

/**
 * Script de test simple pour identifier le problème
 */

console.log('🔍 Test de démarrage...')

// Test 1: Import des modules
console.log('📦 Test des imports...')
let fileURLToPath, join, dirname, basename, extname, fs, puppeteer

try {
  const fsModule = await import('fs')
  fs = fsModule
  console.log('✅ fs importé')
  
  const pathModule = await import('path')
  join = pathModule.join
  dirname = pathModule.dirname
  basename = pathModule.basename
  extname = pathModule.extname
  console.log('✅ path importé')
  
  const urlModule = await import('url')
  fileURLToPath = urlModule.fileURLToPath
  console.log('✅ url importé')
  
  // Test de fileURLToPath
  const testUrl = fileURLToPath(import.meta.url)
  console.log('✅ fileURLToPath fonctionne')
  
  const puppeteerModule = await import('puppeteer')
  puppeteer = puppeteerModule
  console.log('✅ puppeteer importé')
  
} catch (error) {
  console.error('❌ Erreur d\'import:', error.message)
  process.exit(1)
}

// Test 2: Configuration
console.log('\n⚙️ Test de configuration...')
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CONFIG = {
  docsPath: join(__dirname, '../docs'),
  outputPath: join(__dirname, '../assets/mermaid'),
  mermaidCDN: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
}

console.log('📁 Chemins configurés:')
console.log(`   Docs: ${CONFIG.docsPath}`)
console.log(`   Output: ${CONFIG.outputPath}`)

// Test 3: Vérification des fichiers
console.log('\n📄 Test de scan des fichiers...')
try {
  const fs = await import('fs')
  const files = []
  
  const scanDir = (currentDir) => {
    const items = fs.readdirSync(currentDir)
    
    for (const item of items) {
      const fullPath = join(currentDir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        scanDir(fullPath)
      } else if (extname(item) === '.md') {
        files.push(fullPath)
      }
    }
  }
  
  scanDir(CONFIG.docsPath)
  console.log(`✅ ${files.length} fichier(s) Markdown trouvé(s)`)
  
  if (files.length > 0) {
    console.log('📋 Premiers fichiers:')
    files.slice(0, 5).forEach((file, index) => {
      console.log(`   ${index + 1}. ${file}`)
    })
  }
  
} catch (error) {
  console.error('❌ Erreur de scan:', error.message)
}

// Test 4: Extraction Mermaid
console.log('\n🎨 Test d\'extraction Mermaid...')
try {
  const testContent = `# Test
\`\`\`mermaid
graph TD
    A[Test] --> B[OK]
\`\`\`
`
  
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/g
  const blocks = []
  let match

  while ((match = mermaidRegex.exec(testContent)) !== null) {
    blocks.push({
      code: match[1].trim(),
      fullMatch: match[0],
      index: match.index
    })
  }
  
  console.log(`✅ ${blocks.length} bloc(s) Mermaid extrait(s)`)
  
} catch (error) {
  console.error('❌ Erreur d\'extraction:', error.message)
}

console.log('\n🎉 Tests terminés!')
console.log('📋 Si tous les tests passent, le problème vient de la logique principale')
