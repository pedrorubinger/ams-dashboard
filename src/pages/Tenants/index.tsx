import { Box, Text } from "@chakra-ui/react"

import { TenantsTable } from "~/pages/Tenants/components"
import { PageTitle } from "~/components"

export const Tenants: React.FC = () => {
	return (
		<Box width="100%">
			<PageTitle>Instituições</PageTitle>

			<Text>
				Nesta página você encontra as informações das instituições atualmente
				cadastradas no sistema.
			</Text>

			<TenantsTable />
		</Box>
	)
}
