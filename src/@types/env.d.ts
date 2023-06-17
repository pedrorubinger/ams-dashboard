/// <reference types="vite/client" />

enum AppEnvironment {
	LOCAL = "LOCAL",
	STAGING = "STAGING",
	PRODUCTION = "PRODUCTION",
}

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string
	readonly VITE_CREATOR_GITHUB_URL: string
	readonly VITE_APPLICATION_VERSION: string
	readonly VITE_APPLICATION_ENVIRONMENT: AppEnvironment
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
