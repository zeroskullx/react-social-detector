# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-08-04

### Added

- 🎨 **SocialIcon Component**: New React component for displaying social media icons
  - SVG-based icons for 37+ platforms
  - Simple and rounded icon variants
  - Customizable colors, sizes, and backgrounds
  - Full TypeScript support and accessibility features
- 🧪 **Comprehensive Testing Suite**: Added 65+ test cases with near 100% coverage
  - Integration tests for cross-platform detection
  - Component tests for SocialIcon with accessibility validation
  - Hook tests with advanced scenarios and error handling
  - Performance benchmarking tests
  - Utility function validation tests
- 📚 **Complete Documentation Overhaul**:
  - English translation of all documentation
  - Comprehensive API documentation with TypeScript interfaces
  - Detailed examples and usage guides
  - Performance metrics and benchmarks
  - FAQ section and troubleshooting guides
- 🗃️ **JSON Pattern Database**: Migrated social network patterns to JSON format
  - Better maintainability and extensibility
  - Separated icons and patterns into dedicated databases
  - Enhanced pattern validation and testing
- 🛠️ **Enhanced Developer Experience**:
  - VSCode configuration with optimized settings
  - Improved Biome linting and formatting rules
  - Better project structure with modular architecture

### Changed

- 🏗️ **Architecture Improvements**: Restructured codebase with `/lib` directory for core logic
- 📦 **Build Optimization**: Enhanced Rollup configuration for better tree-shaking
- 🎯 **Type Safety**: Improved TypeScript definitions and interfaces
- 📖 **Example Files**: Moved examples to dedicated markdown files for better organization

### Performance

- ⚡ **Optimized Detection**: Improved algorithm performance
  - Simple detection: ~0.1ms
  - Cached detection: ~0.01ms  
  - Batch detection (100 items): ~10ms
  - Username extraction: ~0.05ms

## [1.0.2] - 2025-08-01

### Fixed

- 🐛 **Critical Fix**: Moved `react` and `react-dom` from dependencies to devDependencies to prevent peer dependency conflicts
- 🔧 Removed `next` from dependencies (only needed for demo development)
- ✅ Library now correctly uses only `peerDependencies` for React, eliminating installation warnings

### Changed

- 📦 Cleaner package installation without unnecessary dependencies
- 🎯 Reduced package size by removing bundled React dependencies

## [1.0.1] - 2025-08-01

### Published

- 🎉 **First NPM Release!** Published to npm registry as `react-social-detector`
- 📦 Package available at: <https://www.npmjs.com/package/react-social-detector>

### Added

- Complete TypeScript library for detecting and validating social network URLs
- Support for 37+ social networks and platforms
- React hooks (`useReactSocialDetector`, `useBulkReactSocialDetector`) for easy integration
- Multiple detection functions:
  - `quickReactSocialDetector` - Fast single URL detection
  - `reactSocialDetector` - Standard detection with full options
  - `ReactSocialDetector` - Class-based detector
  - `socialNetworkUtils` - Utility functions
- Comprehensive test suite with 65 tests (100% passing)
- ESM and CommonJS compatibility
- Full TypeScript definitions included
- Next.js demo application

### Features

- **Platform Detection**: Supports major platforms including YouTube, Twitter/X, Instagram, LinkedIn, TikTok, Facebook, and many more
- **URL Validation**: Robust URL pattern matching with domain validation
- **Performance**: Optimized detection algorithms
- **Developer Experience**: Full TypeScript support, comprehensive documentation, and easy-to-use API
- **Testing**: Extensive test coverage with Vitest
- **Build System**: Professional Rollup configuration for dual module formats

### Supported Platforms (37+)

- YouTube (including @username format)
- Twitter/X
- Instagram
- LinkedIn
- TikTok
- Facebook
- GitHub
- Reddit
- Pinterest
- Snapchat
- Discord
- Twitch
- SoundCloud
- Spotify
- Vimeo
- Dailymotion
- Medium
- Dev.to
- Stack Overflow
- Dribbble
- Behance
- Figma
- CodePen
- Telegram
- WhatsApp
- Signal
- Steam
- Epic Games
- And many more...

### Installation

```bash
npm install react-social-detector
# or
pnpm add react-social-detector
# or
yarn add react-social-detector
```

### Basic Usage

```typescript
import { quickReactSocialDetector } from "react-social-detector";

const result = quickReactSocialDetector("https://youtube.com/@username");
console.log(result); // { name: 'YouTube', domain: 'youtube.com', url: '...' }
```

### React Hook Usage

```typescript
import { useReactSocialDetector } from "react-social-detector";

function MyComponent() {
  const { detectNetwork, isValidUrl } = useReactSocialDetector();

  const handleDetection = (url: string) => {
    const result = detectNetwork(url);
    console.log(result);
  };

  return <div>...</div>;
}
```

---

## Links

- **NPM Package**: <https://www.npmjs.com/package/react-social-detector>
- **GitHub Repository**: <https://github.com/zeroskullx/react-social-detector>
- **Issues**: <https://github.com/zeroskullx/react-social-detector/issues>
- **Documentation**: Available in README.md

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
