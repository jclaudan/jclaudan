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

#### Merge vs Rebase : Comparaison détaillée

| Aspect | Merge | Rebase |
|--------|-------|--------|
| **Historique** | Préserve l'historique complet | Réécrit l'historique linéaire |
| **Commits** | Crée un commit de merge | Rejoue les commits |
| **Conflits** | Un seul conflit au point de merge | Conflits potentiels par commit |
| **Traçabilité** | Facile de voir les branches | Historique linéaire mais perte de contexte |
| **Sécurité** | Plus sûr sur branches partagées | Risqué sur branches partagées |

#### Quand utiliser Merge

```bash
# Merge simple
git checkout main
git merge feature-branch

# Merge avec stratégie
git merge -X ours feature-branch    # En cas de conflit, garder nos changements
git merge -X theirs feature-branch  # En cas de conflit, garder leurs changements

# Merge sans commit automatique
git merge --no-commit feature-branch
```

**Avantages :**
- Préserve l'historique des branches
- Sécurisé pour les branches partagées
- Facilite le rollback
- Traçabilité des features

**Inconvénients :**
- Historique complexe avec de nombreux merges
- Commits de merge "polluent" l'historique

#### Quand utiliser Rebase

```bash
# Rebase simple
git checkout feature-branch
git rebase main

# Rebase interactif
git rebase -i HEAD~3

# Rebase avec stratégie
git rebase -X ours main
git rebase -X theirs main

# Rebase avec préservation des merges
git rebase --preserve-merges main
```

**Avantages :**
- Historique linéaire et propre
- Pas de commits de merge
- Plus facile à lire l'historique
- Simulation d'un développement séquentiel

**Inconvénients :**
- Réécrit l'historique (risqué)
- Perte du contexte des branches
- Conflits potentiels multiples
- Complexe pour les débutants

#### Rebase interactif avancé

```bash
# Éditer les 3 derniers commits
git rebase -i HEAD~3

# Options disponibles :
# pick    : Appliquer le commit
# reword  : Modifier le message du commit
# edit    : Modifier le commit
# squash  : Fusionner avec le commit précédent
# fixup   : Fusionner sans garder le message
# drop    : Supprimer le commit
```

#### Gestion des conflits

```bash
# Merge conflict
git status
# Éditer les fichiers en conflit
git add fichier-resolu
git commit

# Rebase conflict
git status
# Éditer les fichiers en conflit
git add fichier-resolu
git rebase --continue

# Annuler un rebase
git rebase --abort
```

#### Bonnes pratiques

**Utiliser Merge quand :**
- Travailler sur une branche partagée
- Intégrer une feature complète
- Vouloir préserver l'historique des branches
- Collaborer avec d'autres développeurs

**Utiliser Rebase quand :**
- Nettoyer l'historique avant merge
- Travailler sur une branche locale
- Maintenir un historique linéaire
- Préparer une PR propre

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

## Résolution des conflits

### Types de conflits

1. **Conflits de contenu** : Même ligne modifiée différemment
2. **Conflits d'ajout** : Fichier ajouté dans les deux branches
3. **Conflits de suppression** : Fichier supprimé dans une branche, modifié dans l'autre

### Processus de résolution

```bash
# 1. Détecter les conflits
git status

# 2. Identifier les fichiers en conflit
git diff --name-only --diff-filter=U

# 3. Éditer les fichiers
# Résoudre manuellement les marqueurs de conflit :
# <<<<<<< HEAD
# Contenu de votre branche
# =======
# Contenu de l'autre branche
# >>>>>>> branch-name

# 4. Marquer comme résolu
git add fichier-resolu

# 5. Finaliser la résolution
git commit  # Pour un merge
git rebase --continue  # Pour un rebase
```

### Outils de résolution

```bash
# Ouvrir l'éditeur configuré
git mergetool

# Configurer un outil externe
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Outils populaires
git config --global merge.tool vimdiff
git config --global merge.tool meld
git config --global merge.tool kdiff3
```

### Stratégies de résolution automatique

```bash
# Garder notre version
git checkout --ours fichier-conflit

# Garder leur version
git checkout --theirs fichier-conflit

# Merge avec stratégie
git merge -X ours branche-conflit
git merge -X theirs branche-conflit
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

**Avantages :**
- Structure claire et définie
- Bon pour les équipes importantes
- Séparation claire des environnements

**Inconvénients :**
- Complexité pour les petits projets
- Beaucoup de branches à maintenir
- Processus lourd pour les releases

### GitHub Flow (Trunk-based)

```bash
# Branche principale
main

# Branches de fonctionnalités
feature/nom-fonctionnalite
```

**Processus :**
1. Créer une branche depuis `main`
2. Développer et commiter
3. Créer une Pull Request
4. Review et merge dans `main`
5. Déployer immédiatement

**Avantages :**
- Simple et rapide
- Déploiements fréquents
- Bon pour les équipes agiles

**Inconvénients :**
- Pas de branche de staging
- Déploiement direct en production
- Risqué pour les projets critiques

### GitLab Flow

```bash
# Branches principales
main        # Production
staging     # Tests
pre-production  # Pré-production
```

**Variantes :**
- **Flow avec environnement** : Branches par environnement
- **Flow avec release** : Branches de release
- **Flow avec upstream** : Intégration avec projets upstream

### Trunk-based Development

```bash
# Branche unique principale
main

# Branches courtes et éphémères
feature/feature-name
bugfix/bug-description
```

**Caractéristiques :**
- Branches de courte durée (1-2 jours)
- Merge fréquent dans `main`
- Déploiement continu
- Feature flags pour les fonctionnalités

**Avantages :**
- Intégration continue
- Moins de conflits
- Déploiement rapide

**Inconvénients :**
- Nécessite une bonne discipline
- Tests automatisés obligatoires
- Feature flags complexes

### Comparaison des workflows

| Workflow | Taille équipe | Complexité | Fréquence déploiement | Branches |
|----------|---------------|------------|----------------------|----------|
| **Git Flow** | Grande | Élevée | Faible | Nombreuses |
| **GitHub Flow** | Petite/Moyenne | Faible | Élevée | Peu |
| **GitLab Flow** | Moyenne/Grande | Moyenne | Moyenne | Modérées |
| **Trunk-based** | Toute taille | Faible | Très élevée | Minimales |

### Choix du workflow

**Utiliser Git Flow quand :**
- Équipe importante (>10 développeurs)
- Projet avec releases planifiées
- Environnements multiples
- Besoin de traçabilité stricte

**Utiliser GitHub Flow quand :**
- Équipe petite/moyenne
- Déploiements fréquents
- Développement agile
- Projet web moderne

**Utiliser Trunk-based quand :**
- Équipe expérimentée
- Tests automatisés complets
- Déploiement continu
- Feature flags disponibles

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

# Appliquer une plage de commits
git cherry-pick commit1..commit3

# Appliquer sans commit automatique
git cherry-pick --no-commit commit-hash

# Appliquer avec signature
git cherry-pick -x commit-hash
```

#### Quand utiliser cherry-pick

- **Correction de bug** : Appliquer un fix d'une branche vers une autre
- **Feature backport** : Porter une fonctionnalité vers une version antérieure
- **Réorganisation** : Reconstruire l'historique de manière sélective

#### Gestion des conflits avec cherry-pick

```bash
# En cas de conflit
git status
# Résoudre manuellement les conflits
git add fichier-conflit
git cherry-pick --continue

# Annuler un cherry-pick
git cherry-pick --abort
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
