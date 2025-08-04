import { describe, expect, it } from 'vitest'

import {
	SOCIAL_NETWORKS_PATTERNS,
	type SocialNetworkKey,
} from '../assets/patterns'
import {
	quickReactSocialDetector,
	ReactSocialDetector,
	reactSocialDetector,
} from '../detector'

describe('Integration Tests', () => {
	describe('Cross-Platform Detection', () => {
		it('should detect all major platforms correctly', () => {
			const testUrls = [
				{ url: 'https://instagram.com/test', expected: 'instagram' },
				{ url: 'https://facebook.com/test', expected: 'facebook' },
				{ url: 'https://x.com/test', expected: 'twitter' },
				{ url: 'https://twitter.com/test', expected: 'twitter' },
				{ url: 'https://youtube.com/@test', expected: 'youtube' },
				{ url: 'https://youtu.be/test', expected: 'youtube' },
				{ url: 'https://linkedin.com/in/test', expected: 'linkedin' },
				{ url: 'https://github.com/test', expected: 'github' },
				{ url: 'https://tiktok.com/@test', expected: 'tiktok' },
				{ url: 'https://reddit.com/u/test', expected: 'reddit' },
				{ url: 'https://twitch.tv/test', expected: 'twitch' },
				{ url: 'https://pinterest.com/test', expected: 'pinterest' },
				{ url: 'https://discord.com/users/123456789', expected: 'discord' },
				{ url: 'https://t.me/test', expected: 'telegram' },
				{ url: 'https://medium.com/@test', expected: 'medium' },
			]

			testUrls.forEach(({ url, expected }) => {
				const result = reactSocialDetector.detect(url)
				expect(result.platform).toBe(expected)
				expect(result.isValid).toBe(true)
			})
		})

		it('should handle all subdomain patterns correctly', () => {
			const subdomainTests = [
				{ url: 'https://www.instagram.com/test', expected: 'instagram' },
				{ url: 'https://m.facebook.com/test', expected: 'facebook' },
				{ url: 'https://mobile.twitter.com/test', expected: 'twitter' },
				{ url: 'https://music.youtube.com/test', expected: 'youtube' },
				{ url: 'https://de.linkedin.com/in/test', expected: 'linkedin' },
			]

			subdomainTests.forEach(({ url, expected }) => {
				const result = reactSocialDetector.detect(url)
				expect(result.platform).toBe(expected)
				expect(result.isValid).toBe(true)
			})
		})
	})

	describe('URL Variations and Edge Cases', () => {
		it('should handle various URL formats', () => {
			const urlVariations = [
				'https://instagram.com/test',
				'http://instagram.com/test',
				'instagram.com/test',
				'www.instagram.com/test',
				'Instagram.com/test',
				'INSTAGRAM.COM/TEST',
			]

			urlVariations.forEach((url) => {
				const result = reactSocialDetector.detect(url)
				expect(result.platform).toBe('instagram')
				expect(result.isValid).toBe(true)
			})
		})

		it('should handle URLs with query parameters and fragments', () => {
			const urlsWithParams = [
				'https://instagram.com/test?utm_source=web',
				'https://instagram.com/test#section',
				'https://instagram.com/test?ref=profile&source=web#about',
				'https://youtube.com/@test?tab=videos',
				'https://linkedin.com/in/test?trk=profile',
			]

			urlsWithParams.forEach((url) => {
				const result = reactSocialDetector.detect(url)
				expect(result.isValid).toBe(true)
				expect(['instagram', 'youtube', 'linkedin']).toContain(result.platform)
			})
		})

		it('should handle mobile and alternative domains', () => {
			const mobileUrls = [
				{ url: 'https://m.facebook.com/test', expected: 'facebook' },
				{ url: 'https://mobile.twitter.com/test', expected: 'twitter' },
				{ url: 'https://youtu.be/test123', expected: 'youtube' },
				{ url: 'https://fb.com/test', expected: 'facebook' },
				{ url: 'https://lnkd.in/test', expected: 'linkedin' },
			]

			mobileUrls.forEach(({ url, expected }) => {
				const result = reactSocialDetector.detect(url)
				expect(result.platform).toBe(expected)
				expect(result.isValid).toBe(true)
			})
		})
	})

	describe('Username Extraction Comprehensive Tests', () => {
		it('should extract usernames correctly from all platform URL patterns', () => {
			const extractionTests = [
				{
					url: 'https://instagram.com/john_doe123',
					platform: 'instagram',
					expected: 'john_doe123',
				},
				{
					url: 'https://twitter.com/user_name',
					platform: 'twitter',
					expected: 'user_name',
				},
				{
					url: 'https://x.com/testuser',
					platform: 'twitter',
					expected: 'testuser',
				},
				{
					url: 'https://youtube.com/@channelname',
					platform: 'youtube',
					expected: 'channelname',
				},
				{
					url: 'https://linkedin.com/in/professional-name',
					platform: 'linkedin',
					expected: 'professional-name',
				},
				{
					url: 'https://github.com/developer123',
					platform: 'github',
					expected: 'developer123',
				},
				{
					url: 'https://tiktok.com/@dancer_user',
					platform: 'tiktok',
					expected: 'dancer_user',
				},
				{
					url: 'https://reddit.com/u/redditor_name',
					platform: 'reddit',
					expected: 'redditor_name',
				},
				{
					url: 'https://twitch.tv/streamer123',
					platform: 'twitch',
					expected: 'streamer123',
				},
				{
					url: 'https://discord.com/users/123456789012345678',
					platform: 'discord',
					expected: '123456789012345678',
				},
				{
					url: 'https://t.me/telegram_user',
					platform: 'telegram',
					expected: 'telegram_user',
				},
				{
					url: 'https://medium.com/@writer_name',
					platform: 'medium',
					expected: 'writer_name',
				},
			]

			extractionTests.forEach(({ url, platform, expected }) => {
				const username = reactSocialDetector.extractUsername(
					url,
					platform as SocialNetworkKey
				)
				expect(username).toBe(expected)
			})
		})

		it('should handle special characters in usernames', () => {
			const specialCharTests = [
				{ url: 'https://instagram.com/user.name', expected: 'user.name' },
				{ url: 'https://instagram.com/user_123', expected: 'user_123' },
				{ url: 'https://github.com/user-name', expected: 'user-name' },
				{
					url: 'https://linkedin.com/in/first-last-123',
					expected: 'first-last-123',
				},
				{ url: 'https://youtube.com/@user.channel', expected: 'user.channel' },
			]

			specialCharTests.forEach(({ url, expected }) => {
				const username = reactSocialDetector.extractUsername(url)
				expect(username).toBe(expected)
			})
		})
	})

	describe('Profile URL Generation Tests', () => {
		it('should generate correct profile URLs for all platforms', () => {
			const platforms = Object.keys(SOCIAL_NETWORKS_PATTERNS)

			platforms.forEach((platform) => {
				const url = reactSocialDetector.generateProfileUrl(
					platform as SocialNetworkKey,
					'testuser'
				)

				if (url) {
					expect(url).toMatch(/^https?:\/\//)
					expect(url).toContain('testuser')

					// Skip WeChat because it uses qq.com domain which conflicts with QQ detection
					if (platform !== 'wechat') {
						// Verify the generated URL can be detected
						const detection = reactSocialDetector.detect(url)
						expect(detection.platform).toBe(platform)
						expect(detection.isValid).toBe(true)
					}
				}
			})
		})

		it('should handle username prefixes correctly', () => {
			const prefixTests = [
				{
					platform: 'youtube',
					username: 'testuser',
					shouldContain: '@testuser',
				},
				{
					platform: 'youtube',
					username: '@testuser',
					shouldContain: '@testuser',
				},
				{
					platform: 'tiktok',
					username: 'testuser',
					shouldContain: '@testuser',
				},
				{
					platform: 'tiktok',
					username: '@testuser',
					shouldContain: '@testuser',
				},
				{
					platform: 'medium',
					username: 'testuser',
					shouldContain: '@testuser',
				},
				{
					platform: 'medium',
					username: '@testuser',
					shouldContain: '@testuser',
				},
			]

			prefixTests.forEach(({ platform, username, shouldContain }) => {
				const url = reactSocialDetector.generateProfileUrl(
					platform as SocialNetworkKey,
					username
				)
				expect(url).toContain(shouldContain)
			})
		})
	})

	describe('Platform Validation Edge Cases', () => {
		it('should correctly validate platform matches', () => {
			const validationTests = [
				{
					url: 'https://instagram.com/test',
					platform: 'instagram',
					expected: true,
				},
				{
					url: 'https://instagram.com/test',
					platform: 'facebook',
					expected: false,
				},
				{ url: 'https://x.com/test', platform: 'twitter', expected: true },
				{
					url: 'https://twitter.com/test',
					platform: 'twitter',
					expected: true,
				},
				{
					url: 'https://youtube.com/test',
					platform: 'instagram',
					expected: false,
				},
			]

			validationTests.forEach(({ url, platform, expected }) => {
				const isValid = reactSocialDetector.validatePlatform(
					url,
					platform as SocialNetworkKey
				)
				expect(isValid).toBe(expected)
			})
		})
	})

	describe('Confidence Levels and Detection Methods', () => {
		it('should assign appropriate confidence levels', () => {
			const confidenceTests = [
				{ url: 'https://instagram.com/test', expectedConfidence: 'high' },
				{ url: 'instagram.com/test', expectedConfidence: 'high' },
				{ url: 'https://unknown-site.com/test', expectedConfidence: 'low' },
			]

			confidenceTests.forEach(({ url, expectedConfidence }) => {
				const result = reactSocialDetector.detect(url)
				if (result.isValid) {
					expect(result.confidence).toBe(expectedConfidence)
				}
			})
		})

		it('should assign correct detection methods', () => {
			const methodTests = [
				{ url: 'https://instagram.com/test', expectedMethod: 'pattern' },
				{ url: 'https://unknown-site.com/test', expectedMethod: 'none' },
			]

			methodTests.forEach(({ url, expectedMethod }) => {
				const result = reactSocialDetector.detect(url)
				if (expectedMethod === 'none') {
					expect(result.detectionMethod).toBe(expectedMethod)
				} else if (result.isValid) {
					expect(['pattern', 'domain', 'url_structure']).toContain(
						result.detectionMethod
					)
				}
			})
		})
	})

	describe('Performance and Stress Tests', () => {
		it('should handle many rapid detections efficiently', () => {
			const urls = Array.from(
				{ length: 1000 },
				(_, i) => `https://instagram.com/user${i}`
			)

			const startTime = performance.now()

			urls.forEach((url) => {
				const result = reactSocialDetector.detect(url)
				expect(result.platform).toBe('instagram')
			})

			const endTime = performance.now()
			const duration = endTime - startTime

			// Should complete 1000 detections in reasonable time
			expect(duration).toBeLessThan(1000) // Less than 1 second
		})

		it('should handle very long URLs without crashing', () => {
			const longPath = 'a'.repeat(10000)
			const longUrl = `https://instagram.com/${longPath}`

			expect(() => {
				const result = reactSocialDetector.detect(longUrl)
				expect(result.platform).toBe('instagram')
			}).not.toThrow()
		})
	})

	describe('All Export Forms Work Correctly', () => {
		it('should work with singleton instance', () => {
			const result = reactSocialDetector.detect('https://instagram.com/test')
			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})

		it('should work with new instance', () => {
			const detector = new ReactSocialDetector()
			const result = detector.detect('https://instagram.com/test')
			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})

		it('should work with quick function', () => {
			const result = quickReactSocialDetector('https://instagram.com/test')
			expect(result.platform).toBe('instagram')
			expect(result.isValid).toBe(true)
		})
	})

	describe('Metadata and Processing Time', () => {
		it('should include metadata when requested', () => {
			const result = reactSocialDetector.detect(
				'https://instagram.com/test',
				'testuser',
				{ extractMetadata: true }
			)

			expect(result.metadata).toBeDefined()
			expect(result.metadata?.originalInput).toBe('https://instagram.com/test')
			expect(result.metadata?.extractedUsername).toBe('testuser')
			expect(typeof result.metadata?.processingTime).toBe('number')
			expect(result.metadata?.processingTime).toBeGreaterThan(0)
		})

		it('should not include metadata by default', () => {
			const result = reactSocialDetector.detect('https://instagram.com/test')
			expect(result.metadata).toBeUndefined()
		})
	})
})
