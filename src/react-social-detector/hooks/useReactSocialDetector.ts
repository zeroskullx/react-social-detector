import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { SocialNetworkKey } from '../assets/patterns'
import {
	type ReactSocialDetectionResult,
	reactSocialDetector,
} from '../detector'
import type {
	UseReactSocialDetectorOptions,
	UseReactSocialDetectorReturn,
} from './types'

/**
 * React hook for social network detection with debouncing and error handling
 */
export function useReactSocialDetector(
	options: UseReactSocialDetectorOptions = {}
): UseReactSocialDetectorReturn {
	const {
		debounceMs = 300,
		strictMode,
		includeSubdomains,
		caseSensitive,
		extractMetadata,
	} = options

	// Memoize detection options to prevent unnecessary re-renders
	const detectionOptions = useMemo(() => {
		const options: Record<string, unknown> = {}
		if (strictMode !== undefined) options.strictMode = strictMode
		if (includeSubdomains !== undefined)
			options.includeSubdomains = includeSubdomains
		if (caseSensitive !== undefined) options.caseSensitive = caseSensitive
		if (extractMetadata !== undefined) options.extractMetadata = extractMetadata
		return options
	}, [strictMode, includeSubdomains, caseSensitive, extractMetadata])

	// State
	const [result, setResult] = useState<ReactSocialDetectionResult | null>(null)
	const [isDetecting, setIsDetecting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// Refs for cleanup and debouncing
	const debounceRef = useRef<NodeJS.Timeout | null>(null)
	const abortControllerRef = useRef<AbortController | null>(null)

	// Memoized supported platforms - avoid recreating on every render
	const supportedPlatforms = useMemo(
		() => reactSocialDetector.getSupportedPlatforms(),
		[]
	)

	// Cleanup function
	const cleanup = useCallback(() => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current)
			debounceRef.current = null
		}

		if (abortControllerRef.current) {
			abortControllerRef.current.abort()
			abortControllerRef.current = null
		}
	}, [])

	// Clear function
	const clear = useCallback(() => {
		cleanup()
		setResult(null)
		setError(null)
		setIsDetecting(false)
	}, [cleanup])

	// Detection function with proper error handling
	const detect = useCallback(
		async (
			input: string,
			username?: string
		): Promise<ReactSocialDetectionResult> => {
			// Validate input
			if (!input?.trim()) {
				const errorMsg = 'Input URL or domain is required'
				setError(errorMsg)
				throw new Error(errorMsg)
			}

			// Cleanup previous detection
			cleanup()

			// Create new abort controller
			abortControllerRef.current = new AbortController()
			const { signal } = abortControllerRef.current

			return new Promise((resolve, reject) => {
				const performDetection = async () => {
					try {
						// Check if aborted before starting
						if (signal.aborted) {
							throw new Error('Detection aborted')
						}

						setIsDetecting(true)
						setError(null)

						// Perform detection
						const detectionResult = reactSocialDetector.detect(
							input.trim(),
							username?.trim(),
							{ ...detectionOptions, extractMetadata: true }
						)

						// Check if aborted before setting result
						if (signal.aborted) {
							throw new Error('Detection aborted')
						}

						setResult(detectionResult)
						setIsDetecting(false)
						resolve(detectionResult)
					} catch (err) {
						if (!signal.aborted) {
							const errorMessage =
								err instanceof Error ? err.message : 'Detection failed'
							setError(errorMessage)
							setResult(null)
							setIsDetecting(false)
							reject(new Error(errorMessage))
						}
					}
				}

				// Apply debouncing
				debounceRef.current = setTimeout(performDetection, debounceMs)
			})
		},
		[detectionOptions, debounceMs, cleanup]
	)

	// Extract username function with error handling
	const extractUsername = useCallback(
		(url: string, platform?: SocialNetworkKey): string | null => {
			try {
				setError(null)
				return reactSocialDetector.extractUsername(url, platform)
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Username extraction failed'
				setError(errorMessage)
				return null
			}
		},
		[]
	)

	// Validate platform function with error handling
	const validatePlatform = useCallback(
		(url: string, expectedPlatform: SocialNetworkKey): boolean => {
			try {
				setError(null)
				return reactSocialDetector.validatePlatform(url, expectedPlatform)
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Platform validation failed'
				setError(errorMessage)
				return false
			}
		},
		[]
	)

	// Generate profile URL function with error handling
	const generateProfileUrl = useCallback(
		(platform: SocialNetworkKey, username: string): string | null => {
			try {
				setError(null)
				return reactSocialDetector.generateProfileUrl(platform, username.trim())
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'URL generation failed'
				setError(errorMessage)
				return null
			}
		},
		[]
	)

	// Cleanup on unmount
	useEffect(() => {
		return cleanup
	}, [cleanup])

	return {
		// State
		result,
		isDetecting,
		error,

		// Actions
		detect,
		clear,
		extractUsername,
		validatePlatform,

		// Utilities
		supportedPlatforms,
		generateProfileUrl,
	}
}
