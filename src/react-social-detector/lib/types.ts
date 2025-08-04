import type { SocialNetworkKey } from '../assets/patterns'

/**
 * Result of social network detection
 */
export interface ReactSocialDetectionResult {
	readonly platform: SocialNetworkKey | 'unknown'
	readonly isValid: boolean
	readonly normalizedUrl?: string | undefined
	readonly displayName?: string | undefined
	readonly confidence: 'high' | 'medium' | 'low'
	readonly detectionMethod: 'pattern' | 'domain' | 'url_structure' | 'none'
	readonly metadata?: {
		readonly extractedUsername?: string | undefined
		readonly originalInput: string
		readonly processingTime?: number | undefined
	}
}

/**
 * Configuration options for detection
 */
export interface DetectionOptions {
	readonly strictMode?: boolean
	readonly includeSubdomains?: boolean
	readonly caseSensitive?: boolean
	readonly extractMetadata?: boolean
}

/**
 * Platform information for supported platforms
 */
export interface PlatformInfo {
	readonly key: SocialNetworkKey
	readonly displayName: string
	readonly exampleDomain: string
	readonly baseUrl: string
}
