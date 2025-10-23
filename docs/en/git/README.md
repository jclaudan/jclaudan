# Git - Version Control System

## Installation

```bash
# Ubuntu/Debian
sudo apt install git

# macOS
brew install git

# Windows
# Download from https://git-scm.com/
```

## Initial Configuration

```bash
# Global configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Local configuration (for a specific project)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Check configuration
git config --list
```

## Basic Concepts

### Repository
- **Local Repository**: Folder on your machine
- **Remote Repository**: Repository on a server (GitHub, GitLab, etc.)

### File States
- **Untracked**: File not tracked by Git
- **Modified**: File modified but not staged
- **Staged**: File ready to be committed
- **Committed**: File saved in the repository

### Branches
- **Main/Master**: Main branch
- **Feature branch**: Branch for a feature
- **Hotfix branch**: Branch to fix a critical bug

## Essential Commands

### Initialization

```bash
# Initialize a repository
git init

# Clone an existing repository
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder
```

### Add and Commit

```bash
# Add a file
git add file.txt

# Add all files
git add .

# Add all modified files
git add -u

# Commit with message
git commit -m "Add feature X"

# Commit with detailed message
git commit -m "Add feature X" -m "Detailed description"
```

### Status and History

```bash
# See status
git status

# See history
git log

# See compact history
git log --oneline

# See history with graph
git log --graph --oneline --all
```

### Branches

```bash
# List branches
git branch

# Create a new branch
git branch new-branch

# Switch branch
git checkout new-branch

# Create and switch branch
git checkout -b new-branch

# Delete a branch
git branch -d new-branch

# Delete a remote branch
git push origin --delete new-branch
```

### Merge and Rebase

```bash
# Merge a branch
git merge branch-to-merge

# Rebase a branch
git rebase base-branch

# Interactive rebase
git rebase -i HEAD~3
```

### Remote

```bash
# Add a remote
git remote add origin https://github.com/user/repo.git

# See remotes
git remote -v

# Push to remote
git push origin main

# Pull from remote
git pull origin main

# Fetch from remote
git fetch origin
```

## Common Workflows

### Git Flow

```bash
# Main branches
main        # Production
develop     # Development

# Support branches
feature/    # New features
release/    # Release preparation
hotfix/     # Urgent fixes
```

### GitHub Flow

```bash
# Main branch
main

# Feature branches
feature/feature-name
```

### GitLab Flow

```bash
# Main branches
main        # Production
staging     # Tests
pre-production  # Pre-production
```

## Advanced Commands

### Stash

```bash
# Temporarily save modifications
git stash

# Save with message
git stash save "Stash message"

# See stashes
git stash list

# Apply the last stash
git stash apply

# Apply and remove the stash
git stash pop

# Delete a stash
git stash drop stash@{0}
```

### Reset

```bash
# Soft reset (keep modifications)
git reset --soft HEAD~1

# Mixed reset (keep unstaged modifications)
git reset --mixed HEAD~1

# Hard reset (delete everything)
git reset --hard HEAD~1
```

### Cherry-pick

```bash
# Apply a specific commit
git cherry-pick commit-hash

# Apply multiple commits
git cherry-pick commit1 commit2 commit3
```

### Reflog

```bash
# See reference history
git reflog

# Recover a lost commit
git checkout commit-hash
```

## Git Hooks

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

# Check message format
commit_regex='^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "Invalid commit message format!"
    exit 1
fi
```

## Advanced Configuration

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

### Advanced Configuration

```bash
# Useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Color configuration
git config --global color.ui auto

# Editor configuration
git config --global core.editor "code --wait"

# Merge tools configuration
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'
```

## Best Practices

1. **Commit Messages**: Use clear and descriptive messages
2. **Branches**: Use explicit branch names
3. **Frequent Commits**: Make small and frequent commits
4. **Tests**: Ensure tests pass before committing
5. **Review**: Make pull requests for important changes
6. **Documentation**: Update documentation with changes

## Pitfalls to Avoid

1. **Force Push**: Avoid `git push --force` on shared branches
2. **Large Commits**: Split commits into logical changes
3. **Unnamed Branches**: Always name branches
4. **Ignore .gitignore**: Don't commit sensitive files
5. **Merge Conflicts**: Resolve conflicts quickly
