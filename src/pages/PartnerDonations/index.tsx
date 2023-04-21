import React from "react"
import { Box, Link, Text } from "@chakra-ui/react"

import { PageTitle } from "~/components"
import { Link as RouterLink } from "react-router-dom"

interface Props {}

export const PartnerDonations: React.FC<Props> = () => {
	return (
		<Box>
			<PageTitle>Contribuições</PageTitle>

			<Text>
				Nesta página você encontra todas as contribuições registradas. Se
				desejar ver as contribuições de cada associado, acesse a página{" "}
				<Link to="/associados" color="primary.400" as={RouterLink}>
					Associados
				</Link>
				.
			</Text>
		</Box>
	)
}
