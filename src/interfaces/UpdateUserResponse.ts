import { User } from "~/interfaces/User"

export interface UpdateUserResponse {
	user: Omit<User, "password" | "email">
}
