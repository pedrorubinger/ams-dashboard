import { UserRole } from "~/interfaces/UserRole"

export interface User {
	name: string
	tenantId: string
	password: string
	email: string
	id: string
	role: UserRole
	createdAt: string
	updatedAt: string
}
