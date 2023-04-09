import { User } from "~/interfaces/User"

export interface ValidateTokenResponse {
	user: Omit<User, "password">
}
