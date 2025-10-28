# Contributing to Mermaid Image Generator

Thank you for your interest in contributing to the Mermaid Image Generator! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager
- Git

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/jclaudan.git`
3. Navigate to the scripts directory: `cd scripts`
4. Install dependencies: `npm install`
5. Run tests: `npm test`

## Development Guidelines

### Code Style
- Use ES modules (import/export)
- Follow JavaScript standard style
- Write comments in English
- Keep console logs in French for user-facing messages
- Use meaningful variable and function names

### File Structure
```
scripts/
├── generate-mermaid-images.js  # Main script
├── config.js                   # Configuration
├── package.json                # Dependencies
├── README.md                   # Documentation
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
└── CHANGELOG.md               # Version history
```

### Testing
- Test your changes with different Mermaid diagrams
- Verify image generation works correctly
- Check that file replacements are accurate
- Test error handling scenarios

## Submitting Changes

### Pull Request Process
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Commit with descriptive messages
6. Push to your fork
7. Submit a pull request

### Commit Messages
Use clear, descriptive commit messages:
- `feat: add support for custom themes`
- `fix: resolve image scaling issue`
- `docs: update installation instructions`
- `refactor: improve error handling`

## Issue Reporting

### Bug Reports
When reporting bugs, please include:
- Node.js version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)

### Feature Requests
For new features, please describe:
- Use case and motivation
- Proposed solution
- Alternative solutions considered
- Additional context

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the project's coding standards

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for questions or discussions about the project.
