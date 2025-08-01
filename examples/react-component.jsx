// React Hook usage example for react-social-detector library

import { useState } from 'react'
import { useSocialNetworkDetection } from 'react-social-detector'

function SocialNetworkDetector() {
	const [inputUrl, setInputUrl] = useState('')
	const {
		detectNetwork,
		isValidUrl,
		clearDetection,
		detectionResult,
		isLoading,
	} = useSocialNetworkDetection()

	const handleDetection = () => {
		if (inputUrl.trim()) {
			detectNetwork(inputUrl.trim())
		}
	}

	const handleClear = () => {
		setInputUrl('')
		clearDetection()
	}

	const urlExamples = [
		'https://youtube.com/@creator',
		'https://instagram.com/user',
		'https://twitter.com/handle',
		'https://linkedin.com/in/profile',
		'https://github.com/username',
		'https://tiktok.com/@user',
	]

	return (
		<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
			<h1>🔍 Social Network URL Detector</h1>

			<div style={{ marginBottom: '20px' }}>
				<h3>Enter a social network URL:</h3>
				<div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
					<input
						type="text"
						value={inputUrl}
						onChange={(e) => setInputUrl(e.target.value)}
						placeholder="https://instagram.com/username"
						style={{
							flex: 1,
							padding: '10px',
							border: '1px solid #ccc',
							borderRadius: '4px',
							fontSize: '14px',
						}}
						onKeyPress={(e) => e.key === 'Enter' && handleDetection()}
					/>
					<button
						onClick={handleDetection}
						disabled={!inputUrl.trim() || isLoading}
						style={{
							padding: '10px 20px',
							backgroundColor: '#007bff',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '14px',
						}}
					>
						{isLoading ? 'Detecting...' : 'Detect'}
					</button>
					<button
						onClick={handleClear}
						style={{
							padding: '10px 20px',
							backgroundColor: '#6c757d',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '14px',
						}}
					>
						Clear
					</button>
				</div>

				{/* URL Validation Indicator */}
				{inputUrl && (
					<div style={{ fontSize: '12px', marginBottom: '10px' }}>
						URL Format:{' '}
						{isValidUrl(inputUrl) ? (
							<span style={{ color: 'green' }}>✅ Valid URL</span>
						) : (
							<span style={{ color: 'red' }}>❌ Invalid URL</span>
						)}
					</div>
				)}
			</div>

			{/* Detection Result */}
			{detectionResult && (
				<div
					style={{
						padding: '15px',
						border: '1px solid #ddd',
						borderRadius: '8px',
						backgroundColor: '#f8f9fa',
						marginBottom: '20px',
					}}
				>
					<h4 style={{ margin: '0 0 10px 0', color: '#28a745' }}>
						✅ Social Network Detected!
					</h4>
					<div>
						<strong>Platform:</strong> {detectionResult.name}
					</div>
					<div>
						<strong>Domain:</strong> {detectionResult.domain}
					</div>
					<div>
						<strong>URL:</strong> {detectionResult.url}
					</div>
				</div>
			)}

			{/* No Detection Result */}
			{inputUrl && detectionResult === null && !isLoading && (
				<div
					style={{
						padding: '15px',
						border: '1px solid #ffc107',
						borderRadius: '8px',
						backgroundColor: '#fff3cd',
						marginBottom: '20px',
					}}
				>
					<h4 style={{ margin: '0 0 10px 0', color: '#856404' }}>
						❌ No Social Network Detected
					</h4>
					<p style={{ margin: 0 }}>
						The URL doesn't match any known social network patterns.
					</p>
				</div>
			)}

			{/* Example URLs */}
			<div>
				<h3>Try these examples:</h3>
				<div style={{ display: 'grid', gap: '5px' }}>
					{urlExamples.map((url, index) => (
						<button
							key={index}
							onClick={() => setInputUrl(url)}
							style={{
								padding: '8px 12px',
								border: '1px solid #007bff',
								backgroundColor: 'white',
								color: '#007bff',
								borderRadius: '4px',
								cursor: 'pointer',
								fontSize: '12px',
								textAlign: 'left',
							}}
						>
							{url}
						</button>
					))}
				</div>
			</div>

			{/* Features Info */}
			<div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
				<h4>Features:</h4>
				<ul>
					<li>✅ Detects 37+ social networks and platforms</li>
					<li>✅ Real-time URL validation</li>
					<li>✅ TypeScript support</li>
					<li>✅ React hook integration</li>
					<li>✅ Performance optimized</li>
				</ul>
			</div>
		</div>
	)
}

export default SocialNetworkDetector
