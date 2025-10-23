# Git - Système de contrôle de version

## Installation

```bash
# Ubuntu/Debian
sudo apt install git

# macOS
brew install git

# Windows
# Télécharger depuis https://git-scm.com/
```

## Configuration initiale

```bash
# Configuration globale
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"

# Configuration locale (pour un projet spécifique)
git config user.name "Votre Nom"
git config user.email "votre.email@example.com"

# Vérifier la configuration
git config --list
```

## Concepts de base

### Repository
- **Repository local** : Dossier sur votre machine
- **Repository distant** : Repository sur un serveur (GitHub, GitLab, etc.)

### États des fichiers
- **Untracked** : Fichier non suivi par Git
- **Modified** : Fichier modifié mais non stagé
- **Staged** : Fichier prêt à être commité
- **Committed** : Fichier sauvegardé dans le repository

### Branches
- **Main/Master** : Branche principale
- **Feature branch** : Branche pour une fonctionnalité
- **Hotfix branch** : Branche pour corriger un bug critique

## Commandes essentielles

### Initialisation

```bash
# Initialiser un repository
git init

# Cloner un repository existant
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git mon-dossier
```

### Ajout et commit

```bash
# Ajouter un fichier
git add fichier.txt

# Ajouter tous les fichiers
git add .

# Ajouter tous les fichiers modifiés
git add -u

# Commit avec message
git commit -m "Ajout de la fonctionnalité X"

# Commit avec message détaillé
git commit -m "Ajout de la fonctionnalité X" -m "Description détaillée"
```

### Statut et historique

```bash
# Voir le statut
git status

# Voir l'historique
git log

# Voir l'historique compact
git log --oneline

# Voir l'historique avec graphique
git log --graph --oneline --all
```

### Branches

```bash
# Lister les branches
git branch

# Créer une nouvelle branche
git branch nouvelle-branche

# Changer de branche
git checkout nouvelle-branche

# Créer et changer de branche
git checkout -b nouvelle-branche

# Supprimer une branche
git branch -d nouvelle-branche

# Supprimer une branche distante
git push origin --delete nouvelle-branche
```

### Merge et rebase

```bash
# Merge une branche
git merge branche-a-merger

# Rebase une branche
git rebase branche-de-base

# Rebase interactif
git rebase -i HEAD~3
```

### Remote

```bash
# Ajouter un remote
git remote add origin https://github.com/user/repo.git

# Voir les remotes
git remote -v

# Push vers remote
git push origin main

# Pull depuis remote
git pull origin main

# Fetch depuis remote
git fetch origin
```

## Workflows courants

### Git Flow

```bash
# Branches principales
main        # Production
develop     # Développement

# Branches de support
feature/    # Nouvelles fonctionnalités
release/    # Préparation des releases
hotfix/     # Corrections urgentes
```

### GitHub Flow

```bash
# Branche principale
main

# Branches de fonctionnalités
feature/nom-fonctionnalite
```

### GitLab Flow

```bash
# Branches principales
main        # Production
staging     # Tests
pre-production  # Pré-production
```

## Commandes avancées

### Stash

```bash
# Sauvegarder temporairement les modifications
git stash

# Sauvegarder avec message
git stash save "Message de stash"

# Voir les stashes
git stash list

# Appliquer le dernier stash
git stash apply

# Appliquer et supprimer le stash
git stash pop

# Supprimer un stash
git stash drop stash@{0}
```

### Reset

```bash
# Reset soft (garde les modifications)
git reset --soft HEAD~1

# Reset mixed (garde les modifications non stagées)
git reset --mixed HEAD~1

# Reset hard (supprime tout)
git reset --hard HEAD~1
```

### Cherry-pick

```bash
# Appliquer un commit spécifique
git cherry-pick commit-hash

# Appliquer plusieurs commits
git cherry-pick commit1 commit2 commit3
```

### Reflog

```bash
# Voir l'historique des références
git reflog

# Récupérer un commit perdu
git checkout commit-hash
```

## Hooks Git

### Pre-commit

```bash
#!/bin/sh
# .git/hooks/pre-commit

# Linter
npm run lint

# Tests
npm test
```

### Commit-msg

```bash
#!/bin/sh
# .git/hooks/commit-msg

# Vérifier le format du message
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    exit 1
fi
```

## Configuration avancée

### .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Runtime data
pids/
*.pid
*.seed
```

### .gitattributes

```gitattributes
# Normalize line endings
* text=auto

# Binary files
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary

# Language detection
*.js linguist-language=JavaScript
*.ts linguist-language=TypeScript
```

### Configuration avancée

```bash
# Alias utiles
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Configuration des couleurs
git config --global color.ui auto

# Configuration des éditeurs
git config --global core.editor "code --wait"

# Configuration des merge tools
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

## Bonnes pratiques

1. **Messages de commit** : Utiliser des messages clairs et descriptifs
2. **Branches** : Utiliser des noms de branches explicites
3. **Commits fréquents** : Faire des commits petits et fréquents
4. **Tests** : S'assurer que les tests passent avant de commiter
5. **Review** : Faire des pull requests pour les changements importants
6. **Documentation** : Mettre à jour la documentation avec les changements

## Pièges à éviter

1. **Force push** : Éviter `git push --force` sur les branches partagées
2. **Commits trop gros** : Diviser les commits en changements logiques
3. **Branches non nommées** : Toujours nommer les branches
4. **Ignorer .gitignore** : Ne pas commiter les fichiers sensibles
5. **Merge conflicts** : Résoudre les conflits rapidement
