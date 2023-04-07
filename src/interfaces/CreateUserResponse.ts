import { User } from "~/interfaces/User"

export interface CreateUserResponse {
	user: Omit<User, "password">
}
