/** @jsxImportSource react */
import { forwardRef } from 'react'

import type { SocialNetworkKey } from '../../assets/patterns'
import { type IconDBKeys, iconsData } from './types'

/**
 * Props for the SocialIcon component.
 * @property platform - The supported social network platform key.
 * @property pathColor - The color of the icon path.
 * @property height - The height of the icon.
 * @property width - The width of the icon.
 * @property type - The type of icon, e.g., 'rounded'.
 * @property divProps - Additional props for the container div.
 * @property ariaLabel - ARIA label for accessibility.
 *
 * @example
 * <SocialIcon platform="instagram" pathColor="#ff0000" width={24} height={24} type="rounded" />
 * @example
 * <SocialIcon platform="unknown" ariaLabel="Unknown social icon" />
 *
 * @see {@link https://github.com/zeroskullx/react-social-detector/blob/main/examples/socialicon-examples.md}
 */
export type SocialIconProps = {
	platform?: SocialNetworkKey | 'unknown'
	ariaLabel?: string
	pathColor?: string
	height?: string | number
	width?: string | number
	type?: 'rounded' | undefined // | 'square'
	divProps?: {
		className?: string
		backgroundColor?: string
	}
}

export const SocialIcon = forwardRef<HTMLDivElement, SocialIconProps>(
	(props, ref) => {
		const localRef = ref

		const {
			platform,
			height,
			width,
			pathColor,
			type: iconType,
			divProps,
			ariaLabel,
		} = props

		const newWidth = width || '1rem'
		const newHeight = height || '1rem'

		const { path, color, viewBox } =
			iconsData[platform as IconDBKeys] || iconsData.default

		const fillColor = pathColor || color

		const _ariaLabel = ariaLabel || `${platform || 'unknown'} social icon`

		if (iconType === 'rounded') {
			return (
				<div
					ref={localRef}
					className={`${divProps?.className || ''}`}
					style={{
						backgroundColor: divProps?.backgroundColor || color,
						borderRadius: '50%',
						padding: `calc(${typeof newWidth === 'number' ? `${newWidth}px` : newWidth} / 100 * 30)`,
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'center',
					}}
				>
					<Icon
						path={path}
						title={`${platform} social icon`}
						ariaLabel={_ariaLabel}
						fillColor={fillColor}
						viewBox={viewBox}
						height={newHeight}
						width={newWidth}
					/>
				</div>
			)
		}

		return (
			<Icon
				path={path}
				title={`${platform} social icon`}
				ariaLabel={_ariaLabel || ''}
				fillColor={fillColor}
				viewBox={viewBox}
				height={newHeight}
				width={newWidth}
			/>
		)
	}
)

type IconProps = {
	path: string
	title: string
	ariaLabel?: string
	fillColor?: string
	viewBox?: string
	height?: string | number | undefined
	width?: string | number | undefined
}

const Icon = (props: IconProps) => {
	const { ariaLabel, fillColor, viewBox, height, width, path, title } = props

	const social_svg_g = {
		transition: 'fill 170ms ease-in-out',
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label={ariaLabel}
			className="social-svg"
			//stroke="currentColor"
			fill={fillColor || 'currentColor'}
			strokeWidth="0"
			viewBox={viewBox || '0 0 64 64'}
			height={height}
			width={width}
			style={{
				...social_svg_g,
			}}
		>
			<title>{title}</title>

			<path d={path} />
		</svg>
	)
}
