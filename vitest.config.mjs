import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
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
