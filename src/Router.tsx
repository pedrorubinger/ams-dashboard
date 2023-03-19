import { Route, Routes } from "react-router-dom"

import { Home, Login } from "~/pages"

export function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}
