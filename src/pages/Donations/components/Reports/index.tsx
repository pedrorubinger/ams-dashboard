import React, { useContext, useMemo } from "react"
import { Flex, Text } from "@chakra-ui/react"

import {
	priceFormatter,
	getDonationsPerBillingMonth,
	getAnuallyDonationsPerBillingMonth,
	getMonthlyBillingMonthDonationsSum,
} from "~/utils"
import { DonationContext } from "~/contexts"
import { useDonationCurrentDates } from "~/pages/Donations/hooks"
import { ContentSection, Tooltip } from "~/components"

interface Props {
	hasFilter: boolean
	dateRange?: string
}

export const DonationsReport: React.FC<Props> = ({ hasFilter, dateRange }) => {
	const { records } = useContext(DonationContext)
	const { today, month, monthLabel, year } = useDonationCurrentDates()
	const donationsPerMonth = useMemo(
		() => getDonationsPerBillingMonth(records),
		[records]
	)
	const annuallySum: number = useMemo(
		() => getAnuallyDonationsPerBillingMonth(donationsPerMonth),
		[donationsPerMonth]
	)
	const monthlySum: number = useMemo(
		() => getMonthlyBillingMonthDonationsSum(donationsPerMonth, month),
		[donationsPerMonth, month]
	)

	return (
		<>
			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={15}>
						Diário ({today})
					</Text>
					&nbsp;
					<Tooltip
						label={`Somatória de todos os lançamentos feitos no dia de hoje (${today})`}
						placement="top-start"
					/>
				</Flex>

				<Text fontWeight="bold" fontSize={18} color="blackAlpha.700">
					-
				</Text>
			</ContentSection>

			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={15}>
						Mensal ({monthLabel})
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

			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={15}>
						Anual ({year})
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
				<ContentSection mt={6} flexGrow={1}>
					<Flex alignItems="center">
						<Text color="gray.500" fontSize={15}>
							Período
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
						R$ 1.431,99
					</Text>
				</ContentSection>
			)}
		</>
	)
}
