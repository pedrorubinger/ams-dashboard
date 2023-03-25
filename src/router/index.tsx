import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Progress, Stack } from "@chakra-ui/react"

import { RouteItem } from "~/interfaces"
import { privateRoutes, publicRoutes } from "~/router/routes"
import { useValidateToken } from "~/hooks/useValidateToken"
import { DashboardLayout } from "~/layouts/Dashboard"

export function Router() {
	const [isMounted, setIsMounted] = useState(false)
	const { isValidating, isAuthenticated } = useValidateToken()
	const isLoading = !isMounted || isValidating

	useEffect(() => {
		setIsMounted(true)

		return () => setIsMounted(false)
	}, [])

	if (isLoading) {
		return (
			<Stack spacing={5}>
				<Progress
					colorScheme="primary"
					size="sm"
					value={20}
					height={2}
					isIndeterminate
				/>
			</Stack>
		)
	}

	const renderRoutes = (): JSX.Element | JSX.Element[] => {
		const list: RouteItem[] = isAuthenticated ? privateRoutes : publicRoutes
		const routes = list.map((route) => (
			<Route path={route.path} element={route.element} key={route.id} />
		))

		if (isAuthenticated) {
			return (
				<Route path="/" element={<DashboardLayout />}>
					{routes}
				</Route>
			)
		}

		return routes
	}

	return (
		<Routes>
			{renderRoutes()}

			{isAuthenticated ? (
				<Route path="*" element={<Navigate to="/" />} />
			) : (
				<Route path="*" element={<Navigate to="/login" />} />
			)}
		</Routes>
	)
}
