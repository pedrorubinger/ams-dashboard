import { User } from "~/interfaces/User"

export interface UserFormValues
	extends Omit<User, "id" | "createdAt" | "updatedAt"> {
	isCreating: boolean
}
