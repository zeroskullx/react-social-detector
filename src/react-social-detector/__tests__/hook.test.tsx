import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { ReactSocialDetectionResult } from '../detector'
import type {
	BulkDetectionItem,
	UseReactSocialDetectorOptions,
} from '../hooks/types'
import { useBulkReactSocialDetector } from '../hooks/useBulkReactSocialDetector'
import { useReactSocialDetector } from '../hooks/useReactSocialDetector'

describe('useReactSocialDetector Hook', () => {
	beforeEach(() => {
		vi.clearAllTimers()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('Basic Functionality', () => {
		it('should initialize with correct default state', () => {
			const { result } = renderHook(() => useReactSocialDetector())

			expect(result.current.result).toBe(null)
			expect(result.current.isDetecting).toBe(false)
			expect(result.current.error).toBe(null)
			expect(result.current.supportedPlatforms).toBeDefined()
			expect(Array.isArray(result.current.supportedPlatforms)).toBe(true)
		})

		it('should provide all required functions', () => {
			const { result } = renderHook(() => useReactSocialDetector())

			expect(typeof result.current.detect).toBe('function')
			expect(typeof result.current.clear).toBe('function')
			expect(typeof result.current.extractUsername).toBe('function')
			expect(typeof result.current.validatePlatform).toBe('function')
			expect(typeof result.current.generateProfileUrl).toBe('function')
		})
	})

	describe('Detection Functionality', () => {
		it('should detect Instagram URL successfully', async () => {
			const { result } = renderHook(() => useReactSocialDetector())

			let detectionPromise: Promise<ReactSocialDetectionResult>

			act(() => {
				detectionPromise = result.current.detect(
					'https://instagram.com/testuser'
				)
			})

			const detectionResult = await detectionPromise!

			expect(detectionResult.platform).toBe('instagram')
			expect(detectionResult.isValid).toBe(true)
		})

		it('should handle detection with username', async () => {
			const { result } = renderHook(() => useReactSocialDetector())

			let detectionPromise: Promise<ReactSocialDetectionResult>

			act(() => {
				detectionPromise = result.current.detect(
					'https://instagram.com',
					'testuser'
				)
			})

			const detectionResult = await detectionPromise!

			expect(detectionResult.normalizedUrl).toBe(
				'https://instagram.com/testuser'
			)
		})

		it('should handle detection errors', async () => {
			const { result } = renderHook(() => useReactSocialDetector())

			let caughtError: Error | null = null

			act(() => {
				result.current.detect('').catch((err: Error) => {
					caughtError = err
				})
			})

			// Wait for the promise to resolve/reject
			await new Promise((resolve) => setTimeout(resolve, 100))

			expect(caughtError).toBeInstanceOf(Error)
			expect(result.current.error).toContain('required')
		})
	})

	describe('Clear Functionality', () => {
		it('should clear state correctly', async () => {
			const { result } = renderHook(() => useReactSocialDetector())

			// First, set some state
			await act(async () => {
				await result.current.detect('https://instagram.com/testuser')
			})

			// Now clear it
			act(() => {
				result.current.clear()
			})

			expect(result.current.result).toBe(null)
			expect(result.current.error).toBe(null)
			expect(result.current.isDetecting).toBe(false)
		})
	})

	describe('Utility Functions', () => {
		it('should extract username correctly', () => {
			const { result } = renderHook(() => useReactSocialDetector())

			const username = result.current.extractUsername(
				'https://instagram.com/testuser'
			)
			expect(username).toBe('testuser')
		})

		it('should validate platform correctly', () => {
			const { result } = renderHook(() => useReactSocialDetector())

			const isValid = result.current.validatePlatform(
				'https://instagram.com/test',
				'instagram'
			)
			expect(isValid).toBe(true)

			const isInvalid = result.current.validatePlatform(
				'https://instagram.com/test',
				'facebook'
			)
			expect(isInvalid).toBe(false)
		})

		it('should generate profile URL correctly', () => {
			const { result } = renderHook(() => useReactSocialDetector())

			const url = result.current.generateProfileUrl('instagram', 'testuser')
			expect(url).toBe('https://instagram.com/testuser')
		})
	})

	describe('Hook Options', () => {
		it('should use hook with custom debounce', async () => {
			const options: UseReactSocialDetectorOptions = {
				debounceMs: 100,
			}

			const { result } = renderHook(() => useReactSocialDetector(options))

			const detectionResult = await act(async () => {
				return result.current.detect('https://instagram.com/testuser')
			})

			expect(detectionResult.platform).toBe('instagram')
		})
	})
})

describe('useBulkReactSocialDetector Hook', () => {
	beforeEach(() => {
		vi.clearAllTimers()
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('Basic Functionality', () => {
		it('should initialize with correct default state', () => {
			const { result } = renderHook(() => useBulkReactSocialDetector())

			expect(result.current.results).toEqual([])
			expect(result.current.isDetecting).toBe(false)
			expect(result.current.progress.completed).toBe(0)
			expect(result.current.progress.total).toBe(0)
		})

		it('should provide required functions', () => {
			const { result } = renderHook(() => useBulkReactSocialDetector())

			expect(typeof result.current.detectBulk).toBe('function')
			expect(typeof result.current.clear).toBe('function')
		})
	})

	describe('Bulk Detection', () => {
		it('should handle bulk detection successfully', async () => {
			const { result } = renderHook(() => useBulkReactSocialDetector())

			const items: BulkDetectionItem[] = [
				{ id: '1', input: 'https://instagram.com/user1' },
				{ id: '2', input: 'https://twitter.com/user2' },
				{ id: '3', input: 'https://github.com/user3' },
			]

			const results = await act(async () => {
				return result.current.detectBulk(items)
			})

			expect(results).toHaveLength(3)
			expect(results[0].result.platform).toBe('instagram')
			expect(results[1].result.platform).toBe('twitter')
			expect(results[2].result.platform).toBe('github')
			expect(result.current.progress.completed).toBe(3)
			expect(result.current.progress.total).toBe(3)
		})

		it('should handle empty bulk detection', async () => {
			const { result } = renderHook(() => useBulkReactSocialDetector())

			const results = await act(async () => {
				return result.current.detectBulk([])
			})

			expect(results).toEqual([])
			expect(result.current.isDetecting).toBe(false)
		})

		it('should handle errors in bulk detection', async () => {
			const { result } = renderHook(() => useBulkReactSocialDetector())

			const items: BulkDetectionItem[] = [
				{ id: '1', input: 'https://instagram.com/user1' },
				{ id: '2', input: '' }, // This should cause an error
				{ id: '3', input: 'https://github.com/user3' },
			]

			const results = await act(async () => {
				return result.current.detectBulk(items)
			})

			expect(results).toHaveLength(3)
			expect(results[0].result.platform).toBe('instagram')
			expect(results[1].result.platform).toBe('unknown')
			expect(results[1].error).toBeDefined()
			expect(results[2].result.platform).toBe('github')
		})

		it('should respect maxConcurrent option', async () => {
			const { result } = renderHook(() =>
				useBulkReactSocialDetector({ maxConcurrent: 2 })
			)

			const items: BulkDetectionItem[] = [
				{ id: '1', input: 'https://instagram.com/user1' },
				{ id: '2', input: 'https://twitter.com/user2' },
				{ id: '3', input: 'https://github.com/user3' },
				{ id: '4', input: 'https://linkedin.com/in/user4' },
			]

			const results = await act(async () => {
				return result.current.detectBulk(items)
			})

			expect(results).toHaveLength(4)
			// All should be processed, just in smaller concurrent batches
			expect(results.every((r: any) => r.result.isValid)).toBe(true)
		})
	})

	describe('Clear Functionality', () => {
		it('should clear state correctly', async () => {
			const { result } = renderHook(() => useBulkReactSocialDetector())

			const items: BulkDetectionItem[] = [
				{ id: '1', input: 'https://instagram.com/user1' },
			]

			await act(async () => {
				await result.current.detectBulk(items)
			})

			expect(result.current.results).toHaveLength(1)

			act(() => {
				result.current.clear()
			})

			expect(result.current.results).toEqual([])
			expect(result.current.progress.completed).toBe(0)
			expect(result.current.progress.total).toBe(0)
			expect(result.current.isDetecting).toBe(false)
		})
	})
})
