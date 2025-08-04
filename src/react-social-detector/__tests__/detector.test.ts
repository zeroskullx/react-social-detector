import { beforeEach, describe, expect, it } from 'vitest'

import {
	quickReactSocialDetector,
	ReactSocialDetector,
	reactSocialDetector,
} from '../lib/detector'
import type { DetectionOptions } from '../lib/types'

describe('React Social Detector', () => {
	let detector: ReactSocialDetector

	beforeEach(() => {
		detector = new ReactSocialDetector()
	})

	describe('Basic Detection', () => {
		it('should detect Instagram correctly', () => {
			const result = detector.detect('https://instagram.com/testuser')

			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
			expect(result.displayName).toBe('Instagram')
			expect(result.confidence).toBe('high')
			expect(result.detectionMethod).toBe('pattern')
		})

		it('should detect Twitter/X correctly', () => {
			const result = detector.detect('https://x.com/testuser')

			expect(result.platform).toBe('twitter')
			expect(result.isValid).toBe(true)
			expect(result.displayName).toBe('X (Twitter)')
			expect(result.confidence).toBe('high')
		})

		it('should detect YouTube correctly', () => {
			const result = detector.detect('https://youtube.com/@testuser')

			expect(result.platform).toBe('youtube')
			expect(result.isValid).toBe(true)
			expect(result.displayName).toBe('YouTube')
			expect(result.confidence).toBe('high')
		})

		it('should detect GitHub correctly', () => {
			const result = detector.detect('https://github.com/testuser')

			expect(result.platform).toBe('github')
			expect(result.isValid).toBe(true)
			expect(result.displayName).toBe('GitHub')
			expect(result.confidence).toBe('high')
		})

		it('should handle unknown domains', () => {
			const result = detector.detect('https://unknown-social-site.com/user')

			expect(result.platform).toBe('unknown')
			expect(result.isValid).toBe(false)
			expect(result.confidence).toBe('low')
			expect(result.detectionMethod).toBe('none')
		})
	})

	describe('URL Normalization', () => {
		it('should handle URLs without protocol', () => {
			const result = detector.detect('instagram.com/testuser')

			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})

		it('should handle URLs with different protocols', () => {
			const result = detector.detect('http://instagram.com/testuser')

			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})

		it('should handle URLs with subdomains', () => {
			const result = detector.detect('https://www.instagram.com/testuser')

			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})
	})

	describe('Username Generation', () => {
		it('should generate normalized URL with username', () => {
			const result = detector.detect('https://instagram.com', 'testuser')

			expect(result.normalizedUrl).toBe('https://instagram.com/testuser')
		})

		it('should handle platforms with username prefix', () => {
			const result = detector.detect('https://youtube.com', 'testuser')

			expect(result.normalizedUrl).toBe('https://youtube.com/@testuser')
		})

		it('should not duplicate username prefix', () => {
			const result = detector.detect('https://youtube.com', '@testuser')

			expect(result.normalizedUrl).toBe('https://youtube.com/@testuser')
		})
	})

	describe('Username Extraction', () => {
		it('should extract username from Instagram URL', () => {
			const username = detector.extractUsername(
				'https://instagram.com/testuser'
			)
			expect(username).toBe('testuser')
		})

		it('should extract username from Twitter URL', () => {
			const username = detector.extractUsername('https://x.com/testuser')
			expect(username).toBe('testuser')
		})

		it('should extract username from YouTube URL', () => {
			const username = detector.extractUsername('https://youtube.com/@testuser')
			expect(username).toBe('testuser')
		})

		it('should extract username from LinkedIn URL', () => {
			const username = detector.extractUsername(
				'https://linkedin.com/in/testuser'
			)
			expect(username).toBe('testuser')
		})

		it('should handle URLs with query parameters', () => {
			const username = detector.extractUsername(
				'https://instagram.com/testuser?utm_source=test'
			)
			expect(username).toBe('testuser')
		})

		it('should return null for invalid URLs', () => {
			const username = detector.extractUsername('invalid-url')
			expect(username).toBe(null)
		})
	})

	describe('Platform Validation', () => {
		it('should validate correct platform', () => {
			const isValid = detector.validatePlatform(
				'https://instagram.com/test',
				'instagram'
			)
			expect(isValid).toBe(true)
		})

		it('should reject incorrect platform', () => {
			const isValid = detector.validatePlatform(
				'https://instagram.com/test',
				'facebook'
			)
			expect(isValid).toBe(false)
		})

		it('should reject unknown domains', () => {
			const isValid = detector.validatePlatform(
				'https://unknown.com/test',
				'instagram'
			)
			expect(isValid).toBe(false)
		})
	})

	describe('Profile URL Generation', () => {
		it('should generate correct Instagram profile URL', () => {
			const url = detector.generateProfileUrl('instagram', 'testuser')
			expect(url).toBe('https://instagram.com/testuser')
		})

		it('should generate correct YouTube profile URL', () => {
			const url = detector.generateProfileUrl('youtube', 'testuser')
			expect(url).toBe('https://youtube.com/@testuser')
		})

		it('should handle empty username', () => {
			const url = detector.generateProfileUrl('instagram', '')
			expect(url).toBe(null)
		})

		it('should handle whitespace in username', () => {
			const url = detector.generateProfileUrl('instagram', '  testuser  ')
			expect(url).toBe('https://instagram.com/testuser')
		})
	})

	describe('Supported Platforms', () => {
		it('should return all supported platforms', () => {
			const platforms = detector.getSupportedPlatforms()

			expect(Array.isArray(platforms)).toBe(true)
			expect(platforms.length).toBeGreaterThan(0)

			platforms.forEach((platform) => {
				expect(platform).toHaveProperty('key')
				expect(platform).toHaveProperty('displayName')
				expect(platform).toHaveProperty('exampleDomain')
				expect(platform).toHaveProperty('baseUrl')
			})
		})

		it('should include major platforms', () => {
			const platforms = detector.getSupportedPlatforms()
			const platformKeys = platforms.map((p) => p.key)

			const majorPlatforms = [
				'instagram',
				'facebook',
				'twitter',
				'youtube',
				'linkedin',
				'github',
			]
			majorPlatforms.forEach((platform) => {
				expect(platformKeys).toContain(platform)
			})
		})
	})

	describe('Detection Options', () => {
		it('should respect extractMetadata option', () => {
			const result = detector.detect('https://instagram.com/test', 'testuser', {
				extractMetadata: true,
			})

			expect(result.metadata).toBeDefined()
			expect(result.metadata?.originalInput).toBe('https://instagram.com/test')
			expect(result.metadata?.extractedUsername).toBe('testuser')
			expect(typeof result.metadata?.processingTime).toBe('number')
		})

		it('should not include metadata by default', () => {
			const result = detector.detect('https://instagram.com/test', 'testuser')

			expect(result.metadata).toBeUndefined()
		})
	})

	describe('Error Handling', () => {
		it('should handle invalid input gracefully', () => {
			const result = detector.detect('')

			expect(result.platform).toBe('unknown')
			expect(result.isValid).toBe(false)
		})

		it('should handle null input', () => {
			// @ts-expect-error Testing invalid input type intentionally
			const result = detector.detect(null)

			expect(result.platform).toBe('unknown')
			expect(result.isValid).toBe(false)
		})

		it('should handle undefined input', () => {
			// @ts-expect-error Testing invalid input type intentionally
			const result = detector.detect(undefined)

			expect(result.platform).toBe('unknown')
			expect(result.isValid).toBe(false)
		})
	})

	describe('Edge Cases', () => {
		it('should handle very long URLs', () => {
			const longUrl = `https://instagram.com/${'a'.repeat(1000)}`
			const result = detector.detect(longUrl)

			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})

		it('should handle URLs with special characters', () => {
			const result = detector.detect('https://instagram.com/test_user.123')

			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})

		it('should handle mixed case domains', () => {
			const result = detector.detect('https://INSTAGRAM.COM/testuser')

			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})
	})
})

describe('Singleton Instance', () => {
	it('should provide working singleton instance', () => {
		const result = reactSocialDetector.detect('https://instagram.com/test')

		expect(result.platform).toBe('instagram')
		expect(result.isValid).toBe(true)
	})
})

describe('Standalone Function', () => {
	it('should provide working standalone function', () => {
		const result = quickReactSocialDetector('https://instagram.com/test')

		expect(result.platform).toBe('instagram')
		expect(result.isValid).toBe(true)
	})

	it('should accept detection options', () => {
		const options: DetectionOptions = { extractMetadata: true }
		const result = quickReactSocialDetector(
			'https://instagram.com/test',
			'testuser',
			options
		)

		expect(result.metadata).toBeDefined()
	})
})
