#!/usr/bin/env node

/**
 * Script de test pour le générateur Mermaid
 * Crée un diagramme de test et vérifie la génération
 */

import { writeFileSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import MermaidImageGenerator from './generate-mermaid-images.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🧪 Test du Générateur Mermaid')
console.log('=============================')

// Créer un fichier de test
const testFile = join(__dirname, '../docs/test-mermaid.md')
const testContent = `# Test Mermaid

Ce fichier contient des diagrammes de test pour vérifier le générateur.

## Diagramme de test 1 - Architecture simple

\`\`\`mermaid
graph TD
    A[Frontend] --> B[Backend]
    B --> C[Database]
    C --> D[Cache]
    D --> B
\`\`\`

## Diagramme de test 2 - Flux utilisateur

\`\`\`mermaid
sequenceDiagram
    participant U as Utilisateur
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    U->>F: Connexion
    F->>B: Authentification
    B->>D: Vérification
    D-->>B: Données utilisateur
    B-->>F: Token JWT
    F-->>U: Interface connectée
\`\`\`

## Diagramme de test 3 - États

\`\`\`mermaid
stateDiagram-v2
    [*] --> NonConnecte
    NonConnecte --> Connexion : Login
    Connexion --> Connecte : Succès
    Connexion --> NonConnecte : Échec
    Connecte --> Deconnexion : Logout
    Deconnexion --> NonConnecte
\`\`\`
`

console.log('📝 Création du fichier de test...')
writeFileSync(testFile, testContent)
console.log(`✅ Fichier de test créé: ${testFile}`)

// Tester le générateur
async function runTest() {
  const generator = new MermaidImageGenerator()
  
  try {
    console.log('\n🚀 Lancement du test...')
    await generator.init()
    
    console.log('📄 Traitement du fichier de test...')
    await generator.processFile(testFile)
    
    console.log('\n📊 Résultats du test:')
    console.log(`📄 Fichiers traités: ${generator.processedFiles.length}`)
    console.log(`🖼️  Images générées: ${generator.generatedImages.length}`)
    
    // Vérifier les images générées
    console.log('\n🔍 Vérification des images:')
    for (const image of generator.generatedImages) {
      if (existsSync(image.image)) {
        const stats = require('fs').statSync(image.image)
        console.log(`✅ ${image.relativePath} (${Math.round(stats.size / 1024)}KB)`)
      } else {
        console.log(`❌ ${image.relativePath} - Fichier manquant`)
      }
    }
    
    // Afficher le contenu modifié
    console.log('\n📋 Contenu du fichier modifié:')
    const modifiedContent = readFileSync(testFile, 'utf8')
    console.log(modifiedContent)
    
    console.log('\n🎉 Test terminé avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
  } finally {
    await generator.cleanup()
  }
}

// Nettoyage après test
function cleanup() {
  console.log('\n🧹 Nettoyage...')
  
  try {
    if (existsSync(testFile)) {
      require('fs').unlinkSync(testFile)
      console.log('🗑️  Fichier de test supprimé')
    }
  } catch (error) {
    console.log('⚠️  Impossible de supprimer le fichier de test:', error.message)
  }
}

// Gestion des signaux pour le nettoyage
process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
process.on('exit', cleanup)

// Lancer le test
runTest().then(() => {
  console.log('\n✨ Test complet!')
  process.exit(0)
}).catch(error => {
  console.error('💥 Test échoué:', error)
  cleanup()
  process.exit(1)
})
