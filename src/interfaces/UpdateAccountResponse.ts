import { User } from "~/interfaces/User"

export interface UpdateAccountResponse {
	user: Omit<User, "password" | "phone">
	token: string
}
