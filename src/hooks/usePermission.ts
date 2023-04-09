import { useUserStore } from "~/store"
import { RouteItem, UserRole } from "~/interfaces"

interface UsePermissionResponse {
	items: RouteItem[]
}

export const usePermission = (items: RouteItem[]): UsePermissionResponse => {
	const { user } = useUserStore()

	return {
		items: items.filter(
			(item) =>
				item.permissions.includes("*") ||
				item.permissions.includes(user?.role as UserRole)
		),
	}
}
