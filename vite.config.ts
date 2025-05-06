import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import federation from "@originjs/vite-plugin-federation"

export default defineConfig({
	plugins: [
		vue(),
		tailwindcss(),
		federation({
			name: "my-remote-app",
			filename: "remoteEntry.js",
			exposes: {
				"./CarouselApp": "./src/CarouselApp.vue",
			},

			shared: ["vue"],
		}),
	],
	build: {
		target: "esnext",
		minify: false,
		cssCodeSplit: true,
		cssMinify: true,
		// outDir: "dist",
	},
})
