import { Button, Heading } from "@chakra-ui/react"

import { useUserStore } from "~/store"

export const Home: React.FC = () => {
	const { setUser } = useUserStore()

	const logout = () => setUser(null)

	return (
		<div>
			<Heading>Home Page</Heading>
			<Button type="button" variant="link" onClick={logout}>
				Logout
			</Button>
		</div>
	)
}
