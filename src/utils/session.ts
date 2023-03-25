import { useUserStore } from "~/store"

export const TOKEN_ID = "@user-session"

export const getToken = (): string | null => {
	return localStorage.getItem(TOKEN_ID)
}

export const setToken = (token: string | null): void => {
	return token ? localStorage.setItem(TOKEN_ID, token) : localStorage.clear()
}

export const logout = () => {
	useUserStore.getState().setUser(null)
	setToken(null)
}
