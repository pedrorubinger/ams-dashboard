import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { ContentSection, Tooltip } from "~/components"
import { ReportsSection } from "~/pages/Donations/components/Reports"

interface Props {}

export const PartnerReports: React.FC<Props> = () => {
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
						<Tooltip label="Lista de associados em dia" placement="top-start" />
					</Flex>

					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						-
					</Text>
				</ContentSection>

				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Com atraso(s)
						</Text>
						&nbsp;
						<Tooltip
							label="Lista de associados com contribuições não pagas. Apenas considera-se as contribuições não pagas a partir da primeira data de pagamento registrada."
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						-
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
