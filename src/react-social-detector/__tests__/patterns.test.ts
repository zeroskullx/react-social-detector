import { describe, expect, it } from 'vitest'

import { SOCIAL_NETWORKS_PATTERNS, type SocialNetworkKey } from '../patterns'

describe('Social Network Patterns', () => {
	describe('SOCIAL_NETWORKS_PATTERNS', () => {
		it('should export patterns correctly', () => {
			expect(SOCIAL_NETWORKS_PATTERNS).toBeDefined()
			expect(typeof SOCIAL_NETWORKS_PATTERNS).toBe('object')
		})

		it('should contain required platforms', () => {
			const requiredPlatforms: SocialNetworkKey[] = [
				'instagram',
				'facebook',
				'twitter',
				'linkedin',
				'youtube',
				'tiktok',
				'github',
				'discord',
				'telegram',
				'reddit',
				'twitch',
				'pinterest',
				'medium',
				'behance',
				'bluesky',
				'clubhouse',
				'devto',
				'dribbble',
				'gitlab',
				'mastodon',
				'onlyfans',
				'producthunt',
				'qq',
				'quora',
				'slack',
				'snapchat',
				'spotify',
				'substack',
				'threads',
				'tumblr',
				'vkontakte',
				'wechat',
				'weibo',
				'wikipedia',
				'whatsapp',
			]

			requiredPlatforms.forEach((platform) => {
				expect(SOCIAL_NETWORKS_PATTERNS[platform]).toBeDefined()
			})
		})

		it('should have valid pattern structure for each platform', () => {
			Object.entries(SOCIAL_NETWORKS_PATTERNS).forEach(([_key, pattern]) => {
				// Check required properties
				expect(pattern.domains).toBeDefined()
				expect(pattern.baseUrl).toBeDefined()
				expect(pattern.displayName).toBeDefined()
				expect(pattern.exampleDomain).toBeDefined()

				// Check types
				expect(Array.isArray(pattern.domains)).toBe(true)
				expect(typeof pattern.baseUrl).toBe('string')
				expect(typeof pattern.displayName).toBe('string')
				expect(typeof pattern.exampleDomain).toBe('string')

				// Check domains array has RegExp objects
				pattern.domains.forEach((domain) => {
					expect(domain).toBeInstanceOf(RegExp)
				})

				// Check baseUrl is valid URL
				expect(() => new URL(pattern.baseUrl)).not.toThrow()

				// Check exampleDomain doesn't start with protocol
				expect(pattern.exampleDomain).not.toMatch(/^https?:\/\//)
			})
		})

		it('should have unique exampleDomains', () => {
			const exampleDomains = Object.values(SOCIAL_NETWORKS_PATTERNS).map(
				(p) => p.exampleDomain
			)
			const uniqueDomains = new Set(exampleDomains)

			expect(uniqueDomains.size).toBe(exampleDomains.length)
		})
	})

	describe('Platform-specific tests', () => {
		it('should have correct Instagram configuration', () => {
			const instagram = SOCIAL_NETWORKS_PATTERNS.instagram

			expect(instagram.displayName).toBe('Instagram')
			expect(instagram.exampleDomain).toBe('instagram.com')
			expect(instagram.baseUrl).toBe('https://instagram.com/')
			expect(
				instagram.domains.some((regex) => regex.test('instagram.com'))
			).toBe(true)
		})

		it('should have correct Twitter/X configuration', () => {
			const twitter = SOCIAL_NETWORKS_PATTERNS.twitter

			expect(twitter.displayName).toBe('X (Twitter)')
			expect(twitter.exampleDomain).toBe('x.com')
			expect(twitter.baseUrl).toBe('https://x.com/')
			expect(twitter.domains.some((regex) => regex.test('x.com'))).toBe(true)
			expect(twitter.domains.some((regex) => regex.test('twitter.com'))).toBe(
				true
			)
		})

		it('should have correct YouTube configuration', () => {
			const youtube = SOCIAL_NETWORKS_PATTERNS.youtube

			expect(youtube.displayName).toBe('YouTube')
			expect(youtube.exampleDomain).toBe('youtube.com')
			expect(youtube.baseUrl).toBe('https://youtube.com/@')
			expect(youtube.usernamePrefix).toBe('@')
			expect(youtube.domains.some((regex) => regex.test('youtube.com'))).toBe(
				true
			)
			expect(youtube.domains.some((regex) => regex.test('youtu.be'))).toBe(true)
		})

		it('should have correct GitHub configuration', () => {
			const github = SOCIAL_NETWORKS_PATTERNS.github

			expect(github.displayName).toBe('GitHub')
			expect(github.exampleDomain).toBe('github.com')
			expect(github.baseUrl).toBe('https://github.com/')
			expect(github.domains.some((regex) => regex.test('github.com'))).toBe(
				true
			)
		})

		it('should have correct LinkedIn configuration', () => {
			const linkedin = SOCIAL_NETWORKS_PATTERNS.linkedin

			expect(linkedin.displayName).toBe('LinkedIn')
			expect(linkedin.exampleDomain).toBe('linkedin.com')
			expect(linkedin.baseUrl).toBe('https://linkedin.com/in/')
			expect(linkedin.domains.some((regex) => regex.test('linkedin.com'))).toBe(
				true
			)
		})

		it('should have correct Threads configuration', () => {
			const threads = SOCIAL_NETWORKS_PATTERNS.threads

			expect(threads.displayName).toBe('Threads')
			expect(threads.exampleDomain).toBe('threads.net')
			expect(threads.baseUrl).toBe('https://threads.net/@')
			expect(threads.usernamePrefix).toBe('@')
			expect(threads.domains.some((regex) => regex.test('threads.net'))).toBe(
				true
			)
		})

		it('should have correct Bluesky configuration', () => {
			const bluesky = SOCIAL_NETWORKS_PATTERNS.bluesky

			expect(bluesky.displayName).toBe('Bluesky')
			expect(bluesky.exampleDomain).toBe('bsky.app')
			expect(bluesky.baseUrl).toBe('https://bsky.app/profile/')
			expect(bluesky.domains.some((regex) => regex.test('bsky.app'))).toBe(true)
			expect(bluesky.domains.some((regex) => regex.test('bsky.social'))).toBe(
				true
			)
		})

		it('should have correct TikTok configuration', () => {
			const tiktok = SOCIAL_NETWORKS_PATTERNS.tiktok

			expect(tiktok.displayName).toBe('TikTok')
			expect(tiktok.exampleDomain).toBe('tiktok.com')
			expect(tiktok.baseUrl).toBe('https://tiktok.com/@')
			expect(tiktok.usernamePrefix).toBe('@')
			expect(tiktok.domains.some((regex) => regex.test('tiktok.com'))).toBe(
				true
			)
		})

		it('should have correct Discord configuration', () => {
			const discord = SOCIAL_NETWORKS_PATTERNS.discord

			expect(discord.displayName).toBe('Discord')
			expect(discord.exampleDomain).toBe('discord.com')
			expect(discord.baseUrl).toBe('https://discord.com/users/')
			expect(discord.domains.some((regex) => regex.test('discord.com'))).toBe(
				true
			)
		})
	})

	describe('New Platform Domain Patterns', () => {
		it('should match modern social platform domains', () => {
			const modernPlatformTests = [
				{ platform: 'threads', domain: 'threads.net', shouldMatch: true },
				{ platform: 'bluesky', domain: 'bsky.app', shouldMatch: true },
				{ platform: 'bluesky', domain: 'bsky.social', shouldMatch: true },
				{ platform: 'mastodon', domain: 'mastodon.social', shouldMatch: true },
				{ platform: 'mastodon', domain: 'mastodon.world', shouldMatch: true },
				{ platform: 'substack', domain: 'substack.com', shouldMatch: true },
				{
					platform: 'clubhouse',
					domain: 'joinclubhouse.com',
					shouldMatch: true,
				},
				{ platform: 'devto', domain: 'dev.to', shouldMatch: true },

				// Negative tests
				{ platform: 'threads', domain: 'twitter.com', shouldMatch: false },
				{ platform: 'bluesky', domain: 'twitter.com', shouldMatch: false },
			]

			modernPlatformTests.forEach(({ platform, domain, shouldMatch }) => {
				const pattern = SOCIAL_NETWORKS_PATTERNS[platform as SocialNetworkKey]
				const matches = pattern.domains.some((regex) => regex.test(domain))
				expect(matches).toBe(shouldMatch)
			})
		})

		it('should match international social platforms', () => {
			const internationalTests = [
				{ platform: 'weibo', domain: 'weibo.com', shouldMatch: true },
				{ platform: 'weibo', domain: 'weibo.cn', shouldMatch: true },
				{ platform: 'wechat', domain: 'wechat.com', shouldMatch: true },
				{ platform: 'qq', domain: 'qq.com', shouldMatch: true },
				{ platform: 'vkontakte', domain: 'vk.com', shouldMatch: true },
				{ platform: 'vkontakte', domain: 'vkontakte.com', shouldMatch: true },
			]

			internationalTests.forEach(({ platform, domain, shouldMatch }) => {
				const pattern = SOCIAL_NETWORKS_PATTERNS[platform as SocialNetworkKey]
				const matches = pattern.domains.some((regex) => regex.test(domain))
				expect(matches).toBe(shouldMatch)
			})
		})
	})

	describe('Domain patterns', () => {
		it('should match correct domains for each platform', () => {
			// Test cases for domain matching
			const testCases = [
				{ platform: 'instagram', domain: 'instagram.com', shouldMatch: true },
				{
					platform: 'instagram',
					domain: 'cdninstagram.com',
					shouldMatch: true,
				},
				{ platform: 'instagram', domain: 'facebook.com', shouldMatch: false },

				{ platform: 'twitter', domain: 'x.com', shouldMatch: true },
				{ platform: 'twitter', domain: 'twitter.com', shouldMatch: true },
				{ platform: 'twitter', domain: 'twimg.com', shouldMatch: true },
				{ platform: 'twitter', domain: 'instagram.com', shouldMatch: false },

				{ platform: 'youtube', domain: 'youtube.com', shouldMatch: true },
				{ platform: 'youtube', domain: 'youtu.be', shouldMatch: true },
				{ platform: 'youtube', domain: 'googlevideo.com', shouldMatch: true },
				{ platform: 'youtube', domain: 'facebook.com', shouldMatch: false },

				{ platform: 'github', domain: 'github.com', shouldMatch: true },
				{ platform: 'github', domain: 'gitlab.com', shouldMatch: false },

				{ platform: 'telegram', domain: 't.me', shouldMatch: true },
				{ platform: 'telegram', domain: 'telegram.me', shouldMatch: true },
				{ platform: 'telegram', domain: 'telegram.org', shouldMatch: true },
				{ platform: 'telegram', domain: 'whatsapp.com', shouldMatch: false },
			]

			testCases.forEach(({ platform, domain, shouldMatch }) => {
				const pattern = SOCIAL_NETWORKS_PATTERNS[platform as SocialNetworkKey]
				const matches = pattern.domains.some((regex) => regex.test(domain))

				expect(matches).toBe(shouldMatch)
			})
		})
	})
})
