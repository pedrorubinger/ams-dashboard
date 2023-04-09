import { GetUsersParams, User } from "~/interfaces"

type UsersDrawerMode = "create" | "update"

export interface UsersDrawerProps {
	isVisible: boolean
	mode: UsersDrawerMode
	user?: User
	onClose: () => void
	fetchRecords: (params?: GetUsersParams) => Promise<void>
}
