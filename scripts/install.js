#!/usr/bin/env node

/**
 * Script d'installation rapide pour le générateur Mermaid
 */

import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🎨 Installation du Générateur d\'Images Mermaid')
console.log('=============================================')

// Vérifier Node.js
try {
  const nodeVersion = process.version
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0])
  
  if (majorVersion < 18) {
    console.error('❌ Node.js 18+ requis. Version actuelle:', nodeVersion)
    process.exit(1)
  }
  
  console.log(`✅ Node.js ${nodeVersion} détecté`)
} catch (error) {
  console.error('❌ Erreur lors de la vérification de Node.js:', error.message)
  process.exit(1)
}

// Créer les dossiers nécessaires
const folders = [
  join(__dirname, '../assets'),
  join(__dirname, '../assets/mermaid')
]

folders.forEach(folder => {
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true })
    console.log(`📁 Dossier créé: ${folder}`)
  } else {
    console.log(`📁 Dossier existe: ${folder}`)
  }
})

// Installer les dépendances
console.log('\n📦 Installation des dépendances...')
try {
  execSync('npm install', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  })
  console.log('✅ Dépendances installées')
} catch (error) {
  console.error('❌ Erreur lors de l\'installation:', error.message)
  process.exit(1)
}

// Test de Puppeteer
console.log('\n🧪 Test de Puppeteer...')
try {
  execSync('node -e "import(\'puppeteer\').then(p => console.log(\'✅ Puppeteer OK\')).catch(e => console.error(\'❌ Puppeteer KO:\', e.message))"', {
    cwd: __dirname,
    stdio: 'inherit'
  })
} catch (error) {
  console.log('⚠️  Puppeteer pourrait nécessiter des dépendances système supplémentaires')
}

// Configuration initiale
console.log('\n⚙️  Configuration initiale...')
try {
  execSync('node config.js show', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  })
} catch (error) {
  console.log('⚠️  Configuration par défaut utilisée')
}

console.log('\n🎉 Installation terminée!')
console.log('\n📋 Prochaines étapes:')
console.log('1. cd scripts')
console.log('2. npm run generate')
console.log('3. Vérifiez les images dans assets/mermaid/')
console.log('\n📚 Documentation: scripts/README.md')
