# Commandes Git Essentielles

## Commandes de base

### Initialisation et configuration

```bash
# Initialiser un repository
git init

# Cloner un repository
git clone <url>
git clone <url> <nom-dossier>

# Configuration
git config --global user.name "Nom"
git config --global user.email "email@example.com"
git config --list
```

### Statut et information

```bash
# Statut des fichiers
git status
git status -s          # Format court
git status --porcelain # Format machine

# Différences
git diff               # Modifications non stagées
git diff --staged      # Modifications stagées
git diff HEAD          # Toutes les modifications
git diff HEAD~1        # Diff avec le commit précédent

# Historique
git log                # Historique complet
git log --oneline      # Une ligne par commit
git log --graph        # Avec graphique
git log --all          # Toutes les branches
git log --since="2 weeks ago"
git log --until="2023-01-01"
git log --author="Nom"
git log --grep="mot-clé"
```

### Ajout et commit

```bash
# Ajouter des fichiers
git add <fichier>      # Fichier spécifique
git add .              # Tous les fichiers
git add -A             # Tous les fichiers (y compris supprimés)
git add -u             # Seulement les fichiers modifiés
git add -p             # Mode interactif

# Commit
git commit -m "Message"
git commit -m "Message" -m "Description détaillée"
git commit -a          # Ajouter et commiter en une fois
git commit --amend     # Modifier le dernier commit
git commit --amend -m "Nouveau message"
```

### Branches

```bash
# Lister les branches
git branch             # Branches locales
git branch -r          # Branches distantes
git branch -a          # Toutes les branches

# Créer des branches
git branch <nom>       # Créer une branche
git branch -d <nom>    # Supprimer une branche
git branch -D <nom>    # Forcer la suppression

# Changer de branche
git checkout <nom>     # Changer de branche
git checkout -b <nom>  # Créer et changer
git switch <nom>       # Nouvelle commande pour changer
git switch -c <nom>    # Créer et changer avec switch
```

### Merge et rebase

```bash
# Merge
git merge <branche>    # Fusionner une branche
git merge --no-ff <branche>  # Merge sans fast-forward
git merge --squash <branche> # Squash merge

# Rebase
git rebase <branche>   # Rebase sur une branche
git rebase -i HEAD~3   # Rebase interactif
git rebase --continue  # Continuer après résolution
git rebase --abort     # Annuler le rebase
```

### Remote

```bash
# Gestion des remotes
git remote             # Lister les remotes
git remote -v          # Avec URLs
git remote add <nom> <url>
git remote remove <nom>
git remote rename <ancien> <nouveau>

# Push et pull
git push <remote> <branche>
git push -u <remote> <branche>  # Set upstream
git push --all         # Toutes les branches
git push --tags        # Tous les tags

git pull <remote> <branche>
git pull --rebase      # Pull avec rebase
git fetch <remote>     # Récupérer sans merger
```

## Commandes avancées

### Stash

```bash
git stash              # Sauvegarder temporairement
git stash save "Message"
git stash list         # Lister les stashes
git stash show         # Voir le dernier stash
git stash show -p      # Voir les modifications
git stash apply        # Appliquer le dernier stash
git stash pop          # Appliquer et supprimer
git stash drop         # Supprimer le dernier stash
git stash clear        # Supprimer tous les stashes
```

### Reset

```bash
git reset --soft HEAD~1    # Annuler le commit, garder les modifications
git reset --mixed HEAD~1   # Annuler le commit et le staging
git reset --hard HEAD~1    # Annuler tout
git reset <commit>         # Reset vers un commit spécifique
```

### Cherry-pick

```bash
git cherry-pick <commit>   # Appliquer un commit
git cherry-pick <commit1> <commit2>  # Plusieurs commits
git cherry-pick -x <commit>  # Ajouter une référence
```

### Reflog

```bash
git reflog             # Historique des références
git reflog show <branche>
git checkout HEAD@{2}  # Aller à une référence
```

### Tags

```bash
git tag                # Lister les tags
git tag <nom>          # Créer un tag
git tag -a <nom> -m "Message"  # Tag annoté
git push <remote> <tag>  # Pousser un tag
git push <remote> --tags # Pousser tous les tags
git checkout <tag>     # Aller à un tag
```

## Commandes de maintenance

### Nettoyage

```bash
git clean -f           # Supprimer les fichiers non trackés
git clean -fd          # Fichiers et dossiers
git clean -n           # Mode dry-run

git gc                 # Nettoyage et optimisation
git prune              # Supprimer les objets non référencés
```

### Réparation

```bash
git fsck               # Vérifier l'intégrité
git fsck --full        # Vérification complète
git reflog expire --expire=now --all
git gc --prune=now
```

## Commandes de recherche

### Recherche dans l'historique

```bash
git log -S "mot-clé"   # Rechercher dans le contenu
git log -G "regex"     # Rechercher avec regex
git log --grep "pattern"  # Rechercher dans les messages
git log --author "nom"    # Rechercher par auteur
git log --since="date"    # Depuis une date
git log --until="date"    # Jusqu'à une date
```

### Recherche dans les fichiers

```bash
git grep "pattern"     # Rechercher dans les fichiers
git grep -n "pattern"  # Avec numéros de ligne
git grep -i "pattern"  # Insensible à la casse
git grep --name-only "pattern"  # Seulement les noms de fichiers
```

## Commandes de comparaison

### Diff

```bash
git diff               # Modifications non stagées
git diff --staged      # Modifications stagées
git diff HEAD          # Toutes les modifications
git diff HEAD~1        # Avec le commit précédent
git diff <commit1> <commit2>  # Entre deux commits
git diff <branche1> <branche2>  # Entre deux branches
```

### Show

```bash
git show <commit>      # Voir un commit
git show <commit> --name-only  # Seulement les fichiers
git show <commit> --stat       # Avec statistiques
```

## Commandes de collaboration

### Fetch et merge

```bash
git fetch <remote>     # Récupérer les changements
git fetch --all        # Tous les remotes
git fetch --prune      # Supprimer les branches distantes supprimées

git merge <remote>/<branche>  # Fusionner une branche distante
git merge --no-ff <remote>/<branche>  # Sans fast-forward
```

### Rebase

```bash
git rebase <remote>/<branche>  # Rebase sur une branche distante
git rebase -i <commit>         # Rebase interactif
git rebase --onto <newbase> <oldbase> <branch>  # Rebase complexe
```

## Commandes de debugging

### Blame

```bash
git blame <fichier>    # Qui a modifié chaque ligne
git blame -L 10,20 <fichier>  # Lignes spécifiques
git blame -w <fichier> # Ignorer les espaces
```

### Bisect

```bash
git bisect start       # Démarrer bisect
git bisect good <commit>  # Marquer comme bon
git bisect bad <commit>   # Marquer comme mauvais
git bisect reset       # Arrêter bisect
```

## Commandes de configuration

### Config

```bash
git config --global alias.<nom> '<commande>'  # Créer un alias
git config --global core.editor "code --wait"  # Éditeur
git config --global merge.tool vscode          # Outil de merge
git config --global color.ui auto             # Couleurs
```

### Alias utiles

```bash
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```



<div align="center">

[![Retour au Profil](https://img.shields.io/badge/ðŸ _Retour_au_Profil-000000?style=for-the-badge&logo=github&logoColor=white)](../../../../../../../../README.md)

</div>

