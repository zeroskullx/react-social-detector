import {
	SOCIAL_NETWORKS_PATTERNS,
	type SocialNetworkKey,
} from './assets/patterns'
import { reactSocialDetector } from './lib/detector'
import type { PlatformInfo } from './lib/types'

// Utility functions with better structure
export const socialNetworkUtils = {
	/**
	 * Check if a platform is supported
	 */
	isPlatformSupported: (platform: string): platform is SocialNetworkKey => {
		return platform in SOCIAL_NETWORKS_PATTERNS
	},

	/**
	 * Get platform display name
	 */
	getPlatformDisplayName: (platform: SocialNetworkKey): string => {
		return SOCIAL_NETWORKS_PATTERNS[platform]?.displayName || platform
	},

	/**
	 * Get platform example domain
	 */
	getPlatformExampleDomain: (platform: SocialNetworkKey): string => {
		return (
			SOCIAL_NETWORKS_PATTERNS[platform]?.exampleDomain || `${platform}.com`
		)
	},

	/**
	 * Get all platform keys
	 */
	getAllPlatformKeys: (): SocialNetworkKey[] => {
		return Object.keys(SOCIAL_NETWORKS_PATTERNS) as SocialNetworkKey[]
	},

	/**
	 * Get all supported platforms with details
	 */
	getAllPlatforms: (): PlatformInfo[] => {
		return reactSocialDetector.getSupportedPlatforms()
	},

	/**
	 * Normalize URL for comparison
	 */
	normalizeUrl: (url: string): string => {
		try {
			// If it doesn't start with http, add https
			const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
			const urlObj = new URL(normalizedUrl)
			return urlObj.href.toLowerCase()
		} catch {
			return url // Return original URL if parsing fails
		}
	},

	/**
	 * Extract domain from URL
	 */
	extractDomain: (url: string): string | null => {
		if (!url?.trim()) return null

		try {
			// Check for invalid URLs
			if (url === 'https://' || url === 'http://') {
				return null
			}

			// Simple check for strings that are clearly not URLs
			if (!(url.startsWith('http') || url.includes('.'))) {
				return null
			}

			// If it doesn't start with http, add https
			const normalizedUrl = url.startsWith('http') ? url : `https://${url}`
			const urlObj = new URL(normalizedUrl)
			return urlObj.hostname
		} catch {
			return null
		}
	},

	/**
	 * Validate username format for platform
	 */
	validateUsername: (username: string, platform: SocialNetworkKey): boolean => {
		if (!username?.trim()) return false

		const trimmedUsername = username.trim()

		// Special validation for GitHub
		if (platform === 'github') {
			// 1-39 characters
			if (trimmedUsername.length > 39 || trimmedUsername.length < 1)
				return false
			// Cannot start or end with hyphen
			if (trimmedUsername.startsWith('-') || trimmedUsername.endsWith('-'))
				return false
			// Cannot have consecutive hyphens
			if (trimmedUsername.includes('--')) return false
			// Only alphanumeric and hyphens
			return /^[a-zA-Z0-9-]+$/.test(trimmedUsername)
		}

		const platformValidators: Record<string, RegExp> = {
			twitter: /^[a-zA-Z0-9_]{1,15}$/,
			instagram: /^[a-zA-Z0-9._]{1,30}$/,
			tiktok: /^[a-zA-Z0-9._]{1,24}$/,
			youtube: /^[a-zA-Z0-9._-]{1,30}$/,
			linkedin: /^[a-zA-Z0-9-]{3,100}$/,
			reddit: /^[a-zA-Z0-9_-]{3,20}$/,
			facebook: /^[a-zA-Z0-9.]{5,50}$/,
			discord: /^\d{18,19}$/, // Discord user IDs are 18-19 digits exactly
			telegram: /^[a-zA-Z0-9_]{5,32}$/,
			twitch: /^[a-zA-Z0-9_]{4,25}$/,
			pinterest: /^[a-zA-Z0-9_]{3,30}$/,
			medium: /^[a-zA-Z0-9_-]{1,30}$/,
		}

		const validator = platformValidators[platform]
		return validator ? validator.test(trimmedUsername) : true
	},

	/**
	 * Generate profile URL for platform and username
	 */
	generateProfileUrl: (
		platform: SocialNetworkKey,
		username: string
	): string | null => {
		return reactSocialDetector.generateProfileUrl(platform, username)
	},
} as const
