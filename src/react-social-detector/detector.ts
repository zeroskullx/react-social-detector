import {
	SOCIAL_NETWORKS_PATTERNS,
	type SocialNetworkKey,
	type SocialNetworkPatternProps,
} from './patterns'

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

/**
 * Input validation result
 */
interface ValidationResult {
	readonly isValid: boolean
	readonly normalizedInput?: string
	readonly error?: string
}

/**
 * Detection method result
 */
interface DetectionMethodResult {
	readonly platform: SocialNetworkKey | 'unknown'
	readonly isValid: boolean
	readonly displayName?: string
	readonly confidence: 'high' | 'medium' | 'low'
}

/**
 * Main class for detecting social networks from URLs and domains
 */
export class ReactSocialDetector {
	private readonly patterns: Record<string, SocialNetworkPatternProps>
	private readonly domainCache = new Map<string, SocialNetworkKey | null>()

	constructor() {
		this.patterns = SOCIAL_NETWORKS_PATTERNS
	}

	/**
	 * Detects social network from URL or domain
	 */
	public detect(
		input: string,
		username?: string,
		options: DetectionOptions = {}
	): ReactSocialDetectionResult {
		const startTime = performance.now()

		const defaultOptions: Required<DetectionOptions> = {
			strictMode: false,
			includeSubdomains: true,
			caseSensitive: false,
			extractMetadata: false,
		}

		const opts = { ...defaultOptions, ...options }

		// Validate input
		const validation = this.validateInput(input)
		if (!validation.isValid) {
			return this.createErrorResult(input, validation.error || 'Invalid input')
		}

		const normalizedInput = validation.normalizedInput!

		// Try different detection methods in order of confidence
		const detectionMethods = [
			() => this.detectByPattern(normalizedInput),
			() => this.detectByDomain(normalizedInput, opts),
			() => this.detectByUrlStructure(normalizedInput),
		]

		for (const method of detectionMethods) {
			const result = method()
			if (result.isValid) {
				return this.buildResult(
					result,
					normalizedInput,
					username,
					opts,
					performance.now() - startTime
				)
			}
		}

		return this.createUnknownResult(input, performance.now() - startTime)
	}

	/**
	 * Extracts username from social media URL
	 */
	public extractUsername(
		url: string,
		platform?: SocialNetworkKey
	): string | null {
		const validation = this.validateInput(url)
		if (!validation.isValid) {
			return null
		}

		const cleanUrl = validation.normalizedInput!

		if (platform && this.patterns[platform]) {
			return this.extractUsernameForPlatform(cleanUrl, platform)
		}

		// Auto-detect platform first, then extract username
		const detection = this.detect(cleanUrl)
		if (detection.isValid && detection.platform !== 'unknown') {
			return this.extractUsernameForPlatform(cleanUrl, detection.platform)
		}

		return null
	}

	/**
	 * Validates if URL matches expected platform
	 */
	public validatePlatform(
		url: string,
		expectedPlatform: SocialNetworkKey
	): boolean {
		const detection = this.detect(url)
		return detection.isValid && detection.platform === expectedPlatform
	}

	/**
	 * Gets all supported platforms with their information
	 */
	public getSupportedPlatforms(): PlatformInfo[] {
		return Object.entries(this.patterns).map(([key, pattern]) => ({
			key: key as SocialNetworkKey,
			displayName: pattern.displayName,
			exampleDomain: pattern.exampleDomain,
			baseUrl: pattern.baseUrl,
		}))
	}

	/**
	 * Generates complete profile URL for a given platform and username
	 */
	public generateProfileUrl(
		platform: SocialNetworkKey,
		username: string
	): string | null {
		const pattern = this.patterns[platform]
		if (!(pattern && username?.trim())) {
			return null
		}

		const cleanUsername = this.sanitizeUsername(username)

		if (pattern.usernamePrefix) {
			// If baseUrl already contains the prefix (like youtube.com/@), don't add it again
			if (pattern.baseUrl.endsWith(pattern.usernamePrefix)) {
				// Remove prefix from username if it exists to avoid duplication
				const usernameWithoutPrefix = cleanUsername.startsWith(
					pattern.usernamePrefix
				)
					? cleanUsername.slice(pattern.usernamePrefix.length)
					: cleanUsername
				return `${pattern.baseUrl}${usernameWithoutPrefix}`
			}

			// If username already starts with the prefix, use it as-is
			if (cleanUsername.startsWith(pattern.usernamePrefix)) {
				return `${pattern.baseUrl}${cleanUsername}`
			}
			// Otherwise, add the prefix
			return `${pattern.baseUrl}${pattern.usernamePrefix}${cleanUsername}`
		}

		return `${pattern.baseUrl}${cleanUsername}`
	}

	/**
	 * Validates input and returns normalized version
	 */
	private validateInput(input: string): ValidationResult {
		if (!input || typeof input !== 'string') {
			return {
				isValid: false,
				error: 'Input is required and must be a string',
			}
		}

		const trimmed = input.trim()
		if (!trimmed) {
			return { isValid: false, error: 'Input cannot be empty' }
		}

		let normalized = trimmed.toLowerCase()

		// Add protocol if missing and looks like a URL
		if (normalized.includes('.') && !normalized.match(/^https?:\/\//)) {
			normalized = `https://${normalized}`
		}

		return { isValid: true, normalizedInput: normalized }
	}

	/**
	 * Detects by pattern matching (highest confidence)
	 */
	private detectByPattern(input: string): DetectionMethodResult {
		try {
			const url = new URL(input)
			const hostname = url.hostname

			for (const [platform, pattern] of Object.entries(this.patterns)) {
				if (pattern.domains.some((regex) => regex.test(hostname))) {
					return {
						platform: platform as SocialNetworkKey,
						isValid: true,
						displayName: pattern.displayName,
						confidence: 'high',
					}
				}
			}
		} catch {
			// If URL parsing fails, continue to other methods
		}

		return { platform: 'unknown', isValid: false, confidence: 'low' }
	}

	/**
	 * Detects by domain matching (medium confidence)
	 */
	private detectByDomain(
		input: string,
		_options: Required<DetectionOptions>
	): DetectionMethodResult {
		// Check cache first
		const cached = this.domainCache.get(input)
		if (cached !== undefined) {
			if (cached === null) {
				return { platform: 'unknown', isValid: false, confidence: 'medium' }
			}
			const pattern = this.patterns[cached]
			return {
				platform: cached,
				isValid: true,
				displayName: pattern.displayName,
				confidence: 'medium',
			}
		}

		try {
			const url = new URL(input)
			const hostname = url.hostname.toLowerCase()

			for (const [platform, pattern] of Object.entries(this.patterns)) {
				if (pattern.domains.some((regex) => regex.test(hostname))) {
					this.domainCache.set(input, platform as SocialNetworkKey)
					return {
						platform: platform as SocialNetworkKey,
						isValid: true,
						displayName: pattern.displayName,
						confidence: 'medium',
					}
				}
			}

			// Cache negative result
			this.domainCache.set(input, null)
		} catch {
			// URL parsing failed - cache negative result
			this.domainCache.set(input, null)
		}

		return { platform: 'unknown', isValid: false, confidence: 'medium' }
	}

	/**
	 * Detects by URL structure patterns (lowest confidence)
	 */
	private detectByUrlStructure(input: string): DetectionMethodResult {
		const structurePatterns = [
			{ pattern: /\/watch\?v=/, platforms: ['youtube'] },
			{ pattern: /\/status\/\d+/, platforms: ['twitter'] },
			{ pattern: /\/p\/[\w-]+/, platforms: ['instagram'] },
			{ pattern: /\/in\/[\w-]+/, platforms: ['linkedin'] },
			{ pattern: /\/@[\w-]+/, platforms: ['twitter', 'medium', 'youtube'] },
			{ pattern: /\/u\/[\w-]+/, platforms: ['reddit'] },
			{ pattern: /\/channel\//, platforms: ['youtube'] },
			{ pattern: /\/c\/[\w-]+/, platforms: ['youtube'] },
			{ pattern: /\/user\/[\w-]+/, platforms: ['reddit', 'github'] },
			{ pattern: /\/company\/[\w-]+/, platforms: ['linkedin'] },
			{ pattern: /\/profile\/[\w-]+/, platforms: ['facebook'] },
		]

		for (const { pattern, platforms } of structurePatterns) {
			if (pattern.test(input)) {
				const platform = platforms[0] as SocialNetworkKey
				const patternData = this.patterns[platform]
				if (patternData) {
					return {
						platform,
						isValid: true,
						displayName: patternData.displayName,
						confidence: 'low',
					}
				}
			}
		}

		return { platform: 'unknown', isValid: false, confidence: 'low' }
	}

	/**
	 * Extracts username for specific platform
	 */
	private extractUsernameForPlatform(
		url: string,
		platform: SocialNetworkKey
	): string | null {
		try {
			const urlObj = new URL(url)
			const pathname = urlObj.pathname

			const extractionPatterns: Record<string, RegExp> = {
				instagram: /\/([^/?]+)\/?(?:\?|$)/,
				facebook: /\/([^/?]+)\/?(?:\?|$)/,
				twitter: /\/([^/?]+)\/?(?:\?|$)/,
				linkedin: /\/in\/([^/?]+)\/?(?:\?|$)/,
				youtube: /\/@([^/?]+)\/?(?:\?|$)/,
				tiktok: /\/@([^/?]+)\/?(?:\?|$)/,
				github: /\/([^/?]+)\/?(?:\?|$)/,
				reddit: /\/u\/([^/?]+)\/?(?:\?|$)/,
				discord: /\/users\/([^/?]+)\/?(?:\?|$)/,
				telegram: /\/([^/?]+)\/?(?:\?|$)/,
				twitch: /\/([^/?]+)\/?(?:\?|$)/,
				pinterest: /\/([^/?]+)\/?(?:\?|$)/,
				medium: /\/@([^/?]+)\/?(?:\?|$)/,
			}

			const pattern = extractionPatterns[platform]
			if (pattern) {
				const match = pathname.match(pattern)
				return match ? this.sanitizeUsername(match[1]) : null
			}
		} catch {
			return null
		}

		return null
	}

	/**
	 * Sanitizes username by removing invalid characters
	 */
	private sanitizeUsername(username: string): string {
		return username
			.trim()
			.replace(/[^\w@.-]/g, '')
			.toLowerCase()
	}

	/**
	 * Builds final result object
	 */
	private buildResult(
		detection: DetectionMethodResult,
		normalizedInput: string,
		username: string | undefined,
		options: Required<DetectionOptions>,
		processingTime: number
	): ReactSocialDetectionResult {
		const pattern = this.patterns[detection.platform as SocialNetworkKey]

		// Generate normalized URL
		const normalizedUrl = username
			? this.generateProfileUrl(
					detection.platform as SocialNetworkKey,
					username
				)
			: normalizedInput

		const baseResult: ReactSocialDetectionResult = {
			platform: detection.platform as SocialNetworkKey,
			isValid: detection.isValid,
			normalizedUrl: normalizedUrl || undefined,
			displayName: detection.displayName || pattern?.displayName,
			confidence: detection.confidence,
			detectionMethod: this.getDetectionMethod(detection.confidence),
		}

		if (options.extractMetadata) {
			const extractedUsername =
				username ||
				this.extractUsernameForPlatform(
					normalizedInput,
					detection.platform as SocialNetworkKey
				)

			return {
				...baseResult,
				metadata: {
					extractedUsername: extractedUsername || undefined,
					originalInput: normalizedInput,
					processingTime,
				},
			}
		}

		return baseResult
	}

	/**
	 * Creates error result for invalid input
	 */
	private createErrorResult(
		_input: string,
		_error: string
	): ReactSocialDetectionResult {
		return {
			platform: 'unknown',
			isValid: false,
			confidence: 'low',
			detectionMethod: 'none',
			displayName: 'Unknown',
		}
	}

	/**
	 * Creates result for unknown platform
	 */
	private createUnknownResult(
		input: string,
		processingTime: number
	): ReactSocialDetectionResult {
		return {
			platform: 'unknown',
			isValid: false,
			confidence: 'low',
			detectionMethod: 'none',
			metadata: {
				originalInput: input,
				processingTime,
			},
		}
	}

	/**
	 * Maps confidence to detection method
	 */
	private getDetectionMethod(
		confidence: 'high' | 'medium' | 'low'
	): 'pattern' | 'domain' | 'url_structure' | 'none' {
		switch (confidence) {
			case 'high':
				return 'pattern'
			case 'medium':
				return 'domain'
			case 'low':
				return 'url_structure'
			default:
				return 'none'
		}
	}
}

// Export singleton instance for convenience
export const reactSocialDetector = new ReactSocialDetector()

// Export standalone function for quick usage
export function quickReactSocialDetector(
	input: string,
	username?: string,
	options?: DetectionOptions
): ReactSocialDetectionResult {
	return reactSocialDetector.detect(input, username, options)
}
