#!/usr/bin/env node

/**
 * Mermaid Image Generator Script for GitHub Profile
 * 
 * This script:
 * 1. Reads all Markdown files from documentation
 * 2. Extracts Mermaid code blocks
 * 3. Generates PNG/SVG images via Puppeteer
 * 4. Updates files with image links
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs'
import { join, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import puppeteer from 'puppeteer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuration
const CONFIG = {
  docsPath: join(__dirname, '../docs'),
  outputPath: join(__dirname, '../assets/mermaid'),
  mermaidCDN: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js',
  imageFormat: 'png', // 'png' or 'svg'
  imageScale: 2, // For high resolution images
  theme: 'default' // 'default', 'dark', 'forest', etc.
}

/**
 * Main class for Mermaid image generation
 */
class MermaidImageGenerator {
  constructor() {
    this.browser = null
    this.page = null
    this.processedFiles = []
    this.generatedImages = []
  }

  /**
   * Initialize Puppeteer
   */
  async init() {
    console.log('🚀 Initialisation de Puppeteer...')
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    this.page = await this.browser.newPage()
    
    // Page configuration
    await this.page.setViewport({ 
      width: 1200, 
      height: 800,
      deviceScaleFactor: CONFIG.imageScale 
    })
    
    console.log('✅ Puppeteer initialisé')
  }

  /**
   * Find all Markdown files in docs directory
   */
  findMarkdownFiles(dir = CONFIG.docsPath) {
    const files = []
    
    const scanDir = (currentDir) => {
      const items = readdirSync(currentDir)
      
      for (const item of items) {
        const fullPath = join(currentDir, item)
        const stat = statSync(fullPath)
        
        if (stat.isDirectory()) {
          scanDir(fullPath)
        } else if (extname(item) === '.md') {
          files.push(fullPath)
        }
      }
    }
    
    scanDir(dir)
    return files
  }

  /**
   * Extract Mermaid blocks from Markdown file content
   */
  extractMermaidBlocks(content) {
    // Updated regex to handle different formats
    const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n\s*```/g
    const blocks = []
    let match

    while ((match = mermaidRegex.exec(content)) !== null) {
      blocks.push({
        code: match[1].trim(),
        fullMatch: match[0],
        index: match.index
      })
    }

    return blocks
  }

  /**
   * Generate image from Mermaid diagram code
   */
  async generateImage(mermaidCode, filename) {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              font-family: Arial, sans-serif;
              background: white;
            }
            .mermaid { 
              text-align: center; 
            }
          </style>
        </head>
        <body>
          <div class="mermaid">${mermaidCode}</div>
          <script src="${CONFIG.mermaidCDN}"></script>
          <script>
            mermaid.initialize({
              startOnLoad: true,
              theme: '${CONFIG.theme}',
              flowchart: {
                useMaxWidth: true,
                htmlLabels: true
              }
            });
          </script>
        </body>
      </html>
    `

    await this.page.setContent(html)
    await this.page.waitForSelector('.mermaid svg', { timeout: 10000 })

    const outputPath = join(CONFIG.outputPath, `${filename}.${CONFIG.imageFormat}`)
    
    if (CONFIG.imageFormat === 'png') {
      await this.page.screenshot({
        path: outputPath,
        fullPage: true,
        omitBackground: false
      })
    } else {
      const svgContent = await this.page.$eval('.mermaid svg', el => el.outerHTML)
      writeFileSync(outputPath, svgContent)
    }

    return outputPath
  }

  /**
   * Generate unique filename for image
   */
  generateImageFilename(filePath, blockIndex) {
    const relativePath = filePath.replace(CONFIG.docsPath, '').replace(/\\/g, '-')
    const baseName = basename(filePath, '.md')
    return `${baseName}-${blockIndex}${relativePath.replace(/\.md$/, '')}`
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
  }

  /**
   * Process a Markdown file
   */
  async processFile(filePath) {
    console.log(`📄 Traitement de ${filePath}...`)
    
    const content = readFileSync(filePath, 'utf8')
    const mermaidBlocks = this.extractMermaidBlocks(content)
    
    if (mermaidBlocks.length === 0) {
      console.log(`   ⏭️  Aucun diagramme Mermaid trouvé`)
      return
    }

    console.log(`   🎨 ${mermaidBlocks.length} diagramme(s) trouvé(s)`)

    let updatedContent = content
    let offset = 0

    for (let i = 0; i < mermaidBlocks.length; i++) {
      const block = mermaidBlocks[i]
      const filename = this.generateImageFilename(filePath, i)
      
      try {
        console.log(`   🖼️  Génération de l'image ${filename}...`)
        const imagePath = await this.generateImage(block.code, filename)
        
        // Generate relative path to image
        const relativeImagePath = join('assets', 'mermaid', `${filename}.${CONFIG.imageFormat}`)
          .replace(/\\/g, '/')
        
        // Replace Mermaid block with image
        const imageMarkdown = `![Diagramme Mermaid](${relativeImagePath})`
        
        const startIndex = block.index + offset
        const endIndex = startIndex + block.fullMatch.length
        
        updatedContent = updatedContent.substring(0, startIndex) + 
                        imageMarkdown + 
                        updatedContent.substring(endIndex)
        
        offset += imageMarkdown.length - block.fullMatch.length
        
        this.generatedImages.push({
          file: filePath,
          image: imagePath,
          relativePath: relativeImagePath
        })
        
        console.log(`   ✅ Image générée : ${relativeImagePath}`)
        
      } catch (error) {
        console.error(`   ❌ Erreur lors de la génération de ${filename}:`, error.message)
      }
    }

    // Save modified file
    writeFileSync(filePath, updatedContent)
    this.processedFiles.push(filePath)
    
    console.log(`✅ Fichier traité : ${filePath}`)
  }

  /**
   * Create output directory if it doesn't exist
   */
  ensureOutputDir() {
    if (!existsSync(CONFIG.outputPath)) {
      mkdirSync(CONFIG.outputPath, { recursive: true })
      console.log(`📁 Dossier créé : ${CONFIG.outputPath}`)
    }
  }

  /**
   * Generate generation report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      config: CONFIG,
      processedFiles: this.processedFiles.length,
      generatedImages: this.generatedImages.length,
      details: this.generatedImages
    }

    const reportPath = join(CONFIG.outputPath, 'generation-report.json')
    writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    console.log('\n📊 RAPPORT DE GÉNÉRATION')
    console.log('========================')
    console.log(`📄 Fichiers traités : ${this.processedFiles.length}`)
    console.log(`🖼️  Images générées : ${this.generatedImages.length}`)
    console.log(`📁 Dossier de sortie : ${CONFIG.outputPath}`)
    console.log(`📋 Rapport détaillé : ${reportPath}`)
  }

  /**
   * Clean up resources
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close()
      console.log('🧹 Ressources nettoyées')
    }
  }

  /**
   * Main method
   */
  async run() {
    try {
      console.log('🎨 Générateur d\'images Mermaid pour GitHub Profile')
      console.log('==================================================')
      
      console.log('📁 Création du dossier de sortie...')
      this.ensureOutputDir()
      
      console.log('🚀 Initialisation de Puppeteer...')
      await this.init()
      
      console.log('🔍 Recherche des fichiers Markdown...')
      const markdownFiles = this.findMarkdownFiles()
      console.log(`📚 ${markdownFiles.length} fichier(s) Markdown trouvé(s)`)
      
      if (markdownFiles.length === 0) {
        console.log('⚠️  Aucun fichier Markdown trouvé dans docs/')
        return
      }
      
      console.log('📄 Liste des fichiers trouvés:')
      markdownFiles.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`)
      })
      
      console.log('\n🔄 Traitement des fichiers...')
      for (const file of markdownFiles) {
        await this.processFile(file)
      }
      
      console.log('\n📊 Génération du rapport...')
      this.generateReport()
      
    } catch (error) {
      console.error('❌ Erreur fatale:', error)
      console.error('Stack:', error.stack)
      process.exit(1)
    } finally {
      await this.cleanup()
    }
  }
}

// Script execution
// On Windows, convert backslashes to forward slashes
const scriptPath = process.argv[1].replace(/\\/g, '/')
const scriptUrl = `file:///${scriptPath}`

if (import.meta.url === scriptUrl || import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'))) {
  const generator = new MermaidImageGenerator()
  generator.run()
}

export default MermaidImageGenerator
