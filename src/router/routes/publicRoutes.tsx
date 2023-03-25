import { RouteItem } from "~/interfaces"
import { Login } from "~/pages"

export const publicRoutes: RouteItem[] = [
	{ key: "login", element: <Login />, path: "/login" },
]
