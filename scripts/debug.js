#!/usr/bin/env node

/**
 * Script de debug simple pour tester le générateur Mermaid
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🔍 Debug du Générateur Mermaid')
console.log('==============================')

// Configuration
const CONFIG = {
  docsPath: join(__dirname, '../docs'),
  outputPath: join(__dirname, '../assets/mermaid'),
  mermaidCDN: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
}

console.log('📁 Chemins:')
console.log(`   Docs: ${CONFIG.docsPath}`)
console.log(`   Output: ${CONFIG.outputPath}`)
console.log(`   Existe docs: ${existsSync(CONFIG.docsPath)}`)

// Créer le dossier de sortie
if (!existsSync(CONFIG.outputPath)) {
  mkdirSync(CONFIG.outputPath, { recursive: true })
  console.log(`✅ Dossier créé: ${CONFIG.outputPath}`)
} else {
  console.log(`✅ Dossier existe: ${CONFIG.outputPath}`)
}

// Test simple de Puppeteer
console.log('\n🧪 Test de Puppeteer...')
try {
  const puppeteer = await import('puppeteer')
  console.log('✅ Puppeteer importé avec succès')
  
  const browser = await puppeteer.default.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  console.log('✅ Browser lancé')
  
  const page = await browser.newPage()
  console.log('✅ Page créée')
  
  await page.setViewport({ width: 800, height: 600 })
  console.log('✅ Viewport défini')
  
  // Test avec un diagramme simple
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>body { margin: 0; padding: 20px; }</style>
      </head>
      <body>
        <div class="mermaid">graph TD; A[Test] --> B[OK]</div>
        <script src="${CONFIG.mermaidCDN}"></script>
        <script>
          mermaid.initialize({ startOnLoad: true });
        </script>
      </body>
    </html>
  `
  
  await page.setContent(html)
  console.log('✅ Contenu HTML défini')
  
  await page.waitForSelector('.mermaid svg', { timeout: 10000 })
  console.log('✅ Diagramme Mermaid rendu')
  
  const screenshotPath = join(CONFIG.outputPath, 'test-debug.png')
  await page.screenshot({ path: screenshotPath })
  console.log(`✅ Screenshot sauvé: ${screenshotPath}`)
  
  await browser.close()
  console.log('✅ Browser fermé')
  
  console.log('\n🎉 Test réussi! Puppeteer fonctionne correctement.')
  
} catch (error) {
  console.error('❌ Erreur lors du test Puppeteer:', error.message)
  console.error('Stack:', error.stack)
}

console.log('\n📋 Prochaines étapes:')
console.log('1. Si le test est réussi, le problème vient du script principal')
console.log('2. Vérifiez les logs détaillés avec: node generate-mermaid-images.js')
console.log('3. Testez avec un fichier spécifique')
