import { GetDataParams, GetDataResponse } from "~/interfaces/ServerResponse"

export type UserRole = "master" | "admin"

export interface GetUsersParams extends GetDataParams {}

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

export interface DeleteUserModalData {
	id: string
	name: string
}

export interface DeleteUserResponse {
	success: boolean
}

export interface CreateUserPayload extends Omit<UserFormValues, "isCreating"> {}

export interface UserFormValues
	extends Omit<User, "id" | "createdAt" | "updatedAt"> {
	isCreating: boolean
}

export interface CreateUserResponse {
	user: Omit<User, "password">
}

export interface UpdateUserResponse {
	user: Omit<User, "password">
}

type Values = Omit<UserFormValues, "isCreating" | "password" | "email" | "name">

export interface UpdateUserPayload extends Partial<Values> {
	id: string
}

type UsersDrawerMode = "create" | "update"

export interface UsersDrawerProps {
	isVisible: boolean
	mode: UsersDrawerMode
	user?: User
	onClose: () => void
	fetchRecords: (params?: GetUsersParams) => Promise<void>
}

export interface GetUsersResponse extends GetDataResponse {
	users: UserRecord[]
}
