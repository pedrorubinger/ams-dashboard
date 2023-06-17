import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { priceFormatter } from "~/utils"
import { ContentSection, Tooltip } from "~/components"
import {
	useDonationCurrentDates,
	useDonationReports,
} from "~/pages/Donations/hooks"
import { ReportsSection } from "~/pages/Donations/components/Reports"

interface Props {
	hasFilter: boolean
	dateRange?: string
}

export const BillingMonthDonationsReports: React.FC<Props> = ({
	hasFilter,
	dateRange,
}) => {
	const { today, todayLabel, month, monthLabel, year } =
		useDonationCurrentDates()
	const { dailySum, monthlySum, annuallySum } = useDonationReports({
		date: { today, month, year },
		mode: "BILLING",
	})

	return (
		<Flex flexDirection="column" width="100%">
			<Box mt={8}>
				<Text fontWeight="bold" fontSize={20} color="blackAlpha.700">
					Lançamentos de contribuições
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
							label={`Somatória de todos os lançamentos feitos no dia de hoje (${todayLabel})`}
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
							label={`Somatória de todos os lançamentos feitos no mês corrente (${monthLabel})`}
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
							label={`Somatória de todos os lançamentos feitos no ano corrente (${year})`}
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
								label={`Somatória de todos os lançamentos feitos no intervalo de datas selecionado${
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
