import { UserRole } from "~/interfaces/UserRole"

export interface User {
	name: string
	password: string
	email: string
	id: string
	role: UserRole
}
