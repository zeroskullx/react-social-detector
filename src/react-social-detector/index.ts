/**
 * React Social Detector - TypeScript Library
 * A comprehensive library for detecting and validating social network URLs
 */

import {
	type PlatformInfo,
	quickReactSocialDetector,
	ReactSocialDetector,
	reactSocialDetector,
} from './detector'
import { useBulkReactSocialDetector } from './hooks/useBulkReactSocialDetector'
import { useReactSocialDetector } from './hooks/useReactSocialDetector'
// Import for internal usage
import {
	SOCIAL_NETWORKS_PATTERNS,
	type SocialNetworkKey,
	socialNetworksPatterns,
} from './patterns'

// Core exports
export {
	type DetectionOptions,
	type PlatformInfo,
	quickReactSocialDetector,
	type ReactSocialDetectionResult,
	ReactSocialDetector,
	reactSocialDetector,
} from './detector'
// React hooks exports
export type {
	BulkDetectionItem,
	BulkDetectionResult,
	UseBulkDetectionOptions,
	UseBulkReactSocialDetectorReturn,
	UseReactSocialDetectorOptions,
	UseReactSocialDetectorReturn,
} from './hooks/types'
export { useBulkReactSocialDetector } from './hooks/useBulkReactSocialDetector'
export { useReactSocialDetector } from './hooks/useReactSocialDetector'
// Pattern exports
export {
	SOCIAL_NETWORKS_PATTERNS,
	type SocialNetworkKey,
	type SocialNetworkPattern,
	socialNetworksPatterns, // Legacy support
} from './patterns'

// Utility functions with better structure
export const SocialNetworkUtils = {
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
			const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
			return urlObj.href.toLowerCase()
		} catch {
			return url.toLowerCase()
		}
	},

	/**
	 * Extract domain from URL
	 */
	extractDomain: (url: string): string | null => {
		try {
			const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
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

		const platformValidators: Record<string, RegExp> = {
			twitter: /^[a-zA-Z0-9_]{1,15}$/,
			instagram: /^[a-zA-Z0-9._]{1,30}$/,
			tiktok: /^[a-zA-Z0-9._]{1,24}$/,
			youtube: /^[a-zA-Z0-9._-]{1,30}$/,
			linkedin: /^[a-zA-Z0-9-]{3,100}$/,
			github: /^[a-zA-Z0-9]([a-zA-Z0-9-]){0,38}$/,
			reddit: /^[a-zA-Z0-9_-]{3,20}$/,
			facebook: /^[a-zA-Z0-9.]{5,50}$/,
			discord: /^\d{17,19}$/, // Discord user IDs
			telegram: /^[a-zA-Z0-9_]{5,32}$/,
			twitch: /^[a-zA-Z0-9_]{4,25}$/,
			pinterest: /^[a-zA-Z0-9_]{3,30}$/,
			medium: /^[a-zA-Z0-9_-]{1,30}$/,
		}

		const validator = platformValidators[platform]
		return validator ? validator.test(username.trim()) : true
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

// Export everything as default for easier importing
export default {
	// Core
	ReactSocialDetector,
	reactSocialDetector,
	quickReactSocialDetector,

	// Patterns
	SOCIAL_NETWORKS_PATTERNS,
	socialNetworksPatterns,

	// Hooks
	useReactSocialDetector,
	useBulkReactSocialDetector,

	// Utils
	...SocialNetworkUtils,
} as const
