import { User } from "phosphor-react"

import { RouteItem } from "~/interfaces"
import { Login } from "~/pages"

export const publicRoutes: RouteItem[] = [
	{
		id: "login",
		path: "/login",
		label: "Login",
		permissions: ["*"],
		Icon: User,
		element: <Login />,
	},
]
