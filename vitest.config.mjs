import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		react({
			jsxRuntime: 'automatic',
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['vitest.setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/**',
				'coverage/**',
				'.next/**',
				'dist/**',
				'build/**',
				'**/*.d.ts',
				'**/*.config.{js,ts}',
				'next.config.ts',
				'rollup.config.js',
				'__mocks__/**',
				'**/*.{test,spec}.{js,ts,jsx,tsx}',
			],
		},
	},
})
