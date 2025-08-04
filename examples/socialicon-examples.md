# 🎨 SocialIcon Component Examples

The `SocialIcon` component is one of the most powerful features of the `react-social-detector` library. It allows you to display SVG social media icons in a simple and elegant way.

## 📦 Import

```tsx
import { SocialIcon } from "react-social-detector";
```

## 🚀 Basic Usage

### Simple Icons

```tsx
import { SocialIcon } from "react-social-detector";

function SimpleIcons() {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <SocialIcon platform="instagram" width={24} height={24} />
      <SocialIcon platform="twitter" width={24} height={24} />
      <SocialIcon platform="linkedin" width={24} height={24} />
      <SocialIcon platform="github" width={24} height={24} />
      <SocialIcon platform="youtube" width={24} height={24} />
    </div>
  );
}
```

## 🔄 Rounded Icons (with circular background)

```tsx
import { SocialIcon } from "react-social-detector";

function RoundedIcons() {
  return (
    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
      <SocialIcon
        platform="instagram"
        type="rounded"
        width={40}
        height={40}
        divProps={{ backgroundColor: "#E4405F" }}
      />
      <SocialIcon
        platform="twitter"
        type="rounded"
        width={40}
        height={40}
        divProps={{ backgroundColor: "#1DA1F2" }}
      />
      <SocialIcon
        platform="linkedin"
        type="rounded"
        width={40}
        height={40}
        divProps={{ backgroundColor: "#0077B5" }}
      />
      <SocialIcon
        platform="github"
        type="rounded"
        width={40}
        height={40}
        divProps={{ backgroundColor: "#333" }}
      />
    </div>
  );
}
```

## 🎨 Color Customization

```tsx
import { SocialIcon } from "react-social-detector";

function CustomColors() {
  return (
    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
      {/* Icon with custom color */}
      <div>
        <h4>Custom Path Color:</h4>
        <SocialIcon
          platform="instagram"
          width={32}
          height={32}
          pathColor="#FF6B6B"
        />
      </div>

      {/* Rounded icon with custom colors */}
      <div>
        <h4>Rounded with Custom Colors:</h4>
        <SocialIcon
          platform="twitter"
          type="rounded"
          width={48}
          height={48}
          pathColor="#FFFFFF"
          divProps={{
            backgroundColor: "#9C27B0",
            className: "custom-social-icon",
          }}
        />
      </div>
    </div>
  );
}
```

## 📱 Social Networks List

```tsx
import { SocialIcon, socialNetworkUtils } from "react-social-detector";

function SocialNetworkList() {
  // Get some popular platforms
  const popularPlatforms = [
    "instagram",
    "twitter",
    "linkedin",
    "github",
    "youtube",
    "tiktok",
    "facebook",
    "discord",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      {popularPlatforms.map((platform) => (
        <div key={platform} style={{ textAlign: "center" }}>
          <SocialIcon
            platform={platform}
            type="rounded"
            width={50}
            height={50}
            divProps={{ backgroundColor: getRandomColor() }}
          />
          <p style={{ marginTop: "8px", fontSize: "12px" }}>
            {socialNetworkUtils.getPlatformDisplayName(platform)}
          </p>
        </div>
      ))}
    </div>
  );
}

// Helper function for random colors
function getRandomColor() {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FECA57",
    "#FF9FF3",
    "#54A0FF",
    "#5F27CD",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
```

## 🔗 Integration with Detection

```tsx
import { useState } from "react";
import { SocialIcon, useReactSocialDetector } from "react-social-detector";

function DetectionWithIcon() {
  const [url, setUrl] = useState("");
  const { result, detect, isDetecting } = useReactSocialDetector();

  const handleDetect = async () => {
    if (url.trim()) {
      await detect(url);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a social media URL..."
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button onClick={handleDetect} disabled={isDetecting}>
          {isDetecting ? "Detecting..." : "Detect"}
        </button>
      </div>

      {result && result.isValid && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <SocialIcon
            platform={result.platform}
            type="rounded"
            width={40}
            height={40}
          />
          <div>
            <strong>{result.displayName}</strong>
            <br />
            <small>Confidence: {result.confidence}</small>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 🎯 Common Use Cases

### Social Media Menu

```tsx
function SocialMenu() {
  const socialLinks = [
    { platform: "instagram", url: "https://instagram.com/myuser" },
    { platform: "twitter", url: "https://twitter.com/myuser" },
    { platform: "linkedin", url: "https://linkedin.com/in/myuser" },
    { platform: "github", url: "https://github.com/myuser" },
  ];

  return (
    <nav style={{ display: "flex", gap: "10px" }}>
      {socialLinks.map(({ platform, url }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "8px",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            transition: "background-color 0.3s",
          }}
        >
          <SocialIcon platform={platform} width={24} height={24} />
        </a>
      ))}
    </nav>
  );
}
```

### Profile Card

```tsx
function ProfileCard({ name, bio, socialLinks }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        maxWidth: "300px",
        textAlign: "center",
      }}
    >
      <h3>{name}</h3>
      <p style={{ color: "#666", marginBottom: "20px" }}>{bio}</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        {Object.entries(socialLinks).map(([platform, url]) => (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcon
              platform={platform}
              type="rounded"
              width={36}
              height={36}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

// Usage:
<ProfileCard
  name="John Silva"
  bio="Full Stack Developer passionate about technology"
  socialLinks={{
    github: "https://github.com/john",
    linkedin: "https://linkedin.com/in/john",
    twitter: "https://twitter.com/john",
  }}
/>;
```

## 🎨 Custom CSS

```css
/* CSS styles for icons */
.social-svg {
  transition: all 0.3s ease;
}

.social-svg:hover {
  transform: scale(1.1);
}

.custom-social-icon {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.custom-social-icon:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
```

## 📝 Tips and Best Practices

### 1. Recommended Sizes

- **Small**: 16x16 or 20x20px for compact menus
- **Medium**: 24x24 or 32x32px for general use
- **Large**: 40x40 or 48x48px for highlights

### 2. Brand Colors

```tsx
const brandColors = {
  instagram: "#E4405F",
  twitter: "#1DA1F2",
  linkedin: "#0077B5",
  github: "#333",
  youtube: "#FF0000",
  tiktok: "#000000",
  facebook: "#1877F2",
  discord: "#5865F2",
};
```

### 3. Accessibility

```tsx
<SocialIcon
  platform="instagram"
  ariaLabel="Follow on Instagram"
  width={24}
  height={24}
  divProps={{
    role: "button",
    tabIndex: 0,
  }}
/>
```

### 4. Loading State

```tsx
function LoadingIcon() {
  return (
    <SocialIcon platform="unknown" width={24} height={24} pathColor="#ccc" />
  );
}
```
