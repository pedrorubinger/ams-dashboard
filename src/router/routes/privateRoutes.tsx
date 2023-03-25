import { RouteItem } from "~/interfaces"
import { Home } from "~/pages"

export const privateRoutes: RouteItem[] = [
	{ key: "home", element: <Home />, path: "/" },
]
