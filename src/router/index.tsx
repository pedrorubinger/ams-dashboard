import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Text } from "@chakra-ui/react"

import { RouteItem } from "~/interfaces"
import { privateRoutes, publicRoutes } from "~/router/routes"
import { useValidateToken } from "~/hooks/useValidateToken"

export function Router() {
	const [isMounted, setIsMounted] = useState(false)
	const { isValidating, isAuthenticated } = useValidateToken()
	const routes: RouteItem[] = isAuthenticated ? privateRoutes : publicRoutes

	const isLoading = !isMounted || isValidating

	useEffect(() => {
		setIsMounted(true)

		return () => setIsMounted(false)
	}, [])

	if (isLoading) return <Text>Carregando...</Text>

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
