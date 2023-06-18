import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { ContentSection, Tooltip } from "~/components"
import { usePartnerReports } from "~/pages/Donations/hooks"
import { ReportsSection } from "~/pages/Donations/components/Reports"

interface Props {}

export const PartnerReports: React.FC<Props> = () => {
	const { arrearsPartners, upToDatePartners } = usePartnerReports()

	const getUpdateToDatePartnersLabel = () => {
		return <>{upToDatePartners?.length || 0} associado(s) em dia</>
	}

	const getArrearsPartnersLabel = () => {
		return <>{arrearsPartners?.length || 0} associado(s) em atraso</>
	}

	console.log("upToDatePartners", upToDatePartners)
	console.log("arrearsPartners", arrearsPartners)

	return (
		<Flex flexDirection="column" width="100%">
			<Box mt={8}>
				<Text fontWeight="bold" fontSize={20} color="blackAlpha.700">
					Associados
				</Text>
			</Box>

			<ReportsSection width="100%">
				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Em dia
						</Text>
						&nbsp;
						<Tooltip
							label="Lista de associados em dia, ou seja, sem atrasos de pagamento. São consideradas apenas as contribuições pagas a partir da primeira data de pagamento registrada."
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						{getUpdateToDatePartnersLabel()}
					</Text>
				</ContentSection>

				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Com atraso(s)
						</Text>
						&nbsp;
						<Tooltip
							label="Lista de associados com contribuições não pagas. São consideradas apenas as contribuições não pagas a partir da primeira data de pagamento registrada."
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						{getArrearsPartnersLabel()}
					</Text>
				</ContentSection>

				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Valor médio
						</Text>
						&nbsp;
						<Tooltip
							label="Valor médio de contribuição por associado"
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						-
					</Text>
				</ContentSection>
			</ReportsSection>
		</Flex>
	)
}
