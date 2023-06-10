import { User } from "~/interfaces/User"

export interface UpdateAccountResponse {
	user: Omit<User, "password" | "phone">
	token: string
}

export interface AccountFormValues {
	name: string
	email: string
	password: string
	phone?: string
	changePassword: boolean
	newPassword?: string
}

export interface UpdateAccountPayload {
	name: string
	password: string
	newPassword?: string
}
