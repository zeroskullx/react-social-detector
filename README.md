# React Social Detector

✨ **Detect and validate social media URLs with ease and precision! A modern, complete TypeScript library with native React support.**

![React Social Detector V.1](/public/image/rsd.png)

## 🎯 Why Use It?

Ever needed to identify which social network a URL belongs to? Extract usernames? Generate standardized URLs? React Social Detector solves all these problems with a simple and powerful API.

## 🚀 Key Features

- 🌐 **30+ supported platforms** - Instagram, Twitter/X, LinkedIn, YouTube, TikTok, GitHub, and many others
- ⚛️ **Native React Hooks** - `useReactSocialDetector` and `useBulkReactSocialDetector` for seamless integration
- 🎨 **SVG Icon Component** - `SocialIcon` with support for simple and rounded icons
- 🔍 **Smart detection** - Multiple detection methods with confidence levels
- 🔗 **URL generation** - Creates normalized URLs automatically
- 👤 **Username extraction** - Extracts usernames from existing URLs
- 📦 **Tree-shakeable** - Only the code you use is included in the bundle
- 🚫 **Zero dependencies** - Lightweight with no external dependencies
- ⚡ **Batch detection** - Process multiple URLs simultaneously
- 🎯 **Native TypeScript** - Full typing and autocomplete
- 🚀 **Optimized performance** - Internal cache and lazy evaluation

### Performance and Benchmarks

The library is optimized for performance:

- **Domain cache** - Avoids reprocessing
- **Lazy evaluation** - Processes only when necessary
- **Tree-shaking** - Final bundle contains only used code
- **TypeScript** - Compile-time optimizations

**Execution Times:**

```text
Simple detection: ~0.1ms
Cached detection: ~0.01ms
Batch detection (100 items): ~10ms
Username extraction: ~0.05ms
```

## 📦 Instalação

```bash
# npm
npm install react-social-detector

# yarn
yarn add react-social-detector

# pnpm
pnpm add react-social-detector
```

## 📌 Quick Usage Examples

### → [**View complete examples**](examples/complete-demo.md)

**Parameters:**

- `input: string` - URL or domain to be detected
- `username?: string` - Optional username to generate normalized URL
- `options?: DetectionOptions` - Detection options

**Returns:** `ReactSocialDetectionResult`

```typescript
interface ReactSocialDetectionResult {
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

React hook for social network detection with debounce and error handling.

**Options:**

```typescript
interface UseReactSocialDetectorOptions {
  debounceMs?: number; // Default: 300ms
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
  // State
  result: ReactSocialDetectionResult | null;
  isDetecting: boolean;
  error: string | null;

  // Actions
  detect: (
    input: string,
    username?: string
  ) => Promise<ReactSocialDetectionResult>;
  clear: () => void;
  extractUsername: (url: string, platform?: SocialNetworkKey) => string | null;
  validatePlatform: (
    url: string,
    expectedPlatform: SocialNetworkKey
  ) => boolean;

  // Utilities
  supportedPlatforms: readonly PlatformInfo[];
  generateProfileUrl: (
    platform: SocialNetworkKey,
    username: string
  ) => string | null;
}
```

### `useBulkReactSocialDetector(options?)`

React hook for batch detection with concurrency control.

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

### `SocialIcon`

React component for displaying SVG social media icons.

**Props:**

```typescript
interface SocialIconProps {
  platform?: SocialNetworkKey | "unknown";
  ariaLabel?: string;
  pathColor?: string; // Icon path color
  height?: string | number; // Icon height
  width?: string | number; // Icon width
  type?: "rounded"; // Icon type (undefined = simple)
  divProps?: {
    className?: string;
    backgroundColor?: string; // Background color (for type="rounded")
  };
}
```

### `socialNetworkUtils`

Utility functions for working with social networks.

```typescript
import { socialNetworkUtils } from "react-social-detector";

// Check if platform is supported
socialNetworkUtils.isPlatformSupported("instagram"); // true

// Get display name
socialNetworkUtils.getPlatformDisplayName("instagram"); // 'Instagram'

// Get all supported platforms
socialNetworkUtils.getAllPlatforms(); // Array with all platforms

// Normalize URL
socialNetworkUtils.normalizeUrl("instagram.com"); // 'https://instagram.com'

// Extract domain
socialNetworkUtils.extractDomain("https://instagram.com/user"); // 'instagram.com'

// Validate username format
socialNetworkUtils.validateUsername("testuser", "instagram"); // true

// Generate profile URL
socialNetworkUtils.generateProfileUrl("instagram", "username"); // 'https://instagram.com/username'
```

## 🌐 Supported Platforms

The library supports **30+ popular platforms**:

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
| ...       | ...         | +17 other platforms   |

## 🔍 Detection Methods

The library uses multiple methods for maximum accuracy:

1. **Pattern Matching** (Confidence: High)

   - Specific regex patterns for each platform
   - Includes subdomains and variations

2. **Domain Extraction** (Confidence: Medium)

   - Direct mapping of known domains
   - Cache for better performance

3. **Structure Analysis** (Confidence: Low)
   - Analysis of common URL structures
   - Fallback when other methods fail

## ❓ FAQ

### How to add a new social network?

Yes! Contributing and opening a pull request... is easy! ☺️

### Does the SocialIcon component support custom icons?

Yes! You can:

- Use `pathColor` to change the color
- Use `type="rounded"` for circular background
- Pass `divProps` for custom styling

### How to improve performance?

- Use `strictMode: false` for faster detection
- Enable cache with `includeSubdomains: true`
- For batch, adjust `maxConcurrent` as needed

### Does the library work with React Native?

Yes! The library supports React Native (currently in beta).

**Note for implementation:**
Only the `SocialIcon` component requires minor adjustments for SVG compatibility.

## 🤝 Contributing

Suggestions for new networks are welcome! Follow the pattern:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/NewPlatform`)
3. Commit your changes (`git commit -m 'Add new platform'`)
4. Push to the branch (`git push origin feature/NewPlatform`)
5. Open a Pull Request

### Adding a New Platform

To add support for a new social network:

1. Add the pattern in `/src/react-social-detector/assets/patterns-db.json`
2. Implement validation rules if necessary
3. Add the SVG icon in `/src/react-social-detector/assets/icons-db.json`
4. Run tests to verify

```json
{
  "newplatform": {
    "domains": ["/newplatform.com$/"],
    "baseUrl": "https://newplatform.com/",
    "displayName": "New Platform",
    "exampleDomain": "newplatform.com",
    "allowSubdomains": false
  }
}
```

1. Add username validation in `index.ts` if necessary:

```typescript
const platformValidators: Record<string, RegExp> = {
  // ... other validators
  newplatform: /^[a-zA-Z0-9_]{3,20}$/,
};
```

1. Add tests for the new platform

### Project Structure

```text
src/
├── react-social-detector/
│   ├── index.ts              # Main exports
│   ├── utils.ts              # Utility functions
│   ├── assets/
│   │   ├── patterns-db.json  # Platform patterns
│   │   └── icons-db.json     # SVG icons
│   ├── components/
│   │   └── SocialIcon/       # Icon component
│   ├── hooks/                # React hooks
│   ├── lib/
│   │   ├── detector.ts       # Detection logic
│   │   └── types.ts          # TypeScript types
│   └── __tests__/            # Tests
└── app/                      # Next.js demo
```

## 🔧 Advanced Configuration

### Detection Options

```typescript
const options: DetectionOptions = {
  strictMode: true, // Stricter detection
  includeSubdomains: true, // Include subdomains
  caseSensitive: false, // Case sensitive
  extractMetadata: true, // Include metadata in result
};

const result = quickReactSocialDetector("Instagram.com", "user", options);
```

### Hook with Debounce

```typescript
const { detect } = useReactSocialDetector({
  debounceMs: 500, // Wait 500ms before detecting
  autoDetect: true, // Automatically detect on input change
});
```

### SocialIcon Customization

```tsx
// Simple icon
<SocialIcon platform="instagram" pathColor="#E4405F" />

// Icon with rounded background and custom color
<SocialIcon
  platform="twitter"
  type="rounded"
  divProps={{ backgroundColor: '#1DA1F2' }}
/>

// Large icon for emphasis
<SocialIcon
  platform="youtube"
  width={48}
  height={48}
  pathColor="#FF0000"
/>
```

## 🧪 Tests

```bash
# Run tests
pnpm test

# Watch mode
pnpm run test:watch

# Coverage
pnpm run test:coverage
```

## 🛠️ Build and Development

```bash
# Install dependencies
pnpm install


# Development with watch
pnpm run dev

# Build for production
pnpm run build

# Build library only
pnpm run build:lib

# Linting
pnpm run lint

# Type checking
pnpm run typecheck
```

---

### ⚠️ Windows Users: Note on Script Compatibility

Some npm scripts (like `husky install || true` or commands with `&&`) may fail on Windows due to shell differences.

**Workarounds:**

1. Use **Git Bash** or **WSL** (Windows Subsystem for Linux) for full compatibility.
2. For `husky`, manually run after installation:

   ```bash
   npx husky install
   ```

3. Replace `&&` with cross-platform alternatives like [`npm-run-all`](https://www.npmjs.com/package/npm-run-all).

_(This is a known Node.js/npm behavior on Windows cmd/PowerShell.)_

## 📈 Performance

The library is optimized for performance:

- **Domain cache** - Avoids reprocessing
- **Lazy evaluation** - Processes only when necessary
- **Tree-shaking** - Final bundle contains only used code
- **TypeScript** - Compile-time optimizations

### Benchmarks

```text
Simple detection: ~0.1ms
Cached detection: ~0.01ms
Batch detection (100 items): ~10ms
Username extraction: ~0.05ms
```

## 🔒 Security

- ✅ Input sanitization
- ✅ URL validation
- ✅ XSS protection
- ✅ Rate limiting in batch detection

## 📅 Versions and Changelog

### v1.0.2 (Current)

- ✨ SocialIcon component with rounded support
- ✨ 30+ supported platforms
- ✨ Native React hooks
- ✨ Native TypeScript
- ✨ Smart detection with multiple methods
- ✨ Batch detection support
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
