# Changelog

All notable changes to the Mermaid Image Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Added
- Initial release of Mermaid Image Generator
- Support for PNG and SVG image generation
- Automatic Markdown file scanning
- Mermaid code block extraction and replacement
- Puppeteer-based rendering engine
- Configuration management system
- Cross-platform installation scripts (Windows, Linux, Mac)
- Comprehensive error handling and logging
- Generation reports with detailed statistics
- Support for multiple Mermaid themes
- High-resolution image generation with configurable scale

### Features
- **File Processing**: Automatically scans all Markdown files in docs directory
- **Image Generation**: Converts Mermaid diagrams to PNG/SVG images
- **File Updates**: Replaces Mermaid code blocks with image links
- **Configuration**: Flexible configuration via config.js
- **Themes**: Support for multiple Mermaid themes (default, dark, forest, etc.)
- **Reports**: Detailed generation reports in JSON format
- **Cross-platform**: Works on Windows, Linux, and macOS

### Technical Details
- Built with modern Node.js ES modules
- Uses Puppeteer for headless browser rendering
- Supports Mermaid v10+ syntax
- Configurable image formats and quality
- Automatic directory creation and management
- Comprehensive error handling and recovery

## [Unreleased]

### Planned
- GitHub Actions integration
- Batch processing optimization
- Custom CSS theme support
- Image optimization and compression
- Multiple output format support
- Advanced configuration options
