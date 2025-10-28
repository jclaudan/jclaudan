#!/usr/bin/env node

/**
 * Script de configuration pour le générateur d'images Mermaid
 * Permet de personnaliser les paramètres de génération
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CONFIG_FILE = join(__dirname, 'mermaid-config.json')

// Configuration par défaut
const DEFAULT_CONFIG = {
  imageFormat: 'png',
  imageScale: 2,
  theme: 'default',
  backgroundColor: 'white',
  width: 1200,
  height: 800,
  quality: 90,
  includeSource: false,
  customCSS: '',
  mermaidConfig: {
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35
    },
    gantt: {
      titleTopMargin: 25,
      barHeight: 20,
      fontFamily: '"Open-Sans", "sans-serif"',
      fontSize: 11,
      gridLineStartPadding: 35,
      bottomPadding: 25
    }
  }
}

class ConfigManager {
  constructor() {
    this.config = this.loadConfig()
  }

  loadConfig() {
    try {
      const configContent = readFileSync(CONFIG_FILE, 'utf8')
      return { ...DEFAULT_CONFIG, ...JSON.parse(configContent) }
    } catch (error) {
      console.log('📝 Création du fichier de configuration par défaut...')
      this.saveConfig(DEFAULT_CONFIG)
      return DEFAULT_CONFIG
    }
  }

  saveConfig(config) {
    writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2))
    console.log(`✅ Configuration sauvegardée dans ${CONFIG_FILE}`)
  }

  updateConfig(updates) {
    this.config = { ...this.config, ...updates }
    this.saveConfig(this.config)
  }

  showConfig() {
    console.log('⚙️  Configuration actuelle :')
    console.log('============================')
    console.log(JSON.stringify(this.config, null, 2))
  }

  resetConfig() {
    this.saveConfig(DEFAULT_CONFIG)
    console.log('🔄 Configuration réinitialisée aux valeurs par défaut')
  }

  // Méthodes utilitaires pour les thèmes
  setTheme(theme) {
    const themes = {
      default: 'default',
      dark: 'dark',
      forest: 'forest',
      neutral: 'neutral',
      base: 'base'
    }
    
    if (themes[theme]) {
      this.updateConfig({ theme: themes[theme] })
      console.log(`🎨 Thème défini sur : ${theme}`)
    } else {
      console.log(`❌ Thème invalide. Thèmes disponibles : ${Object.keys(themes).join(', ')}`)
    }
  }

  setFormat(format) {
    if (['png', 'svg'].includes(format)) {
      this.updateConfig({ imageFormat: format })
      console.log(`📸 Format d'image défini sur : ${format}`)
    } else {
      console.log('❌ Format invalide. Formats disponibles : png, svg')
    }
  }

  setScale(scale) {
    const numScale = parseFloat(scale)
    if (numScale > 0 && numScale <= 5) {
      this.updateConfig({ imageScale: numScale })
      console.log(`🔍 Échelle définie sur : ${numScale}x`)
    } else {
      console.log('❌ Échelle invalide. Valeur entre 0.1 et 5.0')
    }
  }
}

// Interface en ligne de commande
function showHelp() {
  console.log(`
🎨 Gestionnaire de configuration Mermaid

Usage: node config.js [commande] [options]

Commandes:
  show                    Affiche la configuration actuelle
  reset                   Réinitialise la configuration
  theme <nom>            Définit le thème (default, dark, forest, neutral, base)
  format <type>          Définit le format (png, svg)
  scale <nombre>         Définit l'échelle (0.1-5.0)
  help                   Affiche cette aide

Exemples:
  node config.js theme dark
  node config.js format svg
  node config.js scale 3
  node config.js show
`)
}

// Exécution
if (import.meta.url === `file://${process.argv[1]}`) {
  const configManager = new ConfigManager()
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    configManager.showConfig()
  } else {
    const command = args[0]
    
    switch (command) {
      case 'show':
        configManager.showConfig()
        break
        
      case 'reset':
        configManager.resetConfig()
        break
        
      case 'theme':
        if (args[1]) {
          configManager.setTheme(args[1])
        } else {
          console.log('❌ Veuillez spécifier un thème')
        }
        break
        
      case 'format':
        if (args[1]) {
          configManager.setFormat(args[1])
        } else {
          console.log('❌ Veuillez spécifier un format')
        }
        break
        
      case 'scale':
        if (args[1]) {
          configManager.setScale(args[1])
        } else {
          console.log('❌ Veuillez spécifier une échelle')
        }
        break
        
      case 'help':
        showHelp()
        break
        
      default:
        console.log(`❌ Commande inconnue : ${command}`)
        showHelp()
    }
  }
}

export default ConfigManager
