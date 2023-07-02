const APPLICATION_ENVIRONMENT: string = import.meta.env
	.VITE_APPLICATION_ENVIRONMENT

export const isDevEnv = ["LOCAL"].includes(APPLICATION_ENVIRONMENT)
