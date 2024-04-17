import { ValidateEnv } from "@julr/vite-plugin-validate-env"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react"
import UnoCSS from "unocss/vite"
import { defineConfig } from "vite"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
	envPrefix: "RAMEN",

	plugins: [
		tsconfigPaths(),
		ValidateEnv(),
		react(),
		svgr(),
		UnoCSS(),

		TanStackRouterVite({
			routesDirectory: "src/app",
			generatedRouteTree: "src/app.gen.ts",
		}),

		VitePWA({
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},

			injectRegister: "auto",
			includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "maskable-icon-512x512.png"],
			registerType: "autoUpdate",

			manifest: {
				name: "DRY Ramen",
				short_name: "Ramen",
				description: "Offline-first scalable battle-tested React app template. Just add water.",
				theme_color: "#000000",

				icons: [
					{ src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
					{ src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
					{ src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },

					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),

		chunkSplitPlugin({
			strategy: "unbundle",

			customSplitting: {
				// '_vendor/react': ['react'],
			},
		}),
	],

	server: { port: 1337 },

	build: {
		sourcemap: true,

		rollupOptions: {
			// Prettify the chunk paths & drop hash in asset names
			output: {
				entryFileNames: "[name].js",
				chunkFileNames: ({ name }) => `${name.replace(/(\.\.\/|src\/)/g, "")}.js`,
				assetFileNames: ({ name = "[hash]" }) => `${name.replace(/(\.\.\/|src\/)/g, "")}.[ext]`,
			},
		},
	},
})
