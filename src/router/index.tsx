import { Navigate, Route, Routes } from "react-router-dom"

import { useUserStore } from "~/store"
import { RouteItem } from "~/interfaces"
import { privateRoutes, publicRoutes } from "~/router/routes"

export function Router() {
	const { user } = useUserStore()
	const isAuthenticated = !!user
	const routes: RouteItem[] = isAuthenticated ? privateRoutes : publicRoutes

	return (
		<Routes>
			{routes.map((route) => (
				<Route path={route.path} element={route.element} key={route.key} />
			))}

			{isAuthenticated ? (
				<Route path="*" element={<Navigate to="/" />} />
			) : (
				<Route path="*" element={<Navigate to="/login" />} />
			)}
		</Routes>
	)
}
