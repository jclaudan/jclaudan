# Essential Git Commands

## Basic Commands

### Initialization and Configuration

```bash
# Initialize a repository
git init

# Clone a repository
git clone <url>
git clone <url> <folder-name>

# Configuration
git config --global user.name "Name"
git config --global user.email "email@example.com"
git config --list
```

### Status and Information

```bash
# File status
git status
git status -s          # Short format
git status --porcelain # Machine format

# Differences
git diff               # Unstaged modifications
git diff --staged      # Staged modifications
git diff HEAD          # All modifications
git diff HEAD~1        # Diff with previous commit

# History
git log                # Complete history
git log --oneline      # One line per commit
git log --graph        # With graph
git log --all          # All branches
git log --since="2 weeks ago"
git log --until="2023-01-01"
git log --author="Name"
git log --grep="keyword"
```

### Add and Commit

```bash
# Add files
git add <file>      # Specific file
git add .              # All files
git add -A             # All files (including deleted)
git add -u             # Only modified files
git add -p             # Interactive mode

# Commit
git commit -m "Message"
git commit -m "Message" -m "Detailed description"
git commit -a          # Add and commit in one step
git commit --amend     # Modify last commit
git commit --amend -m "New message"
```

### Branches

```bash
# List branches
git branch             # Local branches
git branch -r          # Remote branches
git branch -a          # All branches

# Create branches
git branch <name>       # Create a branch
git branch -d <name>    # Delete a branch
git branch -D <name>    # Force delete

# Switch branch
git checkout <name>     # Switch branch
git checkout -b <name>  # Create and switch
git switch <name>       # New command to switch
git switch -c <name>    # Create and switch with switch
```

### Merge and Rebase

```bash
# Merge
git merge <branch>    # Merge a branch
git merge --no-ff <branch>  # Merge without fast-forward
git merge --squash <branch> # Squash merge

# Rebase
git rebase <branch>   # Rebase on a branch
git rebase -i HEAD~3   # Interactive rebase
git rebase --continue  # Continue after resolution
git rebase --abort     # Cancel rebase
```

### Remote

```bash
# Remote management
git remote             # List remotes
git remote -v          # With URLs
git remote add <name> <url>
git remote remove <name>
git remote rename <old> <new>

# Push and pull
git push <remote> <branch>
git push -u <remote> <branch>  # Set upstream
git push --all         # All branches
git push --tags        # All tags

git pull <remote> <branch>
git pull --rebase      # Pull with rebase
git fetch <remote>     # Fetch without merging
```

## Advanced Commands

### Stash

```bash
git stash              # Temporarily save
git stash save "Message"
git stash list         # List stashes
git stash show         # See last stash
git stash show -p      # See modifications
git stash apply        # Apply last stash
git stash pop          # Apply and remove
git stash drop         # Delete last stash
git stash clear        # Delete all stashes
```

### Reset

```bash
git reset --soft HEAD~1    # Cancel commit, keep modifications
git reset --mixed HEAD~1   # Cancel commit and staging
git reset --hard HEAD~1    # Cancel everything
git reset <commit>         # Reset to specific commit
```

### Cherry-pick

```bash
git cherry-pick <commit>   # Apply a commit
git cherry-pick <commit1> <commit2>  # Multiple commits
git cherry-pick -x <commit>  # Add a reference
```

### Reflog

```bash
git reflog             # Reference history
git reflog show <branch>
git checkout HEAD@{2}  # Go to a reference
```

### Tags

```bash
git tag                # List tags
git tag <name>          # Create a tag
git tag -a <name> -m "Message"  # Annotated tag
git push <remote> <tag>  # Push a tag
git push <remote> --tags # Push all tags
git checkout <tag>     # Go to a tag
```

## Maintenance Commands

### Cleanup

```bash
git clean -f           # Delete untracked files
git clean -fd          # Files and folders
git clean -n           # Dry-run mode

git gc                 # Cleanup and optimization
git prune              # Delete unreferenced objects
```

### Repair

```bash
git fsck               # Check integrity
git fsck --full        # Complete verification
git reflog expire --expire=now --all
git gc --prune=now
```

## Search Commands

### Search in History

```bash
git log -S "keyword"   # Search in content
git log -G "regex"     # Search with regex
git log --grep "pattern"  # Search in messages
git log --author "name"    # Search by author
git log --since="date"    # Since a date
git log --until="date"    # Until a date
```

### Search in Files

```bash
git grep "pattern"     # Search in files
git grep -n "pattern"  # With line numbers
git grep -i "pattern"  # Case insensitive
git grep --name-only "pattern"  # Only file names
```

## Comparison Commands

### Diff

```bash
git diff               # Unstaged modifications
git diff --staged      # Staged modifications
git diff HEAD          # All modifications
git diff HEAD~1        # With previous commit
git diff <commit1> <commit2>  # Between two commits
git diff <branch1> <branch2>  # Between two branches
```

### Show

```bash
git show <commit>      # See a commit
git show <commit> --name-only  # Only files
git show <commit> --stat       # With statistics
```

## Collaboration Commands

### Fetch and Merge

```bash
git fetch <remote>     # Fetch changes
git fetch --all        # All remotes
git fetch --prune      # Delete deleted remote branches

git merge <remote>/<branch>  # Merge a remote branch
git merge --no-ff <remote>/<branch>  # Without fast-forward
```

### Rebase

```bash
git rebase <remote>/<branch>  # Rebase on remote branch
git rebase -i <commit>         # Interactive rebase
git rebase --onto <newbase> <oldbase> <branch>  # Complex rebase
```

## Debugging Commands

### Blame

```bash
git blame <file>    # Who modified each line
git blame -L 10,20 <file>  # Specific lines
git blame -w <file> # Ignore spaces
```

### Bisect

```bash
git bisect start       # Start bisect
git bisect good <commit>  # Mark as good
git bisect bad <commit>   # Mark as bad
git bisect reset       # Stop bisect
```

## Configuration Commands

### Config

```bash
git config --global alias.<name> '<command>'  # Create an alias
git config --global core.editor "code --wait"  # Editor
git config --global merge.tool vscode          # Merge tool
git config --global color.ui auto             # Colors
```

### Useful Aliases

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

