## 🔧 Basic Usage

### JavaScript/TypeScript

```typescript
import { quickReactSocialDetector } from "react-social-detector";

// Simple detection
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

### React Hook

```tsx
import React, { useState } from "react";
import { useReactSocialDetector } from "react-social-detector";

function App() {
  const { result, isDetecting, error, detect } = useReactSocialDetector();

  const handleDetect = async () => {
    await detect(url, "username");
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
            <a href={result.normalizedUrl} target="_blank">
              {result.normalizedUrl}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
```
