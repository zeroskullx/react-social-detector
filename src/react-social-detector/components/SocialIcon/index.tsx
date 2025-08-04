/** @jsxImportSource react */
import { forwardRef } from 'react'

import type { SocialNetworkKey } from '../../patterns'
import { type IconDBKeys, iconsData } from './iconsData'

/**
 * Props for the SocialIcon component.
 * @property platform - The supported social network platform key.
 * @property pathColor - The color of the icon path.
 * @property height - The height of the icon.
 * @property width - The width of the icon.
 */
export type SocialIconProps = {
	platform?: SocialNetworkKey | 'unknown'
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
		} = props

		const newWidth = width || '1rem'
		const newHeight = height || '1rem'

		const { path, color, viewBox } =
			iconsData[platform as IconDBKeys] || iconsData.default

		const fillColor = pathColor || color

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
						ariaLabel={platform || ''}
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
				ariaLabel={platform || ''}
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
	ariaLabel?: string
	fillColor?: string
	viewBox?: string
	height?: string | number | undefined
	width?: string | number | undefined
}

const Icon = (props: IconProps) => {
	const { ariaLabel, fillColor, viewBox, height, width, path } = props

	const social_svg_g = {
		transition: 'fill 170ms ease-in-out',
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label={`${ariaLabel} social icon`}
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
			<title>{`${ariaLabel} social icon`}</title>

			<path d={path} />
		</svg>
	)
}
