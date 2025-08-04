'use client'

import type React from 'react'
import { useState } from 'react'

import { SocialIcon, socialNetworkUtils } from '@/react-social-detector'
import {
	type SocialNetworkKey,
	useReactSocialDetector,
} from '../react-social-detector'
import styles from './reactSocialDetectorDemo.module.css'

const ReactSocialDetectorDemo: React.FC = () => {
	const [inputUrl, setInputUrl] = useState('')
	const [username, setUsername] = useState('')

	const {
		result,
		isDetecting,
		error,
		detect,
		clear,
		extractUsername,
		supportedPlatforms,
	} = useReactSocialDetector({
		debounceMs: 500,
		strictMode: false,
	})

	const handleDetect = async () => {
		if (!inputUrl.trim()) return
		try {
			await detect(inputUrl, username)
		} catch (err) {
			console.error('Detection failed:', err)
		}
	}

	const handleExtractUsername = () => {
		if (!inputUrl.trim()) return
		const extracted = extractUsername(
			inputUrl,
			result?.platform as SocialNetworkKey
		)
		if (extracted) setUsername(extracted)
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>React Social Detector</h1>

			<div className={styles.inputGroup}>
				<label htmlFor="url-or-domain-input">URL or Domain:</label>
				<input
					id="url-or-domain-input"
					value={inputUrl}
					onChange={(e) => setInputUrl(e.target.value)}
					placeholder="e.g., https://instagram.com/username"
				/>
			</div>

			<div className={styles.inputGroup}>
				<label htmlFor="username-input">Username (optional):</label>
				<input
					id="username-input"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="e.g., johndoe"
				/>
			</div>

			<div className={styles.actions}>
				<button
					type="button"
					onClick={handleDetect}
					disabled={isDetecting || !inputUrl.trim()}
				>
					{isDetecting ? 'Detecting...' : 'Detect'}
				</button>
				<button
					type="button"
					onClick={handleExtractUsername}
					disabled={!inputUrl.trim()}
				>
					Extract Username
				</button>
				<button type="button" onClick={clear}>
					Clear
				</button>
			</div>

			{error && <div className={styles.error}>Error: {error}</div>}

			{result && (
				<div className={styles.card}>
					<h3>Detection Result</h3>

					<div className={styles.resultGrid}>
						<div className={styles.resultGrid_row}>
							<div className={styles.info_platform}>
								<strong>Platform:</strong>{' '}
								<div className={result.isValid ? styles.valid : styles.invalid}>
									<SocialIcon
										platform={result.platform}
										pathColor="#fff"
										width={22}
										height={22}
									/>
									<span>{result.displayName || result.platform}</span>
								</div>
							</div>

							<div>
								<strong>Valid:</strong>{' '}
								<span
									className={
										result.isValid ? styles.validText : styles.invalidText
									}
								>
									{result.isValid ? 'Yes' : 'No'}
								</span>
							</div>
						</div>

						<div className={styles.resultGrid_row}>
							<div>
								<strong>Confidence:</strong>{' '}
								<span className={styles[`${result.confidence}Text`]}>
									{result.confidence}
								</span>
							</div>

							<div>
								<strong>Method:</strong>{' '}
								<span className={styles.muted}>
									{result.detectionMethod.replace('_', ' ')}
								</span>
							</div>
						</div>

						<div className={styles.resultGrid_row}>
							{result.normalizedUrl && (
								<div>
									<strong>Generated URL:</strong>{' '}
									<a
										href={result.normalizedUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										{result.normalizedUrl}
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			<div className={styles.supported}>
				<h3>Supported Platforms ({supportedPlatforms.length})</h3>

				<div className={styles.platformGrid}>
					{supportedPlatforms.map(({ key, displayName, exampleDomain }) => {
						return (
							<div
								key={key}
								className={styles.platform_icon}
								onClick={() => setInputUrl(`https://${exampleDomain}`)}
							>
								<SocialIcon platform={key} pathColor="#fff" />
								<span>{displayName}</span>
							</div>
						)
					})}
				</div>
			</div>

			<div className={styles.utils}>
				<h3>Utility Functions</h3>
				<code>
					isPlatformSupported('instagram'):{' '}
					{socialNetworkUtils.isPlatformSupported('instagram').toString()}
				</code>
				<code>
					getPlatformDisplayName('instagram'):{' '}
					{socialNetworkUtils.getPlatformDisplayName('instagram')}
				</code>
				<code>
					extractDomain('https://instagram.com/test'):{' '}
					{socialNetworkUtils.extractDomain('https://instagram.com/test')}
				</code>
				<code>
					validateUsername('testuser', 'instagram'):{' '}
					{socialNetworkUtils
						.validateUsername('testuser', 'instagram')
						.toString()}
				</code>
			</div>
		</div>
	)
}

export default ReactSocialDetectorDemo
