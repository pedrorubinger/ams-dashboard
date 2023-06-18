import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { ContentSection, Tooltip } from "~/components"
import {
	useDonationCurrentDates,
	useDonationReports,
} from "~/pages/Donations/hooks"
import { ReportsSection } from "~/pages/Donations/components/Reports"
import { dateFormatter, priceFormatter, transformDateToISO } from "~/utils"

interface Props {
	hasFilter: boolean
	dateRange?: string[]
}

export const IncomeDateDonationsReports: React.FC<Props> = ({
	hasFilter,
	dateRange,
}) => {
	const { todayLabel, today, year, month, monthLabel } =
		useDonationCurrentDates()
	const { dailySum, monthlySum, annuallySum } = useDonationReports({
		date: { month, today, year },
		mode: "INCOME",
	})

	const formatDate = (value: string) =>
		dateFormatter.format(new Date(transformDateToISO(value)))

	const formattedRange = dateRange
		? `${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`
		: ""

	console.log("date range", dateRange)

	return (
		<Flex flexDirection="column" width="100%">
			<Box mt={8}>
				<Text fontWeight="bold" fontSize={20} color="blackAlpha.700">
					Pagamentos recebidos
				</Text>
			</Box>

			<ReportsSection width="100%">
				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Hoje ({todayLabel})
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os pagamentos de contribuições de associados recebidos no dia de hoje (${todayLabel})`}
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						{priceFormatter.format(dailySum / 100)}
					</Text>
				</ContentSection>

				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Este mês ({monthLabel})
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os pagamentos de contribuições de associados recebidos no mês corrente (${monthLabel})`}
							placement="top-start"
						/>
					</Flex>

					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						{priceFormatter.format(monthlySum / 100)}
					</Text>
				</ContentSection>

				<ContentSection mt={4}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Este ano ({year})
						</Text>
						&nbsp;
						<Tooltip
							label={`Somatória de todos os pagamentos de contribuições de associados recebidos no ano corrente (${year})`}
							placement="top-start"
						/>
					</Flex>
					<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
						{priceFormatter.format(annuallySum / 100)}
					</Text>
				</ContentSection>

				{!!hasFilter && (
					<ContentSection mt={4} flexGrow={1}>
						<Flex alignItems="center">
							<Text color="gray.500" fontSize={15}>
								Período selecionado
							</Text>
							&nbsp;
							<Tooltip
								label={`Somatória de todos os pagamentos feitos no intervalo de datas selecionado (${formattedRange})`}
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
