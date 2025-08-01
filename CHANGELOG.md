# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of react-social-detector library
- Support for 37+ social networks and platforms
- TypeScript support with full type definitions
- React hook (`useSocialNetworkDetection`) for easy integration
- Bulk URL detection capabilities
- Comprehensive test suite with 90%+ coverage
- ESM and CommonJS compatibility
- Next.js demo application

### Features

- **Platform Detection**: Supports major platforms including YouTube, Twitter/X, Instagram, LinkedIn, TikTok, Facebook, and many more
- **URL Validation**: Robust URL pattern matching with domain validation
- **Performance**: Optimized detection algorithms with caching
- **Developer Experience**: Full TypeScript support, comprehensive documentation, and easy-to-use API
- **Testing**: Extensive test coverage with Vitest
- **Build System**: Professional Rollup configuration for dual module formats

### Supported Platforms

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

## [1.0.0] - 2024-01-XX

### Initial Release

- Initial public release
- Core detection functionality
- TypeScript definitions
- React hook integration
- Comprehensive documentation
- MIT license

---

## Release Notes

### Version 1.0.0

This is the initial release of the react-social-detector library. The library provides a robust solution for detecting and validating social network URLs across 37+ platforms.

**Key Features:**

- **Universal Detection**: Works with all major social networks and platforms
- **TypeScript First**: Built with TypeScript for better developer experience
- **React Integration**: Includes React hook for seamless integration
- **High Performance**: Optimized algorithms with intelligent caching
- **Extensive Testing**: 90%+ test coverage with comprehensive edge case handling
- **Modern Build**: ESM and CommonJS support for maximum compatibility

**Getting Started:**

```bash
npm install react-social-detector
# or
pnpm add react-social-detector
```

**Basic Usage:**

```typescript
import { quickReactSocialDetector } from "react-social-detector";

const result = quickReactSocialDetector("https://youtube.com/@username");
console.log(result); // { name: 'YouTube', domain: 'youtube.com', url: '...' }
```

**React Hook:**

```typescript
import { useReactSocialDetector } from "react-social-detector";

const { detectNetwork, isValidUrl } = useSocialNetworkDetection();
```

For detailed documentation and examples, see the [README.md](./README.md).

---

### Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
