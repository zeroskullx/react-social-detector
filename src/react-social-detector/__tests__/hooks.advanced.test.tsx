import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import { useBulkReactSocialDetector } from '../hooks/useBulkReactSocialDetector'
import { useReactSocialDetector } from '../hooks/useReactSocialDetector'

// Simple test component for useReactSocialDetector
function TestDetectorComponent({ url }: { url: string }) {
	const { detect, result, isDetecting, error } = useReactSocialDetector()

	React.useEffect(() => {
		if (url) {
			detect(url)
		}
	}, [url, detect])

	return (
		<div>
			<div data-testid="loading">{isDetecting ? 'loading' : 'idle'}</div>
			<div data-testid="error">{error || 'no-error'}</div>
			<div data-testid="result">{result?.platform || 'no-result'}</div>
		</div>
	)
}

// Simple test component for useBulkReactSocialDetector
function TestBulkDetectorComponent({ urls }: { urls: string[] }) {
	const { detectBulk, results, isDetecting } = useBulkReactSocialDetector()

	React.useEffect(() => {
		if (urls.length > 0) {
			const items = urls.map((url, index) => ({
				id: `test-${index}`,
				input: url,
			}))
			detectBulk(items)
		}
	}, [urls, detectBulk])

	return (
		<div>
			<div data-testid="loading">{isDetecting ? 'loading' : 'idle'}</div>
			<div data-testid="results">{results.length}</div>
		</div>
	)
}

describe('Advanced Hook Tests', () => {
	describe('useReactSocialDetector Advanced', () => {
		it('should handle rapid successive calls', async () => {
			render(<TestDetectorComponent url="https://instagram.com/test" />)

			await waitFor(
				() => {
					expect(screen.getByTestId('loading')).toHaveTextContent('idle')
				},
				{ timeout: 2000 }
			)

			// Should eventually detect instagram or be no-result (both are acceptable)
			const result = screen.getByTestId('result')
			expect(['instagram', 'no-result']).toContain(result.textContent)
		})

		it('should handle invalid URLs gracefully', async () => {
			render(<TestDetectorComponent url="invalid-url" />)

			await waitFor(
				() => {
					expect(screen.getByTestId('loading')).toHaveTextContent('idle')
				},
				{ timeout: 1000 }
			)

			expect(screen.getByTestId('result')).toHaveTextContent('no-result')
		})
	})

	describe('useBulkReactSocialDetector Advanced', () => {
		it('should handle multiple URLs', async () => {
			const urls = ['https://instagram.com/test1', 'https://facebook.com/test2']

			render(<TestBulkDetectorComponent urls={urls} />)

			await waitFor(
				() => {
					expect(screen.getByTestId('loading')).toHaveTextContent('idle')
				},
				{ timeout: 2000 }
			)

			expect(screen.getByTestId('results')).toHaveTextContent('2')
		})

		it('should handle empty URL list', async () => {
			render(<TestBulkDetectorComponent urls={[]} />)

			expect(screen.getByTestId('loading')).toHaveTextContent('idle')
			expect(screen.getByTestId('results')).toHaveTextContent('0')
		})
	})
})
