import { UserRole } from "~/interfaces/UserRole"

export interface User {
	name: string
	tenantId: string
	password: string
	email: string
	id: string
	role: UserRole
	isActive: boolean
	createdAt: string
	updatedAt: string
}

export interface UserRecord extends User {
	tenantName: string
}
