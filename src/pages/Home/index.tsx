import { Button, Heading } from "@chakra-ui/react"

import { logout } from "~/utils"

export const Home: React.FC = () => {
	return (
		<div>
			<Heading>Home Page</Heading>
			<Button type="button" variant="link" onClick={logout}>
				Logout
			</Button>
		</div>
	)
}
