// Basic usage examples for react-social-detector library

// For Node.js (CommonJS)
const {
	quickReactSocialDetector,
	ReactSocialDetector,
	reactSocialDetector,
	socialNetworkUtils,
	SOCIAL_NETWORKS_PATTERNS,
} = require('react-social-detector')

// For ES Modules
// import { quickReactSocialDetector, ReactSocialDetector, reactSocialDetector, socialNetworkUtils, SOCIAL_NETWORKS_PATTERNS } from 'react-social-detector';

console.log('🔍 React Social Detector - Basic Usage Examples\n')

// Example 1: Quick detection with standalone function
console.log('📍 Example 1: Quick Detection')
const singleUrl = 'https://youtube.com/@username'
const result = quickReactSocialDetector(singleUrl)
console.log(`URL: ${singleUrl}`)
console.log('Result:', result)
console.log('')

// Example 2: Using the detector instance
console.log('📍 Example 2: Using Detector Instance')
const urls = [
	'https://youtube.com/@creator',
	'https://instagram.com/user',
	'https://twitter.com/handle',
	'https://linkedin.com/in/profile',
	'https://github.com/developer',
]

urls.forEach((url) => {
	const detection = reactSocialDetector.detect(url)
	console.log(
		`${url} -> ${detection.isValid ? `✅ ${detection.displayName}` : '❌ Unknown'}`
	)
})
console.log('')

// Example 3: Get supported platforms using utils
console.log('📍 Example 3: Supported Platforms')
const platforms = socialNetworkUtils.getAllPlatforms()
console.log(`Total supported platforms: ${platforms.length}`)
console.log(
	'First 10 platforms:',
	platforms
		.slice(0, 10)
		.map((p) => p.displayName)
		.join(', ')
)
console.log('')

// Example 4: URL validation and username extraction
console.log('📍 Example 4: URL Validation & Username Extraction')
const testUrls = [
	'https://youtube.com/@validuser',
	'https://instagram.com/user123',
	'https://github.com/developer',
	'https://notasocialnetwork.com/user',
]

testUrls.forEach((url) => {
	const detection = reactSocialDetector.detect(url)
	if (detection.isValid) {
		const username = reactSocialDetector.extractUsername(url)
		console.log(`✅ ${detection.displayName}: ${username || 'N/A'}`)
	} else {
		console.log(`❌ ${url} -> Not detected`)
	}
})
console.log('')

// Example 5: Generate profile URLs
console.log('📍 Example 5: Generate Profile URLs')
const usernames = [
	{ platform: 'instagram', username: 'myprofile' },
	{ platform: 'youtube', username: 'mychannel' },
	{ platform: 'github', username: 'mycode' },
]

usernames.forEach(({ platform, username }) => {
	const profileUrl = reactSocialDetector.generateProfileUrl(platform, username)
	console.log(`${platform}: ${profileUrl}`)
})
console.log('')

// Example 6: Check platform support
console.log('📍 Example 6: Platform Support Checks')
const platformsToCheck = ['instagram', 'tiktok', 'unknown-platform']

platformsToCheck.forEach((platform) => {
	const isSupported = socialNetworkUtils.isPlatformSupported(platform)
	const displayName = isSupported
		? socialNetworkUtils.getPlatformDisplayName(platform)
		: 'N/A'
	console.log(
		`${platform}: ${isSupported ? `✅ ${displayName}` : '❌ Not supported'}`
	)
})
console.log('')

// Example 7: Bulk detection with instance
console.log('📍 Example 7: Bulk Detection')
const bulkUrls = [
	'https://twitter.com/user1',
	'https://instagram.com/user2',
	'invalid-url',
	'https://github.com/user3',
]

const detector = new ReactSocialDetector()
bulkUrls.forEach((url, index) => {
	const result = detector.detect(url)
	console.log(`${index + 1}. ${url}`)
	console.log(`   Platform: ${result.platform}`)
	console.log(`   Valid: ${result.isValid}`)
	console.log(`   Confidence: ${result.confidence}`)
	console.log('')
})

// Example 8: Pattern information
console.log('📍 Example 8: Pattern Information')
const availablePatterns = Object.keys(SOCIAL_NETWORKS_PATTERNS)
console.log(`Available patterns: ${availablePatterns.length}`)
console.log('Sample patterns:', availablePatterns.slice(0, 8).join(', '))
console.log('')

console.log('✨ All examples completed!')
console.log('📚 For React usage examples, see the React hooks documentation.')
