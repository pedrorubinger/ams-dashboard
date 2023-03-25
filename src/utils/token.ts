export const TOKEN_ID = "@token"

export const getToken = (): string | null => {
	return localStorage.getItem(TOKEN_ID)
}

export const setToken = (token: string): void => {
	localStorage.setItem(TOKEN_ID, token)
}
