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

#### Merge vs Rebase: Detailed Comparison

| Aspect | Merge | Rebase |
|--------|-------|--------|
| **History** | Preserves complete history | Rewrites linear history |
| **Commits** | Creates a merge commit | Replays commits |
| **Conflicts** | Single conflict at merge point | Potential conflicts per commit |
| **Traceability** | Easy to see branches | Linear history but loss of context |
| **Safety** | Safer on shared branches | Risky on shared branches |

#### When to use Merge

```bash
# Simple merge
git checkout main
git merge feature-branch

# Merge with strategy
git merge -X ours feature-branch    # In case of conflict, keep our changes
git merge -X theirs feature-branch  # In case of conflict, keep their changes

# Merge without automatic commit
git merge --no-commit feature-branch
```

**Advantages:**
- Preserves branch history
- Safe for shared branches
- Facilitates rollback
- Feature traceability

**Disadvantages:**
- Complex history with many merges
- Merge commits "pollute" history

#### When to use Rebase

```bash
# Simple rebase
git checkout feature-branch
git rebase main

# Interactive rebase
git rebase -i HEAD~3

# Rebase with strategy
git rebase -X ours main
git rebase -X theirs main

# Rebase preserving merges
git rebase --preserve-merges main
```

**Advantages:**
- Linear and clean history
- No merge commits
- Easier to read history
- Simulates sequential development

**Disadvantages:**
- Rewrites history (risky)
- Loss of branch context
- Multiple potential conflicts
- Complex for beginners

#### Advanced Interactive Rebase

```bash
# Edit the last 3 commits
git rebase -i HEAD~3

# Available options:
# pick    : Apply the commit
# reword  : Modify the commit message
# edit    : Modify the commit
# squash  : Merge with the previous commit
# fixup   : Merge without keeping the message
# drop    : Remove the commit
```

#### Conflict Management

```bash
# Merge conflict
git status
# Edit conflicted files
git add resolved-file
git commit

# Rebase conflict
git status
# Edit conflicted files
git add resolved-file
git rebase --continue

# Abort a rebase
git rebase --abort
```

#### Best Practices

**Use Merge when:**
- Working on a shared branch
- Integrating a complete feature
- Want to preserve branch history
- Collaborating with other developers

**Use Rebase when:**
- Cleaning history before merge
- Working on a local branch
- Maintaining linear history
- Preparing a clean PR

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

## Conflict Resolution

### Types of Conflicts

1. **Content conflicts**: Same line modified differently
2. **Addition conflicts**: File added in both branches
3. **Deletion conflicts**: File deleted in one branch, modified in the other

### Resolution Process

```bash
# 1. Detect conflicts
git status

# 2. Identify conflicted files
git diff --name-only --diff-filter=U

# 3. Edit files
# Manually resolve conflict markers:
# <<<<<<< HEAD
# Content from your branch
# =======
# Content from other branch
# >>>>>>> branch-name

# 4. Mark as resolved
git add resolved-file

# 5. Finalize resolution
git commit  # For a merge
git rebase --continue  # For a rebase
```

### Resolution Tools

```bash
# Open configured editor
git mergetool

# Configure external tool
git config --global merge.tool vscode
git config --global mergetool.vscode.cmd 'code --wait $MERGED'

# Popular tools
git config --global merge.tool vimdiff
git config --global merge.tool meld
git config --global merge.tool kdiff3
```

### Automatic Resolution Strategies

```bash
# Keep our version
git checkout --ours conflicted-file

# Keep their version
git checkout --theirs conflicted-file

# Merge with strategy
git merge -X ours conflicted-branch
git merge -X theirs conflicted-branch
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

**Advantages:**
- Clear and defined structure
- Good for large teams
- Clear separation of environments

**Disadvantages:**
- Complexity for small projects
- Many branches to maintain
- Heavy process for releases

### GitHub Flow (Trunk-based)

```bash
# Main branch
main

# Feature branches
feature/feature-name
```

**Process:**
1. Create a branch from `main`
2. Develop and commit
3. Create a Pull Request
4. Review and merge into `main`
5. Deploy immediately

**Advantages:**
- Simple and fast
- Frequent deployments
- Good for agile teams

**Disadvantages:**
- No staging branch
- Direct deployment to production
- Risky for critical projects

### GitLab Flow

```bash
# Main branches
main        # Production
staging     # Tests
pre-production  # Pre-production
```

**Variants:**
- **Environment flow**: Branches by environment
- **Release flow**: Release branches
- **Upstream flow**: Integration with upstream projects

### Trunk-based Development

```bash
# Single main branch
main

# Short and ephemeral branches
feature/feature-name
bugfix/bug-description
```

**Characteristics:**
- Short-lived branches (1-2 days)
- Frequent merge into `main`
- Continuous deployment
- Feature flags for features

**Advantages:**
- Continuous integration
- Fewer conflicts
- Fast deployment

**Disadvantages:**
- Requires good discipline
- Mandatory automated tests
- Complex feature flags

### Workflow Comparison

| Workflow | Team Size | Complexity | Deployment Frequency | Branches |
|----------|-----------|------------|---------------------|----------|
| **Git Flow** | Large | High | Low | Many |
| **GitHub Flow** | Small/Medium | Low | High | Few |
| **GitLab Flow** | Medium/Large | Medium | Medium | Moderate |
| **Trunk-based** | Any size | Low | Very High | Minimal |

### Workflow Selection

**Use Git Flow when:**
- Large team (>10 developers)
- Project with planned releases
- Multiple environments
- Need for strict traceability

**Use GitHub Flow when:**
- Small/medium team
- Frequent deployments
- Agile development
- Modern web project

**Use Trunk-based when:**
- Experienced team
- Complete automated tests
- Continuous deployment
- Feature flags available

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

# Apply a range of commits
git cherry-pick commit1..commit3

# Apply without automatic commit
git cherry-pick --no-commit commit-hash

# Apply with signature
git cherry-pick -x commit-hash
```

#### When to use cherry-pick

- **Bug fix**: Apply a fix from one branch to another
- **Feature backport**: Port a feature to an earlier version
- **Reorganization**: Rebuild history selectively

#### Managing conflicts with cherry-pick

```bash
# In case of conflict
git status
# Resolve conflicts manually
git add conflicted-file
git cherry-pick --continue

# Abort a cherry-pick
git cherry-pick --abort
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
