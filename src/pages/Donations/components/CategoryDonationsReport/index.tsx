import React from "react"
import { Box, Flex, Text } from "@chakra-ui/react"

import { DonationCategory, DonationCategoryLabel } from "~/interfaces"
import {
	useDonationCurrentDates,
	useDonationReports,
} from "~/pages/Donations/hooks"
import { priceFormatter } from "~/utils"
import { ContentSection, Tooltip } from "~/components"
import { formatPlainDateToBr } from "~/pages/Donations/utils"
import { ReportsSection } from "~/pages/Donations/components/Reports"

interface Props {
	hasFilter: boolean
	dateRange?: string[]
	category: DonationCategory
}

export const CategoryDonationsReport: React.FC<Props> = ({
	hasFilter,
	dateRange,
	category,
}) => {
	const { todayLabel, today, year, month, monthLabel } =
		useDonationCurrentDates()
	const { dailySum, monthlySum, annuallySum, rangeSum } = useDonationReports({
		date: { month, today, year },
		range: dateRange,
		mode: "INCOME",
		category,
	})
	const categoryLabel = DonationCategoryLabel[category]

	const formattedRange = dateRange
		? `${formatPlainDateToBr(dateRange[0])} - ${formatPlainDateToBr(
				dateRange[1]
		  )}`
		: ""

	return (
		<Flex flexDirection="column" width="100%">
			<Box mt={8}>
				<Text fontWeight="bold" fontSize={20} color="blackAlpha.700">
					Pagamentos recebidos via {categoryLabel}
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
							label={`Somatória de todos os pagamentos de contribuições de associados recebidos via ${categoryLabel} no dia de hoje (${todayLabel})`}
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
							label={`Somatória de todos os pagamentos de contribuições de associados recebidos via ${categoryLabel} no mês corrente (${monthLabel})`}
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
							label={`Somatória de todos os pagamentos de contribuições de associados recebidos via ${categoryLabel} no ano corrente (${year})`}
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
							{priceFormatter.format(rangeSum / 100)}
						</Text>
					</ContentSection>
				)}
			</ReportsSection>
		</Flex>
	)
}
