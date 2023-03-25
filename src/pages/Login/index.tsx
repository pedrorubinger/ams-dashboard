import { Box, Card, Container, Divider, Heading, Image } from "@chakra-ui/react"

import LogoSvg from "~/assets/vector/Logo.svg"
import { LoginForm } from "~/pages/Login/components"

export const Login = () => {
	return (
		<Container>
			<Box my={10} display="flex" justifyContent="center">
				<Image src={LogoSvg} width={10} height={10} />
			</Box>

			<Card
				variant="elevated"
				boxShadow="md"
				border="thin"
				display="flex"
				justifyContent="center"
				alignItems="center"
				p={7}
			>
				<Heading size="md" color="blackAlpha.700">
					Bem-vindo(a) de volta!
				</Heading>

				<Divider mt={4} mb={6} color="blackAlpha.300" />

				<LoginForm />
			</Card>
		</Container>
	)
}
