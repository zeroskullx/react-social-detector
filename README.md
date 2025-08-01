# Detect Social Network

A modern and comprehensive TypeScript library for social network detection with React hooks support.

## 🚀 Features

- ✅ **37+ platforms supported** - Instagram, Twitter/X, LinkedIn, YouTube, TikTok, GitHub, and many more
- ✅ **Built-in React Hooks** - `useReactSocialDetector` and `useBulkReactSocialDetector` for easy integration
- ✅ **TypeScript Native** - Full typing and autocomplete support
- ✅ **Intelligent Detection** - Multiple detection methods with confidence levels
- ✅ **URL Generation** - Creates normalized URLs automatically
- ✅ **Username Extraction** - Extracts usernames from existing URLs
- ✅ **Tree-shakeable** - Only the code you use is included in your bundle
- ✅ **Zero Dependencies** - Lightweight with no external dependencies
- ✅ **Bulk Detection** - Process multiple URLs concurrently
- ✅ **Performance Optimized** - Built-in caching and lazy evaluation

## 📦 Installation

```bash
npm install react-social-detector
# or
yarn add react-social-detector
# or
pnpm add react-social-detector
```

## 📚 API Reference

### `quickReactSocialDetector(url, username?, options?)`

Detects the social network from a URL or domain.

**Parameters:**

- `url: string` - URL or domain to detect
- `username?: string` - Optional username to generate normalized URL
- `options?: DetectionOptions` - Detection options

**Returns:** `SocialNetworkDetectionResult`

```typescript
interface SocialNetworkDetectionResult {
  platform: SocialNetworkKey | "unknown";
  isValid: boolean;
  normalizedUrl?: string;
  displayName?: string;
  confidence: "high" | "medium" | "low";
  detectionMethod: "pattern" | "domain" | "url_structure" | "none";
  metadata?: {
    extractedUsername?: string;
    originalInput: string;
    processingTime?: number;
  };
}
```

### `useReactSocialDetector(options?)`

React hook for social network detection.

**Options:**

```typescript
interface UseReactSocialDetectorOptions {
  debounceMs?: number; // Default: 300
  autoDetect?: boolean; // Default: false
  strictMode?: boolean; // Default: false
  includeSubdomains?: boolean; // Default: true
  caseSensitive?: boolean; // Default: false
  extractMetadata?: boolean; // Default: false
}
```

**Returns:**

```typescript
interface UseReactSocialDetectorReturn {
  result: SocialNetworkDetectionResult | null;
  isDetecting: boolean;
  error: string | null;
  detect: (
    input: string,
    username?: string
  ) => Promise<SocialNetworkDetectionResult>;
  clear: () => void;
  extractUsername: (url: string, platform?: SocialNetworkKey) => string | null;
  validatePlatform: (
    url: string,
    expectedPlatform: SocialNetworkKey
  ) => boolean;
  supportedPlatforms: Array<{ key: SocialNetworkKey; displayName: string }>;
  generateProfileUrl: (
    platform: SocialNetworkKey,
    username: string
  ) => string | null;
}
```

### `useBulkReactSocialDetector(options?)`

React hook for bulk social network detection.

**Options:**

```typescript
interface UseBulkDetectionOptions {
  maxConcurrent?: number; // Default: 5
  strictMode?: boolean;
  includeSubdomains?: boolean;
  caseSensitive?: boolean;
  extractMetadata?: boolean;
}
```

### `ReactSocialDetectorUtils`

Utility functions for working with social networks.

```typescript
import { ReactSocialDetectorUtils } from "react-social-detector";

// Check if platform is supported
ReactSocialDetectorUtils.isPlatformSupported("instagram"); // true

// Get platform display name
ReactSocialDetectorUtils.getPlatformDisplayName("instagram"); // 'Instagram'

// Get all supported platforms
ReactSocialDetectorUtils.getAllPlatformKeys(); // ['instagram', 'twitter', ...]

// Normalize URL
ReactSocialDetectorUtils.normalizeUrl("instagram.com"); // 'https://instagram.com'

// Extract domain
ReactSocialDetectorUtils.extractDomain("https://instagram.com/user"); // 'instagram.com'

// Validate username format (removed - not available in current version)
```

## 🌐 Supported Platforms

| Platform  | Key         | Main Domains          |
| --------- | ----------- | --------------------- |
| Instagram | `instagram` | instagram.com         |
| Twitter/X | `twitter`   | twitter.com, x.com    |
| LinkedIn  | `linkedin`  | linkedin.com          |
| YouTube   | `youtube`   | youtube.com, youtu.be |
| TikTok    | `tiktok`    | tiktok.com            |
| GitHub    | `github`    | github.com            |
| Facebook  | `facebook`  | facebook.com          |
| Discord   | `discord`   | discord.com           |
| Reddit    | `reddit`    | reddit.com            |
| Twitch    | `twitch`    | twitch.tv             |
| Pinterest | `pinterest` | pinterest.com         |
| Snapchat  | `snapchat`  | snapchat.com          |
| Telegram  | `telegram`  | t.me, telegram.me     |
| WhatsApp  | `whatsapp`  | whatsapp.com, wa.me   |
| Threads   | `threads`   | threads.net           |
| Bluesky   | `bluesky`   | bsky.app              |
| Mastodon  | `mastodon`  | mastodon.social       |
| Medium    | `medium`    | medium.com            |
| ...       | ...         | +19 other platforms   |

## 🔍 Detection Methods

The library uses multiple methods to detect social networks:

1. **Pattern Matching** (Confidence: High)

   - Specific regex patterns for each platform
   - Includes subdomains and variations

2. **Domain Extraction** (Confidence: Medium)

   - Direct mapping of known domains
   - Cached for better performance

3. **URL Structure Analysis** (Confidence: Low)
   - Analysis of common URL structures
   - Fallback when other methods fail

## 📊 Bulk Detection

```typescript
import { useBulkReactSocialDetector } from "react-social-detector";

function BulkDetector() {
  const { results, isDetecting, progress, detectBulk } =
    useBulkReactSocialDetector({
      maxConcurrent: 5,
    });

  const handleBulkDetection = async () => {
    const items = [
      { id: "1", input: "instagram.com", username: "user1" },
      { id: "2", input: "twitter.com", username: "user2" },
      { id: "3", input: "linkedin.com", username: "user3" },
    ];

    await detectBulk(items);
  };

  return (
    <div>
      <button onClick={handleBulkDetection} disabled={isDetecting}>
        Bulk Detect
      </button>

      {isDetecting && (
        <p>
          Progress: {progress.completed}/{progress.total}
        </p>
      )}

      {results.map((result) => (
        <div key={result.id}>
          {result.input}: {result.result.platform}
          {result.error && <span>Error: {result.error}</span>}
        </div>
      ))}
    </div>
  );
}
```

## ⚙️ Advanced Configuration

### Detection Options

```typescript
const options: DetectionOptions = {
  strictMode: true, // More rigorous detection
  includeSubdomains: true, // Include subdomains in detection
  caseSensitive: false, // Case sensitive matching
  extractMetadata: true, // Include metadata in results
};

const result = quickReactSocialDetector("Instagram.com", "user", options);
```

### Hook with Debounce

```typescript
const { detect } = useReactSocialDetector({
  debounceMs: 500, // Wait 500ms before detecting
  autoDetect: true, // Automatically detect when input changes
});
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 🛠️ Build and Development

```bash
# Install dependencies
npm install

# Development with watch
npm run dev

# Build for production
npm run build

# Build library only
npm run build:lib

# Linting
npm run lint

# Type checking
npm run typecheck
```

## 📁 Project Structure

```
src/
├── react-social-detector/
│   ├── index.ts           # Main exports
│   ├── patterns.ts        # Social network patterns
│   ├── detector.ts        # Core detection logic
│   └── hook.ts            # React hooks
│   └── __tests__/         # Test files
└── app/                   # Next.js demo app
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Adding a New Platform

To add support for a new social network:

1. Add patterns in `patterns.ts`:

```typescript
export const SOCIAL_NETWORKS_PATTERNS = {
  // ... other platforms
  newplatform: {
    domains: [/newplatform\.com$/],
    baseUrl: "https://newplatform.com/",
    displayName: "New Platform",
    exampleDomain: "newplatform.com",
    allowSubdomains: false,
  },
} as const;
```

2. Add username validation in `index.ts` if needed:

```typescript
const platformValidators: Record<string, RegExp> = {
  // ... other validators
  newplatform: /^[a-zA-Z0-9_]{3,20}$/,
};
```

3. Add tests for the new platform

## 🐛 Bug Reports

If you find a bug, please open an issue with:

- Detailed description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Library version
- Environment (Node.js, browser, etc.)

## 📈 Performance

The library is optimized for performance:

- **Domain caching** - Avoids reprocessing
- **Lazy evaluation** - Processes only when necessary
- **Tree-shaking** - Final bundle contains only used code
- **TypeScript** - Compile-time optimizations

### Benchmarks

```text
Simple detection: ~0.1ms
Cached detection: ~0.01ms
Bulk detection (100 items): ~10ms
Username extraction: ~0.05ms
```

## 🔒 Security

- ✅ Input sanitization
- ✅ URL validation
- ✅ XSS protection
- ✅ Rate limiting in bulk detection

## 📄 Changelog

### v1.0.0

- ✨ Initial release
- ✨ Support for 37+ platforms
- ✨ Built-in React hooks
- ✨ TypeScript native
- ✨ Intelligent detection with multiple methods
- ✨ Bulk detection support
- ✨ Performance optimizations

## 📜 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by various URL detection libraries
- Open source community contributors
- Developer community feedback

## 📞 Support

- 🐛 Issues: [GitHub Issues](https://github.com/zeroskullx/react-social-detector/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/zeroskullx/react-social-detector/discussions)

---

Made with ❤️ by [Zeroskullx](https://github.com/zeroskullx)
