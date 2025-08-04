# Complete Example - React Social Detector

This example demonstrates all the main functionalities of the `react-social-detector` library.

## � Quick Usage Examples

### 🔍 Simple Detection

```typescript
import { quickReactSocialDetector } from "react-social-detector";

// Basic detection
const result = quickReactSocialDetector("instagram.com", "johndoe");

console.log(result);
// {
//   platform: 'instagram',
//   isValid: true,
//   normalizedUrl: 'https://instagram.com/johndoe',
//   displayName: 'Instagram',
//   confidence: 'high',
//   detectionMethod: 'pattern'
// }
```

### ⚛️ React Hook

```tsx
import React, { useState } from "react";
import { useReactSocialDetector } from "react-social-detector";

function SocialDetector() {
  const [url, setUrl] = useState("");
  const { result, isDetecting, detect, error } = useReactSocialDetector();

  const handleDetect = async () => {
    await detect(url);
  };

  return (
    <div>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL..."
      />
      <button onClick={handleDetect} disabled={isDetecting}>
        {isDetecting ? "Detecting..." : "Detect"}
      </button>

      {result && (
        <div>
          <p>Platform: {result.displayName}</p>
          <p>Valid: {result.isValid ? "Yes" : "No"}</p>
          <p>Confidence: {result.confidence}</p>
          {result.normalizedUrl && (
            <a
              href={result.normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {result.normalizedUrl}
            </a>
          )}
        </div>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
```

### 🎨 Icon Component

```tsx
import { SocialIcon } from "react-social-detector";

function MyComponent() {
  return (
    <div>
      {/* Simple icon */}
      <SocialIcon
        platform="instagram"
        width={24}
        height={24}
        pathColor="#E4405F"
      />

      {/* Rounded icon with background */}
      <SocialIcon
        platform="twitter"
        type="rounded"
        width={40}
        height={40}
        divProps={{
          backgroundColor: "#1DA1F2",
          className: "my-social-icon",
        }}
      />
    </div>
  );
}
```

### 📊 Basic Bulk Detection

```tsx
import { useBulkReactSocialDetector } from "react-social-detector";

function BulkDetector() {
  const { results, isDetecting, progress, detectBulk } =
    useBulkReactSocialDetector({
      maxConcurrent: 5,
    });

  const handleBulkDetection = async () => {
    const items = [
      { id: "1", input: "instagram.com/user1" },
      { id: "2", input: "twitter.com/user2" },
      { id: "3", input: "linkedin.com/in/user3" },
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

      {results.map(({ id, input, result }) => (
        <div key={id}>
          {input}: {result.platform}
        </div>
      ))}
    </div>
  );
}
```

## �🚀 Complete Demo Application

```tsx
import React, { useState, useEffect } from "react";
import {
  useReactSocialDetector,
  useBulkReactSocialDetector,
  SocialIcon,
  socialNetworkUtils,
  quickReactSocialDetector,
} from "react-social-detector";

// Main demo component
function ReactSocialDetectorDemo() {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        🔍 React Social Detector - Complete Demo
      </h1>

      <div style={{ display: "grid", gap: "30px" }}>
        <SingleDetectionDemo />
        <BulkDetectionDemo />
        <SocialIconsDemo />
        <UtilsFunctionsDemo />
        <AllPlatformsDemo />
      </div>
    </div>
  );
}

// 1. Single detection demonstration
function SingleDetectionDemo() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const { result, isDetecting, error, detect, clear, extractUsername } =
    useReactSocialDetector({
      debounceMs: 300,
      extractMetadata: true,
    });

  const handleDetect = async () => {
    if (url.trim()) {
      await detect(url, username);
    }
  };

  const handleExtractUsername = () => {
    if (url.trim()) {
      const extracted = extractUsername(url);
      if (extracted) {
        setUsername(extracted);
      }
    }
  };

  return (
    <section
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}
    >
      <h2>🔍 Individual Detection</h2>

      <div style={{ display: "grid", gap: "15px", marginBottom: "20px" }}>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            URL or Domain:
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Ex: instagram.com/username"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Username (optional):
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ex: myuser"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={handleDetect}
          disabled={isDetecting || !url.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: isDetecting ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isDetecting ? "not-allowed" : "pointer",
          }}
        >
          {isDetecting ? "Detecting..." : "Detect"}
        </button>

        <button
          onClick={handleExtractUsername}
          disabled={!url.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: url.trim() ? "pointer" : "not-allowed",
          }}
        >
          Extract Username
        </button>

        <button
          onClick={clear}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          Error: {error}
        </div>
      )}

      {result && (
        <div
          style={{
            padding: "15px",
            backgroundColor: result.isValid ? "#d4edda" : "#f8d7da",
            border: `1px solid ${result.isValid ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <SocialIcon
              platform={
                result.platform !== "unknown" ? result.platform : "unknown"
              }
              type="rounded"
              width={40}
              height={40}
            />
            <div>
              <h4 style={{ margin: 0 }}>
                {result.displayName || result.platform}
              </h4>
              <small>
                Confidence: {result.confidence} | Method:{" "}
                {result.detectionMethod}
              </small>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <div>
              <strong>Valid:</strong> {result.isValid ? "Yes" : "No"}
            </div>
            <div>
              <strong>Platform:</strong> {result.platform}
            </div>
            {result.normalizedUrl && (
              <div style={{ gridColumn: "1 / -1" }}>
                <strong>Generated URL:</strong>
                <a
                  href={result.normalizedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "5px" }}
                >
                  {result.normalizedUrl}
                </a>
              </div>
            )}
            {result.metadata?.extractedUsername && (
              <div>
                <strong>Username:</strong> {result.metadata.extractedUsername}
              </div>
            )}
            {result.metadata?.processingTime && (
              <div>
                <strong>Time:</strong> {result.metadata.processingTime}ms
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// 2. Bulk detection demonstration
function BulkDetectionDemo() {
  const [urlList, setUrlList] = useState(
    "instagram.com/user1\ntwitter.com/user2\nlinkedin.com/in/user3\ngithub.com/user4"
  );
  const { results, isDetecting, progress, detectBulk, clear } =
    useBulkReactSocialDetector({
      maxConcurrent: 3,
    });

  const handleBulkDetect = async () => {
    const urls = urlList.split("\n").filter((url) => url.trim());
    const items = urls.map((url, index) => ({
      id: String(index + 1),
      input: url.trim(),
    }));

    if (items.length > 0) {
      await detectBulk(items);
    }
  };

  return (
    <section
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}
    >
      <h2>📊 Bulk Detection</h2>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          URLs (one per line):
        </label>
        <textarea
          value={urlList}
          onChange={(e) => setUrlList(e.target.value)}
          placeholder="Insert one URL per line..."
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={handleBulkDetect}
          disabled={isDetecting || !urlList.trim()}
          style={{
            padding: "10px 20px",
            backgroundColor: isDetecting ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isDetecting ? "not-allowed" : "pointer",
          }}
        >
          {isDetecting ? "Processing..." : "Bulk Detect"}
        </button>

        <button
          onClick={clear}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear Results
        </button>
      </div>

      {isDetecting && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e2e3e5",
            border: "1px solid #d6d8db",
            borderRadius: "4px",
            marginBottom: "15px",
          }}
        >
          Progress: {progress.completed}/{progress.total} URLs processed
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: "grid", gap: "10px" }}>
          {results.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: item.result.isValid ? "#f8f9fa" : "#fff3cd",
              }}
            >
              <SocialIcon
                platform={
                  item.result.platform !== "unknown"
                    ? item.result.platform
                    : "unknown"
                }
                width={24}
                height={24}
              />
              <div style={{ flex: 1 }}>
                <strong>{item.input}</strong> →{" "}
                {item.result.displayName || item.result.platform}
                {item.error && (
                  <span style={{ color: "#dc3545" }}>
                    {" "}
                    (Error: {item.error})
                  </span>
                )}
              </div>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  backgroundColor: item.result.isValid ? "#28a745" : "#dc3545",
                  color: "white",
                }}
              >
                {item.result.confidence}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// 3. Icons demonstration
function SocialIconsDemo() {
  const [selectedPlatform, setSelectedPlatform] = useState("instagram");
  const [iconSize, setIconSize] = useState(32);
  const [iconType, setIconType] = useState("simple");
  const [customColor, setCustomColor] = useState("#333333");

  const platforms = socialNetworkUtils.getAllPlatformKeys().slice(0, 12); // First 12 platforms

  return (
    <section
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}
    >
      <h2>🎨 SocialIcon Component</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Controls */}
        <div>
          <h4>Controls:</h4>
          <div style={{ display: "grid", gap: "10px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Platform:
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              >
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {socialNetworkUtils.getPlatformDisplayName(platform)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Size: {iconSize}px
              </label>
              <input
                type="range"
                min="16"
                max="64"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Type:
              </label>
              <select
                value={iconType}
                onChange={(e) => setIconType(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              >
                <option value="simple">Simple</option>
                <option value="rounded">Rounded</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Color:
              </label>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                style={{ width: "100%", height: "40px" }}
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div style={{ textAlign: "center" }}>
          <h4>Preview:</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              border: "2px dashed #ddd",
              borderRadius: "8px",
            }}
          >
            <SocialIcon
              platform={selectedPlatform}
              type={iconType === "rounded" ? "rounded" : undefined}
              width={iconSize}
              height={iconSize}
              pathColor={customColor}
              divProps={
                iconType === "rounded"
                  ? { backgroundColor: customColor }
                  : undefined
              }
            />
          </div>
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            {socialNetworkUtils.getPlatformDisplayName(selectedPlatform)}
          </p>
        </div>
      </div>

      {/* Icon gallery */}
      <div>
        <h4>Icon Gallery:</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            gap: "15px",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          {platforms.map((platform) => (
            <div key={platform} style={{ textAlign: "center" }}>
              <div style={{ marginBottom: "5px" }}>
                <SocialIcon
                  platform={platform}
                  type="rounded"
                  width={32}
                  height={32}
                />
              </div>
              <small style={{ fontSize: "10px" }}>
                {socialNetworkUtils.getPlatformDisplayName(platform)}
              </small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. Utility functions demonstration
function UtilsFunctionsDemo() {
  const [testInput, setTestInput] = useState("instagram.com");
  const [testPlatform, setTestPlatform] = useState("instagram");
  const [testUsername, setTestUsername] = useState("testuser");

  return (
    <section
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}
    >
      <h2>🔧 Utility Functions</h2>

      <div style={{ display: "grid", gap: "20px" }}>
        {/* Function testing */}
        <div>
          <h4>Test Functions:</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Input:
              </label>
              <input
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Platform:
              </label>
              <input
                value={testPlatform}
                onChange={(e) => setTestPlatform(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Username:
              </label>
              <input
                value={testUsername}
                onChange={(e) => setTestUsername(e.target.value)}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          <h4 style={{ fontFamily: "Arial", marginBottom: "10px" }}>
            Results:
          </h4>
          <div style={{ display: "grid", gap: "5px" }}>
            <div>
              <strong>isPlatformSupported('{testPlatform}'):</strong>{" "}
              {String(socialNetworkUtils.isPlatformSupported(testPlatform))}
            </div>
            <div>
              <strong>getPlatformDisplayName('{testPlatform}'):</strong>{" "}
              {socialNetworkUtils.isPlatformSupported(testPlatform)
                ? socialNetworkUtils.getPlatformDisplayName(testPlatform)
                : "N/A"}
            </div>
            <div>
              <strong>normalizeUrl('{testInput}'):</strong>{" "}
              {socialNetworkUtils.normalizeUrl(testInput)}
            </div>
            <div>
              <strong>extractDomain('{testInput}'):</strong>{" "}
              {socialNetworkUtils.extractDomain(testInput) || "null"}
            </div>
            <div>
              <strong>
                validateUsername('{testUsername}', '{testPlatform}'):
              </strong>{" "}
              {socialNetworkUtils.isPlatformSupported(testPlatform)
                ? String(
                    socialNetworkUtils.validateUsername(
                      testUsername,
                      testPlatform
                    )
                  )
                : "N/A"}
            </div>
            <div>
              <strong>
                generateProfileUrl('{testPlatform}', '{testUsername}'):
              </strong>{" "}
              {socialNetworkUtils.isPlatformSupported(testPlatform)
                ? socialNetworkUtils.generateProfileUrl(
                    testPlatform,
                    testUsername
                  ) || "null"
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. All platforms demonstration
function AllPlatformsDemo() {
  const allPlatforms = socialNetworkUtils.getAllPlatforms();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlatforms = allPlatforms.filter(
    (platform) =>
      platform.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}
    >
      <h2>🌐 All Supported Platforms ({allPlatforms.length})</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search platform..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "10px",
        }}
      >
        {filteredPlatforms.map((platform) => (
          <div
            key={platform.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              border: "1px solid #eee",
              borderRadius: "6px",
              backgroundColor: "#fff",
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.borderColor = "#ccc";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.style.borderColor = "#eee";
            }}
            onClick={() => {
              // Quick detection example
              const result = quickReactSocialDetector(platform.exampleDomain);
              alert(
                `Quick detection: ${result.displayName} - ${
                  result.isValid ? "Valid" : "Invalid"
                }`
              );
            }}
          >
            <SocialIcon platform={platform.key} width={24} height={24} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold" }}>{platform.displayName}</div>
              <small style={{ color: "#666" }}>{platform.exampleDomain}</small>
            </div>
          </div>
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          No platforms found for "{searchTerm}"
        </div>
      )}
    </section>
  );
}

export default ReactSocialDetectorDemo;
```

## 🎯 How to Use This Example

1. **Install the library:**

   ```bash
   npm install react-social-detector
   ```

2. **Copy the code above** to a `ReactSocialDetectorDemo.tsx` file

3. **Import and use** in your App:

   ```tsx
   import ReactSocialDetectorDemo from "./ReactSocialDetectorDemo";

   function App() {
     return <ReactSocialDetectorDemo />;
   }
   ```

## 📚 What This Example Demonstrates

### 🔍 Individual Detection

- `useReactSocialDetector` hook with debounce
- Metadata extraction
- Error handling
- Automatic username extraction

### 📊 Bulk Detection

- `useBulkReactSocialDetector` hook
- Concurrency control
- Progress tracking
- Multiple URL handling

### 🎨 SocialIcon Component

- Simple and rounded icons
- Color and size customization
- Real-time preview
- Icon gallery

### 🔧 Utility Functions

- All `socialNetworkUtils` functions
- Interactive testing
- Practical examples

### 🌐 Supported Platforms

- Complete platform list
- Search and filter
- Quick detection with click

## 🚀 Next Steps

- Try different URLs and parameters
- Customize styles for your application
- Add your own functionalities
- Integrate with your backend API

## 💡 Performance Tips

- Use debounce to avoid too many calls
- Configure `maxConcurrent` appropriately for bulk
- Cache results when possible
- Use `strictMode: false` for faster detection
