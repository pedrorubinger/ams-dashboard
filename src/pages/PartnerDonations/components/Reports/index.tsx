import React from "react"
import { Flex, Text } from "@chakra-ui/react"

import {
	PartnerDonationBillingMonth as Month,
	PartnerDonationBillingMonthLabel as MonthLabel,
} from "~/interfaces"
import { dateFormatter } from "~/utils"
import { ContentSection, Tooltip } from "~/components"

interface Props {}

type MonthKey = keyof typeof MonthLabel

export const PartnerDonationsReport: React.FC<Props> = () => {
	const d = new Date()
	const today = dateFormatter.format(d)
	const month: string = MonthLabel[Month[d.getMonth() + 1] as MonthKey]
	const year = String(d.getFullYear())

	return (
		<>
			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={18}>
						Diário
					</Text>
					&nbsp;
					<Tooltip
						label={`Somatória de todos os lançamentos feitos no dia de hoje (${today})`}
						placement="top-start"
					/>
				</Flex>

				<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
					R$ 144,55
				</Text>
			</ContentSection>

			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={18}>
						Mensal
					</Text>
					&nbsp;
					<Tooltip
						label={`Somatória de todos os lançamentos feitos no mês corrente (${month})`}
						placement="top-start"
					/>
				</Flex>

				<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
					R$ 484,62
				</Text>
			</ContentSection>

			<ContentSection mt={6}>
				<Flex alignItems="center">
					<Text color="gray.500" fontSize={18}>
						Anual
					</Text>
					&nbsp;
					<Tooltip
						label={`Somatória de todos os lançamentos feitos no ano corrente (${year})`}
						placement="top-start"
					/>
				</Flex>
				<Text fontWeight="bold" fontSize={22} color="blackAlpha.700">
					R$ 9.144,55
				</Text>
			</ContentSection>
		</>
	)
}
