// Basic usage examples for react-social-detector library

// For Node.js (CommonJS)
const {
	quickReactSocialDetector,
	detectMultipleSocialNetworks,
	getSupportedPlatforms,
} = require('react-social-detector')

// For ES Modules
// import { quickReactSocialDetector, detectMultipleSocialNetworks, getSupportedPlatforms } from 'react-social-detector';

console.log('🔍 Detect Social Network - Basic Usage Examples\n')

// Example 1: Single URL detection
console.log('📍 Example 1: Single URL Detection')
const singleUrl = 'https://youtube.com/@username'
const result = quickReactSocialDetector(singleUrl)
console.log(`URL: ${singleUrl}`)
console.log('Result:', result)
console.log('')

// Example 2: Multiple URLs detection
console.log('📍 Example 2: Multiple URLs Detection')
const urls = [
	'https://youtube.com/@creator',
	'https://instagram.com/user',
	'https://twitter.com/handle',
	'https://linkedin.com/in/profile',
	'https://invalid-url.com',
]

const multipleResults = detectMultipleSocialNetworks(urls)
console.log('URLs:', urls)
console.log('Results:', multipleResults)
console.log('')

// Example 3: Get supported platforms
console.log('📍 Example 3: Supported Platforms')
const platforms = getSupportedPlatforms()
console.log(`Total supported platforms: ${platforms.length}`)
console.log('Platforms:', platforms.slice(0, 10).join(', '), '...')
console.log('')

// Example 4: Validation examples
console.log('📍 Example 4: URL Validation Examples')
const testUrls = [
	'https://youtube.com/@validuser',
	'https://youtube.com/invalidpath',
	'https://instagram.com/user123',
	'https://notasocialnetwork.com/user',
]

testUrls.forEach((url) => {
	const detection = quickReactSocialDetector(url)
	console.log(
		`${url} -> ${detection ? `✅ ${detection.name}` : '❌ Not detected'}`
	)
})
console.log('')

// Example 5: Extract username (if available)
console.log('📍 Example 5: Username Extraction')
const urlsWithUsernames = [
	'https://github.com/username',
	'https://twitter.com/handle',
	'https://instagram.com/profile',
]

urlsWithUsernames.forEach((url) => {
	const detection = quickReactSocialDetector(url)
	if (detection) {
		// Simple username extraction from URL
		const username = url.split('/').pop()
		console.log(`${detection.name}: ${username}`)
	}
})
console.log('')

console.log('✨ All examples completed!')
