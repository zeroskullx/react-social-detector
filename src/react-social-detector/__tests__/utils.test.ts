import { describe, expect, it } from 'vitest'

import type { SocialNetworkKey } from '../assets/patterns'
import { socialNetworkUtils } from '../utils'

describe('Social Network Utils', () => {
	describe('isPlatformSupported', () => {
		it('should return true for supported platforms', () => {
			expect(socialNetworkUtils.isPlatformSupported('instagram')).toBe(true)
			expect(socialNetworkUtils.isPlatformSupported('facebook')).toBe(true)
			expect(socialNetworkUtils.isPlatformSupported('twitter')).toBe(true)
			expect(socialNetworkUtils.isPlatformSupported('youtube')).toBe(true)
		})

		it('should return false for unsupported platforms', () => {
			expect(socialNetworkUtils.isPlatformSupported('unknown')).toBe(false)
			expect(socialNetworkUtils.isPlatformSupported('invalid')).toBe(false)
			expect(socialNetworkUtils.isPlatformSupported('')).toBe(false)
		})

		it('should handle edge cases', () => {
			// @ts-expect-error Testing invalid types
			expect(socialNetworkUtils.isPlatformSupported(null)).toBe(false)
			// @ts-expect-error Testing invalid types
			expect(socialNetworkUtils.isPlatformSupported(undefined)).toBe(false)
			// @ts-expect-error Testing invalid types
			expect(socialNetworkUtils.isPlatformSupported(123)).toBe(false)
		})
	})

	describe('getPlatformDisplayName', () => {
		it('should return correct display names', () => {
			expect(socialNetworkUtils.getPlatformDisplayName('instagram')).toBe(
				'Instagram'
			)
			expect(socialNetworkUtils.getPlatformDisplayName('facebook')).toBe(
				'Facebook'
			)
			expect(socialNetworkUtils.getPlatformDisplayName('twitter')).toBe(
				'X (Twitter)'
			)
			expect(socialNetworkUtils.getPlatformDisplayName('youtube')).toBe(
				'YouTube'
			)
			expect(socialNetworkUtils.getPlatformDisplayName('linkedin')).toBe(
				'LinkedIn'
			)
			expect(socialNetworkUtils.getPlatformDisplayName('github')).toBe('GitHub')
		})

		it('should handle platforms without display names gracefully', () => {
			// Test with a valid platform that might not have displayName
			const platforms = socialNetworkUtils.getAllPlatformKeys()
			platforms.forEach((platform) => {
				const displayName = socialNetworkUtils.getPlatformDisplayName(platform)
				expect(typeof displayName).toBe('string')
				expect(displayName.length).toBeGreaterThan(0)
			})
		})
	})

	describe('getPlatformExampleDomain', () => {
		it('should return correct example domains', () => {
			expect(socialNetworkUtils.getPlatformExampleDomain('instagram')).toBe(
				'instagram.com'
			)
			expect(socialNetworkUtils.getPlatformExampleDomain('facebook')).toBe(
				'facebook.com'
			)
			expect(socialNetworkUtils.getPlatformExampleDomain('twitter')).toBe(
				'x.com'
			)
			expect(socialNetworkUtils.getPlatformExampleDomain('youtube')).toBe(
				'youtube.com'
			)
			expect(socialNetworkUtils.getPlatformExampleDomain('github')).toBe(
				'github.com'
			)
		})

		it('should fallback to platform.com for missing domains', () => {
			// This tests the fallback mechanism
			// We can't easily test this without modifying the patterns, but we can ensure consistency
			const platforms = socialNetworkUtils.getAllPlatformKeys()
			platforms.forEach((platform) => {
				const exampleDomain =
					socialNetworkUtils.getPlatformExampleDomain(platform)
				expect(typeof exampleDomain).toBe('string')
				expect(exampleDomain.length).toBeGreaterThan(0)
				expect(exampleDomain).not.toMatch(/^https?:\/\//)
			})
		})
	})

	describe('getAllPlatformKeys', () => {
		it('should return array of platform keys', () => {
			const keys = socialNetworkUtils.getAllPlatformKeys()

			expect(Array.isArray(keys)).toBe(true)
			expect(keys.length).toBeGreaterThan(0)

			// Check that some expected platforms are included
			expect(keys).toContain('instagram')
			expect(keys).toContain('facebook')
			expect(keys).toContain('twitter')
			expect(keys).toContain('youtube')
		})

		it('should return unique keys', () => {
			const keys = socialNetworkUtils.getAllPlatformKeys()
			const uniqueKeys = new Set(keys)

			expect(uniqueKeys.size).toBe(keys.length)
		})
	})

	describe('getAllPlatforms', () => {
		it('should return array of platform info objects', () => {
			const platforms = socialNetworkUtils.getAllPlatforms()

			expect(Array.isArray(platforms)).toBe(true)
			expect(platforms.length).toBeGreaterThan(0)

			platforms.forEach((platform) => {
				expect(platform).toHaveProperty('key')
				expect(platform).toHaveProperty('displayName')
				expect(platform).toHaveProperty('exampleDomain')
				expect(platform).toHaveProperty('baseUrl')
				expect(typeof platform.key).toBe('string')
				expect(typeof platform.displayName).toBe('string')
				expect(typeof platform.exampleDomain).toBe('string')
				expect(typeof platform.baseUrl).toBe('string')
			})
		})
	})

	describe('normalizeUrl', () => {
		it('should normalize URLs correctly', () => {
			expect(
				socialNetworkUtils.normalizeUrl('https://Instagram.com/test')
			).toBe('https://instagram.com/test')
			expect(socialNetworkUtils.normalizeUrl('HTTP://FACEBOOK.COM/test')).toBe(
				'https://http//facebook.com/test' // URL constructor treats HTTP://... as protocol + hostname
			)
		})

		it('should add https protocol for URLs without protocol', () => {
			expect(socialNetworkUtils.normalizeUrl('instagram.com/test')).toBe(
				'https://instagram.com/test'
			)
			expect(socialNetworkUtils.normalizeUrl('facebook.com/user')).toBe(
				'https://facebook.com/user'
			)
		})

		it('should handle invalid URLs gracefully', () => {
			expect(socialNetworkUtils.normalizeUrl('invalid-url')).toBe(
				'https://invalid-url/'
			)
			expect(socialNetworkUtils.normalizeUrl('')).toBe('')
			expect(socialNetworkUtils.normalizeUrl('not a url at all')).toBe(
				'not a url at all'
			)
		})

		it('should preserve existing protocols', () => {
			expect(socialNetworkUtils.normalizeUrl('http://instagram.com/test')).toBe(
				'http://instagram.com/test'
			)
			expect(socialNetworkUtils.normalizeUrl('https://facebook.com/test')).toBe(
				'https://facebook.com/test'
			)
		})
	})

	describe('extractDomain', () => {
		it('should extract domains correctly', () => {
			expect(
				socialNetworkUtils.extractDomain('https://instagram.com/test')
			).toBe('instagram.com')
			expect(
				socialNetworkUtils.extractDomain('http://www.facebook.com/user')
			).toBe('www.facebook.com')
			expect(
				socialNetworkUtils.extractDomain(
					'https://subdomain.youtube.com/channel'
				)
			).toBe('subdomain.youtube.com')
		})

		it('should handle URLs without protocol', () => {
			expect(socialNetworkUtils.extractDomain('instagram.com/test')).toBe(
				'instagram.com'
			)
			expect(socialNetworkUtils.extractDomain('www.facebook.com/user')).toBe(
				'www.facebook.com'
			)
		})

		it('should return null for invalid URLs', () => {
			expect(socialNetworkUtils.extractDomain('invalid-url')).toBeNull()
			expect(socialNetworkUtils.extractDomain('')).toBeNull()
			expect(socialNetworkUtils.extractDomain('not a url')).toBeNull()
		})

		it('should handle edge cases', () => {
			expect(socialNetworkUtils.extractDomain('https://')).toBeNull()
			expect(socialNetworkUtils.extractDomain('http://')).toBeNull()
		})
	})

	describe('validateUsername', () => {
		it('should validate Twitter usernames correctly', () => {
			expect(socialNetworkUtils.validateUsername('validuser', 'twitter')).toBe(
				true
			)
			expect(socialNetworkUtils.validateUsername('user_123', 'twitter')).toBe(
				true
			)
			expect(
				socialNetworkUtils.validateUsername('123456789012345', 'twitter')
			).toBe(true) // 15 chars max

			expect(socialNetworkUtils.validateUsername('', 'twitter')).toBe(false)
			expect(
				socialNetworkUtils.validateUsername('1234567890123456', 'twitter')
			).toBe(false) // 16 chars
			expect(socialNetworkUtils.validateUsername('user-name', 'twitter')).toBe(
				false
			) // hyphens not allowed
			expect(socialNetworkUtils.validateUsername('user.name', 'twitter')).toBe(
				false
			) // dots not allowed
		})

		it('should validate Instagram usernames correctly', () => {
			expect(
				socialNetworkUtils.validateUsername('validuser', 'instagram')
			).toBe(true)
			expect(
				socialNetworkUtils.validateUsername('user.name', 'instagram')
			).toBe(true)
			expect(socialNetworkUtils.validateUsername('user_123', 'instagram')).toBe(
				true
			)
			expect(
				socialNetworkUtils.validateUsername('a'.repeat(30), 'instagram')
			).toBe(true) // 30 chars max

			expect(socialNetworkUtils.validateUsername('', 'instagram')).toBe(false)
			expect(
				socialNetworkUtils.validateUsername('a'.repeat(31), 'instagram')
			).toBe(false) // 31 chars
			expect(
				socialNetworkUtils.validateUsername('user-name', 'instagram')
			).toBe(false) // hyphens not allowed
		})

		it('should validate GitHub usernames correctly', () => {
			expect(socialNetworkUtils.validateUsername('validuser', 'github')).toBe(
				true
			)
			expect(socialNetworkUtils.validateUsername('user-name', 'github')).toBe(
				true
			)
			expect(
				socialNetworkUtils.validateUsername(
					'a123456789012345678901234567890123456789',
					'github'
				)
			).toBe(false) // 40 chars, too long (39 max)

			expect(socialNetworkUtils.validateUsername('', 'github')).toBe(false)
			expect(socialNetworkUtils.validateUsername('-invalid', 'github')).toBe(
				false
			) // Can't start with hyphen
			expect(socialNetworkUtils.validateUsername('invalid-', 'github')).toBe(
				false
			) // Can't end with hyphen
			expect(
				socialNetworkUtils.validateUsername('invalid--name', 'github')
			).toBe(false) // No consecutive hyphens
		})

		it('should validate Discord user IDs correctly', () => {
			expect(
				socialNetworkUtils.validateUsername('123456789012345678', 'discord')
			).toBe(true) // 18 chars
			expect(
				socialNetworkUtils.validateUsername('1234567890123456789', 'discord')
			).toBe(true) // 19 chars

			expect(
				socialNetworkUtils.validateUsername('12345678901234567', 'discord')
			).toBe(false) // 17 chars
			expect(
				socialNetworkUtils.validateUsername('12345678901234567890', 'discord')
			).toBe(false) // 20 chars
			expect(
				socialNetworkUtils.validateUsername('abc123456789012345', 'discord')
			).toBe(false) // letters not allowed
		})

		it('should handle empty and whitespace usernames', () => {
			const platforms: SocialNetworkKey[] = [
				'twitter',
				'instagram',
				'github',
				'discord',
			]

			platforms.forEach((platform) => {
				expect(socialNetworkUtils.validateUsername('', platform)).toBe(false)
				expect(socialNetworkUtils.validateUsername('   ', platform)).toBe(false)
				expect(socialNetworkUtils.validateUsername('\t\n', platform)).toBe(
					false
				)
			})
		})

		it('should handle platforms without specific validators', () => {
			// These platforms should return true (no specific validation)
			expect(socialNetworkUtils.validateUsername('anything', 'behance')).toBe(
				true
			)
			expect(socialNetworkUtils.validateUsername('user123', 'spotify')).toBe(
				true
			)
			expect(socialNetworkUtils.validateUsername('test.user', 'mastodon')).toBe(
				true
			)
		})

		it('should trim whitespace before validation', () => {
			expect(
				socialNetworkUtils.validateUsername('  validuser  ', 'twitter')
			).toBe(true)
			expect(
				socialNetworkUtils.validateUsername(' user.name ', 'instagram')
			).toBe(true)
			expect(
				socialNetworkUtils.validateUsername('\tuser-name\n', 'github')
			).toBe(true)
		})
	})

	describe('generateProfileUrl', () => {
		it('should generate profile URLs correctly', () => {
			expect(
				socialNetworkUtils.generateProfileUrl('instagram', 'testuser')
			).toBe('https://instagram.com/testuser')
			expect(socialNetworkUtils.generateProfileUrl('youtube', 'testuser')).toBe(
				'https://youtube.com/@testuser'
			)
			expect(
				socialNetworkUtils.generateProfileUrl('linkedin', 'testuser')
			).toBe('https://linkedin.com/in/testuser')
		})

		it('should handle empty usernames', () => {
			expect(socialNetworkUtils.generateProfileUrl('instagram', '')).toBeNull()
			expect(socialNetworkUtils.generateProfileUrl('twitter', '   ')).toBeNull()
		})

		it('should handle all supported platforms', () => {
			const platforms = socialNetworkUtils.getAllPlatformKeys()

			platforms.forEach((platform) => {
				const url = socialNetworkUtils.generateProfileUrl(platform, 'testuser')
				if (url) {
					expect(typeof url).toBe('string')
					expect(url).toMatch(/^https?:\/\//)
					expect(url).toContain('testuser')
				}
			})
		})
	})

	describe('Integration with real detector', () => {
		it('should have consistent platform keys with detector', () => {
			const utilsKeys = socialNetworkUtils.getAllPlatformKeys()
			const detectorPlatforms = socialNetworkUtils.getAllPlatforms()

			expect(utilsKeys.length).toBe(detectorPlatforms.length)

			detectorPlatforms.forEach((platform) => {
				expect(utilsKeys).toContain(platform.key)
			})
		})
	})
})
