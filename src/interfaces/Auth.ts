import { User } from "~/interfaces/User"

export interface CreateSesssionResponse {
	token: string
	user: Omit<User, "password">
}

export interface AuthState {
	isAuthenticated: boolean
	user: User | null
}

export interface LoginFormValues {
	email: string
	password: string
}

export interface ValidateTokenResponse {
	user: Omit<User, "password">
}
