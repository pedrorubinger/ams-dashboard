import { User } from "~/interfaces/User"

export interface CreateSesssionResponse {
	token: string
	user: Omit<User, "password">
}
