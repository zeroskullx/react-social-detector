import type {
	DetectionOptions,
	PlatformInfo,
	ReactSocialDetectionResult,
} from '../detector'
import type { SocialNetworkKey } from '../patterns'

// Hook Configuration Types
export interface UseReactSocialDetectorOptions extends DetectionOptions {
	readonly debounceMs?: number
	readonly autoDetect?: boolean
}

export interface UseReactSocialDetectorReturn {
	// State
	readonly result: ReactSocialDetectionResult | null
	readonly isDetecting: boolean
	readonly error: string | null

	// Actions
	readonly detect: (
		input: string,
		username?: string
	) => Promise<ReactSocialDetectionResult>
	readonly clear: () => void
	readonly extractUsername: (
		url: string,
		platform?: SocialNetworkKey
	) => string | null
	readonly validatePlatform: (
		url: string,
		expectedPlatform: SocialNetworkKey
	) => boolean

	// Utilities
	readonly supportedPlatforms: readonly PlatformInfo[]
	readonly generateProfileUrl: (
		platform: SocialNetworkKey,
		username: string
	) => string | null
}

// Bulk Detection Types
export interface UseBulkDetectionOptions extends DetectionOptions {
	readonly maxConcurrent?: number
}

export interface BulkDetectionItem {
	readonly id: string
	readonly input: string
	readonly username?: string
}

export interface BulkDetectionResult extends BulkDetectionItem {
	readonly result: ReactSocialDetectionResult
	readonly error?: string
}

export interface UseBulkReactSocialDetectorReturn {
	readonly results: readonly BulkDetectionResult[]
	readonly isDetecting: boolean
	readonly progress: { readonly completed: number; readonly total: number }
	readonly detectBulk: (
		items: readonly BulkDetectionItem[]
	) => Promise<readonly BulkDetectionResult[]>
	readonly clear: () => void
}
