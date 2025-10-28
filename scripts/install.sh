#!/bin/bash

echo "🎨 Installation du Générateur Mermaid"
echo "====================================="

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "📥 Installez Node.js depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) détecté"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de l'installation"
    exit 1
fi

echo "✅ Installation terminée"
echo ""
echo "📋 Utilisation:"
echo "  npm run generate     - Générer toutes les images"
echo "  npm run test         - Tester le générateur"
echo "  node config.js help  - Aide configuration"
echo ""
