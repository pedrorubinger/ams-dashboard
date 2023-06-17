import React, { useContext, useMemo } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { DonationContext } from "~/contexts"
import { ContentSection, Tooltip } from "~/components"
import { useDonationCurrentDates } from "~/pages/Donations/hooks"
import { ReportsSection } from "~/pages/Donations/components/Reports"

interface Props {
	hasFilter: boolean
	dateRange?: string
}

export const IncomeDateDonationsReports: React.FC<Props> = ({
	hasFilter,
	dateRange,
}) => {
	const { records } = useContext(DonationContext)
	const { today, month, monthLabel, year } = useDonationCurrentDates()

	return (
		<Flex flexDirection="column" width="100%">
			<Box mt={8}>
				<Text fontWeight="bold" fontSize={20} color="blackAlpha.700">
					Pagamento de contribuições
				</Text>
			</Box>

			<ReportsSection width="100%">
				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Diário ({today})
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os pagamentos feitos no dia de hoje (${today})`}
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
							Mensal ({monthLabel})
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os pagamentos feitos no mês corrente (${monthLabel})`}
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
							Anual ({year})
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os pagamentos feitos no ano corrente (${year})`}
							placement="top-start"
						/>
					</Flex>
					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						-
					</Text>
				</ContentSection>

				{!!hasFilter && (
					<ContentSection mt={6} flexGrow={1}>
						<Flex alignItems="center">
							<Text color="gray.500" fontSize={15}>
								Período
							</Text>
							&nbsp;
							<Tooltip
								label={`Somatória de todos os pagamentos feitos no intervalo de datas selecionado${
									dateRange ? ` (${dateRange})` : ""
								}`}
								placement="top-start"
							/>
						</Flex>
						<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
							-
						</Text>
					</ContentSection>
				)}
			</ReportsSection>
		</Flex>
	)
}
