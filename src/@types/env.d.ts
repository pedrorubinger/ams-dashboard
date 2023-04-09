/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string
	readonly VITE_CREATOR_GITHUB_URL: string
	readonly VITE_APPLICATION_VERSION: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
