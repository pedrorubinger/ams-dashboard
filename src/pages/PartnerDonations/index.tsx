import React from "react"
import { Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

import { ReportsContainer } from "~/pages/PartnerDonations/styles"
import { ContentSection, PageTitle } from "~/components"

interface Props {}

export const PartnerDonations: React.FC<Props> = () => {
	return (
		<>
			<ContentSection>
				<PageTitle>Contribuições</PageTitle>

				<Text>
					Nesta página você encontra todas as contribuições registradas.
					<br />
					Se você deseja ver as contribuições de cada associado, acesse a
					página&nbsp;
					<Link to="/associados" color="primary.400" as={RouterLink}>
						Associados
					</Link>
					.
				</Text>
			</ContentSection>

			<ReportsContainer>
				<ContentSection mt={6}>
					<Text color="gray.500" fontSize={18}>
						Diário
					</Text>
					<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
						R$ 144,55
					</Text>
				</ContentSection>

				<ContentSection mt={6}>
					<Text color="gray.500" fontSize={18}>
						Mensal
					</Text>
					<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
						R$ 484,62
					</Text>
				</ContentSection>

				<ContentSection mt={6}>
					<Text color="gray.500" fontSize={18}>
						Anual
					</Text>
					<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
						R$ 9.144,55
					</Text>
				</ContentSection>
			</ReportsContainer>
		</>
	)
}
