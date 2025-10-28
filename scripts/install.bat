@echo off
echo 🎨 Installation du Générateur Mermaid
echo =====================================

REM Vérifier Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé
    echo 📥 Téléchargez Node.js depuis https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js détecté

REM Installer les dépendances
echo 📦 Installation des dépendances...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'installation
    pause
    exit /b 1
)

echo ✅ Installation terminée
echo.
echo 📋 Utilisation:
echo   npm run generate     - Générer toutes les images
echo   npm run test         - Tester le générateur
echo   node config.js help  - Aide configuration
echo.
pause
