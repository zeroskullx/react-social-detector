/**
 * React Social Detector - TypeScript Library
 * A comprehensive library for detecting and validating social network URLs
 */

import {
	quickReactSocialDetector,
	ReactSocialDetector,
	reactSocialDetector,
} from './detector'
import { socialNetworkUtils } from './utils'

// Types Core Export
export type {
	DetectionOptions,
	PlatformInfo,
	ReactSocialDetectionResult,
} from './detector'
// Core exports
export {
	quickReactSocialDetector,
	ReactSocialDetector,
	reactSocialDetector,
} from './detector'
// Types Hooks Export
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
// Types Pattern Export
export type { SocialNetworkKey, SocialNetworkPatternProps } from './patterns'
// Utils Export
export { socialNetworkUtils } from './utils'

// Export everything as default for easier importing
export default {
	// Core
	ReactSocialDetector,
	reactSocialDetector,
	quickReactSocialDetector,

	// Utils
	socialNetworkUtils,
} as const
