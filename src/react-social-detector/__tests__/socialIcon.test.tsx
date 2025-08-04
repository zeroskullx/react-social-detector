import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import type { SocialNetworkKey } from '../assets/patterns'
import { SocialIcon } from '../components/SocialIcon'

describe('SocialIcon Component', () => {
	describe('Basic Rendering', () => {
		it('should render default icon when no platform is provided', () => {
			render(<SocialIcon />)

			const icon = screen.getByRole('img')
			expect(icon).toBeInTheDocument()
			expect(icon).toHaveAttribute('aria-label', ' social icon')
		})

		it('should render specific platform icon', () => {
			render(<SocialIcon platform="instagram" />)

			const icon = screen.getByRole('img')
			expect(icon).toBeInTheDocument()
			expect(icon).toHaveAttribute('aria-label', 'instagram social icon')
		})

		it('should render unknown platform with default icon', () => {
			render(<SocialIcon platform="unknown" />)

			const icon = screen.getByRole('img')
			expect(icon).toBeInTheDocument()
			expect(icon).toHaveAttribute('aria-label', 'unknown social icon')
		})
	})

	describe('Platform-specific Icons', () => {
		const platforms: SocialNetworkKey[] = [
			'instagram',
			'facebook',
			'twitter',
			'youtube',
			'linkedin',
			'github',
			'tiktok',
			'discord',
			'telegram',
			'reddit',
			'twitch',
			'pinterest',
			'medium',
		]

		platforms.forEach((platform) => {
			it(`should render ${platform} icon correctly`, () => {
				render(<SocialIcon platform={platform} />)

				const icon = screen.getByRole('img')
				expect(icon).toBeInTheDocument()
				expect(icon).toHaveAttribute('aria-label', `${platform} social icon`)
			})
		})
	})

	describe('Size and Color Props', () => {
		it('should apply custom width and height', () => {
			render(<SocialIcon platform="instagram" width="2rem" height="2rem" />)

			const icon = screen.getByRole('img')
			expect(icon).toHaveAttribute('width', '2rem')
			expect(icon).toHaveAttribute('height', '2rem')
		})

		it('should apply numeric width and height', () => {
			render(<SocialIcon platform="instagram" width={32} height={32} />)

			const icon = screen.getByRole('img')
			expect(icon).toHaveAttribute('width', '32')
			expect(icon).toHaveAttribute('height', '32')
		})

		it('should apply custom path color', () => {
			render(<SocialIcon platform="instagram" pathColor="#ff0000" />)

			const icon = screen.getByRole('img')
			expect(icon).toHaveAttribute('fill', '#ff0000')
		})

		it('should use default size when not provided', () => {
			render(<SocialIcon platform="instagram" />)

			const icon = screen.getByRole('img')
			expect(icon).toHaveAttribute('width', '1rem')
			expect(icon).toHaveAttribute('height', '1rem')
		})
	})

	describe('Rounded Type', () => {
		it('should render rounded container when type is rounded', () => {
			render(<SocialIcon platform="instagram" type="rounded" />)

			// Should render a div container with rounded styles
			const container = screen.getByRole('img').parentElement
			expect(container).toBeInTheDocument()
			expect(container).toHaveStyle({ borderRadius: '50%' })
		})

		it('should apply custom div props when rounded', () => {
			render(
				<SocialIcon
					platform="instagram"
					type="rounded"
					divProps={{
						className: 'custom-class',
						backgroundColor: '#ff0000',
					}}
				/>
			)

			const container = screen.getByRole('img').parentElement
			expect(container).toHaveClass('custom-class')
			expect(container).toHaveStyle({ backgroundColor: '#ff0000' })
		})

		it('should not render container when type is not rounded', () => {
			render(<SocialIcon platform="instagram" />)

			// Should render SVG directly, not wrapped in a rounded div
			const icon = screen.getByRole('img')
			expect(icon.tagName).toBe('svg')
		})
	})

	describe('Accessibility', () => {
		it('should have proper aria-label', () => {
			render(<SocialIcon platform="github" />)

			const icon = screen.getByRole('img')
			expect(icon).toHaveAttribute('aria-label', 'github social icon')
		})

		it('should have title element', () => {
			render(<SocialIcon platform="github" />)

			const title = screen.getByTitle('github social icon')
			expect(title).toBeInTheDocument()
		})

		it('should have proper role', () => {
			render(<SocialIcon platform="github" />)

			const icon = screen.getByRole('img')
			expect(icon).toBeInTheDocument()
		})
	})

	describe('Edge Cases', () => {
		it('should handle invalid platform gracefully', () => {
			render(<SocialIcon platform="invalid-platform" />)

			const icon = screen.getByRole('img')
			expect(icon).toBeInTheDocument()
		})

		it('should handle zero dimensions', () => {
			render(<SocialIcon platform="instagram" width={0} height={0} />)

			const icon = screen.getByRole('img')
			// Zero dimensions fallback to default size
			expect(icon).toHaveAttribute('width', '1rem')
			expect(icon).toHaveAttribute('height', '1rem')
		})

		it('should handle negative dimensions gracefully', () => {
			render(<SocialIcon platform="instagram" width={-10} height={-10} />)

			const icon = screen.getByRole('img')
			// Should still render, browser will handle negative values
			expect(icon).toBeInTheDocument()
		})
	})

	describe('Ref Forwarding', () => {
		it('should forward ref correctly for rounded type', () => {
			const refCallback = vi.fn()

			render(
				<SocialIcon platform="instagram" type="rounded" ref={refCallback} />
			)

			expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLDivElement))
		})
	})
})
