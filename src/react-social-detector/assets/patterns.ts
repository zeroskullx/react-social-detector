import patterns from './patterns-db.json'
/**
 * Social Network Pattern Configuration
 * Defines patterns and configurations for detecting social network platforms
 */

export interface SocialNetworkPatternProps {
	readonly domains: readonly RegExp[]
	readonly baseUrl: string
	readonly displayName: string
	readonly exampleDomain: string
	readonly allowSubdomains?: boolean
	readonly usernamePrefix?: string
	readonly urlPattern?: RegExp
}

export const SOCIAL_NETWORKS_PATTERNS: Record<
	string,
	SocialNetworkPatternProps
> = Object.fromEntries(
	Object.entries(patterns).map(([key, value]) => [
		key,
		{
			...value,
			domains: value.domains.map((domain: string) => {
				// Remove the leading slash and trailing slash with flags
				const cleanDomain = domain.replace(/^\/(.*)\/([gimuy]*)$/, '$1')
				return new RegExp(cleanDomain)
			}),
		},
	])
)

export type SocialNetworkKey = keyof typeof SOCIAL_NETWORKS_PATTERNS
