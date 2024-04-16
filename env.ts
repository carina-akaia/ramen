import { Schema, defineConfig } from '@julr/vite-plugin-validate-env'

export default defineConfig({
	RAMEN_PROJECT_NAME: Schema.string(),
})
