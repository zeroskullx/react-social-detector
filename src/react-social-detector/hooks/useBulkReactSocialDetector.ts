import { useCallback, useMemo, useState } from 'react'

import { reactSocialDetector } from '../lib/detector'
import type {
	BulkDetectionItem,
	BulkDetectionResult,
	UseBulkDetectionOptions,
	UseBulkReactSocialDetectorReturn,
} from './types'

/**
 * React hook for bulk social network detection with concurrency control
 */
export function useBulkReactSocialDetector(
	options: UseBulkDetectionOptions = {}
): UseBulkReactSocialDetectorReturn {
	const {
		maxConcurrent = 5,
		strictMode,
		includeSubdomains,
		caseSensitive,
		extractMetadata,
	} = options

	// Memoize detection options to prevent unnecessary re-renders
	const detectionOptions = useMemo(() => {
		const opts: Record<string, unknown> = {}
		if (strictMode !== undefined) opts.strictMode = strictMode
		if (includeSubdomains !== undefined)
			opts.includeSubdomains = includeSubdomains
		if (caseSensitive !== undefined) opts.caseSensitive = caseSensitive
		if (extractMetadata !== undefined) opts.extractMetadata = extractMetadata
		return opts
	}, [strictMode, includeSubdomains, caseSensitive, extractMetadata])

	const [results, setResults] = useState<readonly BulkDetectionResult[]>([])
	const [isDetecting, setIsDetecting] = useState(false)
	const [progress, setProgress] = useState({ completed: 0, total: 0 })

	const detectBulk = useCallback(
		async (
			items: readonly BulkDetectionItem[]
		): Promise<readonly BulkDetectionResult[]> => {
			if (!items.length) {
				return []
			}

			setIsDetecting(true)
			setResults([])
			setProgress({ completed: 0, total: items.length })

			const results: BulkDetectionResult[] = []

			// Process items in chunks for concurrency control
			const chunks: BulkDetectionItem[][] = []
			for (let i = 0; i < items.length; i += maxConcurrent) {
				chunks.push(items.slice(i, i + maxConcurrent))
			}

			try {
				for (const chunk of chunks) {
					const chunkPromises = chunk.map(
						async (item): Promise<BulkDetectionResult> => {
							try {
								const result = reactSocialDetector.detect(
									item.input,
									item.username,
									{
										...detectionOptions,
										extractMetadata: true,
									}
								)

								// Check if the result indicates an error (invalid input)
								if (!result.isValid && result.platform === 'unknown') {
									return {
										...item,
										result,
										error: 'Invalid input provided',
									}
								}

								return {
									...item,
									result,
								}
							} catch (error) {
								return {
									...item,
									result: {
										platform: 'unknown' as const,
										isValid: false,
										confidence: 'low' as const,
										detectionMethod: 'none' as const,
										metadata: {
											originalInput: item.input,
										},
									},
									error:
										error instanceof Error ? error.message : 'Detection failed',
								}
							}
						}
					)

					const chunkResults = await Promise.all(chunkPromises)
					results.push(...chunkResults)

					setProgress((prev) => ({ ...prev, completed: results.length }))
					setResults([...results])
				}

				setIsDetecting(false)
				return results
			} catch (error) {
				setIsDetecting(false)
				throw error
			}
		},
		[maxConcurrent, detectionOptions]
	)

	const clear = useCallback(() => {
		setResults([])
		setProgress({ completed: 0, total: 0 })
		setIsDetecting(false)
	}, [])

	return {
		results,
		isDetecting,
		progress,
		detectBulk,
		clear,
	}
}
