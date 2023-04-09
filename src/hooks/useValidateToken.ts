import { useCallback, useEffect, useState } from "react"

import { useUserStore } from "~/store"
import { validateToken } from "~/services"
import { getToken } from "~/utils"

interface ValidateTokenHookResponse {
	isAuthenticated: boolean
	isValidating: boolean
}

export const useValidateToken = (): ValidateTokenHookResponse => {
	const { user, setUser } = useUserStore()
	const [isValidating, setIsValidating] = useState(false)
	const isAuthenticated = !!user

	const fetchData = useCallback(async () => {
		if (!getToken()) return setUser(null)

		setIsValidating(true)

		const { data } = await validateToken()

		if (data) {
			setUser({
				email: data.user.email,
				name: data.user.name,
				role: data.user.role,
				id: data.user.id,
			})
		}

		setIsValidating(false)
	}, [])

	useEffect(() => {
		void fetchData()
	}, [fetchData])

	return { isAuthenticated, isValidating }
}
