import { User } from "~/interfaces/User"

export interface AuthState {
	isAuthenticated: boolean
	user: User | null
}
